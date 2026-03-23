import { getPitchRange } from "../appData.js";

export const level3 = {
  level: 3,
  title: "Power & Drive",
  subtitle: "Palm mutes, power chords, and your first taste of controlled aggression.",
  description:
    "Levels 1 and 2 gave you open chords and surf tremolo — clean, jangly, beautiful. Now we add grit. Power chords strip the chord down to its bones: root and 5th, no 3rd, no ambiguity. Palm muting turns your pick hand into a volume knob. Together they unlock garage rock, punk, psych-fuzz, and the 'SoCal switch' where a clean reggae verse explodes into a crunchy chorus. You'll also meet PReVaDe — a framework for developing a musical idea from a seed into a full statement and back again.",
  artists: "The Growlers, Sun Room, Eyedress, Mystic Braves",
  unlocks: "The Offbeat (Level 4)",
  review: {
    label: "Level 2 Check-In",
    time: 5,
    exercises: ["gs-2-2", "gs-2-7"],
    prompt: "Play behind-the-beat strumming over Am→D→G (gs-2-2). Then play a clean half-step bend on the G string 7th fret (gs-2-7). Both feel natural? Move on."
  },
  exercises: [

    // ─── POWER CHORD FOUNDATIONS ───

    {
      id: "gs-3-1",
      time: 8,
      title: "The Two-Note Engine — Power Chord Shapes",
      type: "guitar",
      what: "Power chords are the simplest chord in music: root + 5th, two notes, no 3rd. That missing 3rd is what makes them powerful — they're neither major nor minor, just pure force. One shape, moveable anywhere on the neck. Learn A5, D5, and E5 and you can play half the garage rock ever recorded.",
      setup: "Guitar. Clean tone for now — we'll add dirt later. Metronome at 90 BPM.",
      steps: [
        { text: "Play A5: index finger on the A string 5th fret (low E muted), ring finger on the D string 7th fret. Only these two strings ring. Everything else is dead — touch the other strings lightly with your fretting hand to mute them. Strum all six strings hard. Feel the power chord's vibration hit your chest like a fist — the low frequencies buzz through the guitar body into your ribcage. Only two notes should sound, but you feel them everywhere.", why: "Muting is half the power chord technique. When you strum hard through all six strings but only two ring out, the muted strings add a percussive 'chunk' that IS the power chord sound. The chest vibration from a clean power chord is unmistakable — it's physical, visceral, different from the shimmer of an open chord." },
        { text: "Play E5: index on the A string 2nd fret, ring on the D string 4th fret (or use the open low E + A string 2nd fret shape). Then D5: index on the A string 5th fret moved to the D string 5th fret, ring on the G string 7th fret. Same shape, different root strings.", why: "The power chord shape is identical everywhere — it's a moveable template. Once your hand memorizes this two-finger grip, you can play any root note on the neck instantly. This is why punk guitarists can write songs in 5 minutes." },
        { text: "Slow transitions: A5 → D5 → E5 → A5. Four strums each at 90 BPM. Focus on clean muting — between each chord, lift your fingers slightly so ALL strings go dead for a split second before the next shape lands. That dead space is rhythmically important.", why: "The silence between power chords is what gives them punch. If one chord bleeds into the next, you lose the percussive attack. Clean stops = clean power." },
        { text: "One-Minute Changes drill: set a timer for 60 seconds. Alternate between A5 and E5 as fast as you can with clean muting. Count your changes. Write it down. Target: 30 changes per minute = solid. Under 15 = needs daily practice.", why: "Justin Guitar's One-Minute Changes is the most effective chord transition drill ever designed. Speed comes from efficient movement — your fingers should travel the shortest possible distance between shapes." },
        { text: "Add B5: index on the A string 2nd fret, ring on the D string 4th fret. This is the same shape as E5 but starting from B on the A string. Now play: E5 → A5 → B5 → E5. This is the I-IV-V in E using power chords — the progression underneath a thousand surf-punk songs.", why: "I-IV-V in power chords is the skeleton of rock. Once you can play this cleanly at tempo, you have the foundation for Going Gets Tough, Summer Heat, and dozens of songs in your playlist." }
      ],
      feel: "Power chords should feel physical — your whole arm drives the strum, the muted strings add chunk, and the two ringing notes cut through with focused energy. It's less delicate than open chords, more like punching a wall with precision.",
      wrong: "If you hear extra strings ringing (especially the high strings), your muting is sloppy — that's your hand learning a new muting technique, not a sign you can't do it. Lay your index finger flatter so it touches the strings above the ones you're fretting. If the chord sounds thin, you're not strumming through the muted strings — strum ALL six, let the muting do its job.",
      sarah: "Gene, Pepper's Stormtrooper opens with power chords — D#5, A#5, F#5 — before dropping into reggae. That contrast between crunchy power chords and clean skank is the 'SoCal switch,' and it starts right here. Sun Room uses power chords too, just with the Tubescreamer adding warmth instead of raw distortion. Same shapes, different gain = different worlds.",
      metronome: 90,
      chordVoicings: { chords: ["A5", "D5", "E5", "B5"] },
      levelUp: "Can play A5→D5→E5→A5 at 100 BPM with clean muting — no extra strings ringing, dead space between each chord."
    },

    // ─── PALM MUTING ───

    {
      id: "gs-3-2",
      time: 7,
      title: "The Heel — Palm Muting Technique",
      type: "guitar",
      what: "Palm muting turns your pick hand into a volume and texture knob. Rest the fleshy heel of your picking hand on the strings right at the bridge. Strum — the strings vibrate but are dampened, creating a thick, chunky, percussive tone. Move your hand forward = more muting. Move it back toward the bridge = more ring. This is how you control aggression.",
      setup: "Guitar. Clean tone first — palm muting works with any tone, but learning on clean reveals every imperfection. Metronome at 80 BPM.",
      steps: [
        { text: "Rest the heel of your picking hand on the strings right where they meet the bridge saddles. Feel the string vibration against your palm — a gentle tickle. Strum the open low E string. You should hear a thuddy, muted 'chunk' instead of a ringing note, and feel the vibration dampened under your hand — your palm is literally absorbing the energy. If it's completely dead, move your hand slightly back toward the bridge. If it rings freely, move forward. Find the sweet spot where you feel a thick buzz under your palm.", why: "The palm mute position is measured in millimeters. Too far forward and you kill the note entirely. Too far back and there's no muting at all. The sweet spot creates a thick, percussive tone where the pitch is audible but dampened — your palm feels the vibration it's controlling, like a hand on a heartbeat." },
        { text: "Play palm-muted downstrokes on E5 (power chord). Eight eighth notes, all muted. 'Chunk-chunk-chunk-chunk-chunk-chunk-chunk-chunk.' Each one should sound like a controlled thud with pitch. Keep your hand pressure CONSISTENT.", why: "Consistent palm muting is harder than it sounds — your hand naturally moves as you strum, which changes the mute depth. Training even pressure builds the muscle memory for the chunky punk/metal rhythm tone." },
        { text: "Now the contrast drill: 4 muted strums, then LIFT your palm and play 4 unmuted strums on the same E5. Muted: chunk-chunk-chunk-chunk. Open: RING-RING-RING-RING. Feel the dramatic shift. This muted-to-open move is the core of rock dynamics.", why: "The muted-to-open transition is one of the most powerful dynamic tools in rock guitar. Nirvana, Green Day, Pepper — they all build verses on palm-muted chugging and then RELEASE into ringing open chords for the chorus. The contrast creates the energy surge." },
        { text: "Gradual release: start fully muted on E5. Over 8 beats, slowly lift your palm so the strings ring more and more with each strum. By beat 8, your palm is completely off and the chord rings wide open. Then reverse: open to fully muted over 8 beats.", why: "The gradual mute-to-open sweep is an expressive tool. It's how you build tension within a single phrase — from whispered chunk to full roar and back. Mastering the gradient between fully muted and fully open gives you infinite dynamic shades." },
        { text: "Play E5 → A5 → B5 with all palm-muted downstrokes at 80 BPM. Four strums per chord. Keep the chunky, percussive quality consistent across all three chords. The palm stays planted through the chord changes.", why: "Maintaining palm mute position while changing chords is a coordination challenge — your pick hand wants to lift when your fret hand moves. Train them to be independent: fret hand changes shape, pick hand stays planted at the bridge." }
      ],
      feel: "Palm-muted power chords should feel like a controlled engine — chunky, rhythmic, physical. Your pick hand is doing as much musical work as your fret hand. When the mute is right, you feel the thud in your chest more than you hear the pitch in your ears.",
      wrong: "If the muted notes are completely dead (no pitch at all), your hand is too far forward — scoot it back toward the bridge until you hear the note's pitch through the muting. If the notes ring clearly with no dampening, press your palm harder into the strings or move it forward. The target is 'audible pitch with a thick blanket over it.'",
      sarah: "Gene, Mystic Braves use palm muting on nearly everything — that chunky, aggressive rhythm guitar underneath the fuzz is palm-muted power chords. And when The Growlers drop into their dark, moody verses, the guitar is often palm-muted to create that brooding, restrained energy before the chorus opens up.",
      metronome: 80,
      levelUp: "Can play 8 consecutive palm-muted downstrokes on E5 with consistent mute depth — no accidental open rings, no dead thuds."
    },
    {
      id: "gs-3-3",
      time: 7,
      title: "Power Chord + Palm Mute Combo — The Garage Sound",
      type: "guitar",
      what: "Combine power chords with palm muting for the classic garage/punk rhythm sound. Palm-muted verses, open choruses. This is the engine of every Growlers song, every Pepper intro, every Mystic Braves riff. The shape stays the same — your pick hand controls the energy.",
      setup: "Guitar. Metronome at 90 BPM. Optional: light overdrive or fuzz if you have a pedal.",
      tracks: [{ name: "Psych Rock 120", src: "/psych-rock-120.mp3" }],
      steps: [
        { text: "Play this pattern on A5: 4 palm-muted downstrokes (chunk-chunk-chunk-chunk), then 4 OPEN downstrokes (RING-RING-RING-RING). Repeat. The transition from muted to open should feel like a door swinging open — same chord, massive energy shift.", why: "This muted-to-open pattern is the most common dynamic move in rock guitar. Your fret hand does nothing different — the entire expression comes from your pick hand lifting or pressing at the bridge. One hand controls the emotion." },
        { text: "Apply the pattern to a power chord progression: E5 (4 muted) → E5 (4 open) → A5 (4 muted) → A5 (4 open). Feel how the open hits create emphasis at the midpoint of each chord. Now try: E5 (all muted for 8 beats) → A5 (all open for 8 beats). Different energy shape, same chords.", why: "Varying WHERE you place the muted vs. open hits changes the feel completely. Muted-then-open within one chord = internal dynamics. All-muted verse vs. all-open chorus = structural dynamics. Both are essential." },
        { text: "Play the punk pulse: ALL eighth-note downstrokes on E5, palm muted, at 90 BPM. 16 straight muted hits. No upstrokes. Just driving, relentless downstroke energy. This is the Ramones, the Stooges, the foundation of punk rhythm.", why: "All-downstroke palm-muted eighth notes is the purest distillation of aggressive rhythm guitar. It's physically demanding — your forearm will burn after 30 seconds. That burn is the price of punk energy." },
        { text: "Now contrast: play E5 → A5 → D5 → A5 with upstroke-based strumming, no palm muting — open, jangly, bright. Feel how different the SAME chords feel with a completely different pick-hand approach. Muted downstrokes = garage. Open upstrokes = surf.", why: "The contrast proves that pick-hand technique defines genre as much as chord choice. Same three power chords, two completely different sounds. Your right hand chooses the genre." },
        { text: "Combine: verse feel (palm-muted E5→A5, 8 bars) then chorus feel (open E5→A5→B5, 8 bars). Loop it 4 times. This is a complete song structure using only power chords and your pick hand. Record the last loop.", why: "You just played a complete song arrangement — verse and chorus — using three chords and one technique variation. This is how The Growlers, Pepper, and Mystic Braves structure their songs. The chord vocabulary is small; the dynamic vocabulary is huge." }
      ],
      feel: "The muted sections should feel restrained and coiled, like holding back energy. The open sections should feel like releasing it — explosive, ringing, free. The TRANSITION between them is where the magic lives. That split-second lift of the palm should feel like opening a valve.",
      wrong: "If muted and open sections sound similar, you're not committing to either extreme. Make the muted hits AGGRESSIVELY chunky — press your palm hard. Make the open hits COMPLETELY free — palm fully lifted off the strings. Exaggerate the contrast, then find the middle ground.",
      sarah: "Gene, this muted-verse-to-open-chorus dynamic is literally the SoCal switch that Pepper pioneered. Stormtrooper: crunchy power chord intro, then clean reggae, then back to power chords. The Growlers do the same thing darker — Going Gets Tough has that brooding palm-muted verse energy. You're learning the engine that drives your entire playlist's heavier side.",
      metronome: 90,
      recorder: true,
      levelUp: "Can play a 16-bar verse-chorus loop (8 bars palm-muted, 8 bars open) on E5→A5→B5 at 100 BPM with clean transitions between muted and open."
    },

    // ─── SONG STUDIES ───

    {
      id: "gs-3-4",
      time: 10,
      title: "Song Study: Going Gets Tough — Half-Time Groove",
      type: "guitar",
      songRef: {
        title: "Going Gets Tough — The Growlers",
        src: "/going-gets-tough.mp3",
        note: "Half-time groove with power chords. Listen to the reverb-drenched, brooding feel."
      },
      what: "The Growlers' Going Gets Tough runs at about 158 BPM (felt in half-time at ~79 BPM) with a bass-strum alternation feel that gives it a half-time heaviness. Capo 1, shapes are G-C-D-Em, plus a signature Cadd6 embellishment that IS the sound of this song. Listen to the recording twice before playing — first pass, feel the brooding energy; second pass, ghost the chord shapes with your fretting hand. This song teaches you alternating bass-strum technique, chord embellishments, and the difference between staccato verses and legato choruses.",
      setup: "Guitar. Capo on fret 1. Metronome at 79 BPM (half-time feel of the actual 158 BPM). Reference the song on your phone.",
      steps: [
        { text: "Capo on fret 1. Play G-C-D-Em as open chord shapes — these are the shapes you already know from Level 1. Strum each chord for 4 beats at 79 BPM. Slow, deliberate, one downstroke per beat. Let each chord ring.", why: "The Growlers recorded in Ab (capo 1 = G shapes). Using a capo means you get to play familiar open chord shapes in a new key. The half-time feel means your strum is twice as slow as the song's click track — this is what 'half time' means." },
        { text: "Learn the verse progression: G for 4 beats, C for 4 beats, repeat. Sparse, moody, restrained. Don't strum every beat — try hitting beats 1 and 3 only, letting beats 2 and 4 ring as silence. The space between strums IS the vibe.", why: "The Growlers' verse energy is about restraint — holding back creates tension that the chorus releases. Less strumming = more mood. Every note you DON'T play makes the ones you DO play heavier." },
        { text: "Add the chorus: G → C → D → Em. Slightly more strum energy here — you can fill in beats 2 and 4 with softer strums. But keep the half-time feel. Don't speed up. The tempo stays the same; only the density changes.", why: "Increasing strum density without increasing tempo is how half-time songs build energy. The groove stays locked in the pocket while the texture gets thicker. This is more sophisticated than simply playing faster." },
        { text: "The Bass-Strum Alternation: Going Gets Tough uses a bass-strum pattern. Play the LOW root note of each chord on the downbeat (low E string 3rd fret for G, A string 3rd fret for C), then a quick, snappy strum of the upper strings on the upbeat. Down on the bass, up on the treble. This creates a bouncy, alternating feel that drives the song forward.", why: "The alternating bass-strum pattern is the rhythmic engine of Going Gets Tough. The bass note anchors the groove while the upper strum provides the energy. This technique separates the bass and treble roles of the guitar — you can hear prominent alternating bass lines on the low E and A strings throughout the recording." },
        { text: "The Cadd6 Embellishment: While holding a C chord, hammer your pinky onto the 2nd fret of the G string. Let it ring, then pull off. This creates a wavering, wobbly melody WITHIN the chord strum — it's the signature sound of Going Gets Tough. Try it: strum C, hammer-on, pull-off, strum C again. That little melodic wobble transforms a static chord into something alive.", why: "This hammer-on embellishment transforms a static C chord into a living, breathing thing. It's a technique The Growlers use constantly — adding small melodic movements inside chord shapes so the rhythm guitar IS the melody. Listen to the recording and you'll hear this embellishment on almost every C chord." },
        { text: "Practice the full form: verse (G-C with boom-chuck and Cadd6 embellishment, sparse) → chorus (G-C-D-Em, denser with staccato verses giving way to legato choruses). Loop 3 times. Record your third loop. Listen for the dynamic contrast between verse and chorus.", why: "Dynamic contrast between song sections is how you keep a listener engaged without changing the tempo or the key. The staccato-to-legato shift between verse and chorus adds another layer of contrast beyond just strum density." },
        { text: "Optional: try palm muting the verse (chunky G-C) and opening up for the chorus. This adds the power chord technique to an open chord song — the SoCal switch applied to The Growlers' dark psych-surf.", why: "Combining palm muting with open chords (not just power chords) expands the technique. A palm-muted G chord sounds thick and moody — perfect for The Growlers' dark aesthetic. Open G for the chorus = release." }
      ],
      feel: "This should feel heavy and languid, like walking through warm tar. The half-time groove has a gravitational pull — each strum sinks into the beat rather than bouncing off it. Dark, moody, deliberate. Like the surf at night.",
      wrong: "If it sounds rushed or bouncy, you're playing at 158 BPM (full tempo) instead of 79 BPM (half time). Slow WAY down. Each strum should land with weight. If the verse and chorus sound the same, you're not varying your strum density — make the verse sparser.",
      sarah: "Gene, The Growlers are the dark side of your psych-surf triangle — where Allah-Las shimmer, The Growlers brood. Brooks Nielsen's voice drips with late-night L.A. energy, and the guitar matches: reverb-drenched, half-time, moody. Going Gets Tough is one of your top 50 — this is your music, played your way. The capo on 1 makes the open shapes work in their key. Listen to the actual recording — there are prominent bass walks on the low strings between chord changes, and the guitarist hammers that Cadd6 embellishment on almost every C chord. That's the sauce.",
      metronome: 79,
      recorder: true,
      chordVoicings: { chords: ["G", "C", "Cadd6", "D", "Em"] },
      levelUp: "Can play the full verse-chorus form of Going Gets Tough at half-time 79 BPM with clear dynamic contrast between sparse verse and denser chorus."
    },
    {
      id: "gs-3-5",
      time: 8,
      title: "Song Study: Summer Heat — Energetic Surf Strum",
      type: "guitar",
      songRef: {
        title: "Summer Heat — Sun Room",
        src: "/summer-heat.mp3",
        note: "CHORDS NEED EAR VERIFICATION — E-A-B-C#m is our best guess based on Sun Room's patterns. No tab exists. Listen and confirm."
      },
      // UNVERIFIED — Summer Heat chords are E-A-B-C#m based on Sun Room's typical patterns
      what: "Sun Room's Summer Heat is pure energy — ~130 BPM, likely chords E-A-B-C#m (unverified — hit play above and confirm). This is the bright, aggressive side of the coin from Going Gets Tough's dark brooding. Same power, opposite mood.",
      setup: "Guitar. Listen to the song — verify chords match. Metronome at 100 BPM (build to 130). Clean tone with slight overdrive.",
      tracks: [{ name: "Surf Rock 120", src: "/surf-rock-120.mp3" }, { name: "Drums — Surf 120", src: "/drums-surf-120.mp3" }],
      steps: [
        { text: "Play the progression: E → A → B → C#m. Use open shapes for E and A, barre or power chord for B (B5 works perfectly here), and C#m can be played as a power chord C#5 at fret 4 on the A string for now. 4 beats per chord at 100 BPM.", why: "Sun Room keeps chord shapes simple — their magic is in the STRUM, not the voicings. Using power chords for B and C#m is perfectly valid and matches the driving energy of the song. You'll learn full barre shapes in Level 5." },
        { text: "Sun Room's strum pattern is NOT straight downstrokes. It's syncopated: Down, Down-Up, Down-Up. Practice this on just E for 8 bars. The constant arm motion principle applies — your arm swings like a pendulum on every eighth note, and you 'miss' strings on the rests.", why: "Sun Room's strum sounds energetic because of the syncopated push — the Down-Up after the initial Down creates a forward momentum. Straight downstrokes would sound like punk; this syncopated pattern sounds like surf-pop." },
        { text: "Apply the strum pattern to the full progression at 100 BPM. E (syncopated strum, 4 beats) → A (same) → B5 (same) → C#5 (same). Focus on keeping the strum pattern consistent through the chord changes — your pick hand shouldn't hesitate when your fret hand moves.", why: "Maintaining a consistent strum pattern through chord transitions is the key to sounding professional. Beginners often break their strum rhythm at every chord change. The arm keeps swinging; only the fret hand moves." },
        { text: "Speed build: play the full progression at 100 BPM for 4 loops. Then bump to 110 BPM for 4 loops. Then 120. If you can reach 120 with clean changes and consistent strum, that's excellent. 130 (actual song tempo) is the graduation target.", why: "Building speed incrementally (the 'speed ladder') ensures your technique stays clean as tempo increases. Only increase when you can play 4 consecutive clean loops at the current tempo. Rushing to full speed creates sloppy habits that are hard to fix." },
        { text: "Play along with the Surf Rock 120 backing track. The track is in E major at 120 BPM — close enough to Summer Heat's key and tempo. Let the track's energy pull you along. Record your best loop.", why: "Playing with a backing track adds rhythmic accountability and makes the exercise feel like real music-making, not just drills. The backing track won't wait for you — it forces your timing to be solid." }
      ],
      feel: "This should feel bright, driving, and joyful — the musical equivalent of paddling into a wave. The syncopated strum creates forward momentum, like the song is pulling you along. When the strum locks with the backing track, you'll feel a surge of energy.",
      wrong: "If it sounds flat and plodding, check your strum pattern — straight downstrokes will kill the Sun Room bounce. You need that Down, Down-Up, Down-Up syncopation. If chord changes are sloppy, drop the tempo 10 BPM. Clean at 90 > messy at 130. If you can't get it after 10 minutes, stop and try tomorrow — your brain consolidates during sleep.",
      sarah: "Gene, Luke from Sun Room plays the same Jazzmaster for everything. His secret isn't gear — it's that Tubescreamer always on at low gain, just adding warmth and push. The strum does the work. Summer Heat is pure energy on four chords — proof that simplicity wins when the groove is right. This is your music at its most joyful.",
      metronome: 100,
      speedLadder: { start: 100, end: 130, increment: 10, bars: 4 },
      recorder: true,
      chordVoicings: { chords: ["E", "A", "B5"] },
      levelUp: "Can play E→A→B5→C#5 with Sun Room's syncopated strum pattern at 120 BPM with no strum breaks at chord transitions."
    },

    // ─── FUZZ & OVERDRIVE ───

    {
      id: "gs-3-6",
      time: 6,
      title: "Fuzz & Overdrive — Gain as Expression",
      type: "guitar",
      what: "Distortion isn't just 'louder.' It's a fundamentally different instrument. Clean guitar is a piano — each note is distinct. Overdriven guitar is a cello — notes blend and sustain. Fuzz guitar is a saxophone — notes scream and compress. Mystic Braves use Big Muff fuzz; Sun Room uses Tubescreamer overdrive. Same chords, wildly different worlds.",
      setup: "Guitar. If you have a distortion/overdrive/fuzz pedal, use it. If not, use an amp's drive channel or a guitar app with gain. Even a phone amp sim works.",
      steps: [
        { text: "Play A5 → D5 → E5 clean. Listen to the clarity — each string is distinct, the chord is transparent. Now add gain (overdrive, distortion, or fuzz — whatever you have). Play the same progression. Listen to how the notes compress and blend, how the chord becomes a wall of sound instead of individual strings.", why: "Understanding the tonal spectrum from clean to dirty is essential for expressive guitar. Each point on the gain spectrum has a different emotional character — clean is intimate, overdrive is warm, distortion is aggressive, fuzz is wild." },
        { text: "With gain on, play palm-muted E5 eighth notes. Notice how the muting interacts with the distortion — the chunk becomes thicker, more aggressive, almost drum-like. Now lift the palm: the chord explodes into sustaining ring. The dynamic contrast is even MORE dramatic with gain.", why: "Palm muting + distortion is the garage rock engine. The gain compresses the muted chunk into a tight, punchy thud, and the unmuted release creates an explosive wall of sound. This contrast is more extreme than clean palm muting." },
        { text: "Experiment with gain LEVELS. Low gain (like Sun Room's Tubescreamer): warm, pushed, still some string clarity. Medium gain: notes start to blend, sustain increases. High gain (fuzz): notes smear together, single notes sustain forever, chords become a roar. Play the same A5→D5→E5 at each level.", why: "Gain isn't binary — it's a spectrum. Sun Room lives at low gain (warmth). Mystic Braves live at high gain (fuzz). Most players set it and forget it, but great guitarists treat gain as an expressive parameter they adjust per song." },
        { text: "Play a single note — A on the 5th fret of the low E string — with heavy fuzz. Hold it. Let it sustain. Bend it slightly. Feel how the fuzz compresses the note into an endless sustain, how bends sound vocal and singing through the distortion. This is how Mystic Braves get that dark, droning, hypnotic sound.", why: "Fuzz turns the guitar into a sustaining instrument — notes hold indefinitely, bends sound like a human voice, and single notes carry as much weight as full chords. This is an entirely different way to think about the guitar." },
        { text: "Improv exploration: play freely over the Psych Rock 120 track using power chords with varying gain levels. Switch between palm-muted chugging and open ringing. Switch between single-note fuzz sustain and clean chord jangle. 3 minutes, no plan. Explore the tonal landscape.", why: "Free exploration with gain builds your instinct for WHEN to use clean vs. dirty in a musical context. There are no wrong answers — you're building a vocabulary of tonal options." }
      ],
      feel: "This should feel like discovering a new dimension. The same chords you played clean in Level 1 become COMPLETELY different animals with gain. Clean is a watercolor. Overdrive is an oil painting. Fuzz is spray paint. Same shapes, different medium, different art.",
      wrong: "If everything sounds like noise, your gain is too high. Start with less gain than you think you need — you can always add more. If power chords sound muddy (indistinct), check your muting — extra strings ringing through distortion creates harmonic chaos. Only the root and 5th should ring.",
      sarah: "Gene, Mystic Braves use a Big Muff fuzz — that thick, dark, wall-of-sound tone on 'Please Let Me Know' and 'Mystic Rabbit.' Two guitars split lead and rhythm, both through fuzz, creating that psychedelic fog you love. Sun Room's approach is the opposite — always-on Tubescreamer at LOW gain, just warming the signal. Same genre neighborhood, opposite gain philosophies. You're meeting both.",
      tracks: [{ name: "Psych Rock 120", src: "/psych-rock-120.mp3" }],
      metronome: 90,
      recorder: true,
      levelUp: "Can describe the tonal difference between clean, overdrive, and fuzz. Can play palm-muted power chords with gain and hear the chunk clearly (no mud)."
    },

    // ─── PReVaDe FRAMEWORK ───

    {
      id: "gs-3-7",
      time: 10,
      title: "PReVaDe Intro — Develop a Riff from a Seed",
      type: "guitar",
      what: "PReVaDe is a framework for developing a musical idea: Present a motif (play it 4x), Repeat it (4x more — repetition declares the theme), Vary it (change ONE thing), Deconstruct it (simplify back to silence). This turns a 2-second riff into a 2-minute journey. You'll use power chords as your raw material.",
      setup: "Guitar. Metronome at 90 BPM. Light gain or clean. Backing track optional.",
      fretboard: { scale: "am-pentatonic", position: 1 },
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      steps: [
        { text: "Before picking up the guitar, hear a rhythm in your head — just the FEEL of the riff, no pitch needed. Tap it on your thigh: chunk-chunk... chunk... chunk-chunk-chunk. When you can feel the rhythm internally, pick up the guitar and apply it to A5 and E5. The riff should come from your inner rhythm, not from randomly strumming.", why: "Audiating rhythm before playing trains the same intention-first pathway as audiating pitch. Gordon's research shows that rhythmic audiation develops even before tonal audiation. A riff born from an internal rhythm feels inevitable; a riff discovered by accident feels random. The PReVaDe framework works best when the seed is intentional." },
        { text: "Create a simple 2-bar power chord riff using A5 and E5. Something short and memorable — maybe A5 (chunk-chunk) → E5 (chunk) → A5 (chunk-chunk-chunk). Just two chords, a simple rhythm. This is your SEED.", why: "Starting with only two power chords and a simple rhythm ensures the seed is memorable. PReVaDe works because the motif is simple enough to remember, repeat, and vary. Complex seeds are harder to develop." },
        { text: "PRESENT: play your seed riff 4 times exactly as-is. No changes. Lock it in. Feel how the power chord vibrates against your chest with each hit — that physical pulse IS the riff's heartbeat. Let the repetition burn the pattern into your muscle memory, your chest, and your listener's ear. Make it feel inevitable — like it's always existed.", why: "The Present phase establishes the theme through exact repetition. The listener needs to hear the riff several times before it becomes 'the riff.' The chest vibration creates a body-level memory of the riff's rhythm that persists even when you stop playing — you can feel the pattern continuing internally." },
        { text: "REPEAT: play it 4 more times, still exactly the same. Yes, 8 total times of the exact same riff. This feels boring to play but it's essential — the repetition declares the theme. By rep 8, the riff IS the song. The listener expects it.", why: "8 repetitions before any variation is a discipline. Most players change things too soon out of boredom or anxiety. But musical expectation only works when the pattern is deeply established. Tinariwen play the same riff for 5 minutes before changing a single note." },
        { text: "VARY: change ONE element. Options: swap A5 for D5 (different chord, same rhythm). Or keep the chords but change the rhythm (add a rest, shift a strum). Or add palm muting to what was open. Play the variation 4 times. ONE change only.", why: "The single-element variation is what makes PReVaDe powerful. One change against a deeply established pattern is dramatic — the listener's ear immediately notices what's different. Multiple simultaneous changes muddy the impact." },
        { text: "DECONSTRUCT: simplify back toward silence. Remove elements — go from the full riff to just the rhythm (muted strums, no chords), then to just tapping the guitar body, then to silence. The piece dissolves back to its origin. 4 bars of gradual deconstruction.", why: "Deconstruction creates a complete arc: from nothing, a motif emerges, develops, then returns to nothing. This is the structure of entire compositions — intro, development, outro. You're learning compositional thinking through a 2-minute exercise." },
        { text: "Run the full PReVaDe cycle once more with a DIFFERENT seed riff. This time use E5, A5, and B5. Present (4x) → Repeat (4x) → Vary (4x, one change) → Deconstruct (dissolve). Record the whole thing.", why: "Running PReVaDe twice with different seeds proves the framework works with any material. The structure is the constant; the content changes. This framework will appear throughout the remaining levels in increasingly sophisticated forms." }
      ],
      feel: "Present and Repeat should feel meditative — the same riff, over and over, sinking in. Vary should feel like a small revelation — one change that shifts everything. Deconstruct should feel like letting go — the music dissolving back into silence. The whole arc should feel like a tiny story.",
      wrong: "If you change the riff before completing 8 exact repetitions, you're rushing. The discipline IS the exercise. If your variation changes more than one thing, simplify — pick the single smallest change possible. If the deconstruction is abrupt (just stopping), make it gradual — each bar should have LESS than the previous one.",
      sarah: "Gene, Tinariwen and Ali Farka Touré do PReVaDe intuitively — a riff repeats hypnotically until a single note changes, and that one shift feels enormous because the repetition set it up. Khruangbin does this too: Mark Speer will play a phrase 16 times, then shift one note, and the whole room feels it. You're learning the framework behind that magic.",
      metronome: 90,
      phraseForm: { pattern: "PRVD", barsPerSection: 4, labels: { P: "Present", R: "Repeat", V: "Vary", D: "Deconstruct" } },
      recorder: true,
      levelUp: "Can run a complete PReVaDe cycle (Present 4x → Repeat 4x → Vary 4x → Deconstruct 4 bars) with a power chord seed riff without breaking the framework."
    },

    // ─── MORE SONG STUDY + APPLICATION ───

    {
      id: "gs-3-8",
      time: 8,
      title: "Song Study: Something About You — Lo-Fi Indie Feel",
      type: "guitar",
      songRef: {
        title: "Something About You — Eyedress",
        src: "/something-about-you.mp3",
        note: "Lo-fi indie — reverb-drenched, behind the beat. Simple chords, all feel."
      },
      what: "Eyedress's Something About You lives in a dreamy, reverb-drenched lo-fi world. The full verse progression is F-Em-F-Em-Am-Dm-Em — simplified here to the four core chords F-Em-Am-Dm, which are the shapes you already know, played with a lazy, behind-the-beat feel. No power chords here — this is the other side of Level 3, where restraint and mood replace aggression.",
      setup: "Guitar. Lots of reverb if available. Metronome at 110 BPM (we'll slow from the song's 133 BPM to learn the feel first).",
      steps: [
        { text: "Play the progression: F → Em → Am → Dm. These are all open or first-position chords. 4 beats per chord at 110 BPM. Strum gently — this is NOT a power chord song. The vibe is whispered, intimate, slightly sad. The defining guitar move in this song is the slide from F to Em — the guitarist doesn't lift their fingers off the fretboard, they SLIDE the entire chord shape down one fret. Practice this: play F, then without lifting your fingers, slide everything down one fret to land on Em. That smooth, lazy slide IS the Eyedress sound.", why: "Something About You is the dynamic counterweight to Going Gets Tough and Summer Heat. Same level, opposite energy. The sliding chord change — heavily chorused in the recording — creates a smeared, dreamy transition that defines the track's character. Learning to shift between aggressive and gentle on the same instrument is what makes a complete guitarist." },
        { text: "Add the lo-fi strum: down on beat 1, up on the 'and' of 2, down on beat 3. Beats 2 and 4 are mostly silent — just ghost strums where your hand passes through the strings without making full contact. This sparse pattern creates the lo-fi indie feel.", why: "Lo-fi indie guitar is defined by what you DON'T play. The ghost strums (barely touching the strings) create a rhythmic texture without adding volume. It's the opposite of power chord strumming — every note is whispered, not shouted." },
        { text: "Play behind the beat: let each strum land slightly AFTER the metronome click. Not much — maybe 30 milliseconds. Just enough that the guitar feels like it's dragging, reluctant, lazy. This behind-the-beat feel is what makes DOPE LEMON, Eyedress, and Skinshape sound 'lo-fi.'", why: "Behind-the-beat phrasing is a feel, not a technique you can measure. It communicates laziness, warmth, intimacy — like the guitarist doesn't quite want to play but can't help it. On-the-beat playing sounds clinical by comparison." },
        { text: "Loop the progression with the lo-fi strum at 110 BPM, behind the beat, for 2 minutes straight. Let the repetition sink in. Don't try to make it interesting — the beauty is in the simplicity and the feel. Record the last minute.", why: "Extended repetition of a simple progression with intentional feel builds the muscle memory for lazy, behind-the-beat playing. This is NOT a song to power through — it's a song to LIVE in." },
        { text: "Tempo build: try the same progression at 120, then 130 BPM (close to the actual song tempo). Keep the behind-the-beat feel even as the tempo increases — the laziness should persist regardless of speed.", why: "Maintaining a behind-the-beat feel at higher tempos is a genuine skill. The tendency is to rush when the tempo increases. Discipline your internal clock to always sit slightly behind the click." }
      ],
      feel: "This should feel dreamy, hazy, slightly melancholic — like watching a sunset through a dirty window. The strum is gentle, the timing is lazy, the reverb blurs everything into a warm wash. The opposite of the aggressive energy from earlier in this level.",
      wrong: "If it sounds stiff or mechanical, you're strumming too precisely on the beat. Relax your wrist, loosen your grip on the pick, and let the strum FLOAT behind the click. If it sounds muddy, check that your chord transitions are clean — lo-fi feel doesn't mean sloppy technique.",
      sarah: "Gene, Eyedress embodies lo-fi indie — reverb-drenched, slightly out of focus, emotionally raw. Something About You is in your top 50 because it captures that golden-hour-ending-soon energy. Simple chords, simple strum, all vibe. This is the other side of what guitar can do — not power, but feeling. When you can switch between Summer Heat energy and Something About You intimacy, you're becoming a real guitarist.",
      metronome: 110,
      recorder: true,
      chordVoicings: { chords: ["F", "Em", "Am", "Dm"] },
      levelUp: "Can play F→Em→Am→Dm at 120 BPM with a lo-fi sparse strum and behind-the-beat feel — strums land slightly after the click."
    },

    // ─── IMPROV & APPLICATION ───

    {
      id: "gs-3-9",
      time: 8,
      title: "Power Chord Riff Factory",
      type: "guitar",
      what: "Create your own power chord riffs over a backing track. Use A5, D5, E5, and B5 with palm muting and open hits. You have all the tools from this level — now use them freely. No right answers, no wrong notes (they're all power chords). Just build riffs and see what sticks.",
      setup: "Guitar. Gain/overdrive. Metronome at 90 BPM.",
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }, { name: "Drums — Surf 120", src: "/drums-surf-120.mp3" }],
      steps: [
        { text: "Start the backing track. Play a 2-bar riff using only A5 and E5 with palm muting. Keep it SIMPLE — 4-6 strums total per 2 bars. Feel the chunky thud of each muted hit against your chest — that physical pulse IS the riff's groove. Repeat it 4 times. Does your head nod? Does your body want to move? If yes, you've got a riff. If not, try a different rhythm.", why: "Constraint breeds creativity. Two chords + palm muting + a specific rhythm = a riff. The body-nod test is real neuroscience — when your body involuntarily responds to the groove, the riff has locked into your motor cortex. The Ramones built a career on two-chord riffs. So did AC/DC." },
        { text: "Build a second riff using D5 and B5. Different rhythm, different energy. Contrast it with your first riff. Riff 1 could be the verse, Riff 2 could be the chorus. You're writing a song structure without even trying.", why: "Having two contrasting riffs is the foundation of song structure. Verse riff = lower energy (palm muted, sparse). Chorus riff = higher energy (open, denser). This two-riff approach is how most rock songs are built." },
        { text: "Run PReVaDe on your best riff: Present (4x) → Repeat (4x) → Vary (one change, 4x) → Deconstruct (dissolve). Apply the framework you learned in gs-3-7 to your own original material.", why: "PReVaDe works on any riff. Using it on YOUR creation connects the framework to your own musical voice. The riff was born from your instinct; the framework gives it structure." },
        { text: "Improvise freely: 3 minutes over the backing track. Switch between all your power chords (A5, D5, E5, B5), vary palm muting and open hits, try different rhythms. Don't repeat anything on purpose — let riffs emerge and dissolve. Record the whole thing.", why: "Free improvisation with power chords is low-risk, high-reward. Every chord sounds good (they're all consonant), so you can focus entirely on rhythm, dynamics, and feel. This is creative play, not a test." },
        { text: "Listen back. Find the 5-second moment where you played something that surprised you — a riff you didn't plan, a rhythm that came from nowhere. That's your creative instinct talking. Now close your eyes and try to replay that moment in your mind — hear the riff internally. Can you audiate it? If yes, you've captured it in the deepest way possible: not on a recording, but in your inner ear.", why: "Self-listening for unexpected moments trains you to recognize your own musical instincts. The best riffs often come from unplanned moments during improvisation. Audiating them afterward — hearing them in your mind — transfers them from accidental discovery to internalized vocabulary (Aarhus 2021: mental imagery consolidates motor learning as effectively as physical practice)." }
      ],
      feel: "This should feel playful and energizing — you're a kid with a new set of tools, building things just to see what happens. No pressure to create a masterpiece. Just riff, listen, adjust, riff more. When a riff makes you smile or nod your head, linger on it.",
      wrong: "If every riff sounds the same, vary your RHYTHM more. Same chords with a different rhythm = a completely different riff. If nothing feels catchy, simplify — sometimes the best riff is just two hits and a rest. If you're overthinking, close your eyes and just play.",
      sarah: "Gene, The Growlers, Mystic Braves, and Pepper all write riffs exactly like this — two or three power chords, a catchy rhythm, palm muting for dynamics. Brooks Nielsen from The Growlers says the best riffs come from 'playing the same thing until something interesting falls out.' That's what this exercise is. Play until something falls out.",
      metronome: 90,
      phraseForm: { pattern: "PRVD", barsPerSection: 4, labels: { P: "Present", R: "Repeat", V: "Vary", D: "Deconstruct" } },
      recorder: true,
      levelUp: "Can create two distinct power chord riffs on the spot, run PReVaDe on one of them, and improvise freely for 2 minutes without stopping."
    },
    {
      id: "gs-3-10",
      time: 7,
      title: "Palm Mute Dynamics — Volume as Expression",
      type: "guitar",
      what: "Palm muting isn't binary (muted vs. open). It's a GRADIENT. Light mute = slightly dampened ring. Medium mute = percussive with pitch. Heavy mute = pure chunk. Moving through this gradient within a single phrase turns a power chord riff into a living, breathing thing.",
      setup: "Guitar. Clean tone (dynamics are clearest without gain). Metronome at 80 BPM.",
      steps: [
        { text: "Play 8 strums on E5, all palm muted — but vary the mute DEPTH. Start with heavy mute (just thud) — feel the string barely move under your palm, the chest vibration almost silent. Then gradually lift pressure over 8 strums until the last one rings almost open — feel the vibration bloom under your palm, travel through the guitar body, and fill your chest. You're playing a crescendo with your palm, not your strum force.", why: "Most guitarists treat palm muting as on/off. The gradient between full mute and full ring is where expression lives. The changing sensation under your palm — from dead stillness to full buzz — is your body's real-time feedback on the dynamic curve." },
        { text: "Reverse: start open (full ring) and gradually press your palm into the strings over 8 strums until the last one is fully muted. This is a decrescendo using only your picking hand. Strum force stays constant.", why: "The reverse gradient (open to muted) creates a dying-away effect — the riff fades into the background like a film dissolve. Combined with the opening gradient, you can shape long phrases with just your palm." },
        { text: "Apply to a progression: E5 → A5, 4 strums each. E5 goes from muted to open (building). A5 goes from open to muted (retreating). The energy rises and falls across the chord change. It breathes.", why: "Breathing dynamics — energy that rises and falls naturally — is what separates a living performance from a mechanical one. When the dynamics follow a natural arc (build → release → build), the music feels organic." },
        { text: "Create a 4-bar phrase: bar 1 heavily muted (tension building), bar 2 medium mute (opening up), bar 3 fully open (climax), bar 4 muting back down (resolution). Play this arc on E5→A5→B5→E5. Record it.", why: "A 4-bar dynamic arc is a complete musical phrase. This shape — build, open, climax, resolve — appears in every genre from classical to punk. You're learning composition through dynamics, not harmony." },
        { text: "Improvise with dynamics: play E5→A5→D5→E5 for 3 minutes. Forget about riffs — focus ONLY on the palm mute gradient. Heavy mute, light mute, open, back to mute. Let the dynamics tell a story. The chords stay simple so your attention is on the feel of your picking hand.", why: "Extended dynamic improvisation builds an instinctive connection between your emotional intent and your picking hand. Eventually, you won't think about mute depth — you'll feel 'I want this to be quieter' and your palm will respond automatically." }
      ],
      feel: "This should feel like breathing — the palm presses and lifts like a tide. The heavy mutes feel intimate and restrained. The open hits feel expansive and free. The gradient between them feels like a slow exhale.",
      wrong: "If your muting sounds the same at every depth, you're not moving your palm enough. Exaggerate: press hard enough to completely kill the strings (too much), then barely touch them (too little). Find 5 distinct points between those extremes. If the transitions are jerky, slow down — smooth gradients take practice.",
      sarah: "Gene, listen to how Tinariwen's rhythm guitar breathes — it's not always the same volume or mute depth. The guitar swells and recedes like the wind across the Sahara. That organic, breathing quality comes from EXACTLY this technique: varying your palm mute depth within a phrase. Even Pepper's palm-muted chugging has dynamic variation — the best rhythm guitarists never play at one static level.",
      metronome: 80,
      volumeMeter: true,
      recorder: true,
      levelUp: "Can play a 4-bar dynamic arc (heavy mute → medium → open → muted) on a power chord progression with smooth, gradual transitions between mute depths."
    },

    // ─── EXTENDED JAM ───

    {
      id: "gs-3-11",
      time: 10,
      title: "Extended Jam: Power & Feel — The Full Toolkit",
      type: "guitar",
      what: "Everything from Level 3 in one extended jam. Power chords, palm muting, dynamics, PReVaDe, half-time feel, syncopated strumming, gain. Pick a backing track, set a vibe, and play for 8 minutes. This is your graduation performance — not a test, but a celebration of what you can do.",
      setup: "Guitar. Choose your gain level. Pick a backing track that matches your mood. Metronome optional — the track provides the pulse.",
      tracks: [
        { name: "Psych Rock 120", src: "/psych-rock-120.mp3" },
        { name: "Groove Beat 90", src: "/groove-beat-90.mp3" },
        { name: "Surf Rock 120", src: "/surf-rock-120.mp3" },
        { name: "Drums — Surf 120", src: "/drums-surf-120.mp3" }
      ],
      steps: [
        { text: "Choose a backing track and start it. Begin with palm-muted power chords — E5, A5, whatever feels right. Feel the muted thud in your palm and the controlled pulse in your chest. Establish a groove. Let it repeat for 8 bars — feel how the repetition sinks the rhythm deeper into your body with each pass. Don't rush to the interesting stuff — let the muted chugging build anticipation.", why: "Starting muted builds tension for the inevitable release. The physical containment — palm dampening the vibration, chest receiving only a fraction of the resonance — mirrors the musical restraint. Every great rock performance starts with this coiled energy." },
        { text: "Open up: lift the palm mute and let the power chords ring. Feel the transformation in your body — your palm lifts free, the guitar body suddenly buzzes with full resonance against your chest, the room fills with sound. Stay open for 8 bars. Your whole physical engagement changes — more arm, more shoulder, more space. Add a different strum pattern — syncopated like Sun Room, or half-time like The Growlers. Let the vibe guide you.", why: "The muted-to-open transition you've been practicing is now happening in context — as part of a real musical journey. The physical shift — from controlled dampening to full-body resonance — is the embodied version of the musical release. The choice of strum pattern (syncopated vs. half-time) changes the genre in real time." },
        { text: "Run a PReVaDe cycle within the jam: find a riff you like, Present it, Repeat it, Vary it, Deconstruct it back to muted chugging. The framework gives structure to improvisation without killing spontaneity.", why: "PReVaDe inside an extended jam is exactly how it's used in real performance — Tinariwen develop motifs this way over 10-minute songs. The framework ensures your jam has shape rather than being random noodling." },
        { text: "Autopilot check: at the 4-minute mark, pause and ask — did I CHOOSE those last 4 bars, or did my fingers choose them? If you were on autopilot, stop for 4 beats of silence. Close your eyes. Hear the next riff internally before playing it. Then re-enter the jam with intention.", why: "The autopilot diagnostic is the bridge between Level 1's audiation check (gs-1-13) and the deeper audiation work ahead. Mid-jam awareness — noticing when your fingers are leading instead of your ears — is the core skill of intentional improvisation. Even catching it once per jam starts building the habit." },
        { text: "Shift dynamic gears: try the lo-fi Eyedress feel — gentle strumming, behind the beat, lots of space. Then build back to aggressive Mystic Braves fuzz chugging. Move between the poles of this level: gentle intimacy and aggressive drive.", why: "The ability to shift between vastly different energies within one continuous jam is what separates a guitarist from someone who just knows chords. You're not just playing — you're PERFORMING." },
        { text: "Wind down. Over the last 2 minutes, gradually reduce everything — lighter strums, heavier palm muting, more space between hits, until you're playing single muted thuds with silence between them. Let the jam dissolve. Record the full session.", why: "A deliberate ending gives your jam a complete arc — it began from nothing, built to a peak, and returned to nothing. This is the shape of great music at every scale, from a 30-second riff to a 30-minute set." }
      ],
      feel: "This should feel like a journey. You start restrained, build through different energies and techniques, explore the space, and wind down. When it's over, you should feel like you went somewhere — not just played some chords.",
      wrong: "If the jam feels like a random collection of exercises strung together, you're switching techniques too often. Stay in each zone for at least 8 bars before transitioning. If it feels stuck in one gear, push yourself to try the opposite energy — if you've been chugging, go gentle. If you've been gentle, attack. End the jam on something you played well — a clean riff, a solid groove. Your brain encodes the ending.",
      sarah: "Gene, this is your golden hour set in miniature — the dark moody energy of The Growlers, the bright surf drive of Sun Room, the lo-fi dreaminess of Eyedress, the fuzz-wall intensity of Mystic Braves. All connected by power chords and your pick hand. You have more tools than you think. This jam proves it. When you can play 8 minutes and it feels like a journey, not a drill, you're ready for Level 4.",
      recorder: true,
      levelUp: "Can sustain an 8-minute improvised jam using power chords, palm muting, dynamic gradients, and PReVaDe structure over a backing track — with clear dynamic contrast between sections and a deliberate arc from start to finish."
    },

    // ─── AUDIATION DIAGNOSTIC ───

    {
      id: "gs-3-12",
      time: 8,
      title: "Audiate, Sing, Find — The Three-Failure-Point Diagnostic",
      type: "guitar",
      drone: { root: "A", octave: 2, texture: "analog" },
      referencePitches: getPitchRange("A2", "A4"),
      fretboard: { scale: "am-pentatonic", position: 1 },
      pitchContour: true,
      what: "This exercise diagnoses exactly where your ear-to-hand chain breaks. Three steps: (1) audiate a target note silently, (2) sing it out loud, (3) find it on the fretboard. Each step can fail independently. If you can audiate but can't sing it, the problem is voice control. If you can sing but can't find it, the problem is fretboard mapping. If you can't audiate at all, the problem is inner hearing. Knowing WHERE the chain breaks tells you exactly what to practice.",
      setup: "Guitar in tune. Drone on A. Pitch detector on. Open your eyes for the fretboard check, close them for everything else.",
      steps: [
        { text: "Turn on the drone (A). Close your eyes. Silently imagine the note C — the minor 3rd above A. Don't hum, don't move your fingers, just hear it internally. Take 10 seconds. Is it vivid? Can you hold it steady in your mind? If the note keeps drifting or you can't hear anything, that's diagnostic data — your inner hearing needs strengthening.", why: "Audiation — hearing music internally without external sound — is Gordon's Stage 6 of musical development. It activates auditory cortex BEFORE motor cortex, which means you're planning the sound before executing it. Most guitarists skip this entirely and let their fingers choose notes. Building this skill means every note you play was heard first (Aarhus 2021: combined imagery + playing = equal learning in 1/3 the time)." },
        { text: "Eyes still closed. Now sing or hum the note you're imagining — the C. Don't play the guitar yet. Just sing it. As you sing, notice WHERE the vibration lands in your body. C sits in the throat and jaw area — feel the buzz there. If you audiated C but the vibration lands deep in the chest (where A lives), your pitch may be off — you might be singing lower than you think. The body address is a second verification channel: each note has a specific location, and when the location doesn't match the target, that's diagnostic data before you even check the pitch detector. Open your eyes briefly and check. Were you close?", why: "The audiation-to-voice link is the most revealing diagnostic in music. Adding somatic verification (checking WHERE the vibration lands) gives you a body-based error signal that's faster than checking the pitch detector. Zamorano 2025 showed body awareness predicts pitch accuracy (R²=0.41) — meaning the body-location check is not just a feeling but a measurably valid diagnostic. If you heard C internally but the vibration landed in chest (A's address), you have two independent signals that the pitch was wrong: ear and body." },
        { text: "Now find C on the fretboard without looking at the diagram. Close your eyes, audiate C, and reach for where you believe it lives. Play the note. Open your eyes — check the fretboard diagram. Were you right? The A string 3rd fret is C, the B string 1st fret is C. Try 3 different octaves.", why: "The sing-to-fretboard link tests your spatial map of pitch. Pascual-Leone 1995 showed that mental practice reshapes motor cortex maps — meaning visualization of fretboard positions literally builds the neural pathways for finding notes. Close eyes to audiate, open to check, close for next rep." },
        { text: "Full chain, 10 reps: Close eyes → audiate a note from Am pentatonic (A, C, D, E, or G) → sing it → find it on the fretboard → play it → check. Score yourself: how many of the 10 were perfect through all three stages? Where did most failures occur — audiation, singing, or finding?", why: "Ten reps with honest scoring creates a diagnostic baseline. If 7/10 fail at the singing stage, you know to prioritize voice-ear calibration. If 7/10 fail at the fretboard stage, you know to prioritize spatial mapping. The diagnostic is more valuable than the exercise itself — it tells you what to practice tomorrow." },
        { text: "For any stage where you failed more than half: spend 2 minutes on targeted repair. Can't audiate? Play the note, remove it, try to hold it in memory for 5 seconds, then 10. Can't sing it? Play and sing in unison 10 times, then sing alone. Can't find it? Close eyes, visualize the fretboard, point to where the note lives, then check.", why: "Targeted repair at the specific failure point is dramatically more efficient than generic practice. This is the CLA principle (Gray 2018) — constraining practice to the weakest link forces that link to strengthen, rather than letting strong links compensate and mask the weakness." }
      ],
      feel: "This should feel like a diagnostic — honest, clinical, revealing. It's not about sounding good. It's about finding out exactly where your ear-to-hand chain needs work. The information IS the exercise. Treat failures as data, not as mistakes.",
      wrong: "If you're peeking at the fretboard while audiating, you're bypassing the exercise. Eyes closed for audiation and singing, eyes open only to verify. If you're guessing instead of truly hearing the note internally, slow down — put on the drone, play C once, remove it, and try to hold the memory of C for 5 full seconds before singing. If everything feels easy, use harder intervals: try the 6th (F#) or the flat 7th (G).",
      sarah: "Gene, this exercise is the diagnostic version of gs-1-13 — but instead of just asking 'can you sing it?', it pinpoints exactly WHERE the chain breaks. Your contemplative approach is perfect for this — it's awareness practice applied to music. When Tinariwen guitarists learn a phrase, they hear it first, sing it, then find it. Three steps, same order, every time. The Western shortcut of 'fingers first, ears later' is what this exercise corrects.",
      metronome: 60,
      recorder: true,
      levelUp: "Can audiate any note in the Am pentatonic, sing it within a semitone, and find it on the fretboard within 3 seconds — with 7/10 success rate across all three stages."
    }
  ]
};
