import React from 'react';
import { useApp, TabType } from '../../context/AppContext';

export const BottomNavBar: React.FC = () => {
  const { currentTab, setCurrentTab } = useApp();

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'today', label: 'Today', icon: 'wb_sunny' },
    { id: 'bible', label: 'Scripture', icon: 'menu_book' },
    { id: 'reflect', label: 'Reflect', icon: 'lightbulb' },
    { id: 'prayer', label: 'Prayer', icon: 'favorite' },
    { id: 'friends', label: 'Circle', icon: 'groups' },
    { id: 'journal', label: 'Journal', icon: 'history_edu' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe bg-[#F7F1E5]/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(45,41,36,0.06)] border-t border-[#E6DCCB] transition-colors">
      <div className="flex justify-around items-center h-16 px-1 max-w-md mx-auto">
        {tabs.map(tab => {
          const isActive =
            currentTab === tab.id ||
            (tab.id === 'today' && currentTab === 'home') ||
            (tab.id === 'journal' && currentTab === 'calendar');

          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] py-1 px-1.5 rounded-xl transition-all active:scale-95 relative ${
                isActive
                  ? 'text-[#6B4F2A] font-bold bg-[#E6DCCB]/30'
                  : 'text-[#766F67] hover:text-[#2D2924]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1", color: '#6B4F2A' } : undefined}
              >
                {tab.icon}
              </span>
              <span className="text-[10px] leading-tight font-medium tracking-tight mt-0.5">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 bg-[#D4A94D] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
