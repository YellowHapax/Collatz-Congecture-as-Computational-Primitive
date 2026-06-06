# Collatz as Computational Primitive: The Analog-Digital Interface

**Author:** Brandon M. Everett (BME / Hapax)
**ORCID:** 0009-0007-6676-4897
**Affiliation:** Independent Researcher; Noetic Lab
**Date:** June 2026
**Status:** Working Paper — Noetic Lab Series (v2)
**Repository:** github.com/YellowHapax

> **Revision note (v2):** This version tightens the epistemic claims of v1. Identity language ("structurally identical," "isomorphic") has been demoted to analogy throughout; the inference from Conway's class-level undecidability to the unprovability of the specific 3n+1 conjecture has been corrected (§1, §2, §6); the 2×2 matrix encoding is now described as retrospective rather than generative (§2); the §8 memory kernel is presented as following from a stated assumption rather than as an assumption-free derivation (§8.1); and the cross-domain table is labeled as conjectured family resemblances (§9). The §8 renormalization-group result is unchanged and stands as the paper's one self-contained *formal* result; the conceptual contributions — the machine-class reframing, the four-mode failure taxonomy, and the temperament-κ synthesis — stand on their own terms as conceptual work.

---

## Abstract

The Collatz conjecture is conventionally treated as an open problem in number theory: does every positive integer eventually reach 1 under the map *n → n/2* (even) or *n → 3n+1* (odd)? This paper reframes the conjecture as a specimen of a broader computational primitive — iterative arithmetic reduction between incommensurate scales — and argues that this primitive appears across number theory, acoustics, signal processing, and cognition. The two branches of the Collatz map encode a fundamental tension: the even step (÷2) performs digital reduction, while the odd step (3n+1) introduces analog complexity at a scale incommensurate with the binary grid. This tension is structurally analogous to the Pythagorean comma in music (the irreducible gap between powers of 2 and powers of 3), the successive-approximation architecture of analog-to-digital converters, and — via the Memory as Baseline Deviation (MBD) framework — the negotiation dynamics between coupled cognitive agents maintaining incommensurate baselines. The analogy is partial: the Collatz odd step is affine (3n+1), whereas the acoustic generator is purely multiplicative (×3/2), and the additive term has no direct acoustic counterpart. The shared structure is the incommensurability of the 2-scale and the 3-scale, not an identity of mechanism. The paper classifies four mechanistically distinct failure modes of iterative reduction between incommensurate scales: the Wolf Interval (volitional refusal to temper), Truncation (compute-budget expiry), Bandwidth Mismatch (developmental capacity limitation), and True Divergence (structural non-convergence in bounded state space). The coupling parameter κ from MBD is identified as a temperament selector, parameterizing the system's position on a spectrum from Just Intonation (κ ≈ 0, maximum local fidelity, zero modulability) to Equal Temperament (κ ≈ 1, uniform error distribution, maximum global connectivity). A real-time temporal renormalization group flow is derived for the cognitive baseline, establishing that maturation corresponds to coarse-graining over progressively longer temporal windows, with a stability bound on the coupling between baseline parameters given by the Routh-Hurwitz criterion. Wisdom is defined as the capacity to perform lossy compression at the fidelity appropriate to a given channel while retaining awareness of what the compression discards.

---

## 1. Introduction

The Collatz conjecture has resisted proof for nearly ninety years. This paper argues that the resistance is informative. Conway (1972) proved that the *generalized* class of Collatz-type maps is Turing complete and that the general Collatz-type halting problem is undecidable. The specific 3n+1 conjecture is a single fixed instance of that family — a Π₂ arithmetic statement with a definite truth value — so the undecidability of the general problem does not prove the specific instance unprovable. What it establishes is that the conjecture belongs to a machine class capable of computationally irreducible behavior in the sense of Wolfram (2002), which makes the conjecture plausibly hard without settling whether it is provable. The utility of the Collatz map lies not in resolving the conjecture but in recognizing the *machine class* it belongs to and engineering with the properties of that class.

The central claim is that iterative reduction between incommensurate scales constitutes a computational primitive — a minimal process that recurs wherever two incompatible measurement bases must be reconciled. Different formal descriptions of such processes (FRACTRAN, cellular automata, PDEs, quantum field theory) make different structures exact and different structures approximate, in the same way that different musical temperaments make different intervals pure and others approximate. The choice between descriptions is, in this sense, a matter of temperament: which approximations a given framework chooses to absorb.

