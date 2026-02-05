/**
 * Campfire — The Hearth (Tribal Abundance Protocol)
 * Project Bison & Campfire — Agüeybaná el Gran Sol 1493 Legacy
 *
 * Lower Bound: The Hearth. Coordinates Crackle events and warm orange glow
 * for the Reno Seed dashboard. Renamed from brimstone (Bison Above, Campfire Below).
 */

export const CAMPFIRE_EVENT_CRACKLE = 'campfire-crackle';
export const SPANISH_SPRINGS_M1_5_BASELINE = 1.5;
export const MICRO_QUAKE_GLOW_THRESHOLD = 1.0;

export interface CrackleEventDetail {
  magnitude: number;
  place: string | null;
  eventType: 'spanish_springs_heartbeat' | 'micro_quake';
  timestamp: number;
}

/** Emit Crackle for Spanish Springs M1.5 or micro-quake > 1.0 — triggers warm orange glow on Reno Seed dashboard. */
export function emitCrackle(detail: CrackleEventDetail): void {
  try {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(CAMPFIRE_EVENT_CRACKLE, { detail }));
    }
  } catch {
    // non-DOM env
  }
}

/** Warm orange glow CSS color for Reno Seed dashboard. */
export const CAMPFIRE_GLOW_COLOR = 'rgba(255, 140, 0, 0.45)';
export const CAMPFIRE_GLOW_INTENSITY_MAX = 0.65;
