import React, { useMemo, useState } from 'react';
import { PanelLayout } from '@/components/PanelLayout';
import { Slider } from '@/components/controls';
import { MathDisplay, MathInline } from '@/components/MathBlock';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '@/lib/utils';
import { paperProps } from '@/content/chapter8';
import {
  integrateJacobianFlow,
  jacobian,
  maxRealEigenvalue,
  routhHurwitzBound,
} from '@/lib/stability';

export function PanelE() {
  const [a1, setA1] = useState(1);
  const [a2, setA2] = useState(1);
  const [a3, setA3] = useState(1);
  const [k1, setK1] = useState(0.5);
  const [k2, setK2] = useState(0.5);
  const [k3, setK3] = useState(0.5);

  const rh = useMemo(
    () => routhHurwitzBound(a1, a2, a3, k1, k2, k3),
    [a1, a2, a3, k1, k2, k3],
  );

  const J = useMemo(() => jacobian(a1, a2, a3, k1, k2, k3), [a1, a2, a3, k1, k2, k3]);

  const lambdaMax = useMemo(() => maxRealEigenvalue(J), [J]);

  const data = useMemo(() => {
    const xi0: [number, number, number] = [0.8, -0.6, 0.45];
    return integrateJacobianFlow(J, xi0, 8, 160);
  }, [J]);

  const yDomain = useMemo(() => {
    const vals = data.flatMap((p) => [p.theta_h, p.beta, p.gamma]);
    const m = Math.max(...vals.map(Math.abs), 0.5);
    return [-m * 1.15, m * 1.15] as [number, number];
  }, [data]);

  return (
    <PanelLayout
      id="panel-e"
      badge={rh.stable ? '#22c55e' : '#ef4444'}
      badgeText={rh.stable ? 'STABLE' : 'UNSTABLE'}
      handle="How Much Coupling Before It Breaks"
      intuition={
        <p>
          Near the fixed point, deviations <MathInline math="\xi=\Theta-\Theta^*" /> obey{' '}
          <MathInline math="d\xi/d\mu = J\xi" /> with the paper&apos;s Jacobian. The trajectory
          integrates that linear flow exactly via <MathInline math="e^{J\mu}" />. Stability matches
          the Routh–Hurwitz bound on <MathInline math="k_1k_2k_3" />.
        </p>
      }
      mathEq={<MathDisplay math="k_1k_2k_3 < (a_1+a_2)(a_2+a_3)(a_1+a_3)" />}
      mathGloss={
        <>
          <p><MathInline math="J" />: <MathInline math="[[-a_1,0,-k_1],[-k_2,-a_2,0],[0,-k_3,-a_3]]" /></p>
          <p>Blue: <MathInline math="\theta_h" /> deviation. Yellow: <MathInline math="\beta" />. Orange: <MathInline math="\Gamma" />.</p>
          <p><MathInline math="\max\mathrm{Re}(\lambda)" />: {lambdaMax.toFixed(3)} (must be &lt; 0 for stability)</p>
        </>
      }
      mbdConnection="A hard ceiling on how tightly baseline parameters can be coupled before losing self-repair."
      visual={
        <div
          className="w-full h-full relative border-4 transition-colors duration-300"
          style={{ borderColor: rh.stable ? '#22c55e40' : '#ef444440' }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 16, right: 16, bottom: 8, left: 8 }}>
              <XAxis dataKey="mu" hide />
              <YAxis domain={yDomain} hide />
              <Line type="monotone" dataKey="theta_h" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} name="θ_h" />
              <Line type="monotone" dataKey="beta" stroke="#eab308" strokeWidth={2} dot={false} isAnimationActive={false} name="β" />
              <Line type="monotone" dataKey="gamma" stroke="#f97316" strokeWidth={2} dot={false} isAnimationActive={false} name="Γ" />
              <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'monospace' }} />
            </LineChart>
          </ResponsiveContainer>
          <div
            className={cn(
              'absolute top-3 right-3 px-3 py-2 rounded font-mono text-[11px] space-y-1',
              rh.stable ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400',
            )}
          >
            <div>
              k₁k₂k₃ = {rh.left.toFixed(2)} {rh.stable ? '<' : '≥'} {rh.right.toFixed(2)}
            </div>
            <div>max Re(λ) = {lambdaMax.toFixed(3)}</div>
          </div>
        </div>
      }
      controls={
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="space-y-2">
            <h4 className="text-xs text-gray-500 font-mono mb-2">Restoring Rates (a)</h4>
            <Slider label="a₁" value={a1} min={0.1} max={2} onChange={setA1} />
            <Slider label="a₂" value={a2} min={0.1} max={2} onChange={setA2} />
            <Slider label="a₃" value={a3} min={0.1} max={2} onChange={setA3} />
          </div>
          <div className="space-y-2">
            <h4 className="text-xs text-gray-500 font-mono mb-2">Couplings (k)</h4>
            <Slider label="k₁" value={k1} min={0.1} max={5} onChange={setK1} />
            <Slider label="k₂" value={k2} min={0.1} max={5} onChange={setK2} />
            <Slider label="k₃" value={k3} min={0.1} max={5} onChange={setK3} />
          </div>
        </div>
      }
      {...paperProps('panel-e')}
    />
  );
}
