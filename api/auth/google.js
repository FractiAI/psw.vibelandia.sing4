/**
 * GET /api/auth/google
 * Redirects to Octave 2 (Syntheverse Cloud Onramp) for Google OAuth.
 * Fixes 404 when same-origin deploy has no Supabase: frontend points here, we forward to Octave 2.
 */

const OCTAVE2_BASE = 'https://syntheverse-poc.vercel.app';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).send('Method not allowed');
  }
  const query = (req.query && typeof req.query === 'object') ? req.query : {};
  const qs = Object.keys(query).length ? '?' + new URLSearchParams(query).toString() : '';
  const location = OCTAVE2_BASE + '/api/auth/google' + qs;
  res.setHeader('Location', location);
  return res.status(302).redirect(location);
}
