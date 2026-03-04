import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";

// ─── DESIGN SYSTEM (sarahglassmusic.com) ────────────────────────────
const T = {
  bg:"#fafaf9", bgSoft:"#f5f5f4", bgCard:"#ffffff",
  border:"#e7e5e4", borderSoft:"#d6d3d1",
  textDark:"#1c1917", textMed:"#44403c", textLight:"#78716c", textMuted:"#a8a29e",
  gold:"#d4af37", goldDark:"#c5a028", goldSoft:"#d4af3718", goldMed:"#d4af3730",
  success:"#6b8f71", successSoft:"#6b8f7118",
  warm:"#c2956b", warmSoft:"#c2956b18",
  coral:"#c27c6b", coralSoft:"#c27c6b18",
  plum:"#8b6b8f", plumSoft:"#8b6b8f18",
  slate:"#6b7b8f", slateSoft:"#6b7b8f18",
  serif:"'Playfair Display','Georgia',serif",
  sans:"'Lato',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
  sm:"0 1px 3px rgba(28,25,23,0.06)", md:"0 4px 12px rgba(28,25,23,0.08)",
};

// Exercise type config
const TYPE = {
  rhythm:  { label:"Rhythm",  color:"#c2956b", icon:"𝅘𝅥" },
  guitar:  { label:"Guitar",  color:"#6b7b8f", icon:"♪" },
  vocal:   { label:"Voice",   color:"#8b6b8f", icon:"♫" },
  listen:  { label:"Listen",  color:"#6b8f71", icon:"♩" },
  song:    { label:"Song",    color:"#c27c6b", icon:"𝄞" },
  record:  { label:"Record",  color:"#c27c6b", icon:"●" },
  play:    { label:"Free",    color:"#a8a29e", icon:"✦" },
};

const DAY_COLORS = ["#c2956b","#8b6b8f","#6b8f71","#6b7b8f","#c27c6b","#8f7b6b","#a8a29e"];

