import { useState } from 'react';
import { User, Bell, Shield, CreditCard, Globe, Moon, Check } from 'lucide-react';

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'appearance', label: 'Appearance', icon: Moon },
];

const toggleItems = [
  { id: 'email', label: 'Email notifications', desc: 'Receive updates about your account', enabled: true },
  { id: 'push', label: 'Push notifications', desc: 'Get real-time alerts on your devices', enabled: true },
  { id: 'weekly', label: 'Weekly digest', desc: 'Summary of your business activity', enabled: false },
  { id: 'marketing', label: 'Product updates', desc: 'News about new features and improvements', enabled: false },
];

export function SettingsView() {
  const [active, setActive] = useState('profile');
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(toggleItems.map((t) => [t.id, t.enabled]))
  );
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-white">Settings</h1>
        <p className="text-sm text-ink-300 mt-1">Manage your account preferences and configuration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="glass-card p-3 space-y-1">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`nav-item w-full ${active === s.id ? 'active' : ''}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {active === 'profile' && (
            <>
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-white text-base mb-1">Profile Information</h3>
                <p className="text-2xs text-ink-300 mb-6">Update your personal details and contact info.</p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-violet-500 flex items-center justify-center text-xl font-bold text-white">AK</div>
                  <div>
                    <button className="btn-ghost text-xs">Change Avatar</button>
                    <p className="text-2xs text-ink-300 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-2xs font-semibold text-ink-300 uppercase tracking-wider mb-2 block">Full Name</label>
                    <input type="text" defaultValue="Anna Kim" className="input-field w-full" />
                  </div>
                  <div>
                    <label className="text-2xs font-semibold text-ink-300 uppercase tracking-wider mb-2 block">Email</label>
                    <input type="email" defaultValue="anna@northwind.io" className="input-field w-full" />
                  </div>
                  <div>
                    <label className="text-2xs font-semibold text-ink-300 uppercase tracking-wider mb-2 block">Role</label>
                    <input type="text" defaultValue="Lead Engineer" className="input-field w-full" />
                  </div>
                  <div>
                    <label className="text-2xs font-semibold text-ink-300 uppercase tracking-wider mb-2 block">Phone</label>
                    <input type="text" defaultValue="+1 555 0142" className="input-field w-full" />
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <button className="btn-primary">Save Changes</button>
                  <button className="btn-ghost">Cancel</button>
                </div>
              </div>
            </>
          )}

          {active === 'notifications' && (
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-white text-base mb-1">Notification Preferences</h3>
              <p className="text-2xs text-ink-300 mb-6">Choose what updates you want to receive.</p>
              <div className="space-y-1">
                {toggleItems.map((t) => (
                  <div key={t.id} className="flex items-center justify-between py-4 border-b border-ink-700/50 last:border-0">
                    <div>
                      <p className="text-sm text-white font-medium">{t.label}</p>
                      <p className="text-2xs text-ink-300 mt-0.5">{t.desc}</p>
                    </div>
                    <button
                      onClick={() => setToggles((p) => ({ ...p, [t.id]: !p[t.id] }))}
                      className={`relative w-11 h-6 rounded-full transition-colors ${toggles[t.id] ? 'bg-accent-500' : 'bg-ink-600'}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${toggles[t.id] ? 'translate-x-5' : ''}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === 'security' && (
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-white text-base mb-1">Security</h3>
              <p className="text-2xs text-ink-300 mb-6">Keep your account safe and secure.</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-ink-800 border border-ink-600">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-mint-500/15 flex items-center justify-center"><Shield className="w-5 h-5 text-mint-400" /></div>
                    <div>
                      <p className="text-sm text-white font-medium">Two-Factor Authentication</p>
                      <p className="text-2xs text-mint-400 mt-0.5 flex items-center gap-1"><Check className="w-3 h-3" /> Enabled</p>
                    </div>
                  </div>
                  <button className="btn-ghost text-xs">Manage</button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-ink-800 border border-ink-600">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-500/15 flex items-center justify-center"><Globe className="w-5 h-5 text-accent-400" /></div>
                    <div>
                      <p className="text-sm text-white font-medium">Login Activity</p>
                      <p className="text-2xs text-ink-300 mt-0.5">3 active sessions</p>
                    </div>
                  </div>
                  <button className="btn-ghost text-xs">View</button>
                </div>
                <div>
                  <label className="text-2xs font-semibold text-ink-300 uppercase tracking-wider mb-2 block">Change Password</label>
                  <input type="password" placeholder="Current password" className="input-field w-full mb-3" />
                  <input type="password" placeholder="New password" className="input-field w-full" />
                  <button className="btn-primary mt-4">Update Password</button>
                </div>
              </div>
            </div>
          )}

          {active === 'billing' && (
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-white text-base mb-1">Current Plan</h3>
                <p className="text-2xs text-ink-300 mb-6">You are currently on the Enterprise plan.</p>
                <div className="rounded-xl bg-gradient-to-br from-accent-500/20 to-mint-500/10 border border-accent-500/30 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-display font-bold text-2xl text-white">Enterprise</p>
                      <p className="text-2xs text-ink-300 mt-1">Renews on Oct 14, 2026</p>
                    </div>
                    <p className="font-display font-bold text-2xl text-white">$499<span className="text-sm text-ink-300 font-normal">/mo</span></p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-2xs text-ink-200">
                    {['Unlimited projects', 'Advanced analytics', 'Priority support', 'Custom integrations'].map((f) => (
                      <div key={f} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-mint-400" /> {f}</div>
                    ))}
                  </div>
                </div>
                <button className="btn-ghost mt-4">Change Plan</button>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-white text-base mb-1">Payment Method</h3>
                <p className="text-2xs text-ink-300 mb-6">Manage your billing information.</p>
                <div className="flex items-center justify-between p-4 rounded-xl bg-ink-800 border border-ink-600">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-ink-600 flex items-center justify-center"><CreditCard className="w-5 h-5 text-ink-200" /></div>
                    <div>
                      <p className="text-sm text-white font-medium">Visa •••• 4892</p>
                      <p className="text-2xs text-ink-300 mt-0.5">Expires 08/27</p>
                    </div>
                  </div>
                  <button className="btn-ghost text-xs">Edit</button>
                </div>
              </div>
            </div>
          )}

          {active === 'appearance' && (
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-white text-base mb-1">Appearance</h3>
              <p className="text-2xs text-ink-300 mb-6">Customize how Northwind looks on your device.</p>
              <div className="flex items-center justify-between py-4 border-b border-ink-700/50">
                <div>
                  <p className="text-sm text-white font-medium">Dark Mode</p>
                  <p className="text-2xs text-ink-300 mt-0.5">Use dark theme across the app</p>
                </div>
                <button onClick={() => setDarkMode(!darkMode)} className={`relative w-11 h-6 rounded-full transition-colors ${darkMode ? 'bg-accent-500' : 'bg-ink-600'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-5' : ''}`} />
                </button>
              </div>
              <div className="py-4">
                <p className="text-sm text-white font-medium mb-3">Accent Color</p>
                <div className="flex gap-3">
                  {['#3b82f6', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6'].map((c, i) => (
                    <button key={i} className="w-9 h-9 rounded-xl border-2 transition-transform hover:scale-110" style={{ background: c, borderColor: i === 0 ? '#fff' : 'transparent' }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
