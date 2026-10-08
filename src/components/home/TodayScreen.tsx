import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Calendar,
  Clock,
  Flame,
  CheckCircle2,
  Heart,
  ChevronRight,
  Edit3,
  Compass,
  ArrowRight,
  Check,
  ShieldCheck,
  Play,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TodayScreen: React.FC = () => {
  const {
    currentUser,
    todayPassageDay,
    activePlan,
    startReading,
    resumeQuietTime,
    clearActiveSession,
    activeSession,
    setCurrentTab,
    hasCompletedToday,
    completions,
    prayers
  } = useApp();

  const [copiedVerse, setCopiedVerse] = useState(false);

  const userName = currentUser?.firstName || currentUser?.displayName || 'Friend';
  const streak = currentUser?.currentStreak || 5;
  const totalCompleted = currentUser?.totalCompletedDays || 24;

  const todayDateString = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  const handleCopyKeyVerse = () => {
    if (todayPassageDay?.passage?.keyVerse) {
      navigator.clipboard?.writeText(todayPassageDay.passage.keyVerse);
      setCopiedVerse(true);
      setTimeout(() => setCopiedVerse(false), 2000);
    }
  };

  // Determine stage mapping for 5 steps
  const stageLabels: Record<string, { num: number; label: string }> = {
    prepare: { num: 1, label: 'Prepare' },
    read: { num: 2, label: 'Read' },
    reflect: { num: 3, label: 'Reflect' },
    pray: { num: 4, label: 'Pray' },
    complete: { num: 5, label: 'Complete' }
  };

  const isSessionInProgress = Boolean(activeSession && !hasCompletedToday);
  const currentStageInfo = activeSession?.currentStage
    ? stageLabels[activeSession.currentStage] || stageLabels.prepare
    : stageLabels.prepare;

  // 7-day rhythm calculation (Mon - Sun)
  const weekDays = [
    { label: 'Mon', completed: true },
    { label: 'Tue', completed: true },
    { label: 'Wed', completed: true },
    { label: 'Thu', completed: true },
    { label: 'Fri', completed: true },
    { label: 'Sat', completed: hasCompletedToday, isToday: true },
    { label: 'Sun', completed: false }
  ];

  // Latest completion for today if available
  const todayCompletion = completions.find(c => c.dayNumber === todayPassageDay.dayNumber);

  return (
    <div className="flex flex-col w-full pb-20 md:pb-12 pt-3 md:pt-6 bg-[#F7F1E5] font-sans">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        
        {/* Top Sacred Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E6DCCB]/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#766F67] mb-1">
              <span>{todayDateString}</span>
              <span>•</span>
              <span className="text-[#66805C] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#66805C] animate-pulse" />
                Quiet Sanctuary
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2D2924] tracking-tight">
              Good day, {userName}
            </h1>
            <p className="font-serif text-base sm:text-lg text-[#6B4F2A] font-semibold mt-0.5">
              “This is your time with God.”
            </p>
            <p className="text-xs sm:text-sm text-[#766F67] mt-0.5 max-w-xl">
              Slow down, listen to His Word, reflect in stillness, and pour out your heart in prayer.
            </p>
          </div>

          {/* Gentle Consistency Pill */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#E6DCCB] text-[#6B4F2A] flex items-center gap-2 shadow-2xs">
              <Flame className="w-4 h-4 text-[#D4A94D] fill-[#D4A94D]" />
              <span className="text-xs font-bold tabular-nums">
                {streak} Day Streak
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* MAIN COLUMN: Today's Quiet Time Session Card (lg: 7/8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            
            {/* HERO CARD: Today's Quiet Time Session */}
            <section className="relative overflow-hidden rounded-3xl bg-[#FFFDF8] p-5 sm:p-7 shadow-[0_4px_24px_-4px_rgba(45,41,36,0.06)] border border-[#E6DCCB] flex flex-col gap-5">
              {/* Warm decorative glow */}
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#D4A94D]/10 blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] text-xs font-semibold">
                  <BookOpen className="w-3.5 h-3.5 text-[#D4A94D]" />
                  <span>{activePlan.title} · Day {todayPassageDay.dayNumber}</span>
                </span>

                {/* Session Status Pill */}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                  hasCompletedToday
                    ? 'bg-[#66805C]/15 text-[#66805C] border-[#66805C]/30'
                    : isSessionInProgress
                    ? 'bg-[#D4A94D]/15 text-[#6B4F2A] border-[#D4A94D]/40'
                    : 'bg-[#F7F1E5] text-[#A67C52] border-[#E6DCCB]'
                }`}>
                  {hasCompletedToday ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Quiet Time Complete</span>
                    </>
                  ) : isSessionInProgress ? (
                    <>
                      <Clock className="w-3.5 h-3.5 text-[#D4A94D]" />
                      <span>In Progress · Step {currentStageInfo.num} ({currentStageInfo.label})</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{todayPassageDay.estimatedMinutes} min quiet session</span>
                    </>
                  )}
                </span>
              </div>

              {/* Title & Scripture */}
              <div className="relative z-10 space-y-1.5">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#A67C52]">
                  Today's Scripture Reading
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2D2924] tracking-tight">
                  {todayPassageDay.scriptureReference}
                </h2>
                <p className="font-serif text-base text-[#6B4F2A] font-semibold">
                  {todayPassageDay.title}
                </p>
              </div>

              {/* 5-Stage Guided Sequence Progress Tracker */}
              <div className="relative z-10 p-4 rounded-2xl bg-[#F7F1E5]/70 border border-[#E6DCCB] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#766F67] uppercase tracking-wide">
                    Quiet Time Sequence (5 Stages)
                  </span>
                  {isSessionInProgress && (
                    <span className="text-[11px] text-[#6B4F2A] font-semibold">
                      Resuming at Step {currentStageInfo.num}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-5 gap-1.5 sm:gap-2 text-center text-xs">
                  {[
                    { num: 1, id: 'prepare', title: 'Prepare' },
                    { num: 2, id: 'read', title: 'Read' },
                    { num: 3, id: 'reflect', title: 'Reflect' },
                    { num: 4, id: 'pray', title: 'Pray' },
                    { num: 5, id: 'complete', title: 'Complete' }
                  ].map(step => {
                    const isCompleted = hasCompletedToday || (isSessionInProgress && currentStageInfo.num > step.num);
                    const isCurrent = isSessionInProgress && currentStageInfo.num === step.num;
                    return (
                      <div
                        key={step.id}
                        className={`p-2 rounded-xl flex flex-col items-center gap-0.5 border transition-all ${
                          isCompleted
                            ? 'bg-[#66805C]/10 border-[#66805C]/30 text-[#66805C]'
                            : isCurrent
                            ? 'bg-[#FFFDF8] border-[#6B4F2A] text-[#6B4F2A] font-bold shadow-2xs'
                            : 'bg-[#FFFDF8]/70 border-[#E6DCCB] text-[#766F67]'
                        }`}
                      >
                        <span className="text-[10px] font-bold opacity-80">
                          {isCompleted ? '✓' : `Step ${step.num}`}
                        </span>
                        <span className="text-[11px] sm:text-xs font-semibold truncate max-w-full">
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Key Verse Excerpt */}
              <div className="relative z-10 p-4 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] border-l-4 border-l-[#D4A94D] shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#A67C52] uppercase tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4A94D]" />
                    Meditation Verse
                  </span>
                  <button
                    onClick={handleCopyKeyVerse}
                    className="text-[11px] text-[#6B4F2A] hover:text-[#D4A94D] font-bold cursor-pointer"
                  >
                    {copiedVerse ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>
                <p className="font-serif text-sm sm:text-base text-[#2D2924] italic leading-relaxed">
                  {todayPassageDay.passage.keyVerse}
                </p>
              </div>

              {/* Primary Action Buttons */}
              <div className="relative z-10 pt-1 flex flex-col sm:flex-row items-center gap-3">
                {isSessionInProgress ? (
                  <>
                    <button
                      onClick={() => resumeQuietTime()}
                      className="w-full sm:flex-1 min-h-[50px] rounded-2xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
                      type="button"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Continue Quiet Time (Step {currentStageInfo.num}: {currentStageInfo.label})</span>
                      <ArrowRight className="w-4 h-4 ml-0.5" />
                    </button>

                    <button
                      onClick={() => {
                        clearActiveSession();
                        startReading();
                      }}
                      className="w-full sm:w-auto min-h-[50px] px-4 rounded-2xl bg-[#FFFDF8] hover:bg-[#F7F1E5] text-[#766F67] hover:text-[#2D2924] border border-[#E6DCCB] text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                      title="Restart from Stage 1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Start Fresh</span>
                    </button>
                  </>
                ) : hasCompletedToday ? (
                  <>
                    <button
                      onClick={() => startReading()}
                      className="w-full sm:flex-1 min-h-[50px] rounded-2xl bg-[#66805C] hover:bg-[#52694a] text-[#FFFDF8] font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
                      type="button"
                    >
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>Review Today’s Quiet Time</span>
                      <ArrowRight className="w-4 h-4 ml-0.5" />
                    </button>

                    <button
                      onClick={() => setCurrentTab('journal')}
                      className="w-full sm:w-auto min-h-[50px] px-5 rounded-2xl bg-[#FFFDF8] hover:bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] text-xs font-bold transition-all text-center"
                    >
                      Open Journal
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startReading()}
                      className="w-full sm:flex-1 min-h-[50px] rounded-2xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
                      type="button"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Start Quiet Time</span>
                      <ArrowRight className="w-4 h-4 ml-0.5" />
                    </button>

                    <button
                      onClick={() => setCurrentTab('bible')}
                      className="w-full sm:w-auto min-h-[50px] px-5 rounded-2xl bg-[#FFFDF8] hover:bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] text-xs font-bold transition-all text-center"
                    >
                      Browse Plans
                    </button>
                  </>
                )}
              </div>
            </section>

            {/* If completed today, show quick review of what was written */}
            {hasCompletedToday && todayCompletion && (
              <section className="p-5 sm:p-6 rounded-3xl bg-[#FFFDF8] border border-[#66805C]/30 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wide text-[#66805C] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Recorded Today in Your Quiet Time
                  </span>
                  <button
                    onClick={() => setCurrentTab('journal')}
                    className="text-xs font-bold text-[#6B4F2A] hover:underline"
                  >
                    View All Entries →
                  </button>
                </div>

                {todayCompletion.reflectionWhatStoodOut && (
                  <div className="p-3.5 rounded-xl bg-[#F7F1E5]/60 border border-[#E6DCCB] text-xs space-y-1">
                    <span className="font-bold text-[#6B4F2A]">What stood out:</span>
                    <p className="text-[#2D2924] leading-relaxed">{todayCompletion.reflectionWhatStoodOut}</p>
                  </div>
                )}

                {todayCompletion.personalPrayer && (
                  <div className="p-3.5 rounded-xl bg-[#F7F1E5]/60 border border-[#E6DCCB] text-xs space-y-1">
                    <span className="font-bold text-[#6B4F2A]">Today's prayer:</span>
                    <p className="text-[#2D2924] italic leading-relaxed">“{todayCompletion.personalPrayer}”</p>
                  </div>
                )}
              </section>
            )}

            {/* Quick Action Navigation Cards strictly for Quiet Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => setCurrentTab('reflect')}
                className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] hover:border-[#6B4F2A] text-left transition-all shadow-2xs group flex flex-col justify-between gap-3 active:scale-[0.99]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Edit3 className="w-5 h-5 text-[#6B4F2A]" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#2D2924] group-hover:text-[#6B4F2A] transition-colors">
                    Reflection Space
                  </h3>
                  <p className="text-[11px] text-[#766F67] mt-0.5">
                    Private prompts on what God is teaching you.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setCurrentTab('prayer')}
                className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] hover:border-[#6B4F2A] text-left transition-all shadow-2xs group flex flex-col justify-between gap-3 active:scale-[0.99]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Heart className="w-5 h-5 text-[#6B4F2A]" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#2D2924] group-hover:text-[#6B4F2A] transition-colors">
                    Prayer Journal
                  </h3>
                  <p className="text-[11px] text-[#766F67] mt-0.5">
                    Personal petitions, answered prayers, and gratitude.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setCurrentTab('journal')}
                className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] hover:border-[#6B4F2A] text-left transition-all shadow-2xs group flex flex-col justify-between gap-3 active:scale-[0.99]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Calendar className="w-5 h-5 text-[#6B4F2A]" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#2D2924] group-hover:text-[#6B4F2A] transition-colors">
                    Quiet Time Journal
                  </h3>
                  <p className="text-[11px] text-[#766F67] mt-0.5">
                    Review past scripture readings, verses, and dates.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* SIDEBAR COLUMN: Subtle Consistency & Rhythm (lg: 5/4 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            
            {/* Subtle Consistency Card */}
            <section className="p-6 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-[#A67C52]">
                  Daily Habit Consistency
                </span>
                <span className="text-xs font-semibold text-[#66805C]">
                  {hasCompletedToday ? 'Completed Today' : 'Pending Today'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-[#F7F1E5]/70 border border-[#E6DCCB]">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-[#D4A94D] fill-[#D4A94D]" />
                    <span className="font-serif text-2xl font-extrabold text-[#2D2924]">
                      {streak}
                    </span>
                  </div>
                  <p className="text-xs text-[#766F67] mt-1 font-medium">
                    Days consistent
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F1E5]/70 border border-[#E6DCCB]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#66805C]" />
                    <span className="font-serif text-2xl font-extrabold text-[#2D2924]">
                      {totalCompleted}
                    </span>
                  </div>
                  <p className="text-xs text-[#766F67] mt-1 font-medium">
                    Sessions finished
                  </p>
                </div>
              </div>

              {/* Weekly Rhythm Indicator */}
              <div className="pt-2 border-t border-[#E6DCCB]/60 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#766F67]">
                  <span className="font-semibold">This Week's Rhythm</span>
                  <span>{hasCompletedToday ? '6 / 7 days' : '5 / 7 days'}</span>
                </div>
                <div className="grid grid-cols-7 gap-1.5 text-center">
                  {weekDays.map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-[#766F67]">{d.label}</span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          d.completed
                            ? 'bg-[#66805C] text-[#FFFDF8]'
                            : d.isToday
                            ? 'bg-[#FFFDF8] border-2 border-[#6B4F2A] text-[#6B4F2A]'
                            : 'bg-[#E6DCCB] text-[#766F67]'
                        }`}
                      >
                        {d.completed ? '✓' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Spiritual Quote / Peaceful Reflection Reminder */}
            <section className="p-6 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs space-y-3">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#A67C52] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A94D]" />
                Word for Your Spirit
              </span>
              <p className="font-serif text-sm text-[#2D2924] italic leading-relaxed">
                “Abide in Me, and I in you. As the branch cannot bear fruit of itself, unless it abides in the vine, neither can you, unless you abide in Me.”
              </p>
              <p className="text-xs text-[#766F67] font-semibold text-right">— John 15:4</p>
            </section>

            {/* Private Sanctuary Promise */}
            <div className="p-4 rounded-2xl bg-[#E6DCCB]/30 border border-[#E6DCCB] flex items-center gap-3 text-xs text-[#766F67]">
              <ShieldCheck className="w-5 h-5 text-[#66805C] shrink-0" />
              <span>
                FaithSync is your private time with God. No social feeds, no public profiles, no noise.
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