// ─── DATA ───────────────────────────────────────────────────────────
const DAYS = [
  {
    num:1, name:"Foundation", focus:"Metronome Internalization", duration:"50–55 min",
    setup:"Metronome app on phone, guitar in lap, something to tap on (thigh or table). Quiet room.",
    exercises:[
      { id:"d1e1", time:10, title:"Full Count", type:"rhythm",
        what:"Internalize the relationship between numbers (downbeats) and &'s (upbeats) so your body FEELS the grid before any music.",
        setup:"Metronome at 200 BPM. Tap surface with dominant hand. Nothing else in hands yet.",
        steps:[
          {text:"Set metronome to 200 BPM. You'll hear a click on every 8th note.", why:"Each click = one syllable you'll say."},
          {text:"Say out loud: '1 & 2 & 3 & 4 &' — one syllable per click.", why:"Your voice matches the metronome exactly. Every click has a syllable."},
          {text:"TAP with your hand only on the numbers (1, 2, 3, 4). Your tapping is at half speed (100 BPM).", why:"This splits your body: voice follows every click, hand follows only downbeats."},
          {text:"NOD your head: DOWN on numbers, UP on &'s.", why:"Sarah: 'This embodiment is crucial!' The nod physically separates downbeats from upbeats in your body."},
          {text:"Do 4–8 bars → rest 10 seconds → repeat 3–4 times.", why:"Short sets with rest. Quality over quantity."},
        ],
        feel:"Your neck should feel the rhythm. The nod should feel like a slow-motion headbang — deliberate, not frantic. If the nod feels rushed or out of sync, you're going too fast.",
        wrong:"If your nod starts matching your voice (nodding on every click), slow down 20 BPM. The nod is HALF speed — only on numbers.",
        sarah:"This is the most important exercise! Always start your practice with this one.",
        metronome:200, levelUp:"Hold 4 bars at 220+ BPM with clean nod."
      },
      { id:"d1e2", time:8, title:"&'s Only", type:"rhythm",
        what:"Train your body to hold the downbeat internally while your voice speaks only the offbeats. This is the foundation of syncopation.",
        setup:"Same metronome at 200–244 BPM. Same tapping setup.",
        steps:[
          {text:"Metronome at 200–244. Tap at 100–122 (half speed, on the numbers).", why:"Same as Drill #1 — tap is your downbeat anchor."},
          {text:"ONLY say the &'s out loud. Stay silent on the numbers.", why:"Your voice now speaks between the clicks, not on them. This is what syncopated singing feels like."},
          {text:"Keep nodding DOWN on numbers, UP on &'s — even though you're only speaking on the up-nods.", why:"The nod is your lifeline. It tells your body where 'beat 1' is even when your voice is off the beat."},
        ],
        feel:"This should feel disorienting at first — like patting your head and rubbing your stomach. Your body (nod + tap) holds the grid, your voice floats between it. When it clicks, you'll feel a 'lock' where the silence on the numbers feels as deliberate as speaking on the &'s.",
        wrong:"If you catch yourself saying the numbers quietly, or if the nod starts syncing with your voice instead of the tap — stop. Slow down 20 BPM and rebuild.",
        sarah:"For both exercises, 244 is the BPM of the metronome. You tap only on the numbers (tapping at 122). For this exercise, you only say the &'s out loud.",
        metronome:200, levelUp:"4 clean bars of &'s-only at 244 BPM."
      },
      { id:"d1e3", time:8, title:"16th Notes", type:"rhythm",
        what:"Subdivide each beat into 4 parts. This is what lets you place vocals precisely inside a beat — not just on it or between it.",
        setup:"Metronome at 78 BPM. Tap at 78.",
        steps:[
          {text:"Set metronome to 78. Tap matches metronome.", why:"Slower tempo so you can fit 4 syllables per beat."},
          {text:"Say: '1 e and a 2 e and a 3 e and a 4 e and a'", why:"4 evenly-spaced syllables per click. 16 syllables total per bar."},
          {text:"Then strip: only say 'e and a' (silent on numbers).", why:"Same concept as Drill #2 but with 16th notes. Your body holds the downbeat, voice fills the gaps."},
        ],
        feel:"The 4 syllables should feel like a drumroll — perfectly even spacing. No syllable should be louder or faster than the others. When you strip to 'e and a' only, it should feel like a triplet between each beat.",
        wrong:"If 'e and a' sound rushed (bunched together near the number), you're not distributing them evenly. Say all 4 at first, then gradually make the '1' silent while keeping the spacing.",
        sarah:"This feeds directly into syncopation awareness.",
        metronome:78, levelUp:"Clean 'e and a' only at 82–85 BPM."
      },
      { id:"d1e4", time:12, title:"Fingerpick + Count", type:"guitar",
        what:"Add guitar to the counting. The goal is automatic picking so you can layer voice on top later.",
        setup:"Guitar in lap. Surf Rock Beat 120 BPM on speaker/headphones. Am → C → G → D chord shapes ready.",
        steps:[
          {text:"Play Surf Rock Beat at 120 BPM.", why:"This is the backing track you've been using since January."},
          {text:"Fingerpick Am → C → G → D: alternate thumb and pointer finger on two different strings.", why:"Sarah (1/13): 'Alternate thumb and pointer on two strings. Count is on the thumb, so 4 thumb/pointer back-and-forth on each chord.'"},
          {text:"Count '1 & 2 & 3 & 4 &' out loud while picking.", why:"This connects the counting drill to actual music. Your count should line up with your thumb hits."},
          {text:"NOD the entire time. Down on numbers, up on &'s.", why:"Same nod as the drills. Now it carries into real playing."},
        ],
        feel:"The picking should feel mechanical and easy — like breathing. If you can count and nod without the picking falling apart, the pattern is internalized. The count should feel like narrating what your hands already know.",
        wrong:"If counting makes your picking stutter, simplify: just hit the thumb on beats 1–4 (skip the pointer). Add pointer back once counting is stable.",
        sarah:"Count > nod > picking accuracy. If count drops, simplify the picking.",
        metronome:120, levelUp:"Count + nod + fingerpick for a full chord cycle without dropping count."
      },
      { id:"d1e5", time:12, title:"Passaggio Warm-Up", type:"vocal",
        what:"Gently explore your vocal break around A3. Today is observation — not pushing. You're mapping where the flip happens.",
        setup:"No guitar. Standing is ideal. Glass of water nearby. No dairy for 30+ min before.",
        steps:[
          {text:"Descending 5-note scale on 'nee': Start on C4, descend C4→B3→A3→G3→F3.", why:"Approaching the break from ABOVE lets you 'slide' into it rather than crashing up into it."},
          {text:"Each round, start a half step lower: B3→A#3→G#3→F#3→E3, then B♭3→A3→A♭3→G3→G♭3.", why:"You'll cross through the A3 break zone around round 3. Notice where the voice wants to flip."},
          {text:"Messa di voce on G3, A♭3, A3, B♭3: Sing 'ah', start quiet → swell to medium → back to quiet. 8 seconds per cycle, 3 cycles per note.", why:"The swell tests your break — the crescendo tries to pull you into chest voice. The goal is staying in mix through the swell."},
          {text:"Volume should be conversational — 6/10 max. Don't push.", why:"Pushing engages chest voice muscles and makes the flip more abrupt. Light singing lets the voice shift naturally."},
        ],
        feel:"On the descending scale, you'll feel the voice 'settle' as you cross A3. There might be a slight thinning or color change in the tone around B♭3–A3. That's the passaggio. On the messa di voce, G3 should feel easy and warm. A♭3 gets 'interesting' — you might feel the voice wanting to shift. A3 is the zone — the crescendo may cause a flip. B♭3 may flip into head voice, and that's fine.",
        wrong:"If you're straining or pushing to stay in chest voice through A3, you're forcing it. Let the flip happen. Over weeks, the flip becomes a shift, then a blend. Forcing it delays this process.",
        sarah:"Continue using AI to find exercises going from your mixed voice into your head voice — working out where it flips and harnessing control over that range of notes.",
        levelUp:"Notice the exact note where your voice wants to flip. It might be A3, A♭3, or B♭3 — it varies day to day."
      },
      { id:"d1e6", time:5, title:"Listening Analysis", type:"listen",
        what:"Train your ear to hear where vocals sit relative to the beat. This directly improves your own vocal timing.",
        setup:"Headphones. 'I Like The Way You Walk' by The Donkeys queued up. No guitar.",
        steps:[
          {text:"Listen to the original. Focus only on where the last word of each line lands.", why:"Sarah has flagged this across 3 lessons (2/16, 3/2). The last word timing is the key syncopation pattern."},
          {text:"Ask yourself: is that last word ON the beat? BETWEEN beats? Late?", why:"If you can hear that it's between beats, you understand the syncopation you need to reproduce."},
          {text:"Try counting '1 & 2 & 3 & 4 &' while listening. Where does each last word fall in the count?", why:"This connects the abstract counting drills to real music."},
        ],
        feel:"You should hear the singer's words 'floating' between your counts. If the last word of a line feels like it's on a number, listen again — it's probably between beats.",
        wrong:"If you think every word is landing cleanly on a beat, you're not hearing the syncopation yet. Slow the song to 75% on YouTube and count along more carefully.",
        sarah:"Listen back to the original song and analyze the timing of his vocals — especially the last word of each line. Make sure you're not simplifying it and putting things directly on beat when they're supposed to be in between the beats.",
        levelUp:"You can tell which words are on-beat vs. off-beat without counting."
      }
    ],
  },
  {
    num:2, name:"Syncopation", focus:"Rhythmic Singing + Sol Del Sur", duration:"50–55 min",
    setup:"Guitar, metronome, Sol Del Sur tab on Ultimate Guitar pulled up, speaker for backing tracks.",
    exercises:[
      { id:"d2e1", time:10, title:"Metronome Drills #1 & #2", type:"rhythm",
        what:"Push your ceiling tempo. Same exercises as Day 1, faster.",
        setup:"Metronome, tap surface.",
        steps:[
          {text:"Drill #1 (Full Count): Push tempo 10–20 BPM closer to 244.", why:"Progressive overload. Yesterday's hard is today's warm-up."},
          {text:"Drill #2 (&'s Only): Match the new tempo.", why:"Both drills at the same speed keeps them paired."},
          {text:"Nod quality > tempo number. If nod gets sloppy, drop 10 BPM.", why:"Speed without control is noise. The nod is the quality check."},
        ],
        feel:"Today these should feel slightly more natural than Day 1. The nod should require less conscious thought.",
        wrong:"If you're holding your breath or tensing your shoulders, you're fighting the tempo instead of riding it. Drop 10 BPM.",
        metronome:220, levelUp:"Clean set at 230+ BPM."
      },
      { id:"d2e2", time:12, title:"Lyric Placement", type:"vocal",
        what:"Sing words BETWEEN metronome clicks. This is the core skill for syncopated singing — the exact pattern ILTWYW uses.",
        setup:"Metronome at 122 BPM. No guitar. Stand or sit upright.",
        steps:[
          {text:"Set metronome to 122 and tap at 122.", why:"Each click is a quarter note."},
          {text:"Sing 4 lines. The bold words fall BETWEEN clicks, not on them:", visual:"lyricGrid"},
          {text:"NOD on the clicks. Your voice sings on the UP-nods (between clicks).", why:"Identical concept to Drill #2, but now with real words instead of &'s."},
          {text:"Record yourself. Listen back.", why:"Sarah (3/2): 'Doing the above metronome exercises + nods will help with this!'"},
        ],
        feel:"The words should feel like they're 'floating' between your taps. Your nod holds the grid; your voice dances around it. If the nod and voice sync up, something's wrong.",
        wrong:"If the words are landing ON the clicks, you're putting them on the beat. The words go BETWEEN. Think of the metronome click as a space where you're silent, and your voice fills the gaps.",
        sarah:"Tap tempo at 122, metronome playing at 122, sing the below lines. The underlines are the click of the metronome. Incorporate the nod!",
        metronome:122, levelUp:"Sing all 4 lines cleanly for 2 consecutive passes."
      },
      { id:"d2e3", time:15, title:"Sol Del Sur — Lead", type:"guitar",
        what:"Learn the lead guitar part. Accuracy at slow speed first, then build up.",
        setup:"Electric guitar. Sol Del Sur tab on Ultimate Guitar. YouTube video of the song.",
        steps:[
          {text:"Pull up the chords/tab on Ultimate Guitar.", why:"Reference for the lead part notes."},
          {text:"The 9's (arpeggiated figures): fast DUDUD pattern.", why:"Sarah (2/16): 'Learn the lead on your own on electric.'"},
          {text:"Slow YouTube to 75% speed → play along.", why:"Speed comes from accuracy, not practice at full speed."},
          {text:"Clean at 75%? → try 85% → then full speed.", why:"Progressive speed building. Don't skip to full speed."},
        ],
        feel:"At 75% speed, every note should ring clean. If you're buzzing strings or missing notes, stay at 75% longer.",
        wrong:"If you're playing all the notes but they're not at the right time, that's worse than playing fewer notes at the right time. Rhythmically tight > note-correct.",
        sarah:"Play along with the song, slow the song down on YouTube, make sure you're playing all the notes and playing them at the right time.",
        levelUp:"Clean play-through at 85% speed."
      },
      { id:"d2e4", time:10, title:"Sirens + Pitch Match", type:"vocal",
        what:"Map your range with sirens, then practice singing specific pitches on beat over a chord progression.",
        setup:"No guitar for sirens. Then guitar for pitch matching with Groove Beat 90 BPM.",
        steps:[
          {text:"Siren glides: lip trill (or 'vvv') from lowest (~C2) up to highest head voice (~G4) and back. 4–5 sec each way.", why:"Maps your whole range. Identify where it cracks or shifts."},
          {text:"Rounds 3–5: SLOW DOWN through A♭3–A3–B♭3 zone.", why:"This is your passaggio. Slow movement reveals the exact flip point."},
          {text:"Chord-tone singing: Am on guitar, Groove Beat 90 BPM. Sing chord tones — root on beat 1, 3rd on beat 3.", why:"Connects pitch accuracy to rhythmic placement."},
          {text:"Then try same pitches but placed on &'s instead of beats.", why:"Syncopated pitch matching — combines everything."},
        ],
        feel:"Sirens should feel like a smooth elevator ride through your range. The A3 zone might feel like hitting a speed bump — the trill may get uneven or the pitch wobbles. That's data, not failure. On pitch matching, the notes should 'lock in' to the chord you're playing on guitar.",
        wrong:"If your siren has a hard crack (not a gradual shift), you may be pushing too much air. Back off to 50% volume and try again.",
        sarah:"See if you can find exercises to practice flip from head voice into chest into mixed voice around A3 — remember to tell the AI that you're a man!",
        levelUp:"Siren through A3 with gradual thinning instead of crack."
      }
    ],
  },
  {
    num:3, name:"Application", focus:"I Like The Way You Walk", duration:"50 min",
    setup:"Guitar, Groove Beat 90 BPM, metronome, phone to record.",
    exercises:[
      { id:"d3e1", time:8, title:"Metronome Maintenance", type:"rhythm",
        what:"Keep pushing toward 244 BPM. By Day 3, the nod should feel more automatic.",
        setup:"Metronome, tap surface.",
        steps:[
          {text:"Drills #1 & #2 — push toward 244.", why:"Minimum 3 clean sets each."},
          {text:"Check: does the nod feel natural yet?", why:"If yes, the drill is working. If not, spend extra time here today."},
        ],
        feel:"By Day 3, the nod should feel less like 'thinking about nodding' and more like 'nodding while thinking about something else.'",
        wrong:"If the nod still requires full concentration, that's fine — but don't rush past this drill. It feeds everything else.",
        metronome:240, levelUp:"Nod feels semi-automatic at 240."
      },
      { id:"d3e2", time:7, title:"16th Note Drill", type:"rhythm",
        what:"Push the 16th note subdivision slightly faster.",
        setup:"Metronome at 78 (or 82–85 if 78 feels easy).",
        steps:[
          {text:"78 BPM: full count, then 'e and a' only.", why:"Review first, then strip."},
          {text:"If 78 feels comfortable, try 82–85 BPM.", why:"This directly feeds into the syncopation you need for ILTWYW."},
        ],
        feel:"At higher BPMs, the 'e and a' start to feel like a fast gallop. Each syllable should still be distinct — not blurred together.",
        wrong:"If the syllables merge into a slur, drop back to 78 and rebuild clarity.",
        metronome:78, levelUp:"Clean 'e and a' only at 85 BPM."
      },
      { id:"d3e3", time:20, title:"ILTWYW — Full Work", type:"song",
        what:"This is the main event. Strum + vocals over the groove beat, with focus on syncopated vocal timing.",
        setup:"Guitar. Groove Beat 90 BPM on speaker. Phone ready to record. Lyrics printed/memorized.",
        steps:[
          {text:"Start the Groove Beat at 90 BPM. Get the strum pattern automatic first — play 2 cycles without singing.", why:"Sarah (1/13): 'Master the strumming pattern before adding it to any video.' Strum must be on autopilot before vocals."},
          {text:"Add vocals one line at a time.", why:"Don't try to sing the whole song at once. Isolate each line, get the timing right, then chain them."},
          {text:"CRITICAL: the last word of each line is OFF-BEAT. Don't simplify it onto the beat.", why:"Sarah has flagged this in 3 consecutive lessons (2/16, 3/2). This is THE thing to fix."},
          {text:"Compare to the original recording after each attempt.", why:"Your ear needs to hear the difference between your version and theirs."},
          {text:"Record yourself. Listen back immediately.", why:"Sarah (1/13): 'Record yourself and listen back to see how long it takes you to realize you've gone off beat.'"},
        ],
        feel:"When the syncopation is right, the song should feel like it has a 'bounce' or 'swagger.' The vocal line should feel like it's dancing around the guitar strum, not sitting on top of it.",
        wrong:"If the song sounds 'flat' or 'square,' you're probably putting words on the beat. Listen to the original again — hear the bounce, then try to match it.",
        sarah:"Watch out for the timing of the last word of each line. Make sure you're not simplifying it and putting things directly on beat when they're supposed to be in between the beats.",
        levelUp:"Hear the difference between your syncopation and the original's."
      },
      { id:"d3e4", time:10, title:"Ooh Climbing + Messa di Voce", type:"vocal",
        what:"Improvise ascending 'ooh' patterns over the chord progression while exploring your break zone.",
        setup:"Guitar. Surf Rock Beat 120 BPM.",
        steps:[
          {text:"Am → C → G → D at 120 BPM. 4 'ooh' notes per chord that CLIMB.", why:"Sarah (1/27): 'On each 1 2 3 4, sing ooh and climb up (4 notes per chord).'"},
          {text:"Each chord gets a DIFFERENT pattern. Don't repeat the same 4 notes.", why:"Sarah (1/27): 'It shouldn't be the same 4 notes per chord — explore!'"},
          {text:"As you repeat cycles, push higher. Explore the A3 zone.", why:"You'll naturally approach your break. When you do, keep going."},
          {text:"COMMIT to each note. Push more air.", why:"Sarah (1/27): 'COMMIT to each note — if you push more air you'll be more likely to hit the note in key.'"},
        ],
        feel:"This should feel like musical exploration, not a drill. Each cycle is an opportunity to try new patterns. When you hit your break zone, the voice might crack — that's information, not failure. A committed crack is better than a safe whisper.",
        wrong:"If you're singing the same 4 notes on every chord, you're on autopilot. Force yourself to pick different starting notes, different intervals.",
        sarah:"COMMIT to each note — if you push more air you'll be more likely to hit the note in key.",
        levelUp:"Climb through A3 without backing down. Crack is data."
      }
    ],
  },
  {
    num:4, name:"Deep Practice", focus:"Stacking Skills", duration:"55 min",
    setup:"Guitar (electric for Sol Del Sur, acoustic for fingerpick), metronome, backing tracks, phone to record.",
    exercises:[
      { id:"d4e1", time:10, title:"Metronome Speed Push", type:"rhythm",
        what:"Push to 244 BPM. This is the target Sarah set in the 3/2 lesson.",
        setup:"Metronome, tap surface.",
        steps:[
          {text:"Drill #1 at 244 BPM (or highest clean tempo).", why:"Go for it. This is the target."},
          {text:"Drill #2 at matching tempo.", why:"Both drills stay paired."},
          {text:"Goal: 4 clean bars at 244.", why:"If you can't hold 4 bars, drop 10 BPM and rebuild."},
        ],
        feel:"At 244, the clicks feel extremely fast. Your nod should be small, tight movements — almost imperceptible from the outside. The count becomes more felt than spoken.",
        wrong:"If your count is falling behind the clicks, the tempo is too high. No shame in dropping 10–20 BPM.",
        metronome:244, levelUp:"4 clean bars of Drill #1 at 244."
      },
      { id:"d4e2", time:12, title:"Fingerpick + Singing", type:"guitar",
        what:"Layer voice on top of the fingerpicking pattern. This has been building since January 27.",
        setup:"Guitar. Surf Rock Beat 120 BPM.",
        steps:[
          {text:"Fingerpick Am → C → G → D at 120 BPM.", why:"This pattern should be automatic by now (7+ weeks of practice)."},
          {text:"Add 'ooh': 1 note per chord. Different note each time.", why:"Sarah (1/27, 2/16): 'Add singing note ooh (1 note per chord). It shouldn't be the same note every single time.'"},
          {text:"Stay in chest voice range for now. Improvise freely.", why:"This is easier than the climbing exercise. Just add one sustained note per chord change."},
          {text:"COMMIT — push air, don't whisper.", why:"Same principle as ooh climbing. Air = pitch accuracy."},
        ],
        feel:"The picking should be on total autopilot — like walking while talking. If adding the voice makes the picking stutter, the picking pattern isn't automatic enough yet.",
        wrong:"If you're thinking about which string to pluck, the voice will suffer. Go back to picking-only for a minute, then add voice again.",
        sarah:"Remember to commit! Fingerpick + add singing ooh (1 note per chord, shouldn't be the same note every time).",
        metronome:120, levelUp:"Full 4-chord cycle with voice without picking falling apart."
      },
      { id:"d4e3", time:15, title:"Sol Del Sur — Strum + Lead", type:"guitar",
        what:"Work the strum pattern. Sarah wants a video of this one.",
        setup:"Electric guitar. YouTube: Sol Del Sur.",
        steps:[
          {text:"Strum pattern: first note = individual string pluck, then the strum.", why:"Sarah (3/2): 'Make sure the very first note is an individual string pluck.'"},
          {text:"No extra strum after the first down strum.", why:"Sarah (3/2): 'Make sure there's no extra strum after the first down strum.'"},
          {text:"On C#m: pluck the A string at the start of the chord.", why:"Sarah (2/16): 'For the C#m, they pluck the A string at the start of the chord.'"},
          {text:"📹 RECORD the strum and send to Sarah.", why:"Sarah (2/16): 'As soon as you have it, send me a video so I can check to make sure it's correct!'"},
        ],
        feel:"The pluck before the strum should create a distinct 'pick → strum' two-part attack on each chord. It's not strum-strum, it's pluck-strum.",
        wrong:"If the pluck and strum blur together into one sound, you're starting the strum too early. Pause between the pluck and the strum.",
        sarah:"Try to figure out the strum on your own — as soon as you have it, send me a video so I can check!",
        levelUp:"Clean video of strum sent to Sarah."
      },
      { id:"d4e4", time:15, title:"Full Passaggio Workout", type:"vocal",
        what:"Extended vocal work through the break zone. Pair exercises with a groove beat for real-world feel.",
        setup:"Standing. Water nearby. Groove Beat 90 BPM for the scat section.",
        steps:[
          {text:"Descending 5-note scales on 'nee' (from Day 1 vocal). 3–4 rounds descending through A3.", why:"Warm-up for the break zone."},
          {text:"Sirens: lip trill, SLOW through A♭3→A3→B♭3.", why:"Map today's flip point — it can vary from yesterday."},
          {text:"Scat improv over Groove Beat 90 BPM: syllables 'doo' 'bah' 'dee' 'dah' following Am C G D chord tones.", why:"This combines rhythm + pitch + improv — the endgame skill."},
          {text:"Start: 1 syllable per beat → syncopate on &'s → try 16th note bursts.", why:"Progressive complexity within one exercise."},
        ],
        feel:"The scat improv should feel playful. You're making up music in real time. The groove beat keeps you honest rhythmically while you explore pitch.",
        wrong:"If your scat feels random (no relationship to the chord changes), simplify: just sing the root note of each chord on beat 1, then gradually add more notes.",
        sarah:"Continue working out where the voice flips and harnessing control over that range.",
        levelUp:"Scat improv where syncopations sound intentional, not accidental."
      }
    ],
  },
  {
    num:5, name:"Recording Day", focus:"Record Everything", duration:"45 min",
    setup:"Phone propped up for video. Good lighting if possible. Guitar, all backing tracks ready.",
    exercises:[
      { id:"d5e1", time:8, title:"Metronome Maintenance", type:"rhythm",
        what:"Quick check-in on Drills #1 & #2. Is the nod automatic yet?",
        setup:"Metronome, tap surface.",
        steps:[
          {text:"Drills #1 & #2 at target tempo.", why:"Maintenance, not pushing."},
          {text:"Self-check: is the nod fully automatic? Can you think about something else while nodding?", why:"If yes, you've internalized it. If no, spend extra time here today."},
        ],
        feel:"The nod should feel like something you do, not something you think about doing.",
        wrong:"If the nod still requires concentration, that's your priority today — not recording.",
        levelUp:"Nod is automatic while thinking about something else."
      },
      { id:"d5e2", time:25, title:"Record & Review", type:"record",
        what:"Record three things, listen back immediately, and take notes on what you hear.",
        setup:"Phone propped for video. All backing tracks queued.",
        steps:[
          {text:"Record #1: ILTWYW with Groove Beat 90 BPM. Full song, strum + vocals.", why:"This is your main performance piece. The recording reveals timing slips you can't hear while playing."},
          {text:"Record #2: Sol Del Sur strum pattern. → SEND THIS TO SARAH.", why:"She specifically asked for this video."},
          {text:"Record #3: Fingerpick Am C G D + ooh improvisation at 120 BPM.", why:"Captures your progress on the dual-skill exercise."},
          {text:"Listen back to each recording IMMEDIATELY after.", why:"Sarah (1/13): 'Record yourself and listen back to see how long it takes you to realize you've gone off beat.' Your goal: shrink that time."},
          {text:"Note specific timing slips. Which word? Which beat? Where did you drift?", why:"Specific notes let you target the exact problem spots tomorrow."},
        ],
        feel:"Listening to yourself is uncomfortable. That discomfort is the gap between what you hear in your head and what's actually coming out. The gap shrinks with practice.",
        wrong:"If you listen back and think 'that sounded fine,' listen again more carefully. Compare directly to the original. There's always a gap to close.",
        sarah:"Record yourself and listen back to see how long it takes you to realize you've gone off beat.",
        levelUp:"Identify drift within 2–3 beats. Sol Del Sur video sent to Sarah."
      },
      { id:"d5e3", time:12, title:"Vocal: Record + Review", type:"vocal",
        what:"Record vocal exercises to track your passaggio progress over time.",
        setup:"Standing. Phone recording audio. Water.",
        steps:[
          {text:"Messa di voce on G3, A♭3, A3, B♭3. Record all of it.", why:"Listening back reveals whether the swell is smooth or jerky through the break."},
          {text:"Siren: slow through break. Record a full up-and-down pass.", why:"You're listening for the timbre change — where chest becomes mixed becomes head."},
          {text:"Listen back. Focus on smoothness, not range.", why:"A smooth, narrow siren is better than a wide, cracky one."},
        ],
        feel:"On the recording, the passaggio might sound different than it felt. Sometimes it sounds smoother than it felt (good sign). Sometimes there's a crack you didn't feel (more warm-up needed).",
        wrong:"If the siren recording has a hard 'click' or 'pop' at A3, you were pushing too much air through the flip. Try less air, more control.",
        sarah:"Focus on the flip from head voice into chest into mixed voice around A3.",
        levelUp:"Siren recording shows gradual thinning (not a crack) through A3."
      }
    ],
  },
  {
    num:6, name:"Integration", focus:"Full Run-Throughs", duration:"50 min",
    setup:"All gear. All backing tracks. Energy.",
    exercises:[
      { id:"d6e1", time:8, title:"Graduation Test", type:"rhythm",
        what:"Can you do 8 clean bars of &'s only at 244 BPM? This is the benchmark for the week.",
        setup:"Metronome at 244. Tap at 122.",
        steps:[
          {text:"Drill #2 (&'s only) at 244 BPM / tapping 122.", why:"Full target speed."},
          {text:"Go for 8 bars. Count them.", why:"8 bars is double the target. This is the stress test."},
        ],
        feel:"At 8 bars, your body should be on autopilot. The nod carries you. If you're counting bars consciously, that's fine — the nod is the important part.",
        wrong:"If you break at bar 5 or 6, fatigue might be the issue. Rest 30 seconds, try again. It's not a speed problem at that point.",
        sarah:"This is the graduation test for the week.",
        metronome:244, levelUp:"8 clean bars, solid nod, at 244."
      },
      { id:"d6e2", time:10, title:"Lyric Improv", type:"vocal",
        what:"The 4-line exercise, but now with YOUR OWN words. If you can improvise words with correct off-beat placement, the rhythm is internalized.",
        setup:"Metronome at 122. No guitar.",
        steps:[
          {text:"4-line lyric exercise at 122. Standard version first.", why:"Warm up with the known version."},
          {text:"Now: improvise your OWN words, same rhythmic placement.", why:"If you can make up words that land between the beats, you've internalized the syncopation."},
          {text:"Check: can you FEEL the off-beats without counting?", why:"Feeling it (without counting) = internalized. Counting it = still learning. Both are fine."},
        ],
        feel:"Improvised words with correct placement = the syncopation lives in your body now, not just your head. It should feel like the rhythm is 'pulling' the words into the right spots.",
        wrong:"If your improvised words keep landing on the beat, go back to the standard version for a few passes, then try again.",
        metronome:122, levelUp:"Improvised words land off-beat without conscious counting."
      },
      { id:"d6e3", time:15, title:"ILTWYW — Performance Run", type:"song",
        what:"Full song, no stopping. If you drift, re-enter on beat. This trains the recovery skill you need for live playing.",
        setup:"Guitar. Groove Beat 90 BPM. Pretend it's a live performance.",
        steps:[
          {text:"Groove Beat 90 BPM. Full song: strum + vocals.", why:"This is a run-through, not a drill. No stopping."},
          {text:"If you drift off beat: DO NOT STOP. Re-enter on the next beat.", why:"Sarah (1/13): 'Stop as soon as you realize you're off beat, and enter back in on beat.' The key metric is how quickly you recover."},
          {text:"Goal: shorter drift time + cleaner re-entry each time.", why:"In live performance, nobody hears a 1-beat drift. They hear a 4-bar train wreck."},
        ],
        feel:"This should feel like performing. The pressure of 'don't stop' creates a different mindset than drilling. Recovery is a skill — you're practicing the recovery, not the mistake.",
        wrong:"If you stop and restart, you've turned a performance into a drill. Commit to the no-stop rule.",
        sarah:"Stop as soon as you realize you're off beat, and enter back in on beat.",
        levelUp:"Complete ILTWYW run without restart. Re-entries within 1 beat."
      },
      { id:"d6e4", time:12, title:"Sol Del Sur — Full Pass", type:"guitar",
        what:"Play along with the actual recording. Alternate lead and strum sections.",
        setup:"Electric guitar. YouTube: Sol Del Sur at full speed.",
        steps:[
          {text:"Lead at full speed.", why:"You've built up from 75%."},
          {text:"Strum with clean entries (pluck → strum pattern).", why:"This is what you recorded on Day 5."},
          {text:"Alternate lead/strum sections along with the song.", why:"Full song integration."},
        ],
        feel:"Playing along with the original should feel like playing WITH the band. You're fitting into their groove, not fighting it.",
        wrong:"If you're always behind the recording, your tempo perception may be off. Use the metronome drills to recalibrate.",
        sarah:"Play along with the song, make sure you're playing all the notes at the right time.",
        levelUp:"Full play-through matching the recording's timing."
      }
    ],
  },
  {
    num:7, name:"Rest + Play", focus:"Musical Exploration", duration:"30–40 min",
    setup:"Guitar. Backing track at whatever BPM feels good. Cozy vibes.",
    exercises:[
      { id:"d7e1", time:5, title:"Light Metronome", type:"rhythm",
        what:"2–3 light sets. Maintain, don't push. It's rest day.",
        setup:"Metronome, tap surface.",
        steps:[
          {text:"Drill #1 at 244. Just 2–3 sets.", why:"Keep the pattern alive without grinding."},
        ],
        feel:"This should feel easy compared to Day 6. If it doesn't, that's useful info — you may need more rest.",
        wrong:"If you're tempted to push tempo higher on rest day, don't. Save it.",
        levelUp:"Drill feels routine."
      },
      { id:"d7e2", time:20, title:"Free Improvisation", type:"play",
        what:"Play whatever you want. Fingerpick, sing, explore. The only rule: stay on beat.",
        setup:"Guitar. 120 BPM or 90 BPM backing track — your choice.",
        steps:[
          {text:"Fingerpick Am C G D. Sing whatever feels good.", why:"No prescribed notes. No prescribed words. Just music."},
          {text:"Climb through your break. Play with dynamics: loud chest → soft head → back.", why:"Explore your whole range without pressure."},
          {text:"MEDITATE while playing. Let your mind wander. Stay on beat.", why:"Sarah (1/13): 'Once you're locked in, meditate! Let your mind wander. It will likely make you go off beat — make sure to stay on!'"},
        ],
        feel:"This is the ultimate test: can you stay in the groove while your mind is elsewhere? When the rhythm is truly internalized, it holds you up even when you're not thinking about it. Like walking.",
        wrong:"If your mind wanders and you go off beat, that's exactly the exercise. Notice the drift, re-enter, keep going.",
        sarah:"Once you're locked in, meditate! Let your mind wander. It will likely make you go off beat — make sure to stay on!",
        levelUp:"Stay on beat while thinking about something else."
      },
      { id:"d7e3", time:10, title:"Free Singing", type:"vocal",
        what:"Vocal cool-down. Gentle exploration of your range. Enjoy the instrument.",
        setup:"No guitar. Standing. Water.",
        steps:[
          {text:"Sing through passaggio with different vowels: 'ah', 'oh', 'ee', 'oo'.", why:"Each vowel feels different through the break. 'Oo' is easiest, 'ah' is hardest."},
          {text:"Dynamics: start loud in chest → soften into head voice → come back.", why:"Dynamic swells through the break train the messa di voce in a musical context."},
          {text:"Finish with gentle sirens (lip trill) for warm-down.", why:"Cool down the voice like stretching after a workout."},
        ],
        feel:"This should feel like the end of a good workout — tired but good. The voice might feel more 'flexible' than at the start of the week.",
        wrong:"If your voice feels strained or tight, skip this and just do gentle sirens. Rest is more important than one more exercise.",
        sarah:"Musical play, not drilling. Enjoy the instrument.",
        levelUp:"Can you sing through your break without thinking about it? That's graduation."
      }
    ],
  }
];

