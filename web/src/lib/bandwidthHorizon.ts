/**
 * §7.3 bandwidth mismatch: same I_raw, receiver capacity = coarse-graining scale μ = ln(τ).
 */

import { coarseGrain, tauFromMu } from '@/lib/rgKernel';

const DT = 0.08;
const COUNT = 140;

/** Multi-scale signal with adjustable fast-band energy (complexity). */
export function synthesizeComplexSignal(complexity: number, count = COUNT, dt = DT): number[] {
  const c = Math.max(1, Math.min(10, complexity));
  const mesoGain = 0.4 + c * 0.22;
  const microGain = 0.15 + c * 0.35;
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    const t = i * dt;
    const macro = Math.sin(t * 0.35) * 4;
    const meso = Math.sin(t * 1.8) * 1.5 * mesoGain;
    const micro = (Math.sin(t * 7.2) * 0.9 + Math.cos(t * 10.5) * 0.6) * microGain;
    out.push(macro + meso + micro);
  }
  return out;
}

export type HorizonPoint = {
  t: number;
  raw: number;
  received: number;
  error: number;
  macro: number;
};

/** Macro-only reference (what full maturation should recover). */
function macroComponent(count: number, dt: number): number[] {
  return Array.from({ length: count }, (_, i) => Math.sin(i * dt * 0.35) * 4);
}

export function buildHorizonSeries(mu: number, complexity: number): {
  points: HorizonPoint[];
  tau: number;
  capturePct: number;
  macroCapturePct: number;
  processable: boolean;
} {
  const raw = synthesizeComplexSignal(complexity);
  const macro = macroComponent(raw.length, DT);
  const tau = tauFromMu(mu);
  const received = coarseGrain(raw, DT, tau);

  const rawEnergy = raw.reduce((s, v) => s + v * v, 0);
  const errEnergy = raw.reduce((s, v, i) => {
    const e = v - received[i];
    return s + e * e;
  }, 0);
  const capturePct = rawEnergy > 0 ? Math.max(0, 100 * (1 - errEnergy / rawEnergy)) : 0;

  const macroErr = macro.reduce((s, m, i) => {
    const e = m - received[i];
    return s + e * e;
  }, 0);
  const macroEnergy = macro.reduce((s, m) => s + m * m, 0);
  const macroCapturePct =
    macroEnergy > 0 ? Math.max(0, 100 * (1 - macroErr / macroEnergy)) : 0;

  const points = raw.map((r, i) => ({
    t: i * DT,
    raw: r,
    received: received[i],
    error: r - received[i],
    macro: macro[i],
  }));

  return {
    points,
    tau,
    capturePct,
    macroCapturePct,
    processable: macroCapturePct >= 92,
  };
}
