# PayPal: Ensure Funds Go to Our Account

**Purpose:** Make sure the client (browser) is sending funds **to our PayPal business account**, not to any other account.

---

## How it works

1. **Frontend (this repo):** Loads the PayPal SDK with **our** Client ID (`VIBELANDIA_PAYPAL_CLIENT_ID` or from Octave 2 config). The user sees the PayPal button and approves the payment.
2. **Octave 2 (backend):** Receives create-order and capture-order from the frontend. Octave 2 calls PayPal’s API using **its own** credentials (Client ID + **Client Secret**). The order is **created** and **captured** on whichever PayPal account those credentials belong to.

**So:** Funds go to the account that **Octave 2** is configured with. The frontend Client ID should be the **same** app so the experience is consistent; the critical part is that **Octave 2 uses our app’s credentials**.

---

## What we must do

| Where | What | Why |
|-------|------|-----|
| **Frontend** (this repo) | Use **our** PayPal app’s **Client ID** in `api-config.js` (or from env). | So the PayPal button and SDK are tied to our app. |
| **Octave 2** | Configure **the same** PayPal app’s **Client ID and Client Secret** for create-order and capture-order. | create-order / capture-order run on the backend; PayPal credits the account that holds those credentials. |

**Rule:** One PayPal app = one Client ID (public) + one Client Secret (server-only). Use that app’s **Client ID** in the frontend and the **same app’s Client ID + Client Secret** in Octave 2. Then all payments are captured to **our** PayPal business account.

---

## Checklist

- [ ] Our PayPal app created at [developer.paypal.com/dashboard/applications](https://developer.paypal.com/dashboard/applications/sandbox) (Sandbox and/or Live).
- [ ] Frontend: `interfaces/api-config.js` (or env `VIBELANDIA_PAYPAL_CLIENT_ID`) set to **our** app’s Client ID.
- [ ] Octave 2: Environment (or config) has **our** app’s **Client ID** and **Client Secret** for the PayPal SDK / REST calls used in create-order and capture-order.
- [ ] No other account’s credentials in Octave 2; no mix of apps (e.g. frontend app A, backend app B).

---

## If Octave 2 is not ours

If Octave 2 is run by another party and they use **their** PayPal credentials, then **funds go to their account**, not ours. To have funds go to **our** account we must either:

- Run Octave 2 ourselves and configure it with **our** PayPal Client ID + Client Secret, or  
- Have the Octave 2 operator configure **our** PayPal app (our Client ID + Client Secret) for create-order and capture-order.

---

**See also:** [PAYMENT_PAYPAL_USER_CAPTURE.md](./PAYMENT_PAYPAL_USER_CAPTURE.md) · [OCTAVE2_REPO_PAYPAL_API_REFERENCE.md](./OCTAVE2_REPO_PAYPAL_API_REFERENCE.md)
