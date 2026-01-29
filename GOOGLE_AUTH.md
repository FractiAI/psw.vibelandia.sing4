# Google Auth (Vibelandia)

Google sign-in follows **Supabase "Login with Google"** and **Google Identity Services (GIS)**. Ref: [Supabase — Login with Google](https://supabase.com/docs/guides/auth/social-login/auth-google), [Google Identity Services](https://developers.google.com/identity/gsi/web/guides/overview).

## Flows

| Flow | When | How |
|------|------|-----|
| **Redirect** | Default | `Auth.getGoogleAuthUrl(returnUrl)` → redirect to Google → Supabase callback → `profile.html`; `consumeOAuthToken()` runs (PKCE `exchangeCodeForSession` or `getSession`). |
| **GIS / One Tap** | When `VIBELANDIA_GOOGLE_CLIENT_ID` is set | Load `https://accounts.google.com/gsi/client`; render Sign-in with Google button or One Tap; on callback call `Auth.signInWithGoogleIdToken(response.credential)` (no redirect). |

## Setup (Supabase)

1. **Google Cloud**: Create OAuth 2.0 Client ID (Web). Add authorized JavaScript origins (your app origin, e.g. `https://psw-vibelandia-sing4.vercel.app`) and **Authorized redirect URIs**. Use this Supabase callback URL for Google:
   - **Callback URL for Google (copy into Google Cloud Console):**  
     `https://jfbgdxeumzqzigptbmvp.supabase.co/auth/v1/callback`
2. **Supabase**: Auth → Providers → Google → enable, paste Client ID and Client Secret.
3. **Redirect URLs**: In Supabase add your app callback (e.g. `https://your-domain.com/interfaces/profile.html`) so after OAuth users are sent back to your app.

## Frontend

- **auth-api.js**: `getGoogleAuthUrl(returnUrl, queryParams?)`, `signInWithGoogleIdToken(credential, nonce?)`, `getGoogleClientId()`, `consumeOAuthToken()` (handles `?code=` PKCE).
- **profile.html**: "Sign in with Google" button (redirect); if `getGoogleClientId()` is set, GSI script is loaded and the official Sign-in with Google button is rendered; callback uses `signInWithGoogleIdToken`.

## Env / config

| Variable | Purpose |
|----------|---------|
| `VIBELANDIA_SUPABASE_URL` | Supabase project URL |
| `VIBELANDIA_SUPABASE_ANON_KEY` | Supabase anon key |
| `VIBELANDIA_GOOGLE_CLIENT_ID` or `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Optional; same as Supabase Google provider client ID — enables GSI button / One Tap on profile |

## Optional query params (redirect flow)

For Google refresh token (e.g. access to Google APIs on behalf of user):

```js
Auth.getGoogleAuthUrl(returnUrl, { access_type: 'offline', prompt: 'consent' });
```
