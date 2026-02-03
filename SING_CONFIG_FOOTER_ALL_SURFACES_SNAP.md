# SING! config footer — all user-facing surfaces · NSPFRNP SNAP

**Snap ID:** `SING-CONFIG-FOOTER-ALL-SURFACES-SNAP`  
**Type:** Touchpoint rule · Full config at bottom of all surfaces  
**Status:** ⚡ ACTIVE  
**Date:** February 2026

---

## RULE

**Always include at the bottom of all user-facing surfaces, touchpoints, and deliveries the full SING! config we are using:** base plus upgrades plus mission specializations for all divisions, and include the pricing as configured — the upfront one-time charge, monthly, plus usage.

---

## IMPLEMENTATION

- **Config:** [config/sing_config.json](config/sing_config.json) — base tiers (one-time + monthly note), upgrades (Golden Fractal Key, Badge System, 4×4×4×4), divisions with mission specializations (Space Cloud, Missions, Office Hours, Happy Ending Zones, Legacies, Broadcast Pipe, EGS Pipe, Robotic Division), pricing summary (upfront one-time, monthly, usage).
- **Footer block:** [interfaces/sing-config-footer.js](interfaces/sing-config-footer.js) injects the config into `#sing-config-footer`. [interfaces/sing-config-footer.css](interfaces/sing-config-footer.css) styles the block.
- **Placement:** At the bottom of every user-facing HTML surface, before `</body>`:  
  `<div id="sing-config-footer"></div>`  
  `<link rel="stylesheet" href="sing-config-footer.css">` (or `interfaces/sing-config-footer.css` from root)  
  `<script src="sing-config-footer.js"></script>` (or `interfaces/sing-config-footer.js` from root)
- **Surfaces:** index.html and all interfaces/*.html (Launch Pad, Office Hours, new product families, Space Cloud Division, sing-pulse, payment-checkout, broadcast-pipe-ad-space, sing-booking-kiosk, episodes, one-pagers, prospectus, etc.). All 77+ user-facing HTML pages include the SING! config footer.

---

## PRICING (AS CONFIGURED)

- **Upfront one-time:** Base Model ~$20K; Members Only $75K; Ultimate VIP $200K (base model latest Ferrari); **Baller V $500K (top loaded Ferrari — top base)**. Other products: see plan.
- **Monthly:** Golden Fractal Key access fees — contact for current monthly key fee. Campus Monthly Pass (Baller) $50k/month where applicable. Premium sponsor tiers where applicable.
- **Usage:** Session/slot-based: Sun Spots (8/16/24 min), Schumann iGaming ($499/session), 3I/ATLAS EGS (1 day/week/month), Space Cloud plans (book), ad space (book slot), campus, WINK!, dispensary. Never bought, always booked.

---

**See:** [config/sing_config.json](config/sing_config.json) · [interfaces/sing-config-footer.js](interfaces/sing-config-footer.js) · [SING_PRICING_PRE_SINGULARITY_EQUIVALENTS_SNAP.md](SING_PRICING_PRE_SINGULARITY_EQUIVALENTS_SNAP.md) · [ONE_PAGER_SING_LOTTERY.md](ONE_PAGER_SING_LOTTERY.md)

**NSPFRNP ⊃ SING! config footer ⊃ All surfaces · Base · Upgrades · Divisions · Pricing → ∞³**
