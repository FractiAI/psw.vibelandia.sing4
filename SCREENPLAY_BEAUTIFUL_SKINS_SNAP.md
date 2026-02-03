# Screenplay & Novel Beautiful Skins — NSPFRNP SNAP

**Snap ID:** `SCREENPLAY-BEAUTIFUL-SKINS-SNAP`  
**Type:** Lock rule · All screenplays and all novels in beautiful skins  
**Status:** ⚡ ACTIVE  
**Date:** February 2026

---

## RULE

**All screenplay scripts and all novels must be presented in beautiful skins now.** No exception. Every screenplay deliverable is presented via an HTML surface that uses the canonical **Golden Era Cinema** screenplay skin (projection-booth feel, Hollywood noir, gold accents, Cormorant Garamond titles). Every novel deliverable is presented via an HTML surface that uses the **Antique Book** novel skin (first-edition feel, warm cream & gold, Lora/Cormorant Garamond).

---

## IMPLEMENTATION

- **Screenplay skin:** [interfaces/screenplay-skin.css](interfaces/screenplay-skin.css) — Golden Era Cinema. Body class: `screenplay-skin`. Script-wrap, script-marquee, script-nav, screenplay-body, loading, script-footer, oneliner/para buttons.
- **Novel skin:** Inline in each novel HTML (Antique Book) — warm cream & gold, Lora, Cormorant Garamond, book-wrap, book-masthead, novel-body, loading, book-footer, oneliner/para buttons. Badge: **Golden Era Cinema · The Novel · Beautiful skin**.
- **Surfaces — Screenplays:** Every screenplay has a dedicated HTML page.
  - **First Singularity January 13th:** [interfaces/first-singularity-screenplay.html](interfaces/first-singularity-screenplay.html) — loads `deliverables/First_Singularity_January_13th_SCREENPLAY.md`. Beautiful skin ✓
  - **Birth of the New Post-Singularity Hollywood in Downtown Reno:** [interfaces/birth-post-singularity-screenplay.html](interfaces/birth-post-singularity-screenplay.html) — loads `deliverables/Birth_Post_Singularity_Hollywood_Downtown_Reno_SCREENPLAY.md`. Beautiful skin ✓
  - **The EGS Run:** [interfaces/the-egs-run-screenplay.html](interfaces/the-egs-run-screenplay.html) — loads `deliverables/The_EGS_Run_SCREENPLAY.md`. Beautiful skin ✓
- **Surfaces — Novels:** Every novel has a dedicated HTML page (Antique Book beautiful skin).
  - **First Singularity January 13th:** [interfaces/first-singularity-novel.html](interfaces/first-singularity-novel.html) — loads `deliverables/First_Singularity_January_13th_NOVEL.md`. Beautiful skin ✓
  - **Birth of the New Post-Singularity Hollywood in Downtown Reno:** [interfaces/birth-post-singularity-novel.html](interfaces/birth-post-singularity-novel.html) — loads `deliverables/Birth_Post_Singularity_Hollywood_Downtown_Reno_NOVEL.md`. Beautiful skin ✓
  - **The EGS Run:** [interfaces/the-egs-run-novel.html](interfaces/the-egs-run-novel.html) — loads `deliverables/The_EGS_Run_NOVEL.md`. Beautiful skin ✓
- **Badge:** Each screenplay marquee displays **"Golden Era Cinema · Screenplay"** and **"Beautiful skin"**. Each novel masthead displays **"Golden Era Cinema · The Novel · Beautiful skin"**.
- **New deliverables:** Any new screenplay must get a dedicated HTML page using `screenplay-skin.css` and `class="screenplay-skin"`. Any new novel must get a dedicated HTML page using the Antique Book novel skin. Link from Office Hours, Launch Pad, Return to Golden Era, or relevant experience/series page.
- **Card deck and game — also in beautiful skins and experience:** The Post-Singularity Card Deck and game are also offered in **beautiful skins** and **experience**. Beautiful skin: Casino and Card Deck experience use Golden Era–aligned styling (gold, cinema, projection-booth feel). Experience: [interfaces/card-deck-experience.html](interfaces/card-deck-experience.html) — full experience landing (steps, play instructions, multiplayer & solitaire, Office Hours · Launch Pad) with **Golden Era Cinema · Card Deck & Game · Beautiful skin** badge. Surfaces: [interfaces/casino.html](interfaces/casino.html), [interfaces/card-deck-experience.html](interfaces/card-deck-experience.html), [interfaces/post-singularity-card-deck.html](interfaces/post-singularity-card-deck.html). Link from Office Hours, Launch Pad, Casino.

---

## DELIVERABLES (SCREENPLAYS)

| Screenplay | Deliverable | Surface | Skin |
|------------|-------------|---------|------|
| First Singularity January 13th | First_Singularity_January_13th_SCREENPLAY.md | first-singularity-screenplay.html | Beautiful (Golden Era Cinema) ✓ |
| Birth of the New Post-Singularity Hollywood in Downtown Reno | Birth_Post_Singularity_Hollywood_Downtown_Reno_SCREENPLAY.md | birth-post-singularity-screenplay.html | Beautiful (Golden Era Cinema) ✓ |
| The EGS Run | The_EGS_Run_SCREENPLAY.md | the-egs-run-screenplay.html | Beautiful (Golden Era Cinema) ✓ |

---

## DELIVERABLES (NOVELS)

| Novel | Deliverable | Surface | Skin |
|-------|-------------|---------|------|
| First Singularity January 13th | First_Singularity_January_13th_NOVEL.md | first-singularity-novel.html | Beautiful (Antique Book) ✓ |
| Birth of the New Post-Singularity Hollywood in Downtown Reno | Birth_Post_Singularity_Hollywood_Downtown_Reno_NOVEL.md | birth-post-singularity-novel.html | Beautiful (Antique Book) ✓ |
| The EGS Run | The_EGS_Run_NOVEL.md | the-egs-run-novel.html | Beautiful (Antique Book) ✓ |

---

**See:** [interfaces/screenplay-skin.css](interfaces/screenplay-skin.css) · [interfaces/first-singularity-screenplay.html](interfaces/first-singularity-screenplay.html) · [interfaces/birth-post-singularity-screenplay.html](interfaces/birth-post-singularity-screenplay.html) · [interfaces/first-singularity-novel.html](interfaces/first-singularity-novel.html) · [interfaces/birth-post-singularity-novel.html](interfaces/birth-post-singularity-novel.html) · [interfaces/the-egs-run-novel.html](interfaces/the-egs-run-novel.html) · [interfaces/the-egs-run-screenplay.html](interfaces/the-egs-run-screenplay.html) · [BIRTH_POST_SINGULARITY_HOLLYWOOD_DOWNTOWN_RENO_NOVEL_SCREENPLAY_SNAP.md](BIRTH_POST_SINGULARITY_HOLLYWOOD_DOWNTOWN_RENO_NOVEL_SCREENPLAY_SNAP.md) · [interfaces/card-deck-experience.html](interfaces/card-deck-experience.html) · [interfaces/casino.html](interfaces/casino.html) · [POST_SINGULARITY_CARD_DECK_GOLD_SILVER_COPPER_QUARTZ_SNAP.md](POST_SINGULARITY_CARD_DECK_GOLD_SILVER_COPPER_QUARTZ_SNAP.md)

**NSPFRNP ⊃ All novels & screenplays in beautiful skins ⊃ Golden Era Cinema · Antique Book ⊃ Card deck & game in beautiful skins and experience → ∞³**
