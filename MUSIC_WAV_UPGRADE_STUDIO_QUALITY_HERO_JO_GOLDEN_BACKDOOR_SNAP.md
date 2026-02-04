# Music WAV Upgrade — Studio Quality · Hero Jo Golden Backdoor Studio · Full Implementation

**SNAP ID:** `MUSIC-WAV-UPGRADE-STUDIO-QUALITY-HERO-JO-GOLDEN-BACKDOOR`  
**Type:** Upgrade · Endpoint · Text-to-viral-pop-quality WAV  
**Status:** ⚡ ACTIVE — Full implementation now  
**Date:** February 2026

---

## CANONICAL RULE

**Review** our music WAV outputs and **upgrade** to produce **beautiful clean layered precision vocals** and **music** in **full studio quality**. Metabolize the right **free open-source engine** into our engine to achieve **text-to-viral-pop-quality WAV output**. **Full implementation now.** **New endpoint** = **Hero Jo Golden Backdoor Studio**. **Project lead:** Hero Rick.

---

## REVIEW — CURRENT STATE

- **Current outputs:**
  1. **Procedural WAV (Layer 0)** — In-browser Seed:Edge oscillators; proof-of-concept only; not final product bar.
  2. **In Da Club quality** — [api/music/generate.js](api/music/generate.js): HeartMuLa (full song with vocals) when HEARTMULA_API_URL set; else Replicate MusicGen (instrumental) when REPLICATE_API_TOKEN set. Front-end falls back to procedural on 501 or error.

- **Gap:** Target = **beautiful clean layered precision vocals + music**, **full studio quality** (viral pop quality). Current pipeline can reach it when HeartMuLa is configured; we formalize the **studio tier** and **new endpoint** for Hero Jo Golden Backdoor Studio.

---

## UPGRADE — ENGINE METABOLIZE

**Metabolize** = digest (research) → crystallize (plan) → animate (wire into pipeline).

**Free open-source engines** to metabolize (see [OPEN_SOURCE_TEXT_TO_SONG_QUALITY_METABOLIZE_RESEARCH_SNAP.md](OPEN_SOURCE_TEXT_TO_SONG_QUALITY_METABOLIZE_RESEARCH_SNAP.md)):

| Engine | Role | Quality | Notes |
|--------|------|---------|--------|
| **HeartMuLa** | Lyrics-to-song, full vocals + accompaniment | Suno/Udio-level; Apache 2.0 | First choice for layered vocals + music; 6 min; multi-language. |
| **ACE-Step** | Lyric-to-vocal, voice cloning, fast | Diffusion; fine-grained | ~4 min in ~20 s; 17 languages; Apache 2.0. |
| **AudioCraft (Meta)** | MusicGen + EnCodec | Instrumental + codec | MusicGen = text-to-music; EnCodec = high-fidelity compression; layer with vocal pipeline. |
| **Bark (Suno)** | Text-to-audio, singing | MIT; speech + music + SFX | Multilingual; singing via tokens; can layer with MusicGen. |

**Implementation:** Backend already uses **HeartMuLa** (when HEARTMULA_API_URL set) for full song with vocals. **New endpoint** [api/music/generate-studio.js](api/music/generate-studio.js) is the **canonical studio-quality tier** — same backends, explicit project lead and endpoint name; future expansion can add ACE-Step or Bark for dedicated vocal layering without changing contract.

---

## NEW ENDPOINT — HERO JO GOLDEN BACKDOOR STUDIO

- **Route:** `POST /api/music/generate-studio`
- **Purpose:** Text-to-viral-pop-quality WAV; beautiful clean layered precision vocals and music; full studio quality.
- **Body:** `{ prompt: string, duration?: number (5–30 s), lyrics?: string }`
- **Response (200):** `{ url: string, backend?: 'heartmula'|'replicate', project_lead: "Hero Rick", endpoint: "Hero Jo Golden Backdoor Studio" }`
- **Response (501):** `{ error: string, project_lead, endpoint }` when neither HEARTMULA_API_URL nor REPLICATE_API_TOKEN is set.
- **Env:** Same as [api/music/generate.js](api/music/generate.js) — HEARTMULA_API_URL, REPLICATE_API_TOKEN. Prefer HeartMuLa for vocals + music; fallback to Replicate MusicGen (instrumental).

