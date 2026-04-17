# Phase 0 Re-Survey — SS Levels 7, 8, 11, 12, 13

Findings from full-file read of levels previously rejected on title-summary only.

## Caveat — progression ID validation required

Agent hallucinated some progression ids (`soul_pocket`, `lofi_bedroom`) that do NOT exist in `src/data/chordProgressions.js`. Before wiring any pointer, validate ids against the canonical 40-entry library:

```
pop_axis, pop_vi_iv_i_v, fifties_doowop, three_chord_major, jangle, pachelbel, i_iv_only,
mixo_swing, lydian_lift, phrygian_cadence, phrygian_walk, dorian_groove, dorian_iv_v,
minor_three, minor_descent, minor_uplift, andalusian, minor_cyclic, rock_minor,
jazz_ii_v_i, jazz_minor_ii_v, jazz_turnaround, rhythm_changes_a, bossa_minor,
blues_12bar, blues_quick4, blues_minor, blues_jazz, blues_8bar,
desert_vamp, khruangbin_im_bvii, desert_blues, reggae_offbeat, surf_minor, reggae_one_chord,
folk_i_v_iv_v, country_i_v_v_i, modal_dorian_long, spanish_descent
```

## Strong candidates (high confidence) — 8 new

| ID | Title | Key | Pool (validated ids) | Why it fits |
|---|---|---|---|---|
| **ss-7-2** | Full Progression Improv | A minor | pop_axis, jazz_ii_v_i, dorian_groove, khruangbin_im_bvii | Chord-tone navigation over fixed Am-C-G-Em — variety prevents rote learning |
| **ss-7-3** | Major Key Flow | G major | pop_axis, pop_vi_iv_i_v, folk_i_v_iv_v, mixo_swing | G-C-D teaches same skills in major context; variety tests transfer |
| **ss-7-6** | Soul Groove Flow | A minor | jazz_ii_v_i, jazz_minor_ii_v, dorian_groove, blues_12bar | Soul music explicitly about comping over changes |
| **ss-7-16** | Harmonic Rhythm Awareness | A minor | desert_vamp, i_iv_only, pop_axis, modal_dorian_long | **STRONGEST** — explicitly tests same melody over different harmonic rhythms. PF progression variety IS the exercise |
| **ss-8-12** | Two-Melody Contrast | A minor | pop_axis, reggae_offbeat, jazz_ii_v_i, blues_12bar | Verse/chorus contrast benefits from multiple harmonic backgrounds |
| **ss-8-19** | Tension and Release | A minor | jazz_ii_v_i, andalusian, khruangbin_im_bvii, blues_12bar | Scale-degree function varies by harmonic context — variety teaches the concept |
| **ss-11-13** | Parasitic Songwriting | user-chosen | pop_axis, jazz_ii_v_i, reggae_offbeat, blues_12bar, dorian_groove, andalusian | **STRONGEST** — exercise LITERALLY about borrowing progression patterns |
| **ss-11-14** | Complete Original | user-chosen | pop_axis, reggae_offbeat, jazz_ii_v_i, dorian_groove | Requires validation — writing first complete song might want ONE pinned progression, not rotation |

## Medium candidates — 6 for second-wave consideration

| ID | Title | Confidence notes |
|---|---|---|
| ss-12-2 | Chorus Lift | Harmony is ONE dimension of contrast, not the primary; may not want variety |
| ss-12-4 | Pre-Chorus: The Ramp | Tension-building; pool could help but pre-chorus structure is specific |
| ss-12-7 | Contrast Toolkit | Harmonic rhythm explicitly contrastable — worth exploring |
| ss-12-14 | The Pre-Chorus | V-chord tension; specific harmonic function |
| ss-12-16 | The 6 Dimensions of Contrast | Harmonic tension is one of the six |
| ss-8-13 | First Original Over Backing Track | Pool could help; but first-original may want fixed progression |

## Confirmed NO-FIT levels

- **Level 13 (Lyrics & Songcraft)** — all 18 exercises are lyric/prosody/imagery. Zero harmonic content. **CONFIRMED REJECT.**
- **Level 11 genre originals (ss-11-1 through ss-11-5)** — each uses a FIXED progression as a genre template. Pedagogy is "compose one song in this genre" — progression immutability is the point. **CONFIRMED REJECT.**
- **Level 12 song-form fundamentals (ss-12-1, 3, 5, 6, 8-13, 15, 17-19)** — verse/chorus/bridge structural mechanics. Progression is the structural anchor, not a variable. **CONFIRMED REJECT.**

## Impact on plan

- Phase 2a candidate count grows: prior 18 + 8 new strong = **26 primary candidates**
- Phase 2c (secondary) grows: add up to 6 medium candidates pending user dogfooding of primary
- Pointer-writing effort Phase 2a: ~26 × 9 min avg = 4 hr (was 3.5)

## Methodology note

The previous agent survey that rejected L7/8/11/12/13 wholesale was title-summary only. This pass read each file in full and found 14 candidates. **For Phase 0 completeness, the same full-file read must happen for GS L8/11/12/13 before Phase 2a starts** (Guitar re-survey is running in parallel).

## Validation checklist before using findings

- [ ] Verify each suggested progression id exists in chordProgressions.js (drop hallucinated ones)
- [ ] Read each candidate exercise's `sarah:` field to confirm voice-match works
- [ ] User spot-checks 2-3 of the new strong candidates for pedagogical fit before batch-writing
