import { TrendingUp, TrendingDown, Download } from 'lucide-react';
import { AreaChart } from '@/components/charts/AreaChart';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { RadialProgress } from '@/components/charts/RadialProgress';
import { revenueData, expenseData, cashFlowData, weeklyActivity, teamPerformance } from '@/data/mockData';

const analyticsKpis = [
  { label: 'Avg. Session Duration', value: '4m 32s', change: 6.2, positive: true },
  { label: 'Bounce Rate', value: '32.4%', change: -2.1, positive: true },
  { label: 'Page Views', value: '1.2M', change: 14.8, positive: true },
  { label: 'Avg. Order Value', value: '$486', change: -1.4, positive: false },
];

export function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Analytics</h1>
          <p className="text-sm text-ink-300 mt-1">Deep dive into your business performance metrics.</p>
        </div>
        <button className="btn-ghost flex items-center gap-2">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {analyticsKpis.map((k, i) => (
          <div key={i} className="glass-card glass-card-hover p-5 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
            <p className="text-xs text-ink-300 mb-2">{k.label}</p>
            <p className="font-display font-bold text-2xl text-white mb-2">{k.value}</p>
            <div className={`flex items-center gap-1 text-xs ${k.positive ? 'text-mint-400' : 'text-rose-400'}`}>
              {k.positive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {Math.abs(k.change)}% <span className="text-ink-300 ml-1">vs last period</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold text-white text-base mb-1">Revenue vs Expenses</h3>
          <p className="text-2xs text-ink-300 mb-4">Comparative monthly breakdown (in thousands)</p>
          <AreaChart data={revenueData} series1Name="Revenue" series2Name="Expenses" color1="#3b82f6" color2="#f43f5e" formatValue={(v) => `$${v}K`} />
        </div>
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold text-white text-base mb-1">Cash Flow</h3>
          <p className="text-2xs text-ink-300 mb-4">Weekly inflow vs outflow</p>
          <LineChart data={cashFlowData} series1Name="Inflow" series2Name="Outflow" color1="#10b981" color2="#f59e0b" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold text-white text-base mb-1">Team Performance</h3>
          <p className="text-2xs text-ink-300 mb-4">Department efficiency scores</p>
          <RadialProgress data={teamPerformance} />
        </div>
        <div className="lg:col-span-2 glass-card p-5">
          <h3 className="font-display font-semibold text-white text-base mb-1">Task Completion Rate</h3>
          <p className="text-2xs text-ink-300 mb-4">Weekly activity across all projects</p>
          <BarChart data={weeklyActivity} color="#3b82f6" formatValue={(v) => `${v} tasks`} height={260} />
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="font-display font-semibold text-white text-base mb-1">Expense Trend</h3>
        <p className="text-2xs text-ink-300 mb-4">Monthly expense progression (in thousands)</p>
        <AreaChart data={expenseData} series1Name="Expenses" series2Name="Budget" color1="#f59e0b" color2="#8b5cf6" formatValue={(v) => `$${v}K`} />
      </div>
    </div>
  );
}
