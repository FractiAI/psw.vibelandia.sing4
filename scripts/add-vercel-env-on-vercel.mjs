#!/usr/bin/env node
/**
 * Add env variable keys on Vercel (all on Vercel — no local values required).
 * Uses known defaults where we have them; secrets get empty value so you fill them in the Dashboard.
 * Requires only VERCEL_TOKEN in .env.nspfrnp or environment.
 *
 * Usage: node scripts/add-vercel-env-on-vercel.mjs
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

const SECRET_KEYS = new Set([
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'VIBELANDIA_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'DATABASE_URL',
  'PAYPAL_CLIENT_SECRET',
  'PAYPAL_CLIENT_SECRET_SANDBOX',
  'PAYPAL_CLIENT_SECRET_LIVE',
]);

// Keys to add on Vercel with default value (or empty — fill in Dashboard)
const KEYS_WITH_DEFAULTS = {
  NEXT_PUBLIC_SUPABASE_URL: 'https://jfbgdxeumzqzigptbmvp.supabase.co',
  VIBELANDIA_SUPABASE_URL: 'https://jfbgdxeumzqzigptbmvp.supabase.co',
  NEXT_PUBLIC_WEBSITE_URL: 'https://psw-vibelandia-sing4.vercel.app',
  PAYPAL_MODE: 'sandbox',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: '',
  VIBELANDIA_SUPABASE_ANON_KEY: '',
  VIBELANDIA_PAYPAL_CLIENT_ID: '',
  NEXT_PUBLIC_PAYPAL_CLIENT_ID: '',
  PAYPAL_CLIENT_ID: '',
  PAYPAL_CLIENT_SECRET: '',
  PAYPAL_CLIENT_ID_SANDBOX: '',
  PAYPAL_CLIENT_SECRET_SANDBOX: '',
  PAYPAL_CLIENT_ID_LIVE: '',
  PAYPAL_CLIENT_SECRET_LIVE: '',
  SUPABASE_SERVICE_ROLE_KEY: '',
  DATABASE_URL: '',
  VIBELANDIA_GOOGLE_CLIENT_ID: '',
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: '',
};

function loadEnv() {
  const envFiles = [
    join(repoRoot, '.env.nspfrnp'),
    join(repoRoot, '.env.local'),
    join(repoRoot, '.env'),
  ];
  for (const envFile of envFiles) {
    if (existsSync(envFile)) {
      const content = readFileSync(envFile, 'utf-8');
      const env = {};
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const eq = trimmed.indexOf('=');
          if (eq > 0) {
            const key = trimmed.slice(0, eq).trim();
            let val = trimmed.slice(eq + 1).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1);
            }
            env[key] = val;
          }
        }
      }
      return env;
    }
  }
  return {};
}

async function main() {
  const env = loadEnv();
  const token = env.VERCEL_TOKEN || env.VERCEL_API_TOKEN || process.env.VERCEL_TOKEN;
  if (!token) {
    console.error('❌ VERCEL_TOKEN not found. Add it to .env.nspfrnp (or set VERCEL_TOKEN in env), then run again.');
    console.error('   Get a token: https://vercel.com/account/tokens');
    process.exit(1);
  }

  const projectIdOrName = env.VERCEL_PROJECT_ID || env.VERCEL_PROJECT_NAME || process.env.VERCEL_PROJECT_ID || process.env.VERCEL_PROJECT_NAME || 'psw-vibelandia-sing4';
  const teamId = env.VERCEL_TEAM_ID || process.env.VERCEL_TEAM_ID;

  console.log('📤 Adding env var keys on Vercel project:', projectIdOrName);
  if (teamId) console.log('   Team:', teamId);

  const baseUrl = 'https://api.vercel.com/v10/projects/' + encodeURIComponent(projectIdOrName) + '/env';
  const targets = ['production', 'preview'];

  for (const [key, defaultValue] of Object.entries(KEYS_WITH_DEFAULTS)) {
    const value = (env[key] != null && env[key] !== '') ? env[key] : (process.env[key] != null && process.env[key] !== '') ? process.env[key] : defaultValue;
    const type = SECRET_KEYS.has(key) ? 'secret' : 'plain';
    const url = baseUrl + '?upsert=true' + (teamId ? '&teamId=' + encodeURIComponent(teamId) : '');
    const body = { key, value, type, target: targets };
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.text();
        console.error('   ❌', key, res.status, err.slice(0, 200));
        continue;
      }
      const hasValue = value && value.length > 0;
      console.log('   ✅', key, hasValue ? '(' + type + ', value set)' : '(key added — fill value in Vercel Dashboard)');
    } catch (e) {
      console.error('   ❌', key, e.message);
    }
  }

  console.log('\n✅ Done. Open Vercel → Project → Settings → Environment Variables to fill any empty secret values, then redeploy.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
