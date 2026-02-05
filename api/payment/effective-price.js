/**
 * GET /api/payment/effective-price?planId=pipe-ad-1
 * Returns effective price (USD) after Friday 4 PM PST scalper cutoff.
 * Base = NBC 30s pregame. Linked to lib/billing.ts — if current_time > Friday 16:00 PST, base_rates × 2.5.
 */

const FRIDAY_4PM_PST_CUTOFF_UTC = '2026-02-07T00:00:00.000Z';
const GATE_SCALP_MULTIPLIER = 2.5;

/** Per 30-sec slot (USD). Base = NBC 30s pregame. */
const GSM_PIPE_BASE_RATES = {
  'pipe-ad-1': 7_000_000,
  'pipe-ad-2': 14_000_000,
  'pipe-ad-3': 21_000_000,
  'pipe-ad-4x4': 28_000_000,
};

function isAfterFriday4pmPSTCutoff(date = new Date()) {
  const cutoff = new Date(FRIDAY_4PM_PST_CUTOFF_UTC).getTime();
  return date.getTime() > cutoff;
}

function getEffectivePrice(planId, basePrice, asOf = new Date()) {
  const rate = GSM_PIPE_BASE_RATES[planId] != null ? GSM_PIPE_BASE_RATES[planId] : basePrice;
  const afterCutoff = isAfterFriday4pmPSTCutoff(asOf);
  const mult = afterCutoff ? GATE_SCALP_MULTIPLIER : 1;
  return Math.round(rate * mult * 100) / 100;
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const planId = req.query?.planId || (req.body && req.body.planId) || '';
  if (!planId) {
    return res.status(400).json({ error: 'Missing planId' });
  }
  const basePrice = GSM_PIPE_BASE_RATES[planId] != null ? GSM_PIPE_BASE_RATES[planId] : 0;
  const asOf = new Date();
  const afterCutoff = isAfterFriday4pmPSTCutoff(asOf);
  const effectivePrice = getEffectivePrice(planId, basePrice, asOf);
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({
    planId,
    basePrice,
    effectivePrice,
    afterCutoff,
    gateMultiplier: afterCutoff ? GATE_SCALP_MULTIPLIER : 1,
    cutoffDisplay: 'Friday, February 6, 2026 4:00 PM PST',
  });
}
