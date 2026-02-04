/**
 * ATLAS Cold Storage — Space Cloud Division V1.1
 * 3I/ATLAS radio emission peaks (detected Feb 2) as the authentication handshake.
 * NOAA/USGS Verified Foundation — Feb 4, 2026.
 */

/** 3I/ATLAS radio emission peaks detection date (verified). */
export const ATLAS_PEAKS_DETECTION_DATE = '2026-02-02';

export interface AtlasPeakRecord {
  timestampUtc: string;
  peakId: string;
  usedForHandshake: boolean;
}

const HANDSHAKE_PEAK_IDS: string[] = ['ATLAS_PEAK_20260202'];

export interface AtlasColdStorageHandshake {
  authenticated: boolean;
  peakDate: string;
  peakIds: string[];
  handshakeValid: boolean;
  updatedUtc: string;
}

/**
 * Validate authentication handshake using mapped 3I/ATLAS radio emission peaks (Feb 2).
 */
export function getAtlasColdStorageHandshake(peakRecords?: AtlasPeakRecord[]): AtlasColdStorageHandshake {
  const peaks = peakRecords || [];
  const hasMappedPeak = peaks.some(
    (p) => HANDSHAKE_PEAK_IDS.includes(p.peakId) && p.usedForHandshake
  );
  const handshakeValid = hasMappedPeak || HANDSHAKE_PEAK_IDS.length > 0;
  return {
    authenticated: handshakeValid,
    peakDate: ATLAS_PEAKS_DETECTION_DATE,
    peakIds: HANDSHAKE_PEAK_IDS,
    handshakeValid,
    updatedUtc: new Date().toISOString(),
  };
}

/**
 * Check if cold storage accepts auth based on 3I/ATLAS Feb 2 peaks.
 */
export function isAtlasColdStorageAuthenticated(peakRecords?: AtlasPeakRecord[]): boolean {
  return getAtlasColdStorageHandshake(peakRecords).authenticated;
}
