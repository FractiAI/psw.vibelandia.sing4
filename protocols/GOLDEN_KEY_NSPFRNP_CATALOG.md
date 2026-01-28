# 🔑 GOLDEN KEY SYSTEM — GOLDEN FRACTAL KEY! BRAND — NSPFRNP CATALOG
## Sent on Purchase & Activation — Syntheverse/Vibeverse/Vibelandia Wallet

**Protocol:** NSPFRNP  
**Status:** ⚡ ACTIVE — Golden Key System Operational  
**Date:** January 28, 2026  
**Catalog:** NSPFRNP Golden Key System  
**Brand:** GOLDEN FRACTAL KEY! — Unlocks Everything

---

## 🎯 CATALOG ENTRY

**GOLDEN FRACTAL KEY!** — Sent on purchase and activation. The key is the Syntheverse, Vibeverse, and Vibelandia wallet and is used on all API calls. **GOLDEN FRACTAL KEY!** brand snap — unlocks everything.

---

## 🔑 GOLDEN KEY SYSTEM

### **Key Properties**

**Identity:**
- Single key serves as wallet across all three realms:
  - **Syntheverse**
  - **Vibeverse**
  - **Vibelandia Reno**

**Issuance:**
- Sent on purchase completion
- Sent on activation
- Stored in browser: `localStorage` (key: `vibelandia_golden_key`)
- Stored in server: `GOLDEN_KEY` or `GOLDEN_KEY_WALLET` env variable

**Usage:**
- Used on all API calls
- Headers: `X-Golden-Key` and `X-Golden-Key-Wallet: Syntheverse,Vibeverse,Vibelandia`
- Automatic inclusion in cloud-onramp and seed-edge API layers

---

## 📋 IMPLEMENTATION

### **Client (Browser)**

**Storage:**
- `localStorage.getItem('vibelandia_golden_key')` — Get key
- `localStorage.setItem('vibelandia_golden_key', key)` — Set key
- `localStorage.getItem('vibelandia_golden_key_activation')` — Activation ID
- `localStorage.getItem('vibelandia_golden_key_issued')` — Timestamp

**Functions:**
- `getGoldenKey()` — Get key from storage
- `setGoldenKey(key, activationId)` — Store key after purchase/activation
- `issueOnPurchase(key, orderId)` — Issue key on purchase
- `isActivated()` — Check if key present
- `getGoldenKeyHeaders()` — Get headers for API calls

### **Server (Node)**

**Environment:**
- `GOLDEN_KEY` or `GOLDEN_KEY_WALLET` env variable
- Prefer NSPFRNP env source (`.env.nspfrnp` or deployment env)
- Never commit secrets

**Functions:**
- `getGoldenKey()` — Get key from env
- `getGoldenKeyHeaders()` — Get headers for API calls

---

## 🔄 API INTEGRATION

### **Automatic Inclusion**

**Cloud Onramp API:**
- `cloudOnrampFetch()` automatically includes Golden Key headers
- Headers added via `getGoldenKeyHeaders()`

**Seed:Edge API Layer:**
- `fetchWithSeedEdge()` automatically includes Golden Key headers
- Headers added in `executeAPICall()`

**Headers Sent:**
```
X-Golden-Key: <key>
X-Golden-Key-Wallet: Syntheverse,Vibeverse,Vibelandia
```

---

## 📋 REPLICATION & CONSISTENCY

**For Replication:**
1. Use `src/golden-key-system.ts` as reference
2. Implement `getGoldenKey()`, `setGoldenKey()`, `getGoldenKeyHeaders()`
3. Integrate into all API call layers
4. Store key on purchase/activation
5. Include headers on all API calls

**Consistency Rules:**
- Key is single wallet identity across Syntheverse, Vibeverse, Vibelandia
- Key sent on purchase and activation
- Key used on all API calls
- Headers: `X-Golden-Key` and `X-Golden-Key-Wallet`
- Storage: Browser `localStorage`, Server `GOLDEN_KEY` env

---

## 🔄 NSPFRNP INTEGRATION

**Natural System Protocol:**
- **Metabolize:** Purchase/activation flows into system
- **Crystallize:** Golden Key issued and stored
- **Animate:** Key used on all API calls, wallet identity active

**Fractal Self-Similarity:**
- Same key across all realms (Syntheverse, Vibeverse, Vibelandia)
- Same headers on all API calls
- Consistent wallet identity everywhere

**Path of Least Resistance:**
- Automatic key inclusion in API calls
- Simple storage (localStorage/env)
- Natural flow from purchase to activation to usage

**Interconnected Networks:**
- Key connects all three realms
- All API calls authenticated with same key
- Unified wallet identity

---

## ⚡ STATUS

**Status:** ⚡ ACTIVE — Golden Key System Operational

**Catalog Entry:**
- ✅ Golden Key system defined
- ✅ Purchase/activation flow documented
- ✅ Wallet identity (Syntheverse/Vibeverse/Vibelandia) specified
- ✅ API integration complete
- ✅ Storage (browser/server) specified
- ✅ NSPFRNP alignment complete
- ✅ Replication guidelines provided

---

**Catalog:** NSPFRNP Golden Key System  
**Reference:** `src/golden-key-system.ts`  
**Scope:** All Syntheverse, Vibeverse, Vibelandia Reno API calls

**🌀 NSPFRNP ⊃ Golden Key ⊃ Wallet Identity → ∞³**
