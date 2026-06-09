/**
 * §7.4 finite-observer diagnostics: Honeybadger vs bandwidth-mismatch masquerade.
 */

import {
  COLLATZ_27_CONVERGE_STEP,
  COLLATZ_27_FULL,
  COLLATZ_27_PEAK,
} from '@/lib/collatz';

const PHI = (Math.sqrt(5) - 1) / 2;

export type ObserverPoint = {
  n: number;
  state: number;
  normalized: number;
};

export type ObserverDiagnostic = {
  points: ObserverPoint[];
  mode: 'honeybadger' | 'bandwidth';
  observerWindow: number;
  bounded: boolean;
  repeatDetected: boolean;
  convergenceDetected: boolean;
  verdict: string;
  hiddenTruth: string;
};

/** Irrational rotation on S¹ — bounded, aperiodic, no fixed point. */
export function honeybadgerOrbit(steps: number): ObserverPoint[] {
  return Array.from({ length: steps }, (_, n) => {
    const theta = (n * PHI) % 1;
    const state = Math.cos(2 * Math.PI * theta);
    return { n, state, normalized: (state + 1) / 2 };
  });
}

/** Collatz(27) partial orbit — chaotic-looking but converges with full horizon. */
export function bandwidthMasquerade(steps: number): ObserverPoint[] {
  const max = Math.min(steps, COLLATZ_27_FULL.length);
  return COLLATZ_27_FULL.slice(0, max).map((value, n) => ({
    n,
    state: value,
    normalized: value / COLLATZ_27_PEAK,
  }));
}

function detectRepeat(values: number[], tol = 1e-6): boolean {
  const seen = new Set<string>();
  for (const v of values) {
    const key = v.toFixed(4);
    if (seen.has(key)) return true;
    seen.add(key);
  }
  return false;
}

export function buildObserverDiagnostic(
  mode: 'honeybadger' | 'bandwidth',
  observerWindow: number,
): ObserverDiagnostic {
  const points =
    mode === 'honeybadger'
      ? honeybadgerOrbit(observerWindow)
      : bandwidthMasquerade(observerWindow);

  const states = points.map((p) => p.state);
  const bounded = states.every((s) => Number.isFinite(s) && Math.abs(s) < 1e6);
  const repeatDetected = detectRepeat(states);
  const convergenceDetected =
    mode === 'bandwidth'
      ? observerWindow >= COLLATZ_27_CONVERGE_STEP &&
        states[states.length - 1] === 1
      : false;

  const verdict =
    mode === 'honeybadger'
      ? repeatDetected
        ? 'State repeat detected (unexpected for irrational rotation at this resolution)'
        : 'No repeat, no convergence — diagnostic inconclusive in finite window'
      : convergenceDetected
        ? 'Convergence to 1 detected (full horizon)'
        : 'No convergence yet — indistinguishable from non-convergence inside window';

  const hiddenTruth =
    mode === 'honeybadger'
      ? 'Constitutional non-convergence: bounded orbit on S¹ with irrational rotation — no Θ* exists.'
      : `Developmental: Collatz(27) converges at step ${COLLATZ_27_CONVERGE_STEP} with sufficient bandwidth.`;

  return {
    points,
    mode,
    observerWindow,
    bounded,
    repeatDetected,
    convergenceDetected,
    verdict,
    hiddenTruth,
  };
}
