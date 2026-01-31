#!/usr/bin/env node
/**
 * Expand episode markdown files toward 12,000 words.
 * Reads each episode in episodes/, counts words; if under 12k, reports gap.
 * Does NOT auto-insert content (content must be thematic per episode).
 * Use: node scripts/expand-episode-to-12k.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const episodesDir = path.join(root, 'episodes');
const TARGET = 12000;

const files = fs.readdirSync(episodesDir).filter((f) => f.endsWith('.md'));
const results = [];

for (const file of files) {
  const filePath = path.join(episodesDir, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  const words = raw.split(/\s+/).filter(Boolean).length;
  const gap = Math.max(0, TARGET - words);
  results.push({ file, words, gap, ok: words >= TARGET });
}

console.log('\nEpisode word count vs 12,000 target:\n');
for (const r of results.sort((a, b) => a.words - b.words)) {
  const status = r.ok ? 'OK' : `need ${r.gap}`;
  console.log(`${r.file}: ${r.words} words — ${status}`);
}
console.log('\nTotal episodes:', results.length);
console.log('At or over 12k:', results.filter((r) => r.ok).length);
console.log('Under 12k:', results.filter((r) => !r.ok).length);
process.exit(0);