The paper proceeds as follows. Section 2 establishes the Collatz map as a deterministic encoding machine rather than an unsolved theorem. Section 3 identifies the analog-digital tension encoded in its two branches. Section 4 develops the acoustic parallel through the Pythagorean comma and the theory of musical temperament. Section 5 maps the primitive onto the MBD framework's architecture of coupled cognitive agents. Section 6 inverts the conventional reading: the analog is not the anomaly intruding on a digital system, but the substrate from which digital structure emerges under communicative pressure. Section 7 classifies four distinct failure modes of inter-scale reduction. Section 8 formalizes the bandwidth maturation problem as a real-time temporal renormalization group flow, deriving the stability conditions under which a cognitive baseline converges to a scale-invariant fixed point. Section 9 surveys the primitive's appearance across domains. Section 10 identifies open questions and directions for further formalization.

---

## 2. Collatz as Machine, Not Theorem

The standard framing treats the Collatz conjecture as a question about convergence. The reframe treats it as a deterministic process that converts any positive integer into a structured binary string — the parity sequence of even and odd operations applied during its trajectory. This encoding is a bijection: the parity string uniquely determines the starting number and vice versa.

Each number's trajectory is a word in a free monoid generated by two affine maps expressed in homogeneous coordinates:

- Even step: `[[1/2, 0], [0, 1]]`
- Odd step: `[[3, 1], [0, 1]]`

Once the parity sequence of a trajectory is known, that trajectory can be written as a product of these 2×2 matrices. The matrices describe the trajectory retrospectively; they do not compute it. The branch selection — apply the odd step if and only if n is odd — is a parity-dependent condition that no fixed linear operator and no product of these matrices can encode, since a product of linear maps is itself a linear map with no mechanism to read n mod 2 and choose a generator. The parity sequence drives the choice of matrices, not the reverse. With that caveat, the affine word is still informative: the odd step mixes additive and multiplicative structure, breaking distributivity, and this non-additivity is one source of the conjecture's difficulty.

The encoding is never shorter than standard binary representation (a minimum of log₂(n) halving steps are required), so it cannot serve as compression. It is a classification scheme, not a storage scheme.

Conway (1972) proved that generalized Collatz-type maps — iterative affine rules selected by residue class — are Turing complete, and that the general halting problem for this class is undecidable. The specific 3n+1 conjecture is a single instance of that class. Its truth value is definite; what is open is whether it is provable. The undecidability result therefore does not imply the conjecture cannot be proved — it locates the conjecture in a class capable of computationally irreducible behavior, which is a reason to expect difficulty, not a proof of unprovability. This distinction matters: a class-level undecidability result and an instance-level open problem are different objects, and conflating them overstates what is known.

---

## 3. The Analog-Digital Interface

The two branches of the Collatz map encode a fundamental tension between incompatible scales:

The even step (÷2) is *digital*. It performs clean binary reduction — halving, right-shifting, draining energy from the system in units commensurate with the base-2 grid. This is the architecture of discrete computation.

The odd step (3n+1) is an *analog intrusion*. It introduces a scale factor of 3, which is incommensurate with powers of 2, inflating the number before the halving steps can reduce it. The odd step forces continuous, non-binary structure into a system that is trying to resolve into binary.

The Collatz map, read this way, is a number trying to go digital while the analog keeps fighting back.

Numbers with long trajectories despite small magnitude — the canonical example being 27, which requires 111 steps — are numbers with maximal analog character. They exhibit high resistance to binary reduction. In the monoid, they are resonances where the odd-step generator fires repeatedly before the even-step generator can damp the accumulated energy.

This structure already exists in hardware. A successive-approximation analog-to-digital converter (SAR ADC) is a Collatz-type machine: it iteratively performs binary reduction on a continuous signal. Compare, halve the range, repeat. The bit depth of the converter determines how many halving steps are permitted — how much digital resolution the system can extract from the analog input before the clock runs out.

---

## 4. The Pythagorean Comma and the Theory of Temperament

The acoustic domain provides the most transparent instance of the Collatz primitive.

The octave is multiplication by 2. The perfect fifth is multiplication by 3/2. Powers of 2 and powers of 3 never coincide:

