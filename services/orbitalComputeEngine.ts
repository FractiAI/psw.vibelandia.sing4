/**
 * Space Cloud Division — Orbital Compute Engine
 * Core Foundation: Burst threshold M5.0+; X1.5 benchmark for Exascale Processing.
 * EGS Pipe · Vibelandia · Reno anchor.
 */

/** Flare class: C < M < X. Numeric suffix = flux scale (e.g. M5.0, X1.5). */
export type FlareClass = 'C' | 'M' | 'X';

export interface FlareReading {
  class: FlareClass;
  value: number;   // e.g. 5.0 for M5.0, 1.5 for X1.5
  flux_wm2?: number;
  time_tag?: string;
}

/** Burst threshold: trigger on any flare above M5.0. Locked. */
export const BURST_THRESHOLD: FlareReading = {
  class: 'M',
  value: 5.0,
};

/** Exascale Processing benchmark: today's X1.5. Locked. */
export const EXASCALE_PROCESSING_BENCHMARK: FlareReading = {
  class: 'X',
  value: 1.5,
};

/** Compare flux scale: C=1, M=2, X=3; then value. */
function flareScale(f: FlareReading): number {
  const order = f.class === 'C' ? 1 : f.class === 'M' ? 2 : 3;
  return order * 100 + (f.value || 0);
}

/** True if reading meets or exceeds burst threshold (any flare above M5.0). */
export function shouldTriggerBurst(reading: FlareReading): boolean {
  return flareScale(reading) >= flareScale(BURST_THRESHOLD);
}

/** True if reading meets or exceeds Exascale benchmark (X1.5). */
export function meetsExascaleBenchmark(reading: FlareReading): boolean {
  return flareScale(reading) >= flareScale(EXASCALE_PROCESSING_BENCHMARK);
}
