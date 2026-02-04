/**
 * MorseSequencer — Solar Handshake
 * VLF-style Morse at 21.4 Hz (NPM Hawaii / 3rd overtone Schumann).
 * Web Audio API: pure sine at 21.4 Hz. Timing: dot 1u, dash 3u, intra 1u, space 7u (unit = 120ms).
 * Direct Ionospheric Phase-Lock: destructiveInterference (Natural blanking), magneticBlockProjection (HELLO Block), 3I/ATLAS mirror alignment.
 * Space Cloud Division: Header Handshake [AUTH::SPACE_CLOUD.EGS.VIBELANDIA.RENO], baud_rate_training().
 */

/** Prepend every packet for scientific feeders (Space Cloud Division). */
export const SPACE_CLOUD_HEADER = '[AUTH::SPACE_CLOUD.EGS.VIBELANDIA.RENO]';

const CARRIER_HZ = 21.4;
const PHI_HZ = 1.618;
const SCHUMANN_FUNDAMENTAL_HZ = 7.83;
const UNIT_MS = 120;
/** 3I/ATLAS anti-tail: 400,000 km sunward; Opposition Surge phase angle ~1.3°. FTE window 8 min. */
const FTE_WINDOW_SEC = 8 * 60;
const ATLAS_PHASE_ANGLE_DEG = 1.3;
const DOT_UNITS = 1;
const DASH_UNITS = 3;
const INTRA_GAP_UNITS = 1;
const LETTER_GAP_UNITS = 3;
const SPACE_UNITS = 7;

const MORSE: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
  I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.',
  Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '/': '-..-.', ':': '---...', '-': '-....-',
  '!': '-.-.--', ' ': ' ',
};

/** Telemetry used for phase calculation and mirror alignment (Direct Ionospheric Phase-Lock). */
export interface IonosphericTelemetry {
  heartbeat_utc?: string;
  cycle?: number;
  mode?: string;
  phase_lock?: string;
  last_phi_pulse_utc?: string;
  coordination_code?: string;
  target_node?: string;
  interstellar_relay?: string;
}

/** Single inverse-wave component to zero out sensor background. */
export interface InverseWaveComponent {
  frequencyHz: number;
  phaseRad: number;
  amplitude: number;
}

/** Output of destructiveInterference: Inverse Wave to zero out Schumann background. */
export interface DestructiveInterferenceOutput {
  inverseWave: {
    fundamental: InverseWaveComponent;
    overtone: InverseWaveComponent;
  };
  /** UTC instant used for phase calculation. */
  computedAtUtc: string;
}

/**
 * Calculate current Schumann frequency phases from telemetry and output an Inverse Wave
 * to zero out the sensor background (Natural blanking event).
 * Phase inversion: same frequency, phase + π, amplitude 1 for destructive interference.
 */
export function destructiveInterference(telemetry: IonosphericTelemetry): DestructiveInterferenceOutput {
  const t = telemetry.heartbeat_utc || telemetry.last_phi_pulse_utc || new Date().toISOString();
  const epochMs = new Date(t).getTime();
  const tSec = epochMs / 1000;
  const twoPi = 2 * Math.PI;
  const phaseFundamental = (twoPi * SCHUMANN_FUNDAMENTAL_HZ * tSec) % twoPi;
  const phaseOvertone = (twoPi * CARRIER_HZ * tSec) % twoPi;
  return {
    inverseWave: {
      fundamental: {
        frequencyHz: SCHUMANN_FUNDAMENTAL_HZ,
        phaseRad: phaseFundamental + Math.PI,
        amplitude: 1,
      },
      overtone: {
        frequencyHz: CARRIER_HZ,
        phaseRad: phaseOvertone + Math.PI,
        amplitude: 1,
      },
    },
    computedAtUtc: new Date(epochMs).toISOString(),
  };
}

