import React, { useState, useEffect, useMemo } from 'react';
import { PanelLayout } from '@/components/PanelLayout';
import { Slider } from '@/components/controls';
import { MathDisplay, MathInline } from '@/components/MathBlock';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine, AreaChart, Area, ComposedChart } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { paperProps } from '@/content/chapter8';

export function PanelC() {
  const [theta, setTheta] = useState(2);
  const [kappa, setKappa] = useState(0.5);
  
  const data = useMemo(() => {
    const pts = [];
    for (let t = 0; t < 100; t++) {
      const gap = Math.sin(t * 0.1) * 2 + Math.sin(t * 0.3) * 1.5;
      const isOpen = Math.abs(gap) > theta;
      pts.push({ t, gap: Math.abs(gap), isOpen });
    }
    return pts;
  }, [theta]);

  const gateOpen = data.some(d => d.isOpen);

  return (
    <PanelLayout
      id="panel-c"
      handle="The Aha"
      intuition={<p>Not every gap matters. A threshold line (<MathInline math="\theta" />) determines what gets encoded. Below threshold, it's just noise. Above threshold, the gate opens—an innovation spike, the "aha" moment.</p>}
      mathEq={<MathDisplay math="|\Delta B(t)| > \theta" />}
      mathGloss={
        <>
          <p><MathInline math="\theta" />: The novelty-gating threshold.</p>
          <p><MathInline math="\kappa" />: Coupling parameter modulating the gate (represented conceptually here).</p>
        </>
      }
      mbdConnection="The innovation spike is the novelty-detection event; this is the Kalman aha."
      visual={
        <div className="w-full h-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis dataKey="t" hide />
              <YAxis domain={[0, 4]} hide />
              <ReferenceLine y={theta} stroke="#ef4444" strokeDasharray="3 3" />
              <Area type="monotone" dataKey="gap" stroke="#eab308" fill="#eab308" fillOpacity={0.2} strokeWidth={2} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
          <AnimatePresence>
            {gateOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 border-4 border-green-500 bg-green-500/10 pointer-events-none flex items-center justify-center rounded-xl"
              >
                <span className="text-green-500 font-bold uppercase tracking-widest bg-gray-900 px-4 py-1 rounded">Gate Open</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      }
      controls={
        <div className="grid grid-cols-2 gap-4">
          <Slider label="Threshold (θ)" value={theta} min={0.5} max={3.5} onChange={setTheta} />
          <Slider label="Coupling (κ)" value={kappa} min={0} max={1} onChange={setKappa} />
        </div>
      }
      {...paperProps('panel-c')}
    />
  );
}
