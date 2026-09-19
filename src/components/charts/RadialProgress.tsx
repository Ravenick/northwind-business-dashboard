import { useState } from 'react';

type RadialProgressProps = {
  data: { label: string; value: number; color: string }[];
  size?: number;
};

export function RadialProgress({ data, size = 220 }: RadialProgressProps) {
  const [hover, setHover] = useState<number | null>(null);
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size / 2 - 12;
  const ringWidth = 14;
  const gap = 6;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
          {data.map((d, i) => {
            const radius = maxRadius - i * (ringWidth + gap);
            const circumference = 2 * Math.PI * radius;
            const dash = (d.value / 100) * circumference;
            const isHover = hover === i;
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#1a2236" strokeWidth={ringWidth} />
                <circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill="none"
                  stroke={d.color}
                  strokeWidth={isHover ? ringWidth + 2 : ringWidth}
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${circumference}`}
                  transform={`rotate(-90 ${cx} ${cy})`}
                  style={{ transition: 'stroke-width 0.2s', cursor: 'pointer', opacity: hover === null || isHover ? 1 : 0.4 }}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                />
              </g>
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {hover !== null ? (
            <>
              <span className="text-2xl font-bold text-white font-display">{data[hover].value}%</span>
              <span className="text-2xs text-ink-300 mt-0.5">{data[hover].label}</span>
            </>
          ) : (
            <>
              <span className="text-2xl font-bold text-white font-display">{Math.round(data.reduce((s, d) => s + d.value, 0) / data.length)}%</span>
              <span className="text-2xs text-ink-300 mt-0.5">Avg Score</span>
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
