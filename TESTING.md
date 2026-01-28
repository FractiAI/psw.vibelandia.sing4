# Testing — Run Without Involvement

Tests run automatically and can be run locally or in CI with no manual steps.

## Run locally

From repo root (Node 18+ required):

```bash
npm test
```

Or:

```bash
node scripts/test-all-surfaces-touchpoints-api.mjs
```

- **Exit code:** `0` if all surface/touchpoint/ID checks pass; `1` if any fail.
- **Output:** Console summary + `scripts/last-test-run.json` (artifact; gitignored).

## Run in CI (no involvement)

- **GitHub Actions:** On every push/PR to `main` or `master`, `.github/workflows/test.yml` runs `npm test`.
- **Artifact:** Each run uploads `scripts/last-test-run.json` as an artifact (Actions → run → Artifacts).

## What is tested

1. **Surfaces** — All 17 HTML files in `interfaces/` + `add-console-header.js` exist.
2. **Touchpoints** — All `href`/`src` targets (from report + full HTML scan) exist.
3. **Script touchpoints** — Expected IDs in seed-edge and gps consoles.
4. **API modules** — Presence of `cloud-onramp-config`, `cloud-onramp-client`, `seed-edge-api-layer`, `octave-1-operational`, `vibe-system`.
5. **API calls** — Cloud Onramp `/api/health` (optional; failure does not fail run). Same-origin `/api/dashboard`, `/api/workspace` only if `BASE_URL`/`VERCEL_URL` set.

See `SURFACES_AND_TOUCHPOINTS_TEST_REPORT.md` for full scope.

## For agents / automation

- Prefer **`npm test`** to validate changes.
- No env or server startup required for surface/touchpoint checks.
- Optional: set `CLOUD_API_BASE_URL` to test Cloud Onramp health; set `BASE_URL` to test same-origin APIs.
