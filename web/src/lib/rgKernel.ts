/**
 * §8.1 exponential memory kernel and discrete coarse-graining.
 * K(t′, τ) = (1/τ) exp(−t′/τ),  μ = ln(τ)
 */

export function tauFromMu(mu: number): number {
  return Math.exp(mu);
}

/** Normalized Green's function K(s, τ) for s ≥ 0 */
export function kernel(s: number, tau: number): number {
  if (s < 0 || tau <= 0) return 0;
  return Math.exp(-s / tau) / tau;
}

/** Deterministic multi-scale sensory stream I_raw(t) */
export function synthesizeRawSignal(count: number, dt: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    const t = i * dt;
    const macro = Math.sin(t * 0.35) * 4;
    const meso = Math.sin(t * 1.8) * 1.5;
    const micro = Math.sin(t * 7.2) * 0.9 + Math.cos(t * 10.5) * 0.6;
    out.push(macro + meso + micro);
  }
  return out;
}

/** Offset variant for multi-trajectory convergence demos */
export function synthesizeRawSignalWithOffset(
  count: number,
  dt: number,
  offset: number,
): number[] {
  return synthesizeRawSignal(count, dt).map((v) => v + offset);
}

/**
 * Discrete approximation of B(t) = ∫ I(t−t′) K(t′, τ) dt′
 * Normalized over the causal window [0, t].
 */
export function coarseGrain(input: number[], dt: number, tau: number): number[] {
  const n = input.length;
  const out = new Array<number>(n);
  const windowSteps = Math.min(n, Math.max(3, Math.ceil((6 * tau) / dt)));

  for (let i = 0; i < n; i++) {
    let weighted = 0;
    let norm = 0;
    const j0 = Math.max(0, i - windowSteps);
    for (let j = j0; j <= i; j++) {
      const s = (i - j) * dt;
      const k = kernel(s, tau);
      weighted += input[j] * k;
      norm += k;
    }
    out[i] = norm > 0 ? weighted / norm : input[i];
  }
  return out;
}

export type RgChartPoint = {
  t: number;
  raw: number;
  coarse: number;
  macro: number;
};

export function buildRgSeries(mu: number, offsets: number[] = [0]): RgChartPoint[][] {
  const dt = 0.08;
  const count = 120;
  const tau = tauFromMu(mu);
  const macro = synthesizeRawSignal(count, dt).map((_, i) => Math.sin(i * dt * 0.35) * 4);

  return offsets.map((off) => {
    const raw = synthesizeRawSignalWithOffset(count, dt, off);
    const coarse = coarseGrain(raw, dt, tau);
    return raw.map((r, i) => ({
      t: i * dt,
      raw: r,
      coarse: coarse[i],
      macro: macro[i],
    }));
  });
}
