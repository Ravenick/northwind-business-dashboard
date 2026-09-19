import { useState, useRef, useCallback } from 'react';

type AreaChartProps = {
  data: { label: string; value: number; value2?: number }[];
  height?: number;
  series1Name?: string;
  series2Name?: string;
  color1?: string;
  color2?: string;
  formatValue?: (v: number) => string;
};

export function AreaChart({
  data,
  height = 260,
  series1Name = 'Revenue',
  series2Name = 'Target',
  color1 = '#3b82f6',
  color2 = '#10b981',
  formatValue = (v) => `$${v}K`,
}: AreaChartProps) {
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 800;
  const padding = { top: 20, right: 20, bottom: 36, left: 52 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const allValues = data.flatMap((d) => [d.value, d.value2 ?? 0]);
  const maxVal = Math.max(...allValues) * 1.15;
  const minVal = 0;

  const xFor = (i: number) => padding.left + (i / (data.length - 1)) * chartW;
  const yFor = (v: number) => padding.top + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;

  const buildPath = (key: 'value' | 'value2') => {
    return data
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i)} ${yFor(d[key] ?? 0)}`)
      .join(' ');
  };
  const buildArea = (key: 'value' | 'value2') => {
    const top = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i)} ${yFor(d[key] ?? 0)}`).join(' ');
    return `${top} L ${xFor(data.length - 1)} ${padding.top + chartH} L ${xFor(0)} ${padding.top + chartH} Z`;
  };

  const handleMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * width;
    const idx = Math.round(((x - padding.left) / chartW) * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, idx)));
  }, [chartW, data.length]);

  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="relative w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ height }}
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="area1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color1} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color1} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="area2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color2} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color2} stopOpacity="0" />
          </linearGradient>
        </defs>

        {gridLines.map((g, i) => (
          <line
            key={i}
            x1={padding.left}
            x2={width - padding.right}
            y1={padding.top + g * chartH}
            y2={padding.top + g * chartH}
            stroke="#1a2236"
            strokeWidth="1"
            strokeDasharray={i === 0 ? '0' : '4 4'}
          />
        ))}

        {gridLines.map((g, i) => {
          const val = maxVal - g * (maxVal - minVal);
          return (
            <text key={i} x={padding.left - 10} y={padding.top + g * chartH + 4} textAnchor="end" fill="#5a6885" fontSize="11" fontFamily="JetBrains Mono, monospace">
              {val >= 1000 ? `${(val / 1000).toFixed(1)}M` : `${Math.round(val)}`}
            </text>
          );
        })}

        {data.map((d, i) => (
          <text key={i} x={xFor(i)} y={height - 12} textAnchor="middle" fill="#5a6885" fontSize="11">
            {d.label}
          </text>
        ))}

        <path d={buildArea('value2')} fill="url(#area2)" />
        <path d={buildPath('value2')} fill="none" stroke={color2} strokeWidth="2" strokeDasharray="5 4" opacity="0.7" />

        <path d={buildArea('value')} fill="url(#area1)" />
        <path d={buildPath('value')} fill="none" stroke={color1} strokeWidth="2.5" className="animate-draw" style={{ strokeDasharray: 1000 }} />

        {hover !== null && (
          <g>
            <line
              x1={xFor(hover)}
              x2={xFor(hover)}
              y1={padding.top}
              y2={padding.top + chartH}
              stroke="#3d4a6b"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <circle cx={xFor(hover)} cy={yFor(data[hover].value)} r="5" fill={color1} stroke="#0a0e1a" strokeWidth="2" />
            {data[hover].value2 !== undefined && (
              <circle cx={xFor(hover)} cy={yFor(data[hover].value2!)} r="4" fill={color2} stroke="#0a0e1a" strokeWidth="2" />
            )}
          </g>
        )}
      </svg>

      {hover !== null && (
        <div
          className="absolute pointer-events-none z-20 glass-card px-3 py-2.5 text-xs"
          style={{
            left: `${(xFor(hover) / width) * 100}%`,
            top: 0,
            transform: 'translateX(-50%) translateY(-8px)',
          }}
        >
          <div className="text-ink-300 font-medium mb-1.5">{data[hover].label}</div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ background: color1 }} />
            <span className="text-ink-200">{series1Name}:</span>
            <span className="text-white font-semibold font-mono">{formatValue(data[hover].value)}</span>
          </div>
          {data[hover].value2 !== undefined && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: color2 }} />
              <span className="text-ink-200">{series2Name}:</span>
              <span className="text-white font-semibold font-mono">{formatValue(data[hover].value2!)}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-5 mt-3 pl-12">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ background: color1 }} />
          <span className="text-xs text-ink-300">{series1Name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full border border-dashed" style={{ borderColor: color2 }} />
          <span className="text-xs text-ink-300">{series2Name}</span>
        </div>
      </div>
    </div>
  );
}
