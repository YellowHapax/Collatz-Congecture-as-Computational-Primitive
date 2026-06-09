import React, { useMemo, useState } from 'react';
import { PanelLayout } from '@/components/PanelLayout';
import { Slider } from '@/components/controls';
import { MathDisplay } from '@/components/MathBlock';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from 'recharts';
import { paperProps } from '@/content/chapter8';

export function PanelH() {
  const [capacity, setCapacity] = useState(3);
  const [complexity, setComplexity] = useState(5);

  const data = useMemo(() => {
    const pts = [];
    for (let t = 0; t < 150; t++) {
      // High complexity signal
      let sig = Math.sin(t * 0.1) * complexity;
      // Add extra high-frequency noise if complexity is high
      if (complexity > 3) sig += Math.sin(t * 0.5) * (complexity - 3);
      if (complexity > 6) sig += Math.sin(t * 1.2) * (complexity - 6);

      // Clip bounds
      const clipped = Math.max(-capacity, Math.min(capacity, sig));
      pts.push({ t, raw: sig, received: clipped });
    }
    return pts;
  }, [capacity, complexity]);

  return (
    <PanelLayout
      id="panel-h"
      badge="#ef4444"
      badgeText="Failure Mode 3: Bandwidth"
      handle="Too Big a Pipe Into Too Small a Port"
      intuition={<p>A high-complexity signal forced through a channel with insufficient capacity loses information. The receiver physically cannot represent what's being sent. The system must mature (widen its band) before it can process it.</p>}
      mathEq={<div className="font-mono text-center text-red-400">capacity &lt; signal complexity</div>}
      mathGloss={
        <>
          <p>Concept: Developmental capacity limitation. The receiver doesn't have the states to encode the signal.</p>
        </>
      }
      mbdConnection="The Horizon H doesn't yet contain the states needed to encode the signal."
      visual={
        <div className="w-full h-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis dataKey="t" hide />
              <YAxis domain={[-10, 10]} hide />
              <ReferenceLine y={capacity} stroke="#ef4444" strokeDasharray="3 3" />
              <ReferenceLine y={-capacity} stroke="#ef4444" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="raw" stroke="#4b5563" strokeWidth={1} dot={false} isAnimationActive={false} opacity={0.5} />
              <Line type="monotone" dataKey="received" stroke="#eab308" strokeWidth={3} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      }
      controls={
        <div className="grid grid-cols-2 gap-4">
          <Slider label="Receiver Capacity" value={capacity} min={0.5} max={10} onChange={setCapacity} />
          <Slider label="Signal Complexity" value={complexity} min={1} max={10} onChange={setComplexity} />
        </div>
      }
      {...paperProps('panel-h')}
    />
  );
}
