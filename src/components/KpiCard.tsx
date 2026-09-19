import { ArrowUpRight, ArrowDownRight, DollarSign, Users, FolderKanban, Target } from 'lucide-react';
import { Sparkline } from '@/components/charts/Sparkline';
import type { Kpi } from '@/data/mockData';

const iconMap = {
  revenue: DollarSign,
  customers: Users,
  projects: FolderKanban,
  conversion: Target,
};

const colorMap = {
  accent: { bg: 'from-accent-500/20 to-accent-600/5', text: 'text-accent-400', stroke: '#3b82f6' },
  mint: { bg: 'from-mint-500/20 to-mint-600/5', text: 'text-mint-400', stroke: '#10b981' },
  amber: { bg: 'from-amber-500/20 to-amber-600/5', text: 'text-amber-400', stroke: '#f59e0b' },
  rose: { bg: 'from-rose-500/20 to-rose-600/5', text: 'text-rose-400', stroke: '#f43f5e' },
};

export function KpiCard({ kpi, index }: { kpi: Kpi; index: number }) {
  const Icon = iconMap[kpi.icon];
  const c = colorMap[kpi.accent];
  const positive = kpi.change >= 0;

  return (
    <div
      className="glass-card glass-card-hover p-5 animate-slide-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${c.text}`} />
        </div>
        <div className={`flex items-center gap-1 chip ${positive ? 'bg-mint-500/15 text-mint-400' : 'bg-rose-500/15 text-rose-400'}`}>
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(kpi.change)}%
        </div>
      </div>
      <p className="text-xs text-ink-300 mb-1">{kpi.label}</p>
      <p className="font-display font-bold text-2xl text-white mb-3">{kpi.value}</p>
      <div className="flex items-end justify-between gap-3">
        <span className="text-2xs text-ink-300">{kpi.changeLabel}</span>
        <div className="w-24">
          <Sparkline data={kpi.spark} color={c.stroke} />
        </div>
      </div>
    </div>
  );
}