---

## PROJECT LEAD & REPORTING

**Hero Rick** — Exec Producer; project lead of this upgrade. **Reports to Hero Jo.** **Hero Jo reports to Chairman Creator (me).** All **master musicians** (1–12) under Hero Rick's exec producer direction; squeeze all output to master musicians. Entire engine and experience **SING! nodified** in **NSPFRNP nests**. See [HERO_RICK_PROJECT_LEAD_MUSIC_UPGRADE_SNAP.md](HERO_RICK_PROJECT_LEAD_MUSIC_UPGRADE_SNAP.md) · [SING_NODIFY_TEXT_TO_STUDIO_SONG_ENGINE_NSPFRNP_NESTS_SNAP.md](SING_NODIFY_TEXT_TO_STUDIO_SONG_ENGINE_NSPFRNP_NESTS_SNAP.md).

---

## FULL IMPLEMENTATION NOW

1. **API:** [api/music/generate-studio.js](api/music/generate-studio.js) — live; returns `project_lead` and `endpoint` in every response.
2. **Protocol:** [protocols/TEXT_TO_SONG_STUDIO_QUALITY_HERO_JO_GOLDEN_BACKDOOR.md](protocols/TEXT_TO_SONG_STUDIO_QUALITY_HERO_JO_GOLDEN_BACKDOOR.md).
3. **Front-end:** Text-to-Track Motor can call `/api/music/generate-studio` for studio-quality tier (Hero Jo Golden Backdoor Studio); same request/response shape as `/api/music/generate` plus `project_lead` and `endpoint`.
4. **Catalogs & SNAP:** This SNAP; Hero Rick SNAP; OPEN_SOURCE research; TEXT_TO_TRACK_MOTOR and BREAKOUT_VIRAL_HIT_QUALITY SNAPs updated to reference new endpoint.

---

## CROSS-REFERENCES

- [HERO_RICK_PROJECT_LEAD_MUSIC_UPGRADE_SNAP.md](HERO_RICK_PROJECT_LEAD_MUSIC_UPGRADE_SNAP.md)
- [HERO_JO_GOLDEN_BACKDOOR_STUDIOS_SNAP.md](HERO_JO_GOLDEN_BACKDOOR_STUDIOS_SNAP.md) · [CHAIRMAN_FRANKIES_GOLDEN_BACKDOOR_STUDIOS_SNAP.md](CHAIRMAN_FRANKIES_GOLDEN_BACKDOOR_STUDIOS_SNAP.md)
- [OPEN_SOURCE_TEXT_TO_SONG_QUALITY_METABOLIZE_RESEARCH_SNAP.md](OPEN_SOURCE_TEXT_TO_SONG_QUALITY_METABOLIZE_RESEARCH_SNAP.md)
- [TEXT_TO_TRACK_MOTOR_SEED_EDGE_PRODUCTION_WAV_SNAP.md](TEXT_TO_TRACK_MOTOR_SEED_EDGE_PRODUCTION_WAV_SNAP.md)
- [BREAKOUT_VIRAL_HIT_QUALITY_NO_LESS_ALWAYS_ALL_SONGS_SNAP.md](BREAKOUT_VIRAL_HIT_QUALITY_NO_LESS_ALWAYS_ALL_SONGS_SNAP.md)

---

**NSPFRNP ⊃ Music WAV upgrade ⊃ Studio quality ⊃ Hero Jo Golden Backdoor Studio ⊃ Hero Rick ⊃ Full implementation now → ∞³**
