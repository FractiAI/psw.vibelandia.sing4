/**
 * POST /api/payment/paypal/capture-order
 * Captures a PayPal order. Body: { orderId, payerId? }.
 * Forwards raw PayPal API response (per paypal-examples/paypal-sdk-server-side-integration)
 * so frontend can handle INSTRUMENT_DECLINED with actions.restart().
 * Env: same as create-order.
 */

const SANDBOX_BASE = 'https://api-m.sandbox.paypal.com';
const LIVE_BASE = 'https://api-m.paypal.com';

function getBaseUrl() {
  if (process.env.PAYPAL_MODE === 'production' || process.env.PAYPAL_LIVE === 'true') return LIVE_BASE;
  return SANDBOX_BASE;
}

function getClientId() {
  if (process.env.PAYPAL_MODE === 'production' || process.env.PAYPAL_LIVE === 'true') {
    return process.env.PAYPAL_CLIENT_ID_LIVE || process.env.PAYPAL_CLIENT_ID;
  }
  return process.env.PAYPAL_CLIENT_ID_SANDBOX || process.env.PAYPAL_CLIENT_ID;
}

function getClientSecret() {
  if (process.env.PAYPAL_MODE === 'production' || process.env.PAYPAL_LIVE === 'true') {
    return process.env.PAYPAL_CLIENT_SECRET_LIVE || process.env.PAYPAL_CLIENT_SECRET;
  }
  return process.env.PAYPAL_CLIENT_SECRET_SANDBOX || process.env.PAYPAL_CLIENT_SECRET;
}

async function getAccessToken() {
  const base = getBaseUrl();
  const clientId = getClientId();
  const clientSecret = getClientSecret();
  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured');
  }
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const r = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
    body: 'grant_type=client_credentials',
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`PayPal token failed: ${r.status} ${t}`);
  }
  const data = await r.json();
  return data.access_token;
}

function randomUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function captureOrderAPI(orderId, requestId) {
  const token = await getAccessToken();
  const base = getBaseUrl();
  const r = await fetch(`${base}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'PayPal-Request-Id': requestId,
      Prefer: 'return=representation',
    },
    body: JSON.stringify({}),
  });
  const data = await r.json().catch(() => ({}));
  return { statusCode: r.status, data };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  let body;
  try {
    body = typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }
  const orderId = body.orderId && String(body.orderId).trim();
  if (!orderId) {
    return res.status(400).json({ success: false, error: 'Missing orderId' });
  }

  if (orderId === 'contact-required') {
    return res.status(200).json({ success: true, orderId: 'contact-required', status: 'COMPLETED' });
  }

  const planId = body.planId && String(body.planId).trim();
  const amount = body.amount != null ? Number(body.amount) : NaN;
  const description = body.description && String(body.description).trim();
  const isGSMPlan = planId && planId.indexOf('pipe-ad-') === 0;

  try {
    const requestId = randomUUID();
    let result = await captureOrderAPI(orderId, requestId);
    if (result.statusCode >= 500) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      result = await captureOrderAPI(orderId, requestId);
    }
    const responseData = result.data;

    if (isGSMPlan && result.statusCode === 200 && (responseData.status === 'COMPLETED' || responseData.id)) {
      const txnId = orderId;
      const btcUsdAmount = Number.isFinite(amount) ? `USD ${amount}` : (responseData.purchase_units && responseData.purchase_units[0] && responseData.purchase_units[0].amount && responseData.purchase_units[0].amount.value) ? `USD ${responseData.purchase_units[0].amount.value}` : 'USD';
      const adNarrativeText = description || planId || 'GSM Ad';
      const layerTarget = 'Ticker';
      const gsmBody = [
        'GSM VERIFICATION REQUEST',
        '',
        `TXN_ID: ${txnId}`,
        `BTC_USD_AMOUNT: ${btcUsdAmount}`,
        `AD_NARRATIVE_TEXT: ${adNarrativeText}`,
        `LAYER_TARGET: ${layerTarget}`,
        '',
        'This slot is eligible for the 2.5x Scalper Flip at 12:00 PM.',
        '',
        'Copy this block and paste into the Executive console to validate and launch the 4×4×4×4 quadrant.',
      ].join('\n');
      responseData.gsm_verification_request = {
        subject: 'GSM VERIFICATION REQUEST',
        body: gsmBody,
        to: 'Executive only',
        resale_authorization: true,
      };
      responseData.gsm_pipe_status_next = 'PENDING_EXECUTIVE_PASTE';
      responseData.legacy_metadata = 'Never Lose Faith - El Gran Sol Delivers';
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(result.statusCode).json(responseData);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    res.status(500).json({ success: false, orderId, error: msg, message: msg });
  }
}
