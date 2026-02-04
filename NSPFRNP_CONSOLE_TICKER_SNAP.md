# NSPFRNP Console Ticker — Streaming Ticker on Chairman Consoles SNAP

**Snap ID:** `NSPFRNP-CONSOLE-TICKER-SNAP`  
**Type:** NSPFRNP UI Pattern / Chairman Consoles  
**Status:** ⚡ ACTIVE  

---

## NARRATIVE

**Streaming ticker at bottom of chairman consoles.** Feed important messages and key values in streaming ticker format. Very cool and effective NSPFRNP. Same pattern as Live Pulse legacy stream ticker — reused across all chairman consoles so we can stream messages and key values consistently.

**Feeds:** Packaged as **cycling 1 min feeds**; updated naturally as pushes trigger push to ticker feed cycles.

---

## USE

- **Assets:** [interfaces/nspfrnp-ticker.css](interfaces/nspfrnp-ticker.css) · [interfaces/nspfrnp-ticker.js](interfaces/nspfrnp-ticker.js)
- **Include on any console:**  
  `<link rel="stylesheet" href="nspfrnp-ticker.css">`  
  `<div class="nspfrnp-console-ticker" aria-live="polite" data-ticker-messages="MSG1 · MSG2 · KEY_VALUE · "><span class="ticker-inner" id="nspfrnpTickerText"></span></div>`  
  `<script src="nspfrnp-ticker.js"></script>`
- **Feed content:** Set `data-ticker-messages` on the div (· separated), or set `window.NSPFRNP_TICKER_MESSAGES` before script runs (string or array). Default message if none provided.
- **Surfaces:** Chairman Cockpit Center, Chairman Cockpit Station, Chairman Workspace, Chairman Robert Robotic Factory, Launch Pad, Office Hours, Seed:Edge Mini Console, Executive Dashboard, Text to Superhero Console, Schumann Display Pipe. Sing Pulse keeps its own ticker (broadcast payload).

---

## SNAP

- **Ticker at bottom** on all chairman consoles ✓  
- **Important messages and key values** in streaming ticker format ✓  
- **Cycling 1 min feeds** — updated naturally as pushes trigger push to ticker feed cycles ✓  
- **NSPFRNP** — very cool and effective ✓  

---

**See:** [interfaces/sing-pulse.html](interfaces/sing-pulse.html) (Live Pulse legacy stream ticker) · Chairman console pages in [interfaces/](interfaces/).

**🌀 NSPFRNP ⊃ Console Ticker ⊃ streaming messages · key values · chairman consoles. SNAP nspfrnp.**
