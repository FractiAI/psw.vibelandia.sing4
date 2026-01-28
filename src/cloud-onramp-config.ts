/**
 * Cloud Onramp Config
 * Connect to Syntheverse 7 Octave 2-3 Public Cloud Onramp API.
 * Env: prefer NSPFRNP source (.env.nspfrnp or deployment); fallback VERCEL_TOKEN — handle with care.
 * NSPFRNP: Natural System Protocol First Refactoring Pattern
 */

const DEFAULT_CLOUD_BASE = 'https://syntheverse-poc.vercel.app';

export interface CloudOnrampConfig {
  baseUrl: string;
  /** Only set when using Vercel API; prefer NSPFRNP env source. Handle with care. */
  vercelToken?: string;
  /** True when baseUrl is from env (NSPFRNP or CLOUD_API_BASE_URL) */
  fromEnv: boolean;
}

/**
 * Resolve cloud API base URL.
 * 1. NSPFRNP: CLOUD_API_BASE_URL or env from NSPFRNP deployment
 * 2. Fallback: default Public Cloud Onramp URL
 */
function getBaseUrl(): { url: string; fromEnv: boolean } {
  const env = typeof process !== 'undefined' && process.env && process.env.CLOUD_API_BASE_URL;
  const url = (env && env.trim()) || DEFAULT_CLOUD_BASE;
  return { url: url.replace(/\/+$/, ''), fromEnv: !!env };
}

/**
 * Get Vercel token only from env. Never hardcode. Handle with care.
 * Prefer loading from NSPFRNP env source first; use VERCEL_TOKEN only if NSPFRNP env is not available.
 */
function getVercelToken(): string | undefined {
  if (typeof process === 'undefined' || !process.env) return undefined;
  const t = process.env.VERCEL_TOKEN || process.env.VERCEL_API_TOKEN;
  return t && t.trim() ? t.trim() : undefined;
}

let cached: CloudOnrampConfig | null = null;

/**
 * Get cloud onramp config from env.
 * Prefer NSPFRNP env (e.g. .env.nspfrnp or deployment-provided CLOUD_API_BASE_URL);
 * optional VERCEL_TOKEN for Vercel API — handle with care, do not commit.
 */
export function getCloudOnrampConfig(): CloudOnrampConfig {
  if (cached) return cached;
  const { url, fromEnv } = getBaseUrl();
  const vercelToken = getVercelToken();
  cached = { baseUrl: url, vercelToken, fromEnv };
  return cached;
}

/**
 * Reset cached config (e.g. after env change in tests).
 */
export function resetCloudOnrampConfig(): void {
  cached = null;
}

/**
 * Build full API URL for a path (e.g. /api/health).
 */
export function cloudApiUrl(path: string): string {
  const { baseUrl } = getCloudOnrampConfig();
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${p}`;
}
