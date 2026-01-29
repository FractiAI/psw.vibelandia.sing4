/**
 * Octave 2 API base URL — shared by profile, payments (orders/complete).
 * Syntheverse 7 Octave 2-3 Public Cloud Onramp.
 * Override via window.VIBELANDIA_API_BASE before loading auth-api.js if needed.
 */
(function () {
  if (typeof window !== 'undefined' && !window.VIBELANDIA_API_BASE) {
    window.VIBELANDIA_API_BASE = 'https://syntheverse-poc.vercel.app';
  }
})();

/**
 * Supabase — auth (and Google OAuth). Shared Syntheverse Supabase project.
 * Set window.VIBELANDIA_SUPABASE_URL and window.VIBELANDIA_SUPABASE_ANON_KEY
 * before loading auth-api.js, or leave unset to use defaults below.
 * Anon key: get from Supabase Dashboard → Settings → API → anon public.
 */
(function () {
  if (typeof window === 'undefined') return;
  if (!window.VIBELANDIA_SUPABASE_URL) {
    window.VIBELANDIA_SUPABASE_URL = 'https://jfbgdxeumzqzigptbmvp.supabase.co';
  }
  if (!window.VIBELANDIA_SUPABASE_ANON_KEY) {
    window.VIBELANDIA_SUPABASE_ANON_KEY = '';
  }
})();

/**
 * PayPal client ID — OUR app's Client ID so funds go to our account.
 * Must be the same PayPal app as Octave 2 uses (Octave 2 needs same app's Client ID + Secret for create-order/capture-order).
 * Get from https://developer.paypal.com/dashboard/applications/sandbox (Sandbox) or Live.
 */
(function () {
  if (typeof window === 'undefined') return;
  if (!window.VIBELANDIA_PAYPAL_CLIENT_ID) {
    // Replace with your PayPal Client ID (Sandbox or Live)
    window.VIBELANDIA_PAYPAL_CLIENT_ID = 'REPLACE_WITH_YOUR_PAYPAL_CLIENT_ID';
  }
})();
