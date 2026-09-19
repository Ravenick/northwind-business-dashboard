import { UserPlus, Mail, Phone, MoreHorizontal } from 'lucide-react';
import { RadialProgress } from '@/components/charts/RadialProgress';
import { teamPerformance } from '@/data/mockData';

const team = [
  { name: 'Anna Kim', role: 'Lead Engineer', initials: 'AK', color: '#3b82f6', email: 'anna@northwind.io', phone: '+1 555 0142', projects: 4, status: 'active' },
  { name: 'Devon Lee', role: 'Product Manager', initials: 'DL', color: '#8b5cf6', email: 'devon@northwind.io', phone: '+1 555 0288', projects: 3, status: 'active' },
  { name: 'Tara Nguyen', role: 'Senior Designer', initials: 'TN', color: '#3b82f6', email: 'tara@northwind.io', phone: '+1 555 0367', projects: 5, status: 'active' },
  { name: 'Jordan Webb', role: 'DevOps Engineer', initials: 'JW', color: '#10b981', email: 'jordan@northwind.io', phone: '+1 555 0411', projects: 2, status: 'away' },
  { name: 'Mia Rodriguez', role: 'Financial Analyst', initials: 'MR', color: '#10b981', email: 'mia@northwind.io', phone: '+1 555 0523', projects: 3, status: 'active' },
  { name: 'Evan Vasquez', role: 'Backend Engineer', initials: 'EV', color: '#10b981', email: 'evan@northwind.io', phone: '+1 555 0644', projects: 4, status: 'active' },
  { name: 'Nina Patel', role: 'UX Researcher', initials: 'NP', color: '#f59e0b', email: 'nina@northwind.io', phone: '+1 555 0712', projects: 2, status: 'offline' },
  { name: 'Sam Park', role: 'Frontend Engineer', initials: 'SP', color: '#f43f5e', email: 'sam@northwind.io', phone: '+1 555 0834', projects: 3, status: 'active' },
];

const statusConfig = {
  active: { label: 'Active', color: 'bg-mint-500' },
  away: { label: 'Away', color: 'bg-amber-500' },
  offline: { label: 'Offline', color: 'bg-ink-400' },
};

export function TeamView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Team</h1>
          <p className="text-sm text-ink-300 mt-1">Manage your team members and their performance.</p>
        </div>
        <button className="btn-primary flex items-center gap-2"><UserPlus className="w-4 h-4" />Invite Member</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold text-white text-base mb-1">Department Performance</h3>
          <p className="text-2xs text-ink-300 mb-4">Efficiency scores by team</p>
          <RadialProgress data={teamPerformance} />
        </div>
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Members', value: '24', accent: 'text-white' },
            { label: 'Active Now', value: '18', accent: 'text-mint-400' },
            { label: 'On Leave', value: '3', accent: 'text-amber-400' },
            { label: 'Open Roles', value: '2', accent: 'text-accent-400' },
            { label: 'Avg. Tenure', value: '2.4y', accent: 'text-white' },
            { label: 'Satisfaction', value: '94%', accent: 'text-mint-400' },
          ].map((s, i) => (
            <div key={i} className="glass-card p-4 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
              <p className="text-2xs text-ink-300 mb-1">{s.label}</p>
              <p className={`font-display font-bold text-2xl ${s.accent}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {team.map((m, i) => {
          const sc = statusConfig[m.status as keyof typeof statusConfig];
          return (
            <div key={i} className="glass-card glass-card-hover p-5 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ background: m.color }}>
                    {m.initials}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full ${sc.color} ring-2 ring-ink-850`} />
                </div>
                <button className="p-1.5 rounded-lg hover:bg-ink-700 text-ink-300"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
              <h4 className="font-semibold text-white text-sm">{m.name}</h4>
              <p className="text-2xs text-ink-300 mt-0.5 mb-3">{m.role}</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-2xs text-ink-200">
                  <Mail className="w-3 h-3 text-ink-300" /> {m.email}
                </div>
                <div className="flex items-center gap-2 text-2xs text-ink-200">
                  <Phone className="w-3 h-3 text-ink-300" /> {m.phone}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-ink-700">
                <span className="text-2xs text-ink-300">{m.projects} active projects</span>
                <span className={`chip ${m.status === 'active' ? 'bg-mint-500/15 text-mint-400' : m.status === 'away' ? 'bg-amber-500/15 text-amber-400' : 'bg-ink-600 text-ink-300'}`}>{sc.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
