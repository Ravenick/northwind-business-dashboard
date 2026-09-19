import { MoreHorizontal } from 'lucide-react';
import { activities } from '@/data/mockData';

export function ActivityFeed() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display font-semibold text-white text-base">Activity Feed</h3>
          <p className="text-2xs text-ink-300 mt-1">Real-time team updates</p>
        </div>
        <button className="p-2 rounded-lg hover:bg-ink-700 text-ink-300">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-ink-700" />
        <div className="space-y-4">
          {activities.map((a) => (
            <div key={a.id} className="flex gap-3 relative animate-fade-in">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-2xs font-bold text-white shrink-0 z-10 ring-4 ring-ink-850"
                style={{ background: a.color }}
              >
                {a.initials}
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm text-ink-100">
                  <span className="font-semibold text-white">{a.user}</span>{' '}
                  <span className="text-ink-300">{a.action}</span>{' '}
                  <span className="font-medium text-accent-300">{a.target}</span>
                </p>
                <p className="text-2xs text-ink-300 mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
