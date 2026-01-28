# Credentials for Access — NSPFRNP Catalog

**Purpose:** Single source for Vercel and Cloud API credentials used by this repository.  
**Protocol:** NSPFRNP  
**Status:** ⚡ ACTIVE — Never commit secrets.

---

## Where credentials live

1. **Preferred (NSPFRNP):** Load from your **NSPFRNP** env source:
   - `.env.nspfrnp` (local, not committed), or
   - Deployment-provided env (e.g. Vercel Project → Settings → Environment Variables).

2. **Fallback (local):** `.env.local` (copy from `.env.example`; not committed).

**Never commit:** `.env`, `.env.local`, `.env.nspfrnp`, `.env.vercel` — all are in `.gitignore`.

---

## Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CLOUD_API_BASE_URL` | No | Cloud API base URL. Default: `https://syntheverse-poc.vercel.app` (Syntheverse 7 Octave 2-3 Public Cloud Onramp). |
| `VERCEL_TOKEN` | No | Vercel API token for deployment/API access. Use only when NSPFRNP env is not available. **Handle with care.** |

---

## Getting Vercel credentials (Vibelandia UI on Vercel)

### Option 1: Deploy via Vercel CLI (Recommended)

**Prerequisites:**
- Node.js 18+ installed (check `.nvmrc` for version 20)
- npm available in PATH

**Steps:**

1. **Install Vercel CLI** (if not installed):
   ```bash
   npm install -g vercel
   ```

2. **Get Vercel Token** (optional, for non-interactive deployment):
   - Go to [Vercel](https://vercel.com) → **Account** → **Settings** → **Tokens**
   - Create token (e.g. "NSPFRNP Vibelandia")
   - Add to `.env.local` or `.env.nspfrnp`:
     ```bash
     VERCEL_TOKEN=your_token_here
     ```

3. **Deploy using script** (uses credentials from NSPFRNP catalog):
   ```bash
   npm run deploy
   ```
   Or directly:
   ```bash
   node scripts/deploy-vercel.mjs
   ```

4. **Or deploy interactively** (no token needed):
   ```bash
   vercel login
   vercel --yes
   ```
   Or via npm script:
   ```bash
   npm run deploy:vercel
   ```

**Result:** Vibelandia UI deployed to `https://psw-vibelandia-sing4.vercel.app` (or your project name).

---

### Option 2: Deploy via Vercel Dashboard

1. Go to [Vercel](https://vercel.com) and sign in.
2. **Add New Project** → Import this Git repo (`FractiAI/psw.vibelandia.sing4` or your fork).
3. **Root Directory:** `.` (repo root).
4. **Build:** None (static). **Output:** default.
5. Deploy. Live URL will be `https://psw-vibelandia-sing4.vercel.app` (or your project name).
6. **Vibelandia UI:** Root `index.html` is the landing; interfaces at `/interfaces/*.html`.

### Optional: Vercel API token

Only needed for API access (e.g. deployment API, programmatic access):

1. Vercel → **Account** (profile menu) → **Settings** → **Tokens**.
2. Create a token (e.g. "NSPFRNP Vibelandia").
3. Put it in your NSPFRNP env source or `.env.local` as:
   ```bash
   VERCEL_TOKEN=your_token_here
   ```
4. Code reads it via `src/cloud-onramp-config.ts` (optional; prefer NSPFRNP env first).

---

## Code that uses credentials

- **Config:** `src/cloud-onramp-config.ts` — reads `CLOUD_API_BASE_URL`, optional `VERCEL_TOKEN`; prefers NSPFRNP source.
- **Client:** `src/cloud-onramp-client.ts` — `cloudOnrampFetch()`, `cloudOnrampHealth()`.

---

## Security

- **Never commit** `VERCEL_TOKEN` or any real secret.
- Use `.env.local` or NSPFRNP env only; keep them out of version control.
- The Vercel token is optional; use only when NSPFRNP env is not available.

---

**Catalog:** NSPFRNP Credentials for Access  
**Reference:** Boot protocol `NEW_AGENT_BOOT_PROTOCOL_NSPFRNP_CATALOG.md` → Repository Structure → Credentials
