/**
 * Aurora 3D Holograph — Bison Manifest
 * Project Bison & Campfire (Agüeybaná el Gran Sol 1493 Legacy)
 * Global Omni-Reveal — The Planet is the Screen. The Sun is the Projector.
 *
 * 3D wireframe Bison mesh; vertices mapped to global ionospheric F-layer (planetary scale).
 * Northern/Southern auroral oval (65–70° N/S) expanded to full F-layer crown.
 * THE BISON: Global crimson halo — Earth's Crown. Top-down visible (Satellite/ISS/Lunar).
 * THE CAMPFIRE: Violet 'Ring of Fire' at base of atmosphere.
 * Bearing: un-anchored (no 185° Reno lock). The Bison is the Earth's Shadow.
 */

export const AURORAL_OVAL_LAT_MIN = 65;
export const AURORAL_OVAL_LAT_MAX = 70;
/** Global ionospheric F-layer altitude (km) — Bison silhouette mapped at planetary scale. */
export const IONOSPHERIC_F_LAYER_ALT_KM = 250;
export const SCHUMANN_BASELINE_HZ = 7.83;
export const GOLDEN_RATIO = 1.618;

/** Legacy: former Reno Zenith bearing (185°). Un-anchored — Bison is now global; no single-point lock. */
export const BISON_BEARING_LEGACY_RENO_DEG = 185;
/** Bison eyes: Oxygen-Red (630 nm) — Crimson halo, Earth's Crown. */
export const BISON_EYES_WAVELENGTH_NM = 630;
/** Space-grade luminosity: sufficient for top-down visibility (Satellite/ISS/Lunar observers). 4× baseline. */
export const BISON_EYES_LUMINOSITY_MULTIPLIER = 4;
/** Bison skin: Neon Nitrogen Blue (427 nm). */
export const BISON_SKIN_WAVELENGTH_NM = 427;
/** Campfire: Violet Ring of Fire at base of atmosphere (wavelength nm). */
export const CAMPFIRE_RING_VIOLET_NM = 400;
/** TAINO RESONANCE — Zenith Empowerment: Maximize violet Campfire luminosity (fire of the Borikén people) over Reno and San Juan simultaneously. Multiplier applied at Reno zenith and San Juan zenith during SB LX Halftime. */
export const CAMPFIRE_TAINO_ZENITH_EMPOWERMENT_MULTIPLIER = 2;
/** TAINO RESONANCE — Fractal Sync: SING! Agent flicker-rate aligns to Bad Bunny BPM during Halftime. Reference BPM for halftime override (feat: Taino Fractal Sync). */
export const HALFTIME_BAD_BUNNY_BPM = 98;
/** Ancestral Overlay: Agüeybaná 1493 fractal geometry in Global Wrap (replaces generic branding). See data/aurora_pole_projection.json + Global Omni-Reveal; geometry source Agüeybaná 1493. */
export const AGUEYBANA_1493_FRACTAL_IN_GLOBAL_WRAP = true;
/** Night-time Wow intensity boost (hour in PST). */
export const HOUDINI_WOW_BOOST_PST_HOUR = 19;
/** Legacy: Big Daddy Lock removed. Global Omni-Reveal — no single-window phase lock. */
export const BIG_DADDY_LOCK_PHASE_LOCK_TO_PROPRIETOR_WINDOW = false;

/** Resolution Lock: 1.5 km/voxel during Feb 5th CME Impact. */
export const VOLUMETRIC_RESOLUTION_KM_PER_VOXEL_CME_FEB5 = 1.5;

/**
 * Pole projection — full picture quality.
 * These assets are used for the actual projected holographs at North/South poles (ionospheric F-layer),
 * not just the landing page. Wireframe from this module gives lat/long placement; the visual at those
 * coordinates is filled from these reference images (crimson halo for Bison, violet ring for Campfire).
 */
export const POLE_PROJECTION_BISON_ASSET = 'interfaces/assets/bison-holograph-reference.png';
export const POLE_PROJECTION_CAMPFIRE_ASSET = 'interfaces/assets/campfire-ring-reference.png';
export const POLE_PROJECTION_SPEC_PATH = 'data/aurora_pole_projection.json';

/** Feb 5, 2026 CME Impact window (UTC date string for resolution lock). */
export const CME_IMPACT_FEB5_DATE = '2026-02-05';

