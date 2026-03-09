import { getPitchRange } from "../appData.js";

export const level3 = {
  num: 3, name: "Rhythm & Phrasing", focus: "Vocal timing, behind-the-beat, reggae delivery",
  duration: "25 min",
  setup: "Metronome or backing track. 85-90 BPM. No guitar.",
  subtitle: "Singing IN the Beat",
  description: "Great singers don't just sing the right notes -- they sing them at the right time. This level trains the vocal timing skills that separate karaoke from artistry: on-beat precision, offbeat phrasing, and the behind-the-beat delivery that defines reggae, surf, and psych vocals.",
  artists: "Jack Johnson, Bob Marley, DOPE LEMON",
  unlocks: "Ear Training & Harmony (Level 4)",
  review: { label: "Level 1 Check-In", time: 5, exercises: ["v1e1", "v1e3"], prompt: "Do the 'Hey, Stop It!' chest voice activation — feel the belly push (v1e1). Then 1 minute of lip trill warm-up (v1e3). If the diaphragm engagement feels unfamiliar, revisit Level 1." },
  exercises: [
    {
      id: "v3e1", time: 4, title: "On-Beat Vocal Placement", type: "vocal",
      what: "Sing 'dah' precisely on beats, then on beats 1 & 3 only. Use the nod technique from rhythm drills to anchor your body to the pulse.",
      setup: "Metronome at 90 BPM. Standing. No guitar.",
      steps: [
        { text: "Say 'dah' on every beat: 1-2-3-4. Match the metronome exactly.", why: "On-beat placement is the foundation. You need to be precise before you can be intentionally off." },
        { text: "Nod your head: DOWN on the beat, UP between beats. Same nod from rhythm training.", why: "The nod physically anchors the pulse in your body. Your voice follows your body's sense of time." },
        { text: "Now 'dah' only on beats 1 and 3. Stay silent on 2 and 4.", why: "Selective placement trains restraint. Not every beat needs a vocal event." },
        { text: "Add pitch: sing A3 on beat 1, C3 on beat 3. Maintain exact timing.", why: "Now you're combining pitch accuracy with rhythmic precision -- the two skills together." }
      ],
      feel: "Each 'dah' should land RIGHT on the click, not a millisecond early or late. It should feel like your voice and the metronome are the same event.",
      wrong: "If you consistently land slightly after the click, you're reacting to it instead of anticipating it. Try to ARRIVE at the click, not respond to it.",
      metronome: 90,
      referencePitches: getPitchRange("A2", "C4"),
      recorder: true,
      levelUp: "8 bars of on-beat 'dah' with pitch where every syllable is indistinguishable from the click timing."
    },
    {
      id: "v3e2", time: 4, title: "Offbeat Vocal Phrasing", type: "vocal",
      what: "Voice on the &'s only. Reggae/dub vocal feel. This is Jack Johnson territory -- the voice lives between the beats, floating over the rhythm.",
      setup: "Metronome at 85 BPM. Nod on beats to anchor.",
      steps: [
        { text: "Metronome at 85. Nod DOWN on beats, UP on &'s. Same as rhythm training.", why: "The nod keeps the beat in your body while your voice moves to the offbeat." },
        { text: "Say 'dah' ONLY on the &'s. Silent on beats. Voice should coincide with the UP-nod.", why: "This is the basic reggae vocal feel. The voice pushes forward between beats." },
        { text: "Hold each 'dah' for the full space between &'s. Let it ring.", why: "Short, clipped offbeats sound stiff. Let the syllables breathe and float." },
        { text: "Try with words: 'I -- can -- feel -- the -- sun --'. One word per & of each beat.", why: "Moving from syllables to words is the bridge to actual offbeat singing." }
      ],
      feel: "Your voice should feel like it's floating above the rhythm, not locked to it. Like a surfer on a wave -- the wave (beat) carries you, but you're riding between the crests.",
      wrong: "If your nod starts matching your voice (nodding on &'s), you've lost the beat. The nod stays on the beats. Your voice stays on the &'s. They never align.",
      metronome: 85,
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      recorder: true,
      levelUp: "8 bars of clean offbeat vocal phrasing with words, nod maintained on beats."
    },
    {
      id: "v3e3", time: 4, title: "Behind-the-Beat Delivery", type: "vocal",
      recorder: true,
      tracks: [{ name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }],
      what: "Arrive a fraction AFTER the click. DOPE LEMON's lazy drawl, Jack Johnson's conversational timing. This is an intentional 50-100ms delay that creates the laid-back feel.",
      setup: "Metronome at 85 BPM or Dub Reggae 85 BPM backing track.",
      steps: [
        { text: "Start by singing on the beat for 4 bars. Get locked in.", why: "You need to know where the beat IS before you can intentionally be late." },
        { text: "Now deliberately arrive a tiny bit AFTER the beat. Think 'lazy' or 'no rush'.", why: "The delay should be 50-100ms -- barely perceptible but deeply felt. This is the DOPE LEMON feel." },
        { text: "Say a phrase: 'Sitting on the porch watching the sun go down'. Each word arrives just after its beat.", why: "Conversational phrasing naturally sits behind the beat. Stop performing and just... talk it." },
        { text: "Record yourself. Listen back. Can you hear the laid-back feel? Or does it sound late/sloppy?", why: "There's a fine line between behind-the-beat (musical) and late (sloppy). Your ear learns the difference through playback." }
      ],
      feel: "It should feel like you're in no hurry. Like speaking to a friend on a warm evening. The rhythm moves forward; you let it pull you along gently.",
      wrong: "If it sounds like you're falling behind or losing the beat, you've gone too far. Behind-the-beat is measured in milliseconds, not beats. You should still feel the pulse.",
      metronome: 85,
      levelUp: "4-bar spoken phrase with consistent behind-the-beat feel that sounds musical, not late."
    },
    {
      id: "v3e4", time: 4, title: "Reggae Phrasing: Call & Space", type: "vocal",
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      what: "Short 3-5 word bursts, then full-bar rests. Marley's vocal approach uses as much space as sound -- what you DON'T sing is as important as what you do.",
      setup: "Reggae One Drop 85 BPM backing track or metronome at 85.",
      steps: [
        { text: "Sing a 3-5 word phrase over 1 bar. Then rest for a full bar. Silence.", why: "Marley's vocals use as much space as sound — short phrases, then full-bar rests. The space gives each phrase weight and lets the riddim breathe." },
        { text: "Example: 'Don't worry...' (bar of singing) then full bar of silence. 'About a thing...' (bar) silence.", why: "Each phrase is a statement. The silence lets it land before the next one arrives." },
        { text: "Resist the urge to fill the silence. The space IS the music.", why: "Western pop trains us to fill every beat. Reggae teaches the power of restraint." },
        { text: "Try improvising your own call-and-space phrases. Keep them short. Keep the silences full-bar.", why: "Improvising within constraints builds the phrasing skill faster than singing written lyrics." }
      ],
      feel: "Each phrase should feel like a complete thought that hangs in the air. The silence should feel intentional and powerful, not like you forgot what comes next.",
      wrong: "If you keep sneaking in extra words or humming during the rest bars, you're not comfortable with silence yet. Practice the silence as deliberately as the phrases.",
      metronome: 85,
      recorder: true,
      levelUp: "2 minutes of improvised call-and-space phrasing with clean full-bar rests."
    },
    {
      id: "v3e5", time: 4, title: "Phrase Length Control", type: "vocal",
      what: "Practice 1-beat, 2-beat, 4-beat phrases, then mix them up. Thom Yorke's varying phrase lengths create tension and release. Control over phrase length = control over emotional pacing.",
      setup: "Metronome at 90 BPM. No guitar.",
      steps: [
        { text: "4 bars of 1-beat phrases: one word per beat, rest 3 beats. 'Sun... (rest rest rest) Rain... (rest rest rest)'", why: "Single-beat phrases are punchy and declarative. Like headlines." },
        { text: "4 bars of 2-beat phrases: two words spanning beats 1-2, rest on 3-4.", why: "Two-beat phrases flow more naturally. Like sentence fragments." },
        { text: "4 bars of 4-beat phrases: fill the whole bar with words.", why: "Full-bar phrases are conversational. Like complete thoughts." },
        { text: "Now MIX: 1-beat, 4-beat, 2-beat, 1-beat. Vary the length every bar.", why: "The variation creates rhythmic interest. Thom Yorke does this constantly -- short phrase, long phrase, short, long." }
      ],
      feel: "The mixed section should feel like a conversation -- some things you say quickly, others you take your time with. The variety should feel natural, not mechanical.",
      wrong: "If all your phrases end up the same length, you're defaulting to your comfort zone. Deliberately alternate between extremes -- one word, then a full sentence.",
      metronome: 90,
      recorder: true,
      levelUp: "2 minutes of mixed phrase lengths that sound conversational, not robotic."
    },
    {
      id: "v3e5b", time: 5, title: "Straight vs Swung: Feel the Difference", type: "vocal",
      what: "The rhythmic feel distinction your genres depend on. Surf-psych uses straight 8ths (even spacing). Reggae and soul use swung 8ths (long-short pattern). Learn to identify and deploy both.",
      setup: "Metronome at 90 BPM. No guitar.",
      steps: [
        { text: "Set metronome at 90. Speak '1 and 2 and 3 and 4 and' with perfectly even 8th notes — each 'and' lands exactly between clicks. This is STRAIGHT. Surf rock, punk, and psych use this.", why: "Straight 8ths are mechanical and driving. The even spacing creates forward momentum. Allah-Las and surf bands live here." },
        { text: "Same tempo. Now delay every 'and' — push it later so each pair sounds like 'DA-duh, DA-duh' instead of 'DA-DA, DA-DA.' The 'and' is lazy, arriving late. This is SWUNG.", why: "Swung 8ths create a loping, laid-back groove. The long-short pattern is the rhythmic DNA of blues, jazz, reggae, and soul." },
        { text: "Alternate: 4 bars straight, 4 bars swung. Feel the gear-change in your body. Straight feels like driving. Swung feels like sauntering.", why: "Being able to switch feels on command is how Gene's genres work — a surf verse (straight) into a reggae-influenced chorus (swung) is a real arrangement move." },
        { text: "Listen to an Allah-Las track (straight) then a DOPE LEMON track (swung). Can you hear the difference? The guitar strum, the vocal delivery, the overall feel — it all follows the 8th note choice.", why: "Once you hear it, you can't unhear it. This distinction unlocks your understanding of why different genres feel different, even at the same tempo." }
      ],
      feel: "Straight should feel like marching in step. Swung should feel like a lazy walk on the beach. Both should feel intentional — you're choosing the feel, not defaulting to one.",
      wrong: "If your swung 8ths sound like dotted-8th-16th (TOO swung, like a shuffle), pull back. The swing should be subtle — maybe 60/40 long-short, not 75/25. Think 'lazy' not 'galloping.'",
      metronome: 90,
      recorder: true,
      levelUp: "Can switch between straight and swung 8th note feel on demand, with each sounding natural and distinct."
    }
  ]
};
