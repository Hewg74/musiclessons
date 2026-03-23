import { getPitchRange } from "../appData.js";

export const level13 = {
  level: 13,
  title: "The Full Palette",
  subtitle: "Every style, every scale, every technique — deployed on demand. You choose the color.",
  description:
    "You've spent 12 levels building individual colors — surf strum, reggae skank, desert drone, soul groove, psych fuzz, jangle shimmer, fingerpicking, dynamic expression. Now you learn to CHOOSE. This is the integration level: same chords played five different ways, scale selection by ear, PReVaDe across genre boundaries, transcription by ear, and extended multi-style jams where you flow between worlds without stopping. The goal isn't to master a new technique — it's to deploy everything you already know, on demand, with intention.",
  artists: "All previous artists — this is the integration level",
  unlocks: "Your Sound (Level 14)",
  review: {
    label: "Level 12 Check-In",
    time: 5,
    exercises: ["gs-12-3", "gs-12-8"],
    prompt: "Play D→Dm with a volume swell on the transition (gs-12-3). Then play a PReVaDe cycle with dynamic variation (gs-12-8). Dynamics are expressive? Time to deploy the full palette."
  },
  exercises: [

    // ─── STYLE SWITCHING ───

    {
      id: "gs-13-1",
      time: 10,
      title: "Five Feels, One Progression",
      type: "guitar",
      what: "Play Am-G-C-D in five completely different styles: surf strum, reggae skank, fingerpicked, power chords with palm mute, and desert drone. The chords never change — YOUR approach does. This is the core integration exercise: same harmonic content, five emotional universes.",
      setup: "Guitar. Metronome starting at 85 BPM. Clean tone for surf/reggae/fingerpicking, add gain for power chords, back to clean for drone.",
      steps: [
        { text: "Surf strum: Am-G-C-D with constant arm motion, bright down-up pattern, let open strings ring. Think Allah-Las — reverb-drenched, jangly, every chord bleeds into the next. Play 8 bars at 120 BPM.", why: "Surf strum is your first color. The constant arm motion and ringing open strings create that shimmering, beach-at-golden-hour quality. This is the style you learned in Level 1 — it should feel effortless now." },
        { text: "Reggae skank: same Am-G-C-D, but now strum ONLY on the 'ands' — upbeats only, immediate palm mute after each chop. Short, percussive, bouncy. Drop the tempo to 85 BPM. Think Gimme Love.", why: "The skank transforms the same chords from shimmering surf into bouncy reggae. Nothing changed harmonically — the RHYTHM changed everything. This is why style switching is powerful." },
        { text: "Fingerpicked: same chords, PIMA pattern. Thumb handles bass notes (strings 5-6), fingers handle melody strings (3-2-1). Slow it down to 75 BPM. Think Jack Johnson's Breakdown — warm, intimate, close.", why: "Fingerpicking strips away the strum entirely. The same chords become intimate and conversational. Each note is individual, each voice in the chord speaks separately." },
        { text: "Power chords with palm mute: A5-G5-C5-D5. Drop the 3rds, palm mute the downstrokes, add some gain if you have it. 100 BPM, driving and aggressive. Think Pepper's Stormtrooper intro.", why: "Power chords remove all the color (no 3rd = neither major nor minor) and replace it with raw energy. The same progression goes from pretty to powerful. This is the SoCal switch." },
        { text: "Desert drone: keep the low A string droning open while you play fragments of G, C, D on the upper strings. Drop to 70 BPM. Sparse. Hypnotic. Quarter-tone bends on the melody notes. Think Tinariwen in the Sahara.", why: "The drone approach dissolves chord boundaries — everything floats over that constant A. This is the most meditative style, the furthest from the surf strum. Same four chords, completely different universe." }
      ],
      feel: "Each style switch should feel like changing the lighting in a room — same furniture, completely different mood. Surf is bright daylight. Reggae is a warm evening. Fingerpicking is candlelight. Power chords are a strobe. Drone is starlight.",
      wrong: "If all five styles sound similar, you're not committing to the transformation. The reggae should be NOTHING like the surf — different tempo, different attack, different feel. If you're blending styles, isolate each one and exaggerate its defining characteristic before trying to switch.",
      sarah: "Gene, this is the exercise that proves you've internalized everything. Allah-Las, Pepper, Jack Johnson, Tinariwen — these artists sound NOTHING alike, but they all use simple chord progressions. The magic isn't in the chords. It's in the approach. When you can make Am-G-C-D sound like five different bands, you own the full palette. Each exercise in this curriculum improves ONE specific skill. Now that you're combining skills, focus on your weakest link. If your chord transitions are clean but your strumming pattern falls apart when you add dynamics, isolate the dynamics — don't try to fix everything at once.",
      metronome: 85,
      chordVoicings: { chords: ["Am", "G", "C", "D"] },
      tracks: [
        { name: "Drums Only — Surf 120", src: "/drums-surf-120.mp3" },
        { name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" },
        { name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }
      ],
      recorder: true,
      levelUp: "Can play Am-G-C-D in all five styles with distinct character — a listener could identify each style with their eyes closed. Transitions between styles are smooth within 2 bars."
    },

    // ─── SCALE CHOICE ───

    {
      id: "gs-13-2",
      time: 10,
      title: "Scale Choice Game",
      type: "guitar",
      what: "A backing track plays. You decide: which scale fits? Am pentatonic for blues-rock? Sus pentatonic for desert? Dorian for soul? Phrygian for dark/Spanish? Blues scale for grit? This exercise trains your ear to match a scale to a groove — the FEEL determines the choice, not theory.",
      setup: "Guitar. Multiple backing tracks loaded. Fretboard diagram available for reference.",
      steps: [
        { text: "Start the Khruangbin-style backing track. Play Am pentatonic (A-C-D-E-G) over it for 1 minute. Listen to how it fits — does it lock? Does it feel right? Now switch to A Dorian (A-B-C-D-E-F#-G) over the same track. Notice the difference — Dorian adds that bright 6th (F#) that gives Khruangbin their sophisticated edge.", why: "Am pentatonic is the safe choice — it always works. Dorian adds color. Learning to hear the DIFFERENCE is the first step toward choosing scales intentionally instead of defaulting to pentatonic every time." },
        { text: "Switch to the desert blues backing track. Play A sus pentatonic (A-B-D-E-G — no 3rd). Feel the ambiguity — neither major nor minor. Now try Am pentatonic over the same track. The minor 3rd (C) changes the mood entirely — it's bluesier, more emotional, less floating. Which fits the desert groove better?", why: "Sus pentatonic is Tinariwen's scale — removing the 3rd creates tonal ambiguity that IS the desert sound. Pentatonic works too, but it's a different color. Hearing this distinction lets you choose the mood." },
        { text: "Switch to the soul-funk backing track. Try A Dorian (the F# makes it jazzy/soulful). Then try Am pentatonic (bluesier, rawer). Then try A natural minor (adds tension with the F natural). Which one sounds most like Skinshape? Which sounds most like a blues jam?", why: "Soul music lives in Dorian territory — that raised 6th is the 'sophistication' sound. Natural minor is darker, more classical. Pentatonic is rawer. Each scale creates a different shade of minor, and learning to pick the right one is what separates generic playing from genre-specific playing." },
        { text: "Switch to the surf rock track. Play Em pentatonic. Then try A Phrygian (A-Bb-C-D-E-F-G) — hear the Spanish/dark flavor from the flat 2nd (Bb). Then try A Phrygian dominant (A-Bb-C#-D-E-F-G) — the raised 3rd makes it Middle Eastern, BALTHVS territory. Each scale over the same backing track creates a different world.", why: "Phrygian and Phrygian dominant are your 'exotic' colors — they transform a standard rock track into something mysterious. BALTHVS uses these sounds constantly, blending Colombian cumbia with Turkish scales." },
        { text: "Final round — the 'blind test.' Put on any backing track. Close your eyes. DON'T play yet. Listen for 30 seconds and hear notes arise internally — let your auditory system suggest the scale before your fingers touch the fretboard. Hum what you hear. THEN play. After 2 minutes, identify which scale you were playing. Your audiated ear is smarter than your theory.", why: "The ultimate goal is audiated scale choice — your inner ear selects the color before your fingers or your brain get involved. The 30-second listen forces Gordon Stage 6 audiation: the auditory cortex activates and proposes notes before the motor cortex executes. When you can do this, you're improvising like a musician, not a student. The theory is a post-hoc explanation of what your inner ear already knew." }
      ],
      feel: "This should feel like choosing paint colors for a canvas — each scale is a palette, and the backing track is the canvas. The right scale makes the groove come alive. The wrong scale creates friction. Trust your ear to hear the difference.",
      wrong: "If every scale sounds the same to you over every track, slow down. Play each scale for a full 2 minutes over one track, then switch. The differences are subtle at first but become obvious with focused listening. If you default to Am pentatonic every time, force yourself to try Dorian or sus pentatonic first.",
      sarah: "Gene, here's the secret: Mark Speer doesn't think 'I'll play Dorian here.' He hears a groove and reaches for notes that match. His ear is trained from thousands of hours to pick the right color. This exercise accelerates that training — you're building the same intuition by trying every scale over every groove and hearing what clicks.",
      metronome: 80,
      fretboard: { scale: "am-pentatonic", position: 1, highlight: [] },
      tracks: [
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" },
        { name: "Desert Blues 75", src: "/desert-blues-75.mp3" },
        { name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" },
        { name: "Surf Rock 120", src: "/surf-rock-120.mp3" },
        { name: "Afrobeat 100", src: "/afrobeat-100.mp3" }
      ],
      recorder: true,
      levelUp: "Can identify which scale fits a backing track by ear within 30 seconds and improvise confidently in that scale for 2+ minutes. Can switch between at least 3 different scales over the same track and articulate why each one creates a different mood."
    },

    // ─── PReVaDe ACROSS GENRES ───

    {
      id: "gs-13-3",
      time: 10,
      title: "PReVaDe Genre Shift",
      type: "guitar",
      what: "Start a motif in surf style. Repeat it in surf. Then VARY it — not by changing notes, but by switching to reggae style. Same notes, same rhythm, new FEEL. Then deconstruct back to a single drone note. The PReVaDe variation isn't a note change — it's a WORLD change.",
      setup: "Guitar. Metronome at 90 BPM. Drums-only track recommended for neutrality.",
      steps: [
        { text: "PRESENT: Create a 2-bar motif using Am-G in surf style — bright, ringing, constant arm motion, reverb feel. Play it 4 times exactly. Let the listener memorize it. This is your theme. Keep it simple — the magic is in what happens NEXT.", why: "The Present phase establishes the theme in a specific sonic world. By playing it 4 times in surf style, you're declaring 'this is a surf piece.' The listener's expectations are set." },
        { text: "REPEAT: Play the identical motif 4 more times in surf style. Exact copy. No variation. This confirms the theme — the listener thinks they know where this is going. Repetition creates the expectation that variation will break.", why: "Repetition is what makes the upcoming variation powerful. Without enough repetition, the variation feels random. With enough, it feels like a deliberate artistic choice. 8 bars of identical surf establishes the world firmly." },
        { text: "VARY: Same notes, same rhythm — but switch to REGGAE. The Am-G motif is now skanked on the upbeats, muted between chops, bouncy. The NOTES didn't change. The WORLD did. Play this for 4-8 bars. Feel how the same melody lives in a completely different universe.", why: "This is the key insight of Level 13: variation doesn't have to mean different notes. Changing the STYLE is the most dramatic variation possible. The listener recognizes the melody but the context has shifted — it's like hearing a familiar face in a dream." },
        { text: "DECONSTRUCT: Dissolve the motif. Strip away the reggae rhythm. Let the Am ring as a single chord, then just the A root note, then silence between sparse plucks, then nothing. The piece returns to stillness.", why: "Deconstruction after a genre shift creates a sense of journey — surf → reggae → dissolution. The listener has traveled through two worlds and arrived at silence. This is how great improvisers end their musical stories." },
        { text: "Try the full cycle again with different genre shifts: start in fingerpicking → vary to power chords. Or start in desert drone → vary to soul groove. Record each attempt. The motif stays the same — only the world changes.", why: "Multiple genre-shift cycles prove the concept isn't limited to surf→reggae. Any style can transform into any other style. When you can do this fluently, you can take a listener on a journey across your entire palette within a single improvisation." }
      ],
      feel: "The genre shift should feel like a jump cut in a film — same scene, different lighting, different soundtrack. The motif is the constant. The style is the variable. When the shift lands, there's a moment of delighted surprise — 'oh, it's the same thing but it's NOT.'",
      wrong: "If the genre shift doesn't feel distinct, you're not committing to the new style. The reggae version should be UNMISTAKABLY reggae — upbeat only, muted, bouncy. If it sounds like slightly different surf, push harder into the reggae conventions. Exaggerate the difference.",
      sarah: "Gene, think about how Khruangbin can take a Thai funk melody and replay it over a Texas country groove — same notes, totally different world. Or how Pepper takes a reggae riddim and explodes it into rock. That's what you're doing here. The PReVaDe framework gives it structure, but the genre shift is the creative leap that makes it yours.",
      metronome: 90,
      chordVoicings: { chords: ["Am", "G"] },
      tracks: [
        { name: "Drums Only — Surf 120", src: "/drums-surf-120.mp3" },
        { name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" },
        { name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }
      ],
      recorder: true,
      phraseForm: { pattern: "PRVD", barsPerSection: 4, labels: { P: "Present (surf)", R: "Repeat (surf)", V: "Vary (genre shift)", D: "Deconstruct" } },
      levelUp: "Can perform a complete PReVaDe cycle where the Vary section changes STYLE (not notes) and a listener can clearly identify both the original and shifted genres. Can do this with at least 3 different genre-shift pairs."
    },

    // ─── TRANSCRIPTION ───

    {
      id: "gs-13-4",
      time: 12,
      title: "Ear Transcription Challenge",
      type: "guitar",
      what: "Pick a song from Gene's playlist — one with verified chords in the curriculum. Listen to it on YouTube. WITHOUT looking at tabs, figure out the chords by ear. Start with the bass notes (root of each chord), then determine major vs minor, then check your answer against the verified chords. This is the final ear-training challenge.",
      setup: "Guitar. Phone/speaker for playing the song. No tabs, no chord charts — ears only.",
      steps: [
        { text: "Choose a song you've studied in earlier levels — start with something simple like Dope & Smoke (Am-D, 2 chord families) or Real Love Baby (D-Em-G-A7). Play the song on your phone. Listen to the bass — hum the lowest note of each chord change. DON'T pick up the guitar yet. Just listen and hum the root movement.", why: "The bass note reveals the root of each chord. Humming it isolates the harmonic movement from the rhythmic complexity. Your ear has been training for this since Level 1 — you already know these bass movements from playing the songs." },
        { text: "Now pick up the guitar. Find each bass note on the low E or A string. Play along with the song, hitting ONLY the root notes in time with the chord changes. Don't worry about full chords yet — just the roots. Write them down: 'The roots are A, D' (for Dope & Smoke) or 'D, E, G' (for Real Love Baby).", why: "Finding roots on the fretboard connects your ear to the instrument. This is the foundation of transcription — once you have the roots, determining the chord quality (major/minor) is the next step." },
        { text: "For each root, determine: is it major or minor? Play a major chord on that root, then a minor chord. Which one matches the song? Listen for the 3rd — does it sound bright (major) or blue (minor)? If you're unsure, try both and let your ear decide.", why: "Major vs minor is the single most important quality distinction. Your Level 12 work on major→minor shifts means your ear is already sensitive to this difference. Trust what sounds 'right' — your ear knows more than you think." },
        { text: "Play through the entire song with your transcribed chords. Does it sound right? Where does it feel wrong? Those spots need another listen. Common mistakes: hearing a minor as major (or vice versa), missing a chord change on a weak beat, hearing the relative major/minor instead of the actual chord.", why: "Playing along is the verification step. Your ear will immediately flag spots where your transcription is wrong — the friction is audible. Each correction sharpens your transcription skill for the next song." },
        { text: "Check your transcription against the verified chords from the curriculum. How close were you? Even getting 2 out of 3 chords right on your first transcription is excellent. Note what you missed and why — was it a chord quality error? A root error? A missed chord change?", why: "The verification step closes the feedback loop. Transcription improves rapidly when you can see exactly where your ear was right and where it was fooled. Each song transcribed makes the next one easier." },
        { text: "Try a harder song: Sol Del Sur (C#m-B-F#) has a barre chord voicing that's harder to hear, or Texas Sun (Am-G-Em-Bm) has more chord changes. Same process — bass notes first, then quality, then verify.", why: "Graduating from 3-chord songs to 4-5 chord songs with barre voicings is the natural progression. C#m is harder to identify by ear than Am because it's less common as a home key — but the process is identical." }
      ],
      feel: "This should feel like detective work — patient, focused listening, testing hypotheses, refining. There's a deep satisfaction when your transcribed chords lock in with the recording and you realize you figured it out WITHOUT tabs.",
      wrong: "If you're guessing randomly, slow down. Go back to humming the bass notes. If you can't hear the bass clearly, try listening on headphones or a speaker with decent low-end. If major/minor distinction is hard, play the two options on guitar and compare — your ear will pick the match even if you can't hear it in isolation.",
      sarah: "Gene, every musician you admire learned songs by ear before tabs existed. Allah-Las figured out 60s psych records by rewinding cassettes. Tinariwen passed songs from player to player across the desert by ear. Tab websites are convenient, but ear transcription builds a connection between what you hear and what you play that tabs can never give you. Start with songs you already know — the chords are in your muscle memory, now train your ear to find them independently.",
      metronome: 100,
      recorder: true,
      levelUp: "Can transcribe the chord progression of a 3-chord song from Gene's playlist by ear, identifying both roots and chord quality (major/minor), with at least 80% accuracy. Can do it within 10 minutes."
    },

    // ─── MULTI-GENRE IMPROV ───

    {
      id: "gs-13-5",
      time: 12,
      title: "Multi-Genre Flow",
      type: "guitar",
      what: "A 10-minute improvisation that flows between styles without stopping. Start in any style. When you feel the energy shift, let the style shift with it. Surf drifts into reggae, reggae melts into soul, soul hardens into psych, psych dissolves into desert. The only rule: don't stop playing. Let the transitions happen naturally.",
      setup: "Guitar. Drums-only backing track for neutrality (any tempo). Recorder ON from the start.",
      steps: [
        { text: "Start anywhere — pick the style that feels most natural right now. Surf? Reggae? Fingerpicking? Desert drone? Play in that style for 2-3 minutes. Settle in. Establish a groove and a key. Don't think about switching yet.", why: "Starting with your most comfortable style builds momentum. You need to be IN the music before you can navigate between styles. The first 2-3 minutes are about establishing flow, not demonstrating range." },
        { text: "When you feel the first natural impulse to change something — a desire for more energy, more space, more groove — let that impulse guide a style shift. Don't force it. If you're playing surf and your body wants to bounce, let it become reggae. If you're playing reggae and your hands want to slow down, let it become desert. Follow the energy.", why: "Organic style transitions come from listening to your own playing and responding to what it wants to become. Forced transitions sound mechanical. The musician who follows their instinct creates transitions that surprise even themselves." },
        { text: "Navigate through at least 3 different styles during the 10 minutes. You might go surf→soul→desert→surf. You might go reggae→psych→fingerpicking→drone. There's no wrong path. The only requirement is that each style is DISTINCTLY itself for at least 1-2 minutes before transitioning.", why: "Spending at least 1-2 minutes in each style proves you can inhabit it fully, not just touch on it. Quick flickers between styles aren't flowing — they're fidgeting. Each style needs enough time to establish its own identity within the improvisation." },
        { text: "Pay attention to the transitions. What bridges surf to reggae? (Slow the strum, shift to upbeats.) What bridges soul to desert? (Drop the chord changes, drone on one note, add space.) The transitions are the most creative part — they're the moments where you're inventing something that isn't quite any genre.", why: "Transitions between styles are where your personal voice emerges. Every guitarist plays surf and reggae differently, but how you MOVE between them is uniquely yours. These liminal moments — neither surf nor reggae — might become your signature sound." },
        { text: "For the final 2 minutes, apply the audiation constraint: play nothing you didn't hear first. Every note, every chord, every strum — audiated before execution. This will slow your output dramatically. Let the improvisation dissolve naturally through this constraint: fewer notes because each one must be pre-heard, more space because audiation takes time, quieter because intention breeds restraint. The piece ends when the last audiated note fades.", why: "Ending with the audiation constraint (CLA, Gray 2018) transforms the final minutes from 'winding down' into the deepest musical state of the whole jam. When every note is pre-heard, the music becomes sparse, intentional, and profoundly musical. This previews the capstone exercise (gs-13-10) and gives your 10-minute improvisation an ending that sounds composed — because audiation IS real-time composition." }
      ],
      feel: "This should feel like a road trip through your musical landscape — each style is a different terrain, and you're driving through without stopping. The transitions should feel like cresting a hill and seeing a new vista. If you're grinning during the transitions, you've got it.",
      wrong: "If you keep defaulting to one style and can't leave it, practice the transition explicitly: play 4 bars of surf, then 4 bars of reggae, alternating. Build the transition muscle before attempting the freeform flow. If all your styles sound the same, go back to exercise gs-13-1 and exaggerate each one.",
      sarah: "Gene, this is what your favorite artists do live — Khruangbin's sets drift from Thai funk to Texas country to Iranian psych to dub reggae without a seam. They don't announce 'now we're switching styles.' It just flows. Your 10-minute jam is a miniature version of that. Don't overthink the transitions — your hands know more styles than your brain can track. Trust the palette you've built.",
      metronome: 85,
      tracks: [
        { name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" },
        { name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" },
        { name: "Drums Only — Surf 120", src: "/drums-surf-120.mp3" },
        { name: "Drums Only — Afrobeat 110", src: "/drums-afrobeat-110.mp3" }
      ],
      recorder: true,
      levelUp: "Can improvise for 10 continuous minutes, flowing through at least 3 distinct styles with organic transitions. A listener can identify each style and the transitions feel natural, not forced."
    },

    // ─── FEEL TOGGLE ───

    {
      id: "gs-13-6",
      time: 8,
      title: "The Feel Toggle",
      type: "guitar",
      what: "Take a single song — Texas Sun (Am-G-Em-Bm) — and toggle its feel across three axes: major vs minor voicing, behind-beat vs on-beat placement, clean vs dirty tone. Each toggle changes the mood dramatically. Same song, eight possible combinations. This is the expressive toolkit at full power.",
      setup: "Guitar. Metronome at 100 BPM. Gain/distortion available if you have it.",
      steps: [
        { text: "Play Texas Sun (Am-G-Em-Bm) straight — on the beat, clean tone, minor voicings as written. This is the baseline. Play through 4 times. Feel the song's natural melancholy groove.", why: "The baseline establishes your reference point. You need to know what the song sounds like 'normally' before you can appreciate what each toggle does to it." },
        { text: "Toggle 1 — TIMING. Play the same chords but push everything slightly behind the beat. Land every chord a split second late. Don't change anything else. Feel how behind-the-beat placement adds a lazy, dub-like quality — Khruangbin territory.", why: "Behind-the-beat feel is Mark Speer's signature. Same notes, same chords, but the late placement creates a hypnotic, floating quality. This single toggle transforms 'rock song' into 'chill jam.' Timing is feel." },
        { text: "Toggle 2 — TONE. Go back to on-beat timing but add gain/distortion. If you don't have a pedal, dig into the strings harder and turn up the amp. Same chords, same timing, but now it's gritty. Feel how distortion adds urgency and aggression — Mystic Braves territory.", why: "Tone toggle proves that the SOUND of the guitar is as expressive as the notes. Clean Am-G is gentle. Distorted Am-G is intense. Same harmony, completely different emotional message." },
        { text: "Toggle 3 — VOICING. Replace Am with A major. Replace Em with E major. Play A-G-E-Bm — suddenly the song feels brighter, more hopeful, almost country. The minor→major shift is DOPE LEMON's trick in reverse.", why: "Voicing toggle changes the harmonic color. Major where minor was creates an unexpected emotional lift. This is the most dramatic toggle — it changes the DNA of the song from melancholy to hopeful." },
        { text: "Combine toggles: behind-the-beat + dirty + major voicings. Or on-beat + clean + minor. Try at least 3 combinations. Record each one. Which combination sounds most like YOUR voice? Which feels most natural?", why: "When you combine toggles, you're creating your own arrangement of the song. Each combination is a production choice — and your preference reveals your artistic identity. The combination that feels most natural is a clue to your sound." }
      ],
      feel: "Each toggle should feel like flipping a switch — one thing changes and the entire mood shifts. When you combine toggles, the song becomes unrecognizable from the original. That transformation is the power of the palette.",
      wrong: "If the toggles don't feel different enough, exaggerate each one. Behind-the-beat should feel ABSURDLY late at first. Gain should be CRUNCHY. Major voicings should be obviously brighter. You can refine subtlety later — right now, make the differences dramatic.",
      sarah: "Gene, Leon Bridges and Khruangbin recorded Texas Sun — and even between those two artists, the song shifts feel depending on who's leading. Leon pushes it toward soul, Mark pulls it toward psychedelic dub. You're doing the same thing — finding which toggles pull the song toward YOUR world. The one that makes you nod your head without thinking is your natural feel.",
      metronome: 100,
      chordVoicings: { chords: ["Am", "G", "Em", "Bm"] },
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      recorder: true,
      levelUp: "Can play the same 4-chord progression with at least 3 different feel toggles (timing, tone, voicing) and each version sounds distinctly different. Can combine 2 toggles and maintain control."
    },

    // ─── COMPOSITION ───

    {
      id: "gs-13-7",
      time: 12,
      title: "Three-World Composition",
      type: "guitar",
      what: "Write a 3-section piece that uses at least 3 styles. Section A: surf or jangle. Section B: reggae or soul. Section C: desert or cinematic. Same key throughout (Am is recommended). Each section should feel like a different world, but the harmonic thread ties them together. This is composition as palette deployment.",
      setup: "Guitar. Pen and paper for structure notes. Metronome. Recorder ON.",
      steps: [
        { text: "Choose your key (Am recommended — most of your backing tracks are in Am). Write Section A in a style you love — surf jangle, psych shimmer, whatever calls to you. Keep it simple: 2-4 chords, 4-8 bars. Play it until it feels solid. Write down the chords and strum pattern.", why: "Starting with your strongest style builds confidence. Section A is your home base — the musical territory you know best. Limiting to 2-4 chords keeps the focus on style, not harmonic complexity." },
        { text: "Write Section B in a contrasting style — if A was surf, try reggae or soul. Same key, but the feel shifts dramatically. Maybe the chords change slightly (add a 7th for soul, simplify to two chords for reggae), but the KEY stays in Am. 4-8 bars.", why: "Section B introduces contrast. The style shift gives the piece its arc — from one world to another. Keeping the key consistent means the listener follows the journey harmonically even as the feel changes." },
        { text: "Write Section C in a third style — desert drone, cinematic fingerpicking, Afrobeat groove. This section should feel like arrival — the most spacious, the most atmospheric. It's where the piece breathes. 4-8 bars.", why: "Three sections in three styles creates a narrative arc. A→B→C feels like a journey. The third section should feel like the emotional destination — where the piece was heading all along." },
        { text: "Now stitch them together: play A→B→C without stopping. The transitions between sections are the hardest part. You might need 1-2 transitional bars between sections — a drum fill, a slowed chord, a sustained note. Find the bridge between worlds.", why: "Transitions are the craft of composition. A rough cut (abrupt shift) can work as a dramatic statement. A smooth transition (gradual tempo/style change) creates a flowing journey. Try both and see which serves your piece." },
        { text: "Play the complete piece 3 times. Refine the transitions. Record the best take. Listen back — does it feel like ONE piece in three movements, or three separate jams stitched together? The harmonic thread (same key) should make it feel unified despite the style shifts.", why: "Multiple takes and critical listening transform a sketch into a composition. The difference between 'three jams' and 'one piece' is usually the transitions and the sense of intentional arc. This is composition, not just improv." }
      ],
      feel: "This should feel like directing a short film — each section is a scene with its own mood, but the whole thing tells one story. When the transitions work, there's a sense of inevitability — of course surf leads to reggae leads to desert. It was always going there.",
      wrong: "If the sections feel disconnected, check the key — are you accidentally modulating? Stay in Am (or your chosen key) throughout. If the transitions are jarring, add a 1-bar 'bridge' between sections: hold the last chord of Section A while gradually shifting your strum pattern toward Section B. The chord is the anchor through the stylistic change.",
      sarah: "Gene, Hermanos Gutiérrez build entire albums this way — each track is a different cinematic world, but the album feels like one journey because the guitar tone and the key relationships hold it together. Your 3-section piece is a miniature album. The key is the thread. The styles are the scenes. You're the director.",
      metronome: 90,
      chordVoicings: { chords: ["Am", "G", "C", "D", "Em", "Dm"] },
      tracks: [
        { name: "Drums Only — Surf 120", src: "/drums-surf-120.mp3" },
        { name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" },
        { name: "Desert Blues 75", src: "/desert-blues-75.mp3" }
      ],
      recorder: true,
      levelUp: "Can compose and perform a 3-section piece using 3 distinct styles in the same key, with transitions that feel intentional. Total length: at least 1.5 minutes. The piece has a sense of arc — beginning, middle, destination."
    },

    // ─── SONG STUDY MASHUP ───

    {
      id: "gs-13-8",
      time: 10,
      title: "Song Study Mashup",
      type: "guitar",
      what: "Choose 2-3 songs from different levels and genres. Combine their elements into one piece. Maybe Sol Del Sur's C#m-B-F# progression with Texas Sun's behind-the-beat feel and Breakdown's fingerpicking pattern. Mashing up songs you've studied proves you can extract elements and recombine them — the core of finding your own sound.",
      setup: "Guitar. Reference recordings of chosen songs on phone/speaker.",
      steps: [
        { text: "Pick 2-3 songs you've studied in the curriculum that you love. Write down what you love about EACH one — is it the chord progression? The strum pattern? The feel? The tone? Example: Sol Del Sur (chord progression), Breakdown (fingerpicking technique), Texas Sun (behind-the-beat feel).", why: "Identifying WHAT you love about each song — not just that you love it — is the first step toward extracting those elements. Most songwriters work this way: 'I want the groove of Song A with the chords of Song B.'" },
        { text: "Take the chord progression from Song A. Play it using the technique from Song B. Add the feel (tempo, timing, dynamics) from Song C. You're Frankensteining a new piece from parts of songs you love.", why: "Recombination is how new music is created. Every artist you admire does this — Allah-Las recombine 60s psych with California surf. Khruangbin recombine Thai funk with Texas blues. You're doing the same thing consciously." },
        { text: "Play the mashup for 2-3 minutes. Does it work? Where does it feel natural? Where does it fight? If the fingerpicking pattern doesn't fit the chord voicing, adjust one of them. The mashup should feel like a NEW song, not three songs jammed together.", why: "Some combinations click immediately. Others resist. The resistance teaches you about genre conventions — why certain techniques belong to certain styles. The combinations that click reveal unexpected connections between genres." },
        { text: "Refine: keep what works, modify what doesn't. Maybe the fingerpicking needs to simplify to fit the reggae-adjacent chords. Maybe the behind-the-beat feel needs to push even further to blend the elements. Iterate until the mashup sounds like it was ALWAYS one piece.", why: "Refinement transforms a mashup from an exercise into a composition. When the seams disappear and it sounds like one organic piece, you've created something new from your influences. This is how artists develop their sound." },
        { text: "Record the final version. Then try a different combination of songs. Over time, the mashups that feel most natural will reveal your artistic DNA — which elements from which genres are YOURS.", why: "Repeated mashup experiments map your taste. If you always gravitate toward reggae rhythm + surf chords + fingerpicked technique, that's a clue to your sound. The mashup exercise is self-discovery through recombination." }
      ],
      feel: "This should feel like cooking — taking ingredients from different cuisines and discovering that they work together in a way you didn't expect. The best mashups surprise you. The mashup should feel like it was always meant to exist.",
      wrong: "If the mashup sounds like a mess, you're trying to combine too many elements. Simplify: take just ONE element from each song (chords from A, rhythm from B) and build from there. If the elements clash, try a different combination — not every mashup will work, and that's part of the process.",
      sarah: "Gene, Tommy Guerrero is the master of this — his instrumentals combine Ethio-jazz harmony, skate-punk energy, and bossa nova rhythm into something that sounds like nothing else. He didn't invent any of those elements. He just combined them in a way nobody else had. Your mashup is the same kind of alchemy. Take what you love from Sun Room, from Tinariwen, from Skinshape, and see what emerges.",
      metronome: 90,
      recorder: true,
      levelUp: "Can extract specific elements (chords, technique, feel) from 2-3 studied songs and combine them into a cohesive new piece that sounds intentional, not accidental. The mashup plays for at least 1 minute without falling apart."
    },

    // ─── EXTENDED PALETTE JAM ───

    {
      id: "gs-13-9",
      time: 15,
      title: "Extended Palette Jam — 15 Minutes",
      type: "guitar",
      what: "The culminating exercise. 15 minutes of recorded playing with every tool available — all styles, all scales, all techniques, all backing tracks. No structure required. This is a free-form demonstration of your full palette. Play what you feel. Switch when you want. Use what you know. This recording is your Level 13 portfolio.",
      setup: "Guitar. All backing tracks available. Recorder ON from the start. Set a 15-minute timer.",
      steps: [
        { text: "Press record. Start with silence — 4-8 beats of nothing. Let the anticipation build. Then begin with whatever calls to you. Don't plan. The first note, the first chord, the first strum — let it emerge.", why: "Starting from silence is a compositional choice. It frames everything that follows as intentional. The silence says 'I chose to begin HERE.' Let the first sound come when it's ready." },
        { text: "For the first 5 minutes, play freely in 1-2 styles. Don't rush to show everything you know. Settle into a groove and let it develop — feel your body adapt to the style's physical signature. Every technique you've learned has a physical fingerprint: surf strum = continuous arm flow. Reggae = wrist snap. Fingerpicking = individual finger independence. Desert = patient, minimal movement. Let your body inhabit whichever style calls to you. Depth in one style is more musical than surface-level touches of five styles.", why: "The temptation in a 15-minute jam is to showcase everything immediately. Resist. When you settle into one style, your body adopts its physical language — the posture, the arm motion, the finger engagement. That embodied commitment is what makes it sound authentic rather than sampled." },
        { text: "Between minutes 5 and 10, let the style shifts happen. Use what you practiced in gs-13-5 — organic transitions, following the energy. Try to visit at least 2 new styles. Use different scales over different sections — pentatonic for rock, Dorian for soul, sus pentatonic for desert.", why: "The middle section is where your palette unfolds. Each style transition should feel earned — motivated by musical energy, not by a checklist. The scale changes add color that matches the style shifts." },
        { text: "Between minutes 10 and 15, shift into audiation mode: hear every note before you play it. The jam naturally slows and deepens. You've been playing freely for 10 minutes — now apply the 'play nothing you didn't hear first' constraint. This creates a natural resolution as output drops to the most intentional, essential notes. Let the audiation pace determine the ending.", why: "Ending a 15-minute jam with the audiation constraint (imagine → sing internally → play) creates the most musical resolution possible. After 10 minutes of free playing, the sudden requirement to pre-hear every note naturally produces the sparse, intentional quality that great endings need. Aarhus 2021 showed this protocol equals full learning in 1/3 the time — applied here, it transforms the ending from 'winding down' into 'arriving at depth.'" },
        { text: "After recording, listen to the whole thing. Note the timestamps where something special happened — a transition that clicked, a scale choice that was perfect, a moment where you surprised yourself. These moments are data points about your emerging sound.", why: "Critical self-listening is the final skill. You're not just playing — you're learning what YOUR palette sounds like when deployed freely. The moments that excite you when you listen back are the seeds of Level 14: Your Sound." }
      ],
      feel: "This should feel like a journey — not a recital and not a checklist. You're playing for the joy of having all these tools and the freedom to use them. Some moments will be great, some will be mediocre, and that's fine. The 15-minute canvas is big enough for both.",
      wrong: "If you're anxiously switching styles every 30 seconds trying to 'show' everything, slow down. It's not a demo reel. Spend at least 2 minutes in each style before moving on. If you get stuck in one style for the entire 15 minutes, that's okay too — it might be telling you something about your natural home.",
      sarah: "Gene, Tinariwen's live jams go 20+ minutes. Khruangbin's live sets are one long flowing conversation. Tommy Guerrero records entire albums in single takes. This 15-minute jam is your chance to join that tradition — not as a student, but as a musician with a palette. Everything from Am pentatonic in Level 1 to genre shifts in this level — it's all available. Press record and let it flow. This recording is the proof that the palette is real.",
      metronome: 85,
      fretboard: { scale: "am-pentatonic", position: 1, highlight: [] },
      tracks: [
        { name: "Surf Rock 120", src: "/surf-rock-120.mp3" },
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Desert Blues 75", src: "/desert-blues-75.mp3" },
        { name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" },
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" },
        { name: "Afrobeat 100", src: "/afrobeat-100.mp3" },
        { name: "Bossa Nova 75", src: "/bossa-nova-75.mp3" },
        { name: "Cinematic Western 80", src: "/cinematic-western-80.mp3" },
        { name: "Drums Only — Surf 120", src: "/drums-surf-120.mp3" },
        { name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" },
        { name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" },
        { name: "Drums Only — Bossa 75", src: "/drums-bossa-75.mp3" },
        { name: "Drums Only — Afrobeat 110", src: "/drums-afrobeat-110.mp3" }
      ],
      recorder: true,
      levelUp: "Can record a 15-minute improvisation that includes at least 3 distinct styles with organic transitions, demonstrates scale choice awareness, and has a discernible arc (beginning, exploration, resolution). Listen back and identify 3+ moments you're proud of."
    },

    // ─── AUDIATED IMPROVISATION CAPSTONE ───

    {
      id: "gs-13-10",
      time: 10,
      title: "Audiated Improvisation — Play Nothing You Didn't Hear First",
      type: "guitar",
      drone: { root: "A", octave: 2, texture: "analog" },
      fretboard: { scale: "am-pentatonic", position: 1 },
      pitchContour: true,
      recorder: true,
      tracks: [
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" },
        { name: "Desert Blues 75", src: "/desert-blues-75.mp3" },
        { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }
      ],
      what: "The capstone audiation constraint: improvise over a backing track with one absolute rule — EVERY note must be audiated before it is played. No finger-pattern runs. No muscle-memory licks. No letting your hands wander. Hear it → sing it internally → play it. This will reduce your output to a crawl — 3-4 notes in a full minute is correct and expected. The constraint forces your auditory-cognitive system to lead, and your hands to follow. This is the full Audiate-Play-Transfer protocol.",
      setup: "Guitar. Backing track of your choice. Drone on A. Recorder on. Prepare for extreme slowness — this exercise redefines what 'playing' means.",
      steps: [
        { text: "Start the backing track. Listen for 30 seconds without touching the guitar. Let the groove enter your body. Now close your eyes and wait for a note to arise internally — not a finger pattern, not a shape you know, but an actual PITCH that you hear in your mind's ear. When you hear it clearly, sing it silently (feel it in your throat without voicing). Then — and only then — play it. One note. Let it ring.", why: "The Audiate-Play-Transfer protocol (Gordon Stage 6) requires pre-hearing: the auditory cortex activates BEFORE the motor cortex sends a signal to your fingers. Most guitarists reverse this — motor first, ears evaluate after. This exercise flips the order permanently. The 30-second wait ensures you're responding to the GROOVE, not to habit (CLA, Gray 2018: constraining output forces the auditory-cognitive system to lead)." },
        { text: "Wait for the next note to arise. It may take 15-30 seconds. That's correct. The silence between notes is not 'dead time' — it's audiation time. Your inner ear is composing. When the next pitch is vivid and you can feel it in your throat, play it. Two notes in a minute is a successful start.", why: "Aarhus 2021 demonstrated that combined mental imagery + vocalization + execution produces equal learning in 1/3 the time of execution alone. The extreme slowness is the learning signal: your brain is building new auditory-motor pathways that bypass the old finger-pattern shortcuts. 3-4 notes per minute means you're doing it correctly." },
        { text: "After 3 minutes, check in: are you actually audiating, or have your fingers started choosing notes? The diagnostic is simple — can you sing the note you're about to play BEFORE you play it? If you can't, you've reverted to motor-first. Stop, close eyes, re-enter the audiation state. The constraint is non-negotiable.", why: "The autopilot diagnostic catches the inevitable drift back to finger-pattern playing. Your motor system WANTS to take over — it's faster and more comfortable. But speed is not the goal. Intention is. Every note that passes the 'can I sing it first?' test is a note that came from audiation, not habit." },
        { text: "Minutes 4-7: you may notice that audiation gets slightly faster — notes arise every 10-15 seconds instead of 30. This is the brain adapting. Don't force it faster. Let the speed come naturally. If a phrase of 2-3 connected notes arises in your mind, play the whole phrase — but ONLY if you heard all the notes before your fingers moved.", why: "The speed increase is real learning in action — Pascual-Leone 1995 showed that mental practice reshapes motor cortex maps within a single session. The pathways from auditory cortex to motor cortex are strengthening in real time. Multi-note phrases are the natural evolution: your inner ear starts composing in connected ideas rather than isolated pitches." },
        { text: "Minutes 8-10: full audiated improvisation. The backing track grooves, your inner ear composes, your voice confirms internally, your fingers execute. Accept whatever tempo your audiation produces. If you play 15 notes in 3 minutes and every single one was heard first, that is a more advanced improvisation than 150 notes from muscle memory. Record the entire session. Listen back and ask: does every note sound INTENTIONAL?", why: "The final stretch tests sustained audiation under the fatigue of concentration. Your auditory-cognitive system has been leading for 10 minutes — that's a serious workout for a faculty most guitarists never engage. The recording should sound sparse, deliberate, and deeply musical — because every note was composed by your inner ear, not grabbed from a finger pattern. Zamorano 2025: interoceptive awareness (hearing yourself from inside) is trainable and directly predicts musical competence." }
      ],
      feel: "This should feel like meditation — stillness punctuated by moments of vivid intention. The silence between notes is full, not empty. When a note arises from audiation, playing it feels inevitable — like the only possible next note. If you feel frustrated by the slowness, that's the old motor-first habit protesting. Let it protest. The auditory system is learning to lead.",
      wrong: "If you're playing at normal speed with lots of notes, you've abandoned the constraint. Stop and restart with the 30-second listen. If you can't audiate at all (no notes arise internally), play a note on the guitar, remove it, hold its memory for 5 seconds, then audiate the next note from that starting point — use the memory of a real note as a springboard. If every note you audiate is the same (just A over and over), challenge yourself to hear a different interval — a 3rd above, a 5th, something unexpected. The constraint doesn't limit WHICH notes you hear; it only requires that you HEAR them first.",
      sarah: "Gene, this is the highest-level audiation exercise in the guitar curriculum — and it's perfectly suited to your contemplative approach. Mark Speer's sparse Khruangbin solos? Each note sounds like the only possible choice because he's hearing before playing. Tinariwen's communal playing? They audiate the interlocking parts — they HEAR how the lines fit before they play them. This exercise will permanently change how you improvise. Once your inner ear learns to lead, you'll never play an unintentional note again. Accept the crawl. 3-4 notes per minute, fully audiated, is more musical than 30 notes from autopilot.",
      metronome: null,
      levelUp: "Can improvise for 5+ minutes with every note audiated before playing — confirmed by the 'can I sing it before I play it' test. Output is sparse (10-30 notes total) but every note sounds intentional and musical. Recording reveals no muscle-memory runs or finger-pattern licks."
    }
  ]
};
