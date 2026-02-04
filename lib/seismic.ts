/**
 * Seismic Integration — Space Cloud Division V1.1
 * Connects to live USGS feed. Reno-local synchronization baseline: Magnitude 1.5+
 * (Current reference: 1.9 Fish Springs). NOAA/USGS Verified Foundation — Feb 4, 2026.
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

/**
 * Map a USGS feature to RenoLocalSeismicEvent if magnitude >= baseline.
 */
export function toRenoLocalEvent(f: UsgsFeature): RenoLocalSeismicEvent | null {
  const mag = f.properties?.mag;
  if (mag == null || mag < RENO_BASELINE_MAGNITUDE) return null;
  const coords = f.geometry?.coordinates;
  if (coords && !isInRenoBox(coords)) return null;
  const time = f.properties?.time;
  const timeUtc = time != null ? new Date(time).toISOString() : new Date().toISOString();
  return {
    magnitude: mag,
    place: f.properties?.place ?? null,
    timeUtc,
    lat: coords?.[1],
    lon: coords?.[0],
    aboveBaseline: true,
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
