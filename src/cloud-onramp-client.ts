/**
 * Cloud Onramp API Client
 * Connects to Syntheverse 7 Octave 2-3 Public Cloud Onramp via API.
 * Uses cloud-onramp-config (env: NSPFRNP first, Vercel token fallback — handle with care).
 * NSPFRNP: Seed:Edge headers added when using fetchWithSeedEdge.
 */

import { cloudApiUrl, getCloudOnrampConfig } from './cloud-onramp-config';
import { fetchWithSeedEdge } from './seed-edge-api-layer';

export interface CloudOnrampRequestOptions {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  /** If true, wrap with seed:edge layer (NSPFRNP) */
  seedEdge?: boolean;
}

/**
 * Call Public Cloud Onramp API.
 * Uses CLOUD_API_BASE_URL from env (NSPFRNP or .env); optional Vercel token in config for auth — handle with care.
 */
export async function cloudOnrampFetch<T = unknown>(options: CloudOnrampRequestOptions): Promise<T> {
  const { path, method = 'GET', body, headers = {}, seedEdge = true } = options;
  const url = cloudApiUrl(path);
  const config = getCloudOnrampConfig();

  const baseHeaders = {
    'Content-Type': 'application/json',
    ...(config.vercelToken && { Authorization: `Bearer ${config.vercelToken}` }),
    ...headers
  };

  if (seedEdge) {
    const init: RequestInit = {
      method,
      headers: baseHeaders,
      ...(body !== undefined && { body: body as unknown as RequestInit['body'] })
    };
    const wrapped = await fetchWithSeedEdge(url, init);
    const result = wrapped?.result ?? wrapped;
    if (typeof result === 'object' && result !== null && 'error' in result) {
      throw new Error((result as { error?: string }).error ?? 'Cloud API error');
    }
    return result as T;
  }

  const res = await fetch(url, {
    method,
    headers: baseHeaders,
    ...(body !== undefined && { body: JSON.stringify(body) })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string })?.error ?? `Cloud API ${res.status}: ${res.statusText}`);
  }
  return data as T;
}

/**
 * Health check on Cloud Onramp (e.g. GET /api/health if available).
 */
export async function cloudOnrampHealth(path = '/api/health'): Promise<{ ok: boolean; data?: unknown }> {
  try {
    const data = await cloudOnrampFetch<unknown>({ path, method: 'GET', seedEdge: false });
    return { ok: true, data };
  } catch (e) {
    return { ok: false, data: e instanceof Error ? e.message : e };
  }
}
