import { getPitchRange } from "../appData.js";

export const level6 = {
  num: 6, name: "Style & Texture", focus: "Falsetto, lo-fi delivery, genre techniques",
  duration: "20 min",
  setup: "Standing. Phone for recording. Reference tracks ready.",
  subtitle: "Finding YOUR Sound",
  description: "Every great singer has a recognizable texture. Angus Stone's lo-fi whisper, Thom Yorke's falsetto breaks, Bob Marley's rhythmic precision, Laura Lee's psychedelic float. This level explores genre-specific vocal textures so you can find the combination that sounds like YOU.",
  artists: "Angus Stone, Thom Yorke, Laura Lee (Khruangbin)",
  unlocks: "Harmony & Layering (Level 7)",
  review: { label: "Level 4 Check-In", time: 5, exercises: ["v4e1", "v4e3"], prompt: "Strum Am and sing root-3rd-5th (A-C-E) without checking guitar (v4e1). Then build a melody from chord tones over Am-C-G-D (v4e3). Ear training needs maintenance." },
  exercises: [
    {
      id: "v6e1", time: 4, title: "The Falsetto Switch", type: "vocal",
      recorder: true,
      pitchContour: true,
      what: "Chest-to-falsetto mid-phrase. Thom Yorke, Bon Iver, and Jeff Buckley all use this -- the voice breaks from full chest into airy falsetto within a single line, creating emotional contrast.",
      setup: "Standing. Record yourself. Comfortable range around A3-E4.",
      referencePitches: getPitchRange("A3", "E4"),
      steps: [
        { text: "Sing a phrase in chest voice up to around A3-Bb3. Full, committed tone.", why: "You need a solid chest voice runway before the switch. The contrast makes the falsetto meaningful." },
        { text: "At the peak of the phrase, switch to falsetto. Let the voice break -- don't try to smooth it.", why: "The break IS the effect. Thom Yorke doesn't hide it. Bon Iver leans into it. The crack is emotional." },
        { text: "Practice the switch point: sing A3 in chest, then immediately B3 in falsetto. Feel the flip.", why: "The flip happens when the vocal folds suddenly thin. At first it will crack -- that's the pathway opening." },
        { text: "Try it on a lyric: start the line in chest, flip to falsetto for the last 2-3 words.", why: "In context, the falsetto words become the emotional highlight -- they sound vulnerable, exposed." }
      ],
      feel: "The switch should feel like your voice lifts off the ground. Chest is grounded; falsetto is floating. The moment of transition might feel unstable -- that's the expressive sweet spot.",
      wrong: "If you can't get the switch to happen, try yodeling (exaggerated chest-to-head flip). Once the pathway is open, make it more subtle.",
      levelUp: "Clean chest-to-falsetto switch mid-phrase that sounds intentional, not accidental."
    },
    {
      id: "v6e2", time: 4, title: "Lo-Fi Vocal Delivery", type: "vocal",
      recorder: true,
      referencePitches: getPitchRange("E3", "A3"),
      what: "Angus Stone / DOPE LEMON style: close-mic, low volume, lots of air, lazy articulation. This is the most intimate vocal texture -- it sounds like you're singing directly into someone's ear.",
      setup: "Phone mic close to your mouth (2-3 inches). Record everything. Quiet room essential.",
      steps: [
        { text: "Hold your phone/mic 2-3 inches from your mouth. Sing at talking volume -- no projection.", why: "Close-mic proximity creates warmth through the proximity effect. Low volume = more air in the tone." },
        { text: "Let your consonants get lazy. 'Sitting' becomes 'si-in'. 'Running' becomes 'ruh-in'.", why: "Lo-fi delivery drops consonants and blurs words. It's conversational, not performative." },
        { text: "Add extra air to your tone. Breathy, not supported. Let the ends of phrases trail off.", why: "Angus Stone's voice is 40% air. It creates intimacy and a dreamlike quality." },
        { text: "Record 30 seconds. Listen back. Does it sound intimate, or just quiet? There's a difference.", why: "Intimate has warmth and presence. Just quiet is distant and thin. The mic distance is the difference." }
      ],
      feel: "Like telling a bedtime story. No performance energy, no projection. Just warmth, closeness, and a half-asleep delivery.",
      wrong: "If it sounds thin or distant, move the mic closer. If it sounds like you're whispering without pitch, engage the vocal folds slightly more. Lo-fi is breathy, not unpitched.",
      levelUp: "30-second recording that sounds like a DOPE LEMON vocal take -- warm, intimate, dreamy."
    },
    {
      id: "v6e3", time: 4, title: "Reggae Vocal Texture", type: "vocal",
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      what: "Bob Marley / Bradley Nowell style: rhythmic precision, slight nasality, warm tone locked to the riddim. Reggae vocals are rhythmic instruments that happen to carry melody.",
      setup: "Reggae One Drop 85 BPM backing track. Standing.",
      steps: [
        { text: "Sing short phrases locked to the offbeat. Every syllable lands on &'s, not beats.", why: "Reggae vocals are rhythmically precise. The voice is part of the rhythm section." },
        { text: "Add slight nasality: think of the sound living in your nose/mask area, not your chest.", why: "Marley's tone has a nasal edge that cuts through the bass-heavy mix. It's not sinus-y, it's focused." },
        { text: "Keep the tone warm -- chest voice dominant, but with that nasal focus.", why: "The combination of chest warmth and nasal focus is the reggae vocal signature." },
        { text: "Practice the 'call' style: short melodic phrase, then let the band play. Call and response with the riddim.", why: "Reggae vocals work in conversation with the rhythm, not over it." }
      ],
      feel: "Your voice should feel locked into the groove like a puzzle piece. Not floating above it, not buried in it -- interlocked with it.",
      wrong: "If you sound like you're singing karaoke over a reggae track, you're not rhythmically integrated. Simplify your melody and focus on where your syllables land relative to the offbeat.",
      metronome: 85,
      recorder: true,
      levelUp: "1 minute of reggae-style vocal delivery that sounds rhythmically locked to the riddim."
    },
    {
      id: "v6e4", time: 4, title: "Surf-Psych Vocal Float", type: "vocal",
      tracks: [{ name: "Psych Rock 120", src: "/psych-rock-120.mp3" }, { name: "Surf Rock 120", src: "/surf-rock-120.mp3" }],
      what: "Allah-Las / Laura Lee (Khruangbin) style: voice as texture, minimal vibrato, sits INSIDE the guitar mix. The vocal doesn't lead -- it blends with the instruments like another color in the palette.",
      setup: "Psych Rock 120 BPM backing track or Surf Rock 120 BPM. Guitar droning Am.",
      steps: [
        { text: "Play or loop a droning Am pattern. Sing a simple melody with minimal dynamics -- stay in one volume range.", why: "Psych-surf vocals don't do dramatic swells. They maintain a steady, textural presence." },
        { text: "Minimize vibrato. Sing with a straight, steady tone -- no wobble, no pulse.", why: "Vibrato calls attention to the voice. Straight tone lets the voice blend into the instrumental texture." },
        { text: "Sit your voice BEHIND the guitar in the mix (sing quieter than you play). Voice is accompaniment.", why: "In psych-surf, the guitar is the star. Voice is atmospheric, not dominant." },
        { text: "Try singing with reverb (cup your hands around your mouth) or record in a bathroom.", why: "Natural reverb is part of the psych-surf vocal sound. The voice should sound like it's coming from a distance." }
      ],
      feel: "Like being inside the music rather than on top of it. Your voice is one color in the painting, not the subject.",
      wrong: "If your voice sticks out over the instruments, you're singing too loud or with too much vibrato. Pull back until you blend.",
      metronome: 120,
      recorder: true,
      levelUp: "1 minute of vocal delivery that blends with the guitar rather than sitting on top of it."
    },
    {
      id: "v6e5", time: 4, title: "Finding Your Mix", type: "vocal",
      recorder: true,
      what: "Record the same verse in 4 different styles from this level. Listen back. Which sounds most like YOU? This is the discovery exercise -- finding your natural voice among the techniques you've learned.",
      setup: "Phone recording. Pick one verse from a song you know.",
      steps: [
        { text: "Record the verse in falsetto-break style (v6e1). Label it.", why: "Each recording captures a different version of your voice. You need all four to compare." },
        { text: "Record the verse in lo-fi style (v6e2). Label it.", why: "The contrast between styles will be obvious on playback." },
        { text: "Record the verse in reggae style (v6e3). Label it.", why: "Some styles will feel natural; others will feel forced. That's important data." },
        { text: "Record the verse in surf-psych style (v6e4). Label it. Now listen to all four back-to-back.", why: "Your authentic voice is probably a blend of 2-3 of these. Notice which elements feel like home." }
      ],
      feel: "One of these recordings will make you go 'that's me.' It might not be the one you expected. Trust the feeling.",
      wrong: "If all four sound the same, you're not committing enough to each style. Exaggerate the differences. If none sound like 'you', try combining elements from your two favorites.",
      levelUp: "Can identify your preferred vocal style and describe it in your own terms."
    }
  ]
};
