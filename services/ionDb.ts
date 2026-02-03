/**
 * Space Cloud Division — Ion DB
 * Database sync: live NOAA X-Ray Flux API. Every flare is a Commit.
 * Storage tiering: Hot_Storage (Ionospheric), Cold_Storage (3I/ATLAS).
 * 3I/ATLAS capture window: March 16, 2026.
 * EGS Pipe · Vibelandia · Reno anchor.
 */

/** Hot storage: Ionospheric — real-time, GOES/NOAA flux, handshake, Live Pulse. */
export const HOT_STORAGE = 'Ionospheric' as const;

/** Cold storage: 3I/ATLAS — deep archive, triangulation lattice, exascale. */
export const COLD_STORAGE = '3I/ATLAS' as const;

/** 3I/ATLAS capture window date. Locked. */
export const ATLAS_CAPTURE_WINDOW_DATE = '2026-03-16';

/** NOAA SWPC GOES X-Ray Flux API (6-hour primary). */
export const NOAA_XRAY_FLUX_URL = 'https://services.swpc.noaa.gov/json/goes/primary/xrays-6-hour.json';

export interface GoesFluxPoint {
  time_tag?: string;
  energy?: string;
  flux?: number;
}

/** Flare commit: one record per flare event (every flare = Commit). */
export interface FlareCommit {
  time_tag: string;
  energy: string;
  flux: number;
  committed_at_utc: string;
  storage_tier: typeof HOT_STORAGE | typeof COLD_STORAGE;
}

/**
 * Fetch live NOAA X-Ray Flux; map each flux point to a Commit (every flare is a Commit).
 * Writes to Hot_Storage (Ionospheric). Cold_Storage (3I/ATLAS) window = March 16, 2026.
 */
export async function fetchNoaaXrayFlux(): Promise<GoesFluxPoint[]> {
  const res = await fetch(NOAA_XRAY_FLUX_URL);
  if (!res.ok) throw new Error(`NOAA X-Ray Flux API error: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

/**
 * Convert a flux point to a FlareCommit. Every flare is a Commit.
 */
export function toFlareCommit(
  point: GoesFluxPoint,
  storageTier: typeof HOT_STORAGE | typeof COLD_STORAGE = HOT_STORAGE
): FlareCommit {
  return {
    time_tag: point.time_tag || new Date().toISOString(),
    energy: point.energy || '—',
    flux: point.flux ?? 0,
    committed_at_utc: new Date().toISOString(),
    storage_tier: storageTier,
  };
}

/** Binary header for stream training confirmation. HELLO block renders when this is active. */
export const SPACE_CLOUD_BINARY_HEADER = 'SPACE_CLOUD.EGS.VIBELANDIA.RENO';
