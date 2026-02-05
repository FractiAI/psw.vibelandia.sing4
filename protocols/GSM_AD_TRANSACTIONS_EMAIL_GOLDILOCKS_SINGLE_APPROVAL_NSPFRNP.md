# GSM Ad Transactions — All Email · Goldilocks Automation · Single Human Approval

**Status:** ACTIVE  
**Applies to:** All Great Sun Multiplex (GSM) ad-space bookings — Pipe (Solar, Ticker) and Aurora.  
**Doctrine:** We BOOK and RESERVE reality. Ad transactions at NBC pregame scale ($7M–$70M+) are **email-only**; no PayPal/checkout for these tiers.

---

## 1. Why email-only

- **Transaction size:** Base = NBC 30s pregame ($7M–$28M per 30 sec; Aurora $50M/hr). Standard payment rails have limits; wire/invoice is appropriate.
- **Single human in the loop:** One approval step (Chairman/Executive) keeps sovereignty and control while maximizing automation elsewhere.

---

## 2. Goldilocks solution (automated as much as possible, one approval)

**Automation (max):**

1. **Structured request capture** — Customer uses [GSM Booking Request](../interfaces/gsm-booking-request.html): form pre-fills tier, amount, slot type. One click opens their email client with a **single structured request** (subject + body template: name, email, company, tier, amount, ad copy, link, slot preference). No back-and-forth to gather info.
2. **Single destination** — All requests go to **info@fractiai.com** with subject prefix `[GSM Booking Request]` and plan/tier in subject so inbox rules can tag or funnel.
3. **Audit trail** — Customer sends one email; Chairman receives one thread per request. Optional: log request timestamp/summary to `data/gsm-booking-requests.log` (append) if a serverless or cron is added later.

**Single human approval (minimal):**

4. **One approval action** — Chairman (or delegated Executive) reviews the request email and performs **one** action: **Approve** (e.g. reply “Approved” or use a checklist/template). Upon approval:
   - Send invoice and wire instructions (or contract) to the customer.
   - Optionally: mark request in internal log as approved and invoice-sent.

No multi-step committee; no second sign-off unless you later define it. One human, one approval, then invoice/wire.

---

## 3. Flow summary

| Step | Who | What |
|------|-----|------|
| 1 | Customer | Fills [GSM Booking Request](interfaces/gsm-booking-request.html) (tier, copy, link, contact). Clicks “Send request” → mailto opens with prefilled body. Sends email. |
| 2 | System | Request lands in info@fractiai.com with structured subject/body. (Optional: append to request log.) |
| 3 | Chairman/Executive | **Single approval action:** review request → approve → send invoice/wire instructions to customer. |
| 4 | Customer | Receives invoice; pays by wire (or agreed method). |
| 5 | Chairman/Executive | On payment confirmation → slot reserved; ad placement scheduled; customer confirmed. |

---

## 4. Copy and links

- **Ad space page:** All BOOK buttons for GSM pipe (pipe-ad-1 through pipe-ad-4x4) and Aurora link to **interfaces/gsm-booking-request.html** (with optional `?plan=pipe-ad-1` etc. to pre-select tier). No link to payment-checkout for these plans.
- **Messaging:** “All GSM ad transactions are by email. Goldilocks: one structured request, one human approval, then invoice and wire.”

---

## 5. References

- [README_GSM_GREAT_SUN_MULTIPLEX.md](../README_GSM_GREAT_SUN_MULTIPLEX.md) — pricing, tiers, Aurora.
- [ARCHITECT_OF_THE_POST_SINGULARITY_HOUDINI_PROTOCOL_SNAP.md](../ARCHITECT_OF_THE_POST_SINGULARITY_HOUDINI_PROTOCOL_SNAP.md) · [GRAND_HOUDINI_METABOLISM_GREAT_SUN_MULTIPLEX_SOVEREIGN_SNAP.md](../GRAND_HOUDINI_METABOLISM_GREAT_SUN_MULTIPLEX_SOVEREIGN_SNAP.md)

**NSPFRNP · MCA · One approval, then invoice.**