/** X-class CME intensity scale (e.g. X8.1 => 8.1). Used for Abundance Glow. */
export function cmeIntensityToGlowScale(xClass: number): number {
  return Math.min(10, Math.max(1, xClass));
}

/**
 * Bison stance: 'default' | 'gathering' | 'running'.
 * Gathering = head lowered, legs gathered, over northern horizon (Upper Bound).
 * Running = Bison running; legs in motion, body forward; included in broadcast.
 */
export type BisonStance = 'default' | 'gathering' | 'running';

/**
 * Simplified 3D wireframe Bison mesh (normalized -1..1 box).
 * Body, head, hump, four legs. Each vertex [x, y, z] normalized.
 */
export const BISON_WIREFRAME: { vertices: [number, number, number][]; edges: [number, number][] } = {
  vertices: [
    [0, 0.2, 0],      // 0  body center
    [-0.35, 0.15, 0], // 1  body L
    [0.35, 0.15, 0],  // 2  body R
    [-0.4, 0.35, 0],  // 3  hump L
    [0.4, 0.35, 0],   // 4  hump R
    [-0.5, 0.5, 0],   // 5  head L
    [0.5, 0.5, 0],    // 6  head R
    [0.55, 0.55, 0],  // 7  nose
    [-0.35, -0.35, 0.15],  // 8  leg FL
    [0.35, -0.35, 0.15],   // 9  leg FR
    [-0.35, -0.35, -0.15], // 10 leg RL
    [0.35, -0.35, -0.15],  // 11 leg RR
  ],
  edges: [
    [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 6], [5, 6], [5, 7], [6, 7],
    [1, 8], [2, 9], [1, 10], [2, 11], [8, 10], [9, 11],
  ],
};

/**
 * Bison 'gathering' stance — head lowered, legs gathered, over northern horizon.
 * Vertices adjusted: head/nose lower (y-), legs drawn in (z+ toward viewer).
 */
export const BISON_GATHERING_WIREFRAME: { vertices: [number, number, number][]; edges: [number, number][] } = {
  vertices: [
    [0, 0.25, 0],      // 0  body center (slightly raised)
    [-0.35, 0.2, 0],   // 1  body L
    [0.35, 0.2, 0],    // 2  body R
    [-0.38, 0.38, 0],  // 3  hump L
    [0.38, 0.38, 0],   // 4  hump R
    [-0.48, 0.48, 0],  // 5  head L (gathering: lowered)
    [0.48, 0.48, 0],   // 6  head R
    [0.5, 0.5, -0.08], // 7  nose (dipped toward north horizon)
    [-0.3, -0.3, 0.12],   // 8  leg FL (gathered toward body)
    [0.3, -0.3, 0.12],    // 9  leg FR
    [-0.3, -0.3, -0.12],  // 10 leg RL (gathered)
    [0.3, -0.3, -0.12],   // 11 leg RR
  ],
  edges: BISON_WIREFRAME.edges,
};

/**
 * Bison 'running' stance — legs in motion, body forward. Guardian of the Stage in motion.
 * Vertices: legs extended in run cycle, nose forward, hump dynamic.
 */
export const BISON_RUNNING_WIREFRAME: { vertices: [number, number, number][]; edges: [number, number][] } = {
  vertices: [
    [0.08, 0.2, 0],     // 0  body center (forward)
    [-0.35, 0.15, 0],   // 1  body L
    [0.38, 0.15, 0],    // 2  body R (forward)
    [-0.4, 0.35, 0],    // 3  hump L
    [0.42, 0.35, 0],    // 4  hump R
    [-0.48, 0.5, 0],    // 5  head L
    [0.52, 0.5, 0],     // 6  head R (forward)
    [0.58, 0.52, 0],    // 7  nose (forward, running)
    [-0.38, -0.38, 0.18],   // 8  leg FL (extended)
    [0.38, -0.32, 0.12],    // 9  leg FR (stride)
    [-0.35, -0.35, -0.18],  // 10 leg RL (stride)
    [0.35, -0.38, -0.12],   // 11 leg RR (extended)
  ],
  edges: BISON_WIREFRAME.edges,
};

/**
 * Map a normalized coordinate component (e.g. -1..1) to auroral oval latitude (65–70°).
 * Uses Northern oval band; for Southern use negative lat.
 */
export function mapToAuroralLat(normalizedY: number, northern = true): number {
  const t = (normalizedY + 1) / 2;
  const lat = AURORAL_OVAL_LAT_MIN + t * (AURORAL_OVAL_LAT_MAX - AURORAL_OVAL_LAT_MIN);
  return northern ? lat : -lat;
}

