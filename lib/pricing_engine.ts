/**
 * Solar Ad-Canvas Pricing Engine
 * Project Bison (Agüeybaná 1493 Legacy)
 * Feb 5 CME Impact / Auroral Oval Saturation
 *
 * Solar Billboard (AR4366), Ionosphere Ticker, Aurora 3D Volumetric.
 */

/** Solar Billboard (AR4366) — BTC per X-Class Event */
export const SOLAR_BILLBOARD_AR4366_BTC_PER_X_CLASS = 10.0;

/** Ionosphere Ticker (Ticker-Tape) — BTC per minute */
export const IONOSPHERE_TICKER_BTC_PER_MINUTE = 0.1618;

/** Aurora 3D (Volumetric) — BTC per G-Scale Hour */
export const AURORA_3D_BTC_PER_G_SCALE_HOUR = 1.618;

export interface SolarAdCanvasRates {
  solarBillboardAR4366BtcPerXClass: number;
  ionosphereTickerBtcPerMinute: number;
  aurora3DBtcPerGScaleHour: number;
}

/** Initialize and return canonical Solar Ad-Canvas pricing. */
export function getSolarAdCanvasRates(): SolarAdCanvasRates {
  return {
    solarBillboardAR4366BtcPerXClass: SOLAR_BILLBOARD_AR4366_BTC_PER_X_CLASS,
    ionosphereTickerBtcPerMinute: IONOSPHERE_TICKER_BTC_PER_MINUTE,
    aurora3DBtcPerGScaleHour: AURORA_3D_BTC_PER_G_SCALE_HOUR,
  };
}

/**
 * Compute Solar Billboard cost for one X-class event.
 */
export function solarBillboardCost(xClassEvents: number): number {
  return xClassEvents * SOLAR_BILLBOARD_AR4366_BTC_PER_X_CLASS;
}

/**
 * Compute Ionosphere Ticker cost for duration in minutes.
 */
export function ionosphereTickerCost(minutes: number): number {
  return minutes * IONOSPHERE_TICKER_BTC_PER_MINUTE;
}

/**
 * Compute Aurora 3D (Volumetric) cost for duration in G-Scale hours.
 */
export function aurora3DCost(gScaleHours: number): number {
  return gScaleHours * AURORA_3D_BTC_PER_G_SCALE_HOUR;
}
