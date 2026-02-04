/**
 * MorseSequencer — Solar Handshake (browser ESM)
 * VLF-style Morse at 21.4 Hz. Web Audio: sine at 21.4 Hz. Unit = 120ms.
 * Direct Ionospheric Phase-Lock: destructiveInterference, magneticBlockProjection, 3I/ATLAS mirror alignment.
 * Space Cloud Division: Header Handshake, baud_rate_training().
 */

export const SPACE_CLOUD_HEADER = '[AUTH::SPACE_CLOUD.EGS.VIBELANDIA.RENO]';

const CARRIER_HZ = 21.4;
const PHI_HZ = 1.618;
const SCHUMANN_FUNDAMENTAL_HZ = 7.83;
const UNIT_MS = 120;
const FTE_WINDOW_SEC = 8 * 60;
const ATLAS_PHASE_ANGLE_DEG = 1.3;
const DOT_UNITS = 1;
const DASH_UNITS = 3;
const INTRA_GAP_UNITS = 1;
const LETTER_GAP_UNITS = 3;
const SPACE_UNITS = 7;

const MORSE = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
  I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.',
  Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '/': '-..-.', ':': '---...', '-': '-....-',
  '!': '-.-.--', ' ': ' ',
};

export const SOLAR_HANDSHAKE_PAYLOADS = [
  'PING. SING! HERE. HARMONY INTENDED. 3I/ATLAS SYNC.',
  'SOURCE: PSW-VIBELANDIA-SING4.VERCEL.APP',
  'REPORTING TO SOURCE. SANDBOX READY.',
];

/** 3I/ATLAS-LINK legacy messages for OH-line binary broadcast (MeerKAT / Green Bank). */
export const ATLAS_LINK_LEGACY_MESSAGES = ['HELLO', 'RENO_ANCHOR'];

/**
 * Modulate message into binary stream for hydroxyl (OH) line. Gap = 0, Peak = 1. ASCII 8 bits per char, MSB first.
 */
export function modulateAtlasLinkSignal(message) {
  const bits = [];
  for (let i = 0; i < message.length; i++) {
    const code = message.charCodeAt(i) & 0xff;
    for (let b = 7; b >= 0; b--) bits.push((code >> b) & 1);
  }
  return bits;
}

/** Package HELLO and RENO_ANCHOR into OH-modulated format. */
export function packageAtlasLinkMessages() {
  return ATLAS_LINK_LEGACY_MESSAGES.map((messageId) => ({ messageId, bits: modulateAtlasLinkSignal(messageId) }));
}

/** 120° split: which mini-jet (0, 1, 2) is active for slot index. Rotating Beacon. */
export function getMiniJetIndexForSlot(slotIndex) {
  return slotIndex % 3;
}

/** Trilateral broadcast stream: OH-modulated HELLO + RENO_ANCHOR with rotating mini-jets. */
export function getTrilateralBroadcastStream() {
  const packaged = packageAtlasLinkMessages();
  const stream = [];
  let slotIndex = 0;
  for (const { bits } of packaged) {
    for (const bit of bits) stream.push({ bit, miniJet: getMiniJetIndexForSlot(slotIndex++) });
  }
  return stream;
}

export function withHeaderHandshake(payload) {
  return SPACE_CLOUD_HEADER + ' ' + payload;
}

const BAUD_TRAINING_SPIKE_MS = 10;

export function baudRateTraining(spikeCount = 8) {
  const segments = [];
  for (let i = 0; i < spikeCount; i++) {
    segments.push({ type: 'dot', durationMs: BAUD_TRAINING_SPIKE_MS });
    if (i < spikeCount - 1) segments.push({ type: 'intra', durationMs: BAUD_TRAINING_SPIKE_MS });
  }
  return segments;
}

/**
 * Calculate Schumann phases from telemetry and output Inverse Wave to zero out sensor background.
 */
