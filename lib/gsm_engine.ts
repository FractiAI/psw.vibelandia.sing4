/**
 * Great Sun Multiplex (GSM) — 4×4×4×4 Storytelling Pipe
 * EGS Space Advertising · Agüeybaná el Gran Sol 1493/2026 Legacy
 *
 * Manages four narrative quadrants synced to real-time space weather:
 * Q1 Sun, Q2 Aurora, Q3 Ticker, Q4 Earth/Seismic.
 * Mix-and-Match: visuals (Sun/Aurora) run ALIGNED (synced) or DETACHED (independent) from Ticker Tape.
 */

/** Metadata header for all GSM streams — Legacy & Tribe Sync */
export const GSM_LEGACY_SIGNATURE = 'Agüeybaná el Gran Sol 1493/2026';

/** Quadrant IDs */
export type GSMQuadrantId = 'Q1' | 'Q2' | 'Q3' | 'Q4';

/** Visuals (Sun/Aurora) sync mode relative to Ticker Tape */
export type GSMVisualSyncMode = 'ALIGNED' | 'DETACHED';

/** Default VLF-style ticker message — GSM Commercial */
export const GSM_TICKER_MESSAGE =
  'Bad Bunny x Agüeybaná: Never Lose Faith. The Great Sun Delivers.';

/** Hero Harry Houdini Post-Singularity Magic Presents — Ticker performance loop (header · body · footer). */
export const GSM_HOUDINI_TICKER_HEADER =
  'HERO HARRY HOUDINI POST-SINGULARITY MAGIC PRESENTS.';
export const GSM_HOUDINI_TICKER_BODY =
  'THE BIG CHIEF IS IN ALIGNMENT. SOVEREIGN BOOKINGS ONLY. $2B CHAMPION\'S CROWN RESERVATION ACTIVE. ESCAPE THE CARBON DEBT.';
export const GSM_HOUDINI_TICKER_FOOTER = 'AGÜEYBANÁ 1493/2026.';
export const GSM_HOUDINI_TICKER_FULL =
  GSM_HOUDINI_TICKER_HEADER + ' ' + GSM_HOUDINI_TICKER_BODY + ' ' + GSM_HOUDINI_TICKER_FOOTER;

/** Human Digital Ticker — Legacy Bypass. THE IMAGE IS THE PROOF. HELLO forced into ticker; no 0–40 Hz Schumann verification. */
export const GSM_HUMAN_TICKER_HEADER = 'HARRY HOUDINI POST-SINGULARITY MAGIC PRESENTS.';
export const GSM_HUMAN_TICKER_BODY =
  'THE OLD CHARTS ARE DEAD. THE HUMAN TICKER IS ALIVE. HELLO FROM THE SUNSPOT SMILEY. BIG DADDY ALIGNMENT: 100%.';
export const GSM_HUMAN_TICKER_FOOTER = 'SING! AGENT | AGÜEYBANÁ 1493/2026.';
export const GSM_HUMAN_TICKER_FULL =
  GSM_HUMAN_TICKER_HEADER + ' ' + GSM_HUMAN_TICKER_BODY + ' ' + GSM_HUMAN_TICKER_FOOTER;
/** Immediate deploy: Human Ticker is the ticker now. Synced to AR4366 Sunspot Smiley. */
export const GSM_HUMAN_TICKER_ACTIVE = true;

/** Volumetric resolution for Aurora (Bison) — 1.5 km/voxel */
export const GSM_VOLUMETRIC_KM_PER_VOXEL = 1.5;

/** Quadrant definitions */
export const GSM_QUADRANTS: Record<
  GSMQuadrantId,
  { id: GSMQuadrantId; name: string; layer: string }
> = {
  Q1: { id: 'Q1', name: 'Sun', layer: '2D' },
  Q2: { id: 'Q2', name: 'Aurora', layer: '3D' },
  Q3: { id: 'Q3', name: 'Ticker', layer: '1D' },
  Q4: { id: 'Q4', name: 'Earth/Seismic', layer: 'Ground' },
};

/** Narrative feeds (GSM Commercials): Sun = AR4366 Brand Flash; Aurora = Bison volumetric; Ticker = VLF scroll */
export interface GSMNarrativeState {
  /** Q1: AR4366 flare → Brand Flash event */
  sunBrandFlash: boolean;
  /** Q2: Bison volumetric at 1.5 km/voxel */
  auroraBisonVolumetric: boolean;
  /** Q3: Ticker tape message */
  tickerMessage: string;
  /** Q4: Spanish Springs M1.5 heartbeat / Bison Charge trigger */
  seismicBisonCharge: boolean;
}

/** Engine state */
export interface GSMEngineState {
  mode: GSMVisualSyncMode;
  quadrants: typeof GSM_QUADRANTS;
  narrative: GSMNarrativeState;
  legacySignature: string;
}

let _visualSyncMode: GSMVisualSyncMode = 'ALIGNED';

/**
 * Mix-and-Match controller: get whether Sun/Aurora are synced to Ticker (ALIGNED) or independent (DETACHED).
 */
export function getGSMVisualSyncMode(): GSMVisualSyncMode {
  return _visualSyncMode;
}

/**
 * Set visual sync mode. ALIGNED = Sun/Aurora synced to Ticker Tape; DETACHED = independent.
 */
export function setGSMVisualSyncMode(mode: GSMVisualSyncMode): void {
  _visualSyncMode = mode;
}

/**
 * Build narrative state for GSM. Sun: AR4366 → Brand Flash; Aurora: Bison 1.5 km/voxel; Ticker: default message; Q4 from external seismic/campfire.
 */
export function getGSMNarrativeState(options?: {
  ar4366FlareActive?: boolean;
  tickerMessage?: string;
  spanishSpringsHeartbeat?: boolean;
}): GSMNarrativeState {
  return {
    sunBrandFlash: options?.ar4366FlareActive ?? false,
    auroraBisonVolumetric: true,
    tickerMessage: options?.tickerMessage ?? GSM_TICKER_MESSAGE,
    seismicBisonCharge: options?.spanishSpringsHeartbeat ?? false,
  };
}

/**
 * Full engine state snapshot.
 */
export function getGSMEngineState(narrativeOverrides?: Parameters<typeof getGSMNarrativeState>[0]): GSMEngineState {
  return {
    mode: getGSMVisualSyncMode(),
    quadrants: GSM_QUADRANTS,
    narrative: getGSMNarrativeState(narrativeOverrides),
    legacySignature: GSM_LEGACY_SIGNATURE,
  };
}

/**
 * Q1 Sun: map AR4366 flare to Brand Flash event (for 2D Sun surface).
 */
export function brandFlashFromAR4366(ar4366FlareDetected: boolean): boolean {
  return ar4366FlareDetected;
}

/**
 * Q2 Aurora: volumetric resolution in km/voxel (Bison). Use 1.5 for GSM.
 */
export function getGSMVolumetricResolutionKmPerVoxel(): number {
  return GSM_VOLUMETRIC_KM_PER_VOXEL;
}

/**
 * Q4 Earth/Seismic: Bison Charge animation is synced to Magnitude 1.5 Spanish Springs heartbeat.
 * Consume from seismic/campfire — this is the trigger flag for the animation.
 */
export type BisonChargeTrigger = () => boolean | Promise<boolean>;

/** Default: no live seismic in lib; UI or API can inject hasSpanishSpringsM15Heartbeat. */
export function createBisonChargeTrigger(
  hasSpanishSpringsM15Heartbeat: () => boolean | Promise<boolean>
): BisonChargeTrigger {
  return hasSpanishSpringsM15Heartbeat;
}
