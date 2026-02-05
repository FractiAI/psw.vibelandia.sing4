/**
 * Aurora 3D Holograph — Bison Manifest
 * Project Bison (Agüeybaná 1493 Legacy)
 * Feb 5 CME Impact / Auroral Oval Saturation
 *
 * 3D wireframe Bison mesh; vertices mapped to auroral oval lat/long (65–70° N/S).
 * Abundance Glow scaled to incoming X-class CME intensity (e.g. X8.1).
 */

export const AURORAL_OVAL_LAT_MIN = 65;
export const AURORAL_OVAL_LAT_MAX = 70;
export const SCHUMANN_BASELINE_HZ = 7.83;
export const GOLDEN_RATIO = 1.618;

/** X-class CME intensity scale (e.g. X8.1 => 8.1). Used for Abundance Glow. */
export function cmeIntensityToGlowScale(xClass: number): number {
  return Math.min(10, Math.max(1, xClass));
}

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
 */
export interface AuroraBisonState {
  vertices: { lat: number; long: number }[];
  edges: [number, number][];
  abundanceGlow: number;
  cmeXClass: number;
}

/**
 * Build full Bison manifest state for the given CME intensity (e.g. 8.1 for X8.1).
 */
export function getAuroraBisonState(cmeXClass: number, northernOval = true): AuroraBisonState {
  return {
    vertices: bisonVerticesToAuroralOval(northernOval),
    edges: BISON_WIREFRAME.edges,
    abundanceGlow: abundanceGlowIntensity(cmeXClass),
    cmeXClass,
  };
}
