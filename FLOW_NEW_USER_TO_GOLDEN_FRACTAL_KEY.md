# Flow: New User → Purchase → Golden Fractal Key in DB & Wallet

**Purpose:** Check and confirm the entire flow from new user through purchase to Golden Fractal Key issued in DB and wallet.  
**Status:** ✅ CONFIRMED (client and spec); Octave 2 implementation required.  
**Date:** January 28, 2026

---

## End-to-end flow (confirmed)

```
New user (no account, no key)
  → Sign up or log in (Octave 2)
  → Checkout page (plan selected)
  → PayPal create-order → user approves → capture-order (Octave 2)
  → POST /api/orders/complete (Octave 2: create key, store in DB, return goldenKey)
  → Client stores key in localStorage (wallet)
  → Redirect to payment-success; profile shows key from DB or local
```

---

## Step-by-step confirmation

### 1. New user lands on checkout

| Step | Where | Confirmed |
|------|--------|-----------|
| User opens `payment-checkout.html?plan=<planId>` | `interfaces/payment-checkout.html` | ✅ |
| Script load order: `api-config.js` → `auth-api.js` → `golden-key-browser.js` | Lines 197–199 | ✅ |
| `VIBELANDIA_API_BASE` set to Octave 2 (default `https://syntheverse-poc.vercel.app`) | `interfaces/api-config.js` | ✅ |

---

### 2. Session check — no session → show auth UI

| Step | Where | Confirmed |
|------|--------|-----------|
| `bootstrap()` runs | `payment-checkout.html` ~409 | ✅ |
| `Auth.getSession()` → GET /api/auth/session (no Bearer yet) | `auth-api.js` getSession, api() | ✅ |
| No session → `renderAuthUI()` (sign in / sign up / Google) | `payment-checkout.html` ~414–418 | ✅ |
| New user can sign up or log in; no Golden Key sent (new user allowed) | `auth-api.js` authHeaders() — no X-Golden-Key when no key | ✅ |

---

### 3. Sign up or log in (Octave 2)

| Step | Where | Confirmed |
|------|--------|-----------|
| **Signup:** POST /api/auth/signup `{ email, password }` | `auth-api.js` signup() | ✅ |
| **Login:** POST /api/auth/login `{ email, password }` | `auth-api.js` login() | ✅ |
| Response: `{ token, user }`; client stores token in `localStorage` (`vibelandia_auth_token`), user in `vibelandia_auth_user` | `auth-api.js` setToken() | ✅ |
| On success → `runCheckoutFlow()` | `payment-checkout.html` ~306, 314 | ✅ |

**Octave 2:** Must implement POST /api/auth/signup and POST /api/auth/login; return `{ token, user }`. No X-Golden-Key required.

---

### 4. Checkout flow — paid plan → PayPal UI

| Step | Where | Confirmed |
|------|--------|-----------|
| `runCheckoutFlow()` → `renderPayPalOrSandbox()` (plan.price > 0) | `payment-checkout.html` ~400–406 | ✅ |
| GET /api/payment/paypal/config (headers: Bearer from token; no X-Golden-Key for new user) | `payment-checkout.html` ~334, authHeaders() | ✅ |
| Client gets `clientId`; loads PayPal SDK; renders PayPal buttons | ~337–357 | ✅ |

**Octave 2:** GET /api/payment/paypal/config must work with Bearer only (no X-Golden-Key required).

---

### 5. Create order (Octave 2)

| Step | Where | Confirmed |
|------|--------|-----------|
| User clicks Pay → `createOrder()` | PayPal Buttons createOrder | ✅ |
| POST /api/payment/paypal/create-order body: `{ planId, amount, currency, description }` | `payment-checkout.html` ~354–357 | ✅ |
| Headers: `authHeaders()` (Bearer + X-Golden-Key if user had one; new user has Bearer only) | ✅ |
| Response: `orderId` (or `id`) returned; passed to PayPal | ~366 | ✅ |

