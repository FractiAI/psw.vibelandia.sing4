#!/usr/bin/env node
/**
 * Deploy Vibelandia UI to Vercel using CLI
 * Uses credentials from NSPFRNP catalog approach:
 * 1. NSPFRNP env source (.env.nspfrnp or deployment env)
 * 2. Fallback: .env.local
 * 
 * Protocol: NSPFRNP
 * Status: ⚡ ACTIVE
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Load env from NSPFRNP source or .env.local
function loadEnv() {
  const envFiles = [
    join(repoRoot, '.env.nspfrnp'),
    join(repoRoot, '.env.local'),
    join(repoRoot, '.env')
  ];

  for (const envFile of envFiles) {
    if (existsSync(envFile)) {
      console.log(`📄 Loading env from: ${envFile}`);
      const content = readFileSync(envFile, 'utf-8');
      const lines = content.split('\n');
      const env = {};
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...valueParts] = trimmed.split('=');
          if (key && valueParts.length > 0) {
            env[key.trim()] = valueParts.join('=').trim();
          }
        }
      }
      
      return env;
    }
  }
  
  return {};
}

// Get Vercel token from env or prompt
function getVercelToken() {
  const env = loadEnv();
  const token = env.VERCEL_TOKEN || env.VERCEL_API_TOKEN || process.env.VERCEL_TOKEN || process.env.VERCEL_API_TOKEN;
  
  if (token) {
    console.log('✅ VERCEL_TOKEN found in env');
    return token;
  }
  
  console.log('⚠️  VERCEL_TOKEN not found in env');
  console.log('📋 To get your token:');
  console.log('   1. Go to https://vercel.com');
  console.log('   2. Account → Settings → Tokens');
  console.log('   3. Create token (e.g. "NSPFRNP Vibelandia")');
  console.log('   4. Add to .env.local or .env.nspfrnp:');
  console.log('      VERCEL_TOKEN=your_token_here');
  console.log('');
  console.log('💡 Or run: vercel login (interactive login)');
  return null;
}

// Deploy using Vercel CLI
function deploy() {
  console.log('🚀 Deploying Vibelandia UI to Vercel...\n');
  
  const token = getVercelToken();
  
  try {
    // Check if vercel CLI is available
    try {
      execSync('vercel --version', { stdio: 'pipe' });
    } catch (e) {
      console.log('❌ Vercel CLI not found. Installing...');
      console.log('   Run: npm install -g vercel');
      console.log('   Or use: npx vercel');
      process.exit(1);
    }
    
    // Set token if available
    if (token) {
      process.env.VERCEL_TOKEN = token;
    }
    
    // Deploy
    console.log('📦 Deploying...');
    console.log('   Project: psw-vibelandia-sing4');
    console.log('   Root: . (repo root)');
    console.log('   Framework: None (static)\n');
    
    // Run vercel deploy
    const cmd = token 
      ? `vercel --token ${token} --yes`
      : 'vercel --yes';
    
    execSync(cmd, {
      cwd: repoRoot,
      stdio: 'inherit',
      env: { ...process.env, VERCEL_TOKEN: token || process.env.VERCEL_TOKEN }
    });
    
    console.log('\n✅ Deployment complete!');
    console.log('🌐 Your Vibelandia UI is live on Vercel');
    
  } catch (error) {
    console.error('\n❌ Deployment failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Ensure Vercel CLI is installed: npm install -g vercel');
    console.log('   2. Login: vercel login');
    console.log('   3. Or set VERCEL_TOKEN in .env.local');
    console.log('   4. Check: protocols/CREDENTIALS_NSPFRNP_CATALOG.md');
    process.exit(1);
  }
}

// Run deployment
deploy();