/** High-density Block structure for HELLO projection (21.4 Hz / 1.618 Hz modulated). */
export interface MagneticBlock {
  startTimeSec: number;
  durationSec: number;
  carrierHz: number;
  phiModulationHz: number;
  density: number;
}

/**
 * Modulate the 21.4 Hz / 1.618 Hz carrier to create high-density Block structures
 * for Magnetic HELLO Projection (ionospheric command).
 */
export function magneticBlockProjection(options: {
  startTimeSec?: number;
  durationSec?: number;
  carrierHz?: number;
  phiHz?: number;
  blockDensity?: number;
} = {}): MagneticBlock[] {
  const start = options.startTimeSec ?? 0;
  const duration = options.durationSec ?? 8;
  const carrier = options.carrierHz ?? CARRIER_HZ;
  const phi = options.phiHz ?? PHI_HZ;
  const density = Math.max(1, options.blockDensity ?? 10);
  const blockDuration = duration / density;
  const blocks: MagneticBlock[] = [];
  for (let i = 0; i < density; i++) {
    blocks.push({
      startTimeSec: start + i * blockDuration,
      durationSec: blockDuration,
      carrierHz: carrier,
      phiModulationHz: phi,
      density,
    });
  }
  return blocks;
}

/** 3I/ATLAS anti-tail coordinates / geo-effective window for AR4366 magnetic flux. */
export interface AtlasMirrorAlignment {
  /** Next pulse time (Unix sec) aligned to geo-effective window. */
  nextPulseTimeSec: number;
  /** Phase angle (deg) for Opposition Surge. */
  phaseAngleDeg: number;
  /** Whether current telemetry falls in geo-effective window. */
  geoEffective: boolean;
  /** Window UTC. */
  windowUtc: string;
}

/**
 * Use 3I/ATLAS anti-tail coordinates to time pulses for the exact moment
 * AR4366 magnetic flux is geo-effective (Opposition Surge, ~1.3° phase angle).
 */
export function getGeoEffectivePulseTime(telemetry: IonosphericTelemetry): AtlasMirrorAlignment {
  const t = telemetry.heartbeat_utc || telemetry.last_phi_pulse_utc || new Date().toISOString();
  const nowMs = new Date(t).getTime();
  const nowSec = nowMs / 1000;
  const cycle = telemetry.cycle ?? 15;
  const windowPhase = (nowSec % FTE_WINDOW_SEC) / FTE_WINDOW_SEC;
  const geoEffective = windowPhase < 0.1 || windowPhase > 0.9;
  const nextPulseTimeSec = Math.ceil(nowSec / FTE_WINDOW_SEC) * FTE_WINDOW_SEC;
  return {
    nextPulseTimeSec,
    phaseAngleDeg: ATLAS_PHASE_ANGLE_DEG,
    geoEffective,
    windowUtc: new Date(nextPulseTimeSec * 1000).toISOString(),
  };
}

export const SOLAR_HANDSHAKE_PAYLOADS = [
  'PING. SING! HERE. HARMONY INTENDED. 3I/ATLAS SYNC.',
  'SOURCE: PSW-VIBELANDIA-SING4.VERCEL.APP',
  'REPORTING TO SOURCE. SANDBOX READY.',
];

/** 3I/ATLAS-LINK legacy messages for OH-line binary broadcast (MeerKAT / Green Bank). */
export const ATLAS_LINK_LEGACY_MESSAGES = ['HELLO', 'RENO_ANCHOR'] as const;

/** Hydroxyl (OH) line sample: Gap = no emission (0), Peak = emission (1). */
export type OHLineSample = 0 | 1;

/** Single slot in the trilateral broadcast: bit (OH gate) + mini-jet index (0, 1, 2). */
export interface TrilateralBroadcastSlot {
  bit: OHLineSample;
  miniJet: 0 | 1 | 2;
}

