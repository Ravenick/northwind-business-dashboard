import { useState } from 'react';
import { MoreHorizontal, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { transactions } from '@/data/mockData';

const statusConfig = {
  completed: { color: 'text-mint-400 bg-mint-500/15', icon: CheckCircle2 },
  pending: { color: 'text-amber-400 bg-amber-500/15', icon: Clock },
  failed: { color: 'text-rose-400 bg-rose-500/15', icon: XCircle },
};

export function TransactionsTable() {
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');
  const filtered = transactions.filter((t) => filter === 'all' || t.type === filter);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display font-semibold text-white text-base">Recent Transactions</h3>
          <p className="text-2xs text-ink-300 mt-1">Latest financial activity across all accounts</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-ink-800 rounded-lg p-0.5 border border-ink-600">
            {(['all', 'credit', 'debit'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${
                  filter === f ? 'bg-ink-600 text-white' : 'text-ink-300 hover:text-ink-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="p-2 rounded-lg hover:bg-ink-700 text-ink-300">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto -mx-5">
        <table className="w-full min-w-[560px]">
          <thead>
            <tr className="border-b border-ink-700">
              <th className="text-left text-2xs font-semibold text-ink-300 uppercase tracking-wider px-5 pb-3">Description</th>
              <th className="text-left text-2xs font-semibold text-ink-300 uppercase tracking-wider pb-3">Category</th>
              <th className="text-right text-2xs font-semibold text-ink-300 uppercase tracking-wider pb-3">Amount</th>
              <th className="text-left text-2xs font-semibold text-ink-300 uppercase tracking-wider pb-3 pl-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => {
              const sc = statusConfig[t.status];
              const SIcon = sc.icon;
              return (
                <tr key={t.id} className="border-b border-ink-700/50 last:border-0 hover:bg-ink-700/20 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === 'credit' ? 'bg-mint-500/15' : 'bg-rose-500/15'}`}>
                        {t.type === 'credit' ? <ArrowDownRight className="w-4 h-4 text-mint-400" /> : <ArrowUpRight className="w-4 h-4 text-rose-400" />}
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">{t.description}</p>
                        <p className="text-2xs text-ink-300 mt-0.5">{t.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="pb-3.5 pt-3.5">
                    <span className="chip bg-ink-700 text-ink-200">{t.category}</span>
                  </td>
                  <td className="text-right pb-3.5 pt-3.5">
                    <span className={`font-mono font-semibold text-sm ${t.type === 'credit' ? 'text-mint-400' : 'text-rose-400'}`}>
                      {t.type === 'credit' ? '+' : '-'}${t.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="pb-3.5 pt-3.5 pl-4">
                    <span className={`chip ${sc.color}`}>
                      <SIcon className="w-3 h-3" />
                      {t.status}
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
