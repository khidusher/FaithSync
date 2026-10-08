import React from 'react';
import { useApp, TabType } from '../../context/AppContext';
import { FaithSyncLogo } from '../common/FaithSyncLogo';

export const SidebarNav: React.FC = () => {
  const {
    currentUser,
    currentTab,
    setCurrentTab,
    startReading,
    hasCompletedToday
  } = useApp();

  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'today', label: 'Today’s Quiet Time', icon: 'wb_sunny' },
    { id: 'bible', label: 'Bible Reading', icon: 'menu_book' },
    { id: 'reflect', label: 'Reflection Space', icon: 'lightbulb' },
    { id: 'prayer', label: 'Prayer Journal', icon: 'favorite' },
    { id: 'journal', label: 'Quiet Time Journal', icon: 'history_edu' },
    { id: 'friends', label: 'Circle', icon: 'groups' },
    { id: 'profile', label: 'Settings', icon: 'settings' }
  ];

  const streak = currentUser?.currentStreak || 5;

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 fixed inset-y-0 left-0 bg-[#FFFDF8] border-r border-[#E6DCCB] z-30 font-sans shadow-xs">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#E6DCCB]/80 flex items-center justify-between">
        <button
          onClick={() => setCurrentTab('today')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#F7F1E5] flex items-center justify-center p-1 border border-[#E6DCCB] shadow-2xs group-hover:scale-105 transition-transform">
            <FaithSyncLogo variant="icon" className="w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl text-[#6B4F2A] tracking-tight leading-none">
              Faith Sync
            </span>
            <span className="text-[10px] text-[#A67C52] font-semibold mt-1 uppercase tracking-wider">
              Daily Quiet Time
            </span>
          </div>
        </button>
      </div>

      {/* Quick Quiet Time CTA Button */}
      <div className="px-5 pt-5 pb-2">
        <button
          onClick={() => startReading()}
          className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] ${
            hasCompletedToday
              ? 'bg-[#66805C]/15 text-[#66805C] border border-[#66805C]/30 hover:bg-[#66805C]/20'
              : 'bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] shadow-[#6B4F2A]/20'
          }`}
          type="button"
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={hasCompletedToday ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            {hasCompletedToday ? 'check_circle' : 'auto_stories'}
          </span>
          <span>{hasCompletedToday ? 'Quiet Time Finished ✓' : 'Start Today’s Quiet Time'}</span>
        </button>
      </div>

      {/* Primary Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map(item => {
          const isActive =
            currentTab === item.id ||
            (item.id === 'today' && currentTab === 'home') ||
            (item.id === 'journal' && currentTab === 'calendar');

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                isActive
                  ? 'bg-[#F7F1E5] text-[#6B4F2A] shadow-2xs border border-[#E6DCCB]'
                  : 'text-[#766F67] hover:bg-[#F7F1E5]/60 hover:text-[#2D2924]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={
                    isActive
                      ? { fontVariationSettings: "'FILL' 1", color: '#6B4F2A' }
                      : undefined
                  }
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* User Profile Footer Card */}
      <div className="p-4 border-t border-[#E6DCCB] bg-[#FFFDF8]">
        <div
          onClick={() => setCurrentTab('profile')}
          className="p-2.5 rounded-xl bg-[#F7F1E5] border border-[#E6DCCB] flex items-center justify-between cursor-pointer hover:border-[#6B4F2A] transition-colors"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#6B4F2A] text-[#FFFDF8] flex items-center justify-center font-bold text-xs shrink-0">
              {currentUser?.firstName?.[0] || 'A'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#2D2924] truncate">
                {currentUser?.firstName} {currentUser?.lastName}
              </span>
              <span className="text-[10px] text-[#766F67] truncate">
                Quiet Time Habit
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[#66805C] bg-[#FFFDF8] px-2 py-1 rounded-full border border-[#E6DCCB] text-[10px] font-bold shrink-0">
            <span
              className="material-symbols-outlined text-[13px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span>{streak}d</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
