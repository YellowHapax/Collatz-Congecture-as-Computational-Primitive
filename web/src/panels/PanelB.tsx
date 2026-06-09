import React, { useState, useEffect, useMemo } from 'react';
import { PanelLayout } from '@/components/PanelLayout';
import { Button } from '@/components/controls';
import { MathDisplay, MathInline } from '@/components/MathBlock';
import { AreaChart, Area, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { paperProps } from '@/content/chapter8';

export function PanelB() {
  const [perturbation, setPerturbation] = useState(0);
  
  useEffect(() => {
    if (perturbation > 0) {
      const timer = setTimeout(() => setPerturbation(0), 100);
      return () => clearTimeout(timer);
    }
  }, [perturbation]);

  const data = useMemo(() => {
    const lambda = 0.1;
    let b = 0;
    const pts = [];
    for (let t = 0; t < 100; t++) {
      let input = Math.sin(t * 0.1) * 3;
      if (t > 40 && t < 45) {
         input += perturbation * 10;
      }
      
      b = b * (1 - lambda) + input * lambda;
      const gap = Math.abs(input - b);
      
      // We will plot the gap as the shaded area between them. 
      // Recharts doesn't natively shade between two generic lines easily without some tricks,
      // so we use simple baseline and input lines, and an area for the gap.
      // Actually better: AreaChart with range [input, b]
      pts.push({ t, input, baseline: b, range: [Math.min(input, b), Math.max(input, b)], gap });
    }
    return pts;
  }, [perturbation]);

  return (
    <PanelLayout
      id="panel-b"
      handle="The Gap"
      intuition={<p>Encoding doesn't care about the raw signal. It cares about the gap between what you expected (the baseline) and what happened (the input). You remember what broke prediction.</p>}
      mathEq={<MathDisplay math="\Delta B(t) = I(t) - B(t)" />}
      mathGloss={
        <>
          <p><MathInline math="\Delta B(t)" />: The deviation signal (the gap).</p>
        </>
      }
      mbdConnection="Encoding fires on the gap, not the raw input."
      visual={
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis dataKey="t" hide />
            <YAxis domain={[-10, 15]} hide />
            <Area type="monotone" dataKey="range" stroke="none" fill="#eab308" fillOpacity={0.6} isAnimationActive={false} />
            <Line type="monotone" dataKey="input" stroke="#f97316" strokeWidth={2} dot={false} isAnimationActive={false} />
            <Line type="monotone" dataKey="baseline" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      }
      controls={
        <div className="flex justify-center">
          <Button onClick={() => setPerturbation(0.5)}>Inject Perturbation</Button>
        </div>
      }
      {...paperProps('panel-b')}
    />
  );
}
