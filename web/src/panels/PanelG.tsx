import React, { useEffect, useMemo, useState } from 'react';
import { PanelLayout } from '@/components/PanelLayout';
import { Slider, Button } from '@/components/controls';
import { MathDisplay } from '@/components/MathBlock';
import {
  ChartLogValueYAxis,
  ChartStepXAxis,
  CHART_MARGIN,
} from '@/components/chartAxes';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  Tooltip,
} from 'recharts';
import { paperProps } from '@/content/chapter8';
import {
  COLLATZ_27_CONVERGE_STEP,
  COLLATZ_27_FULL,
  COLLATZ_27_PEAK,
  COLLATZ_27_PEAK_STEP,
  buildCollatzChart,
} from '@/lib/collatz';

function barColor(step: number, budget: number, value: number, running: boolean): string {
  if (step === COLLATZ_27_PEAK_STEP) return '#a855f7';
  if (step === COLLATZ_27_CONVERGE_STEP) return '#22c55e';
  if (!running && step === budget && value !== 1) return '#ef4444';
  if (step > budget) return '#334155';
  return '#3b82f6';
}

export function PanelG() {
  const [budget, setBudget] = useState(40);
  const [running, setRunning] = useState(false);
  const [visibleStep, setVisibleStep] = useState(0);

  useEffect(() => {
    if (!running) return;
    if (visibleStep >= COLLATZ_27_FULL.length - 1) {
      setRunning(false);
      return;
    }
    if (visibleStep >= budget && COLLATZ_27_FULL[visibleStep] !== 1) {
      setRunning(false);
      return;
    }
    const id = window.setTimeout(() => setVisibleStep((s) => s + 1), 55);
    return () => clearTimeout(id);
  }, [running, visibleStep, budget]);

  const data = useMemo(
    () => buildCollatzChart(budget, visibleStep),
    [budget, visibleStep],
  );

  const finalValue = COLLATZ_27_FULL[visibleStep] ?? 27;
  const truncated = !running && visibleStep > 0 && finalValue !== 1 && visibleStep >= budget;
  const converged = finalValue === 1;

  const start = () => {
    setVisibleStep(0);
    setRunning(true);
  };

  return (
    <PanelLayout
      id="panel-g"
      badge={truncated ? '#ef4444' : converged ? '#22c55e' : '#64748b'}
      badgeText={
        truncated
          ? `TRUNCATED @ step ${budget}`
          : converged
            ? `CONVERGED @ step ${visibleStep}`
            : 'Failure Mode 2: Truncation'
      }
      handle="Compute-Budget Expiry"
      intuition={
        <p>
          Collatz(27) requires {COLLATZ_27_CONVERGE_STEP} reductions — an honest signal with a long
          trajectory. Bounded attention is a finite step budget: halt before reaching 1 and the
          agent acts on the partial value. This is truncation, not temperament or malice — the
          propaganda case exploits the same clock by injecting high-trajectory signals when
          attention is nearly exhausted.
        </p>
      }
      mathEq={
        <MathDisplay math="n_{k} \mapsto \begin{cases} n/2 & n \text{ even} \\ 3n+1 & n \text{ odd} \end{cases} \quad \text{halt at } k = N_{\mathrm{budget}}" />
      }
      mathGloss={
        <>
          <p>
            Purple: peak {COLLATZ_27_PEAK.toLocaleString()} at step {COLLATZ_27_PEAK_STEP}. Green:
            absorbing state 1 at step {COLLATZ_27_CONVERGE_STEP}.
          </p>
          <p>Red dashed line: attention budget — bars beyond it are unprocessed future.</p>
        </>
      }
      mbdConnection="The partial reduction at budget expiry is what the agent acts on — wrong conclusion without anyone lying."
      visual={
        <div className="w-full h-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ ...CHART_MARGIN, top: 28 }}>
              <ChartStepXAxis interval={14} />
              <ChartLogValueYAxis />
              <Tooltip
                contentStyle={{ background: '#0d1117', border: '1px solid #334155', fontSize: 11 }}
                formatter={(_v: number, _n, item) => [
                  item.payload.value.toLocaleString(),
                  `step ${item.payload.step}`,
                ]}
                labelFormatter={() => ''}
              />
              <ReferenceLine
                x={budget}
                stroke="#ef4444"
                strokeDasharray="4 4"
                label={{ value: `N_budget=${budget}`, fill: '#f87171', fontSize: 10, position: 'insideTopLeft' }}
              />
              <ReferenceLine
                x={COLLATZ_27_PEAK_STEP}
                stroke="#a855f7"
                strokeDasharray="2 6"
                strokeOpacity={0.6}
              />
              <ReferenceLine
                x={COLLATZ_27_CONVERGE_STEP}
                stroke="#22c55e"
                strokeDasharray="2 6"
                strokeOpacity={0.5}
              />
              <Bar dataKey="logValue" isAnimationActive={false} radius={[1, 1, 0, 0]}>
                {data.map((entry) => (
                  <Cell
                    key={entry.step}
                    fill={barColor(entry.step, budget, entry.value, running)}
                    opacity={entry.step > budget ? 0.25 : 1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="absolute top-2 left-3 font-mono text-[10px] text-slate-500 space-y-0.5">
            <div>
              k={visibleStep} · n={finalValue.toLocaleString()}
              {truncated && <span className="text-red-400 ml-2">acted on partial</span>}
            </div>
          </div>
        </div>
      }
      controls={
        <div className="grid grid-cols-2 gap-8 items-center">
          <Slider
            label="Attention budget (N_budget)"
            value={budget}
            min={5}
            max={115}
            step={1}
            onChange={setBudget}
            formatValue={(v) => `${v} / ${COLLATZ_27_CONVERGE_STEP} needed`}
          />
          <Button onClick={start} className={running ? 'opacity-50 cursor-not-allowed' : ''}>
            {running ? `Step ${visibleStep}…` : 'Run Collatz(27)'}
          </Button>
        </div>
      }
      {...paperProps('panel-g')}
    />
  );
}
