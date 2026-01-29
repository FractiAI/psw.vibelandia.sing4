#!/usr/bin/env node
/**
 * Vercel static output — copies static files to .vercel/output/static
 * so deployment serves index.html at / and interfaces/* at /interfaces/*
 * Run as: node scripts/vercel-static-output.mjs (from repo root)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, '.vercel', 'output');
const staticDir = path.join(outDir, 'static');

function mkdirp(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyFile(src, dest) {
  mkdirp(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  mkdirp(destDir);
  for (const name of fs.readdirSync(srcDir)) {
    const s = path.join(srcDir, name);
    const d = path.join(destDir, name);
    if (fs.statSync(s).isDirectory()) {
      copyDir(s, d);
    } else {
      copyFile(s, d);
    }
  }
}

// Ensure output dirs exist
mkdirp(staticDir);

// Copy root index.html
const indexHtml = path.join(root, 'index.html');
if (fs.existsSync(indexHtml)) {
  copyFile(indexHtml, path.join(staticDir, 'index.html'));
}

// Copy interfaces/
const interfacesSrc = path.join(root, 'interfaces');
if (fs.existsSync(interfacesSrc)) {
  copyDir(interfacesSrc, path.join(staticDir, 'interfaces'));
}

// Minimal favicon.ico (1x1 purple) so /favicon.ico doesn't 404
const faviconIco = path.join(staticDir, 'favicon.ico');
// Minimal 1x1 ICO: 6 + 16 byte dir + 40 byte DIB + 4 pixel (BGR purple)
const minimalIco = Buffer.from([
  0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x2c, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00,
  0x28, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x01, 0x00, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0xe2, 0x2b, 0x8a, 0xff
]);
mkdirp(path.dirname(faviconIco));
fs.writeFileSync(faviconIco, minimalIco);

// Build Output API v3 config — static only
const config = {
  version: 3,
  routes: [
    { handle: 'filesystem' },
    { src: '/(.*)', dest: '/index.html' }
  ]
};

// For static-only we want / to serve index.html; filesystem handle does that when file exists.
// So we only need filesystem then fallback. Actually for static, just filesystem is enough:
// Vercel will serve /index.html as / and /interfaces/foo.html as /interfaces/foo.html.
config.routes = [{ handle: 'filesystem' }];

fs.writeFileSync(
  path.join(outDir, 'config.json'),
  JSON.stringify(config, null, 2),
  'utf8'
);

console.log('Vercel static output written to .vercel/output/');
console.log('  static/index.html');
console.log('  static/favicon.ico');
console.log('  static/interfaces/*');
