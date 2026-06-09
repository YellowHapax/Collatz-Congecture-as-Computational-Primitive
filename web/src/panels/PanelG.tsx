import React, { useState } from 'react';
import { PanelLayout } from '@/components/PanelLayout';
import { Slider, Button } from '@/components/controls';
import { paperProps } from '@/content/chapter8';

export function PanelG() {
  const [budget, setBudget] = useState(10);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  const startCollatz = () => {
    setRunning(true);
    let n = 27; // Canonical long example
    const hist = [n];
    let steps = 0;
    
    const interval = setInterval(() => {
      if (n === 1 || steps >= budget) {
        clearInterval(interval);
        setRunning(false);
        return;
      }
      n = n % 2 === 0 ? n / 2 : 3 * n + 1;
      hist.push(n);
      setHistory([...hist]);
      steps++;
    }, 100);
  };

  return (
    <PanelLayout
      id="panel-g"
      badge="#ef4444"
      badgeText="Failure Mode 2: Truncation"
      handle="Out of Budget"
      intuition={<p>Sometimes the trajectory just takes too long. If you run out of compute/attention budget before reaching clarity, you halt mid-trajectory. You act on a partial, incorrect result.</p>}
      mathEq={<div className="font-mono text-center text-red-400">Stop at N steps</div>}
      mathGloss={
        <>
          <p>Concept: Compute-budget expiry. Connects to bounded rationality / satisficing.</p>
        </>
      }
      mbdConnection="The partial reduction is what the agent acts on when attention runs out."
      visual={
        <div className="w-full h-full p-8 flex flex-col relative justify-end overflow-hidden pb-16 bg-gray-900 border border-gray-800">
          <div className="flex items-end gap-1 h-full w-full opacity-80">
            {history.map((val, i) => (
              <div 
                key={i} 
                className="bg-blue-500 w-full rounded-t transition-all duration-300 min-w-[2px]" 
                style={{ height: `${Math.min(100, (val / 9232) * 100)}%` }} // 9232 is peak for 27
              />
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-4 text-center font-mono text-gray-400 text-xs">
            {history.length > 0 ? `Step: ${history.length - 1} / Value: ${history[history.length - 1]}` : 'Ready'}
            {!running && history.length > 0 && history[history.length - 1] !== 1 && (
               <span className="text-red-400 ml-2">(TRUNCATED)</span>
            )}
            {!running && history[history.length - 1] === 1 && (
               <span className="text-green-400 ml-2">(CONVERGED)</span>
            )}
          </div>
        </div>
      }
      controls={
        <div className="grid grid-cols-2 gap-8 items-center">
          <Slider label="Steps Allowed (Budget)" value={budget} min={5} max={115} step={1} onChange={setBudget} />
          <Button onClick={startCollatz} className={running ? 'opacity-50 cursor-not-allowed' : ''}>
            {running ? 'Computing...' : 'Run Collatz(27)'}
          </Button>
        </div>
      }
      {...paperProps('panel-g')}
    />
  );
}
