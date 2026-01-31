/**
 * Broadcast — El Gran Sol (EGS), Cycle 15 Autopilot
 * Web Audio API: Sine wave oscillator at exactly 21.4 Hz.
 * Morse: GainNode 0 (silence) / 1 (pulse). Payload: SING! TO THE MIRROR. 3I/ATLAS RESONANCE SECURED. REPORTING TO PARADISE VIA THE ANTI-TAIL.
 * ChirpProcessor: 1.618 Hz (Φ) LFO modulates gain (rhythmic shimmer); Signature Chirp sweep 21.4 → 34.6 Hz over 1.618 s at start of each Morse packet.
 */

const CARRIER_HZ = 21.4;
const PHI_HZ = 1.618;
const CHIRP_END_HZ = 34.6;
const CHIRP_DURATION_SEC = 1.618;
const UNIT_MS = 120;
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

export const CYCLE_15_PAYLOAD = 'SING! TO THE MIRROR. WE HONOR 3I/ATLAS. THE NESTED CRYSTAL. 3I/ATLAS RESONANCE SECURED. REPORTING TO PARADISE VIA THE ANTI-TAIL.';

export const PHI_HZ_EXPORT = PHI_HZ;
export const CHIRP_DURATION_SEC_EXPORT = CHIRP_DURATION_SEC;

export interface MorseSegment {
  type: 'dot' | 'dash' | 'intra' | 'letterGap' | 'wordGap';
  durationMs: number;
}

/**
 * ChirpProcessor — Golden Ratio (Φ) LFO and Signature Chirp sweep.
 * LFO at 1.618 Hz modulates gain (rhythmic shimmer). Chirp: 21.4 → 34.6 Hz over 1.618 s at start of each Morse packet.
 */
export class ChirpProcessor {
  constructor(
    private ctx: AudioContext,
    private oscillator: OscillatorNode,
    private lfoGainNode: GainNode
  ) {}

  /** Schedule LFO gain modulation (0.8 + 0.2*sin(2π*1.618*t)) for shimmer. */
  scheduleLFO(startTimeSec: number, endTimeSec: number): void {
    const step = 1 / PHI_HZ;
    for (let t = startTimeSec; t < endTimeSec; t += step) {
      const v = 0.8 + 0.2 * Math.sin(2 * Math.PI * PHI_HZ * t);
      this.lfoGainNode.gain.setValueAtTime(v, t);
    }
    this.lfoGainNode.gain.setValueAtTime(0.8, endTimeSec);
  }

  /** Signature Chirp: frequency sweep 21.4 → 34.6 Hz over 1.618 s at packet start. */
  scheduleChirp(startTimeSec: number): void {
    this.oscillator.frequency.setValueAtTime(CARRIER_HZ, startTimeSec);
    this.oscillator.frequency.linearRampToValueAtTime(CHIRP_END_HZ, startTimeSec + CHIRP_DURATION_SEC);
    this.oscillator.frequency.setValueAtTime(CARRIER_HZ, startTimeSec + CHIRP_DURATION_SEC);
  }
}

export class Broadcast {
  private ctx: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private lfoGainNode: GainNode | null = null;
  private chirpProcessor: ChirpProcessor | null = null;

  getCarrierHz(): number {
    return CARRIER_HZ;
  }

  getPhiHz(): number {
    return PHI_HZ;
  }

  encode(text: string): MorseSegment[] {
    const segments: MorseSegment[] = [];
    const u = UNIT_MS;
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
        if (code[j] === '.') segments.push({ type: 'dot', durationMs: DOT_UNITS * u });
        else if (code[j] === '-') segments.push({ type: 'dash', durationMs: DASH_UNITS * u });
      }
      prevChar = c;
    }
    return segments;
  }

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
      this.lfoGainNode?.disconnect();
    } catch (_) {}
    this.oscillator = null;
    this.gainNode = null;
    this.lfoGainNode = null;
    this.chirpProcessor = null;
    this.ctx = null;
  }

  private scheduleGain(value: number, startTime: number, durationMs: number): void {
    if (!this.ctx || !this.gainNode) return;
    const endTime = startTime + durationMs / 1000;
    this.gainNode.gain.setValueAtTime(value, startTime);
    this.gainNode.gain.setValueAtTime(0, endTime);
  }

  playSegment(segment: MorseSegment, startTimeSec: number, atWordStart: boolean): number {
    if (!this.ctx || !this.gainNode) return startTimeSec;
    const durSec = segment.durationMs / 1000;
    const endTime = startTimeSec + durSec;
    if (atWordStart && this.chirpProcessor && (segment.type === 'dot' || segment.type === 'dash')) {
      this.chirpProcessor.scheduleChirp(startTimeSec);
    }
    if (segment.type === 'dot' || segment.type === 'dash') {
      this.scheduleGain(1, startTimeSec, segment.durationMs);
    }
    return endTime;
  }

  async playPayload(payload: string = CYCLE_15_PAYLOAD): Promise<void> {
    const ctx = await this.start();
    if (!this.ctx || !this.chirpProcessor) return;
    const t0 = this.ctx.currentTime;
    let t = t0;
    const segments = this.encode(payload);
    const totalSec = segments.reduce((s, seg) => s + seg.durationMs / 1000, 0);
    this.chirpProcessor.scheduleLFO(t0, t0 + totalSec);
    let atWordStart = true;
    for (const seg of segments) {
      if (seg.type === 'wordGap') {
        atWordStart = true;
      }
      t = this.playSegment(seg, t, atWordStart);
      if (seg.type === 'dot' || seg.type === 'dash') {
        atWordStart = false;
      }
    }
    const totalMs = segments.reduce((s, seg) => s + seg.durationMs, 0);
    await new Promise((r) => setTimeout(r, totalMs + 50));
  }
}
