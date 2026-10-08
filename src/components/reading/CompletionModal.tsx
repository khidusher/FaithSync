import React from 'react';
import { Check, Flame, Calendar, HeartHandshake, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CompletionModal: React.FC = () => {
  const {
    isCelebrationOpen,
    closeCelebration,
    justCompletedData,
    setCurrentTab
  } = useApp();

  if (!isCelebrationOpen || !justCompletedData) return null;

  const { completion, streak, totalDays } = justCompletedData;

  const todayDateStr = new Date(completion.completedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  const weekDays = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: true },
    { day: 'Fri', completed: true },
    { day: 'Sat', completed: true },
    { day: 'Sun', completed: false }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-[#FFFDF8] text-[#2D2924] rounded-2xl border border-[#E6DCCB] shadow-2xl p-6 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200 font-sans">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#66805C]/15 text-[#66805C] flex items-center justify-center mx-auto ring-8 ring-[#66805C]/5 border border-[#66805C]/30">
          <Check className="w-9 h-9 stroke-[3]" />
        </div>

        {/* Affirming Headlines */}
        <div className="space-y-1">
          <h2 className="font-serif text-2xl font-extrabold text-[#2D2924]">
            Quiet time complete.
          </h2>
          <p className="font-serif text-sm font-semibold text-[#A67C52] italic">
            “Well done. Keep growing.”
          </p>
        </div>

        {/* Milestone Card */}
        <div className="p-4 rounded-xl bg-[#F7F1E5] border border-[#E6DCCB] space-y-3 shadow-2xs">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E6DCCB]">
            <span className="text-[#766F67] font-medium">{todayDateStr}</span>
            <span className="font-bold text-[#2D2924]">
              {completion.scriptureReference}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-2.5 rounded-xl bg-[#FFFDF8] border border-[#E6DCCB]">
              <div className="flex items-center justify-center gap-1 text-[#66805C]">
                <Flame className="w-4 h-4 fill-[#66805C]" />
                <span className="text-lg font-bold tabular-nums">{streak}</span>
              </div>
              <p className="text-[11px] text-[#766F67] font-medium mt-0.5">Day streak</p>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FFFDF8] border border-[#E6DCCB]">
              <div className="flex items-center justify-center gap-1 text-[#6B4F2A]">
                <Calendar className="w-4 h-4" />
                <span className="text-lg font-bold tabular-nums">{totalDays}</span>
              </div>
              <p className="text-[11px] text-[#766F67] font-medium mt-0.5">Total quiet days</p>
            </div>
          </div>

          {/* Weekly mini track */}
          <div className="pt-2">
            <p className="text-[11px] font-semibold text-[#766F67] mb-2">Weekly Rhythm</p>
            <div className="flex justify-between items-center px-1">
              {weekDays.map((wd, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-[#766F67] font-medium">{wd.day}</span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      wd.completed
                        ? 'bg-[#66805C] text-[#FFFDF8] shadow-xs'
                        : 'bg-[#E6DCCB] text-[#766F67]'
                    }`}
                  >
                    {wd.completed ? '✓' : '○'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={() => {
              closeCelebration();
              setCurrentTab('journal');
            }}
            className="w-full min-h-[46px] rounded-xl bg-[#FFFDF8] border border-[#E6DCCB] hover:border-[#6B4F2A] text-[#6B4F2A] font-bold text-xs flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <Calendar className="w-4 h-4 text-[#D4A94D]" />
            <span>View in Quiet Time Journal</span>
          </button>

          <button
            onClick={closeCelebration}
            className="w-full min-h-[48px] rounded-xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] font-bold text-sm shadow-md shadow-[#6B4F2A]/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <span>Done</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
