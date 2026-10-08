import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopAppBar } from './components/navigation/TopAppBar';
import { SidebarNav } from './components/navigation/SidebarNav';
import { BottomNavBar } from './components/navigation/BottomNavBar';
import { AuthFlow } from './components/auth/AuthFlow';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { TodayScreen } from './components/home/TodayScreen';
import { BibleScreen } from './components/bible/BibleScreen';
import { ReflectScreen } from './components/reflection/ReflectScreen';
import { PrayerScreen } from './components/prayer/PrayerScreen';
import { CalendarScreen } from './components/calendar/CalendarScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { ReadingScreen } from './components/reading/ReadingScreen';
import { CompletionModal } from './components/reading/CompletionModal';

const AppContent: React.FC = () => {
  const {
    currentUser,
    currentTab,
    isReadingActive,
    userSettings
  } = useApp();

  // Apply dark mode class to document element on load if needed
  useEffect(() => {
    if (userSettings?.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [userSettings?.theme]);

  // If no user is authenticated, render the splash/auth experience
  if (!currentUser) {
    return <AuthFlow />;
  }

  return (
    <div className="min-h-screen bg-[#F7F1E5] text-[#2D2924] flex font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#D4A94D]/25 selection:text-[#2D2924]">
      {/* Desktop Persistent Sidebar (md and above) */}
      <SidebarNav />

      {/* Main Content Area (offset on md and lg screens) */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64 lg:pl-72 transition-all">
        {/* Top Application Bar (Mobile fixed + Desktop sticky header) */}
        <TopAppBar />

        {/* Main Viewport Content */}
        <main className="flex-1 w-full pt-16 md:pt-0">
          {(currentTab === 'today' || currentTab === 'home') && <TodayScreen />}
          {currentTab === 'bible' && <BibleScreen />}
          {currentTab === 'reflect' && <ReflectScreen />}
          {currentTab === 'prayer' && <PrayerScreen />}
          {(currentTab === 'journal' || currentTab === 'calendar') && <CalendarScreen />}
          {currentTab === 'profile' && <ProfileScreen />}
        </main>
      </div>

      {/* Mobile-Only Bottom Navigation */}
      <BottomNavBar />

      {/* Overlays / Flow Sheets */}
      {isReadingActive && <ReadingScreen />}
      <CompletionModal />
      <OnboardingModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
