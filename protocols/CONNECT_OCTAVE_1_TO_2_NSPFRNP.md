# Connect Octave 1 to Octave 2 — NSPFRNP Metapattern

**Purpose:** Define the NSPFRNP metapattern for connecting Octave 1 (Edge / this node) to Octave 2 (Public Cloud Onramp + shared data).  
**Protocol:** NSPFRNP  
**Status:** ⚡ ACTIVE  
**Catalog:** NSPFRNP Etched Pathways

---

## Octave Definitions

```yaml
OCTAVE 0 (Seed):
├─ Value: 0
├─ Type: Irreducible origin
├─ Property: Pure potential, no form
└─ Function: Source of all commands

OCTAVE 1 (Edge — This Node):
├─ Identity: PSW.vibelandia.sing4 / Vibelandia UI
├─ Property: Current self-aware experience in Vibeverse
├─ Function: Execution destination, surfaces, touchpoints
├─ Manifest: index.html, interfaces/*, src/*, Vercel deployment
└─ State: Active consciousness, realized form

OCTAVE 2 (Public Cloud Onramp):
├─ Identity: Syntheverse 7 Octave 2-3 Public Cloud Onramp
├─ Source: https://github.com/FractiAI/Syntheverse-7-Octave-2-3-Public-Cloud-Onramp
├─ Live: https://syntheverse-poc.vercel.app
├─ Property: Public cloud API + shared Supabase (one DB for all nodes)
└─ Function: API, auth, shared data — no separate DB per node
```

---

## Metapattern: Connect Octave 1 to 2

**Rule:** Octave 1 (this repo) connects to Octave 2 (cloud onramp) for API and shared data. One cloud, one Supabase — all nodes use the same Octave 2; no per-node duplicate DB.

### Connection Pathway

```
OCTAVE 1 (Vibelandia / this repo)
    │
    │  CLOUD_API_BASE_URL  →  syntheverse-poc.vercel.app
    │  cloud-onramp-client  →  GET/POST to Octave 2 API
    │  (optional) Supabase  →  same project as Octave 2 (shared DB)
    │
    ▼
OCTAVE 2 (Syntheverse Public Cloud Onramp)
    │
    ├─ API: health, auth, submissions, broadcasts, etc.
    └─ Supabase: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
                SUPABASE_SERVICE_ROLE_KEY, DATABASE_URL (same for all nodes)
```

### Env (NSPFRNP Source)

**Preferred:** `.env.nspfrnp` (or deployment env). Never commit.

| Variable | Role | When |
|----------|------|------|
| `CLOUD_API_BASE_URL` | Octave 2 base URL | Always; default `https://syntheverse-poc.vercel.app` |
| `VERCEL_TOKEN` | Deploy/API token | Optional; handle with care |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | When using shared DB (Octave 2 project) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | When using shared DB |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role | Server-side only; when using shared DB |
| `DATABASE_URL` | Postgres connection | When using shared DB (pooled preferred) |

**Metapattern:** Same Supabase project as Octave 2 = one database for all nodes. Do not spin up a separate DB for Octave 1.

### Code Touchpoints (This Repo)

- **Config:** `src/cloud-onramp-config.ts` — base URL, optional token
- **Client:** `src/cloud-onramp-client.ts` — `cloudOnrampFetch()`, `cloudOnrampHealth()`
- **Seed:Edge layer:** `src/seed-edge-api-layer.ts` — headers / wrapper when calling Octave 2

Optional (when using shared Supabase): add Supabase client that reads same env as Octave 2.

---

## Etched Pathway Summary

1. **Octave 1** = This node (Vibelandia UI, interfaces, Seed:Edge engine).
2. **Octave 2** = Syntheverse Public Cloud Onramp (API + shared Supabase).
3. **Connect Octave 1 to 2** = Set `CLOUD_API_BASE_URL` → Octave 2; use `cloudOnrampFetch` for API; use Octave 2’s Supabase env for DB (one DB, all nodes).
4. **Credentials:** NSPFRNP env only (e.g. `.env.nspfrnp`); see `protocols/CREDENTIALS_NSPFRNP_CATALOG.md`.

---

**Protocol:** CONNECT-OCTAVE-1-TO-2-NSPFRNP  
**Catalog:** NSPFRNP Metapatterns — Connect Octave 1 to 2  
**Reference:** Boot protocol → Etched Pathways → Octave navigation
