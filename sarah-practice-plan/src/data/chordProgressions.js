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
  { id: 'pop_axis',         name: 'Pop axis (I–V–vi–IV)',             degrees: ['I','V','vi','IV'],          scales: ['major','lydian'],                      vibe: 'Coldplay, Journey, Axis of Awesome',            bars: 4 },
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
  { id: 'minor_three',      name: 'Minor 3-chord (i–iv–v)',           degrees: ['i','iv','v'],               scales: ['natural-minor','dorian'],              vibe: 'Folk minor, sea shanty',                        bars: 3 },
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
  { id: 'blues_12bar',      name: '12-bar blues',                     degrees: ['I7','I7','I7','I7','IV7','IV7','I7','I7','V7','IV7','I7','V7'], scales: ['major','mixolydian'], vibe: '12-bar blues', bars: 12 },
  { id: 'blues_quick4',     name: '12-bar quick-change',              degrees: ['I7','IV7','I7','I7','IV7','IV7','I7','I7','V7','IV7','I7','V7'], scales: ['major','mixolydian'], vibe: 'Blues with quick IV in bar 2', bars: 12 },
  { id: 'blues_minor',      name: 'Minor blues',                      degrees: ['im7','im7','im7','im7','ivm7','ivm7','im7','im7','V7','ivm7','im7','im7'], scales: ['natural-minor'], vibe: 'Minor blues', bars: 12 },
  { id: 'blues_jazz',       name: 'Jazz blues (with II–V)',           degrees: ['I7','IV7','I7','I7','IV7','IV7','I7','iiim7','VI7','iim7','V7','I7'], scales: ['major','mixolydian'], vibe: 'Charlie Parker blues', bars: 12 },
  { id: 'blues_8bar',       name: '8-bar blues',                      degrees: ['I7','V7','IV7','IV7','I7','V7','I7','V7'], scales: ['major','mixolydian'], vibe: 'Key to the Highway, Heartbreak Hotel', bars: 8 },

  // ─── World / Khruangbin / Tinariwen / desert ───
  { id: 'desert_vamp',      name: 'Desert vamp (i–bVII)',             degrees: ['i','bVII'],                 scales: ['dorian','natural-minor','phrygian-dominant'], vibe: 'Tinariwen, Mdou Moctar',            bars: 2 },
  { id: 'khruangbin_im_bvii',name:'Khruangbin (im7–bVIImaj7)',        degrees: ['im7','bVIImaj7'],           scales: ['dorian'],                              vibe: 'Khruangbin "Maria También"',                    bars: 2 },
  { id: 'desert_blues',     name: 'Desert blues (i–VI–iv–i)',         degrees: ['i','VI','iv','i'],          scales: ['natural-minor'],                       vibe: 'Ali Farka Touré, Bombino',                      bars: 4 },

  // ─── Reggae / surf ───
  { id: 'reggae_offbeat',   name: 'Reggae I–IV–V',                    degrees: ['I','IV','V'],               scales: ['major','mixolydian'],                  vibe: 'One-drop reggae, ska',                          bars: 3 },
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
];

// Scales where progressions don't make musical sense — pentatonics lack a
// diatonic 7-chord palette, whole-tone is symmetric with no tonic triad,
// locrian's tonic is diminished. Cards drawing one of these scales silently
// skip the progression dim.
export const SCALES_WITHOUT_PROGRESSIONS = new Set([
  'minor-pentatonic', 'major-pentatonic', 'hirajoshi', 'whole-tone', 'locrian',
]);
