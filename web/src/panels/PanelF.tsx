import React, { useMemo, useState } from 'react';
import { PanelLayout } from '@/components/PanelLayout';
import { Slider, Toggle, Button } from '@/components/controls';
import { MathDisplay, MathInline } from '@/components/MathBlock';
import {
  BarChart,
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
import { paperProps } from '@/content/chapter8';
import {
  PYTHAGOREAN_COMMA_CENTS,
  PYTHAGOREAN_COMMA_RATIO,
  commaDistribution,
  simulateCommaAccumulation,
  unitsToCents,
} from '@/lib/temperament';

export function PanelF() {
  const [temper, setTemper] = useState(false);
  const [kappa, setKappa] = useState(0.15);
  const [exchanges, setExchanges] = useState(0);

  const distribution = useMemo(
    () => commaDistribution(temper ? kappa : 0),
    [temper, kappa],
  );

  const history = useMemo(
    () => simulateCommaAccumulation(exchanges, temper, temper ? kappa : 0),
    [exchanges, temper, kappa],
  );

  const current = history[history.length - 1];
  const wolfEvent = current?.wolfSpike > 0;

  const stackFifth = () => setExchanges((e) => Math.min(24, e + 1));
  const reset = () => setExchanges(0);

  return (
    <PanelLayout
      id="panel-f"
      badge={wolfEvent ? '#ef4444' : temper ? '#22c55e' : '#eab308'}
      badgeText={wolfEvent ? 'WOLF INTERVAL' : temper ? `κ=${kappa.toFixed(2)}` : 'ACCUMULATING'}
      handle="Refusing to Temper"
      intuition={
        <p>
          The Pythagorean comma is the gap between <MathInline math="3^{12}" /> and{' '}
          <MathInline math="2^{19}" /> — ratio ≈ {PYTHAGOREAN_COMMA_RATIO.toFixed(5)} (
          {PYTHAGOREAN_COMMA_CENTS.toFixed(2)} cents). Stack twelve pure fifths without tempering
          and the entire comma dumps into the Wolf interval. Tempering (κ &gt; 0) distributes it.
        </p>
      }
      mathEq={
        <>
          <MathDisplay math="3^{12} = 531441 \neq 524288 = 2^{19}" />
          <div className="text-center text-[11px] text-slate-400 mt-2 font-mono">
            comma ≈ {PYTHAGOREAN_COMMA_CENTS.toFixed(2)}¢ · low κ → unbounded accumulation
          </div>
        </>
      }
      mathGloss={
        <>
          <p>Each exchange stacks a pure fifth (×3/2) without closing the octave (×2).</p>
          <p>Debt readout: {current?.debtCents.toFixed(1)}¢ accumulated · exchange {exchanges}/12 per cycle</p>
        </>
      }
      mbdConnection="Low-κ interaction that refuses to compromise eventually breaks catastrophically."
      visual={
        <div className="w-full h-full flex flex-col gap-3 p-2">
          <div className="flex-1 min-h-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distribution} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
                <XAxis dataKey="label" tick={{ fontSize: 8, fill: '#64748b' }} interval={1} />
                <YAxis domain={[0, 14]} hide />
                <Bar dataKey="error" isAnimationActive={false} name="cents (norm.)">
                  {distribution.map((entry) => (
                    <Cell
                      key={entry.interval}
                      fill={entry.isWolf && entry.error > 8 ? '#ef4444' : entry.isWolf ? '#f97316' : '#3b82f6'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-[9px] text-center text-slate-500 font-mono -mt-1">
              Error per fifth after full circle (¢ ≈ {unitsToCents(1).toFixed(2)} per unit)
            </p>
          </div>
          <div className="flex-1 min-h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={history} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
                <XAxis dataKey="exchange" hide />
                <YAxis domain={[0, 14]} hide />
                <ReferenceLine y={12} stroke="#ef4444" strokeDasharray="4 4" />
                <Bar dataKey="wolfSpike" fill="#ef4444" isAnimationActive={false} opacity={0.9} />
                <Line type="monotone" dataKey="debt" stroke="#eab308" strokeWidth={2} dot={false} isAnimationActive={false} />
              </ComposedChart>
            </ResponsiveContainer>
            <p className="text-[9px] text-center text-slate-500 font-mono -mt-1">
              Yellow: accumulated debt · Red spike: Wolf dump at 12th fifth
            </p>
          </div>
        </div>
      }
      controls={
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button onClick={stackFifth}>Stack fifth (+1)</Button>
            <Button onClick={reset}>Reset</Button>
          </div>
          <Toggle label="Temper signals (κ > 0)" checked={temper} onChange={setTemper} />
          {temper && (
            <Slider label="Temperament (κ)" value={kappa} min={0.05} max={1} step={0.01} onChange={setKappa} />
          )}
        </div>
      }
      {...paperProps('panel-f')}
    />
  );
}
