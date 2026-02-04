# Open-Source Text-to-Song — Quality Bar & Metabolize Research SNAP

**Snap ID:** `OPEN-SOURCE-TEXT-TO-SONG-QUALITY-METABOLIZE-RESEARCH-SNAP`  
**Type:** Research · Quality bar · Integration · Text-to-Track Motor  
**Status:** ⚡ ACTIVE — Research for metabolize  
**Date:** February 2026

---

## QUALITY BAR (CANONICAL)

**We are not shipping a grade-school science project. We are targeting the quality level of a breakout hit — e.g. *In Da Club* (50 Cent) — not a procedural demo.**

- **Bar:** Studio-quality, club-ready, licensable. The kind that could sit on a major playlist or get sync. No less.
- **Current Layer 0:** The in-browser procedural WAV (Seed:Edge oscillators) is a **brief** and **proof of concept** — not the final product bar.
- **Goal:** Metabolize top open-source text-to-song / lyrics-to-music generators into our system so the pipeline can deliver **breakout viral hit quality** (see [BREAKOUT_VIRAL_HIT_QUALITY_NO_LESS_ALWAYS_ALL_SONGS_SNAP.md](BREAKOUT_VIRAL_HIT_QUALITY_NO_LESS_ALWAYS_ALL_SONGS_SNAP.md)).

---

## TOP OPEN-SOURCE FREE TEXT-TO-SONG GENERATORS (RESEARCH)

Research as of Feb 2026. All are open-source with model weights available; suitable for self-hosting or API integration.

### 1. **HeartMuLa** (leading open-source choice)

