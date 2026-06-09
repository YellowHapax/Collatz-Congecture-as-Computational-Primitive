import React, { useMemo, useState } from 'react';
import { PanelLayout } from '@/components/PanelLayout';
import { Slider } from '@/components/controls';
import { MathDisplay, MathInline } from '@/components/MathBlock';
import {
  ChartAmplitudeYAxis,
  ChartTimeXAxis,
  CHART_MARGIN,
  SignalChainBadge,
} from '@/components/chartAxes';
import { LineChart, Line, ResponsiveContainer, Legend } from 'recharts';
import { paperProps } from '@/content/chapter8';
import { buildRawStream, leakyIntegrate, SIGNAL_DT } from '@/lib/leakyBaseline';

export function PanelA() {
  const [lambda, setLambda] = useState(0.12);

  const data = useMemo(() => {
    const raw = buildRawStream();
    const baseline = leakyIntegrate(raw, lambda);
    return raw.map((r, i) => ({
      t: i * SIGNAL_DT,
      raw: r,
      baseline: baseline[i],
    }));
  }, [lambda]);

  return (
    <PanelLayout
      id="panel-a"
      handle="Coarse-Graining Kernel"
      intuition={
        <p>
          <MathInline math="I_{\mathrm{raw}}(t)" /> is a multi-scale somatic stream — macro,
          meso, and micro structure superposed. The agent cannot retain it at full bandwidth;
          un-reinforced traces decay as <MathInline math="dM/dt=-(1/\tau)M" />, yielding the
          exponential retention kernel. A discrete update with rate{' '}
          <MathInline math="\lambda\propto 1/\tau" /> is the same operator in simulation time.
        </p>
      }
      mathEq={
        <>
          <MathDisplay math="K(t',\tau)=\frac{1}{\tau}e^{-t'/\tau}" />
          <MathDisplay math="B(t+\Delta t)=B(t)(1-\lambda)+I(t)\cdot\lambda" />
        </>
      }
      mathGloss={
        <>
          <p><MathInline math="I_{\mathrm{raw}}" />: high-frequency sensory input (orange).</p>
          <p><MathInline math="B(t)" />: coarse-grained running estimate (blue).</p>
          <p><MathInline math="\lambda" />: incorporation rate — low λ smooths; high λ tracks noise.</p>
        </>
      }
      mbdConnection="The baseline is not storage; it is the dissipative estimate from which deviation will be measured."
      visual={
        <div className="w-full h-full relative">
          <SignalChainBadge step="A" />
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={CHART_MARGIN}>
              <ChartTimeXAxis />
              <ChartAmplitudeYAxis />
              <Line type="monotone" dataKey="raw" stroke="#f97316" strokeWidth={1} dot={false} isAnimationActive={false} opacity={0.55} name="I_raw" />
              <Line type="monotone" dataKey="baseline" stroke="#3b82f6" strokeWidth={2.5} dot={false} isAnimationActive={false} name="B(t)" />
              <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'monospace' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      }
      controls={
        <Slider
          label="Update rate (λ ∝ 1/τ)"
          value={lambda}
          min={0.02}
          max={0.45}
          step={0.01}
          onChange={setLambda}
          formatValue={(v) => v.toFixed(2)}
        />
      }
      {...paperProps('panel-a')}
    />
  );
}
