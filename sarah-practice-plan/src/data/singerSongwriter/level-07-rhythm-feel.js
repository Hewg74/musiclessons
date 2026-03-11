import { getPitchRange } from "../appData.js";

export const level7 = {
  level: 7,
  title: "Rhythm & Feel",
  subtitle: "The groove is the song. Everything else is decoration.",
  description:
    "Stoloff's Berklee principle: rhythm before pitch. Most singer-songwriters focus on melody and ignore rhythm — but groove is what makes people move. This level builds body-based rhythm (Dalcroze), rhythmic syllables (Kodály), and genre-specific feels. You'll learn to FEEL rhythm in your body before you put it in your voice. Based on motor learning research: rhythmic confidence must precede melodic improvisation.",
  artists: "Khruangbin, Skinshape, Tommy Guerrero, Pepper",
  unlocks: "Melody Building (Level 8)",
  review: { label: "Level 5-6 Check-In", time: 5, exercises: ["ss-5-16", "ss-6-3"], prompt: "Sustain 5-minute freestyle over changes (ss-5-16). Then create a 4-bar melody over chord changes (ss-6-3). Both solid? Move on." },
  exercises: [
    {
      id: "ss-7-1",
      time: 5,
      title: "Body Metronome",
      type: "rhythm",
      what: "Internalize the beat in your body BEFORE it reaches the guitar. Foot stomps beat 1, hand claps beat 3, voice counts '1-2-3-4.' Three rhythmic layers — all body, no instrument. Based on Dalcroze eurhythmics: the body is the first instrument.",
      steps: [
        { text: "Set metronome to 85 BPM. Stomp your foot on beats 1 and 3. Just the foot, nothing else. Feel the pulse in your whole body.", why: "The foot grounds the rhythm physically. It's the oldest metronome — every culture uses body percussion before instruments." },
        { text: "Add a hand clap on beats 2 and 4 (the backbeat). Stomp-clap-stomp-clap. This is the universal groove pattern of pop, rock, reggae, and soul.", why: "Beats 2 and 4 are the backbeat — the heartbeat of groove music. Getting this in your body makes every genre feel natural." },
        { text: "Add your voice: count '1-2-3-4' while stomping and clapping. Three simultaneous rhythmic outputs — body percussion + voice.", why: "Three layers of rhythm is actually what singing while playing guitar demands. Foot (tempo), hands (pattern), voice (lyrics). This is the same architecture." },
        { text: "Now count '1-and-2-and-3-and-4-and' — subdivide into 8th notes while maintaining the stomp-clap. If your body stays locked while your voice subdivides, your rhythm is internalized.", why: "Subdividing over a body groove proves the rhythm is in autopilot. Your voice can now add complexity without disrupting the foundation." }
      ],
      feel: "This should feel like dancing — rhythm living in your whole body, not just your hands. If you're bobbing, swaying, or moving naturally, the groove is real.",
      wrong: "If your foot stomps are uneven or your claps drift off the metronome, slow down. Body rhythm needs to be rock-solid before you add guitar.",
      sarah: "Gene, this is Dalcroze 101 — the method used by Berklee, Juilliard, and every top conservatory. The body learns rhythm faster than the mind. Trust it.",
      metronome: 85
    },
    {
      id: "ss-7-2",
      time: 6,
      title: "Rhythmic Syllables",
      type: "rhythm",
      what: "Use Kodály rhythm syllables to internalize rhythmic patterns vocally. 'Ta' = quarter note. 'Ti-ti' = two 8th notes. 'Ti-ka-ti-ka' = four 16th notes. Speaking rhythm patterns trains the exact same motor pathways you'll use for vocal melody rhythm.",
      steps: [
        { text: "At 85 BPM, speak: 'ta, ta, ta, ta' — one syllable per beat. Steady, even quarter notes.", why: "Quarter notes are the rhythmic foundation. 'Ta' is a sharp, percussive syllable that locks to the beat naturally." },
        { text: "Now: 'ta, ti-ti, ta, ti-ti' — alternating quarter notes and 8th-note pairs. The 'ti-ti' doubles the speed on beats 2 and 4.", why: "Mixing durations is where rhythm gets interesting. This pattern is the backbone of most folk and rock vocal rhythms." },
        { text: "Try: 'ti-ti, ti-ti, ta, ta' — busy start, simple ending. Then reverse it. Then make up your own pattern.", why: "Creating your own rhythmic patterns is rhythmic composition. You're writing rhythm the same way you'll write melody." },
        { text: "Challenge: speak your rhythm pattern while stomping beats 1 and 3. The body holds steady while the voice plays with rhythm.", why: "Body-voice independence is the exact skill you need for singing over guitar. The stomp is the strum; the syllables are the vocal rhythm." }
      ],
      feel: "Kodály syllables should feel percussive and fun — like beatboxing with a system. The syllables are tools, not music theory. They help you feel and communicate rhythm.",
      wrong: "If your 'ti-ti' is slower or faster than two even 8th notes, you're not subdividing cleanly. Use the metronome as your guide — each 'ti' lands exactly on the subdivision.",
      sarah: "Gene, this might feel elementary, but Kodály rhythm training is used at the highest levels of music education. It works because it makes rhythm physical and vocal simultaneously.",
      metronome: 85,
      recorder: true
    },
    {
      id: "ss-7-3",
      time: 8,
      title: "Groove Lock",
      type: "guitar",
      what: "Strum along with a backing track and LOCK into the groove. Don't just play in time — feel where the drums, bass, and guitar create a unified pulse. When you're locked in, your strum becomes part of the recording. This is 'entrainment' — your body syncing to external rhythm.",
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }, { name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }],
      steps: [
        { text: "Play the Groove Beat track. Just listen for 30 seconds. Find the kick drum. Find the snare. Find the hi-hat. Know where each one lives.", why: "Identifying the drum elements lets you sync your strum to specific rhythmic anchors. The kick is beat 1, the snare is beat 2 and 4." },
        { text: "Start strumming along — simple downstrokes first. Match your strum to the hi-hat rhythm. When your strum disappears into the track, you're locked.", why: "The 'disappearing strum' test: if you can't hear your guitar as separate from the recording, your timing is perfect." },
        { text: "Switch to the Dub Reggae track. Change your strum to offbeat chops. Lock into the reggae pocket — your chops should sit between the kicks.", why: "Different genres have different pockets. Locking into reggae after a straight groove proves your rhythm is adaptable, not rigid." },
        { text: "Try this: close your eyes and feel where the groove 'wants' your strum. Let the backing track pull your hand. Don't think — just feel.", why: "Entrainment is subconscious. When you stop thinking about timing and let the groove carry you, that's real musicianship." }
      ],
      feel: "When you're locked into a groove, it feels effortless — like the music is playing you. Your body moves naturally. Time disappears. This is the 'flow state' of rhythm.",
      wrong: "If your strum sounds separate from the track (you can clearly hear two rhythmic sources), you're not locked. Adjust micro-timing: try playing slightly behind the beat (laid-back) or right on top.",
      sarah: "Gene, groove lock is the difference between a metronome player and a musician. Your favorite artists — Khruangbin, Skinshape — have supernatural groove. This exercise builds that feel.",
      metronome: 90,
      recorder: true
    },
    {
      id: "ss-7-4",
      time: 8,
      title: "Feel Shifts",
      type: "guitar",
      what: "Play the SAME chord progression (Am-C-G-Em) in 4 different genre feels: reggae offbeat, surf jangle, soul strum, and desert blues. Same chords, totally different vibes. Your right hand creates the genre — not your left. This is constraint-led approach (CLA): same task, different movement solutions.",
      steps: [
        { text: "Reggae: muted offbeat chops at 85 BPM. Am-C-G-Em. Choppy, bouncy, laid-back. 2 minutes.", why: "The reggae chop emphasizes the 'and' of each beat. It creates space — the silence between chops is as important as the sound." },
        { text: "Surf jangle: continuous 8th-note down-up at 100 BPM. Same chords. Shimmering, continuous, bright. 2 minutes.", why: "Jangle is the opposite of reggae — constant motion instead of space. Same chords, completely different energy." },
        { text: "Soul strum: relaxed 16th-note pattern at 80 BPM with ghost strums (light touches between real strums). Same chords. Warm, groovy. 2 minutes.", why: "Soul strum is about pocket — playing slightly behind the beat with ghost notes that add texture without volume." },
        { text: "Desert blues: sparse, thumb-heavy downstrokes at 75 BPM with long spaces between strums. Same chords. Hypnotic, minimal. 2 minutes.", why: "Desert blues is the most sparse feel — space is the instrument. Tinariwen, Ali Farka Touré. Less is more." },
        { text: "Your pick: which feel suits you best? Spend 3 more minutes in that feel. That's your 'home groove' for now.", why: "Identifying your home groove is an act of artistic identity. It tells you what genre your songs want to live in." }
      ],
      feel: "Each feel shift should feel like changing clothes — same body, different outfit. The chords stay familiar; only the energy and timing transform. One of these will feel like HOME.",
      wrong: "If all four feels sound the same, your right hand isn't changing enough. Reggae should sound nothing like jangle. Record yourself and compare.",
      sarah: "Gene, your playlists tell me reggae and surf are your home feels. But trying soul and desert blues might surprise you — Khruangbin lives in that soul-desert overlap.",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }, { name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      metronome: 85,
      recorder: true
    },
    {
      id: "ss-7-5",
      time: 6,
      title: "Syncopation",
      type: "vocal",
      what: "Sing notes BETWEEN the guitar strums — on the 'ands' instead of the beats. This is syncopation: the secret ingredient that makes vocal melodies feel alive instead of robotic. Based on Stoloff's approach: rhythmic displacement before melodic complexity.",
      steps: [
        { text: "Strum Am at 80 BPM, simple downstrokes on beats 1-2-3-4. While strumming, sing an A note — but ONLY on the 'and' after beat 1. Strum... sing... strum... rest... strum... rest... strum... rest.", why: "Singing between strums is the opposite of what your brain wants to do. It wants to sync voice and hand. Separating them is the key to interesting rhythm." },
        { text: "Now sing on the 'and' of beats 1 AND 3. Two syncopated notes per bar. The voice lands between strums.", why: "Two offbeat notes per bar creates the reggae vocal feel. Notice how it naturally creates a laid-back, behind-the-beat sensation." },
        { text: "Try singing on all four 'ands' — every note between the strums. Your voice fills the gaps. This is the most syncopated pattern possible.", why: "Full offbeat singing creates the classic ska/reggae vocal style. It also appears in surf-pop and psychedelic rock." },
        { text: "Mix it up: sing some notes ON the beat and some BETWEEN. Create your own rhythmic pattern. Record it.", why: "Mixing on-beat and off-beat creates the most musical vocal rhythms. Every great melody does this." }
      ],
      feel: "Syncopation should feel groovy — like your voice is dancing between the guitar beats. When it clicks, you'll feel a swing that doesn't exist when voice and guitar land together.",
      wrong: "If all your notes land on the beat with the strum, that's singing in unison with the guitar — not wrong, but not syncopated. Practice placing notes deliberately between strums.",
      sarah: "Gene, syncopation is what makes DOPE LEMON and Skinshape vocals feel so cool. They're singing between the guitar, not on top of it. This exercise teaches that feel.",
      metronome: 80,
      referencePitches: getPitchRange("A3", "A3"),
      recorder: true
    },
    {
      id: "ss-7-6",
      time: 8,
      title: "Rhythm Improv",
      type: "vocal",
      what: "Improvise vocal rhythms over a backing track. Sing only on ONE note (A) — remove all pitch decisions. Focus entirely on WHEN you sing, not what you sing. Long notes, short notes, rests, bursts, syncopation. Rhythm alone creates musical interest.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }, { name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }],
      steps: [
        { text: "Play the Khruangbin backing track. Sing only the note A — sustained 'ahhh' sounds in different rhythms. Hold some notes long, make others short and percussive.", why: "One pitch, infinite rhythms. Removing pitch decisions lets you focus 100% on rhythmic creativity." },
        { text: "Try 'call and response' with yourself: sing a 2-beat rhythmic phrase, then leave a 2-beat gap of silence. The silence is part of the music.", why: "Silence gives rhythm its shape. A note after silence has 10x the impact of a note in a continuous stream." },
        { text: "Switch to the Soul Funk track. Different groove, same one-note constraint. Let the track's rhythm suggest your vocal rhythm.", why: "Different backing grooves pull different rhythmic responses from you. The groove is leading — you're following." },
        { text: "Record 3 minutes of rhythm improv. Listen back. Your rhythmic instincts are already more creative than you think.", why: "Hearing your rhythm improv played back reveals patterns you weren't conscious of creating. These become building blocks for songs." }
      ],
      feel: "Rhythm improv on one note should feel like drumming with your voice. Pure rhythm, pure groove. When the backing track and your voice lock together, it's magic.",
      wrong: "If you're changing pitch, stop. This exercise is ONE NOTE ONLY. The discipline of pitch constraint is what forces rhythmic creativity to emerge.",
      sarah: "Gene, Stoloff at Berklee teaches this exact exercise — one-note rhythm improv — before any melodic improvisation. Rhythm is the foundation that melody stands on.",
      metronome: 80,
      referencePitches: getPitchRange("A3", "A3"),
      recorder: true
    },
    {
      id: "ss-7-7",
      time: 6,
      title: "Strum + Vocal Rhythm Conversation",
      type: "song",
      what: "Strum a groove and create a vocal rhythm that COMPLEMENTS (not duplicates) the guitar. When the guitar is busy, the voice rests. When the guitar rests, the voice fills. Guitar and voice become two parts of one rhythm — like a conversation.",
      steps: [
        { text: "Strum the reggae offbeat chop on Am. Notice where the GAPS are in the strum (on the beats). Now sing short notes in those gaps.", why: "Filling gaps creates interlocking rhythm — voice and guitar fit together like puzzle pieces. This is the foundation of groove-based singing." },
        { text: "Switch to surf jangle (continuous 8ths). The gaps are smaller. Sing longer, sustained notes that ride on top of the strum.", why: "Over busy guitar, the voice simplifies. Over sparse guitar, the voice can be busier. This balance is instinctive in great singers." },
        { text: "Try this: strum for 2 bars, then stop and sing for 2 bars (no guitar). Then overlap for 2 bars. The contrast reveals how voice and guitar relate.", why: "Alternating solo and overlap reveals which textures you prefer. Some songs work best with voice + guitar interlocking; others work best with trading off." },
        { text: "Create a 16-bar piece where voice and guitar have a conversation — sometimes together, sometimes taking turns. Record it.", why: "A 16-bar voice-guitar conversation is a complete musical statement. This is the rhythmic foundation of your songwriting style." }
      ],
      feel: "Voice and guitar in conversation should feel like a duo — two musicians listening to each other. When they interlock perfectly, the whole thing grooves harder than either alone.",
      wrong: "If voice and guitar are always landing at the same time, they're not conversing — they're shouting together. Create space for each to breathe.",
      sarah: "Gene, this conversational approach is exactly what Khruangbin does — Mark Speer's guitar fills the spaces around Laura Lee's bass and vice versa. Apply the same principle to your voice and guitar.",
      metronome: 85,
      referencePitches: getPitchRange("A3", "A3"),
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      recorder: true,
      levelUp: "Can create complementary vocal rhythms that interlock with guitar grooves, improvise rhythmic patterns on one note, and shift between 4 genre feels on the same progression."
    }
  ]
};
