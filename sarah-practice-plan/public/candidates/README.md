# Reggae One-Drop Drum Candidates

Short drum loops (~11 seconds each) from Looperman. All royalty-free for commercial use with attribution-in-song-description per Looperman terms.

## Candidates

| File | Source | BPM | Creator | Notes |
|------|--------|-----|---------|-------|
| `looperman-yappy-85.mp3` | [87454](https://www.looperman.com/loops/detail/87454) | 85 | Yappy | Exact BPM match. Labelled "reggae drum" (not explicit one-drop). |
| `looperman-367942.mp3` | [367942](https://www.looperman.com/loops/detail/367942) | 87 | DJIMBEATS | Explicit "One Drop Drum A" — high-confidence one-drop. |
| `looperman-370584.mp3` | [370584](https://www.looperman.com/loops/detail/370584) | 88 | DJIMBEATS | Explicit "Step By Step One Drop Drum" — high-confidence one-drop. |
| `looperman-382039.mp3` | [382039](https://www.looperman.com/loops/detail/382039) | 80 | Cheynne1 | Clean kick-snare pattern. Labelled "one drop drum rhythm". |

## Pattern Analysis (librosa kick-band energy)

Existing files (CONFIRMED NOT one-drop):
- `drums-reggae-85.mp3` + `reggae-one-drop-85.mp3` — identical energy distribution. Kick on beats 1-2, not 3. One-drop score +0.14 (needs >+0.3).

Candidates (cleaner, two-hit-per-bar patterns consistent with one-drop):
- Yappy: kick strongest on one offbeat position per half-bar
- Cheynne1: cleanest separation — kick concentrated on one position, snare on another

## Next Steps

1. User listens to all four and picks preferred loop.
2. Loop chosen file to ~3-5 minutes using ffmpeg:
   ```
   ffmpeg -stream_loop 25 -i looperman-XXXXX.mp3 -c copy drums-reggae-85.mp3
   ```
3. Replace existing `drums-reggae-85.mp3` and `reggae-one-drop-85.mp3`.
4. Update `trackMetadata.js` with verified metadata + attribution.

## Attribution Requirements

Looperman terms: if used in a song, credit the loop creator in song description. For a lesson-app backing track, including this README in the repo satisfies attribution.
