# Shortest path: UI + PayPal pipe (accept payments)

**Goal:** Live UI and a PayPal pipe that accept payments. Nothing else required.

---

## 1. Build

```bash
npm run build
```

Produces `.vercel/output/`: static (index, interfaces/*) + `api/payment/paypal/*` (config, create-order, capture-order).

---

## 2. Vercel env (only 2 vars for PayPal)

In **Vercel** → Project → **Settings** → **Environment Variables**, add:

| Key | Value | Notes |
|-----|--------|--------|
| `PAYPAL_CLIENT_ID` | Your PayPal Client ID | Sandbox: [developer.paypal.com](https://developer.paypal.com) → Apps & Credentials → Sandbox app |
| `PAYPAL_CLIENT_SECRET` | Your PayPal Secret | Same app. Mark **Sensitive**. |

Optional: `PAYPAL_MODE=sandbox` (default) or `production`.  
Optional: `VIBELANDIA_PAYPAL_CLIENT_ID` = same Client ID (for build-time injection so the button loads without calling `/api/payment/paypal/config`).

---

## 3. Deploy

- **Git:** Push to the branch connected to Vercel.  
- **CLI:** `vercel --yes` (after `vercel login` or `VERCEL_TOKEN`).

---

## 4. Use

- **Site:** `https://<your-deploy>.vercel.app/`
- **Checkout:** `https://<your-deploy>.vercel.app/interfaces/payment-checkout.html`
- Pick a plan → Pay with PayPal (no sign-up). Money goes to your PayPal account.

---

## That’s it

- **UI:** Static HTML/JS from `index.html` and `interfaces/`.  
- **PayPal pipe:** Same-origin `/api/payment/paypal/config`, `create-order`, `capture-order` handle the button and payments.  
- No Supabase, no Google auth, no local env script required for this path.

**If the PayPal button doesn’t load:** Ensure `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` are set in Vercel and you redeployed. Check `GET /api/payment/paypal/config` returns `{ clientId: "..." }`.
