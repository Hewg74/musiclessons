import Hypher from 'hypher';
import english from 'hyphenation.en-us';

const hypher = new Hypher(english);
const cache = {};

export function splitSyllables(word) {
  const w = typeof word === 'string' ? word : word.text;
  if (w in cache) return cache[w];
  const clean = w.replace(/-$/, '');
  const parts = hypher.hyphenate(clean.toLowerCase());
  if (parts.length <= 1) { cache[w] = null; return null; }
  const result = parts.map((p, i) => i < parts.length - 1 ? p + '-' : p);
  cache[w] = result;
  return result;
}

// Pool items are strings (whole words) or {text, groupId} (split fragments)
export const chipText = (item) => typeof item === 'string' ? item : item.text;
export const chipGroup = (item) => typeof item === 'string' ? null : (item.groupId || null);
