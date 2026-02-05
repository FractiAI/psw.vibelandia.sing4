/**
 * Revenue Pipe — PayPal Enterprise Integration
 * Great Sun Multiplex (GSM) · Double-Lock Gatekeeper
 *
 * All Blue Button clicks route to the verified PayPal Enterprise Hub.
 * Standard → Scalper price multiplier (2.5x) triggers automatically at Friday 16:00 PST.
 */

/** Verified PayPal Enterprise Hub — Blue Button routes here (env: PAYPAL_CLIENT_ID / PAYPAL_CLIENT_ID_LIVE). */
export const PAYPAL_ENTERPRISE_HUB_SOURCE = 'PAYPAL_ENTERPRISE_HUB';
export const PAYPAL_ENTERPRISE_HUB_NOTE =
  'All Blue Button clicks route to the verified PayPal Enterprise Hub (create-order → capture-order).';

/** Official lock-in cutoff: Friday Feb 6, 2026 4:00 PM PST = 2026-02-07 00:00:00 UTC. Scalper 2.5x triggers automatically after this. */
export const FRIDAY_4PM_PST_CUTOFF_UTC = '2026-02-07T00:00:00.000Z';

/** 1:2.5 Flip — Global Price Flip at 12:00:01 PM PST (Feb 5, 2026). Pioneer slots revalued to Scalper Market Value. */
export const NOON_FLIP_PST_UTC = '2026-02-05T20:00:01.000Z';

/** Gate premium multiplier after cutoff (Standard → Scalper). Same multiplier for 1:2.5 Use It or Flip It. */
export const GATE_SCALP_MULTIPLIER = 2.5;

/** Check if the given time is after the Friday 4 PM PST scalper cutoff. */
export function isAfterFriday4pmPSTCutoff(date: Date = new Date()): boolean {
  const cutoff = new Date(FRIDAY_4PM_PST_CUTOFF_UTC).getTime();
  return date.getTime() > cutoff;
}

/** Check if the given time is at or after the 12:00:01 PM PST Global Price Flip (Pioneer → Scalper value). */
export function isAfterNoonFlipPST(date: Date = new Date()): boolean {
  const flip = new Date(NOON_FLIP_PST_UTC).getTime();
  return date.getTime() >= flip;
}

/** Resale Authorization: allows early tribe (Pioneer) to flip chunked slots to corporate sponsors at 2.5x. */
export const PIONEER_RESALE_AUTHORIZATION_FLAG = 'resale_authorization';

/** Pioneer metadata for GSM: includes Resale Authorization for 2.5x Flip. */
export interface PioneerMetadata {
  resale_authorization: boolean;
  slot_eligible_2_5x_scalper_flip_at_noon_pst: string;
}

/** Tax ledger: 1.618s timestamp for Pioneer ↔ Scalper transition audit trail. */
const AUDIT_GOLDEN_OFFSET_MS = 1618;

/** Log Pioneer → Scalper (or reverse) transition for tax ledger. Call when a PENDING Pioneer receipt is updated to Scalper value at noon flip. */
export function logPioneerScalperTransition(
  txnId: string,
  from: 'Pioneer' | 'Scalper',
  to: 'Pioneer' | 'Scalper',
  asOf: Date = new Date()
): { txnId: string; from: string; to: string; timestamp_utc: string; tax_ledger_offset_ms: number } {
  const ts = new Date(asOf.getTime() + AUDIT_GOLDEN_OFFSET_MS);
  const entry = {
    txnId,
    from,
    to,
    timestamp_utc: ts.toISOString(),
    tax_ledger_offset_ms: AUDIT_GOLDEN_OFFSET_MS,
  };
  if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.info('[GSM_BILLING_AUDIT]', JSON.stringify(entry));
  }
  return entry;
}

/** Base rates keyed by product/plan (e.g. pipe-ad-1, pipe-ad-2, ...). Values in USD. */
export type BaseRates = Record<string, number>;

/**
 * Apply Friday 4 PM PST scalper logic: if after cutoff, multiply all base rates by GATE_SCALP_MULTIPLIER (2.5x).
 */
export function getEffectiveRates(
  baseRates: BaseRates,
  asOf: Date = new Date()
): BaseRates {
  const afterCutoff = isAfterFriday4pmPSTCutoff(asOf);
  const mult = afterCutoff ? GATE_SCALP_MULTIPLIER : 1;
  const out: BaseRates = {};
  for (const [key, value] of Object.entries(baseRates)) {
    out[key] = Math.round(value * mult * 100) / 100;
  }
  return out;
}

/**
 * Get effective price for a single plan. If baseRates[planId] is missing, returns basePrice (e.g. from UI) with multiplier applied when after cutoff.
 */
export function getEffectivePrice(
  planId: string,
  basePrice: number,
  baseRates?: BaseRates,
  asOf: Date = new Date()
): number {
  const rate = baseRates != null && planId in baseRates ? baseRates[planId] : basePrice;
  const afterCutoff = isAfterFriday4pmPSTCutoff(asOf);
  const mult = afterCutoff ? GATE_SCALP_MULTIPLIER : 1;
  return Math.round(rate * mult * 100) / 100;
}

/**
 * Canonical base rates for Broadcast Pipe / GSM ad space (USD per month). Used by Blue PayPal Button and create-order.
 */
export const GSM_PIPE_BASE_RATES: BaseRates = {
  'pipe-ad-1': 499,
  'pipe-ad-2': 1199,
  'pipe-ad-3': 2499,
  'pipe-ad-4x4': 6999,
};

/**
 * Get effective pipe ad rates (after Friday 4 PM PST gate scalper when applicable).
 */
export function getGSMPipeEffectiveRates(asOf: Date = new Date()): BaseRates {
  return getEffectiveRates(GSM_PIPE_BASE_RATES, asOf);
}

/** Legacy metadata embedded in every pending GSM transaction. Agüeybaná el Gran Sol 1493/2026. */
export const PENDING_TRANSACTION_LEGACY_METADATA =
  'Never Lose Faith - El Gran Sol Delivers';

/** Projected Scalper Market Value at 12:00 PM PST = Pioneer cost × 2.5 (150% profit). */
export function getScalperValueFromPioneer(pioneerCostUsd: number): number {
  return Math.round(pioneerCostUsd * GATE_SCALP_MULTIPLIER * 100) / 100;
}
