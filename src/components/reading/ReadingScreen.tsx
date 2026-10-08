import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Type,
  Sparkles,
  Heart,
  ChevronRight,
  Wind,
  BookOpen,
  Edit3,
  Check,
  Clock,
  Compass,
  ShieldCheck,
  Save,
  Flame,
  Calendar,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { QuietTimeStage, ScriptureTextSize } from '../../types';

export const ReadingScreen: React.FC = () => {
  const {
    currentUser,
    activeReadingDay,
    activePlan,
    closeReading,
    markReadingComplete,
    addPrayer,
    activeSession,
    saveActiveSession,
    setCurrentTab,
    userSettings,
    updateSettings
  } = useApp();

  // If activeSession exists for today, restore; otherwise default to 'prepare'
  const [currentStep, setCurrentStep] = useState<QuietTimeStage>(() => {
    return activeSession?.currentStage || 'prepare';
  });

  const [fontSize, setFontSize] = useState<ScriptureTextSize>(() => {
    return userSettings.scriptureTextSize || 'medium';
  });
  const [highlightedVerses, setHighlightedVerses] = useState<number[]>(() => {
    return activeSession?.highlightedVerses || [];
  });

  // Reflection 3 prompt fields
  const [whatStoodOut, setWhatStoodOut] = useState(() => {
    return activeSession?.reflectionWhatStoodOut || '';
  });
  const [godTeaching, setGodTeaching] = useState(() => {
    return activeSession?.reflectionGodTeaching || '';
  });
  const [application, setApplication] = useState(() => {
    return activeSession?.reflectionApplication || '';
  });

  // Prayer state
  const [personalPrayer, setPersonalPrayer] = useState(() => {
    return activeSession?.personalPrayer || '';
  });
  const [saveToPrayerJournal, setSaveToPrayerJournal] = useState<boolean>(() => {
    return activeSession?.saveToPrayerJournal ?? true;
  });

  // Autosave status indicator
  const [lastSavedTime, setLastSavedTime] = useState<string>('Saved');
  const [isSaving, setIsSaving] = useState(false);

  // Stillness breathing animation
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [isBreathingActive, setIsBreathingActive] = useState(true);

  // Completed session metrics
  const [completedMetrics, setCompletedMetrics] = useState<{
    durationMinutes: number;
    scriptureReference: string;
    keyVerse: string;
    streak: number;
    totalDays: number;
  } | null>(null);

  const contentScrollRef = useRef<HTMLDivElement>(null);

  // Calculate session elapsed time
  const sessionStartTime = useRef<number>(
    activeSession?.startTime ? new Date(activeSession.startTime).getTime() : Date.now()
  );

  // Sync state if activeSession changes externally
  useEffect(() => {
    if (activeSession) {
      if (activeSession.currentStage && activeSession.currentStage !== currentStep) {
        setCurrentStep(activeSession.currentStage);
      }
      if (activeSession.reflectionWhatStoodOut !== undefined && activeSession.reflectionWhatStoodOut !== whatStoodOut) {
        setWhatStoodOut(activeSession.reflectionWhatStoodOut);
      }
      if (activeSession.reflectionGodTeaching !== undefined && activeSession.reflectionGodTeaching !== godTeaching) {
        setGodTeaching(activeSession.reflectionGodTeaching);
      }
      if (activeSession.reflectionApplication !== undefined && activeSession.reflectionApplication !== application) {
        setApplication(activeSession.reflectionApplication);
      }
      if (activeSession.personalPrayer !== undefined && activeSession.personalPrayer !== personalPrayer) {
        setPersonalPrayer(activeSession.personalPrayer);
      }
      if (activeSession.highlightedVerses) {
        setHighlightedVerses(activeSession.highlightedVerses);
      }
    }
  }, [activeSession?.dayNumber]);

  // Breathing loop for Prepare stage
  useEffect(() => {
    if (currentStep !== 'prepare' || !isBreathingActive) return;
    const interval = setInterval(() => {
      setBreathPhase(prev => {
        if (prev === 'Inhale') return 'Hold';
        if (prev === 'Hold') return 'Exhale';
        return 'Inhale';
      });
    }, 3200);
    return () => clearInterval(interval);
  }, [currentStep, isBreathingActive]);

  // Autosave helper
  const triggerAutosave = (updates: Parameters<typeof saveActiveSession>[0]) => {
    setIsSaving(true);
    saveActiveSession(updates);
    setTimeout(() => {
      setIsSaving(false);
      setLastSavedTime('Autosaved');
    }, 400);
  };

  const handleStepTransition = (nextStep: QuietTimeStage) => {
    setCurrentStep(nextStep);
    triggerAutosave({
      currentStage: nextStep,
      reflectionWhatStoodOut: whatStoodOut,
      reflectionGodTeaching: godTeaching,
      reflectionApplication: application,
      personalPrayer,
      highlightedVerses,
      saveToPrayerJournal
    });
    // Scroll back to top on stage switch
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!activeReadingDay) return null;

  const { passage, title, estimatedMinutes, scriptureReference, dayNumber } = activeReadingDay;

  const toggleHighlight = (verseNum: number) => {
    const updated = highlightedVerses.includes(verseNum)
      ? highlightedVerses.filter(v => v !== verseNum)
      : [...highlightedVerses, verseNum];
    setHighlightedVerses(updated);
    triggerAutosave({ highlightedVerses: updated });
  };

  // Stage 5 Completion handler
  const handleCompleteSession = () => {
    const elapsedMinutes = Math.max(
      1,
      Math.round((Date.now() - sessionStartTime.current) / 60000)
    );

    // Save prayer if desired
    if (personalPrayer.trim() && saveToPrayerJournal) {
      addPrayer({
        title: `Quiet Time Prayer · ${scriptureReference}`,
        body: personalPrayer.trim(),
        category: 'Petition',
        isAnswered: false,
        linkedScripture: scriptureReference
      });
    }

    const currentStreak = currentUser?.currentStreak || 5;
    const totalDays = (currentUser?.totalCompletedDays || 24) + 1;

    setCompletedMetrics({
      durationMinutes: elapsedMinutes,
      scriptureReference,
      keyVerse: passage.keyVerse,
      streak: currentStreak + 1,
      totalDays
    });

    // Mark completion in storage & state, but keep this screen open for Stage 5
    markReadingComplete({
      notes: [whatStoodOut, godTeaching, application].filter(Boolean).join('\n\n'),
      reflection: whatStoodOut,
      highlightedVerses,
      reflectionWhatStoodOut: whatStoodOut,
      reflectionGodTeaching: godTeaching,
      reflectionApplication: application,
      personalPrayer: personalPrayer.trim(),
      keyVerse: passage.keyVerse,
      durationMinutes: elapsedMinutes,
      keepReadingScreenOpen: true
    });

    setCurrentStep('complete');
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const stepsList: { id: QuietTimeStage; label: string; number: number }[] = [
    { id: 'prepare', label: 'Prepare', number: 1 },
    { id: 'read', label: 'Read', number: 2 },
    { id: 'reflect', label: 'Reflect', number: 3 },
    { id: 'pray', label: 'Pray', number: 4 },
    { id: 'complete', label: 'Complete', number: 5 }
  ];

  const currentStepIndex = stepsList.findIndex(s => s.id === currentStep);

  const fontClass =
    fontSize === 'small'
      ? 'text-sm sm:text-base leading-relaxed'
      : fontSize === 'medium'
      ? 'text-base sm:text-lg leading-relaxed'
      : fontSize === 'xlarge'
      ? 'text-xl sm:text-2xl leading-[40px] sm:leading-[44px]'
      : 'text-lg sm:text-xl leading-[34px] sm:leading-[38px]';

  const fontFamilyClass = userSettings?.readingFont === 'sans' ? 'font-sans' : 'font-serif';

  const cycleFontSize = () => {
    const sequence: ScriptureTextSize[] = ['small', 'medium', 'large', 'xlarge'];
    const currentIdx = sequence.indexOf(fontSize);
    const nextSize = sequence[(currentIdx + 1) % sequence.length];
    setFontSize(nextSize);
    updateSettings({ scriptureTextSize: nextSize });
  };

  const fontSizeLabel =
    fontSize === 'small'
      ? 'A (Small)'
      : fontSize === 'medium'
      ? 'A+ (Med)'
      : fontSize === 'large'
      ? 'A++ (Lg)'
      : 'A+++ (XL)';

  return (
    <div className="fixed inset-0 z-50 bg-[#F7F1E5] text-[#2D2924] flex flex-col overflow-hidden font-sans">
      {/* Top Header with Journey Progression */}
      <header className="sticky top-0 z-20 bg-[#F7F1E5]/95 backdrop-blur-md border-b border-[#E6DCCB] px-4 sm:px-6 h-16 flex items-center">
        <div className="max-w-3xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={closeReading}
              className="min-h-[44px] min-w-[44px] -ml-2 flex items-center justify-center rounded-full hover:bg-[#E6DCCB]/50 text-[#2D2924] active:scale-95 transition-colors"
              aria-label="Back to dashboard"
              title="Close Quiet Time (Your progress is saved)"
            >
              <ArrowLeft className="w-5 h-5 text-[#6B4F2A]" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm sm:text-base font-bold text-[#2D2924] truncate max-w-[170px] sm:max-w-xs">
                  {scriptureReference}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#E6DCCB]/60 text-[#6B4F2A] font-semibold">
                  Step {currentStepIndex + 1} of 5
                </span>
              </div>
              <p className="text-[11px] text-[#766F67]">
                {activePlan.title} · Day {dayNumber}
              </p>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2">
            {/* Font size adjustment in Read stage */}
            {currentStep === 'read' && (
              <button
                onClick={cycleFontSize}
                className="min-h-[44px] px-2.5 flex items-center justify-center rounded-xl text-[#6B4F2A] hover:bg-[#E6DCCB]/50 transition-colors border border-[#E6DCCB]/80 bg-[#FFFDF8]"
                title="Adjust Scripture font size"
              >
                <Type className="w-3.5 h-3.5 mr-1" />
                <span className="text-[11px] font-bold">
                  {fontSizeLabel}
                </span>
              </button>
            )}

            {/* Autosave badge */}
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#766F67] px-2 py-1 rounded-lg bg-[#FFFDF8] border border-[#E6DCCB]">
              <Save className={`w-3 h-3 ${isSaving ? 'text-[#D4A94D] animate-spin' : 'text-[#66805C]'}`} />
              <span>{isSaving ? 'Saving...' : lastSavedTime}</span>
            </div>

            <button
              onClick={closeReading}
              className="text-xs font-semibold text-[#766F67] hover:text-[#2D2924] px-2.5 py-1.5 rounded-lg hover:bg-[#E6DCCB]/40 transition-colors"
            >
              Exit
            </button>
          </div>
        </div>
      </header>

      {/* 5-Stage Guided Sequence Progress Bar */}
      <div className="bg-[#FFFDF8] border-b border-[#E6DCCB] px-4 py-2.5 shadow-2xs">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-xs font-medium">
          {stepsList.map((stepItem, index) => {
            const isCompleted = currentStepIndex > index;
            const isCurrent = currentStep === stepItem.id;
            return (
              <button
                key={stepItem.id}
                onClick={() => handleStepTransition(stepItem.id)}
                className={`flex items-center gap-1.5 transition-colors focus:outline-none ${
                  isCurrent
                    ? 'text-[#6B4F2A] font-bold'
                    : isCompleted
                    ? 'text-[#66805C]'
                    : 'text-[#766F67]/70'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    isCurrent
                      ? 'bg-[#6B4F2A] text-[#FFFDF8] shadow-xs'
                      : isCompleted
                      ? 'bg-[#66805C] text-[#FFFDF8]'
                      : 'bg-[#E6DCCB] text-[#766F67]'
                  }`}
                >
                  {isCompleted ? '✓' : stepItem.number}
                </span>
                <span className="hidden sm:inline text-xs">{stepItem.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main
        ref={contentScrollRef}
        className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 md:py-8 max-w-2xl lg:max-w-3xl mx-auto w-full"
      >
        {/* ========================================================
            STAGE 1: PREPARE
           ======================================================== */}
        {currentStep === 'prepare' && (
          <div className="flex flex-col items-center text-center space-y-6 max-w-lg mx-auto py-3">
            <div className="w-16 h-16 rounded-full bg-[#FFFDF8] border border-[#E6DCCB] flex items-center justify-center text-[#6B4F2A] shadow-xs">
              <Compass className="w-8 h-8 stroke-[1.8]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-[#A67C52]">
                Stage 1 of 5 · Prepare
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2D2924]">
                Slow Down &amp; Become Still
              </h2>
              <p className="font-serif text-base text-[#6B4F2A] italic">
                “Be still, and know that I am God.”
              </p>
              <p className="text-xs text-[#766F67]">Psalm 46:10</p>
            </div>

            {/* Preparation Check / Encouragements */}
            <div className="w-full bg-[#FFFDF8] rounded-2xl border border-[#E6DCCB] p-5 text-left space-y-3 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#766F67]">
                Intentional Focus
              </span>
              <ul className="space-y-2.5 text-xs text-[#2D2924]">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#66805C]/15 text-[#66805C] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span><strong>Put away distractions:</strong> Silence phone notifications and close other browser tabs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#66805C]/15 text-[#66805C] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span><strong>Become still:</strong> Release anxiety, unfinished to-do lists, and hurried thoughts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#66805C]/15 text-[#66805C] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span><strong>Focus on God:</strong> Invite the Holy Spirit to teach you through Scripture today.</span>
                </li>
              </ul>
            </div>

            {/* Gentle Breathing Circle Guide */}
            <div className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs w-full flex flex-col items-center gap-3">
              <div className="relative flex items-center justify-center w-24 h-24">
                <div
                  className={`absolute inset-0 rounded-full bg-[#D4A94D]/15 border-2 border-[#D4A94D] transition-transform duration-1000 ${
                    breathPhase === 'Inhale'
                      ? 'scale-110'
                      : breathPhase === 'Hold'
                      ? 'scale-105'
                      : 'scale-90'
                  }`}
                />
                <div className="flex flex-col items-center z-10">
                  <Wind className="w-5 h-5 text-[#6B4F2A] mb-0.5" />
                  <span className="text-xs font-bold text-[#6B4F2A]">{breathPhase}</span>
                </div>
              </div>
              <p className="text-xs text-[#766F67] max-w-xs leading-relaxed">
                Take three slow, gentle breaths to center your heart before opening the Word.
              </p>
            </div>

            {/* Scripture Target Preview */}
            <div className="p-4 rounded-2xl bg-[#E6DCCB]/30 border border-[#E6DCCB] w-full flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5 text-left">
                <BookOpen className="w-4 h-4 text-[#6B4F2A]" />
                <div>
                  <p className="font-bold text-[#2D2924]">{scriptureReference}</p>
                  <p className="text-[11px] text-[#766F67]">{title}</p>
                </div>
              </div>
              <span className="text-[#66805C] font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {estimatedMinutes} min
              </span>
            </div>

            {/* Clear Primary Action */}
            <button
              onClick={() => handleStepTransition('read')}
              className="w-full min-h-[50px] rounded-2xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
            >
              <span>Begin Reading</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ========================================================
            STAGE 2: READ (Distraction-Free Scripture Reading)
           ======================================================== */}
        {currentStep === 'read' && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="pb-3 border-b border-[#E6DCCB]">
              <div className="flex items-center justify-between text-xs text-[#766F67] mb-1">
                <span className="font-semibold text-[#A67C52] uppercase tracking-wide">
                  Stage 2 of 5 · Scripture Reading
                </span>
                <span className="text-[#66805C] font-bold px-2 py-0.5 rounded-full bg-[#66805C]/10 border border-[#66805C]/20">
                  {passage.translation}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2D2924]">
                {passage.book} {passage.chapter}:{passage.startVerse}–{passage.endVerse}
              </h2>
              <p className="font-serif text-sm text-[#6B4F2A] font-semibold mt-0.5">
                {title}
              </p>
            </div>

            {/* Key Verse Highlight */}
            <div className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] border-l-4 border-l-[#D4A94D] shadow-2xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#A67C52]">
                <Sparkles className="w-4 h-4 text-[#D4A94D]" />
                <span>Meditation Verse</span>
              </div>
              <p className="font-serif text-base sm:text-lg font-semibold text-[#2D2924] italic leading-relaxed">
                {passage.keyVerse}
              </p>
            </div>

            {/* Verses reader */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#766F67] pb-1">
                <span>Passage Text</span>
                <span className="text-[11px] text-[#A67C52]">Tap any verse to highlight</span>
              </div>

              <div className={`space-y-3 ${fontClass} ${fontFamilyClass} text-[#2D2924]`}>
                {passage.verses.map(v => {
                  const isHighlighted = highlightedVerses.includes(v.verseNum);
                  return (
                    <p
                      key={v.verseNum}
                      onClick={() => toggleHighlight(v.verseNum)}
                      className={`p-3.5 rounded-xl transition-all cursor-pointer ${
                        isHighlighted
                          ? 'bg-[#D4A94D]/20 text-[#2D2924] border-l-4 border-[#D4A94D] shadow-2xs'
                          : 'hover:bg-[#FFFDF8]/90 bg-[#FFFDF8]/40'
                      }`}
                    >
                      {userSettings?.showVerseNumbers !== false && (
                        <sup className="font-sans font-bold text-xs text-[#6B4F2A] mr-2.5 select-none">
                          {v.verseNum}
                        </sup>
                      )}
                      {v.text}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Context Summary */}
            <div className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] space-y-2 shadow-2xs">
              <h3 className="font-serif text-sm font-bold text-[#2D2924] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#6B4F2A]" />
                <span>Passage Context</span>
              </h3>
              <p className="text-xs text-[#766F67] leading-relaxed">
                {passage.contextSummary}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => handleStepTransition('prepare')}
                className="min-h-[48px] px-5 rounded-2xl text-xs font-bold text-[#766F67] hover:text-[#2D2924] bg-[#FFFDF8] border border-[#E6DCCB] transition-colors"
              >
                Back to Prepare
              </button>
              <button
                onClick={() => handleStepTransition('reflect')}
                className="flex-1 min-h-[48px] rounded-2xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
              >
                <span>Continue to Reflection</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STAGE 3: REFLECT (Private Reflection Prompts)
           ======================================================== */}
        {currentStep === 'reflect' && (
          <div className="space-y-6">
            <div className="pb-3 border-b border-[#E6DCCB]">
              <div className="flex items-center justify-between text-xs text-[#766F67] mb-1">
                <span className="font-semibold text-[#A67C52] uppercase tracking-wide">
                  Stage 3 of 5 · Reflection
                </span>
                <span className="flex items-center gap-1 text-[11px] text-[#66805C] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Private to You
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2D2924]">
                Reflect on Scripture
              </h2>
              <p className="text-xs text-[#766F67] mt-0.5">
                Take your time to write freely. Your reflections autosave continuously.
              </p>
            </div>

            {/* Prompt 1 */}
            <div className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#2D2924]">
                  What stood out to me?
                </h3>
              </div>
              <p className="text-xs text-[#766F67]">
                A verse, phrase, or truth that caught your attention while reading {scriptureReference}.
              </p>
              <textarea
                rows={3}
                value={whatStoodOut}
                onChange={e => {
                  setWhatStoodOut(e.target.value);
                  triggerAutosave({ reflectionWhatStoodOut: e.target.value });
                }}
                placeholder="e.g. In verse 5, 'Apart from me you can do nothing.' This reminds me of how often I rely on my own strength..."
                className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-[#E6DCCB] bg-[#F7F1E5]/40 text-[#2D2924] placeholder:text-[#766F67]/60 focus:outline-none focus:border-[#6B4F2A] focus:bg-[#FFFDF8] transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Prompt 2 */}
            <div className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#2D2924]">
                  What is God teaching me?
                </h3>
              </div>
              <p className="text-xs text-[#766F67]">
                What truth about God's character, grace, or promises does this reveal?
              </p>
              <textarea
                rows={3}
                value={godTeaching}
                onChange={e => {
                  setGodTeaching(e.target.value);
                  triggerAutosave({ reflectionGodTeaching: e.target.value });
                }}
                placeholder="e.g. God is not asking for distant performance, but inviting me into daily abiding and intimacy..."
                className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-[#E6DCCB] bg-[#F7F1E5]/40 text-[#2D2924] placeholder:text-[#766F67]/60 focus:outline-none focus:border-[#6B4F2A] focus:bg-[#FFFDF8] transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Prompt 3 */}
            <div className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#2D2924]">
                  How can I apply this today?
                </h3>
              </div>
              <p className="text-xs text-[#766F67]">
                One concrete action, prayer, or attitude shift for your day.
              </p>
              <textarea
                rows={3}
                value={application}
                onChange={e => {
                  setApplication(e.target.value);
                  triggerAutosave({ reflectionApplication: e.target.value });
                }}
                placeholder="e.g. Pause today before my conversations to ask the Holy Spirit for patience and peace..."
                className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-[#E6DCCB] bg-[#F7F1E5]/40 text-[#2D2924] placeholder:text-[#766F67]/60 focus:outline-none focus:border-[#6B4F2A] focus:bg-[#FFFDF8] transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => handleStepTransition('read')}
                className="min-h-[48px] px-5 rounded-2xl text-xs font-bold text-[#766F67] hover:text-[#2D2924] bg-[#FFFDF8] border border-[#E6DCCB] transition-colors"
              >
                Back to Scripture
              </button>
              <button
                onClick={() => handleStepTransition('pray')}
                className="flex-1 min-h-[48px] rounded-2xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
              >
                <span>Continue to Prayer</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STAGE 4: PRAY (Private Prayer-Writing)
           ======================================================== */}
        {currentStep === 'pray' && (
          <div className="space-y-6">
            <div className="pb-3 border-b border-[#E6DCCB]">
              <div className="flex items-center justify-between text-xs text-[#766F67] mb-1">
                <span className="font-semibold text-[#A67C52] uppercase tracking-wide">
                  Stage 4 of 5 · Prayer
                </span>
                <span className="flex items-center gap-1 text-[11px] text-[#66805C] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Completely Private
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2D2924]">
                Talk with the Father
              </h2>
              <p className="font-serif text-xs sm:text-sm text-[#766F67] italic mt-0.5">
                “Pour out your heart before Him; God is a refuge for us.” — Psalm 62:8
              </p>
            </div>

            {/* Prayer Writing Area */}
            <div className="p-6 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#6B4F2A]" />
                  <h3 className="font-serif text-base font-bold text-[#2D2924]">
                    Today's Prayer
                  </h3>
                </div>
                <span className="text-[11px] text-[#766F67]">
                  {personalPrayer.trim().split(/\s+/).filter(Boolean).length} words
                </span>
              </div>

              <textarea
                rows={7}
                value={personalPrayer}
                onChange={e => {
                  setPersonalPrayer(e.target.value);
                  triggerAutosave({ personalPrayer: e.target.value });
                }}
                placeholder="Lord Jesus, thank You for Your Word today. I surrender my worries and ask for Your grace to abide in You throughout this day..."
                className="w-full text-xs sm:text-sm p-4 rounded-2xl border border-[#E6DCCB] bg-[#F7F1E5]/30 text-[#2D2924] placeholder:text-[#766F67]/60 focus:outline-none focus:border-[#6B4F2A] focus:bg-[#FFFDF8] transition-colors resize-none leading-relaxed"
              />

              {/* Save to Prayer Journal Checkbox */}
              <div className="flex items-center gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="savePrayerCheckbox"
                  checked={saveToPrayerJournal}
                  onChange={e => {
                    setSaveToPrayerJournal(e.target.checked);
                    triggerAutosave({ saveToPrayerJournal: e.target.checked });
                  }}
                  className="rounded text-[#6B4F2A] focus:ring-[#6B4F2A] border-[#E6DCCB] w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor="savePrayerCheckbox"
                  className="text-xs text-[#2D2924] font-medium cursor-pointer"
                >
                  Save this prayer into my personal Prayer Journal
                </label>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => handleStepTransition('reflect')}
                className="min-h-[48px] px-5 rounded-2xl text-xs font-bold text-[#766F67] hover:text-[#2D2924] bg-[#FFFDF8] border border-[#E6DCCB] transition-colors"
              >
                Back to Reflect
              </button>
              <button
                onClick={handleCompleteSession}
                className="flex-1 min-h-[50px] rounded-2xl bg-[#66805C] hover:bg-[#52694a] text-[#FFFDF8] font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
              >
                <Check className="w-5 h-5 stroke-[2.5]" />
                <span>Complete Quiet Time</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STAGE 5: COMPLETE QUIET TIME
           ======================================================== */}
        {currentStep === 'complete' && (
          <div className="flex flex-col items-center text-center space-y-6 max-w-lg mx-auto py-4">
            {/* Encouraging Confirmation Icon */}
            <div className="w-20 h-20 rounded-full bg-[#66805C]/15 text-[#66805C] border-2 border-[#66805C]/30 flex items-center justify-center shadow-md">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>

            {/* Simple confirmation */}
            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-wider font-bold text-[#66805C]">
                Stage 5 of 5 · Finished
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2D2924]">
                Quiet Time complete.
              </h2>
              <p className="font-serif text-sm font-semibold text-[#A67C52] italic max-w-xs leading-relaxed">
                “The Lord bless you and keep you; the Lord make His face shine upon you and be gracious to you.”
              </p>
              <p className="text-[11px] text-[#766F67]">Numbers 6:24–25</p>
            </div>

            {/* Session Summary Card */}
            <div className="p-6 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs w-full text-left space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E6DCCB]">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#766F67] font-semibold">
                    Scripture Read
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#2D2924]">
                    {scriptureReference}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#66805C]/15 text-[#66805C] font-bold text-xs flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{completedMetrics?.durationMinutes || estimatedMinutes} min session</span>
                </span>
              </div>

              {/* Reflections Status */}
              <div className="space-y-1 text-xs">
                <span className="font-bold text-[#6B4F2A] block">Reflections Saved:</span>
                {whatStoodOut || godTeaching || application ? (
                  <p className="text-[#2D2924] bg-[#F7F1E5]/60 p-3 rounded-xl border border-[#E6DCCB] leading-relaxed line-clamp-3">
                    {whatStoodOut || godTeaching || application}
                  </p>
                ) : (
                  <p className="text-[#766F67] italic">Meditation completed quietly.</p>
                )}
              </div>

              {/* Prayer Status */}
              <div className="space-y-1 text-xs pt-1">
                <span className="font-bold text-[#6B4F2A] block">Prayer Status:</span>
                {personalPrayer ? (
                  <p className="text-[#2D2924] bg-[#F7F1E5]/60 p-3 rounded-xl border border-[#E6DCCB] italic leading-relaxed line-clamp-2">
                    “{personalPrayer}”
                  </p>
                ) : (
                  <p className="text-[#766F67] italic">Silent prayer offered to God.</p>
                )}
              </div>

              {/* Updated Consistency / Streak */}
              <div className="pt-2 border-t border-[#E6DCCB] grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-[#F7F1E5]/80 border border-[#E6DCCB]">
                  <div className="flex items-center justify-center gap-1 text-[#D4A94D] font-bold text-base">
                    <Flame className="w-4 h-4 fill-[#D4A94D]" />
                    <span>{currentUser?.currentStreak || 6} Days</span>
                  </div>
                  <span className="text-[11px] text-[#766F67]">Current Streak</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#F7F1E5]/80 border border-[#E6DCCB]">
                  <div className="flex items-center justify-center gap-1 text-[#66805C] font-bold text-base">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{currentUser?.totalCompletedDays || 25}</span>
                  </div>
                  <span className="text-[11px] text-[#766F67]">Sessions Completed</span>
                </div>
              </div>
            </div>

            {/* Return Actions */}
            <div className="w-full flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={closeReading}
                className="w-full sm:flex-1 min-h-[50px] rounded-2xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
              >
                <span>Return to Today</span>
              </button>
              <button
                onClick={() => {
                  closeReading();
                  setCurrentTab('journal');
                }}
                className="w-full sm:w-auto min-h-[50px] px-5 rounded-2xl bg-[#FFFDF8] hover:bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] text-xs font-bold transition-all text-center"
              >
                View in Journal
              </button>
            </div>
          </div>
        )}

        {/* Safe scroll spacing */}
        <div className="h-12" />
      </main>
    </div>
  );
};
