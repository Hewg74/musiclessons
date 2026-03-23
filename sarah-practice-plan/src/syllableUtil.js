import Hypher from 'hypher';
import english from 'hyphenation.en-us';

const hypher = new Hypher(english);
const cache = {};

export function splitSyllables(word) {
  if (word in cache) return cache[word];
  const clean = word.replace(/-$/, '');
  const parts = hypher.hyphenate(clean.toLowerCase());
  if (parts.length <= 1) { cache[word] = null; return null; }
  const result = parts.map((p, i) => i < parts.length - 1 ? p + '-' : p);
  cache[word] = result;
  return result;
}
