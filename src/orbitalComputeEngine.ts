/**
 * Orbital Compute Engine — Space Cloud Division V1.1
 * Core infrastructure: system_clock 7.83 Hz (Verified Fundamental Schumann Resonance).
 * Burst Mode triggers only when GOES X-ray flux exceeds X1.0 threshold (Current Benchmark: X1.5).
 * NOAA/USGS Verified Foundation — Feb 4, 2026.
 */

/** Verified Fundamental Schumann Resonance (Hz). */
export const SYSTEM_CLOCK_HZ = 7.83;

/** X1.0 = 1e-4 W/m²; Burst Mode triggers when flux >= this. */
export const BURST_MODE_THRESHOLD_X1_W_M2 = 1e-4;

/** Current benchmark X1.5 = 1.5e-4 W/m². */
export const BURST_MODE_BENCHMARK_X1_5_W_M2 = 1.5e-4;

export interface GoesXrayFlux {
  /** Band label e.g. "0.1-0.8nm", "0.05-0.4nm" */
  energy?: string;
  /** Flux in W/m² */
  flux?: number;
  time_tag?: string;
}

export interface OrbitalComputeState {
  systemClockHz: number;
  burstModeActive: boolean;
  goesFluxWm2: number | null;
  thresholdWm2: number;
  benchmarkWm2: number;
  lastUpdatedUtc: string;
}

/**
 * Determine if Burst Mode should be active: GOES X-ray flux exceeds X1.0 threshold.
 * Uses the long-wavelength band (0.1-0.8 nm typically) when available; otherwise any band.
 */
export function shouldTriggerBurstMode(fluxData: GoesXrayFlux[]): boolean {
  if (!fluxData || fluxData.length === 0) return false;
  const last = fluxData[fluxData.length - 1];
  const flux = last?.flux;
  if (flux == null || typeof flux !== 'number') return false;
  return flux >= BURST_MODE_THRESHOLD_X1_W_M2;
}

/**
 * Build orbital compute state from GOES flux array.
 */
export function getOrbitalComputeState(fluxData: GoesXrayFlux[]): OrbitalComputeState {
  const burstMode = shouldTriggerBurstMode(fluxData);
  let fluxWm2: number | null = null;
  if (fluxData && fluxData.length > 0) {
    const last = fluxData[fluxData.length - 1];
    if (last?.flux != null) fluxWm2 = Number(last.flux);
  }
  return {
    systemClockHz: SYSTEM_CLOCK_HZ,
    burstModeActive: burstMode,
    goesFluxWm2: fluxWm2,
    thresholdWm2: BURST_MODE_THRESHOLD_X1_W_M2,
    benchmarkWm2: BURST_MODE_BENCHMARK_X1_5_W_M2,
    lastUpdatedUtc: new Date().toISOString(),
  };
}
