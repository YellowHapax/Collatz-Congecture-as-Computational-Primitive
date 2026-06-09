import React, { useMemo, useState } from 'react';
import { PanelLayout } from '@/components/PanelLayout';
import { Slider, Toggle } from '@/components/controls';
import { MathDisplay, MathInline } from '@/components/MathBlock';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { paperProps } from '@/content/chapter8';
import { buildRgSeries, tauFromMu } from '@/lib/rgKernel';

const LINE_COLORS = ['#3b82f6', '#22c55e', '#f97316'];

export function PanelD() {
  const [mu, setMu] = useState(1.2);
  const [showMultiple, setShowMultiple] = useState(true);

  const tau = tauFromMu(mu);
  const offsets = showMultiple ? [0, -3, 4] : [0];

  const series = useMemo(() => buildRgSeries(mu, offsets), [mu, offsets]);

  const chartData = useMemo(() => {
    if (series.length === 0) return [];
    const n = series[0].length;
    return Array.from({ length: n }, (_, i) => {
      const row: Record<string, number> = {
        t: series[0][i].t,
        macro: series[0][i].macro,
        raw: series[0][i].raw,
        coarse: series[0][i].coarse,
      };
      series.forEach((s, idx) => {
        if (idx > 0) row[`coarse${idx}`] = s[i].coarse;
      });
      return row;
    });
  }, [series]);

  return (
    <PanelLayout
      id="panel-d"
      badge="#a855f7"
      badgeText={`τ = ${tau.toFixed(2)}`}
      handle="Zooming Out in Time"
      intuition={
        <p>
          Maturation means convolving <MathInline math="I_{\mathrm{raw}}" /> with the exponential
          retention kernel <MathInline math="K(t',\tau)=(1/\tau)e^{-t'/\tau}" />. As{' '}
          <MathInline math="\mu=\ln\tau" /> increases, high-frequency structure averages away and
          coarse-grained baselines converge on the same macroscopic trend.
        </p>
      }
      mathEq={
        <>
          <MathDisplay math="B(t)=\int_0^t I_{\mathrm{raw}}(t-t')\frac{1}{\tau}e^{-t'/\tau}\,dt'" />
          <MathDisplay math="\frac{d\Theta}{d\mu} = F(\Theta) \approx J(\Theta - \Theta^*)" />
        </>
      }
      mathGloss={
        <>
          <p><MathInline math="\tau=e^\mu" />: integration window (coarse-graining scale).</p>
          <p>Orange: raw multi-scale input. Blue: kernel-smoothed baseline.</p>
          <p>Purple dashed: macroscopic trend all trajectories approach.</p>
        </>
      }
      mbdConnection="Maturation = coarse-graining over longer temporal windows until the baseline becomes scale-invariant."
      visual={
        <div className="w-full h-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 16, right: 16, bottom: 8, left: 8 }}>
              <XAxis dataKey="t" hide />
              <YAxis domain={[-8, 8]} hide />
              <Line type="monotone" dataKey="raw" stroke="#f97316" strokeWidth={1} dot={false} isAnimationActive={false} opacity={0.35} name="I_raw" />
              <Line type="monotone" dataKey="coarse" stroke={LINE_COLORS[0]} strokeWidth={2.5} dot={false} isAnimationActive={false} name="B(t) τ₀" />
              {showMultiple && offsets.slice(1).map((_, idx) => (
                <Line
                  key={idx}
                  type="monotone"
                  dataKey={`coarse${idx + 1}`}
                  stroke={LINE_COLORS[idx + 1]}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                  opacity={0.75}
                  name={`B(t) τ${idx + 1}`}
                />
              ))}
              <Line type="monotone" dataKey="macro" stroke="#a855f7" strokeWidth={2} strokeDasharray="6 4" dot={false} isAnimationActive={false} name="macro" />
              <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'monospace' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      }
      controls={
        <div className="flex flex-col space-y-4">
          <Slider label="Scale (μ = ln τ)" value={mu} min={0} max={3.5} step={0.05} onChange={setMu} formatValue={(v) => `${v.toFixed(2)} (τ=${Math.exp(v).toFixed(1)})`} />
          <Toggle label="Show converging trajectories (offsets)" checked={showMultiple} onChange={setShowMultiple} />
        </div>
      }
      {...paperProps('panel-d')}
    />
  );
}
