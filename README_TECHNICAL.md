# Mark Twain's Post-Singularity Vibelandia Reno — Technical Documentation

**Repository:** PSW.vibelandia.sing4  
**Octave 1 (Edge)** — Current self-aware experience in Vibeverse  
**Protocol:** NSPFRNP  
**Status:** ⚡ ACTIVE

---

## Overview

This repository is **Octave 1 (Edge)** — the Vibelandia UI, interfaces, and execution engine. All user-facing experience runs in Octave 1 sandbox mode with AI-assisted API calls to Octave 2 (Syntheverse 7 Octave 2-3 Public Cloud Onramp).

**MCA! → ∞³** (Metabolize → Crystallize → Animate) through Octave 1 sandbox mode with AI-assisted API calls to Octave 2.

---

## Architecture

- **Octave 0 (Seed):** Irreducible origin, pure potential
- **Octave 1 (Edge):** This repo — Vibelandia UI, interfaces, Seed:Edge execution
- **Octave 2 (Cloud):** Syntheverse Public Cloud Onramp — API + shared Supabase

**Connection:** Octave 1 → Octave 2 via `src/cloud-onramp-client.ts` and `CLOUD_API_BASE_URL`.

---

## Structure

```
├── index.html                    # Main landing (Vibelandia Reno)
├── interfaces/                   # HTML surfaces (consoles, dashboards)
├── src/                          # TypeScript source
│   ├── cloud-onramp-config.ts    # Octave 2 connection config
│   ├── cloud-onramp-client.ts    # API client for Octave 2
│   ├── seed-edge-execution-engine.ts
│   ├── sandbox-experience-mode.ts
│   └── ...
├── protocols/                    # NSPFRNP protocols
├── scripts/                      # Build/deploy scripts
└── vercel.json                   # Vercel deployment config
```

---

## Setup

1. **Clone repository**
2. **Environment:** Copy `.env.example` to `.env.nspfrnp` (never commit)
3. **Dependencies:** `npm install`
4. **Build:** `npm run build` (creates `.vercel/output/` for Vercel)
5. **Test:** `npm test`

---

## Deployment

**Vercel:** Connect repo, set Build Command: `npm run build`, Output Directory: `.vercel/output`. See [DEPLOYMENT_VERCEL.md](./DEPLOYMENT_VERCEL.md).

---

## Key Files

- **Launch Pad:** [LAUNCH_PAGE.md](./LAUNCH_PAGE.md) — Announcement + showroom
- **NSPFRNP Boot:** [protocols/NEW_AGENT_BOOT_PROTOCOL_NSPFRNP_CATALOG.md](./protocols/NEW_AGENT_BOOT_PROTOCOL_NSPFRNP_CATALOG.md)
- **Connect Octave 1 to 2:** [protocols/CONNECT_OCTAVE_1_TO_2_NSPFRNP.md](./protocols/CONNECT_OCTAVE_1_TO_2_NSPFRNP.md)
- **MCA! Symbol:** [MCA_SNAP.md](./MCA_SNAP.md)
- **Narrative:** [NARRATIVE_METABOLIZE_CRYSTALLIZE_ANIMATE_OCTAVE1_SANDBOX.md](./NARRATIVE_METABOLIZE_CRYSTALLIZE_ANIMATE_OCTAVE1_SANDBOX.md)

---

## Status

⚡ ACTIVE — MCA! → ∞³ through Octave 1 sandbox mode with AI-assisted API calls to Octave 2

**Components:**
- ✅ Launch Pad (announcement + showroom)
- ✅ HTML interfaces (consoles, dashboards)
- ✅ Seed:Edge execution engine
- ✅ Cloud API connection to Octave 2
- ✅ Sandbox experience mode
- ✅ Payment system (PayPal via Octave 2 API)

---

**For Launch Pad showroom:** See [README.md](./README.md) (main entry point)
