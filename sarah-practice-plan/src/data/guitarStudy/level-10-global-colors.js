import { getPitchRange } from "../appData.js";

export const level10 = {
  level: 10,
  title: "Global Colors",
  subtitle: "Afrobeat, bossa, Persian scales. The world in your fingers.",
  description:
    "Your guitar has been living in psych-surf and reggae — now it travels the world. This level introduces Afrobeat interlocking patterns (Kokoroko), bossa nova rhythm (Rosinha De Valença), the Persian/Iranian scale that gives Khruangbin their global flavor, parked wah as a tone-shaping tool, BALTHVS cumbia stabs, and Tommy Guerrero's finger-picked melody-as-vocalist approach. By the end, you can sit in with any groove on the planet.",
  artists: "Kokoroko, Khruangbin, BALTHVS, Tommy Guerrero",
  unlocks: "Fingerpicking (Level 11)",
  review: {
    label: "Level 9 Check-In",
    time: 5,
    exercises: ["gs-9-4", "gs-9-9"],
    prompt: "Play the Skinshape soul cycle Gm-C-A7-Dm with 7th chord voicings (gs-9-4). Then play Khruangbin three-note voicings on the top 3 strings (gs-9-9). Extended harmony is solid? Time to go global."
  },
  exercises: [

    // ─── AFROBEAT: INTERLOCKING GUITAR ───

    {
      id: "gs-10-1",
      time: 8,
      title: "Afrobeat Rhythmic Ostinato — Part A",
      type: "guitar",
      what: "Afrobeat guitar works differently from anything you've played. Instead of strumming chords, you play a SHORT repeating rhythmic figure — an ostinato — that locks into the groove like a gear in a machine. This is Part A: the rhythmic anchor. It's simple, percussive, and hypnotic. Think of it as a single-note riff that never changes, never stops, never wavers.",
      setup: "Guitar. Clean tone, bridge pickup for snap. Metronome at 100 BPM.",
      steps: [
        { text: "Mute all strings with your left hand (lay fingers flat across the neck without pressing down). Strum a steady 16th-note rhythm — all percussive clicks, no pitched notes. Count: '1-e-and-a 2-e-and-a 3-e-and-a 4-e-and-a.' Keep this going for 1 minute until the 16th-note grid is locked in your arm.", why: "Afrobeat guitar lives on the 16th-note grid. Every note you'll play is placed precisely within this subdivision. Getting the grid into your arm — not just your head — is the foundation. Tony Allen (Fela Kuti's drummer) said 'the groove is in the subdivision,' and that applies to guitar too." },
        { text: "Now add pitch: play an Am shape but only strike strings 3-4 (D and G strings) on beats 1 and 3. On the 'e' of beats 2 and 4, play a quick two-note figure on the same strings. Everything else stays muted — the muted strums fill the 16th-note grid between the pitched notes.", why: "Afrobeat guitar Part A is 80% muted percussion, 20% pitched notes. The pitched notes are the melody; the muted strums are the engine. This is fundamentally different from strumming — you're playing a rhythmic instrument that happens to have pitch." },
        { text: "Simplify to the essence: pick just TWO notes (A on the D string, 2nd fret, and C on the G string, open). Alternate between them in a repeating 2-beat pattern. Loop it. Let it become automatic — the pattern should play itself after 2 minutes.", why: "Afrobeat ostinatos are deliberately simple because they need to be PERFECTLY consistent. The magic comes from how multiple simple parts interlock, not from complexity in any single part. If your part is hard to play, it's too complex." },
        { text: "Play the ostinato for 3 full minutes without stopping, without varying. Resist the urge to embellish. When it becomes boring, you're doing it right — the trance state IS the point. This is meditation with a guitar.", why: "Fela Kuti's songs lasted 20-30 minutes. The guitar parts never changed. The groove deepens over time — what feels boring at minute 1 feels transcendent at minute 5. You're training patience, which is a musical skill." },
        { text: "Record your ostinato for 1 minute. Listen back. Is every repetition identical? Are the muted strums consistent? Is the groove steady? If you can't tell where the loop point is, you've succeeded.", why: "Consistency IS the skill in Afrobeat guitar. A listener should not be able to tell which bar is which. The groove should feel like a circle, not a line." }
      ],
      feel: "This should feel mechanical in the best way — like you're a perfectly calibrated gear in a machine. Your arm moves constantly, your brain relaxes, and the pattern plays itself. The hypnotic quality comes from absolute consistency.",
      wrong: "If you're adding fills, embellishments, or variations, you're fighting the form. Afrobeat guitar Part A is intentionally repetitive. If the pattern keeps shifting or drifting, slow to 80 BPM and play for 5 minutes — the drift usually stops after 2 minutes when your muscles lock in.",
      sarah: "Gene, Kokoroko's Abusey Junction is in your top 50 — that gorgeous Afrobeat groove is built from interlocking guitar parts exactly like this. Each guitar player has a simple ostinato, and together they create something greater than the sum. You're learning Part A first — the anchor. This is also how Fela Kuti's guitarists played: one pattern, never changing, for 25 minutes straight. The discipline IS the art.",
      metronome: 100,
      tracks: [{ name: "Afrobeat 100", src: "/afrobeat-100.mp3" }],
      levelUp: "Play a 2-note Afrobeat ostinato for 3 minutes without any variation, drift, or embellishment. Every repetition should be indistinguishable from the last, confirmed by recording playback."
    },
    {
      id: "gs-10-2",
      time: 8,
      title: "Interlocking Parts — A Meets B",
      type: "guitar",
      what: "Now learn Part B — a complementary figure that fills the GAPS in Part A. When both parts play together, they interlock like puzzle pieces: where A is silent, B speaks. Where B rests, A fills. Record Part A, then play Part B over it. Hear the interlocking magic that makes Afrobeat guitar so mesmerizing.",
      setup: "Guitar. Clean tone. Metronome at 100 BPM. You'll need to record Part A first.",
      steps: [
        { text: "Record your Part A ostinato from the previous exercise — 2 minutes of steady loop. Play it back. Now listen for the GAPS — the spaces between your pitched notes where only muted strums live. Part B will fill those gaps.", why: "Interlocking means the parts fit together like a zipper. If both parts play at the same time, they clash. If they alternate perfectly, they create a single composite melody that neither part contains alone." },
        { text: "While Part A plays back, play Part B: a simple melodic figure on strings 1-2 (B and high E) that enters on the 'and' of beat 1 and the 'and' of beat 3 — exactly where Part A is muted. Use notes from Am (A, C, E). Keep it to 2-3 notes.", why: "Part B lives in the spaces of Part A. By placing B's notes precisely in A's silences, the two parts weave into a single rhythmic fabric. This interlocking technique — called 'hocketing' — is the engine of West African guitar music." },
        { text: "Switch: re-record Part B, then play Part A over it. Experience both sides of the conversation. Notice how each part sounds incomplete alone but complete together.", why: "Understanding both parts builds appreciation for ensemble playing. In Afrobeat bands, each guitarist knows both parts — they understand how their piece fits the whole." },
        { text: "Try composing your own interlocking pair: invent a new Part A (different rhythm, same approach), then immediately write a Part B that fills its gaps. The constraint: the two parts should create a continuous stream of 16th notes when combined.", why: "Creating your own interlocking parts proves you understand the principle, not just the specific pattern. This is how Kokoroko, Tony Allen, and Antibalas arrange their guitar sections — simple parts, genius arrangement." },
        { text: "Play your favorite interlocking combination along with the backing track. Let the drums and bass anchor you while you ride the groove. Record 2 minutes.", why: "The backing track adds the rhythmic context that makes interlocking guitar shine. In a full Afrobeat arrangement, the guitars sit between the drums and horns — they're the rhythmic glue." }
      ],
      feel: "When the interlocking works, you'll hear a composite melody emerge that neither part contains alone — it's like a 3D image appearing from two flat pictures. The feeling is communal, mechanical, and euphoric all at once.",
      wrong: "If Part B sounds like a solo over Part A, you're playing too much in the same space. Part B must live in A's silences — no overlap. If both parts play at the same time, the interlock is broken. Slow down and map the gaps before playing.",
      sarah: "Gene, this is the secret behind Abusey Junction — Kokoroko has two guitarists whose parts are completely interdependent. Oscar Jerome and Cassie Kinoshi arrange these figures so each guitar sounds like half a melody. Together, they're one of the most beautiful composite guitar sounds in modern music. You're building that same skill — hearing how your part fits a larger whole.",
      metronome: 100,
      tracks: [{ name: "Afrobeat 100", src: "/afrobeat-100.mp3" }, { name: "Drums — Afrobeat 110", src: "/drums-afrobeat-110.mp3" }],
      recorder: true,
      levelUp: "Record Part A, then play Part B over the recording with no rhythmic overlap — the two parts create a continuous, interlocking 16th-note melody."
    },
    {
      id: "gs-10-3",
      time: 10,
      title: "Song Study: Abusey Junction Feel",
      type: "guitar",
      songRef: {
        title: "Abusey Junction — Kokoroko",
        src: "/abusey-junction.mp3",
        note: "London Afrobeat-jazz — warm, golden-hour groove. Listen for the guitar comping rhythm."
      },
      what: "Kokoroko's Abusey Junction is one of the most beautiful pieces of modern Afrobeat — and it lives in your top 50. This exercise captures its FEEL: warm, golden, swaying. The guitar part is a gentle, arpeggiated figure over a highlife groove. It's not aggressive Afrobeat — it's sunset Afrobeat, Afrobeat with a smile.",
      setup: "Guitar. Clean tone, roll tone knob to 5-6 for warmth. Metronome at 100 BPM.",
      steps: [
        { text: "Listen to Abusey Junction once through (5 minutes). Don't play along yet — just absorb the feel. Notice how the guitar sits in the mix: gentle, arpeggiated, warm. It's not strumming — it's picking individual notes from chord shapes. The rhythm is relaxed, slightly behind the beat.", why: "Listening before playing trains your ear to capture the FEEL, not just the notes. Abusey Junction's magic is in the swing, the warmth, the smile in the groove — you need to hear that before your fingers try to reproduce it." },
        { text: "Set up a simple two-chord vamp in Am: play Am for 2 bars, then Dm for 2 bars. Pick individual notes from each chord shape — arpeggiate slowly across strings 4-3-2-1. Let each note ring. This is the basic highlife guitar approach.", why: "Highlife guitar — the predecessor to Afrobeat guitar — uses arpeggiated chord tones rather than strumming. Each note is individually voiced, creating a cascading, harp-like sound. This is the foundation of the Abusey Junction guitar tone." },
        { text: "Add the Afrobeat twist: within the arpeggio, accent certain notes by striking them slightly harder. The accent pattern should align with the clave feel — beats 1, the 'and' of 2, and beat 4. The accented notes create a melody within the arpeggio.", why: "Accenting within an arpeggio creates the illusion of two parts: a steady cascade of notes plus a melody that floats on top. This is how a single Afrobeat guitarist can sound like two — the accent pattern IS the melody." },
        { text: "Warm your tone: roll the tone knob to 5 or lower. The Abusey Junction guitar sound is warm and round, never bright or cutting. Play your arpeggiated figure with this warmer tone. Feel the difference — the notes bloom instead of snap.", why: "Tone knob control is essential for Afrobeat guitar. Bright, cutting tone belongs to funk; warm, round tone belongs to highlife and Afrobeat. Rolling tone down lets the notes melt into the groove rather than stabbing through it." },
        { text: "Play your Abusey Junction-style figure over the Afrobeat backing track for 3 minutes. Slightly behind the beat — don't rush. Let the drums pull you forward while you lean back. Record it.", why: "Behind-the-beat playing is the Afrobeat guitar trademark. The drums are metronomic; the guitar floats behind them, creating a laid-back swing. This is the same behind-the-beat feel you practiced in Khruangbin exercises, applied to a different groove." }
      ],
      feel: "This should feel like sunshine through a window — warm, gentle, unhurried. The arpeggios cascade like water. The groove sways, it doesn't drive. If you're smiling while playing, you have the feel.",
      wrong: "If it sounds aggressive, stiff, or rushed, you're fighting the groove instead of riding it. Roll your tone down further. Loosen your pick hand. Play lighter. Abusey Junction is music that breathes — give it room.",
      sarah: "Gene, Abusey Junction hit #5 in your top 50 — you already know this groove in your bones. Kokoroko is a London-based Afrobeat-jazz collective, and their sound is all warmth: golden-hour Afrobeat, not midnight-rally Afrobeat. This exercise captures that specific warmth. The guitar sits like a beam of sunlight in the mix — bright enough to see, warm enough to nap in.",
      metronome: 100,
      tracks: [{ name: "Afrobeat 100", src: "/afrobeat-100.mp3" }],
      recorder: true,
      levelUp: "Play an arpeggiated highlife-style guitar part over the Afrobeat backing track for 3 minutes with warm tone, consistent accent pattern, and behind-the-beat feel, confirmed by recording playback."
    },

    // ─── BOSSA NOVA ───

    {
      id: "gs-10-4",
      time: 8,
      title: "Bossa Nova Rhythm — The Distinctive Pattern",
      type: "guitar",
      what: "Bossa nova has ONE rhythm pattern that defines the entire genre. It's not regular strumming — it's a specific syncopated pattern where the thumb plays bass notes on beats 1 and 3, and the fingers strum chord tones in a syncopated pattern around them. Learn this pattern and you can play every bossa nova ever written.",
      setup: "Guitar. Nylon-string ideal, but steel-string works. No pick — thumb and fingers only. Metronome at 75 BPM.",
      steps: [
        { text: "Start with the bass: thumb (P) plays the root note on beat 1, then the 5th on beat 3. On Am: thumb hits the A string (5th string) on beat 1, then the E on the D string (4th string, 2nd fret) on beat 3. Quarter notes, steady, metronomic. 1 minute until the thumb is on complete autopilot.", why: "The bossa thumb is the heartbeat. João Gilberto — who invented bossa nova guitar — built everything on this alternating bass. Like the Travis picking thumb you'll learn in Level 11, the bass must be automatic before the fingers add the syncopated strum on top." },
        { text: "Add the fingers: while the thumb keeps its bass pattern, your index and middle fingers brush strings 3-2-1 (G-B-E) on the 'and' of beat 2 and on beat 4. Count: '1... and-2-AND... 3... 4.' The capitalized AND is where your fingers strum. Slow this to 60 BPM if needed.", why: "The bossa strum is syncopated — the finger strum lands between beats, creating the distinctive lilting feel. This pattern was João Gilberto's revolution: he took samba's busy percussion and distilled it into one guitar pattern. The syncopation IS the samba, compressed into two hands." },
        { text: "Apply to a simple Am-Dm progression: Am for 2 bars (thumb on A and E bass notes), Dm for 2 bars (thumb on D and A bass notes). Keep the finger strum pattern identical. The chord changes; the rhythm doesn't.", why: "Consistent rhythm across chord changes is the hallmark of bossa guitar. The pattern stays locked while the harmony moves underneath — this creates the floating, effortless quality that defines bossa nova." },
        { text: "Add a third chord: Am-Dm-E7-Am. The E7 chord introduces a new bass note (open low E). Practice the full progression at 65 BPM, focusing on smooth transitions without breaking the bossa rhythm pattern.", why: "Am-Dm-E7 is the most common bossa progression (i-iv-V7). The V7 chord creates tension that resolves back to Am — this is the harmonic engine of bossa nova. Mastering the pattern over this progression means you can play 'Girl from Ipanema,' 'Corcovado,' and dozens of other bossa standards." },
        { text: "Play the bossa pattern over the bossa backing track for 3 minutes. Let the recorded percussion guide your syncopation. Close your eyes and imagine Rosinha De Valença — her Summertime is in your top 50. Record it.", why: "Playing with the backing track puts your bossa pattern into a full rhythmic context. The drums and bass confirm your syncopation — if you're locked in, the pattern will feel effortless and floating." }
      ],
      feel: "Bossa nova should feel like a warm breeze — relaxed, lilting, never rushed. The syncopation creates a gentle sway, not a hard groove. If you're tensing up, you're playing too hard. Lighten everything — lighter touch, softer volume, less force.",
      wrong: "If the rhythm sounds like regular strumming, your finger strum is landing on the beat instead of between beats. Count out loud: '1... and-2-AND... 3... 4.' The AND is syncopated — it should feel like a hiccup, a gentle lilt. If your thumb and fingers are colliding (playing at the same time), slow down until they clearly alternate.",
      sarah: "Gene, Rosinha De Valença's Summertime is at #8 in your top 50 — that warm, intimate bossa sound. Bossa nova was invented by ONE person (João Gilberto) who spent months alone in a bathroom perfecting this exact rhythm pattern. It's a complete reinvention of samba for solo guitar. The pattern you're learning is literally the founding gesture of an entire genre. Once it's in your hands, you'll hear it everywhere.",
      metronome: 75,
      recorder: true,
      tracks: [{ name: "Bossa Nova 75", src: "/bossa-nova-75.mp3" }, { name: "Drums — Bossa 75", src: "/drums-bossa-75.mp3" }],
      chordVoicings: { chords: ["Am", "Dm", "E7"] },
      levelUp: "Play the bossa nova rhythm pattern (alternating bass + syncopated finger strum) over Am-Dm-E7-Am for 2 minutes without the rhythm breaking or reverting to regular strumming."
    },

    // ─── TONE KNOB & PARKED WAH ───

    {
      id: "gs-10-5",
      time: 7,
      title: "Tone Knob as Expression — Same Phrase, Four Colors",
      type: "guitar",
      what: "Your guitar's tone knob isn't a set-and-forget dial — it's an expression tool. Play the SAME phrase at four different tone settings and hear how radically the character changes. Tone 10 is bright and present. Tone 5 is warm and round. Tone 2 is dark and mysterious. Tone 0 is muffled and underwater. These are four completely different voices from the same guitar.",
      setup: "Guitar. Clean amp, moderate volume. No effects (so you hear the tone knob clearly).",
      steps: [
        { text: "Play a simple Am pentatonic phrase — 4-5 notes, something you can repeat identically. Now play it with tone knob at 10 (fully bright). Listen to the character: snappy, present, treble-forward. Every note has an attack, a bite. This is surf-rock territory.", why: "Starting at full bright establishes the baseline. Most players leave their tone knob on 10 and never touch it. By hearing what 10 sounds like intentionally, you start to understand what you're giving up — and what you gain — by rolling it down." },
        { text: "Same phrase, tone at 7. The bite softens. Notes still have clarity but the harsh treble edge is gone. This is where most recorded guitar lives — bright enough to cut through a mix, warm enough to not hurt. Play the phrase 4 times and feel the difference.", why: "Tone at 7 is the 'studio' setting — it's where engineers often set guitar tone for recording. The ear perceives this as 'natural' because the harshest frequencies are tamed. Mark Speer from Khruangbin lives around 5-6 — you're approaching his territory." },
        { text: "Same phrase, tone at 3-4. Now you're in warm, round territory. The attack is gentle, notes bloom instead of snap. This is where jazz guitarists live — Wes Montgomery, Grant Green. Play the phrase and notice how it invites you to play DIFFERENTLY — softer, slower, more legato.", why: "Lower tone settings naturally change your playing style. The physics: rolled-off treble emphasizes the fundamental note and reduces overtones, making each note sound warmer and rounder. Your fingers respond to what your ears hear — you'll play more gently when the tone is warm." },
        { text: "Same phrase, tone at 0-1. Dark, muffled, underwater. Almost like a bass guitar. This extreme setting is usable for specific textures — reggae dub, ambient washes, lo-fi dream-pop. Play the phrase and hear how the attack disappears entirely.", why: "Tone at 0 strips away all treble, leaving only the low-mid fundamental. It's extreme but useful — dub reggae guitarists use this for underwater textures, and it's one of the colors available on your guitar that most players never discover." },
        { text: "Now the real exercise: play a slow 8-bar improvisation in Am pentatonic. Start at tone 10 for bars 1-2, roll to 7 for bars 3-4, roll to 3 for bars 5-6, roll to 0 for bars 7-8. Feel how your playing style changes with the tone — bright bars should be percussive, dark bars should be legato. Record it.", why: "Using tone knob as a real-time expression tool — rolling it during performance — turns your tone knob into a wah pedal in slow motion. This is how Jeff Beck, Hendrix, and Mark Speer use it: tone knob as an active voice, not a fixed setting." }
      ],
      feel: "Each tone setting should feel like putting on different sunglasses — the world looks fundamentally different through each lens, even though nothing else changed. Bright is energetic, mid is balanced, warm is intimate, dark is mysterious.",
      wrong: "If all four settings sound the same, your amp's EQ might be compensating. Turn the amp's treble to noon (neutral) so the guitar's tone knob has maximum effect. If you can't hear the difference between 10 and 7, go straight from 10 to 3 — the contrast is more obvious at the extremes.",
      sarah: "Gene, Mark Speer keeps his tone at 5-6 on the Strat — that's the Khruangbin warmth. But here's the thing: he adjusts it actively during performance. The tone knob is a creative tool in his hands, not a dial he sets once. This exercise trains you to hear and use those same colors. Your Strat or whatever you're playing has this entire tonal palette built in — most players just never explore it.",
      metronome: 70,
      recorder: true,
      levelUp: "Play the same phrase at four tone settings (10, 7, 3, 0) and articulate the character of each. Then perform an 8-bar improv with tone changes mid-performance."
    },
    {
      id: "gs-10-6",
      time: 7,
      title: "Parked Wah — Fixed Position Tone Shaping",
      type: "guitar",
      what: "A 'parked wah' is a wah pedal left in a FIXED position — not rocked back and forth. Instead of the classic wah-wah sweep, you're using the pedal as a tone filter, emphasizing a specific frequency range. This is Khruangbin's signature sound: that nasal, vocal quality on Mark Speer's lead lines comes from a wah pedal parked about halfway. If you don't own a wah, use your tone knob at different settings to simulate the concept.",
      setup: "Guitar. If you have a wah pedal: engage it and leave it in one position. If not: use tone knob experiments from the previous exercise as a substitute.",
      steps: [
        { text: "If you have a wah pedal: engage it and rock it to about 25% (heel down, barely open). Play a simple Am pentatonic phrase. Listen — the sound is dark, round, almost bass-like. This is the 'dark park' position. Hold this position and play for 1 minute.", why: "A wah pedal is essentially a tone knob controlled by your foot. At 25%, it's filtering out most treble — similar to tone knob at 2-3. But the wah does it differently: it creates a resonant peak at a specific frequency, which gives it a 'vocal' quality that a tone knob doesn't." },
        { text: "Rock the wah to 50% (middle position) and play the same phrase. This is the Khruangbin sweet spot — nasal, vocal, slightly quacky. Mark Speer parks his wah here for most lead work. The guitar sounds like it's talking. Play for 1 minute.", why: "The half-open wah emphasizes mid-range frequencies that sound vocal to our ears — the same frequency range where human speech lives. That's why parked wah sounds like the guitar is 'singing' or 'talking.' Speer discovered this by accident and built an entire sound around it." },
        { text: "Rock to 75% (almost fully open). Bright, honky, cutting. This is the classic funk position — less useful for Khruangbin's style but excellent for single-note funk lines. Play the same phrase and hear the nasal bite.", why: "Different park positions create different tonal characters. At 75%, the resonant peak is in the upper mids — this is where a guitar cuts through a loud band. Funk guitarists use this position for rhythm guitar that slices through horns and bass." },
        { text: "Find YOUR park position: slowly rock the wah while sustaining a single note. Stop when the tone sounds most pleasing to your ear. Mark that position with tape if needed. This is your personal 'park' — the frequency that flatters your guitar and your style.", why: "Every guitar and every player has a sweet spot where the parked wah sounds best. Speer found his through hours of experimentation. Your sweet spot depends on your guitar's pickups, your amp, and your personal taste. Finding it is an act of self-discovery. Tonal techniques like wah positioning benefit from overnight consolidation. Practice finding the sweet spot today, then test your recall tomorrow — you'll be surprised how much more quickly you find it." },
        { text: "If you don't have a wah pedal: experiment with your tone knob at settings 3, 5, and 7 while playing the same Am pentatonic phrase. Each setting approximates a different wah park position. Tone 5 is closest to Speer's 50% park. Record yourself at each setting.", why: "No wah? No problem. The tone knob is a simpler version of the same concept — both are frequency filters. The difference is that a wah has a resonant peak (more vocal), while a tone knob has a smooth rolloff (more natural). Understanding both prepares you for either tool." }
      ],
      feel: "Parked wah should make your guitar sound vocal — like it's speaking through a filter. The notes gain a nasal, expressive quality that clean guitar doesn't have. It should feel like putting a colored gel over a spotlight — same light, completely different color.",
      wrong: "If you're rocking the wah back and forth (the classic wah-wah effect), stop. Parked wah means FIXED position. No movement. The point is sustained tonal color, not the sweep effect. If the parked position sounds thin or harsh, you're parked too far forward — rock it back toward the heel.",
      sarah: "Gene, Mark Speer's Khruangbin tone IS the parked wah. That vocal, slightly nasal quality on Rules, Texas Sun, Maria Tambien — it's a Dunlop Cry Baby parked at about 50%, combined with a DS-1 (gain almost off) and flatwound strings on his Strat with DiMarzio DP186 pickups. The parked wah is what makes his single-note lines sound like a human voice singing. You can get 80% of that character with just the wah position — the rest is flatwounds and touch. Here's the deeper picture: the parked wah creates a fixed EQ peak that sounds nasal and funky — like a wah pedal frozen in one position. This IS Khruangbin's tone identity. Speer rocks the wah forward to about 2 o'clock and leaves it there. Combined with flatwound strings and spring reverb, it creates that warm, dark, Middle-Eastern-tinged tone.",
      metronome: 75,
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      recorder: true,
      levelUp: "Identify your personal 'park' position (on wah or tone knob) and play a 2-minute Am pentatonic improvisation with that tonal color consistently applied."
    },

    // ─── KHRUANGBIN: PERSIAN SCALE & SPACE ───

    {
      id: "gs-10-7",
      time: 10,
      title: "Song Study: Rules — Am-G, Behind the Beat, 60%+ Silence",
      type: "guitar",
      songRef: {
        title: "Rules — Khruangbin",
        src: "/rules-khruangbin.mp3",
        note: "Am-G, behind the beat, 60%+ silence. Mark Speer at his most minimal — space IS the music."
      },
      what: "Khruangbin's Rules is a masterclass in space. The chord progression is just Am-G (confirmed: G-Am-F-G-Em-F-Em-Am, but the core vamp is Am-G). Mark Speer plays a melody on top using three-note voicings and single notes with enormous gaps between phrases. The rule: 60% or more of the song is SILENCE. Your job is to play as LITTLE as possible while still making music.",
      setup: "Guitar. Tone at 5-6. Parked wah if available. Metronome at 74 BPM (original tempo).",
      steps: [
        { text: "Set up the Am-G vamp: strum Am for 2 bars, G for 2 bars. Very gentle, almost whispered strumming. This is the bed — quiet, warm, behind the beat. Play 4 repetitions of the Am-G cycle to establish the groove.", why: "Rules sits at 74 BPM — slow for Khruangbin. The chord bed is barely there: whisper-strummed, not driven. If your strumming is louder than a speaking voice, it's too much. Speer's rhythm guitar on this track is almost inaudible — it's a texture, not a groove." },
        { text: "Now add the Speer melody approach: play a single note on the high E or B string. Hold it for 2 full bars. Then silence for 2 bars. Then another single note for 2 bars. Every note is followed by an equal or greater amount of silence.", why: "Speer's lead style on Rules is extreme restraint. He plays one note, lets it decay completely, waits, then plays another. The silence between notes is the music. Most guitarists fill space — Speer empties it. This is the hardest thing you'll learn in this level." },
        { text: "Count your notes per minute. In a 4-minute section, aim for 8-12 notes total. That's one note every 20-30 seconds. If you're playing more than that, you're playing too much. Cut in half.", why: "Quantifying the silence makes the restraint concrete. 8-12 notes in 4 minutes sounds insane, but listen to Rules — that's exactly what Speer does. The constraint forces each note to MATTER. When you only get 10 notes, you choose each one with extreme intention." },
        { text: "Apply the behind-the-beat feel: when you DO play a note, land it slightly AFTER where the metronome says it should go. Not a full beat late — just a lazy, dragged feel. Like you thought about playing the note, then decided to wait, then finally let it out.", why: "Behind-the-beat playing is Khruangbin's temporal signature. Every note arrives a hair late, creating a languid, unhurried quality. It's the opposite of driving/pushing the beat — it's letting the beat pull you along while you resist." },
        { text: "Full 5-minute Rules performance: Am-G vamp, Speer-style melody (60%+ silence, behind the beat, tone at 5-6, parked wah if available). Record it. Listen back and count: is more than half of the recording silence? If yes, you nailed it.", why: "The recording check is your rubric. If you listen back and hear constant playing, the exercise failed — you didn't commit to the space. True silence (no sound at all) for more than half the performance is the goal." }
      ],
      feel: "This should feel uncomfortable at first — your instinct is to fill space, to keep playing, to add. Rules teaches the opposite: trust the silence. The note you DON'T play is as important as the one you do. When you relax into the space, the few notes you play become incredibly powerful.",
      wrong: "If you're playing continuously or adding fills between melody notes, you're not committing to the silence. Set a literal timer: play one note, then count to 15 before playing the next. The discomfort you feel is the exercise working. If your rhythm is rushing (ahead of the metronome), consciously drag every note late.",
      sarah: "Gene, Rules is Khruangbin distilled to its essence — Am and G, a handful of notes, and oceans of silence. Mark Speer's Strat with DiMarzio DP186s and D'Addario Chromes flatwounds gives that smooth, rounded tone. His DS-1 is set with gain almost off — it's there for sustain and compression, not distortion. The parked wah adds that vocal quality. But the REAL technique is the silence. He once said his favorite note is the one he doesn't play. This exercise teaches you that silence is a sound. Audio analysis confirms: the voicings are strictly 3-note triads on the top 3 strings — no full chords anywhere. Slide into each triad stab from one fret below, and chop it off immediately after playing — 60%+ of your playing should be silence. The full progression is G-Am-F-G-Em-F-Em-Am at 69 BPM, with hammering onto the major 3rd from the minor 3rd as a signature embellishment. The dark-warm tone comes from flatwound strings plus the parked wah plus spring reverb.",
      drone: { root: "A", octave: 2, texture: "analog" },
      metronome: 74,
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      chordVoicings: { chords: ["Am", "G"] },
      recorder: true,
      levelUp: "Perform a 5-minute Am-G vamp with Speer-style melody where 60%+ of the performance is measured silence. Record and verify."
    },

    // ─── BALTHVS CUMBIA ───

    {
      id: "gs-10-8",
      time: 8,
      title: "BALTHVS Cumbia Stabs — Syncopated 16th-Note Hits",
      type: "guitar",
      what: "BALTHVS brings Colombian cumbia to guitar with syncopated 16th-note chord STABS — short, percussive, immediately muted. These aren't sustained strums — they're staccato punches that land on specific subdivisions within the 16th-note grid. The rhythm is clave-based, creating a Latin bounce that's completely different from reggae or Afrobeat.",
      setup: "Guitar. Clean tone, slight compression if available. Metronome at 95 BPM.",
      steps: [
        { text: "Learn the stab technique: fret an Am chord. Strum DOWN sharply, then immediately release left-hand pressure to mute the strings. The chord should ring for less than a 16th note — a percussive 'chk' with pitch. Practice 8 stabs in a row, each one equally short and sharp.", why: "The stab is the fundamental move of cumbia guitar. It's the opposite of letting chords ring — you STOP the sound almost before it starts. BALTHVS uses these like a percussionist uses a shaker: rhythmic, precise, and dry." },
        { text: "Place the stabs on the clave pattern: in 4/4, play stabs on beat 1, the 'and' of 2, and beat 4. Leave beats 2, 3, and the 'and' of 4 empty. Count: '1... and-2... ... 4.' This is the basic cumbia guitar pattern.", why: "The clave is an asymmetric rhythm pattern from Afro-Cuban and Colombian music. It creates a lopsided feel that drives the dance — the ear expects symmetry but gets syncopation. BALTHVS builds their entire guitar approach on this clave foundation." },
        { text: "Add a second layer: between the main stabs, add ghost stabs — very quiet, barely audible muted strums on the 16th notes between your main hits. These ghost stabs fill the grid without adding volume. The main stabs pop; the ghost stabs whisper.", why: "Ghost notes between stabs create the illusion of a continuous 16th-note pattern (like the Afrobeat ostinato), but the ACCENTED notes follow the clave. This layered approach — loud stabs on the clave, quiet ghosts between — is how cumbia guitar drives without being loud." },
        { text: "Apply to a chord progression: Am-G (2 bars each). The stab pattern stays identical; only the chord shape changes. The rhythm should be so locked that a listener can't tell where the chord change happens based on timing — only on pitch.", why: "Rhythmic consistency across chord changes is essential for cumbia — the groove must be unbreakable. If the pattern hiccups on chord changes, slow down and practice the transition until the rhythm survives it." },
        { text: "Play the cumbia stab pattern for 3 minutes over the backing track. Resist any urge to fill, embellish, or play between the stabs. The pattern is the groove — it doesn't need help. Record it.", why: "Like Afrobeat, cumbia guitar is a discipline of restraint and precision. The stab pattern is designed to interlock with bass, drums, and percussion — adding extra notes destroys the interlock. BALTHVS's guitar is lean, sharp, and perfectly placed." }
      ],
      feel: "Cumbia stabs should feel percussive and bouncy — your guitar becomes a hand drum with pitch. The clave pattern creates an infectious, danceable groove that sways rather than drives. If your hips start moving, you have the feel.",
      wrong: "If the stabs are ringing out (sustaining too long), you're not muting quickly enough. The release must be almost instantaneous — strum and choke. If the pattern sounds like reggae skank, check your accent placement — reggae accents the 'and' of every beat (upbeats), cumbia accents the clave pattern (asymmetric).",
      sarah: "Gene, BALTHVS is a Colombian trio from Bogotá — they blend Santana-style guitar with cumbia and Turkish music. They're at #4 in your 12-month top artists. Their guitar sound is all about these syncopated stabs: percussive, clean, rhythmically precise. It's completely different from the strumming in surf-rock or the skank in reggae. Think of it as Afro-Latin percussion played on guitar strings. The clave feel gives it that asymmetric bounce that makes cumbia irresistible.",
      metronome: 95,
      tracks: [{ name: "Afrobeat 100", src: "/afrobeat-100.mp3" }],
      chordVoicings: { chords: ["Am", "G"] },
      levelUp: "Play cumbia stab pattern with clave accent placement over Am-G for 2 minutes. Every stab is staccato (no sustained ringing), and the clave accents are clearly distinguishable from ghost notes."
    },

    // ─── TOMMY GUERRERO ───

    {
      id: "gs-10-9",
      time: 8,
      title: "Tommy Guerrero Style — Finger-Picked Melody as Vocalist",
      type: "guitar",
      what: "Tommy Guerrero doesn't sing — his guitar IS his voice. He finger-picks single-note melodies that sit where a vocalist would, over grooves influenced by Ethio-jazz, Afrobeat, and soul. No pick. No chords. Just a clean, warm melody that breathes, pauses, and speaks. This is guitar as storytelling.",
      setup: "Guitar. No pick — fingers only. Clean tone, neck pickup for warmth. Metronome at 85 BPM.",
      steps: [
        { text: "Put the pick away. Rest your thumb on the low E string for stability. Use your index and middle fingers to pluck single notes on strings 1-3 (G, B, high E). Play an Am pentatonic melody — slow, deliberate, one note at a time. Each note should have space after it. No hurry.", why: "Tommy Guerrero plays a 1980s Japanese Fender Telecaster with no pick. The finger-plucked tone is softer, rounder, and more intimate than a pick attack. By removing the pick, you change your relationship with the instrument — it becomes more personal, like speaking quietly instead of projecting." },
        { text: "Apply the melody-as-vocalist concept: close your eyes. Audiate a short melody — hear it fully formed in your mind before anything else happens. Sing it quietly with your voice. Then play it on the guitar. The order is absolute: hear → sing → play. If you can't sing it, you haven't audiated it yet. If you can sing it but can't find it on the fretboard, that's a mapping gap you can fix. The melody ALWAYS starts in the inner ear.", why: "This is the full Audiate-Play-Transfer protocol applied to melody. Guerrero's approach treats the guitar like a voice — he doesn't think in scale shapes, he thinks in melodies. Gordon Stage 6 audiation means the auditory cortex activates BEFORE the motor cortex. By singing first and then playing, you bypass the muscle-memory patterns that lock most guitarists into familiar licks. Aarhus 2021 showed this three-step process (imagine → vocalize → execute) equals full learning in 1/3 the time." },
        { text: "Add Ethio-jazz flavor: use the Am pentatonic but add a flat 2nd (Bb). This creates a phrygian-pentatonic hybrid that sounds Ethiopian. Play: A-Bb-C-E-G. The Bb adds a dark, exotic tension. Guerrero draws heavily from Mulatu Astatke's Ethio-jazz vocabulary.", why: "The flat 2nd interval is the sonic bridge between Tommy Guerrero's surf-soul roots and his Ethio-jazz influences. It's the same note that gives Middle Eastern and Ethiopian music its distinctive color. One added note transforms the pentatonic from 'blues' to 'world.'" },
        { text: "Create a 16-bar melody over an Am drone: 4 bars of melody, 2 bars of silence, 4 bars of melody (varied), 2 bars of silence, 4 bars of new melody. The silences are structural — they're where the listener processes what they heard. Guerrero's compositions breathe like this.", why: "Structural silence in a melody is what separates guitar-as-vocalist from guitar solo. A vocalist takes breaths — your guitar melody should too. The 4+2 pattern creates phrases with natural breathing points, exactly like vocal phrasing." },
        { text: "Record a 3-minute finger-picked melody over the backing track. No chords, no strumming — just single notes and silence. Imagine you're the only instrument in the room and the melody needs to hold the listener's attention by itself. This IS the song.", why: "Tommy Guerrero's recordings often feature just his guitar melody over a simple groove — the melody IS the song. If your melody can hold attention for 3 minutes without chords, harmony, or lyrics, you've achieved the melody-as-vocalist ideal." }
      ],
      feel: "This should feel intimate and conversational — like you're telling a story to one person sitting across from you. The finger-picked tone is warm and private. The spaces between notes are where the listener leans in. If it feels like performing, pull back. This is speaking, not projecting.",
      wrong: "If you're playing fast runs or shredding, you've lost the voice. A vocalist can't sing 16th-note runs for minutes — neither should your melody-guitar. If you catch yourself falling into pentatonic licks (muscle-memory patterns), stop and sing the next phrase first, then play it. If the tone is too bright, switch to neck pickup and roll tone to 4-5.",
      sarah: "Gene, Tommy Guerrero is #9 in your 12-month top artists. He's a San Francisco skateboarder who plays a 1980s Japanese Fender Telecaster through clean Fender amps, finger-picked, no effects except a little reverb. His influences are Gabor Szabo and Mulatu Astatke — Hungarian jazz guitar and Ethiopian jazz. That's why his music sounds like nothing else: it's the Bay Area meeting Addis Ababa on a surfboard. This exercise teaches you his core technique: melody as vocalist, fingers as voice, silence as punctuation.",
      metronome: 85,
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }, { name: "Afrobeat 100", src: "/afrobeat-100.mp3" }],
      recorder: true,
      levelUp: "Perform a 3-minute finger-picked melody (no pick, no chords) over a backing track that sustains listener attention through melodic phrasing and structural silence."
    },

    // ─── GLOBAL FUSION IMPROV & EXTENDED JAM ───

    {
      id: "gs-10-10",
      time: 10,
      title: "Global Fusion Improv — Afrobeat + Soul + Desert",
      type: "guitar",
      what: "You now have Afrobeat interlocking, bossa rhythm, cumbia stabs, parked wah, tone control, and finger-picked melody in your toolkit. This exercise puts them all in a blender: improvise over a groove, switching between global styles every 8-16 bars. Afrobeat ostinato → bossa pattern → cumbia stabs → Khruangbin space → Tommy Guerrero melody. The transitions should be organic, not jarring.",
      setup: "Guitar. All your tonal tools available (tone knob, wah if you have one). Metronome at 90 BPM.",
      steps: [
        { text: "Start with an Afrobeat ostinato for 8 bars — simple, repetitive, percussive. Muted strums filling the 16th-note grid, pitched notes on accents. Lock into the groove.", why: "Starting with Afrobeat grounds you in the 16th-note grid. This is the most rhythmically disciplined style you've learned — it establishes a solid foundation for the style-switching that follows." },
        { text: "Transition to bossa nova for 8 bars: drop the 16th-note grid, switch to thumb-and-finger pattern, roll tone down for warmth. The groove should soften dramatically — from driving Afrobeat to lilting bossa. Let the transition happen over 2-3 bars, not instantly.", why: "Gradual transitions between styles are more musical than hard cuts. In 2-3 bars, you can shift from muted 16th-note strums to thumb-and-finger bossa without the listener feeling jarred. The trick is changing ONE element at a time: first the rhythm, then the volume, then the tone." },
        { text: "Move to cumbia stabs for 8 bars: sharpen the attack, switch to clave-based accent pattern. The energy rises from bossa's softness — the stabs punch through. Then dissolve into Khruangbin space: play 2-3 notes over 8 bars, mostly silence.", why: "The sequence — Afrobeat (full grid) → bossa (thumb pattern) → cumbia (clave stabs) → Khruangbin (silence) — moves from maximum density to minimum density. This arc teaches you to control the amount of space in your playing as a deliberate choice." },
        { text: "Finish with Tommy Guerrero-style finger-picked melody for 8 bars: no pick, single notes, intimate. Let the melody tell a story. Then circle back to Afrobeat if the groove calls for it.", why: "Ending with finger-picked melody brings the journey to an intimate close. The circle-back option (returning to Afrobeat) shows that these styles aren't separate boxes — they're points on a continuous spectrum of groove." },
        { text: "Full performance: 5 minutes of free style-switching over the backing track. Before each style shift, pause internally — hear the new texture in your mind before your hands change. Can you audiate the bossa rhythm before your thumb starts the pattern? Can you hear the Guerrero melody before your fingers pluck it? Move between styles when your inner ear leads the transition, not when your hands get restless. Record it.", why: "Free-form style-switching is the ultimate global fusion skill — and audiation is what separates intentional transitions from fidgeting. When each style shift begins in your inner ear (Gordon Stage 6: pre-hearing activates auditory cortex before motor cortex), the transitions sound organic because they ARE organic. When you can move between Afrobeat, bossa, cumbia, Khruangbin space, and Guerrero melody with each shift audiated first, these styles are truly in your blood." }
      ],
      feel: "This should feel like a world tour in 5 minutes — each style has a different physical signature in your body. Afrobeat is tight forearm, constant micro-motion. Bossa is thumb-weight, gentle finger independence. Cumbia is wrist snap, staccato attack. Khruangbin is patient stillness, minimal movement. Guerrero is individual finger intimacy, each string a separate voice. The transitions should feel like changing lanes, not hitting walls.",
      wrong: "If you're stuck in one style and can't transition, practice the exit: the last 2 bars of each style should start dissolving toward the next. If all the styles sound the same, you haven't committed to their defining features — go back and practice each one in isolation before combining.",
      sarah: "Gene, this exercise is your musical passport. You can sit in with an Afrobeat band in Lagos, a bossa circle in Rio, a cumbia crew in Bogotá, a space-rock trio in Houston, or a jazz jam in San Francisco — because all those colors are now in your fingers. That's what Khruangbin does: they're a Texas trio that sounds like the entire world. Your top artists span these same global sounds — now you can play them all.",
      metronome: 90,
      tracks: [{ name: "Afrobeat 100", src: "/afrobeat-100.mp3" }, { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }, { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      recorder: true,
      levelUp: "Perform a 5-minute improvisation that moves through at least 4 different global styles with organic transitions. Each style should be recognizable and distinct."
    },
    {
      id: "gs-10-11",
      time: 12,
      title: "Extended World Jam — Your 5-Minute Global Piece",
      type: "guitar",
      what: "Create a 5-minute recorded piece that draws from everything in this level. Pick a style to START with, let the music evolve, and build a piece with an arc: a beginning (establish the groove), a middle (develop and explore), and an end (resolve and fade). This is your Level 10 graduation piece — proof that the world is in your fingers.",
      setup: "Guitar. All tonal tools. Pick your favorite backing track — or play unaccompanied. Recorder ready.",
      steps: [
        { text: "Before playing, decide your starting point. Which global color calls to you right now? Afrobeat warmth? Bossa intimacy? Cumbia energy? Khruangbin space? Guerrero storytelling? Pick one and commit to starting there.", why: "Choosing a starting point gives your piece an identity. The best improvisations have a clear beginning — it doesn't mean you stay there, but it means the listener knows where they are when the journey starts." },
        { text: "Play for 2 minutes in your chosen style. Establish the groove deeply — repetition, consistency, patience. This is the 'beginning' of your piece. Don't rush to the next section. Let the groove breathe and settle.", why: "Two minutes of establishing groove before developing is the minimum for listener engagement. If you switch too early, the piece feels scattered. Fela Kuti spent 5-10 minutes establishing a groove before ANY development." },
        { text: "In minutes 2-4, develop: add a new element. Maybe switch styles gradually. Maybe add a melody over your groove. Maybe change the tone knob. Maybe introduce silence. ONE change at a time — let each change settle before adding another.", why: "Development through single-element changes creates coherent evolution. Changing everything at once creates chaos. The listener can follow one change at a time and feel the journey. Multiple simultaneous changes feel like a different song, not a development." },
        { text: "In the final minute, resolve: bring the piece to a satisfying close. Options: fade to silence (Khruangbin style), return to the opening groove (circular form), strip down to a single sustained note (Tinariwen ending), or end with a firm final chord. Choose what serves the piece.", why: "A deliberate ending shows compositional thinking. The worst thing is just stopping because you ran out of ideas. Plan your ending 30 seconds before you get there — that's enough time to set up a satisfying close." },
        { text: "Listen back to the full 5-minute recording. Ask yourself: does it have a beginning, middle, and end? Could a listener follow the journey? Is there at least one moment of genuine musical beauty? If yes to all three, you've graduated Level 10.", why: "Self-assessment against clear criteria builds musical judgment. 'Beginning, middle, end' is the simplest compositional framework. 'Followable journey' ensures coherence. 'One moment of beauty' ensures artistry. These three criteria separate noodling from music." }
      ],
      feel: "This should feel like composing in real time — not practicing, not running exercises, but creating a piece of music that exists as a complete work. Treat the recording as a performance, not a practice session. The red light is on. This matters.",
      wrong: "If the 5 minutes feel like aimless noodling, you didn't commit to structure. Go back and plan: 'minutes 0-2 = bossa groove, minutes 2-4 = add Guerrero melody, minute 4-5 = fade to silence.' A simple plan prevents drift. If you're switching styles every 30 seconds, you're not giving any style enough time to establish itself — minimum 1 minute per style.",
      sarah: "Gene, this is your world music debut. Everything in this level — the Afrobeat of Kokoroko, the bossa of Rosinha De Valença, the cumbia of BALTHVS, the space of Khruangbin, the storytelling of Tommy Guerrero — is in your hands now. The piece you record is uniquely YOURS: nobody else has this exact combination of influences, this exact touch, this exact ear. Your top 50 tracks span the globe, and now your guitar does too. Record it, keep it, and know that the world is in your fingers.",
      metronome: 90,
      tracks: [{ name: "Afrobeat 100", src: "/afrobeat-100.mp3" }, { name: "Bossa Nova 75", src: "/bossa-nova-75.mp3" }, { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }, { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }, { name: "Drums — Afrobeat 110", src: "/drums-afrobeat-110.mp3" }, { name: "Drums — Bossa 75", src: "/drums-bossa-75.mp3" }],
      recorder: true,
      levelUp: "Record a 5-minute global fusion piece with a clear beginning (establish groove), middle (develop with style shifts), and end (deliberate resolution). At least 3 different global styles should be recognizable."
    }
  ]
};
