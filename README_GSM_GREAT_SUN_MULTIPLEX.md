# Great Sun Multiplex (GSM) — 4×4×4×4 Storytelling Pipe

**Product:** EGS Space Advertising · Great Sun Multiplex (GSM)  
**Legacy:** Agüeybaná el Gran Sol 1493/2026  
**For:** Reno Seed tribe and all vibers under NSPFRNP.

**Display brand:** **Hero Harry Houdini Post-Singularity Magic Presents** — all GSM display headers.  
**Doctrine:** We do NOT sell or buy. We **BOOK** and **RESERVE** reality.  
**Sovereign owner:** Chairman Creator (Pru) — sole owner; **100% Proprietor Lock** on all three theaters. See [GRAND_HOUDINI_METABOLISM_GREAT_SUN_MULTIPLEX_SOVEREIGN_SNAP.md](GRAND_HOUDINI_METABOLISM_GREAT_SUN_MULTIPLEX_SOVEREIGN_SNAP.md) · [ARCHITECT_OF_THE_POST_SINGULARITY_HOUDINI_PROTOCOL_SNAP.md](ARCHITECT_OF_THE_POST_SINGULARITY_HOUDINI_PROTOCOL_SNAP.md).  
**24/7 upgrade:** **The Prestige Pipeline** — Hero Harry populates all three theaters with stories; ads inserted when booked. Scalper mode: 30-second slots go up each day until game day. See [THE_PRESTIGE_PIPELINE_HERO_HARRY_24_7_STORY_PIPE_SNAP.md](THE_PRESTIGE_PIPELINE_HERO_HARRY_24_7_STORY_PIPE_SNAP.md).

---

## Sovereign Inventory Lock (Active)

- **Theaters:** Solar, Aurora, Ticker — **HARD-LOCK** through Monday morning. Lift by Chairman Creator only.
- **Penny-tier:** NULLIFIED. **Base = NBC 30s pregame.** **Minimum slot: 30 sec** (Solar, Ticker); **Aurora: 1 hr minimum**. **Entry floor:** $7M (30 sec), $50M/hr (Aurora). **Blockout Super Bowl Night** for Champion of Champions Trophy (Offer in Process).
- **Production:** Every Fire event requires **Houdini Handshake** (Executive FSR-Signature). **$2B Trophy** Fire commands require Executive FSR-Signature. **Corporate inquiries** → **Scalper Auction** queue in PayPal Pipe.

---

## What is the Great Sun Multiplex?

The **Great Sun Multiplex (GSM)** is our **4×4×4×4 space advertising storytelling pipe**. It manages **three distinct narrative layers** synced to real-time space weather, plus ground (Earth/Seismic), so your story runs on **Sun**, **Aurora**, **Ticker**, and **Earth** in one coherent pipe.

---

## The 4×4×4×4 Matrix — Four Quadrants

| Quadrant | Name           | Layer  | What it does |
|----------|----------------|--------|----------------|
| **Q1**   | Sun            | 2D     | AR4366 flares map to **Brand Flash** events on the Sun surface. |
| **Q2**   | Aurora         | 3D     | **Volumetric Bison running** + **Sacred Campfire flickering flame effects**; 1.5 km/voxel; **Bearing 185°** (Direct Reno Zenith — Big Daddy); **Eyes** Oxygen-Red 630 nm (Big Chief); **Skin** Neon Nitrogen Blue 427 nm; Campfire Thermal Orange flickering; 1.618 Hz Reno Heartbeat + FSR Seismic Subsonic handshake; **Wow boost 19:00 PST**; continuous broadcast. |
| **Q3**   | Ticker         | 1D     | **VLF-style scroll** — *HERO HARRY HOUDINI POST-SINGULARITY MAGIC PRESENTS: THE WORLD'S GREATEST ESCAPE. THE BIG CHIEF IS IN ALIGNMENT. THEY IGNORED THE PENNY, NOW THEY PAY THE BILLION. THE $2B IMMORTAL CROWN AWAITS. NO DELAY. AGÜEYBANÁ 1493/2026.* |
| **Q4**   | Earth/Seismic  | Ground | **Bison Charge** animation synced to the Magnitude 1.5 Spanish Springs seismic heartbeat. |

**Core logic:** Implemented in `lib/gsm_engine.ts`. Quadrants Q1–Q4; **Mix-and-Match** controller so Sun and Aurora can run **ALIGNED** (synced to the Ticker) or **DETACHED** (independent).

