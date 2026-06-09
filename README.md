# Collatz as Computational Primitive

**Author:** Brandon M. Everett (BME / Hapax) · Noetic Lab  
**ORCID:** [0009-0007-6676-4897](https://orcid.org/0009-0007-6676-4897)

Working paper reframing the Collatz conjecture as a specimen of iterative arithmetic reduction between incommensurate scales — with connections to musical temperament, ADC architecture, and the Memory as Baseline Deviation (MBD) framework.

## Live site (GitHub Pages)

**[https://yellowhapax.github.io/Collatz-Congecture-as-Computational-Primitive/](https://yellowhapax.github.io/Collatz-Congecture-as-Computational-Primitive/)**

Interactive **Chapter 8 Tutor** — A→Z explainer for §8 *Cognitive Renormalization Group Flow*: paper excerpts, derivation steps, and simulations (Routh–Hurwitz bound, failure modes, κ temperament).

## Manuscript

| Format | File |
|--------|------|
| Markdown | [collatz_computational_primitive.md](collatz_computational_primitive.md) |
| PDF | [Collatz as Computational Primitive.pdf](Collatz%20as%20Computational%20Primitive.pdf) |

## Repository layout

```
collatz_computational_primitive.md   ← manuscript
Collatz as Computational Primitive.pdf
web/                               ← Chapter 8 Tutor (Vite/React)
.github/workflows/deploy-pages.yml ← GitHub Pages CI
```

## Local development (Chapter 8 Tutor)

```powershell
cd web
npm install
npm run dev
```

Open http://localhost:3000 — use `vite.config.ts` `base: '/'` temporarily if you want root paths locally.

Production build (matches GitHub Pages base path):

```powershell
npm run build
npm run preview
```

## Deploy

Pushes to **`main`** run `.github/workflows/deploy-pages.yml` and publish `web/dist` to GitHub Pages.

Enable once in repo settings: **Settings → Pages → Source: GitHub Actions**.

## Citation

Everett, B. M. (2026). *Collatz as Computational Primitive: The Analog-Digital Interface.* Noetic Lab Working Paper.
