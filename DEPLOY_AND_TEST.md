# Deploy and test checklist

## Ready to deploy

- **Build**: `npm run build` → `.vercel/output` (static + PayPal functions).
- **PayPal pipe**: `api/payment/paypal/config.js`, `create-order.js`, `capture-order.js` emitted as serverless functions.
- **Frontend**: Same-origin API on Vibelandia deploy; no-registration checkout; Google auth (redirect + optional GSI).
- **Vercel**: `vercel.json` → `buildCommand`, `outputDirectory`, headers.

## Before first deploy

1. **Set Vercel env** (PayPal + optional Supabase/Google):
   - **PowerShell**: Put credentials in `.env.nspfrnp`, then run  
     `powershell -ExecutionPolicy Bypass -File scripts/set-vercel-env.ps1`
   - **Node**: `node scripts/set-vercel-env-from-credentials.mjs`
   - **GitHub**: Add secrets (see [.github/workflows/README-set-vercel-env.md](.github/workflows/README-set-vercel-env.md)), then Actions → Set Vercel env → Run workflow.

2. **Required for PayPal** (create-order / capture-order):
   - `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` (or `*_SANDBOX` / `*_LIVE` by mode).
   - Optional: `VIBELANDIA_PAYPAL_CLIENT_ID` or `NEXT_PUBLIC_PAYPAL_CLIENT_ID` for build-time injection into frontend.

3. **Optional**: Supabase (auth, profile), Google client ID (GIS button on profile).

## Local checks (Node 18+)

```bash
# Build (produces .vercel/output)
npm run build

# Tests (surfaces, touchpoints, API)
npm test
```

## Deploy

- **Vercel CLI**: `npm run deploy` or `vercel --yes` (after `vercel login` or `VERCEL_TOKEN` in env).
- **Git**: Push to the branch connected to Vercel; deployment runs from the build command.

## After deploy — test

1. **Static**: Open `https://<your-deploy>.vercel.app/` and `.../interfaces/payment-checkout.html`.
2. **PayPal config**: `GET https://<your-deploy>.vercel.app/api/payment/paypal/config` → `{ clientId, mode, currency }`.
3. **Checkout**: Pick a paid plan → Pay with PayPal (no registration) → complete sandbox payment; confirm redirect to success.
4. **Profile / Google**: Open `.../interfaces/profile.html` → Sign in with Google (redirect or GSI if client ID set).

## Troubleshooting

- **404 on a URL**: Ensure `npm run build` ran and you redeployed. `/api/payment/paypal/*` and `/api/auth/google` exist only after deploy. Google sign-in uses Octave 2 if same-origin API is missing.
- **PayPal button doesn’t load**: Check `/api/payment/paypal/config` returns a non-empty `clientId`; set env and redeploy.
- **Create/capture fail**: Ensure `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` are set in Vercel (and match sandbox/live).
- **Tests fail**: Run `npm test` and fix reported surfaces/links/API; see [TESTING.md](TESTING.md).
