# music-chart — Standalone Chart Builder + Music Toolkit

This is an independent web app. It is NOT part of sarah-practice-plan.

## What This App Is

A standalone strum chart builder and musician toolkit deployed at music-chart-xi.vercel.app. It has two tabs: **Tools** and **Charts**. No curriculum, no exercises, no lesson plans.

## What This App Is NOT

This is NOT the sarah-practice-plan app. That app lives in `../sarah-practice-plan/` and is a completely separate project. Do not modify files there when working here.

## Tech Stack

- Vite 7 + React 19 + Tone.js 15
- Lucide React icons, canvas-confetti
- PWA with offline support (vite-plugin-pwa)
- Deployed on Vercel (rootDirectory: `music-chart/`)
- All client-side, no backend, localStorage for persistence

## File Structure

```
src/
├── App.jsx                    # App shell — 2-tab nav (Tools | Charts), dark mode, URL hash loading
├── theme.js                   # T design system singleton, applyTheme(), light/dark themes
├── audioKeepalive.js          # Background audio ref-counting
├── workerTimer.js             # Web Worker timer for background-safe intervals
├── main.jsx                   # Entry point + PWA registration
├── index.css                  # Global CSS — nav, floating metronome, animations
├── hooks/
│   └── useIsWide.js           # Responsive breakpoint hook
├── data/
│   └── appData.js             # ALL_NOTES, getPitchRange() — NO curriculum data
├── components/
│   ├── ToolCard.jsx           # Collapsible card wrapper
│   └── BottomNav.jsx          # 2-tab bottom nav (Tools, Charts)
├── tools/
│   ├── Metronome.jsx          # BIGGEST file (~1100 lines) — useMetronome hook, MetronomePanel,
│   │                          #   FloatingMetronome, TapMatchModal, sound kits, synth engine
│   ├── DroneGenerator.jsx     # Drone with cycle mode (~1300 lines)
│   ├── LivePitchDetector.jsx  # Real-time pitch detection (~700 lines)
│   ├── BackingTrackPlayer.jsx # MiniAudioPlayer + AudioPlayer
│   ├── SongPicker.jsx         # YouTube-URL-only song input (NO local MP3 dropdown)
│   ├── youtube.jsx            # YouTube API loader, YouTubeAudioPlayer, claimAudioMutex
│   ├── PitchPipe.jsx          # Reference pitch generator
│   ├── AudioRecorder.jsx      # Browser audio recording
│   ├── GenreMetronome.jsx     # Reggae/swing metronome modes
│   ├── FretboardDiagram.jsx   # Interactive fretboard with scales
│   ├── InlineKeyboard.jsx     # Piano keyboard
│   ├── RhythmCellCards.jsx    # Rhythm pattern cards
│   ├── PhraseFormGuide.jsx    # Song structure guide
│   ├── VolumeMeter.jsx        # Live volume display
│   ├── SilenceScore.jsx       # Silence timing game
│   ├── ChordTransitionTimer.jsx
│   ├── FlightCheck.jsx        # Practice checklist
│   ├── OfflineTabs.jsx        # Chord/lyric reference
│   ├── PracticeTimer.jsx      # Countdown timer
│   └── shared.jsx             # formatTime, parseTime, TimeInput
└── charts/
    ├── StrumChartBuilder.jsx  # Main chart editor (~1470 lines) — the core feature
    ├── ChartListView.jsx      # Chart list with create/import/delete
    ├── ChordDiagram.jsx       # SVG chord fingering display
    ├── chartHelpers.js        # makeTemplateChart, compress/decompressFromURL, validation
    └── chordVoicings.js       # CHORD_VOICINGS data (22 chord shapes)
```

## Key Architecture Decisions

- **Theme**: `T` is a mutable singleton object imported from `theme.js`. Components read `T.gold`, `T.textDark` etc. directly. `applyTheme(isDark)` mutates T in place for dark mode.
- **Metronome event bus**: `useMetronome` dispatches `metroBeat` and `metroBeatAudio` CustomEvents on `window`. Components like StrumChartBuilder, PhraseFormGuide, SilenceScore listen to these.
- **Audio mutex**: `claimAudioMutex()` dispatches `audioSourceChange` so only one audio source plays at a time.
- **Chart sharing**: Charts are base64-encoded in URL hash (`#chart=...`). Both this app and sarah-practice-plan can decode them.
- **No backing track MP3s**: Audio comes from YouTube URLs only. SongPicker accepts YouTube URLs, not local files.

## Differences from sarah-practice-plan's Chart Builder

These have ALREADY diverged. Do not try to "sync" them:
- SongPicker: YouTube-only here, has local song dropdown + tabs in sarah-practice-plan
- BPM: auto-syncs to metronome here, has separate "Set" button in sarah-practice-plan
- Default group: 2 bars here, 0 (none) in sarah-practice-plan
- No MiniAudioPlayer dependency in StrumChartBuilder here
