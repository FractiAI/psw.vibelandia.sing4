/**
 * Golden Key System — GOLDEN FRACTAL KEY! Brand
 * Sent on purchase and activation. The key is the Syntheverse, Vibeverse, and Vibelandia wallet
 * and is used on all API calls. NSPFRNP catalog: protocols/GOLDEN_KEY_NSPFRNP_CATALOG.md
 *
 * Protocol: NSPFRNP
 * Mode: Single wallet identity across Syntheverse, Vibeverse, Vibelandia
 * Brand: GOLDEN FRACTAL KEY! — Unlocks Everything
 */

export const GOLDEN_KEY_STORAGE_KEY = 'vibelandia_golden_key';
export const GOLDEN_KEY_HEADER = 'X-Golden-Key';
export const GOLDEN_KEY_WALLET_HEADER = 'X-Golden-Key-Wallet'; // Syntheverse | Vibeverse | Vibelandia

export interface GoldenKeyWalletIdentity {
  /** Same key used as wallet across all three realms */
  key: string;
  /** Realm scope: syntheverse | vibeverse | vibelandia */
  syntheverse: boolean;
  vibeverse: boolean;
  vibelandia: boolean;
  /** Issued at (ms). Set on purchase/activation */
  issuedAt?: number;
  /** Optional: order or activation id that triggered issue */
  activationId?: string;
}

/**
 * Get Golden Key from env (Node/server) or from storage (browser).
 * Prefer NSPFRNP env: GOLDEN_KEY or GOLDEN_KEY_WALLET.
 */
export function getGoldenKey(): string | undefined {
  if (typeof process !== 'undefined' && process.env) {
    const envKey = process.env.GOLDEN_KEY || process.env.GOLDEN_KEY_WALLET;
    if (envKey && envKey.trim()) return envKey.trim();
  }
  if (typeof localStorage !== 'undefined') {
    try {
      const stored = localStorage.getItem(GOLDEN_KEY_STORAGE_KEY);
      if (stored) return stored;
    } catch (_) {}
  }
  return undefined;
}

/**
 * Set Golden Key (browser: store in localStorage; Node: no-op, use env).
 * Call after purchase/activation when key is issued.
 */
export function setGoldenKey(key: string, activationId?: string): void {
  if (!key || !key.trim()) return;
  const trimmed = key.trim();
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(GOLDEN_KEY_STORAGE_KEY, trimmed);
      if (activationId) {
        localStorage.setItem(GOLDEN_KEY_STORAGE_KEY + '_activation', activationId);
        localStorage.setItem(GOLDEN_KEY_STORAGE_KEY + '_issued', String(Date.now()));
      }
    } catch (_) {}
  }
}

/**
 * Issue Golden Key on purchase/activation. Called by client after successful purchase;
 * server/Octave 2 returns the key in response. Client then calls setGoldenKey(key, orderId).
 * This function documents the flow and optionally stores when called with key + id.
 */
export function issueOnPurchase(key: string, orderIdOrActivationId: string): GoldenKeyWalletIdentity {
  const identity: GoldenKeyWalletIdentity = {
    key: key.trim(),
    syntheverse: true,
    vibeverse: true,
    vibelandia: true,
    issuedAt: Date.now(),
    activationId: orderIdOrActivationId
  };
  setGoldenKey(key, orderIdOrActivationId);
  return identity;
}

/**
 * True if a Golden Key is present (env or storage).
 */
export function isActivated(): boolean {
  return !!getGoldenKey();
}

/**
 * Get headers to attach to API calls. Used by cloud-onramp and seed-edge layer.
 * Includes X-Golden-Key and optional X-Golden-Key-Wallet (realm scope).
 */
export function getGoldenKeyHeaders(): Record<string, string> {
  const key = getGoldenKey();
  if (!key) return {};
  return {
    [GOLDEN_KEY_HEADER]: key,
    [GOLDEN_KEY_WALLET_HEADER]: 'Syntheverse,Vibeverse,Vibelandia'
  };
}

/**
 * Clear stored Golden Key (browser only). Node: clear env; not done here.
 */
export function clearGoldenKey(): void {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.removeItem(GOLDEN_KEY_STORAGE_KEY);
      localStorage.removeItem(GOLDEN_KEY_STORAGE_KEY + '_activation');
      localStorage.removeItem(GOLDEN_KEY_STORAGE_KEY + '_issued');
    } catch (_) {}
  }
}
