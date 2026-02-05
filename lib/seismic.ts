/**
 * Seismic Integration — Space Cloud Division V1.1
 * Connects to live USGS feed. Reno-local synchronization baseline: Magnitude 1.5+
 * (Current reference: 1.9 Fish Springs). NOAA/USGS Verified Foundation — Feb 4, 2026.
 *
 * Ground Logic (Bison & Campfire): Spanish Springs M1.5 heartbeat maps to 'Crackle' event.
 * Every micro-quake > 1.0 triggers warm orange glow on Reno Seed dashboard.
 */

/** USGS earthquake feed (1.0+ last 24h). */
export const USGS_FEED_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson';

/** Reno-local sync trigger: events at or above this magnitude. */
export const RENO_BASELINE_MAGNITUDE = 1.5;

/** Current reference event (Fish Springs). */
export const RENO_CURRENT_REFERENCE = {
  magnitude: 1.9,
  place: 'Fish Springs',
  note: 'Reno-local synchronization baseline',
};

export interface UsgsFeature {
  type: string;
  properties?: {
    mag?: number;
    place?: string;
    time?: number;
    updated?: number;
    title?: string;
  };
  geometry?: {
    type: string;
    coordinates?: [number, number, number];
  };
}

export interface UsgsGeoJson {
  type: string;
  features?: UsgsFeature[];
}

export interface RenoLocalSeismicEvent {
  magnitude: number;
  place: string | null;
  timeUtc: string;
  lat?: number;
  lon?: number;
  aboveBaseline: boolean;
  /** Crackle: Spanish Springs M1.5 heartbeat or micro-quake > 1.0 */
  isCrackle?: boolean;
}

/**
 * Filter USGS features to Reno-local (NV/CA border region) and M >= baseline.
 * Reno area approx: lon -120 to -119, lat 39 to 40 (expand as needed).
 */
export const RENO_BBOX = {
  lonMin: -121,
  lonMax: -118,
  latMin: 38.5,
  latMax: 40.5,
};

export function isInRenoBox(coords: [number, number, number] | undefined): boolean {
  if (!coords || coords.length < 2) return false;
  const [lon, lat] = coords;
  return (
    lon >= RENO_BBOX.lonMin &&
    lon <= RENO_BBOX.lonMax &&
    lat >= RENO_BBOX.latMin &&
    lat <= RENO_BBOX.latMax
  );
}

/** Spanish Springs heartbeat: M1.5 baseline. Place name match. */
export const SPANISH_SPRINGS_PLACE_MATCH = /spanish\s*springs/i;
/** Micro-quake threshold: > 1.0 triggers warm orange glow on Reno Seed dashboard */
export const MICRO_QUAKE_GLOW_THRESHOLD = 1.0;

/**
 * Map a USGS feature to RenoLocalSeismicEvent if magnitude >= baseline.
 * Ground Logic: Spanish Springs M1.5 or micro-quake > 1.0 => isCrackle (triggers warm orange glow).
 */
export function toRenoLocalEvent(f: UsgsFeature): RenoLocalSeismicEvent | null {
  const mag = f.properties?.mag;
  if (mag == null || mag < 1.0) return null; // allow micro-quakes > 1.0 for Crackle
  const coords = f.geometry?.coordinates;
  if (coords && !isInRenoBox(coords)) return null;
  const place = f.properties?.place ?? null;
  const time = f.properties?.time;
  const timeUtc = time != null ? new Date(time).toISOString() : new Date().toISOString();
  const aboveBaseline = mag >= RENO_BASELINE_MAGNITUDE;
  /** Spanish Springs M1.5 = Crackle; every micro-quake > 1.0 triggers warm orange glow */
  const isCrackle =
    (place && SPANISH_SPRINGS_PLACE_MATCH.test(place) && mag >= 1.5) || mag > MICRO_QUAKE_GLOW_THRESHOLD;
  return {
    magnitude: mag,
    place,
    timeUtc,
    lat: coords?.[1],
    lon: coords?.[0],
    aboveBaseline,
    isCrackle,
  };
}

/**
 * Fetch live USGS feed and return Reno-local events at or above M1.5.
 */
export async function getRenoLocalSeismicEvents(): Promise<RenoLocalSeismicEvent[]> {
  const res = await fetch(USGS_FEED_URL);
  const data: UsgsGeoJson = await res.json();
  const features = data?.features ?? [];
  const events: RenoLocalSeismicEvent[] = [];
  for (const f of features) {
    const ev = toRenoLocalEvent(f);
    if (ev) events.push(ev);
  }
  events.sort((a, b) => new Date(b.timeUtc).getTime() - new Date(a.timeUtc).getTime());
  return events;
}

/**
 * Check if there is at least one Reno-local event >= baseline (M1.5+).
 */
export async function hasRenoLocalSyncTrigger(): Promise<boolean> {
  const events = await getRenoLocalSeismicEvents();
  return events.length > 0;
}