> 3¹² = 531,441 ≠ 524,288 = 2¹⁹

The residual — the Pythagorean comma, a ratio of approximately 1.0136 — is the irreducible gap between the two scales. The circle of fifths is a Collatz trajectory for pitch: iterate between octaves and fifths, attempting to close the loop, and the loop refuses to close.

Every tuning system in the history of Western music is an engineered response to this gap — a designed set of stepping rules for managing the tension between the scale of 2 and the scale of 3:

- **Pythagorean tuning** keeps fifths pure and stacks them. The comma accumulates and is dumped entirely into a single interval (the Wolf fifth, typically G♯–E♭), producing a dissonance so severe that musicians named it after a howling animal.
- **Just intonation** keeps all harmonic ratios pure. The cost is that free modulation between keys is impossible; the system is locked to a single tonal center.
- **Meantone temperament** distributes the comma across a subset of fifths. Some keys remain nearly pure; others become unusable.
- **Equal temperament** distributes the error uniformly across all twelve semitones. No interval is acoustically pure, but every key is equally usable. Equal temperament is lossy compression of analog harmonic reality into a digital grid.

Each temperament is a different program running on the same substrate, producing different tradeoffs between local fidelity and global modulability.

Conway's FRACTRAN (1987) is the formalized version of this computational genus: a programming language in which a program is a list of fractions, execution is iterative multiplication, and the system is Turing complete. FRACTRAN is the disciplined engineering form; Collatz is the wild specimen. They belong to the same machine class.

---

## 5. Mapping to the MBD Framework

The Collatz analog-digital interface maps onto the core architecture of the Memory as Baseline Deviation framework (Everett, 2024–2026). This section depends on MBD's constructs — the coupling parameter κ, the baseline-deviation dynamics, the Break primitive — which are developed in the cited prior work and taken as given here. A reader who does not accept those constructs should read this section as a conditional mapping (*if* MBD's architecture holds, *then* the Collatz primitive describes its communication dynamics) rather than as an independent argument. The quantitative results of §8 inherit this dependency.

### 5.1 Two Agents, Two Incommensurate Baselines

Each agent in MBD maintains its own baseline — its own prime base for decomposing incoming signals. These baselines are incommensurate by construction, analogous to powers of 2 and powers of 3. The deviation between baselines is the Pythagorean comma of communication. It does not reach zero.

### 5.2 The Trajectory as Negotiation

The iterative exchange between agents is the Collatz trajectory:

- *Even steps* (÷2): Resonance events. Baselines synchronize momentarily. The gap halves. Alignment is achieved on a specific claim or shared reference.
- *Odd steps* (3n+1): Deviation spikes. One agent introduces structure that the other's baseline cannot absorb without reorganization. The gap amplifies before the next round of reduction can act.

Numbers that spiral extensively before resolving correspond to difficult conversations — exchanges where deviation spikes and resonance events alternate unpredictably before convergence. Numbers that collapse immediately correspond to trivial agreements where baselines already nearly coincide.

### 5.3 Pragmatism as Temperament

The moment agents stop trying to perfectly resolve their baselines and instead distribute the residual error into something actionable is the temperament step. Pragmatism *is* equal temperament applied to communication: close enough to function, with the comma hidden in the rounding.

### 5.4 κ as Temperament Selector

The coupling parameter κ from the MBD governing equation parameterizes where a system sits on the temperament spectrum:

- **κ ≈ 0 (Just Intonation):** The agent prioritizes fidelity to its own baseline (α dominates). Internal harmony is preserved. Modulability is zero. The agent can only couple with others sharing its exact, un-tempered prime base. This is the regime of echo chambers, ideological rigidity, and fundamentalism.
- **κ ≈ 0.5 (Meantone):** The agent compromises on some frequencies while keeping others pure. Communication succeeds in familiar keys (established topics, in-group language) but encounters Wolf Intervals in novel territory.
- **κ ≈ 1 (Equal Temperament):** The agent distributes prediction error uniformly. No single belief is perfectly faithful to uncompressed analog reality, but the system can couple freely with any other system. This is cosmopolitan, highly adaptive social cognition.

κ is the tuning wrench. It parameterizes the system's willingness to tolerate local prediction error for the sake of global connectivity.

### 5.5 The Comma as Structural Metadata

