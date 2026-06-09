import React from "react";
import { cn } from "@/lib/utils";

interface PanelLayoutProps {
  id: string;
  badge?: string;
  badgeText?: string;
  handle: string;
  intuition: React.ReactNode;
  mathEq: React.ReactNode;
  mathGloss: React.ReactNode;
  mbdConnection: React.ReactNode;
  visual: React.ReactNode;
  controls?: React.ReactNode;
  className?: string;
  /** Paper section ref, e.g. §8.1 */
  paperSection?: string;
  /** Excerpt from the manuscript for this panel */
  paperExcerpt?: string;
  /** A→Z journey position */
  journeyStep?: number;
  journeyTotal?: number;
  fromPrevious?: string;
  toNext?: string;
  /** Numbered steps: how we derived this panel from the last */
  derivation?: string[];
}

export function PanelLayout({
  id,
  badge,
  badgeText,
  handle,
  intuition,
  mathEq,
  mathGloss,
  mbdConnection,
  visual,
  controls,
  className,
  paperSection,
  paperExcerpt,
  journeyStep,
  journeyTotal,
  fromPrevious,
  toNext,
  derivation,
}: PanelLayoutProps) {
  return (
    <div
      id={id}
      className={cn(
        "min-h-screen w-full snap-start snap-always py-16 px-4 md:px-8 lg:px-12 flex flex-col justify-center border-b border-slate-800/60 bg-[#0a0c10] text-slate-300 font-sans",
        className
      )}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Journey strip */}
        {journeyStep != null && journeyTotal != null && (
          <div className="mb-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 px-1">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400">
                Journey {journeyStep} / {journeyTotal}
              </span>
              <div className="h-1.5 w-24 md:w-32 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${(journeyStep / journeyTotal) * 100}%` }}
                />
              </div>
            </div>
            {fromPrevious && (
              <p className="text-[11px] text-slate-500 leading-snug flex-1">
                <span className="text-slate-600 font-mono uppercase text-[9px] mr-2">From ←</span>
                {fromPrevious}
              </p>
            )}
            {toNext && (
              <p className="text-[11px] text-slate-400 leading-snug flex-1">
                <span className="text-blue-500/70 font-mono uppercase text-[9px] mr-2">Toward →</span>
                {toNext}
              </p>
            )}
          </div>
        )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bento Grid Item 1: Interactive Visualization + Controls (Span 2 Columns) */}
        <div className="lg:col-span-2 bg-[#0d1117]/60 rounded-xl border border-slate-850 p-6 relative flex flex-col gap-4 shadow-xl backdrop-blur-sm">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800/40">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: badge || '#3b82f6' }}></span>
              Interactive Simulation
            </h2>
            {badgeText && (
              <span
                className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono border"
                style={{
                  color: badge || '#3b82f6',
                  borderColor: (badge || '#3b82f6') + '40',
                  backgroundColor: (badge || '#3b82f6') + '10',
                }}
              >
                {badgeText}
              </span>
            )}
          </div>

          {/* Interactive visual canvas */}
          <div className="flex-1 min-h-[280px] md:min-h-[380px] bg-black/40 rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center p-2">
            {visual}
          </div>

          {/* Symmetrical Controls Tray */}
          {controls && (
            <div className="bg-black/20 p-4 rounded-lg border border-slate-800/40 mt-1">
              {controls}
            </div>
          )}
        </div>

        {/* Bento Grid Column 2: Context, Math & Conceptual Grounding (Stack of Cards) */}
        <div className="flex flex-col gap-6">
          
          {/* Card 2: Handle & Core Intuition */}
          <div className="bg-[#0d1117]/60 rounded-xl border border-slate-850 p-6 flex flex-col justify-center shadow-xl backdrop-blur-sm min-h-[160px]">
            <span className="text-[10px] text-blue-400 font-mono uppercase tracking-wider mb-1">Handle:</span>
            <h2 className="text-xl md:text-2xl font-serif italic text-white mb-3">"{handle}"</h2>
            <div className="text-xs md:text-sm leading-relaxed text-slate-400 font-sans space-y-2">
              {intuition}
            </div>
          </div>

          {/* Card 3: Formats and Math Formulation */}
          <div className="bg-[#0d1117]/60 rounded-xl border border-slate-850 p-6 flex flex-col justify-center gap-3 font-mono shadow-xl backdrop-blur-sm">
            <div className="text-[10px] text-blue-400 uppercase tracking-widest">Governing Dynamics</div>
            <div className="bg-black/30 rounded border border-white/5 p-4 my-1 flex items-center justify-center">
              {mathEq}
            </div>
            <div className="space-y-1.5 text-[11px] leading-relaxed text-slate-400 border-t border-slate-800/40 pt-3">
              {mathGloss}
            </div>
          </div>

          {/* Card 4: From the Paper */}
          {paperExcerpt && (
            <div className="bg-[#0d1117]/60 rounded-xl border border-amber-900/30 p-6 flex flex-col gap-3 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-amber-500/90 font-mono uppercase tracking-wider">From the Paper</span>
                {paperSection && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 bg-amber-950/50 text-amber-400/80 rounded border border-amber-900/40">
                    {paperSection}
                  </span>
                )}
              </div>
              <blockquote className="text-xs md:text-sm leading-relaxed text-slate-400 font-serif italic border-l-2 border-amber-700/40 pl-4">
                "{paperExcerpt}"
              </blockquote>
            </div>
          )}

          {/* Card 5: Derivation (A→Z) */}
          {derivation && derivation.length > 0 && (
            <div className="bg-[#0d1117]/60 rounded-xl border border-slate-850 p-6 flex flex-col gap-3 shadow-xl backdrop-blur-sm">
              <span className="text-[10px] text-blue-400 font-mono uppercase tracking-wider">How we get here</span>
              <ol className="space-y-2 text-[11px] leading-relaxed text-slate-400 list-decimal list-inside marker:text-slate-600">
                {derivation.map((step, i) => (
                  <li key={i} className="pl-1">{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Card 6: Framework Mapping (MBD Connection) */}
          <div className="bg-[#0d1117]/60 rounded-xl border border-slate-850 p-6 flex flex-col justify-between shadow-xl backdrop-blur-sm mt-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] text-blue-400 font-mono uppercase tracking-wider">MBD Connection</span>
              <div className="h-px flex-1 bg-slate-800/50" />
            </div>
            <p className="text-xs md:text-sm italic font-serif leading-relaxed text-slate-300">
              "{mbdConnection}"
            </p>
            <div className="mt-4 flex justify-between items-center text-[9px] text-slate-500 font-mono border-t border-slate-800/40 pt-3">
              <span>Chapter 8 Framework</span>
              <span className="px-1.5 py-0.5 bg-slate-800/80 text-slate-400 rounded">VERIFIED</span>
            </div>
          </div>

        </div>

      </div>
      </div>
    </div>
  );
}
