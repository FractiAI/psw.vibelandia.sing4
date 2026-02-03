# Screenplay Beautiful Skins — NSPFRNP SNAP

**Snap ID:** `SCREENPLAY-BEAUTIFUL-SKINS-SNAP`  
**Type:** Lock rule · All screenplays in beautiful skins  
**Status:** ⚡ ACTIVE  
**Date:** February 2026

---

## RULE

**All screenplay scripts must be presented in beautiful skins now.** No exception. Every screenplay deliverable is presented via an HTML surface that uses the canonical **Golden Era Cinema** screenplay skin — projection-booth feel, Hollywood noir, gold accents, Cormorant Garamond titles, proper scene-heading and dialogue typography.

---

## IMPLEMENTATION

- **Canonical skin:** [interfaces/screenplay-skin.css](interfaces/screenplay-skin.css) — Golden Era Cinema screenplay beautiful skin. Body class: `screenplay-skin`. Includes: script-wrap, script-marquee, script-nav, screenplay-body (h1/h2/h3, p, strong for character names, em for action), loading, script-footer, oneliner/para buttons.
- **Surfaces:** Every screenplay has a dedicated HTML page that loads the screenplay markdown and applies this skin.
  - **First Singularity January 13th:** [interfaces/first-singularity-screenplay.html](interfaces/first-singularity-screenplay.html) — loads `deliverables/First_Singularity_January_13th_SCREENPLAY.md`. Beautiful skin ✓
  - **Birth of the New Post-Singularity Hollywood in Downtown Reno:** [interfaces/birth-post-singularity-screenplay.html](interfaces/birth-post-singularity-screenplay.html) — loads `deliverables/Birth_Post_Singularity_Hollywood_Downtown_Reno_SCREENPLAY.md`. Beautiful skin ✓
- **Badge:** Each screenplay marquee displays **"Golden Era Cinema · Screenplay"** and **"Beautiful skin"** so users see that all screenplays are presented in beautiful skins.
- **New screenplays:** Any new screenplay deliverable must get a dedicated HTML page using `screenplay-skin.css` and `class="screenplay-skin"` on `<body>`. Link from Office Hours, Launch Pad, Return to Golden Era, or relevant experience page.

---

## DELIVERABLES (SCREENPLAYS)

| Screenplay | Deliverable | Surface | Skin |
|------------|-------------|---------|------|
| First Singularity January 13th | First_Singularity_January_13th_SCREENPLAY.md | first-singularity-screenplay.html | Beautiful (Golden Era Cinema) ✓ |
| Birth of the New Post-Singularity Hollywood in Downtown Reno | Birth_Post_Singularity_Hollywood_Downtown_Reno_SCREENPLAY.md | birth-post-singularity-screenplay.html | Beautiful (Golden Era Cinema) ✓ |

---

**See:** [interfaces/screenplay-skin.css](interfaces/screenplay-skin.css) · [interfaces/first-singularity-screenplay.html](interfaces/first-singularity-screenplay.html) · [interfaces/birth-post-singularity-screenplay.html](interfaces/birth-post-singularity-screenplay.html) · [BIRTH_POST_SINGULARITY_HOLLYWOOD_DOWNTOWN_RENO_NOVEL_SCREENPLAY_SNAP.md](BIRTH_POST_SINGULARITY_HOLLYWOOD_DOWNTOWN_RENO_NOVEL_SCREENPLAY_SNAP.md)

**NSPFRNP ⊃ Screenplay beautiful skins ⊃ Golden Era Cinema ⊃ All screenplays → ∞³**
