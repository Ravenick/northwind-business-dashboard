import { Plus, Search, Filter, LayoutGrid, List } from 'lucide-react';
import { ProjectsTable } from '@/components/ProjectsTable';
import { projects } from '@/data/mockData';

const statusColors: Record<string, string> = {
  'on-track': 'bg-mint-500',
  'at-risk': 'bg-amber-500',
  delayed: 'bg-rose-500',
  completed: 'bg-accent-500',
};

export function ProjectsView() {
  const stats = [
    { label: 'Total Projects', value: projects.length, accent: 'text-white' },
    { label: 'On Track', value: projects.filter((p) => p.status === 'on-track').length, accent: 'text-mint-400' },
    { label: 'At Risk', value: projects.filter((p) => p.status === 'at-risk').length, accent: 'text-amber-400' },
    { label: 'Delayed', value: projects.filter((p) => p.status === 'delayed').length, accent: 'text-rose-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Projects</h1>
          <p className="text-sm text-ink-300 mt-1">Manage and monitor all active projects.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="glass-card p-4 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
            <p className="text-2xs text-ink-300 mb-1">{s.label}</p>
            <p className={`font-display font-bold text-2xl ${s.accent}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-ink-300 absolute left-3" />
          <input type="text" placeholder="Search projects..." className="input-field pl-9 w-full" />
        </div>
        <button className="btn-ghost flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filter</span>
        </button>
        <div className="flex bg-ink-800 rounded-lg p-0.5 border border-ink-600">
          <button className="p-2 rounded-md bg-ink-600 text-white"><List className="w-4 h-4" /></button>
          <button className="p-2 rounded-md text-ink-300"><LayoutGrid className="w-4 h-4" /></button>
        </div>
      </div>

      <ProjectsTable />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p, i) => (
          <div key={p.id} className="glass-card glass-card-hover p-5 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-white text-sm">{p.name}</h4>
                <p className="text-2xs text-ink-300 mt-0.5">{p.client}</p>
              </div>
              <span className={`w-2.5 h-2.5 rounded-full ${statusColors[p.status]} animate-pulse-soft`} />
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-2xs text-ink-300">Progress</span>
                <span className="text-xs font-mono text-white">{p.progress}%</span>
              </div>
              <div className="h-1.5 bg-ink-700 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${p.status === 'delayed' ? 'bg-rose-500' : p.status === 'at-risk' ? 'bg-amber-500' : p.status === 'completed' ? 'bg-mint-500' : 'bg-gradient-to-r from-accent-500 to-mint-500'}`} style={{ width: `${p.progress}%` }} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {p.team.map((m, j) => (
                  <div key={j} className="w-6 h-6 rounded-full flex items-center justify-center text-2xs font-bold text-white ring-2 ring-ink-850" style={{ background: m.color }}>{m.initials}</div>
                ))}
              </div>
              <div className="text-right">
                <p className="text-xs text-white font-mono">${(p.budget / 1000).toFixed(0)}K</p>
                <p className="text-2xs text-ink-300">Due {p.due}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
