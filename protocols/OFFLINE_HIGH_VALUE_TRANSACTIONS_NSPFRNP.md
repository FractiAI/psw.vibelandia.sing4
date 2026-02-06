# Offline High-Value Transactions — Protocol

**Status:** ACTIVE  
**Applies to:** All transactions over $10,000 (any product or service).  
**Doctrine:** Larger transactions are handled off line. One human approval; payment details (wire, ACH, bank) are **never** on the site or in pre-filled emails — only sent privately after approval to the verified party.

**Parent:** [BLUE_PIPE_NSPFRNP.md](./BLUE_PIPE_NSPFRNP.md) — Over $10,000 = off line.

---

## 1. Why this protocol

- **Safety:** Bank/wire details must not appear on public pages, in the repo, or in auto-generated mailto bodies. Anyone with those details could misuse them. Share only after you know who you’re dealing with.
- **Clarity:** One repeatable flow for all high-value deals (ad space, SING!, campus, marine, etc.).
- **Sovereignty:** Single human in the loop (Chairman/Executive). One approval, then private payment instructions.

---

## 2. Flow (how we handle larger transactions)

| Step | Who | What |
|------|-----|------|
| 1 | Customer | Submits **request only** — contact info (name, email, phone, company) + plan/product + amount. No payment details. Via pre-filled email to **info@fractiai.com** or [GSM Booking Request](https://psw-vibelandia-sing4.vercel.app/interfaces/gsm-booking-request.html) for ad space. |
| 2 | Chairman/Executive | Request lands in info@fractiai.com. **Verify** counterparty (email, call, or doc as needed). |
| 3 | Chairman/Executive | **One approval.** Decide approve/decline. If approved: prepare invoice and payment instructions (wire/ACH/other). |
| 4 | Chairman/Executive | Send **invoice + payment instructions** to the customer **privately** (e.g. reply email, PDF, secure link). **Do not** put bank account or wire details on the website or in public templates. |
| 5 | Customer | Pays by wire, ACH, or agreed method using the instructions they received. |
| 6 | Chairman/Executive | On payment confirmation → fulfill (reserve slot, deliver access, etc.); confirm to customer. |

---

## 3. Security rules

- **No bank/wire info in public.** Never include routing number, account number, or wire instructions on the site, in the repo, or in pre-filled mailto bodies.
- **Payment details only after approval.** Send invoice and payment instructions only to the **verified** counterparty, through a **private** channel (email reply, secure doc, or agreed method).
- **Single approval.** One human (Chairman or delegated Executive) approves; then invoice and payment instructions are sent. No second sign-off required unless you define it.

---

## 4. Product-specific flows

- **GSM ad space (Broadcast Pipe, Aurora):** Use [GSM_AD_TRANSACTIONS_EMAIL_GOLDILOCKS_SINGLE_APPROVAL_NSPFRNP.md](./GSM_AD_TRANSACTIONS_EMAIL_GOLDILOCKS_SINGLE_APPROVAL_NSPFRNP.md) — structured request → one approval → invoice/wire sent privately.
- **Other over-$10K (SING!, campus monthly, marine, etc.):** Same flow: request (contact + plan/amount) to info@fractiai.com → verify → one approval → send invoice + payment instructions privately → payment → confirm.

---

## 5. References

- [BLUE_PIPE_NSPFRNP.md](./BLUE_PIPE_NSPFRNP.md) — Threshold; PayPal pipe; over $10K = off line.
- [GSM_AD_TRANSACTIONS_EMAIL_GOLDILOCKS_SINGLE_APPROVAL_NSPFRNP.md](./GSM_AD_TRANSACTIONS_EMAIL_GOLDILOCKS_SINGLE_APPROVAL_NSPFRNP.md) — Goldilocks for ad space.

**NSPFRNP · Over $10K · Request → Verify → One approval → Invoice + payment details privately only.**
