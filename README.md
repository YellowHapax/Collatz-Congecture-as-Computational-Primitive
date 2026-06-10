# Collatz as Computational Primitive

**Author:** Brandon M. Everett (BME / Hapax) · Noetic Lab  
**ORCID:** [0009-0007-6676-4897](https://orcid.org/0009-0007-6676-4897)

This repository collects versions of the working paper/framework **"Collatz as
Computational Primitive: The Analog-Digital Interface."** The framework reframes
Collatz-type iteration as a computational primitive for reduction between
incommensurate scales, with analogies across number theory, musical temperament,
signal processing, and Memory as Baseline Deviation (MBD) communication dynamics.

## Live site (GitHub Pages)

**[https://yellowhapax.github.io/Collatz-Conjecture-as-Computational-Primitive/](https://yellowhapax.github.io/Collatz-Conjecture-as-Computational-Primitive/)**

Interactive **Chapter 8 Tutor** — A→Z explainer for §8 *Cognitive Renormalization Group Flow*: paper excerpts, derivation steps, and simulations (Routh–Hurwitz bound, failure modes, κ temperament).

## Version index

| Version | Folder | Notes |
|---|---|---|
| v1 | [`versions/v1/`](versions/v1/) | Initial working paper draft. |
| v2 | [`versions/v2/`](versions/v2/) | Revised working paper with tightened epistemic claims, corrected Conway/undecidability framing, and clearer scope notes. |

The latest draft is [`versions/v2/paper.md`](versions/v2/paper.md).

| Format | File |
|--------|------|
| Markdown (v2) | [versions/v2/paper.md](versions/v2/paper.md) |
| PDF (v2) | [Collatz as Computational Primitive V2.pdf](Collatz%20as%20Computational%20Primitive%20V2.pdf) |

## Repository layout

```text
.
+-- README.md
+-- Collatz as Computational Primitive V2.pdf
+-- web/                               ← Chapter 8 Tutor (Vite/React)
+-- .github/workflows/deploy-pages.yml ← GitHub Pages CI
`-- versions/
    +-- v1/
    |   +-- README.md
    |   `-- paper.md
    `-- v2/
        +-- README.md
        `-- paper.md
```

## Reading order

Start with v2 unless you specifically need the original formulation. Keep v1 for
lineage and comparison; use v2 as the current canonical working-paper version.

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
