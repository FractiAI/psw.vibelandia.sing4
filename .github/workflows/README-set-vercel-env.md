# Set Vercel env — all on Vercel (no local)

Set environment variables **only in the Vercel Dashboard**. No local `.env`, Node, Docker, or GitHub secrets required.

---

## Steps

1. Go to **[vercel.com](https://vercel.com)** → your **project** (e.g. `psw-vibelandia-sing4`) → **Settings** → **Environment Variables**.

2. Click **Add New**. Enter **Key** and **Value**. For each variable, select **Production** and/or **Preview** as needed. For secrets (Supabase anon key, PayPal secret, etc.), leave **Sensitive** checked so the value is encrypted.

3. Add the variables you need:

| Variable | Where to get it |
|----------|-----------------|
| `VIBELANDIA_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → anon public |
| `NEXT_PUBLIC_SUPABASE_URL` or `VIBELANDIA_SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL (e.g. `https://jfbgdxeumzqzigptbmvp.supabase.co`) |
| `VIBELANDIA_PAYPAL_CLIENT_ID` or `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | [developer.paypal.com](https://developer.paypal.com) → Apps & Credentials → your app → Client ID |
| `PAYPAL_CLIENT_ID` | Same as above (for serverless PayPal pipe) |
| `PAYPAL_CLIENT_SECRET` | Same place → Secret (**Sensitive** in Vercel) |
| `PAYPAL_MODE` | `sandbox` or `production` |
| `VIBELANDIA_GOOGLE_CLIENT_ID` or `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Optional; Google Cloud Console → OAuth 2.0 Client ID (same as Supabase Google provider) |

4. **Redeploy** the project: **Deployments** → ⋮ on the latest deployment → **Redeploy**. New env vars apply to the next build.

Done. Everything is configured on Vercel.

**Token safety:** If you use scripts that need `VERCEL_TOKEN`, keep it in `.env.nspfrnp` (gitignored) or set it as an env var. Don’t paste tokens in chat or commit them. If a token is exposed, rotate it at [vercel.com/account/tokens](https://vercel.com/account/tokens).

**403 or 404 when running the script?**  
- **403 + `invalidToken: true`**: Token invalid or expired → new token at [vercel.com/account/tokens](https://vercel.com/account/tokens), set `VERCEL_TOKEN` in `.env.nspfrnp`.  
- **403** (no invalidToken): Project under a Team → add `VERCEL_TEAM_ID=team_xxxxxxxx` to `.env.nspfrnp` (Vercel → Team Settings → General).  
- **404**: Project not found → add `VERCEL_TEAM_ID` if under a team, or set `VERCEL_PROJECT_ID` to the project ID from the Vercel Dashboard URL (e.g. `prj_xxxx`).

---

## Other ways (optional)

- **Push from a local file:** Put credentials in `.env.nspfrnp`, then run `npm run set-vercel-env` (requires Node). See `scripts/set-vercel-env-from-credentials.mjs`.
- **GitHub Actions:** Add repo secrets (e.g. `VERCEL_TOKEN`, Supabase/PayPal vars), then run the **Set Vercel env** workflow. See `.github/workflows/set-vercel-env.yml`.
