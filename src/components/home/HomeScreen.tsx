import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const HomeScreen: React.FC = () => {
  const {
    currentUser,
    startReading,
    setCurrentTab,
    hasCompletedToday
  } = useApp();

  const [copiedVerse, setCopiedVerse] = useState(false);
  const [reactions, setReactions] = useState<Record<string, string>>({});
  const [isBookmarked, setIsBookmarked] = useState(false);

  const userName = currentUser?.firstName || 'Alex';

  const handleReaction = (friendId: string, feedbackText: string) => {
    setReactions(prev => ({ ...prev, [friendId]: feedbackText }));
  };

  const handleCopyVerse = () => {
    navigator.clipboard?.writeText(
      '“I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit.” — John 15:5'
    );
    setCopiedVerse(true);
    setTimeout(() => setCopiedVerse(false), 2000);
  };

  return (
    <div className="flex flex-col w-full pb-20 md:pb-12 pt-3 md:pt-6 bg-[#F7F1E5]">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile & Tablet Header Greeting */}
        <div className="flex items-center justify-between pb-5 md:pb-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 md:hidden">
              <span className="text-[11px] uppercase tracking-wider text-[#766F67] font-semibold">
                Saturday, Oct 14
              </span>
              <span className="w-1 h-1 rounded-full bg-[#766F67]/50"></span>
              <span className="text-[11px] text-[#66805C] font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">wb_sunny</span> Quiet Morning
              </span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#2D2924] font-bold mt-1 tracking-tight">
              Good morning, {userName}
            </h1>
            <p className="text-xs md:text-sm text-[#766F67] mt-1 font-sans">
              Ready to spend some peaceful time in the Word today?
            </p>
          </div>

          {/* Quick Streak Badge on Mobile */}
          <div className="flex flex-col items-end md:hidden">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#66805C]/15 text-[#66805C] border border-[#66805C]/30 shadow-2xs">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <span className="text-xs font-bold font-sans">{currentUser?.currentStreak || 6} Days</span>
            </div>
          </div>
        </div>

        {/* RESPONSIVE LAYOUT CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">
          
          {/* LEFT / MAIN COLUMN (Devotional, Memory Verse, Rhythm) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5 lg:gap-6">
            
            {/* Hero Card: Today's Quiet Time Devotional */}
            <section className="relative overflow-hidden rounded-2xl bg-[#FFFDF8] p-5 sm:p-6 lg:p-7 shadow-[0_4px_20px_-4px_rgba(45,41,36,0.05)] border border-[#E6DCCB] flex flex-col gap-4">
              {/* Subtle Warm Gradient Glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#F7F1E5] blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] text-xs font-semibold tracking-wide">
                  <span className="material-symbols-outlined text-[15px] text-[#D4A94D]">auto_stories</span>
                  Gospel of John Plan · Day 15
                </span>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  aria-label="Save for later"
                  className="text-[#766F67] hover:text-[#6B4F2A] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-[#F7F1E5] border border-transparent hover:border-[#E6DCCB] active:scale-95"
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={isBookmarked ? { fontVariationSettings: "'FILL' 1", color: '#D4A94D' } : undefined}
                  >
                    {isBookmarked ? 'bookmark' : 'bookmark_border'}
                  </span>
                </button>
              </div>

              <div className="relative z-10 flex flex-col gap-1.5">
                <span className="text-[11px] sm:text-xs uppercase text-[#A67C52] font-semibold tracking-wider font-sans">
                  Today's Quiet Time
                </span>
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#2D2924] tracking-tight leading-snug">
                  John 15:1–11: The Vine and the Branches
                </h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[#766F67] text-xs pt-1">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">schedule</span> 8–10 min quiet time
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">format_list_numbered</span> 11 verses
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#66805C] font-semibold">
                    <span className="material-symbols-outlined text-[15px]">group</span> 3 friends finished
                  </span>
                </div>
              </div>

              {/* Quick Scripture Snippet Preview */}
              <div className="relative z-10 p-4 rounded-xl bg-[#F7F1E5] flex items-start gap-3 border border-[#E6DCCB]">
                <span className="material-symbols-outlined text-[#D4A94D] text-[22px] mt-0.5 shrink-0">
                  format_quote
                </span>
                <p className="font-serif text-sm sm:text-base text-[#2D2924] italic leading-relaxed">
                  "Remain in me, as I also remain in you. No branch can bear fruit by itself; it must remain in the vine. Neither can you bear fruit unless you remain in me."
                </p>
              </div>

              {/* Primary Action CTA Button */}
              <div className="relative z-10 pt-1 flex flex-col sm:flex-row gap-3 items-center">
                <button
                  onClick={() => startReading()}
                  className={`w-full sm:flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all active:scale-[0.98] font-sans ${
                    hasCompletedToday
                      ? 'bg-[#66805C] text-[#FFFDF8] shadow-[#66805C]/20'
                      : 'bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] shadow-[#6B4F2A]/25'
                  }`}
                  type="button"
                >
                  <span>{hasCompletedToday ? 'Review Today\'s Passage' : 'Start Today\'s Reading'}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>

                <button
                  onClick={() => setCurrentTab('bible')}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#FFFDF8] hover:bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] text-xs font-bold transition-all text-center"
                >
                  View Plan Details
                </button>
              </div>
            </section>

            {/* Scripture Takeaway Quote Card */}
            <section className="rounded-2xl bg-[#FFFDF8] p-5 sm:p-6 shadow-2xs border border-[#E6DCCB] border-l-4 border-l-[#D4A94D] flex flex-col gap-3 relative overflow-hidden">
              <div className="flex items-center justify-between text-[#6B4F2A]">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A67C52] font-sans">
                  <span className="material-symbols-outlined text-[17px] text-[#D4A94D]">psychology_alt</span>
                  Memory Verse &amp; Weekly Meditation
                </div>
                <span className="text-xs font-semibold bg-[#F7F1E5] px-3 py-1 rounded-full text-[#6B4F2A] border border-[#E6DCCB]">
                  John 15:5
                </span>
              </div>
              <p className="font-serif text-lg sm:text-xl text-[#2D2924] font-semibold italic leading-relaxed">
                “I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing.”
              </p>
              <div className="flex items-center justify-between pt-1 font-sans border-t border-[#E6DCCB]/60 mt-1">
                <span className="text-xs text-[#766F67]">Word of the day · Gospel of John</span>
                <button
                  onClick={handleCopyVerse}
                  className="flex items-center gap-1 text-[#6B4F2A] hover:text-[#D4A94D] text-xs font-bold transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copiedVerse ? 'check' : 'share'}
                  </span>
                  {copiedVerse ? 'Copied to clipboard!' : 'Share Verse'}
                </button>
              </div>
            </section>

            {/* Spiritual Rhythm & Habit Tracker */}
            <section className="rounded-2xl bg-[#FFFDF8] p-5 sm:p-6 shadow-2xs border border-[#E6DCCB] flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-[#66805C] text-[22px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      spa
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2D2924]">
                      6 Day Devotional Rhythm
                    </h3>
                  </div>
                  <p className="text-xs text-[#766F67] mt-0.5 font-sans">
                    Building a calm, sustainable habit with grace over guilt
                  </p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-[#F7F1E5] font-semibold text-[#766F67] border border-[#E6DCCB]">
                  This Week
                </span>
              </div>

              {/* 7-Day Visual Flow */}
              <div className="grid grid-cols-7 gap-2 pt-1 font-sans">
                {/* Monday - Friday (Completed) */}
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(d => (
                  <div key={d} className="flex flex-col items-center gap-2 p-2.5 rounded-xl bg-[#F7F1E5]/70 border border-[#E6DCCB]/70">
                    <span className="text-[11px] font-semibold text-[#766F67]">{d}</span>
                    <div className="w-8 h-8 rounded-full bg-[#66805C] text-[#FFFDF8] flex items-center justify-center shadow-xs">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </div>
                  </div>
                ))}
                {/* Saturday (Today) */}
                <div className="flex flex-col items-center gap-2 p-2.5 rounded-xl bg-[#F7F1E5] border border-[#D4A94D] shadow-2xs">
                  <span className="text-[11px] font-bold text-[#6B4F2A]">Sat</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-2xs border ${
                    hasCompletedToday
                      ? 'bg-[#66805C] text-[#FFFDF8] border-[#66805C]'
                      : 'bg-[#FFFDF8] text-[#D4A94D] border-[#D4A94D]'
                  }`}>
                    <span className="material-symbols-outlined text-[16px]">
                      {hasCompletedToday ? 'check' : 'refresh'}
                    </span>
                  </div>
                </div>
                {/* Sunday (Upcoming) */}
                <div className="flex flex-col items-center gap-2 p-2.5 rounded-xl bg-[#F7F1E5]/40 opacity-70 border border-transparent">
                  <span className="text-[11px] font-medium text-[#766F67]">Sun</span>
                  <div className="w-8 h-8 rounded-full bg-[#E6DCCB] text-[#766F67] flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#766F67]"></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 px-1">
                <span className="w-2 h-2 rounded-full bg-[#66805C]"></span>
                <span className="text-xs text-[#766F67] font-sans">
                  Grace-filled consistency: you're 85% through this cycle!
                </span>
              </div>
            </section>
          </div>

          {/* RIGHT / SECONDARY COLUMN (Circle, Community Activity, Reflections) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-5 lg:gap-6">
            
            {/* 'Your Circle' Community / Accountability Section */}
            <section className="rounded-2xl bg-[#FFFDF8] p-5 shadow-2xs border border-[#E6DCCB] flex flex-col gap-4 font-sans">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2D2924]">Your Circle</h3>
                  <p className="text-xs text-[#766F67]">3 friends completed today's quiet time</p>
                </div>
                <button
                  onClick={() => setCurrentTab('friends')}
                  className="text-xs text-[#6B4F2A] hover:text-[#D4A94D] font-bold transition-colors"
                >
                  View All (8)
                </button>
              </div>

              {/* Friend Check-in Stack */}
              <div className="flex flex-col gap-3">
                {/* Friend 1: Sarah M. */}
                <div className="p-3.5 rounded-xl bg-[#F7F1E5]/60 hover:bg-[#F7F1E5] border border-[#E6DCCB] flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbzRJlgSYKsxjvrTnR6M2IGZDkRqXrTj48G6_6Lh52XKTaN2BR-nodhTyuYY3iNDoNWYs-YnWtuw-112fhlpOCUwPEOmqDRxFe0yt0Vg1LAvuX-UXxgcyGETAy2cosRyH5zXPeBmeeSB5V_NLo4lU927x9o1GGNZAukpALMPZjZbpDmsKVLpwNcBWfvxV1hrcSvopubrtXpZSz1TWrrz-qZ_i6LjTj6CJr1N7k4ZY"
                        alt="Sarah M."
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover shadow-2xs border border-[#E6DCCB]"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#66805C] text-[#FFFDF8] flex items-center justify-center shadow-xs">
                        <span className="material-symbols-outlined text-[10px]">check</span>
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#2D2924]">Sarah M.</span>
                      <span className="text-[11px] text-[#766F67]">Completed at 7:15 AM</span>
                    </div>
                  </div>
                  <button
                    disabled={Boolean(reactions['sarah'])}
                    onClick={() => handleReaction('sarah', '❤️ Encouraged!')}
                    className={`min-h-[44px] flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 border ${
                      reactions['sarah']
                        ? 'bg-[#66805C]/15 text-[#66805C] border-[#66805C]/30'
                        : 'bg-[#FFFDF8] text-[#6B4F2A] border-[#E6DCCB] hover:border-[#6B4F2A]'
                    }`}
                    type="button"
                  >
                    <span>{reactions['sarah'] || '❤️ Encourage'}</span>
                  </button>
                </div>

                {/* Friend 2: David K. */}
                <div className="p-3.5 rounded-xl bg-[#F7F1E5]/60 hover:bg-[#F7F1E5] border border-[#E6DCCB] flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAatvnd_OTHZMcyuc90Q8LjztJHho6oxIO6AHH9MAolDY2xmFfV7K7GXqKki2RZt2EQs-Jm0saj8gz9JQ8IGylDRQtQd11ZtYGCJMn25v0l8NW8H33K_8NYDlrcC0JChP82LPhlCi4bQbI22tXkBenuBeLkV47X7wdwJD9lOzkoNwvgz_oi_PtKwqDvqBD1L_RhH0QWZykcXH6ET2vugKxWNSHU4mJUuv-ydGxRpgA"
                        alt="David K."
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover shadow-2xs border border-[#E6DCCB]"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#66805C] text-[#FFFDF8] flex items-center justify-center shadow-xs">
                        <span className="material-symbols-outlined text-[10px]">check</span>
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#2D2924]">David K.</span>
                      <span className="text-[11px] text-[#766F67]">Completed John 15</span>
                    </div>
                  </div>
                  <button
                    disabled={Boolean(reactions['david'])}
                    onClick={() => handleReaction('david', '👏 Celebrated!')}
                    className={`min-h-[44px] flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 border ${
                      reactions['david']
                        ? 'bg-[#66805C]/15 text-[#66805C] border-[#66805C]/30'
                        : 'bg-[#FFFDF8] text-[#6B4F2A] border-[#E6DCCB] hover:border-[#6B4F2A]'
                    }`}
                    type="button"
                  >
                    <span>{reactions['david'] || '👏 Celebrate'}</span>
                  </button>
                </div>

                {/* Friend 3: Michael T. (Reading now) */}
                <div className="p-3.5 rounded-xl bg-[#F7F1E5]/60 hover:bg-[#F7F1E5] border border-[#E6DCCB] flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTi3ZPBGjIXxCTFiz-Kq8P2v8llB2Rx43O5nRCBE_3ot7qtnPtdaEwFMzrIoKIp7mhAgoimgOEgEpbt1Oq2Oym4qcEDrAGyfBStyFIurXdwV56pWpqqIXbuTD1jrScB3Zr2BtLv1aXC37k2MqRcwWcXAG-ibxGz3B2JJPA9xaQVJlllqV_r3hyXYjJR5y7SgJdUU40wMD_hlWpCt5IBvchaS_bI1mwxgNPrGwmdD0"
                        alt="Michael T."
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover shadow-2xs border border-[#E6DCCB]"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#D4A94D] animate-pulse shadow-xs" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#2D2924]">Michael T.</span>
                      <span className="text-[11px] text-[#A67C52] font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A94D] animate-ping" />
                        Reading now
                      </span>
                    </div>
                  </div>
                  <button
                    disabled={Boolean(reactions['michael'])}
                    onClick={() => handleReaction('michael', '🙏 Prayed!')}
                    className={`min-h-[44px] flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 border ${
                      reactions['michael']
                        ? 'bg-[#66805C]/15 text-[#66805C] border-[#66805C]/30'
                        : 'bg-[#FFFDF8] text-[#6B4F2A] border-[#E6DCCB] hover:border-[#6B4F2A]'
                    }`}
                    type="button"
                  >
                    <span>{reactions['michael'] || '🙏 Pray'}</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Daily Reflection Prompt Teaser */}
            <section
              onClick={() => startReading()}
              className="rounded-2xl bg-[#FFFDF8] p-5 border border-[#E6DCCB] flex items-center justify-between cursor-pointer hover:border-[#6B4F2A] transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F7F1E5] flex items-center justify-center text-[#6B4F2A] border border-[#E6DCCB] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">edit_note</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-sm font-bold text-[#2D2924]">
                    Daily Reflection Question
                  </span>
                  <span className="text-xs text-[#766F67] font-sans mt-0.5">
                    How can you remain connected to the Vine today?
                  </span>
                </div>
              </div>
              <button
                className="min-w-[44px] min-h-[44px] rounded-full bg-[#F7F1E5] text-[#6B4F2A] flex items-center justify-center shadow-2xs hover:text-[#D4A94D] transition-colors shrink-0 active:scale-95"
                type="button"
                aria-label="Open reflection"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </section>

            {/* Community Encouragement Banner */}
            <section className="rounded-2xl bg-[#F7F1E5] p-5 border border-[#E6DCCB] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#6B4F2A]">
                <span className="material-symbols-outlined text-[18px] text-[#D4A94D]">sentiment_satisfied</span>
                <span>Faith Sync Principle</span>
              </div>
              <p className="font-serif text-xs text-[#2D2924] italic leading-relaxed">
                “I don't have to grow alone. We grow stronger when we encourage each other every single day.”
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
