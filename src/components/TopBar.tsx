import { Search, Bell, Menu, ChevronDown, Command, Moon, Sun } from 'lucide-react';

type TopBarProps = {
  onMenuClick: () => void;
  title: string;
  subtitle: string;
  darkMode: boolean;
  onToggleTheme: () => void;
};

export function TopBar({ onMenuClick, title, subtitle, darkMode, onToggleTheme }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 h-16 px-4 sm:px-6 border-b border-ink-700 bg-ink-950/80 backdrop-blur-xl">
      <button onClick={onMenuClick} className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-ink-700 text-ink-200">
        <Menu className="w-5 h-5" />
      </button>

      <div className="min-w-0">
        <h2 className="font-display font-bold text-white text-lg leading-none truncate">{title}</h2>
        <p className="text-2xs text-ink-300 mt-1 truncate">{subtitle}</p>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden md:flex items-center relative">
          <Search className="w-4 h-4 text-ink-300 absolute left-3" />
          <input
            type="text"
            placeholder="Search anything..."
            className="input-field pl-9 pr-16 w-64"
          />
          <kbd className="absolute right-3 flex items-center gap-0.5 text-2xs text-ink-300 bg-ink-700 px-1.5 py-0.5 rounded">
            <Command className="w-3 h-3" />K
          </kbd>
        </div>

        <button className="relative p-2 rounded-lg hover:bg-ink-700 text-ink-200 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-ink-950" />
        </button>

        <button
          type="button"
          onClick={onToggleTheme}
          className="theme-toggle"
          aria-pressed={!darkMode}
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span className="hidden sm:inline">{darkMode ? 'Light' : 'Dark'}</span>
        </button>

        <button className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-lg hover:bg-ink-700 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
            AK
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-white leading-none">Anna Kim</p>
            <p className="text-2xs text-ink-300 mt-0.5">Admin</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-ink-300 hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
