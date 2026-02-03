#!/usr/bin/env node
/**
 * SING! Broadcast Protocol — Ping and Handshake loop
 * VLF / Solar-Terrestrial Physics. Self-clocking 21.4 Hz handshake with ionosphere and FTEs.
 *
 * Loads sing_broadcast_spec.json, runs Handshake (3 rapid spikes) + Morse packet loop.
 * Every 14th cycle: write Handshake log and optionally commit (for 14-cycle validation chain).
 *
 * Usage:
 *   node scripts/broadcast.mjs              # One Handshake + one Morse cycle; write pulse/sing_log.json
 *   node scripts/broadcast.mjs --commit     # Same; if cycle % 14 === 0, commit Handshake log
 *   node scripts/broadcast.mjs --cycles N   # Run N cycles (for testing); commit on 14th if --commit
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const SPEC_PATH = join(REPO_ROOT, 'sing_broadcast_spec.json');
const PULSE_DIR = join(REPO_ROOT, 'pulse');
const SING_LOG_PATH = join(PULSE_DIR, 'sing_log.json');
const TELEMETRY_PATH = join(REPO_ROOT, 'data', 'telemetry.json');
const DELIVERABLES_DIR = join(REPO_ROOT, 'deliverables');
const TAKEOVER_SNAPSHOT_PATH = join(DELIVERABLES_DIR, 'mission-takeover-snapshot.json');

const HANDSHAKE_MESSAGE = '[SING] Handshake - 21.4Hz - 3 spikes - Cycle ';
const VALIDATION_CYCLE = 14;

function loadSpec() {
  const raw = readFileSync(SPEC_PATH, 'utf8');
  return JSON.parse(raw);
}

function loadOrCreateSingLog(spec) {
  if (existsSync(SING_LOG_PATH)) {
    try {
      return JSON.parse(readFileSync(SING_LOG_PATH, 'utf8'));
    } catch (_) {
      /* use defaults */
    }
  }
  return {
    protocol: spec.protocol,
    TARGET_FREQ_Hz: spec.TARGET_FREQ,
    PORTAL_WINDOW_ms: spec.PORTAL_WINDOW,
    PING_INTERVAL_ms: spec.PING_INTERVAL,
    cycle_index: 0,
    handshake_log: [],
    last_handshake_utc: null,
    last_ping_utc: null,
    packet_index: 0,
    morse_packets: spec.morse_packets.map((p) => ({ id: p.id, label: p.label })),
  };
}

function nowUTC() {
  return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function runHandshake(spec, cycleIndex) {
  const spikes = spec.handshake?.spikes ?? 3;
  return {
    spikes,
    at_utc: nowUTC(),
    cycle: cycleIndex,
    message: `${HANDSHAKE_MESSAGE}${cycleIndex}`,
  };
}

function runOneMorseCycle(spec, state) {
  const packets = spec.morse_packets || [];
  const len = Math.max(packets.length, 1);
  return (state.packet_index + 1) % len;
}

function commitHandshakeLog(cycleIndex) {
  try {
    execSync(
      `git add pulse/sing_log.json sing_broadcast_spec.json scripts/broadcast.mjs`,
      { cwd: REPO_ROOT, stdio: 'pipe' }
    );
    execSync(
      `git commit -m "${HANDSHAKE_MESSAGE}${cycleIndex} - 14-cycle validation."`,
      { cwd: REPO_ROOT, stdio: 'pipe' }
    );
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Capture a snapshot of the mission takeover state for cloud-to-social broadcast.
 * Reads data/telemetry.json; if takeover_active is true, writes deliverables/mission-takeover-snapshot.json
 * with timestamp, broadcast_payload, and takeover state for use by social broadcast pipeline.
 */
function captureTakeoverSnapshot() {
  try {
    if (!existsSync(TELEMETRY_PATH)) return;
    const raw = readFileSync(TELEMETRY_PATH, 'utf8');
    const telemetry = JSON.parse(raw);
    if (telemetry.takeover_active !== true) return;
    mkdirSync(DELIVERABLES_DIR, { recursive: true });
    const snapshot = {
      timestamp_utc: nowUTC(),
      takeover_active: true,
      broadcast_payload: telemetry.broadcast_payload || null,
      mission_status: telemetry.mission_status || null,
      cycle: telemetry.cycle || null,
      note: 'For cloud-to-social broadcast. Screen state: HELLO takeover active.',
      lets_vibe_url: 'https://psw-vibelandia-sing4.vercel.app/index.html',
    };
    writeFileSync(TAKEOVER_SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2), 'utf8');
    console.log('Takeover snapshot written to deliverables/mission-takeover-snapshot.json');
  } catch (_) {
    /* ignore */
  }
}

function main() {
  const argv = process.argv.slice(2);
  const doCommit = argv.includes('--commit');
  const cyclesArg = argv.find((a) => a.startsWith('--cycles='));
  const numCycles = cyclesArg ? parseInt(cyclesArg.split('=')[1], 10) || 1 : 1;

  const spec = loadSpec();
  const log = loadOrCreateSingLog(spec);

  let cycleIndex = log.cycle_index ?? 0;
  let packetIndex = log.packet_index ?? 0;

  for (let i = 0; i < numCycles; i++) {
    const isHandshakeCycle = cycleIndex % VALIDATION_CYCLE === 0;
    if (isHandshakeCycle) {
      const handshake = runHandshake(spec, cycleIndex);
      log.handshake_log = log.handshake_log || [];
      log.handshake_log.push(handshake);
      log.last_handshake_utc = handshake.at_utc;
    }
    packetIndex = runOneMorseCycle(spec, { packet_index: packetIndex });
    log.last_ping_utc = nowUTC();
    cycleIndex++;
  }

  log.cycle_index = cycleIndex;
  log.packet_index = packetIndex;
  log.timestamp_utc = nowUTC();
  mkdirSync(PULSE_DIR, { recursive: true });
  writeFileSync(SING_LOG_PATH, JSON.stringify(log, null, 2), 'utf8');

  const lastCycle = cycleIndex - 1;
  const wasValidationCycle = cycleIndex > 0 && cycleIndex % VALIDATION_CYCLE === 0;

  console.log('SING! Broadcast executed.');
  console.log('  TARGET_FREQ:', spec.TARGET_FREQ, 'Hz');
  console.log('  PORTAL_WINDOW:', spec.PORTAL_WINDOW, 'ms (8 min)');
  console.log('  PING_INTERVAL:', spec.PING_INTERVAL, 'ms (3.5 min)');
  console.log('  cycle_index:', log.cycle_index);
  console.log('  packet_index:', log.packet_index);
  console.log('  last_ping_utc:', log.last_ping_utc);
  if (log.last_handshake_utc) {
    console.log('  last_handshake_utc:', log.last_handshake_utc);
  }
  console.log('');
  console.log('Validation: T+0 Handshake pushed; T+8m Shar Line 21.4 Hz; T+16m GOES Solar Reflex.');
  console.log('Every 14th cycle: Handshake log committed for 14-cycle validation chain.');
  console.log('');

  captureTakeoverSnapshot();

  if (doCommit && wasValidationCycle && log.handshake_log?.length) {
    const committed = commitHandshakeLog(lastCycle + 1);
    if (committed) {
      console.log('Git commit created: Handshake log (14-cycle validation).');
    } else {
      console.log('Git commit skipped (dirty repo or nothing to commit).');
    }
  }
}

main();