Two agent-pairs can reach the same γ-state (pragmatic agreement) via completely different Collatz trajectories. The trajectory shape — the sequence of resonance events and deviation spikes, the order of reductions, which agent dominated at each step — is the texture of the relationship. It encodes the path taken.

The comma does not vanish upon pragmatic collapse. It persists as latent structural information. In well-temperament (as distinct from equal temperament), the residual comma gives different keys their distinct character. In MBD, the residual deviation after pragmatic collapse carries structural information about the relationship. The comma is not noise. It is the unspoken context that explains why two agents can reach the "same" agreement and mean different things by it.

### 5.6 The Measurement Problem

The choice of what to measure deviation *in* constitutes the collapse.

Within a single agent, the full Collatz trajectory runs: uncommitted, superposed, analog. The system holds the entire parity string as live computation. Between agents, communication forces collapse: one definite bit must be emitted. The signal must be digitized — tempered — forced into bins the receiving system can absorb.

Deviation is not measured in absolute units. It is measured relative to the other agent's baseline, which is also moving. Both tuning forks vibrate, and the beat frequency between them is the only observable — but observing it changes both frequencies.

---

## 6. The Inversion: Digital Emerges from Analog

The framework inverts the intuitive reading of the Collatz map.

The 3n+1 step is not the anomaly. It is reality being reality — analog, irreducible, continuous. The ÷2 step is the one requiring explanation: the moment where continuous reality submits to binary reduction. The even step is the compromise that makes communication possible.

Consciousness is waveforms. Reality is analog. Irreducibility is not a theoretical claim; it is the empirical baseline. The question that requires answering was never "why is the interior of an agent analog?" but "why does digital structure emerge at all?"

The answer proposed here: digital is what happens when two analog systems need to communicate. A waveform cannot be transmitted through a waveform without collapsing something, because the receiver has a different resonant structure. The transmitting system must discretize — temper — force its signal into bins the receiving system can absorb. That is measurement. That is the even step.

Collatz does not describe analog noise contaminating a digital system. It describes a digital constraint attempting to tame an analog reality that keeps reasserting itself. The conjecture — "does every number reach 1?" — is really asking: can digital reduction always eventually capture any analog signal? Can communication always eventually succeed?

The conjecture remains open. The framework proposed here suggests a way to read what is at stake in it as a metaphor for communication: a message can be received whenever its reduction trajectory terminates within the receiver's compute budget and bandwidth, and — for the *general* class of such reduction processes — no procedure can determine in advance whether an arbitrary trajectory will terminate. That general undecidability is Conway's result, and it applies to the class, not to the single 3n+1 instance. The metaphor is therefore this: communication between incommensurate baselines inherits the difficulty of a class that contains genuinely undecidable members, even though any particular exchange either succeeds or does not. The claim is interpretive, not a theorem about the conjecture itself.

Wisdom, in this framework, is the capacity to perform lossy compression at the fidelity appropriate to a given channel while retaining awareness of what the compression discards. The wise agent does not mistake the tempered signal for the analog original. The wise agent knows the comma is there, knows where it was hidden, and can reconstruct what was lost when the situation demands it.

---

## 7. Failure Modes of Inter-Scale Reduction

Communication between incommensurate baselines can fail in four mechanistically distinct ways. Each has different dynamics, different signatures, and different implications for intervention.

### 7.1 The Wolf Interval — Refusal to Temper

When agents interact with low κ (low trust, low willingness to mistune their own baselines for the sake of the connection), they stack pure truths. They refuse to compress. The comma accumulates with every exchange.

Eventually, the accumulated deviation debt forces the system into the Wolf Interval: a catastrophic, singular prediction error. The musical analog is precise — in Pythagorean tuning, the comma is dumped entirely into one interval, producing a dissonance so violent that the instrument sounds as though it is breaking.

The Wolf Interval is the mathematical formalization of the Break primitive in MBD. It corresponds to a screaming argument, a divorce, a war. It is what happens when continuous analog reality is forced into a discrete digital system without pragmatic distribution of the error.

The agents had time. They had bandwidth. They refused to temper. This failure is volitional.

**Resolvable:** Yes, if κ increases — if trust, flexibility, or willingness to distribute error grows.

### 7.2 Truncation — The Clock Runs Out