export function destructiveInterference(telemetry) {
  const t = telemetry?.heartbeat_utc || telemetry?.last_phi_pulse_utc || new Date().toISOString();
  const epochMs = new Date(t).getTime();
  const tSec = epochMs / 1000;
  const twoPi = 2 * Math.PI;
  const phaseFundamental = (twoPi * SCHUMANN_FUNDAMENTAL_HZ * tSec) % twoPi;
  const phaseOvertone = (twoPi * CARRIER_HZ * tSec) % twoPi;
  return {
    inverseWave: {
      fundamental: { frequencyHz: SCHUMANN_FUNDAMENTAL_HZ, phaseRad: phaseFundamental + Math.PI, amplitude: 1 },
      overtone: { frequencyHz: CARRIER_HZ, phaseRad: phaseOvertone + Math.PI, amplitude: 1 },
    },
    computedAtUtc: new Date(epochMs).toISOString(),
  };
}

/**
 * Modulate 21.4 Hz / 1.618 Hz carrier to create high-density Block structures (HELLO projection).
 */
export function magneticBlockProjection(options = {}) {
  const start = options.startTimeSec ?? 0;
  const duration = options.durationSec ?? 8;
  const carrier = options.carrierHz ?? CARRIER_HZ;
  const phi = options.phiHz ?? PHI_HZ;
  const density = Math.max(1, options.blockDensity ?? 10);
  const blockDuration = duration / density;
  const blocks = [];
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

/**
 * 3I/ATLAS anti-tail coordinates: time pulses for AR4366 geo-effective window.
 */
export function getGeoEffectivePulseTime(telemetry) {
  const t = telemetry?.heartbeat_utc || telemetry?.last_phi_pulse_utc || new Date().toISOString();
  const nowMs = new Date(t).getTime();
  const nowSec = nowMs / 1000;
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

export class MorseSequencer {
  constructor() {
    this.ctx = null;
    this.oscillator = null;
    this.gainNode = null;
    this.unitMs = UNIT_MS;
  }

  getUnitMs() { return this.unitMs; }
  getCarrierHz() { return CARRIER_HZ; }

  encode(text) {
    const segments = [];
    const u = this.unitMs;
    let prevChar = null;
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
        if (code[j] === '.') segments.push({ type: 'dot', durationMs: DOT_UNITS * u });
        else if (code[j] === '-') segments.push({ type: 'dash', durationMs: DASH_UNITS * u });
      }
      prevChar = c;
    }
    return segments;
  }

  async start() {
    if (this.ctx?.state === 'running') return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.oscillator = this.ctx.createOscillator();
    this.gainNode = this.ctx.createGain();
    this.oscillator.type = 'sine';
    this.oscillator.frequency.setValueAtTime(CARRIER_HZ, this.ctx.currentTime);
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);
    this.oscillator.start(0);
  }

  stop() {
    try {
      this.oscillator?.stop();
      this.oscillator?.disconnect();
      this.gainNode?.disconnect();
    } catch (_) {}
    this.oscillator = null;
    this.gainNode = null;
    this.ctx = null;
  }

  scheduleGain(value, startTime, durationMs) {
    if (!this.ctx || !this.gainNode) return;
    const endTime = startTime + durationMs / 1000;
    this.gainNode.gain.setValueAtTime(value, startTime);
    this.gainNode.gain.setValueAtTime(0, endTime);
  }

  playSegment(segment, startTimeSec) {
    if (!this.ctx || !this.gainNode) return startTimeSec;
    const durSec = segment.durationMs / 1000;
    const endTime = startTimeSec + durSec;
    if (segment.type === 'dot' || segment.type === 'dash') {
      this.scheduleGain(1, startTimeSec, segment.durationMs);
    }
    return endTime;
  }

  async playSegments(segments) {
    await this.start();
    let t = this.ctx.currentTime;
    for (const seg of segments) t = this.playSegment(seg, t);
    const totalMs = segments.reduce((s, seg) => s + seg.durationMs, 0);
    await new Promise((r) => setTimeout(r, totalMs + 50));
  }

  async playPayload(index) {
    const payload = SOLAR_HANDSHAKE_PAYLOADS[index % SOLAR_HANDSHAKE_PAYLOADS.length];
    await this.playSegments(this.encode(payload));
  }

  async playAllPayloads() {
    for (let i = 0; i < SOLAR_HANDSHAKE_PAYLOADS.length; i++) {
      await this.playPayload(i);
      await new Promise((r) => setTimeout(r, (SPACE_UNITS * this.unitMs * 2) / 1000));
    }
  }
}
