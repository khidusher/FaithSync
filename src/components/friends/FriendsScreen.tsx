import React, { useState } from 'react';

export const FriendsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'friends' | 'requests'>('feed');
  const [requestAccepted, setRequestAccepted] = useState(false);
  const [requestDeclined, setRequestDeclined] = useState(false);
  const [prayed, setPrayed] = useState(false);
  const [nudgeSent, setNudgeSent] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [reactions, setReactions] = useState<{
    encourage: boolean;
    celebrate: boolean;
    amen: boolean;
    inspired: boolean;
  }>({
    encourage: false,
    celebrate: false,
    amen: false,
    inspired: false
  });

  const toggleReaction = (key: keyof typeof reactions) => {
    setReactions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const friendsList = [
    {
      name: 'Sarah Miller',
      username: 'sarah.infaith',
      status: 'Completed John 15 (7:15 AM)',
      streak: 6,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtB-NTriNfrebO6hfuiwdJ1sLmZbdb8nws_1Pt2v_dj6YjtFjVBCM0JfhnPHUCmYU6OmlxKk_xJGNKOYKiqMxP1rgfLCeDiahySjW3LJnlvRLc9itV5ep1Js147cJ9fcb9gnrFdTZnplY-yrtGfYxWjQXl41wQgcNjR80T7SggtMnxPMViBiUR_Ye6jC-TIAOdy7wViPpJC8U0mJ0_li1URS0aW_pw3OnFyU_OvdQ',
      completedToday: true
    },
    {
      name: 'David Kim',
      username: 'david_k',
      status: 'Completed Romans 12 (8:30 AM)',
      streak: 14,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGv-eodXSKoWyP595S03xZJHBItCiH5SECnebFDjk8mwZCfqwUDPDQ6JUumrapHNF39pA8MrSlyyQCyKEQnI-bLKXA7y0CpsMnq1G6w2VkMKI6XnajGxBtIBkEQZLUUipC56gURH43VMHgXwuqlJfv58fHFhA28qZdKDXCoMIrniunsWKZsfFyFjkpwPkdM7bTB7NisAFW4GhMt4oV8HB1MUY6VjR0zr7QSxu1N7A',
      completedToday: true
    },
    {
      name: 'Michael Chang',
      username: 'mike.chang',
      status: 'Quiet time pending for today',
      streak: 4,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo1x5rFNEoUZujph4cvbC7-lrq2PAXjdvVepcc8PWG93wzIg5PX2bGFXKnURFQRm9HqPfbaWzPDzRVdNSMZBUTsr5e3NOuo8-fcc4qwvQtFNu_-9MlcYhSxEF5vHjuh9Zaqs1LNgMCWAM302EzRdJkAqfXRSdqmSb5P0WdiHGKsQ0251mXtIBWNBJ6JruL6XUXUrQuuJygjsFNrzAMwSCga11qZaUV3jiugGrI5pE',
      completedToday: false
    },
    {
      name: 'Elena Vance',
      username: 'elena_grace',
      status: 'Completed John 15 (9:00 AM)',
      streak: 9,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPenoBir1_LTPcSTbsdRxnmTFclUKEBTeXvWOySQywFbJZ10FOcDo-6GN4Ozy7ehHV4BTMiyelHWv8M8lbdry9wXtzur8Kn8G8KBy-xh-CC73r4P8x2RvRiUw1kwS8ONeLj4dzLNF_byQy81WJ27aZTgbzYuODp1BQye_-MoVPNt64qdO6ugYY89Hasw10jLAoYw72iahZ17olSxjGq5LIyY0154xyp5DgjgI2cqc',
      completedToday: true
    }
  ];

  return (
    <div className="flex flex-col w-full pb-20 md:pb-12 pt-3 md:pt-6 bg-[#F7F1E5]">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-5 font-sans">
        
        {/* Top Header & Tab Controls on Mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2D2924] tracking-tight">
              Circle &amp; Community
            </h1>
            <p className="text-xs sm:text-sm text-[#766F67] mt-0.5">
              Encourage one another daily. You don't have to grow alone.
            </p>
          </div>

          {/* Interactive Segments for Mobile */}
          <div className="flex items-center p-1 bg-[#FFFDF8] rounded-full border border-[#E6DCCB] shadow-2xs max-w-sm">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex-1 min-h-[44px] py-2 px-3 rounded-full text-xs font-bold transition-all text-center flex items-center justify-center ${
                activeTab === 'feed'
                  ? 'text-[#FFFDF8] bg-[#6B4F2A] shadow-xs'
                  : 'text-[#766F67] hover:text-[#2D2924]'
              }`}
            >
              Activity Feed
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`flex-1 min-h-[44px] py-2 px-3 rounded-full text-xs font-bold transition-all text-center flex items-center justify-center ${
                activeTab === 'friends'
                  ? 'text-[#FFFDF8] bg-[#6B4F2A] shadow-xs'
                  : 'text-[#766F67] hover:text-[#2D2924]'
              }`}
            >
              My Friends (8)
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 min-h-[44px] py-2 px-3 rounded-full text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                activeTab === 'requests'
                  ? 'text-[#FFFDF8] bg-[#6B4F2A] shadow-xs'
                  : 'text-[#766F67] hover:text-[#2D2924]'
              }`}
            >
              <span>Requests</span>
              {!requestAccepted && !requestDeclined && (
                <span className="w-4 h-4 rounded-full bg-[#D4A94D] text-[#FFFDF8] text-[10px] flex items-center justify-center font-bold">
                  1
                </span>
              )}
            </button>
          </div>
        </div>

        {/* RESPONSIVE LAYOUT CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* LEFT / MAIN COLUMN (Feed & Connections) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
            
            {/* Pending Friend Connection Banner */}
            {!requestDeclined && (activeTab === 'feed' || activeTab === 'requests') && (
              <div className="bg-[#FFFDF8] p-5 rounded-2xl shadow-2xs border border-[#E6DCCB] border-l-4 border-l-[#D4A94D] flex flex-col gap-3 transition-all duration-300">
                {requestAccepted ? (
                  <div className="flex items-center justify-center gap-2 py-2 text-[#66805C] text-sm font-semibold">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span>Connected with Jordan! Added to your circle.</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            className="w-12 h-12 rounded-full object-cover shadow-2xs border border-[#E6DCCB]"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkwBuQ4jc7MLcZty3A2NOWw3ur--HZV88RPmxueePaq8BPAkrk19a6-mBNI4DzWXqKNHAOeTYHFCGeSmdCQYc2cFnb8rGoD7ilkbgEEL9H0okdvL5USLrkjzkRT4O7qgSz19ov6EjD9eKuiZQ_LSHMQzz4KG7ufe_pt-4FGbEnRtVlS5uf3jRz_rPjjafGAFFbqtTNYFBBZK1R2bhRVnQYdf0FQ9EE1otOHlwSees"
                            alt="Jordan Lee"
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 bg-[#6B4F2A] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                            <span
                              className="material-symbols-outlined text-[#FFFDF8] text-[10px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              person_add
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-serif text-base text-[#2D2924] font-bold truncate">
                              Jordan Lee
                            </span>
                            <span className="text-[10px] text-[#6B4F2A] font-semibold px-2 py-0.5 rounded-full bg-[#F7F1E5] border border-[#E6DCCB]">
                              Campus Crew
                            </span>
                          </div>
                          <span className="text-xs text-[#766F67]">Sent you a friend connection request</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setRequestAccepted(true)}
                          className="min-h-[44px] py-2 px-4 bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] rounded-full text-xs font-bold shadow-2xs active:scale-95 transition-transform flex items-center justify-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[16px]">check</span>
                          <span>Accept</span>
                        </button>
                        <button
                          onClick={() => setRequestDeclined(true)}
                          className="min-h-[44px] py-2 px-3.5 bg-[#F7F1E5] text-[#766F67] hover:text-[#2D2924] rounded-full text-xs font-bold active:scale-95 transition-transform border border-[#E6DCCB] flex items-center justify-center"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Feed Section Title */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[#D4A94D] text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  favorite
                </span>
                <h2 className="font-serif text-lg font-bold text-[#2D2924]">
                  Community Rhythm Feed
                </h2>
              </div>
              <span className="text-xs text-[#766F67]">Synced in real-time</span>
            </div>

            {/* Feed Card 1: Sarah Miller */}
            <div className="bg-[#FFFDF8] p-5 rounded-2xl shadow-2xs border border-[#E6DCCB] flex flex-col gap-3.5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    className="w-11 h-11 rounded-full object-cover shadow-2xs border border-[#E6DCCB]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtB-NTriNfrebO6hfuiwdJ1sLmZbdb8nws_1Pt2v_dj6YjtFjVBCM0JfhnPHUCmYU6OmlxKk_xJGNKOYKiqMxP1rgfLCeDiahySjW3LJnlvRLc9itV5ep1Js147cJ9fcb9gnrFdTZnplY-yrtGfYxWjQXl41wQgcNjR80T7SggtMnxPMViBiUR_Ye6jC-TIAOdy7wViPpJC8U0mJ0_li1URS0aW_pw3OnFyU_OvdQ"
                    alt="Sarah Miller"
                  />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-serif text-base text-[#2D2924] font-bold">
                        Sarah Miller
                      </span>
                      <span className="text-xs text-[#766F67]">• 15m ago</span>
                    </div>
                    <span className="text-xs text-[#766F67]">
                      Completed today's devotional reading
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-[#66805C]/15 border border-[#66805C]/30 px-3 py-1 rounded-full">
                  <span
                    className="material-symbols-outlined text-[15px] text-[#66805C]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    local_fire_department
                  </span>
                  <span className="text-xs font-bold text-[#66805C]">
                    6 days
                  </span>
                </div>
              </div>

              {/* Scripture Pill Highlight */}
              <div className="bg-[#F7F1E5] p-3.5 rounded-xl flex items-center justify-between gap-3 border border-[#E6DCCB]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-[#FFFDF8] border border-[#E6DCCB] flex items-center justify-center text-[#6B4F2A] shrink-0">
                    <span className="material-symbols-outlined text-[18px] text-[#D4A94D]">menu_book</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-[#2D2924] truncate">
                      John 15:1–11
                    </span>
                    <span className="font-serif text-xs text-[#766F67] italic truncate">
                      "I am the vine, you are the branches"
                    </span>
                  </div>
                </div>
                <button className="text-[#766F67] hover:text-[#6B4F2A] p-1 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">bookmark_add</span>
                </button>
              </div>

              {/* Encouragement Actions */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <button
                  onClick={() => toggleReaction('encourage')}
                  className={`min-h-[44px] flex items-center gap-1.5 py-2 px-3.5 rounded-full text-xs font-semibold transition-colors active:scale-95 border ${
                    reactions.encourage
                      ? 'bg-[#66805C]/15 text-[#66805C] border-[#66805C]/30'
                      : 'bg-[#F7F1E5] text-[#766F67] border-[#E6DCCB] hover:text-[#2D2924]'
                  }`}
                >
                  <span>❤️</span>
                  <span>Encourage ({reactions.encourage ? 5 : 4})</span>
                </button>
                <button
                  onClick={() => toggleReaction('celebrate')}
                  className={`min-h-[44px] flex items-center gap-1.5 py-2 px-3.5 rounded-full text-xs font-semibold transition-colors active:scale-95 border ${
                    reactions.celebrate
                      ? 'bg-[#66805C]/15 text-[#66805C] border-[#66805C]/30'
                      : 'bg-[#F7F1E5] text-[#766F67] border-[#E6DCCB] hover:text-[#2D2924]'
                  }`}
                >
                  <span>👏</span>
                  <span>Celebrate ({reactions.celebrate ? 3 : 2})</span>
                </button>
                <button
                  onClick={() => setPrayed(!prayed)}
                  className={`min-h-[44px] flex items-center gap-1.5 py-2 px-3.5 rounded-full text-xs font-semibold transition-colors active:scale-95 border ${
                    prayed
                      ? 'bg-[#66805C]/20 text-[#66805C] border-[#66805C]/40'
                      : 'bg-[#FFFDF8] text-[#6B4F2A] border-[#E6DCCB] hover:border-[#6B4F2A]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {prayed ? 'favorite' : 'volunteer_activism'}
                  </span>
                  <span>{prayed ? 'Prayed for you' : 'Pray'}</span>
                </button>
              </div>
            </div>

            {/* Feed Card 2: David Kim */}
            <div className="bg-[#FFFDF8] p-5 rounded-2xl shadow-2xs border border-[#E6DCCB] flex flex-col gap-3.5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    className="w-11 h-11 rounded-full object-cover shadow-2xs border border-[#E6DCCB]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGv-eodXSKoWyP595S03xZJHBItCiH5SECnebFDjk8mwZCfqwUDPDQ6JUumrapHNF39pA8MrSlyyQCyKEQnI-bLKXA7y0CpsMnq1G6w2VkMKI6XnajGxBtIBkEQZLUUipC56gURH43VMHgXwuqlJfv58fHFhA28qZdKDXCoMIrniunsWKZsfFyFjkpwPkdM7bTB7NisAFW4GhMt4oV8HB1MUY6VjR0zr7QSxu1N7A"
                    alt="David Kim"
                  />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-serif text-base text-[#2D2924] font-bold">
                        David Kim
                      </span>
                      <span className="text-xs text-[#766F67]">• 2h ago</span>
                    </div>
                    <span className="text-xs text-[#766F67]">Meditated on Romans 12:1–2</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-[#F7F1E5] px-3 py-1 rounded-full border border-[#E6DCCB]">
                  <span
                    className="material-symbols-outlined text-[15px] text-[#6B4F2A]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    eco
                  </span>
                  <span className="text-xs text-[#2D2924] font-semibold">
                    Day 14
                  </span>
                </div>
              </div>

              {/* Reflection Snippet */}
              <div className="bg-[#F7F1E5] p-4 rounded-xl flex flex-col gap-2 border border-[#E6DCCB]">
                <div className="flex items-center gap-1.5 text-[#6B4F2A]">
                  <span className="material-symbols-outlined text-[18px] text-[#D4A94D]">format_quote</span>
                  <span className="text-xs font-semibold text-[#2D2924]">
                    Personal Reflection
                  </span>
                </div>
                <p className="font-serif text-sm text-[#2D2924] italic pl-1 leading-relaxed">
                  "Renewing the mind today! Stepping away from social media noise to let grace recalibrate priorities before exams."
                </p>
              </div>

              {/* Quick Reactions */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleReaction('amen')}
                    className={`flex items-center gap-1 py-1.5 px-3.5 rounded-full text-xs font-semibold active:scale-95 transition-colors border ${
                      reactions.amen
                        ? 'bg-[#66805C]/15 text-[#66805C] border-[#66805C]/30'
                        : 'bg-[#F7F1E5] text-[#766F67] border-[#E6DCCB] hover:text-[#2D2924]'
                    }`}
                  >
                    <span>🙌</span>
                    <span>Amen ({reactions.amen ? 6 : 5})</span>
                  </button>
                  <button
                    onClick={() => toggleReaction('inspired')}
                    className={`flex items-center gap-1 py-1.5 px-3.5 rounded-full text-xs font-semibold active:scale-95 transition-colors border ${
                      reactions.inspired
                        ? 'bg-[#D4A94D]/20 text-[#6B4F2A] border-[#D4A94D]/40'
                        : 'bg-[#F7F1E5] text-[#766F67] border-[#E6DCCB] hover:text-[#2D2924]'
                    }`}
                  >
                    <span>✨</span>
                    <span>Inspired ({reactions.inspired ? 4 : 3})</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Feed Card 3: Fellowship Group */}
            <div className="bg-[#FFFDF8] p-5 rounded-2xl shadow-2xs border border-[#E6DCCB] flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#F7F1E5] border border-[#E6DCCB] flex items-center justify-center text-[#6B4F2A]">
                    <span className="material-symbols-outlined text-[22px]">diversity_3</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-base text-[#2D2924] font-bold">
                      Campus Fellowship Group
                    </span>
                    <span className="text-xs text-[#766F67]">Daily Community Milestone</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#66805C] bg-[#66805C]/15 border border-[#66805C]/30 px-3 py-1 rounded-full">
                  75% done
                </span>
              </div>

              {/* Group progress */}
              <div className="flex flex-col gap-2 bg-[#F7F1E5] p-3.5 rounded-xl border border-[#E6DCCB]">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#2D2924] font-medium">
                    18 of 24 members completed quiet time today
                  </span>
                  <span className="text-[#6B4F2A] font-bold">6 remaining</span>
                </div>
                <div className="w-full bg-[#E6DCCB] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#66805C] h-full rounded-full transition-all duration-700"
                    style={{ width: '75%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT / SECONDARY COLUMN (Search, Member Circle, Warm Nudge) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-5">
            
            {/* Friendly Search Bar */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#766F67]">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#FFFDF8] border border-[#E6DCCB] rounded-2xl text-xs sm:text-sm text-[#2D2924] placeholder:text-[#766F67] shadow-2xs focus:outline-none focus:border-[#6B4F2A] transition-all"
                placeholder="Search friends by name or ID"
                type="text"
              />
            </div>

            {/* Supportive Prompt: Nudge with Love */}
            <div className="bg-[#FFFDF8] p-5 rounded-2xl shadow-2xs border border-[#E6DCCB] border-l-4 border-l-[#A67C52] flex flex-col gap-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-[#6B4F2A] text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    spa
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#2D2924]">
                    Nudge with Love
                  </h3>
                </div>
                <span className="text-[11px] text-[#766F67] bg-[#F7F1E5] border border-[#E6DCCB] px-2.5 py-0.5 rounded-full font-medium">
                  Gentle check-in
                </span>
              </div>
              <p className="text-xs text-[#766F67] leading-relaxed">
                Accountability is walking together, never policing. Send warm support to keep spirits lifted.
              </p>

              {/* Michael check-in */}
              <div className="bg-[#F7F1E5] p-3.5 rounded-xl border border-[#E6DCCB] flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover shadow-2xs border border-[#E6DCCB]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo1x5rFNEoUZujph4cvbC7-lrq2PAXjdvVepcc8PWG93wzIg5PX2bGFXKnURFQRm9HqPfbaWzPDzRVdNSMZBUTsr5e3NOuo8-fcc4qwvQtFNu_-9MlcYhSxEF5vHjuh9Zaqs1LNgMCWAM302EzRdJkAqfXRSdqmSb5P0WdiHGKsQ0251mXtIBWNBJ6JruL6XUXUrQuuJygjsFNrzAMwSCga11qZaUV3jiugGrI5pE"
                    alt="Michael Chang"
                  />
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-serif text-sm font-bold text-[#2D2924] truncate">
                      Michael Chang
                    </span>
                    <span className="text-[11px] text-[#766F67]">Quiet time pending for today</span>
                  </div>
                </div>
                <div className="bg-[#FFFDF8] p-2.5 rounded-lg border border-[#E6DCCB]">
                  <p className="font-serif text-xs text-[#2D2924] italic leading-relaxed">
                    "Hey Michael, rooting for you today! Let's do quiet time whenever you're free."
                  </p>
                </div>
                <button
                  disabled={nudgeSent}
                  onClick={() => setNudgeSent(true)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold shadow-2xs active:scale-95 transition-all flex items-center justify-center gap-1.5 ${
                    nudgeSent
                      ? 'bg-[#66805C] text-[#FFFDF8]'
                      : 'bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {nudgeSent ? 'done' : 'send'}
                  </span>
                  <span>{nudgeSent ? 'Sent with Love ❤️' : 'Send Warm Nudge'}</span>
                </button>
              </div>
            </div>

            {/* Your Circle Members List */}
            <div className="bg-[#FFFDF8] p-5 rounded-2xl shadow-2xs border border-[#E6DCCB] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base font-bold text-[#2D2924]">
                  Circle Members (8)
                </h3>
                <span className="text-xs text-[#6B4F2A] font-semibold cursor-pointer">
                  Manage Circle
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {friendsList.map(friend => (
                  <div
                    key={friend.username}
                    className="p-3 rounded-xl bg-[#F7F1E5]/60 border border-[#E6DCCB] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative">
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-9 h-9 rounded-full object-cover border border-[#E6DCCB]"
                        />
                        {friend.completedToday && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#66805C] rounded-full ring-2 ring-[#FFFDF8] flex items-center justify-center text-[8px] text-[#FFFDF8]">
                            ✓
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-[#2D2924] truncate">
                          {friend.name}
                        </span>
                        <span className="text-[10px] text-[#766F67] truncate">
                          {friend.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#66805C] bg-[#FFFDF8] px-2 py-0.5 rounded-full border border-[#E6DCCB]">
                      🔥 {friend.streak}d
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sacred Commitment Footnote */}
            <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] text-center flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-[#D4A94D] text-[18px]">favorite</span>
              <p className="font-serif text-xs text-[#766F67] italic leading-relaxed">
                "As iron sharpens iron, so one person sharpens another." — Proverbs 27:17
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