const VOCAL_EXERCISES = [
  { id:"v1", num:1, title:"Descending 5-Note Scale", purpose:"Approach break from above — where the real mapping happens",
    when:"Days 1, 4. Also good as first vocal exercise of any session.",
    what:"Start above your break on a comfortable note, descend through A3 on a single vowel. The voice naturally transitions from head/mix into chest. You're observing where that happens, not forcing it.",
    howTo:[
      "Stand upright, shoulders relaxed, jaw loose.",
      "Start on C4. Sing: C4→B3→A3→G3→F3 on 'nee'. One note per beat at 80 BPM.",
      "Each round starts a half step lower. You'll cross through the break around round 3.",
      "Volume: conversational, 6/10. The quieter you are, the more the flip reveals itself."
    ],
    diagram:"Round 1: C4 → B3 → A3 → G3 → F3\nRound 2: B3 → A#3→ G#3→ F#3→ E3\nRound 3: Bb3→ A3 → Ab3→ G3 → Gb3 ← FLIP ZONE\nRound 4: A3 → Ab3→ G3 → Gb3→ F3 ← deep in it",
    feel:"Around B♭3→A3, you'll notice the voice 'settling' — like stepping off a curb. The tone gets slightly heavier, warmer, more chest-resonant. The 'nee' vowel naturally brightens the sound, making the transition smoother.",
    wrong:"If you're straining to keep the same tone quality all the way down, you're fighting the flip. Let it happen. The voice WANTS to shift. Your job is to make the shift gradual, not to prevent it.",
    tip:"Why 'nee'? The closed vowel + nasal consonant keeps the sound forward and bright, which encourages mix voice through the break. 'Ah' would drop into chest too early.",
    progression:"Week 1: Observe the flip. Week 2: Try to make it smoother. Week 3: See if you can 'delay' the flip by one half step."
  },
  { id:"v2", num:2, title:"Messa di Voce", purpose:"The #1 exercise for building a seamless mix — quiet→loud→quiet on one note",
    when:"Days 1, 5. Critical for passaggio control.",
    what:"Sing a single note in your break zone. Start as quiet as possible, swell to medium volume, back to quiet. The crescendo tries to pull you into chest voice. The goal: stay in mix through the entire swell.",
    howTo:[
      "Stand. Breathe into your ribs (not your shoulders). Feel your ribcage expand sideways.",
      "Sing 'ah' on G3 at piano (pp). Hold for 2 seconds.",
      "Swell to mezzo forte (mf) over 3 seconds. Then decrescendo back to pp over 3 seconds.",
      "3 cycles on G3, then move to A♭3, A3, B♭3.",
      "BREATH (Appoggio): Maintain outward rib expansion as you exhale. Don't let your ribs collapse. This is what makes the swell possible without strain."
    ],
    diagram:"pp ━━━━━━━━ mf ━━━━━━━━ pp\n          (8 seconds)\n\nG3:  ●●● (should feel easy)\nA♭3: ●●● (getting interesting)\nA3:  ●●● (the crescendo wants to flip you)\nB♭3: ●●● (let it flip if it wants)",
    feel:"On G3, this should feel effortless — like humming. On A♭3, you'll start to feel a 'choice point' during the crescendo: the voice wants to either push into full chest or thin out into head. On A3, the crescendo is the test — can you swell without the voice flipping? If it does flip, that's fine. On B♭3, most baritones will be in light head voice by the quiet part.",
    wrong:"If the swell sounds like a sudden jump from quiet to loud (instead of a gradual ramp), slow down the crescendo. If the voice cracks during the swell on A3, reduce your maximum volume — don't go all the way to mf, stop at mp.",
    tip:"VOWEL MODIFICATION: As you approach A3, let 'ah' drift toward 'uh'. This lowers the first formant, letting the vocal folds thin out for mix voice instead of hitting the chest voice ceiling. It should sound rounder, not darker.",
    progression:"Week 1: Get comfortable with the shape (pp→mf→pp). Week 2: Smooth out the swell on A♭3 and A3. Week 3: Try to keep the same tone quality throughout the entire swell on A3."
  },
  { id:"v3", num:3, title:"Siren Glides", purpose:"Map your entire range, find the exact flip points, and train smooth transitions",
    when:"Days 2, 4, 5. Good warm-up. Good diagnostic.",
    what:"Lip trill (or sustained 'vvv') gliding from your lowest note up to your highest and back. The lip trill adds SOVT backpressure which makes the transition through the break easier.",
    howTo:[
      "Lips together, loose. Start a lip trill (like a horse noise).",
      "If lip trills are hard, use 'vvv' or hum through a straw instead.",
      "Start on your lowest comfortable note (~C2). Glide UP to your highest head voice (~G4). 4–5 seconds up.",
      "Glide back DOWN in 4–5 seconds.",
      "Rounds 3–5: SLOW DOWN through the A♭3→A3→B♭3 zone. Take 3–4 seconds just for those three notes."
    ],
    diagram:"C2 ══════════════════════════════ G4\n           smooth glide up →\n    ← smooth glide down\n\n         ┃ SLOW ZONE ┃\n         A♭3 ── A3 ── B♭3\n         Take 3–4 sec here\n         Listen: crack? shift? smooth?",
    feel:"The siren should feel like an elevator ride. In chest voice (C2→G3), it feels warm and full. Through the break (A♭3→B♭3), you might feel the sound 'thin out' or the trill become uneven. In head voice (B3→G4), it feels lighter, buzzier, more in your head/mask. The uneven zone is your passaggio — exactly where you're training.",
    wrong:"If the trill STOPS during the break (complete cutout, not just unevenness), you may be pushing too much air. Back off to 50% airflow. The trill should be continuous, even if it wobbles.",
    tip:"SOVT (Semi-Occluded Vocal Tract) exercises like lip trills create backpressure that helps the vocal folds transition between registers more smoothly. Think of it as training wheels for the passaggio. The trill does some of the work for you.",
    progression:"Week 1: Complete the full range (cracks are fine). Week 2: Cracks become wobbles. Week 3: Wobbles become gradual shifts."
  },
  { id:"v4", num:4, title:"Rhythmic Pitch Matching", purpose:"Connect pitch accuracy to rhythmic placement — you need both for real singing",
    when:"Days 2, 3. Builds toward syncopated vocal placement.",
    what:"Over a groove beat with Am on guitar, sing specific chord tones on specific beats. Then move them to off-beats. This fuses pitch training with rhythm training.",
    howTo:[
      "Guitar: Am chord. Groove Beat 90 BPM playing.",
      "Sing Am chord tones: Root (A2) on beat 1, 3rd (C3) on beat 3.",
      "Next bar: 5th (E3) on beat 1, Octave (A3) on beat 3.",
      "Descend back down over 2 bars.",
      "Repeat for C, G, D chords with their chord tones.",
      "LEVEL UP: Once comfortable, move the notes to &'s instead of beats. Same pitches, syncopated."
    ],
    diagram:"Am chord:\n  Bar 1: A2 (beat 1) ── C3 (beat 3)\n  Bar 2: E3 (beat 1) ── A3 (beat 3) ← break zone!\n  Bar 3: E3 (beat 1) ── C3 (beat 3)\n  Bar 4: A2 (beat 1) ── rest\n\nSYNCOPATED VERSION:\n  Bar 1: ── A2 (& of 1) ── C3 (& of 3)\n  Bar 2: ── E3 (& of 1) ── A3 (& of 3)\n  ...",
    feel:"On-beat version should feel like 'placing' notes on a shelf — deliberate and precise. The syncopated version should feel like the notes are floating between the beats, similar to the lyric placement exercise.",
    wrong:"If you're hitting approximately-right pitches (close but not quite), play the target note on guitar first, listen, then sing it. Pitch memory is a skill that improves with exact reference points.",
    tip:"When you sing A3 on beat 3 of bar 2, you're singing in your break zone. This is intentional — it trains you to navigate the passaggio while thinking about rhythm, which is exactly what real singing demands.",
    progression:"Week 1: On-beat, all pitches accurate. Week 2: Syncopated version. Week 3: Improvise your own patterns staying on chord tones."
  },
  { id:"v5", num:5, title:"Ooh Climbing", purpose:"Improvised ascending patterns — the bridge between exercises and real singing",
    when:"Days 3, 4. Originated from Lesson 1/27.",
    what:"Over a chord progression, sing 4 ascending 'ooh' notes per chord. Each chord gets different notes. Push through the break zone as you repeat.",
    howTo:[
      "Guitar: Am → C → G → D. Island strum or fingerpick at 120 BPM (Surf Rock Beat).",
      "On Am: sing 4 'ooh' notes that CLIMB. Example: A2→C3→E3→A3.",
      "On C: sing 4 DIFFERENT climbing notes. Example: C3→E3→G3→C4.",
      "On G and D: keep climbing, keep changing the pattern.",
      "As you repeat cycles, push the range higher. Let yourself enter the break zone.",
      "COMMIT to each note. More air = better pitch."
    ],
    diagram:"Am:  ooh → ooh → ooh → ooh  (climbing)\nC:   ooh → ooh → ooh → ooh  (different!)\nG:   ooh → ooh → ooh → ooh  (explore)\nD:   ooh → ooh → ooh → ooh  (commit!)\n\nCycle 2: Start higher on Am\nCycle 3: Push into break zone\nCycle 4: Explore head voice territory",
    feel:"This should feel like musical exploration — you're improvising a melody in real time over a chord progression. When you enter the break zone, the voice may thin out or crack. That's not failure, it's the exercise working. A committed crack teaches your voice more than a safe whisper.",
    wrong:"If you sing the same 4 notes on every chord, you're on autopilot. Force yourself to start on different notes, use different intervals. The point is exploration, not repetition.",
    tip:"'Commit' is Sarah's most frequent instruction. Physiologically, 'more air' means more subglottic pressure, which gives the vocal folds more to work with. Soft/breathy singing in the break zone just makes the folds unable to phonate cleanly. Push the air, let the voice figure it out.",
    progression:"Week 1: Comfortable climbing in chest range. Week 2: Regularly entering break zone. Week 3: Occasional head voice notes without backing down."
  },
  { id:"v6", num:6, title:"Rhythmic Scat Improvisation", purpose:"The endgame — rhythm + pitch + improv in real time",
    when:"Day 4. Advanced exercise — do this only after the others feel comfortable.",
    what:"Over a groove beat, improvise scat syllables following chord tones. Start simple, increase rhythmic complexity. This is the closest thing to actual improvised singing.",
    howTo:[
      "No guitar. Groove Beat 90 BPM.",
      "Use syllables: 'doo' 'bah' 'dee' 'dah'.",
      "Follow Am → C → G → D chord tones (you should know them from Ex 4).",
      "Level 1: One syllable per beat. 'doo . . doo . . doo . . doo'",
      "Level 2: Move syllables to &'s. '. doo . . doo . . doo . . doo'",
      "Level 3: 16th note bursts. 'doo-ba-dee . doo-ba-dee . doo'",
      "Record 2 minutes."
    ],
    diagram:"Level 1 (on-beat):\n  doo · · doo · · doo · · doo\n   1       2       3       4\n\nLevel 2 (syncopated):\n  · doo · · doo · · doo · · doo\n     &       &       &       &\n\nLevel 3 (16th note bursts):\n  doo-ba-dee · doo-ba-dee · doo\n   1 e &        2 e &        3",
    feel:"Level 1 should feel like the pitch matching exercise with different syllables. Level 2 is the lyric placement exercise with scat. Level 3 is where it gets creative — you're combining the 16th note subdivision skill with real-time pitch choices.",
    wrong:"If it sounds random (no connection to the chords), simplify. Go back to Level 1 and just sing root notes of each chord. Build back up.",
    tip:"Record yourself and listen back. The diagnostic: are the syncopations INTENTIONAL or ACCIDENTAL? Intentional syncopation = you chose to place that note off-beat. Accidental = you lost the beat. You can hear the difference — intentional sounds musical, accidental sounds lost.",
    progression:"Week 1: Comfortable at Level 1. Week 2: Clean Level 2. Week 3: Musical-sounding Level 3."
  }
];

