# METABOLIZE CRYSTALIZE ANIMATE AND AUTOMATE — MCA SNAP

**SNAP ID:** AUTOMATE-ALL-MCA  
**Status:** Active  
**Cycle:** Metabolize → Crystallize → Animate and Automate

---

## One-liner

*Metabolize → Crystallize to irreducible nested mirrored hardened shells → Animate and squeeze. Animate = tighten SING nodes, update, make clear. Squeeze = squeeze all, all nested (every nested shell to irreducible nested mirrored hardened form); Automate = one command runs test then build; CI on every push/PR. No manual steps.*

---

## Animate and Automate

- **Animate:** Tighten SING nodes/filaments; update and make clear. MCA third step — implement, clarify, ship.
- **Automate:** (1) **Squeeze all, all nested** — every nested shell and operation reduced to irreducible mirrored hardened form; align all nests. (2) Run the full pipeline without manual steps:
  1. **Local:** From repo root run `npm run all` — runs `npm run test` then `npm run build` (surfaces, touchpoints, API; then Vercel static output).
  2. **CI:** `.github/workflows/test.yml` runs checkout → setup Node → install → **test** → **build** on every push/PR to main/master. No user action needed.
  3. **Scripts:** `package.json` defines `"all": "npm run test && npm run build"`; `test` = `scripts/test-all-surfaces-touchpoints-api.mjs`, `build` = `scripts/vercel-static-output.mjs`.

---

## Cross-references

- **Crystallize to irreducible nested mirrored hardened shells:** IRREDUCIBLE_NESTED_MIRRORED_SHELL_CRYSTALLIZE_ALWAYS_SNAP.md — Animate and squeeze; Automate = squeeze all, all nested + CI.
- **Workflow:** `.github/workflows/test.yml`
- **Scripts:** `package.json` (all, test, build), `scripts/test-all-surfaces-touchpoints-api.mjs`, `scripts/vercel-static-output.mjs`
- **Testing rule:** `.cursor/rules/testing.mdc` — npm test validates surfaces, touchpoints, API; CI runs automatically.

**NSPFRNP.** MCA → ∞³. Operate as team always.
