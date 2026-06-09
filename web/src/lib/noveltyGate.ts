/**
 * §8.2 novelty gating: sustained above-threshold intervals, habituation after encode.
 */

import {
  leakyIntegrate,
  SIGNAL_DT,
} from '@/lib/leakyBaseline';
import { synthesizeRawSignal } from '@/lib/rgKernel';

const COUNT = 100;
const DT = SIGNAL_DT;

/** Deterministic LCG for reproducible irregularity (not periodic sine bumps). */
function lcg(seed: number): number {
  return (seed * 16807) % 2147483647;
}

/** Irregular somatic stream: multi-scale base + sparse bursts + colored noise. */
export function buildIrregularRawStream(seed = 42): number[] {
  const base = synthesizeRawSignal(COUNT, DT);
  let s = seed;
  const burstTimes = new Set([18, 19, 20, 44, 45, 46, 47, 62, 78, 79]);

  return base.map((v, i) => {
    s = lcg(s);
    const u = s / 2147483647;
    const noise = (u - 0.5) * 1.8 + (lcg(s + i) / 2147483647 - 0.5) * 0.9;
    const burst = burstTimes.has(i) ? 2.5 + (u - 0.3) * 3 : 0;
    return v + noise * 0.55 + burst;
  });
}

export type EncodingEpisode = {
  startIdx: number;
  endIdx: number;
  tStart: number;
  tEnd: number;
  duration: number;
  peak: number;
  committed: boolean;
};

export type NoveltyGatePoint = {
  t: number;
  absGap: number;
  threshold: number;
  /** Sustained |ΔB| above θ — candidate interval */
  aboveGate: boolean;
  /** Interval committed to encode (habituation-filtered) */
  inCommittedEncode: boolean;
  /** Post-encode suppression: 0 = fresh, 1 = fully habituated */
  habituation: number;
};

export type NoveltyGateResult = {
  points: NoveltyGatePoint[];
  threshold: number;
  thetaEff: number;
  episodes: EncodingEpisode[];
  committedEpisodes: EncodingEpisode[];
  totalEncodedDuration: number;
  totalAboveDuration: number;
};

/**
 * Encode sustained above-threshold runs, not per-sample crossings.
 * After a committed encode, habituation suppresses back-to-back novelty.
 */
export function buildNoveltyGateSeries(opts: {
  thetaH?: number;
  gamma?: number;
  k1?: number;
  lambda?: number;
  /** Habituation decay time (seconds) — back-to-back ahas lose novelty */
  habituationTau?: number;
  /** Min sustained duration (s) to count as an episode */
  minEpisodeDuration?: number;
}): NoveltyGateResult {
  const {
    thetaH = 0.35,
    gamma = 0.2,
    k1 = 0.25,
    lambda = 0.12,
    habituationTau = 1.8,
    minEpisodeDuration = 0.2,
  } = opts;

  const raw = buildIrregularRawStream();
  const baseline = leakyIntegrate(raw, lambda);
  const absGaps = raw.map((r, i) => Math.abs(r - baseline[i]));

  const sigma =
    absGaps.reduce((s, g) => s + g, 0) / Math.max(absGaps.length, 1) || 1;
  const thetaEff = Math.max(0.05, Math.min(0.95, thetaH - k1 * gamma));
  const threshold = thetaEff * sigma * 2.2;

  const above = absGaps.map((g) => g > threshold);

  const committedMask = new Array<boolean>(COUNT).fill(false);
  const habituationTrace = new Array<number>(COUNT).fill(0);
  const episodes: EncodingEpisode[] = [];

  let habituation = 0;
  let idx = 0;
  while (idx < COUNT) {
    habituation *= Math.exp(-DT / habituationTau);
    habituationTrace[idx] = habituation;

    if (!above[idx]) {
      idx++;
      continue;
    }

    let end = idx;
    while (end + 1 < COUNT && above[end + 1]) end++;

    const duration = (end - idx + 1) * DT;
    const peak = Math.max(...absGaps.slice(idx, end + 1));
    const habitAtStart = habituation;
    const committed = duration >= minEpisodeDuration && habitAtStart < 0.45;

    episodes.push({
      startIdx: idx,
      endIdx: end,
      tStart: idx * DT,
      tEnd: end * DT,
      duration,
      peak,
      committed,
    });

    if (committed) {
      for (let k = idx; k <= end; k++) {
        committedMask[k] = true;
        habituationTrace[k] = Math.max(habituationTrace[k], habitAtStart);
      }
      habituation = 1;
    }

    idx = end + 1;
  }

  const points: NoveltyGatePoint[] = absGaps.map((absGap, i) => ({
    t: i * DT,
    absGap,
    threshold,
    aboveGate: above[i],
    inCommittedEncode: committedMask[i],
    habituation: habituationTrace[i],
  }));

  const committedEpisodes = episodes.filter((e) => e.committed);
  const totalEncodedDuration = committedEpisodes.reduce((s, e) => s + e.duration, 0);
  const totalAboveDuration = episodes.reduce((s, e) => s + e.duration, 0);

  return {
    points,
    threshold,
    thetaEff,
    episodes,
    committedEpisodes,
    totalEncodedDuration,
    totalAboveDuration,
  };
}