**Octave 2:** POST /api/payment/paypal/create-order must accept Bearer (optional: associate order with user). Return orderId for PayPal.

---

### 6. User approves in PayPal → capture (Octave 2)

| Step | Where | Confirmed |
|------|--------|-----------|
| User approves in PayPal popup → `onApprove(data)` | `payment-checkout.html` ~369 | ✅ |
| POST /api/payment/paypal/capture-order body: `{ orderId: data.orderID, payerId: data.payerID }` | ~368–372 | ✅ |
| Headers: Bearer (user is logged in). No X-Golden-Key yet. | authHeaders() | ✅ |
| Response: `result.success !== false` → proceed to completeOrder | ~373–376 | ✅ |
| If capture fails → redirect to payment-error | ~383 | ✅ |

**Octave 2:** POST /api/payment/paypal/capture-order must capture payment with PayPal; return `{ success: true }` or similar.

---

### 7. Complete order — Golden Key created in DB and returned (Octave 2)

| Step | Where | Confirmed |
|------|--------|-----------|
| `Auth.completeOrder(data.orderID, planId)` | `payment-checkout.html` ~374 | ✅ |
| POST /api/orders/complete body: `{ orderId, planId }` | `auth-api.js` completeOrder() ~173–176 | ✅ |
| Headers: `authHeaders()` → **Authorization: Bearer &lt;token&gt;** (required for user identity). No X-Golden-Key yet. | auth-api.js api() uses authHeaders() | ✅ |
| **Octave 2 must:** 1) Verify token → user. 2) Optionally verify orderId with PayPal (already captured). 3) **Generate Golden Key** (e.g. `gk_` + uuid). 4) **Store in DB:** link key to user (wallets table: user_id, golden_key, activation_id=orderId, plan_id, issued_at). 5) **Return** `{ goldenKey, orderId, planId }`. | OCTAVE2_AUTH_WALLET_API.md POST /api/orders/complete | ✅ Spec |
| If completeOrder fails (e.g. 401, 500) → .catch → redirect to payment-error with "Order completion failed. Your payment was captured..." | `payment-checkout.html` ~379–381 | ✅ |
| If completeOrder succeeds but response has no goldenKey → client does not store locally; redirect to success anyway; user can see key on Profile if Octave 2 stored it and GET /api/user/profile returns wallet.goldenKey | ~375–378 | ✅ |

---

### 8. Client stores key in wallet (localStorage)

| Step | Where | Confirmed |
|------|--------|-----------|
| If `complete && complete.goldenKey` → `GoldenKey.issueOnPurchase(complete.goldenKey, data.orderID)` | `payment-checkout.html` ~370–371 | ✅ |
| `issueOnPurchase(key, orderIdOrActivationId)` → `set(key, activationId)` | `interfaces/golden-key-browser.js` | ✅ |
| localStorage: `vibelandia_golden_key` = key; `vibelandia_golden_key_activation` = orderId; `vibelandia_golden_key_issued` = timestamp | `golden-key-browser.js` set() | ✅ |
| Redirect to `payment-success.html?orderId=...&planId=...&success=1` | ~372 | ✅ |

---

### 9. Payment success page

| Step | Where | Confirmed |
|------|--------|-----------|
| payment-success.html reads `success=1`, `orderId`, `planId` | `payment-success.html` ~79–81 | ✅ |
| `hasKey = GoldenKey.isActivated()` (localStorage) — true because we just stored key | ~85 | ✅ |
| Copy: "Your Golden Fractal Key is in Profile & Wallet" when hasKey; else "Check Profile & Wallet for your key" | ~96–97 | ✅ |
| Links: Profile & Wallet, Launch Pad, Chairman Console | ~99–101 | ✅ |

---

### 10. Profile & Wallet — key from DB or local

