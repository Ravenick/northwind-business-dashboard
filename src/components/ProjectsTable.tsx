import { useState } from 'react';
import { MoreHorizontal, Calendar } from 'lucide-react';
import { projects } from '@/data/mockData';

const statusConfig = {
  'on-track': { label: 'On Track', color: 'text-mint-400 bg-mint-500/15' },
  'at-risk': { label: 'At Risk', color: 'text-amber-400 bg-amber-500/15' },
  delayed: { label: 'Delayed', color: 'text-rose-400 bg-rose-500/15' },
  completed: { label: 'Completed', color: 'text-accent-400 bg-accent-500/15' },
};

export function ProjectsTable({ limit }: { limit?: number }) {
  const [sortBy, setSortBy] = useState<'progress' | 'budget'>('progress');
  const rows = [...projects].sort((a, b) => b[sortBy] - a[sortBy]).slice(0, limit);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h3 className="font-display font-semibold text-white text-base">Project Portfolio</h3>
          <p className="text-2xs text-ink-300 mt-1">Track budget, progress, and delivery status</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-ink-800 rounded-lg p-0.5 border border-ink-600">
            <button onClick={() => setSortBy('progress')} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${sortBy === 'progress' ? 'bg-ink-600 text-white' : 'text-ink-300'}`}>Progress</button>
            <button onClick={() => setSortBy('budget')} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${sortBy === 'budget' ? 'bg-ink-600 text-white' : 'text-ink-300'}`}>Budget</button>
          </div>
          <button className="p-2 rounded-lg hover:bg-ink-700 text-ink-300"><MoreHorizontal className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="overflow-x-auto -mx-5">
        <table className="w-full min-w-[680px]">
          <thead>
            <tr className="border-b border-ink-700">
              <th className="text-left text-2xs font-semibold text-ink-300 uppercase tracking-wider px-5 pb-3">Project</th>
              <th className="text-left text-2xs font-semibold text-ink-300 uppercase tracking-wider pb-3">Status</th>
              <th className="text-left text-2xs font-semibold text-ink-300 uppercase tracking-wider pb-3 min-w-[140px]">Progress</th>
              <th className="text-right text-2xs font-semibold text-ink-300 uppercase tracking-wider pb-3">Budget</th>
              <th className="text-left text-2xs font-semibold text-ink-300 uppercase tracking-wider pb-3 pl-4">Team</th>
              <th className="text-left text-2xs font-semibold text-ink-300 uppercase tracking-wider pb-3 pl-4">Due</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => {
              const sc = statusConfig[p.status];
              const budgetPct = Math.round((p.spent / p.budget) * 100);
              return (
                <tr key={p.id} className="border-b border-ink-700/50 last:border-0 hover:bg-ink-700/20 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-white font-medium">{p.name}</p>
                    <p className="text-2xs text-ink-300 mt-0.5">{p.client}</p>
                  </td>
                  <td className="py-3.5">
                    <span className={`chip ${sc.color}`}>{sc.label}</span>
                  </td>
                  <td className="py-3.5 min-w-[140px]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-ink-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${p.status === 'delayed' ? 'bg-rose-500' : p.status === 'at-risk' ? 'bg-amber-500' : p.status === 'completed' ? 'bg-mint-500' : 'bg-gradient-to-r from-accent-500 to-mint-500'}`}
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-ink-200 font-mono w-8">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="text-right py-3.5">
                    <p className="text-sm text-white font-mono font-medium">${(p.budget / 1000).toFixed(0)}K</p>
                    <p className="text-2xs text-ink-300 mt-0.5">{budgetPct}% used</p>
                  </td>
                  <td className="py-3.5 pl-4">
                    <div className="flex -space-x-2">
                      {p.team.map((m, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-2xs font-bold text-white ring-2 ring-ink-850"
                          style={{ background: m.color }}
                        >
                          {m.initials}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 pl-4">
                    <span className="inline-flex items-center gap-1 text-xs text-ink-200">
                      <Calendar className="w-3 h-3 text-ink-300" />
                      {p.due}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
