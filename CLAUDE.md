# musiclessons — Monorepo

This repo contains TWO independent web apps. They share a git repo but are **completely separate** Vite + React projects with independent Vercel deployments.

## The Two Apps

| | sarah-practice-plan | music-chart |
|---|---|---|
| **Purpose** | Music lesson app with curriculum, exercises, weekly plans | Standalone strum chart builder + musician toolkit |
| **URL** | sarahglassmusic.com (Vercel) | music-chart-xi.vercel.app (Vercel) |
| **Directory** | `sarah-practice-plan/` | `music-chart/` |
| **Has curriculum data** | Yes — vocal levels, guitar study, singer-songwriter, keys, looper | No — tools and charts only |
| **Has charts + tools** | Yes (embedded as tabs) | Yes (the whole app) |

## CRITICAL: Do Not Cross-Contaminate

- Changes to `sarah-practice-plan/` must NEVER modify files in `music-chart/`
- Changes to `music-chart/` must NEVER modify files in `sarah-practice-plan/`
- These are NOT shared code. They were forked from a common source but now diverge independently.
- If the user asks to change "the chart builder" or "the tools", ASK which app they mean before editing.
- If the working directory is `sarah-practice-plan/`, you are working on the lesson app.
- If the working directory is `music-chart/`, you are working on the standalone chart site.

## Origin Story

`music-chart/` was extracted from `sarah-practice-plan/` in March 2026. The chart builder (StrumChartBuilder), all music tools (metronome, drone, pitch detector, etc.), and shared infrastructure (theme, audio keepalive) were copied out into a modular file structure. Since extraction, `music-chart/` has diverged:
- SongPicker is YouTube-URL-only (no local MP3 song dropdown)
- BPM input auto-syncs to metronome (no separate "Set" button)
- Default chart grouping is 2 bars
- No backing track MP3 files — audio comes from YouTube

## Chart Sharing

Both apps encode/decode `#chart=<base64>` URLs using the same codec (TextEncoder → btoa). A chart shared from one site can be opened on the other.
