import { useState, useCallback } from 'react';

type BarChartProps = {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  formatValue?: (v: number) => string;
};

export function BarChart({
  data,
  height = 220,
  color = '#3b82f6',
  formatValue = (v) => `${v}`,
}: BarChartProps) {
  const [hover, setHover] = useState<number | null>(null);
  const width = 800;
  const padding = { top: 20, right: 20, bottom: 36, left: 48 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const maxVal = Math.max(...data.map((d) => d.value)) * 1.15;
  const barW = (chartW / data.length) * 0.55;
  const gap = (chartW / data.length) * 0.45;

  const handleMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * width;
    const idx = Math.floor(((x - padding.left) / chartW) * data.length);
    setHover(Math.max(0, Math.min(data.length - 1, idx)));
  }, [chartW, data.length]);

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }} onMouseMove={handleMove} onMouseLeave={() => setHover(null)}>
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((g, i) => (
          <line key={i} x1={padding.left} x2={width - padding.right} y1={padding.top + g * chartH} y2={padding.top + g * chartH} stroke="#1a2236" strokeWidth="1" strokeDasharray={i === 0 ? '0' : '4 4'} />
        ))}
        {[0, 0.25, 0.5, 0.75, 1].map((g, i) => (
          <text key={i} x={padding.left - 10} y={padding.top + g * chartH + 4} textAnchor="end" fill="#5a6885" fontSize="11" fontFamily="JetBrains Mono, monospace">
            {Math.round(maxVal - g * maxVal)}
          </text>
        ))}

        {data.map((d, i) => {
          const x = padding.left + i * (barW + gap) + gap / 2;
          const barH = (d.value / maxVal) * chartH;
          const y = padding.top + chartH - barH;
          const isHover = hover === i;
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                rx="4"
                fill="url(#barGrad)"
                opacity={hover === null || isHover ? 1 : 0.5}
                style={{ transition: 'opacity 0.2s' }}
              />
              {isHover && (
                <rect x={x - 2} y={y - 2} width={barW + 4} height={barH + 2} rx="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
              )}
              <text x={x + barW / 2} y={height - 12} textAnchor="middle" fill="#5a6885" fontSize="11">{d.label}</text>
            </g>
          );
        })}
      </svg>

      {hover !== null && (
        <div
          className="absolute pointer-events-none z-20 glass-card px-3 py-2 text-xs"
          style={{ left: `${((padding.left + hover * (barW + gap) + gap / 2 + barW / 2) / width) * 100}%`, top: 0, transform: 'translateX(-50%) translateY(-8px)' }}
        >
          <div className="text-ink-300 font-medium mb-1">{data[hover].label}</div>
          <div className="text-white font-semibold font-mono">{formatValue(data[hover].value)}</div>
        </div>
      )}
    </div>
  );
}
