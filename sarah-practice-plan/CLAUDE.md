# sarah-practice-plan — Music Lesson App

This is the main music practice app deployed at sarahglassmusic.com. It is NOT the music-chart standalone site.

## What This App Is

A full music lesson app with curriculum, weekly practice plans, exercises across 5 skill tabs (Voice, Guitar, Singer-Songwriter, Keys, Looper), plus an integrated tools tab and charts tab.

## What This App Is NOT

This is NOT the music-chart standalone app. That lives in `../music-chart/` and is a completely separate project. Do not modify files there when working here.

## Tech Stack

- Vite 7 + React 19 + Tone.js 15
- Lucide React icons, canvas-confetti
- PWA with offline support
- Deployed on Vercel (rootDirectory: `sarah-practice-plan/`)
- All client-side, no backend, localStorage for persistence

## File Structure

This app uses a monolithic file structure:

```
src/
├── App.jsx            # THE main file (~4600 lines) — contains:
│                      #   Theme (T singleton), useMetronome, all tab routing,
│                      #   ToolCard, FloatingMetronome, BottomNav, exercise views,
│                      #   Flow Mode, weekly plan rendering, skill tab views
├── JungleTools.jsx    # ALL tool + chart components (~7200 lines) — contains:
│                      #   StrumChartBuilder, ChartListView, DroneGenerator,
│                      #   LivePitchDetector, all other tools, SongPicker (with
│                      #   local song dropdown + YouTube), audio utilities
├── audioKeepalive.js  # Background audio management
├── main.jsx           # Entry point + PWA registration
├── index.css          # Global CSS
└── data/
    ├── appData.js             # Shared constants, lesson pool, note utilities
    ├── utils.js               # getPitchRange, ALL_NOTES
    ├── vocalLevels/           # 14-level voice curriculum (~900KB)
    ├── guitarStudy/           # Guitar study levels
    ├── singerSongwriter/      # 14-level singer-songwriter curriculum (~576KB)
    └── weeklyPlans/           # Weekly practice plans
```

## Key Points

- **Monolithic**: Almost everything is in App.jsx and JungleTools.jsx. No component folder structure.
- **Tab routing**: No React Router. `tab` state controls which tab is shown (practice, skills, tools, charts).
- **Skill tabs**: Voice, Guitar, Singer-Songwriter, Keys, Looper — each with their own curriculum data and view.
- **Charts + Tools**: Same features as music-chart but embedded as tabs within the larger app. The chart builder here has a local song dropdown (Sol Del Sur, ILTWYW) that music-chart does not.
- **Theme**: `T` is a mutable singleton defined at module scope in App.jsx. Same pattern as music-chart but defined inline, not in a separate file.

## Relationship to music-chart

The `../music-chart/` project was extracted from this app in March 2026. They share the same chart URL format (`#chart=<base64>`) but the codebases are independent and have diverged. Do not try to keep them in sync.
