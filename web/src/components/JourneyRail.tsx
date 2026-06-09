import React from 'react';
import { JOURNEY_OVERVIEW } from '@/content/chapter8';
import { cn } from '@/lib/utils';

interface JourneyRailProps {
  activeTag?: string;
  onJump: (id: string) => void;
}

const tagToId: Record<string, string> = {
  A: 'panel-a', B: 'panel-b', C: 'panel-c', D: 'panel-d', E: 'panel-e',
  F: 'panel-f', G: 'panel-g', H: 'panel-h', I: 'panel-i', J: 'panel-j',
};

export function JourneyRail({ activeTag, onJump }: JourneyRailProps) {
  return (
    <div className="hidden xl:flex fixed right-4 top-28 z-40 w-52 flex-col gap-1 p-3 bg-[#0a0c10]/95 backdrop-blur-md border border-slate-800/80 rounded-xl shadow-2xl max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h4 className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2 pb-1 border-b border-slate-800/50">
        A → Z Path
      </h4>
      {JOURNEY_OVERVIEW.map((step, i) => (
        <button
          key={step.tag}
          type="button"
          onClick={() => onJump(tagToId[step.tag])}
          className={cn(
            'text-left px-2 py-1.5 rounded-lg transition-all cursor-pointer group',
            activeTag === step.tag
              ? 'bg-blue-500/15 border border-blue-500/30'
              : 'hover:bg-slate-800/60 border border-transparent'
          )}
        >
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'text-[10px] font-mono font-bold w-5 h-5 flex items-center justify-center rounded',
                activeTag === step.tag ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-500 group-hover:text-blue-400'
              )}
            >
              {step.tag}
            </span>
            <span className="text-[10px] text-slate-400 leading-tight group-hover:text-slate-300">
              {step.headline}
            </span>
          </div>
          {i < JOURNEY_OVERVIEW.length - 1 && (
            <div className="ml-2.5 w-px h-2 bg-slate-800 my-0.5" />
          )}
        </button>
      ))}
      <div className="mt-3 pt-2 border-t border-slate-800/50">
        <span className="text-[9px] font-mono text-purple-400/80 uppercase tracking-wider">Z</span>
        <p className="text-[10px] text-slate-500 mt-1 leading-snug italic font-serif">Wisdom — lossy compression with comma-awareness</p>
      </div>
    </div>
  );
}
