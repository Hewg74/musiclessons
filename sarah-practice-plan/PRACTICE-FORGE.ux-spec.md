# Practice Forge — UX Spec

Generated from a first-principles review of the current implementation in `src/PracticeForge.jsx`.

## Phase 1 — Job Frame

### Job Statement

> **When** I sit down for 15–30 minutes of targeted musicianship practice, **I want to** draw a randomized exercise with clear instructions for how to approach it, **so I can** build the specific skills I'd otherwise never drill on my own.

### Success metrics (ranked)

1. **Time-to-playing**: From opening Practice Forge to the first sung/played note, under 30 seconds.
2. **Guidance recall during a round**: Student can re-glance at a step without breaking flow (≤ 1 second, no scrolling).
3. **Tool availability**: Metronome + drone reachable without leaving the card context.

### Key constraints

- **User**: Gene is early-intermediate (SS L3), self-directed, practicing alone. Reads guidance carefully the first time then skims on repeat draws.
- **Device**: Desktop-first (sarahglassmusic.com) and mobile (phone on a music stand). Card guidance is text-heavy, so vertical screen real estate is a scarce resource.
- **Attention**: Practice is a flow state. Any mid-round UI interaction beyond "glance and keep playing" costs the flow.
- **Pedagogy**: The guidance is the product. It's rich and long. That's a feature, but the UI must let the student dip in and out of it without losing their place.

### Zero-UI test

Can we automate this entirely? **No.** The whole point is randomized draws with rich guidance — no useful auto-mode exists. But the current UI asks the student to make more decisions than necessary (which mode, which duration, which session count) when 90% of sessions are "Focus, unlimited, 1 card". The kernel is: **mode picker + Draw button + card + timer + metronome + drone**. Everything else is progressive disclosure.

---

## Phase 2 — Narrated Journey

### Gene, second session (mostly-returning user)

> **Discovery.** I open the Tools tab and tap Practice Forge. I'm here to practice.

> **First impression.** I see a header "Practice Forge" with a back arrow, a gear icon, a thin summary strip reading `Combo · 2 constraints/card · Voice · ∞ rounds`, and a big gold `Draw Card` button. `[FRICTION]` I want to switch to Focus mode — that's where the real single-constraint drilling lives. **The mode selector is hidden behind the gear icon.** I tap gear → tap Focus → tap gear again to close → tap Draw. Four taps for what should be one.

> **Primary action.** The card appears with a nice shuffle animation. I see the key chip row, the tempo, and the Leaps Only constraint. Below that, a tinted guidance box scales into view with multiple sections: Character / Why practice this / Steps / Progression / Try these phrases / Etude / Watch out / Listen to. `[DELIGHT]` This is actually rich. `[FRICTION]` …but it's 10+ inches of vertical content. I scroll to read the etude. I've now lost the constraint chips and the tempo from my viewport.

> **Priming.** I want to re-check the key before I start. I scroll back up. `[FRICTION]` The timer is BELOW the guidance box, which is BELOW the card. To press Play, I scroll past everything I just read. Card → full guidance → timer → tools. That's four vertical regions.

> **Mid-round.** I'm improvising. I want the metronome running. `[FRICTION]` I have to scroll DOWN past the timer to reach the Practice Tools section. The metronome is a separate card. I toggle it on. Now I want to glance back at Step 3 of the guidance. `[FRICTION]` Scroll UP past the timer and halfway up the guidance box. I lose the beat for a second. I scroll down to see the timer again.

> **Completion.** I hit End Early. The rating panel appears: Easy / Good / Hard. `[DELIGHT]` Clean. I tap Hard. The panel dismisses. `[DEAD END]` The card is still visible, there's a small "New Card" button below, and the tools are still scrolled past. What now? Do I re-do this card, or draw a new one? The New Card button is small and in the same vertical space as the card itself. My eye isn't drawn to it.

> **Return visit.** Tomorrow I'm back. The config summary is the same; the Draw button is the same. `[FRICTION]` I have no idea what I practiced yesterday. There's no "Recent" or "Last round" visible. The `recentHistory` data exists in state but nothing renders it.

### Gene, power-user after two weeks

> "I know what I want. Focus, Leaps, unlimited. But I have to open settings, tap Focus, close settings, tap Draw. Every time. And if I want to cycle modes between rounds — say, Focus for 10 min then Combo for the next — that's still three taps per mode switch because Settings is modal. Give me a mode tab row at the top and I'll love you forever."

