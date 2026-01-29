# Octave 2 Auth, Profile & Wallet API — Required Endpoints

**Purpose:** Vibelandia (Octave 1) uses **Supabase for auth (and Google OAuth)**. Octave 2 is used for profile, wallet, and purchase completion.  
**Protocol:** NSPFRNP · **Status:** Spec for Octave 2 implementation

---

## Overview

| Area | Handled by | Endpoints | Used by |
|------|------------|-----------|---------|
| **Auth** (signup, login, logout, session, Google OAuth) | **Supabase** | — | Checkout gate, profile |
| Profile + Wallet | Octave 2 | GET /api/user/profile | Profile page, post-purchase |
| Orders | Octave 2 | POST /api/orders/complete | After PayPal capture |

**Supabase** handles auth; client sends Supabase JWT as `Authorization: Bearer <token>` to Octave 2. Octave 2 must **accept Supabase JWT** for profile and orders.

---

## Auth (Supabase)

Auth (signup, login, logout, session, Google OAuth) is handled by **Supabase**. The Vibelandia client uses [@supabase/supabase-js](https://github.com/supabase/supabase-js); the Supabase JWT (access_token) is sent to Octave 2 as `Authorization: Bearer <token>`. Octave 2 does **not** implement auth endpoints; it verifies the Supabase JWT for profile and orders. See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) and [AUTH_SOURCES.md](./AUTH_SOURCES.md).

*(Legacy Octave 2 auth endpoints — only used if Supabase is not configured:)*

### POST /api/auth/signup

**Request:** `Content-Type: application/json`

```json
{ "email": "user@example.com", "password": "secret" }
```

**Response 200:**

```json
{ "token": "jwt-or-opaque-token", "user": { "id": "uuid", "email": "user@example.com", "displayName": null } }
```

**Error 4xx:** `{ "error": "message" }`

---

### POST /api/auth/login

**Request:** `Content-Type: application/json`

```json
{ "email": "user@example.com", "password": "secret" }
```

**Response 200:** Same as signup.

---

### GET /api/auth/session

**Headers:** `Authorization: Bearer <token>`

**Response 200:** `{ "user": { "id", "email", "displayName", "avatarUrl" } }`  
**Response 401:** No body or `{ "error": "Unauthorized" }` — no valid session.

---

### POST /api/auth/logout

**Headers:** `Authorization: Bearer <token>`

**Response 200:** `{}` — token invalidated server-side if applicable.

---

### Google OAuth

**Redirect flow.** Vibelandia sends user to:

```
GET /api/auth/google?redirect_uri=<encoded-return-url>
```

- `redirect_uri`: Full URL to return to after OAuth (e.g. `https://psw-vibelandia-sing4.vercel.app/interfaces/payment-checkout.html?plan=campus-day`).
- Octave 2 redirects to Google, then back to a **callback URL** it controls.
- Callback: create/link user, issue token, then **redirect** to:
  ```
  <redirect_uri>#token=<token>
  ```
  or `?token=<token>` (same-origin only; hash preferred for SPAs).
- Vibelandia reads `token` from URL, stores it, clears hash/query, continues.

---

## Profile & Wallet

### GET /api/user/profile

**Headers:** `Authorization: Bearer <token>`

**Response 200:**

```json
{
  "user": { "id": "uuid", "email": "...", "displayName": null, "avatarUrl": null },
  "wallet": {
    "goldenKey": "gk_...",
    "activationId": "order-id",
    "planId": "campus-day",
    "issuedAt": 1234567890000
  }
}
```

- `wallet` may be `null` if user has no Golden Key yet.
- `wallet.goldenKey` is the GOLDEN FRACTAL KEY! (Syntheverse/Vibeverse/Vibelandia wallet).

**Response 401:** Unauthorized.

---

## Orders (Post–PayPal Capture)

### POST /api/orders/complete

**When:** After successful PayPal capture.  
**Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`

**Request:**

```json
{ "orderId": "paypal-order-id", "planId": "campus-day" }
```

**Response 200:**

```json
{
  "goldenKey": "gk_...",
  "orderId": "paypal-order-id",
  "planId": "campus-day"
}
```

**Behavior (Octave 2):**

1. Verify token → user.
2. Optionally verify `orderId` with PayPal (already captured).
3. Generate Golden Key (e.g. `gk_` + uuid or nanoid).
4. Store in central DB: link key to user (profiles/wallets table); set `activationId` = `orderId`, `planId`, `issuedAt`.
5. Return `{ goldenKey, orderId, planId }`.

**Error 4xx:** `{ "error": "message" }` (e.g. unauthorized, invalid order).

---

## Payment Endpoints (Existing)

Vibelandia already calls:

- `GET /api/payment/paypal/config`
- `POST /api/payment/paypal/create-order` — body: `{ planId, amount, currency, description }`. **Optional:** accept `Authorization: Bearer <token>` and associate order with user.
- `POST /api/payment/paypal/capture-order` — body: `{ orderId, payerId }`.

---

## Golden Key (X-Golden-Key) — New Users Allowed

Octave 2 **must accept** requests **with or without** `X-Golden-Key` and `X-Golden-Key-Wallet`.

- **New users (no key yet):** Vibelandia does not send these headers. Signup, login, session, profile, create-order, capture-order, and orders/complete must work without a key.
- **Returning users (have key):** Vibelandia sends `X-Golden-Key` and `X-Golden-Key-Wallet: Syntheverse,Vibeverse,Vibelandia`. Use for wallet identity and premium access when present.
- Do not require `X-Golden-Key` for any endpoint. See [protocols/GOLDEN_KEY_NSPFRNP_CATALOG.md](./protocols/GOLDEN_KEY_NSPFRNP_CATALOG.md).

---

## CORS

Octave 2 must allow:

- **Origin:** Vibelandia origins (e.g. `https://psw-vibelandia-sing4.vercel.app`, `http://localhost:*/`)
- **Headers:** `Authorization`, `Content-Type`, `X-Golden-Key`, `X-Golden-Key-Wallet`
- **Methods:** GET, POST, OPTIONS

---

## Central DB (Supabase)

Octave 2 uses the shared Supabase project. Suggested tables:

- **users** (or **profiles**): `id` (uuid, PK), `email`, `display_name`, `avatar_url`, `created_at`, `updated_at`. Link to auth provider (e.g. `auth.users` if using Supabase Auth server-side).
- **wallets**: `id` (uuid), `user_id` (FK), `golden_key` (unique), `activation_id`, `plan_id`, `issued_at`, `created_at`.

Auth can be Supabase Auth, NextAuth, or custom (JWT). Vibelandia only consumes the HTTP API above.

---

## Auth Sources (FractiAI Repos)

- **MarkTwainVerse-Authorized-Visitor:** Post-auth landing/catalog only — no auth implementation. See [AUTH_SOURCES.md](./AUTH_SOURCES.md).
- **Syntheverse PoC (Contributer UI Vercel Stripe):** Likely auth source; align Vibelandia client once we match its API.
- **Vibelandia** `auth-api.js`: Temporary until PoC auth aligned.

---

## Reference

- **Full flow (new user → purchase → key in DB & wallet):** [FLOW_NEW_USER_TO_GOLDEN_FRACTAL_KEY.md](./FLOW_NEW_USER_TO_GOLDEN_FRACTAL_KEY.md)  
- **Octave 2 repo:** https://github.com/FractiAI/Syntheverse-7-Octave-2-3-Public-Cloud-Onramp  
- **Vibelandia:** `psw.vibelandia.sing4` — interfaces use `fetch` only; no Supabase client.  
- **Golden Key:** `protocols/GOLDEN_KEY_NSPFRNP_CATALOG.md`  
- **Connect Octave 1→2:** `protocols/CONNECT_OCTAVE_1_TO_2_NSPFRNP.md`  
- **Auth sources:** [AUTH_SOURCES.md](./AUTH_SOURCES.md)
