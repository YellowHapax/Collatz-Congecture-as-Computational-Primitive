import React, { useMemo, useState } from 'react';
import { PanelLayout } from '@/components/PanelLayout';
import { Button } from '@/components/controls';
import { MathDisplay, MathInline } from '@/components/MathBlock';
import {
  ChartAmplitudeYAxis,
  ChartTimeXAxis,
  CHART_MARGIN,
  SignalChainBadge,
} from '@/components/chartAxes';
import { ComposedChart, Area, Line, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { paperProps } from '@/content/chapter8';
import { buildBaselineSeries } from '@/lib/leakyBaseline';

export function PanelB() {
  const [perturbation, setPerturbation] = useState(0);

  const data = useMemo(
    () => buildBaselineSeries({ perturbation }),
    [perturbation],
  );

  const yDomain = useMemo(() => {
    const m = Math.max(...data.flatMap((d) => [Math.abs(d.gap), Math.abs(d.raw), Math.abs(d.baseline)]), 1);
    return [-m * 1.15, m * 1.15] as [number, number];
  }, [data]);

  return (
    <PanelLayout
      id="panel-b"
      handle="Baseline Deviation"
      intuition={
        <p>
          MBD encodes the gap between expectation and arrival — not the absolute input level.
          <MathInline math="\Delta B(t)=I_{\mathrm{raw}}(t)-B(t)" /> is the innovation signal:
          what broke the running coarse-grained model. Inject a structured perturbation and watch
          the yellow band widen where prediction failed.
        </p>
      }
      mathEq={<MathDisplay math="\Delta B(t)=I_{\mathrm{raw}}(t)-B(t)" />}
      mathGloss={
        <>
          <p><MathInline math="\Delta B" />: signed deviation (yellow band).</p>
          <p>Orange: <MathInline math="I_{\mathrm{raw}}" />. Blue: leaky <MathInline math="B(t)" /> from Panel A.</p>
          <p>Perturbation models a genuine prediction-breaking event, not ambient noise.</p>
        </>
      }
      mbdConnection="Memory fires on deviation magnitude and sign — the surprise relative to the moving baseline."
      visual={
        <div className="w-full h-full relative">
          <SignalChainBadge step="B" />
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={CHART_MARGIN}>
              <ChartTimeXAxis />
              <ChartAmplitudeYAxis domain={yDomain} />
              <ReferenceLine y={0} stroke="#475569" strokeDasharray="2 4" />
              <Area
                type="monotone"
                dataKey="gap"
                stroke="#eab308"
                fill="#eab308"
                fillOpacity={0.35}
                strokeWidth={1.5}
                isAnimationActive={false}
                name="ΔB"
              />
              <Line type="monotone" dataKey="raw" stroke="#f97316" strokeWidth={1.5} dot={false} isAnimationActive={false} opacity={0.7} name="I_raw" />
              <Line type="monotone" dataKey="baseline" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} name="B(t)" />
              <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'monospace' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      }
      controls={
        <div className="flex flex-wrap justify-center gap-2">
          <Button onClick={() => setPerturbation(0.55)}>Inject prediction-breaking event</Button>
          <Button onClick={() => setPerturbation(0)}>Clear perturbation</Button>
        </div>
      }
      {...paperProps('panel-b')}
    />
  );
}
