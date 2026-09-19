import { Plus, ArrowUpRight, ArrowDownRight, Wallet as WalletIcon, CreditCard, Send } from 'lucide-react';
import { AreaChart } from '@/components/charts/AreaChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { TransactionsTable } from '@/components/TransactionsTable';
import { revenueData, expenseData, categoryBreakdown } from '@/data/mockData';

const accounts = [
  { name: 'Operating Account', number: '•••• 4892', balance: 842300, change: 12.4, color: 'from-accent-500 to-accent-700' },
  { name: 'Savings Reserve', number: '•••• 7610', balance: 1240000, change: 4.2, color: 'from-mint-500 to-mint-600' },
  { name: 'Business Credit', number: '•••• 3340', balance: -24500, change: -8.1, color: 'from-rose-500 to-rose-600' },
];

export function WalletView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Wallet</h1>
          <p className="text-sm text-ink-300 mt-1">Manage your accounts, balances, and transactions.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-ghost flex items-center gap-2"><Send className="w-4 h-4" /><span className="hidden sm:inline">Transfer</span></button>
          <button className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" />Add Funds</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {accounts.map((a, i) => (
          <div key={i} className={`relative overflow-hidden rounded-2xl p-5 border border-ink-600 bg-gradient-to-br ${a.color} animate-slide-up`} style={{ animationDelay: `${i * 80}ms` }}>
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <WalletIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/80 font-medium">{a.name}</p>
                    <p className="text-2xs text-white/60">{a.number}</p>
                  </div>
                </div>
                <CreditCard className="w-6 h-6 text-white/40" />
              </div>
              <p className="text-2xs text-white/70 mb-1">Available Balance</p>
              <p className="font-display font-bold text-2xl text-white mb-3">
                {a.balance < 0 ? '-' : ''}${Math.abs(a.balance).toLocaleString()}
              </p>
              <div className="flex items-center gap-1 text-xs text-white/80">
                {a.change >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {Math.abs(a.change)}% this month
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-5">
          <h3 className="font-display font-semibold text-white text-base mb-1">Cash Flow Analysis</h3>
          <p className="text-2xs text-ink-300 mb-4">Revenue vs expenses over time (in thousands)</p>
          <AreaChart data={revenueData} series1Name="Revenue" series2Name="Expenses" color1="#3b82f6" color2="#f43f5e" formatValue={(v) => `$${v}K`} />
        </div>
        <div className="glass-card p-5">
          <h3 className="font-display font-semibold text-white text-base mb-1">Spending by Category</h3>
          <p className="text-2xs text-ink-300 mb-4">Where your money goes</p>
          <DonutChart data={categoryBreakdown} centerLabel="Total" centerValue="$1.2M" />
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="font-display font-semibold text-white text-base mb-1">Expense Trend</h3>
        <p className="text-2xs text-ink-300 mb-4">Monthly expense progression (in thousands)</p>
        <AreaChart data={expenseData} series1Name="Expenses" series2Name="Budget" color1="#f59e0b" color2="#8b5cf6" formatValue={(v) => `$${v}K`} />
      </div>

      <TransactionsTable />
    </div>
  );
}
