# Octave 2 Repo Reference — PayPal API Calls

**Purpose:** Up-to-speed reference for the repository we use for PayPal payment API calls.  
**Repo:** [FractiAI/Syntheverse-7-Octave-2-3-Public-Cloud-Onramp](https://github.com/FractiAI/Syntheverse-7-Octave-2-3-Public-Cloud-Onramp)  
**Live:** https://syntheverse-poc.vercel.app  
**Protocol:** NSPFRNP · Connect Octave 1 to 2

---

## What Octave 2 Is (per repo README)

The repo is **only** for:

1. **Cloud connectivity** — Gateway entry point. Deploy to Vercel (or any Node host). Other systems call in here.
2. **DB access** — Pass-through pipe for user UI and API. Repo does not own DB/schema; it pipes through so UI/API can read/write the backing database.
3. **PayPal** — **Solitary pipe to PayPal only** (@PrudencioMendez924). All payments go through this pipe.

Everything else (evaluation, operator UI, PoC flows, etc.) is built elsewhere and connects into here.

---

## Public API (from Octave 2 README)

| Endpoint | Purpose |
|----------|---------|
| GET /api/health | Cloud connectivity check — gateway is up |
| GET /api/db/status | DB pass-through pipe status (requires DATABASE_URL) |
| GET /api/payments/methods | Returns PayPal only (solitary pipe) |
| POST /api/payments/process | Body: `{ amount, currency?, method? }` → returns `payment.redirectUrl` (PayPal.Me) |

**Env (Octave 2):** `DATABASE_URL` (required for DB pipe), optional `NEXT_PUBLIC_SITE_URL`. No env required for PayPal pipe (PayPal.Me link is fixed).

---

## What Vibelandia (Octave 1) Calls for PayPal

This repo (PSW.vibelandia.sing4) uses the **PayPal SDK flow** via Octave 2. All calls go through `src/cloud-onramp-client.ts` → `CLOUD_API_BASE_URL` (default `https://syntheverse-poc.vercel.app`).

| Endpoint | Used by | Purpose |
|----------|---------|---------|
| GET /api/payment/paypal/config | `getPayPalConfigFromApi()` | Client ID, mode (sandbox/production), currency |
| POST /api/payment/paypal/create-order | `createPayPalOrder(planId)` | Body: `{ planId, amount, currency, description }` → orderId, approvalUrl |
| POST /api/payment/paypal/capture-order | `capturePayPalOrder(orderId, payerId)` | Body: `{ orderId, payerId }` → success, transactionId |

**Code:** `src/paypal-payment-system.ts` — all PayPal operations are API calls to Octave 2; no PayPal SDK secret in Vibelandia.

Octave 2 must implement these endpoints for checkout to work. See [OCTAVE2_AUTH_WALLET_API.md](./OCTAVE2_AUTH_WALLET_API.md) for full spec (auth, profile, wallet, orders complete).

---

## Connection from This Repo

- **Config:** `src/cloud-onramp-config.ts` — `CLOUD_API_BASE_URL` (default `https://syntheverse-poc.vercel.app`).
- **Client:** `src/cloud-onramp-client.ts` — `cloudOnrampFetch()`, `cloudOnrampHealth()`; adds Golden Key headers when present.
- **Payments:** `src/paypal-payment-system.ts` — uses `cloudOnrampFetch` for all PayPal API calls.

**Env (Octave 1):** `CLOUD_API_BASE_URL` optional (default above). See [protocols/CREDENTIALS_NSPFRNP_CATALOG.md](./protocols/CREDENTIALS_NSPFRNP_CATALOG.md).

---

## Run / Deploy (Octave 2 repo)

```bash
npm install
npm run build
npm start
```

Deploy to Vercel; set `DATABASE_URL` in project settings if using the DB pass-through pipe.

---

## References

- **Octave 2 repo:** https://github.com/FractiAI/Syntheverse-7-Octave-2-3-Public-Cloud-Onramp  
- **Payment policy:** [PAYMENT_PAYPAL_ONLY_OCTAVE2.md](./PAYMENT_PAYPAL_ONLY_OCTAVE2.md)  
- **Connection:** [CLOUD_API_CONNECTION.md](./CLOUD_API_CONNECTION.md)  
- **Auth/Wallet API spec:** [OCTAVE2_AUTH_WALLET_API.md](./OCTAVE2_AUTH_WALLET_API.md)  
- **Connect Octave 1→2:** [protocols/CONNECT_OCTAVE_1_TO_2_NSPFRNP.md](./protocols/CONNECT_OCTAVE_1_TO_2_NSPFRNP.md)

**NSPFRNP ⊃ Octave 1 → Octave 2 → PayPal only.**
