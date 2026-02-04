# Text-to-Song — In Da Club Quality (HeartMuLa + Replicate MusicGen)

**Status:** ACTIVE  
**Date:** February 2026

---

## RULE

When **HEARTMULA_API_URL** and/or **REPLICATE_API_TOKEN** is set, the Text-to-Track Motor uses **HeartMuLa** (full song with vocals) or **Replicate MusicGen (Meta)** (club-ready instrumental) to generate **In Da Club quality** music from lyrics + genre + vibe. Without either, the motor falls back to the procedural WAV (Layer 0 brief).

---

## IMPLEMENTATION

- **API route:** [api/music/generate.js](../api/music/generate.js) — POST body: `{ prompt: string, duration?: number, lyrics?: string }`. Tries **HeartMuLa** first when HEARTMULA_API_URL is set; on failure or unset, uses **Replicate MusicGen** when REPLICATE_API_TOKEN is set. Returns `{ url: string, backend?: 'heartmula'|'replicate' }` or 501 if not configured.
- **Front-end:** [interfaces/text-to-track-motor.html](../interfaces/text-to-track-motor.html) — On "Generate entire song", first calls `/api/music/generate` with prompt, duration, and full lyrics. On 200 + url, fetches audio blob and shows download. On 501 or error, falls back to procedural WAV.
- **Env:**  
  - **HEARTMULA_API_URL** — URL of your HeartMuLa backend (self-hosted or hosted). POST with `{ prompt, duration, lyrics }`; expect `{ url: string }` (audio URL). Full song with vocals; lyrics-to-song.  
  - **REPLICATE_API_TOKEN** (from [replicate.com/account](https://replicate.com/account)) — Enables Replicate MusicGen (club-ready instrumental) when HeartMuLa is not set or fails. Optional: **REPLICATE_MUSICGEN_VERSION** to pin model version.

---

## QUALITY

- **HeartMuLa:** Lyrics-to-song, full song with vocals + accompaniment. Apache 2.0; self-host (24GB+ VRAM) or use HEARTMULA_API_URL when you have a deployed backend. See [OPEN_SOURCE_TEXT_TO_SONG_QUALITY_METABOLIZE_RESEARCH_SNAP.md](../OPEN_SOURCE_TEXT_TO_SONG_QUALITY_METABOLIZE_RESEARCH_SNAP.md).
- **MusicGen (Meta):** Text-to-music, ~3.5B params (large), 5–30 s duration, WAV output. Produces **club-ready instrumental** from prompt when REPLICATE_API_TOKEN is set.

---

## CROSS-REFERENCES

- [BREAKOUT_VIRAL_HIT_QUALITY_NO_LESS_ALWAYS_ALL_SONGS_SNAP.md](../BREAKOUT_VIRAL_HIT_QUALITY_NO_LESS_ALWAYS_ALL_SONGS_SNAP.md)
- [OPEN_SOURCE_TEXT_TO_SONG_QUALITY_METABOLIZE_RESEARCH_SNAP.md](../OPEN_SOURCE_TEXT_TO_SONG_QUALITY_METABOLIZE_RESEARCH_SNAP.md)
