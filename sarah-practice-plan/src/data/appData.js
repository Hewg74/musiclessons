import { ALL_NOTES, getPitchRange } from "./utils.js";
export { ALL_NOTES, getPitchRange };
import { CURRENT_WEEK } from "./weeklyPlans/index.js";

export const DAYS = CURRENT_WEEK.days;

export const KEYBOARD_LEVELS = [
  {
    num: 1, name: "The Chop", focus: "Offbeat stabs",
    duration: "60 min",
    setup: "KeyLab 49 connected to Ableton. Open Analog Lab V plugin, browse Farfisa V or Vox Continental V category and pick any combo organ preset. Practice app open in browser for metronome.",
    exercises: [
      {
        id: "k1e0", time: 10, title: "Where Are You Right Now? — Keys Baseline", type: "keys",
        recorder: true,
        pianoKeys: { notes: ["C4", "E4", "G4"], label: "Play What You Know" },
        what: "Record a baseline of where you are RIGHT NOW on keys. This recording is sacred — you'll listen back months from now and not believe it's the same person.",
        setup: "Any organ preset loaded. Recorder ready in the practice app.",
        steps: [
          { text: "Play any chords you know on the keyboard. If you don't know any, just hold down any keys that sound good together. 30 seconds.", why: "This captures your current chord vocabulary — whether that's ten chords or zero. Both are fine starting points." },
          { text: "Try to play an offbeat rhythm on any chord. If you don't know what offbeat means yet, just play a steady rhythm — any rhythm.", why: "This captures your current rhythmic awareness on keys. The offbeat is coming in the very next exercise." },
          { text: "Try playing with both hands — left hand plays low notes, right hand plays high notes. Any notes, any rhythm. 30 seconds.", why: "Hand independence baseline. Most guitarists starting keys have near-zero two-hand coordination. That's completely normal." },
          { text: "Free improvise for 30 seconds. Noodle, hold chords, make any sounds. Whatever feels natural.", why: "This captures your musical instincts on keys — what you gravitate toward without instruction." },
          { text: "Speak into the mic: 'I am starting keys training on [today's date]. Right now I feel [your honest feeling] about playing keyboard.'", why: "The spoken timestamp makes this recording findable and personal. Your future self will thank you." }
        ],
        feel: "No pressure. This isn't a test — it's a time capsule. Play badly, play well, play whatever. The only goal is to capture where you are today.",
        wrong: "There is no wrong here. If you froze up and played nothing, that IS the baseline. Record the silence.",
        sarah: "I do this with every new student. The recording is sacred — it's proof of where you started. Months from now you'll listen back and not believe it's the same person.",
        metronome: 80,
        levelUp: "Recording saved. That's it. You passed."
      },
      {
        id: "k1e1", time: 10, title: "Single-Chord Offbeat Stab", type: "keys",
        referencePitches: ["C4", "E4", "G4"],
        pianoKeys: { notes: ["C4", "E4", "G4"], label: "C Major Triad" },
        what: "C major triad: thumb on C4, middle finger on E4, pinky on G4 (fingers 1-3-5). Short percussive stab on every &. Same nod you already do: DOWN on numbers, play on UP-nod.",
        setup: "Organ preset loaded. Metronome at 80 BPM.",
        steps: [
          { text: "Place right hand on C major: thumb C4, middle finger E4, pinky G4 (1-3-5).", why: "Standard triad fingering. Same shape moves to any root." },
          { text: "Start metronome at 80 BPM. Nod: DOWN on numbers, UP on &'s.", why: "Same nod from your &'s Only drill. The rhythm is already in your body." },
          { text: "Stab the chord on every & (up-nod). Bounce off the keys like they're hot.", why: "The RELEASE is the skill. The Taubman approach to keyboard technique teaches that expressiveness comes from arm weight and release, not finger pressing. On organ — where there's no velocity sensitivity — your attack and release timing IS your entire dynamic vocabulary. A 2017 JASA study found that organ key-click (the percussive transient of a fast key press) functions as an expressive timbral element. Your stab's 'snap' is actually musical." },
          { text: "4-8 bars, rest 10 seconds, repeat 3-4 times.", why: "Short sets. Quality over speed. Same principle as Sarah's counting drills." }
        ],
        feel: "A hiccup between beats. Same groove pocket as your &'s Only vocal drill. The silence on the numbers should feel deliberate.",
        wrong: "If stabs land ON the beat, slow to 70 and exaggerate silence on numbers. If notes ring too long, focus on the release speed — fingers off the keys faster.",
        sarah: "Listen to Skinshape's 'I Didn't Know' — the organ rests on beat 1 and strikes on the off-beats. This syncopated soul/dub style means your hand lifts OFF the keys as fast as it presses down. The staccato is created by key release, not by playing short notes. The audio analysis confirms: Skinshape's chords are cut off almost immediately — the organ acts as a percussion instrument.",
        metronome: 80,
        levelUp: "8 bars of even stabs at 90 BPM with clean release."
      },
      {
        id: "k1e2", time: 10, title: "Chord Change Chop (I-IV-V)", type: "keys",
        referencePitches: ["C4", "E4", "G4", "F4", "A4"],
        pianoKeys: { notes: ["C4", "E4", "G4", "F4", "A4", "C5", "G4", "B4", "D5"], label: "I-IV-V: C F G" },
        chordTimer: { chords: ["C", "F", "G"], duration: 60 },
        what: "C(2 bars)-F(2 bars)-G(2 bars)-C(2 bars), chopping on &'s. Same finger shape shifts — thumb-middle-pinky stays 1-3-5.",
        setup: "Same organ preset. Metronome at 76 BPM.",
        steps: [
          { text: "C = C4-E4-G4, F = F4-A4-C5, G = G4-B4-D5. All fingered 1-3-5.", why: "Same hand shape, just shifts position. Learn the jumps." },
          { text: "Chop C for 2 bars, then jump to F for 2 bars, G for 2 bars, back to C.", why: "The hardest moment is the transition. Hand jumps AND must land on the &." },
          { text: "Isolate just the C-to-F transition: chop C, jump to F, chop F, jump back. Repeat until instant.", why: "If there's a rhythmic gap at chord changes, this is where you fix it." },
          { text: "Run full cycle: C-F-G-C. 4 cycles without stopping.", why: "Building the muscle memory for the most common chord progression in music." }
        ],
        feel: "The transitions should feel like gear shifts — brief, smooth, no gap in the rhythm. The chop doesn't stop for chord changes.",
        wrong: "If there's a gap in rhythm at chord changes, slow down 5 BPM and isolate just the two-chord transition back and forth until the jump is instant.",
        metronome: 76,
        levelUp: "4 cycles at 84 BPM with no rhythmic gaps at chord changes."
      },
      {
        id: "k1e3", time: 10, title: "Bubble Organ", type: "keys",
        pianoKeys: { notes: ["C4", "E4", "G4"], label: "C Major — Bubble Hold" },
        metronomeMode: "reggae-skank",
        what: "Longer offbeat hold (dotted eighth) — the breathing reggae organ sound. Press-hold-release-silence pattern. The silence before each press = the bounce.",
        setup: "Same organ preset. Metronome at 72 BPM.",
        steps: [
          { text: "Play C major on the &, but HOLD longer — about 60% of the space between beats.", why: "This is the 'bubble' — the reggae organ's signature sound. Tyrone Downie, Bob Marley's keyboardist, described it as 'felt more than heard.' Berklee's reggae keyboard analysis shows the bubble uses only the 8-foot drawbar (Hammond's third from left) — a single setting that sits below the vocal and above the bass. The longer hold creates that characteristic breathing pulse that defines roots reggae." },
          { text: "The release creates a brief silence before the next &. That silence IS the bounce.", why: "Press-hold-release-silence. The silence makes it breathe." },
          { text: "Now alternate: 2 bars chop (short stabs), 2 bars bubble (long holds).", why: "Having both textures gives you dynamic range within the same rhythm." },
          { text: "Apply to C-F-G-C progression with bubble feel throughout.", why: "Same chords, different texture. The bubble makes it feel like waves." }
        ],
        feel: "Keys are breathing. Waves lapping on shore. The hold should feel lazy and warm, not tight.",
        wrong: "If the bubble sounds the same as the chop, you're releasing too early. Hold longer — almost until the next beat, then release just before.",
        sarah: "This is the exact organ sound from Skinshape's 'I Didn't Know' — that breathing reggae pulse. Your Farfisa preset in Analog Lab V has this tone built in. Surf Hat uses E7-A7-B7-F#7 — all dominant 7th chords on the organ. The dominant 7ths add a bluesy, unresolved tension to the reggae bubble. Try your offbeat stabs with 7th voicings instead of triads — the sound gets instantly more sophisticated. The 'bubble' is created by LIFTING the keys quickly after each stab — sustain is controlled by key lift, not a pedal.",
        metronome: 72,
        levelUp: "Smoothly alternate chop and bubble at 80 BPM on the I-IV-V-I."
      },
      {
        id: "k1e4", time: 10, title: "Minor Chord Chop", type: "keys",
        referencePitches: ["A3", "C4", "E4", "D4", "F4", "A4", "B3", "G4"],
        pianoKeys: { notes: ["A3", "C4", "E4", "D4", "F4", "A4", "E4", "G4", "B4"], label: "Am-Dm-Em Minor Chords" },
        what: "Am-Dm-Em-Am chopping on &'s. Reggae lives in minor keys — this is the actual sound. Different hand shapes from the major chords you learned.",
        setup: "Organ preset. Metronome at 76 BPM.",
        steps: [
          { text: "Am = A3-C4-E4 (1-3-5). Chop 4 bars. Hear how it's darker, more melancholy than C major.", why: "Minor triads have a completely different emotional weight. This is roots reggae territory." },
          { text: "Dm = D4-F4-A4 (1-3-5). Chop 4 bars. Then Em = E4-G4-B4 (1-3-5).", why: "Three minor shapes. Each feels different under the hand." },
          { text: "Am-Dm-Em-Am progression, 2 bars each, chopping on &'s.", why: "Minor i-iv-v-i = the most common reggae progression. Bob Marley, Peter Tosh, Skinshape all live here." },
          { text: "Compare: play C-F-G-C (major) then Am-Dm-Em-Am (minor). Feel the mood shift.", why: "Same technique, completely different emotional impact. You need both." }
        ],
        feel: "Darker, more soulful. If major chords are midday sun, minor chords are golden hour. The chop should feel weightier.",
        wrong: "If Am sounds the same as C to you, play them back to back without the metronome. The interval from A to C (minor 3rd) vs A to C# (major 3rd) is the entire emotional difference.",
        sarah: "Minor reggae is your band's home key. Am-Dm-Em on organ puts you in Skinshape, Peter Tosh, and BALTHVS territory — your exact playlist.",
        metronome: 76,
        levelUp: "Am-Dm-Em-Am at 84 BPM with the same crisp chop as your major progression."
      },
      {
        id: "k1e5", time: 10, title: "Chop Tempo Ladder", type: "keys",
        pianoKeys: { notes: ["A3", "C4", "E4", "F4", "A4", "C5", "G4", "B4", "D5"], label: "Am-F-C-G Chop" },
        what: "Same Am-F-C-G chop at increasing tempos: 70, 80, 90, 100, 110 BPM. Find where your technique breaks down — that's your current ceiling.",
        setup: "Organ preset. Start metronome at 70 BPM.",
        steps: [
          { text: "70 BPM: 8 bars. This should feel easy, almost too slow. Focus on perfect release.", why: "Slow tempos reveal sloppy technique. If it's not clean here, it won't be clean faster." },
          { text: "80 BPM: 8 bars. Your Phase 1 comfort zone.", why: "This should feel like home by now." },
          { text: "90 BPM: 8 bars. Getting into real song territory (Groove Beat 90).", why: "Most of your backing tracks live around here." },
          { text: "100 BPM: 8 bars. Then 110 BPM: 8 bars. Where does it fall apart?", why: "The tempo where your stabs get sloppy or land on the beat = your ceiling. That's what you practice tomorrow." }
        ],
        feel: "Like shifting gears. Each jump should feel like a small challenge. The highest tempo where you're still clean = your working range.",
        wrong: "If you're sloppy above 90, don't push. Stay at 90 for a week. Speed comes from clean repetition, not from forcing.",
        metronome: 70,
        speedLadder: { start: 70, end: 110, increment: 10, bars: 8 },
        levelUp: "Clean chop at 110 BPM with no stabs landing on the beat."
      }
    ]
  },
  {
    num: 2, name: "Sound Good", focus: "Voicings + register",
    duration: "70 min",
    setup: "KeyLab 49 + Ableton + Analog Lab V. Same organ preset, or browse B-3 V category for a drawbar/Hammond-style organ.",
    exercises: [
      {
        id: "k2e1", time: 10, title: "Triad Inversions", type: "keys",
        referencePitches: ["C4", "E4", "G4", "C5"],
        pianoKeys: { notes: ["C4", "E4", "G4", "C5"], label: "C Major Inversions" },
        what: "Root position (C-E-G), 1st inversion (E-G-C), 2nd inversion (G-C-E) — same chord, three colors. 1st inversion = classic reggae skank. 2nd inversion = open, spacious, great for surf.",
        setup: "Organ preset. Metronome at 76 BPM.",
        steps: [
          { text: "Play C root position: C4-E4-G4 (1-3-5). Chop 4 bars.", why: "This is what you know. Home base." },
          { text: "Play C 1st inversion: E4-G4-C5 (1-3-5). Chop 4 bars. Hear the brightness.", why: "1st inversion = the classic reggae skank sound. Bright, cuts through the mix." },
          { text: "Play C 2nd inversion: G4-C5-E5 (1-3-5). Chop 4 bars. Hear the openness.", why: "2nd inversion = open, spacious. Great for surf and dreamy sections." },
          { text: "Now play C-F-G-C: C in 1st inversion (E4-G4-C5), F in root position (F4-A4-C5), G in root position (G4-B4-D5), back to C 1st inversion (E4-G4-C5).", why: "1st inversion C keeps you in the sweet spot. F and G are root position here — notice the minimal hand movement." }
        ],
        feel: "Each inversion should sound noticeably different even though it's the same chord. 1st inversion should feel 'right' for the chop — bright and cutting.",
        wrong: "If all inversions sound the same to you, play them back to back slowly without the metronome. The color difference is subtle but real.",
        metronome: 76,
        levelUp: "I-IV-V-I in first inversion at 80 BPM with confident chop."
      },
      {
        id: "k2e2", time: 10, title: "The Sweet Spot (C4-C5 Range)", type: "keys",
        pianoKeys: { notes: ["E4", "G4", "C5", "A4", "F4"], label: "C-Am-F-G Sweet Spot", range: ["C4", "D5"] },
        what: "All chords voiced between middle C and the C above it. Below C4 = bass player's territory. Above C5 = thin. C4-C5 = the pocket where reggae/indie keys live.",
        setup: "Organ preset. Metronome at 76 BPM.",
        steps: [
          { text: "Voice-led C-Am-F-G: C = E4-G4-C5 (1st inv), Am = A4-C5-E5 or C4-E4-A4 (1st inv), F = F4-A4-C5 (root), G = G4-B4-D5 (root).", why: "Find inversions where your hand barely moves between chords. Opposite of guitar reshaping." },
          { text: "Play through C-Am-F-G slowly. Move only 1-2 fingers per change.", why: "Voice leading is the oldest compositional principle in Western music — Bach's four-part chorale rules live here. On keyboard, it means: shared tones stay put, other voices move by the smallest interval possible. Motor learning research shows minimal hand movement reduces the brain's bilateral coordination penalty. Less motion = cleaner transitions = more musical result." },
          { text: "Chop the progression. Focus on staying in the C4-C5 range.", why: "This range sits above the bass and below the vocal. The keyboard pocket." },
          { text: "Try different inversion combos. Find what sounds best to YOUR ear.", why: "There's no single right answer. Trust your ear training from Sarah's work." }
        ],
        feel: "The progression should flow smoothly. Your hand barely moves. Each chord change should feel like a small adjustment, not a big jump.",
        wrong: "If your hand is jumping more than a 3rd between chords, you're using the wrong inversions. Find the inversion where the most notes stay the same.",
        metronome: 76,
        levelUp: "Voice-led C-Am-F-G at 84 BPM with minimal hand movement."
      },
      {
        id: "k2e3", time: 10, title: "Add9 and Sus Voicings", type: "keys",
        referencePitches: ["C4", "D4", "E4", "F4", "G4", "A4", "B♭4"],
        pianoKeys: { notes: ["E4", "G4", "C5", "D5", "F4", "G4"], label: "Cadd9 / Fsus2 / Gsus4" },
        what: "Cadd9, Fsus2, Gsus4 — the beachy shimmer. These are the voicings that make indie/surf keys sound like themselves instead of generic.",
        setup: "Organ preset. Metronome at 72 BPM.",
        steps: [
          { text: "Cadd9: E4-G4-C5-D5 (fingers 1-2-4-5). The D5 adds shimmer.", why: "This is Skinshape and BALTHVS territory. The add9 = instant beach." },
          { text: "Fsus2: F4-G4-C5 (fingers 1-2-5). No 3rd = dreamy, floating ambiguity.", why: "Removing the 3rd removes major/minor identity. Pure atmosphere." },
          { text: "Gsus4: G4-C5-D5 (fingers 1-4-5). Resolve to G major: G4-B4-D5 (1-3-5).", why: "Sus4 to major = classic reggae/surf tension-release." },
          { text: "Full progression: Cadd9-Am-Fsus2-Gsus4(resolve to G). Chop it.", why: "This is immediately usable in the band. Extended voicings + chop = your sound." }
        ],
        feel: "These voicings should sound richer and more interesting than plain triads. The add9 sparkles, the sus2 floats, the sus4 pulls toward resolution.",
        wrong: "If the 4-note voicings feel cramped, spread your hand wider. Fingers 1-2-4-5 skips the middle finger — let it hover.",
        sarah: "The add9 and sus voicings are what separate your keys sound from generic organ. Cadd9 with tremolo IS the Skinshape/BALTHVS beach sound.",
        metronome: 72,
        levelUp: "Fluent Cadd9-Am-Fsus2-Gsus4-G progression at 80 BPM."
      },
      {
        id: "k2e4", time: 10, title: "Minor Inversions", type: "keys",
        pianoKeys: { notes: ["A4", "C5", "E5", "C4", "E4", "A4", "D4", "F4"], label: "Am-Dm-Em Inversions" },
        what: "Am, Dm, Em in root, 1st, and 2nd inversion. Minor inversions feel different under the hand — the intervals are flipped compared to major. 1st inversion minor = warm and dark, the go-to reggae voicing.",
        setup: "Organ preset. Metronome at 72 BPM.",
        steps: [
          { text: "Am root: A4-C5-E5 (1-3-5). 1st inv: C4-E4-A4 (1-3-5). 2nd inv: E4-A4-C5 (1-3-5).", why: "Play each, hear the color difference. 1st inversion Am = the classic reggae minor sound." },
          { text: "Dm root: D4-F4-A4. 1st inv: F4-A4-D5. 2nd inv: A4-D5-F5.", why: "Same three shapes. 1st inversion Dm sits perfectly in the C4-C5 sweet spot." },
          { text: "Em root: E4-G4-B4. 1st inv: G4-B4-E5. 2nd inv: B4-E5-G5.", why: "Em 2nd inversion reaches high — good for cutting through a full band." },
          { text: "Am-Dm-Em-Am all in 1st inversion. Chop it. Feel the voice leading.", why: "1st inversion minor progression with minimal hand movement = your dark-mood sound." }
        ],
        feel: "1st inversion minor chords sound warm and intimate. The progression should feel like it's telling a story — melancholy but beautiful.",
        wrong: "If minor inversions all sound the same, play root position then 1st inversion back to back on the same chord. The bass note changes the whole character.",
        metronome: 72,
        levelUp: "Am-Dm-Em-Am in 1st inversion at 80 BPM with smooth voice leading."
      },
      {
        id: "k2e5", time: 10, title: "Seventh Chord Voicings", type: "keys",
        referencePitches: ["A3", "C4", "E4", "G4", "B♭4", "D4", "F4", "B4"],
        pianoKeys: { notes: ["C4", "E4", "G4", "B4", "A4", "C5", "E5", "D4", "F4", "A4"], label: "Cmaj7-Am7-Dm7-G7" },
        what: "Am7, Dm7, G7, Cmaj7 — four-note voicings that are essential for the Khruangbin/indie soul sound. The 7th adds sophistication without complexity. This is the sonic step up from basic triads.",
        setup: "Organ or Rhodes preset. Metronome at 72 BPM.",
        steps: [
          { text: "Am7: A4-C5-E5-G5 (1-2-4-5) or compact: C4-E4-G4-A4 (1-2-3-5). The G natural is the 7th.", why: "Cory Henry describes the progression from triads to sevenths as moving from the alphabet to words — triads name the chord, but sevenths give it a voice. The added 7th creates a gentle dissonance that wants to resolve, giving your progression forward motion. On Rhodes, velocity controls tone (harder = brighter), so you can make 7th chords shimmer or darken with touch alone." },
          { text: "Dm7: D4-F4-A4-C5 (1-2-4-5). G7: G4-B4-D5-F5 (1-2-4-5).", why: "Dm7 and G7 are the ii-V of C major. This is the backbone of soul, jazz, and Khruangbin." },
          { text: "Cmaj7: C4-E4-G4-B4 (1-2-3-5). The B natural = dreamy, bittersweet major.", why: "Cmaj7 is the most beautiful chord on keys. The major 7th shimmers." },
          { text: "Progression: Cmaj7-Am7-Dm7-G7. Chop it, then try sustained. Both sound great.", why: "This is the classic I-vi-ii-V in 7th chords. Instant sophistication for any song." }
        ],
        feel: "7th chords should sound like an upgrade — richer, more complex, more 'adult' than triads. The Khruangbin/Skinshape sound lives in these voicings.",
        wrong: "If four notes feel awkward, start with just the top three notes of each chord (drop the root). Let the bass player handle the root.",
        sarah: "Cmaj7-Am7-Dm7-G7 is the Khruangbin progression. You already know this sound from your playlist — now you can play it. Skinshape's 'I Didn't Know' progression is Bbmaj7-F-G into Gm-C-A7-Dm — all rich 7th voicings in the C4-C5 register. The audio analysis confirms he uses partial voicings on just 3-4 keys, not full chords. Try playing just the 3rd, 5th, and 7th of each chord — that's the Skinshape voicing approach. Less is more.",
        metronome: 72,
        levelUp: "Cmaj7-Am7-Dm7-G7 at 80 BPM, chopped and sustained, both clean."
      },
      {
        id: "k2e6", time: 10, title: "Voicing Ear Training", type: "keys",
        pianoKeys: { notes: ["C4", "E4", "G4"], label: "Ear Training Reference" },
        what: "Listen to 30-60 seconds of a Khruangbin, Allah-Las, or Skinshape track. Identify: is the keyboard playing root position, 1st inversion, or 2nd inversion? High register or low? Then try to match it.",
        setup: "Any preset. Spotify or YouTube ready. No metronome — this is listening work.",
        steps: [
          { text: "Pick a track with audible keys: try Khruangbin 'Evan Finds the Third Room', Allah-Las 'Tell Me', or Skinshape 'I Didn't Know'.", why: "These tracks have clear, exposed keyboard parts you can study." },
          { text: "Listen to 30 seconds. Focus only on the keys. Where are they in the frequency range? High? Mid? Low?", why: "Register awareness. Training your ear to isolate the keyboard in a mix." },
          { text: "Try to find the chord on your keyboard. Start with the root note, then build the voicing.", why: "Ear-to-hand connection. This is how you'll learn parts for your band." },
          { text: "Don't worry about getting it perfect. Getting close teaches you more than getting it right.", why: "The process of searching = ear training. Even wrong guesses develop your ear." }
        ],
        feel: "Like detective work. You're listening through the mix to find the keyboard's role. It should feel like zooming in on one layer of a painting.",
        wrong: "If you can't hear the keys at all, pick a different track with more prominent keys. Or try headphones — keys often sit in the stereo sides.",
        sarah: "Khruangbin's keys are almost invisible — 3-note voicings high up, with 60%+ silence. The keys exist to add COLOR, not harmony. Think of them as seasoning, not the main course. DOPE LEMON buries lo-fi keys in reverb — simple chord stabs, rarely playing full voicings, just the top 3 notes of each chord, always behind the beat. When you're ear-copying these parts, you'll be surprised how little is actually being played.",
        levelUp: "Correctly identify the register and approximate voicing on 3 different tracks."
      },
      {
        id: "k2e7", time: 10, title: "Shell Voicings — Drop the Root", type: "keys",
        referencePitches: ["E4", "G4", "B4", "C5"],
        pianoKeys: { notes: ["E4", "G4", "B4", "C4", "E4", "G4", "F4", "A4", "C5", "B3", "D4", "F4"], label: "Rootless Shells: Cmaj7-Am7-Dm7-G7" },
        what: "Drop the root from your 7th chords — the bass player handles it. Cmaj7 becomes E-G-B. Am7 becomes C-E-G. Three notes, maximum clarity, minimum clutter. This is how Booker T. and Billy Preston voiced chords in a band.",
        setup: "Organ or Rhodes preset. Metronome at 76 BPM.",
        steps: [
          { text: "Cmaj7 shell: E4-G4-B4 (fingers 1-3-5). Drop the C — the bassist owns it. Play and listen to how open it sounds.", why: "Berklee ensemble keyboard pedagogy calls this 'functional voicing' — the minimum notes needed to imply the harmony. Three notes cut through a mix better than four." },
          { text: "Am7 shell: C4-E4-G4 (1-3-5). Dm7 shell: F4-A4-C5 (1-3-5). G7 shell: B3-D4-F4 (1-3-5).", why: "Every shell is a simple triad shape — you already know these hand positions from Phase 1. The root is just absent." },
          { text: "Play Cmaj7-Am7-Dm7-G7 as shells. Notice: your hand barely moves. Voice leading is almost automatic.", why: "With only 3 notes per chord, common tones between chords are obvious. The voice leading does itself." },
          { text: "Play along with Groove Beat 90 backing track. Chop the shells. Compare to full 7th chords — hear the difference in clarity.", why: "In a full band, rootless shells sit cleaner in the mix. The bass fills the bottom, you fill the middle. No mud." }
        ],
        feel: "Lighter, cleaner, more professional. Shells should feel like you're leaving space on purpose — not like something's missing.",
        wrong: "If it sounds empty without the root, your ear is used to solo keyboard. In a band context, the bass fills that gap. Trust the ensemble.",
        sarah: "When you play with your band, the bass and guitar are already covering roots. Doubling the root is the #1 beginner mistake. Shells fix it instantly.",
        metronome: 76,
        levelUp: "Cmaj7-Am7-Dm7-G7 as rootless shells at 84 BPM with smooth voice leading and no hesitation at chord changes."
      }
    ]
  },
  {
    num: 3, name: "Lock In", focus: "Play with drums",
    duration: "60 min",
    setup: "KeyLab 49 + Ableton + Analog Lab V (same organ preset). Practice app open in browser — you'll use the Audio Player for backing tracks. Both Ableton and the browser play through the same audio output.",
    exercises: [
      {
        id: "k3e1", time: 10, title: "Left Hand Bass + Right Hand Chop", type: "keys",
        what: "Right hand chops on &'s (autopilot from Phase 1). Left hand: root note with pinky (5) or thumb (1) on beats 1 & 3. Two hands interleave: LEFT-right-LEFT-right.",
        setup: "Organ preset. Metronome at 72 BPM.",
        steps: [
          { text: "Warm-up: right hand chops C major (1st inversion, E4-G4-C5) on &'s for 8 bars ALONE. Then left hand plays C3 on beats 1 and 3 for 8 bars ALONE. Separate-hand practice before combining.", why: "Motor learning research supports both approaches: separate hands first, then combine. For this type of interleaving (different rhythms per hand), starting each hand independently builds the motor patterns without the coordination tax. Phase 1 chop should be on autopilot — if it's not, go back and drill more." },
          { text: "Left hand: hit C3 (pinky, finger 5) on beats 1 and 3 only.", why: "Schlaug et al. found that keyboard players have significantly larger anterior corpus callosum — the neural bridge connecting left and right motor cortices. This interleaving drill (left on beats, right on &'s) is the most direct training for that neural adaptation. Your guitar background gives you asymmetric hand coordination, but keyboard independence is a different type — both hands doing identical technique independently." },
          { text: "Apply to C-Am-F-G. Left hand roots: C3, A3, F3, G3.", why: "Both hands change together. Slow to 60 BPM if the coordination falls apart." },
          { text: "Run 4 cycles. Left hand should feel heavy/anchoring, right hand light/percussive.", why: "This is a complete musical picture — bass and harmony from one player." }
        ],
        feel: "Left hand heavy and anchoring, right hand light and percussive. Together they create a complete groove that sounds like bass + keys.",
        wrong: "If both hands drift to the same rhythm, strip back: left hand only for 4 bars, right hand only for 4 bars, then combine. Build the independence.",
        metronome: 72,
        pianoKeys: { notes: ["C3", "E3", "G3", "C4", "E4", "G4"], label: "C Major (two hands)", range: ["C3", "C5"] },
        levelUp: "Both hands through C-Am-F-G at 80 BPM without rhythmic drift."
      },
      {
        id: "k3e2", time: 10, title: "Play with Your Backing Tracks", type: "keys",
        what: "Same backing tracks you already use for guitar practice. Groove Beat 90 BPM and Surf Rock 120 BPM from the practice app's Audio Player. Keyboard sound through Ableton, both on same laptop.",
        setup: "Organ preset in Ableton. Open practice app Audio Player in browser.",
        tracks: [{ name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }, { name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Play Groove Beat 90 BPM from the Audio Player. Listen 4 bars first — same approach Sarah taught for guitar entry.", why: "Lock to the hi-hat before playing. Find the groove, then join it." },
          { text: "Enter with chops. Lock your &'s to the hi-hat. Left hand bass to the kick.", why: "Your keyboard becomes part of the drum kit. Percussion that happens to have pitch." },
          { text: "Switch to Surf Rock 120 BPM. Same exercise, faster. Same tracks you already know.", why: "Faster tempo tests whether the chop is truly automatic." },
          { text: "Play 5 minutes straight without stopping. If you drift, re-enter on next beat 1.", why: "Same recovery skill as your ILTWYW drill. Don't stop, just re-enter." }
        ],
        feel: "The keyboard should feel like part of the drum kit. Your chops are percussion that happens to have pitch. If it grooves, you're there.",
        wrong: "If you're consistently late or early against the track, isolate: just right hand chop with the track, no bass. Get that locked first.",
        metronome: 90,
        levelUp: "5-minute run on each track with fewer than 2 drifts."
      },
      {
        id: "k3e3", time: 10, title: "One Drop", type: "keys",
        tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
        metronomeMode: "one-drop",
        what: "Right hand chops on &'s, soften the & of 1 (the 'hole' in one-drop). Left hand root ONLY on beat 3 — aligns with one-drop kick drum. The absence of beat 1 = weightlessness.",
        setup: "Organ preset. Metronome at 76 BPM. Or use the Reggae One Drop backing track.",
        steps: [
          { text: "Right hand: chop on all &'s, but play the & of 1 softer (ghost it).", why: "Carlton Barrett invented the one-drop in the early 1970s by removing the kick from beat 1 — creating a rhythmic void the whole band leans into. Tyrone Downie mastered the keyboard version: ghosting beat 1 (barely touching the keys) rather than leaving pure silence, maintaining the pulse without filling the hole. That ghost touch is the difference between 'nothing on 1' and 'intention on 1.'" },
          { text: "Left hand: root note ONLY on beat 3. Nothing on beat 1.", why: "The kick-on-3 + your bass-on-3 = the 'drop' in 'one-drop'." },
          { text: "Am-Dm-G-C progression. Pure indie reggae.", why: "Minor-heavy progression suits the one-drop feel. Melancholy groove." },
          { text: "Accent the & of 3 slightly. This is where the pocket deepens.", why: "The & of 3 lands right after the drop. A slight accent makes the groove bounce." }
        ],
        feel: "Floating. The absence of beat 1 = weightlessness. That's the 'drop' in 'one-drop'. You should feel suspended between beats.",
        wrong: "If the one-drop feel isn't clicking, strip to right hand only and really exaggerate the silence on beat 1. Ghost it until you can barely hear it.",
        sarah: "One-drop organ is the Carlton Barrett groove from your reggae-rock tracks. The absence of beat 1 is what makes your Reggae One Drop 85 backing track float.",
        metronome: 76,
        pianoKeys: { notes: ["A3", "C4", "E4"], label: "Am", range: ["A2", "E5"] },
        levelUp: "One-drop Am-Dm-G-C at 82 BPM with intentional & of 3 accent."
      },
      {
        id: "k3e4", time: 10, title: "Snare Lock (Backbeat Chop)", type: "keys",
        metronomeMode: "backbeat",
        what: "Chop ONLY on beats 2 and 4 — right on the snare. This is the half-time chop: less busy, more powerful, locks you to the drummer's backbeat instead of every &.",
        setup: "Organ preset. Play Groove Beat 90 BPM from Audio Player.",
        tracks: [{ name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }],
        steps: [
          { text: "Listen to 4 bars. Find the snare hits — they're on beats 2 and 4.", why: "The snare is the drummer's anchor. Locking to it makes you part of the same instrument." },
          { text: "Chop Am7 ONLY on 2 and 4. Silent on 1 and 3. Silent on all &'s.", why: "This is half as many chops as your normal pattern. The space between is the power." },
          { text: "Left hand: root on beat 1 only. So you get: BASS(1)-silence-CHOP(2)-BASS(3)-silence-CHOP(4)-silence.", why: "Bass on 1 and 3, chop on 2 and 4 = the classic soul/reggae backbeat feel." },
          { text: "Now compare: play the same progression with every-& chop, then switch to backbeat-only. Hear the difference.", why: "Every-& = energy, busy. Backbeat = power, space. You need both in your toolkit." }
        ],
        feel: "Powerful and sparse. Like a heartbeat. The silences on 1 and 3 should feel heavy with intention, not empty.",
        wrong: "If you keep filling in the &'s out of habit, count out loud: 'ONE - chop - THREE - chop' to retrain the pattern.",
        metronome: 90,
        levelUp: "Backbeat chop locked to snare on Groove Beat 90 for 3 minutes without extra hits."
      },
      {
        id: "k3e5", time: 10, title: "Groove Speed Run", type: "keys",
        what: "Full two-hand groove (chop + bass) through 80, 100, 120, and 140 BPM. Find where your hands desync — that's your current coordination ceiling.",
        setup: "Organ preset. Start metronome at 80 BPM.",
        steps: [
          { text: "80 BPM: Am-F-C-G, right hand chop + left hand bass on 1 & 3. 8 bars.", why: "Comfort zone. Both hands should be automatic here." },
          { text: "100 BPM: same groove, 8 bars. Feel the tempo push.", why: "100 BPM = a lot of rock and upbeat reggae. Real gigging tempo." },
          { text: "120 BPM: 8 bars. This is surf rock territory. Is the left hand still clean?", why: "At faster tempos, the left hand often gets lazy or late. That's the weak link." },
          { text: "140 BPM: 8 bars. Push the limit. Where does it fall apart?", why: "The breaking point shows you exactly what to practice. Usually it's the chord transitions." }
        ],
        feel: "Like a stress test. Each tempo should feel slightly harder. The goal isn't perfection at 140 — it's knowing your limits.",
        wrong: "If both hands desync above 100, go back to 100 and drill just the transitions (chord changes) at that tempo until they're instant.",
        metronome: 80,
        pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Am7", range: ["A2", "G5"] },
        levelUp: "Clean two-hand groove at 120 BPM for a full Am-F-C-G cycle."
      },
      {
        id: "k3e6", time: 10, title: "Charleston Comping", type: "keys",
        pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Am7 Charleston", range: ["A2", "G5"] },
        what: "The Charleston rhythm: stab on beat 1, stab on the & of 2, silence on 3 and 4. 'ONE... and-TWO... (rest).' Then learn 'the push' — moving beat 1's stab to the & of 4 in the previous bar. Two named comping patterns for your toolkit.",
        setup: "Organ preset. Metronome at 84 BPM.",
        metronomeMode: "standard",
        metronome: 84,
        steps: [
          { text: "Am7 chord. Stab on beat 1, stab on the & of 2. Silence on beats 3 and 4. Count: 'ONE... and-TWO... (rest rest).'", why: "The Charleston rhythm dates to 1920s jazz and appears in nearly every genre since. Herbie Hancock's comping with Miles Davis is built on variations of this pattern. Learning it by name gives you vocabulary, not just feel." },
          { text: "4 bars Charleston on Am7, 4 bars on Dm7, 4 bars on G7, 4 bars on Cmaj7. Same rhythm, different chords.", why: "The comping pattern stays constant while the harmony moves. This is how pro keyboardists think — rhythm and harmony as separate layers." },
          { text: "'The Push': move the beat-1 stab to the & of 4 in the PREVIOUS bar. The chord arrives a half beat early, pushing the harmony forward.", why: "Anticipated bass is how reggae and funk players create forward momentum. The chord 'leans' across the barline." },
          { text: "Alternate: 4 bars Charleston, 4 bars offbeat chop (from Phase 1), 4 bars backbeat (from k3e4). Three comping patterns in rotation.", why: "You now have three named patterns: offbeat chop, backbeat, Charleston. A comping vocabulary, not just one trick." }
        ],
        feel: "The silence on beats 3 and 4 should feel loaded with anticipation. The push should feel like the music is leaning forward, pulling you into the next bar.",
        wrong: "If the push feels awkward, slow to 72 BPM and exaggerate: play the & of 4, then hold through beat 1 of the next bar. Feel the lean.",
        levelUp: "Am7-Dm7-G7-Cmaj7 with Charleston + push at 90 BPM, then rotate through all three comping patterns without losing the groove."
      }
    ]
  },
  {
    num: 4, name: "Serve the Song", focus: "Dynamics + arrangement",
    duration: "50 min",
    setup: "KeyLab 49 + Ableton + Analog Lab V. Main organ preset, plus browse a Wurlitzer V or Stage-73 V preset for electric piano verse textures.",
    exercises: [
      {
        id: "k4e1", time: 10, title: "Dynamic Verse/Chorus", type: "keys",
        volumeMeter: true,
        what: "VERSE: chop, right hand only, mp (medium quiet). No left hand bass. Sparse. CHORUS: chop + left hand bass, f (forte). Full energy. Same chords, completely different feel.",
        setup: "Organ preset. Metronome at 90 BPM.",
        steps: [
          { text: "VERSE (G-Em-C-D): right hand chop only, played softly. No left hand.", why: "Sparse = space for vocals and guitar. The verse breathes." },
          { text: "CHORUS (C-G-Am-F): add left hand bass on 1 & 3, chop louder.", why: "The addition of bass and volume = instant energy lift. The contrast IS the arrangement." },
          { text: "Alternate: Verse (8 bars) → Chorus (8 bars) → Verse → Chorus.", why: "Practice the transition. The energy shift should be dramatic." },
          { text: "Make the volume difference obvious. Verse at 4/10, chorus at 8/10.", why: "Beginners don't differentiate enough. Exaggerate until it feels like two different songs." }
        ],
        feel: "The verse should feel like whispering, the chorus like talking. Same chords, completely different energy. The contrast IS the arrangement.",
        wrong: "If verse and chorus sound the same, you're not differentiating enough. Try removing left hand entirely in verse. Make the gap bigger.",
        metronome: 90,
        pianoKeys: { notes: ["A3", "C4", "E4"], label: "Am", range: ["A2", "G5"] },
        levelUp: "V-C-V-C with audible, dramatic energy difference between sections."
      },
      {
        id: "k4e2", time: 10, title: "Register Separation from Guitar", type: "keys",
        tracks: [{ name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }, { name: "Surf Rock 120", src: "/surf-rock-120.mp3" }],
        what: "Play along with a backing track that has guitar. Stay in C5-C6 range — above the guitar's C4-C5 sweet spot. Sometimes sustained chords are the entire keyboard part. Backbeat chop (beats 2 & 4 only) when guitar already strums full rhythm.",
        setup: "Electric piano or organ preset. Metronome at 100 BPM. Find a YouTube guitar backing track.",
        steps: [
          { text: "Play along with guitar track. Voice chords in C5-C6 range — above the guitar.", why: "Staying high keeps you out of the guitar's register. Less mud, more clarity." },
          { text: "Start with just sustained chords — hold for 2-4 bars each.", why: "Sometimes that IS the entire keyboard part. Khruangbin, Tommy Guerrero vibes." },
          { text: "Switch to backbeat chop: stab on beats 2 & 4 only, not every &.", why: "When guitar already has the rhythm, you add accents, not competition." },
          { text: "LAY OUT for 4 bars, then re-enter. The absence makes re-entry more powerful.", why: "The most important keyboard skill: knowing when NOT to play." }
        ],
        feel: "You should feel like you're adding color, not filling space. If removing your part wouldn't change anything, play less.",
        wrong: "If the guitar and keys sound muddy together, you're in the wrong octave. Move up. If the rhythm feels cluttered, switch to sustained chords or lay out.",
        metronome: 100,
        levelUp: "3 min with backing track, alternating sustained/chop/layup smoothly."
      },
      {
        id: "k4e3", time: 10, title: "The Art of Not Playing", type: "keys",
        recorder: true,
        silenceTarget: 0.3,
        what: "Play along with a full song from your rotation (Allah-Las, Skinshape, Sun Room). Rule: be SILENT for at least 30% of the song. Test: is the song better with your keys? Would anyone miss them if removed?",
        setup: "Any preset. Play a full song from Spotify or your library. No metronome — follow the song.",
        steps: [
          { text: "Listen first, full song, no playing. Map: where are the gaps? Where is it already full?", why: "You can't serve a song you haven't listened to. Map before you play." },
          { text: "Play along the second time. Start minimal. Add only what's missing.", why: "Enter late, leave early. The song existed before you added keys." },
          { text: "You must be SILENT for at least 1/3 of the song. Count the sections you skip.", why: "Booker T. Jones on recording 'Green Onions': he played about 40% of what he could play because the organ needed room to breathe. Tyrone Downie's approach with Bob Marley was the same — if you're not sure whether to play, don't. Research on musical attention shows listeners track keyboard parts far more in sparse arrangements than dense ones. Less playing = more impact per note." },
          { text: "Test: is the song better with your keys? Would anyone miss them if removed? Both must be yes.", why: "If either answer is no, you played too much or in the wrong places." }
        ],
        feel: "The silences should feel intentional, like a photographer choosing what to leave out of the frame. Your entries should feel like gifts.",
        wrong: "If you can't stop playing, set a physical rule: hands in lap during verses, only play choruses. Build restraint as a habit.",
        sarah: "Your band already has guitar, bass, and vocals. The keyboard that plays through the whole song is the one nobody notices. The one that enters for 8 bars in the chorus and disappears? That's the one people remember. The audio analysis of Texas Sun reveals the guitar drops out entirely during vocal phrases, entering only to 'answer' the singer. Keys should follow the same principle — lay out during vocals, fill during instrumental spaces. 60%+ silence applies to keys as much as guitar.",
        levelUp: "3 songs where you are silent for 30%+ of runtime AND your entries measurably improve the song. Record each and listen back — if removing keys wouldn't change the impact, it doesn't count."
      },
      {
        id: "k4e4", time: 10, title: "Build an Intro", type: "keys",
        what: "Create a 4-8 bar keyboard intro that sets the song's mood before the band enters. The intro is the audience's first impression — it should say 'here's where we're going' without giving everything away.",
        setup: "Pad preset for atmospheric intro, organ preset ready for when the groove kicks in. Metronome at 90 BPM.",
        steps: [
          { text: "Pick a chord: Am7. Hold it as a pad with reverb for 4 bars. Let the reverb bloom.", why: "A single sustained chord = suspense. The audience leans in." },
          { text: "Bar 5: add a slow arpeggiation — play the chord tones one by one (A, C, E, G). One per beat.", why: "Movement enters the stillness. The intro is waking up." },
          { text: "Bar 7: switch to organ, chop enters on the &'s. The groove starts.", why: "The transition from pad to chop = the song beginning. The band knows to come in." },
          { text: "Try different intros: start with tremolo organ, start with a single high note, start with just bass. Variety.", why: "Every song needs a different intro. Build a vocabulary of openings." }
        ],
        feel: "Like a movie opening. The intro sets expectations. Pad = atmospheric opening. Arpeggiation = something's building. Chop = we're in the song.",
        wrong: "If the intro is too busy, strip it back. The best intros are often one chord, one sound, one idea. Let the simplicity draw people in.",
        metronome: 90,
        levelUp: "3 different intros (pad, tremolo, minimal) that each feel like a different movie opening."
      },
      {
        id: "k4e5", time: 10, title: "Ghost the Vocalist", type: "keys",
        volumeMeter: true,
        tracks: [{ name: "Sol Del Sur", src: "/sol-del-sur.mp3" }],
        what: "Play along with a vocal track. When the singer is loud, you're quiet. When the singer breathes (gaps between phrases), you're slightly louder. You're filling holes, not competing. This is the #1 band keyboard skill.",
        setup: "Any organ or Rhodes preset. Play a vocal-heavy track (BALTHVS 'Anouk', Skinshape 'I Didn't Know', Sun Room 'Sol Del Sur').",
        steps: [
          { text: "First listen: map the vocal phrases. Where does the singer breathe? Where are the gaps?", why: "The gaps between vocal phrases = your space. Never play over the vocal." },
          { text: "Play along. During vocal phrases: chop very quietly (3/10 volume) or lay out entirely.", why: "The voice is the star. Your job is to support, not compete." },
          { text: "In vocal gaps: slight volume increase (6/10), maybe a small fill or sustained chord.", why: "The gap is your moment to add color. Brief, tasteful, then back to quiet." },
          { text: "Think of it as a volume conversation: when they're up, you're down. When they breathe, you fill.", why: "Herbie Hancock describes ensemble playing as a conversation: you don't talk while someone else is talking. Billy Preston's studio work with the Beatles and Rolling Stones followed this exact principle — swell into vocal gaps, disappear during vocal lines. This push-pull between instruments is what separates a band from five people playing at the same time." }
        ],
        feel: "Like ballroom dancing — you're following, not leading. The vocalist moves, you respond. Your volume should breathe with theirs.",
        wrong: "If you can hear your keys over the vocal at any point, you're too loud. Turn down. Way down. Then turn down more.",
        sarah: "This is the skill you'll use most in the band. When Court sings, you ghost. When she breathes, you fill. Billy Preston did this for the Beatles.",
        levelUp: "Play along with 3 vocal tracks where your keys complement without ever covering the voice."
      }
    ]
  },
  {
    num: 5, name: "Add Texture", focus: "Pad + tremolo + effects",
    duration: "60 min",
    setup: "KeyLab 49 + Ableton + Analog Lab V. Surf: Farfisa V or Vox Continental V with tremolo/vibrato ON. Pad: Mellotron V category or any warm synth pad. In Ableton: add Reverb (Decay 3s+, Dry/Wet 70%+) and Simple Delay (dotted-eighth, ~30% wet) on the pad channel.",
    exercises: [
      {
        id: "k5e1", time: 10, title: "Surf Organ Tremolo", type: "keys",
        what: "Hold chord for 4 bars, let the organ's tremolo/vibrato do the work. Am-G-F-E surf turnaround with dynamic swells into each chord change. This is the Allah-Las / Mystic Braves sound.",
        setup: "Farfisa V or Vox Continental V preset with tremolo ON (medium speed, ~5-6 Hz). Metronome at 120 BPM.",
        steps: [
          { text: "Am chord, hold 4 bars. Don't chop — just hold keys down and let tremolo pulse.", why: "The tremolo does the rhythmic work. You just hold. Totally different skill from chopping." },
          { text: "Dynamic swells: press keys harder going into each chord change.", why: "On organ — unlike piano — there is no velocity sensitivity. Expression lives entirely in attack timing, release timing, and real-time effect manipulation. The Farfisa's transistor oscillators create a thinner, buzzier tremolo than Hammond's tonewheels — that thin sound is exactly what cuts through a surf-rock mix. Leslie speaker speed switching (slow chorale vs. fast tremolo) is a musical gesture: switch to fast BEFORE a climax so the full swirl arrives on the peak beat." },
          { text: "Am-G-F-E surf turnaround. Hold each chord 2-4 bars.", why: "The classic surf progression. Minor to major descent = melancholy to resolution." },
          { text: "Try with add9 voicings: Am(add9)-Gadd9-Fmaj7-E. Extensions + tremolo = instant surf.", why: "Extended voicings from Phase 2 make tremolo organ sound vintage and rich." }
        ],
        feel: "Should sound like a 1960s beach party. The tremolo creates movement you don't have to play. Your job is just smooth chord changes and dynamic swells.",
        wrong: "If it sounds static, increase tremolo depth or speed. If chord changes are jarring, practice the voice-leading — find inversions with minimal movement.",
        sarah: "The Am-G-F-E tremolo organ is the Allah-Las and Mystic Braves sound. Your Farfisa preset + this progression = instant surf-psych set piece. Allah-Las use a Farfisa organ with tremolo on almost every track. The tremolo speed defines the psychedelic feel — fast tremolo for energy, slow tremolo for dreaminess. The Cmaj7-to-Dmaj7 movement that creates their guitar jangle works on keys too — try it with the tremolo effect on.",
        metronome: 120,
        pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Am7 Tremolo", range: ["A2", "G5"] },
        levelUp: "Smooth Am-G-F-E with swells at 120 BPM that sounds like vintage surf."
      },
      {
        id: "k5e2", time: 10, title: "Ambient Pad Chords", type: "keys",
        referencePitches: ["E4", "G4", "C5", "D5"],
        what: "Pad/synth preset with reverb bloom. Cadd9 held 8 beats, slow overlap transition to Am7. Overlapping changes = dreamy wash. Add delay arpeggiation for cascading echoes. Goth Babe / BALTHVS / Skinshape sound.",
        setup: "Mellotron V or warm synth pad preset. Reverb + dotted-eighth delay in Ableton. Metronome at 60 BPM.",
        steps: [
          { text: "Cadd9 held for 8 beats. Let reverb bloom around the chord. Don't rush.", why: "Pad playing = patience. The reverb tail IS the arrangement." },
          { text: "Transition to Am7: overlap — hold Cadd9 while pressing Am7 notes, then release Cadd9.", why: "Overlapping chord changes create a dreamy wash. Opposite of the crisp chop." },
          { text: "Add delay arpeggiation: play one note per beat (E4, G4, C5, D5), let echoes cascade.", why: "The delay stacks echoes into harmony. Simple patterns become complex textures." },
          { text: "Cadd9-Am7-Fmaj7-G with reverb bloom and delay. Slow, spacious, golden hour.", why: "This is the other half of your band's sound. Reggae chop for energy, pad for atmosphere." }
        ],
        feel: "Lo-fi, reverb-drenched, golden hour. Each note should bloom and fade. The spaces between notes are as important as the notes.",
        wrong: "If it sounds muddy, you're changing chords too fast or playing too many notes. Simplify — fewer notes, more space, more reverb.",
        sarah: "This is the golden-hour BALTHVS sound. Cadd9 with reverb bloom through your Analog Lab pad preset — instant atmosphere for your band's quiet sections.",
        metronome: 60,
        pianoKeys: { notes: ["C4", "D4", "E4", "G4", "B4"], label: "Cadd9", range: ["C3", "B5"] },
        levelUp: "Cadd9-Am7-Fmaj7-G with reverb bloom and delay arpeggiation that sounds dreamy."
      },
      {
        id: "k5e3", time: 10, title: "Texture Switching: Chop to Pad", type: "keys",
        what: "8 bars reggae (Am-Dm-G-C chop + one-drop bass) on organ, then switch to sustained pad (Am-G-F-E held chords), then back. Practice the Ableton preset switch until it takes less than 1 beat.",
        setup: "Two Ableton tracks: organ (chop) and pad (sustained). Practice switching between them via track arm or MIDI mapping. Metronome at 100 BPM.",
        steps: [
          { text: "8 bars reggae: Am-Dm-G-C chop + one-drop left hand bass on organ.", why: "Phase 1-3 skills combined. This should be comfortable territory." },
          { text: "Transition bar: switch Ableton track to pad, hold chord. The switch should take less than 1 beat.", why: "In a band, the music doesn't stop for you to switch sounds. Speed matters." },
          { text: "8 bars surf: Am-G-F-E, held chords with tremolo organ or pad.", why: "Phase 5 sustained playing. Let the texture do the work." },
          { text: "Transition back: switch to organ, cut to chop on & of 4. Reggae-surf-reggae twice.", why: "This is the core of your band — reggae verse to surf chorus and back." }
        ],
        feel: "The transition should feel like a scene change in a movie — same story, different mood. Reggae = daytime energy, surf/pad = sunset atmosphere.",
        wrong: "If the switch is clunky, practice just the transition: last bar of chop → first bar of pad, back and forth. Get the Ableton switching automatic.",
        metronome: 100,
        pianoKeys: { notes: ["A3", "C4", "E4"], label: "Am", range: ["A2", "E5"] },
        levelUp: "Reggae-surf-reggae cycle twice at 108 BPM with smooth transitions."
      },
      {
        id: "k5e4", time: 10, title: "Effect Rides (KeyLab Encoders)", type: "keys",
        what: "While holding a chord, manipulate reverb dry/wet and delay feedback in real-time using your KeyLab 49 encoders or Ableton's knobs. The effect parameters become your expression — like a guitarist's wah pedal.",
        setup: "Pad preset with Reverb and Delay. Map a KeyLab encoder to Reverb Dry/Wet and another to Delay Feedback in Ableton (MIDI Learn).",
        steps: [
          { text: "Hold Am7 as a pad. Slowly turn Reverb Dry/Wet from 30% to 100% over 4 bars.", why: "The reverb swell = the sound opening up. Like a camera pulling back to reveal the landscape." },
          { text: "Now bring it back down to 30% over 4 bars. The sound closes, becomes intimate again.", why: "Ray Manzarek pioneered real-time knob manipulation as musical expression on the Vox Continental. Drawbar manipulation on Hammond is real-time timbral control — pulling out the 16-foot drawbar mid-song is the organ equivalent of a guitarist switching pickups. Your KeyLab 49's nine faders can map directly to Hammond drawbars in Analog Lab V. The ride IS your expression — you're painting with the effect, not just the notes." },
          { text: "Same with Delay Feedback: turn it up and the echoes multiply, stacking into walls of sound.", why: "Delay feedback = controlled chaos. Dial it up for psychedelic moments, back down for clarity." },
          { text: "Combine: swell reverb for 8 bars, add delay, build to a peak, then pull everything back.", why: "This is how Khruangbin and Tommy Guerrero create those spacious, evolving textures." }
        ],
        feel: "Like you're conducting the atmosphere of the room. The notes stay the same but the SPACE around them changes. This is textural expression.",
        wrong: "If it sounds like a mess, you're moving the knobs too fast. Slow, gradual sweeps. The ear needs time to register the change.",
        metronome: 60,
        levelUp: "8-bar reverb swell + delay build that sounds intentional and cinematic."
      },
      {
        id: "k5e5", time: 10, title: "Two-Texture Layering", type: "keys",
        volumeMeter: true,
        what: "Left hand holds a low bass/pad note (C2-C3 range), right hand plays organ chop above. Two sonic layers from one keyboard simultaneously. This is how one keyboard player fills the room.",
        setup: "In Ableton: set up keyboard split or two tracks. Low notes (below C3) route to pad/bass sound, high notes (C3+) route to organ. Or use Analog Lab V split mode.",
        steps: [
          { text: "Left hand: hold C2 as a bass pad note. Long sustained note with reverb. Practice holding this for 16 bars without the right hand — get comfortable sustaining a note while doing nothing else.", why: "The low pad fills the bottom end. In a band context, you'd only do this when the bass player lays out. This is a different hand independence challenge from L3 — there, both hands had rhythmic jobs. Here, the left hand sustains while the right hand moves. Your brain has to accept that one hand can be 'still' while the other is 'active.'" },
          { text: "Right hand: chop Am (C4-E4-A4) on &'s above the sustained bass.", why: "Two layers: sustained bottom, rhythmic top. One player, full sound." },
          { text: "Change left hand: move to F2, then G2, then back to A2. Slow whole-note changes.", why: "The bass pad moves like a glacier while the chop dances above it. Tempo contrast between hands." },
          { text: "Try: left hand holds a note, right hand plays surf tremolo chords above. Different texture combo.", why: "Any combination works: pad+chop, pad+tremolo, bass+arpeggiation. Build your combinations." }
        ],
        feel: "Like operating two instruments at once. The left hand is a drone or bass player, the right hand is the keyboard player. Together they fill the sonic space.",
        wrong: "If the two layers clash, check your register separation. Left hand must stay below C3, right hand above C4. The gap between = the bass player's space.",
        metronome: 80,
        pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Am7", range: ["A2", "G5"] },
        levelUp: "Sustained bass pad + organ chop over Am-F-G progression, hands fully independent."
      },
      {
        id: "k5e6", time: 10, title: "Two Against Three", type: "keys",
        pianoKeys: { notes: ["C3", "C4"], label: "Polyrhythm Drill", range: ["C3", "C5"] },
        what: "Left hand plays 2 evenly spaced notes per beat group. Right hand plays 3. The 'George Washington' mnemonic: 'George' = both hands, 'Wash-' = right alone, '-ing-' = left alone, '-ton' = right alone. The foundational polyrhythm drill.",
        setup: "Organ preset. Metronome at 60 BPM. Start SLOW — this is brain training, not speed training.",
        metronome: 60,
        steps: [
          { text: "Off the keyboard first. Left hand taps your left knee in half notes (2 per bar). Right hand taps right knee in triplets (3 per bar). Say 'George Wash-ing-ton' out loud to find the pattern.", why: "Removing the keyboard from the equation lets your nervous system focus purely on the coordination. Motor learning research calls this 'task decomposition' — separate the hard part from the instrument." },
          { text: "Move to the keyboard. Left hand plays C3 (half notes). Right hand plays C4 (triplets). Just single notes. Keep saying 'George Washington' until it locks.", why: "Expert pianists show reduced trans-callosal inhibition — the brain penalty for coordinating bilateral movements. This exercise builds that neural pathway. It takes time, and that's normal." },
          { text: "Progress: left hand plays C3 root (half notes), right hand plays C major triad arpeggiated as triplets (C4-E4-G4, C4-E4-G4).", why: "Adding pitch to the right hand while keeping the left hand steady. The difficulty is maintaining the polyrhythm when the right hand gets more complex." },
          { text: "Apply to Am: left hand A2 (half notes), right hand A-C-E triplet arpeggio. Then Dm: left D3, right D-F-A. Cycle through Am-Dm-G-C.", why: "Real musical application of the polyrhythm. If the coordination falls apart at chord changes, stay on one chord until it's automatic." }
        ],
        feel: "Disorienting at first — your brain wants both hands on the same grid. When it clicks, it feels like a puzzle piece snapping into place. The two rhythms layer into something richer than either alone.",
        wrong: "If you can't get the pattern at all, go back to tapping knees without the keyboard. The mnemonic 'George Washington' maps exactly to the attack points. If one hand keeps drifting to the other's rhythm, slow to 50 BPM.",
        sarah: "This is the exercise that separates keyboard from guitar. On guitar, both hands serve one rhythm. On keys, your hands can live in completely different time signatures. It's weird at first, then it's magic.",
        levelUp: "2-against-3 on Am chord (left hand half notes, right hand triplet arpeggios) at 72 BPM for 4 bars without the hands drifting to the same rhythm."
      }
    ]
  },
  {
    num: 6, name: "Add Color", focus: "Fills + scales + modes",
    duration: "70 min",
    setup: "KeyLab 49 + Ableton + Analog Lab V. Farfisa V for organ fills, or browse Wurlitzer V / Stage-73 V for a warmer Rhodes melodic tone.",
    exercises: [
      {
        id: "k6e1", time: 10, title: "Mixolydian Fills", type: "keys",
        what: "G Mixolydian (G-A-B-C-D-E-F-G) — the flat 7th (F natural instead of F#) is THE reggae sound. Play chord chop for 3 bars, quick 4-note ascending fill on bar 4, resume chop.",
        setup: "Organ preset. Metronome at 76 BPM.",
        steps: [
          { text: "G Mixolydian: G-A-B-C-D-E-F-G. Fingering: thumb G, index A, middle B, thumb crosses under to C, then index D, middle E, ring F, pinky G.", why: "The flat 7th (F natural, not F#) = the reggae/surf color note." },
          { text: "Chop G chord for 3 bars. On bar 4, play a quick 4-note ascending fill: D-E-F-G.", why: "Cory Henry describes organ fills as punctuation, not sentences — a comma here, an exclamation point there. Booker T. Jones: first four drawbars, four notes, the whole song. The constraint of 2-4 notes forces melodic economy. Your fill is a brief comment between phrases, not a speech." },
          { text: "C Mixolydian (C-D-E-F-G-A-Bb-C) over C chord. Same pattern: 3 bars chop, 1 bar fill.", why: "Same idea, different key. Bb is the color note in C Mixolydian." },
          { text: "Practice inserting fills at different points. Always stepwise motion, always brief.", why: "Fills should feel like they grew naturally from the chop, not like a separate event." }
        ],
        feel: "The fill should feel like a natural exhale — it comes out of the groove and returns to it. If you have to think about it, it's too complex.",
        wrong: "If fills sound random or disconnected, simplify to 2 notes. The fill must resolve back to a chord tone (G, B, or D for G chord).",
        metronome: 76,
        levelUp: "Chop with Mixolydian fills at 82 BPM that feel like part of the groove."
      },
      {
        id: "k6e2", time: 10, title: "Pentatonic Runs", type: "keys",
        what: "A minor pentatonic (A-C-D-E-G) over Am-G-F-E. One scale covers all 4 chords — no wrong notes. Dynamic arc: start low/quiet, build to high/loud, descend to resolve.",
        setup: "Organ or Rhodes preset with tremolo. Metronome at 120 BPM.",
        steps: [
          { text: "A minor pentatonic: A-C-D-E-G. Five notes, no wrong notes over Am-G-F-E.", why: "The pentatonic scale is the safest melodic toolkit. Everything sounds good." },
          { text: "Start low and quiet: A3-C4-D4. Build to high and loud: E5-G5-A5.", why: "The dynamic arc IS the solo. Low-to-high + quiet-to-loud = natural tension-release." },
          { text: "Descend back down to resolve. Keep it SHORT: 4-8 bars max, then back to comping.", why: "You're adding color, not soloing. Brief is beautiful. Back to chop after." },
          { text: "With tremolo organ, even simple 3-note patterns sound vintage and cool.", why: "The preset does half the work. Simple patterns + good sound = effortless style." }
        ],
        feel: "Effortless. No wrong notes means you can focus entirely on dynamics and phrasing. With tremolo, even simple runs sound cinematic.",
        wrong: "If runs sound like exercises (evenly spaced, same volume), add dynamics: start a note quieter, end a note louder. Shape the phrase.",
        metronome: 120,
        pianoKeys: { notes: ["A3", "C4", "D4", "E4", "G4"], label: "Am Pentatonic", range: ["A2", "A5"] },
        levelUp: "8-bar pentatonic run with clear dynamic arc at 130 BPM."
      },
      {
        id: "k6e3", time: 10, title: "Dorian Mode for Dub", type: "keys",
        drone: { root: "D", octave: 3, texture: "analog" },
        what: "D Dorian (D-E-F-G-A-B-C-D) — like D minor but with B natural instead of Bb. The raised 6th = bittersweet, hopeful minor. THE dub/deep reggae mode.",
        setup: "Organ preset. Metronome at 70 BPM. Deep, slow dub tempo.",
        steps: [
          { text: "D Dorian: D-E-F-G-A-B-C-D. The B natural (not Bb) is the color note.", why: "D Dorian is the default mode of dub and deep reggae — Augustus Pablo built entire albums around it. Miles Davis's 'So What' is the most famous Dorian composition: one mode, 16 bars, infinite depth. The raised 6th (B natural instead of Bb) creates a bittersweet optimism that separates Dorian from pure minor. That one note difference = the entire Dorian character." },
          { text: "Dm chord chops with occasional Dorian fills emphasizing B natural.", why: "The B natural should appear in most fills. It's the flavor note." },
          { text: "Left hand: deep bass D2 or D3 on beat 3 (one-drop). Right hand: chop + fills.", why: "One-drop bass + Dorian fills = instant dub atmosphere." },
          { text: "Progression: Dm-G-Am-Dm (i-IV-v-i in Dorian). G major contains B natural, highlighting the sound.", why: "The G major chord IS the Dorian sound made harmonic. B natural in both the scale and the chord." }
        ],
        feel: "Melancholy but not depressing — minor key at sunset. Slow dub tempos let every note breathe. The B natural adds a ray of light.",
        wrong: "If it sounds like plain D minor, you're not hitting B natural enough in your fills. Make it deliberate — land on B, let it ring.",
        sarah: "D Dorian is the mode of your dub-reggae backing track. Augustus Pablo, King Tubby, and your Dub Reggae 85 track all live here. The B natural is the ray of light.",
        metronome: 70,
        pianoKeys: { notes: ["D4", "E4", "F4", "G4", "A4", "B4", "C5"], label: "D Dorian", range: ["D3", "D6"] },
        levelUp: "Dm-G-Am-Dm with Dorian fills at 76 BPM. B natural appears in most fills."
      },
      {
        id: "k6e4", time: 10, title: "Call and Response", type: "keys",
        pianoKeys: { notes: ["C4", "D4", "E4", "G4", "A4"], label: "Am Pentatonic (fills)", range: ["C4", "A5"] },
        what: "Hum 2 bars of a vocal line (any band song). Play a 2-beat keyboard fill in the gap after. Fills are 2-4 notes max, mirroring the vocal contour. The fill goes in the GAP, never during the vocal.",
        setup: "Organ or Rhodes preset. Metronome at 84 BPM.",
        steps: [
          { text: "Hum a vocal melody: 2 bars. Then play a 2-beat keyboard fill in the silence after.", why: "This is the primary melodic role of keys in reggae and indie rock — the keyboard 'answers' the singer." },
          { text: "Mirror the vocal contour: descending melody = descending fill. Rising melody = rising fill.", why: "The fill should feel like a conversation, not a random interjection." },
          { text: "Fills are 2-4 notes max. Brief. The vocal is the star, you're the response.", why: "Keyboard answers are short and supportive. Never outshine the singer." },
          { text: "16 bars of chop-and-fill. Chop during the vocal, fill in the gaps.", why: "This is the real gig scenario. Chop = foundation, fill = personality." }
        ],
        feel: "Like a conversation between singer and keyboard. The fill should feel like a natural response — 'yeah, exactly' — not a separate thought.",
        wrong: "If fills overlap with the vocal, you're entering too early. Wait. The gap is longer than you think. Let the vocal phrase fully end.",
        metronome: 84,
        levelUp: "16 bars of chop-and-fill that sound like natural conversation."
      },
      {
        id: "k6e5", time: 10, title: "Blues Scale Licks", type: "keys",
        what: "A blues scale (A-C-D-Eb-E-G) — the universal rock/reggae/soul fill vocabulary. The Eb (blue note) is the tension, the E natural is the release. 3-4 lick patterns that work over almost any chord.",
        setup: "Organ or Rhodes preset. Metronome at 84 BPM.",
        steps: [
          { text: "A blues scale: A-C-D-Eb-E-G. Play it ascending and descending. The Eb is the 'blue note' — the soul.", why: "This one scale works over Am, C, F, G, Dm — almost everything in your band's key range." },
          { text: "Lick 1: E-Eb-D-C (quick descending chromatic). Use between chop phrases.", why: "The chromatic Eb→D is the classic blues sound. Brief, 4 notes, lands on C (home)." },
          { text: "Lick 2: A-C-D-E (ascending). Use to build energy going into a chorus.", why: "Ascending = energy rising. Simple stepwise motion that always works." },
          { text: "Lick 3: G-E-D-C-A (descending pentatonic skip). The 'cool' lick — relaxed, confident.", why: "Skipping the Eb keeps it clean pentatonic. Less tension, more groove." },
          { text: "Apply: chop Am for 3 bars, drop one lick on bar 4, resume chop. Rotate through licks.", why: "You're building a vocabulary of 3-4 go-to fills. In a gig, you'll reach for these automatically." }
        ],
        feel: "The blues scale should feel like a cheat code — everything sounds good. The blue note (Eb) adds instant soul to any phrase.",
        wrong: "If licks sound like scale exercises, play fewer notes. A 2-note lick with conviction beats a 6-note lick that sounds rehearsed.",
        sarah: "The blues scale works over almost everything in your band's key range. Three licks memorized here = three licks you can drop into any live jam without thinking.",
        metronome: 84,
        pianoKeys: { notes: ["A3", "C4", "D4", "E♭4", "E4", "G4"], label: "Am Blues", range: ["A2", "A5"] },
        levelUp: "3 different blues licks inserted naturally into an Am-F-C-G chop at 90 BPM."
      },
      {
        id: "k6e6", time: 10, title: "Rhythmic Fills", type: "keys",
        pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Am7", range: ["A2", "G5"] },
        what: "Fills that are RHYTHMIC, not melodic — 16th note chop patterns on a single chord. Like a drum fill but with pitch. The rhythm is the interest, not the notes. Think of the keyboard as a percussion instrument.",
        setup: "Organ preset. Metronome at 80 BPM.",
        steps: [
          { text: "Single chord (Am7). Instead of the normal & chop, play a 16th note burst: 'ta-ka-ta-ka' on the last beat of a 4-bar phrase.", why: "16th note subdivision from Sarah's counting drills. Same rhythm, keyboard instead of voice." },
          { text: "Accent pattern: loud-soft-soft-loud on the 16ths (1-e-and-A). The accents create the groove.", why: "Unaccented 16ths sound like a machine. Accents make it human and funky." },
          { text: "Try different fill lengths: 1 beat (4 16ths), half bar (8 16ths), full bar.", why: "Short fills are safer in a band. Save the full-bar fill for the biggest transitions." },
          { text: "Apply: 3 bars normal chop, bar 4 = rhythmic fill, repeat. The fill leads back into beat 1.", why: "The fill's job is to set up the next phrase. It should feel like a springboard." }
        ],
        feel: "Like a drum fill played on keys. The rhythm is the star, not the notes. It should make you nod harder.",
        wrong: "If the fill disrupts the groove instead of enhancing it, it's too long or too loud. Shorter, quieter. The fill serves the groove.",
        pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Am7", range: ["A2", "G5"] },
        metronome: 80,
        levelUp: "16th note fills inserted at phrase endings that feel like a natural part of the groove."
      },
      {
        id: "k6e7", time: 10, title: "Comp and Fill", type: "keys",
        pianoKeys: { notes: ["A3", "C4", "E4", "G4", "A4", "C5", "D5"], label: "Am7 + Pentatonic Fills", range: ["A2", "G5"] },
        what: "Left hand keeps the comping rhythm going (offbeat chops or Charleston) while right hand plays Mixolydian or pentatonic fills. The left hand NEVER stops for the fill. This is two musicians in one body.",
        setup: "Organ preset. Metronome at 76 BPM.",
        metronome: 76,
        steps: [
          { text: "Left hand chops Am on &'s — this must be on complete autopilot. If it's not automatic yet, go back to Phase 1.", why: "Cory Henry's gospel organ approach: left hand IS the drummer, holding the groove no matter what the right hand does. If the left hand falters when the right hand enters, the comping isn't automatic enough." },
          { text: "Right hand: play 2-4 note pentatonic fills (A-C-D-E-G) in the gaps between chops. Start with just one fill every 4 bars.", why: "The fill goes in the SPACE between left-hand chops. Not over them, not replacing them. The left hand keeps time; the right hand comments." },
          { text: "The left hand NEVER stops for the fill. If it drops out, slow down and play fewer fill notes. One note is fine.", why: "This is the core hand-independence test. The left hand must be unconscious — like walking while talking. If you have to think about the left hand, it's not ready." },
          { text: "Apply over Am-Dm-G-C. Left hand comps, right hand fills on bar 4 of each chord. Use your Mixolydian fills from k6e1 and blues licks from k6e5.", why: "This synthesizes everything in Level 6: the scales, the licks, the rhythmic fills — all while maintaining the groove underneath. This is the real gig scenario." }
        ],
        feel: "Like being two musicians at once. The left hand is the rhythm section, the right hand is the soloist. When it works, it feels effortless — like the fill grows out of the groove.",
        wrong: "If the left hand drops out during fills, you're trying too much. Reduce to a one-note fill. Build up from there. The comping groove is sacred — it never stops.",
        sarah: "This is where keyboard becomes a completely different instrument from guitar. On guitar, both hands serve one thing. On keys, you're two musicians at once.",
        levelUp: "Am-Dm-G-C with continuous left-hand comping and right-hand pentatonic fills on bar 4 of each chord at 84 BPM. Left hand never drops out."
      }
    ]
  },
  {
    num: 7, name: "Full Integration", focus: "Full songs + band rehearsal",
    duration: "65 min",
    setup: "KeyLab 49 + Ableton + Analog Lab V. All sounds. Practice switching presets between sections using Ableton track selection or MIDI mapping.",
    exercises: [
      {
        id: "k7e1", time: 15, title: "Full Song Arrangement", type: "keys",
        recorder: true,
        pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Am7", range: ["A2", "G5"] },
        what: "Pick a band song. Write out the form (Intro/V/C/V/C/Bridge/C/Outro). Assign textures to each section. Play through without stopping. Record in Ableton and listen back.",
        setup: "All presets available. Ableton recording armed. Use the song's actual tempo.",
        steps: [
          { text: "Pick a band song. Write out the form: Intro, Verse, Chorus, Bridge, Outro.", why: "Map the structure before you play. Know what's coming so you can plan textures." },
          { text: "Assign textures: Intro=pad, Verse=chop (RH only), Chorus=full groove (both hands), Bridge=pad+arpeggio.", why: "Each section gets a different treatment. The variety IS the arrangement." },
          { text: "Play through without stopping. Mistakes = recover and keep going.", why: "Same discipline as your ILTWYW drill. The show doesn't stop for mistakes." },
          { text: "Record in Ableton, listen back. Does each section feel different? Where did the groove drop?", why: "Self-recording + critique = the fastest improvement loop. Same workflow, different instrument." }
        ],
        feel: "You should feel like you're telling a story. Each section = a chapter. The arrangement should have an arc — build, peak, resolve.",
        wrong: "If all sections sound the same, exaggerate the differences. Verse = whisper quiet, chorus = full volume. Bridge = completely different sound. Make it obvious.",
        sarah: "This is where all the skills converge into a real band part. Record it in Ableton, listen back, and ask: does this serve the song? Would anyone miss it if it were gone?",
        levelUp: "3+ min arrangement with 3 distinct section treatments recorded in Ableton."
      },
      {
        id: "k7e2", time: 10, title: "Style Switching", type: "keys",
        what: "Am-F-C-G throughout. Every 8 bars switch style: reggae chop, surf tremolo, ambient pad, SILENCE. Transitions: max 1 beat gap. The SILENCE section is a deliberate musical choice — the most powerful tool.",
        setup: "All presets ready. Metronome at 100 BPM.",
        steps: [
          { text: "8 bars reggae chop (Am-F-C-G). Full groove, both hands.", why: "Start with your strongest skill. Home base." },
          { text: "8 bars surf tremolo. Switch preset, hold chords with swells.", why: "Texture change = mood change. Same chords, different world." },
          { text: "8 bars ambient pad. Reverb bloom, slow transitions, arpeggiated delay.", why: "The quietest, most spacious texture. Let the reverb fill the room." },
          { text: "8 bars SILENCE. Hands in lap. This is a deliberate musical choice.", why: "The silence after 24 bars of playing creates anticipation. The most powerful tool." }
        ],
        feel: "Each 8-bar section should feel like a different room in the same house. The silence should feel like the most dramatic section.",
        wrong: "If transitions take more than 1 beat, practice just the switch points. The band doesn't stop for you to change sounds.",
        metronome: 100,
        pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Am7", range: ["A2", "G5"] },
        levelUp: "3 full cycles (chop-tremolo-pad-silence) at 108 BPM with clean transitions."
      },
      {
        id: "k7e3", time: 10, title: "Band Rehearsal Simulation", type: "keys",
        silenceTarget: 0.3,
        pianoKeys: { notes: ["A3", "C4", "E4"], label: "Am", range: ["A2", "E5"] },
        what: "Play along with a song from your band's repertoire or a reference artist (Allah-Las, Skinshape, Sun Room). Listen through once without playing. Map the gaps. Play along the second time. Lay out for 30%+ of the song.",
        setup: "Any preset. Full song from Spotify or your library. No click — follow the song.",
        steps: [
          { text: "Listen through once without playing. Map: where are the gaps? Where is it full?", why: "Same approach as The Art of Not Playing. Map before you contribute." },
          { text: "Second time: play along. Start minimal, add gradually. Enter late, leave early.", why: "You're joining a band, not leading it. Serve the song." },
          { text: "Lay out for 30%+ of the song. The silences are deliberate choices.", why: "If you play through the whole song, you're not listening. Restraint = musicianship." },
          { text: "Ultimate test: is the song better with keys? Would anyone miss them if removed? Both must be yes.", why: "This is the standard for every note you play in the band. Both tests, every time." }
        ],
        feel: "You should feel like a film colorist — adding warmth, contrast, atmosphere to something that already works. Not painting over the original.",
        wrong: "If you can't stop playing, set physical rules: no keys in verse 1, only chorus 2 onward. Build restraint through structure.",
        levelUp: "3 different songs where you lay out for 30%+ of runtime, use at least 2 textures (chop, pad, tremolo, or silence), and pass both tests: (1) song is better with keys, (2) someone would miss them. Record and verify."
      },
      {
        id: "k7e4", time: 10, title: "Ear Copy a Keyboard Part", type: "keys",
        pianoKeys: { notes: ["C4", "E4", "G4", "A4"], label: "C / Am", range: ["C3", "C6"] },
        what: "Pick a song with a keyboard part you love. Learn it by ear — no tabs, no sheet music, no YouTube tutorials. Ear → brain → hand. This is the skill that makes you self-sufficient as a musician.",
        setup: "Any preset that matches the song's keyboard sound. Song loaded in Spotify/YouTube. Slow-down tool optional (YouTube speed 0.75x).",
        steps: [
          { text: "Listen to the keyboard part 3 times. Don't play yet. Just absorb: what register? What rhythm? What voicing type?", why: "Observation before action. You're building a mental model before your hands touch keys." },
          { text: "Find the root notes first. Hum the bass line, then find those notes on the keyboard.", why: "Root notes = the skeleton. Once you have roots, you can figure out the chord quality (major/minor/7th)." },
          { text: "Build the chords. Is it a triad? 7th chord? What inversion? Try different voicings until one sounds right.", why: "Your Phase 2 voicing knowledge pays off here. You know the shapes — now match them to what you hear." },
          { text: "Get the rhythm last. Is it a chop? Sustained? Backbeat? Arpeggiated? Match the pattern.", why: "Notes + rhythm + voicing = the full part. Getting 80% right is a win. Perfection isn't the goal." }
        ],
        feel: "Like solving a puzzle by ear. The satisfaction of figuring out a part without help = real musical independence.",
        wrong: "If you're totally stuck, slow the track to 0.75x speed. If you still can't find the notes, try a simpler song. Build the ear gradually.",
        levelUp: "Learn a keyboard part from a reference track in under 10 minutes, 80%+ accurate."
      },
      {
        id: "k7e5", time: 10, title: "Eyes Closed Performance", type: "keys",
        recorder: true,
        pianoKeys: { notes: ["A3", "C4", "E4", "F4", "G4"], label: "Am-F-C-G", range: ["A2", "G5"] },
        what: "Play a full 3-minute arrangement without looking at the keyboard. Eyes closed or looking at the audience (the wall). This tests whether muscle memory is truly internalized — if you have to look, you're not ready for the stage.",
        setup: "All presets ready. Pick a song you've arranged in k7e1. No metronome — use internal time or a backing track.",
        steps: [
          { text: "Set up your arrangement: know the form, the preset switches, the voicings for each section.", why: "Preparation. You need to know the plan before you close your eyes." },
          { text: "Close your eyes. Play the full arrangement. Don't stop for mistakes — recover and keep going.", why: "The Taubman approach to keyboard technique emphasizes navigating by interval feel rather than visual reference. Experienced organists develop proprioceptive maps — the physical width of a 3rd, 5th, and octave becomes encoded in hand muscle memory. Motor learning research (Proteau et al.) confirms that eyes-closed practice accelerates proprioceptive encoding compared to visual practice. Mistakes are fine — stopping isn't." },
          { text: "Focus on the FEEL of each chord under your fingers. C major feels different from Am. Learn the hand shapes by touch.", why: "Experienced keyboard players navigate by feel, not sight. The intervals have a physical width you can memorize." },
          { text: "If you get lost, open your eyes for one chord, close again. Over time, you'll need to peek less.", why: "This is a gradual process. Each session, peek less. The goal is zero peeks." }
        ],
        feel: "Liberating. When you don't need to look at the keys, you can watch your bandmates, read the room, connect with the audience. That's performance.",
        wrong: "If you can't find any chords by feel, start smaller: eyes closed for just the verse (one voicing, no changes). Add sections as the muscle memory builds.",
        sarah: "On stage, you need to watch Court for cues, watch your guitar player for section changes, and read the room. You can't do any of that if you're staring at keys.",
        levelUp: "Full 3-minute arrangement with eyes closed, fewer than 3 peeks."
      },
      {
        id: "k7e6", time: 10, title: "Ostinato Bass + Chords", type: "keys",
        recorder: true,
        pianoKeys: { notes: ["A2", "C3", "D3", "E3", "A3", "C4", "E4", "G4"], label: "Am Ostinato + Am7 Chord", range: ["A2", "G5"] },
        what: "Ray Manzarek-style: left hand plays a repeating bass riff (ostinato) while right hand comps chords above. This is for songs where there's no bass player — one person, full band sound. The most advanced hand independence skill.",
        setup: "Organ preset (B-3 V or Vox Continental V for that Doors vibe). Metronome at 72 BPM.",
        metronome: 72,
        steps: [
          { text: "Left hand ostinato on Am: A2-C3-D3-E3, one note per beat, ascending. Loop it 8 times until it's automatic. Don't think about it — let it become a motor loop.", why: "Ray Manzarek built The Doors' sound this way — repeating riff patterns in the bass register, not jazz walking bass. He was thinking melodically in the low register, and his left hand wrote basslines 'very difficult to play on a bass guitar' because keyboard bass thinks differently." },
          { text: "Right hand enters: sustained Am7 chord (C4-E4-G4-A4) or soft chops on beats 2 and 4. Left hand keeps the ostinato going.", why: "The right hand must enter without disrupting the left. Start with just a sustained chord — the easiest right-hand pattern — before adding rhythm." },
          { text: "Left hand ostinato for each chord: Am: A2-C3-D3-E3, F: F2-A2-C3-A2, C: C3-E3-G3-E3, G: G2-B2-D3-B2. Practice each until automatic.", why: "Each chord gets its own 4-note riff. The shapes are simple — mostly chord tones with one passing tone. Memorize by hand shape, not by thinking." },
          { text: "Full progression: Am-F-C-G with left hand ostinatos and right hand chords. Record and listen back. Does the bass sound like a bass player?", why: "The test: can a listener hear two instruments (bass + keys) or does it sound like one confused instrument? If it sounds like two, you've got it." }
        ],
        feel: "Like being a one-person band. The left hand is the bassist, the right hand is the keyboardist. They're playing together but independently. When it works, the sound is huge.",
        wrong: "If the left hand loses the riff when the right hand enters, the ostinato isn't automatic yet. Go back to left hand alone and loop it 20 more times. Only add the right hand when the left hand is unconscious.",
        sarah: "This is for the songs where there's no bass player. Left hand becomes the bass, right hand becomes the keys. One person, full band sound.",
        levelUp: "Am-F-C-G with left-hand ostinato bass + right-hand chords at 80 BPM for 2 full cycles. Both hands clearly audible as separate musical roles."
      }
    ]
  }
];

// ─── LOOPER CURRICULUM (RC-505mkII) ─────────────────────────────────
export { LOOPER_LEVELS } from './looperLevels/index.js';


// ─── LESSON POOL ────────────────────────────────────────────────────
export const LESSON_POOL = [
  {
    id: "lesson-2025-01-13",
    date: "2025-01-13",
    title: "Rhythm, Island Strum & Song Practice",
    duration: "~1hr 10min",
    transcriptFile: "2025-01-13_lesson_sarah.txt",
    buildsOn: [],
    topics: ["rhythm", "guitar", "song"],

    summary: "Gene reports bandmates noticed rhythm improvement. Sarah introduces the island strum over a Surf Rock Beat at 120 BPM with Am-C-G-D, then fingerpicking the same progression. They work on I Like The Way You Walk at 80-90 BPM, focusing on entry timing and staying on beat. Sarah emphasizes the metronome as a constant companion and introduces playing as meditation.",

    exercises: [
      {
        id: "L1-ex1",
        title: "Island Strum over Surf Rock Beat",
        type: "guitar",
        time: 15,
        what: "Play the island strum pattern (down, down-up, up, down-up) over Surf Rock Beat 120 BPM with Am, C, G, D while counting out loud.",
        setup: "Guitar. Surf Rock Beat 120 BPM YouTube video on speaker. Chord shapes Am, C, G, D ready.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Start the Surf Rock Beat at 120 BPM. Count the 8-count intro and enter on the one.", why: "Sarah emphasized the entry point is critical. Count 1-2-3-4-5-6-7-8 then come in right after the drum roll." },
          { text: "Play island strum: down, down-up, up, down-up. Count 1-2-3-4 out loud. Stay on Am for 4 bars, then switch to C, G, D.", why: "Counting out loud forces you to internalize the beat while your hands handle the strum." },
          { text: "When the beat changes or does fills, keep going. The tempo stays at 120 BPM no matter what the drummer plays.", why: "Sarah: 'Even when he changes what he plays, don't stop. His runs and fills are gonna stay at 120 beats per minute, so just keep going.'" },
          { text: "Find any consistent rhythmic sound in the beat and latch onto it. Use that as your anchor.", why: "Sarah: 'The main goal is to find a consistent sound that you can jump and latch onto -- find the count within that sound.'" }
        ],
        feel: "When you lock in, the strum should feel automatic. You should be able to hear the drum hits aligning with your count. If the beat has a double-hit pattern, use that as your anchor.",
        wrong: "If you slow down when you start strumming, the strum pattern itself may not be automatic yet. Practice the strum without any backing track first, then add it back.",
        sarah: "That's not cheating. That's exactly how you're supposed to do it. You want to find those consistent rhythms that reoccur and latch onto those.",
        metronome: 120,
        levelUp: "Play through the full 5-minute backing track without falling off beat."
      },
      {
        id: "L1-ex2",
        title: "Fingerpicking Am-C-G-D",
        type: "guitar",
        time: 10,
        what: "Fingerpick the same chord progression using alternating thumb (A string) and pointer (B string) while counting out loud over the Surf Rock Beat.",
        setup: "Guitar. Same Surf Rock Beat 120 BPM. Chord shapes Am, C, G, D.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Fingerpick: alternate thumb on A string and pointer on B string. 4 back-and-forth picks per chord.", why: "This builds the finger independence you need to later layer singing on top." },
          { text: "Count 1-2-3-4 out loud. The count should align with your thumb hits.", why: "Same rhythmic internalization as the strum exercise, different picking technique." },
          { text: "Enter right on the very first beat of the backing track. Try pressing play and getting to your guitar in time.", why: "Sarah: 'See if you can come right in on the very first one.'" },
          { text: "Run the entire backing track. Don't stop after 3-4 minutes.", why: "Sarah: 'Doing things for more than six minutes is so good. The magic really happens beyond three or four minutes.'" }
        ],
        feel: "The picking should become mechanical enough that you can start thinking about other things while staying on beat. That meditative state is the goal.",
        wrong: "If the chord changes throw off your picking rhythm, slow down or stay on one chord until the picking pattern is automatic.",
        sarah: "You're finger picking the same chord progression -- do your A string and your B string. Make sure you are on beat. As soon as you hear that you're off, you gotta stop.",
        metronome: 120,
        levelUp: "Full backing track run-through with clean entries and no drift."
      },
      {
        id: "L1-ex3",
        title: "I Like The Way You Walk -- Strum + Groove Beat",
        type: "song",
        time: 20,
        what: "Learn the strum pattern for ILTWYW over a groove beat, starting at 80 BPM and working up to 90. The song is about 95 BPM.",
        setup: "Guitar. Groove Beat at 80 BPM, then 90 BPM. I Like The Way You Walk reference recording.",
        tracks: [{ name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }],
        steps: [
          { text: "Start with Groove Beat at 80 BPM. Learn the 8-count strum pattern: strum on count 1-8, silent on count 2 of the next bar.", why: "The tricky part is getting the silent count in the right place. Sarah spent significant time correcting this." },
          { text: "Use the bass drum as your downbeat anchor. You can really hear it in the groove beat.", why: "Sarah: 'You can use that beat as your downbeat. You can really hear it.' Gene said this made it much easier." },
          { text: "Physically embody the beat: nod your head, stomp, or move some body part on the downbeat.", why: "Sarah: 'I have to move part of my body. You need that downbeat somewhere in your body.'" },
          { text: "Master the strum pattern without the YouTube tutorial video first. Then bring it to the video.", why: "Sarah: 'Master the strum without the video, and then bring it to the video.'" },
          { text: "Record yourself and listen back. Note how long it takes you to realize you've gone off beat.", why: "Sarah: 'Record yourself. You might be like, oh, it took me 20 seconds to hear that I was off. Work it down to five seconds.'" }
        ],
        feel: "When the bass drum locks in with your count, the whole thing suddenly becomes much easier. The strum should feel like riding the beat, not fighting it.",
        wrong: "If you're off beat and don't notice, that's the biggest danger. It's way better to stop every 20 seconds than to keep going off beat -- you'd be training your brain wrong.",
        sarah: "Stop. Fix it fast. It's way better to stop every 20 seconds than to keep going off beat, because if you're not on beat, your brain is not in the state it needs to be in.",
        metronome: 80,
        recorder: true,
        levelUp: "Clean strum at 90 BPM through the full groove beat track."
      },
      {
        id: "L1-ex4",
        title: "Meditation While Playing",
        type: "guitar",
        time: 10,
        what: "Once locked in on beat, keep playing for 10+ minutes and let your mind wander. The goal is to stay on beat while thinking about other things.",
        setup: "Guitar. Any of the backing tracks (Surf Rock 120 BPM or Groove Beat). Commit to playing the whole track without stopping.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }, { name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }],
        steps: [
          { text: "Get locked in on any exercise above -- strum or fingerpick.", why: "You need to be on beat first. The meditation only works when the rhythm is automatic." },
          { text: "Once locked in, let your mind wander. Think about problems, ideas, whatever comes up.", why: "Sarah: 'Some of my greatest ideas that aren't even related to music happen in that state. Your brain will start wandering into thought spaces that are not normal.'" },
          { text: "Stay on beat the entire time. If you drift off, stop, re-enter, keep going.", why: "The exercise trains your body to hold rhythm while your conscious mind does other things." },
          { text: "Do the whole track -- don't stop after three or four minutes.", why: "Sarah: 'The magic really happens beyond three or four minutes. When you're still in it and you are on beat, you can start thinking about other things.'" }
        ],
        feel: "Your body plays while your mind explores. It should feel like a trance state. Neurons are firing in unusual patterns because you're active physically while flowing in thought.",
        wrong: "If your mind wanders and you go off beat, that's the exercise -- notice the drift, stop, re-enter. Don't just keep going off beat.",
        sarah: "Do the whole track. Don't stop after three or four minutes. The magic really happens beyond that. Use it as meditation -- go into it with an intention, but don't get off the beat.",
        metronome: 120,
        levelUp: "Complete a full 10+ minute backing track while thinking about something else entirely."
      }
    ],

    progress: [
      { area: "rhythm", note: "Bandmates noticed improvement in Gene's rhythm since starting lessons with Sarah", direction: "improving" },
      { area: "rhythm", note: "Entry timing is good but slows down slightly when strumming begins", direction: "needs-work" },
      { area: "rhythm", note: "Gene found latching onto consistent rhythmic patterns (double-hit) as anchor -- exactly what Sarah wanted", direction: "improving" },
      { area: "guitar", note: "Chord changes during fingerpicking are solid -- Sarah noted clear improvement", direction: "improving" }
    ],

    sarahQuotes: [
      { quote: "That's not cheating. That's exactly how you're supposed to do it.", context: "When Gene felt like finding a rhythmic pattern to latch onto was cheating" },
      { quote: "The main goal is to find a consistent sound that you can jump and latch onto -- find the count within that sound.", context: "Explaining how to find the beat in a backing track" },
      { quote: "I have to move part of my body. You need that downbeat somewhere in your body.", context: "On the importance of physically embodying the beat" },
      { quote: "Doing things for more than six minutes is so good. The magic really happens beyond three or four minutes.", context: "Encouraging longer practice sessions for the meditative state" },
      { quote: "Stop. Fix it fast. It's way better to stop every 20 seconds than to keep going off beat.", context: "On not practicing mistakes -- the brain is not in the right state when off beat" },
      { quote: "Master the strum without the video, and then bring it to the video.", context: "On learning the ILTWYW strum pattern" },
      { quote: "Record yourself. You might be like, oh, it took me 20 seconds to hear that I was off. Work it down to five seconds.", context: "On self-monitoring rhythm" },
      { quote: "Incorporate the metronome into every single thing that you do.", context: "On making rhythm a constant companion in all practice" },
      { quote: "Doing things slowly and right 100% of the time is way better for your brain than doing them fast and right 80% of the time.", context: "On prioritizing accuracy over speed -- the race car / myelin analogy" },
      { quote: "Some of my greatest ideas that aren't even related to music happen in that state -- when I'm strumming and counting and letting my mind wander.", context: "On the meditative trance state that comes from locked-in playing" },
      { quote: "Your rhythm has gotten better since we've done rhythm stuff together.", context: "Noting Gene's progress mid-lesson" }
    ]
  },
  {
    id: "lesson-2026-01-27",
    date: "2026-01-27",
    title: "Ear Training & Voice Registers",
    duration: "~14min",
    transcriptFile: "2026-01-27_lesson_sarah.txt",
    buildsOn: ["lesson-2025-01-13"],
    topics: ["vocal", "listen"],

    summary: "Sarah introduces ear training by having Gene strum chords and sing the notes he hears without plucking individual strings. Gene discovers an F# over a C chord that works beautifully. Sarah then identifies Gene flipping between head and chest voice and teaches the 'Hey, stop it!' exercise for diaphragm engagement, explains mixed voice and falsetto, and pinpoints Gene's passaggio at A3.",

    exercises: [
      {
        id: "L2-ex1",
        title: "Chord Tone Singing by Ear",
        type: "listen",
        time: 5,
        what: "Strum a chord and sing the notes you hear -- without plucking individual strings. Train your ear to find notes naturally, even ones outside the scale.",
        setup: "Guitar. Quiet room. No backing track -- just you and the guitar.",
        steps: [
          { text: "Strum a C chord once, full and open. Let it ring. Now pluck individual strings -- what's the next note you hear after the strum?", why: "Sarah started by asking Gene to identify individual notes within the chord." },
          { text: "Now strum again but DON'T pluck individual strings. Sing the first note you hear. Commit to it even if it feels wrong.", why: "Sarah: 'You should follow through and make that mistake so that you kind of learn from it.'" },
          { text: "Sing 3-4 notes you hear in the chord. Strum the guitar while singing them to check if they work.", why: "Gene found an F# over C that shouldn't have worked in theory but sounded beautiful because they were coming from Am." },
          { text: "Repeat with Am, G, D. Notice how your ear finds different notes over different chords.", why: "Sarah: 'It's a beautiful thing that our brains naturally find these notes that are outside of the scale.'" }
        ],
        feel: "This should feel exploratory. When a note clicks with the chord, you'll feel it. 'Wrong' notes often turn out to be chromatic connections between chords that sound beautiful.",
        wrong: "If you're plucking individual strings to find the notes first, you're bypassing your ear. The whole point is to let your singing brain find them.",
        sarah: "It's actually a great thing that you didn't pluck your guitar in that moment because you found an F sharp, and that's a good thing. Our brains naturally find these notes that are outside of the scale.",
        levelUp: "Find 3+ notes per chord without plucking. Notice one 'surprise' note that works."
      },
      {
        id: "L2-ex2",
        title: "Chest vs Head Voice -- 'Hey, Stop It!'",
        type: "vocal",
        time: 5,
        what: "Discover the physical difference between chest voice and head voice using natural speech. Feel the diaphragm engage on chest voice commands.",
        setup: "Standing or sitting upright. Hand on belly, skin contact. No guitar.",
        steps: [
          { text: "Put your hand on your belly. Say 'Hey!' like someone across the room -- loud, natural. Feel your belly push out against your hand.", why: "Sarah: 'That's your chest voice. Hey, hey! Keep imitating me perfectly!'" },
          { text: "Now say 'Hey' softly, gently, from your head. Notice there's no belly engagement.", why: "Sarah: 'You don't feel that engagement, right? No. Not as much.'" },
          { text: "Say 'Hey, stop it!' -- commit to it, like you mean it. Feel the diaphragm engage.", why: "Sarah used escalating intensity to get Gene to find full chest voice engagement." },
          { text: "Alternate: loud 'Hey!' (chest) then quiet 'hey' (head) then loud 'Hey, STOP IT!' (chest). Feel the flip between them.", why: "Sarah: 'It's not even just a volume thing, it's an engagement of that diaphragm muscle down there. Like you're getting hit in the stomach -- what you would do is flex those abs.'" }
        ],
        feel: "Chest voice should make your whole torso resonate. The belly push is unmistakable. Head voice feels lighter, from the neck up, no belly engagement.",
        wrong: "If 'Hey, stop it!' feels like you're just getting louder without the belly engagement, you're pushing from your throat. Think of getting punched in the stomach -- that instinctive flex is what you want.",
        sarah: "It's not even just a volume thing, it's an engagement of that diaphragm muscle down there. Like you're getting hit in the stomach -- what you would do is flex those abs. Hey! Hey!",
        levelUp: "Feel a clear, unmistakable difference between chest voice belly-push and head voice lightness."
      },
      {
        id: "L2-ex3",
        title: "Register Flipping -- Head, Chest, Mixed, Falsetto",
        type: "vocal",
        time: 5,
        what: "Practice flipping between vocal registers on command. Find where your voice naturally transitions and develop control over which register you use.",
        setup: "Standing. No guitar. Water nearby.",
        steps: [
          { text: "Sing a comfortable note in chest voice. Now sing the same note from your head voice. Go back and forth.", why: "Sarah noticed Gene flipping uncontrollably between registers on high notes and wanted him to learn to choose." },
          { text: "Find your falsetto -- go up about an octave above where you were. It should be a completely different, lighter quality.", why: "Sarah: 'That's your falsetto. That's like a whole octave above what we were just doing.'" },
          { text: "Find your mixed voice -- use both head and chest together. It should be a big, powerful sound.", why: "Sarah: 'Mixed voice is the most powerful one because you're using your head to get a big sound.'" },
          { text: "Practice flipping: chest to head to mixed to falsetto and back. The goal is choosing which one you use.", why: "Sarah: 'Having that control -- getting the high notes in a quiet way or in a louder way and flipping between the mechanisms -- I think would be great practice for you.'" }
        ],
        feel: "Each register should feel physically different. Chest is belly-engaged and full. Head is lighter, neck-up. Mixed is the best of both -- chest power through head placement. Falsetto is airy and an octave higher.",
        wrong: "If you can't tell which register you're in, go back to the 'Hey, stop it!' exercise and re-establish the chest/head difference first.",
        sarah: "People often think that belting is like yelling, but actually belting is from a mixed voice. If you can mix it, if you know how to mix it, then you can have a huge voice.",
        levelUp: "Flip between all four registers on command on the same pitch (where possible)."
      },
      {
        id: "L2-ex4",
        title: "Find Your Passaggio",
        type: "vocal",
        time: 3,
        what: "Identify exactly where your voice flips from chest to head. Sarah pinpointed Gene's passaggio at A3. This is the zone to train.",
        setup: "Standing. No guitar. Commit fully -- half-singing hides the flip point.",
        steps: [
          { text: "Sing ascending notes with full commitment, starting from around E3. Push air, don't hold back.", why: "Sarah: 'Part of it is commitment too -- you're also not pushing. The question is, when you're fully committing, where do you do the flip?'" },
          { text: "Notice where your voice wants to flip into head voice or falsetto. That's your passaggio.", why: "Sarah identified Gene's flip at A3." },
          { text: "The area 3 notes above and 3 notes below that flip point is where you want to practice.", why: "Sarah: 'That area is where I would really work. You want to be able to have full control over your tone choice when you're choosing those notes.'" }
        ],
        feel: "You should feel the voice transition -- a moment where chest voice stops being comfortable and the voice wants to shift. With commitment, the flip is more obvious.",
        wrong: "If you can't find the flip, you're probably not committing enough. Half-singing and holding back hides the passaggio.",
        sarah: "Your flip is around A3. That area is where I would really work. You want to be able to have full control over your tone choice when you're choosing those notes.",
        referencePitches: getPitchRange("E3", "A3"),
        levelUp: "Know your flip point on any given day and be able to approach it from both directions."
      }
    ],

    progress: [
      { area: "listen", note: "Gene's ear naturally found F# over a C chord -- musically beautiful chromatic connection from Am", direction: "improving" },
      { area: "vocal", note: "Gene is flipping uncontrollably between head and chest on high notes -- needs to learn to choose", direction: "needs-work" },
      { area: "vocal", note: "Passaggio identified at A3 -- now has a specific zone to train", direction: "new" },
      { area: "vocal", note: "Gene has a beautiful head voice per Sarah -- mixed voice is the next frontier", direction: "new" },
      { area: "vocal", note: "Voice type confirmed as tenor", direction: "new" }
    ],

    sarahQuotes: [
      { quote: "You should follow through and make that mistake so that you kind of learn from it.", context: "On committing to notes even when unsure -- the ear learns from mistakes" },
      { quote: "It's actually a great thing that you didn't pluck your guitar in that moment because you found an F sharp, and that's a good thing. Our brains naturally find these notes that are outside of the scale.", context: "When Gene discovered F# over a C chord that worked musically" },
      { quote: "Commit more, Jean!", context: "Encouraging Gene to push more air and commit to notes" },
      { quote: "It's not even just a volume thing, it's an engagement of that diaphragm muscle down there. Like you're getting hit in the stomach -- what you would do is flex those abs.", context: "Explaining the physical difference between chest voice and head voice" },
      { quote: "People often think that belting is like yelling, but actually belting is from a mixed voice. If you can mix it, you can have a huge voice.", context: "Explaining what belting actually is -- not yelling, but controlled mixing" },
      { quote: "That's your falsetto. That's like a whole octave above what we were just doing.", context: "Identifying Gene's falsetto register for the first time" },
      { quote: "Mixed voice is the most powerful one because you're using your head to get a big sound.", context: "Advocating for mixed voice as the register to develop" },
      { quote: "So you're like a tenor, yeah, that makes sense.", context: "Confirming Gene's voice type" },
      { quote: "Your flip is around A3. That area is where I would really work. You want to be able to have full control over your tone choice.", context: "Pinpointing the exact passaggio note to train" },
      { quote: "If you are going to find any exercises with that using AI, I would make sure to tell them that you have a man voice because the notes that you flip on are going to be different.", context: "Practical advice on using AI for vocal exercises" }
    ]
  }
];
