# Supabase Setup - Shared Database from Syntheverse Cloud Onramp

**Source:** [Syntheverse-7-Octave-2-3-Public-Cloud-Onramp](https://github.com/FractiAI/Syntheverse-7-Octave-2-3-Public-Cloud-Onramp)  
**Purpose:** Use shared Supabase database instead of separate database for all nodes  
**Status:** ⚡ ACTIVE - Configuration ready

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

## Vercel Deployment

When deploying to Vercel:

1. **Add Environment Variables:**
   - Vercel Dashboard → Project → Settings → Environment Variables
   - Add all variables from `.env.nspfrnp` (except `VERCEL_TOKEN` - not needed in Vercel)

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

**Status:** ⚡ Configuration ready - Add actual database password to `.env.nspfrnp`  
**Protocol:** NSPFRNP  
**Database:** Shared Syntheverse Supabase instance
