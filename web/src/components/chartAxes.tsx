import React from 'react';
import { XAxis, YAxis } from 'recharts';

export const CHART_TICK = {
  fontSize: 9,
  fill: '#94a3b8',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
};

export const CHART_MARGIN = {
  top: 22,
  right: 14,
  bottom: 30,
  left: 46,
} as const;

export const CHART_MARGIN_COMPACT = {
  top: 18,
  right: 12,
  bottom: 26,
  left: 42,
} as const;

const axisLine = { stroke: '#334155' };
const tickLine = { stroke: '#334155' };

const labelProps = {
  fill: '#64748b',
  fontSize: 10,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
};

type Domain = [number | string, number | string];

interface AxisProps {
  dataKey?: string;
  domain?: Domain;
  ticks?: number[];
  tickFormatter?: (v: number) => string;
  width?: number;
  interval?: number | 'preserveStartEnd';
}

export function ChartTimeXAxis({ dataKey = 't', domain }: AxisProps) {
  return (
    <XAxis
      dataKey={dataKey}
      domain={domain}
      tick={CHART_TICK}
      tickLine={tickLine}
      axisLine={axisLine}
      label={{
        value: 'time t (s)',
        position: 'insideBottom',
        offset: -6,
        ...labelProps,
      }}
    />
  );
}

export function ChartMuXAxis({ dataKey = 'mu', domain }: AxisProps) {
  return (
    <XAxis
      dataKey={dataKey}
      domain={domain}
      tick={CHART_TICK}
      tickLine={tickLine}
      axisLine={axisLine}
      label={{
        value: 'μ = ln τ',
        position: 'insideBottom',
        offset: -6,
        ...labelProps,
      }}
    />
  );
}

export function ChartStepXAxis({ dataKey = 'step', domain, interval = 'preserveStartEnd' }: AxisProps) {
  return (
    <XAxis
      dataKey={dataKey}
      domain={domain}
      tick={CHART_TICK}
      tickLine={tickLine}
      axisLine={axisLine}
      interval={interval}
      label={{
        value: 'step k',
        position: 'insideBottom',
        offset: -6,
        ...labelProps,
      }}
    />
  );
}

export function ChartExchangeXAxis({ dataKey = 'exchange' }: { dataKey?: string }) {
  return (
    <XAxis
      dataKey={dataKey}
      tick={CHART_TICK}
      tickLine={tickLine}
      axisLine={axisLine}
      label={{
        value: 'exchange #',
        position: 'insideBottom',
        offset: -6,
        ...labelProps,
      }}
    />
  );
}

export function ChartIntervalXAxis({ dataKey = 'label' }: { dataKey?: string }) {
  return (
    <XAxis
      dataKey={dataKey}
      tick={{ ...CHART_TICK, fontSize: 8 }}
      tickLine={tickLine}
      axisLine={axisLine}
      interval={1}
      label={{
        value: 'fifth (1–12)',
        position: 'insideBottom',
        offset: -6,
        ...labelProps,
      }}
    />
  );
}

export function ChartObserverXAxis({ dataKey = 'n' }: { dataKey?: string }) {
  return (
    <XAxis
      dataKey={dataKey}
      tick={CHART_TICK}
      tickLine={tickLine}
      axisLine={axisLine}
      label={{
        value: 'observation step n',
        position: 'insideBottom',
        offset: -6,
        ...labelProps,
      }}
    />
  );
}

export function ChartAmplitudeYAxis({ domain }: { domain?: Domain }) {
  return (
    <YAxis
      domain={domain ?? ['auto', 'auto']}
      tick={CHART_TICK}
      tickLine={tickLine}
      axisLine={axisLine}
      width={40}
      label={{
        value: 'amplitude',
        angle: -90,
        position: 'insideLeft',
        offset: 8,
        ...labelProps,
      }}
    />
  );
}

export function ChartDeviationYAxis({ domain }: { domain?: Domain }) {
  return (
    <YAxis
      domain={domain}
      tick={CHART_TICK}
      tickLine={tickLine}
      axisLine={axisLine}
      width={40}
      label={{
        value: 'ΔB(t)',
        angle: -90,
        position: 'insideLeft',
        offset: 8,
        ...labelProps,
      }}
    />
  );
}

export function ChartAbsGapYAxis({ domain }: { domain?: Domain }) {
  return (
    <YAxis
      domain={domain ?? [0, 'auto']}
      tick={CHART_TICK}
      tickLine={tickLine}
      axisLine={axisLine}
      width={40}
      label={{
        value: '|ΔB(t)|',
        angle: -90,
        position: 'insideLeft',
        offset: 8,
        ...labelProps,
      }}
    />
  );
}

export function ChartXiYAxis({ domain }: { domain: Domain }) {
  return (
    <YAxis
      domain={domain}
      tick={CHART_TICK}
      tickLine={tickLine}
      axisLine={axisLine}
      width={40}
      label={{
        value: 'ξ = Θ − Θ*',
        angle: -90,
        position: 'insideLeft',
        offset: 8,
        ...labelProps,
      }}
    />
  );
}

export function ChartCentsYAxis({ domain = [0, 14] as Domain }: { domain?: Domain }) {
  return (
    <YAxis
      domain={domain}
      tick={CHART_TICK}
      tickLine={tickLine}
      axisLine={axisLine}
      width={40}
      label={{
        value: 'error (¢ norm.)',
        angle: -90,
        position: 'insideLeft',
        offset: 8,
        ...labelProps,
      }}
    />
  );
}

export function ChartLogValueYAxis({ domain = [0, 4] as Domain }: { domain?: Domain }) {
  return (
    <YAxis
      domain={domain}
      tick={CHART_TICK}
      tickLine={tickLine}
      axisLine={axisLine}
      width={40}
      tickFormatter={(v) => `10^${v}`}
      label={{
        value: 'nₖ (log₁₀)',
        angle: -90,
        position: 'insideLeft',
        offset: 8,
        ...labelProps,
      }}
    />
  );
}

export function ChartNormalizedYAxis({ domain = [0, 1.05] as Domain }: { domain?: Domain }) {
  return (
    <YAxis
      domain={domain}
      tick={CHART_TICK}
      tickLine={tickLine}
      axisLine={axisLine}
      width={40}
      label={{
        value: 'state (normalized)',
        angle: -90,
        position: 'insideLeft',
        offset: 8,
        ...labelProps,
      }}
    />
  );
}

/** Small badge linking A→B→C signal chain */
export function SignalChainBadge({ step }: { step: 'A' | 'B' | 'C' }) {
  const chain = ['A', 'B', 'C'] as const;
  return (
    <div className="absolute top-2 right-3 font-mono text-[9px] text-slate-500 bg-slate-900/90 border border-slate-800 rounded px-2 py-1">
      <span className="text-slate-600 uppercase tracking-wider mr-1.5">§8.1 chain</span>
      {chain.map((tag, i) => (
        <React.Fragment key={tag}>
          <span className={tag === step ? 'text-blue-400 font-semibold' : 'text-slate-500'}>
            {tag}
          </span>
          {i < chain.length - 1 && <span className="text-slate-700 mx-0.5">→</span>}
        </React.Fragment>
      ))}
      <span className="text-slate-700 mx-1">·</span>
      <span className="text-slate-600">same I_raw</span>
    </div>
  );
}
