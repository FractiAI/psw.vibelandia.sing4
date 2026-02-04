#!/usr/bin/env node
/**
 * Add Gold Hearted Grown Ups Zone to all interface HTML files that have nspfrnp-ticker but not gold-hearted.
 */
import { readFileSync, writeFileSync } from 'fs';
import { readdirSync } from 'fs';
import { join } from 'path';

const interfacesDir = join(process.cwd(), 'interfaces');
const oldBlock = `    <link rel="stylesheet" href="nspfrnp-ticker.css">
    <div class="nspfrnp-console-ticker" aria-live="polite"><span class="ticker-inner" id="nspfrnpTickerText"></span></div>
    <script src="nspfrnp-ticker.js"></script>
</body>`;
const newBlock = `    <link rel="stylesheet" href="nspfrnp-ticker.css">
    <link rel="stylesheet" href="gold-hearted-grown-ups-zone.css">
    <div class="nspfrnp-console-ticker" aria-live="polite"><span class="ticker-inner" id="nspfrnpTickerText"></span></div>
    <script src="gold-hearted-grown-ups-zone.js"></script>
    <script src="nspfrnp-ticker.js"></script>
</body>`;

const files = readdirSync(interfacesDir).filter(f => f.endsWith('.html'));
let updated = 0;
for (const f of files) {
  const path = join(interfacesDir, f);
  const content = readFileSync(path, 'utf8');
  if (content.includes('nspfrnp-ticker.js') && !content.includes('gold-hearted-grown-ups-zone')) {
    const newContent = content.replace(oldBlock, newBlock);
    if (newContent !== content) {
      writeFileSync(path, newContent);
      updated++;
      console.log('Updated:', f);
    }
  }
}
console.log('Total updated:', updated);
