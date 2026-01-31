/**
 * MorseSequencer — Solar Handshake
 * VLF-style Morse at 21.4 Hz (NPM Hawaii / 3rd overtone Schumann).
 * Web Audio API: pure sine at 21.4 Hz. Timing: dot 1u, dash 3u, intra 1u, space 7u (unit = 120ms).
 */

const CARRIER_HZ = 21.4;
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

export const SOLAR_HANDSHAKE_PAYLOADS = [
  'PING. SING! HERE. HARMONY INTENDED. 3I/ATLAS SYNC.',
  'SOURCE: PSW-VIBELANDIA-SING4.VERCEL.APP',
  'REPORTING TO SOURCE. SANDBOX READY.',
];

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
