import React from 'react';
import { ChurchActivityItem } from '../../types';
import { EmptyState } from './EmptyState';

interface RecentActivityProps {
  activities: ChurchActivityItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: ChurchActivityItem['type']) => {
    switch (type) {
      case 'announcement':
        return { icon: 'campaign', color: 'text-[#6B4F2A]', bg: 'bg-[#F7F1E5]' };
      case 'event':
        return { icon: 'calendar_month', color: 'text-[#6B4F2A]', bg: 'bg-[#F7F1E5]' };
      case 'community':
        return { icon: 'diversity_3', color: 'text-[#66805C]', bg: 'bg-[#66805C]/15' };
      case 'prayer':
        return { icon: 'volunteer_activism', color: 'text-[#D4A94D]', bg: 'bg-[#D4A94D]/20' };
      case 'ministry':
      default:
        return { icon: 'church', color: 'text-[#A67C52]', bg: 'bg-[#A67C52]/15' };
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs flex flex-col gap-4 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-[#A67C52]">history</span>
          <h3 className="font-serif text-lg font-bold text-[#2D2924]">
            Recent Community Activity
          </h3>
        </div>
        <span className="text-xs text-[#766F67]">Updated recently</span>
      </div>

      {activities.length === 0 ? (
        <EmptyState
          icon="done_all"
          title="You're all caught up"
          description="There is no new activity right now. When members share prayers or announcements are posted, they will appear here."
        />
      ) : (
        <div className="flex flex-col divide-y divide-[#E6DCCB]/60">
          {activities.map(act => {
            const visual = getActivityIcon(act.type);
            return (
              <div key={act.id} className="py-3 first:pt-0 last:pb-0 flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl ${visual.bg} flex items-center justify-center shrink-0 border border-[#E6DCCB]/60`}
                >
                  <span className={`material-symbols-outlined text-[18px] ${visual.color}`}>
                    {visual.icon}
                  </span>
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#2D2924] truncate">
                      {act.title}
                    </span>
                    <span className="text-[11px] text-[#766F67] whitespace-nowrap shrink-0">
                      {act.timeAgo}
                    </span>
                  </div>

                  <p className="text-xs text-[#766F67] leading-relaxed mt-0.5 line-clamp-2">
                    {act.description}
                  </p>

                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#A67C52]">
                    <span className="font-semibold">{act.actorName}</span>
                    {act.badge && (
                      <>
                        <span>•</span>
                        <span className="bg-[#F7F1E5] px-1.5 py-0.2 rounded text-[10px] text-[#766F67] font-medium border border-[#E6DCCB]/60">
                          {act.badge}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
