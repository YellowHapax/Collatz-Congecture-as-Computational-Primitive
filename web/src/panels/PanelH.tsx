import React, { useMemo, useState } from 'react';
import { PanelLayout } from '@/components/PanelLayout';
import { Slider } from '@/components/controls';
import { MathDisplay, MathInline } from '@/components/MathBlock';
import { ChartAmplitudeYAxis, ChartTimeXAxis, CHART_MARGIN } from '@/components/chartAxes';
import {
  ComposedChart,
  Area,
  Line,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { paperProps } from '@/content/chapter8';
import { buildHorizonSeries } from '@/lib/bandwidthHorizon';

export function PanelH() {
  const [mu, setMu] = useState(0.6);
  const [complexity, setComplexity] = useState(7);

  const { points, tau, capturePct, macroCapturePct, processable } = useMemo(
    () => buildHorizonSeries(mu, complexity),
    [mu, complexity],
  );

  const yDomain = useMemo(() => {
    const vals = points.flatMap((p) => [p.raw, p.received, p.macro]);
    const m = Math.max(...vals.map(Math.abs), 2);
    return [-m * 1.1, m * 1.1] as [number, number];
  }, [points]);

  return (
    <PanelLayout
      id="panel-h"
      badge={processable ? '#22c55e' : '#ef4444'}
      badgeText={processable ? 'MACRO PROCESSABLE' : 'BANDWIDTH LIMITED'}
      handle="Bandwidth Mismatch"
      intuition={
        <p>
          §7.3: the signal is reducible in principle, but the receiver&apos;s current horizon{' '}
          <MathInline math="H" /> (here: coarse-graining scale <MathInline math="\tau=e^\mu" />)
          cannot yet represent its fast bands. Drag <MathInline math="\mu" /> — maturation in §8 —
          and watch the same <MathInline math="I_{\mathrm{raw}}" /> become recoverable without
          changing the source. From inside, &quot;not yet&quot; and &quot;impossible&quot; look
          alike.
        </p>
      }
      mathEq={
        <>
          <MathDisplay math="B(t)=\int I_{\mathrm{raw}}(t-t')\,K(t',\tau)\,dt'" />
          <MathDisplay math="H_{\mathrm{receiver}} \equiv \tau = e^\mu" />
        </>
      }
      mathGloss={
        <>
          <p>Gray: full <MathInline math="I_{\mathrm{raw}}" /> with complexity-scaled fast bands.</p>
          <p>Yellow: receiver reconstruction via kernel <MathInline math="K" /> at current <MathInline math="\tau" />.</p>
          <p>Purple dashed: macroscopic component — target of maturation.</p>
          <p>Red band: encoding error <MathInline math="I_{\mathrm{raw}}-B" />.</p>
        </>
      }
      mbdConnection="Education is band-widening: increasing μ until previously out-of-band structure enters the representable horizon."
      visual={
        <div className="w-full h-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={points} margin={{ ...CHART_MARGIN, top: 32 }}>
              <ChartTimeXAxis />
              <ChartAmplitudeYAxis domain={yDomain} />
              <Area
                type="monotone"
                dataKey="error"
                stroke="none"
                fill="#ef4444"
                fillOpacity={0.18}
                isAnimationActive={false}
                name="error"
              />
              <Line type="monotone" dataKey="raw" stroke="#64748b" strokeWidth={1} dot={false} isAnimationActive={false} opacity={0.45} name="I_raw" />
              <Line type="monotone" dataKey="received" stroke="#eab308" strokeWidth={2.5} dot={false} isAnimationActive={false} name="B(t)|H" />
              <Line type="monotone" dataKey="macro" stroke="#a855f7" strokeWidth={1.5} strokeDasharray="6 4" dot={false} isAnimationActive={false} name="macro" />
              <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'monospace' }} />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="absolute top-2 left-3 font-mono text-[10px] text-slate-500 space-y-0.5">
            <div>τ = {tau.toFixed(2)} · capture {capturePct.toFixed(0)}%</div>
            <div>macro fidelity {macroCapturePct.toFixed(0)}% {processable ? '≥ 92% threshold' : '< 92% threshold'}</div>
          </div>
        </div>
      }
      controls={
        <div className="grid grid-cols-2 gap-4">
          <Slider
            label="Maturation scale (μ = ln τ)"
            value={mu}
            min={0}
            max={3.2}
            step={0.05}
            onChange={setMu}
            formatValue={(v) => `${v.toFixed(2)} (τ=${Math.exp(v).toFixed(1)})`}
          />
          <Slider
            label="Signal complexity (fast-band energy)"
            value={complexity}
            min={1}
            max={10}
            step={0.5}
            onChange={setComplexity}
          />
        </div>
      }
      {...paperProps('panel-h')}
    />
  );
}
