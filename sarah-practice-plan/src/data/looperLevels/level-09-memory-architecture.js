export const level9 = {
  num: 9, name: "Memory Architecture", focus: "Setlist Management + Patch Design",
  duration: "55 min",
  setup: "RC-505mkII with several completed songs saved in MEMORY slots. Effects chains configured.",
  exercises: [
    {
      id: "lo9ne1", time: 8, title: "Memory Slot Deep Dive", type: "looper",
      checklist: true,
      what: "Go beyond save/load and understand the full anatomy of a MEMORY slot. Each slot stores: loop audio per track, track FX settings, Input FX settings, track modes (Multi/Single), track play modes, tempo, quantize setting, and rhythm pattern. What a MEMORY slot does NOT store: master output level, input gain. These are hardware-level settings that persist globally. Navigate the MEMORY list with [MEMORY] button > VALUE knob. Explore Write Protect (prevent accidental overwrites) and Favorite (mark frequently-used slots for quick access).",
      setup: "RC-505mkII with at least one saved MEMORY slot containing loops and effects.",
      steps: [
        { text: "Press [MEMORY] to enter the memory browser. Scroll through slots with the VALUE knob. Load a slot with [ENTER]. Note how the tempo changes, tracks populate, and effects shift — all from one button press.", why: "A MEMORY slot is a complete snapshot of your looping state. Understanding exactly what it captures helps you design better templates and troubleshoot when something doesn't restore the way you expected." },
        { text: "With a loaded MEMORY, go to [MENU] > MEMORY and browse through the sub-menus: TRACK settings, PLAY settings, INPUT FX, RHYTHM. Each of these is stored per-slot.", why: "Seeing the full scope of what's saved teaches you the 505's architecture. Each MEMORY slot is essentially a complete song file — not just audio, but the entire performance configuration." },
        { text: "Test what's NOT stored: change the master output level, load a different MEMORY slot, then load the original back. Notice the master output stays at your changed level — it's hardware-global, not per-memory.", why: "Knowing the boundaries prevents confusion. If your volume changes between songs, it's not a MEMORY issue — it's your master output or input gain, which live outside the memory system." },
        { text: "Enable Write Protect on your current slot: [MENU] > MEMORY > WRITE PROTECT > ON. Now try to save over it — the 505 blocks you with an error. Disable Write Protect when done.", why: "Write Protect is your insurance policy against accidental overwrites. One wrong button press during a performance could destroy a polished arrangement. Protection costs nothing and prevents disaster." },
        { text: "Mark a slot as Favorite: [MENU] > MEMORY > FAVORITE > ON. Note how it appears differently in the memory browser — favorites are visually flagged for quick identification.", why: "When you have 30+ saved songs, scrolling through the full list is slow. Favorites let you filter to just your performance-ready slots, cutting navigation time dramatically." }
      ],
      feel: "Like opening the hood of a car you've been driving for months and finally understanding what every component does. You've been using MEMORY slots — now you understand them. The 505 stops being a black box and becomes a tool you truly control.",
      wrong: "If you think a MEMORY slot is just 'saved loops,' you're missing 80% of its value. It's saved loops PLUS effects PLUS track modes PLUS tempo PLUS quantize PLUS rhythm pattern. If your effects aren't restoring when you load a slot, check that you saved the slot AFTER configuring effects, not before.",
      sarah: "Gene, understanding what's in a MEMORY slot is understanding the 505's architecture. Most looper players never look under the hood — they just save and load. But you're building a professional performance system, and that means knowing exactly what each slot stores, what it doesn't, and how to protect your work.",
      metronome: 95,
      levelUp: "Can list from memory what a MEMORY slot stores and what it doesn't. Write Protect and Favorite features demonstrated."
    },
    {
      id: "lo9ne2", time: 5, title: "Copy/Paste Between Memories", type: "looper",
      checklist: true,
      what: "Copy a MEMORY slot to a different slot number. This is your variation and backup workflow — copy ILTWYW to slot 5, modify the effects chain for an alternate version, and now you have two takes of the same song. Also use copy-before-modify as a safety net before experimenting with a polished arrangement.",
      setup: "RC-505mkII with at least one completed song in a MEMORY slot.",
      steps: [
        { text: "Navigate to [MENU] > MEMORY > COPY. Select the source slot (your existing song). Select the destination slot (an empty slot). Confirm the copy.", why: "Copy is the foundation of non-destructive experimentation. You never modify your original — you modify a copy. This is the same principle as version control in software: branch before you change." },
        { text: "Load the copied slot and verify everything transferred: loops, effects, tempo, track settings. Play through the full arrangement to confirm it's identical.", why: "Trust but verify. A failed copy that you don't catch means you might modify the wrong version or lose work. The 30-second verification saves hours of potential re-recording." },
        { text: "Now modify the copy: change one effect, swap a track's play mode, or adjust the tempo by 5 BPM. This is your alternate version.", why: "Having two versions of the same song lets you A/B test arrangements. Maybe the dub delay version is better than the spring reverb version. You can't know until you compare, and you can't compare without copies." },
        { text: "Load the original slot and confirm it's untouched. Your modifications only affected the copy.", why: "This confirms the copy workflow is truly non-destructive. The original is sacred. The copy is your playground." }
      ],
      feel: "Like having a 'Save As' button for your entire musical arrangement. The freedom to experiment without risk transforms how you approach sound design — you try bolder choices because the original is always one button press away.",
      wrong: "If you accidentally modify the original instead of the copy, that's exactly why this drill exists. Always verify which slot number you're on before making changes. The slot number is displayed on the home screen. If you overwrote your original, this is why Write Protect exists — enable it on finished songs.",
      sarah: "Gene, copy before you modify — always have a clean backup. This is the habit that separates professionals from amateurs. Pros never gamble with finished work. They copy, experiment on the copy, and keep the original pristine. Build this habit now and it'll save you from heartbreak later.",
      metronome: 95,
      levelUp: "Successfully copy a MEMORY slot, modify the copy, and verify the original is untouched."
    },
    {
      id: "lo9ne3", time: 10, title: "Patch Template Design", type: "looper",
      checklist: true,
      what: "Build empty 'template' memories — no audio, just pre-configured settings. Template A (Reggae): 85 BPM, T1-T2 Multi mode, T3-T5 Single mode, Input FX = tape echo, Track FX Bank A = dub filter. Template B (Surf): 100 BPM, all Multi, Input FX = spring reverb + tremolo. Template C (Desert Blues): 95 BPM, Loop Sync ON, long loop length. Save these templates to MEMORY slots 90-99 (reserved for templates). When starting a new song, COPY a template to a working slot instead of configuring from scratch.",
      setup: "RC-505mkII with MEMORY slots 90-99 cleared for template use.",
      steps: [
        { text: "Clear a fresh MEMORY slot (slot 90). Delete all track audio. This is your blank canvas. Now set the tempo to 85 BPM and configure Track 1 and Track 2 to Multi mode, Tracks 3-5 to Single mode.", why: "Multi mode lets you overdub freely — perfect for rhythm tracks that you build up layer by layer. Single mode replaces the loop each time you record — ideal for melody or lead lines where you want to swap parts on the fly. This combination is the reggae performance architecture." },
        { text: "Configure Input FX for Template A: tape echo with a dub-style feedback. Set Track FX Bank A to a filter sweep. Save to slot 90.", why: "Reggae looping lives on dub effects — tape echo, filter sweeps, spring reverb. Pre-loading these means you start creating in your genre from the first button press instead of spending 5 minutes dialing in effects." },
        { text: "Build Template B (Surf) in slot 91: 100 BPM, all tracks Multi mode, Input FX = spring reverb + tremolo. Save.", why: "Surf rock needs reverb-drenched tones and tremolo shimmer. The higher tempo and all-Multi track modes support the layered, washy sound of psych-surf looping." },
        { text: "Build Template C (Desert Blues) in slot 92: 95 BPM, Loop Sync ON, extended loop length for longer phrases. Save.", why: "Desert blues phrases are long and meditative — Tinariwen and Tommy Guerrero songs breathe across 8-16 bar phrases. The longer loop length accommodates this without forcing you to cram ideas into 4 bars." },
        { text: "Test the workflow: load Template A from slot 90, COPY it to a working slot (e.g., slot 21), and immediately start recording. Time how long it takes from 'I want to make a reggae song' to 'first loop is recording.'", why: "The payoff of templates is measured in seconds. Without a template, setup takes 3-5 minutes of menu diving. With a template, it takes under 10 seconds. That's the difference between capturing inspiration and losing it." }
      ],
      feel: "Like a painter who pre-mixes their palette before starting a canvas. The colors are ready — you just paint. Templates eliminate the technical friction between 'I have an idea' and 'I'm recording it.' The creative window stays open.",
      wrong: "If your templates have leftover audio from a previous session, clear all tracks before saving. A template with stale loops defeats the purpose. Also: don't over-configure templates. They should set the foundation (tempo, modes, effects) but leave room for creative decisions in the moment.",
      sarah: "Gene, templates eliminate setup time — you start creating instantly. Think about how much time you've spent dialing in effects and configuring tracks before you can even play a note. Templates do that work once, and then every future session starts with a single button press. This is professional-grade workflow design, and it's one of the 505's most powerful features that almost nobody uses.",
      metronome: 95,
      levelUp: "Three genre templates saved in slots 90-92. Can load a template, copy to a working slot, and start recording in under 15 seconds."
    },
    {
      id: "lo9ne4", time: 8, title: "Rhythm Pattern Library", type: "looper",
      checklist: true,
      what: "The 505 has 200+ built-in rhythm patterns — not just a click track, but full drum grooves spanning rock, funk, jazz, latin, and electronic categories. Find the patterns that match Gene's genres: reggae one-drop, bossa nova, funk groove. Set rhythm to HEADPHONES ONLY. Use the internal rhythm as a performance scaffold — practice with it, perform without it.",
      setup: "RC-505mkII with headphones. No guitar needed for initial exploration.",
      steps: [
        { text: "Press [MENU] > RHYTHM > PATTERN. Browse the categories: Rock, Pop, Funk, Jazz, Latin, Electronic, and more. Each category has 10-30 variations.", why: "Most 505 users never explore past the default click. The rhythm library is 200+ free drum tracks that can groove with your loops. Knowing what's available changes how you practice." },
        { text: "Find a reggae one-drop pattern. Try the Latin or Reggae category. Listen for the kick on beat 3 (not beat 1) and the hi-hat pattern. Set it to 85 BPM.", why: "The one-drop is Gene's home rhythm — it's the heartbeat of reggae. Having an authentic drum pattern instead of a flat click transforms practice from mechanical to musical." },
        { text: "Find a bossa nova pattern. It should have the characteristic syncopated bass drum and brushed snare. Set it to 75 BPM.", why: "Bossa nova grooves are essential for Gene's global fusion style. The syncopation trains a different rhythmic feel than straight-ahead rock or reggae." },
        { text: "Find a funk groove. Look for a pattern with ghost notes on the snare and a syncopated kick. Set it to 90 BPM.", why: "Funk grooves train pocket playing — sitting deep in the beat rather than pushing ahead. This feel transfers directly to Gene's soul-funk and Khruangbin-influenced playing." },
        { text: "For each pattern you like, note the category and pattern number. Write them down or save them in your genre templates (reggae pattern in Template A, bossa in a new template, etc.).", why: "Building a personal pattern library saves browsing time in future sessions. Assign each favorite pattern to the template where it belongs, and it loads automatically with the template." },
        { text: "Verify all rhythm patterns are routed to headphones only: [MENU] > RHYTHM > OUTPUT > PHONES. Record a test loop with the pattern running — play it back and confirm no drum bleed in the recorded audio.", why: "If the rhythm pattern bleeds into your recorded loops, every loop will have ghost drums baked in. Headphone-only routing keeps the scaffold invisible to the audience and out of your recordings." }
      ],
      feel: "Like discovering that your instrument has a built-in drummer who knows 200 styles. You've been using a click track — now you have a groove partner. The patterns make practice feel like jamming, not drilling.",
      wrong: "If the rhythm pattern is bleeding into your recorded loops, the output routing is wrong — check [MENU] > RHYTHM > OUTPUT immediately. Also: don't get lost browsing patterns for 30 minutes. Find 3-5 that match your genres, save them in templates, and move on. The patterns serve your music, not the other way around.",
      sarah: "Gene, 200 free drum tracks — find the ones that groove for you. That reggae one-drop pattern will make your practice sessions feel like you're jamming with a real drummer instead of a cold metronome. And when you save your favorite patterns into your genre templates, every future session starts with the right groove already loaded.",
      metronome: 85,
      levelUp: "Can locate and load a reggae, bossa, and funk rhythm pattern from memory. All three saved in appropriate genre templates. Rhythm routed to headphones only — verified."
    },
    {
      id: "lo9ne5", time: 5, title: "Setlist Organization", type: "looper",
      checklist: true,
      what: "Professional MEMORY slot management strategy. Assign slot ranges by function: Slots 1-20 = performance songs (in set order), Slots 21-30 = songs in development, Slots 31-40 = experiments and jams, Slots 90-99 = templates. Give each completed song a permanent slot number. Create a physical index card or note: slot # → song name → BPM → key.",
      setup: "RC-505mkII with at least 2-3 completed songs saved in MEMORY.",
      steps: [
        { text: "Move your completed songs to slots 1-20, arranged in the order you'd perform them. Slot 1 = your opener, Slot 2 = second song, etc. Use COPY to move songs from wherever they currently live.", why: "Sequential slot order matches sequential setlist order. When you're on stage, navigating from Slot 1 to Slot 2 is one click of the VALUE knob. Jumping from Slot 7 to Slot 43 requires hunting, and hunting on stage means dead air." },
        { text: "Move works-in-progress to slots 21-30. These are songs you're still building — they have loops but need polish, effects tweaking, or additional parts.", why: "Separating finished from unfinished prevents you from accidentally loading a half-built song during a performance. The slot range is your quality gate." },
        { text: "Reserve slots 31-40 for experiments and free jams — things you might delete, might develop, or might just play once for fun.", why: "Creative experimentation needs a safe space that doesn't interfere with polished work. If an experiment turns into a real song, promote it to the 21-30 range for development." },
        { text: "Write a physical index card or phone note listing: slot number, song name, BPM, key, and any notes (e.g., 'needs new vocal loop'). Keep this visible during practice.", why: "Your brain shouldn't hold the mapping between slot numbers and song names. Externalize it. A physical card at your station means zero cognitive load during performance." },
        { text: "Verify your organization by loading slots 1, 2, and 3 in sequence. Each should be a complete, performance-ready song. If any slot is empty or half-built, it doesn't belong in the 1-20 range yet.", why: "Quality control. The 1-20 range is your stage-ready zone. Everything in it must be polished enough to play for an audience right now. If it's not ready, it belongs in 21-30." }
      ],
      feel: "Like organizing a closet — everything has a place, and you know where to find it without thinking. The slot system is invisible to the audience but essential to your confidence. When you know exactly where every song lives, your on-stage brain can focus entirely on music.",
      wrong: "If your songs are scattered randomly across slots (song in 3, song in 17, song in 42), you'll waste time hunting during performance. Even if you only have 3 songs, put them in slots 1-3. The organizational habit matters more than the current song count.",
      sarah: "Gene, organization is invisible but essential — pros never fumble on stage. When Ed Sheeran loads his next song on his RC-30, he doesn't scroll through a random list. Everything is in order, every slot is intentional. You're building the same professional habit with a more capable instrument.",
      metronome: 95,
      levelUp: "All completed songs in slots 1-20 in setlist order. Works-in-progress in 21-30. Templates in 90-99. Physical index card written and visible."
    },
    {
      id: "lo9ne6", time: 5, title: "Quick Recall Workflow", type: "looper",
      checklist: true,
      what: "Speed drill: the audience applauds after song 1, and you have 5 seconds to load the next song. Practice the fastest path from 'song ended' to 'next song loaded and ready.' Sequential slots (1, 2, 3...) make this trivial — press [MEMORY], increment the VALUE knob once, press [ENTER]. Time yourself: goal is under 3 seconds from applause to first loop playing.",
      setup: "RC-505mkII with at least 3 songs saved in sequential MEMORY slots (1, 2, 3).",
      steps: [
        { text: "Load slot 1 (your opener). Play through a few bars to simulate the end of a song. Press ALL STOP. Immediately: [MEMORY] > VALUE knob one click up > [ENTER]. Slot 2 loads. Time the transition.", why: "This three-button sequence is your song-change choreography. Like changing gears in a car — it needs to be automatic. The faster this becomes, the more seamless your performance." },
        { text: "Repeat: end song 2, load song 3. Then reverse: end song 3, load song 2. Practice forward and backward navigation.", why: "In a live set, you might skip a song, repeat a song on request, or change your setlist order on the fly. Navigation needs to work in both directions without fumbling." },
        { text: "Time yourself from ALL STOP to first loop playing on the new slot. Goal: under 3 seconds. If you're over 5 seconds, identify the bottleneck — is it finding [MEMORY], turning the VALUE knob, or pressing [ENTER]?", why: "3 seconds of silence reads as a deliberate pause to the audience. 10 seconds reads as technical difficulty. The difference is purely muscle memory, and muscle memory comes from timed repetition." },
        { text: "Practice 10 consecutive song changes: 1→2→3→2→1→3→1→2→3→1. Mix up the order. Every transition should be under 3 seconds.", why: "Random-order practice prevents your fingers from learning a fixed sequence. In performance, setlist changes happen on the fly. Your navigation needs to be flexible, not choreographed." }
      ],
      feel: "Like a DJ crossfading between tracks — smooth, confident, no dead air. The audience should never see you fumble with equipment. The transition itself becomes invisible, and the music flows continuously from song to song.",
      wrong: "If you're consistently over 5 seconds, the issue is usually the VALUE knob step — either you're overshooting (scrolling past the target slot) or undershooting. With sequential slots, it's always exactly one click. If your songs aren't sequential, reorganize them first (see previous exercise).",
      sarah: "Gene, the fastest recall is sequential slots — organize your set in order. When your songs live in slots 1, 2, 3, the transition is one knob click. That's the reward for the organizational work you did in the previous exercise. Speed comes from structure, not from fast fingers.",
      metronome: 95,
      levelUp: "10 consecutive song changes, all under 3 seconds, in random order across at least 3 slots."
    },
    {
      id: "lo9ne7", time: 5, title: "Per-Memory Tempo", type: "looper",
      checklist: true,
      what: "Each MEMORY slot stores its own tempo. Song 1 at 85 BPM, Song 2 at 100 BPM — when you load a MEMORY, the tempo switches automatically. No manual adjustment between songs. Test this with your own songs saved at different tempos and verify the automatic switching.",
      setup: "RC-505mkII with at least 2 songs saved at different tempos in adjacent MEMORY slots.",
      steps: [
        { text: "Save a song at 90 BPM in slot 1 (e.g., ILTWYW). Save a different song at 80 BPM in slot 2 (e.g., Sol Del Sur). Confirm each slot's tempo by loading and checking the display.", why: "This setup creates a clear tempo difference between adjacent slots. When you switch between them, the tempo change should be obvious and automatic." },
        { text: "Load slot 1. Verify the display shows 90 BPM. Start the rhythm guide — it should be at 90. Now load slot 2. Watch the tempo display change to 80 BPM. Start the rhythm guide — it should be at 80.", why: "The per-memory tempo is one of the 505's most powerful live features. It eliminates the manual tempo adjustment that plagues simpler loopers. No more fumbling with TAP TEMPO between songs." },
        { text: "Rapid switch: load slot 1, let it play for 4 bars, load slot 2, let it play for 4 bars. Feel the tempo shift. This is what happens between songs in a set.", why: "Experiencing the tempo shift in real time trains your body to adjust. Your foot tapping, your breathing, your internal pulse all need to reset when the tempo changes. Practice the physical adjustment, not just the button press." },
        { text: "Edge case: change the tempo manually while in a MEMORY slot (e.g., load slot 1 at 90 BPM, then manually set it to 95 BPM). Now load slot 2 and back to slot 1. Does it revert to 90 or stay at 95? (Answer: it reverts to the saved tempo unless you re-save.)", why: "Understanding this behavior prevents confusion. If you tweak tempo during a performance, the tweak is temporary unless you save. This is usually what you want — experiments don't permanently alter your saved arrangements." }
      ],
      feel: "Like cruise control that resets to the right speed for each stretch of highway. You set it once during song design, and it's correct every time you load that song. One fewer thing to manage on stage means one more thing you can invest in musical expression.",
      wrong: "If the tempo doesn't change when you load a new slot, check that you saved each slot with the correct tempo. The 505 stores whatever tempo was active at the moment you pressed SAVE. If you saved both songs at the same tempo, they'll both load at that tempo.",
      sarah: "Gene, no more manual tempo adjustment between songs. This is one of those features that seems small until you're on stage and you realize you never have to think about it. The 505 handles the tempo, you handle the music. Every professional looper relies on per-memory tempo — it's table stakes for live performance.",
      metronome: 90,
      levelUp: "Can demonstrate automatic tempo switching between two MEMORY slots. Understands that manual tempo changes are temporary unless re-saved."
    },
    {
      id: "lo9ne8", time: 5, title: "Write Protect Strategy", type: "looper",
      checklist: true,
      what: "WRITE PROTECT prevents accidental overwrites of your polished performance slots. Enable it on your finished songs (slots 1-20). Leave development slots (21-30) unprotected for iterative work. Understand what happens when you try to WRITE to a protected slot — an error message, no damage done.",
      setup: "RC-505mkII with at least 2 songs: one in the performance range (1-20), one in the development range (21-30).",
      steps: [
        { text: "Load a finished song from slots 1-20. Enable Write Protect: [MENU] > MEMORY > WRITE PROTECT > ON. Save the slot to lock it.", why: "Write Protect is the lock on your vault. Your performance songs represent hours of recording, effects design, and arrangement. One accidental overwrite undoes all of that. Protection takes 5 seconds and lasts until you deliberately remove it." },
        { text: "With Write Protect ON, try to save over the slot. Attempt [MENU] > MEMORY > WRITE (or whatever triggers a save). The 505 should display an error or warning and refuse to overwrite.", why: "Testing the protection confirms it works. You need to trust the safety net before you need it. Knowing that the error message appears — and that your audio is safe — builds confidence for high-pressure situations." },
        { text: "Load a development song from slots 21-30. Verify Write Protect is OFF. Make a change (adjust an effect, modify a loop), and save. The save should succeed without any error.", why: "Development slots need to be freely modifiable — you're iterating, experimenting, refining. Write Protect on development slots would slow you down. The protection strategy is selective: guard the finished, free the in-progress." },
        { text: "Create your protection policy: Write Protect ON for all slots in 1-20 (performance). OFF for 21-30 (development). OFF for 31-40 (experiments). OFF for 90-99 (templates — you may need to update these). Apply it now.", why: "A consistent policy means you never have to think about it. Every slot in 1-20 is protected, period. If you need to modify a finished song, you deliberately disable protection, make the change, re-save, and re-enable. The extra steps are the point — they prevent impulsive overwrites." }
      ],
      feel: "Like putting a 'Do Not Erase' label on a whiteboard. Simple, low-tech, and it prevents the heartbreak of losing polished work. The small friction of disabling protection is intentional — it forces you to confirm that you really want to modify a finished arrangement.",
      wrong: "If you protect EVERYTHING, you'll spend half your practice time toggling Write Protect on and off. Only protect finished, performance-ready work. Development slots should be freely writable. The point is protecting your best work, not locking everything down.",
      sarah: "Gene, protect your finished work — accidents happen under pressure. Imagine you're on stage, adrenaline pumping, and you accidentally hit save instead of load. Without Write Protect, your carefully crafted arrangement is gone, replaced by whatever was playing at that moment. With Write Protect, the 505 simply says 'no' and your song is safe. Peace of mind costs five seconds.",
      metronome: 95,
      levelUp: "All performance slots (1-20) Write Protected. Can demonstrate the error message when attempting to overwrite a protected slot. Development and experiment slots remain freely writable."
    },
    {
      id: "lo9ne9", time: 8, title: "Rhythm Guide as Performance Tool", type: "looper",
      checklist: true,
      what: "Beyond metronome: use the rhythm guide's full drum pattern as a performance scaffold during complex builds. The drum groove keeps your timing locked while you focus on recording clean loops with intricate parts. Practice building a full arrangement with the rhythm guide running in headphones, then mute it for the final performance pass. Some artists keep it running throughout the entire set — invisible to the audience, essential to the performer.",
      setup: "RC-505mkII with headphones. Guitar in INST 1. Rhythm guide set to a reggae drum pattern at 85 BPM, routed to headphones only.",
      steps: [
        { text: "Select a full drum pattern (not just a click) — a reggae one-drop or a funk groove. Set it to 85 BPM. Route to headphones only. Start the pattern and feel the groove before recording anything.", why: "A drum pattern provides rhythmic context that a flat click cannot. The kick-snare-hat interplay gives you a feel to lock into, not just a tempo to follow. Your loops will have better groove when you record against a groove." },
        { text: "With the drum pattern running in your headphones, record a guitar loop on Track 1. Focus on locking your strumming to the drum pattern's kick and snare. Record 4 bars.", why: "Playing against a drum pattern is different from playing against a click. The drum groove pulls your rhythm into a pocket — a subtle swing or push that makes your loops feel alive instead of mechanical." },
        { text: "Add a second loop on Track 2 while the drum pattern continues. Notice how the drum scaffold keeps your timing consistent even as you manage the cognitive load of multiple tracks.", why: "When building multi-track arrangements, timing tends to drift because your attention is split between playing and operating the looper. The drum pattern anchors you, preventing the subtle tempo creep that ruins multi-track builds." },
        { text: "Now mute the rhythm guide and listen to your loops alone. Do they groove on their own? If they feel stiff or mechanical, the drum pattern was compensating for weak internal timing. If they groove, the pattern helped you capture that feel.", why: "The ultimate test: do your loops stand on their own? The rhythm guide is a scaffold, not a crutch. It should help you capture good timing, not mask bad timing. If your loops collapse without the guide, you need more time internalizing the groove before recording." },
        { text: "Try the full workflow: drum pattern on → build 3-4 layers → turn drum pattern off → perform live over your loops. This is the scaffold-then-remove approach that many professional loopers use.", why: "The scaffold-and-remove workflow gives you the best of both worlds: groove-locked recordings AND an uncluttered final sound. Your audience hears only your playing, but your playing was shaped by the drum pattern's groove." }
      ],
      feel: "Like building a house with scaffolding — the structure goes up straight and true, and then the scaffolding comes down and you see the finished building. The drum pattern shapes your playing during construction, then disappears, leaving behind loops that groove naturally.",
      wrong: "If you become dependent on the drum pattern and can't play without it, you're using it as a crutch instead of a scaffold. The test is simple: do your loops groove after the pattern is muted? If not, spend more time on rhythm internalization (Level 4-5 exercises) before relying on this technique.",
      sarah: "Gene, the rhythm guide is your invisible drummer. A real drummer in the headphones keeps your timing locked while your brain handles the complexity of multi-track looping. And when you take the drummer away, the groove stays in your playing. That's the transfer — from external reference to internal feel.",
      metronome: 85,
      levelUp: "Build a 3-layer arrangement using a drum pattern scaffold, remove the pattern, and have the loops groove independently. Can articulate the difference between scaffold and crutch."
    },
    {
      id: "lo9ne10", time: 5, title: "Memory Slot A/B Testing", type: "looper",
      checklist: true,
      what: "Copy a song to two adjacent slots. Modify one version: different effects, different track arrangement, different build order. Compare by loading each back to back. A/B testing your own arrangements is how you refine your sound and make deliberate creative choices instead of defaulting to whatever you built first.",
      setup: "RC-505mkII with a completed song in a MEMORY slot.",
      steps: [
        { text: "Copy your song to two adjacent development slots (e.g., slot 21 and slot 22). Load slot 21 — this is Version A, the control. Don't change anything.", why: "The control version gives you a reference point. Without it, you can't objectively evaluate whether your modifications improved the arrangement or made it worse. A/B testing requires an unchanged A." },
        { text: "Load slot 22 — this is Version B. Make one significant change: swap the reverb for a delay, change a track from Multi to Single mode, or rearrange the build order. Save.", why: "Changing one variable at a time isolates the effect of that change. If you change effects, track modes, AND arrangement simultaneously, you won't know which change made the difference." },
        { text: "Rapid compare: load Version A, listen for 8 bars. Load Version B, listen for 8 bars. Repeat twice. Which version is better? Be specific — better how? Better groove? Better sonic texture? Better build?", why: "Rapid switching reveals differences your memory would blur. If you listen to one version for 5 minutes and then the other, you'll forget the details of the first. Quick A/B switching keeps both versions fresh in your ear." },
        { text: "Pick the winner. Copy it back to a performance slot if it's ready, or keep iterating on the development slot. Delete the losing version to keep your slots clean.", why: "The point of A/B testing is decision-making. Don't hoard versions indefinitely — evaluate, decide, and clean up. Slot clutter is as bad as no organization." }
      ],
      feel: "Like a wine tasting where both wines are yours. You're not comparing to someone else's standard — you're comparing two expressions of your own musical vision and choosing the one that best represents what you hear in your head.",
      wrong: "If you change too many things between Version A and B, you won't know what caused the difference. One change per comparison. Also: don't keep both versions forever — pick one, delete the other, and move on. Indecision fills up your slots with near-duplicates.",
      sarah: "Gene, two versions of the same song teach you what really matters. When you hear both back to back and one clearly grooves harder or sounds warmer, you've just discovered something specific about your musical preferences. That self-knowledge compounds — every A/B test sharpens your taste.",
      metronome: 95,
      levelUp: "Successfully A/B tested one song with a single-variable change. Can articulate why one version is better than the other with musical reasoning."
    },
    {
      id: "lo9ne11", time: 5, title: "Pre-Show Preparation", type: "looper",
      checklist: true,
      what: "The professional pre-performance workflow — a 10-point checklist that catches problems before the audience arrives. (1) All MEMORY slots load correctly, (2) Input FX settings verified, (3) tempo per slot confirmed, (4) all track buttons responsive, (5) input levels correct with actual instruments plugged in, (6) headphone vs main output routing verified, (7) Write Protect on performance slots, (8) rhythm guide routed to headphones only, (9) backup of all MEMORY slots, (10) physical setlist card visible.",
      setup: "RC-505mkII with full performance setup: guitar, headphones, all songs loaded.",
      steps: [
        { text: "Walk through the 10-point checklist from top to bottom. Load each performance slot (1-20) and verify it contains the correct song with correct effects and tempo. Don't skip slots — check every one.", why: "A checklist catches the problems that assumptions miss. 'I'm pretty sure slot 3 is correct' is not the same as 'I verified slot 3 is correct.' The difference is the difference between a smooth performance and a public failure." },
        { text: "Test all inputs: play guitar through INST 1 and verify the level. Speak or sing into the MIC and verify the level. Check that each input peaks at your target level (-6dB).", why: "Input levels can drift if gain knobs are bumped, cables are changed, or batteries die in active pickups. Testing with actual instruments — not from memory — catches these issues before they become on-stage surprises." },
        { text: "Verify routing: main output goes to the PA or speaker, headphone output carries rhythm guide and monitor mix. Unplug headphones and confirm no click track or monitor bleed comes through the main output.", why: "Routing errors are among the most embarrassing live failures. Click track through the PA is amateur hour. Checking routing takes 30 seconds and prevents a show-ruining mistake." },
        { text: "Check your physical setup: setlist card visible, instrument cables routed so you won't trip on them, headphone cable not tangled with guitar cable, all pedals within foot reach.", why: "Physical ergonomics matter as much as digital configuration. A cable pull that disconnects your guitar mid-song is a technical failure that no amount of MEMORY organization can prevent." }
      ],
      feel: "Like a pilot running through a pre-flight checklist. Not glamorous, not creative, but absolutely essential. The checklist is what separates a reliable professional from a talented amateur who occasionally has great shows and occasionally has disasters.",
      wrong: "If you think sound checks are optional because 'it worked last time,' you're gambling. Cables go bad, knobs get bumped, slots get accidentally overwritten. The only way to know everything works is to verify it, every single time. Skipping the checklist to save 10 minutes risks ruining a 60-minute performance.",
      sarah: "Gene, sound check isn't optional — it's what separates amateur from professional. Every touring musician runs a checklist before every show. The audience never sees the 10 minutes of verification, but they absolutely notice the 30 seconds of fumbling when something goes wrong. Invest the time. Every time.",
      metronome: 95,
      levelUp: "Complete the 10-point pre-show checklist from memory without referring to notes. All items verified green. Total checklist time under 10 minutes."
    },
    {
      id: "lo9ne12", time: 10, title: "The Template Performance", type: "looper",
      checklist: true,
      what: "The payoff of the memory architecture: start from a blank template (no pre-recorded loops, just settings), load Template A (Reggae), and build a complete song from scratch using only the template's pre-configured settings. The template handles tempo, track modes, effects, and rhythm pattern. You focus purely on musical creation. This exercise proves that the organizational work of this level translates directly into creative flow.",
      setup: "RC-505mkII with Template A (Reggae) saved in slot 90. Guitar in INST 1. Headphones on.",
      steps: [
        { text: "Load Template A from slot 90. COPY it to a working development slot (e.g., slot 25). This preserves the template while giving you a writable workspace.", why: "Never build directly in a template slot — you'd overwrite the template with song-specific audio. Copy-then-build preserves your templates for future use. This workflow should be automatic by now." },
        { text: "Start the rhythm guide — it should already be set to a reggae pattern at 85 BPM from your template configuration. Verify the Input FX (tape echo) is active. Everything should be ready to go.", why: "This is the moment of truth for your template design. If the tempo, pattern, and effects are all correct, your template works and you've just saved 3-5 minutes of setup. If something's wrong, note it and fix the template after this exercise." },
        { text: "Record Track 1: a fingerpicked bass pattern. Track 2: a reggae offbeat guitar chop. Track 3: a melody or lead line. Build the arrangement using the track modes your template pre-configured (Multi for T1-T2, Single for T3).", why: "The template's track mode assignments guide your arrangement structure. Multi mode on T1-T2 lets you overdub rhythm layers. Single mode on T3 means each new melody replaces the last — perfect for live improvisational lead lines." },
        { text: "When the arrangement feels complete, mute the rhythm guide and listen. This is your song — built from nothing in under 10 minutes, with zero time spent on technical configuration.", why: "The template eliminated setup friction. You spent 10 minutes on music, zero minutes on menus. That ratio is the entire point of memory architecture. If you spent any time in menus during this exercise, your template needs refinement." },
        { text: "Rate the experience: how much time did you spend on music vs. menus? Was the template's effects chain right for the song you built? Would you change anything in the template for next time? Update the template if needed.", why: "Templates are living documents — they evolve as your taste and workflow evolve. The first version is never perfect. Each song you build from a template teaches you something about what the template should contain." }
      ],
      feel: "Like walking into a recording studio where the engineer has already set up the mics, dialed in the EQ, and tuned the room. You sit down, pick up your guitar, and the first thing you do is play music. That's the power of templates — they turn setup time into creative time.",
      wrong: "If you spent more than 60 seconds in menus during this exercise, your template is incomplete. Go back and add whatever you had to manually configure. The goal is zero menu time from the moment you load the template to the moment you start recording your first loop.",
      sarah: "Gene, this is the point of all the organization — instant creative flow with zero setup friction. You loaded one slot, pressed one button to copy, and started making music. Every minute you invested in templates, slot organization, and memory architecture just paid off in pure, uninterrupted creative flow. This is what the 505 was designed for — professional workflow that serves the artist.",
      metronome: 85,
      levelUp: "Build a complete 3+ track arrangement from a blank template in under 10 minutes with zero time spent in menus after the initial template load."
    }
  ]
};
