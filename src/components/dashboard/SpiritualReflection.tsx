import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DailyReflectionContent } from '../../types';

interface SpiritualReflectionProps {
  content: DailyReflectionContent;
}

export const SpiritualReflection: React.FC<SpiritualReflectionProps> = ({ content }) => {
  const { startReading, hasCompletedToday } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(`${content.verse} — ${content.verseReference}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] border-l-4 border-l-[#D4A94D] shadow-2xs flex flex-col gap-3.5 font-sans relative overflow-hidden">
      <div className="flex items-center justify-between text-[#6B4F2A]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-[#D4A94D]">psychology_alt</span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#A67C52]">
            Today's Spiritual Reflection
          </span>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB]">
          {content.verseReference}
        </span>
      </div>

      <div>
        <h3 className="font-serif text-lg font-bold text-[#2D2924] mb-1">
          {content.title}
        </h3>
        <p className="font-serif text-base text-[#2D2924] italic leading-relaxed">
          {content.verse}
        </p>
      </div>

      <div className="p-3.5 rounded-2xl bg-[#F7F1E5] border border-[#E6DCCB] text-xs leading-relaxed text-[#766F67]">
        <p>{content.reflectionText}</p>
        <div className="mt-2 pt-2 border-t border-[#E6DCCB]/60 flex items-start gap-1.5 text-[#2D2924] font-medium">
          <span className="material-symbols-outlined text-[16px] text-[#66805C] shrink-0 mt-0.5">spa</span>
          <span><strong className="text-[#6B4F2A]">Prayer:</strong> {content.prayerFocus}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-[#E6DCCB]/60">
        <span className="text-xs text-[#766F67] self-start sm:self-center">
          Take a moment to pause, reflect and reconnect.
        </span>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleCopy}
            className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold text-[#6B4F2A] hover:bg-[#F7F1E5] border border-[#E6DCCB] transition-all flex items-center justify-center gap-1 active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>

          <button
            onClick={() => startReading()}
            className={`min-h-[44px] flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-xs ${
              hasCompletedToday
                ? 'bg-[#66805C] text-[#FFFDF8]'
                : 'bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {hasCompletedToday ? 'done' : 'auto_stories'}
            </span>
            <span>{hasCompletedToday ? 'Review Passage' : 'Read Reflection'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
