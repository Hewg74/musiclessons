import { getPitchRange } from "../appData.js";

export const level11 = {
  level: 11,
  title: "Fingerpicking",
  subtitle: "Thumb and fingers. Two voices from one guitar. The intimate sound.",
  description:
    "The pick goes away (or gets tucked). Your thumb becomes an independent bass player, your fingers become a melody instrument, and suddenly one guitar sounds like two. You'll learn PIMA technique, the six-note roll, Travis picking, Hermanos Gutiérrez's percussive gallop, and Jack Johnson's Breakdown — all building toward the moment your thumb and fingers become independent voices.",
  artists: "Jack Johnson, Hollow Coves, Hermanos Gutiérrez, Tommy Guerrero",
  unlocks: "Dynamics & Expression (Level 12)",
  review: {
    label: "Level 10 Check-In",
    time: 5,
    exercises: ["gs-10-3", "gs-10-9"],
    prompt: "Play an Afrobeat-style interlocking guitar pattern (gs-10-3). Then play a Tommy Guerrero-style finger-picked melody (gs-10-9). Global colors are flowing? Time to formalize fingerpicking."
  },
  exercises: [

    // ─── PHASE 1: PIMA BASICS ───

    {
      id: "gs-11-1",
      time: 8,
      title: "PIMA — Assigning Your Fingers",
      type: "guitar",
      what: "Your right hand has four voices, each with a name and a string assignment. P (pulgar/thumb) owns the bass strings. I (index) plays string 3. M (middle) plays string 2. A (anular/ring) plays string 1. This exercise assigns each finger to its string and builds the muscle memory so deeply that the assignments become unconscious.",
      setup: "Guitar. No pick — set it aside. Clean tone, neck pickup for warmth. Metronome at 60 BPM.",
      steps: [
        { text: "Hold your right hand over the soundhole with your wrist relaxed and slightly arched — not collapsed flat against the body. Rest your thumb (P) on string 5 (A string). Rest I on string 3 (G), M on string 2 (B), A on string 1 (high E). All four contact points at once. This is your 'home position.' Hold it for 10 seconds and feel the strings under your fingertips.", why: "The home position is the foundation of all fingerpicking. Every pattern starts and returns here. Feeling all four strings simultaneously builds spatial awareness — your fingers learn where their strings live without looking." },
        { text: "Pluck each finger one at a time, slowly: P (string 5), then I (string 3), then M (string 2), then A (string 1). One pluck per metronome click at 60 BPM. After each pluck, return the finger to its string. Say the letter out loud as you pluck: 'P... I... M... A.' 8 repetitions.", why: "Saying the finger name while plucking creates an auditory-motor link — your brain maps the name to the motion to the sound. This naming convention (from classical guitar) is universal. Every fingerpicking tutorial, method book, and teacher uses PIMA." },
        { text: "Reverse: A-M-I-P. One pluck per click, 60 BPM, 8 repetitions. Say each letter. Notice how different this direction feels — descending from the thin strings to the thick bass. Both directions need to feel natural.", why: "Ascending and descending patterns are the two halves of fingerpicking fluency. Most beginners only practice ascending (P-I-M-A) and struggle when patterns require the reverse direction." },
        { text: "Now fret an Am chord with your left hand. Play the same P-I-M-A pattern. The chord gives the pattern harmonic context — suddenly it sounds like music, not just a finger exercise. 8 repetitions at 60 BPM.", why: "Adding a chord transforms the exercise from mechanical to musical. The Am chord lets you hear how PIMA creates an arpeggio — the same notes the chord contains, but heard one at a time. This is the seed of every fingerpicking pattern." },
        { text: "Variation: P on string 6 (low E) instead of string 5. Play P-I-M-A on Am again. The bass note is now E instead of A — hear how the chord has a different bottom? This is your first taste of bass voice independence. P can choose which bass note to play.", why: "The thumb's ability to move between bass strings is what separates simple arpeggios from real fingerpicking. In Travis picking (coming in exercise 5), the thumb alternates between two bass strings constantly. This step plants the seed." }
      ],
      feel: "Your right hand should feel relaxed and naturally curved, like you're holding a tennis ball lightly. Each finger plucks with a gentle pull toward the palm — not a violent yank. The sound should be warm and round, not scratchy or harsh. When all four fingers find their strings without looking, you've arrived.",
      wrong: "If your wrist is flat against the guitar body, arch it slightly — a collapsed wrist limits finger mobility. If you're plucking with your fingernails scraping the string, angle your fingertips so the fleshy pad contacts first. If your hand is tense and cramping, shake it out — tension is the enemy of fingerpicking. Breathe.",
      sarah: "Gene, Tommy Guerrero doesn't use a pick at all — everything is fingerpicked. That warm, intimate sound on his records? It's PIMA, just like this. Hermanos Gutiérrez are classical fingerpickers — Estevan and Alejandro both trained with these exact finger assignments. You're learning the same technique they use on El Bueno y El Malo and Hoy Como Ayer.",
      metronome: 60,
      levelUp: "Play P-I-M-A and A-M-I-P over Am at 60 BPM, 8 clean repetitions each direction, without looking at your right hand. Each finger returns to its home string after each pluck."
    },

    // ─── THE SIX-NOTE ROLL ───

    {
      id: "gs-11-2",
      time: 8,
      title: "The Six-Note Roll — P-i-m-a-m-i",
      type: "guitar",
      what: "The most important fingerpicking pattern in all of guitar. P plucks the bass, then i-m-a ascend to the highest string, then m-i descend back. Six notes, continuous loop. This rolling pattern is the foundation of folk fingerpicking, classical guitar, bossa nova, and everything Jack Johnson plays. Master this one pattern and you can fingerpick for the rest of your life.",
      setup: "Guitar. Am chord. Metronome at 50 BPM (yes, fifty — this needs to be slow).",
      steps: [
        { text: "Fret Am. Play the pattern note by note at 50 BPM: P (string 5) - i (string 3) - m (string 2) - a (string 1) - m (string 2) - i (string 3). That's one cycle — six notes. The fingers go up (i-m-a) then back down (m-i), creating a rolling wave. Play 4 cycles, one note per click.", why: "At 50 BPM with one note per click, you have time to think about each finger. The ascending-descending pattern creates the classic fingerpicking 'roll' — a wave that washes up and retreats. This is the DNA of fingerpicked guitar across every genre." },
        { text: "Now connect cycles: after the last 'i' of cycle 1, the thumb (P) immediately starts cycle 2. The roll becomes continuous — P-i-m-a-m-i-P-i-m-a-m-i — an infinite wave. No pause between cycles. Let it flow for 30 seconds.", why: "The continuous roll is where the magic happens. When there's no gap between cycles, the pattern becomes a texture — a shimmering arpeggio that listeners don't hear as individual notes but as a single flowing sound." },
        { text: "Increase to 60 BPM. The roll should feel smoother now — less thought per note, more flow. If any notes are uneven (some louder than others), focus on making them all equal volume. The roll should shimmer evenly, not lurch.", why: "Even volume across all six notes is what makes fingerpicking sound professional. Most beginners play the thumb too loud and the ring finger (a) too quiet. Listen critically and equalize." },
        { text: "Try the roll with eyes closed. Can your fingers find the strings without visual guidance? If so, you're developing the spatial memory that lets fingerpickers watch the audience instead of their hands.", why: "Eyes-closed practice accelerates spatial learning. Your fingers need to know where strings 1, 2, 3, and 5 live relative to each other — not by sight, but by touch. This is how professional fingerpickers play." },
        { text: "If you can't sleep tonight, don't force it. Just practice the roll for 5 minutes and stop. Your brain consolidates motor patterns during sleep — tomorrow's attempt will be smoother than today's, even without extra practice.", why: "Sleep consolidation is real neuroscience. Motor skills practiced before sleep show measurable improvement the next day. If the roll feels frustrating tonight, trust the process — your sleeping brain is doing the work." }
      ],
      feel: "The roll should feel like a wave — a smooth, continuous motion that your hand does almost automatically. When it clicks, you'll feel your hand 'breathing' with the pattern rather than commanding each finger individually. The sound is a gentle shimmer, not a series of discrete plucks.",
      wrong: "If notes are uneven (thumb too loud, ring finger too quiet), play the roll at 40 BPM and listen critically to each note's volume. If the pattern 'stutters' at the turnaround points (a→m and i→P), those transitions need isolated practice — just play a-m-i-P-i-m over and over until the direction changes feel seamless.",
      sarah: "Gene, this one pattern is behind almost every fingerpicked song you've ever heard. Jack Johnson's Breakdown? Six-note roll. Hollow Coves' Coastline? Variation of the roll. Nick Drake? Roll. Elliott Smith? Roll. It's the universal fingerpicking DNA. Learn it once, deep, and it's yours forever.",
      metronome: 50,
      levelUp: "Play continuous P-i-m-a-m-i roll over Am for 60 seconds at 60 BPM with even note volume and no pauses between cycles."
    },

    // ─── ROLLING THROUGH CHORD CHANGES ───

    {
      id: "gs-11-3",
      time: 10,
      title: "Rolling Through Changes — Am→C→G→Em",
      type: "guitar",
      chordVoicings: { chords: ["Am", "C", "G", "Em"] },
      what: "The six-note roll meets chord changes. Your right hand keeps the P-i-m-a-m-i pattern running on autopilot while your left hand changes chords underneath. The roll stays constant — only the chord shapes change. This is the fundamental skill of fingerpicking: right hand on autopilot, left hand making the music.",
      setup: "Guitar. Metronome at 50 BPM. Progression: Am (2 bars) → C (2 bars) → G (2 bars) → Em (2 bars).",
      steps: [
        { text: "Start with the roll on Am for 2 bars (12 notes = 2 complete rolls). On bar 3, switch to C while keeping the roll going. The right hand does NOT stop during the chord change — it keeps rolling even if the left hand is mid-transition and some notes buzz. 2 bars of C, then switch to G.", why: "The cardinal rule of fingerpicking: the right hand NEVER stops. If the chord change causes a brief buzz or missed note, that's acceptable. Stopping the roll to get a clean chord change is the wrong instinct — it breaks the flow that makes fingerpicking work." },
        { text: "Notice the bass note changes: Am has P on string 5 (A), C has P on string 5 (C), G has P on string 6 (G), Em has P on string 6 (E). The thumb must know which bass string to hit for each chord. Practice just the thumb on each chord's bass note: A... C... G... E... one per bar.", why: "The thumb's bass note defines the chord's bottom voice. Wrong bass note = wrong chord, even if the left hand shape is correct. Each chord has a 'correct' bass string, and the thumb must move between strings 5 and 6 during changes." },
        { text: "Full progression with continuous roll at 50 BPM. Am (2 bars, P on string 5) → C (2 bars, P on string 5) → G (2 bars, P on string 6) → Em (2 bars, P on string 6). Loop the whole thing 3 times without stopping.", why: "Three full loops at slow tempo builds the muscle memory for both the chord changes AND the thumb's bass string selection. By the third loop, the transitions should start feeling automatic." },
        { text: "Once clean at 50, bump to 60 BPM. The faster tempo reveals which transitions are still rough. Mark the rough spots — those get isolated practice tomorrow. Don't force past 60 until every transition is clean.", why: "Speed reveals weakness. At 60 BPM, the transitions you barely survived at 50 will either solidify or collapse. Either outcome is useful information — success means progress, failure pinpoints what needs work." },
        { text: "Final pass: play the full progression at 60 BPM with your eyes closed. The roll is on autopilot. The chord changes happen by feel. Listen to the music you're making — four chords, one rolling pattern, and it already sounds like a real fingerpicked song.", why: "Eyes-closed playing integrates everything — right hand pattern, left hand shapes, bass note selection, chord timing. When you can do this, you're genuinely fingerpicking, not just doing a finger exercise." }
      ],
      feel: "The roll should feel like a river flowing over changing terrain — the water (right hand) never stops, even as the landscape (chords) shifts underneath. Each chord change adds a new color to the shimmering roll. When it flows, it feels meditative.",
      wrong: "If you stop the roll during chord changes, you're prioritizing clean chords over continuous flow. Flip that priority — keep the roll going and accept a brief buzz during transitions. The buzz will disappear with practice; a broken roll never fixes itself. If the thumb keeps hitting the wrong bass string, practice just the bass notes (no roll) through the progression until the string changes are automatic.",
      sarah: "Gene, this Am→C→G→Em progression is the same chord family as half the songs in your playlist. Fingerpicked, it sounds completely different from strummed — intimate, flowing, nocturnal. Jack Johnson built an entire career on this kind of simple fingerpicked progression. The magic isn't the chords — it's the unbroken flow of the roll.",
      metronome: 50,
      levelUp: "Play Am→C→G→Em with continuous P-i-m-a-m-i roll at 60 BPM for 3 full loops without breaking the roll during any chord change."
    },

    // ─── SONG STUDY: BREAKDOWN ───

    {
      id: "gs-11-4",
      time: 12,
      title: "Song Study: Breakdown — Jack Johnson",
      type: "guitar",
      chordVoicings: { chords: ["G", "Bm", "Em", "D"] },
      tracks: [{ name: "A Major Folk 80", src: "/a-major-folk-80.mp3" }],
      recorder: true,
      what: "Jack Johnson's Breakdown is fingerpicking at its most inviting — four chords (G-Bm-Em-D) with a capo on fret 5, Travis-style picking at a lazy 75 BPM. This song is the perfect bridge between the six-note roll you've been practicing and Travis picking (coming next). The capo moves everything up to the key of C but you play comfortable open shapes.",
      setup: "Guitar. Capo on fret 5. Clean tone. Metronome at 65 BPM (start slower than the record). Learn the chord shapes first, then add the picking pattern.",
      steps: [
        { text: "Capo on fret 5. Fret a G shape — with the capo, this sounds as C. Strum it. Then Bm (x24432 relative to capo — use the barre shape). Then Em. Then D. Play each chord 4 times, strumming, just to get the shapes under your fingers in this capo position.", why: "Capo changes the sound but not the shapes. Playing the shapes first with a simple strum lets you focus on left-hand comfort before adding the right-hand pattern. Bm is the trickiest shape — if it's clean here, everything else will flow." },
        { text: "Now fingerpick. On G: P plays string 6 (bass note G), then i-m alternate on strings 3 and 2. Jack Johnson's pattern isn't a pure six-note roll — it's more of a thumb-finger alternation where P provides a steady bass pulse while i and m dance on top. Try: P...i-m...P...i-m at 65 BPM.", why: "Johnson's picking pattern is simpler than a full classical roll — it's Travis-adjacent, with the thumb as an anchor and two fingers doing the melodic work. This two-finger approach (i-m) is more accessible than full PIMA and still sounds gorgeous." },
        { text: "Apply the same picking pattern to Bm (P on string 5), Em (P on string 6), and D (P on string 4). Each chord gets its correct bass string. Play the full progression: G(P6)→Bm(P5)→Em(P6)→D(P4), 2 bars each, continuous picking.", why: "The bass note jumping between strings 6, 5, and 4 is the hidden complexity of this song. The top-voice pattern stays the same — i-m on strings 3 and 2 — but the thumb navigates the bass independently. This is pre-Travis picking." },
        { text: "Play along with the original recording (or find it on YouTube). Jack plays at roughly 75 BPM. If 75 feels rushed, stay at 65 and gradually increase. Match his feel: lazy, behind the beat, like a hammock swaying. Nothing in this song is in a hurry.", why: "Playing along with the record trains your ear to match feel, not just notes. Johnson's genius is in the laziness — every note arrives slightly late, slightly relaxed. The notes are simple; the feel is everything." },
        { text: "Record yourself playing the full song progression for 2 minutes. Listen back. Does it sound like a song, or does it sound like an exercise? The difference is in the dynamics — let some notes be softer, some louder. Let the bass notes be warm and round. Let the treble notes shimmer.", why: "Self-recording reveals the gap between 'playing the notes' and 'making music.' Dynamic variation — some notes singing, others whispering — is what transforms a fingerpicking pattern into a performance." }
      ],
      feel: "This should feel like sitting on a porch with a coffee. Unhurried, gentle, warm. The guitar almost plays itself. If you're straining or concentrating hard, you're working too hard — Jack Johnson looks half asleep when he plays this. That relaxation IS the technique.",
      wrong: "If the Bm chord buzzes, check that your barre finger is pressing firmly and evenly across all strings. If the picking pattern sounds mechanical and evenly spaced, you're playing like a machine instead of a human — vary the timing slightly, let some notes ring longer. If the thumb keeps hitting the wrong bass string during chord changes, isolate just the bass notes through the whole progression until they're automatic.",
      sarah: "Gene, Jack Johnson is the king of simple fingerpicking. His whole philosophy is 'less is more' — three or four chords, a gentle picking pattern, and a voice. Breakdown is his signature sound. The capo on 5 puts you in the key of C, which is bright and warm. When you play this on a quiet evening, you'll understand why Johnson sells out arenas with a nylon-string guitar and bare feet. The secret sauce of Breakdown is the percussive thumb slap — Jack Johnson's thumb strikes the strings on beats 2 and 4, creating a snare-drum simulation within the fingerpicking pattern. This is what gives the song its groove without a drummer. Also listen for the descending bass walk in the chorus: the bass note drops from G down to D/F# (2nd fret low E) down to Em — that walk creates forward motion. In Breakdown, the guitar IS the entire band — there's no drummer. Your Travis picking provides the bass (thumb), the harmony (fingers), and the percussion (thumb slaps on beats 2 and 4). The voice sits on TOP of this complete rhythm section. The guitar never drops out because without it, there's nothing. This is the ultimate guitar-as-accompaniment exercise.",
      metronome: 65,
      levelUp: "Play the full Breakdown progression (G-Bm-Em-D, capo 5) with continuous fingerpicking at 75 BPM for 3 minutes without breaking the pattern. The bass notes land on the correct strings for each chord."
    },

    // ─── TRAVIS PICKING ───

    {
      id: "gs-11-5",
      time: 12,
      title: "Travis Picking — The Alternating Thumb",
      type: "guitar",
      chordVoicings: { chords: ["C", "G", "Am", "Em"] },
      what: "The hardest exercise in this level — and one of the most rewarding in the entire curriculum. Travis picking means your thumb (P) alternates between two bass strings on every beat (boom-chuck, boom-chuck) while your fingers (i, m) pick a melody on top. The thumb becomes a bass player. The fingers become a vocalist. Two independent voices from one guitar. This is the technique that earned Merle Travis, Chet Atkins, Tommy Emmanuel, and Jack Johnson their reputations.",
      setup: "Guitar. C chord. Metronome at 40 BPM (yes, forty — this is HARD). No backing track — you need silence to hear both voices.",
      steps: [
        { text: "Step 1: Thumb only. Fret a C chord. Your thumb alternates between string 5 (the C bass note) and string 4 (the E — the 3rd of the chord). Alternate: P on 5, P on 4, P on 5, P on 4. One pluck per metronome click at 40 BPM. This alternating bass IS Travis picking — everything else is decoration on top of this.", why: "The alternating thumb is the engine of Travis picking. If the thumb isn't rock-solid and automatic, nothing else will work. You must be able to alternate bass strings without thinking — the way a drummer's kick drum operates independently from the snare." },
        { text: "Step 2: Once the thumb alternation feels automatic (at least 30 seconds without a wrong string), add ONE finger note. Between the two thumb plucks, add 'i' on string 2. The pattern becomes: P(5)-i(2)-P(4)-i(2). Thumb bass, finger treble, thumb bass, finger treble. Four notes per bar at 40 BPM.", why: "Adding one finger note between thumb plucks creates the 'two voices' sensation. The bass (thumb) and treble (finger) create an interlocking pattern that sounds like two instruments. This is the breakthrough moment — when it clicks, you'll hear the bass and melody as separate voices." },
        { text: "Step 3: Add a second finger. The pattern expands: P(5)-i(2)-P(4)-m(1). Now the thumb alternates bass strings while two fingers alternate treble strings. Six notes per bar. This is full Travis picking. At 40 BPM, this is manageable. The thumb is independent. The fingers are independent. They interlock.", why: "Full Travis picking requires genuine limb independence — your thumb does its thing, your fingers do their thing, and they coexist without interfering. This is the same type of independence a pianist develops between left and right hands." },
        { text: "If you can't get Step 3, stop and go back to Step 1. Practice the thumb alternation for 5 minutes, then try again tomorrow. This exercise specifically benefits from sleep consolidation — the neural pathways for independence need overnight processing. Forcing it in one session rarely works.", why: "Travis picking independence is one of the hardest skills in guitar. It literally requires your brain to build new neural pathways for independent finger control. Sleep consolidation is not optional here — it's essential. Many guitarists take 2-3 weeks of daily practice before the thumb becomes truly independent." },
        { text: "Once Step 3 works on C, try it on G: thumb alternates between string 6 (G) and string 5 (B), fingers play i(2) and m(1). Then Am: thumb alternates string 5 (A) and string 4 (E). Each chord has its own thumb pair. Play C→G→Am→Em, 2 bars each, Travis pattern.", why: "Moving the Travis pattern through chord changes while maintaining thumb independence is the graduation test. Each chord changes the thumb's bass string pair, and the fingers must keep their pattern uninterrupted. When this flows, you own Travis picking." }
      ],
      feel: "When Travis picking clicks, it feels like your thumb is a separate musician — a bass player who happens to share your hand. You stop thinking about the thumb and it just... goes. The melody floats on top like a singer riding a bass line. It's profoundly satisfying and a little surreal.",
      wrong: "The #1 mistake is trying to learn thumb and fingers simultaneously. Always start with THUMB ONLY for at least 30 seconds before adding fingers. If the thumb falters when you add fingers, the thumb isn't automatic yet — go back to thumb alone. The #2 mistake is going too fast. 40 BPM is not a suggestion — it's a prescription. Speed kills Travis picking practice.",
      sarah: "Gene, this is the exercise where a lot of guitarists plateau — and where the ones who break through gain a superpower. Jack Johnson, Tommy Emmanuel, John Mayer — they all had to grind this exact thumb independence. It took each of them weeks. Be patient. When the thumb goes on autopilot and the melody floats on top, you'll feel like you've unlocked a cheat code. One guitar, two voices. It's why fingerpickers smile when they play.",
      metronome: 40,
      speedLadder: { start: 40, end: 80, increment: 10, bars: 4 },
      levelUp: "Play the full Travis pattern (P-alternating-bass + i-m treble) over C for 30 seconds at 50 BPM without the thumb losing its alternation. Then play C→G→Am→Em with Travis pattern at 50 BPM without breaking."
    },

    // ─── PERCUSSIVE SLAP ───

    {
      id: "gs-11-6",
      time: 8,
      title: "Percussive Slap — The Hermanos Gutiérrez Gallop",
      type: "guitar",
      tracks: [{ name: "Cinematic Western 80", src: "/cinematic-western-80.mp3" }],
      what: "Hermanos Gutiérrez add percussive slaps between fingerpicked notes — Estevan's 'slap-horse' technique creates a galloping rhythm that sounds like hoofbeats across a desert landscape. The slap is a dead note: you hit the strings with the side of your thumb or palm, producing a percussive 'thwack' with no pitch. Mixed with fingerpicked notes, it adds a rhythmic pulse that no pick can replicate.",
      setup: "Guitar. Clean tone or slight reverb. Metronome at 70 BPM. Optional: Cinematic Western backing track.",
      steps: [
        { text: "First, learn the slap by itself. With your right hand open, lightly slap all six strings with the fleshy side of your thumb near the soundhole. It should produce a dead, percussive 'thwack' — no pitch, just rhythm. Like a snare drum hit on the guitar. Practice 8 slaps at 70 BPM.", why: "The slap is a rhythmic tool, not a tonal one. Isolating it first ensures you get a clean percussive sound. If you hear pitched notes ringing, you're pressing too lightly — commit to the slap so the strings are fully muted on contact." },
        { text: "Now alternate: fingerpick a note (P on string 5), then slap. Pick, slap, pick, slap. The 'pick' gives you melody, the 'slap' gives you rhythm. Two sounds alternating. This is the galloping engine of Hermanos Gutiérrez.", why: "The pick-slap alternation creates the 'gallop' — a rhythmic pattern that sounds like a horse trotting. The pitched note is the melodic voice, the slap is the percussive voice. Two textures from one hand." },
        { text: "Build the Hermanos pattern: P(bass note)... slap... i-m(two treble notes)... slap. Four events per beat. The bass provides the low voice, the slap provides percussion, the treble provides melody. It's a three-piece band in one hand.", why: "This four-event pattern is the core of Hermanos Gutiérrez's cinematic sound. Bass, percussion, melody, percussion — it has the rhythmic complexity of a full ensemble but it's all happening under your right hand." },
        { text: "Apply to an Am chord at 70 BPM. Then try Em. Then a slow Am→Em alternation. Turn on the Cinematic Western backing track and play along — the spaghetti-western feel of the track matches the Hermanos Gutiérrez aesthetic perfectly.", why: "The cinematic western track provides the tape-echo atmosphere that Hermanos Gutiérrez create with their Strymon El Capistan. Your dry guitar sound + the track's reverb = that vast, desert-at-sunset soundscape." },
        { text: "Experiment with slap intensity. A light slap is like distant hoofbeats. A hard slap is like a flamenco golpe. Hermanos Gutiérrez tend toward medium — assertive but not aggressive. Find your slap dynamic. Record a 1-minute passage.", why: "Slap dynamics control the rhythmic energy of the piece. Too light and the gallop disappears. Too hard and it sounds aggressive rather than cinematic. The sweet spot is where you feel the rhythm in your chest without it dominating the melody." }
      ],
      feel: "This should feel cinematic — dusty roads, desert sunsets, a lone rider. The gallop is not frantic; it's steady and hypnotic. Think of the rhythm base as milonga or cumbia — Latin American, not rock. When the bass note, slap, and treble notes interlock, you'll hear a mini-orchestra.",
      wrong: "If the slap produces ringing notes instead of a dead 'thwack,' you're not muting fully — press the side of your thumb/palm more firmly into the strings. If the slap disrupts your fingerpicking flow, practice the transition: note→slap→note slowly until the slap becomes a natural part of the rhythm, not an interruption.",
      sarah: "Gene, Hermanos Gutiérrez are Swiss-Ecuadorian brothers who play classical guitars through tape echo and vintage vibrato amps. The 'slap-horse' gallop is Estevan's signature — it's not rock, it's not classical, it's this beautiful cinematic thing rooted in Latin American rhythms. Their rhythm base is milonga and cumbia, not anything from the anglophone world. That's what gives it that exotic, timeless quality you hear on El Bueno y El Malo.",
      metronome: 70,
      recorder: true,
      levelUp: "Play the bass-slap-treble-slap galloping pattern over Am at 70 BPM for 30 seconds with clean slaps (no pitched notes ringing through) and consistent rhythm."
    },

    // ─── SONG STUDY: COASTLINE FEEL ───

    {
      id: "gs-11-7",
      time: 10,
      title: "Song Study: Coastline Feel — Hollow Coves",
      type: "guitar",
      chordVoicings: { chords: ["G", "Bm", "A", "D"] },
      tracks: [{ name: "A Major Folk 80", src: "/a-major-folk-80.mp3" }],
      recorder: true,
      what: "Hollow Coves' Coastline is gentle fingerpicking at its most beautiful — the original uses an alternate tuning (CGDGGD, capo 7), but the same emotional quality lives in standard tuning with G-Bm-A shapes. This exercise captures the FEEL of Coastline: airy, spacious, each note ringing into the next. Where Breakdown was lazy-warm, Coastline is open-sky luminous.",
      setup: "Guitar in standard tuning. Clean tone with reverb if available. Metronome at 70 BPM.",
      steps: [
        { text: "The core progression is G-Bm-A for the verse, adding D for the chorus. In standard tuning, play these with open voicings: G (320003), Bm (x24432), A (x02220), D (xx0232). Strum each chord once and let it ring — listen to the color of each chord. G is wide and bright. Bm is dark and yearning. A is warm and resolved.", why: "Knowing the emotional character of each chord helps you shape your fingerpicking dynamics. Brighter chords (G, A) get slightly lighter picking. Darker chords (Bm) get slightly more weight. This is how fingerpickers create narrative within a progression." },
        { text: "Apply a gentle fingerpicking pattern — not the six-note roll, but something more spacious. Try: P(bass)... wait... i(3)... m(2)... a(1)... wait. Leave gaps. Let notes ring and decay before the next one arrives. Coastline breathes — it's not a continuous stream.", why: "Not all fingerpicking is continuous rolling. Coastline's beauty is in the space between notes. Each note has room to resonate and decay. This 'spacious' fingerpicking is harder than it sounds — the instinct is to fill every beat." },
        { text: "Play the verse progression (G-Bm-A, 4 bars each) with this spacious picking. Let each chord sustain for its full 4 bars — the notes bloom and overlap, creating a haze of harmony. At 70 BPM, there's no rush.", why: "Sustaining each chord for 4 full bars tests your patience and your ability to make a single chord interesting through picking choices. Which notes do you emphasize? Which do you let ring? These micro-decisions are what make fingerpicking expressive." },
        { text: "Add the chorus shape: G-Bm-A-D. The D chord lifts the progression — it's the moment of arrival. Pick the D chord with slightly more energy than the others. Feel the lift. Then the verse returns and the energy settles back down.", why: "Dynamic shaping across a song form (verse = quiet, chorus = lift) is what separates 'playing a progression' from 'performing a song.' Even without vocals, your fingerpicking can tell a story through dynamics." },
        { text: "Play the full Coastline structure: Verse (G-Bm-A) × 2, Chorus (G-Bm-A-D) × 2. Record it. Listen back — does it sound like a song with a shape, or does it sound flat? The shape should be: settle... settle... lift... lift... settle.", why: "Self-listening for song structure is an advanced skill. When your fingerpicking creates audible verse-chorus contrast without vocals, you're playing like a songwriter, not just a guitarist." }
      ],
      feel: "Open sky. Salt air. Each note is a bird gliding — it floats, hangs, then another one follows. This isn't the campfire warmth of Breakdown — it's the wide-open coastal luminosity of dawn. If Breakdown is sitting on a porch, Coastline is standing on a cliff overlooking the ocean.",
      wrong: "If your picking is too busy (every beat filled with notes), pull back. Add silence. Leave beats empty. The Coastline feel lives in what you DON'T play as much as what you do. If the Bm barre chord buzzes, try an alternative voicing: x20230 (Bm with open strings) — less accurate but captures the airy quality.",
      sarah: "Gene, Hollow Coves are two guys from Australia — folk fingerpickers with that wide-open ocean sound. Coastline gets its massive, shimmering sound from the CGDGGD alternate tuning with capo on the 7th fret. The open drone strings ring out through the entire song — when the fingers pick the melody, the surrounding open strings create a wall of resonance. The verse is a rolling 16th-note arpeggio with hammer-ons integrated directly into the picking pattern. The chorus shifts to driving strumming, and because of the tuning, simply strumming open strings sounds enormous. In standard tuning you can't replicate this exactly, but the emotional core translates. The key is space — every note in Coastline has room to breathe. It's the opposite of busy. Think of it as the soundtrack to a sunrise surf check.",
      metronome: 70,
      levelUp: "Play the full Coastline structure (verse × 2, chorus × 2) with spacious fingerpicking at 70 BPM. The verse sections are noticeably quieter than the chorus sections. Record and verify the dynamic arc."
    },

    // ─── FINGERPICKED REGGAE ───

    {
      id: "gs-11-12",
      time: 8,
      title: "Gimme Love Revisited — Fingerpicked Reggae",
      type: "guitar",
      what: "In Level 4, you played Gimme Love (The Elovaters) as a strummed reggae exercise. Now explore a fingerpicked interpretation: thumb handling bass notes on the downbeat, fingers plucking syncopated notes on the higher strings, plus percussive string slaps on beats 2 and 4. Same three chords, transformed into a solo guitar arrangement.",
      setup: "Acoustic or clean electric. No pick — fingers only. Metronome at 75 BPM.",
      steps: [
        { text: "The thumb anchors: your thumb (P) plays the bass root of each chord on the downbeat. For F, that's the low E string. For C, that's the A string. For G, the low E string. Let the bass note ring.", why: "The alternating bass thumb is the rhythmic foundation. In fingerpicked reggae, the thumb does what the kick drum does — it marks the time." },
        { text: "Fingers pluck: after the thumb bass note, your index (i) and middle (m) fingers pluck the B and high E strings together in a syncopated rhythm. These plucks land on the off-beats — the 'and' of beats 2 and 4. Let a small gap between the thumb and the finger pluck.", why: "The syncopated gap between bass and treble creates the reggae 'bounce.' It's the same offbeat emphasis you learned in Level 4, but now divided between two hands instead of one strumming arm." },
        { text: "Add the percussive slap: on beats 2 and 4, slap the side of your thumb against the lower strings for a 'chk' sound — like a snare hit. This replaces or overlaps with the finger pluck to create a combined percussive-melodic sound.", why: "The thumb slap simulates a snare drum within the fingerpicking pattern. It's the same concept as Jack Johnson's Breakdown technique from earlier in this level — the guitar becomes a one-person rhythm section." },
        { text: "Chain F-C-G with the full fingerpicked pattern: thumb bass → pause → finger pluck + thumb slap → pause. Repeat for 2 minutes without stopping. Add hammer-ons within the chord shapes (e.g., hammering onto the 2nd fret of the G string while holding C) for melodic movement.", why: "Integrating the hammer-on into the fingerpicked pattern is what makes it sound like music rather than an exercise. The hammer-on adds a brief melody that weaves through the rhythm." }
      ],
      feel: "Laid-back and groovy, with a gentle bounce. Your thumb is the bass player, your fingers are the rhythm guitarist, and the slap is the drummer. All three in one hand.",
      wrong: "If the bass note and finger pluck happen at the same time, add more gap — the syncopation is everything. If the slap is too loud, lighten up — it should blend with the pluck, not overwhelm it. If your hand cramps, you're gripping too hard — keep the fingers relaxed and curved.",
      sarah: "Gene, remember Gimme Love from Level 4? You played F-C-G as a strummed reggae exercise. Now you're hearing what The Elovaters actually do — they fingerpick it. Same three chords, but the guitar becomes a whole rhythm section: bass, chords, and percussion all from one pair of hands. This is the same principle as Breakdown — the guitar replaces the band. Mastering this transforms you from someone who strums along to someone who commands the entire groove alone.",
      metronome: 75,
      levelUp: "Play F-C-G fingerpicked pattern at 75 BPM for 2 minutes with clear bass notes, syncopated finger plucks, and audible percussive slaps on beats 2 and 4.",
      recorder: true,
      chordVoicings: { chords: ["F", "C", "G"] }
    },

    // ─── DUO THINKING ───

    {
      id: "gs-11-8",
      time: 10,
      title: "Duo Thinking — Bass Voice + Melody Voice",
      type: "guitar",
      drone: { root: "A", octave: 2, texture: "warm" },
      fretboard: { scale: "am-pentatonic", position: 1 },
      what: "Reframe your guitar as TWO instruments: a bass (your thumb) and a melody instrument (your fingers). The thumb walks a simple bass line. The fingers play a simple melody on top. Neither voice is complex alone — but together they create the illusion of a duo. This is how Tommy Guerrero builds his instrumental records: melody-as-vocalist riding on a fingerpicked bass line.",
      setup: "Guitar. Am position. Drone on A. Metronome at 60 BPM.",
      steps: [
        { text: "Bass voice only: your thumb plays a slow bass line using the low strings. On Am, walk: A (string 5 open)... E (string 6 open)... A... G (string 6 fret 3). Quarter notes, one per beat. Simple, repetitive, like a bass player in a dub band. Loop this for 30 seconds until it's on autopilot.", why: "The bass voice must be automatic before you add melody. Tommy Guerrero's bass lines are deliberately simple — one or two notes, repetitive, hypnotic. They exist to anchor the melody, not to impress." },
        { text: "Melody voice only: using i and m on strings 1 and 2, play a simple Am pentatonic melody. Just 3-4 notes, half notes or quarter notes. Hum while you play — if you can hum the melody, it's singable, which means it's a real melody and not just notes.", why: "The melody voice should be singable — Tommy Guerrero's guitar melodies are vocal lines played on guitar. If you can't hum it, it's too complicated. Simplify until you can sing along with your own playing." },
        { text: "Now combine: thumb plays the bass pattern from Step 1. Fingers play the melody from Step 2. Start at 50 BPM. The bass and melody happen simultaneously — your thumb is one musician, your fingers are another. This is duo thinking.", why: "Combining bass and melody is where fingerpicking becomes truly musical. The two voices create counterpoint — two independent lines that complement each other. This is the fundamental concept behind all solo guitar music." },
        { text: "If the combination falls apart, simplify both parts. Make the bass a single repeated note (A on string 5, every beat). Make the melody two notes alternating on one string. The simplest possible duo. When that works, gradually add complexity to one voice at a time.", why: "Complexity is the enemy of independence. When two voices are fighting for attention in your brain, both suffer. Start absurdly simple and grow each voice independently — add one note to the bass, or one note to the melody, never both at once." },
        { text: "Extended duo thinking: 2 minutes of improvised melody over the repeating bass pattern. Let the melody wander through the Am pentatonic shape while the thumb holds down the bass. The drone provides harmonic support. Record it.", why: "Extended improvisation in duo mode builds the independence that makes fingerpicking compositions possible. Tommy Guerrero's albums are essentially this: simple bass, improvised melody, hypnotic result." }
      ],
      feel: "This should feel like you're two musicians — a bassist and a melodic player who happen to share one guitar. When the independence clicks, your awareness splits: you hear the bass as one voice and the melody as another. It's a meditative, almost trance-like feeling.",
      wrong: "If the bass pattern changes when the melody enters, the bass isn't automatic yet — go back to Step 1 and loop it longer. If the melody sounds random (not singable), simplify to 2-3 notes and make a real phrase before expanding. If your right hand tenses up, shake it out — duo thinking requires relaxation, not effort.",
      sarah: "Gene, this is Tommy Guerrero's entire approach — he told an interviewer that he thinks of his guitar as 'a bass player and a horn player.' His melodies on Soul Food Taqueria and Loose Grooves are vocal lines — you could sing every one. The bass underneath is hypnotic repetition. Two simple voices, one deep result. That's duo thinking.",
      metronome: 60,
      recorder: true,
      levelUp: "Improvise a melody over a repeating bass pattern in Am for 2 minutes at 60 BPM. The bass pattern stays consistent throughout while the melody varies. Both voices are clearly audible as separate lines."
    },

    // ─── PICK TUCK ───

    {
      id: "gs-11-9",
      time: 6,
      title: "Pick Tuck — Switching Mid-Song",
      type: "guitar",
      what: "Real songs don't stay fingerpicked forever — sometimes you need to switch between pick and fingers mid-song. The pick tuck is a sleight-of-hand move: curl your pick between your index finger and thumb pad, switch to fingerpicking, then uncurl to resume picking. Practice until the transition is invisible. No fumbling, no dropping the pick, no dead air.",
      setup: "Guitar with pick. Any comfortable chord. Metronome at 70 BPM.",
      steps: [
        { text: "Hold your pick normally between thumb and index finger. Now curl your index finger inward so the pick slides between the side of your index finger and the pad of your thumb. The pick is still held, but your fingertips (i, m, a) are now free to pluck strings. Practice this curl motion 10 times without the guitar — just the hand motion. Pick position → tuck → fingers free.", why: "The pick tuck is a physical skill that needs isolation before applying it to music. Like a card trick, the sleight-of-hand must be practiced until it's automatic. 10 repetitions without the guitar builds the muscle memory for the curl." },
        { text: "Now with the guitar: strum 4 bars of Am with the pick. At the end of bar 4, tuck the pick and immediately start the six-note roll (P-i-m-a-m-i) for 4 bars. The transition should take less than one beat — no dead silence, no fumbling.", why: "The transition speed defines whether the pick tuck is useful in performance. A clean 1-beat transition is invisible to listeners. A 2-bar fumble breaks the musical flow. Practice until the switch is a hiccup, not a pause." },
        { text: "Reverse: after 4 bars of fingerpicking, uncurl the pick back to playing position and strum 4 bars. The uncurl is harder than the tuck — practice it separately. Pick uncurl → immediate strum. No pause.", why: "Going back to the pick is the harder direction because you need to reposition the pick precisely. Many guitarists master the tuck but fumble the return. Practice the uncurl with equal attention." },
        { text: "Full transition loop: 4 bars strum → tuck → 4 bars fingerpick → uncurl → 4 bars strum → tuck → 4 bars fingerpick. At 70 BPM. Every transition clean. No dropped picks, no dead air, no fumbling.", why: "Repeated transitions build the motor pattern for both directions. By the 4th cycle, the tuck and uncurl should feel like shifting gears in a car — a brief, smooth motion that doesn't interrupt the driving." },
        { text: "Apply to a real scenario: strum the G-C-D progression hard and driving (verse energy), then tuck and fingerpick Am-Em gently (bridge/quiet section), then uncurl and strum the verse again. This is how real songs use the pick tuck — energy changes mid-song.", why: "The pick tuck serves musical dynamics. Strummed sections are louder and more energetic. Fingerpicked sections are intimate and quiet. The ability to switch between them mid-song gives you dynamic range that strumming-only or fingerpicking-only players lack." }
      ],
      feel: "The pick tuck should feel like a magic trick — one second you're holding a pick, the next your fingers are free, and the audience never sees the switch. When it's smooth, it's like changing gears in an automatic transmission. When it's rough, it's like grinding gears in a manual. Practice until it's automatic.",
      wrong: "If you drop the pick during the tuck, you're releasing too much — keep the pick firmly between thumb pad and index finger side. If the transition takes more than one beat, slow down the surrounding music and practice the switch in isolation: pick position, tuck, finger pluck, done. If the uncurl puts the pick at a weird angle, practice re-gripping without looking.",
      sarah: "Gene, this is a real-world skill that separates bedroom players from performing musicians. Jack Johnson tucks his pick constantly — verse fingerpicked, chorus strummed, bridge fingerpicked. The audience never sees it happen. Once you own this, you can design your own songs with dynamic shifts that most guitarists can't execute.",
      metronome: 70,
      levelUp: "Execute 4 clean strum→fingerpick→strum transitions at 70 BPM with no dropped picks, no dead beats, and transition time under 1 beat each."
    },

    // ─── FINGERPICKED IMPROV ───

    {
      id: "gs-11-10",
      time: 10,
      title: "Fingerpicked Improv — Melody Over Changes",
      type: "guitar",
      fretboard: { scale: "am-pentatonic", position: 1 },
      tracks: [{ name: "Bossa Nova 75", src: "/bossa-nova-75.mp3" }, { name: "Drums Only — Bossa 75", src: "/drums-bossa-75.mp3" }],
      recorder: true,
      what: "Combine everything from this level: your thumb provides a bass note for each chord, your fingers improvise a melody using Am pentatonic on top. The bossa nova backing track provides groove. You are now a duo — a bass player and a melody player sharing one instrument. Improvise freely. There is no wrong here — only exploration.",
      setup: "Guitar. Am pentatonic position. Bossa nova backing track. Metronome optional (the track has pulse). Record from the start.",
      steps: [
        { text: "Start the backing track. For the first minute, just play bass notes with your thumb — one per bar, matching the chord roots. Let the track do the work. Your thumb is a bass player warming up, finding the groove, settling in.", why: "Starting with bass only lets you lock into the track's groove before adding melodic complexity. The bass voice grounds everything — it's the foundation the melody will float on top of." },
        { text: "After a minute, add melody notes with i and m. Keep it sparse — 2-3 melody notes per bar, placed between the thumb's bass notes. Let the melody breathe. Think Tommy Guerrero: melody-as-vocalist, every note earns its place.", why: "Sparse melody over simple bass is the sweet spot for early duo improvisation. The temptation is to play too many notes. Fight that. Each melody note should feel intentional — like you chose it specifically, not like your fingers just landed there." },
        { text: "Gradually increase melody density. By minute 3, you might be playing 4-6 melody notes per bar while the thumb keeps its steady bass. Don't force it — let the density increase naturally as your confidence grows.", why: "Natural density growth (rather than forced complexity) produces more musical results. Your musical instinct knows when to add and when to hold back — trust it over your ego." },
        { text: "Try the percussive slap between sections. A bar of fingerpicking, then a bar with slap-gallop rhythm, then back to fingerpicking. Mix textures. You now have three voices: bass, melody, and percussion.", why: "Adding the Hermanos Gutiérrez slap creates textural variety that keeps the improvisation interesting over longer stretches. Three voices from one guitar — the full fingerpicking toolkit." },
        { text: "Final minute: simplify back down to just bass and 1-2 melody notes. End quieter than you started. Record the whole thing — 5 minutes of fingerpicked improvisation. Listen back for your best moments.", why: "The arc of an improvisation — build up, peak, wind down — is what makes it feel like a complete musical statement rather than noodling. Starting and ending simple, with complexity in the middle, creates natural drama." }
      ],
      feel: "This should feel like a conversation with the backing track — you're responding to the bossa groove, not imposing on it. When the melody and bass interlock over the groove, it feels like three musicians playing together. Relaxed, groovy, intimate.",
      wrong: "If the melody overwhelms the bass, you're playing too many treble notes — pull back and let the thumb anchor you. If everything sounds random, limit yourself to 3 pentatonic notes for the melody and make phrases from those 3. Fewer notes, more intention. If you lose the groove, stop melody entirely and just play bass until you re-lock with the track.",
      sarah: "Gene, bossa nova and fingerpicking share DNA — both are about independent voices (thumb = bass, fingers = melody) and both prize elegance over complexity. The bossa track underneath is like Rosinha De Valença or João Gilberto — that warm Brazilian groove that Tommy Guerrero channels constantly. Let the groove carry you. Your job is to decorate it, not compete with it.",
      metronome: 75,
      levelUp: "Record a 5-minute fingerpicked improvisation over the bossa backing track using bass (thumb), melody (fingers), and at least one section of percussive slap. The bass notes are consistent and the melody has clear phrases (not random notes)."
    },

    // ─── EXTENDED PERFORMANCE ───

    {
      id: "gs-11-11",
      time: 12,
      title: "Extended Fingerpicking Piece — Full Song",
      type: "guitar",
      chordVoicings: { chords: ["G", "Bm", "Em", "D", "Am", "C"] },
      tracks: [{ name: "A Major Folk 80", src: "/a-major-folk-80.mp3" }, { name: "Cinematic Western 80", src: "/cinematic-western-80.mp3" }],
      recorder: true,
      what: "Your Level 11 graduation piece. Combine everything: six-note roll, Travis picking, percussive slap, duo thinking, pick tuck, dynamic shaping. Play a 4-minute fingerpicked piece that has a clear structure — intro, verse, chorus, bridge, outro. Use chord changes from Breakdown (G-Bm-Em-D) or create your own. This is not an exercise. This is a performance.",
      setup: "Guitar. Choose your own tempo (60-80 BPM). Choose a backing track or play solo. Record the entire thing.",
      steps: [
        { text: "Plan your structure before you play. Write it down: Intro (8 bars, Am, spacious picking) → Verse 1 (16 bars, G-Bm-Em-D, six-note roll) → Chorus (8 bars, C-G-Am-Em, Travis picking) → Bridge (8 bars, Am, percussive gallop) → Verse 2 → Chorus → Outro (8 bars, Am, spacious fade). Adjust to taste.", why: "Planning the structure before playing ensures your performance has a narrative arc. Random jamming is for practice. Performance has intention, contrast, and shape." },
        { text: "Practice each section separately. Get the intro clean. Get the verse flowing. Get the chorus grooving. Get the bridge galloping. Each section uses a different fingerpicking technique — the contrast between sections is what makes the piece interesting.", why: "Section-by-section practice ensures each part is solid before you combine them. Transitions between sections are where performances break down — knowing each section independently makes the transitions smoother." },
        { text: "Practice the transitions between sections. The hardest moments: roll → Travis pattern (intro to verse), Travis → spacious picking (verse to chorus — or use the pick tuck here for a strummed chorus), picking → slap (chorus to bridge). Each transition should be smooth and musical.", why: "Transitions are the seams of a performance. Rough transitions break the listener's immersion. Smooth transitions are invisible — the piece flows like one continuous statement." },
        { text: "Run the full piece start to finish. Don't stop for mistakes — play through them. A performance is not practice. If a chord buzzes, let it go. If a transition stutters, recover and keep going. The overall flow matters more than individual note accuracy.", why: "Performance resilience — the ability to continue through mistakes — is a skill that only develops through practice performances. Every professional musician has played through wrong notes. The audience never notices if you don't react." },
        { text: "Record the full piece. Listen back with fresh ears — tomorrow, not today. When you listen tomorrow, you'll hear it as a listener, not as the player. Note what works and what needs polish. This recording is your Level 11 completion artifact.", why: "Delayed self-listening removes the emotional charge of performance and lets you hear objectively. Tomorrow's ears will catch things tonight's can't — both good surprises and areas for growth." }
      ],
      feel: "This should feel like a complete musical statement — a fingerpicked journey with a beginning, middle, and end. Not an exercise, not a jam, but a PIECE. Something you could play for someone and say 'I wrote this.' Even if every chord and technique is borrowed, the arrangement is yours.",
      wrong: "If the piece feels flat (same energy throughout), increase the contrast between sections. Make the intro whisper-quiet. Make the chorus confident. Make the bridge dramatic. Dynamic contrast creates narrative. If you can't get through the full piece without stopping, shorten it — a clean 2-minute piece beats a fumbled 4-minute one.",
      sarah: "Gene, this is the moment where technique becomes music. Everything you learned in this level — PIMA, the roll, Travis picking, the slap, duo thinking, the pick tuck — they're all tools. This piece is where you USE the tools to build something. Hermanos Gutiérrez's albums are just this: fingerpicked pieces with structure, contrast, and atmosphere. Jack Johnson's Between Dreams is just this. Tommy Guerrero's Soul Food Taqueria is just this. Simple techniques. Intentional arrangement. Musical storytelling.",
      metronome: 70,
      levelUp: "Record a complete 3-4 minute fingerpicked piece with at least 3 distinct sections (e.g., intro/verse/chorus), at least 2 different fingerpicking techniques (e.g., roll + Travis, or roll + percussive slap), and audible dynamic contrast between sections."
    }
  ]
};
