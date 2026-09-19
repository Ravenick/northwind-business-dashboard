import { useEffect, useState } from 'react';
import { Sidebar, type ViewId } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { DashboardView } from '@/views/DashboardView';
import { AnalyticsView } from '@/views/AnalyticsView';
import { ProjectsView } from '@/views/ProjectsView';
import { WalletView } from '@/views/WalletView';
import { TeamView } from '@/views/TeamView';
import { SettingsView } from '@/views/SettingsView';

const viewMeta: Record<ViewId, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Overview of your business performance' },
  analytics: { title: 'Analytics', subtitle: 'Real-time insights and metrics' },
  projects: { title: 'Projects', subtitle: 'Track and manage all projects' },
  wallet: { title: 'Wallet', subtitle: 'Financial accounts and transactions' },
  team: { title: 'Team', subtitle: 'Members and department performance' },
  settings: { title: 'Settings', subtitle: 'Account and system preferences' },
};

function App() {
  const [view, setView] = useState<ViewId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('northwind-theme') !== 'light');

  useEffect(() => {
    localStorage.setItem('northwind-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const meta = viewMeta[view];

  return (
    <div className={`min-h-screen bg-ink-950 flex ${darkMode ? '' : 'theme-light'}`}>
      <div className="fixed inset-0 bg-radial-glow pointer-events-none z-0" />
      <Sidebar active={view} onNavigate={setView} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <TopBar
          onMenuClick={() => setSidebarOpen(true)}
          title={meta.title}
          subtitle={meta.subtitle}
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode((current) => !current)}
        />
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div key={view} className="animate-fade-in max-w-[1600px] mx-auto">
            {view === 'dashboard' && <DashboardView />}
            {view === 'analytics' && <AnalyticsView />}
            {view === 'projects' && <ProjectsView />}
            {view === 'wallet' && <WalletView />}
            {view === 'team' && <TeamView />}
            {view === 'settings' && <SettingsView />}
          </div>
        </main>
      </div>
      <a
        className="ravenick-badge"
        href="https://github.com/Ravenick"
        target="_blank"
        rel="noreferrer"
        aria-label="Built by Ravenick, Nelson Emmanuel"
      >
        <span className="ravenick-badge__sheen" aria-hidden="true" />
        <img src="/oc-logo-no-bg.png" alt="" className="ravenick-badge__logo" />
        <span className="ravenick-badge__copy">
          <span className="ravenick-badge__built">Built by</span>
          <span className="ravenick-badge__name">Ravenick</span>
        </span>
      </a>
    </div>
  );
}

export default App;