The Collatz map assumes infinite patience. Cognition has a clock.

If the trajectory of a signal requires 111 steps and the attention budget permits 10, the system does not reach 1. It reaches whatever intermediate value it holds when the window closes and acts on that partial result. This is not temperament — temperament distributes error deliberately. This is truncation: the system treats its partial computation as truth because the window closed.

This is the dominant failure mode in ordinary miscommunication. The signal was honest, the agents were willing, but the trajectory was too long for the available compute budget.

Truncation explains the mechanics of propaganda directly. To manipulate through truncation, one need not lie. One need only inject signals with long trajectories — signals that resist binary reduction — at moments when the target audience's attention budget is nearly exhausted. The audience will act on whatever partial reduction they have computed when their budget expires. The manipulation consists not in falsifying the signal but in exploiting the mismatch between signal complexity and available processing time.

**Resolvable:** Yes, if the compute budget extends — if more time, attention, or processing capacity becomes available.

### 7.3 Bandwidth Mismatch — The System Must Mature

Irreducibility imposes a cognitive cost bounded by what we may call the thermal and temporal bands of the receiving system — its energy budget and time horizon.

Certain signals are reducible in principle but exceed the current processing capacity of the receiver. The signal is coherent. The trajectory terminates. But the receiving system's bandwidth cannot currently execute the computation. To a system operating at insufficient scale, quantum mechanics is not false — it is out of band.

This is not truncation, which implies the system could process the signal within its current capacity given more time. Bandwidth mismatch is a capacity limitation resolvable through growth. The system must mature — widen its thermal band, extend its temporal horizon — before the signal becomes processable.

Education is band-widening. Development is thermal expansion. Maturation is the process by which previously out-of-band signals become processable.

The critical diagnostic difficulty: bandwidth mismatch is indistinguishable from true divergence when observed from inside the limited system. "I cannot process this" does not reveal whether the limitation is developmental (not yet) or structural (not ever).

**Resolvable:** Yes, if the system matures — if capacity grows to meet the signal's requirements.

### 7.4 True Divergence — The Honeybadger

The actual Collatz counterexample, if one exists. A trajectory that does not terminate — not because it is long, but because it never converges.

True divergence, formalized precisely, is not dynamical instability (coordinates exploding to infinity). It is a bounded, non-repeating trajectory: the system remains in finite state space but never visits the same state twice and never settles into a periodic orbit. It is an infinite crawl through a bounded labyrinth.

Let the joint state of two coupled agents at step n be X_n, evolving under a deterministic transition operator T_κ. Dynamical instability is the condition ||X_n|| → ∞: the system explodes, the agent flees, somatic collapse occurs. True computational divergence is the distinct condition where ||X_n|| remains bounded for all n, yet X_n never equals X_m for any n ≠ m and never converges to a fixed point. The trajectory is confined but non-repeating — an infinite, self-avoiding walk through a finite-diameter space.

Applied to communication between agents: the baselines are structurally incommensurate. Not difficult. Not costly. Not premature. Impossible. The comma is not large — it is structurally infinite. The trajectory never reaches 1 because there is no 1 to reach for that particular pairing of baselines.

The Honeybadger does not resist convergence. It does not refuse convergence. It is not aware that convergence is being attempted. It is constitutionally, structurally divergent.

The practical horror of this failure mode is the undecidability: from inside a finite system, a very long trajectory cannot be distinguished from a divergent one. This uncertainty — *is this hard or is this impossible?* — keeps agents in interactions they should leave and drives other agents to abandon interactions they should have sustained.

Most of what appears divergent is bandwidth mismatch wearing the mask of the Honeybadger. The true counterexample is rarer and more specific than the initial horror suggests. But the framework must account for its possibility, because the halting problem guarantees that no finite-time diagnostic can reliably distinguish the two.

**Resolvable:** No. Convergence is structurally impossible for this pairing.

---

## 8. Cognitive Renormalization Group Flow

The bandwidth maturation problem identified in §7.3 admits a formal treatment as a real-time, real-space temporal renormalization group (RG) flow. This section derives the scaling dynamics from first principles, establishes the fixed-point structure, and identifies the exact stability boundary separating coherent maturation from clinical instability.

### 8.1 The Coarse-Graining Kernel from the Axiom of Fading Memory