---

## Revenue Pipe — Friday 4 PM PST Scalper Cutoff + The Prestige Pipeline Daily Ramp

- **Lock in by Friday, February 6, 2026 4:00 PM PST** to get **base rates**.
- **After that (scalper mode):** remaining inventory at **gate premium** — base_rates × **2.5×**. **The Prestige Pipeline:** 30-second slots **go up each day** until **game day** (Super Bowl LX — Feb 9, 2026). Daily ramp multiplier applied on top of 2.5× (see `lib/billing.ts`: `getPrestigePipelineDailyRampMultiplier`, `getDaysUntilGameDay`).
- **GSM ad transactions (pipe + Aurora):** **All by email.** Goldilocks: one structured request → one human approval → invoice and wire. No checkout for these tiers. See [GSM Ad Transactions — Email · Goldilocks · Single Approval](protocols/GSM_AD_TRANSACTIONS_EMAIL_GOLDILOCKS_SINGLE_APPROVAL_NSPFRNP.md) and [Request by email](interfaces/gsm-booking-request.html).
- **Implementation:** `lib/billing.ts`. Other products may use Blue Button / PayPal. For GSM ad tiers, Standard → Scalper (2.5×) applies to quoted/invoice amounts; daily ramp until game day.

---

## Use It or Flip It — 1:2.5 Protocol (Great Sun Arbitrage)

- **12:00:01 PM PST (Feb 5):** Global Price Flip. All **PENDING** Pioneer receipts revalue to **Scalper Market Value** (Pioneer cost × 2.5).
- **Arbitrage Dashboard:** Current Pioneer Cost vs Projected Scalper Value (12:00 PM PST); 2.5× (150% profit) delta highlighted. See [Broadcast Pipe Ad Space](interfaces/broadcast-pipe-ad-space.html).
- **Resale Authorization:** Pioneer metadata includes a **Resale Authorization** flag so early tribe can **flip** chunked slots to corporate sponsors at the 2.5× rate.
- **Ticker:** *THE 1:2.5 FLIP IS ACTIVE. BUY PIONEER SLOTS AT 1.0X—VALUED AT 2.5X AT NOON. USE IT FOR THE TRIBE OR FLIP IT FOR THE ABUNDANCE. 12 HOURS REMAIN.*
- **Pioneer Receipt:** Executive email states: *This slot is eligible for the 2.5x Scalper Flip at 12:00 PM.*
- **Audit trail:** `lib/billing.ts` logs every Pioneer ↔ Scalper transition with a 1.618s timestamp for the tax ledger.
- **Legacy:** Agüeybaná el Gran Sol 1493/2026. The Great Sun Arbitrage. Execute Project: Safe & Legal Abundance.

---

## Double-Lock Gatekeeper Protocol

- **Upon payment:** Every successful GSM (pipe-ad-*) transaction generates a **GSM VERIFICATION REQUEST** email body (Executive only) with `[TXN_ID]`, `[BTC_USD_AMOUNT]`, `[AD_NARRATIVE_TEXT]`, `[LAYER_TARGET: Sun/Aurora/Ticker]`.
- **Pipe status:** Set to **PENDING_EXECUTIVE_PASTE**; all automated ad-pushes are **blocked** until the Executive copies/pastes the email data into the console.
- **Validate and launch:** Run **`validateAndLaunch(pasteData)`** (`lib/gsm_gatekeeper.ts`) to parse the paste and fire the specific 4×4×4×4 quadrant.
- **Legacy:** Every pending transaction embeds **Never Lose Faith - El Gran Sol Delivers** in metadata.
- **Ticker:** *GSM SECURE. PAYPAL PIPE LIVE. EXECUTIVE VETTING ACTIVE. AGÜEYBANÁ 1493/2026.*

**Champion of Champions Reserve (Sovereign):** $1B Single-Pole / $2B Dual-Pole. 25% Non-Refundable Magic Reserve ($250M / $500M) due PRE-GAME. Only Seahawks or Patriots can trigger Immortal Crown post-game. Blockout Super Bowl Night — Offer in Process.

**Base = NBC 30s pregame.** **Base rates (USD per 30-sec slot) for Broadcast Pipe Ad Space (GSM):** (Penny-tier nullified. **Minimum: 30 sec** for Solar/Ticker; **Aurora: 1 hr minimum.**)