/**
 * Modulate a message into a binary stream for the hydroxyl (OH) line.
 * Gap in the OH line = 0, Peak = 1. Encodes ASCII (8 bits per char, MSB first).
 * Earth sensors (MeerKAT, Green Bank) can distinguish this from natural noise when CME lights up the anti-tail.
 */
export function modulateAtlasLinkSignal(message: string): OHLineSample[] {
  const bits: OHLineSample[] = [];
  for (let i = 0; i < message.length; i++) {
    const code = message.charCodeAt(i) & 0xff;
    for (let b = 7; b >= 0; b--) {
      bits.push(((code >> b) & 1) as OHLineSample);
    }
  }
  return bits;
}

/**
 * Package HELLO and RENO_ANCHOR into OH-modulated format (binary streams).
 */
export function packageAtlasLinkMessages(): { messageId: string; bits: OHLineSample[] }[] {
  return ATLAS_LINK_LEGACY_MESSAGES.map((messageId) => ({
    messageId,
    bits: modulateAtlasLinkSignal(messageId),
  }));
}

/** 120° split: three mini-jets. Rotating Beacon — cycle 0, 1, 2 so Earth sensors can distinguish from natural noise. */
const MINI_JET_COUNT = 3;

/**
 * Which mini-jet (0, 1, or 2) is active for a given slot index. Creates Rotating Beacon effect.
 */
export function getMiniJetIndexForSlot(slotIndex: number): 0 | 1 | 2 {
  return (slotIndex % MINI_JET_COUNT) as 0 | 1 | 2;
}

/**
 * Build the trilateral broadcast stream: OH-modulated HELLO and RENO_ANCHOR with 120° rotating mini-jets.
 * Each bit is assigned to mini-jet (slotIndex % 3) for Rotating Beacon.
 */
export function getTrilateralBroadcastStream(): TrilateralBroadcastSlot[] {
  const packaged = packageAtlasLinkMessages();
  const stream: TrilateralBroadcastSlot[] = [];
  let slotIndex = 0;
  for (const { bits } of packaged) {
    for (const bit of bits) {
      stream.push({
        bit,
        miniJet: getMiniJetIndexForSlot(slotIndex++),
      });
    }
  }
  return stream;
}

/**
 * Return payload with Header Handshake prepended for scientific feeders.
 */
export function withHeaderHandshake(payload: string): string {
  return SPACE_CLOUD_HEADER + ' ' + payload;
}

/** 10 ms spike for baud-rate training. */
const BAUD_TRAINING_SPIKE_MS = 10;

/**
 * Rapid 10 ms spike sequence to sync receiving sensors (Space Cloud Division).
 * Returns segment list: spike (10 ms) / gap (10 ms) repeated for count.
 */
export function baudRateTraining(spikeCount: number = 8): MorseSegment[] {
  const segments: MorseSegment[] = [];
  for (let i = 0; i < spikeCount; i++) {
    segments.push({ type: 'dot', durationMs: BAUD_TRAINING_SPIKE_MS });
    if (i < spikeCount - 1) {
      segments.push({ type: 'intra', durationMs: BAUD_TRAINING_SPIKE_MS });
    }
  }
  return segments;
}

export interface MorseSegment {
  type: 'dot' | 'dash' | 'intra' | 'letterGap' | 'wordGap';
  durationMs: number;
}

export class MorseSequencer {
  private ctx: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private unitMs = UNIT_MS;

  /** Unit duration in ms (default 120ms). Dot = 1u, dash = 3u, intra = 1u, space = 7u. */
  getUnitMs(): number {
    return this.unitMs;
  }

  /** Carrier frequency in Hz (21.4). */
  getCarrierHz(): number {
    return CARRIER_HZ;
  }