Let I_raw(t) denote the high-frequency, continuous somatic and sensory input stream available to a cognitive agent. Processing this stream at full bandwidth would require infinite metabolic cost. The agent must coarse-grain over a temporal window τ.

The coarse-graining kernel is not arbitrary. It is derived from the physical constraint that un-associated sensory traces in biological neural substrates undergo first-order dissipative decay:

dM(t)/dt = −(1/τ) M(t)

where τ is the characteristic retention scale. The normalized Green's function of this dissipative operator is the memory-retention kernel:

K(t′, τ) = (1/τ) exp(−t′/τ)

Defining the logarithmic scale parameter μ = ln(τ), the coarse-grained baseline at scale μ is the convolution of the input history with this physically derived kernel:

B_i(μ) = ∫₀^∞ I_raw(t − t′) · e^(−μ) · exp(−t′ e^(−μ)) dt′

The exponential kernel follows from a single modeling assumption: that un-reinforced sensory traces decay at a rate proportional to their current activation (linear, first-order dissipation). Given that assumption, the exponential is the unique consequence; the assumption itself, however, is a choice, not a derivation. This is the sense in which the choice of kernel *is* the theory — a different dissipation law would yield a different kernel and a different flow. The first-order linear law is adopted here as the simplest hypothesis consistent with biological constraints, not as an established fact.

### 8.2 Coupled Scaling Dynamics of Baseline Parameters

The configuration state of the agent's baseline parser is a vector of three coupled, scale-dependent parameters:

Θ(μ) = [ θ_h(μ),  β(μ),  Γ(μ) ]ᵀ

where θ_h ∈ [0, 1] is the novelty-gating threshold (higher values filter more noise), β ∈ [0, 1] is the deontic trust decay rate (the rate at which κ-couplings weaken), and Γ ∈ [0, Γ_max] is the stimulus complexity sensitivity.

The scale-flow — the beta function of the system — is defined as the derivative with respect to the logarithmic temporal scale:

β(Θ) ≡ dΘ/dμ

These parameters do not evolve independently. They are coupled by three feedback loops grounded in the metabolic processing constraints of the agent:

**Novelty gating flow.** As the integration window widens (μ increases), the variance of the coarse-grained signal decreases through averaging. However, high complexity sensitivity (Γ) drives the agent to seek and generate high-frequency models, effectively lowering the gating threshold:

dθ_h/dμ = a₁(θ₀ − θ_h) − k₁Γ

where a₁ is the relaxation rate toward the ambient gating value θ₀, and k₁ is the coupling coefficient through which complexity-seeking suppresses noise filtering.

**Trust decay flow.** The effective decay rate of relational trust is stabilized internally but accelerated by ungated prediction error. A higher gating threshold filters transient noise (minor insults, situational friction), protecting relationship stability:

dβ/dμ = −a₂β + k₂(1 − θ_h)

where a₂ is the internal stabilization rate and k₂ captures how failure to gate noise accelerates trust erosion.

**Complexity flow.** The agent's capacity to tolerate and process complexity is constrained by the stability of its predictive and relational baseline. When trust decay is high, the system must shed complexity to prevent processing lock-up:

dΓ/dμ = a₃(Γ₀ − Γ) − k₃β

where a₃ is the relaxation rate toward base complexity capacity Γ₀, and k₃ captures how relational instability suppresses complexity processing.

### 8.3 Fixed-Point Structure

Setting the beta functions to zero yields a closed linear system:

a₁(θ₀ − θ_h*) − k₁Γ* = 0

−a₂β* + k₂(1 − θ_h*) = 0

a₃(Γ₀ − Γ*) − k₃β* = 0

The fixed-point coordinates are algebraically determined:

θ_h* = (a₁a₂a₃θ₀ − a₂k₁a₃Γ₀ + k₁k₂k₃) / (a₁a₂a₃ − k₁k₂k₃)

β* = (k₂/a₂)(1 − θ_h*)

Γ* = (a₃Γ₀ − k₃β*) / a₃

The fixed point is not asserted as a desirable state; it is the algebraic consequence of the coupled feedback structure. Its coordinates are fully determined by the six rate constants (a₁, a₂, a₃, k₁, k₂, k₃) and the two ambient set-points (θ₀, Γ₀).

