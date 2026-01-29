#!/usr/bin/env node
/**
 * Check Supabase access — list schema (OpenAPI) and/or sample contents.
 * Run: node scripts/check-supabase-access.mjs
 * Uses NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY from env or .env.nspfrnp.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function loadEnvNspfrnp() {
  const envPath = path.join(ROOT, '.env.nspfrnp');
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (m) {
      const key = m[1];
      const val = m[2].replace(/^["']|["']$/g, '').trim();
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

loadEnvNspfrnp();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VIBELANDIA_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VIBELANDIA_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function main() {
  console.log('Supabase URL:', SUPABASE_URL ? SUPABASE_URL.replace(/\/$/, '') : '(not set)');
  console.log('Anon key set:', !!ANON_KEY);
  console.log('Service role key set:', !!SERVICE_KEY);
  console.log('');

  if (!SUPABASE_URL) {
    console.log('Set NEXT_PUBLIC_SUPABASE_URL (or add to .env.nspfrnp) and re-run.');
    process.exit(1);
  }

  const base = SUPABASE_URL.replace(/\/$/, '');
  const key = SERVICE_KEY || ANON_KEY;
  if (!key) {
    console.log('Set NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY and re-run.');
    process.exit(1);
  }

  const headers = {
    apikey: key,
    Authorization: 'Bearer ' + key,
    Accept: 'application/openapi+json',
    'Content-Type': 'application/json',
  };

  // 1. Fetch OpenAPI schema (lists tables/paths)
  console.log('--- Schema (OpenAPI) ---');
  try {
    const schemaRes = await fetch(base + '/rest/v1/', { headers });
    const schemaText = await schemaRes.text();
    if (!schemaRes.ok) {
      console.log('Schema fetch status:', schemaRes.status, schemaRes.statusText);
      console.log(schemaText.slice(0, 500));
      throw new Error('Schema fetch failed');
    }
    const schema = JSON.parse(schemaText);
    const paths = schema.paths || {};
    const tablePaths = Object.keys(paths).filter((p) => p.startsWith('/') && p !== '/');
    console.log('Paths (tables/views):', tablePaths.length);
    tablePaths.sort().forEach((p) => console.log('  ', p));
    if (schema.components && schema.components.schemas) {
      const schemas = Object.keys(schema.components.schemas);
      console.log('\nComponents.schemas:', schemas.length);
      schemas.slice(0, 30).forEach((s) => console.log('  ', s));
      if (schemas.length > 30) console.log('  ... and', schemas.length - 30, 'more');
    }
  } catch (e) {
    console.log('Schema error:', e.message);
  }

  // 2. Try to read a few known tables (from SUPABASE_SETUP.md)
  console.log('\n--- Sample contents (select limit 2) ---');
  const tablesToTry = ['users', 'poc_submissions', 'customers', 'chat_rooms', 'social_posts'];
  for (const table of tablesToTry) {
    try {
      const res = await fetch(base + '/rest/v1/' + table + '?limit=2', {
        headers: { ...headers, Accept: 'application/json', 'Range-Unit': 'items', Prefer: 'return=representation' },
      });
      if (res.status === 404) {
        console.log('  ', table, ': (not found or no access)');
        continue;
      }
      if (res.status === 401 || res.status === 403) {
        console.log('  ', table, ': unauthorized/forbidden');
        continue;
      }
      const data = await res.json();
      const rows = Array.isArray(data) ? data : [];
      console.log('  ', table, ':', rows.length, 'row(s)', rows.length ? JSON.stringify(rows[0]).slice(0, 80) + '...' : '');
    } catch (e) {
      console.log('  ', table, ': error', e.message);
    }
  }

  console.log('\nDone.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
