import React, { useMemo, useState } from 'react';
import { PanelLayout } from '@/components/PanelLayout';
import { Slider } from '@/components/controls';
import { MathDisplay, MathInline } from '@/components/MathBlock';
import { ChartCentsYAxis, ChartIntervalXAxis, CHART_MARGIN } from '@/components/chartAxes';
import { BarChart, Bar, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { paperProps } from '@/content/chapter8';
import { PYTHAGOREAN_COMMA_CENTS, commaDistribution } from '@/lib/temperament';

export function PanelJ() {
  const [kappa, setKappa] = useState(0.5);

  const data = useMemo(() => commaDistribution(kappa), [kappa]);

  return (
    <PanelLayout
      id="panel-j"
      handle="The Tuning Knob"
      intuition={
        <p>
          How much are you willing to compromise your baseline to connect globally? At{' '}
          <MathInline math="\kappa \approx 0" /> (Just Intonation), eleven fifths stay pure and the
          Wolf takes {PYTHAGOREAN_COMMA_CENTS.toFixed(1)}¢. At <MathInline math="\kappa \approx 1" />{' '}
          (Equal Temperament), error distributes evenly (~{(PYTHAGOREAN_COMMA_CENTS / 12).toFixed(2)}¢
          per fifth).
        </p>
      }
      mathEq={<MathDisplay math="\kappa \in [0,1] \text{ — temperament selector}" />}
      mathGloss={
        <>
          <p><MathInline math="\kappa" />: Coupling parameter (temperament selector).</p>
          <p>Red bar: Wolf interval (12th fifth). Total comma: {PYTHAGOREAN_COMMA_CENTS.toFixed(2)} cents.</p>
        </>
      }
      mbdConnection="κ is the coupling parameter that selects the system's temperament."
      visual={
        <div className="w-full h-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ ...CHART_MARGIN, top: 36 }}>
              <ChartIntervalXAxis />
              <ChartCentsYAxis />
              <Tooltip
                contentStyle={{ background: '#0d1117', border: '1px solid #334155', fontSize: 11 }}
                formatter={(value: number, _name, item) => [
                  `${value.toFixed(2)} units (${item.payload.cents.toFixed(2)}¢)`,
                  'Error',
                ]}
              />
              <Bar dataKey="error" isAnimationActive={false}>
                {data.map((entry) => (
                  <Cell
                    key={entry.interval}
                    fill={entry.isWolf && entry.error > 6 ? '#ef4444' : '#6366f1'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="absolute top-3 left-4 text-[10px] font-mono text-slate-500">
            Comma distribution · κ = {kappa.toFixed(2)}
          </div>
        </div>
      }
      controls={
        <Slider label="Temperament (κ)" value={kappa} min={0} max={1} step={0.01} onChange={setKappa} />
      }
      {...paperProps('panel-j')}
    />
  );
}
