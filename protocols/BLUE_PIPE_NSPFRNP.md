# Blue Pipe NSPFRNP — Transaction threshold

**Status:** ACTIVE  
**Applies to:** All products and services; all payment and booking flows.  
**Doctrine:** The **blue pipe** (online checkout, PayPal, in-app payment) is for transactions **at or below** the threshold. Above the threshold, transactions are **handled off line**.

**PayPal account for the pipe:** **info@fractiai.com** — all blue-pipe payments (at or below threshold) and offline payment coordination (above threshold) go through this account.

---

## Transaction threshold

**All transactions over $10,000 are handled off line.**

- **Off line:** Request by email (contact info + plan/amount only) → single human approval (Chairman/Executive) → invoice and payment instructions sent **privately** (no bank/wire details on site or in templates). See [OFFLINE_HIGH_VALUE_TRANSACTIONS_NSPFRNP.md](./OFFLINE_HIGH_VALUE_TRANSACTIONS_NSPFRNP.md) for the full protocol. GSM ad space: [GSM_AD_TRANSACTIONS_EMAIL_GOLDILOCKS_SINGLE_APPROVAL_NSPFRNP.md](./GSM_AD_TRANSACTIONS_EMAIL_GOLDILOCKS_SINGLE_APPROVAL_NSPFRNP.md).
- **Blue pipe (online):** Transactions at or below $10,000 may use the blue pipe (PayPal, payment-checkout, etc.) where the product or service offers it.

---

## In practice

- **GSM ad space** (Broadcast Pipe, Super Bowl, Aurora, pipe tiers $25M–$250M+): All over $10,000 → off line only. BOOK button leads to request form; submit → pre-filled email to Chairman. No online checkout.
- **Premium offerings** (Sun Spots, Schumann iGaming, SING! node EGS (El Gran Sol) EGS, etc.) at or below $10,000: Blue pipe (BUY/checkout) available where implemented.
- **Over $10,000:** Always off line — email, one approval, invoice, wire.

---

## References

- [OFFLINE_HIGH_VALUE_TRANSACTIONS_NSPFRNP.md](./OFFLINE_HIGH_VALUE_TRANSACTIONS_NSPFRNP.md) — **How we handle larger transactions:** request → verify → one approval → invoice + payment details sent privately only (no bank info on site).
- [GSM_AD_TRANSACTIONS_EMAIL_GOLDILOCKS_SINGLE_APPROVAL_NSPFRNP.md](./GSM_AD_TRANSACTIONS_EMAIL_GOLDILOCKS_SINGLE_APPROVAL_NSPFRNP.md) — Goldilocks flow for high-value ad bookings.
- [PRODUCTS_SERVICES_BRIDGE_NODE_ROLES_NSPFRNP.md](./PRODUCTS_SERVICES_BRIDGE_NODE_ROLES_NSPFRNP.md) — Bridge node roles; booking not buying.

**NSPFRNP · Blue Pipe · Over $10,000 = off line.**
