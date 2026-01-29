# Cloud API Connection

**Connect this repo to the Syntheverse 7 Octave 2-3 Public Cloud Onramp via API.**

- **Repository:** [FractiAI/Syntheverse-7-Octave-2-3-Public-Cloud-Onramp](https://github.com/FractiAI/Syntheverse-7-Octave-2-3-Public-Cloud-Onramp)
- **Live URL:** `https://syntheverse-poc.vercel.app`
- **Protocol:** NSPFRNP
- **Payment:** **PayPal only** via Octave 2. Other payment pipes (Stripe, Venmo, Cash App, MetaMask) are removed at the Cloud Onramp. See [PAYMENT_PAYPAL_ONLY_OCTAVE2.md](./PAYMENT_PAYPAL_ONLY_OCTAVE2.md).
- **Up-to-speed on Octave 2 repo (PayPal API):** [OCTAVE2_REPO_PAYPAL_API_REFERENCE.md](./OCTAVE2_REPO_PAYPAL_API_REFERENCE.md).

---

## Env: NSPFRNP first, Vercel fallback

1. **Preferred:** Load `.env` from your **NSPFRNP** source (e.g. `.env.nspfrnp` or deployment-provided env). Copy `CLOUD_API_BASE_URL` and, if needed, `VERCEL_TOKEN` there. Do not commit that file.
2. **Fallback:** If NSPFRNP env is not available, set `VERCEL_TOKEN` in `.env.local` for Vercel API access. **Handle with care** — never commit tokens.

---

## Setup

1. Copy the example env (no secrets):
   ```bash
   cp .env.example .env.local
   ```
2. Set in `.env.local` (or in your NSPFRNP env source):
   - `CLOUD_API_BASE_URL` — default `https://syntheverse-poc.vercel.app` (optional to set).
   - `VERCEL_TOKEN` — only if you need Vercel API/auth; **handle with care**, do not commit.
3. Ensure `.env`, `.env.local`, `.env.nspfrnp`, and `.env.vercel` are in `.gitignore` (they are).

---

## Code

- **Config:** `src/cloud-onramp-config.ts` — reads `CLOUD_API_BASE_URL` and optional `VERCEL_TOKEN` from env; prefers NSPFRNP source.
- **Client:** `src/cloud-onramp-client.ts` — `cloudOnrampFetch()`, `cloudOnrampHealth()`; uses config and optional Seed:Edge wrapper.

Usage:

```ts
import { cloudOnrampFetch, cloudOnrampHealth } from './cloud-onramp-client';

const health = await cloudOnrampHealth();
const data = await cloudOnrampFetch<MyType>({ path: '/api/some-path', method: 'GET' });
```

---

## Security

- **Never commit** `VERCEL_TOKEN` or any real secret.
- Use `.env.local` or NSPFRNP env only; keep them out of version control.
- The Vercel token is optional; use only when NSPFRNP env is not available.