// ─── SOUND KITS ─────────────────────────────────────────────────────
// Each kit defines synth params for Tone.js — different timbres
const SOUND_KITS = {
  click:    { label:"Click",     synthType:"membrane", osc:"sine",     pitchDecay:0.008, octaves:4,  attack:0.001, decay:0.06, volume:-8 },
  wood:     { label:"Woodblock", synthType:"membrane", osc:"triangle", pitchDecay:0.005, octaves:6,  attack:0.001, decay:0.04, volume:-6 },
  hihat:    { label:"Hi-Hat",    synthType:"metal",    osc:"square",   pitchDecay:0.01,  octaves:2,  attack:0.001, decay:0.03, volume:-14 },
  rim:      { label:"Rimshot",   synthType:"membrane", osc:"sawtooth", pitchDecay:0.015, octaves:5,  attack:0.001, decay:0.05, volume:-8 },
  cowbell:  { label:"Cowbell",   synthType:"metal",    osc:"square",   pitchDecay:0.02,  octaves:3,  attack:0.001, decay:0.08, volume:-12 },
  clave:    { label:"Clave",     synthType:"membrane", osc:"sine",     pitchDecay:0.002, octaves:8,  attack:0.001, decay:0.03, volume:-6 },
  shaker:   { label:"Shaker",    synthType:"noise",    osc:null,       pitchDecay:0,     octaves:0,  attack:0.001, decay:0.04, volume:-16 },
};

