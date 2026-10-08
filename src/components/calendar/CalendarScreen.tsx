import React, { useState } from 'react';
import {
  Calendar,
  BookOpen,
  Edit3,
  Heart,
  ChevronLeft,
  ChevronRight,
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Filter,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ReadingCompletion } from '../../types';

export const CalendarScreen: React.FC = () => {
  const { completions, currentUser, startReading } = useApp();

  const [selectedSession, setSelectedSession] = useState<ReadingCompletion | null>(() => {
    return completions[0] || null;
  });
  const [viewMode, setViewMode] = useState<'timeline' | 'calendar'>('timeline');
  const [searchQuery, setSearchQuery] = useState('');

  const streak = currentUser?.currentStreak || 5;
  const totalDays = currentUser?.totalCompletedDays || 24;

  const filteredCompletions = completions.filter(c => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      c.scriptureReference.toLowerCase().includes(query) ||
      (c.notes && c.notes.toLowerCase().includes(query)) ||
      (c.reflectionWhatStoodOut && c.reflectionWhatStoodOut.toLowerCase().includes(query)) ||
      (c.personalPrayer && c.personalPrayer.toLowerCase().includes(query))
    );
  });

  return (
    <div className="flex flex-col w-full pb-20 md:pb-12 pt-3 md:pt-6 bg-[#F7F1E5] font-sans">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A67C52] mb-1">
              <span>Personal Quiet Time</span>
              <span>•</span>
              <span className="text-[#6B4F2A] font-bold">Spiritual Record</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2D2924] tracking-tight">
              Quiet Time Journal
            </h1>
            <p className="text-xs sm:text-sm text-[#766F67] mt-0.5 max-w-xl">
              Look back at what God has spoken, what you reflected on, and the prayers you lifted up.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => startReading()}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Today's Reading</span>
            </button>
          </div>
        </div>

        {/* Gentle Consistency Stats Header */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F7F1E5] text-[#D4A94D] border border-[#E6DCCB] flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 fill-[#D4A94D]" />
            </div>
            <div>
              <span className="font-serif text-2xl font-extrabold text-[#2D2924] tabular-nums">
                {streak} Days
              </span>
              <p className="text-xs text-[#766F67] font-semibold">Current Daily Streak</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F7F1E5] text-[#66805C] border border-[#E6DCCB] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif text-2xl font-extrabold text-[#2D2924] tabular-nums">
                {totalDays} Sessions
              </span>
              <p className="text-xs text-[#766F67] font-semibold">Completed with God</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif text-2xl font-extrabold text-[#2D2924] tabular-nums">
                {completions.length} Journal Entries
              </span>
              <p className="text-xs text-[#766F67] font-semibold">Recorded in History</p>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#766F67] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search previous sessions by scripture, reflection, or prayer..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] text-[#2D2924] focus:outline-none focus:border-[#6B4F2A]"
            />
          </div>

          <span className="text-xs text-[#766F67]">
            Showing {filteredCompletions.length} sessions
          </span>
        </div>

        {/* 2-Column Responsive Layout: Entry List vs Detailed Inspection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Sessions List (lg: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {filteredCompletions.length === 0 ? (
              <div className="p-8 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] text-center space-y-2">
                <BookOpen className="w-8 h-8 text-[#A67C52] mx-auto opacity-70" />
                <p className="text-xs font-bold text-[#2D2924]">No journal sessions found</p>
                <p className="text-[11px] text-[#766F67]">Try adjusting your search terms.</p>
              </div>
            ) : (
              filteredCompletions.map(comp => {
                const isSelected = selectedSession?.id === comp.id;
                const formattedDate = new Date(comp.completedAt).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                });

                return (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedSession(comp)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all shadow-2xs flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-[#FFFDF8] border-[#6B4F2A] ring-2 ring-[#6B4F2A]/15'
                        : 'bg-[#FFFDF8] border-[#E6DCCB] hover:border-[#A67C52]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#766F67]">{formattedDate}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#66805C]/15 text-[#66805C]">
                        Completed ✓
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-base font-bold text-[#2D2924]">
                        {comp.scriptureReference}
                      </h3>
                      <span className="text-xs text-[#6B4F2A] font-semibold">
                        Day {comp.dayNumber}
                      </span>
                    </div>

                    {/* Excerpt preview */}
                    <p className="text-xs text-[#766F67] line-clamp-2">
                      {comp.reflectionWhatStoodOut ||
                        comp.notes ||
                        comp.personalPrayer ||
                        'Quiet time completed in scripture and reflection.'}
                    </p>

                    {comp.personalPrayer && (
                      <span className="text-[10px] text-[#A67C52] font-bold flex items-center gap-1 pt-1">
                        <Heart className="w-3 h-3 text-[#A67C52]" />
                        <span>Includes personal prayer</span>
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* RIGHT COLUMN: Full Session Inspection Detail (lg: 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {selectedSession ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs space-y-6">
                {/* Header */}
                <div className="pb-4 border-b border-[#E6DCCB] space-y-1">
                  <div className="flex items-center justify-between text-xs text-[#766F67]">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#6B4F2A]" />
                      {new Date(selectedSession.completedAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="text-[#66805C] font-bold bg-[#66805C]/15 px-2.5 py-0.5 rounded-full">
                      Recorded in Journal
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl font-extrabold text-[#2D2924]">
                    {selectedSession.scriptureReference}
                  </h2>
                </div>

                {/* Key verse if saved */}
                {selectedSession.keyVerse && (
                  <div className="p-4 rounded-2xl bg-[#F7F1E5] border border-[#E6DCCB] border-l-4 border-l-[#D4A94D] space-y-1">
                    <span className="text-[11px] font-bold text-[#A67C52] uppercase tracking-wide flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4A94D]" />
                      Meditation Verse
                    </span>
                    <p className="font-serif text-sm text-[#2D2924] italic leading-relaxed">
                      “{selectedSession.keyVerse}”
                    </p>
                  </div>
                )}

                {/* Reflection section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#A67C52] uppercase tracking-wide">
                    <Edit3 className="w-4 h-4 text-[#6B4F2A]" />
                    <span>Reflection &amp; Lessons</span>
                  </div>

                  {selectedSession.reflectionWhatStoodOut && (
                    <div className="p-4 rounded-2xl bg-[#F7F1E5]/40 border border-[#E6DCCB] space-y-1">
                      <h4 className="text-xs font-bold text-[#6B4F2A]">
                        What stood out to me:
                      </h4>
                      <p className="text-xs text-[#2D2924] leading-relaxed">
                        {selectedSession.reflectionWhatStoodOut}
                      </p>
                    </div>
                  )}

                  {selectedSession.reflectionGodTeaching && (
                    <div className="p-4 rounded-2xl bg-[#F7F1E5]/40 border border-[#E6DCCB] space-y-1">
                      <h4 className="text-xs font-bold text-[#6B4F2A]">
                        What God is teaching me:
                      </h4>
                      <p className="text-xs text-[#2D2924] leading-relaxed">
                        {selectedSession.reflectionGodTeaching}
                      </p>
                    </div>
                  )}

                  {selectedSession.reflectionApplication && (
                    <div className="p-4 rounded-2xl bg-[#F7F1E5]/40 border border-[#E6DCCB] space-y-1">
                      <h4 className="text-xs font-bold text-[#6B4F2A]">
                        How I can apply this:
                      </h4>
                      <p className="text-xs text-[#2D2924] leading-relaxed">
                        {selectedSession.reflectionApplication}
                      </p>
                    </div>
                  )}

                  {selectedSession.notes && !selectedSession.reflectionWhatStoodOut && (
                    <div className="p-4 rounded-2xl bg-[#F7F1E5]/40 border border-[#E6DCCB] space-y-1">
                      <h4 className="text-xs font-bold text-[#6B4F2A]">
                        Quiet Time Note:
                      </h4>
                      <p className="text-xs text-[#2D2924] leading-relaxed whitespace-pre-line">
                        {selectedSession.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Personal Prayer Section */}
                {selectedSession.personalPrayer && (
                  <div className="space-y-2 pt-2 border-t border-[#E6DCCB]/60">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#A67C52] uppercase tracking-wide">
                      <Heart className="w-4 h-4 text-[#6B4F2A]" />
                      <span>Prayer Raised During Quiet Time</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] border-l-4 border-l-[#6B4F2A] shadow-2xs">
                      <p className="font-serif text-xs sm:text-sm text-[#2D2924] italic leading-relaxed">
                        “{selectedSession.personalPrayer}”
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] text-center text-xs text-[#766F67] space-y-2 shadow-2xs">
                <BookOpen className="w-8 h-8 text-[#A67C52] mx-auto opacity-70" />
                <p>Select any previous quiet time session from the list to view your full journal entry.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
