import React, { useMemo, useState } from 'react';
import { PanelLayout } from '@/components/PanelLayout';
import { Slider, Toggle } from '@/components/controls';
import { MathDisplay, MathInline } from '@/components/MathBlock';
import { ChartNormalizedYAxis, ChartObserverXAxis, CHART_MARGIN } from '@/components/chartAxes';
import { LineChart, Line, ResponsiveContainer, ReferenceLine } from 'recharts';
import { paperProps } from '@/content/chapter8';
import { buildObserverDiagnostic } from '@/lib/divergence';
import { COLLATZ_27_CONVERGE_STEP } from '@/lib/collatz';

export function PanelI() {
  const [isHoneybadger, setIsHoneybadger] = useState(true);
  const [observerWindow, setObserverWindow] = useState(48);

  const mode = isHoneybadger ? 'honeybadger' : 'bandwidth';

  const diag = useMemo(
    () => buildObserverDiagnostic(mode, observerWindow),
    [mode, observerWindow],
  );

  return (
    <PanelLayout
      id="panel-i"
      badge={isHoneybadger ? '#a855f7' : '#eab308'}
      badgeText={isHoneybadger ? 'Honeybadger' : 'Masquerade (Collatz)'}
      handle="True Divergence (Honeybadger)"
      intuition={
        <p>
          §7.4: bounded, non-repeating, non-converging — an infinite crawl through finite state
          space. Toggle modes: irrational rotation on <MathInline math="S^1" /> (constitutional) vs.
          truncated Collatz(27) (developmental, converges at step {COLLATZ_27_CONVERGE_STEP} with
          full horizon). A finite observer cannot reliably distinguish them — the halting-problem
          shadow the paper names.
        </p>
      }
      mathEq={<MathDisplay math="\|X_n\| < \infty,\; X_n \neq X_m,\; X_n \not\to X^* \quad \text{(within } T_{\mathrm{obs}}\text{)" />}
      mathGloss={
        <>
          <p>Purple trace: normalized state over observation window <MathInline math="T_{\mathrm{obs}}" />.</p>
          <p>Honeybadger: <MathInline math="x_n=\cos(2\pi n\varphi)" />, <MathInline math="\varphi" /> golden — aperiodic on the circle.</p>
          <p>Masquerade: Collatz(27) partial orbit — bounded chaos that eventually reaches 1.</p>
        </>
      }
      mbdConnection="Most apparent divergence is bandwidth mismatch in a Honeybadger mask; the framework must still account for the constitutional case."
      visual={
        <div className="w-full h-full relative flex flex-col gap-2">
          <div className="flex-1 min-h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={diag.points} margin={CHART_MARGIN}>
                <ChartObserverXAxis />
                <ChartNormalizedYAxis />
                <ReferenceLine y={1} stroke="#334155" strokeDasharray="2 4" />
                <ReferenceLine y={0} stroke="#334155" strokeDasharray="2 4" />
                <Line
                  type="monotone"
                  dataKey="normalized"
                  stroke={isHoneybadger ? '#a855f7' : '#eab308'}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="shrink-0 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 font-mono text-[10px] space-y-1">
            <div className="text-slate-500">
              T_obs = {observerWindow} · bounded = {diag.bounded ? 'yes' : 'no'} · repeat ={' '}
              {diag.repeatDetected ? 'yes' : 'no'} · converge ={' '}
              {diag.convergenceDetected ? 'yes' : 'no'}
            </div>
            <div className="text-slate-300">{diag.verdict}</div>
            <div className="text-slate-500 italic">{diag.hiddenTruth}</div>
          </div>
        </div>
      }
      controls={
        <div className="flex flex-col gap-4">
          <Toggle
            label={isHoneybadger ? 'Mode: True divergence (Honeybadger)' : 'Mode: Bandwidth masquerade'}
            checked={isHoneybadger}
            onChange={setIsHoneybadger}
          />
          <Slider
            label="Observer window (T_obs)"
            value={observerWindow}
            min={12}
            max={120}
            step={1}
            onChange={setObserverWindow}
            formatValue={(v) =>
              !isHoneybadger && v < COLLATZ_27_CONVERGE_STEP
                ? `${v} (< ${COLLATZ_27_CONVERGE_STEP} → inconclusive)`
                : `${v}`
            }
          />
        </div>
      }
      {...paperProps('panel-i')}
    />
  );
}
