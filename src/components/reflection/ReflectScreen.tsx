import React, { useState } from 'react';
import {
  Edit3,
  BookOpen,
  Sparkles,
  Check,
  Save,
  ArrowRight,
  Heart,
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { validateReflectionText } from '../../utils/validation';

export const ReflectScreen: React.FC = () => {
  const {
    todayPassageDay,
    markReadingComplete,
    completions,
    startReading,
    setCurrentTab
  } = useApp();

  const [whatStoodOut, setWhatStoodOut] = useState('');
  const [godTeaching, setGodTeaching] = useState('');
  const [application, setApplication] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

  const { passage, title, scriptureReference } = todayPassageDay;

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanStoodOut = validateReflectionText(whatStoodOut, 5000, 'What stood out').sanitized;
    const cleanTeaching = validateReflectionText(godTeaching, 5000, 'What God is teaching').sanitized;
    const cleanApp = validateReflectionText(application, 5000, 'Application').sanitized;

    markReadingComplete({
      reflectionWhatStoodOut: cleanStoodOut,
      reflectionGodTeaching: cleanTeaching,
      reflectionApplication: cleanApp,
      notes: [cleanStoodOut, cleanTeaching, cleanApp].filter(Boolean).join('\n\n'),
      keyVerse: passage.keyVerse
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Past reflections that have written reflections or notes
  const pastReflections = completions.filter(
    c => c.reflectionWhatStoodOut || c.reflectionGodTeaching || c.reflectionApplication || c.notes
  );

  return (
    <div className="flex flex-col w-full pb-20 md:pb-12 pt-3 md:pt-6 bg-[#F7F1E5] font-sans">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A67C52] mb-1">
              <span>Personal Quiet Time</span>
              <span>•</span>
              <span className="text-[#6B4F2A] font-bold">Reflection Space</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2D2924] tracking-tight">
              Reflect &amp; Listen
            </h1>
            <p className="text-xs sm:text-sm text-[#766F67] mt-0.5 max-w-xl">
              Write down what God is impressing on your heart through Scripture. Your notes are completely private.
            </p>
          </div>

          <button
            onClick={() => startReading()}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Today's Passage</span>
          </button>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* MAIN COLUMN: 3 Prompts Form (lg: 7 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            
            {/* Today's Passage Context Pill */}
            <div className="p-5 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#6B4F2A] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  {scriptureReference}
                </span>
                <span className="text-[#766F67]">{title}</span>
              </div>
              <p className="font-serif text-xs text-[#2D2924] italic leading-relaxed">
                “{passage.keyVerse}”
              </p>
            </div>

            {/* 3 Prompts Form */}
            <form onSubmit={handleSaveReflection} className="p-6 sm:p-7 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs space-y-6">
              <div className="border-b border-[#E6DCCB] pb-3 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#2D2924]">
                    Today’s Reflection Prompts
                  </h2>
                  <p className="text-xs text-[#766F67]">
                    Take your time with each prompt. Write as much or as little as you need.
                  </p>
                </div>

                {isSaved && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#66805C]/15 text-[#66805C] text-xs font-bold animate-in fade-in">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    Saved to Journal
                  </span>
                )}
              </div>

              {/* Prompt 1 */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-[#2D2924]">
                  <span className="w-5 h-5 rounded-full bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span>What stood out to me?</span>
                </label>
                <p className="text-[11px] text-[#766F67] pl-7">
                  A verse, phrase, or word in {scriptureReference} that caught your attention.
                </p>
                <textarea
                  rows={3}
                  value={whatStoodOut}
                  onChange={e => setWhatStoodOut(e.target.value)}
                  placeholder="Record verses, phrases, or thoughts that resonated with you today..."
                  className="w-full text-xs p-3.5 rounded-2xl border border-[#E6DCCB] bg-[#F7F1E5]/30 text-[#2D2924] placeholder:text-[#766F67]/60 focus:outline-none focus:border-[#6B4F2A] focus:bg-[#FFFDF8] transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Prompt 2 */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-[#2D2924]">
                  <span className="w-5 h-5 rounded-full bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>What is God teaching me?</span>
                </label>
                <p className="text-[11px] text-[#766F67] pl-7">
                  What does this reveal about God's character, grace, or ways?
                </p>
                <textarea
                  rows={3}
                  value={godTeaching}
                  onChange={e => setGodTeaching(e.target.value)}
                  placeholder="What truth about Jesus or your identity in Him is being highlighted?..."
                  className="w-full text-xs p-3.5 rounded-2xl border border-[#E6DCCB] bg-[#F7F1E5]/30 text-[#2D2924] placeholder:text-[#766F67]/60 focus:outline-none focus:border-[#6B4F2A] focus:bg-[#FFFDF8] transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Prompt 3 */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-[#2D2924]">
                  <span className="w-5 h-5 rounded-full bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] flex items-center justify-center text-[10px]">
                    3
                  </span>
                  <span>How can I apply this today?</span>
                </label>
                <p className="text-[11px] text-[#766F67] pl-7">
                  One concrete attitude, prayer, or step of obedience to walk out.
                </p>
                <textarea
                  rows={3}
                  value={application}
                  onChange={e => setApplication(e.target.value)}
                  placeholder="How will this change your conversations, reactions, or trust today?..."
                  className="w-full text-xs p-3.5 rounded-2xl border border-[#E6DCCB] bg-[#F7F1E5]/30 text-[#2D2924] placeholder:text-[#766F67]/60 focus:outline-none focus:border-[#6B4F2A] focus:bg-[#FFFDF8] transition-colors resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#766F67]">
                  Private &amp; saved to your journal
                </span>
                <button
                  type="submit"
                  className="min-h-[46px] px-6 rounded-xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-98"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Reflection</span>
                </button>
              </div>
            </form>
          </div>

          {/* SIDEBAR COLUMN: Past Reflections Archive (lg: 5 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            
            {/* Past Reflections Card */}
            <div className="p-6 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E6DCCB]/60 pb-3">
                <h3 className="font-serif text-base font-bold text-[#2D2924]">
                  Past Reflections
                </h3>
                <span className="text-xs text-[#766F67] bg-[#F7F1E5] px-2.5 py-0.5 rounded-full border border-[#E6DCCB]">
                  {pastReflections.length} Entries
                </span>
              </div>

              {pastReflections.length === 0 ? (
                <div className="text-center py-6 text-xs text-[#766F67] space-y-2">
                  <Edit3 className="w-8 h-8 text-[#A67C52] mx-auto opacity-60" />
                  <p>No past reflections recorded yet.</p>
                  <p className="text-[11px] text-[#766F67]">
                    Complete today's prompts to build your personal spiritual archive.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pastReflections.slice(0, 5).map(item => {
                    const isExpanded = expandedSessionId === item.id;
                    const formattedDate = new Date(item.completedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    });

                    return (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl bg-[#F7F1E5]/50 border border-[#E6DCCB] space-y-2 transition-all"
                      >
                        <div
                          onClick={() => setExpandedSessionId(isExpanded ? null : item.id)}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <div>
                            <span className="font-serif text-xs font-bold text-[#2D2924]">
                              {item.scriptureReference}
                            </span>
                            <p className="text-[10px] text-[#766F67]">{formattedDate}</p>
                          </div>
                          <button
                            type="button"
                            className="text-[#6B4F2A] hover:text-[#573f21] p-1"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="pt-2 border-t border-[#E6DCCB] space-y-2 text-xs text-[#2D2924] animate-in fade-in">
                            {item.reflectionWhatStoodOut && (
                              <div>
                                <span className="font-bold text-[10px] text-[#6B4F2A] uppercase">
                                  Stood out:
                                </span>
                                <p className="text-[11px] text-[#766F67]">{item.reflectionWhatStoodOut}</p>
                              </div>
                            )}
                            {item.reflectionGodTeaching && (
                              <div>
                                <span className="font-bold text-[10px] text-[#6B4F2A] uppercase">
                                  Teaching:
                                </span>
                                <p className="text-[11px] text-[#766F67]">{item.reflectionGodTeaching}</p>
                              </div>
                            )}
                            {item.reflectionApplication && (
                              <div>
                                <span className="font-bold text-[10px] text-[#6B4F2A] uppercase">
                                  Application:
                                </span>
                                <p className="text-[11px] text-[#766F67]">{item.reflectionApplication}</p>
                              </div>
                            )}
                            {item.notes && !item.reflectionWhatStoodOut && (
                              <p className="text-[11px] text-[#766F67]">{item.notes}</p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Link to Quiet Time Journal */}
            <div className="p-5 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs flex items-center justify-between">
              <div>
                <h4 className="font-serif text-xs font-bold text-[#2D2924]">
                  Full Quiet Time Journal
                </h4>
                <p className="text-[11px] text-[#766F67]">
                  View calendar &amp; all past quiet times
                </p>
              </div>
              <button
                onClick={() => setCurrentTab('journal')}
                className="text-xs font-bold text-[#6B4F2A] hover:text-[#573f21] flex items-center gap-1"
              >
                <span>Open</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