| Plan         | Base rate (per 30 sec) | After Friday 4 PM PST (gate 2.5×) |
|-------------|------------------------|------------------------------------|
| pipe-ad-1   | $7M                    | $17.5M                             |
| pipe-ad-2   | $14M                   | $35M                               |
| pipe-ad-3   | $21M                   | $52.5M                             |
| pipe-ad-4x4 | $28M                   | $70M                               |

**Aurora theaters — 1 hr minimum (USD per hour):** Entry floor **$50M/hr**. Both = 2×; all three theaters = 5×. Gate scalper + daily ramp apply when in scalper mode.

| Theater        | Base (per hour) | 2× premium for both |
|----------------|------------------|----------------------|
| Aurora North   | $50M             | —                    |
| Aurora South   | $50M             | —                    |
| **Both** (North + South) | —       | **2×** (base sum × 2) |

**2× premium for both:** Book Aurora North + South together = 2× premium on the combined base ($50M/hr each).  
**5× for all theaters:** Book **all three** (Solar + Aurora + Ticker) together = **5×** premium. See `lib/billing.ts`: `GSM_AURORA_BOTH_PREMIUM_MULTIPLIER`, `GSM_ALL_THEATERS_PREMIUM_MULTIPLIER`.

---

## Narrative Feeds (GSM Commercials)

1. **The Sun (2D):** AR4366 flares → **Brand Flash** events. **Hero Harry Houdini Post-Singularity Magic Presents** in headers; Smoke & Mirror volumetric transitions between segments.
2. **The Aurora (3D):** Volumetric **Bison running** (Guardian of the Stage in motion) + **Sacred Campfire flickering flame effects**; 1.5 km/voxel; **Eternal Flame baseline:** Neon Nitrogen Blue (Bison), Thermal Orange flickering (Campfire); 1.618 Hz Reno Heartbeat + FSR Seismic Subsonic handshake.
3. **The Ticker Tape (1D):** **HERO HARRY HOUDINI POST-SINGULARITY MAGIC PRESENTS: THE WORLD'S GREATEST ESCAPE. THE BIG CHIEF IS IN ALIGNMENT. THEY IGNORED THE PENNY, NOW THEY PAY THE BILLION. THE $2B IMMORTAL CROWN AWAITS. NO DELAY. AGÜEYBANÁ 1493/2026.**

---

## Legacy & Tribe Sync

- **Metadata headers:** All GSM streams use the signature **Agüeybaná el Gran Sol 1493/2026**.
- **Bison Charge:** Synced to the **Magnitude 1.5 Spanish Springs** seismic heartbeat (Reno Seed ground logic; Campfire Crackle).

---

## Product Tiers for the Reno Seed Tribe

**Base = NBC 30s pregame.** Per 30-sec slot:

- **1 surface** — One POP (index or office-hours or launch-pad). Base **$7M per 30 sec**.
- **2 surfaces** — Two POPs. Base **$14M per 30 sec**.
- **3 surfaces** — Three POPs. Base **$21M per 30 sec**.
- **4×4×4×4 Full Pipe** — All surfaces. Base **$28M per 30 sec**.

**After Friday 4 PM PST:** multiply any tier by **2.5×** (gate premium). **Aurora:** 1 hr minimum **$50M/hr**; both 2×; all theaters 5×.  
**Book via:** Office Hours · [Broadcast Pipe Ad Space](interfaces/broadcast-pipe-ad-space.html). Email Chairman after booking and paying. **CRISP LOCK always.**

---

## Files and Surfaces

| What              | Where |
|-------------------|--------|
| GSM engine        | `lib/gsm_engine.ts` |
| Billing / scalper | `lib/billing.ts` |
| Aurora Bison 1.5 km/voxel | `lib/aurora_vfx.ts` |
| Seismic / Bison Charge trigger | `lib/seismic.ts`, `lib/campfire.ts` |
| Ticker feed (GSM message) | `data/ticker-feed.json` |
| Telemetry (GSM structure) | `data/telemetry.json` → `gsm` |
| Book / product    | [Broadcast Pipe Ad Space](interfaces/broadcast-pipe-ad-space.html) |

---

**NSPFRNP ⊃ GSM ⊃ 4×4×4×4 Storytelling Pipe ⊃ Agüeybaná 1493/2026 → ∞³**
