import React, { lazy, Suspense, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopAppBar } from './components/navigation/TopAppBar';
import { SidebarNav } from './components/navigation/SidebarNav';
import { BottomNavBar } from './components/navigation/BottomNavBar';
import { AuthFlow } from './components/auth/AuthFlow';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { CompletionModal } from './components/reading/CompletionModal';

const TodayScreen = lazy(() => import('./components/home/TodayScreen').then(module => ({ default: module.TodayScreen })));
const BibleScreen = lazy(() => import('./components/bible/BibleScreen').then(module => ({ default: module.BibleScreen })));
const ReflectScreen = lazy(() => import('./components/reflection/ReflectScreen').then(module => ({ default: module.ReflectScreen })));
const PrayerScreen = lazy(() => import('./components/prayer/PrayerScreen').then(module => ({ default: module.PrayerScreen })));
const CalendarScreen = lazy(() => import('./components/calendar/CalendarScreen').then(module => ({ default: module.CalendarScreen })));
const ProfileScreen = lazy(() => import('./components/profile/ProfileScreen').then(module => ({ default: module.ProfileScreen })));
const ReadingScreen = lazy(() => import('./components/reading/ReadingScreen').then(module => ({ default: module.ReadingScreen })));
const FriendsScreen = lazy(() => import('./components/friends/FriendsScreen').then(module => ({ default: module.FriendsScreen })));

const AppContent: React.FC = () => {
  const {
    currentUser,
    authStatus,
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

  if (authStatus === 'loading') {
    return <div className="min-h-screen bg-[#F7F1E5] flex items-center justify-center text-[#6B4F2A]" role="status">Loading FaithSync…</div>;
  }

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
        <Suspense fallback={<div className="flex-1 p-6 text-sm text-[#766F67]" role="status">Loading your space…</div>}>
          <main className="flex-1 w-full pt-16 md:pt-0">
            {(currentTab === 'today' || currentTab === 'home') && <TodayScreen />}
            {currentTab === 'bible' && <BibleScreen />}
            {currentTab === 'reflect' && <ReflectScreen />}
            {currentTab === 'prayer' && <PrayerScreen />}
            {(currentTab === 'journal' || currentTab === 'calendar') && <CalendarScreen />}
            {currentTab === 'friends' && <FriendsScreen />}
            {currentTab === 'profile' && <ProfileScreen />}
          </main>
        </Suspense>
      </div>

      {/* Mobile-Only Bottom Navigation */}
      <BottomNavBar />

      {/* Overlays / Flow Sheets */}
      {isReadingActive && (
        <Suspense fallback={null}>
          <ReadingScreen />
        </Suspense>
      )}
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