const KIT_KEYS = Object.keys(SOUND_KITS);

// Accent levels: determines volume offset + pitch for each beat
// accent = loud downbeat, normal = standard, ghost = quiet, mute = silent
const ACCENT_LEVELS = ["accent","normal","ghost","mute"];
const ACCENT_CONFIG = {
  accent: { volOffset:0,   pitchOffset:0,  label:"Accent", color:T.gold },
  normal: { volOffset:-4,  pitchOffset:12, label:"Normal", color:T.textMed },
  ghost:  { volOffset:-10, pitchOffset:12, label:"Ghost",  color:T.textMuted },
  mute:   { volOffset:-99, pitchOffset:0,  label:"Mute",   color:T.border },
};

function createSynth(kit) {
  const k = SOUND_KITS[kit];
  if (k.synthType === "noise") {
    return new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: { attack: k.attack, decay: k.decay, sustain: 0 },
      volume: k.volume
    }).toDestination();
  }
  if (k.synthType === "metal") {
    return new Tone.MetalSynth({
      frequency: 400, envelope: { attack: k.attack, decay: k.decay, sustain: 0, release: 0.01 },
      harmonicity: 5.1, modulationIndex: 32, resonance: 4000, octaves: k.octaves, volume: k.volume
    }).toDestination();
  }
  // membrane (default)
  return new Tone.MembraneSynth({
    pitchDecay: k.pitchDecay, octaves: k.octaves,
    oscillator: { type: k.osc },
    envelope: { attack: k.attack, decay: k.decay, sustain: 0, release: 0.05 },
    volume: k.volume
  }).toDestination();
}

function triggerSynth(synth, kit, pitchNote, volDb, time) {
  const k = SOUND_KITS[kit];
  if (k.synthType === "noise") {
    synth.volume.value = volDb;
    synth.triggerAttackRelease("32n", time);
  } else if (k.synthType === "metal") {
    synth.volume.value = volDb;
    synth.triggerAttackRelease("32n", time);
  } else {
    synth.volume.value = volDb;
    synth.triggerAttackRelease(pitchNote, "32n", time);
  }
}

// ─── METRONOME ENGINE ───────────────────────────────────────────────
function useMetronome() {
  const [bpm, setBpm] = useState(120);
  const [playing, setPlaying] = useState(false);
  const [beat, setBeat] = useState(0);
  const [beatsPerBar, setBeatsPerBar] = useState(4);
  const [soundKit, setSoundKit] = useState("click");
  // Per-beat config: accent level + optional per-beat sound override
  const [beatConfig, setBeatConfig] = useState([
    { accent:"accent", kit:null },
    { accent:"normal", kit:null },
    { accent:"normal", kit:null },
    { accent:"normal", kit:null },
  ]);
  const loopRef = useRef(null);
  const synthsRef = useRef({});
  const beatConfigRef = useRef(beatConfig);
  const soundKitRef = useRef(soundKit);
  const beatsRef = useRef(beatsPerBar);

  // Keep refs in sync
  useEffect(() => { beatConfigRef.current = beatConfig; }, [beatConfig]);
  useEffect(() => { soundKitRef.current = soundKit; }, [soundKit]);
  useEffect(() => { beatsRef.current = beatsPerBar; }, [beatsPerBar]);

  // Create/dispose synths when kits change
  useEffect(() => {
    // Build set of all kits we need
    const kitsNeeded = new Set([soundKit]);
    beatConfig.forEach(bc => { if (bc.kit) kitsNeeded.add(bc.kit); });
    // Create missing synths
    kitsNeeded.forEach(k => {
      if (!synthsRef.current[k]) synthsRef.current[k] = createSynth(k);
    });
    // Cleanup unused
    Object.keys(synthsRef.current).forEach(k => {
      if (!kitsNeeded.has(k)) { synthsRef.current[k]?.dispose(); delete synthsRef.current[k]; }
    });
    return () => {
      Object.values(synthsRef.current).forEach(s => s?.dispose());
      synthsRef.current = {};
    };
  }, [soundKit, beatConfig]);

  const start = useCallback(async () => {
    await Tone.start();
    Tone.Transport.bpm.value = bpm;
    let count = 0;
    loopRef.current = new Tone.Loop((time) => {
      const cfg = beatConfigRef.current;
      const numBeats = beatsRef.current;
      const b = count % numBeats;
      const bc = cfg[b] || { accent:"normal", kit:null };
      const acc = ACCENT_CONFIG[bc.accent];

      if (bc.accent !== "mute") {
        const kit = bc.kit || soundKitRef.current;
        const synth = synthsRef.current[kit];
        if (synth) {
          const basePitch = bc.accent === "accent" ? "C2" : "C3";
          const vol = SOUND_KITS[kit].volume + acc.volOffset;
          triggerSynth(synth, kit, basePitch, vol, time);
        }
      }

      Tone.Draw.schedule(() => setBeat(b), time);
      count++;
    }, "4n").start(0);
    Tone.Transport.start();
    setPlaying(true);
  }, [bpm]);

  const stop = useCallback(() => {
    loopRef.current?.stop(); loopRef.current?.dispose();
    Tone.Transport.stop(); Tone.Transport.position = 0;
    setPlaying(false); setBeat(0);
  }, []);

  const changeBpm = useCallback((v) => {
    setBpm(v);
    if (Tone.Transport.state === "started") Tone.Transport.bpm.value = v;
  }, []);

  const changeBeats = useCallback((n) => {
    setBeatsPerBar(n);
    setBeatConfig(prev => {
      const next = [];
      for (let i = 0; i < n; i++) {
        next.push(prev[i] || { accent: i === 0 ? "accent" : "normal", kit: null });
      }
      return next;
    });
  }, []);

  const cycleAccent = useCallback((idx) => {
    setBeatConfig(prev => {
      const next = [...prev];
      const cur = ACCENT_LEVELS.indexOf(next[idx].accent);
      next[idx] = { ...next[idx], accent: ACCENT_LEVELS[(cur + 1) % ACCENT_LEVELS.length] };
      return next;
    });
  }, []);

  const setBeatKit = useCallback((idx, kit) => {
    setBeatConfig(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], kit: kit === soundKit ? null : kit };
      return next;
    });
  }, [soundKit]);

  return {
    bpm, playing, beat, beatsPerBar, soundKit, beatConfig,
    start, stop, changeBpm, changeBeats, setSoundKit, cycleAccent, setBeatKit
  };
}

function useTimer(mins) {
  const [sec, setSec] = useState(mins * 60);
  const [on, setOn] = useState(false);
  const [total] = useState(mins * 60);
  const ref = useRef(null);
  useEffect(() => {
    if (on && sec > 0) ref.current = setInterval(() => setSec(s=>s-1), 1000);
    else clearInterval(ref.current);
    return () => clearInterval(ref.current);
  }, [on, sec]);
  const toggle = () => setOn(r=>!r);
  const reset = () => { setOn(false); setSec(total); };
  const pct = ((total - sec) / total) * 100;
  const fmt = `${Math.floor(sec/60)}:${(sec%60).toString().padStart(2,"0")}`;
  return { sec, on, toggle, reset, pct, fmt };
}

// ─── COMPONENTS ─────────────────────────────────────────────────────

function TypeBadge({ type }) {
  const t = TYPE[type] || TYPE.rhythm;
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:4,
      fontSize:10, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase",
      color:t.color, fontFamily:T.sans, padding:"3px 10px",
      background:t.color+"12", borderRadius:20, border:`1px solid ${t.color}25`
    }}>{t.icon} {t.label}</span>
  );
}

