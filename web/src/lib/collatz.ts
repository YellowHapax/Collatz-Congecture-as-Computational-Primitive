/** Collatz map utilities — canonical §7.2 truncation example n = 27. */

export const COLLATZ_CANONICAL_N = 27;
export const COLLATZ_27_PEAK = 9232;
export const COLLATZ_27_PEAK_STEP = 77;
export const COLLATZ_27_CONVERGE_STEP = 111;

export function collatzStep(n: number): number {
  return n % 2 === 0 ? n / 2 : 3 * n + 1;
}

export function collatzTrajectory(seed = COLLATZ_CANONICAL_N, maxSteps = 200): number[] {
  const hist = [seed];
  let n = seed;
  for (let i = 0; i < maxSteps && n !== 1; i++) {
    n = collatzStep(n);
    hist.push(n);
  }
  return hist;
}

export const COLLATZ_27_FULL = collatzTrajectory(COLLATZ_CANONICAL_N);

export type CollatzChartPoint = {
  step: number;
  value: number;
  logValue: number;
  isPeak: boolean;
  isConverged: boolean;
  pastBudget: boolean;
};

export function buildCollatzChart(
  budget: number,
  runningStep = COLLATZ_27_FULL.length - 1,
): CollatzChartPoint[] {
  const limit = Math.min(runningStep + 1, COLLATZ_27_FULL.length);
  return COLLATZ_27_FULL.slice(0, limit).map((value, step) => ({
    step,
    value,
    logValue: Math.log10(Math.max(value, 1)),
    isPeak: step === COLLATZ_27_PEAK_STEP,
    isConverged: step === COLLATZ_27_CONVERGE_STEP,
    pastBudget: step > budget,
  }));
}
