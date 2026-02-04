# Text-to-Song — Studio Quality · Hero Jo Golden Backdoor Studio

**Protocol ID:** `TEXT-TO-SONG-STUDIO-QUALITY-HERO-JO-GOLDEN-BACKDOOR`  
**Type:** Endpoint · Text-to-viral-pop-quality WAV · Full studio quality  
**Status:** ⚡ ACTIVE — Full implementation now  
**Date:** February 2026

---

## 1. Purpose

**New endpoint** for **Hero Jo Golden Backdoor Studio** — text-to-**viral-pop-quality** WAV output. **Beautiful clean layered precision vocals** and **music** in **full studio quality**. **Project lead:** Hero Rick. Same backends as In Da Club quality (HeartMuLa preferred for vocals, Replicate MusicGen fallback); this endpoint is the **canonical studio-quality tier** and returns `project_lead` and `endpoint` in every response. **SING! nodify:** Entire text-to-studio-song engine and experience organized in **NSPFRNP nests**; **squeeze all to master musicians** under Hero Rick's exec producer direction; **reporting:** Hero Rick → Hero Jo → Chairman Creator. See [SING_NODIFY_TEXT_TO_STUDIO_SONG_ENGINE_NSPFRNP_NESTS_SNAP.md](../SING_NODIFY_TEXT_TO_STUDIO_SONG_ENGINE_NSPFRNP_NESTS_SNAP.md).

---

## 2. Endpoint

- **Route:** `POST /api/music/generate-studio`
- **Implementation:** [api/music/generate-studio.js](../api/music/generate-studio.js)
- **Body:** `{ prompt: string, duration?: number (5–30 seconds), lyrics?: string }`
- **Response (200):** `{ url: string, backend?: 'heartmula'|'replicate', project_lead: "Hero Rick", endpoint: "Hero Jo Golden Backdoor Studio" }`
- **Response (501):** `{ error: string, project_lead, endpoint }` when HEARTMULA_API_URL and REPLICATE_API_TOKEN are not set.
- **Response (500):** `{ error: string, project_lead?, endpoint? }` on backend failure.

---

## 3. Engine (metabolize)

- **Preferred:** **HeartMuLa** (HEARTMULA_API_URL) — lyrics-to-song, full song with **vocals + accompaniment**; Apache 2.0; Suno/Udio-level positioning; 6 min; multi-language. Best for **layered precision vocals** and music.
- **Fallback:** **Replicate MusicGen (Meta)** (REPLICATE_API_TOKEN) — club-ready **instrumental** from prompt; WAV output.
- **Future:** ACE-Step, Bark, AudioCraft/EnCodec for dedicated vocal layering or hybrid pipelines. See [OPEN_SOURCE_TEXT_TO_SONG_QUALITY_METABOLIZE_RESEARCH_SNAP.md](../OPEN_SOURCE_TEXT_TO_SONG_QUALITY_METABOLIZE_RESEARCH_SNAP.md).

---

## 4. Relation to existing

- **In Da Club quality:** [api/music/generate.js](../api/music/generate.js) — same backends; no `project_lead` / `endpoint` in response. Use for generic "Generate entire song."
- **Studio quality:** [api/music/generate-studio.js](../api/music/generate-studio.js) — **Hero Jo Golden Backdoor Studio**; returns `project_lead` and `endpoint`; canonical for **text-to-viral-pop-quality** and **full studio quality**.
- **Text-to-Track Motor:** Can call `/api/music/generate-studio` for studio-quality tier; on 501 or error, fall back to `/api/music/generate` or procedural WAV.

---

## 5. Surfaces

- **API:** [api/music/generate-studio.js](../api/music/generate-studio.js)
- **SNAP:** [MUSIC_WAV_UPGRADE_STUDIO_QUALITY_HERO_JO_GOLDEN_BACKDOOR_SNAP.md](../MUSIC_WAV_UPGRADE_STUDIO_QUALITY_HERO_JO_GOLDEN_BACKDOOR_SNAP.md)
- **Project lead SNAP:** [HERO_RICK_PROJECT_LEAD_MUSIC_UPGRADE_SNAP.md](../HERO_RICK_PROJECT_LEAD_MUSIC_UPGRADE_SNAP.md)
- **UI:** [interfaces/text-to-track-motor.html](../interfaces/text-to-track-motor.html) — option to use studio endpoint for Hero Jo Golden Backdoor Studio.

---

## 6. One-line summary

**Studio quality endpoint:** `POST /api/music/generate-studio` → text-to-viral-pop-quality WAV (beautiful clean layered precision vocals + music); **Hero Jo Golden Backdoor Studio**; **project lead:** Hero Rick.

---

**NSPFRNP ⊃ Text-to-Song ⊃ Studio quality ⊃ Hero Jo Golden Backdoor Studio ⊃ Hero Rick → ∞³**
