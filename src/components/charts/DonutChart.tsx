import { useState } from 'react';

type DonutChartProps = {
  data: { label: string; value: number; color: string }[];
  size?: number;
  centerLabel?: string;
  centerValue?: string;
};

export function DonutChart({ data, size = 200, centerLabel = 'Total', centerValue }: DonutChartProps) {
  const [hover, setHover] = useState<number | null>(null);
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = size / 2 - 18;
  const innerRadius = radius * 0.62;
  const cx = size / 2;
  const cy = size / 2;

  let cumulative = 0;
  const segments = data.map((d, i) => {
    const startAngle = (cumulative / total) * 360;
    cumulative += d.value;
    const endAngle = (cumulative / total) * 360;
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);
    const x3 = cx + innerRadius * Math.cos(endRad);
    const y3 = cy + innerRadius * Math.sin(endRad);
    const x4 = cx + innerRadius * Math.cos(startRad);
    const y4 = cy + innerRadius * Math.sin(startRad);

    const path = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;

    return { path, color: d.color, label: d.label, value: d.value, pct: ((d.value / total) * 100).toFixed(1), index: i };
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
          {segments.map((s) => (
            <path
              key={s.index}
              d={s.path}
              fill={s.color}
              opacity={hover === null || hover === s.index ? 1 : 0.35}
              style={{ transition: 'opacity 0.2s', cursor: 'pointer' }}
              onMouseEnter={() => setHover(s.index)}
              onMouseLeave={() => setHover(null)}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {hover !== null ? (
            <>
              <span className="text-2xl font-bold text-white font-display">{data[hover].value}%</span>
              <span className="text-2xs text-ink-300 mt-0.5">{data[hover].label}</span>
            </>
          ) : (
            <>
              <span className="text-2xl font-bold text-white font-display">{centerValue ?? `${total}%`}</span>
              <span className="text-2xs text-ink-300 mt-0.5">{centerLabel}</span>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {data.map((d, i) => (
          <div key={i} className="flex items-center justify-between text-xs" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ opacity: hover === null || hover === i ? 1 : 0.5, transition: 'opacity 0.2s' }}>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
              <span className="text-ink-200">{d.label}</span>
            </div>
            <span className="text-ink-300 font-mono">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