### Friction summary

| Stage | Friction | Severity | Root cause |
|---|---|---|---|
| First impression | Mode selector hidden behind gear | 4 | Most-frequent control in a 2nd-tier surface |
| First impression | Config summary shows all 4 fields equally weighted | 2 | Information density misallocation |
| Primary action | Have to scroll through 4 vertical regions (card → guidance → timer → tools) | 4 | Sequential stack layout |
| Priming | Must scroll past long guidance to reach Play | 3 | Timer position |
| Mid-round | Scroll ping-pong between guidance and tools | 4 | Tools below card, long guidance above |
| Mid-round | Re-glancing at a specific step requires scrolling up | 3 | Full guidance always expanded |
| Completion | After rating, ambiguous "what's next" | 2 | Missing primary CTA |
| Return visit | No session history visible | 3 | Exposed data feature not surfaced |
| All stages | Stale Matrix description says "pitch+rhythm+dynamics only" | 1 | Copy drift after refactor |

---

## Phase 3 — Edge cases & failure modes

| # | What-if | Current behavior | Should be |
|---|---|---|---|
| 1 | Tab blur mid-round on fixed duration | Timer keeps running | Pause on blur for fixed durations; keep running on unlimited (user's call) |
| 2 | Matrix draws 3 constraints, all non-classic | Three stacked pair-guidance blocks, ~1200 words | Render pair headers as collapsed cards, only the first expanded; others tap-to-open. Reduces wall-of-text. |
| 3 | Student draws a scale they've never heard of (phrygian, dorian) | Scale character line appears in guidance, but only for Focus/Combo/Matrix-classic modes | Always render scale character line ABOVE the mode-specific guidance, or above the Draw button as a scale preview |
| 4 | Mobile viewport (< 600 px) | `maxW: 760` with 20px side padding; guidance box is readable but tools section is crowded | Tools section collapses into a horizontal scroll strip or expand-on-demand icons |
| 5 | User wants to lock a specific key/scale/tempo | `lockedDimensions` state exists; no UI surfaces it | Add a small lock icon next to each constraint chip on the card — tap to lock that value for next draw |
| 6 | User forgets what mode means, stares at 4 labels | Description text appears below selector; user has to read it | Inline 1-line helper permanently visible under the chip row + the rich description on hover/tap |
| 7 | After rating, user wants to re-play the SAME card | No explicit "redo" affordance; New Card is the only button | Add "One more round" button next to "New card" after rating |
| 8 | Timer on unlimited reaches 30+ minutes | Counts up forever, ring tops out at ~10 min, label still says ELAPSED | Show gentle "You're in deep flow — 32:00 elapsed" text at 30/60-min marks |
| 9 | Session of 3-5 cards, user wants to bail after card 2 | Progress dots show but no "end session" button | Add End Session button near the dots |
| 10 | Matrix description is stale | Says "pitch + rhythm + dynamics all at once" despite recent refactor to full pool | Update text: "Matrix — 3 constraints at once from the full pool. Composition-pressure mode." |

---

## Phase 4 — Interface Shaping

### First-principles build-up

Starting from a blank screen. The student's job is: "randomize something musically useful and tell me how to approach it." The minimum interface is:

1. **Mode selector** (always visible — most-frequent control)
2. **Draw button** (primary action)
3. **The drawn card** (the payload)
4. **Timer** (start / stop the round)
5. **Metronome & drone** (reachable without leaving the card context)

Everything else is secondary.

### Proposed layout

```
┌──────────────────────────────────────────────────────────┐
│ ← Practice Forge   [Scales][Focus][Combo][Matrix]   ⋮    │ ← Tier 1: mode chip row always visible
│                     (one-line mode hint)                  │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  ◆ A Minor Pentatonic                           ♪ 90 BPM │ ← card header
│  A  C  D  E  G                                            │
│  ─ scale character (1 italic line) ────────────────────   │
│                                                           │
│  ↗ Leaps Only                              PITCH         │
│    "Never two neighboring notes in a row…"                │
│                                                           │
│  ┌ How they work together ─────────────────────────────┐  │ ← guidance box, primary only
│  │ Leaps + Whisper is the most delicate combo…         │  │
│  │                                                     │  │
│  │ ▸ Show full guidance  (steps, etude, watch-out)     │  │ ← expand affordance
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  ═══════════════════════════════════════════════════      │
│                                                           │
│       ◐ 00:00                                             │ ← integrated timer strip
│       ELAPSED                                             │
│                                   [↻] [▶ Play] [⊞]       │ ← reset / play / end
│                                                           │
│  ═══════════════════════════════════════════════════      │
│                                                           │
│  Metronome  ─  90 BPM   [−][+][Reset]   [▶]              │ ← inline, always visible
│  Drone      ─  A root                    [▶]              │
│                                                           │
│  [ Fretboard ]  [ Volume ]  [ Recorder ]  [ Colors ]     │ ← tap to expand
│                                                           │
│                                                           │
│  Recently practiced (last 5) ▸                            │ ← Tier 2: one-click reveal
│                                                           │
└──────────────────────────────────────────────────────────┘
```

### Progressive disclosure

| Element | Tier | Justification |
|---|---|---|
| Mode chip row | 1 | Most-frequent decision. Must be one tap. |
| Draw Card button | 1 | Primary action. |
| Card header (key/scale/tempo) | 1 | Essential context. |
| Constraint lines | 1 | The rules of the round. |
| Scale character | 1 | One italic line above constraints; always there. |
| Primary guidance paragraph | 1 | The single most important pedagogical sentence. |
| Full guidance (steps, examples, etude, progression, listen-to) | 2 | "Show full guidance" expand — most students read it on first draw, skim on repeats. |
| Timer (integrated, near card) | 1 | Must be reachable without scrolling past the card. |
| Metronome + Drone inline | 1 | Tool availability without leaving card context. |
| Fretboard, Volume meter, Recorder, Color wheel | 2 | Expand-on-tap single row of buttons. |
| Instrument, duration, session count, draw-pool readout | 3 | Overflow menu (⋮). |
| Recent history | 2 | Collapsed section below the tools row. |
| Lock dimension (lock key, scale, tempo individually) | 3 | Small lock icon on each card header chip; tap to persist that value into next draw. |

### Conventions challenged

| Convention | Challenge | Decision |
|---|---|---|
| Settings gear icon for everything | Gear is "occasional config", not "every session's primary choice" | Promote mode selector to top-level chip row. Gear becomes overflow menu for advanced/occasional settings. |
| Full guidance always expanded | Student reads once, skims after. Wall-of-text during flow state. | Primary sentence always visible; full schema behind "Show full guidance" expand. |
| Card above, tools below (sequential stack) | Causes scroll ping-pong during flow. Metronome and drone are Tier 1, not Tier 2. | Move metronome and drone to inline compact rows directly below the timer, above the advanced-tools expand row. |
| Rating panel always after timer complete | Interrupts flow. For unlimited mode, student rates AFTER deciding to end. | Keep rating panel but make it dismissible with Escape or outside-tap. Add "One more round" + "New card" buttons inside it. |
| Circular timer graphic, 144×144 px, centered | Eats vertical space. Student doesn't need it huge. | Compact horizontal timer strip: icon + digital time + label + controls inline. |
| Session progress dots at top of card | Users don't know what a "session" is | Keep dots but add explicit "End session" affordance nearby |

### States (per-screen)

**Idle** (no card drawn):
- Mode chips, Draw button, optional "Recently practiced" collapsed section.
- Shows current mode hint under the chip row.

**Card drawn, timer idle** (the "priming" state):
- Full card visible, timer at 00:00, big Play button.
- Guidance primary-visible, expand to see full.
- Tools inline below timer.

**Timer running**:
- Same layout but Play becomes Pause.
- Guidance box stays; expand state preserved if expanded.
- Tools still inline.

**Round ended** (End Early or timer complete):
- Rating panel overlays bottom of card.
- Card still fully visible behind rating.
- Primary action = "New card", secondary = "One more round".

**No guidance** (some constraint combo cache miss — shouldn't happen post-refactor, but defensive):
- Render the static constraint descriptions only.
- Subtle "No coaching available for this combo" note.

**Empty state** (first-ever open):
- Tooltip over the Focus chip: "Start here — one constraint at a time."
- Pre-expanded "What do these modes mean?" accordion.

---

## Phase 5 — UX Spec Synthesis

### Screen inventory

Just one screen (Practice Forge overlay). Sub-states handled inline:

| State | Purpose | Primary action |
|---|---|---|
| Idle | Choose mode + draw | Draw Card |
| Primed (card drawn, timer idle) | Read guidance, prepare to play | Play |
| Running | Practice | Pause / End |
| Post-round | Rate + continue | New Card |

### The 10-point punch list (implementation order)

These are the concrete code changes, ordered by impact / effort ratio. Do them in this order and the UX problems resolve.

1. **Promote mode selector out of Settings panel.** Replace the gear-as-primary-nav pattern with a top-of-page chip row. The gear becomes a small `⋮` overflow menu for Instrument, Duration, Session count, Draw Pool readout. *~40 lines of move+rewrite in the settings panel block.*
2. **Move metronome and drone inline below the timer, above the Practice Tools expand row.** They become compact one-line controls, not cards. *~60 lines.*
3. **Collapse advanced tools (Fretboard, Volume Meter, Recorder, Color Wheel) into an expand-on-demand button row.** Single row of toggle chips; tap to reveal. *~30 lines refactor of the tools section.*
4. **Collapse full guidance into primary + "Show full guidance" expand.** Primary shows interaction paragraph + scale character only. Expand reveals steps, progression, examples, etude, watch out, listen to. Persist expand state across cards in the same session. *~50 lines inside the guidance render block.*
5. **Fix the stale Matrix description string.** `MODE_DESCRIPTIONS.matrix` currently claims "pitch + rhythm + dynamics all at once" — replace with the accurate "3 constraints at once from the full pool". *1 line.*
6. **Add "One more round" button to the rating panel.** Current rating panel only dismisses back to the card; new button re-runs the timer on the same card. *~10 lines.*
7. **Render recent history.** `recentHistory` already exists as `useMemo`. Add a collapsed section below the tools row: "Recently practiced (last 5) ▸", tap to expand to a list of cards with their ratings. *~40 lines.*
8. **Pause timer on tab blur for fixed durations.** Unlimited stays running (user's choice). Fixed durations pause. *~15 lines, Page Visibility API.*
9. **Lock affordance on card header chips.** Small lock icon next to Key / Scale / Tempo chips; tap to lock that value for future draws. Wire to existing `lockedDimensions` state. *~30 lines.*
10. **Compact horizontal timer strip** instead of 144×144 circular graphic. Digital time + label + controls on one row. *~20 lines refactor of ForgeTimer.*

### Out-of-scope for this spec

- Visual polish (colors, typography spacing) — handoff to design-forge
- New guidance content
- Scale-runner mode deepening
- Multi-device sync / cloud history
- Audio capture quality improvements

### Handoff: Visual Design

design-forge should treat this spec's layout as the information architecture and focus on:
- Making the mode chip row feel like premium navigation (not a generic button row)
- The compact timer strip — how to make "00:00 ELAPSED" feel like a musical object, not a stopwatch
- The guidance expand/collapse motion and affordance
- The advanced tools button row's visual weight
- Desktop vs mobile responsive breakpoint behavior
- Color-music wheel integration into the card chip row

### Handoff: Accessibility

- Mode chip row must be keyboard-navigable (arrow keys between chips, Enter to select)
- Timer play/pause bound to Space key
- All lock icons have aria-labels
- Rating buttons keyboard-accessible with number shortcuts (1=Easy, 2=Good, 3=Hard)
- Live region announcement when timer starts/stops/ends
- Scale character italic line must have sufficient contrast (currently `textLight` over `bgSoft` — check WCAG AA)

### Validation against heuristics

| Heuristic | Current | Proposed |
|---|---|---|
| Visibility of system status | Weak (mode hidden in settings) | Strong (mode chip row always shows current) |
| Match system and real world | Good (musical metaphors work) | Good |
| User control and freedom | Weak (no lock UI, no "redo round") | Strong (lock chips, one-more-round button) |
| Consistency and standards | Good | Good |
| Error prevention | N/A | N/A |
| Recognition rather than recall | Weak (settings are hidden) | Strong (modes always visible) |
| Flexibility and efficiency of use | Weak (power users buried in settings) | Strong (mode switch is 1 tap) |
| Aesthetic and minimalist design | Weak (wall of guidance text) | Strong (primary + expand) |
| Help users recover from errors | N/A | N/A |
| Help and documentation | Good (in-settings mode descriptions) | Good (inline hints) |
