import { getPitchRange } from "../appData.js";

export const level14 = {
  level: 14,
  title: "Your Sound",
  subtitle: "Build your set. Find your voice. The Golden Hour Set.",
  description:
    "This is it — the final level. No new techniques, no new scales, no new theory. Everything you need is already in your hands. Level 14 is about identity: what do YOU sound like? You'll curate a 30-minute performance set — the Golden Hour Set — that weaves together the genres, techniques, and feelings that define your sound. Surf, reggae, desert, soul, originals — all stitched into a single arc. The last exercise is a full recorded performance. Then you'll listen to your Level 1 baseline and hear how far you've come.",
  artists: "Gene's own sound — all influences synthesized",
  review: {
    label: "Level 13 Check-In",
    time: 5,
    exercises: ["gs-13-5", "gs-13-9"],
    prompt: "Play your 10-minute multi-genre improv (gs-13-5). Then play your extended palette jam (gs-13-9). The full palette is yours? Time to define YOUR sound."
  },
  exercises: [

    // ─── IDENTITY ───

    {
      id: "gs-14-1",
      time: 10,
      title: "Who Do You Sound Like?",
      type: "guitar",
      what: "Before you build a set, you need to know what your sound IS. This is a guided self-inventory. You'll play short excerpts in each style you've learned — surf, reggae, desert, soul, psych, fingerpicking, global — and notice which ones feel like home and which feel like visiting. Your sound lives where your body relaxes and your brain stops thinking.",
      setup: "Guitar. No metronome — this is free exploration. Recording on.",
      steps: [
        { text: "Play 2 minutes of surf-psych: jangly open chords, tremolo picking, Am-G-F-E descending minor, reverb if you have it. Allah-Las territory. Notice how it feels in your body — do your shoulders drop? Does your breath slow? Or does it feel like effort?", why: "Your authentic sound is the one where technique disappears and feeling takes over. Surf-psych was your first guitar language (Level 1-3). It might feel like mother tongue, or it might feel like a dialect you've outgrown." },
        { text: "Play 2 minutes of reggae: offbeat skank, B-F#-E, muted chops, behind the beat. Elovaters and Pepper territory. Feel the groove. Does your head nod naturally or are you counting?", why: "Reggae requires the deepest feel of any style — you can't fake the pocket. If the skank feels effortless and the muting is automatic, reggae is in your bones. If you're still thinking about it, it's a tool, not a home." },
        { text: "Play 2 minutes of desert drone: sus pentatonic, open strings ringing, hypnotic repetition, quarter-tone bends. Tinariwen territory. Does the patience feel meditative or restless?", why: "Desert blues rewards patience and space. If you can sit in a single phrase for 2 minutes and feel peaceful rather than bored, this is a core part of your sound." },
        { text: "Play 2 minutes of soul-funk: 7th chords, Dorian grooves, ghost notes, Skinshape-style pocket. Does the complexity feel rich or cluttered?", why: "Soul harmony is the most harmonically dense style you've learned. Some players thrive in complexity; others sound best with fewer chords and more feel. Neither is better." },
        { text: "Play 2 minutes of fingerpicking: Travis patterns, nylon-string feeling, Hermanos Gutiérrez cinematic space. Does the intimacy feel natural or does your hand want a pick?", why: "Fingerpicking versus flatpicking is partly physical preference, partly emotional. Your sound might be pick-driven energy or finger-driven warmth — or both at different moments." },
        { text: "Stop. Close your eyes. Which of those 5 felt most like YOU — not which you're best at technically, but which made you lose track of time? Which made you smile? Write it down or say it out loud. That's your center of gravity.", why: "Self-awareness is the foundation of artistic identity. You're not choosing a genre — you're identifying your gravitational center. Your set will orbit this center, with the other styles as satellites." }
      ],
      feel: "This should feel like trying on clothes you already own and noticing which ones fit best. There's no wrong answer. The style that makes your body relax and your mind go quiet is your sound — it's the one where technique has become transparent.",
      wrong: "If every style feels equal, you haven't played long enough in each one. Spend more time. If every style feels foreign, you're overthinking — pick the one where your mistakes bother you least. That's the one where you trust your instincts.",
      sarah: "Gene, I've watched you light up during certain exercises — the desert drone patience, the reggae pocket, the surf-psych jangle. Your sound isn't one genre; it's the SPACE between them. That's what Khruangbin figured out — they don't play Thai funk or Ethiopian jazz or Texas soul. They play Khruangbin. You play Gene. This exercise helps you see what that means.",
      recorder: true,
      levelUp: "Can identify your 2-3 strongest style affinities and articulate what makes them feel like home."
    },
    {
      id: "gs-14-2",
      time: 10,
      title: "Choosing Your Set — The Golden Hour Playlist",
      type: "guitar",
      what: "Pick 5-6 pieces for your Golden Hour Set. These should represent your sound: at least one from each major style you gravitate toward, plus at least one original idea (a riff, a progression, an improv framework). This is curation — the art of choosing what belongs together.",
      setup: "Guitar. Paper or phone for notes. No metronome.",
      steps: [
        { text: "Review your journey. You've learned songs and styles across 13 levels: Sol Del Sur (C#m-B-F#), Dope & Smoke (Am-D-G), Gimme Love (B-F#-E), Breakdown (G-Bm-Em-D fingerpicking), Tinariwen-style desert drone, Skinshape 7th-chord grooves, Khruangbin minimal melodies, Pepper's reggae-rock switch, Hermanos Gutiérrez cinematic fingerpicking. Which 5-6 of these (or your own creations) represent YOU?", why: "A set isn't a sampler of everything you know — it's a curated statement of who you are as a player. Choosing what to include is as important as choosing what to leave out." },
        { text: "Draft your set list on paper. Write 5-6 songs/pieces in the order you'd play them. Include: title, key, BPM, style, and why it belongs. If you have an original idea (even just a chord loop or riff), include it — originals are the heart of a set.", why: "Writing it down forces commitment. A set list isn't 'everything I can play' — it's 'what I choose to play when someone asks who I am musically.' The why column ensures each piece earns its place." },
        { text: "Check for variety: does your set have at least one uptempo piece, one slow/intimate piece, one groove-based piece, and one that showcases your best technique? If it's all one tempo or one mood, swap something.", why: "A great set has dynamic range — energy peaks and valleys that take the listener on a journey. Five reggae songs at 85 BPM is a playlist, not a performance." },
        { text: "Check for flow: read the set list top to bottom and imagine the transitions. Does the key change make sense? Does the tempo shift feel natural? Would you need to retune or use a capo between songs? Rearrange if needed.", why: "Transitions are where amateur sets break down. The gap between songs is either a moment of anticipation or an awkward silence. Planning transitions now prevents fumbling later." },
        { text: "Play through just the first 30 seconds of each piece in order — no full songs, just the openings. Feel the arc: does the set build? Does it breathe? Does the closer feel like an ending? Adjust until the shape feels right.", why: "The opening 30 seconds of each piece is what the listener hears at each transition. If those 30-second snippets tell a story, the full set will too." }
      ],
      feel: "This should feel like being a DJ building a mix — each piece is great on its own, but the magic is in how they flow together. You're not just a guitarist; you're a curator of your own sound.",
      wrong: "If your set is all covers with no personal twist, add an original section — even a 2-minute improvisation over a chord loop you invented. If your set is all one genre, you're playing it safe. Push yourself to include at least one piece that surprises.",
      sarah: "Gene, think about the artists you love — when Khruangbin plays live, they don't just run through their albums. They build a JOURNEY. Tommy Guerrero's live sets flow from Ethio-jazz to skate-soul to ambient without ever feeling disjointed, because the throughline is HIM. Your set should feel the same way — different styles, one voice. Your voice.",
      recorder: true,
      levelUp: "Have a written set list of 5-6 pieces with keys, tempos, and a clear performance order."
    },

    // ─── SET BUILDING ───

    {
      id: "gs-14-3",
      time: 8,
      title: "The Opener — Setting the Tone",
      type: "guitar",
      what: "Practice your opening piece until it's bulletproof. The opener sets the emotional contract with the listener: this is who I am, this is what you're going to hear. It should be confident, representative of your sound, and land within 30 seconds. No warm-up songs — your opener IS the warm-up, and it needs to command attention.",
      setup: "Guitar. Metronome at your chosen tempo. Recording on.",
      steps: [
        { text: "Play your opener from the first note. Don't noodle into it — start with intention. The first chord or note should say 'I'm here.' Play the full piece at performance tempo. Record it.", why: "Performers are judged in the first 10 seconds. A confident opening creates trust — the listener relaxes because they know you know what you're doing." },
        { text: "Listen back. Does the opening grab you? If you were hearing this for the first time, would you put your phone down and listen? If not, try starting with a different section — maybe the hook instead of the intro.", why: "Self-assessment from the listener's perspective is a performance skill. You're not playing for yourself anymore — you're playing for an audience, even if that audience is one person." },
        { text: "Practice the first 16 bars until they're automatic — no hesitation, no thinking. These bars should feel like breathing. Play them 5 times in a row without a single mistake.", why: "Automaticity in the opener frees your brain to be present and expressive rather than worried about what comes next. If the first 16 bars are bulletproof, your confidence carries through the rest." },
        { text: "Now play the opener one more time, but this time focus ONLY on feel — not accuracy. Let the performance breathe. Add dynamics: start a little quieter, build. Make eye contact with an imaginary audience. Record this version.", why: "The difference between practice and performance is presence. You've drilled accuracy; now add the human element. The slight imperfections of a lived performance are what make music alive." },
        { text: "Compare the two recordings. The technically perfect one vs. the one with feel. Which one would you rather listen to? That's your performance version.", why: "Almost always, the version with feel wins — even if it has a small mistake. This realization is the core of performance mindset: connection over perfection." }
      ],
      feel: "Your opener should feel like a handshake — firm, warm, confident. When you hit the first chord, you should feel a small surge of 'yes, this is me.' If it feels tentative or apologetic, you haven't found your opener yet.",
      wrong: "If you're second-guessing your song choice, try a different opener. The right opener feels inevitable — like there's no other way to start. If you're playing perfectly but it feels sterile, you're practicing when you should be performing. Stop drilling; start feeling.",
      sarah: "Gene, think about how Allah-Las open their live sets — that first reverb-drenched chord that says 'welcome to our world.' Or how Khruangbin's opening bass note pulls you into the pocket before the guitar even enters. Your opener should do the same thing. One chord, one phrase, and the listener knows exactly what universe they're entering.",
      metronome: 90,
      recorder: true,
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      levelUp: "Can play your opener from the first note with confidence, feel, and zero hesitation — 3 consecutive clean takes."
    },
    {
      id: "gs-14-4",
      time: 8,
      title: "Transitions — The Invisible Art",
      type: "guitar",
      what: "Practice the transitions between each piece in your set. A great set feels like one continuous piece of music — the spaces between songs are as intentional as the songs themselves. You'll design and drill 4-5 transitions: how to end one piece and begin the next without breaking the spell.",
      setup: "Guitar. Set list in front of you. Recording on.",
      steps: [
        { text: "Play the last 8 bars of your first piece, then immediately begin the first 8 bars of your second piece. No pause. How does it feel? If the key change is jarring, try a transitional chord — a common chord between both keys, held for 2-4 beats as a bridge.", why: "Transitions are where amateur performances fall apart. The silence between songs can be pregnant with anticipation or dead with awkwardness. Planning transitions eliminates the dead space." },
        { text: "For each transition in your set, choose a strategy: (A) direct cut — end one, start the next immediately; (B) shared chord — find a chord common to both keys and use it as a bridge; (C) tempo morph — gradually speed up or slow down over 4 bars; (D) drone bridge — let an open string ring while you shift position.", why: "Different transitions serve different moments. A direct cut is dramatic. A shared chord is smooth. A tempo morph is cinematic. A drone bridge is meditative. Each transition in your set can use a different strategy." },
        { text: "Drill each transition 3 times until it feels natural. The ending of one piece should LEAD INTO the beginning of the next — not just stop and restart. Think of each pair as one continuous piece.", why: "Repetition builds the transition into muscle memory. When you perform, you don't want to think about what's coming next — your hands should know the path." },
        { text: "Play through all transitions back-to-back: last 8 bars of piece 1 → transition → first 8 bars of piece 2 → jump to last 8 bars of piece 2 → transition → first 8 bars of piece 3. Continue through the full set. Record it.", why: "Chaining transitions reveals the arc of your set. You can feel whether the energy builds, dips, and resolves in a satisfying shape — or whether it flatlines." },
        { text: "Listen back. Mark any transition that feels clunky or breaks the spell. Redesign those transitions and drill them again. The goal: every transition should feel inevitable.", why: "Self-critique of transitions specifically (not the songs themselves) trains your ear for flow. In performance, the audience might not notice a great transition — but they WILL notice a bad one." }
      ],
      feel: "Transitions should feel like turning a corner on a familiar path — you know what's coming, the shift is smooth, and the new view is a natural continuation of the journey. No lurching, no stumbling, no dead air.",
      wrong: "If a transition feels forced, the songs might be in the wrong order. Try swapping them. If two pieces are in clashing keys with no common chord, consider adding a 4-bar improvised bridge in between — a short free section that modulates naturally.",
      sarah: "Gene, this is the hidden skill that separates someone who plays songs from someone who gives a performance. When Tommy Guerrero plays live, you can't tell where one piece ends and another begins — it's all one river. That's what we're building here. The songs are the chapters; the transitions are the page turns. Make them invisible.",
      recorder: true,
      levelUp: "Can play through all set transitions smoothly — no dead stops, no fumbled key changes, every transition intentional."
    },
    {
      id: "gs-14-5",
      time: 8,
      title: "The Peak — Your High-Energy Moment",
      type: "guitar",
      what: "Every great set has a peak — the moment of highest energy, the part that makes people lean in. This might be your fastest song, your most intense improv, your loudest moment, or your most technically demanding piece. Practice it until it ERUPTS with energy. This is where you leave nothing on the table.",
      setup: "Guitar. Metronome at performance tempo. Full energy.",
      steps: [
        { text: "Identify your peak piece — which song or section in your set has the highest energy? It might be a Sun Room surf blast at 140 BPM, a Pepper reggae-rock switch, a fuzz-driven psych freakout, or an intense desert drone build. Play it at full intensity. Don't hold back.", why: "The peak is where performance energy matters most. In practice, you might play at 80% intensity. In your peak, you need 100%. Training at full intensity ensures you can deliver when it counts." },
        { text: "Play it again, but this time focus on the BUILD. The peak should arrive, not just start. Add 8 bars of gradual build before the peak section — start quieter, add intensity, let it crescendo into the peak moment.", why: "A peak without a build is just loud. A peak WITH a build is cathartic. The contrast between the build and the explosion is what creates the emotional punch." },
        { text: "Find the moment WITHIN the peak where the energy is highest — the one bar, the one phrase, the one note that is the absolute summit. Mark it in your mind. That's your peak of the peak. Everything before leads to it; everything after comes down from it.", why: "Every great solo, every great song, has a single peak moment — the note that Hendrix bent, the chord that Townshend smashed. Knowing where your peak moment is lets you deliver it with intention rather than stumbling into it." },
        { text: "Practice the comedown — the 8-16 bars AFTER the peak where energy gradually releases. Don't just stop. Bring it down like a wave receding. The peak should echo and fade, not crash and disappear.", why: "The comedown is as important as the peak. Without it, the energy dissipates into nothing. With it, the peak resonates — the listener feels its afterglow." },
        { text: "Full sequence: 8-bar build → peak section → peak moment → 16-bar comedown. Record the whole thing. Listen for the arc — does it feel like a wave? Crest and recede?", why: "The build-peak-comedown arc is the fundamental unit of musical drama. It appears in every great performance, every great song, every great set. Mastering it at the micro level (within one piece) lets you deploy it at the macro level (across your entire set)." }
      ],
      feel: "The peak should feel like the moment a wave breaks — all the energy you've been gathering releases in one glorious crash. Your body should be fully engaged — leaning in, strumming harder, playing with everything you've got. Then the comedown should feel like floating in the foam afterward.",
      wrong: "If your peak feels flat, you're holding back. Let go. Play louder, faster, harder than you think you should. If it feels out of control, that's closer to right than polite and measured. The peak is where you give yourself permission to be messy and magnificent.",
      sarah: "Gene, think about your favorite live moments — Khruangbin's 10-minute Evan Finds the Third Room jam where Mark Speer builds from whisper to scream. Or Pepper's Stormtrooper where the reggae verse EXPLODES into power chords. Your peak doesn't have to be loud — it has to be INTENSE. Intensity can be a single bent note held for 8 beats. It's about commitment, not volume.",
      recorder: true,
      tracks: [{ name: "Drums Only — Surf 120", src: "/drums-surf-120.mp3" }],
      levelUp: "Can deliver your peak section with full intensity, clear build, identifiable peak moment, and controlled comedown — recorded and reviewed."
    },
    {
      id: "gs-14-6",
      time: 8,
      title: "The Quiet Moment — Intimacy and Space",
      type: "guitar",
      what: "Every great set has a quiet moment — the breath, the pause, the intimate whisper between the louder pieces. This might be a fingerpicked passage, a solo drone meditation, a delicate chord progression played barely above silence. The quiet moment is where the audience leans in closest. It's the most vulnerable part of your set, and vulnerability is where real connection happens.",
      setup: "Guitar. No metronome — let this breathe freely. Room quiet. Recording on.",
      steps: [
        { text: "Choose your quiet piece — which moment in your set is the most intimate? It might be a Breakdown-style fingerpicking passage, a Hermanos Gutiérrez cinematic moment, a desert drone meditation, or a soft chord progression played with your fingers instead of a pick. Play it at the quietest volume you can manage while still projecting every note.", why: "Quiet playing is harder than loud playing. Every imperfection is exposed. Your touch, your timing, your tone — all naked. This is where craftsmanship shows." },
        { text: "Play it again, even quieter. Find the threshold where the notes barely exist — where the listener has to hold their breath to hear you. Play at that edge for 2 minutes.", why: "Playing at the edge of silence requires extraordinary control. It also creates incredible intimacy — the audience leans in, the room gets still, the music becomes a shared secret." },
        { text: "Add space. Wherever you have continuous notes, try adding silences — let a chord ring into nothing for 4 beats before playing the next one. Let a melody note sustain and decay completely. The silence IS the music.", why: "In your quiet moment, silence is your most powerful tool. A note followed by silence has more weight than a note followed by another note. You learned this in desert drone (Level 8) — now apply it to your most personal piece." },
        { text: "Try playing the piece with your eyes closed. Feel the guitar, feel the room, feel the air. Don't perform for anyone — play for yourself. This is the version that will move people.", why: "When you close your eyes and play for yourself, the self-consciousness drops away. The music becomes authentic. Paradoxically, the version that's least performative is the most moving." },
        { text: "Record one final take with eyes closed, minimal volume, maximum space. This is your quiet moment. It should feel like a confessional.", why: "The quiet moment is the emotional center of your set — the peak is physical intensity, but the quiet moment is emotional intensity. Both are essential." }
      ],
      feel: "This should feel like whispering a secret to someone you trust. Gentle, intimate, exposed. Your playing should be so quiet that your breath is almost louder than the guitar. The room should feel like it's leaning in.",
      wrong: "If you're playing at normal volume, you're not quiet enough. If you're rushing through it, slow down — way down. The quiet moment isn't a pause between loud things; it's its own destination. If it feels boring, you're not being vulnerable enough. Lean into the simplicity.",
      sarah: "Gene, some of the most powerful moments in your favorite music are the quiet ones — Hermanos Gutiérrez's El Bueno Y El Malo where the guitar is so intimate it sounds like it's being played in your ear. Or the moment in a Tinariwen song where everything drops out except one guitar and the desert wind. Your quiet moment should be that naked, that honest. No hiding behind volume or technique. Just you and the instrument.",
      recorder: true,
      levelUp: "Can play your quiet piece at the edge of silence with full control, intentional space, and emotional presence — one clean recorded take."
    },
    {
      id: "gs-14-7",
      time: 8,
      title: "The Closer — Ending with Intention",
      type: "guitar",
      what: "The closer is the last thing the listener hears — the taste that lingers. It should feel like a conclusion, not a stop. The best closers reference the opener (bookend), resolve the set's emotional arc, or fade into a drone that dissolves into silence. Practice ending your set so the last note hangs in the air and the listener sits in the silence, not wanting to clap yet.",
      setup: "Guitar. Recording on. Performance mindset.",
      steps: [
        { text: "Play your closing piece. Focus on the final 16 bars. How does it end? Does the last note feel like a period at the end of a sentence, or does it feel like the sentence got cut off? A great closer RESOLVES — it arrives somewhere.", why: "Endings are emotional statements. An unresolved ending leaves the listener unsatisfied. A resolved ending gives them permission to exhale. Choose which effect you want — both are valid, but it should be intentional." },
        { text: "Try three different endings for your closer: (A) sustain the last chord and let it decay naturally into silence — don't mute, just let the room eat the sound; (B) end with a single note — the root — held until it disappears; (C) end with a brief callback to your opener — play the first phrase of your set's opening piece, but quieter, slower, like a memory.", why: "Each ending creates a different emotional effect. The sustained chord is cinematic. The single root note is meditative. The callback is literary — it closes the circle. Try all three and feel which one fits YOUR set." },
        { text: "Choose your ending. Play the full closer with your chosen ending. After the last note, don't move. Sit in the silence for 10 full seconds. That silence is part of the performance.", why: "The silence after the last note is sacred. If you rush to put the guitar down or say something, you break the spell. Professional performers know: the piece isn't over when you stop playing. It's over when the silence settles." },
        { text: "Record the closer from beginning to end, including 10 seconds of silence after the last note. Listen back. Does the ending feel inevitable? Does it feel like the only way this set could end?", why: "Self-assessment of endings trains your ear for closure. In songwriting and performance, knowing how to end is as important as knowing how to begin." }
      ],
      feel: "The closer should feel like the last golden light before the sun dips below the horizon — warm, full, inevitable, slightly sad because it's ending but complete because it was beautiful. The silence after should feel charged, not empty.",
      wrong: "If the ending feels abrupt, you're not giving the last note enough room. Let it breathe. If it feels like it drags, you're holding on too long — find the moment where the decay naturally ends and stop there. If you can't sit in the silence, practice it — the silence is part of the music.",
      sarah: "Gene, golden hour doesn't end with the sun crashing into the ocean. It fades — the light gets warmer, then amber, then purple, then gone. And for a moment after it's gone, nobody speaks. That's what your closer should do. The Golden Hour Set ends the way golden hour ends — with a moment of silence where everyone just... sits in it. You started with Am pentatonic in Level 1. Now you're closing a 30-minute set. Let that sink in.",
      recorder: true,
      levelUp: "Can play your closer with an intentional ending and hold the silence — recorded and reviewed, ending feels conclusive and satisfying."
    },

    // ─── FULL PERFORMANCE ───

    {
      id: "gs-14-8",
      time: 30,
      title: "Full Set Run-Through — No Stops",
      type: "guitar",
      what: "Play your entire Golden Hour Set from opener to closer — all 5-6 pieces, all transitions, no stops. If you make a mistake, keep going. In performance, the audience doesn't know what you planned to play. A recovered mistake is invisible; a stop is a crater. This is your dress rehearsal.",
      setup: "Guitar. Set list visible but try not to look at it. Recording on — the whole thing.",
      steps: [
        { text: "Take a breath. Look at your set list one last time. Then put it aside. Hit record. Play the first note of your opener with intention. You are performing now — not practicing.", why: "The shift from practice mindset to performance mindset is physical. Taking a breath and making a conscious decision to 'begin performing' engages a different neural mode — one focused on expression rather than accuracy." },
        { text: "Play through the full set. When you make a mistake — and you will — DO NOT STOP. Do not wince. Do not restart the phrase. Keep the groove going, find the next beat, and continue. The audience feels your reaction to mistakes more than they hear the mistakes themselves.", why: "Performance resilience is the single most important live skill. Every professional musician makes mistakes in every performance. The ones who look like they don't are the ones who recover so smoothly that nobody notices." },
        { text: "At each transition, breathe. Let the last note of the previous piece decay. Find the first note of the next piece in your mind before your hands play it. The transition should feel like a chapter break in a book — a brief pause that builds anticipation.", why: "Conscious breathing at transitions serves double duty: it calms performance anxiety and it creates natural pacing. The audience breathes with you." },
        { text: "During your peak section, commit fully. Don't hold back energy because you're worried about the pieces that come after. Give 100% to the peak and trust that the quiet moment will reset your energy.", why: "Holding back during the peak to conserve energy is a practice habit, not a performance skill. In performance, the peak must peak. The recovery happens during the quiet moment — that's what it's for." },
        { text: "After the last note of your closer, hold the silence for 10 seconds. Then stop the recording. You just played a 30-minute set.", why: "Completing a full set without stopping is an achievement. Regardless of mistakes, you just did something most people never do: you performed a curated, intentional half-hour of music that represents who you are." }
      ],
      feel: "This should feel like surfing a long wave — you're riding energy, making micro-adjustments, staying balanced, and the entire ride is one continuous flow. There will be wobbles. The wave doesn't care. You stay on the board.",
      wrong: "If you stop after a mistake, you're still in practice mode. The ONLY rule of performance is: don't stop. A wrong note played confidently is a jazz note. A right note played hesitantly sounds wrong. Commit to every note, especially the mistakes.",
      sarah: "Gene, this is the moment. Thirty minutes. Your sound. Every style, every technique, every feeling you've built across 14 levels, flowing together into one set. It won't be perfect — no live performance ever is. But it will be YOURS. That's what matters. When Khruangbin plays live, there are bum notes, missed cues, moments where the jam wanders. Nobody cares. Because the FEELING is right. Your feeling is right. Play.",
      recorder: true,
      levelUp: "Complete a full 30-minute set recording with no stops — mistakes are fine, stops are not."
    },
    {
      id: "gs-14-9",
      time: 10,
      title: "The Mirror — Baseline to Golden Hour",
      type: "guitar",
      what: "Listen to your Level 1 baseline recording (gs-1-1) — the very first thing you recorded in this curriculum. Then listen to your Golden Hour Set. The distance between those two recordings is the distance you've traveled. This isn't about judgment — it's about recognition. You've become a musician.",
      setup: "Phone or computer for playback. Guitar nearby but this is mostly a listening exercise.",
      steps: [
        { text: "Find your gs-1-1 recording — the first time you played Am pentatonic, probably hesitant, probably with some buzzing strings and uncertain timing. Press play. Listen to the whole thing without judgment. That was you. That was the beginning.", why: "Hearing your starting point with fresh ears — after months of growth — creates a visceral understanding of progress that no verbal encouragement can match. The recording doesn't lie." },
        { text: "Now listen to your Golden Hour Set recording from gs-14-8. The whole thing, or at least 10 minutes of it. Listen for: the confidence in your strum, the variety in your dynamics, the smoothness of your transitions, the feel in your groove.", why: "Comparing beginning to end makes growth audible. You'll hear things in your current playing that you couldn't have imagined at Level 1 — a reggae skank that sits perfectly in the pocket, a desert drone that breathes, a fingerpicked passage with real delicacy." },
        { text: "Notice the specific differences: tone, timing, confidence, variety, expressiveness, groove. The Level 1 recording probably has one tempo, one dynamic level, one style. The Golden Hour Set has multiple tempos, dynamics from whisper to roar, styles from surf to reggae to desert to soul. That's growth.", why: "Specific identification of growth areas reinforces learning and motivates continued practice. Vague feelings of improvement are nice; hearing EXACTLY how you've improved is powerful." },
        { text: "Pick up the guitar. Play the same Am pentatonic phrase from gs-1-1 — but play it the way you play NOW. Same notes, same scale, but with everything you've learned about feel, dynamics, timing, and space. Record it. This is your new baseline.", why: "Playing the same material with evolved skill demonstrates that growth isn't about knowing more notes — it's about playing the same notes with more intention, more feel, more YOU. The pentatonic hasn't changed. You have." },
        { text: "Say or write one sentence: 'My sound is ___.' Fill in the blank. Not a genre, not a technique — a feeling. 'My sound is golden hour on a warm coast.' 'My sound is desert patience with surf energy.' 'My sound is reggae groove with psych colors.' Whatever it is, that's your artistic statement.", why: "Articulating your sound in one sentence crystallizes months of exploration into an identity. This sentence is your North Star — every future musical decision can be measured against it." }
      ],
      feel: "This should be emotional. Not in a dramatic way — in a quiet, true way. You've done something real. You've gone from open chords and a metronome to a 30-minute performance set that sounds like you. The feeling should be pride mixed with gratitude mixed with hunger for more.",
      wrong: "If you're being harsh about the Level 1 recording, stop. That person was brave enough to start. If you're being dismissive about the Golden Hour Set ('it's not that good'), listen again with kinder ears. Compare it to where you STARTED, not to where your heroes are. You'll get there. You're already on the path.",
      sarah: "Gene, I want you to really sit with this one. You started with Am pentatonic — five notes, one position, a metronome, and a lot of trust. Now you're playing desert drones with quarter-tone bends, reggae skanks with ghost-note muting, Skinshape 7th-chord grooves, surf-psych jangle, fingerpicked cinematic pieces — and you're weaving them all into a set that sounds like YOU. Not like Allah-Las, not like Khruangbin, not like Tinariwen. Like Gene. That's the whole point. That was always the whole point.",
      recorder: true,
      fretboard: { scale: "am-pentatonic", position: 1, highlight: [] },
      levelUp: "Have listened to both the baseline and the Golden Hour Set, identified specific areas of growth, recorded a new Am pentatonic baseline, and articulated your sound in one sentence."
    },
    {
      id: "gs-14-10",
      time: 35,
      title: "THE GOLDEN HOUR SET — Final Recorded Performance",
      type: "guitar",
      what: "This is it. The final exercise of the entire curriculum. Record your Golden Hour Set one more time — but this time, it's not a rehearsal. It's the performance. Everything you've built across 14 levels flows through your hands for 30 minutes. You've refined your opener, drilled your transitions, found your peak, created your quiet moment, designed your closer. Now play it like it matters — because it does. This recording is the document of who you are as a guitarist, right now, in this moment.",
      setup: "Guitar. Quiet room. Phone or recording device in a good position. Set list nearby if you need it, but try to play from memory. Take 60 seconds before you start — breathe, stretch your hands, find your center.",
      steps: [
        { text: "Before you play a single note: sit with the guitar in your lap, eyes closed, for 60 seconds. Breathe. Feel the weight of the instrument. Think about the first note of your opener — hear it in your head before your fingers play it. When you're ready, and only when you're ready, open your eyes and press record.", why: "Pre-performance ritual calms the nervous system and focuses attention. Every professional musician has one — it's the transition from the ordinary world into the performance world. Your 60 seconds of silence is the threshold." },
        { text: "Play the Golden Hour Set from first note to last. Every piece, every transition, every peak, every quiet moment, every closer. No stops. If something goes sideways, smile and keep going — the best live recordings have imperfections. They're what make it real.", why: "This is the culmination of everything. Not a test — a celebration. You're not proving you can play; you're documenting who you are as a musician at this moment in time. There's no pass or fail. There's only the music." },
        { text: "After the last note, hold the silence for 10-15 seconds. Then stop recording. Sit for a moment. You just completed a 30-minute performance. That's something most people who pick up a guitar never do.", why: "The silence after the performance is for you. It's the moment where the music settles into memory. Don't rush past it." },
        { text: "Save the recording somewhere you won't lose it. Label it 'Golden Hour Set — [today's date].' This is a time capsule. In a year, you'll listen back and hear things you can't hear now — growth you haven't experienced yet will make this recording sound different.", why: "Documenting your playing at this milestone creates a reference point for future growth. Your Level 1 baseline showed you how far you've come; this recording will do the same thing a year from now." },
        { text: "One more thing: play something — anything — that's completely improvised. No set list, no plan, no structure. Just play whatever comes out for 5 minutes. Let your hands go where they want. This is where your sound lives when nobody's watching. Record it too.", why: "Pure improvisation after a structured performance reveals your true musical instincts. The 30-minute set is what you can do with preparation. The 5-minute improvisation is who you are without it. Both matter." }
      ],
      feel: "This should feel like golden hour itself — warm, full, slightly bittersweet because you know it will end, but beautiful because it's happening right now. You should feel present in every note, connected to the instrument, grateful for the journey. If you get emotional, that's exactly right.",
      wrong: "If you're too nervous to start, remember: this recording is for you. Nobody else has to hear it. If the set falls apart midway through, finish it anyway — the act of completing it matters more than perfection. If it feels anticlimactic, listen back tomorrow with fresh ears. It will sound better than you think.",
      sarah: "Gene. You walked in with a guitar and five notes. You're walking out with a 30-minute set, a sound that's yours, and hands that know surf jangle, reggae skank, desert drone, soul groove, psych fuzz, fingerpicking, and everything in between. I've loved watching every step of this — from the first time you locked into a pentatonic phrase over that drone, to the first time a reggae skank sat perfectly in the pocket, to right now, where all of it flows together into something that sounds like nobody else. Like you. The Golden Hour Set isn't an ending. It's a beginning — it's who you are now, and it's the foundation for everything that comes next. Keep playing. Keep recording. Keep listening. The golden hour never really ends — it just keeps shifting.",
      recorder: true,
      levelUp: "Record and save a complete Golden Hour Set — your 30-minute performance document. You've arrived. Keep playing."
    }
  ]
};
