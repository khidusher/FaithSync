import React from 'react';
import { useApp } from '../../context/AppContext';
import { FaithSyncLogo } from '../common/FaithSyncLogo';

export const TopAppBar: React.FC = () => {
  const {
    currentUser,
    currentTab,
    setCurrentTab,
    hasCompletedToday
  } = useApp();

  const getTabTitle = () => {
    switch (currentTab) {
      case 'today':
      case 'home':
        return 'Today’s Quiet Time';
      case 'bible':
        return 'Scripture Reading';
      case 'reflect':
        return 'Reflection Space';
      case 'prayer':
        return 'Personal Prayer Journal';
      case 'journal':
      case 'calendar':
        return 'Quiet Time Journal';
      case 'friends':
        return 'Your Circle';
      case 'profile':
        return 'Settings';
      default:
        return 'Today’s Quiet Time';
    }
  };

  const streak = currentUser?.currentStreak || 5;

  const todayDateString = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <>
      {/* MOBILE TOP BAR (below 768px) */}
      <header className="md:hidden fixed top-0 w-full z-30 pt-safe bg-[#F7F1E5]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(45,41,36,0.04)] border-b border-[#E6DCCB] transition-colors">
        <div className="h-16 px-4 max-w-md mx-auto flex items-center justify-between">
          {/* Brand & View title */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentTab('today')}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-[#FFFDF8] flex items-center justify-center p-0.5 shadow-2xs border border-[#E6DCCB]">
                <FaithSyncLogo variant="icon" className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-base text-[#6B4F2A] leading-none tracking-tight">
                  Faith Sync
                </span>
                <span className="text-[9px] text-[#A67C52] mt-0.5 leading-none">
                  Daily Quiet Time
                </span>
              </div>
            </button>
            <span className="text-xs font-bold text-[#2D2924] ml-1.5 border-l border-[#E6DCCB] pl-2.5 truncate max-w-[130px]">
              {getTabTitle()}
            </span>
          </div>

          {/* Right Action: Today status & Avatar */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[#66805C] bg-[#FFFDF8] px-2.5 py-1 rounded-full border border-[#E6DCCB] text-[11px] font-bold">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <span>{streak}d</span>
            </div>

            <button
              onClick={() => setCurrentTab('profile')}
              aria-label="Settings and Profile"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95 transition-transform"
              type="button"
            >
              <div className="w-8 h-8 rounded-full bg-[#6B4F2A] text-[#FFFDF8] flex items-center justify-center text-xs font-bold border border-[#E6DCCB] shadow-2xs">
                {currentUser?.firstName?.[0] || 'A'}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* DESKTOP TOP BAR (768px and above) */}
      <header className="hidden md:flex sticky top-0 w-full z-20 bg-[#F7F1E5]/90 backdrop-blur-md border-b border-[#E6DCCB] px-6 lg:px-8 py-3.5 transition-colors font-sans">
        <div className="w-full max-w-6xl xl:max-w-7xl mx-auto flex items-center justify-between">
          {/* Breadcrumb & Section title */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xs text-[#766F67] font-medium">
                <span>{todayDateString}</span>
                <span>•</span>
                <span className="text-[#66805C] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">wb_sunny</span>
                  Personal Quiet Time
                </span>
              </div>
              <h1 className="font-serif text-xl lg:text-2xl font-bold text-[#2D2924] tracking-tight">
                {getTabTitle()}
              </h1>
            </div>
          </div>

          {/* Quick status & Actions */}
          <div className="flex items-center gap-3">
            {/* Today status badge */}
            <div className={`px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 ${
              hasCompletedToday
                ? 'bg-[#66805C]/15 text-[#66805C] border-[#66805C]/30'
                : 'bg-[#FFFDF8] text-[#A67C52] border-[#E6DCCB]'
            }`}>
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {hasCompletedToday ? 'check_circle' : 'hourglass_top'}
              </span>
              <span>{hasCompletedToday ? 'Quiet Time Complete ✓' : 'Awaiting Today’s Time'}</span>
            </div>

            {/* Streak Indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFDF8] border border-[#E6DCCB] text-[#6B4F2A] text-xs font-bold shadow-2xs">
              <span
                className="material-symbols-outlined text-[17px] text-[#D4A94D]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <span>{streak} Days</span>
            </div>

            {/* Profile Avatar Quick Link */}
            <button
              onClick={() => setCurrentTab('profile')}
              className="flex items-center gap-2 p-1.5 pl-2 pr-3 rounded-xl bg-[#FFFDF8] border border-[#E6DCCB] hover:border-[#6B4F2A] transition-all shadow-2xs"
              type="button"
            >
              <div className="w-7 h-7 rounded-full bg-[#6B4F2A] text-[#FFFDF8] flex items-center justify-center text-xs font-bold border border-[#E6DCCB]">
                {currentUser?.firstName?.[0] || 'A'}
              </div>
              <span className="text-xs font-bold text-[#2D2924] max-w-[100px] truncate">
                {currentUser?.firstName || 'Friend'}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
