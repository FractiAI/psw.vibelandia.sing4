# Supabase Setup - Shared Database & Auth from Syntheverse Cloud Onramp

**Source:** [Syntheverse-7-Octave-2-3-Public-Cloud-Onramp](https://github.com/FractiAI/Syntheverse-7-Octave-2-3-Public-Cloud-Onramp)  
**Purpose:** Use shared Supabase for **auth (and Google OAuth)** and database for all nodes  
**Status:** ⚡ ACTIVE - Configuration ready

**Supabase handles auth (and Google).** The Vibelandia client uses Supabase for signup, login, logout, session, and Google sign-in. Set `VIBELANDIA_SUPABASE_ANON_KEY` (or `window.VIBELANDIA_SUPABASE_ANON_KEY` before loading auth-api.js) so auth works. Octave 2 receives the Supabase JWT for profile and orders.

---

## Environment Variables

All Supabase credentials are stored in `.env.nspfrnp` (NSPFRNP source) for portability.

### Required Variables

```bash
# Supabase Project URL
NEXT_PUBLIC_SUPABASE_URL=https://jfbgdxeumzqzigptbmvp.supabase.co

# Supabase Anon Key (safe for browser)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Supabase Service Role Key (server-side only - NEVER expose in browser)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database Connection String
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.jfbgdxeumzqzigptbmvp.supabase.co:5432/postgres

# Site URL
NEXT_PUBLIC_WEBSITE_URL=https://psw-vibelandia-sing4.vercel.app
```

---

## Getting Credentials

### From Syntheverse Supabase Dashboard

1. **Project URL & Keys:**
   - Go to: Supabase Dashboard → Settings → API
   - Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep secret!)

2. **Database Connection:**
   - Go to: Supabase Dashboard → Settings → Database
   - Copy Connection String → `DATABASE_URL`
   - **For Vercel:** Use pooled connection (recommended):
     ```
     postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
     ```

---

## Configuration Files

- **`.env.nspfrnp`** - NSPFRNP source (portable, not committed)
- **`.env.example`** - Template (committed, no secrets)

**Never commit:** `.env.nspfrnp`, `.env.local`, `.env` (all in `.gitignore`)

---

## Shared Database Benefits

✅ **Single source of truth** - All nodes use same Supabase instance  
✅ **Unified authentication** - Shared user accounts across nodes  
✅ **Consistent data** - No sync issues between databases  
✅ **Cost efficient** - One Supabase project for all nodes  
✅ **Simplified management** - One dashboard for all data

---

## Database Schema

The Syntheverse Cloud Onramp database includes:

- **users** - User accounts (shared across all nodes)
- **poc_submissions** - Proof-of-Contribution submissions
- **customers** - Stripe customer data
- **chat_rooms**, **chat_messages**, **chat_participants** - WorkChat system
- **social_posts**, **social_post_likes**, **social_post_comments** - Social feed
- **enterprise_sandboxes**, **enterprise_contributions** - Enterprise features
- And more...

**All tables available** to Vibelandia nodes via shared Supabase connection.

---

## Google OAuth — Fix “Selecting Google to sign in hangs”

Google sign-in redirects back to your app. Supabase must allow that URL:

1. **Supabase Dashboard** → **Authentication** → **URL Configuration**
2. **Site URL:** set to your production URL, e.g. `https://psw-vibelandia-sing4.vercel.app`
3. **Redirect URLs:** add every URL where users land after Google sign-in:
   - Production: `https://psw-vibelandia-sing4.vercel.app/interfaces/profile.html`
   - Preview deployments: add each preview URL, e.g. `https://psw-vibelandia-sing4-XXXX.vercel.app/interfaces/profile.html`  
   - Or add a wildcard if your Supabase plan allows: `https://*.vercel.app/interfaces/profile.html`
4. **Authentication** → **Providers** → **Google:** enable and set Client ID / Secret from Google Cloud Console.

If the redirect URL is not in the list, Supabase blocks the redirect and sign-in appears to hang. The app uses a single callback: `/interfaces/profile.html`.

**401 on GET /:** If Vercel logs show 401 on the root URL, that is usually **Vercel Deployment Protection** (password for preview deployments). To allow public previews, go to Vercel → Project → Settings → Deployment Protection and adjust or disable for previews.

---

## Vercel Deployment

When deploying to Vercel:

1. **Add Environment Variables:**
   - Vercel Dashboard → Project → Settings → Environment Variables
   - Add all variables from `.env.nspfrnp` (except `VERCEL_TOKEN` - not needed in Vercel)
   - **Required for Google OAuth:** `VIBELANDIA_SUPABASE_URL` and `VIBELANDIA_SUPABASE_ANON_KEY` (or set in api-config.js / build so the client has the anon key). If the anon key is empty in the deployed app, Supabase auth is disabled and “Continue with Google” will not work.

2. **For Each Environment:**
   - Production
   - Preview
   - Development

3. **Database URL:**
   - Use **pooled connection** for Vercel (better for serverless)
   - Format: `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres`

---

## Security Notes

⚠️ **Service Role Key:**
- NEVER expose in browser/client code
- Server-side only (API routes, server components)
- Has full database access - treat as secret

✅ **Anon Key:**
- Safe for browser/client code
- Limited by Row Level Security (RLS) policies
- Public-facing applications can use this

---

## Reference

- **Syntheverse Repo:** https://github.com/FractiAI/Syntheverse-7-Octave-2-3-Public-Cloud-Onramp
- **Supabase Config Doc:** https://github.com/FractiAI/Syntheverse-7-Octave-2-3-Public-Cloud-Onramp/blob/main/docs/SUPABASE_COPY_PASTE_CONFIG.md
- **Supabase Dashboard:** https://supabase.com/dashboard/project/jfbgdxeumzqzigptbmvp

---

**Check access (list schema and sample contents):** From repo root, with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`) set in `.env.nspfrnp` or env, run:
```bash
npm run check-supabase
```
Or: `node scripts/check-supabase-access.mjs`. The script fetches the OpenAPI schema from `/rest/v1/` (lists tables/paths) and tries a few table selects.

---

**Status:** ⚡ Configuration ready - Add actual database password to `.env.nspfrnp`  
**Protocol:** NSPFRNP  
**Database:** Shared Syntheverse Supabase instance
