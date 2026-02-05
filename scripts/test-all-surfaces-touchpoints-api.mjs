#!/usr/bin/env node
/**
 * Test All Surfaces, Touchpoints, and API Calls
 * Run: node scripts/test-all-surfaces-touchpoints-api.mjs
 * From repo root. Node 18+ (uses native fetch).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const INTERFACES = path.join(ROOT, 'interfaces');
const SRC = path.join(ROOT, 'src');

const results = { surfaces: [], touchpoints: [], api: [], errors: [] };
let passed = 0;
let failed = 0;

function ok(label, detail = '') {
  results.surfaces.push({ type: 'surface', label, ok: true, detail });
  passed++;
}
function fail(label, detail = '') {
  results.errors.push({ type: 'surface', label, ok: false, detail });
  failed++;
}
function touchOk(label, target, exists) {
  results.touchpoints.push({ label, target, exists });
  if (exists) passed++; else failed++;
}
function apiResult(label, ok, detail = '') {
  results.api.push({ label, ok, detail });
  if (ok) passed++; else failed++;
}

// --- 1. HTML Surfaces ---
const expectedSurfaces = [
  'seed-edge-mini-console.html',
  'chairman-workspace.html',
  'chairman-cockpit-center-console.html',
  'chairman-cockpit-station.html',
  'gps-seed-edge-console.html',
  'executive-dashboard.html',
  'vibe-snap-capture.html',
  'vibe-verse-display.html',
  'shared-console-header.html',
  'syntheverse-disclaimer-banner.html',
  'music-radio-console.html',
  'chancellor-daily-bulletin.html',
  'escapes-magazine.html',
  'escapes-magazine-catalog-menu.html',
  'escapes-catalog-menu-component.html',
  'guided-expeditions.html',
  'mens-club-restroom-landing.html',
  'vibeland-reno-buttons.html',
  'water-bridge-landing.html',
  'payment-checkout.html',
  'payment-success.html',
  'profile.html',
  'vibers-what-are-vibers.html',
  'launch-readiness-report.html',
  'launch-pad.html',
  'happy-ending-zones-experience.html',
  'happy-ending-zones-catalog.html',
  'what-you-can-do-vibing.html',
  'episode.html',
  'whitepaper.html',
  'proposal.html',
  'one-pager.html',
  'first-singularity-january-13th-experience.html',
  'first-singularity-novel.html',
  'first-singularity-screenplay.html',
  'birth-post-singularity-novel.html',
  'birth-post-singularity-screenplay.html',
  'the-egs-run-novel.html',
  'the-egs-run-screenplay.html',
  'hero-jo-classical.html',
  'golden-parrot-tropica-chill.html',
  'content-catalog.html',
];
const expectedJs = ['add-console-header.js', 'api-config.js', 'auth-api.js', 'golden-key-browser.js'];

for (const name of expectedSurfaces) {
  const p = path.join(INTERFACES, name);
  if (fs.existsSync(p)) ok(`interfaces/${name}`, 'exists');
  else fail(`interfaces/${name}`, 'missing');
}
for (const js of expectedJs) {
  const jsPath = path.join(INTERFACES, js);
  if (fs.existsSync(jsPath)) ok(`interfaces/${js}`, 'exists');
  else fail(`interfaces/${js}`, 'missing');
}

// --- 2. Link touchpoints (href, src) from HTML ---
// Octave 1: index (root) → Happy Ending Zone link must resolve (fix 404)
const indexHappyEnding = path.join(ROOT, 'interfaces', 'happy-ending-zones-experience.html');
if (fs.existsSync(indexHappyEnding)) ok('index → interfaces/happy-ending-zones-experience.html', 'target exists');
else fail('index → interfaces/happy-ending-zones-experience.html', 'missing — 404');

const linkTargetsFromReport = [
  { from: 'chairman-cockpit-center-console.html', href: 'README.md' },
  { from: 'chairman-cockpit-center-console.html', href: 'EXECUTIVE_SUMMARY.md' },
  { from: 'chairman-cockpit-center-console.html', href: 'WHITEBOARD.md' },
  { from: 'chairman-cockpit-center-console.html', href: 'irreducible_seed_execution_system.md' },
  { from: 'chairman-cockpit-center-console.html', href: 'VIBE_SYSTEM.md' },
  { from: 'chairman-cockpit-center-console.html', href: 'CHAIRMAN_SECTION_LAYOUT.md' },
  { from: 'chairman-cockpit-center-console.html', href: 'SYNTHEVERSE_IMAGINARY_ENTERTAINMENT_ONLY.md' },
  { from: 'mens-club-restroom-landing.html', href: 'SYNTHEVERSE_IMAGINARY_ENTERTAINMENT_ONLY.md' },
  { from: 'seed-edge-mini-console.html', href: 'shared-console-header.html' },
  { from: 'seed-edge-mini-console.html', src: 'add-console-header.js' },
];

for (const { from: fromFile, href, src } of linkTargetsFromReport) {
  const target = href || src;
  const fromPath = path.join(INTERFACES, fromFile);
  let resolved = target;
  if (target.startsWith('/')) resolved = path.join(ROOT, target.slice(1));
  else if (target.includes('.md')) resolved = path.join(ROOT, target);
  else resolved = path.join(INTERFACES, target);
  const exists = fs.existsSync(resolved);
  touchOk(`${fromFile} → ${target}`, resolved, exists);
}

// Resolve href/src from interfaces/ HTML: root-relative (/ or .md at root) vs interfaces-relative (including ../)
function resolveTouchpoint(target) {
  if (target.startsWith('/')) return path.join(ROOT, target.slice(1));
  if (target.includes('.md') && !target.startsWith('..')) return path.join(ROOT, target);
  return path.join(INTERFACES, target);
}

// Scan all HTML for href/src and check root-relative and interfaces-relative
for (const name of expectedSurfaces.filter(n => n.endsWith('.html'))) {
  const p = path.join(INTERFACES, name);
  if (!fs.existsSync(p)) continue;
  const html = fs.readFileSync(p, 'utf8');
  const hrefs = [...html.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]).filter(h => !h.startsWith('http') && !h.startsWith('#') && !h.startsWith('mailto:'));
  const srcs = [...html.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]).filter(s => !s.startsWith('http'));
  for (const h of hrefs) {
    const res = resolveTouchpoint(h);
    const exists = fs.existsSync(res);
    if (!results.touchpoints.some(t => t.label === `${name} → ${h}`)) {
      touchOk(`${name} → ${h}`, res, exists);
    }
  }
  for (const s of srcs) {
    const res = resolveTouchpoint(s);
    const exists = fs.existsSync(res);
    if (!results.touchpoints.some(t => t.label === `${name} → ${s}`)) {
      touchOk(`${name} → ${s}`, res, exists);
    }
  }
}

// --- 3. Expected IDs in key surfaces (script touchpoints) ---
const expectedIds = {
  'seed-edge-mini-console.html': ['originSeed', 'destinationEdge', 'codeDisplay', 'netZeroValue', 'miniConsole'],
  'gps-seed-edge-console.html': ['originSeed', 'destinationEdge', 'codeDisplay', 'netZeroValue'],
};
for (const [file, ids] of Object.entries(expectedIds)) {
  const p = path.join(INTERFACES, file);
  if (!fs.existsSync(p)) continue;
  const html = fs.readFileSync(p, 'utf8');
  for (const id of ids) {
    const hasId = html.includes(`id="${id}"`) || html.includes(`id='${id}'`);
    if (hasId) ok(`ID ${file}#${id}`, 'present');
    else fail(`ID ${file}#${id}`, 'missing');
  }
}

// --- 4. API source files exist ---
const apiModules = [
  'cloud-onramp-config.ts',
  'cloud-onramp-client.ts',
  'seed-edge-api-layer.ts',
  'octave-1-operational.ts',
  'vibe-system.ts',
];
for (const name of apiModules) {
  const p = path.join(SRC, name);
  if (fs.existsSync(p)) apiResult(`src/${name}`, true, 'exists');
  else apiResult(`src/${name}`, false, 'missing');
}

// --- 5. API calls: Cloud Onramp health (fetch) ---
const cloudBase = process.env.CLOUD_API_BASE_URL || 'https://syntheverse-poc.vercel.app';
const healthUrl = `${cloudBase.replace(/\/+$/, '')}/api/health`;
try {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  const res = await fetch(healthUrl, { signal: controller.signal }).finally(() => clearTimeout(timeout));
  const data = await res.json().catch(() => ({}));
  if (res.ok) apiResult('Cloud Onramp GET /api/health', true, `status ${res.status}`);
  else apiResult('Cloud Onramp GET /api/health', false, `status ${res.status} ${JSON.stringify(data)}`);
} catch (e) {
  // Network unreachable or timeout: report only (optional API)
  const msg = (e && e.message) || String(e);
  results.api.push({ label: 'Cloud Onramp GET /api/health', ok: false, detail: msg });
}

// Same-origin API touchpoints (only test if BASE_URL set; otherwise document)
const baseUrl = process.env.BASE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
if (baseUrl) {
  for (const endpoint of ['/api/dashboard', '/api/workspace']) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(`${baseUrl}${endpoint}`, { signal: controller.signal }).finally(() => clearTimeout(timeout));
      apiResult(`Same-origin ${endpoint}`, res.ok || res.status === 404, `status ${res.status}`);
    } catch (e) {
      apiResult(`Same-origin ${endpoint}`, false, e.message || String(e));
    }
  }
} else {
  results.api.push({ label: 'Same-origin /api/dashboard, /api/workspace', ok: null, detail: 'BASE_URL not set; skip (404 expected when static)' });
}

// --- Output ---
const out = {
  timestamp: new Date().toISOString(),
  passed,
  failed,
  total: passed + failed,
  surfaces: results.surfaces.length,
  touchpoints: results.touchpoints.filter(t => t.exists).length + ' / ' + results.touchpoints.length,
  api: results.api,
  errors: results.errors,
};

console.log('\n--- Surfaces & Touchpoints & API Test ---\n');
console.log('Surfaces:', results.surfaces.filter(s => s.ok).length, '/', results.surfaces.length);
console.log('Touchpoints:', results.touchpoints.filter(t => t.exists).length, '/', results.touchpoints.length);
console.log('API:', results.api.filter(a => a.ok === true).length, 'ok,', results.api.filter(a => a.ok === false).length, 'fail');
console.log('Total passed:', passed, '| failed:', failed);
if (results.errors.length) {
  console.log('\nErrors:');
  results.errors.forEach(e => console.log('  -', e.label, e.detail));
}
const failedTouchpoints = results.touchpoints.filter(t => !t.exists);
if (failedTouchpoints.length) {
  console.log('\nFailed touchpoints (broken links):');
  failedTouchpoints.forEach(t => console.log('  -', t.label, '→', t.target));
}
console.log('\nAPI details:', JSON.stringify(results.api, null, 2));

// Write run log
const logPath = path.join(ROOT, 'scripts', 'last-test-run.json');
fs.mkdirSync(path.dirname(logPath), { recursive: true });
fs.writeFileSync(logPath, JSON.stringify(out, null, 2), 'utf8');
console.log('\nWrote', logPath);

process.exit(failed > 0 ? 1 : 0);
