import React from 'react';
import { useApp, TabType } from '../../context/AppContext';

interface QuickActionsProps {
  onScrollToSection?: (sectionId: string) => void;
  onOpenAnnouncementsModal?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onScrollToSection,
  onOpenAnnouncementsModal
}) => {
  const { setCurrentTab, startReading } = useApp();

  const actions = [
    {
      id: 'announcements',
      label: 'Announcements',
      sublabel: 'Church News',
      icon: 'campaign',
      color: 'text-[#6B4F2A]',
      bgColor: 'bg-[#F7F1E5]',
      onClick: () => {
        if (onOpenAnnouncementsModal) {
          onOpenAnnouncementsModal();
        } else if (onScrollToSection) {
          onScrollToSection('announcements-section');
        }
      }
    },
    {
      id: 'events',
      label: 'Events',
      sublabel: 'Gatherings',
      icon: 'calendar_month',
      color: 'text-[#6B4F2A]',
      bgColor: 'bg-[#F7F1E5]',
      onClick: () => {
        setCurrentTab('events');
      }
    },
    {
      id: 'prayer',
      label: 'Prayer',
      sublabel: 'Requests & Stillness',
      icon: 'volunteer_activism',
      color: 'text-[#6B4F2A]',
      bgColor: 'bg-[#F7F1E5]',
      onClick: () => {
        setCurrentTab('prayer');
      }
    },
    {
      id: 'community',
      label: 'Community',
      sublabel: 'Fellowship Circles',
      icon: 'diversity_3',
      color: 'text-[#6B4F2A]',
      bgColor: 'bg-[#F7F1E5]',
      onClick: () => {
        setCurrentTab('friends');
      }
    },
    {
      id: 'devotional',
      label: 'Quiet Time',
      sublabel: 'Today\'s Word',
      icon: 'auto_stories',
      color: 'text-[#6B4F2A]',
      bgColor: 'bg-[#F7F1E5]',
      onClick: () => {
        startReading();
      }
    },
    {
      id: 'profile',
      label: 'My Profile',
      sublabel: 'Preferences',
      icon: 'person',
      color: 'text-[#6B4F2A]',
      bgColor: 'bg-[#F7F1E5]',
      onClick: () => {
        setCurrentTab('profile');
      }
    }
  ];

  return (
    <section className="flex flex-col gap-3 font-sans">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg sm:text-xl font-bold text-[#2D2924] flex items-center gap-2">
          <span>Quick Actions</span>
        </h2>
        <span className="text-xs text-[#766F67]">Jump to community areas</span>
      </div>

      {/* Grid: 2 columns on small mobile, 3 on tablet, 6 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5">
        {actions.map(action => (
          <button
            key={action.id}
            onClick={action.onClick}
            className="min-h-[58px] p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] hover:border-[#6B4F2A] hover:shadow-xs transition-all flex flex-col items-start justify-between gap-2.5 text-left active:scale-[0.98] group cursor-pointer"
            type="button"
          >
            <div className={`w-10 h-10 rounded-xl ${action.bgColor} border border-[#E6DCCB] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
              <span className={`material-symbols-outlined text-[20px] ${action.color}`}>
                {action.icon}
              </span>
            </div>
            <div>
              <span className="block font-serif text-sm font-bold text-[#2D2924] group-hover:text-[#6B4F2A] transition-colors leading-tight">
                {action.label}
              </span>
              <span className="block text-[11px] text-[#766F67] leading-tight mt-0.5 font-medium truncate">
                {action.sublabel}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
