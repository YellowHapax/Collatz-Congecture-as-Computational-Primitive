import React, { useState, useMemo } from 'react';
import { PanelLayout } from '@/components/PanelLayout';
import { Toggle } from '@/components/controls';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { paperProps } from '@/content/chapter8';

export function PanelI() {
  const [isDivergent, setIsDivergent] = useState(true);

  const data = useMemo(() => {
    const pts = [];
    let state = 0.5;
    let v = 0.05;
    for (let t = 0; t < 200; t++) {
      if (isDivergent) {
        // Pseudo-chaotic bounded walk
        state = (state + v) % 1;
        v = (v + Math.sin(state * 10) * 0.1) % 0.2;
      } else {
        // Bandwidth mismatch masquerading as chaos
        state = (Math.sin(t * 0.1) * Math.sin(t * 0.3) + 1) / 2;
      }
      pts.push({ t, state });
    }
    return pts;
  }, [isDivergent]);

  return (
    <PanelLayout
      id="panel-i"
      badge="#ef4444"
      badgeText="Failure Mode 4: True Divergence"
      handle="It Just Doesn't Converge"
      intuition={<p>A trajectory in bounded state space that genuinely never settles. The undecidability-flavored case. The practical horror is: from inside a finite system, very complex structure looks identical to true chaos.</p>}
      mathEq={<div className="font-mono text-center text-red-400">||X_n|| remains bounded, X_n ≠ X_m</div>}
      mathGloss={
        <>
          <p>Concept: Structural non-convergence. The undecidability-flavored case.</p>
        </>
      }
      mbdConnection="Distinguishing this from bandwidth mismatch may be undecidable in finite time—the open question."
      visual={
        <div className="w-full h-full relative p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis dataKey="t" hide />
              <YAxis domain={[-0.5, 1.5]} hide />
              <Line type="stepAfter" dataKey="state" stroke="#a855f7" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      }
      controls={
        <div className="flex justify-center">
          <Toggle label={isDivergent ? "Mode: True Divergence" : "Mode: Bandwidth Mismatch"} checked={isDivergent} onChange={setIsDivergent} />
        </div>
      }
      {...paperProps('panel-i')}
    />
  );
}
