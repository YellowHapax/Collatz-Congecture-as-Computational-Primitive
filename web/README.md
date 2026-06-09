# Chapter 8 Tutor — Collatz / MBD Educational App

Deployed at: [yellowhapax.github.io/Collatz-Congecture-as-Computational-Primitive](https://yellowhapax.github.io/Collatz-Congecture-as-Computational-Primitive/)

Interactive explainer for **§8 Cognitive Renormalization Group Flow** from *Collatz as Computational Primitive* (Everett / Noetic Lab). Built in the Math Tutor pattern: manuscript text beside each visualization, numbered derivation steps (A→Z), and hands-on controls.

## What each panel teaches

| Panel | Paper | Topic |
|-------|-------|-------|
| **A** | §8.1 | Leaky integrator / fading-memory kernel |
| **B** | MBD §5 | Deviation gap ΔB |
| **C** | §8.2 | Novelty gate θ_h |
| **D** | §8.1–8.2 | RG flow, μ = ln(τ) |
| **E** | §8.4 | Routh–Hurwitz stability bound |
| **F** | §7.1 | Wolf Interval (low κ) |
| **G** | §7.2 | Truncation / Collatz(27) |
| **H** | §7.3 | Bandwidth mismatch → motivates §8 |
| **I** | §7.4 | True divergence (Honeybadger) |
| **J** | §5.4 | κ temperament knob |
| **Z** | §6 | Wisdom — lossy compression with comma-awareness |

Curriculum text lives in `src/content/chapter8.ts` — edit excerpts and derivation steps there.

## Run locally

```powershell
cd "I:\Projects\Collatz Ch 8 Helper"
npm install
npm run dev
```

Open http://localhost:3000

## Build

```powershell
npm run build
npm run preview
```

## Project structure

```
src/
  content/chapter8.ts    ← paper excerpts, A→Z journey, derivation beats
  lib/
    rgKernel.ts          ← §8.1 exponential kernel convolution
    stability.ts         ← §8.4 Jacobian expm + Routh–Hurwitz
    temperament.ts         ← Pythagorean comma + κ distribution
  components/
    PanelLayout.tsx      ← viz + math + paper + derivation cards
    JourneyRail.tsx      ← fixed A→Z sidebar (xl screens)
  panels/PanelA–J.tsx    ← interactive simulations
```

## Simulation fidelity (completed TODOs)

| Panel | Implementation |
|-------|----------------|
| **D** | Discrete convolution with `K(t′,τ)=(1/τ)e^{-t′/τ}`; multi-offset convergence |
| **E** | `dξ/dμ = Jξ` integrated via `e^{Jμ}`; live `k₁k₂k₃` bound + `max Re(λ)` |
| **F** | Comma ratio `3¹²/2¹⁹` (~23.46¢); stack-fifth accumulation + Wolf spike at 12 |
| **J** | Shared `commaDistribution(κ)` with cent readout |

## Paper source

[github.com/YellowHapax/Collatz-Congecture-as-Computational-Primitive](https://github.com/YellowHapax/Collatz-Congecture-as-Computational-Primitive)

## Author

Brandon M. Everett (BME / Hapax) · Noetic Lab · ORCID 0009-0007-6676-4897
