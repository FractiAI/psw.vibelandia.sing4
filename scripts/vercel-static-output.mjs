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
const interfacesDest = path.join(staticDir, 'interfaces');
if (fs.existsSync(interfacesSrc)) {
  copyDir(interfacesSrc, interfacesDest);
}

// Copy episodes/ so "Watch Episode 3" and all episode links work (interfaces link to ../episodes/*.md)
const episodesSrc = path.join(root, 'episodes');
const episodesDest = path.join(staticDir, 'episodes');
if (fs.existsSync(episodesSrc)) {
  copyDir(episodesSrc, episodesDest);
}

// Copy deliverables/ so novel and screenplay reader pages can fetch them
const deliverablesSrc = path.join(root, 'deliverables');
const deliverablesDest = path.join(staticDir, 'deliverables');
if (fs.existsSync(deliverablesSrc)) {
  copyDir(deliverablesSrc, deliverablesDest);
}

// Copy root .md and protocols/ so roll call, prospectus, chairman specs, etc. don't 404
const rootMdDir = root;
const rootFiles = fs.readdirSync(rootMdDir, { withFileTypes: true });
for (const e of rootFiles) {
  if (e.isFile() && e.name.endsWith('.md')) {
    copyFile(path.join(rootMdDir, e.name), path.join(staticDir, e.name));
  }
}
const protocolsSrc = path.join(root, 'protocols');
const protocolsDest = path.join(staticDir, 'protocols');
if (fs.existsSync(protocolsSrc)) {
  copyDir(protocolsSrc, protocolsDest);
}

// Inject Supabase anon key and optional PayPal client ID at build time
const apiConfigPath = path.join(interfacesDest, 'api-config.js');
if (fs.existsSync(apiConfigPath)) {
  const anonKey = process.env.VIBELANDIA_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const paypalClientId = process.env.VIBELANDIA_PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID_SANDBOX || '';
  let apiConfig = fs.readFileSync(apiConfigPath, 'utf8');
  apiConfig = apiConfig.replace(
    /window\.VIBELANDIA_SUPABASE_ANON_KEY = '';/,
    `window.VIBELANDIA_SUPABASE_ANON_KEY = ${JSON.stringify(anonKey)};`
  );
  if (paypalClientId) {
    apiConfig = apiConfig.replace(
      /window\.VIBELANDIA_PAYPAL_CLIENT_ID = '[^']*';/,
      `window.VIBELANDIA_PAYPAL_CLIENT_ID = ${JSON.stringify(paypalClientId)};`
    );
  }
  fs.writeFileSync(apiConfigPath, apiConfig, 'utf8');
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

// PayPal API serverless functions — emit into Build Output API v3
const apiPayPalDir = path.join(root, 'api', 'payment', 'paypal');
const functionsDir = path.join(outDir, 'functions');
const paypalRoutes = ['config', 'create-order', 'capture-order'];
const vcConfig = {
  runtime: 'nodejs20.x',
  handler: 'index.js',
  launcherType: 'Nodejs',
  shouldAddHelpers: true,
};

if (fs.existsSync(apiPayPalDir)) {
  mkdirp(functionsDir);
  for (const name of paypalRoutes) {
    const srcFile = path.join(apiPayPalDir, `${name}.js`);
    if (!fs.existsSync(srcFile)) continue;
    const funcDir = path.join(functionsDir, 'api', 'payment', 'paypal', `${name}.func`);
    mkdirp(funcDir);
    fs.copyFileSync(srcFile, path.join(funcDir, 'index.js'));
    fs.writeFileSync(
      path.join(funcDir, '.vc-config.json'),
      JSON.stringify(vcConfig, null, 2),
      'utf8'
    );
    fs.writeFileSync(
      path.join(funcDir, 'package.json'),
      JSON.stringify({ type: 'module' }, null, 2),
      'utf8'
    );
  }
}

// Auth API — Google OAuth redirect to Octave 2
const apiAuthDir = path.join(root, 'api', 'auth');
if (fs.existsSync(apiAuthDir)) {
  const authFiles = fs.readdirSync(apiAuthDir).filter((f) => f.endsWith('.js'));
  for (const file of authFiles) {
    const name = file.replace(/\.js$/, '');
    const srcFile = path.join(apiAuthDir, file);
    const funcDir = path.join(functionsDir, 'api', 'auth', `${name}.func`);
    mkdirp(funcDir);
    fs.copyFileSync(srcFile, path.join(funcDir, 'index.js'));
    fs.writeFileSync(
      path.join(funcDir, '.vc-config.json'),
      JSON.stringify(vcConfig, null, 2),
      'utf8'
    );
    fs.writeFileSync(
      path.join(funcDir, 'package.json'),
      JSON.stringify({ type: 'module' }, null, 2),
      'utf8'
    );
  }
}

// Build Output API v3 config — static + serverless
const config = {
  version: 3,
  routes: [
    { handle: 'filesystem' },
    { src: '/(.*)', dest: '/index.html' }
  ]
};

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
console.log('  static/episodes/*');
console.log('  static/deliverables/* (novel, screenplay)');
console.log('  static/*.md + static/protocols/*');
if (fs.existsSync(apiPayPalDir)) {
  console.log('  functions/api/payment/paypal/*.func (PayPal pipe)');
}
if (fs.existsSync(apiAuthDir)) {
  console.log('  functions/api/auth/*.func (Google OAuth redirect)');
}
