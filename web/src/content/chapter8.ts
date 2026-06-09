/**
 * Chapter 8 curriculum — paper text, section mapping, and A→Z journey steps.
 * Source: Collatz as Computational Primitive (Everett / Noetic Lab, v2).
 */

export interface PanelContent {
  id: string;
  tag: string;
  label: string;
  /** Paper section reference */
  paperSection: string;
  /** Verbatim or near-verbatim excerpt from the manuscript */
  paperExcerpt: string;
  /** Where this step sits in the A→Z walk */
  journeyStep: number;
  journeyTotal: number;
  /** One sentence: what we had at the previous step */
  fromPrevious: string;
  /** One sentence: what this step adds toward Z */
  toNext: string;
  /** Numbered derivation beats — "how we get here" */
  derivation: string[];
}

export const CHAPTER_TITLE =
  'Cognitive Renormalization Group Flow';

export const CHAPTER_ABSTRACT =
  'Section 8 formalizes bandwidth maturation as a real-time temporal renormalization-group flow: a dissipative memory kernel coarse-grains sensory input; three coupled baseline parameters evolve with log-scale μ = ln(τ); a fixed point Θ* emerges; and the Routh–Hurwitz criterion yields the stability bound k₁k₂k₃ < (a₁+a₂)(a₂+a₃)(a₁+a₃).';

export const JOURNEY_OVERVIEW: { tag: string; headline: string }[] = [
  { tag: 'A', headline: 'Sensory flood → leaky baseline' },
  { tag: 'B', headline: 'Raw input → deviation gap' },
  { tag: 'C', headline: 'Gap → novelty gate (θ_h, Γ)' },
  { tag: 'D', headline: 'Window widens → RG flow toward Θ*' },
  { tag: 'E', headline: 'Coupling ceiling → Routh–Hurwitz bound' },
  { tag: 'F', headline: 'Refuse to temper → Wolf Interval' },
  { tag: 'G', headline: 'Clock runs out → Truncation' },
  { tag: 'H', headline: 'Pipe too small → Bandwidth mismatch' },
  { tag: 'I', headline: 'No 1 to reach → True divergence' },
  { tag: 'J', headline: 'κ selects temperament across all of it' },
];

