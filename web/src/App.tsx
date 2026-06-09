import React, { useEffect, useState } from 'react';
import { PanelA } from './panels/PanelA';
import { JourneyRail } from './components/JourneyRail';
import {
  CHAPTER_ABSTRACT,
  CHAPTER_TITLE,
  JOURNEY_OVERVIEW,
  Z_DESTINATION,
  panelContent,
} from './content/chapter8';
import { MANUSCRIPT_MD, MANUSCRIPT_PDF, REPO_URL } from './lib/site';
import { PanelB } from './panels/PanelB';
import { PanelC } from './panels/PanelC';
import { PanelD } from './panels/PanelD';
import { PanelE } from './panels/PanelE';
import { PanelF } from './panels/PanelF';
import { PanelG } from './panels/PanelG';
import { PanelH } from './panels/PanelH';
import { PanelI } from './panels/PanelI';
import { PanelJ } from './panels/PanelJ';

const panels = Object.values(panelContent).map((p) => ({
  id: p.id,
  label: p.label,
  tag: p.tag,
}));

const tagToId = Object.fromEntries(panels.map((p) => [p.tag, p.id]));

export default function App() {
  const [activeTag, setActiveTag] = useState('A');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;

    const sectionIds = panels.map((p) => p.id);
    const onScroll = () => {
      const viewportMid = main.scrollTop + main.clientHeight * 0.35;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= viewportMid) {
          setActiveTag(panels[i].tag);
          break;
        }
      }
    };

    main.addEventListener('scroll', onScroll, { passive: true });
    return () => main.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-[#0a0c10] text-slate-300 min-h-screen font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Bento Grid Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0c10]/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-col text-center lg:text-left">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="text-blue-500">Chapter 8</span> Tutor
              <span className="text-[9px] uppercase tracking-widest bg-slate-800/80 px-2 py-0.5 rounded text-slate-400 border border-slate-700/50">
                A→Z Explainer
              </span>
            </h1>
            <p className="text-[11px] mt-1 text-slate-500 max-w-2xl hidden md:block">
              {CHAPTER_TITLE} — paper text, derivation steps, and interactive panels. Math Tutor pattern for the Collatz / MBD manuscript.
            </p>
          </div>

          {/* Quick-Jump Navigation Dots/Badges */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {panels.map((p, i) => (
              <button
                key={p.id}
                onClick={() => scrollTo(p.id)}
                title={p.label}
                className="text-[10px] font-mono font-bold w-6 h-6 flex items-center justify-center bg-slate-900 border border-slate-800/80 rounded text-slate-400 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/40 transition-all cursor-pointer active:scale-95"
              >
                {p.tag}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="snap-y snap-mandatory h-screen w-full overflow-y-auto overflow-x-hidden pt-20">
        
        {/* Intro Panel stylized as a masterclass Bento Cover */}
        <section className="min-h-screen flex flex-col justify-center items-center px-4 md:px-8 snap-start snap-always max-w-7xl mx-auto py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            
            {/* Huge cover bento card */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#0d1117] to-[#0d1117]/40 border border-slate-800/80 rounded-2xl p-8 md:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              <div>
                <span className="text-xs uppercase tracking-widest text-blue-400 font-mono font-bold">Interactive Explainer</span>
                <h1 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-white mt-3 mb-6">
                  Chapter 8: {CHAPTER_TITLE}
                </h1>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl">
                  {CHAPTER_ABSTRACT}
                </p>
                <p className="text-xs text-slate-500 mt-4 leading-relaxed max-w-2xl">
                  Each panel (A–J) shows the manuscript excerpt for that step, a numbered derivation of how we got here from the last step, and a simulation. Panels A–E are §8 proper; F–J connect §7 failure modes and §5 κ back to the formal result.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 items-center mt-12">
                <button
                  onClick={() => scrollTo('panel-a')}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold rounded-lg transition-colors shadow-lg shadow-blue-900/35 cursor-pointer active:scale-95"
                >
                  Start Chapter Simulation ↓
                </button>
                <span className="text-[10px] font-mono text-slate-500">
                  Scroll for next visual panel or use navigation quick keys (A-J).
                </span>
              </div>
            </div>

            {/* A→Z roadmap */}
            <div className="lg:col-span-3 bg-[#0d1117]/40 border border-slate-800/60 rounded-xl p-5 grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
              {JOURNEY_OVERVIEW.map((step) => (
                <button
                  key={step.tag}
                  type="button"
                  onClick={() => scrollTo(tagToId[step.tag])}
                  className="text-left p-2 rounded-lg border border-slate-800/60 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all cursor-pointer"
                >
                  <span className="text-[10px] font-mono font-bold text-blue-400">{step.tag}</span>
                  <p className="text-[9px] text-slate-500 leading-tight mt-1">{step.headline}</p>
                </button>
              ))}
            </div>

            {/* Accompanying info sidebar board */}
            <div className="bg-[#0d1117]/50 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between gap-6 shadow-2xl">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-slate-400 font-mono font-bold mb-3">Target Formula</h3>
                <div className="bg-black/40 border border-white/5 rounded-lg p-5 text-center font-mono text-sm text-blue-400">
                  k₁k₂k₃ &lt; (a₁+a₂)(a₂+a₃)(a₁+a₃)
                </div>
                <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                  The strict thermodynamic and mechanical threshold bounding cross-parameter coupling against the pairwise self-restoration coefficients within cognitive architectures.
                </p>
              </div>

              <div className="border-t border-slate-800/80 pt-4 flex flex-col gap-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Manuscript</div>
                <a href={MANUSCRIPT_MD} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300 font-mono transition-colors">
                  collatz_computational_primitive.md ↗
                </a>
                <a href={MANUSCRIPT_PDF} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300 font-mono transition-colors">
                  Full paper (PDF) ↗
                </a>
                <a href={REPO_URL} target="_blank" rel="noreferrer" className="text-xs text-slate-500 hover:text-slate-300 font-mono transition-colors">
                  Repository ↗
                </a>
              </div>

              <div className="border-t border-slate-800/80 pt-4 flex flex-col gap-2">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Affiliation</div>
                <div className="text-xs font-bold text-white font-mono">B.M. Everett | Noetic Lab</div>
                <div className="text-[10px] text-slate-500 font-mono">ORCID: 0009-0007-6676-4897</div>
              </div>
            </div>

          </div>
        </section>

        {/* The Panels */}
        <PanelA />
        <PanelB />
        <PanelC />
        <PanelD />
        <PanelE />
        <PanelF />
        <PanelG />
        <PanelH />
        <PanelI />
        <PanelJ />

        {/* Z — destination */}
        <section
          id="panel-z"
          className="min-h-[70vh] snap-start snap-always flex flex-col justify-center items-center px-6 py-20 border-t border-purple-900/30 bg-gradient-to-b from-[#0a0c10] to-[#120a18]"
        >
          <div className="max-w-2xl text-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400">Destination</span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-white mt-3 mb-6">{Z_DESTINATION.title}</h2>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed font-serif">{Z_DESTINATION.body}</p>
            <button
              type="button"
              onClick={() => scrollTo('panel-a')}
              className="mt-10 px-5 py-2.5 text-[11px] font-mono text-slate-400 border border-slate-700 rounded-lg hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
            >
              ↑ Restart from A
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="snap-start min-h-[50vh] flex flex-col items-center justify-center border-t border-slate-800/60 bg-[#07090d] text-slate-500 font-mono text-xs space-y-3 p-8">
          <p className="text-slate-400 font-semibold tracking-wider uppercase text-[10px]">Collatz Computational Primitive</p>
          <p>Brandon M. Everett (BME / Hapax) · Noetic Lab</p>
          <p>ORCID: 0009-0007-6676-4897</p>
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors text-blue-400/80">YellowHapax / Collatz-Congecture-as-Computational-Primitive</a>
          <div className="h-px w-24 bg-slate-800 my-4" />
          <p className="text-blue-400/40 italic">"everything I make is free"</p>
        </footer>
      </main>

      <JourneyRail activeTag={activeTag} onJump={scrollTo} />

      {/* Persistent Legend */}
      <div className="fixed bottom-4 left-4 z-50 p-4 bg-[#0a0c10]/95 backdrop-blur-md border border-slate-800/80 rounded-xl shadow-2xl hidden lg:block">
        <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 pb-1.5 border-b border-slate-800/50">Palette Legend</h4>
        <div className="space-y-2 text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-slate-400">Baseline (B)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span className="text-slate-400">Perturbation (I)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="text-slate-400">Deviation (ΔB)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-slate-400">Gate / Stable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span className="text-slate-400">Fixed Point (Θ*)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