/**
 * Map normalized X to longitude 0–360 (wraps).
 */
export function mapToAuroralLong(normalizedX: number): number {
  return ((normalizedX + 1) * 180) % 360;
}

/**
 * Map all Bison wireframe vertices to lat/long in the expanded auroral oval (65–70° N/S).
 * Returns array of { lat, long } in degrees.
 */
export function bisonVerticesToAuroralOval(northern = true): { lat: number; long: number }[] {
  return BISON_WIREFRAME.vertices.map(([x, y]) => ({
    lat: mapToAuroralLat(y, northern),
    long: mapToAuroralLong(x),
  }));
}

/**
 * Abundance Glow intensity (0–1) from CME X-class (e.g. 8.1 for X8.1).
 */
export function abundanceGlowIntensity(cmeXClass: number): number {
  const scale = cmeIntensityToGlowScale(cmeXClass);
  return Math.min(1, scale / 10);
}

/**
 * Aurora 3D Holograph — Bison state for rendering.
 * Harry Houdini Magic Presents: Bison bearing 185° (Reno Zenith / Big Daddy); eyes 630 nm, skin 427 nm.
 */
export interface AuroraBisonState {
  vertices: { lat: number; long: number }[];
  edges: [number, number][];
  abundanceGlow: number;
  cmeXClass: number;
  stance: BisonStance;
  /** Northern horizon: Bison in gathering stance over north. */
  overNorthernHorizon: boolean;
  /** Bearing in degrees — Direct Reno Zenith (185° = looking at Big Daddy / Reno Base Station). */
  bearingDeg?: number;
  /** Eyes wavelength (nm) — Oxygen-Red 630 nm Big Chief intensity. */
  eyesWavelengthNm?: number;
  /** Eyes luminosity multiplier (1 = baseline; 3 = +300% for Reno Zenith when charts quiet). */
  eyesLuminosityMultiplier?: number;
  /** Skin wavelength (nm) — Neon Nitrogen Blue 427 nm. */
  skinWavelengthNm?: number;
}

function bisonVerticesToAuroralOvalFromWireframe(
  wireframe: { vertices: [number, number, number][] },
  northern: boolean
): { lat: number; long: number }[] {
  return wireframe.vertices.map(([x, y]) => ({
    lat: mapToAuroralLat(y, northern),
    long: mapToAuroralLong(x),
  }));
}

function getWireframeForStance(stance: BisonStance): { vertices: [number, number, number][]; edges: [number, number][] } {
  if (stance === 'gathering') return BISON_GATHERING_WIREFRAME;
  if (stance === 'running') return BISON_RUNNING_WIREFRAME;
  return BISON_WIREFRAME;
}

/**
 * Build full Bison manifest state for the given CME intensity (e.g. 8.1 for X8.1).
 * Upper Bound: stance 'gathering' renders Bison over northern horizon; 'running' = Bison running (included in broadcast).
 */
export function getAuroraBisonState(
  cmeXClass: number,
  northernOval = true,
  stance: BisonStance = 'gathering'
): AuroraBisonState {
  const wireframe = getWireframeForStance(stance);
  return {
    vertices: bisonVerticesToAuroralOvalFromWireframe(wireframe, northernOval),
    edges: wireframe.edges,
    abundanceGlow: abundanceGlowIntensity(cmeXClass),
    cmeXClass,
    stance,
    overNorthernHorizon: northernOval && (stance === 'gathering' || stance === 'running'),
    bearingDeg: undefined, // Un-anchored: Global Omni-Reveal — Bison is Earth's Shadow
    eyesWavelengthNm: BISON_EYES_WAVELENGTH_NM,
    eyesLuminosityMultiplier: BISON_EYES_LUMINOSITY_MULTIPLIER,
    skinWavelengthNm: BISON_SKIN_WAVELENGTH_NM,
  };
}

/**
 * Volumetric render resolution (km/voxel). Resolution Lock: 1.5 during Feb 5th CME.
 */
export function getVolumetricResolutionKmPerVoxel(dateUtc?: Date): number {
  const d = dateUtc || new Date();
  const iso = d.toISOString().slice(0, 10);
  if (iso === CME_IMPACT_FEB5_DATE) {
    return VOLUMETRIC_RESOLUTION_KM_PER_VOXEL_CME_FEB5;
  }
  return 2.0; // default
}
