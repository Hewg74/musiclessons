# Cursor Plan: Jungle-Proofing the Practice App

## Goal
Make the existing Sarah Practice Plan app fully functional offline with no internet dependency, specifically for a jungle environment.

## Tasks & Steps

### 1. Offline Media Library & PWA Caching
- **File**: `vite.config.js`
- **Action**: Update `workbox.globPatterns` to include `mp3`, `wav`, and `m4a` files.
- **File**: `src/App.jsx`
- **Action**: Add an "Audio Tracks" component that lists local audio files (e.g., Surf Rock Beat, Groove Beat) and allows playback.

### 2. Flight Check Mechanism
- **File**: `src/App.jsx`
- **Action**: Add a "Flight Check" button that queries the service worker cache (`caches.match` or scanning the cache keys) to verify that all necessary media and assets are safely stored offline.

### 3. Built-In Tab & Lyric Viewer
- **File**: `src/components/TabsViewer.jsx` (New) or inline in `App.jsx`
- **Action**: Create a component to render hardcoded guitar tabs for "Sol Del Sur" and lyrics for "I Like The Way You Walk" (with syncopated words highlighted).

### 4. In-App Audio Recorder
- **File**: `src/components/Recorder.jsx` (New) or inline in `App.jsx`
- **Action**: Implement a UI wrapper around the HTML5 `MediaRecorder` API to capture microphone audio, store it in memory, and generate a playback widget immediately.

### 5. Pitch Pipe / Emergency Tuner
- **File**: `src/components/PitchPipe.jsx` (New) or inline in `App.jsx`
- **Action**: Use the existing `Tone.js` dependency to generate clean sine/triangle waves for standard guitar tuning (E A D G B E).

## Excluded
- Task 4 (Practice State & Journaling) from the original proposal was excluded by the user.

## Verification
- Run `npm run build` and `npm run preview` to ensure the service worker registers properly and caches the configured assets.
- Test the MediaRecorder and Tone.js synthesis in the browser.