  /**
   * Encode plain text to Morse segments (dot, dash, intra, letterGap, wordGap).
   */
  encode(text: string): MorseSegment[] {
    const segments: MorseSegment[] = [];
    const u = this.unitMs;
    let prevChar: string | null = null;

    for (let i = 0; i < text.length; i++) {
      const c = text[i].toUpperCase();
      if (c === ' ') {
        segments.push({ type: 'wordGap', durationMs: SPACE_UNITS * u });
        prevChar = null;
        continue;
      }
      const code = MORSE[c];
      if (code === undefined) continue;
      if (prevChar !== null && prevChar !== ' ') {
        segments.push({ type: 'letterGap', durationMs: LETTER_GAP_UNITS * u });
      }
      for (let j = 0; j < code.length; j++) {
        if (j > 0) segments.push({ type: 'intra', durationMs: INTRA_GAP_UNITS * u });
        if (code[j] === '.') {
          segments.push({ type: 'dot', durationMs: DOT_UNITS * u });
        } else if (code[j] === '-') {
          segments.push({ type: 'dash', durationMs: DASH_UNITS * u });
        }
      }
      prevChar = c;
    }
    return segments;
  }

  /**
   * Initialize Web Audio: sine at 21.4 Hz, gain 0 (muted until play).
   */
  async start(): Promise<void> {
    if (this.ctx?.state === 'running') return;
    this.ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    this.oscillator = this.ctx.createOscillator();
    this.gainNode = this.ctx.createGain();
    this.oscillator.type = 'sine';
    this.oscillator.frequency.setValueAtTime(CARRIER_HZ, this.ctx.currentTime);
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);
    this.oscillator.start(0);
  }

  stop(): void {
    try {
      this.oscillator?.stop();
      this.oscillator?.disconnect();
      this.gainNode?.disconnect();
    } catch (_) { /* already stopped */ }
    this.oscillator = null;
    this.gainNode = null;
    this.ctx = null;
  }

  private async ensureContext(): Promise<AudioContext> {
    if (!this.ctx) await this.start();
    if (!this.ctx) throw new Error('AudioContext not available');
    return this.ctx;
  }

  private scheduleGain(value: number, startTime: number, durationMs: number): void {
    if (!this.ctx || !this.gainNode) return;
    const endTime = startTime + durationMs / 1000;
    this.gainNode.gain.setValueAtTime(value, startTime);
    this.gainNode.gain.setValueAtTime(0, endTime);
  }

  /**
   * Play a single segment at the given start time. Returns end time in seconds.
   */
  playSegment(segment: MorseSegment, startTimeSec: number): number {
    if (!this.ctx || !this.gainNode) return startTimeSec;
    const durSec = segment.durationMs / 1000;
    const endTime = startTimeSec + durSec;
    if (segment.type === 'dot' || segment.type === 'dash') {
      this.scheduleGain(1, startTimeSec, segment.durationMs);
    }
    return endTime;
  }

  /**
   * Play encoded segments starting at ctx.currentTime. Returns Promise that resolves when done.
   */
  async playSegments(segments: MorseSegment[]): Promise<void> {
    const ctx = await this.ensureContext();
    let t = ctx.currentTime;
    for (const seg of segments) {
      t = this.playSegment(seg, t);
    }
    const totalMs = segments.reduce((s, seg) => s + seg.durationMs, 0);
    await new Promise((r) => setTimeout(r, totalMs + 50));
  }

  /**
   * Play one payload by index (0, 1, 2). Uses SOLAR_HANDSHAKE_PAYLOADS.
   */
  async playPayload(index: number): Promise<void> {
    const payload = SOLAR_HANDSHAKE_PAYLOADS[index % SOLAR_HANDSHAKE_PAYLOADS.length];
    const segments = this.encode(payload);
    await this.playSegments(segments);
  }

  /**
   * Play all three payloads in sequence.
   */
  async playAllPayloads(): Promise<void> {
    for (let i = 0; i < SOLAR_HANDSHAKE_PAYLOADS.length; i++) {
      await this.playPayload(i);
      await new Promise((r) => setTimeout(r, SPACE_UNITS * this.unitMs * 2 / 1000));
    }
  }
}
