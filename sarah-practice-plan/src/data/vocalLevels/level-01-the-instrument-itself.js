import { getPitchRange } from "../appData.js";

export const level1 = {
  num: 1, name: "Breath & Body", focus: "Diaphragm, posture, SOVT warm-ups",
  duration: "15 min",
  setup: "Standing. Glass of water. No guitar. Quiet room.",
  subtitle: "The Instrument Itself",
  description: "Every great singer built on this foundation. Breath support, posture, and warm-ups are the invisible skills that make everything else possible. These exercises set up your body as the instrument before you ask it to play.",
  artists: "Every pro vocalist",
  unlocks: "Pitch & Range (Level 2)",
  exercises: [
    {
      id: "v1e1", time: 3, title: "\"Hey, Stop It!\" -- Chest Voice Activation", type: "vocal",
      what: "Use conversational exclamations to naturally engage your chest voice and diaphragm. Feel the physical difference between chest voice (diaphragm engaged, belly pushes out) and head voice (lighter, no belly engagement).",
      setup: "Standing. Hand on belly, skin contact under your shirt.",
      referencePitches: getPitchRange("F3", "B3"),
      steps: [
        { text: "Say 'Hey!' like someone across the room -- loud, natural, conversational.", why: "This engages your diaphragm without thinking about it. Natural speech activates chest voice automatically." },
        { text: "Feel your belly push against your hand? That's your diaphragm. That's chest voice.", why: "The belly push is unmistakable once you feel it. This is the foundation of breath support." },
        { text: "Now say 'Hey' softly, gently, from your head. Notice: no belly push.", why: "Head voice feels lighter, floatier. The sound lives above your shoulders." },
        { text: "Say 'Hey, stop it!' -- commit to it, like you mean it. That's full chest voice.", why: "The exclamation forces diaphragm engagement. It's not about volume -- it's about engagement." },
        { text: "Alternate: loud 'Hey!' (chest) -> quiet 'hey' (head) -> loud 'Hey, STOP IT!' (chest). Feel the flip.", why: "Training the switch between registers. You need to feel both to eventually find the mix between them." }
      ],
      feel: "When you nail chest voice, your whole torso resonates. It should feel like the sound is coming from your gut, not your throat. Head voice feels like the sound floats above your shoulders.",
      wrong: "If 'Hey, stop it!' feels like you're just getting louder without the belly engagement, you're pushing from your throat. Think of getting punched in the stomach -- that instinctive flex is what you want.",
      sarah: "It's not even just a volume thing -- it's an engagement of that diaphragm muscle down there. People think belting is yelling, but belting is from a mixed voice. If you can mix it, you can have a huge voice.",
      recorder: true,
      levelUp: "Can clearly feel and identify chest vs head voice on command."
    },
    {
      id: "v1e2", time: 3, title: "Rib Expansion Breathing", type: "vocal",
      what: "Appoggio technique: ribs expand sideways and stay expanded during exhale. This is the breath support technique used by trained singers worldwide. Sustain 'sss' for increasing durations.",
      setup: "Standing. Hands on sides of ribcage, fingers pointing forward.",
      steps: [
        { text: "Place hands on your ribcage, fingers forward, thumbs back. Breathe in slowly through your nose.", why: "You need to feel your ribs expand sideways -- not your chest rising or belly pushing out." },
        { text: "Feel your ribs push your hands outward? That's lateral rib expansion. The diaphragm is pulling down and out.", why: "This is different from belly breathing. Appoggio uses the intercostal muscles to maintain expansion." },
        { text: "Now exhale on a sustained 'sss' sound. Keep your ribs expanded -- don't let them collapse.", why: "The key insight: ribs stay OUT while you exhale. This creates controlled, steady airflow." },
        { text: "Sustain 'sss' for 10 seconds, then 15, then 20. Ribs must stay expanded the entire time.", why: "Increasing duration builds the intercostal muscle endurance you need for long phrases." },
        { text: "Rest 10 seconds between each attempt. 3 rounds at each duration.", why: "These muscles fatigue quickly at first. Short rest prevents compensating with throat tension." }
      ],
      feel: "Your ribs should feel like a barrel that stays inflated even as air leaves. The 'sss' should be perfectly steady -- no wavering, no bursts.",
      wrong: "If your shoulders rise when you breathe in, you're chest breathing. If your ribs collapse immediately on exhale, you haven't engaged the intercostals yet. Start with shorter durations.",
      sarah: "Breath support isn't about taking a big breath. It's about controlling the release. The ribs staying out IS the support.",
      levelUp: "Sustain 'sss' for 20 seconds with steady airflow and ribs staying expanded."
    },
    {
      id: "v1e3", time: 3, title: "Lip Trill Warm-Up", type: "vocal",
      pitchContour: true,
      what: "SOVT warm-up using lip trills. The backpressure from the trill protects your vocal folds while warming them up. Start on 3 comfortable pitches, glide through a 5th, finish with a relaxed sigh.",
      setup: "Standing. Lips loose. Jaw relaxed.",
      referencePitches: getPitchRange("C3", "G3"),
      steps: [
        { text: "Lips together, loose. Start a lip trill (like a horse noise). If it won't start, press index fingers gently into your cheeks.", why: "The lip trill creates SOVT backpressure that helps your vocal folds vibrate efficiently with less effort." },
        { text: "Hold the trill on C3 for 4 seconds. Then D3. Then E3. Each note 4 seconds.", why: "Starting on comfortable, low notes warms up the folds gently without strain." },
        { text: "Now glide from C3 up to G3 (a 5th) on one continuous trill. Slow, 3-4 seconds.", why: "The glide stretches your range gradually. The trill keeps things easy." },
        { text: "Glide back down G3 to C3. Repeat 3 times.", why: "Each pass loosens the vocal folds a little more. You're literally warming them up." },
        { text: "Finish with a deep, relaxed sigh -- 'haaaaah' from the top of your range down. No trill, just an open release.", why: "The sigh releases any tension that built up. It resets your throat to neutral." }
      ],
      feel: "The trill should feel buzzy and effortless. If your lips stop trilling, you're pushing too much air. Less air = better trill.",
      wrong: "If the trill keeps cutting out, your lips are too tense or you're using too much air. Press cheeks in gently and reduce airflow. If the pitch wobbles, slow down the glide.",
      levelUp: "Clean lip trill glides C3 to G3 and back, 3 times without the trill cutting out."
    },
    {
      id: "v1e4", time: 3, title: "Posture Reset", type: "vocal",
      what: "Singer's body alignment: stack spine, drop shoulders, loose jaw, combine with rib breathing. This is the physical setup you should use before every vocal exercise.",
      setup: "Standing. Bare feet if possible. Mirror helps.",
      steps: [
        { text: "Feet shoulder-width apart. Knees slightly soft (not locked). Weight evenly distributed.", why: "Locked knees restrict blood flow and create tension. Soft knees let your body be responsive." },
        { text: "Roll your shoulders up to your ears, hold 3 seconds, then DROP them. Repeat 3 times.", why: "Shoulder tension is the #1 enemy of good singing. The drop releases it." },
        { text: "Let your jaw hang open. Massage your jaw hinge (in front of your ears) in small circles for 10 seconds.", why: "A tight jaw restricts resonance and vowel formation. You need it loose for every exercise that follows." },
        { text: "Now stack it: soft knees + dropped shoulders + loose jaw + rib expansion breath. Hold this posture and breathe 4 times.", why: "This is your singing posture. Every exercise starts from this position." },
        { text: "Hum a comfortable note for 5 seconds in this posture. Feel the resonance in your chest and face.", why: "The hum is a test -- if your posture is right, the hum will feel easy and resonant." }
      ],
      feel: "Your body should feel tall but relaxed. Like a puppet held up by a string from the top of your head, with everything else hanging loose below it.",
      wrong: "If your shoulders creep back up within 30 seconds, you have a tension habit. The shoulder drops need to happen frequently throughout practice, not just once.",
      levelUp: "Can maintain singer's posture through an entire 3-minute exercise without shoulders rising."
    },
    {
      id: "v1e5", time: 3, title: "Straw Phonation", type: "vocal",
      pitchContour: true,
      what: "Advanced SOVT through a cocktail straw. The narrow opening creates more backpressure than lip trills, which further protects and trains the vocal folds. Glide through your full range, then transfer the feeling to open vowels.",
      setup: "Standing. Cocktail straw (thin, not wide). Glass of water optional (for bubbling).",
      referencePitches: getPitchRange("C3", "C4"),
      steps: [
        { text: "Hum into the straw on a comfortable note (around G3). Feel the backpressure in your throat.", why: "The narrow straw creates significant backpressure. Your vocal folds work more efficiently against this resistance." },
        { text: "Glide from your lowest comfortable note up to your highest on a single breath through the straw.", why: "Full range glide through the straw. The backpressure makes the passaggio transition easier." },
        { text: "Glide back down. Repeat 3 times. Each time, try to make the transition through A3-Bb3 smoother.", why: "The break zone is where the straw helps most. The backpressure supports the register transition." },
        { text: "Remove the straw. Sing 'ooh' on the same glide path. Try to keep the same easy feeling.", why: "The goal is to transfer the efficient phonation from straw to open singing. 'Ooh' is closest to the straw sensation." },
        { text: "If you have water: dip the straw in, blow bubbles while singing. Steady bubbles = steady airflow.", why: "Bubbles are instant visual feedback. Uneven bubbles mean your airflow is inconsistent." }
      ],
      feel: "Through the straw, your voice should feel effortless -- the straw does some of the work for you. When you switch to 'ooh', try to keep that same effortless quality.",
      wrong: "If your face turns red or you feel pressure behind your eyes, you're pushing too hard. The straw needs LESS air than you think. If no sound comes through, you need slightly MORE air.",
      sarah: "Straw phonation is used by Broadway performers, opera singers, and vocal therapists. It's the closest thing to a vocal gym machine -- resistance training for your voice.",
      levelUp: "Clean straw glide through full range with smooth passaggio transition, followed by an 'ooh' that maintains the same ease."
    }
  ]
};
