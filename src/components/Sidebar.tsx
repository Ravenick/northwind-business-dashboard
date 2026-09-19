import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  Wallet,
  Users,
  Settings,
  HelpCircle,
  Zap,
  TrendingUp,
} from 'lucide-react';

export type ViewId = 'dashboard' | 'analytics' | 'projects' | 'wallet' | 'team' | 'settings';

type SidebarProps = {
  active: ViewId;
  onNavigate: (v: ViewId) => void;
  open: boolean;
  onClose: () => void;
};

const navItems: { id: ViewId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ active, onNavigate, open, onClose }: SidebarProps) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-64 shrink-0 flex flex-col border-r border-ink-700 bg-ink-900/80 backdrop-blur-xl transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-ink-700">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500 to-mint-500 flex items-center justify-center shadow-lg shadow-accent-500/20">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-white text-base leading-none">Northwind</h1>
            <p className="text-2xs text-ink-300 mt-0.5">Business Intelligence</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 mb-2 text-2xs font-semibold text-ink-300 uppercase tracking-wider">Menu</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`nav-item w-full ${active === item.id ? 'active' : ''}`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
                {item.id === 'analytics' && (
                  <span className="ml-auto chip bg-mint-500/15 text-mint-400">
                    <TrendingUp className="w-3 h-3" />
                    Live
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="px-3 pb-4">
          <div className="glass-card glass-card-hover p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Need help?</p>
                <p className="text-2xs text-ink-300">Check our docs</p>
              </div>
            </div>
            <button className="btn-ghost w-full text-center mt-2">View Docs</button>
          </div>
        </div>
      </aside>
    </>
  );
}
