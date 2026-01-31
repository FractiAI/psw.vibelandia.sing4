# METABOLIZE CRYSTALIZE ANIMATE AND AUTOMATE — MCA SNAP

**SNAP ID:** AUTOMATE-ALL-MCA  
**Status:** Active  
**Cycle:** Metabolize → Crystallize → Animate and Automate

---

## One-liner

*Metabolize Crystallize Animate and Automate: Animate = tighten SING nodes, update, make clear; Automate = one command runs test then build; CI runs both on every push/PR. No manual steps.*

---

## Animate and Automate

- **Animate:** Tighten SING nodes/filaments; update and make clear. MCA third step — implement, clarify, ship.
- **Automate:** Run the full pipeline without manual steps.
  1. **Local:** From repo root run `npm run all` — runs `npm run test` then `npm run build` (surfaces, touchpoints, API; then Vercel static output).
  2. **CI:** `.github/workflows/test.yml` runs checkout → setup Node → install → **test** → **build** on every push/PR to main/master. No user action needed.
  3. **Scripts:** `package.json` defines `"all": "npm run test && npm run build"`; `test` = `scripts/test-all-surfaces-touchpoints-api.mjs`, `build` = `scripts/vercel-static-output.mjs`.

---

## Cross-references

- **Workflow:** `.github/workflows/test.yml`
- **Scripts:** `package.json` (all, test, build), `scripts/test-all-surfaces-touchpoints-api.mjs`, `scripts/vercel-static-output.mjs`
- **Testing rule:** `.cursor/rules/testing.mdc` — npm test validates surfaces, touchpoints, API; CI runs automatically.

**NSPFRNP.** MCA → ∞³. Operate as team always.