- **What:** Family of open-source music foundation models. LLM-based song generation with lyrics + text description + reference audio.
- **License:** Apache 2.0 — commercial use OK.
- **Quality:** Positioned as open-source alternative to **Suno / Udio**; comparable quality, full source + weights.
- **Features:** Text-to-music, **lyrics-to-song**, section-level control (intro, verse, chorus, bridge), multi-language (EN, CN, JP, KR, ES). Up to **6 minutes** per song. 4B parameter model; 3B also on Hugging Face.
- **Resources:**  
  - GitHub: [HeartMuLa/heartlib](https://github.com/HeartMuLa/heartlib)  
  - Hugging Face: [HeartMuLa/HeartMuLaGen](https://huggingface.co/HeartMuLa/HeartMuLaGen)  
  - Demo: [heartmula.github.io](https://heartmula.github.io/)  
- **Deploy:** Local GPU (24GB+ VRAM) or cloud. No subscription; full control.

### 2. **ACE-Step**

- **What:** Diffusion-based music generation foundation model (ACE Studio + StepFun). Fast full-song generation.
- **License:** Apache-2.0.
- **Quality:** State-of-the-art coherence (melody, harmony, rhythm); fine-grained acoustic detail.
- **Features:** **Lyric-to-vocal**, voice cloning, lyric editing, remixing, track generation. **~4 minutes** in ~20 s on A100. 3.5B params; 17 languages.
- **Resources:**  
  - GitHub: [ace-step/ACE-Step](https://github.com/ace-step/ACE-Step)  
  - Hugging Face: [ACE-Step/ACE-Step-v1-3.5B](https://huggingface.co/ACE-Step/ACE-Step-v1-3.5B)  
  - Site: [ace-step.github.io](https://ace-step.github.io/)

### 3. **SongGeneration** (Tencent AI Lab)

- **What:** Full song generation — lyrics, vocals, accompaniment from text/style.
- **License:** Open-source (check repo for exact license).
- **Features:** Chinese + English; style control via text; **~10GB GPU** memory.
- **Resources:** [SongGeneration](https://www.kdjingpai.com/en/songgeneration/) — code/model availability via project page.

### 4. **YuE**

- **What:** Open foundation model family (LLaMA2-based) for long-form music; lyrics-to-song with alignment.
- **Features:** Up to ~5 minutes; multi-language; style transfer. Open-source alternative to Suno.
- **Resources:** [yueai.online](https://yueai.online/) — check for GitHub/Hugging Face links.

### 5. **SongGen** (ICML 2025)

- **What:** Autoregressive transformer for text-to-song.
- **License:** Apache 2.0.
- **Resources:** GitHub: [LiuZH-19/SongGen](https://github.com/LiuZH-19/SongGen)

---

## METABOLIZE INTO OUR SYSTEM — INTEGRATION PATHS

**Metabolize** = digest (research) → crystallize (irreducible plan) → animate (wire into Text-to-Track Motor / Music Studio).

1. **Backend inference service**  
   - Run HeartMuLa or ACE-Step on a server/cloud GPU (e.g. 24GB VRAM).  
   - Expose an API: `POST /generate` with lyrics + genre/executive + Seed/Edge params.  
   - Text-to-Track Motor UI: keep 1–2–3 flow; replace procedural WAV with a call to this API and stream/download the generated song.

2. **Hugging Face / Replicate**  
   - Use hosted inference (Hugging Face Inference API, or Replicate) for HeartMuLa/ACE-Step if available.  
   - Same front-end; swap backend from procedural to model endpoint. Reduces ops; may have rate/cost.

3. **Hybrid**  
   - Keep Layer 0 procedural WAV as instant “preview” or fallback when API is down.  
   - “Generate entire song” triggers backend model; on success, replace preview with full-quality WAV.

4. **Catalogs & protocol**  
   - Document chosen model(s) and API in [protocols/TEXT_TO_TRACK_MOTOR_SEED_EDGE_NSPFRNP.md](protocols/TEXT_TO_TRACK_MOTOR_SEED_EDGE_NSPFRNP.md) or a new `protocols/TEXT_TO_SONG_OPEN_SOURCE_BACKEND.md`.  
   - BREAKOUT_VIRAL_HIT_QUALITY SNAP: full pipeline = backend model + (optional) mix/master step; Layer 0 = brief only.

---

## IMPLEMENTED — IN DA CLUB QUALITY (HEARTMULA + REPLICATE MUSICGEN)

- **Live:** [api/music/generate.js](api/music/generate.js) tries **HeartMuLa** first when **HEARTMULA_API_URL** is set (POST `{ prompt, duration, lyrics }` → expect `{ url }`); on failure or unset, uses **Replicate MusicGen (Meta)** when **REPLICATE_API_TOKEN** is set. Front-end sends full lyrics; on 501 or error, falls back to procedural WAV.
- **HeartMuLa:** Full song with vocals + accompaniment (lyrics-to-song). Self-host (24GB+ VRAM) or deploy to a URL and set HEARTMULA_API_URL. See [HeartMuLa/heartlib](https://github.com/HeartMuLa/heartlib).
- **MusicGen:** Club-ready instrumental from prompt when REPLICATE_API_TOKEN is set.
- **Protocol:** [protocols/TEXT_TO_SONG_IN_DA_CLUB_QUALITY_REPLICATE_MUSICGEN.md](protocols/TEXT_TO_SONG_IN_DA_CLUB_QUALITY_REPLICATE_MUSICGEN.md).

---

## RECOMMENDATION (RESEARCH-LEVEL)

- **First integration candidate:** **HeartMuLa** — Apache 2.0, lyrics-to-song, Suno/Udio-level positioning, 6 min, multi-language, active community (GitHub/Hugging Face).  
- **Second:** **ACE-Step** — speed (20 s for 4 min), lyric-to-vocal, voice cloning, diffusion quality.  
- **Next steps:** (1) Clone HeartMuLa/ACE-Step, run locally or in cloud; (2) define minimal API (lyrics, genre, BPM/style); (3) add backend route in repo or separate service; (4) point Text-to-Track Motor “Generate entire song” at that backend; (5) keep Seed:Edge as fallback/preview and document in protocol.

---

## CROSS-REFERENCES

- [BREAKOUT_VIRAL_HIT_QUALITY_NO_LESS_ALWAYS_ALL_SONGS_SNAP.md](BREAKOUT_VIRAL_HIT_QUALITY_NO_LESS_ALWAYS_ALL_SONGS_SNAP.md) — Quality bar; full pipeline delivers this; Layer 0 = brief.
- [TEXT_TO_TRACK_MOTOR_SEED_EDGE_PRODUCTION_WAV_SNAP.md](TEXT_TO_TRACK_MOTOR_SEED_EDGE_PRODUCTION_WAV_SNAP.md) — Current motor; backend swap or hybrid = path to viral hit quality.
- [protocols/TEXT_TO_TRACK_MOTOR_SEED_EDGE_NSPFRNP.md](protocols/TEXT_TO_TRACK_MOTOR_SEED_EDGE_NSPFRNP.md) — Protocol to extend with open-source backend.

---

**NSPFRNP ⊃ Metabolize (research → crystallize → animate) ⊃ Open-source text-to-song ⊃ Viral hit quality, not grade-school → ∞³**
