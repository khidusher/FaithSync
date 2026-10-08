import React, { useState } from 'react';
import { WelcomeCard } from './WelcomeCard';
import { QuickActions } from './QuickActions';
import { AnnouncementPreview } from './AnnouncementPreview';
import { UpcomingEvents } from './UpcomingEvents';
import { CommunitySnapshot } from './CommunitySnapshot';
import { SpiritualReflection } from './SpiritualReflection';
import { RecentActivity } from './RecentActivity';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ErrorState } from './ErrorState';
import {
  SAMPLE_ANNOUNCEMENTS,
  SAMPLE_EVENTS,
  SAMPLE_COMMUNITY_SNAPSHOT,
  SAMPLE_DAILY_REFLECTION,
  SAMPLE_RECENT_ACTIVITIES
} from '../../data/dashboardData';

export const DashboardScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (hasError) {
    return (
      <div className="flex flex-col w-full pb-20 md:pb-12 pt-6 bg-[#F7F1E5]">
        <div className="w-full max-w-md md:max-w-xl mx-auto px-4">
          <ErrorState onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-20 md:pb-12 pt-3 md:pt-6 bg-[#F7F1E5]">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-5 sm:gap-6 lg:gap-8 font-sans">
        
        {/* 1. WELCOME CARD (Header of dashboard) */}
        <WelcomeCard />

        {/* 2. QUICK ACTIONS GRID */}
        <QuickActions onScrollToSection={handleScrollToSection} />

        {/* 3. RESPONSIVE DASHBOARD LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
          
          {/* MAIN / CENTER COLUMN (lg: 7 cols, xl: 8 cols) */}
          {/* In mobile, this flows in the priority order: Announcements, Events, Activity */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6 lg:gap-8">
            
            {/* Church Announcements */}
            <AnnouncementPreview announcements={SAMPLE_ANNOUNCEMENTS} />

            {/* Upcoming Church Events */}
            <UpcomingEvents events={SAMPLE_EVENTS} />

            {/* Recent Church & Community Activity (Timeline) */}
            <RecentActivity activities={SAMPLE_RECENT_ACTIVITIES} />
          </div>

          {/* SUPPORTING / RIGHT COLUMN (lg: 5 cols, xl: 4 cols) */}
          {/* In mobile, this appears smoothly below the main previews */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 lg:gap-8">
            
            {/* Today's Spiritual Reflection */}
            <SpiritualReflection content={SAMPLE_DAILY_REFLECTION} />

            {/* Community Snapshot */}
            <CommunitySnapshot data={SAMPLE_COMMUNITY_SNAPSHOT} />

            {/* Quiet Habit Banner */}
            <section className="p-5 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] border-l-4 border-l-[#66805C] shadow-2xs flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#66805C]">
                <span className="material-symbols-outlined text-[18px]">spa</span>
                <span>Grace Over Guilt</span>
              </div>
              <p className="font-serif text-xs text-[#2D2924] italic leading-relaxed">
                “Consistency in faith is about returning daily to His peace, not earning His love through perfection.”
              </p>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
};
