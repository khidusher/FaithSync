import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Type,
  ChevronRight,
  Clock,
  Compass,
  Check,
  Search,
  Bookmark
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BibleScreen: React.FC = () => {
  const {
    readingPlans,
    activePlan,
    selectReadingPlan,
    todayPassageDay,
    startReading,
    hasCompletedToday
  } = useApp();

  const [activeTab, setActiveTab] = useState<'today' | 'plans' | 'browse'>('today');
  const [selectedPlanId, setSelectedPlanId] = useState<string>(activePlan.id);
  const [testament, setTestament] = useState<'ot' | 'nt'>('nt');
  const [selectedBook, setSelectedBook] = useState<string>('John');
  const [selectedChapter, setSelectedChapter] = useState<number>(15);

  const otBooks = [
    { name: 'Genesis', chapters: 50 },
    { name: 'Psalms', chapters: 150 },
    { name: 'Proverbs', chapters: 31 },
    { name: 'Isaiah', chapters: 66 }
  ];

  const ntBooks = [
    { name: 'Matthew', chapters: 28 },
    { name: 'John', chapters: 21 },
    { name: 'Romans', chapters: 16 },
    { name: 'Philippians', chapters: 4 },
    { name: 'Colossians', chapters: 4 },
    { name: 'James', chapters: 5 }
  ];

  const currentBooks = testament === 'ot' ? otBooks : ntBooks;

  const handleStartPlan = (planId: string) => {
    selectReadingPlan(planId);
    startReading();
  };

  return (
    <div className="flex flex-col w-full pb-20 md:pb-12 pt-3 md:pt-6 bg-[#F7F1E5] font-sans">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A67C52] mb-1">
              <span>Personal Quiet Time</span>
              <span>•</span>
              <span className="text-[#6B4F2A] font-bold">Scripture</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2D2924] tracking-tight">
              Bible Reading &amp; Plans
            </h1>
            <p className="text-xs sm:text-sm text-[#766F67] mt-0.5 max-w-xl">
              Distraction-free scripture reading to help you abide in Christ every day.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => startReading()}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] text-xs font-bold transition-all active:scale-95 flex items-center gap-2 shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Today’s Passage</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center p-1 bg-[#FFFDF8] rounded-full border border-[#E6DCCB] shadow-2xs max-w-md">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex-1 min-h-[40px] px-4 rounded-full text-xs font-bold transition-all ${
              activeTab === 'today'
                ? 'bg-[#6B4F2A] text-[#FFFDF8] shadow-xs'
                : 'text-[#766F67] hover:text-[#2D2924]'
            }`}
          >
            Today's Passage
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`flex-1 min-h-[40px] px-4 rounded-full text-xs font-bold transition-all ${
              activeTab === 'plans'
                ? 'bg-[#6B4F2A] text-[#FFFDF8] shadow-xs'
                : 'text-[#766F67] hover:text-[#2D2924]'
            }`}
          >
            Quiet Time Plans
          </button>
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex-1 min-h-[40px] px-4 rounded-full text-xs font-bold transition-all ${
              activeTab === 'browse'
                ? 'bg-[#6B4F2A] text-[#FFFDF8] shadow-xs'
                : 'text-[#766F67] hover:text-[#2D2924]'
            }`}
          >
            Browse Books
          </button>
        </div>

        {/* TAB 1: TODAY'S PASSAGE */}
        {activeTab === 'today' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E6DCCB]">
                <div>
                  <span className="text-[11px] font-bold text-[#A67C52] uppercase tracking-wide">
                    {activePlan.title} · Day {todayPassageDay.dayNumber} of {activePlan.durationDays}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2D2924]">
                    {todayPassageDay.scriptureReference}
                  </h2>
                </div>
                <span className="text-xs font-bold text-[#66805C] bg-[#66805C]/15 px-3 py-1 rounded-full">
                  {todayPassageDay.estimatedMinutes} min quiet time
                </span>
              </div>

              {/* Key Verse Callout */}
              <div className="p-5 rounded-2xl bg-[#F7F1E5] border border-[#E6DCCB] border-l-4 border-l-[#D4A94D] space-y-1.5">
                <span className="text-[11px] font-bold text-[#A67C52] uppercase tracking-wide flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A94D]" />
                  Key Verse to Meditate On
                </span>
                <p className="font-serif text-base font-semibold text-[#2D2924] italic leading-relaxed">
                  {todayPassageDay.passage.keyVerse}
                </p>
              </div>

              {/* Distraction-Free Verses */}
              <div className="space-y-3 font-serif text-base sm:text-lg text-[#2D2924] leading-relaxed">
                {todayPassageDay.passage.verses.map(v => (
                  <p key={v.verseNum} className="p-2.5 rounded-xl hover:bg-[#F7F1E5]/40 transition-colors">
                    <sup className="font-sans font-bold text-xs text-[#6B4F2A] mr-2">
                      {v.verseNum}
                    </sup>
                    {v.text}
                  </p>
                ))}
              </div>

              {/* Start Guided Journey CTA */}
              <div className="pt-4 border-t border-[#E6DCCB] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-[#766F67]">
                  Ready to spend quiet time with this passage?
                </div>
                <button
                  onClick={() => startReading()}
                  className="w-full sm:w-auto min-h-[46px] px-6 rounded-xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Begin Guided Quiet Time Journey</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: READING PLANS */}
        {activeTab === 'plans' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readingPlans.map(plan => {
              const isCurrentPlan = activePlan.id === plan.id;
              return (
                <div
                  key={plan.id}
                  className={`p-6 rounded-3xl bg-[#FFFDF8] border transition-all shadow-2xs flex flex-col justify-between gap-5 ${
                    isCurrentPlan ? 'border-[#6B4F2A] ring-2 ring-[#6B4F2A]/15' : 'border-[#E6DCCB]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#A67C52] bg-[#F7F1E5] px-2.5 py-0.5 rounded-full border border-[#E6DCCB]">
                        {plan.category}
                      </span>
                      <span className="text-xs text-[#766F67] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {plan.durationDays} Days
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#2D2924]">
                      {plan.title}
                    </h3>

                    <p className="text-xs text-[#766F67] leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6DCCB]/60 flex items-center justify-between">
                    {isCurrentPlan ? (
                      <span className="text-xs font-bold text-[#66805C] flex items-center gap-1">
                        <Check className="w-4 h-4 stroke-[3]" />
                        Active Quiet Plan
                      </span>
                    ) : (
                      <button
                        onClick={() => handleStartPlan(plan.id)}
                        className="min-h-[40px] px-4 rounded-xl text-xs font-bold text-[#6B4F2A] hover:bg-[#6B4F2A] hover:text-[#FFFDF8] border border-[#E6DCCB] transition-all"
                      >
                        Select Plan
                      </button>
                    )}

                    <span className="text-xs font-medium text-[#766F67]">
                      {plan.days.length} readings
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: BROWSE BOOKS */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs space-y-5">
              <div className="flex items-center gap-2 border-b border-[#E6DCCB] pb-3">
                <button
                  onClick={() => setTestament('ot')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    testament === 'ot'
                      ? 'bg-[#6B4F2A] text-[#FFFDF8]'
                      : 'text-[#766F67] hover:bg-[#F7F1E5]'
                  }`}
                >
                  Old Testament
                </button>
                <button
                  onClick={() => setTestament('nt')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    testament === 'nt'
                      ? 'bg-[#6B4F2A] text-[#FFFDF8]'
                      : 'text-[#766F67] hover:bg-[#F7F1E5]'
                  }`}
                >
                  New Testament
                </button>
              </div>

              {/* Books Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {currentBooks.map(b => (
                  <button
                    key={b.name}
                    onClick={() => {
                      setSelectedBook(b.name);
                      setSelectedChapter(1);
                    }}
                    className={`p-3.5 rounded-2xl border text-center transition-all ${
                      selectedBook === b.name
                        ? 'bg-[#F7F1E5] border-[#6B4F2A] text-[#6B4F2A] font-bold shadow-2xs'
                        : 'bg-[#FFFDF8] border-[#E6DCCB] text-[#2D2924] hover:border-[#A67C52]'
                    }`}
                  >
                    <p className="font-serif text-sm">{b.name}</p>
                    <span className="text-[10px] text-[#766F67]">{b.chapters} ch.</span>
                  </button>
                ))}
              </div>

              {/* Chapter selector */}
              <div className="pt-4 border-t border-[#E6DCCB] space-y-3">
                <h4 className="font-serif text-sm font-bold text-[#2D2924]">
                  {selectedBook} Chapters
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Array.from(
                    {
                      length:
                        currentBooks.find(b => b.name === selectedBook)?.chapters || 10
                    },
                    (_, i) => i + 1
                  )
                    .slice(0, 28)
                    .map(num => (
                      <button
                        key={num}
                        onClick={() => setSelectedChapter(num)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold border transition-all ${
                          selectedChapter === num
                            ? 'bg-[#6B4F2A] text-[#FFFDF8] border-[#6B4F2A]'
                            : 'bg-[#FFFDF8] text-[#2D2924] border-[#E6DCCB] hover:border-[#6B4F2A]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
