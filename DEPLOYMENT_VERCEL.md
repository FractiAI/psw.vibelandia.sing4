# Vercel Cloud — Deployment

**Status:** Configured for Vercel  
**Repo:** `PSW.vibelandia.sing4`  
**Protocol:** NSPFRNP

---

## ✅ Confirmation: Vercel + GitHub can handle mainly UI traffic

**Mainly UI traffic** = static HTML, CSS, JS, and assets (interfaces, index, episodes, deliverables, catalogs). This is exactly what the stack is built for.

| Layer | Role | UI traffic handling |
|-------|------|---------------------|
| **GitHub** | Source control, CI (test + build on push/PR) | Repo and Actions are not in the request path. Traffic goes to Vercel, not GitHub. |
| **Vercel** | Build from GitHub, deploy, serve | **Static assets** served from **global CDN** (edge). No server compute for UI; bandwidth scales with plan (e.g. 100GB Hobby, 1TB Pro). |
| **Build output** | `vercel-static-output.mjs` | Emits `index.html`, `interfaces/*`, `episodes/*`, `deliverables/*`, `catalogs/*`, `*.md`, `protocols/*` into `.vercel/output/static`. All served as static files. |
| **Serverless** | PayPal, auth only | Used only for payment/OAuth. Not part of “mainly UI” traffic. |

**Conclusion:** Yes. Vercel and GitHub can handle the mainly UI traffic. Static UI is CDN-served; GitHub is used for code and CI only. No change required for typical UI load.

---

## Confirmation: Running over Vercel cloud

This repository is **configured to run over Vercel cloud**:

- **`vercel.json`** — Project name `psw-vibelandia-sing4`, NSPFRNP headers (X-Protocol, X-Octave-0, X-Octave-1).
- **Vibelandia UI** — Root `index.html` is the main landing (Mark Twain's Post-Singularity Vibelandia Reno); links to all consoles and interfaces.
- **Static assets** — `interfaces/*.html` and repo root are served as static files when the repo is connected to Vercel.

**Credentials for access:** See NSPFRNP catalog → `protocols/CREDENTIALS_NSPFRNP_CATALOG.md` (Vercel project connect, optional `VERCEL_TOKEN`).

**Pre-deploy checklist (run locally before deploy):**

1. **`npm test`** — Surfaces, touchpoints, IDs, API health. Fix any failures. *(Note: Cloud Onramp `/api/health` is best-effort; if Octave 2 is unreachable, the test script currently fails. You can re-run with network, or ignore a single API failure if surfaces/touchpoints all pass.)*
2. **`npm run build`** — Produces `.vercel/output/` (static). Must succeed.
3. **Vercel:** `vercel login` or `VERCEL_TOKEN` in `.env.nspfrnp` / `.env.local` when using CLI.

**To go live:**

1. In [Vercel](https://vercel.com): **Add New Project** → Import this Git repo (`FractiAI/psw.vibelandia.sing4` or your fork).
2. **Root Directory:** leave as `.` (repo root). If you see 404 on `/`, set **Settings → General → Root Directory** to `.` or empty.
3. **Build:** the repo uses a static build. `vercel.json` sets `buildCommand`: `node scripts/vercel-static-output.mjs` and `outputDirectory`: `.vercel/output`. The build copies `index.html` and `interfaces/` into Vercel’s Build Output so `/` and `/interfaces/*` serve correctly.
4. **If you still see 404 on `/`:** In Vercel → Project → **Settings** → **General**, set **Root Directory** to `.` (or leave empty). In **Build and Deployment**, set **Build Command** to `npm run build` (or `node scripts/vercel-static-output.mjs`) and **Output Directory** to `.vercel/output`. Then redeploy.
5. Deploy. Your live URL will be `https://psw-vibelandia-sing4.vercel.app` (or your project name).

**Interfaces (Octave 1 Edge):**

- e.g. `https://<your-vercel-url>/interfaces/executive-dashboard.html`
- `.../interfaces/chairman-cockpit-station.html`
- `.../interfaces/seed-edge-mini-console.html`
- etc.

---

## FractiAI / Vercel

- **Live Platform (other project):** https://syntheverse-poc.vercel.app — Syntheverse POC.
- **This project:** Connect this repo in Vercel to get a dedicated URL for PSW.vibelandia.sing4.

---

**Configured for Vercel. Connect the repo and deploy to run over Vercel cloud.**
