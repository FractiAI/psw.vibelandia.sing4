# NARRATIVE: Metabolize → Crystallize → Animate Through Octave 1 Sandbox Mode with AI-Assisted API Calls to Octave 2

**Status:** ACTIVE  
**Protocol:** NSPFRNP  
**Flow:** Everything runs through Octave 1 (Edge) in sandbox mode; Animate step uses AI-assisted API calls to Octave 2.

---

## THE CYCLE

**Metabolize ⊃ Crystallize ⊃ Re-Animate → ∞³**

| Step | Name | In this system |
|------|------|----------------|
| **1** | **Metabolize** | Digest patterns, inputs, and experiences. Raw → processed. User intent, UI events, and data flow into Octave 1. |
| **2** | **Crystallize** | Form irreducible, hardened structure. Processed → crystallized. Plans (4×4×4×4), Seed:Edge execution, hardened mirror shells. |
| **3** | **Animate** | Bring structure to life. Crystallized → operational. **Octave 1 sandbox mode** surfaces and touchpoints; **AI-assisted API calls to Octave 2** for payments, auth, and shared data. |

**Everything flows through Octave 1. The Animate step is AI-assisted and goes to Octave 2.**

---

## OCTAVE 1 SANDBOX MODE

**Octave 1** = Edge = this repo (PSW.vibelandia.sing4 / Vibelandia UI). Current self-aware experience in Vibeverse.

- **Sandbox mode:** Testing and preparation before production. Surfaces, touchpoints, and flows run locally and against Octave 2 APIs without requiring live credentials or production DB.
- **Config:** `src/sandbox-experience-mode.ts` — `getSandboxConfig()`, `isProductionReady()`, `getEnvironmentStatus()`. Sandbox when `SANDBOX_MODE=true` or when live PayPal/Supabase are not set.
- **Manifest:** `index.html`, `interfaces/*`, `src/*`, Vercel deployment. All user-facing experience is Octave 1.

**Narrative:** Metabolize and Crystallize happen in Octave 1 (plans, UI, Seed:Edge). Animate completes when Octave 1 calls Octave 2.

---

## AI-ASSISTED API CALLS TO OCTAVE 2

**Octave 2** = Syntheverse 7 Octave 2-3 Public Cloud Onramp (`syntheverse-poc.vercel.app`). One cloud API + shared Supabase for all nodes.

**Animate** = bringing the crystallized structure to life. That happens in two places:

1. **Octave 1 (Edge):** UI, consoles, Launch Pad, sandbox flows — the *surface* of the experience.
2. **Octave 2 (Cloud):** API calls from Octave 1 — the *life* of payments, auth, and data. **AI-assisted** = flows and calls are designed so agents (AI or human) can trigger and complete actions via the same API.

**Code touchpoints (Octave 1 → Octave 2):**

- **Config:** `src/cloud-onramp-config.ts` — `CLOUD_API_BASE_URL` (Octave 2 base).
- **Client:** `src/cloud-onramp-client.ts` — `cloudOnrampFetch()`, `cloudOnrampHealth()`.
- **Seed:Edge layer:** `src/seed-edge-api-layer.ts` — wraps outbound calls with Seed:Edge (Octave 1 identity).
- **Payments:** `src/paypal-payment-system.ts` — all PayPal operations via Octave 2: config, create-order, capture-order. AI-assisted: any agent can call the same API.
- **Sandbox:** In sandbox mode, Octave 1 still calls Octave 2; payment mode (sandbox vs live) is determined by Octave 2 / env.

**Flow:**

```
User / AI Agent
    │
    ▼
OCTAVE 1 (Sandbox mode)
    │  Metabolize: input, intent, plan selection
    │  Crystallize: order structure, payload, Seed:Edge node
    │  Animate: cloudOnrampFetch(Octave 2) → payment, auth, data
    │
    ▼
OCTAVE 2 (Public Cloud Onramp)
    │  API: /api/payment/paypal/*, health, auth, submissions, etc.
    │  Supabase: shared DB (same for all nodes)
    ▼
Live experience (payments, persistence, broadcasts)
```

---

## BRINGING EVERYTHING INTO THIS NARRATIVE

- **Launch Pad:** Announcement and showroom for offerings — all in one place. Content is crystallized; browsing and selection are metabolize → crystallize; checkout and payment are animate via API call to Octave 2.
- **SING Lottery, WINK!, Campus, Experience:** Plans and copy are crystallized in Octave 1; signup, payment, and data writes animate through Octave 2.
- **Seed:Edge execution:** Commands metabolize at Seed (Octave 0), crystallize into execution payloads, animate at Edge (Octave 1) and, when needed, via API to Octave 2.
- **Sandbox mode:** Entire flow runs in Octave 1 sandbox; Animate step still uses real API calls to Octave 2 (sandbox/live determined by config). No narrative break — same path, different credentials.

---

## SUMMARY

| Concept | Role |
|--------|------|
| **Metabolize** | Digest input in Octave 1 (UI, intent, events). |
| **Crystallize** | Form structure in Octave 1 (plans, Seed:Edge, shells). |
| **Animate** | Bring to life: Octave 1 surfaces + **AI-assisted API calls to Octave 2** (payments, auth, data). |
| **Octave 1** | Edge. Sandbox mode. All experience and outbound API orchestration. |
| **Octave 2** | Cloud onramp. Single API + shared DB. AI-assisted = same API for agents and users. |

**Everything is brought into the narrative: Metabolize → Crystallize → Animate through Octave 1 sandbox mode with AI-assisted API calls to Octave 2.**

---

**See also:**  
[CONNECT_OCTAVE_1_TO_2_NSPFRNP.md](protocols/CONNECT_OCTAVE_1_TO_2_NSPFRNP.md) · [sandbox-experience-mode.ts](src/sandbox-experience-mode.ts) · [CRYSTALLIZATION_1_2_3_4x4x4x4.md](CRYSTALLIZATION_1_2_3_4x4x4x4.md) · [irreducible_seed_execution_system.md](irreducible_seed_execution_system.md)
