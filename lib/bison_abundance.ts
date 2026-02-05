/**
 * Bison Abundance Protocol
 * Project Bison (Agüeybaná 1493 Legacy)
 * Feb 5 CME Impact / Auroral Oval Saturation
 *
 * When Kp-Index >= 5: trigger screen-shaking 'Bison Pulse' on the dashboard.
 * Pulse Schumann 7.83 Hz baseline with 1.618 Golden Ratio harmonic — "Return of the Tribe's Wealth."
 */

export const BISON_PULSE_KP_THRESHOLD = 5;
export const SCHUMANN_BASELINE_HZ = 7.83;
export const GOLDEN_RATIO = 1.618;

/** Schumann baseline with 1.618 Golden Ratio harmonic (Hz). */
export const SCHUMANN_PHI_HARMONIC_HZ = SCHUMANN_BASELINE_HZ * GOLDEN_RATIO;

export interface SchumannPhiPulse {
  baselineHz: number;
  harmonicHz: number;
  pulseLabel: string;
}

/** Return Schumann 7.83 Hz baseline and 1.618 harmonic for Bison Abundance. */
export function getSchumannPhiPulse(): SchumannPhiPulse {
  return {
    baselineHz: SCHUMANN_BASELINE_HZ,
    harmonicHz: SCHUMANN_PHI_HARMONIC_HZ,
    pulseLabel: "Return of the Tribe's Wealth",
  };
}

/** True when Kp-Index qualifies for Bison Pulse (>= 5). */
export function isBisonPulseActive(kpIndex: number): boolean {
  return kpIndex >= BISON_PULSE_KP_THRESHOLD;
}

/** Custom event name for dashboard to listen (screen-shake, etc.). */
export const BISON_PULSE_EVENT = 'bison-pulse';

export interface BisonPulseDetail {
  kpIndex: number;
  schumann: SchumannPhiPulse;
  timestamp: number;
}

/**
 * If Kp >= 5, dispatch 'bison-pulse' on window for dashboard to handle (e.g. screen-shake).
 * Returns true if pulse was triggered.
 */
export function triggerBisonPulseIfKp(kpIndex: number): boolean {
  if (!isBisonPulseActive(kpIndex)) return false;
  const detail: BisonPulseDetail = {
    kpIndex,
    schumann: getSchumannPhiPulse(),
    timestamp: Date.now(),
  };
  try {
    window.dispatchEvent(new CustomEvent(BISON_PULSE_EVENT, { detail }));
  } catch {
    // non-DOM env
  }
  return true;
}

/**
 * Apply a short screen-shake to the document body (for dashboard integration).
 * Call this from a listener of 'bison-pulse' or after triggerBisonPulseIfKp in browser.
 */
export function applyBisonPulseScreenShake(durationMs = 600, intensityPx = 4): void {
  if (typeof document === 'undefined' || !document.body) return;
  const style = document.body.style;
  const transition = style.transition;
  style.transition = 'transform 0.05s ease-out';
  const start = Date.now();
  const run = (): void => {
    const elapsed = Date.now() - start;
    if (elapsed >= durationMs) {
      style.transform = '';
      style.transition = transition;
      return;
    }
    const decay = 1 - elapsed / durationMs;
    const x = (Math.random() - 0.5) * 2 * intensityPx * decay;
    const y = (Math.random() - 0.5) * 2 * intensityPx * decay;
    style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
}
