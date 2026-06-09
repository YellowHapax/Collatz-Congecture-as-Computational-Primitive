import React, { useMemo, useState } from 'react';
import { PanelLayout } from '@/components/PanelLayout';
import { Slider } from '@/components/controls';
import { MathDisplay, MathInline } from '@/components/MathBlock';
import {
  ChartAbsGapYAxis,
  ChartTimeXAxis,
  CHART_MARGIN,
  SignalChainBadge,
} from '@/components/chartAxes';
import {
  ComposedChart,
  Area,
  Line,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts';
import { paperProps } from '@/content/chapter8';
import { buildNoveltyGateSeries } from '@/lib/noveltyGate';

export function PanelC() {
  const [thetaH, setThetaH] = useState(0.35);
  const [gamma, setGamma] = useState(0.2);
  const [habituationTau, setHabituationTau] = useState(1.8);

  const result = useMemo(
    () => buildNoveltyGateSeries({ thetaH, gamma, habituationTau }),
    [thetaH, gamma, habituationTau],
  );

  const chartData = useMemo(
    () =>
      result.points.map((p) => ({
        ...p,
        /** Purple band: only sustained committed encode windows */
        encodeBand: p.inCommittedEncode ? p.absGap : null,
        /** Faint rose: above θ but habituation-suppressed */
        suppressedBand:
          p.aboveGate && !p.inCommittedEncode ? p.absGap * 0.35 : null,
      })),
    [result.points],
  );

  const yMax = useMemo(() => {
    const m = Math.max(...result.points.map((p) => p.absGap), result.threshold);
    return m * 1.15;
  }, [result]);

  const suppressedCount = result.episodes.length - result.committedEpisodes.length;

  return (
    <PanelLayout
      id="panel-c"
      handle="Novelty Gating (θ_h)"
      intuition={
        <p>
          Encoding is not a scatter of threshold crossings. The system commits to{' '}
          <strong>sustained</strong> intervals where <MathInline math="|\Delta B|" /> stays above
          the gate — the duration the line spends aloft, not how many bumps it grazes. Back-to-back
          runs habituate: after one committed encode, novelty is suppressed until the refractory
          window decays. Reality is irregular; equal peaks are not equally novel.
        </p>
      }
      mathEq={
        <MathDisplay math="\text{encode}(t) \Leftrightarrow |\Delta B|>\theta_{\mathrm{eff}} \;\&\;\; \mathcal{H}(t)<\mathcal{H}_{\mathrm{crit}}" />
      }
      mathGloss={
        <>
          <p><MathInline math="\theta_h" />: base gate (red dashed). Yellow: irregular <MathInline math="|\Delta B|" />.</p>
          <p>Purple fill: committed encode <em>duration</em> (sustained above θ, not habituated).</p>
          <p>Rose tint: above θ but suppressed by habituation <MathInline math="\mathcal{H}" /> after prior encode.</p>
        </>
      }
      mbdConnection="Deep update fires on sustained innovation episodes; rapid repeats are lossy re-entries, not fresh news."
      visual={
        <div className="w-full h-full relative">
          <SignalChainBadge step="C" />
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={CHART_MARGIN}>
              <ChartTimeXAxis />
              <ChartAbsGapYAxis domain={[0, yMax]} />
              <ReferenceLine
                y={result.threshold}
                stroke="#ef4444"
                strokeDasharray="4 4"
                label={{ value: 'θ_eff·σ', position: 'insideTopRight', fill: '#f87171', fontSize: 10 }}
              />
              <Area
                type="stepAfter"
                dataKey="absGap"
                stroke="#eab308"
                fill="#eab308"
                fillOpacity={0.15}
                strokeWidth={1.5}
                isAnimationActive={false}
                connectNulls
                name="|ΔB|"
              />
              <Area
                type="stepAfter"
                dataKey="suppressedBand"
                stroke="none"
                fill="#fb7185"
                fillOpacity={0.45}
                isAnimationActive={false}
                connectNulls={false}
                name="suppressed"
              />
              <Area
                type="stepAfter"
                dataKey="encodeBand"
                stroke="#a855f7"
                fill="#a855f7"
                fillOpacity={0.55}
                strokeWidth={2}
                isAnimationActive={false}
                connectNulls={false}
                name="encode duration"
              />
              <Line
                type="monotone"
                dataKey="threshold"
                stroke="#ef4444"
                strokeWidth={1}
                dot={false}
                isAnimationActive={false}
                strokeDasharray="4 4"
                name="gate"
              />
              <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'monospace' }} />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="absolute bottom-1 left-12 font-mono text-[9px] text-slate-600 space-y-0.5">
            <div>
              {result.committedEpisodes.length} encode episode
              {result.committedEpisodes.length !== 1 ? 's' : ''} ·{' '}
              {result.totalEncodedDuration.toFixed(1)}s committed ·{' '}
              {result.totalAboveDuration.toFixed(1)}s above θ total
            </div>
            {suppressedCount > 0 && (
              <div className="text-rose-400/80">
                {suppressedCount} above-θ run{suppressedCount !== 1 ? 's' : ''} habituated (back-to-back)
              </div>
            )}
          </div>
        </div>
      }
      controls={
        <div className="grid grid-cols-2 gap-4">
          <Slider label="Gating threshold (θ_h)" value={thetaH} min={0.05} max={0.9} step={0.01} onChange={setThetaH} formatValue={(v) => v.toFixed(2)} />
          <Slider label="Complexity sensitivity (Γ)" value={gamma} min={0} max={0.8} step={0.02} onChange={setGamma} formatValue={(v) => v.toFixed(2)} />
          <div className="col-span-2">
            <Slider
              label="Habituation decay τ_hab (s)"
              value={habituationTau}
              min={0.4}
              max={4}
              step={0.1}
              onChange={setHabituationTau}
              formatValue={(v) => `${v.toFixed(1)}s`}
            />
          </div>
        </div>
      }
      {...paperProps('panel-c')}
    />
  );
}