function BeatDots({ beat, playing, compact, beatConfig, beatsPerBar }) {
  const n = beatsPerBar || 4;
  const cfg = beatConfig || Array.from({length:n}, (_,i) => ({accent:i===0?"accent":"normal"}));
  const s = compact ? 7 : 12, ds = compact ? 9 : 16;
  return (
    <div style={{ display:"flex", gap:compact?3:6, justifyContent:"center", margin:compact?0:"10px 0" }}>
      {Array.from({length:n}).map((_,i) => {
        const acc = cfg[i]?.accent || "normal";
        const c = ACCENT_CONFIG[acc]?.color || T.textMed;
        const isMute = acc === "mute";
        const isActive = playing && beat === i;
        const size = acc === "accent" ? ds : s;
        return (
          <div key={i} style={{
            width:size, height:size, borderRadius:"50%",
            background: isMute ? "transparent" : (isActive ? T.gold : c+"40"),
            border: isMute ? `2px dashed ${T.border}` : (isActive ? `2px solid ${T.gold}` : "2px solid transparent"),
            transition:"all 0.08s", transform:isActive?"scale(1.3)":"scale(1)",
            boxShadow:isActive&&!isMute?`0 0 10px ${T.goldMed}`:"none"
          }} />
        );
      })}
    </div>
  );
}

function TimerRing({ pct, fmt, size=50 }) {
  const r=(size-6)/2, circ=2*Math.PI*r, done=pct>=100;
  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.border} strokeWidth={2.5} />
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke={done?T.success:T.gold} strokeWidth={2.5}
          strokeDasharray={circ} strokeDashoffset={circ*(1-pct/100)}
          strokeLinecap="round" style={{ transition:"stroke-dashoffset 0.5s" }} />
      </svg>
      <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center" }}>
        <div style={{ fontSize:11, fontWeight:600, fontFamily:T.sans, color:done?T.success:T.textDark }}>
          {done?"✓":fmt}
        </div>
      </div>
    </div>
  );
}

function LyricGrid() {
  const lines = [
    {beats:["__","I","__","once","__","heard","__","__","__","__"]},
    {beats:["__","bout","__","a","__","place","__","__","__","__"]},
    {beats:["__","some","__","where","__","south","__","__","__","__"]},
    {beats:["__","far","__","a","__","way","__","__","__","__"]},
  ];
  return (
    <div style={{
      background:T.bgSoft, border:`1px solid ${T.border}`, borderRadius:12,
      padding:16, marginBottom:14, overflowX:"auto"
    }}>
      <div style={{ fontSize:10, fontWeight:700, color:T.textMuted, letterSpacing:1.5, marginBottom:10, fontFamily:T.sans }}>
        LYRIC PLACEMENT — words fall BETWEEN clicks
      </div>
      {lines.map((line,li) => (
        <div key={li} style={{ display:"flex", gap:0, marginBottom:li<3?6:0 }}>
          {line.beats.map((b,bi) => {
            const isClick = b === "__";
            const isWord = !isClick;
            return (
              <div key={bi} style={{
                flex:1, textAlign:"center", padding:"6px 2px",
                background: isClick ? T.gold+"10" : "transparent",
                borderRadius:4, minWidth:36
              }}>
                <div style={{
                  fontSize: isWord ? 14 : 11,
                  fontWeight: isWord ? 700 : 400,
                  color: isWord ? T.textDark : T.textMuted,
                  fontFamily: isWord ? T.serif : T.sans,
                  fontStyle: isWord ? "italic" : "normal"
                }}>
                  {isClick ? "click" : b}
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <div style={{ fontSize:11, color:T.textLight, marginTop:10, fontFamily:T.sans, fontStyle:"italic" }}>
        Gold columns = metronome click (122 BPM). Words land in the gaps between clicks.
      </div>
    </div>
  );
}

function SarahQuote({ text }) {
  return (
    <div style={{
      borderLeft:`3px solid ${T.gold}`,
      padding:"10px 16px", margin:"12px 0",
      background:T.goldSoft, borderRadius:"0 10px 10px 0"
    }}>
      <div style={{ fontSize:10, fontWeight:700, color:T.gold, letterSpacing:1.5, marginBottom:4, fontFamily:T.sans }}>
        SARAH'S NOTE
      </div>
      <div style={{ fontSize:13, color:T.goldDark, fontFamily:T.sans, lineHeight:1.6, fontStyle:"italic" }}>
        "{text}"
      </div>
    </div>
  );
}

function DetailSection({ label, color, children }) {
  return (
    <div style={{
      background:color+"08", border:`1px solid ${color}18`,
      borderRadius:10, padding:"12px 16px", marginBottom:10
    }}>
      <div style={{ fontSize:10, fontWeight:700, color, letterSpacing:1.5, marginBottom:6, fontFamily:T.sans, textTransform:"uppercase" }}>
        {label}
      </div>
      <div style={{ fontSize:13, color:T.textMed, fontFamily:T.sans, lineHeight:1.7 }}>
        {children}
      </div>
    </div>
  );
}

function ExerciseCard({ ex, completed, onComplete, metro, dayColor }) {
  const [open, setOpen] = useState(false);
  const timer = useTimer(ex.time);

  return (
    <div style={{
      background:completed?T.successSoft:T.bgCard,
      border:`1px solid ${completed?T.success+"40":T.border}`,
      borderRadius:14, marginBottom:10, overflow:"hidden",
      transition:"all 0.2s", boxShadow:open?T.md:T.sm
    }}>
      <div onClick={()=>setOpen(!open)} style={{
        display:"flex", alignItems:"center", gap:12, padding:"14px 18px", cursor:"pointer"
      }}>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, minWidth:44 }}>
          <TypeBadge type={ex.type} />
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontWeight:600, fontSize:15, color:T.textDark, fontFamily:T.sans }}>{ex.title}</div>
          <div style={{ fontSize:12, color:T.textLight, fontFamily:T.sans, marginTop:1 }}>{ex.time} min</div>
        </div>
        <TimerRing pct={timer.pct} fmt={timer.fmt} size={42} />
        <div style={{ color:T.textMuted, fontSize:13, transition:"transform 0.2s", transform:open?"rotate(180deg)":"" }}>▾</div>
      </div>

      {open && (
        <div style={{ padding:"0 18px 18px" }}>
          {/* What & Why */}
          <div style={{
            fontSize:14, color:T.textMed, fontFamily:T.sans, lineHeight:1.7,
            marginBottom:14, padding:"10px 14px", background:T.bgSoft, borderRadius:10
          }}>{ex.what}</div>

          {/* Setup */}
          {ex.setup && (
            <div style={{ fontSize:12, color:T.textLight, fontFamily:T.sans, marginBottom:12, display:"flex", gap:6, alignItems:"flex-start" }}>
              <span style={{ color:T.gold, fontWeight:700, fontSize:11 }}>SETUP:</span> {ex.setup}
            </div>
          )}

          {/* Timer + metronome controls */}
          <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
            <button onClick={timer.toggle} style={{
              background:timer.on?T.warm:T.gold, border:"none", borderRadius:8, color:"#fff",
              padding:"8px 18px", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:T.sans
            }}>{timer.on?"Pause":"Start Timer"}</button>
            <button onClick={timer.reset} style={{
              background:"transparent", border:`1px solid ${T.border}`, borderRadius:8,
              color:T.textLight, padding:"8px 14px", fontSize:12, cursor:"pointer", fontFamily:T.sans
            }}>Reset</button>
            {ex.metronome && (
              <button onClick={() => { metro.changeBpm(ex.metronome); if (!metro.playing) metro.start(); }} style={{
                background:"transparent", border:`1px solid ${T.gold}40`, borderRadius:8,
                color:T.gold, padding:"8px 14px", fontSize:12, cursor:"pointer", fontWeight:600, fontFamily:T.sans
              }}>♩ {ex.metronome} BPM</button>
            )}
          </div>

          {/* Steps */}
          <div style={{ marginBottom:14 }}>
            {ex.steps.map((s,i) => (
              <div key={i}>
                {s.visual === "lyricGrid" && <LyricGrid />}
                <div style={{
                  display:"flex", gap:12, padding:"8px 0",
                  borderBottom:i<ex.steps.length-1?`1px solid ${T.border}`:"none"
                }}>
                  <div style={{
                    width:22, height:22, borderRadius:"50%", background:dayColor+"15",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:11, fontWeight:700, color:dayColor, flexShrink:0, fontFamily:T.sans, marginTop:1
                  }}>{i+1}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, color:T.textDark, fontFamily:T.sans, lineHeight:1.6, fontWeight:500 }}>
                      {s.text}
                    </div>
                    {s.why && (
                      <div style={{ fontSize:12, color:T.textLight, fontFamily:T.sans, lineHeight:1.5, marginTop:3, fontStyle:"italic" }}>
                        {s.why}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feel / Wrong */}
          <DetailSection label="What correct feels like" color={T.success}>{ex.feel}</DetailSection>
          <DetailSection label="What's going wrong if" color={T.coral}>{ex.wrong}</DetailSection>

          {/* Sarah quote */}
          {ex.sarah && <SarahQuote text={ex.sarah} />}

          {/* Level up */}
          {ex.levelUp && (
            <div style={{
              fontSize:12, color:T.gold, fontFamily:T.sans, fontWeight:600,
              padding:"8px 0", borderTop:`1px solid ${T.border}`, marginTop:8
            }}>
              Level up → {ex.levelUp}
            </div>
          )}

          {/* Complete button */}
          <button onClick={()=>onComplete(ex.id)} style={{
            marginTop:10, width:"100%",
            background:completed?"transparent":T.gold,
            border:completed?`1px solid ${T.border}`:"none",
            borderRadius:10, color:completed?T.textLight:"#fff",
            padding:"10px", fontSize:13, fontWeight:600,
            cursor:"pointer", fontFamily:T.sans
          }}>
            {completed?"Mark Incomplete":"Complete Exercise"}
          </button>
        </div>
      )}
    </div>
  );
}

function DayView({ day, completed, onComplete, metro }) {
  const c = DAY_COLORS[(day.num-1)%DAY_COLORS.length];
  const total = day.exercises.length;
  const done = day.exercises.filter(e=>completed.has(e.id)).length;
  const pct = Math.round((done/total)*100);

  return (
    <div>
      <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:12 }}>
        <div>
          <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:c, fontFamily:T.sans, marginBottom:4 }}>Day {day.num}</div>
          <div style={{ fontSize:24, fontWeight:700, color:T.textDark, fontFamily:T.serif }}>{day.name}</div>
          <div style={{ fontSize:13, color:T.textLight, fontFamily:T.sans, marginTop:2 }}>{day.focus} · {day.duration}</div>
        </div>
        <div style={{ fontSize:32, fontWeight:700, fontFamily:T.serif, color:pct===100?T.success:T.textDark }}>{pct}%</div>
      </div>

      {/* Setup */}
      {day.setup && (
        <div style={{
          background:T.bgSoft, border:`1px solid ${T.border}`, borderRadius:10,
          padding:"12px 16px", marginBottom:16, fontSize:12, color:T.textLight, fontFamily:T.sans
        }}>
          <span style={{ fontWeight:700, color:T.textMed }}>Before you start: </span>{day.setup}
        </div>
      )}

      <div style={{ height:3, background:T.border, borderRadius:2, marginBottom:16, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:pct===100?T.success:T.gold, borderRadius:2, transition:"width 0.5s" }} />
      </div>

      {day.exercises.map(ex => (
        <ExerciseCard key={ex.id} ex={ex} metro={metro}
          completed={completed.has(ex.id)} onComplete={onComplete} dayColor={c} />
      ))}
    </div>
  );
}

function VocalCard({ ex }) {
  const [open, setOpen] = useState(false);
  const colors = [T.plum,T.coral,T.slate,T.success,T.warm,T.coral];
  const c = colors[(ex.num-1)%colors.length];

  return (
    <div style={{
      background:T.bgCard, border:`1px solid ${T.border}`, borderRadius:14,
      marginBottom:12, overflow:"hidden", boxShadow:open?T.md:T.sm, transition:"all 0.2s"
    }}>
      <div onClick={()=>setOpen(!open)} style={{
        display:"flex", alignItems:"center", gap:14, padding:"18px 20px", cursor:"pointer"
      }}>
        <div style={{
          width:36, height:36, borderRadius:"50%", background:c+"18",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:15, fontWeight:700, color:c, flexShrink:0, fontFamily:T.serif
        }}>{ex.num}</div>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:600, fontSize:15, color:T.textDark, fontFamily:T.sans }}>{ex.title}</div>
          <div style={{ fontSize:12, color:c, fontWeight:500, fontFamily:T.sans }}>{ex.purpose}</div>
          <div style={{ fontSize:11, color:T.textMuted, fontFamily:T.sans, marginTop:2 }}>{ex.when}</div>
        </div>
        <div style={{ color:T.textMuted, fontSize:14, transition:"transform 0.2s", transform:open?"rotate(180deg)":"" }}>▾</div>
      </div>
      {open && (
        <div style={{ padding:"0 20px 20px" }}>
          {/* What */}
          <div style={{
            fontSize:14, color:T.textMed, fontFamily:T.sans, lineHeight:1.7,
            marginBottom:16, padding:"12px 16px", background:T.bgSoft, borderRadius:10
          }}>{ex.what}</div>

          {/* How to */}
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:10, fontWeight:700, color:T.textMuted, letterSpacing:1.5, marginBottom:10, fontFamily:T.sans }}>HOW TO DO IT</div>
            {ex.howTo.map((step,i) => (
              <div key={i} style={{ display:"flex", gap:12, padding:"6px 0" }}>
                <div style={{
                  width:20, height:20, borderRadius:"50%", background:c+"15",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:11, fontWeight:700, color:c, flexShrink:0, fontFamily:T.sans
                }}>{i+1}</div>
                <div style={{ fontSize:13, color:T.textMed, fontFamily:T.sans, lineHeight:1.6 }}>{step}</div>
              </div>
            ))}
          </div>

          {/* Diagram */}
          <pre style={{
            background:T.bgSoft, border:`1px solid ${T.border}`, borderRadius:10,
            padding:18, fontSize:12, color:T.textDark, lineHeight:1.8,
            overflowX:"auto", whiteSpace:"pre", fontFamily:"'SF Mono','Fira Code',monospace",
            marginBottom:16
          }}>{ex.diagram}</pre>

          {/* Feel / Wrong */}
          <DetailSection label="What correct feels like" color={T.success}>{ex.feel}</DetailSection>
          <DetailSection label="What's going wrong if" color={T.coral}>{ex.wrong}</DetailSection>

          {/* Tip */}
          <DetailSection label="Why this works" color={T.slate}>{ex.tip}</DetailSection>

          {/* Progression */}
          <div style={{
            borderTop:`1px solid ${T.border}`, paddingTop:12, marginTop:4
          }}>
            <div style={{ fontSize:10, fontWeight:700, color:T.gold, letterSpacing:1.5, marginBottom:6, fontFamily:T.sans }}>PROGRESSION</div>
            <div style={{ fontSize:13, color:T.textMed, fontFamily:T.sans, lineHeight:1.7 }}>{ex.progression}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function VowelMap() {
  const notes = ["E3","F3","F#3","G3","A♭3","A3","B♭3","B3","C4"];
  const zones = [
    { range:[0,3], label:"'ah' open", color:T.success },
    { range:[3,4], label:"'ah'→'uh'", color:T.warm },
    { range:[4,5], label:"'uh'→'oh'", color:T.coral },
    { range:[5,8], label:"'oh' (head)", color:T.plum }
  ];
  return (
    <div style={{
      background:T.bgCard, border:`1px solid ${T.border}`, borderRadius:14,
      padding:20, marginBottom:20, boxShadow:T.sm
    }}>
      <div style={{ fontSize:10, fontWeight:600, color:T.textMuted, marginBottom:14, letterSpacing:2, fontFamily:T.sans, textTransform:"uppercase" }}>
        Vowel Modification Map — How vowels shift through your break
      </div>
      <div style={{ display:"flex", gap:2, marginBottom:12 }}>
        {notes.map((n,i) => {
          const zone = zones.find(z => i>=z.range[0] && i<z.range[1]);
          return (
            <div key={n} style={{
              flex:1, textAlign:"center", padding:"10px 0",
              background:zone?`${zone.color}12`:T.bgSoft,
              borderRadius:i===0?"10px 0 0 10px":i===notes.length-1?"0 10px 10px 0":0,
              borderBottom:`3px solid ${zone?.color||T.border}`
            }}>
              <div style={{ fontSize:11, fontWeight:600, color:T.textDark, fontFamily:T.sans }}>{n}</div>
            </div>
          );
        })}
      </div>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:12 }}>
        {zones.map(z => (
          <div key={z.label} style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:z.color }} />
            <span style={{ fontSize:11, color:T.textLight, fontFamily:T.sans }}>{z.label}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize:12, color:T.textLight, fontFamily:T.sans, lineHeight:1.6 }}>
        As you ascend, close the vowel to lower the first formant. This lets the folds thin out for mix/head voice instead of slamming into the chest voice ceiling. 'Ah' on G3 → hint of 'uh' on A♭3 → 'aw' on A3 → 'oh' in head voice.
      </div>
    </div>
  );
}

