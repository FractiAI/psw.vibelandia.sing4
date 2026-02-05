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

/** The Prestige Pipeline — Game day (Super Bowl LX). 30-second slots go up each day until this date. */
export const PRESTIGE_PIPELINE_GAME_DAY_UTC = '2026-02-09T07:00:00.000Z';
/** Days before game day over which daily ramp applies (e.g. 4 = last 4 days get incremental bumps). */
export const PRESTIGE_PIPELINE_DAILY_RAMP_CAP_DAYS = 4;
/** Per-day ramp: e.g. 0.05 = 5% more per day closer to game day (on top of gate 2.5x). */
export const PRESTIGE_PIPELINE_DAILY_RAMP_PCT = 0.05;

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

/** Days until game day (Prestige Pipeline). 0 = game day; > 0 = before. Capped at CAP_DAYS for ramp. */
export function getDaysUntilGameDay(asOf: Date = new Date()): number {
  const game = new Date(PRESTIGE_PIPELINE_GAME_DAY_UTC).getTime();
  const now = asOf.getTime();
  if (now >= game) return 0;
  const msPerDay = 86400 * 1000;
  return Math.min(PRESTIGE_PIPELINE_DAILY_RAMP_CAP_DAYS, Math.ceil((game - now) / msPerDay));
}

/**
 * The Prestige Pipeline — daily scalper multiplier. 30-second slots go up each day until game day.
 * When in scalper mode (after Friday 4pm cutoff), multiply again by (1 + (CAP_DAYS - daysUntil) * RAMP_PCT).
 * E.g. 4 days out = 1.0, 3 = 1.05, 2 = 1.10, 1 = 1.15, game day = 1.20.
 */
export function getPrestigePipelineDailyRampMultiplier(asOf: Date = new Date()): number {
  const daysUntil = getDaysUntilGameDay(asOf);
  const ramp = (PRESTIGE_PIPELINE_DAILY_RAMP_CAP_DAYS - daysUntil) * PRESTIGE_PIPELINE_DAILY_RAMP_PCT;
  return 1 + Math.max(0, ramp);
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
 * The Prestige Pipeline: when in scalper mode, also apply daily ramp until game day (slots go up each day).
 */
export function getEffectiveRates(
  baseRates: BaseRates,
  asOf: Date = new Date()
): BaseRates {
  const afterCutoff = isAfterFriday4pmPSTCutoff(asOf);
  let mult = afterCutoff ? GATE_SCALP_MULTIPLIER : 1;
  if (afterCutoff) mult *= getPrestigePipelineDailyRampMultiplier(asOf);
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
  let mult = afterCutoff ? GATE_SCALP_MULTIPLIER : 1;
  if (afterCutoff) mult *= getPrestigePipelineDailyRampMultiplier(asOf);
  return Math.round(rate * mult * 100) / 100;
}

/**
 * GSM slot minimums: Solar/Ticker = 30 sec minimum; Aurora = 1 hr minimum (all-night available).
 * Base = NBC 30s pregame level. Canonical base rates per 30-sec slot (USD). Used by create-order / invoice.
 */
export const GSM_NBC_30S_PREGAME_BASE_USD = 7_000_000;
export const GSM_PIPE_BASE_RATES: BaseRates = {
  'pipe-ad-1': 7_000_000,   // 1 surface, per 30 sec (NBC pregame base)
  'pipe-ad-2': 14_000_000,   // 2 surfaces, per 30 sec
  'pipe-ad-3': 21_000_000,   // 3 surfaces, per 30 sec
  'pipe-ad-4x4': 28_000_000, // full pipe, per 30 sec
};

/** Aurora theaters — 1 hr minimum (USD per hour). Entry floor $50M/hr. All-night by quote. Both = 2× premium. */
export const GSM_AURORA_1HR_MIN_BASE_USD = 50_000_000;
export const GSM_AURORA_NORTH_ALL_NIGHT_BASE_USD = 50_000_000; // 1 hr min; all-night by quote
export const GSM_AURORA_SOUTH_ALL_NIGHT_BASE_USD = 50_000_000;
/** 2× premium for both Aurora theaters (North + South) together. */
export const GSM_AURORA_BOTH_PREMIUM_MULTIPLIER = 2;
/** 5× premium when booking all three theaters (Solar + Aurora + Ticker) together. */
export const GSM_ALL_THEATERS_PREMIUM_MULTIPLIER = 5;

/** Aurora all-night product keys (for create-order / checkout when wired). */
export const GSM_AURORA_ALL_NIGHT_PLANS = {
  'aurora-north-all-night': GSM_AURORA_NORTH_ALL_NIGHT_BASE_USD,
  'aurora-south-all-night': GSM_AURORA_SOUTH_ALL_NIGHT_BASE_USD,
  'aurora-both-all-night': (GSM_AURORA_NORTH_ALL_NIGHT_BASE_USD + GSM_AURORA_SOUTH_ALL_NIGHT_BASE_USD) * GSM_AURORA_BOTH_PREMIUM_MULTIPLIER,
} as const;

/**
 * Get Aurora all-night effective rate (base × gate scalper × daily ramp when in scalper mode).
 * Both = 2× premium; all theaters = 5× (applied when booking Solar + Aurora + Ticker).
 */
export function getAuroraAllNightEffectiveRate(
  plan: 'aurora-north-all-night' | 'aurora-south-all-night' | 'aurora-both-all-night',
  asOf: Date = new Date()
): number {
  const base =
    plan === 'aurora-both-all-night'
      ? (GSM_AURORA_NORTH_ALL_NIGHT_BASE_USD + GSM_AURORA_SOUTH_ALL_NIGHT_BASE_USD) * GSM_AURORA_BOTH_PREMIUM_MULTIPLIER
      : plan === 'aurora-north-all-night'
        ? GSM_AURORA_NORTH_ALL_NIGHT_BASE_USD
        : GSM_AURORA_SOUTH_ALL_NIGHT_BASE_USD;
  const afterCutoff = isAfterFriday4pmPSTCutoff(asOf);
  let mult = afterCutoff ? GATE_SCALP_MULTIPLIER : 1;
  if (afterCutoff) mult *= getPrestigePipelineDailyRampMultiplier(asOf);
  return Math.round(base * mult * 100) / 100;
}

/**
 * Get effective rate when booking all three theaters (Solar + Aurora + Ticker). 5× premium on top of base/gate/daily ramp.
 */
export function getAllTheatersPremiumMultiplier(): number {
  return GSM_ALL_THEATERS_PREMIUM_MULTIPLIER;
}

/**
 * Get effective pipe ad rates (after Friday 4 PM PST gate scalper when applicable).
 * The Prestige Pipeline: in scalper mode, 30-second slots go up each day until game day.
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