Note that the fixed point exists only when the denominator a₁a₂a₃ − k₁k₂k₃ ≠ 0. When the coupling product equals the dissipation product, the system is degenerate — a critical transition point addressed in the stability analysis below.

### 8.4 Stability Analysis

The Jacobian of the flow evaluated at the fixed point is:

J = [ [−a₁,  0,   −k₁],
      [−k₂, −a₂,   0 ],
      [ 0,  −k₃,  −a₃] ]

The characteristic polynomial is:

(λ + a₁)(λ + a₂)(λ + a₃) + k₁k₂k₃ = 0

Expanding:

λ³ + (a₁ + a₂ + a₃)λ² + (a₁a₂ + a₂a₃ + a₁a₃)λ + (a₁a₂a₃ + k₁k₂k₃) = 0

Applying the Routh-Hurwitz stability criterion for a cubic polynomial P(λ) = λ³ + Aλ² + Bλ + C, the fixed point is a stable attractor if and only if all coefficients are positive and AB > C. The first condition is satisfied automatically since all rate constants are positive. The second condition yields the stability bound:

(a₁ + a₂ + a₃)(a₁a₂ + a₂a₃ + a₁a₃) > a₁a₂a₃ + k₁k₂k₃

which simplifies to:

**k₁k₂k₃ < (a₁ + a₂)(a₂ + a₃)(a₁ + a₃)**

This is the central result. The maximum permissible cross-parameter coupling is bounded exclusively by the pairwise sums of the self-dissipation rates. If the product of the inter-parameter couplings exceeds this threshold, the eigenvalues of the Jacobian cross into the right half-plane and the fixed point destabilizes through a Hopf bifurcation.

### 8.5 Interpretation

**The coherent regime** (k₁k₂k₃ below the bound): Under temporal coarse-graining, the agent's baseline parameters flow toward the stable fixed point. The gating threshold rises (filtering noise), trust decay stabilizes (relationships persist without constant verification), and complexity capacity settles at a sustainable level. This is maturation. The system constructs what amounts to an effective field theory of its environment — a coarse-grained representation that discards high-frequency volatility while preserving the large-scale structure needed for adaptive action.

**The unstable regime** (k₁k₂k₃ above the bound): The feedback loops are too tightly coupled. Minor gating failures catastrophically destabilize trust, which recursively collapses complexity processing, which further degrades gating. The system cannot find a scale-invariant resting state. Under coarse-graining, the parameters oscillate or diverge rather than converging. This is the formal signature of chronic dysregulation — not a failure of will but a structural condition in which the coupling topology prevents convergence to a stable fixed point.

### 8.6 Scope and Limitations

The coupled system presented here is a first-order linear approximation. It describes the local perturbation dynamics around the fixed point — how the system recovers from small deviations. It does not capture the global, nonlinear phenomena that characterize large-amplitude disruptions: saturation effects (parameters cannot exceed their physical bounds), threshold behaviors (trust may hold until a critical point, then collapse discontinuously), and hysteresis (the path back to stability differs from the path away from it).

The full nonlinear system F(Θ) is approximated near the fixed point as:

dΘ/dμ = F(Θ) ≈ F(Θ*) + J(Θ − Θ*)

where F(Θ*) = 0 by definition. The linear analysis determines *whether* the fixed point is stable and *how* the system approaches it locally. The nonlinear terms determine the basin of attraction — how far the system can be displaced and still return. Characterizing the basin of attraction is a necessary extension but constitutes a separate formal problem.

---

## 9. Generality of the Primitive

The same structural pattern — iterative reduction between incommensurate scales — appears to recur across domains. The table below lists conjectured family resemblances, not demonstrated instances of an identical mechanism. Some rows (electronics, music) are close structural parallels; others (physics, markets, propaganda) are looser and are offered as hypotheses to be tested rather than established mappings. In particular, decoherence and the Born rule are not Collatz-type iterations in any technical sense; that row marks a suggestive resemblance only.

| Domain | Scale 1 | Scale 2 | Trajectory | Temperament |
|---|---|---|---|---|
| Number theory | Powers of 2 | Powers of 3 | Collatz sequence | (unknown) |
| Music | Octave (×2) | Fifth (×3/2) | Circle of fifths | Equal temperament, etc. |
| Electronics | Continuous signal | Binary grid | ADC conversion | Bit depth / sample rate |
| Cognition (MBD) | Agent A baseline | Agent B baseline | Communication exchange | Pragmatic agreement |
| Physics | Wavefunction | Measurement basis | Decoherence | Born rule collapse |
| Markets | Fundamental value | Traded price | Price discovery | Settlement / clearing |
| Propaganda | Ground truth | Imposed narrative | Resistance / compliance | Consensus formation |

