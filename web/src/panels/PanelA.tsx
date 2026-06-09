import React, { useState, useEffect, useMemo } from 'react';
import { PanelLayout } from '@/components/PanelLayout';
import { Slider } from '@/components/controls';
import { MathDisplay, MathInline } from '@/components/MathBlock';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { paperProps } from '@/content/chapter8';

export function PanelA() {
  const [lambda, setLambda] = useState(0.1);
  const [noiseAmp, setNoiseAmp] = useState(2);
  
  const data = useMemo(() => {
    let b = 0;
    const pts = [];
    for (let t = 0; t < 100; t++) {
      // Simulate input: a sine wave plus noise
      const signal = Math.sin(t * 0.1) * 5;
      const noise = (Math.random() - 0.5) * 5 * noiseAmp;
      const input = signal + noise;
      
      b = b * (1 - lambda) + input * lambda;
      
      pts.push({ t, input, baseline: b });
    }
    return pts;
  }, [lambda, noiseAmp]);

  return (
    <PanelLayout
      id="panel-a"
      handle="The Leaky Integrator"
      intuition={<p>The baseline isn't a fixed storage bank; it's a running estimate. It tracks an incoming noisy signal over time. A slow update rate (<MathInline math="\lambda" />) creates a smooth but sluggish baseline. A fast update rate chases the noise and gets jittery.</p>}
      mathEq={<MathDisplay math="B(t+\Delta t) = B(t)(1-\lambda) + I(t)\cdot\lambda" />}
      mathGloss={
        <>
          <p><MathInline math="B(t)" />: The baseline estimate at time t.</p>
          <p><MathInline math="I(t)" />: The raw incoming signal.</p>
          <p><MathInline math="\lambda" />: The update rate (how much of the new signal is incorporated).</p>
        </>
      }
      mbdConnection="The baseline is memory as accumulated deviation, not storage."
      visual={
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis dataKey="t" hide />
            <YAxis domain={[-10, 10]} hide />
            <Line type="monotone" dataKey="input" stroke="#f97316" strokeWidth={1} dot={false} isAnimationActive={false} opacity={0.5} />
            <Line type="monotone" dataKey="baseline" stroke="#3b82f6" strokeWidth={3} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      }
      controls={
        <div className="grid grid-cols-2 gap-4">
          <Slider label="Update rate (λ)" value={lambda} min={0.001} max={0.5} onChange={setLambda} />
          <Slider label="Noise Amplitude" value={noiseAmp} min={0} max={4} onChange={setNoiseAmp} />
        </div>
      }
      {...paperProps('panel-a')}
    />
  );
}
