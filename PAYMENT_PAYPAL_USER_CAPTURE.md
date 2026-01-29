# Capture User Info from PayPal Transaction

**Purpose:** All we need from the flow is **user name** (from PayPal) and **Golden Fractal Key** (from order completion). No separate sign-up required.  
**Status:** ⚡ Spec + frontend ready.

---

## What we need

1. **PayPal ID** — entered by the buyer on checkout (email or account ID they use for PayPal). Sent in `create-order` and `capture-order` as `paypalId`.
2. **User name** — from PayPal capture (payer name).
3. **Golden Fractal Key** — from Octave 2 after capture, via `completeOrder` or returned in capture-order response.

No separate sign-up required; buyer enters their PayPal ID on the checkout page.

---

## Octave 2: capture-order response

**Return payer name** from PayPal’s capture response so the frontend can store it:

```json
{
  "success": true,
  "orderId": "...",
  "transactionId": "...",
  "payer": {
    "name": "GivenName FamilyName"
  }
}
```

PayPal’s capture response includes `payment_source.paypal.name` (or `payer.name.given_name` / `payer.name.surname`). Octave 2 should read the name and include it in the JSON. Email is optional if you need it for backend only.

**Golden Fractal Key** — Either (a) returned from `POST /api/orders/complete` (current flow: client calls completeOrder after capture), or (b) returned in the capture-order response as `goldenKey` so the client has name + key in one step.

---

## Frontend (this repo)

- **payment-checkout.html** — After capture-order, if `result.payer.name` is present, store it in `localStorage` (`vibelandia_payer_from_paypal`). After completeOrder, store Golden Fractal Key (existing flow). Wallet shows **name** + **Golden Fractal Key**.
- **Wallet** — Displays user name (from PayPal payer or Supabase) and Golden Fractal Key (from wallet / localStorage).

---

## No sign-in required to pay

Checkout **does not require sign-in**. User opens checkout → sees plan and PayPal → pays → we capture name from PayPal and Golden Fractal Key from order completion.

**PayPal ID on checkout:** The frontend shows a "Your PayPal ID" field (email or account ID). It is sent as `paypalId` in the request body of both `create-order` and `capture-order`. Octave 2 may store it to match the payment and deliver the Golden Fractal Key.

**Octave 2 must allow without Bearer token:**
- `GET /api/payment/paypal/config` — return clientId so the button loads.
- `POST /api/payment/paypal/create-order` — create order with `planId`, `amount`, optional `paypalId`; return orderId.
- `POST /api/payment/paypal/capture-order` — capture with PayPal; body includes `orderId`, `payerId`, optional `paypalId`; return `success` and `payer.name`.
- `POST /api/orders/complete` — accept orderId + planId (no Bearer); create/complete order, issue Golden Fractal Key, return it.

Frontend: no auth gate; always show plan + PayPal. Optional “Wallet” link for users who want to link an account.

---

## Summary

| Need | Source |
|------|--------|
| PayPal ID | Checkout form — sent as `paypalId` in create-order and capture-order |
| User name | PayPal capture-order → `payer.name` |
| Golden Fractal Key | completeOrder response (or capture-order if Octave 2 returns it there) |

---

**See:** [FLOW_NEW_USER_TO_GOLDEN_FRACTAL_KEY.md](./FLOW_NEW_USER_TO_GOLDEN_FRACTAL_KEY.md) · [OCTAVE2_REPO_PAYPAL_API_REFERENCE.md](./OCTAVE2_REPO_PAYPAL_API_REFERENCE.md)