The conjecture is one instance of the machine class. The machine class — and the question of which of these domains genuinely instantiate it — is the asset.

---

## 10. Open Questions

1. **Designed stepping rules.** Can FRACTRAN-type programs be engineered for specific MBD communication tasks with provable convergence properties, analogous to the way equal temperament was engineered for tonal modulation?

2. **κ-temperament derivation.** The κ spectrum (§5.4) is parameterized and named. The next step is demonstrating that coupling dynamics produce temperament-like error distributions as a mathematical consequence — deriving the spectrum from the dynamics rather than labeling it post hoc.

3. **Wolf Interval prediction.** If comma accumulation can be written as a function of κ and exchange count, the Wolf Interval becomes predictive — specifying when a low-κ interaction will catastrophically break.

4. **Truncation economics.** What determines the cognitive compute budget? How does attention allocation interact with signal complexity to produce the specific partial reductions that agents act on? This connects to bounded rationality (Simon, 1956) and satisficing, but with the Collatz primitive providing the specific mechanism of partial reduction.

5. **Nonlinear basin of attraction.** The linear stability analysis (§8.4) determines local behavior near the fixed point. The global question — how large a perturbation the system can absorb and still return to the stable state — requires characterizing the basin of attraction of the full nonlinear system. This is equivalent to asking: how bad can the disruption be before the system cannot self-repair?

6. **Divergence detection.** Is there a finite-time diagnostic that can distinguish bandwidth mismatch from true divergence, even approximately? Or is the undecidability fundamental — a direct consequence of the halting problem applied to cognitive systems?

7. **Resonance classification.** Can the Collatz tree topology (where proximity indicates dynamical similarity) be used to classify agent-pairs by expected negotiation difficulty and likely failure mode?

---

## Lineage

- Collatz, L. (1937). The original conjecture.
- Conway, J. H. (1972). Unpredictable iterations. *Proceedings of the 1972 Number Theory Conference*, University of Colorado, Boulder, 49–52. [Turing completeness of generalized Collatz maps.]
- Conway, J. H. (1987). FRACTRAN: A simple universal programming language for arithmetic. *Open Problems in Communication and Computation*, Springer, 4–26.
- Simon, H. A. (1956). Rational choice and the structure of the environment. *Psychological Review*, 63(2), 129–138.
- Wolfram, S. (2002). *A New Kind of Science*. Wolfram Media. [Computational irreducibility; cellular automata classification.]
- Werckmeister, A. (1691). *Musicalische Temperatur*. [Well-temperament as engineered comma distribution.]
- Everett, B. M. (2024–2026). The Memory as Baseline Deviation (MBD) Framework. Papers 1–9. Zenodo / PhilArchive. [Memory as Baseline Deviation; κ-coupled stochastic agents; Resonant Attenuation model; Break primitive.]

---

*This paper proposes that Collatz-type iterative reduction between incommensurate scales is a useful lens for analog-to-digital conversion, acoustic temperament theory, and — conditional on the MBD framework — communication dynamics between coupled cognitive agents. The connections are advanced as structural analogies, not identities; the shared feature is the incommensurability of a 2-scale and a 3-scale, not a common mechanism. The paper's one self-contained *formal* result is in §8: a real-time temporal renormalization group model of a cognitive baseline whose stability bound on inter-parameter coupling, k₁k₂k₃ < (a₁+a₂)(a₂+a₃)(a₁+a₃), follows from the Routh-Hurwitz criterion. Its conceptual contributions — the reframing of Collatz as a machine class to engineer with, the four-mode failure taxonomy (Wolf Interval, Truncation, Bandwidth Mismatch, True Divergence), and the temperament-κ synthesis — stand as conceptual work rather than theorems. It defines wisdom as the capacity to perform lossy compression at the fidelity appropriate to a given channel while retaining awareness of what the compression discards. Conway's undecidability result is class-level and does not establish that the specific 3n+1 conjecture is unprovable.*
