# Great Sun Multiplex (GSM) — 4×4×4×4 Storytelling Pipe

**Product:** EGS Space Advertising · Great Sun Multiplex (GSM)  
**Legacy:** Agüeybaná el Gran Sol 1493/2026  
**For:** Reno Seed tribe and all vibers under NSPFRNP.

---

## What is the Great Sun Multiplex?

The **Great Sun Multiplex (GSM)** is our **4×4×4×4 space advertising storytelling pipe**. It manages **three distinct narrative layers** synced to real-time space weather, plus ground (Earth/Seismic), so your story runs on **Sun**, **Aurora**, **Ticker**, and **Earth** in one coherent pipe.

---

## The 4×4×4×4 Matrix — Four Quadrants

| Quadrant | Name           | Layer  | What it does |
|----------|----------------|--------|----------------|
| **Q1**   | Sun            | 2D     | AR4366 flares map to **Brand Flash** events on the Sun surface. |
| **Q2**   | Aurora         | 3D     | **Volumetric Bison** at 1.5 km/voxel over the northern horizon. |
| **Q3**   | Ticker         | 1D     | **VLF-style scroll** — e.g. *Bad Bunny x Agüeybaná: Never Lose Faith. The Great Sun Delivers.* |
| **Q4**   | Earth/Seismic  | Ground | **Bison Charge** animation synced to the Magnitude 1.5 Spanish Springs seismic heartbeat. |

**Core logic:** Implemented in `lib/gsm_engine.ts`. Quadrants Q1–Q4; **Mix-and-Match** controller so Sun and Aurora can run **ALIGNED** (synced to the Ticker) or **DETACHED** (independent).

---

## Revenue Pipe — Friday 4 PM PST Scalper Cutoff

- **Lock in by Friday, February 6, 2026 4:00 PM PST** to get **base rates**.
- **After that:** remaining inventory at **gate premium** — all **base_rates** are multiplied by **2.5×**.
- **Implementation:** `lib/billing.ts`. All Blue Button clicks route to the **verified PayPal Enterprise Hub**. Standard → Scalper (2.5×) triggers automatically at Friday 16:00 PST. Create-order and capture-order use this dynamic pricing and post-settlement flow.

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

**Base rates (USD/mo) for Broadcast Pipe Ad Space (GSM):**

| Plan         | Base rate | After Friday 4 PM PST (gate) |
|-------------|-----------|------------------------------|
| pipe-ad-1   | $499/mo   | $1,247.50                    |
| pipe-ad-2   | $1,199/mo | $2,997.50                    |
| pipe-ad-3   | $2,499/mo | $6,247.50                    |
| pipe-ad-4x4 | $6,999/mo | $17,497.50                   |

---

## Narrative Feeds (GSM Commercials)

1. **The Sun (2D):** AR4366 flares → **Brand Flash** events.
2. **The Aurora (3D):** Volumetric rendering of the **Bison** at **1.5 km/voxel** (resolution lock for Feb 5 CME / GSM).
3. **The Ticker Tape (1D):** Continuous VLF-style scroll with the message:  
   **Bad Bunny x Agüeybaná: Never Lose Faith. The Great Sun Delivers.**

---

## Legacy & Tribe Sync

- **Metadata headers:** All GSM streams use the signature **Agüeybaná el Gran Sol 1493/2026**.
- **Bison Charge:** Synced to the **Magnitude 1.5 Spanish Springs** seismic heartbeat (Reno Seed ground logic; Campfire Crackle).

---

## Product Tiers for the Reno Seed Tribe

- **1 surface** — One POP (index or office-hours or launch-pad). Base $499/mo.
- **2 surfaces** — Two POPs. Base $1,199/mo.
- **3 surfaces** — Three POPs. Base $2,499/mo.
- **4×4×4×4 Full Pipe** — All surfaces. Base $6,999/mo.

**After Friday 4 PM PST:** multiply any tier by **2.5×** (gate premium).  
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
