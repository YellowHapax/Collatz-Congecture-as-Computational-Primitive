/**
 * Pythagorean comma and κ-temperament error distribution (§4, §5.4, §7.1).
 */

export const FIFTHS_IN_CIRCLE = 12;

/** 3¹² / 2¹⁹ — comma ratio (>1 means circle of fifths overshoots octave) */
export const PYTHAGOREAN_COMMA_RATIO = Math.pow(3, 12) / Math.pow(2, 19);

/** Comma size in musical cents */
export const PYTHAGOREAN_COMMA_CENTS = 1200 * Math.log2(PYTHAGOREAN_COMMA_RATIO);

/** Display-normalized comma (maps to ~23.46 cents at 12 units) */
export const NORMALIZED_COMMA = 12;

const CENTS_PER_UNIT = PYTHAGOREAN_COMMA_CENTS / NORMALIZED_COMMA;

export function centsToUnits(cents: number): number {
  return cents / CENTS_PER_UNIT;
}

export function unitsToCents(units: number): number {
  return units * CENTS_PER_UNIT;
}

/** Static distribution after one full circle of fifths */
export function commaDistribution(kappa: number, n = FIFTHS_IN_CIRCLE) {
  const perSlot = kappa * (NORMALIZED_COMMA / n);
  const wolf = NORMALIZED_COMMA - perSlot * (n - 1);
  return Array.from({ length: n }, (_, i) => ({
    interval: i,
    label: i === n - 1 ? 'Wolf' : `V${i + 1}`,
    error: i === n - 1 ? wolf : perSlot,
    cents: unitsToCents(i === n - 1 ? wolf : perSlot),
    isWolf: i === n - 1,
  }));
}

export type AccumulationPoint = {
  exchange: number;
  debt: number;
  debtCents: number;
  wolfSpike: number;
  distributed: number;
};

/**
 * Simulate stacking pure fifths (exchanges). Without tempering, debt accumulates
 * until the 12th fifth dumps the full comma into the Wolf interval.
 * With tempering (κ), each exchange distributes κ·(comma/12) and debt decays.
 */
export function simulateCommaAccumulation(
  maxExchanges: number,
  tempered: boolean,
  kappa: number,
): AccumulationPoint[] {
  const perFifth = NORMALIZED_COMMA / FIFTHS_IN_CIRCLE;
  const pts: AccumulationPoint[] = [];
  let debt = 0;

  for (let e = 0; e <= maxExchanges; e++) {
    let wolfSpike = 0;
    let distributed = 0;

    if (e > 0) {
      if (tempered) {
        distributed = kappa * perFifth;
        debt = Math.max(0, debt + perFifth - distributed);
      } else {
        debt += perFifth;
        if (e % FIFTHS_IN_CIRCLE === 0) {
          wolfSpike = debt;
          debt = 0;
        }
      }
    }

    pts.push({
      exchange: e,
      debt,
      debtCents: unitsToCents(debt),
      wolfSpike,
      distributed,
    });
  }
  return pts;
}

/** Drift after k stacked pure fifths (cents from closed octave) */
export function pythagoreanDriftCents(k: number): number {
  const ratio = Math.pow(3 / 2, k) / Math.pow(2, Math.round(k * Math.log2(3 / 2)));
  return 1200 * Math.log2(ratio);
}