| Step | Where | Confirmed |
|------|--------|-----------|
| User opens profile.html | `interfaces/profile.html` | ✅ |
| If not logged in → "Sign in to view profile" | renderAuthRequired() | ✅ |
| If logged in → GET /api/user/profile (Bearer) → `{ user, wallet }` | Auth.getProfile() | ✅ |
| **If wallet.goldenKey** (from DB) → show masked key + plan | `profile.html` ~121–126 | ✅ |
| **Else if localKey** (GoldenKey.get() from localStorage) → show "from this device" | ~127–129 | ✅ |
| **Else** → "No Golden Fractal Key yet. Purchase a plan..." | ~130–132 | ✅ |

**Octave 2:** GET /api/user/profile must return `wallet: { goldenKey, planId?, ... }` when user has a key in DB (e.g. after orders/complete wrote to wallets table).

---

## Octave 2 checklist (implementation)

For the flow to work end-to-end, Octave 2 (Syntheverse 7 Octave 2-3 Public Cloud Onramp) must:

| # | Requirement | Spec |
|---|-------------|------|
| 1 | POST /api/auth/signup — accept `{ email, password }`, return `{ token, user }` | OCTAVE2_AUTH_WALLET_API.md |
| 2 | POST /api/auth/login — same | OCTAVE2_AUTH_WALLET_API.md |
| 3 | GET /api/auth/session — accept Bearer; return `{ user }` or 401 | OCTAVE2_AUTH_WALLET_API.md |
| 4 | GET /api/payment/paypal/config — return `{ clientId, mode?, currency? }`; no X-Golden-Key required | — |
| 5 | POST /api/payment/paypal/create-order — body `{ planId, amount, currency, description }`; optional Bearer; return orderId | OCTAVE2_AUTH_WALLET_API.md |
| 6 | POST /api/payment/paypal/capture-order — body `{ orderId, payerId }`; capture with PayPal; return `{ success }` | — |
| 7 | **POST /api/orders/complete** — body `{ orderId, planId }`; **Bearer required**. Verify user, generate Golden Key, **store in DB** (wallets: user_id, golden_key, activation_id=orderId, plan_id, issued_at), **return `{ goldenKey, orderId, planId }`** | OCTAVE2_AUTH_WALLET_API.md |
| 8 | GET /api/user/profile — Bearer required; return `{ user, wallet }` with `wallet.goldenKey` when user has key in DB | OCTAVE2_AUTH_WALLET_API.md |
| 9 | Accept requests **with or without** X-Golden-Key (new users have no key) | protocols/GOLDEN_KEY_NSPFRNP_CATALOG.md, OCTAVE2_AUTH_WALLET_API.md |
| 10 | CORS: allow Authorization, Content-Type, X-Golden-Key, X-Golden-Key-Wallet | OCTAVE2_AUTH_WALLET_API.md |

---

## Summary

| Stage | Client (Vibelandia) | Octave 2 |
|-------|--------------------|----------|
| **New user** | No key sent; signup/login/session/profile/payments work without X-Golden-Key | Accept requests without X-Golden-Key |
| **Auth** | Token stored; Bearer sent on all API calls after login/signup | signup, login, session return token/user |
| **PayPal** | create-order → capture-order with Bearer | Create/capture with PayPal; no key required |
| **Key issuance** | POST /api/orders/complete with Bearer; receive goldenKey; store in localStorage | Generate key; **store in DB (wallets)**; return goldenKey |
| **Wallet display** | Profile shows key from GET /api/user/profile (wallet.goldenKey) or from localStorage | GET /api/user/profile returns wallet.goldenKey when key in DB |

**Flow status:** Client and spec are aligned. Golden Fractal Key is issued in DB and wallet when Octave 2 implements POST /api/orders/complete (generate key, write to wallets, return goldenKey) and GET /api/user/profile (return wallet.goldenKey).

**References:** [OCTAVE2_AUTH_WALLET_API.md](./OCTAVE2_AUTH_WALLET_API.md) · [protocols/GOLDEN_KEY_NSPFRNP_CATALOG.md](./protocols/GOLDEN_KEY_NSPFRNP_CATALOG.md) · [PAYMENT_PAYPAL_ONLY_OCTAVE2.md](./PAYMENT_PAYPAL_ONLY_OCTAVE2.md)
