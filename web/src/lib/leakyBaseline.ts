/**
 * Shared §8.1 signal chain for Panels A–C: I_raw → leaky B(t) → ΔB → novelty gate.
 */

import { synthesizeRawSignal } from '@/lib/rgKernel';

export type BaselinePoint = {
  t: number;
  raw: number;
  baseline: number;
  gap: number;
  absGap: number;
  encoded: boolean;
};

export const SIGNAL_DT = 0.1;
export const SIGNAL_DURATION_S = 10;

const DT = SIGNAL_DT;
const COUNT = 100;

/** Deterministic multi-scale stream (same family as Panel D's I_raw). */
export function buildRawStream(perturbation = 0, perturbT0 = 42, perturbWidth = 4): number[] {
  const base = synthesizeRawSignal(COUNT, DT);
  if (perturbation <= 0) return base;
  return base.map((v, i) => {
    if (i >= perturbT0 && i < perturbT0 + perturbWidth) {
      return v + perturbation * 6;
    }
    return v;
  });
}

/** Discrete leaky integrator: B(t+Δt) = B(1−λ) + I·λ, λ ∝ 1/τ. */
export function leakyIntegrate(raw: number[], lambda: number): number[] {
  let b = 0;
  return raw.map((input) => {
    b = b * (1 - lambda) + input * lambda;
    return b;
  });
}

export function buildBaselineSeries(opts: {
  lambda?: number;
  perturbation?: number;
  thetaH?: number;
  gamma?: number;
  k1?: number;
}): BaselinePoint[] {
  const {
    lambda = 0.12,
    perturbation = 0,
    thetaH = 0.35,
    gamma = 0,
    k1 = 0.25,
  } = opts;

  const raw = buildRawStream(perturbation);
  const baseline = leakyIntegrate(raw, lambda);
  const gaps = raw.map((r, i) => r - baseline[i]);
  const absGaps = gaps.map(Math.abs);

  const sigma =
    absGaps.reduce((s, g) => s + g, 0) / Math.max(absGaps.length, 1) || 1;
  const thetaEff = Math.max(0.05, Math.min(0.95, thetaH - k1 * gamma));
  const threshold = thetaEff * sigma * 2.2;

  return raw.map((r, i) => {
    const gap = gaps[i];
    const absGap = absGaps[i];
    return {
      t: i * DT,
      raw: r,
      baseline: baseline[i],
      gap,
      absGap,
      encoded: absGap > threshold,
    };
  });
}
