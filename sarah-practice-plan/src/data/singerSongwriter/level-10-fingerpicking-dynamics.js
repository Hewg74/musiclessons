import { getPitchRange } from "../appData.js";

export const level10 = {
  level: 10,
  title: "Fingerpicking & Dynamics",
  subtitle: "New fingers. New voice. Same autopilot method.",
  description:
    "Fingerpicking is a completely different motor program from strumming — your right hand must relearn from scratch. Apply the same Level-1 autopilot process: drill the pattern until it's automatic, then layer voice on top. Fingerpicking + singing is the signature sound of intimate singer-songwriters: Nick Drake, Tommy Guerrero, Hermanos Gutierrez. This level also masters dynamic range — the difference between whisper and full voice.",
  artists: "Nick Drake, Tommy Guerrero, Hermanos Gutierrez, José González",
  unlocks: "Performance & Identity (Level 11)",
  review: { label: "Level 8-9 Check-In", time: 5, exercises: ["ss-8-6", "ss-9-4"], prompt: "Play your arranged song with dynamics (ss-8-6). Then check prosody on your latest lyrics (ss-9-4). Both polished? Move on." },
  exercises: [
    {
      id: "ss-10-1",
      time: 8,
      title: "Fingerpick Autopilot",
      type: "guitar",
      what: "Learn a basic fingerpicking pattern: thumb plays bass note (strings 4-6), index and middle alternate on treble strings (1-3). One chord: Am. Loop it until you can zone out — the conversation test from Level 1 applies again. This is autopilot training for a new motor program.",
      setup: "Guitar (nylon-string preferred). Metronome at 60 BPM. No pick — use your thumb and two fingers.",
      steps: [
        { text: "Hold Am. Thumb plays the A string (5th). Index plays the B string (2nd). Middle plays the high E string (1st). Pattern: Thumb-Index-Middle-Index. Repeat.", why: "This T-I-M-I pattern is the most common fingerpicking pattern in folk and classical guitar. The thumb anchors the bass while fingers dance on treble." },
        { text: "Loop the pattern on Am for 3 minutes. Aim for even volume across all notes — each finger produces the same loudness.", why: "Evenness is the hallmark of good fingerpicking. Uneven volume makes the pattern sound clumsy. Each finger must find its string without looking." },
        { text: "Try the same pattern on C, then G, then Em. Same right-hand pattern, different left-hand chord. The thumb adjusts to each chord's bass note.", why: "Each chord has a different bass string. Am=5th string, C=5th string, G=6th string, Em=6th string. The thumb must adapt." },
        { text: "Conversation test: can you fingerpick Am-C-G-Em and describe your room simultaneously? If yes, the pattern is reaching autopilot.", why: "Same test as Level 1 strumming. If you can talk while picking, the motor program has moved to procedural memory." }
      ],
      feel: "Fingerpicking should feel delicate and rolling — a gentle cascade of notes instead of a strum. The nylon-string sound is warm and intimate. Think Nick Drake, Tommy Guerrero.",
      wrong: "If your fingers are catching or producing uneven volume, slow down. Each note should ring clearly with equal volume. If your thumb keeps hitting the wrong bass string, watch it for a while — then close your eyes and feel.",
      sarah: "Gene, fingerpicking + singing is the hardest integration in this curriculum. Your right hand needs a completely new autopilot. Be patient — this is Level 1 all over again, just with different fingers.",
      metronome: 60,
      speedLadder: { start: 50, end: 80, increment: 5, bars: 8 },
      recorder: true
    },
    {
      id: "ss-10-2",
      time: 8,
      title: "Fingerpick + Voice Integration",
      type: "song",
      what: "Apply the Level 2 speak-hum-sing method to fingerpicking: speak over the pattern, then hum, then sing. Same three stages, new motor challenge. The voice layers on top of an entirely different hand pattern.",
      steps: [
        { text: "Fingerpick Am-C-G at 60 BPM on autopilot. Now speak made-up phrases while picking. If picking breaks, stop speaking and re-establish.", why: "Speaking is the easiest vocal task. If the picking breaks during speech, it's not automatic enough. Go back to ss-10-1." },
        { text: "Hum a melody contour over your fingerpicking. Keep the picking steady — let the humming ride on top.", why: "Humming adds pitch without words. It's the intermediate step between speaking and singing." },
        { text: "Sing an original melody at a relaxed tempo. Porch register. Don't project. Let the fingerpicking be louder than your voice.", why: "Fingerpicking + quiet voice is the Singer-Songwriter Aesthetic. Think Nick Drake — the guitar is prominent, the voice is intimate." },
        { text: "If the picking falls apart during singing, deploy escape hatch: simplify to thumb-only (bass notes) while singing. Then gradually add fingers back.", why: "The escape hatch for fingerpicking is reducing to just the thumb. One bass note per chord is the minimum. Build back up from there." }
      ],
      feel: "Fingerpicked songs feel more intimate and exposed than strummed songs. The notes are individual, clear, vulnerable. Your voice matches that vulnerability.",
      wrong: "If you're treating fingerpicking like strumming (loud, aggressive), pull back. Fingerpicking is gentle. If your singing overwhelms the picking, sing quieter.",
      sarah: "Gene, fingerpicking unlocks the nylon-string, Hermanos Gutierrez, Tommy Guerrero side of your taste. It's a different sound world from strumming — more intimate, more spacious.",
      metronome: 60,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-10-3",
      time: 8,
      title: "Travis Picking",
      type: "guitar",
      what: "Learn alternating bass (Travis picking): the thumb alternates between two bass strings while fingers pick a pattern on the treble strings. This creates the illusion of two guitars — a bass line AND a melody simultaneously. It's the hallmark of folk fingerstyle.",
      setup: "Guitar. Metronome at 55 BPM. Start slower than you think you need to.",
      steps: [
        { text: "Hold C. Thumb alternates: 5th string (C) then 4th string (E). Just the thumb, alternating, in time. 2 minutes.", why: "The alternating thumb IS Travis picking. It creates a walking bass line. Getting the thumb independent is the hardest part." },
        { text: "Add index finger: pinch the 2nd string (B) with your thumb-strike on the 5th string. Then thumb plays 4th string alone. Pattern: Pinch-Thumb-Pinch-Thumb.", why: "The pinch (thumb + finger together) is the backbone of Travis picking. It emphasizes beat 1 while the bass walks." },
        { text: "Try on G: thumb alternates 6th string (G) and 4th string (D). Index pinches the 2nd string on beat 1. Same pattern, new bass notes.", why: "G is the classic Travis picking chord — the wide bass alternation (6th to 4th string) creates a big, spacious bass line." },
        { text: "Chain C (4 beats) → G (4 beats) → Am (4 beats) → G (4 beats). Travis picking through the changes. The thumb moves to each chord's bass strings automatically.", why: "Travis picking through chord changes is the goal. When the thumb finds the right bass strings without conscious thought, it's autopilot." }
      ],
      feel: "Travis picking should feel like your thumb has its own brain — it walks the bass independently while your fingers handle the melody. Two parts, one guitarist.",
      wrong: "If your thumb and fingers are playing at the same time on every beat, you're not alternating. The thumb alternates bass notes BETWEEN the finger picks. Slow down until you can hear the independence.",
      sarah: "Gene, Travis picking is the technique behind Tommy Guerrero's guitar work. It sounds complex but it's just a thumb alternation with a simple finger pattern on top.",
      metronome: 55,
      speedLadder: { start: 45, end: 70, increment: 5, bars: 4 },
      recorder: true
    },
    {
      id: "ss-10-4",
      time: 8,
      title: "Dynamic Range",
      type: "vocal",
      what: "Master the full dynamic range of your voice: from near-whisper (pp) to full chest voice (ff). Most singer-songwriters use 20% of their dynamic range. This exercise maps the full spectrum and trains you to control it.",
      steps: [
        { text: "Sing a sustained A at the quietest volume possible — barely audible, intimate, right next to the mic. This is pp (pianissimo). Hold it for 8 beats.", why: "The whisper-sing is an underused tool. DOPE LEMON, Nick Drake — much of their vocal power comes from how quiet they can be." },
        { text: "Gradually increase volume over 8 bars — from pp to mp to mf to f to ff. One smooth crescendo. Then reverse: ff back down to pp.", why: "The crescendo/decrescendo exercise maps your full range and trains smooth transitions. Sudden jumps are less musical than gradual shifts." },
        { text: "Sing a melody at pp (whisper). Then the same melody at ff (full voice). Notice how the timbre changes — not just the volume. Your voice has different colors at different volumes.", why: "Quiet voice is intimate, breathy, vulnerable. Loud voice is confident, warm, present. Both are tools. Most songs need both." },
        { text: "Create a song section where the first phrase is pp and the second is ff. Practice the TRANSITION — the shift from quiet to loud should feel intentional.", why: "Dynamic contrast within a section is the most dramatic tool in performance. Whispering then projecting in the same verse creates emotional whiplash — in a good way." }
      ],
      feel: "Dynamic range should feel like having gears — each volume level is a different gear for a different purpose. Shifting smoothly between them is the art.",
      wrong: "If your quiet singing is just regular singing but softer, you're not using the breathy register. True pp uses more air and less cord closure — it sounds different, not just quieter.",
      sarah: "Gene, your porch register is naturally quiet. This exercise extends the OTHER end — finding your full chest voice. You don't need to belt, but you need volume contrast for dynamics to work.",
      metronome: 60,
      volumeMeter: true,
      referencePitches: getPitchRange("A3", "A4"),
      recorder: true
    },
    {
      id: "ss-10-5",
      time: 10,
      title: "Fingerpicked Original",
      type: "song",
      what: "Create an original fingerpicked song — intimate, dynamic, personal. Use your best lyrics, a pentatonic melody in porch register, and the full dynamic arc: fingerpicked intro (pp) → sung verse (mp) → chorus with more energy (f) → back to fingerpicking (pp).",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Create a fingerpicking pattern for Am-G-C-Em (or any progression). Get it flowing on autopilot at 60 BPM.", why: "The fingerpicking pattern is the foundation. It must be invisible before you layer voice, dynamics, and lyrics." },
        { text: "Compose a verse melody: low range, intimate delivery, sparse lyrics about something real. Sing it over the fingerpicking.", why: "Fingerpicked songs demand simpler, more personal lyrics. The intimacy of the guitar demands intimacy from the words." },
        { text: "Create a chorus that's slightly louder and higher — but still intimate. Maybe switch to light strumming for the chorus to increase energy.", why: "The fingerpick → strum transition is a natural dynamic shift. It creates section contrast without the voice needing to change dramatically." },
        { text: "Arrange: fingerpick intro (8 bars) → verse (8 bars) → chorus (strum, 8 bars) → verse (fingerpick, 8 bars) → chorus → fingerpick outro. Record.", why: "The fingerpick-strum-fingerpick arc mirrors breathing — intimate, expansive, intimate again. It's the song's dynamic skeleton." }
      ],
      feel: "A fingerpicked original should feel like a late-night confession — quiet, personal, slightly vulnerable. The kind of song you play alone with one candle lit.",
      wrong: "If it sounds like a strummed song with different hand technique, you haven't embraced the fingerpicking aesthetic. Pull back your voice, slow down, leave more space. Fingerpicking songs breathe slowly.",
      sarah: "Gene, this is the Nick Drake / Tommy Guerrero side of your musical identity. Intimate, warm, slightly melancholic. This song reveals a different you than the reggae or surf originals.",
      metronome: 60,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      recorder: true,
      levelUp: "Can fingerpick and sing simultaneously, use Travis picking, control full dynamic range (pp to ff), and create intimate fingerpicked originals with dynamic arcs."
    }
  ]
};
