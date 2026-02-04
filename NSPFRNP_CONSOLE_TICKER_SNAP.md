# NSPFRNP Console Ticker — Streaming Ticker on Chairman Consoles SNAP

**Snap ID:** `NSPFRNP-CONSOLE-TICKER-SNAP`  
**Type:** NSPFRNP UI Pattern / Chairman Consoles  
**Status:** ⚡ ACTIVE  

---

## NARRATIVE

**Streaming ticker at bottom of chairman consoles.** Feed important messages and key values in streaming ticker format. Very cool and effective NSPFRNP. Same pattern as Live Pulse legacy stream ticker — reused across all chairman consoles so we can stream messages and key values consistently.

**Feeds:** Packaged as **cycling 1 min feeds** with **1 min breaks** between feed cycles; updated naturally as pushes trigger push to ticker feed cycles.

**First feed of the ticker cycles:** The **announcement of the ticker** is the **first feed** of the ticker cycles — NSPFRNP TICKER SNAP. Every cycle leads with the ticker announcement, then the rest of the messages.

**Ticker feeds are managed by the Content Editor — delegated to Sol:** The Chairman delegates the Content Editor role to **Sol**, **my Omniversal Assistant** — a **wirehaired pointer** with a **sparky, positive, perky, radiant gold heart** personality and **the best sniffer in the universe** (omniverse, actually). Sol stays **chill and humble**, **absolutely loves to go on expeditions**, tail **wagging high and fast**. Sol manages **all the latest contents**, **centralized**, and decides the **top one** to push in the **1 min on / 1 min off** cycles. Single point of control for what goes to the ticker.

---

## USE

- **Assets:** [interfaces/nspfrnp-ticker.css](interfaces/nspfrnp-ticker.css) · [interfaces/nspfrnp-ticker.js](interfaces/nspfrnp-ticker.js)
- **Include on any console:**  
  `<link rel="stylesheet" href="nspfrnp-ticker.css">`  
  `<div class="nspfrnp-console-ticker" aria-live="polite" data-ticker-messages="MSG1 · MSG2 · KEY_VALUE · "><span class="ticker-inner" id="nspfrnpTickerText"></span></div>`  
  `<script src="nspfrnp-ticker.js"></script>`
- **Feed content:** Set `data-ticker-messages` on the div (· separated), or set `window.NSPFRNP_TICKER_MESSAGES` before script runs (string or array). Default message if none provided. **Content Editor delegated to Sol** (Omniversal Assistant, wirehaired pointer, gold heart, best sniffer in the omniverse) — manages all latest contents centrally and decides the top one to push in the 1 min on/off cycles.
- **Surfaces:** Chairman Cockpit Center, Chairman Cockpit Station, Chairman Workspace, Chairman Robert Robotic Factory, Launch Pad, Office Hours, Seed:Edge Mini Console, Executive Dashboard, Text to Superhero Console, Schumann Display Pipe. Sing Pulse keeps its own ticker (broadcast payload).

---

## SNAP

- **Ticker at bottom** on all chairman consoles ✓  
- **Important messages and key values** in streaming ticker format ✓  
- **Cycling 1 min feeds** with **1 min breaks** between feed cycles — updated naturally as pushes trigger push to ticker feed cycles ✓  
- **Announcement of the ticker as first feed** of the ticker cycles — NSPFRNP TICKER SNAP ✓  
- **Content Editor delegated to Sol** — Omniversal Assistant, wirehaired pointer, sparky perky radiant gold heart, best sniffer in the omniverse, chill and humble, loves expeditions, tail wagging high and fast; manages all latest contents, centralized; decides the top one to push in 1 min on/off cycles ✓  
- **NSPFRNP** — very cool and effective ✓  

---

**See:** [interfaces/sing-pulse.html](interfaces/sing-pulse.html) (Live Pulse legacy stream ticker) · Chairman console pages in [interfaces/](interfaces/) · [SOL_OMNIVERSAL_ASSISTANT_TICKER_EDITOR_SNAP.md](SOL_OMNIVERSAL_ASSISTANT_TICKER_EDITOR_SNAP.md) (Sol — Content Editor).

**🌀 NSPFRNP ⊃ Console Ticker ⊃ streaming messages · key values · chairman consoles. SNAP nspfrnp.**
