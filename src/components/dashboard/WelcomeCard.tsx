import React from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';

export const WelcomeCard: React.FC = () => {
  const { currentUser, hasCompletedToday } = useApp();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = currentUser?.displayName || currentUser?.firstName || '';
  const greetingText = displayName ? `${getGreeting()}, ${displayName}` : getGreeting();
  const churchName = currentUser?.churchName || 'Grace Community Church';
  const branchName = currentUser?.branch || 'Central Campus';

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] p-5 sm:p-6 lg:p-7 shadow-[0_4px_20px_-4px_rgba(45,41,36,0.04)] transition-all">
      {/* Gentle Warm Ambient Accents */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#F7F1E5] blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 right-24 w-32 h-32 rounded-full bg-[#D4A94D]/10 blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left Side: Avatar & Greeting */}
        <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0">
          <div className="relative shrink-0">
            <Avatar
              src={currentUser?.avatarUrl}
              name={displayName || 'Member'}
              size="lg"
              className="border-2 border-[#E6DCCB] shadow-2xs"
            />
            <span
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-[#FFFDF8] ${
                hasCompletedToday ? 'bg-[#66805C] text-[#FFFDF8]' : 'bg-[#D4A94D] text-[#FFFDF8]'
              }`}
              title={hasCompletedToday ? 'Quiet time completed today' : 'Quiet time awaiting'}
            >
              <span className="material-symbols-outlined text-[10px]">
                {hasCompletedToday ? 'check' : 'spa'}
              </span>
            </span>
          </div>

          <div className="flex flex-col min-w-0">
            {/* Church branch tag */}
            <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-[#A67C52] font-semibold uppercase tracking-wider font-sans mb-1">
              <span className="material-symbols-outlined text-[14px] text-[#D4A94D]">church</span>
              <span className="truncate">{churchName}</span>
              <span>•</span>
              <span className="text-[#766F67]">{branchName}</span>
              {currentUser?.ministry && (
                <>
                  <span>•</span>
                  <span className="text-[#6B4F2A] font-bold">{currentUser.ministry}</span>
                </>
              )}
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2D2924] tracking-tight leading-snug truncate">
              {greetingText}
            </h1>

            <p className="text-xs sm:text-sm text-[#766F67] font-sans mt-1 leading-relaxed">
              Stay connected with your church community and keep growing together.
            </p>
          </div>
        </div>

        {/* Right Side: Quick Rhythm & Today Status Pill */}
        <div className="flex items-center gap-2 sm:self-center shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E6DCCB]/60 justify-between sm:justify-end">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F7F1E5] border border-[#E6DCCB] text-[#6B4F2A] text-xs font-bold font-sans shadow-2xs">
            <span
              className="material-symbols-outlined text-[17px] text-[#D4A94D]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span>{currentUser?.currentStreak || 6}d Streak</span>
          </div>

          <div
            className={`px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 font-sans ${
              hasCompletedToday
                ? 'bg-[#66805C]/15 text-[#66805C] border-[#66805C]/30'
                : 'bg-[#FFFDF8] text-[#A67C52] border-[#E6DCCB]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[15px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {hasCompletedToday ? 'check_circle' : 'hourglass_top'}
            </span>
            <span className="text-[11px] sm:text-xs">
              {hasCompletedToday ? 'Quiet Time Done' : 'Devotional Awaiting'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
