# Auth Sources — FractiAI Repos & Vibelandia Client

**Purpose:** Record which FractiAI repos relate to auth vs. post-auth experiences, and where Vibelandia’s auth client fits until we align with production.

**Status:** Reference · **Protocol:** NSPFRNP

---

## Summary

| Repo / Component | Role | Auth? |
|------------------|------|-------|
| **MarkTwainVerse-Authorized-Visitor-Landing-Page** | Post-auth landing, catalog, Hero Host | ❌ No — destination *after* auth |
| **Syntheverse PoC (Contributer UI Vercel Stripe)** | Production PoC; existing content, pricing | ✅ Likely — auth lives here |
| **Vibelandia** `auth-api.js` + Octave 2 API | Checkout gate, profile, wallet | ⏳ Temporary until PoC auth aligned |

---

## 1. MarkTwainVerse-Authorized-Visitor-Landing-Page

**Repo:** https://github.com/FractiAI/MarkTwainVerse-Authorized-Visitor-Landing-Page

- **Post-auth landing only.** Visitors are routed here *after* successfully authorizing elsewhere.
- **seed.md:** *"the new Mark Twainverse landing page that all registers are routed to **after successfully authorizing**"*.
- **REPOSITORY_OVERVIEW:** "User authentication integration" is **Not Started**.
- **Use as:** Reference for post-auth experience (welcome catalog, menu, Hero Host). **Do not** use for login/signup/Google implementation.

---

## 2. Syntheverse PoC (Contributer UI Vercel Stripe)

**Repo:** https://github.com/FractiAI/Syntheverse_PoC_Contributer_UI_Vercel_Stripe

- **Production PoC** — Vercel + Stripe; "existing content, pricing, communities, experiences."
- **MarkTwainVerse** directs teams to *"Study & Ingest Existing Content"* here. Authorization flow (login, signup, etc.) happens *before* users reach the MarkTwainVerse landing.
- **Use as:** **Primary candidate for "code we already know works"** — auth and payments likely live here. Align Vibelandia’s client with this once we inspect endpoints, token format, and redirects.

---

## 3. Vibelandia Auth Client — Supabase

- **Location:** `interfaces/auth-api.js`, `interfaces/api-config.js`, `interfaces/golden-key-browser.js`
- **Auth:** **Supabase handles auth (and Google OAuth).** Client uses [@supabase/supabase-js](https://github.com/supabase/supabase-js) for signup, login, logout, session, and Google sign-in. Token (Supabase JWT) is sent as `Authorization: Bearer` to Octave 2 for profile and orders.
- **Spec:** [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for Supabase URL/anon key; [OCTAVE2_AUTH_WALLET_API.md](./OCTAVE2_AUTH_WALLET_API.md) for Octave 2 profile and `POST /api/orders/complete` (accept Supabase JWT).
- **Status:** Supabase is the auth provider. Octave 2 is used for profile and order completion only.

---

## Next Steps

1. **Supabase** — Set `window.VIBELANDIA_SUPABASE_ANON_KEY` (from Supabase Dashboard → Settings → API → anon public) in production so auth and Google OAuth work. See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md).
2. **Octave 2** — Verify Supabase JWT for `GET /api/user/profile` and `POST /api/orders/complete`.
3. **MarkTwainVerse** — Post-auth UX reference (landing, catalog) for profile and post-checkout flows.

---

**See also:** [OCTAVE2_AUTH_WALLET_API.md](./OCTAVE2_AUTH_WALLET_API.md) · [README.md](./README.md) (Technical Documentation)