export const panelContent: Record<string, PanelContent> = {
  'panel-a': {
    id: 'panel-a',
    tag: 'A',
    label: 'The Leaky Integrator',
    paperSection: '§8.1 — Coarse-Graining Kernel',
    paperExcerpt:
      'Let I_raw(t) denote the high-frequency, continuous somatic and sensory input stream available to a cognitive agent. Processing this stream at full bandwidth would require infinite metabolic cost. The agent must coarse-grain over a temporal window τ. Un-associated sensory traces undergo first-order dissipative decay: dM/dt = −(1/τ)M(t). The normalized Green\'s function is K(t′, τ) = (1/τ) exp(−t′/τ).',
    journeyStep: 1,
    journeyTotal: 10,
    fromPrevious:
      'We begin with the problem §8 names: infinite raw bandwidth, finite metabolism.',
    toNext:
      'A running baseline exists — but memory encodes what breaks prediction, not the raw stream.',
    derivation: [
      '§7.3 identifies bandwidth maturation as a developmental problem.',
      '§8 asks: can we write the maturation dynamics formally?',
      'First ingredient: the agent cannot store I_raw(t) at full resolution.',
      'Assume un-reinforced traces decay at rate proportional to current activation (first-order dissipation).',
      'That assumption yields the exponential retention kernel — the leaky integrator you see in the viz.',
      'Discretely: B(t+Δt) = B(t)(1−λ) + I(t)·λ is the same idea with update rate λ ∝ 1/τ.',
    ],
  },
  'panel-b': {
    id: 'panel-b',
    tag: 'B',
    label: 'The Gap',
    paperSection: '§5 / MBD — Baseline Deviation',
    paperExcerpt:
      'Each agent maintains its own baseline — its own prime base for decomposing incoming signals. Deviation is not measured in absolute units. It is measured relative to the other agent\'s baseline, which is also moving. The system encodes the gap between expectation and arrival.',
    journeyStep: 2,
    journeyTotal: 10,
    fromPrevious: 'Panel A gave us a smooth baseline estimate B(t).',
    toNext:
      'The gap |ΔB| must pass a threshold before it counts as signal worth encoding.',
    derivation: [
      'MBD treats memory as baseline deviation, not raw storage.',
      'Define ΔB(t) = I(t) − B(t): what surprised the running estimate.',
      'Encoding and learning fire on deviation, not on the absolute input level.',
      'This is the bridge from §8\'s signal-processing kernel to MBD\'s cognitive architecture.',
      'Perturb the input in the viz — watch the yellow band: that is what the system would encode.',
    ],
  },
  'panel-c': {
    id: 'panel-c',
    tag: 'C',
    label: 'Novelty Gating',
    paperSection: '§8.2 — Novelty Gating (θ_h)',
    paperExcerpt:
      'θ_h ∈ [0, 1] is the novelty-gating threshold (higher values filter more noise). As the integration window widens, variance decreases through averaging — but high complexity sensitivity (Γ) drives the agent to seek high-frequency models, effectively lowering the gate: dθ_h/dμ = a₁(θ₀ − θ_h) − k₁Γ.',
    journeyStep: 3,
    journeyTotal: 10,
    fromPrevious: 'We have a deviation signal ΔB — but not every fluctuation is news.',
    toNext:
      'Now widen the temporal window: maturation is coarse-graining in μ = ln(τ).',
    derivation: [
      'Not every gap should update the deep model — most is noise.',
      'θ_h gates sustained |ΔB| intervals, not individual threshold crossings.',
      'Back-to-back above-θ runs habituate: novelty decays after a committed encode.',
      'In §8.2 θ_h couples to Γ and β; Γ lowers the gate via complexity-seeking.',
      'What gets stored is encode duration — how long surprise stayed aloft, not bump count.',
    ],
  },
  'panel-d': {
    id: 'panel-d',
    tag: 'D',
    label: 'Zooming Out (RG)',
    paperSection: '§8.1–8.2 — Scale Flow',
    paperExcerpt:
      'Defining μ = ln(τ), the coarse-grained baseline convolves input history with the exponential kernel. The configuration state is Θ(μ) = [θ_h(μ), β(μ), Γ(μ)]ᵀ. The beta function β(Θ) ≡ dΘ/dμ describes how parameters flow as the temporal window widens. Maturation corresponds to increasing μ — averaging over progressively longer horizons until high-frequency volatility washes out.',
    journeyStep: 4,
    journeyTotal: 10,
    fromPrevious: 'θ_h gates novelty at one timescale — but timescale itself grows with age.',
    toNext:
      'The flow has a resting shape Θ* — and a hard stability ceiling on coupling.',
    derivation: [
      'Rename the window: μ = ln(τ). Increasing μ = zooming out in time.',
      'Convolution with K(t′,τ) smooths I_raw — that is coarse-graining.',
      'RG language: β(Θ) = dΘ/dμ is the beta function — how the system changes under scale.',
      'Three coupled variables (θ_h, β, Γ) feedback-loop through k₁, k₂, k₃.',
      'Drag μ in the viz: trajectories should converge — that is flow toward a mature fixed point.',
    ],
  },
  'panel-e': {
    id: 'panel-e',
    tag: 'E',
    label: 'Stability Bound',
    paperSection: '§8.4 — Routh–Hurwitz',
    paperExcerpt:
      'The Jacobian at the fixed point is J = [[−a₁, 0, −k₁], [−k₂, −a₂, 0], [0, −k₃, −a₃]]. Applying the Routh–Hurwitz criterion to λ³ + (a₁+a₂+a₃)λ² + (a₁a₂+a₂a₃+a₁a₃)λ + (a₁a₂a₃+k₁k₂k₃) = 0 yields the central result: k₁k₂k₃ < (a₁+a₂)(a₂+a₃)(a₁+a₃). Exceed this and eigenvalues cross into the right half-plane — Hopf bifurcation, chronic dysregulation.',
    journeyStep: 5,
    journeyTotal: 10,
    fromPrevious: 'Θ flows toward Θ* under coarse-graining — if coupling permits.',
    toNext:
      'When the bound fails, §7\'s failure modes become the phenomenology you feel.',
    derivation: [
      'Set dΘ/dμ = 0 at §8.3 to find fixed-point coordinates Θ*.',
      'Linearize: F(Θ) ≈ J(Θ − Θ*) near the fixed point.',
      'Stability = all eigenvalues of J have negative real parts.',
      'Cubic characteristic polynomial → Routh–Hurwitz conditions.',
      'Simplify to one inequality: product of couplings < product of pairwise self-dissipation sums.',
      'This is the paper\'s one self-contained formal result in §8.',
    ],
  },
  'panel-f': {
    id: 'panel-f',
    tag: 'F',
    label: 'Wolf Interval',
    paperSection: '§7.1 — Refusal to Temper',
    paperExcerpt:
      'When agents interact with low κ, they stack pure truths and refuse to compress. The comma accumulates with every exchange until the system is forced into the Wolf Interval — a catastrophic, singular prediction error. The agents had time and bandwidth. They refused to temper. This failure is volitional.',
    journeyStep: 6,
    journeyTotal: 10,
    fromPrevious: '§8.5 unstable regime: coupling too tight — parameters oscillate, won\'t settle.',
    toNext: 'Even willing agents fail when the attention clock runs out mid-trajectory.',
    derivation: [
      '§8 describes structural instability — §7 names how it feels in communication.',
      'Low κ ≈ Just Intonation: local fidelity, no error distribution.',
      'Pythagorean comma stacks until it dumps into one interval (Wolf fifth).',
      'MBD\'s Break primitive: the Wolf Interval is that dump in relational terms.',
      'Toggle temper in the viz: distribute error (equal temperament) vs accumulate (Wolf).',
    ],
  },
  'panel-g': {
    id: 'panel-g',
    tag: 'G',
    label: 'Truncation',
    paperSection: '§7.2 — Compute-Budget Expiry',
    paperExcerpt:
      'If the trajectory requires 111 steps and the attention budget permits 10, the system does not reach 1. It reaches whatever intermediate value it holds when the window closes and acts on that partial result. This is truncation — not temperament. Propaganda exploits this: inject high-trajectory signals when attention is nearly exhausted.',
    journeyStep: 7,
    journeyTotal: 10,
    fromPrevious: 'Wolf Interval is refusal — truncation is exhaustion.',
    toNext: 'Some signals need more capacity than the receiver currently has.',
    derivation: [
      'Collatz(27) needs 111 steps — peak 9232 at step 77 before reaching 1.',
      'Bounded attention = finite step budget N_budget before action.',
      'Stop early → act on partial reduction → wrong conclusion without anyone lying.',
      'Distinct from §8 instability: willing agent, honest signal, clock expired.',
      'Connects to Simon\'s satisficing and the paper\'s truncation economics open question.',
    ],
  },
  'panel-h': {
    id: 'panel-h',
    tag: 'H',
    label: 'Bandwidth Mismatch',
    paperSection: '§7.3 → §8 (motivation)',
    paperExcerpt:
      'Certain signals are reducible in principle but exceed the current processing capacity of the receiver. The trajectory terminates — but the receiver\'s bandwidth cannot execute it yet. Education is band-widening. Development is thermal expansion. Maturation is the process by which previously out-of-band signals become processable. §8 formalizes that maturation as RG flow.',
    journeyStep: 8,
    journeyTotal: 10,
    fromPrevious: 'Truncation is "out of time"; bandwidth mismatch is "not yet capable".',
    toNext: 'The hardest case: structurally no convergence at all.',
    derivation: [
      '§7.3 is why §8 exists — maturation is not metaphor, it is coarse-graining dynamics.',
      'Horizon H ≡ coarse-graining scale τ = e^μ: fast bands are out of range, not refused.',
      'Increase μ in the viz: same I_raw becomes macro-processable (§8 maturation).',
      'Diagnostic horror: from inside, "not yet" and "impossible" look alike.',
      'RG flow in §8 is the formal answer to "how does capacity grow?"',
    ],
  },
  'panel-i': {
    id: 'panel-i',
    tag: 'I',
    label: 'True Divergence',
    paperSection: '§7.4 — Honeybadger',
    paperExcerpt:
      'True divergence is a bounded, non-repeating trajectory: ||X_n|| remains finite, yet X_n never equals X_m for n ≠ m and never converges to a fixed point. Applied to communication: the baselines are structurally incommensurate — not difficult, impossible. The comma is structurally infinite. Most apparent divergence is bandwidth mismatch in a Honeybadger mask.',
    journeyStep: 9,
    journeyTotal: 10,
    fromPrevious: 'Bandwidth mismatch resolves with maturation — Honeybadger does not.',
    toNext: 'κ parameterizes where you sit on the temperament spectrum that governs all of the above.',
    derivation: [
      'Honeybadger: irrational rotation on S¹ — bounded, aperiodic, no Θ*.',
      'Masquerade: truncated Collatz(27) looks identical inside finite T_obs.',
      'Halting shadow: no finite diagnostic reliably separates the two.',
      '§8 stable fixed point assumes a pairing that has a Θ* — Honeybadger pairings may not.',
      'Framework must account for the possibility even when rare.',
    ],
  },
  'panel-j': {
    id: 'panel-j',
    tag: 'J',
    label: 'Tuning Knob (κ)',
    paperSection: '§5.4 — κ as Temperament Selector',
    paperExcerpt:
      'κ ≈ 0 (Just Intonation): fidelity to own baseline, zero modulability. κ ≈ 0.5 (Meantone): compromise in familiar keys, Wolf Intervals in novel territory. κ ≈ 1 (Equal Temperament): prediction error distributed uniformly — cosmopolitan coupling at the cost of local purity. κ is the tuning wrench across the failure taxonomy.',
    journeyStep: 10,
    journeyTotal: 10,
    fromPrevious: 'We have formal stability (§8), four failure modes (§7), and the Collatz primitive underneath.',
    toNext:
      'Z — Wisdom: lossy compression at the fidelity appropriate to the channel, with awareness of what the compression discarded.',
    derivation: [
      'κ couples §5 temperament to §7 failures and §8 coupling dynamics.',
      'Low κ → Wolf Interval risk (Panel F). High κ → truncation tolerance via distributed error.',
      '§8\'s k₁k₂k₃ are structural couplings; κ is the agent\'s willingness to temper.',
      'Drag κ: watch comma distribute across twelve intervals vs pile into the Wolf bar.',
      'End state: the wise agent knows where the comma was hidden.',
    ],
  },
};

export const Z_DESTINATION = {
  title: 'Z — Wisdom',
  body: 'Wisdom is the capacity to perform lossy compression at the fidelity appropriate to a given channel while retaining awareness of what the compression discards. §8 tells you when maturation converges. §7 tells you how communication fails when it does not. κ tells you which compromise you chose.',
};

/** Spread paper + journey props into PanelLayout */
export function paperProps(panelId: string) {
  const c = panelContent[panelId];
  if (!c) return {};
  return {
    paperSection: c.paperSection,
    paperExcerpt: c.paperExcerpt,
    journeyStep: c.journeyStep,
    journeyTotal: c.journeyTotal,
    fromPrevious: c.fromPrevious,
    toNext: c.toNext,
    derivation: c.derivation,
  };
}
