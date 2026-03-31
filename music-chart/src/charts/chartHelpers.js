// ─── Chart Helper Functions ──────────────────────────────────────────────────

export function makeEmptyCell() { return { chord: null, strum: null, lyric: "", lyricGroupId: null }; }
export function makeEmptyMeasure() { return { cells: Array.from({ length: 8 }, makeEmptyCell), between: {}, sectionLabel: "" }; }

// ─── Strum Weight Helpers ───────────────────────────────────────────────────
// Compound strum format: "D" (normal down), "Dl" (light down), "Dh" (heavy down), etc.
export function strumType(val) {
  if (!val) return null;
  return val[0]; // "D", "U", or "X"
}
export function strumWeight(val) {
  if (!val || val.length < 2) return "normal";
  if (val[1] === "l") return "light";
  if (val[1] === "h") return "heavy";
  return "normal";
}
export function makeStrum(type, weight) {
  if (!type) return null;
  if (weight === "light") return type + "l";
  if (weight === "heavy") return type + "h";
  return type; // normal = no suffix
}

// ─── Section Helpers ────────────────────────────────────────────────────────
export const SECTION_LABELS = [
  { group: "Structure", options: ["Intro", "Outro", "Bridge"] },
  { group: "Verse", options: ["Verse 1", "Verse 2", "Verse 3", "Verse 4", "Verse 5"] },
  { group: "Pre-chorus", options: ["Pre-chorus 1", "Pre-chorus 2", "Pre-chorus 3", "Pre-chorus 4"] },
  { group: "Chorus", options: ["Chorus 1", "Chorus 2", "Chorus 3", "Chorus 4"] },
  { group: "Post-chorus", options: ["Post-chorus 1", "Post-chorus 2", "Post-chorus 3", "Post-chorus 4"] },
];

export function getSectionRange(measures, startIdx) {
  const label = measures[startIdx].sectionLabel;
  if (!label) return { start: startIdx, end: startIdx };
  let start = startIdx, end = startIdx;
  while (start > 0 && measures[start - 1].sectionLabel === label) start--;
  while (end + 1 < measures.length && measures[end + 1].sectionLabel === label) end++;
  return { start, end };
}

export function makeTemplateChart() {
  const m = makeEmptyMeasure();
  // Reggae offbeat template: ↓ _ ↓ _ ↑ ↓ _ ↑
  m.cells[0] = { chord: "G", strum: "D", lyric: "" };
  m.cells[1] = { chord: null, strum: null, lyric: "" };
  m.cells[2] = { chord: null, strum: "D", lyric: "" };
  m.cells[3] = { chord: null, strum: null, lyric: "" };
  m.cells[4] = { chord: null, strum: "U", lyric: "" };
  m.cells[5] = { chord: null, strum: "D", lyric: "" };
  m.cells[6] = { chord: null, strum: null, lyric: "" };
  m.cells[7] = { chord: null, strum: "U", lyric: "" };
  return {
    id: "chart_" + Date.now(),
    title: "",
    bpm: 80,
    activeSlots: [],
    barsPerGroup: 2,
    beatOffset: 0,
    measures: [m],
    lyricsPool: [],
    lyricsInput: "",
    youtubeUrl: "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

// Validate and sanitize an imported chart object
export function validateAndSanitizeChart(obj) {
  if (!obj || typeof obj !== "object") return { error: "Invalid JSON — not an object" };
  if (!Array.isArray(obj.measures) || obj.measures.length === 0) return { error: "Chart must have at least one measure" };
  if (obj.measures.length > 200) return { error: "Chart too large — max 200 measures" };
  for (let i = 0; i < obj.measures.length; i++) {
    const m = obj.measures[i];
    if (!Array.isArray(m.cells) || m.cells.length !== 8) return { error: `Measure ${i + 1} must have exactly 8 cells` };
    m.between = m.between || {};
    m.sectionLabel = m.sectionLabel || "";
  }
  const bpm = typeof obj.bpm === "number" && obj.bpm >= 40 && obj.bpm <= 280 ? obj.bpm : 80;
  // Allowlist: only copy known fields to prevent prototype pollution from arbitrary JSON
  return {
    chart: {
      id: "chart_" + Date.now(),
      title: typeof obj.title === "string" ? obj.title.slice(0, 200) : "",
      bpm,
      activeSlots: Array.isArray(obj.activeSlots) ? obj.activeSlots : [],
      barsPerGroup: typeof obj.barsPerGroup === "number" ? obj.barsPerGroup : 0,
      beatOffset: typeof obj.beatOffset === "number" ? obj.beatOffset : 0,
      measures: obj.measures,
      lyricsPool: Array.isArray(obj.lyricsPool) ? obj.lyricsPool : [],
      lyricsInput: typeof obj.lyricsInput === "string" ? obj.lyricsInput.slice(0, 5000) : "",
      youtubeUrl: typeof obj.youtubeUrl === "string" && /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(obj.youtubeUrl) ? obj.youtubeUrl.slice(0, 500) : "",
      createdAt: obj.createdAt || Date.now(),
      updatedAt: Date.now(),
    }
  };
}

// URL sharing — encode chart state as base64 in URL hash
export function compressToURL(obj) {
  try {
    const json = JSON.stringify(obj);
    const bytes = new TextEncoder().encode(json);
    const binary = Array.from(bytes, b => String.fromCharCode(b)).join("");
    return btoa(binary);
  } catch { return null; }
}
export function decompressFromURL(str) {
  try {
    const binary = atob(str);
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json);
  } catch { return null; }
}
