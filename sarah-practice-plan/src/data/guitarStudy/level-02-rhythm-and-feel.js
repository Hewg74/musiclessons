import { getPitchRange } from "../appData.js";

export const level2 = {
  level: 2,
  title: "Rhythm & Feel",
  subtitle: "Feel the groove. Play behind the beat. Make three chords sound like a whole band.",
  description:
    "Level 1 gave you chords and a pentatonic scale. Now you learn how to PLAY them — with dynamics, behind-the-beat feel, ghost strums, syncopation, and blues scale bends. This is where you stop sounding like a beginner running through chord changes and start sounding like someone who FEELS the music. The difference between a guitarist and a musician is feel, and feel lives in rhythm.",
  artists: "The Lagoons, Husbands, Day We Ran, Ariel Pink",
  unlocks: "Power & Drive (Level 3)",
  review: {
    label: "Level 1 Check-In",
    time: 5,
    exercises: ["gs-1-5", "gs-1-10"],
    prompt: "Play the one-note groove (gs-1-5) — can you groove on one note for 60 seconds? Then play DOPE LEMON style Am→D→G with behind-the-beat feel (gs-1-10). Both feel natural? Move on."
  },
  exercises: [

    // ─── DYNAMIC CONTROL ───

    {
      id: "gs-2-1",
      time: 8,
      title: "Whisper to Shout — Dynamic Strumming",
      type: "guitar",
      what: "Same chord, wildly different volumes. Strum Am as quietly as you can — barely brushing the strings. Then strum it as loudly as you can without losing control. Dynamic range is what separates a living performance from a dead one. Most beginners play at one volume. You're going to play at ten.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am at the quietest volume you can manage — your pick barely touching the strings. Keep the strum pattern constant (all downstrokes on quarter notes). Listen for the ghost of the chord. 8 bars.", why: "Quiet strumming requires more control than loud strumming. Your pick hand has to be precise — too light and you miss strings, too heavy and you're back at medium volume. This builds fine motor control in your strumming hand." },
        { text: "Now strum Am as loudly as you can while staying relaxed and in time. Full arm motion, hitting all six strings. 8 bars. Notice how your whole body engages compared to the whisper.", why: "Loud strumming uses your whole arm and shoulder, not just your wrist. If you tense up at high volume, the sound becomes harsh and brittle. Relaxed power = warm volume." },
        { text: "Crescendo drill: start at whisper volume and build to full volume over 8 bars. One bar = one step louder. Then decrescendo back to whisper over the next 8 bars. Repeat this wave 3 times.", why: "Smooth dynamic transitions are harder than jumping between volumes. Your arm has to gradually increase its range and attack. This builds the muscle memory for dynamic shaping within a song." },
        { text: "Accent drill: strum Am on all four beats, but make beat 1 LOUD and beats 2, 3, 4 quiet. Then try loud on beats 2 and 4 (the backbeat). Then loud on beat 3 only. Same chord, same tempo — three different grooves.", why: "Accents create groove. A loud beat 1 feels driving and rock. Loud beats 2 and 4 feel funky and reggae. Loud beat 3 feels off-balance and interesting. You're learning that rhythm isn't just WHEN you play — it's HOW HARD you play." },
        { text: "One-minute changes with dynamics: alternate Am and D, but play Am loud and D quiet. Then switch. Then try Am crescendo into D. Feel how dynamics create movement between chords.", why: "Dynamic contrast between chords is how artists like DOPE LEMON and The Lagoons create emotional weight with simple progressions. The volume change IS the arrangement." }
      ],
      feel: "You should feel like a volume knob on a stereo — able to dial from 1 to 10 smoothly and land anywhere in between. The guitar should feel responsive to your touch, not one-size-fits-all.",
      wrong: "If your quiet strumming is still pretty loud, you're gripping the pick too tight. Loosen your grip until the pick almost falls out — that's your whisper grip. If your loud strumming sounds harsh and clanky, you're tensing your arm. Shake it out, stay loose, and let the arm swing naturally with more range.",
      sarah: "Gene, listen to how The Lagoons play 'Close My Eyes' — the verse is practically a whisper, then the chorus opens up with full strums. That contrast IS the song. DOPE LEMON does the same thing — 'Dope & Smoke' floats at low volume and lets certain strums pop out like little waves. That's dynamic control. You're building it right here.",
      metronome: 80,
      volumeMeter: true,
      levelUp: "Can smoothly crescendo from whisper to full volume over 8 bars and back, without any sudden jumps, while keeping the metronome tempo steady."
    },

    // ─── BEHIND-THE-BEAT FEEL ───

    {
      id: "gs-2-2",
      time: 8,
      title: "Behind the Beat — The Laid-Back Strum",
      type: "guitar",
      what: "Most beginners play ON the click. But the music you love — DOPE LEMON, Khruangbin, The Lagoons — plays BEHIND the click. Not late, not sloppy — intentionally relaxed, like the strum is arriving fashionably late to the party. This is the single biggest feel upgrade you can make.",
      setup: "Guitar. Metronome at 75 BPM (slow enough to feel the space).",
      steps: [
        { text: "Strum Am right ON the metronome click for 8 bars. Lock in perfectly — your strum and the click should be simultaneous. This is the baseline. Feel how mechanical and 'correct' it sounds.", why: "You need a solid on-the-beat foundation before you can intentionally play behind it. If you can't play on the beat, playing behind it will just sound sloppy. Precision first, then feel." },
        { text: "Now strum Am just AFTER the click — a tiny fraction of a second late. The click happens, then your strum follows. Think of it as the click is the wave breaking, and your strum is the foam that follows. 8 bars.", why: "Behind-the-beat feel creates the laid-back, sun-drenched quality you hear in every DOPE LEMON and Khruangbin track. The delay is tiny — maybe 50-80 milliseconds — but the vibe change is enormous." },
        { text: "Exaggerate it: play clearly AFTER the click — so late that it almost feels like you're on the wrong beat. Then gradually pull it back until you find the sweet spot: not on the beat, not absurdly late, but floating in the space behind the click. 4 bars exaggerated, 4 bars finding the pocket.", why: "Exaggeration trains the muscle. You need to know where 'too late' is before you can find the pocket. Most beginners under-estimate how far behind they can go before it sounds wrong." },
        { text: "Apply it to a chord change: strum Am (4 bars) → D (4 bars) → G (4 bars), all behind the beat. The chord changes should also be slightly behind — don't rush to get to the next chord. Let each chord linger a breath longer than 'correct.'", why: "Behind-the-beat chord changes are the secret to the relaxed DOPE LEMON vibe. If your chords arrive 'on time' but your strums are behind, it sounds confused. Everything — strums AND changes — lives in the same laid-back pocket." },
        { text: "Test: record yourself playing Am-D-G on the beat, then behind the beat. Listen back to both. The on-the-beat version should sound stiff and mechanical. The behind-the-beat version should sound warm and groovy. If you can't hear the difference yet, keep practicing — it will click.", why: "Recording and comparing is the fastest way to train your ear for feel. What you hear while playing isn't what the audience hears. The recording tells the truth." }
      ],
      feel: "When you find the behind-the-beat pocket, it feels like floating — like the metronome is pulling you forward but you're choosing to glide. It's the difference between walking urgently and strolling. Your whole body should feel more relaxed.",
      wrong: "If your behind-the-beat strums sound random and sloppy, you're playing late without intention. The difference between 'behind the beat' and 'late' is consistency — behind the beat means EVERY strum is the same distance behind the click. If some strums are on and some are late, that's just messy time. Also: if you're tensing up trying to control the delay, you're overthinking it. Relax your arm and FEEL lazy.",
      sarah: "Gene, this one exercise is worth the entire level. Angus Stone (DOPE LEMON) plays behind the beat on everything — that's why 'Dope & Smoke' sounds like a warm bath. Mark Speer from Khruangbin is behind the beat constantly — he once said his guitar playing is 60% silence. The Lagoons have that same dreamy, slightly-late quality in 'Close My Eyes.' This is the feel of your entire playlist. Learn it here, use it forever.",
      metronome: 75,
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      recorder: true,
      levelUp: "Can play a 3-chord progression (Am-D-G) behind the beat for 16 bars with consistent feel — not drifting further behind or snapping back on-the-beat."
    },

    // ─── GHOST STRUMS ───

    {
      id: "gs-2-3",
      time: 8,
      title: "Ghost Strums — The Invisible Groove",
      type: "guitar",
      what: "A ghost strum is when your arm swings through but barely touches the strings — a whisper of a strum that adds rhythmic texture without volume. It's the secret ingredient in every great rhythm guitarist's playing. Your arm NEVER stops moving (constant arm motion), but some swings are full strums and some are ghosts.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Review constant arm motion: strum Am with your arm swinging on every eighth note — down on downbeats, up on upbeats. ALL eight swings hit the strings at full volume. Feel the pendulum. 8 bars.", why: "Constant arm motion is the foundation from Level 1. Your arm is a pendulum that never stops. Ghost strums are just a variation on which swings make sound — the arm motion stays the same." },
        { text: "Now make the upstrokes (the 'ands') into ghosts: your arm still swings up, but it barely brushes the strings. You should hear the downstrokes clearly and the upstrokes as a faint, percussive whisper. 8 bars.", why: "Ghost strums on the upbeats create the classic behind-the-beat bounce. The arm is doing the same motion, but the upstrokes are relaxed and light. This is how rhythm guitarists add texture without cluttering the groove." },
        { text: "Reverse it: make the downstrokes ghosts and the upstrokes full volume. This feels weird and off-balance at first — lean into it. The accented upstrokes create a reggae-adjacent bounce. 8 bars.", why: "Accenting upstrokes is the gateway to reggae skank (Level 4). Getting comfortable with this inversion now means the offbeat will feel natural later. It also proves your arm motion is truly independent of your accent pattern." },
        { text: "Pattern: full, ghost, ghost, full, ghost, full, ghost, ghost (over 2 beats of eighth notes). This creates a syncopated groove — certain strums pop out while others whisper. Practice this pattern for 8 bars until it grooves.", why: "Irregular ghost patterns create the rhythmic complexity that makes a strum pattern interesting. Your arm still moves like a metronome, but the dynamic variation creates syncopation. This is how one guitarist sounds like a whole rhythm section." },
        { text: "Apply ghost strums to the Am-D-G progression from Level 1: use any ghost pattern you like, but keep the arm swinging and the ghosts consistent. 16 bars, then record. Listen for the texture — the ghosts should be audible but quiet, like a shaker underneath the guitar.", why: "Ghost strums over chord changes prove that your strumming pattern is independent of your fretting hand. If the ghosts disappear during chord changes, your left hand is disrupting your right hand's groove. They need to be independent." }
      ],
      feel: "Ghost strums should feel effortless — like your arm is breathing. The full strums are exhales, the ghosts are inhales. The groove gets a pulse, a heartbeat, that's more alive than straight strumming.",
      wrong: "If you can't hear ANY difference between full strums and ghosts, you're pressing too hard on the ghosts. Lighten your pick grip until the ghost strum is more air than string. If your arm keeps stopping for the ghosts (dead air instead of whisper), your arm is breaking the pendulum. The arm NEVER STOPS — ghosts are light swings, not pauses.",
      sarah: "Gene, Angus Stone (DOPE LEMON) uses ghost strums constantly — that's why his guitar sounds like it's breathing. When you listen to 'Dope & Smoke,' those little swishes between the main strums? Ghosts. The Lagoons do the same in 'Close My Eyes' — the strum pattern sounds complex but it's really just full strums and ghosts on a constant arm motion. Once you have this, everything grooves harder.",
      metronome: 80,
      tracks: [{ name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }],
      levelUp: "Can play a 3-chord progression with a consistent ghost strum pattern for 16 bars — ghosts audible but quiet, arm never stopping, groove feeling natural and breathing."
    },

    // ─── SONG STUDY: CLOSE MY EYES ───

    {
      id: "gs-2-4",
      time: 10,
      title: "Song Study: Close My Eyes — Dreamy Indie Feel",
      type: "guitar",
      // UNVERIFIED — D-Bm-G-A is a likely progression based on key/genre analysis but has not been confirmed against 2+ independent tab sources
      what: "The Lagoons' 'Close My Eyes' is a masterclass in dreamy indie guitar — four chords (D-Bm-G-A) at 104 BPM, but the magic is in the behind-the-beat feel and the ghost strums that make it float. You'll learn the progression, then layer in the feel techniques from this level.",
      setup: "Guitar. Metronome at 80 BPM (learn slow, play up to 104).",
      steps: [
        { text: "Learn the four chords in isolation: D, Bm, G, A. If Bm is new, use the easy version (x24432) — three fingers, no full barre needed yet. One-minute changes: D↔Bm, Bm↔G, G↔A. Count your changes. Target: 20+ per minute for each pair.", why: "One-minute changes build the muscle memory for transitions before you worry about feel. The D-Bm transition is the trickiest — your index finger becomes the anchor. Getting 20+ per minute means the transitions are automatic enough to add groove." },
        { text: "Play the full progression: D (4 beats) → Bm (4 beats) → G (4 beats) → A (4 beats). All downstrokes, on the beat, at 80 BPM. Run it 4 times through. This is the skeleton — it should sound stiff and correct right now.", why: "Playing it 'stiff and correct' first gives you a clean baseline. You can't add feel to something you're fumbling through. Get the changes smooth at slow tempo before adding groove." },
        { text: "Add ghost strums: keep the arm swinging on eighth notes, but make the upstrokes ghosts. The downstrokes carry the chord changes, the ghosts add texture between them. 4 times through the progression.", why: "Ghost strums transform a basic chord loop into something that breathes. The Lagoons' guitar sound is all about this — the main strums float on a bed of whispered rhythmic texture." },
        { text: "Add behind-the-beat feel: everything — downstrokes, ghosts, chord changes — lands just AFTER the click. Not late, just relaxed. Feel the dreamy quality emerge. 4 times through.", why: "Behind-the-beat is what makes 'Close My Eyes' sound like a dream instead of a march. The combined effect of ghost strums and behind-the-beat feel is the signature Lagoons sound." },
        { text: "Add dynamics: verse quiet (whisper strums), pre-chorus builds (gradual crescendo), chorus full (strong but still behind the beat). Run the progression 8 times through, treating every 2 loops as a verse-chorus cycle. Record the last 4 loops.", why: "Dynamic shaping turns a chord loop into a song. The Lagoons build their songs exactly this way — quiet verses that swell into bigger choruses. Same four chords, same strum pattern, dynamics create the journey." }
      ],
      feel: "This should feel like floating on warm water — the chords drift by, the ghost strums ripple underneath, everything is slightly behind the beat. When you nail it, you'll feel the dreamy, sun-drenched quality that makes The Lagoons' sound so addictive.",
      wrong: "If it sounds stiff and mechanical, you haven't committed to the behind-the-beat feel — exaggerate it until it feels almost too lazy. If the Bm chord buzzes, check that your fingers are close to the frets and pressing firmly. If the ghost strums disappear during chord changes, your right hand is tensing when your left hand moves — practice the chord changes separately until they're automatic.",
      sarah: "Gene, The Lagoons are right in your sweet spot — dreamy, reverb-soaked, golden-hour indie. 'Close My Eyes' is one of those songs that sounds like a warm sunset over the ocean. The chords are simple — D, Bm, G, A — but the feel is everything. Once you can play this with behind-the-beat groove and ghost strums, you've got the DNA for half the songs on your playlist. This same progression pattern (major-minor-major-major) shows up everywhere from Father John Misty to Bay Ledges.",
      metronome: 80,
      chordVoicings: { chords: ["D", "Bm", "G", "A"] },
      recorder: true,
      levelUp: "Can play D-Bm-G-A at 104 BPM with ghost strums, behind-the-beat feel, and dynamic verse/chorus contrast — recorded and sounding dreamy, not mechanical."
    },

    // ─── SYNCOPATION & 3-3-2 ───

    {
      id: "gs-2-5",
      time: 8,
      title: "The 3-3-2 — Universal Groove Pattern",
      type: "guitar",
      what: "The 3-3-2 is the most important rhythmic pattern in world music — three eighth-note beats, three eighth-note beats, two eighth-note beats over a bar of 4/4. It shows up in Afro-Cuban music, reggaeton, Khruangbin, surf rock, and everything in between. Once you hear it, you'll hear it everywhere.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Count it first: say 'ONE-two-three, ONE-two-three, ONE-two' over the metronome at 80 BPM. The accents (ONEs) fall on beats 1, the 'and' of 2, and beat 4. Clap on the accents while counting. Repeat until it grooves.", why: "Vocalizing and clapping the pattern before playing it embeds the rhythm physically. The 3-3-2 divides 8 eighth notes into groups of 3+3+2 — it creates an asymmetric bounce that propels the music forward." },
        { text: "Apply it to Am: strum on the three accent points only (beat 1, and-of-2, beat 4). Leave the other beats silent — your arm still swings (constant arm motion) but misses the strings except on the accents. 8 bars.", why: "Playing only the accents makes the 3-3-2 skeleton audible. The silence between accents is what creates the groove — the pattern breathes because of the gaps." },
        { text: "Fill in the ghosts: now swing on all eighth notes but make the non-accent strums into ghost strums. The three accent points ring out, everything else whispers. Same 3-3-2 but with rhythmic texture filling the gaps. 8 bars.", why: "Ghost strums between the 3-3-2 accents create a groovy, rolling feel. The accents provide the pattern's shape, the ghosts provide its texture. This is how the pattern sounds in real songs — not choppy silence but breathing groove." },
        { text: "Apply 3-3-2 to the D-Bm-G-A progression: change chords every bar, maintaining the 3-3-2 accent pattern with ghost strums. 4 times through the full progression.", why: "The 3-3-2 over chord changes proves the pattern is in your right hand independently of your left. This is the foundation for every syncopated strum pattern in surf, psych, and reggae rock." },
        { text: "Speed it up: once comfortable at 80, try 90, then 100, then 104 (Close My Eyes tempo). At faster tempos, the 3-3-2 starts to feel like a gallop. If you lose the groove, drop back to 80 and build up again. Record yourself at whatever tempo feels locked.", why: "Speed practice follows the 5-consecutive-clean-reps rule: only increase tempo after you can play 5 perfect reps at the current speed. The 3-3-2 at higher tempos is the engine of surf and psych-rock energy." }
      ],
      feel: "The 3-3-2 should feel like a horse galloping — not evenly spaced, but rolling forward with a lopsided momentum. When it grooves, your body will naturally sway in an asymmetric bounce. If you're nodding your head evenly (like a metronome), the pattern hasn't clicked yet.",
      wrong: "If the accents all feel the same (no sense of 3+3+2 grouping), exaggerate the accent on beat 1 of each group. If you keep slipping into straight eighth notes (losing the grouping), stop and count 'ONE-two-three, ONE-two-three, ONE-two' until the pattern is back. The 3-3-2 is NOT straight — it's asymmetric. That asymmetry IS the groove.",
      sarah: "Gene, the 3-3-2 is the heartbeat of so much music you love. Khruangbin uses it constantly — listen to how Laura's bass creates that rolling, hypnotic groove. It's in BALTHVS's cumbia-inflected rhythms. It's in Sun Room's syncopated strum pattern on 'Sol Del Sur.' Once you internalize this pattern, you'll start hearing it everywhere — in Afrobeat, in bossa nova, in surf rock. It's the universal groove.",
      metronome: 80,
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }, { name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }],
      rhythmCells: [
        { name: "3-3-2", pattern: [0.375, 0.375, 0.25], description: "Three + three + two eighth notes over one bar — the universal groove pattern" }
      ],
      levelUp: "Can play the 3-3-2 accent pattern with ghost strums over a chord progression at 100 BPM, with the asymmetric grouping clearly audible."
    },

    // ─── BLUES SCALE & BENDING ───

    {
      id: "gs-2-6",
      time: 8,
      title: "The A Blues Scale — Where the Sauce Lives",
      type: "guitar",
      what: "The Am pentatonic scale from Level 1 becomes the A blues scale by adding ONE note: Eb (the flat 5, the 'blue note'). This single note transforms the scale from pleasant to gritty, from safe to dangerous. It's the sound of every blues lick, every rock solo bend, every psych-guitar moment that makes your hair stand up.",
      setup: "Guitar. Metronome at 60 BPM (slow — accuracy first).",
      steps: [
        { text: "Review Am pentatonic in position 1 (frets 5-8): A-C-D-E-G. Play it ascending and descending 4 times. These five notes are your home base.", why: "Before adding the blue note, lock in the pentatonic shape. You should be able to play it without looking at the fretboard. The blue note is a spice — you need to know the dish before you add it." },
        { text: "Add the blue note: Eb is at fret 6 on the A string (between D at fret 5 and E at fret 7). Play the full blues scale: A(5)-C(8)-D(5)-Eb(6)-E(7)-G(5)-A(7). Ascending, then descending. 4 times each.", why: "The blue note creates chromatic tension between D and E — a half-step squeeze that wants to resolve. This tension IS the blues sound. It's dissonant on purpose, and it resolves when you move to E or D." },
        { text: "Emphasize the blue note: play phrases that linger on Eb — bend into it, slide into it, let it hang. Then resolve to E (up) or D (down). The blue note is a tension that demands resolution. Play with the tension. 2 minutes of free exploration.", why: "The blue note is most expressive as a passing tone or a bent note — you don't usually rest on it for long. Learning to approach it, linger on it, and resolve it gives you the vocabulary of blues expression." },
        { text: "Play the A blues scale over the backing track. Start with just ascending/descending runs. Then try short phrases — 3-4 notes at a time. Leave space between phrases. Remember: silence is a note too.", why: "Playing over a backing track contextualizes the scale. The blue note sounds different over a chord than it does in isolation — it rubs against the harmony in a delicious way." },
        { text: "Call and response with the blues scale: play a short phrase (3-4 notes), leave 4 beats of silence, then answer with a variation. The call states a musical idea, the response develops it. Do this for 2 minutes. Record the last minute.", why: "Blues is fundamentally a call-and-response music. Short phrases with space between them is how all the great blues players think. Playing long, continuous runs is the beginner instinct. Mature phrasing is short, spacious, and conversational." }
      ],
      feel: "The blues scale should feel expressive and a little dangerous — like the blue note is a note that 'shouldn't' be there but sounds incredible. When you bend into it or slide through it, you should feel the tension and resolution in your gut.",
      wrong: "If the blue note sounds random and out of place, you're probably landing on it and staying there. The blue note is a PASSING tone — approach it, feel the tension, then resolve to E or D. If the scale feels like a mechanical exercise, stop doing runs and play SHORT phrases with lots of space. Three notes with feeling beats ten notes without.",
      sarah: "Gene, the blue note is what gives psych-rock its edge. When Allah-Las play those winding guitar lines, the blue note is always lurking — that tiny dissonance that keeps the melody from sounding too 'nice.' It's in every Mystic Braves solo, every Skinshape hook. And here's the thing — Ariel Pink uses it in 'Baby' to create that off-kilter, slightly-wrong-but-perfect quality. One note, added to a scale you already know, and suddenly you've got the blues.",
      metronome: 60,
      fretboard: { scale: "am-pentatonic", position: 1, highlight: [] },
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      recorder: true,
      levelUp: "Can play the A blues scale ascending and descending cleanly at 80 BPM, and can improvise 3-4 note phrases with intentional use of the blue note over a backing track."
    },
    {
      id: "gs-2-7",
      time: 8,
      title: "Bending — Making the Guitar Sing",
      type: "guitar",
      what: "Bending a string changes its pitch without moving your finger to a new fret — the guitar literally sings. But bending is a technique that requires physical training: supporting fingers behind the bending finger, pitch accuracy (hitting the TARGET note, not just bending randomly), and muscle memory. This is where your guitar starts to sound human.",
      setup: "Guitar. No metronome — bending is about pitch, not rhythm.",
      steps: [
        { text: "Half-step bend prep: play the note at fret 7 on the G string (D). Now play fret 8 (Eb — the blue note). Listen to the distance between them — that's a half step. Now go back to fret 7 and BEND the string upward (toward the ceiling) until it matches the pitch of fret 8. Use your ring finger to bend, with your index and middle fingers behind it for support.", why: "Supporting fingers are non-negotiable for bending. Your ring finger alone doesn't have enough strength or control. Index and middle fingers behind it share the load and give you precision. This is the #1 bending technique mistake beginners make — bending with one unsupported finger." },
        { text: "Play the target note (fret 8, Eb) — memorize how it sounds. Now bend from fret 7 to match that pitch. Do this 10 times: play the target, bend to match, play the target, bend to match. Your bends should sound identical to the target note.", why: "Pitch-accurate bending means training your ear AND your fingers simultaneously. Most beginners under-bend (they don't push the string far enough). By playing the target first, your ear knows exactly where to go. Over-bend first if needed, then dial it back." },
        { text: "Full-step bend: play fret 7 (D), then play fret 9 (E). That's a whole step — twice as far. Now bend from fret 7 to match fret 9. This requires more force. Use three supporting fingers and push from your wrist, not your fingertips. 10 reps with target-note checks.", why: "Whole-step bends are the bread and butter of blues and rock guitar. The target note is further away, so the physical demand is greater. Pushing from the wrist (rotating your forearm) rather than squeezing with your fingertips prevents fatigue and gives more control." },
        { text: "Bend and release: bend up to the target note, hold it for 2 beats, then slowly release back to the original pitch. Listen to the pitch slide back down. This is the 'cry' of the guitar — one of the most expressive sounds in music. 10 reps.", why: "Bend-and-release is how guitarists create vocal-like phrases. The upward bend is the cry, the release is the sigh. Holding the bend at the top proves you have pitch control — you're not just flicking the string and hoping." },
        { text: "Apply bending to the blues scale: play a phrase that includes a bend. For example: play A (fret 5, low E), slide to D (fret 7, G string), bend up to Eb (half-step bend), release back to D, resolve to E (fret 9). That's a classic blues lick. Play it 10 times until it's smooth, then make up your own phrase with a bend.", why: "Bending within a scale context is where the technique becomes musical. A bend in isolation is an exercise. A bend within a phrase is expression. This specific lick (approach, bend, release, resolve) is the DNA of blues guitar." }
      ],
      feel: "Bending should feel physical — you're literally pulling the string against its tension. When the bend hits the target pitch, you'll feel it lock in, just like singing into a drone. The guitar should sound like it's crying, sighing, speaking.",
      wrong: "If your bends are pitchy (somewhere between the starting note and target), you're not pushing hard enough or you don't have the target note in your ear. ALWAYS play the target note first, memorize it, THEN bend. If your fingers hurt after 5 minutes, you're gripping too hard or not using supporting fingers. Take a break — bending builds hand strength over time, and your brain consolidates the skill during sleep.",
      sarah: "Gene, bending is what makes the guitar emotional — it's the closest the instrument gets to the human voice. When you hear those Khruangbin melodies that seem to float and sigh? Mark Speer bends constantly. When Tinariwen's guitar wails across the desert? Quarter-tone bends and half-step bends. Ariel Pink's 'Baby' has those wonky, slightly-bent notes that make the guitar sound like it's talking. Start with accuracy — match the target note every time. The expressive stuff comes once you have control.",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      levelUp: "Can consistently bend a half-step and a whole-step to match the target pitch — checked by playing the target note, then bending to match, 10 out of 10 accurate."
    },

    // ─── SONG STUDY: BABY ───

    {
      id: "gs-2-8",
      time: 8,
      title: "Song Study: Baby — Simple but Expressive",
      type: "guitar",
      what: "Ariel Pink's 'Baby' uses just two chords — D and Em — at a slow 92 BPM. It sounds deceptively simple, but the magic is in the dynamics and the slightly off-kilter, lo-fi feel. This is your canvas for applying everything from this level: dynamics, behind-the-beat, ghost strums, and bends for embellishment.",
      setup: "Guitar. Metronome at 80 BPM (learn slow, target 92).",
      steps: [
        { text: "Learn the two chords: D (xx0232) and Em (022000). These are both open chords you know from Level 1. One-minute changes: D↔Em. Target: 30+ changes per minute. This should be fast — these are simple shapes.", why: "Even though these chords are 'easy,' one-minute changes at 30+ prove they're truly automatic. The simpler the chord progression, the more your FEEL has to carry the song. No hiding behind complex changes." },
        { text: "Play the progression: D (8 beats) → Em (8 beats) → D (8 beats). Just two chords rocking back and forth. Straight strumming on the beat at 80 BPM. 4 loops. Notice how repetitive and plain it sounds — this is the skeleton.", why: "The skeleton version of 'Baby' reveals how much feel contributes to the song's identity. Two chords, straight rhythm, no dynamics = boring. The feel you'll add in the next steps IS the song." },
        { text: "Add behind-the-beat feel: same two chords, but everything floats behind the click. Then add ghost strums on the upbeats. Then add dynamics: let the D chord ring quieter and the Em push slightly louder. 4 loops with all three feel elements.", why: "Layering feel elements (behind-beat + ghosts + dynamics) is how simple progressions become expressive. Ariel Pink's lo-fi aesthetic is built on this — nothing technically complex, everything emotionally intentional." },
        { text: "Add a bluesy embellishment: on the D chord, try a hammer-on from open D string to fret 2. On the Em chord, try a single-note bend (fret 7, G string, half-step bend). These tiny ornaments add personality without changing the song.", why: "Embellishments are the 'accent' in your guitar voice. A hammer-on adds bounce, a bend adds emotion. Used sparingly, they transform a plain strum into something personal and expressive." },
        { text: "Full performance: play D-Em-D for 2 minutes straight with all feel elements and embellishments. Behind the beat, ghost strums, dynamics, occasional hammer-ons and bends. Record it. This should sound like a lazy afternoon on a warm porch — simple, expressive, alive.", why: "Extended performance builds endurance and lets the groove deepen. Two minutes on two chords forces you to find variation within constraint — which is exactly what makes a great rhythm guitarist." }
      ],
      feel: "This should feel intimate and slightly strange — Ariel Pink's music has a warped, lo-fi quality like a cassette tape that's been played too many times. The behind-the-beat feel creates that dreamy warped quality. If it feels too 'clean' and 'correct,' mess it up a little — let a ghost strum be louder than intended, let a bend go slightly sharp.",
      wrong: "If it sounds like a beginner exercise (stiff, mechanical, even volume), you haven't committed to the dynamics. The D should breathe differently than the Em. If the bends sound random, make sure you're targeting a specific pitch (half-step bend to Eb). If the overall feel is rushed, slow the metronome to 72 and really lean into the laid-back pocket.",
      sarah: "Gene, Ariel Pink is the king of lo-fi feel — his recordings sound like they were made on a 4-track in a bedroom, and that's the whole point. 'Baby' is barely a song structurally — two chords, a vibe, done. But it GROOVES because of the feel. This is your exercise in making less = more. When you can make two chords sound this good, three chords will sound like a symphony.",
      metronome: 80,
      chordVoicings: { chords: ["D", "Em"] },
      recorder: true,
      levelUp: "Can play D-Em-D at 92 BPM for 2 minutes with behind-the-beat feel, ghost strums, dynamic variation, and at least one embellishment per loop — recorded and sounding expressive, not stiff."
    },

    // ─── SONG STUDY: MEXICO FEEL ───

    {
      id: "gs-2-9",
      time: 8,
      title: "Song Study: Mexico — Fast Strum Energy",
      type: "guitar",
      what: "Husbands' 'Mexico' is the opposite of behind-the-beat — it's a fast, energetic strum at 150 BPM that drives forward with joyful urgency. Five chords (F-C-E-Dm-Am) at high speed. This is your first encounter with uptempo strumming and how to keep your arm relaxed when the speed demands it.",
      setup: "Guitar. Metronome at 100 BPM (start slow, target 150).",
      steps: [
        { text: "Learn the five chords: F (xx3211 — just the four-string version for now), C, E, Dm, Am. One-minute changes for the trickiest pairs: F↔C, E↔Dm, Dm↔Am. Target: 20+ per minute for each pair.", why: "Five chords at 150 BPM means fast transitions. The four-string F avoids the full barre (that's Level 5). The E chord appearing in a C-major context is surprising — it's borrowed from the parallel minor and creates harmonic tension." },
        { text: "Play the progression at 100 BPM: F (2 beats) → C (2 beats) → E (2 beats) → Dm (2 beats) → Am (4 beats). Straight downstrokes. Run it 4 times. Focus on clean chord changes — no buzzing, no dead strings.", why: "Starting at 100 BPM (2/3 of target) gives your left hand time to find each chord cleanly. The progression has a lot of movement — 5 chords means 4 transitions per loop. Getting these clean at moderate speed is the foundation." },
        { text: "Speed ladder: play the progression at 100, then 110, 120, 130 BPM. At each speed, play 4 times through. Only move to the next speed after 4 clean reps. If you stumble, drop back 10 BPM and lock in before pushing.", why: "Speed ladders build tempo in manageable increments. Jumping from 100 to 150 invites sloppiness. Each 10 BPM step lets your muscle memory adjust. If you can't get past 120 today, stop and try again tomorrow — your brain consolidates during sleep." },
        { text: "At whatever speed feels solid (even if it's 120 and not 150), add constant arm motion with ghost strums. Your arm swings on every eighth note. Downstrokes are full, upstrokes are ghosts. This keeps the energy flowing even at high speed.", why: "At fast tempos, ghost strums fill the rhythmic space and prevent the strum from sounding choppy. Your arm is a fast pendulum — it never stops, never tenses, never clutches. Relaxation at speed is the goal." },
        { text: "Record yourself at your fastest clean speed. Listen back — does it have energy? Does it drive forward? If it sounds frantic and tense, you're going too fast. Drop 10 BPM. The goal is controlled energy, not panic.", why: "Fast strumming that sounds panicked is worse than slow strumming that grooves. The target is relaxed speed — your arm loose, your transitions clean, the energy joyful rather than stressful. If you can't hit 150 yet, that's fine — this is a target to grow into over weeks." }
      ],
      feel: "This should feel like sprinting on the beach — fast, joyful, free. Your arm should be loose and your body should be bouncing. If you feel tight and stressed, you're going too fast. The energy of 'Mexico' is sunny and exuberant, not anxious.",
      wrong: "If your strums sound thin and weak at high speed, you're probably tensing up and shrinking your arm motion. Keep the full arm swing even as the tempo increases. If chord changes are buzzy and muddy, you're sacrificing accuracy for speed — slow down until the changes are clean, then build back up. If you can't get past 120 BPM today, STOP. Sleep on it. You'll be faster tomorrow.",
      sarah: "Gene, Husbands are from that jangly indie-pop scene — 'Mexico' has the energy of a road trip with the windows down. This is the fun side of guitar — not meditative or laid-back, just pure joyful strumming. It's the same energy as Pattymanajaro by Yasawa Group (167 BPM!) or Going Gets Tough by The Growlers (158 BPM). Fast strumming is its own skill, separate from the behind-the-beat stuff. You need both in your toolkit.",
      metronome: 100,
      chordVoicings: { chords: ["F", "C", "E", "Dm", "Am"] },
      speedLadder: { start: 100, end: 150, increment: 10, bars: 4 },
      recorder: true,
      levelUp: "Can play F-C-E-Dm-Am at 140+ BPM with clean chord transitions, constant arm motion, and ghost strums — sounding energetic and joyful, not frantic."
    },

    // ─── IMPROV: BLUES CALL-AND-RESPONSE ───

    {
      id: "gs-2-10",
      time: 8,
      title: "Blues Scale Improv — Call and Response with Dynamics",
      type: "guitar",
      what: "Improvise over a backing track using the A blues scale. But here's the constraint: every phrase must have a dynamic contour — start quiet and build, or start loud and fade, or accent one note. No even-volume runs allowed. Combine everything: blues scale, bending, dynamic control, and behind-the-beat phrasing.",
      setup: "Guitar. Backing track. No metronome — play with the track's groove.",
      steps: [
        { text: "Play 3-note phrases from the A blues scale. Each phrase must have a dynamic shape: start quiet and build to the last note, OR start loud and taper off. No flat dynamics. Leave 4 beats of silence between phrases. 2 minutes.", why: "Dynamic contour within a phrase is what separates an improviser from someone running scales. A 3-note phrase that builds from whisper to shout tells a story. A 3-note phrase at even volume is a scale exercise." },
        { text: "Add bends to your phrases: at least one bend per phrase. Bend into the blue note (Eb), or bend from D to E (whole step). The bend should be the emotional peak of the phrase — the loudest, most expressive moment. 2 minutes.", why: "Bends as dynamic peaks create the classic blues guitar 'cry.' When the bend is the loudest note in the phrase, it becomes the emotional climax — the note the listener leans into." },
        { text: "Call and response with yourself: play a quiet 3-note phrase (the call), wait 4 beats, then answer with a louder variation (the response). The response should use the same notes but with more intensity — bigger bends, more volume, more attitude. 2 minutes.", why: "Call-and-response with dynamic contrast is the foundation of blues soloing. The call asks a question quietly, the response answers it boldly. This creates dramatic arc within improvisation." },
        { text: "Behind-the-beat phrasing: play your phrases slightly behind the backing track's groove. Let the notes land late, especially the bends — the bend starts behind the beat and arrives at the target pitch like it had all the time in the world. 2 minutes.", why: "Behind-the-beat phrasing in the blues scale creates the ultimate laid-back guitar sound. Khruangbin's Mark Speer plays this way constantly — his solos are behind the beat with space between every phrase. That's the target." },
        { text: "Full improv: 3 minutes over the backing track. Use everything — dynamic contour, bends, behind-the-beat feel, call-and-response phrasing. Remember: silence is your friend. 60% space, 40% notes. Record it.", why: "Extended improv with constraints (dynamics, bends, space) produces more musical results than 'play whatever.' The constraints channel your creativity into specific expressive goals. After this, listen back and find your best 10-second moment." }
      ],
      feel: "This should feel like telling a story with three notes and a bend — each phrase says something, the silence lets it land, the next phrase responds. You're not trying to shred or play fast. You're trying to make someone FEEL something with minimal notes and maximum expression.",
      wrong: "If you're playing continuous runs up and down the scale, you're doing a scale exercise, not improvising. STOP. Play 3 notes. WAIT. Play 3 more. The silence is at least as important as the notes. If all your phrases sound the same volume, exaggerate the dynamics — whisper the call, shout the response. If your bends are pitchy, go back to the target-note exercise (gs-2-7) and calibrate.",
      sarah: "Gene, this is where everything in Level 2 comes together — dynamics, behind-the-beat feel, bending, and blues scale over a groove. When you listen to Khruangbin's 'Texas Sun,' Mark Speer plays about 5 notes per phrase with massive space between them, and every note is dynamically shaped. That's the goal. Not more notes — more FEELING per note. Your recording from this exercise is your Level 2 report card.",
      fretboard: { scale: "am-pentatonic", position: 1, highlight: [] },
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }, { name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      recorder: true,
      levelUp: "Can improvise a 3-minute blues scale solo with dynamic contour in every phrase, at least one bend per phrase, behind-the-beat feel, and 60% silence — recorded and sounding expressive."
    },

    // ─── SPEED LADDER: BLUES SCALE ───

    {
      id: "gs-2-11",
      time: 6,
      title: "Blues Scale Speed Ladder",
      type: "guitar",
      what: "Build speed and fluency on the A blues scale — ascending and descending in clean, even notes. Start at 60 BPM and work up to 100. This is the mechanical fluency drill that makes your improv sound effortless. One focal point: speed and accuracy. No expression needed — just clean, even notes.",
      setup: "Guitar. Metronome starting at 60 BPM.",
      steps: [
        { text: "Play the A blues scale ascending and descending in eighth notes at 60 BPM. Every note should be the same volume, the same duration, perfectly locked to the metronome. 4 times through (ascending + descending = 1 rep).", why: "Even, clean runs at slow tempo build the mechanical foundation. When every note is equal, you'll hear any unevenness — buzzing frets, uneven timing, weak notes. Fix those before adding speed." },
        { text: "Increase to 70 BPM. Same drill: 4 clean reps of ascending + descending. Only move to 70 after 4 consecutive clean reps at 60. If you stumble, restart the count from zero.", why: "The 'restart from zero' rule ensures you're building genuine consistency, not passing on lucky runs. 4 clean reps in a row means the pattern is reliable, not accidental." },
        { text: "Continue the ladder: 80, then 90, then 100 BPM. Same rule: 4 clean reps before advancing. Write down where you stall — that's today's ceiling. Tomorrow, start 10 BPM below your ceiling and push through.", why: "Speed develops over days and weeks, not minutes. Your brain consolidates motor skills during sleep. Today's ceiling will be tomorrow's warm-up if you practice consistently and sleep well." },
        { text: "At your ceiling tempo, try the blues scale in GROUPS of 3 notes: A-C-D, C-D-Eb, D-Eb-E, Eb-E-G, E-G-A. Each group 4 times, then connect them. Groups break the scale into manageable chunks at speed.", why: "Grouping is a speed technique from classical guitar. Instead of thinking about 7 individual notes, you think about overlapping groups. Each group is a micro-pattern your fingers can automate." },
        { text: "Cool down: play the blues scale at 60 BPM with maximum expression — bends, dynamics, behind-the-beat. After the speed drill, returning to slow expressive playing reminds your hands that speed serves expression, not the other way around.", why: "Speed without expression is empty technique. This cool-down reconnects speed and feel. The ideal guitarist can play fast AND expressively — the speed ladder builds the first, the cool-down preserves the second." }
      ],
      feel: "The speed ladder should feel like an athletic drill — focused, disciplined, measurable. Each tempo step is a small victory. The cool-down at the end should feel like a reward — slow, expressive, free.",
      wrong: "If you're pushing to higher tempos with sloppy technique (buzzing notes, uneven timing), you're building bad habits at speed. SLOW DOWN. Clean at 80 beats sloppy at 100 every time. If you can't get past 70 today, that's fine — it's a baseline to beat tomorrow.",
      sarah: "Gene, this is the gym session of guitar practice — not glamorous, but it builds the physical foundation that makes everything else possible. When Mark Speer plays those fluid Khruangbin melodies, they sound effortless because he's done thousands of reps at slow tempo. The speed will come. Trust the ladder. And remember: if you hit a wall after 10 minutes, stop and try tomorrow. Sleep is when your brain wires the speed.",
      metronome: 60,
      fretboard: { scale: "am-pentatonic", position: 1, highlight: [] },
      speedLadder: { start: 60, end: 100, increment: 10, bars: 4 },
      levelUp: "Can play the A blues scale ascending and descending cleanly at 90+ BPM — every note even, no buzzing, locked to the metronome."
    },

    // ─── FULL PERFORMANCE ───

    {
      id: "gs-2-12",
      time: 10,
      title: "Full Performance: Close My Eyes — The Complete Feel",
      type: "guitar",
      what: "Put it all together. Play Close My Eyes (D-Bm-G-A) as a complete 3-minute performance with everything you've learned: behind-the-beat feel, ghost strums, dynamic verse/chorus shaping, and blues scale embellishments between chord sections. Record the whole thing. This is your Level 2 graduation piece.",
      setup: "Guitar. Metronome at 104 BPM. Recording ready.",
      steps: [
        { text: "Structure your performance: bars 1-16 are the verse (quiet, behind-the-beat, ghost strums). Bars 17-24 are a build (gradually louder, more full strums). Bars 25-32 are the chorus (full dynamic, confident strumming, still behind the beat). Then back to verse. Map this out before you start.", why: "Planning a dynamic arc before performing is what separates a performance from noodling. Even with only four chords, the dynamic journey keeps the listener engaged. Verse = whisper, build = crescendo, chorus = full — then reset." },
        { text: "Between the chorus and the second verse, play a 4-bar blues scale fill — a short melodic phrase using the A blues scale with a bend. This is your 'instrumental break.' Keep it simple: 3-4 notes, one bend, lots of space.", why: "The blues scale fill between sections adds variety and shows off your new melodic vocabulary. Keeping it short and simple (3-4 notes) ensures it serves the song rather than derailing it. You're a rhythm guitarist adding a touch of lead, not soloing." },
        { text: "Run the full structure twice through (verse-build-chorus-fill-verse-build-chorus). That should be about 2.5-3 minutes. Focus on smooth transitions between dynamic levels — no sudden jumps, just gradual swells and fades.", why: "Two full cycles gives you enough time to settle into the groove and make adjustments. The second cycle should feel more natural than the first — that's your real-time learning kicking in." },
        { text: "Record the full performance from start to finish. Don't stop for mistakes — if you flub a chord change or miss a bend, keep going. Real performance means recovering from errors without stopping.", why: "Performance recording with no restarts builds the most important live skill: recovery. A missed chord in bar 6 doesn't matter if you lock back in by bar 7. Stopping and restarting every time builds perfectionism, not musicianship." },
        { text: "Listen back. Grade yourself on feel (behind-the-beat? ghost strums audible?), dynamics (verse quieter than chorus?), embellishments (blues scale fill musical?), and overall groove (would you nod your head to this?). Write down one thing you'd improve.", why: "Self-assessment after recording is the fastest path to improvement. You're building critical listening skills alongside playing skills. The one thing you'd improve becomes the first thing you practice next session." }
      ],
      feel: "This should feel like performing a real song for an audience — committed, expressive, flowing. Even though it's just you in a room, play like the performance matters. The commitment to the feel is what makes the recording sound real.",
      wrong: "If the performance sounds like an exercise (perfectly even, no dynamics, stiff timing), you're playing it safe. Commit to the behind-the-beat feel even if it feels weird. Push the dynamics even if the quiet parts feel 'too quiet.' The recording will reveal whether you went far enough — usually you need to exaggerate more than you think.",
      sarah: "Gene, this is your Level 2 capstone — everything you've learned wrapped into one recording. Close My Eyes by The Lagoons is perfect for this because it demands FEEL over technique. The chords are simple. The rhythm is simple. What makes it beautiful is the behind-the-beat dreaminess, the dynamic breathing, the ghost strums that give it life. When you play this back and it sounds like a warm sunset instead of a chord exercise, you've graduated Level 2. Keep this recording — in six months you'll listen back and hear how far you've come.",
      metronome: 104,
      chordVoicings: { chords: ["D", "Bm", "G", "A"] },
      fretboard: { scale: "am-pentatonic", position: 1, highlight: [] },
      recorder: true,
      levelUp: "Record a 3-minute performance of D-Bm-G-A at 104 BPM with clear dynamic verse/chorus contrast, behind-the-beat feel throughout, ghost strums, and at least one blues scale fill — then listen back and confirm it grooves."
    }
  ]
};
