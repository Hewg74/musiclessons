// Scale-degree progression library for PracticeForge.
//
// Each entry stores chord degrees in Roman-numeral notation. At card-draw
// time, chordProgressionResolver.resolveProgression() maps the degrees to
// concrete chord names for the active key + scale.
//
// Quality conventions:
//   bare degrees (I, ii, V, vi)    — use the scale-native quality at that
//                                     position (see SCALE_DEGREE_QUALITIES).
//   suffixed    (V7, iim7, Imaj7)  — engine quality string overrides native.
//   accidentals (bII, bVII, #IV)   — shift the scale-native position by ±1
//                                     semitone. Quality stays native unless
//                                     an explicit override follows.
//
// scales: PF scale ids the progression makes musical sense in. Cards whose
//         scale isn't in the list won't draw this progression. Pentatonic
//         scales are never attached (no diatonic 7-chord set).
//
// vibe:   short reference surfaced in the card subtitle.
// bars:   typical bar length when looped — used in hint text.

export const CHORD_PROGRESSIONS = [
  // ─── Pop / rock major ───
  // Pop axis is major-only — lydian's IV lands on the #4 (diminished) and
  // breaks the sunny I-V-vi-IV vibe that's the whole point of the cycle.
  { id: 'pop_axis',         name: 'Pop axis (I–V–vi–IV)',             degrees: ['I','V','vi','IV'],          scales: ['major'],                               vibe: 'Coldplay, Journey, Axis of Awesome',            bars: 4 },
  { id: 'pop_vi_iv_i_v',    name: 'vi–IV–I–V',                        degrees: ['vi','IV','I','V'],          scales: ['major'],                               vibe: 'Anthemic indie pop',                            bars: 4 },
  { id: 'fifties_doowop',   name: '50s doo-wop (I–vi–IV–V)',          degrees: ['I','vi','IV','V'],          scales: ['major'],                               vibe: '"Stand by Me", early rock & roll',              bars: 4 },
  { id: 'three_chord_major',name: '3-chord (I–IV–V)',                 degrees: ['I','IV','V'],               scales: ['major','mixolydian'],                  vibe: 'Folk, country, punk — the universal',           bars: 3 },
  { id: 'jangle',           name: 'Jangle (I–iii–vi–IV)',             degrees: ['I','iii','vi','IV'],        scales: ['major'],                               vibe: 'Smiths, Real Estate, Beach House',              bars: 4 },
  { id: 'pachelbel',        name: 'Pachelbel (I–V–vi–iii–IV–I–IV–V)', degrees: ['I','V','vi','iii','IV','I','IV','V'], scales: ['major'],                     vibe: 'Canon in D, "Cryin\'" by Aerosmith',            bars: 8 },
  { id: 'i_iv_only',        name: 'Two-chord vamp (I–IV)',            degrees: ['I','IV'],                   scales: ['major','mixolydian','dorian'],         vibe: 'DOPE LEMON, surf, beach pop',                   bars: 2 },

  // ─── Modal ───
  { id: 'mixo_swing',       name: 'Mixolydian (I–bVII–IV)',           degrees: ['I','bVII','IV'],            scales: ['mixolydian','major'],                  vibe: 'Sweet Child O\' Mine intro, Allman Brothers',   bars: 3 },
  { id: 'lydian_lift',      name: 'Lydian lift (I–II)',               degrees: ['I','II'],                   scales: ['lydian'],                              vibe: 'Steve Miller "Fly Like an Eagle", dreamy',      bars: 2 },
  { id: 'phrygian_cadence', name: 'Phrygian (bII–i)',                 degrees: ['bII','i'],                  scales: ['phrygian','phrygian-dominant'],        vibe: 'Spanish, flamenco, metal',                      bars: 2 },
  { id: 'phrygian_walk',    name: 'Phrygian walk (i–bII–bIII)',       degrees: ['i','bII','bIII'],           scales: ['phrygian','phrygian-dominant'],        vibe: 'Dark, exotic step-down',                        bars: 3 },
  { id: 'dorian_groove',    name: 'Dorian (i–IV)',                    degrees: ['i','IV'],                   scales: ['dorian'],                              vibe: 'Santana "Oye Como Va", "So What"',              bars: 2 },
  { id: 'dorian_iv_v',      name: 'Dorian (i–IV–v)',                  degrees: ['i','IV','v'],               scales: ['dorian'],                              vibe: 'Funk, soul, Khruangbin',                        bars: 3 },

  // ─── Minor (natural / harmonic) ───
  // Natural-minor only — dorian's native iv is major (breaks the all-minor
  // sound implied by lowercase i/iv/v). Dorian users should draw dorian_iv_v.
  { id: 'minor_three',      name: 'Minor 3-chord (i–iv–v)',           degrees: ['i','iv','v'],               scales: ['natural-minor'],                       vibe: 'Folk minor, sea shanty',                        bars: 3 },
  { id: 'minor_descent',    name: 'Minor descent (i–VII–VI–VII)',     degrees: ['i','VII','VI','VII'],       scales: ['natural-minor'],                       vibe: '"Stairway to Heaven", "All Along the Watchtower"', bars: 4 },
  { id: 'minor_uplift',     name: 'i–VI–III–VII',                     degrees: ['i','VI','III','VII'],       scales: ['natural-minor'],                       vibe: 'Sad-pop in minor — hopeful resolution',         bars: 4 },
  // V is explicit to keep it major across BOTH compatible scales. harmonic-minor's
  // native V is already major at position 4; phrygian-dominant's native V is dim,
  // so bare V would resolve to Edim in A PD — wrong for flamenco. Explicit V pins
  // the quality to major regardless of parent scale.
  { id: 'andalusian',       name: 'Andalusian cadence',               degrees: ['i','bVII','bVI','Vmaj'],    scales: ['harmonic-minor','phrygian-dominant'],  vibe: 'Flamenco, Sultans of Swing, Hit the Road Jack', bars: 4 },
  { id: 'minor_cyclic',     name: 'i–iv–VII–III',                     degrees: ['i','iv','VII','III'],       scales: ['natural-minor'],                       vibe: 'Cyclical minor — moody, propulsive',            bars: 4 },
  { id: 'rock_minor',       name: 'Rock minor (i–bVI–bVII–i)',        degrees: ['i','bVI','bVII','i'],       scales: ['natural-minor'],                       vibe: 'Black Sabbath, doom, drive',                    bars: 4 },

  // ─── Jazz cadences ───
  { id: 'jazz_ii_v_i',      name: 'ii7–V7–Imaj7',                     degrees: ['iim7','V7','Imaj7'],        scales: ['major'],                               vibe: 'The jazz cadence',                              bars: 3 },
  { id: 'jazz_minor_ii_v',  name: 'iim7♭5–V7–i',                      degrees: ['iim7b5','V7','i'],          scales: ['harmonic-minor','natural-minor'],      vibe: 'Minor jazz cadence',                            bars: 3 },
  { id: 'jazz_turnaround',  name: 'iii–vi–ii–V',                      degrees: ['iii','vi','iim7','V7'],     scales: ['major'],                               vibe: 'Jazz turnaround',                               bars: 4 },
  { id: 'rhythm_changes_a', name: 'I–vi–ii–V (rhythm A)',             degrees: ['I','vi','iim7','V7'],       scales: ['major'],                               vibe: 'Rhythm changes A section',                      bars: 4 },
  { id: 'bossa_minor',      name: 'Bossa minor (im6–iim7♭5–V7–i)',    degrees: ['im6','iim7b5','V7','i'],    scales: ['melodic-minor','harmonic-minor'],      vibe: 'Bossa minor, Antônio Carlos Jobim',             bars: 4 },

  // ─── Blues ───
  { id: 'blues_12bar',      name: '12-bar blues',                     degrees: ['I7','I7','I7','I7','IV7','IV7','I7','I7','V7','IV7','I7','V7'], scales: ['major','mixolydian','blues'], vibe: '12-bar blues', bars: 12 },
  { id: 'blues_quick4',     name: '12-bar quick-change',              degrees: ['I7','IV7','I7','I7','IV7','IV7','I7','I7','V7','IV7','I7','V7'], scales: ['major','mixolydian','blues'], vibe: 'Blues with quick IV in bar 2', bars: 12 },
  { id: 'blues_minor',      name: 'Minor blues',                      degrees: ['im7','im7','im7','im7','ivm7','ivm7','im7','im7','V7','ivm7','im7','im7'], scales: ['natural-minor','blues'], vibe: 'Minor blues', bars: 12 },
  { id: 'blues_jazz',       name: 'Jazz blues (with II–V)',           degrees: ['I7','IV7','I7','I7','IV7','IV7','I7','iiim7','VI7','iim7','V7','I7'], scales: ['major','mixolydian','blues'], vibe: 'Charlie Parker blues', bars: 12 },
  { id: 'blues_8bar',       name: '8-bar blues',                      degrees: ['I7','V7','IV7','IV7','I7','V7','I7','V7'], scales: ['major','mixolydian','blues'], vibe: 'Key to the Highway, Heartbreak Hotel', bars: 8 },

  // ─── World / Khruangbin / Tinariwen / desert ───
  { id: 'desert_vamp',      name: 'Desert vamp (i–bVII)',             degrees: ['i','bVII'],                 scales: ['dorian','natural-minor','phrygian-dominant'], vibe: 'Tinariwen, Mdou Moctar',            bars: 2 },
  { id: 'khruangbin_im_bvii',name:'Khruangbin (im7–bVIImaj7)',        degrees: ['im7','bVIImaj7'],           scales: ['dorian'],                              vibe: 'Khruangbin "Maria También"',                    bars: 2 },
  { id: 'desert_blues',     name: 'Desert blues (i–VI–iv–i)',         degrees: ['i','VI','iv','i'],          scales: ['natural-minor'],                       vibe: 'Ali Farka Touré, Bombino',                      bars: 4 },

  // ─── Reggae / surf ───
  // Major-only — mixolydian turns V into a minor chord and breaks the
  // reggae I-IV-V foundation (reggae wants a dominant V). Use three_chord_major
  // for the mixolydian version if wanted.
  { id: 'reggae_offbeat',   name: 'Reggae I–IV–V',                    degrees: ['I','IV','V'],               scales: ['major'],                               vibe: 'One-drop reggae, ska',                          bars: 3 },
  { id: 'surf_minor',       name: 'Surf (i–bVI–bVII–i)',              degrees: ['i','bVI','bVII','i'],       scales: ['natural-minor'],                       vibe: 'Misirlou, Pulp Fiction, Dick Dale',             bars: 4 },
  { id: 'reggae_one_chord', name: 'Reggae one-chord vamp (I)',        degrees: ['I'],                        scales: ['major','mixolydian'],                  vibe: 'Bob Marley meditation grooves',                 bars: 1 },

  // ─── Doo-wop / folk additions ───
  { id: 'folk_i_v_iv_v',    name: 'Folk (I–V–IV–V)',                  degrees: ['I','V','IV','V'],           scales: ['major'],                               vibe: 'Old-time folk, country',                        bars: 4 },
  { id: 'country_i_v_v_i',  name: 'Country (I–V–V–I)',                degrees: ['I','V','V','I'],            scales: ['major'],                               vibe: 'Honky-tonk',                                    bars: 4 },

  // ─── Modal extras ───
  { id: 'modal_dorian_long',name: 'Dorian (i–bIII–bVII–IV)',          degrees: ['i','bIII','bVII','IV'],     scales: ['dorian'],                              vibe: 'Dorian rock — Pink Floyd, Steely Dan',          bars: 4 },
  // V is pinned to major (Vmaj) because phrygian-dominant's native V is
  // diminished; the idiomatic Spanish/flamenco cadence uses a major
  // dominant inherited from the parent harmonic-minor scale.
  { id: 'spanish_descent',  name: 'Spanish descent (i–bVII–bVI–V)',   degrees: ['i','bVII','bVI','Vmaj'],    scales: ['phrygian-dominant'],                   vibe: 'Spanish guitar — descent to leading tone',      bars: 4 },

  // ─── Gypsy / Eastern European ───
  // Gypsy cadence is canonically a harmonic-minor progression — iv lands on
  // natural-4th Dm (not hungarian-minor's raised-4th D#dim). V pinned major
  // via the leading tone inherited from harmonic-minor.
  { id: 'gypsy_cadence',    name: 'Gypsy cadence (i–iv–V–i)',         degrees: ['i','iv','Vmaj','i'],        scales: ['harmonic-minor'],                      vibe: 'Eastern European — the leading-tone dominant',  bars: 4 },
  // Hungarian-specific — this one DOES use the raised 4th (D#dim in A
  // hungarian) as the iv chord, leaning into the aug-2nd tension between
  // iv and V. Different sound from the harmonic-minor gypsy cadence.
  { id: 'hungarian_dim_iv', name: 'Hungarian dim-iv (i–iv°–Vmaj–i)',  degrees: ['i','iv','Vmaj','i'],        scales: ['hungarian-minor'],                     vibe: 'Raised-4th diminished iv pulling hard to V',    bars: 4 },

  // ─── Double-harmonic / Byzantine ───
  // Double-harmonic has flat 2 and raised 7 — classic Middle Eastern.
  { id: 'byzantine_cadence',name: 'Byzantine (I–bII–I)',              degrees: ['I','bII','I'],              scales: ['double-harmonic'],                     vibe: 'Middle Eastern — flat 2 pulling to tonic',      bars: 3 },
  { id: 'byzantine_turn',   name: 'Byzantine turn (I–iv–bII–I)',      degrees: ['I','iv','bII','I'],         scales: ['double-harmonic'],                     vibe: 'Byzantine 4-chord — aug 2nd between iv and bII',bars: 4 },
  { id: 'byzantine_descent',name: 'Byzantine descent (I–bVII–bVI–bII)',degrees: ['I','bVII','bVI','bII'],    scales: ['double-harmonic'],                     vibe: 'Arabian descent — all the exotic intervals',    bars: 4 },
  { id: 'byzantine_vamp',   name: 'Byzantine vamp (I–bII)',           degrees: ['I','bII'],                  scales: ['double-harmonic'],                     vibe: 'Flat-2 pull — single-step Arabian vamp',        bars: 2 },

  // ─── Mixolydian-specific (mode-characteristic bVII) ───
  { id: 'mixo_country',     name: 'Mixolydian (I–bVII–IV–I)',         degrees: ['I','bVII','IV','I'],        scales: ['mixolydian'],                          vibe: '"Sympathy for the Devil", country-rock stomp',  bars: 4 },
  { id: 'mixo_vamp',        name: 'Mixo vamp (I–v)',                  degrees: ['I','v'],                    scales: ['mixolydian'],                          vibe: 'Allman Brothers, jammy southern rock',          bars: 2 },
  { id: 'mixo_iv_bvii',     name: 'Mixo cycle (I–IV–bVII–IV)',        degrees: ['I','IV','bVII','IV'],       scales: ['mixolydian'],                          vibe: '"Norwegian Wood", folk-psych',                  bars: 4 },
  { id: 'mixo_seventh',     name: 'Mixo dominant (I7–bVII–IV)',       degrees: ['I7','bVII','IV'],           scales: ['mixolydian'],                          vibe: 'Funky dominant-7 riff — Little Feat, Dr. John', bars: 3 },

  // ─── Lydian (mode-characteristic #4 via II chord) ───
  { id: 'lydian_dream',     name: 'Lydian (I–II–I)',                  degrees: ['I','II','I'],               scales: ['lydian'],                              vibe: 'Simpsons theme, "Dreams" Fleetwood Mac',        bars: 3 },
  { id: 'lydian_iii_ii',    name: 'Lydian (I–iii–II)',                degrees: ['I','iii','II'],             scales: ['lydian'],                              vibe: 'Ambient lift — Brian Eno, Boards of Canada',    bars: 3 },
  // Beautiful-jazz exception: Imaj7 lydian sounds like dream-pop even w/ extension.
  { id: 'lydian_floating',  name: 'Lydian floating (Imaj7–II)',       degrees: ['Imaj7','II'],               scales: ['lydian'],                              vibe: 'Dream-pop floating — Cocteau Twins, Slowdive',  bars: 2 },

  // ─── Melodic-minor additions (keep it beautiful per Gene's taste — bossa leaning) ───
  { id: 'melodic_i_iv',     name: 'Melodic minor (i–IV)',             degrees: ['i','IV'],                   scales: ['melodic-minor'],                       vibe: 'Jazz-minor vamp — raised-6 lifts a minor i',    bars: 2 },
  { id: 'melodic_bossa_vamp',name:'Bossa-minor vamp (i–V7)',          degrees: ['i','V7'],                   scales: ['melodic-minor'],                       vibe: 'Bossa vamp — two-chord Jobim drift',            bars: 2 },

  // ─── Phrygian additions (beyond bII cadence + walk) ───
  { id: 'phrygian_metal',   name: 'Phrygian (i–iv–bIII–bII)',         degrees: ['i','iv','bIII','bII'],      scales: ['phrygian'],                            vibe: 'Metal phrygian — Metallica "Wherever I May Roam"',bars: 4 },
  { id: 'phrygian_bvii',    name: 'Phrygian (i–bVII–bII)',            degrees: ['i','bVII','bII'],           scales: ['phrygian'],                            vibe: 'Spanish modal drone — dark folk',               bars: 3 },

  // ─── Hungarian-minor additions ───
  { id: 'hungarian_cycle',  name: 'Hungarian (i–bIII–Vmaj–i)',        degrees: ['i','bIII','Vmaj','i'],      scales: ['hungarian-minor'],                     vibe: 'Gypsy jazz — Django, Romani Eastern',           bars: 4 },
  { id: 'hungarian_vamp',   name: 'Hungarian vamp (i–Vmaj)',          degrees: ['i','Vmaj'],                 scales: ['hungarian-minor'],                     vibe: 'Tight gypsy vamp — lean on the leading tone',   bars: 2 },

  // ─── Locrian (instability-leaning — idim tonic is the sound) ───
  { id: 'locrian_vamp',     name: 'Locrian (i°–bII)',                 degrees: ['idim','bII'],               scales: ['locrian'],                             vibe: 'Half-dim tonic — Björk "Army of Me", prog',     bars: 2 },
  { id: 'locrian_descent',  name: 'Locrian (bII–bVII–i°)',            degrees: ['bII','bVII','idim'],        scales: ['locrian'],                             vibe: 'Descending locrian — no safe resolution',       bars: 3 },
  { id: 'locrian_dark',     name: 'Locrian (i°–bVI–bVII)',            degrees: ['idim','bVI','bVII'],        scales: ['locrian'],                             vibe: 'Doom-locrian — pull toward the b2 never comes', bars: 3 },

  // ─── Hirajoshi (Japanese minor — 1,2,b3,5,b6; accidentals only) ───
  { id: 'hirajoshi_vamp',   name: 'Hirajoshi (i–bVI)',                degrees: ['imin','bVI'],               scales: ['hirajoshi'],                           vibe: 'Japanese psych-surf — koto drift, Khruangbin',  bars: 2 },
  { id: 'hirajoshi_drift',  name: 'Hirajoshi (i–bIII–bVI)',           degrees: ['imin','bIII','bVI'],        scales: ['hirajoshi'],                           vibe: 'Haiku pacing — space between notes',            bars: 3 },
  { id: 'hirajoshi_descent',name: 'Hirajoshi (bVI–bIII–i)',           degrees: ['bVI','bIII','imin'],        scales: ['hirajoshi'],                           vibe: 'Shakuhachi descent — ceremonial minor',         bars: 3 },

  // ─── Minor pentatonic (riff-style, accidentals-only) ───
  { id: 'pent_minor_vamp',  name: 'Min pent (i–bIII)',                degrees: ['imin','bIII'],              scales: ['minor-pentatonic'],                    vibe: 'Minor-pent riff — SRV, Black Keys',             bars: 2 },
  { id: 'pent_minor_bvii',  name: 'Min pent (i–bVII–i)',              degrees: ['imin','bVII','imin'],       scales: ['minor-pentatonic'],                    vibe: 'Blues-rock minor vamp — desert energy',         bars: 3 },
  { id: 'pent_minor_rock',  name: 'Min pent rock (i–bIII–bVII–i)',    degrees: ['imin','bIII','bVII','imin'],scales: ['minor-pentatonic'],                    vibe: 'Rock-pentatonic box — Stones, Zep',             bars: 4 },

  // ─── Major pentatonic (accidentals-only — bare IV/V don't line up on 5-note scales) ───
  { id: 'pent_major_lift',  name: 'Maj pent lift (I–bIII–bVI)',       degrees: ['I','bIII','bVI'],           scales: ['major-pentatonic'],                    vibe: 'Major-pent with chromatic lift — glam, Bowie',  bars: 3 },
  { id: 'pent_major_one',   name: 'Maj pent one-chord (I)',           degrees: ['I'],                        scales: ['major-pentatonic'],                    vibe: 'One-chord vamp — slide freely over a drone',    bars: 1 },

  // ─── Dream-pop / Khruangbin beautiful-extension section ───
  // Reserved for genuinely beautiful extension use (per Gene's taste): maj7 dream-pop,
  // m9 bossa, add9 shimmer. NOT jazz-cadence m7-V7-Imaj7 reflex.
  { id: 'dream_pop_maj7',   name: 'Dream-pop (Imaj7–vi–IVmaj7)',      degrees: ['Imaj7','vi','IVmaj7'],      scales: ['major'],                               vibe: 'Beach House, Cocteau Twins — glassy maj7 float',bars: 3 },
  { id: 'khruangbin_m9',    name: 'Khruangbin (im9–bVIImaj7)',        degrees: ['im9','bVIImaj7'],           scales: ['dorian'],                              vibe: 'Khruangbin modal — dorian m9 bass-line trance', bars: 2 },
  { id: 'bossa_add9',       name: 'Bossa sway (Iadd9–V7)',            degrees: ['Iadd9','V7'],               scales: ['major'],                               vibe: 'Bossa sway — João Gilberto, warm add9 shimmer', bars: 2 },

  // ─── Whole-tone (symmetric scale — augmented chords are its natural home) ───
  // Whole-tone has no perfect 5th, so major/minor triads don't fit. Augmented
  // chords (R-3-#5) are made entirely of whole-tones and fit natively. Two aug
  // chords a whole step apart cover all 6 scale notes between them.
  { id: 'whole_tone_aug',   name: 'Whole-tone (Iaug–IIaug)',          degrees: ['Iaug','IIaug'],             scales: ['whole-tone'],                          vibe: 'Debussy, dream sequence — floating ambiguity',  bars: 2 },
  { id: 'whole_tone_vamp',  name: 'Whole-tone vamp (Iaug)',           degrees: ['Iaug'],                     scales: ['whole-tone'],                          vibe: 'Single-chord whole-tone drone — impressionist', bars: 1 },

  // ─── Aesthetic favorites (beautiful over exotic — user brief) ───
  // Sunny two-chord vamps that never get old.
  { id: 'sunshine_i_iv',    name: 'Sunshine (I–IV–I)',                degrees: ['I','IV','I'],               scales: ['major','lydian'],                      vibe: '"Here Comes the Sun", "Three Little Birds"',    bars: 3 },
  { id: 'porch_shuffle',    name: 'Porch shuffle (I–vi–I–vi)',        degrees: ['I','vi','I','vi'],          scales: ['major'],                               vibe: 'Summer-porch two-chord sway, Mac DeMarco',      bars: 4 },
  // 60s soul — 3-chord but with a iii instead of ii for that honeyed Motown pull.
  { id: 'soul_iii_lift',    name: 'Soul lift (I–iii–IV)',             degrees: ['I','iii','IV'],             scales: ['major'],                               vibe: 'Otis Redding, Al Green — "Dock of the Bay" pull',bars: 3 },
  // Shoegaze drone — the "VI goes up to VII then resolves" is heartache-on-reverb.
  { id: 'shoegaze_lift',    name: 'Shoegaze (i–bVI–bVII)',            degrees: ['i','bVI','bVII'],           scales: ['natural-minor'],                       vibe: 'Mazzy Star, Slowdive — reverb haze',            bars: 3 },
  // City-pop stacked majors. Tatsuro Yamashita / Mariya Takeuchi signature.
  { id: 'city_pop_stack',   name: 'City-pop (Imaj7–IIImaj7–vi)',      degrees: ['Imaj7','bIII','vi'],        scales: ['major'],                               vibe: 'Tatsuro Yamashita, Plastic Love — 80s Tokyo',   bars: 3 },
  // Neo-soul — Imaj9 floats, bVII warms like a sunset. D'Angelo vibe.
  { id: 'neo_soul_float',   name: 'Neo-soul (Imaj9–bVIImaj7)',        degrees: ['Imaj9','bVIImaj7'],         scales: ['mixolydian'],                          vibe: 'D\'Angelo, Erykah Badu — neo-soul sunset',      bars: 2 },
  // Folk-indie four-chord — Bon Iver / Sufjan / Big Thief territory. Minor but hopeful.
  { id: 'folk_indie',       name: 'Folk indie (i–III–VII–VI)',        degrees: ['i','III','VII','VI'],       scales: ['natural-minor'],                       vibe: 'Bon Iver, Phoebe Bridgers, Big Thief',          bars: 4 },
  // Island lilt — classic reggae/ska but with a vi instead of V to soften.
  { id: 'island_lilt',      name: 'Island lilt (I–IV–vi–IV)',         degrees: ['I','IV','vi','IV'],         scales: ['major'],                               vibe: 'Reggae-pop, tropical shade — Jack Johnson',     bars: 4 },
  // Ambient dorian — the IV chord in dorian is major and sunny. Paired with i it's that floating bittersweet thing.
  { id: 'ambient_dorian',   name: 'Ambient dorian (i–IV–i–bVII)',     degrees: ['i','IV','i','bVII'],        scales: ['dorian'],                              vibe: 'Floating modal — ECM, Tim Hecker, Nils Frahm',  bars: 4 },
  // Alt-rock staple — vi-IV-I-V inverted axis with the anthemic lift.
  { id: 'alt_rock_lift',    name: 'Alt-rock (IV–I–V–vi)',             degrees: ['IV','I','V','vi'],          scales: ['major'],                               vibe: 'The National, Death Cab — rainy anthem',        bars: 4 },
  // Jangly surf — major I-vi-V with the melancholic 6 pull. Real Estate / Allah-Las.
  { id: 'surf_jangle',      name: 'Surf jangle (I–vi–V)',             degrees: ['I','vi','V'],               scales: ['major'],                               vibe: 'Allah-Las, Real Estate — surf-jangle pull',     bars: 3 },
  // Psych-soul — Khruangbin/BALTHVS minor vamp with the flat-6 warmth.
  { id: 'psych_soul',       name: 'Psych-soul (i–bVI–v)',             degrees: ['i','bVI','v'],              scales: ['natural-minor'],                       vibe: 'BALTHVS, Khruangbin — psych-soul heat',         bars: 3 },
];

// Every scale now has progressions. Pentatonics, locrian, hirajoshi, and
// whole-tone use accidentals + quality pins since their interval sets don't
// line up with bare Roman-numeral degrees. Whole-tone leans on augmented
// triads (the only triad shape that fits its symmetric structure). Kept as
// an empty Set for backward compat with places that still check it.
export const SCALES_WITHOUT_PROGRESSIONS = new Set([]);
