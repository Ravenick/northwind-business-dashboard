import { Download, Plus, TrendingUp, Activity } from 'lucide-react';
import { kpis, revenueData, categoryBreakdown, weeklyActivity } from '@/data/mockData';
import { KpiCard } from '@/components/KpiCard';
import { AreaChart } from '@/components/charts/AreaChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { BarChart } from '@/components/charts/BarChart';
import { TransactionsTable } from '@/components/TransactionsTable';
import { ActivityFeed } from '@/components/ActivityFeed';
import { ProjectsTable } from '@/components/ProjectsTable';

export function DashboardView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Welcome back, Anna</h1>
          <p className="text-sm text-ink-300 mt-1">Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-ghost flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.id} kpi={kpi} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="font-display font-semibold text-white text-base">Revenue Overview</h3>
              <p className="text-2xs text-ink-300 mt-1">Monthly revenue vs. target (in thousands)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="chip bg-mint-500/15 text-mint-400">
                <TrendingUp className="w-3 h-3" />
                +12.4%
              </span>
            </div>
          </div>
          <div className="mt-4">
            <AreaChart data={revenueData} series1Name="Revenue" series2Name="Target" formatValue={(v) => `$${v}K`} />
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="mb-5">
            <h3 className="font-display font-semibold text-white text-base">Expense Breakdown</h3>
            <p className="text-2xs text-ink-300 mt-1">By category this quarter</p>
          </div>
          <DonutChart data={categoryBreakdown} centerLabel="Total Spend" centerValue="$1.2M" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display font-semibold text-white text-base">Weekly Activity</h3>
              <p className="text-2xs text-ink-300 mt-1">Tasks completed per day</p>
            </div>
            <span className="chip bg-accent-500/15 text-accent-400">
              <Activity className="w-3 h-3" />
              This Week
            </span>
          </div>
          <BarChart data={weeklyActivity} color="#8b5cf6" formatValue={(v) => `${v} tasks`} />
        </div>

        <div className="lg:col-span-2">
          <ProjectsTable limit={4} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionsTable />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