function MetronomePanel({ metro }) {
  const [editingBeat, setEditingBeat] = useState(null);

  return (
    <div>
      {/* Main metronome card */}
      <div style={{
        background:T.bgCard, border:`1px solid ${T.border}`, borderRadius:16,
        padding:32, textAlign:"center", boxShadow:T.md
      }}>
        <div style={{ fontSize:11, color:T.textMuted, fontWeight:600, letterSpacing:2, fontFamily:T.sans, textTransform:"uppercase", marginBottom:12 }}>
          Metronome
        </div>

        {/* Beat visualizer — tap beats to edit */}
        <BeatDots beat={metro.beat} playing={metro.playing} beatConfig={metro.beatConfig} beatsPerBar={metro.beatsPerBar} />

        <div style={{ fontSize:56, fontWeight:700, color:T.textDark, fontFamily:T.serif, margin:"8px 0 0" }}>{metro.bpm}</div>
        <div style={{ fontSize:11, color:T.textMuted, letterSpacing:2, fontFamily:T.sans, textTransform:"uppercase", marginBottom:20 }}>BPM</div>

        <input type="range" min={40} max={280} value={metro.bpm}
          onChange={e=>metro.changeBpm(Number(e.target.value))}
          style={{ width:"100%", accentColor:T.gold, marginBottom:20, height:2 }} />

        {/* Preset BPMs */}
        <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginBottom:20 }}>
          {[78,120,122,165,200,244].map(v => (
            <button key={v} onClick={()=>metro.changeBpm(v)} style={{
              background:metro.bpm===v?T.gold:"transparent", border:`1px solid ${metro.bpm===v?T.gold:T.borderSoft}`,
              color:metro.bpm===v?"#fff":T.textMed, borderRadius:20, padding:"6px 16px",
              fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:T.sans
            }}>{v}</button>
          ))}
        </div>

        {/* Start/Stop */}
        <button onClick={metro.playing?metro.stop:metro.start} style={{
          background:metro.playing?T.coral:T.gold, border:"none", borderRadius:12, color:"#fff",
          padding:"14px 32px", fontSize:15, fontWeight:600, cursor:"pointer",
          width:"100%", fontFamily:T.sans, letterSpacing:0.5
        }}>
          {metro.playing?"Stop":"Start"}
        </button>
      </div>

      {/* Sound Kit selector */}
      <div style={{
        background:T.bgCard, border:`1px solid ${T.border}`, borderRadius:14,
        padding:20, marginTop:16, boxShadow:T.sm
      }}>
        <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:T.textMuted, fontFamily:T.sans, marginBottom:12 }}>
          Sound
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {KIT_KEYS.map(k => (
            <button key={k} onClick={()=>metro.setSoundKit(k)} style={{
              background:metro.soundKit===k?T.gold:"transparent",
              border:`1px solid ${metro.soundKit===k?T.gold:T.borderSoft}`,
              color:metro.soundKit===k?"#fff":T.textMed, borderRadius:20,
              padding:"6px 14px", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:T.sans
            }}>{SOUND_KITS[k].label}</button>
          ))}
        </div>
      </div>

      {/* Time Signature */}
      <div style={{
        background:T.bgCard, border:`1px solid ${T.border}`, borderRadius:14,
        padding:20, marginTop:16, boxShadow:T.sm
      }}>
        <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:T.textMuted, fontFamily:T.sans, marginBottom:12 }}>
          Time Signature
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {[2,3,4,5,6,7].map(n => (
            <button key={n} onClick={()=>metro.changeBeats(n)} style={{
              background:metro.beatsPerBar===n?T.gold:"transparent",
              border:`1px solid ${metro.beatsPerBar===n?T.gold:T.borderSoft}`,
              color:metro.beatsPerBar===n?"#fff":T.textMed, borderRadius:20,
              padding:"6px 16px", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:T.sans
            }}>{n}/4</button>
          ))}
        </div>
      </div>

      {/* Per-beat editor */}
      <div style={{
        background:T.bgCard, border:`1px solid ${T.border}`, borderRadius:14,
        padding:20, marginTop:16, boxShadow:T.sm
      }}>
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14
        }}>
          <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:T.textMuted, fontFamily:T.sans }}>
            Beat Editor
          </div>
          <div style={{ fontSize:11, color:T.textMuted, fontFamily:T.sans }}>
            Tap accent to cycle · Tap sound to change
          </div>
        </div>

        <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
          {metro.beatConfig.map((bc,i) => {
            const acc = ACCENT_CONFIG[bc.accent];
            const kitLabel = bc.kit ? SOUND_KITS[bc.kit]?.label : SOUND_KITS[metro.soundKit]?.label;
            const isEditing = editingBeat === i;
            return (
              <div key={i} style={{
                flex:1, maxWidth:80, textAlign:"center"
              }}>
                {/* Beat number */}
                <div style={{ fontSize:10, fontWeight:700, color:T.textMuted, fontFamily:T.sans, marginBottom:6 }}>
                  {i === 0 ? "▼" : (i+1)}
                </div>

                {/* Accent button — tap to cycle accent level */}
                <button onClick={()=>metro.cycleAccent(i)} style={{
                  width:"100%", padding:"10px 4px",
                  background:bc.accent==="mute"?"transparent":`${acc.color}15`,
                  border:`2px solid ${bc.accent==="mute"?T.border:acc.color}`,
                  borderStyle:bc.accent==="mute"?"dashed":"solid",
                  borderRadius:"10px 10px 0 0", cursor:"pointer",
                  transition:"all 0.15s"
                }}>
                  <div style={{
                    fontSize:11, fontWeight:700, color:acc.color, fontFamily:T.sans,
                    textTransform:"uppercase", letterSpacing:1
                  }}>{acc.label}</div>
                  <div style={{
                    width:bc.accent==="accent"?20:bc.accent==="normal"?14:bc.accent==="ghost"?8:0,
                    height:bc.accent==="accent"?20:bc.accent==="normal"?14:bc.accent==="ghost"?8:0,
                    borderRadius:"50%", background:bc.accent==="mute"?"transparent":acc.color,
                    margin:"6px auto 0", transition:"all 0.15s",
                    border:bc.accent==="mute"?`1px dashed ${T.border}`:"none"
                  }} />
                </button>

                {/* Sound selector — tap to open kit picker */}
                <button onClick={()=>setEditingBeat(isEditing?null:i)} style={{
                  width:"100%", padding:"6px 4px",
                  background:isEditing?T.goldSoft:"transparent",
                  border:`1px solid ${T.border}`, borderTop:"none",
                  borderRadius:"0 0 10px 10px", cursor:"pointer",
                  fontSize:10, color:bc.kit?T.gold:T.textMuted, fontFamily:T.sans, fontWeight:600
                }}>
                  {kitLabel}
                </button>

                {/* Kit picker dropdown */}
                {isEditing && (
                  <div style={{
                    position:"relative", zIndex:20, marginTop:4,
                    background:T.bgCard, border:`1px solid ${T.border}`, borderRadius:10,
                    boxShadow:T.md, overflow:"hidden"
                  }}>
                    {/* Default (inherit) option */}
                    <button onClick={()=>{metro.setBeatKit(i,metro.soundKit);setEditingBeat(null);}} style={{
                      width:"100%", padding:"8px", background:!bc.kit?T.goldSoft:"transparent",
                      border:"none", borderBottom:`1px solid ${T.border}`,
                      fontSize:11, color:!bc.kit?T.gold:T.textMed, fontFamily:T.sans, cursor:"pointer",
                      fontWeight:!bc.kit?700:400, textAlign:"left"
                    }}>Default</button>
                    {KIT_KEYS.map(k => (
                      <button key={k} onClick={()=>{metro.setBeatKit(i,k);setEditingBeat(null);}} style={{
                        width:"100%", padding:"8px", background:bc.kit===k?T.goldSoft:"transparent",
                        border:"none", borderBottom:`1px solid ${T.border}`,
                        fontSize:11, color:bc.kit===k?T.gold:T.textMed, fontFamily:T.sans, cursor:"pointer",
                        fontWeight:bc.kit===k?700:400, textAlign:"left"
                      }}>{SOUND_KITS[k].label}</button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Accent legend */}
        <div style={{ display:"flex", gap:12, justifyContent:"center", marginTop:14, flexWrap:"wrap" }}>
          {ACCENT_LEVELS.map(a => (
            <div key={a} style={{ display:"flex", alignItems:"center", gap:4 }}>
              <div style={{
                width:8, height:8, borderRadius:"50%",
                background:a==="mute"?"transparent":ACCENT_CONFIG[a].color,
                border:a==="mute"?`1px dashed ${T.border}`:"none"
              }} />
              <span style={{ fontSize:10, color:T.textMuted, fontFamily:T.sans }}>{ACCENT_CONFIG[a].label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("week");
  const [selectedDay, setSelectedDay] = useState(null);
  const [completed, setCompleted] = useState(new Set());
  const metro = useMetronome();

  const toggleComplete = (id) => {
    setCompleted(prev => { const next = new Set(prev); next.has(id)?next.delete(id):next.add(id); return next; });
  };

  const totalEx = DAYS.reduce((a,d) => a+d.exercises.length, 0);
  const totalDone = DAYS.reduce((a,d) => a+d.exercises.filter(e=>completed.has(e.id)).length, 0);
  const weekPct = Math.round((totalDone/totalEx)*100);

  const tabs = [
    { id:"week", label:"Week" },
    { id:"vocal", label:"Voice" },
    { id:"metro", label:"Metronome" }
  ];

  return (
    <div style={{ background:T.bg, minHeight:"100vh", color:T.textDark, fontFamily:T.sans }}>
      {/* Header */}
      <div style={{ background:T.bgCard, padding:"40px 20px 28px", textAlign:"center", borderBottom:`1px solid ${T.border}` }}>
        <div style={{ fontSize:11, letterSpacing:3, textTransform:"uppercase", color:T.gold, fontWeight:600, fontFamily:T.sans, marginBottom:8 }}>
          Sarah Glass Music
        </div>
        <div style={{ fontSize:28, fontWeight:700, fontFamily:T.serif, color:T.textDark, lineHeight:1.2 }}>Practice Plan</div>
        <div style={{ fontSize:13, color:T.textLight, marginTop:6, fontFamily:T.sans }}>Lesson 3/2 · Baritone · Break ≈ A3</div>
        <div style={{ maxWidth:280, margin:"20px auto 0", display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ flex:1 }}>
            <div style={{ height:4, background:T.border, borderRadius:2, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${weekPct}%`, background:weekPct===100?T.success:T.gold, borderRadius:2, transition:"width 0.5s" }} />
            </div>
          </div>
          <div style={{ fontSize:14, fontWeight:700, fontFamily:T.serif, color:weekPct===100?T.success:T.gold, minWidth:36 }}>{weekPct}%</div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display:"flex", background:T.bgCard, borderBottom:`1px solid ${T.border}`, position:"sticky", top:0, zIndex:10 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={()=>{setTab(t.id);setSelectedDay(null);}} style={{
            flex:1, padding:"14px 0", background:"none", border:"none",
            borderBottom:`2px solid ${tab===t.id?T.gold:"transparent"}`,
            color:tab===t.id?T.gold:T.textMuted,
            fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:T.sans, letterSpacing:0.5
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth:560, margin:"0 auto", padding:"20px 16px 40px" }}>
        {/* WEEK VIEW */}
        {tab==="week" && !selectedDay && (
          <div>
            <div style={{ fontSize:13, color:T.textMuted, marginBottom:20, textAlign:"center", fontFamily:T.sans }}>
              Select a day to begin
            </div>
            {DAYS.map((day,idx) => {
              const c = DAY_COLORS[idx%DAY_COLORS.length];
              const done = day.exercises.filter(e=>completed.has(e.id)).length;
              const total = day.exercises.length;
              const pct = Math.round((done/total)*100);
              // Count exercise types for this day
              const types = [...new Set(day.exercises.map(e=>e.type))];
              return (
                <div key={day.num} onClick={()=>setSelectedDay(day)} style={{
                  background:T.bgCard, border:`1px solid ${T.border}`, borderRadius:14,
                  padding:"18px 22px", marginBottom:10, cursor:"pointer",
                  borderLeft:`4px solid ${c}`, boxShadow:T.sm, transition:"all 0.2s"
                }}
                  onMouseEnter={e=>{e.currentTarget.style.boxShadow=T.md;e.currentTarget.style.transform="translateY(-1px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.boxShadow=T.sm;e.currentTarget.style.transform="";}}
                >
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div>
                      <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:c, fontFamily:T.sans, marginBottom:2 }}>
                        Day {day.num}
                      </div>
                      <div style={{ fontWeight:700, fontSize:17, color:T.textDark, fontFamily:T.serif }}>{day.name}</div>
                      <div style={{ fontSize:12, color:T.textLight, fontFamily:T.sans, marginTop:2 }}>{day.focus} · {day.duration}</div>
                      <div style={{ display:"flex", gap:4, marginTop:6 }}>
                        {types.map(t => <TypeBadge key={t} type={t} />)}
                      </div>
                    </div>
                    <div style={{
                      fontSize:22, fontWeight:700, fontFamily:T.serif,
                      color:pct===100?T.success:pct>0?c:T.textMuted
                    }}>
                      {pct===100?"✓":`${done}/${total}`}
                    </div>
                  </div>
                  <div style={{ height:2, background:T.border, borderRadius:1, marginTop:12, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${pct}%`, background:pct===100?T.success:c, borderRadius:1, transition:"width 0.3s" }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* DAY DETAIL */}
        {tab==="week" && selectedDay && (
          <div>
            <button onClick={()=>setSelectedDay(null)} style={{
              background:"none", border:"none", color:T.gold, fontSize:13,
              fontWeight:600, cursor:"pointer", marginBottom:16, padding:0, fontFamily:T.sans
            }}>← Back to week</button>
            <DayView day={selectedDay} completed={completed} onComplete={toggleComplete} metro={metro} />
          </div>
        )}

        {/* VOCAL */}
        {tab==="vocal" && (
          <div>
            <div style={{ textAlign:"center", marginBottom:24 }}>
              <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:T.plum, fontFamily:T.sans, marginBottom:6 }}>
                Baritone Passaggio
              </div>
              <div style={{ fontSize:24, fontWeight:700, fontFamily:T.serif, color:T.textDark }}>Vocal Exercises</div>
              <div style={{ fontSize:13, color:T.textLight, fontFamily:T.sans, marginTop:4 }}>
                Break ≈ A3 · Mixed voice training · Rhythm + pitch + improv
              </div>
            </div>
            <VowelMap />
            {VOCAL_EXERCISES.map(ex => <VocalCard key={ex.id} ex={ex} />)}
          </div>
        )}

        {/* METRONOME */}
        {tab==="metro" && (
          <div>
            <div style={{ textAlign:"center", marginBottom:24 }}>
              <div style={{ fontSize:24, fontWeight:700, fontFamily:T.serif, color:T.textDark }}>Metronome</div>
            </div>
            <MetronomePanel metro={metro} />
            <div style={{ background:T.bgCard, border:`1px solid ${T.border}`, borderRadius:14, padding:22, marginTop:20, boxShadow:T.sm }}>
              <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:T.textMuted, fontFamily:T.sans, marginBottom:14 }}>
                Quick Reference
              </div>
              {[
                { bpm:"78", use:"16th note subdivision (Drill #3)" },
                { bpm:"120", use:"Surf Rock — fingerpick + count + ooh climbing" },
                { bpm:"122", use:"Lyric placement + Sol Del Sur tap-along" },
                { bpm:"165", use:"Island strum (Surf Rock Drum)" },
                { bpm:"200–244", use:"Main metronome work (Drills #1 & #2)" },
              ].map((r,i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:i<4?`1px solid ${T.border}`:"none", fontSize:13 }}>
                  <span style={{ color:T.gold, fontWeight:700, fontFamily:T.sans }}>{r.bpm}</span>
                  <span style={{ color:T.textLight, fontFamily:T.sans }}>{r.use}</span>
                </div>
              ))}
            </div>
            <div style={{ background:T.bgCard, border:`1px solid ${T.border}`, borderRadius:14, padding:22, marginTop:16, boxShadow:T.sm }}>
              <div style={{ fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:T.textMuted, fontFamily:T.sans, marginBottom:14 }}>
                Backing Tracks
              </div>
              {[
                { label:"Surf Rock 120 BPM", url:"youtube.com/watch?v=AEf8LF4Xu18" },
                { label:"Groove Beat 90 BPM", url:"youtube.com/watch?v=n0nEhFAiorg" },
                { label:"Surf Rock 165 BPM", url:"youtube.com/watch?v=gBNY43Xlp1Y" },
                { label:"Groove Beat 80 BPM", url:"youtube.com/watch?v=0vgOdlxSTW0" },
              ].map((l,i) => (
                <div key={i} style={{ padding:"8px 0", fontSize:13, borderBottom:i<3?`1px solid ${T.border}`:"none" }}>
                  <span style={{ color:T.gold, fontFamily:T.sans, fontWeight:600 }}>{l.label}</span>
                  <span style={{ color:T.textMuted, marginLeft:10, fontSize:11, fontFamily:T.sans }}>{l.url}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating metronome */}
      {metro.playing && tab!=="metro" && (
        <div onClick={()=>setTab("metro")} style={{
          position:"fixed", bottom:24, right:24,
          background:T.bgCard, border:`2px solid ${T.gold}`,
          borderRadius:50, width:56, height:56, display:"flex",
          alignItems:"center", justifyContent:"center", cursor:"pointer",
          boxShadow:`0 4px 20px ${T.goldMed}`, zIndex:100
        }}>
          <BeatDots beat={metro.beat} playing={true} compact beatConfig={metro.beatConfig} beatsPerBar={metro.beatsPerBar} />
        </div>
      )}

      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;600;700&display=swap" rel="stylesheet" />
    </div>
  );
}
