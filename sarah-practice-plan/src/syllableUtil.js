import Hypher from 'hypher';
import english from 'hyphenation.en-us';

const hypher = new Hypher(english);
const cache = {};

// Common 1-syllable English words that have 2 vowel clusters (silent-e pattern)
const SINGLE_SYLLABLE_BLOCKLIST = new Set([
  "style", "type", "byte", "rhyme", "while", "white", "write", "whole",
  "those", "where", "there", "these", "since", "quite", "phone", "stone",
  "store", "score", "scene", "theme", "scheme", "place", "space", "trace",
  "grace", "price", "twice", "prince", "change", "range", "strange",
  "bridge", "ridge", "edge", "judge", "large", "charge", "source", "force",
  "course", "nurse", "purse", "curse", "verse", "false", "pulse", "sense",
  "dense", "tense", "fence", "hence", "once", "dance", "chance", "france",
  "glance", "lance", "peace", "lease", "crease", "grease", "please",
  "freeze", "breeze", "squeeze", "bronze", "lounge", "plunge", "sponge",
]);

/**
 * Vowel-cluster syllable fallback for when Hypher can't split a word.
 * Splits on consonant boundaries between vowel groups.
 * Returns array of parts or null if unsplittable.
 */
function vowelSplit(word) {
  const clean = word.replace(/-$/, '').toLowerCase();
  if (clean.length < 3) return null;
  if (SINGLE_SYLLABLE_BLOCKLIST.has(clean)) return null;

  const vowels = 'aeiouy';
  const isVowel = ch => vowels.includes(ch);

  // Find vowel clusters (contiguous vowel sequences)
  const clusters = [];
  let i = 0;
  while (i < clean.length) {
    if (isVowel(clean[i])) {
      const start = i;
      while (i < clean.length && isVowel(clean[i])) i++;
      clusters.push({ start, end: i });
    } else {
      i++;
    }
  }

  if (clusters.length <= 1) return null;

  // Split between vowel clusters
  const breaks = [];
  for (let j = 0; j < clusters.length - 1; j++) {
    const gapStart = clusters[j].end;
    const gapEnd = clusters[j + 1].start;
    const gapLen = gapEnd - gapStart;
    if (gapLen === 0) {
      breaks.push(gapStart);
    } else if (gapLen === 1) {
      breaks.push(gapStart); // single consonant goes with next syllable
    } else {
      breaks.push(gapStart + Math.floor(gapLen / 2));
    }
  }

  const parts = [];
  let prev = 0;
  for (const bp of breaks) {
    parts.push(clean.slice(prev, bp));
    prev = bp;
  }
  parts.push(clean.slice(prev));

  return parts.filter(p => p.length > 0);
}

export function splitSyllables(word) {
  const w = typeof word === 'string' ? word : word.text;
  if (w in cache) return cache[w];
  const clean = w.replace(/-$/, '');

  // Tier 1: Hypher typographic hyphenation
  const parts = hypher.hyphenate(clean.toLowerCase());
  if (parts.length > 1) {
    const result = parts.map((p, i) => i < parts.length - 1 ? p + '-' : p);
    cache[w] = result;
    return result;
  }

  // Tier 2: Vowel-cluster musical fallback
  const vowelParts = vowelSplit(clean);
  if (vowelParts && vowelParts.length > 1) {
    const result = vowelParts.map((p, i) => i < vowelParts.length - 1 ? p + '-' : p);
    cache[w] = result;
    return result;
  }

  cache[w] = null;
  return null;
}

/**
 * Normalize a lyric word: lowercase, strip punctuation, keep apostrophes/hyphens.
 */
export function normalizeLyric(word) {
  return word
    .toLowerCase()
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")  // curly single quotes → straight
    .replace(/[\u201C\u201D\u201E\u201F]/g, '')    // curly double quotes → remove
    .replace(/[.,!?;:()[\]{}@#$%^&*~`"]/g, '')     // strip punctuation
    .replace(/\u2014|\u2013/g, '')                   // em/en dash → remove
    .replace(/\u2026/g, '')                          // ellipsis → remove
    .replace(/^'+|'+$/g, '')                         // strip leading/trailing apostrophes
    .trim();
}

/**
 * Tokenize and normalize a lyrics string into an array of clean words with originIndex.
 * Returns array of {text, groupId: null, originIndex} objects.
 */
export function normalizeAndTokenize(text) {
  let idx = 0;
  return text.split(/\s+/)
    .filter(w => w.length > 0)
    .flatMap(w => {
      if (w.includes("-")) {
        return w.split(/(?<=-)/).filter(s => s.length > 0);
      }
      return [w];
    })
    .map(w => normalizeLyric(w))
    .filter(w => w.length > 0)
    .map(w => ({ text: w, groupId: null, originIndex: idx++ }));
}

// Pool items are objects {text, groupId, originIndex} or legacy strings
export const chipText = (item) => typeof item === 'string' ? item : item.text;
export const chipGroup = (item) => typeof item === 'string' ? null : (item.groupId || null);
export const chipOrigin = (item) => typeof item === 'string' ? Infinity : (item.originIndex ?? Infinity);
