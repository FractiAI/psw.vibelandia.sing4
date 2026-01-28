# Deploy Vibelandia UI to Vercel via CLI

**Quick start guide for deploying using Vercel CLI with credentials from NSPFRNP catalog.**

---

## Prerequisites

1. **Node.js 20+** (see `.nvmrc`)
   - Download: https://nodejs.org/ (LTS)
   - Or use nvm-windows: https://github.com/coreybutler/nvm-windows

2. **Vercel CLI** (will be installed automatically if missing)

3. **Vercel Token** (optional, for non-interactive deployment)
   - Get from: https://vercel.com → Account → Settings → Tokens
   - Add to `.env.local` or `.env.nspfrnp`:
     ```bash
     VERCEL_TOKEN=your_token_here
     ```

---

## Quick Deploy

### Option 1: PowerShell Script (Windows)

```powershell
.\scripts\deploy-vercel.ps1
```

This script:
- ✅ Checks for Node.js
- ✅ Installs Vercel CLI if needed
- ✅ Loads credentials from NSPFRNP catalog (`.env.nspfrnp` or `.env.local`)
- ✅ Deploys to Vercel

### Option 2: Node.js Script

```bash
npm run deploy
```

Or directly:
```bash
node scripts/deploy-vercel.mjs
```

### Option 3: Direct Vercel CLI

**Interactive (no token needed):**
```bash
vercel login
vercel --yes
```

**With token:**
```bash
vercel --token $VERCEL_TOKEN --yes
```

Or via npm:
```bash
npm run deploy:vercel
```

---

## Credentials Location (NSPFRNP Catalog)

Credentials are loaded in this order:

1. **`.env.nspfrnp`** (NSPFRNP source - preferred)
2. **`.env.local`** (local fallback)
3. **Environment variables** (`VERCEL_TOKEN`)

**Never commit:** `.env`, `.env.local`, `.env.nspfrnp`, `.env.vercel`

See: `protocols/CREDENTIALS_NSPFRNP_CATALOG.md`

---

## What Gets Deployed

- **Root landing:** `index.html` (Vibelandia UI)
- **Interfaces:** `interfaces/*.html` (all consoles and dashboards)
- **Config:** `vercel.json` (project name, NSPFRNP headers)

**Live URL:** `https://psw-vibelandia-sing4.vercel.app` (or your project name)

---

## Troubleshooting

**Node.js not found:**
- Install Node.js 20+ from https://nodejs.org/
- Or use nvm-windows for version management
- Restart terminal after installation

**Vercel CLI not found:**
- Run: `npm install -g vercel`
- Or use: `npx vercel`

**Deployment fails:**
- Check: `vercel login` (interactive login)
- Or set `VERCEL_TOKEN` in `.env.local`
- See: `protocols/CREDENTIALS_NSPFRNP_CATALOG.md`

---

**Protocol:** NSPFRNP  
**Status:** ⚡ ACTIVE  
**Reference:** `protocols/CREDENTIALS_NSPFRNP_CATALOG.md`
