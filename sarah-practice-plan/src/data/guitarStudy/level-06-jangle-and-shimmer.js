import { getPitchRange } from "../appData.js";

export const level6 = {
  level: 6,
  title: "Jangle & Shimmer",
  subtitle: "Open strings ring through barre shapes. The dreamy psych-surf sound unlocked.",
  description:
    "Everything you've learned so far used closed voicings — every string fretted, every note controlled. Now you open up. Maj7 chords, sus2 chords, and open-string resonance create the shimmering, jangly sound that defines Allah-Las, levitation room, and the entire LA psych-surf scene. The secret is simple: let the open high E string ring through chord changes. That one ringing string IS the jangle.",
  artists: "levitation room, Allah-Las, modGlyders, Babitha",
  unlocks: "The Groove Machine (Level 7)",
  review: {
    label: "Level 5 Check-In",
    time: 5,
    exercises: ["gs-5-5", "gs-5-11"],
    prompt: "Play Sol Del Sur (C#m-B-F#) with the syncopated strum (gs-5-5). Then play a barre chord progression you created yourself (gs-5-11). Clean barres with no buzzing? Time for jangle."
  },
  exercises: [

    // ─── PHASE 1: THE MAJ7 SHAPES ───

    {
      id: "gs-6-1",
      time: 7,
      title: "The Cmaj7 Shape — Let It Ring",
      type: "guitar",
      what: "Learn Cmaj7 (x32000). It's a regular C major with your index finger lifted off the B string — exposing the open B AND the open high E. Those two open strings ringing together are the shimmer. This is the foundation of the Allah-Las jangle sound.",
      setup: "Guitar. No metronome yet — just listen.",
      chordVoicings: { chords: ["Cmaj7"] },
      steps: [
        { text: "Play a regular C major chord (x32010). Strum it, listen to the sound. Now lift your index finger off the 1st fret of the B string. The shape is now x32000 — open B and open E ringing on top. Strum it slowly and listen to the difference.", why: "Removing one finger transforms C major into Cmaj7. The open B string is the major 7th of C — the note that creates that dreamy, unresolved, floating quality. The open E string adds brightness on top. Two open strings = two sources of shimmer." },
        { text: "Strum Cmaj7 and let it ring for 4-5 seconds. Don't mute anything. Let every string sustain as long as possible. Close your eyes and listen to the overtones — the way the open strings interact with the fretted notes creates a wash of sound.", why: "Sustain is the point. In barre chord exercises you learned to fret cleanly. Now you learn to let go — open strings ringing freely create harmonic richness that fretted notes can't match. This is the opposite of palm muting." },
        { text: "Compare: play C major (x32010) and immediately after play Cmaj7 (x32000). Back and forth, 4 times. Feel the emotional shift — C major is resolved, complete, done. Cmaj7 is floating, dreamy, unfinished. Neither is better; they serve different moods.", why: "The major 7th interval (B against C) creates a gentle dissonance — not enough to sound wrong, just enough to sound unresolved. This 'almost but not quite resolved' quality is the emotional core of jangle." },
        { text: "Now strum Cmaj7 with a slow, deliberate downstroke. Let all strings ring. Then strum again before the sound fully decays — overlap the two strums so the sustain builds. Do this 8 times, each strum overlapping the last. You're building a wash.", why: "Overlapping strums with open strings create a reverb-like effect even without effects pedals. This is how jangle guitarists create that shimmering wall of sound — the guitar becomes its own reverb chamber." },
        { text: "Set the metronome to 70 BPM. Strum Cmaj7 on beat 1 of each bar. Let it ring for the full bar. On the next beat 1, strum again. 8 bars of slow, ringing Cmaj7. Listen to how the chord blooms between strums.", why: "Patience with open voicings is a skill. Your instinct from barre chords is to keep the rhythm tight and controlled. Jangle is the opposite — space between strums lets the open strings breathe." }
      ],
      feel: "Cmaj7 should feel like opening a window in a warm room — sudden airiness, light flooding in. The open strings add a brightness and spaciousness that fretted chords don't have. If it feels closed or tight, you're muting something you shouldn't be.",
      wrong: "If it sounds muddy, check that both the B string (open) and high E string (open) are ringing clearly — your middle or ring finger might be accidentally touching them. If it sounds too bright or thin, make sure the fretted notes (3rd fret A string, 2nd fret D string) are clean. If it sounds the same as C major, your index finger is still touching the B string — lift it fully away.",
      sarah: "Gene, this is the Allah-Las chord. Pedrum Siadatian plays a 1970s Fender through a Twin Reverb Blackface — he calls it 'Love verb' — and when he hits a Cmaj7, those open strings ring through the spring reverb and create that golden shimmer you hear on every Allah-Las record. The open high E string is doing most of the work. One lifted finger, and C major becomes a completely different emotional universe.",
      metronome: 70,
      levelUp: "Strum Cmaj7 (x32000) 8 times at 70 BPM with all open strings ringing clearly — no buzzing, no accidental muting — and describe the emotional difference between Cmaj7 and regular C major."
    },
    {
      id: "gs-6-2",
      time: 7,
      title: "The Dmaj7 Shape — Same Trick, New Root",
      type: "guitar",
      what: "Learn Dmaj7 (xx0222). It's a D major with the high E string left open instead of fretted at the 2nd fret. The open E is the major 7th of the D chord — the SAME open string trick as Cmaj7. One ringing string creates the jangle in both chords.",
      setup: "Guitar. Metronome at 70 BPM.",
      chordVoicings: { chords: ["Dmaj7"] },
      steps: [
        { text: "Play a regular D major chord (xx0232). Strum it, feel its brightness. Now lift your ring finger off the 1st string (the high E at the 2nd fret). The shape is now xx0222 — open high E ringing on top. Strum and listen.", why: "Just like Cmaj7, one lifted finger transforms the chord. The open E string (the note E) is the major 7th of D. It creates the same dreamy, floating quality — but in a different key. The trick is identical: open string = maj7." },
        { text: "Strum Dmaj7 and let it ring. Compare it to D major. Back and forth, 4 times. D major sounds bright and complete. Dmaj7 sounds bright but unfinished — there's a gentle yearning in it, a forward lean.", why: "The maj7 interval in D (E against D) creates the same gentle dissonance as in Cmaj7 (B against C). Your ear is learning to recognize this quality regardless of the root note — that's interval recognition developing." },
        { text: "Play Dmaj7 with a fingerpicking pattern: thumb picks the D string, then index plucks the G string, middle plucks the B string, ring plucks the open high E. Let each note ring into the next. The open E should sustain through the entire pattern.", why: "Fingerpicking Dmaj7 isolates each voice in the chord. The open E string, plucked last, rings over all the other notes — creating a cascading shimmer. This is how jangle guitarists get that 'waterfall' effect." },
        { text: "Strum Dmaj7 at 70 BPM, one strum per bar. 8 bars. On bars 5-8, try adding a gentle upstroke on beat 3 — a soft echo of the main strum. The upstroke catches the open strings and adds shimmer.", why: "A soft upstroke after the main downstroke is a core jangle technique. The downstroke establishes the chord, the upstroke refreshes the open strings. It's like the chord breathes — inhale, exhale." },
        { text: "Notice something: both Cmaj7 and Dmaj7 use the open high E string as their maj7. That one string — the thinnest, brightest string on the guitar — is doing the jangle work in BOTH chords. Remember this. It's the key to the entire level.", why: "This insight is the conceptual breakthrough of jangle guitar: the open high E string is a fixed drone that changes function depending on the chord underneath it. Over C, it's the 3rd. Over Cmaj7, it interacts with the open B (the 7th). Over Dmaj7, it IS the 7th. One string, multiple harmonic roles." }
      ],
      feel: "Dmaj7 should feel like warm sunlight through a window — bright but soft, with a glow that lingers. If Cmaj7 was opening the window, Dmaj7 is the sunbeam that pours through.",
      wrong: "If it sounds like a regular D, your ring finger is still on the 1st string. Lift it completely. If the open E sounds harsh or jangling (in a bad way), you might be strumming too hard — jangle comes from letting strings vibrate, not from attacking them.",
      sarah: "Gene, here's the beautiful thing: Allah-Las built their entire sound on this one insight. The open high E string is the maj7 in Cmaj7 AND in Dmaj7. When they float between these two chords, that ringing E string is the constant — the thread that connects them. It's the simplest trick in guitar, and it sounds like a million dollars through a Twin Reverb.",
      metronome: 70,
      levelUp: "Strum Dmaj7 (xx0222) 8 times at 70 BPM with the open high E ringing clearly, and explain in your own words why the same open string creates the maj7 quality in both Cmaj7 and Dmaj7."
    },

    // ─── PHASE 2: THE ALLAH-LAS FLOAT ───

    {
      id: "gs-6-3",
      time: 8,
      title: "The Allah-Las Float — Cmaj7 to Dmaj7",
      type: "guitar",
      what: "Move between Cmaj7 and Dmaj7 — two major 7th chords a whole step apart. The open high E rings through BOTH shapes, creating a continuous shimmer while the bass notes shift underneath. This non-resolving, dreamy progression is the Allah-Las signature. It doesn't go anywhere — it floats.",
      setup: "Guitar. Metronome at 65 BPM (slow — let the chords breathe).",
      chordVoicings: { chords: ["Cmaj7", "Dmaj7"] },
      steps: [
        { text: "Play Cmaj7 (x32000) for 2 bars. Then Dmaj7 (xx0222) for 2 bars. Back and forth. Go SLOWLY — 65 BPM. Let each chord ring fully before changing. Listen to the open E string sustaining through both chords.", why: "The slow tempo forces you to hear the transition. The open E never stops — it rings through the chord change as a continuous thread. This sustained open string is literally 'the jangle.'" },
        { text: "Focus on the transition itself. As you move from Cmaj7 to Dmaj7, the 3rd fret on the A string lifts and the 2nd fret on the G string adds. But the open B and open E NEVER change. Those strings are a constant pedal tone through both chords.", why: "Identifying which fingers move and which strings stay open builds efficient transitions. The fewer fingers that move, the smoother the change — and the open strings act as a bridge, sustaining through the transition gap." },
        { text: "Now try a jangle strum: down on beat 1, soft up on the 'and' of 2, down on beat 3. Repeat on each chord for 2 bars. The soft upstroke catches the open strings and refreshes the shimmer mid-bar.", why: "The jangle strum pattern isn't a straight down-down-up-up. It's deliberately uneven — a strong downstroke followed by a light upstroke that barely grazes the top strings. The upstroke is the shimmer; the downstroke is the foundation." },
        { text: "Play Cmaj7-Dmaj7 continuously for 2 full minutes. Don't change the pattern. Let the repetition become hypnotic. This is the Allah-Las approach — they don't build to a climax; they FLOAT. The progression is a loop, not a journey.", why: "Repetition without destination is a core psych-surf aesthetic. The chord progression doesn't 'resolve' — Cmaj7 and Dmaj7 are both tonally ambiguous. They create a warm, floating feeling that rewards patience rather than movement." },
        { text: "Close your eyes on the last minute. Feel the way the progression hovers — neither chord feels like 'home' or 'away.' Both are floating. This lack of resolution is what makes it dreamy. You're not going anywhere, and that's the point.", why: "Understanding the emotional quality of non-resolving progressions changes how you hear music. Most pop moves toward resolution (tension → release). The Allah-Las float stays in tension permanently — creating a dreamlike suspension." }
      ],
      feel: "The float should feel like being on a slow ocean swell — gently rising and falling, never arriving, never leaving. Both chords feel equally warm and equally unfinished. The open E string is the horizon line that never moves.",
      wrong: "If it sounds choppy, you're muting the strings between chord changes. Let them ring — the overlap during the transition IS the jangle. If one chord sounds dead compared to the other, check that all open strings are ringing in both shapes. If it feels like the progression is 'going somewhere,' you might be adding emphasis to one chord over the other — keep them equal.",
      sarah: "Gene, this is IT. The Cmaj7-Dmaj7 float is the Allah-Las sound. Pedrum plays his 1970s Fender through the Twin Reverb Blackface with the spring reverb cranked, and this two-chord progression fills the entire room. The open high E string is the secret — it's the maj7 in both chords, so it rings constantly while the bass shifts underneath. That's the whole recipe. It's not complicated. It's just beautiful.",
      metronome: 65,
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      levelUp: "Play Cmaj7→Dmaj7 continuously at 70 BPM for 2 minutes with the open high E string sustaining through every chord change — no gaps in the shimmer, no buzzing, and the jangle strum pattern (down, soft up, down) consistent."
    },
    {
      id: "gs-6-4",
      time: 8,
      title: "Song Study: Worship the Sun",
      type: "guitar",
      songRef: {
        title: "Worship the Sun — Allah-Las",
        youtubeId: "vd7GPAm7xYg",
        note: "Chords from GuitarTabsExplorer: Cmaj7-Dmaj7 (verse), A-G-A-E (chorus). Listen and verify."
      },
      what: "Allah-Las' Worship the Sun IS the Cmaj7-Dmaj7 float in action. The verse rides Cmaj7→Dmaj7 over and over — pure jangle. The chorus shifts to A-G-A-E. (Chords from GuitarTabsExplorer — hit play above to verify.)",
      setup: "Guitar. Listen to the song first. Metronome at ~95 BPM.",
      chordVoicings: { chords: ["Cmaj7", "Dmaj7", "A", "G", "E"] },
      steps: [
        { text: "Verse: play Cmaj7→Dmaj7 in a loop, 2 bars each, with the jangle strum you learned in gs-6-3. This IS the verse of Worship the Sun. The entire verse is this two-chord float. Play it 4 times through (16 bars).", why: "Learning that a professionally recorded, critically acclaimed song uses the exact same two-chord pattern you just practiced proves that simplicity works. Allah-Las didn't need more chords — they needed the RIGHT two chords." },
        { text: "Chorus: shift to A-G-A-E. Play A for 1 bar, G for 1 bar, A for 1 bar, E for 1 bar. Use open chord shapes. Notice how the chorus feels different — it MOVES, it has direction, it resolves. After the floating verse, the chorus lands.", why: "The contrast between floating verse (no resolution) and directional chorus (clear harmonic motion) is a classic songwriting technique. The verse builds dreamlike tension; the chorus releases it. This push-pull keeps the listener engaged." },
        { text: "Full structure: 4 cycles of verse (Cmaj7-Dmaj7), then chorus (A-G-A-E), then back to verse. Feel the emotional arc — float, land, float again. The landing makes the floating sweeter; the floating makes the landing feel earned.", why: "Understanding song form as an emotional journey (not just a sequence of chords) is what separates players from songwriters. Each section exists because of how it relates to the other sections." },
        { text: "Add the Allah-Las reverb feel: strum lighter than you think you should. Let the chord shapes do the work. If you have a reverb pedal, turn it on. If not, play in a room with hard walls and let the natural room reverb do its thing. The lighter your touch, the more the jangle comes through.", why: "Allah-Las' tone comes from light touch + heavy reverb. The guitar is never overdriven or aggressive. Spring reverb on the Twin Reverb Blackface adds sustain and shimmer that makes even a gentle strum fill the room." },
        { text: "Play the full song structure 3 times from top to bottom. By the third time, you should feel the emotional shape without thinking about chord names — it's float, float, float, LAND, float, float, float, LAND.", why: "Repetition of the full structure builds the emotional memory of the song. When you feel the form in your body, you can start adding expression — dynamics, tempo pushes, emphasized strums." }
      ],
      feel: "The verse should feel weightless — hanging in the air with no destination. The chorus should feel like your feet touching the ground after floating. The transition between them should feel like a gentle arrival, not a crash.",
      wrong: "If the verse sounds boring, you're not letting the chords ring enough — strum lighter, let the open strings sustain. If the chorus doesn't feel different from the verse, strum the chorus with more conviction — slightly louder, more rhythmic drive. The contrast is essential.",
      sarah: "Gene, Worship the Sun is peak Allah-Las. The verse is literally Cmaj7-Dmaj7 on repeat — that's it. And it's hypnotic. The chorus opens up to A-G-A-E and you feel the sun break through. This is how the psych-surf descending minor tradition meets jangle — the Am-G-F-E progression you hear in so much LA psych is hidden in that chorus (A is the relative major of the Allah-Las' natural home key). The whole song is a masterclass in less-is-more.",
      metronome: 95,
      levelUp: "Play the full Worship the Sun structure (verse: Cmaj7-Dmaj7 x4, chorus: A-G-A-E x1) twice through at 95 BPM with smooth transitions and the jangle strum on the verse sections."
    },

    // ─── PHASE 3: SUS2 AND AMBIGUITY ───

    {
      id: "gs-6-5",
      time: 7,
      title: "Sus2 Voicings — The Ambiguous Chords",
      type: "guitar",
      what: "Learn Dsus2 (xx0230) and Asus2 (x02200). Sus2 chords replace the 3rd with the 2nd — removing the note that tells you if a chord is major or minor. The result is ambiguous, dreamy, wide open. Neither happy nor sad. Just floating. Like the desert blues sus pentatonic, but in chord form.",
      setup: "Guitar. Metronome at 70 BPM.",
      chordVoicings: { chords: ["Dsus2", "Asus2", "D", "Am"] },
      steps: [
        { text: "Play D major (xx0232). Now play Dsus2 (xx0230) — lift your ring finger off the high E string. The F# (the major 3rd that makes D 'major') disappears, replaced by the open E (the 2nd). Strum both back and forth. D major is definitive. Dsus2 is ambiguous.", why: "The 3rd is the note that defines major vs. minor. Removing it creates a chord that's neither — it's suspended, unresolved, waiting. This ambiguity is the sus2 sound: open, spacious, non-committal." },
        { text: "Play Am (x02210). Now play Asus2 (x02200) — lift your index finger off the B string. The C (the minor 3rd) disappears. Strum both back and forth. Am is melancholy. Asus2 is open — the sadness lifts but nothing replaces it. It's neutral, wide.", why: "Asus2 removes the emotional specificity of Am. Where Am says 'sad,' Asus2 says 'I'm not sure how I feel.' This emotional openness makes sus2 chords incredibly versatile — they fit everywhere because they commit to nothing." },
        { text: "Play Dsus2 for 2 bars, then Asus2 for 2 bars. Loop it. Both chords are ambiguous, both use open strings, both float. Together they create a progression that's all shimmer, no definition. This is the palette of dream-pop.", why: "A progression of sus2 chords creates maximum ambiguity — you're never sure where you are tonally. This floating quality is used by Radiohead, Bon Iver, and every ambient guitar player. In Gene's world, it's the feeling of levitation room's haziest moments." },
        { text: "Try this sequence: D → Dsus2 → D → Dsus2. One finger moves. The chord breathes — definitive, ambiguous, definitive, ambiguous. Do the same with Am → Asus2 → Am → Asus2. Feel the chord 'opening up' each time the 3rd lifts.", why: "Oscillating between the regular chord and its sus2 creates a breathing effect — the chord identity shimmers in and out of focus. This is a standard trick in jangle and shoegaze guitar. One finger, rocking back and forth." },
        { text: "Improvise: strum freely using only Dsus2, Asus2, Cmaj7, and Dmaj7. All four chords use open strings, all four are ambiguous or dreamy. Play for 2 minutes. No wrong order. Let the shimmer build.", why: "Your palette is now 4 chords that all share the same quality — open-string resonance and harmonic ambiguity. Any combination sounds dreamy. This is a playground for jangle composition." }
      ],
      feel: "Sus2 chords should feel like clouds — no edges, no definition, just soft mass drifting. When you move between sus2 shapes, it should feel like the clouds are shifting but the sky stays the same.",
      wrong: "If Dsus2 sounds the same as D major, your ring finger is still on the high E string — lift it. If Asus2 sounds muddy, make sure the open B string and open E string are both ringing clearly. If the sus2 chords feel 'empty,' that's actually right — the emptiness IS the sound. Lean into it.",
      sarah: "Gene, sus2 chords are why levitation room sounds the way they do — that hazy, not-quite-defined feeling where you're not sure if the song is happy or sad. It's both and neither. Dsus2 shows up constantly in their catalog because it has that open E string ringing on top — same trick as the maj7 chords, different emotional angle. The open strings are doing all the work.",
      metronome: 70,
      levelUp: "Play Dsus2 (xx0230) and Asus2 (x02200) cleanly with all open strings ringing, and improvise a 1-minute passage using Dsus2, Asus2, Cmaj7, and Dmaj7 in any order."
    },
    {
      id: "gs-6-6",
      time: 8,
      title: "Song Study: Friends (levitation room)",
      type: "guitar",
      songRef: {
        title: "Friends — levitation room",
        youtubeId: "P-cJWkZLy0k",
        note: "Verified chords: Em-Dmaj7 (verse), A-Em (chorus). The Dmaj7 voicing IS the jangle."
      },
      what: "levitation room's Friends is NOT standard strumming — the verse is a signature single-note and double-stop riff. The guitarist outlines Em and Dmaj7 using hammer-ons and pull-offs on the G, B, and high E strings, starting around the 7th fret and sliding down into the Dmaj7 shape at the 5th fret. The chord shapes are held as a foundation while the fingers dance above them. The chorus then switches to a relaxed, traditional strum over A-Em — that riff-to-strum contrast is the song's emotional architecture.",
      setup: "Guitar. Listen to the song. Metronome at 100 BPM. The verse riff lives on frets 5-7 on the top 3 strings (G, B, high E).",
      chordVoicings: { chords: ["Em", "Dmaj7", "A"] },
      fretboard: { scale: "em-pentatonic", position: 1, highlight: [5, 6, 7] },
      steps: [
        { text: "Play Em (022000). Then Dmaj7 (xx0222). Back and forth, 2 bars each, at 80 BPM first. Listen to how the open E string sustains through BOTH chords — in Em it's the root, in Dmaj7 it's the maj7. Same string, completely different harmonic function.", why: "This is the deeper version of the open string trick: the E doesn't just ring — it changes meaning depending on the chord underneath. In Em, E is home. In Dmaj7, E is the dreamy 7th. Your ear starts to hear one string doing two different jobs." },
        { text: "Now try the actual verse technique: hold the Em shape as a foundation, then use hammer-ons and pull-offs on the G, B, and high E strings around frets 5-7. The riff outlines the Em chord melodically — individual notes dance above the held shape. Then slide your hand down into the Dmaj7 shape at the 5th fret and do the same: hold the chord, let single notes and double-stops ring above it. The feel is swung, behind-the-beat — never rushed.", why: "This riff-over-chord technique is how levitation room creates their signature sound. The chord shape is the skeleton; the hammer-ons and pull-offs are the melody. It's not strumming — it's composing a riff that lives inside the chord. The behind-the-beat feel gives it that lazy, golden-hour quality." },
        { text: "Pre-chorus: shift to A-Em. Play A for 2 bars, Em for 2 bars. Feel how the A chord brings brightness and forward motion — the chorus lifts up from the dreamy verse. Then fall back into Em-Dmaj7 for the verse.", why: "The chorus uses A major — a warmer, more resolved chord that creates contrast with the floating verse. The shift from Em-Dmaj7 (dreamy) to A-Em (directional) is the emotional hinge of the song." },
        { text: "Full structure: Verse (Em-Dmaj7 x4), Pre-chorus (A-Em x2), Verse (Em-Dmaj7 x4). Play through the whole thing twice. Let the Dmaj7 be the star — that chord IS the song.", why: "Hearing the full structure reveals that Friends is essentially a Dmaj7 delivery vehicle. Everything else exists to set up and release the dreamy maj7 moment. Understanding a song's emotional center helps you play it with intention." },
        { text: "Add feel: during the Em bars, strum slightly harder — it's the minor chord, the grounded moment. During the Dmaj7 bars, strum lighter and let the open strings ring longer. Create a dynamic wave: strong-soft-strong-soft. The song breathes.", why: "Dynamic contrast between chords within a simple pattern creates the illusion of complexity. You're playing two chords, but the dynamic variation makes it feel like a full arrangement." }
      ],
      feel: "The verse should feel like drifting — Em pulls you gently down, Dmaj7 lifts you up into shimmer. The alternation creates a gentle rocking motion, like a hammock. The chorus should feel like briefly waking up before sinking back into the dream.",
      wrong: "If the Dmaj7 doesn't shimmer, check that the open E string is ringing. If the transition between Em and Dmaj7 is clunky, practice the change in isolation — Em to Dmaj7 requires lifting fingers off the A string while placing them on the D, G, and B strings. If the song feels flat, add the dynamic contrast — louder Em, softer Dmaj7.",
      sarah: "Gene, Friends is one of those songs that sounds simple until you realize the verse is NOT standard strumming — it's a signature riff. The guitarist holds Em and Dmaj7 shapes as a foundation while the fingers dance above them with hammer-ons and pull-offs on the top three strings, starting around the 7th fret and sliding down to the 5th fret for Dmaj7. The chorus then relaxes into a traditional strum over A-Em — that riff-to-strum contrast is the emotional architecture of the whole song. For the authentic Friends sound, you'd want a chorus or vibrato pedal paired with spring reverb — that wobbly, retro, underwater quality is signature levitation room. Julian Ducatenzeiler uses the same open-string tricks as Allah-Las, but the riff technique adds a melodic layer that simple strumming can't touch. This is your vibe, man — this is the sound. Notice how the guitar completely changes character between verse and chorus. The verse has that riff — intricate hammer-ons and pull-offs. But when the vocals come in strong for the chorus, the guitar switches to relaxed open strumming. This isn't random — the riff is the focal point when the voice is simple, and the guitar simplifies when the voice becomes the focal point. One element leads at a time.",
      metronome: 100,
      levelUp: "Play the full Friends structure (verse Em-Dmaj7 x4, chorus A-Em x2, verse Em-Dmaj7 x4) at 100 BPM with dynamic contrast (louder Em, softer Dmaj7) and the open E string ringing continuously."
    },

    // ─── PHASE 4: MAJOR→MINOR SHIFTS ───

    {
      id: "gs-6-7",
      time: 7,
      title: "The Major→Minor Shift — One Finger Changes Everything",
      type: "guitar",
      what: "Play D major (xx0232). Now lower the F# on the high E string by one fret to F natural: Dm (xx0231). ONE fret. One semitone. The chord goes from bright sunshine to dusky melancholy. DOPE LEMON, modGlyders, and Cotton Jones all use this trick — a major chord that unexpectedly turns minor. The shift creates emotional surprise.",
      setup: "Guitar. Metronome at 75 BPM.",
      chordVoicings: { chords: ["D", "Dm", "G", "Gm"] },
      steps: [
        { text: "Play D major (xx0232). Hold it, strum it 4 times. Feel the brightness. Now move your ring finger down one fret — from fret 3 to fret 2 on the high E string: xx0231, D minor. Strum it 4 times. Feel the shift — one fret, one semitone, the entire emotional world changes.", why: "The major→minor shift is one of the most powerful emotional moves in popular music. The 3rd degree (F# vs. F) is the ONLY note that changes, but it transforms the chord's entire character. Understanding this in your fingers — not just your head — makes it a tool you can reach for anytime." },
        { text: "Loop: D for 2 bars, Dm for 2 bars, D for 2 bars, Dm for 2 bars. Feel the oscillation — bright, dark, bright, dark. Like clouds passing over the sun. This is DOPE LEMON's signature trick: D→Dm→G→Gm, the 1960s soul ballad progression.", why: "Major→minor oscillation creates emotional complexity from simple materials. The listener expects major to stay major. When it shifts to minor, there's a subtle surprise — a shadow passing through the sunlight. This keeps the ear engaged." },
        { text: "Now try G major (320003) to Gm. Gm as a barre chord is 355333 — a full barre at fret 3. If the barre is difficult, try the simplified Gm: 3x0333 (mute the A string). Feel the same shift: bright G, then the shadow of Gm.", why: "The G→Gm shift is harder because Gm requires a barre (or a modified shape). This is where your Level 5 barre work pays off. The emotional payoff is worth the effort — Gm in a major-key song is deeply unexpected and affecting." },
        { text: "Play the DOPE LEMON sequence: D (2 bars) → Dm (2 bars) → G (2 bars) → Gm (2 bars). Loop it. Feel the emotional journey: bright → shadow → bright → deeper shadow. Each major→minor pair adds another layer of complexity.", why: "This four-chord progression (two major→minor pairs) is a specific harmonic pattern used by DOPE LEMON, Cotton Jones, and countless soul writers from the 1960s. It works because the ear tracks the major→minor motion as a narrative: things start bright, then clouds gather." },
        { text: "Experiment with timing: play D for 3 bars, then Dm for just 1 bar. The minor chord becomes a brief shadow — a passing cloud. Then try the reverse: D for 1 bar, Dm for 3 bars. Now the minor dominates and the major is a brief ray of light. Duration changes the story.", why: "How LONG you stay on each chord shapes the emotional narrative. A brief minor moment feels wistful. A long minor stretch feels melancholic. Choosing the ratio is a songwriting decision — you're controlling how much shadow is in the sunlight." }
      ],
      feel: "The D→Dm shift should feel like a cloud crossing the sun — a subtle, unexpected darkening that makes you more aware of the light that was just there. The G→Gm shift is the same feeling but deeper, with the barre chord adding weight. Together, the D-Dm-G-Gm loop should feel like watching golden hour slowly cool into dusk.",
      wrong: "If D and Dm sound too similar, emphasize the high E string — that's where the 3rd lives, and that's where the shift happens. If Gm buzzes, review your barre technique from Level 5. If the loop sounds random rather than emotional, slow down and listen to each transition — the emotion is in the MOMENT of change, not in the chords themselves.",
      sarah: "Gene, this is Angus Stone's secret weapon. DOPE LEMON's whole vibe is built on this D→Dm shift — that lo-fi, reverb-drenched, behind-the-beat feel where the chords keep slipping between major and minor like you can't quite hold onto the happy feeling. Cotton Jones does it on Chewing Gum (Am-D-Dm7-Dm). modGlyders do it on Geneva Strangemod (G-C-D-Gm). It's the same trick everywhere — one fret, one finger, total emotional transformation.",
      metronome: 75,
      levelUp: "Play D→Dm→G→Gm at 75 BPM with clean chord changes, and describe what happens emotionally at each major→minor transition."
    },
    {
      id: "gs-6-8",
      time: 8,
      title: "Song Study: Geneva Strangemod (Glyders)",
      type: "guitar",
      songRef: {
        title: "Geneva Strangemod — Glyders",
        youtubeId: "v0on9GtgFhU",
        note: "Chords from Chordify: G-C-D-Gm. Listen and verify — especially the Gm."
      },
      what: "Glyders' Geneva Strangemod uses G-C-D-Gm (Chordify source — hit play to verify). Three major chords that feel sunny, until the Gm arrives and everything shifts. The Gm is the surprise — a major→minor twist.",
      setup: "Guitar. Listen to the song. Metronome at ~90 BPM.",
      chordVoicings: { chords: ["G", "C", "D", "Gm"] },
      steps: [
        { text: "Play G-C-D in a loop, 1 bar each, with a relaxed strum at 85 BPM. This is a completely standard I-IV-V in G major — the most common progression in pop music. Feel how normal, how predictable it is. Nothing surprising here.", why: "Setting up the expectation is half the trick. G-C-D is so common that your ear relaxes — it knows what's coming. The Gm is going to break that expectation, and the surprise only works if the setup feels predictable." },
        { text: "Now add the Gm: G (1 bar) → C (1 bar) → D (1 bar) → Gm (1 bar). Play the loop. Feel the Gm hit — that moment when the expected return to G major is replaced by G minor. The ear goes 'wait, what?' That's the modGlyders' trick.", why: "Replacing the tonic major with its parallel minor is a harmonic sleight-of-hand. The root note (G) stays the same, but the quality shifts. The listener's expectation (sunny resolution) is subverted (shadow). This creates emotional depth from a simple substitution." },
        { text: "Try different Gm voicings: full barre (355333), simplified (3x0333), or even Gm7 (353333). Find the voicing that your fingers can reach cleanly at tempo. The SOUND matters more than the shape — as long as the minor quality comes through.", why: "Real-world playing means choosing the voicing that works for the musical moment. Full barre Gm sounds thick and dark. Simplified Gm sounds more open. Gm7 adds a jazzy softness. Each creates a slightly different emotional shade." },
        { text: "Play the full G-C-D-Gm progression 8 times through. By the 4th or 5th time, the Gm starts to feel expected — but it never loses its emotional weight. The surprise fades, but the color remains. That's the difference between a gimmick and a harmonic choice.", why: "A gimmick only works once. A great harmonic choice works every time because the emotional content is inherent, not just surprising. Gm after D will ALWAYS feel like a shadow, no matter how many times you hear it." },
        { text: "Add dynamics: play G-C-D with a medium strum, then drop to a softer strum for Gm. The Gm is the intimate moment — pull back, let it breathe. Then return to medium for the next G. The dynamic shift reinforces the emotional shift.", why: "Matching dynamics to harmonic content is instinctive arrangement. When the chord gets darker, the volume gets softer — like a conversation that suddenly gets serious. This dynamic awareness makes even simple progressions feel produced." }
      ],
      feel: "The G-C-D should feel like driving with the windows down on a warm day. The Gm should feel like a cool shadow falling across the car — brief, unexpected, but beautiful. The loop should feel like alternating between sunlight and shade.",
      wrong: "If the Gm doesn't feel surprising, you might be rushing through the G-C-D — slow down and really settle into the major territory before the minor arrives. If the Gm sounds out of place (wrong, not surprising), check your voicing — make sure the Bb is clean. If the whole progression sounds generic, add the dynamic drop on Gm.",
      sarah: "Gene, Geneva Strangemod is a perfect example of how one chord can transform a song. G-C-D is the most basic progression on earth — every campfire guitarist knows it. But that Gm at the end turns it into something specific, something with character. This is what separates your taste from 'dude with acoustic guitar' — you hear the shadows in the sunlight.",
      metronome: 90,
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      levelUp: "Play G-C-D-Gm at 90 BPM 4 times through with clean transitions and a dynamic drop on the Gm, and identify the emotional moment where Gm replaces the expected G major."
    },

    // ─── PHASE 5: BARRE + OPEN VOICINGS ───

    {
      id: "gs-6-9",
      time: 8,
      title: "Song Study: Catamaran (Allah-Las)",
      type: "guitar",
      songRef: {
        title: "Catamaran — Allah-Las",
        youtubeId: "yIJ-RsIO1eA",
        note: "Chords from GuitarTabsExplorer: Am-C-D-Dm. The D→Dm shift is the emotional core. Listen and verify."
      },
      what: "Allah-Las' Catamaran uses Am-C-D-Dm — a minor progression where the D→Dm shift creates dark restlessness. (Chords from GuitarTabsExplorer — hit play to verify.) The darker side of jangle.",
      setup: "Guitar. Listen to the song first. Metronome at ~90 BPM.",
      chordVoicings: { chords: ["Am", "C", "D", "Dm"] },
      steps: [
        { text: "Play Am-C-D-Dm, 1 bar each, at 80 BPM. Feel the emotional arc: Am is grounded and minor. C lifts slightly. D opens up — major, bright. Then Dm falls — the brightness collapses into shadow. The D→Dm is the heart of the progression.", why: "This progression tells a story in 4 chords: starting in minor territory (Am), passing through neutral (C), arriving at a bright moment (D), then watching it darken (Dm). The D→Dm shift is the narrative twist — the happy moment that doesn't last." },
        { text: "Focus on the D→Dm transition. Play just these two chords: D for 2 bars, Dm for 2 bars, 8 times. This is the same major→minor shift you learned in gs-6-7, now deployed in a specific song context. Feel how it lands differently within the Am-C framework.", why: "Context changes meaning. D→Dm in isolation is a generic major→minor shift. D→Dm after Am-C is a narrative event — a brief moment of brightness that fades. The surrounding chords give the shift a story." },
        { text: "Bring the tempo to 90 BPM. Play Am-C-D-Dm with the jangle strum (down, soft up, down). Let the open strings ring — especially on Am and C, which have open strings built into their standard shapes. The Dm should feel slightly more closed and intimate.", why: "At tempo, the progression becomes a groove. The jangle strum you learned on Cmaj7-Dmaj7 works here too — the open strings in Am (open E) and C (open E, open B) create continuity. When you hit Dm, the loss of the F# (replaced by F) darkens the shimmer." },
        { text: "This is the Allah-Las descending minor tradition in action. Am-C-D-Dm maps roughly to i-bIII-IV-iv — a progression that orbits the minor key without ever fully resolving. Compare it to the classic Am-G-F-E (i-bVII-bVI-V) that defines psych-surf. Both are descending, both are minor, both create restless beauty.", why: "Understanding the harmonic tradition your favorite songs come from lets you write in that tradition. The Allah-Las aren't inventing from scratch — they're working within a lineage of LA psych-surf harmony. Now you know the lineage too." },
        { text: "Play Catamaran 4 times through. On the 3rd and 4th times, experiment with dynamics: build the Am-C section slightly louder, then pull back for D-Dm. The D-Dm moment should feel intimate, like a confession.", why: "Dynamic shaping over a chord loop creates arrangement even when the chords are simple. Building and releasing volume over a 4-bar cycle gives the progression a breathing quality that flat dynamics can't achieve." }
      ],
      feel: "Catamaran should feel restless — not frantic, but unable to settle. The Am wants to pull you down, the C lifts momentarily, the D offers brightness, and then the Dm takes it away. It's a beautiful unsettled loop.",
      wrong: "If the progression feels static, add the dynamic build-and-release. If D→Dm doesn't hit emotionally, you might be rushing through it — give each chord a full bar to breathe. If the whole thing sounds too dark, check that your D major is actually major (F# on the high E string, 2nd fret) before it shifts to Dm (F natural, 1st fret).",
      sarah: "Gene, Catamaran is the darker cousin of Worship the Sun. Where Worship floats on maj7 shimmer, Catamaran churns on the D→Dm shift. The Am-G-F-E descending minor progression is the DNA of LA psych — from The Seeds in the 60s through Allah-Las today. It's all the same harmonic language, just different dialects. You're learning the dialect now.",
      metronome: 90,
      tracks: [{ name: "Psych Rock 120", src: "/psych-rock-120.mp3" }],
      levelUp: "Play Am-C-D-Dm (Catamaran) at 90 BPM 4 times through with clean transitions, dynamic shaping, and the D→Dm shift clearly articulated."
    },
    {
      id: "gs-6-10",
      time: 8,
      title: "Song Study: Get Away (Babitha)",
      type: "guitar",
      songRef: {
        title: "Get Away — Babitha",
        youtubeId: "eLMBpUk5wPo",
        note: "Chords from Chordify: E-F#-G#m-E7. Note: F# is MAJOR (not F#m). Listen and verify."
      },
      what: "Babitha's Get Away uses E-F#-G#m-E7 (Chordify source — hit play to verify). Note: F# is major, not minor. E7 is the 'lazy jazz chord' — an E major with the D string open, adding the flat 7th. This song mixes barres, open voicings, and jangle.",
      setup: "Guitar. Listen to the song. Metronome at ~85 BPM.",
      chordVoicings: { chords: ["E", "F#", "G#m", "E7"] },
      steps: [
        { text: "Learn E7 (020100). Start from E major (022100). Lift your ring finger off the D string (2nd fret) to leave it open. The open D string is the flat 7th (D) of E — it adds a bluesy, unresolved quality. Strum E, then E7, back and forth. E is clean. E7 has a lazy, jazzy lean to it.", why: "E7 is another open-string trick — the open D string adds the b7 interval to E major. Like Cmaj7 and Dmaj7, an open string changes the chord's character. But where maj7 is dreamy, the dominant 7th is bluesy and casual." },
        { text: "Play the Get Away progression: E (1 bar) → F# (1 bar, barre at fret 2) → G#m (1 bar, barre at fret 4) → E7 (1 bar). The first three chords are a familiar barre-chord-world exercise. The E7 at the end is the jangle moment — open strings after a stretch of barre shapes.", why: "This progression mixes two techniques: barre chord movement (E-F#-G#m, all shapes sliding up the neck) and open voicing (E7). The contrast between the closed barre sound and the open E7 creates textural variety — tight-tight-tight-open." },
        { text: "Focus on the G#m→E7 transition. You're going from a barre at fret 4 to an open chord. Release the barre and let your fingers settle into the E7 shape. This transition should feel like exhaling — the tension of the barre releases into the openness of E7.", why: "Going from barre to open voicing is physically relieving — your hand unclenches. That physical relief mirrors the emotional shift in the chord progression. The G#m (minor, tense) resolving to E7 (bluesy, relaxed) is both a harmonic and a physical release." },
        { text: "Play the full progression at 85 BPM, 4 times through. Use a steady eighth-note strum (constant arm motion) for E-F#-G#m, then switch to a softer, more open strum for E7. Let the E7 breathe — it's the release after the barre tension.", why: "Adapting your strum technique to match the chord voicing is an advanced skill. Barres respond well to tighter strumming (all strings fretted, nothing to ring freely). Open chords respond to lighter strumming (open strings want space to vibrate)." },
        { text: "Try Get Away with a fingerpicked E7: thumb on low E, index on G, middle on B, ring on open high E. The open D string rings alongside. Compare fingerpicked E7 to strummed E7 — fingerpicking reveals the individual voices in the chord, especially the bluesy D against the clean E.", why: "Fingerpicking E7 exposes the b7 interval clearly. When you strum, the D blends in. When you fingerpick, you hear each note — and the D's bluesy clash with the E root becomes vivid. This clarity helps your ear learn to identify dominant 7th quality." }
      ],
      feel: "The progression should feel like a journey: E is home, F# is stepping out, G#m is the furthest point (tension, barre, minor), and E7 is coming home but looser, more relaxed than where you started. The E7 is home with its shoes off.",
      wrong: "If E7 sounds muddy, check that the G string is fretted cleanly at the 1st fret and the open D string is ringing. If the barre chords (F# and G#m) are buzzing, review Level 5 technique — index finger on the bony side, thumb behind the neck. If the transition from G#m barre to E7 is slow, practice just that change in isolation — 10 clean transitions in a row.",
      sarah: "Gene, Babitha is from that Australian psych-surf world you love — same scene as Babe Rainbow and Royel Otis. Get Away is a perfect bridge between your barre chord work from Level 5 and the open-string jangle you're learning now. The E7 at the end of the progression is the payoff — after the effort of the barres, the open strings ring out like a reward. And that open D string on the E7? That's the same trick as the open E on Cmaj7, just applied to a dominant 7th instead of a major 7th.",
      metronome: 85,
      levelUp: "Play E-F#-G#m-E7 (Get Away) at 85 BPM 4 times through with clean barre chords on F# and G#m, and a ringing, open-string E7 with the b7 (D) audible."
    },

    // ─── PHASE 6: JANGLE IMPROV & CREATION ───

    {
      id: "gs-6-11",
      time: 8,
      title: "Jangle Improv — Build Your Own Shimmer",
      type: "guitar",
      what: "Create your own jangle progression using the chords from this level. Your palette: Cmaj7, Dmaj7, Dsus2, Asus2, Em, Am, D, Dm, G, Gm, E7. Choose 3-4 chords that sound good together. The rule: at least one chord must have an open string ringing as a maj7, sus2, or dominant 7th. Record your progression.",
      setup: "Guitar. Metronome at 75-90 BPM (your choice). Optional backing track.",
      chordVoicings: { chords: ["Cmaj7", "Dmaj7", "Dsus2", "Asus2", "Em", "Am", "E7"] },
      steps: [
        { text: "Pick 3-4 chords from your Level 6 palette. Try different combinations: Cmaj7-Am-Dsus2? Em-Cmaj7-Dmaj7-E7? Asus2-Dm-G-Cmaj7? Strum each combination for 4 bars and listen. Not all combinations will sound good — that's the point. Find one you love.", why: "Chord selection is the first songwriting decision. By trying multiple combinations, you're developing harmonic taste — learning which chord sequences resonate with you personally. There are no wrong answers, only preferences." },
        { text: "Once you've chosen your 3-4 chords, decide the rhythm: one chord per bar? Two chords per bar for some, one for others? The rhythm of chord changes affects the pacing — faster changes feel energetic, slower changes feel dreamy.", why: "Harmonic rhythm (how fast the chords change) is as important as which chords you choose. The Allah-Las float works because it changes slowly. Sun Room's energy comes from faster changes. Your choice of rhythm defines the feel." },
        { text: "Play your progression for 2 minutes straight. Don't change it — commit. Let the repetition reveal the progression's character. By the second minute, you'll hear things you didn't notice in the first 30 seconds.", why: "Commitment to a loop reveals depth. Most beginners abandon progressions too quickly, thinking they're 'boring.' But boredom is often the doorway to deeper listening — the subtle interactions between chords emerge only through repetition." },
        { text: "Now add one variation: substitute one chord with its major or minor alternate, or with a sus2 version. Play the original 4 times, then the variation 4 times. Does the variation add something? Keep whichever version feels better.", why: "Small variations on a committed progression are how songs develop. You're not rewriting — you're evolving. One chord substitution can transform a verse into a chorus or a bridge." },
        { text: "Record your final progression — 8 bars minimum. Play it with the jangle strum, let the open strings ring, and add dynamic variation (softer on the dreamy chords, slightly louder on the grounded ones). This is your first jangle composition.", why: "Recording makes it real. You've moved from learning someone else's chords to creating your own. The jangle palette you've built in this level is now a creative tool, not just a collection of shapes." }
      ],
      feel: "This should feel like ownership — you're not playing someone else's song, you're playing YOUR chords. The progression should feel like it belongs to you. If it sounds like it could be on a levitation room or Allah-Las record, you've internalized the style.",
      wrong: "If every combination sounds the same, you're probably using only dreamy chords (all maj7 and sus2). Add a grounded chord (Am or Em) for contrast. If nothing sounds good together, try Cmaj7-Em-Dmaj7-Am as a starting point — this is a reliable jangle template. If your progression sounds too 'normal,' make sure at least one chord has the open-string shimmer.",
      sarah: "Gene, this is where it gets personal. You've learned the vocabulary — Cmaj7, Dmaj7, sus2, major→minor shifts, E7. Now you're using it to say something of your own. The best jangle guitar isn't about knowing lots of chords — it's about choosing a few that resonate with YOU and committing to them. Allah-Las built a career on basically three chord tricks. Find your three.",
      metronome: 80,
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }, { name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      recorder: true,
      levelUp: "Create and record an original 3-4 chord jangle progression using at least one open-string voicing (maj7, sus2, or E7), played for 8+ bars with the jangle strum and dynamic variation."
    },
    {
      id: "gs-6-12",
      time: 10,
      title: "Extended Jangle Jam — 5 Minutes of Shimmer",
      type: "guitar",
      what: "Record a 5-minute jangle jam using everything from this level. You can use your own progression from gs-6-11, combine it with song progressions you learned, or shift between different progressions mid-jam. The only rule: open strings ring. Let the shimmer build. This is your Level 6 graduation piece.",
      setup: "Guitar. Metronome at 80-100 BPM (your choice). Backing track optional. Recording ON.",
      chordVoicings: { chords: ["Cmaj7", "Dmaj7", "Dsus2", "Asus2", "Em", "Am", "D", "Dm", "E7"] },
      steps: [
        { text: "Choose your starting progression. It can be Cmaj7-Dmaj7 (the Allah-Las float), Em-Dmaj7 (Friends), your own creation, or anything else from this level. Start playing and don't stop for 5 minutes. The timer is running. Record.", why: "Five minutes is longer than most people play without stopping. The extended duration forces you past the 'performing' phase into the 'playing' phase — where you stop thinking about chord names and start feeling the music." },
        { text: "After 2 minutes, introduce a change: shift to a different progression, add a chord, change the strum pattern, alter the dynamics. Let the change emerge naturally — don't plan it. Just follow your ear.", why: "Spontaneous musical decisions are the foundation of improvisation and live performance. You're training your instinct to make musical choices in real time, without stopping to think." },
        { text: "Somewhere in the middle, try the major→minor shift: whatever chord you're playing, find its parallel minor (D→Dm, G→Gm). Drop into the shadow for 4-8 bars, then return to the major version. Feel the contrast.", why: "Deploying the major→minor shift within an improvised jam proves you've internalized it as a tool, not just a memorized exercise. When you reach for it spontaneously, it's part of your vocabulary." },
        { text: "In the last minute, simplify. Return to your favorite progression from the jam and play it with less — softer strums, more space, let the strings ring longer. End by letting the last chord decay into silence. Don't rush the ending.", why: "Ending well is an underrated skill. The instinct is to keep playing or to stop abruptly. A deliberate fade — getting softer, simpler, letting the last chord dissolve — creates a satisfying arc for the whole jam." },
        { text: "Listen back to the full 5-minute recording. Find the best 30-second stretch — the moment where the jangle felt most natural, most 'you.' That section is your jangle identity forming.", why: "Self-listening after extended play reveals your instincts. The moments you gravitate toward are clues to your musical personality — your default chord choices, your natural dynamics, your comfort zone. These become the foundation of your sound." }
      ],
      feel: "This should feel like a meditation — you're not performing, you're exploring. The jangle builds and recedes, progressions shift and return, dynamics rise and fall. Five minutes is long enough to get lost in the sound. Let yourself get lost.",
      wrong: "If you run out of ideas before 5 minutes, return to the simplest progression (Cmaj7-Dmaj7) and just strum slowly. Repetition IS the content in jangle guitar — you don't need new ideas, you need to go deeper into the ideas you have. If you can't stop thinking about chord names, close your eyes and focus on the sound instead of the shapes.",
      sarah: "Gene, this is where jangle goes from 'thing I learned' to 'thing I do.' Five minutes of open strings, shimmer, and dreamy chords. Channel the 1970s Fender through the Twin Reverb Blackface. Channel the golden hour on the beach. Channel the sound of Allah-Las and levitation room and Babitha and all the artists who found beauty in ringing open strings and simple progressions. This is your level — you've earned the shimmer.",
      metronome: 85,
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }, { name: "Psych Rock 120", src: "/psych-rock-120.mp3" }, { name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      recorder: true,
      levelUp: "Record a 5-minute jangle jam using at least 3 different chord voicings from Level 6, with at least one major→minor shift, dynamic variation, and a deliberate ending — then identify your best 30-second stretch."
    }
  ]
};
