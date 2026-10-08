import React, { useState } from 'react';
import {
  Heart,
  Plus,
  CheckCircle2,
  Trash2,
  Calendar,
  Lock,
  Search,
  Check,
  Edit2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PrayerCategory, PrayerItem } from '../../types';
import { validatePrayerInput } from '../../utils/validation';

export const PrayerScreen: React.FC = () => {
  const { prayers, addPrayer, deletePrayer, toggleAnsweredPrayer, startReading } = useApp();

  const [activeTab, setActiveTab] = useState<'active' | 'answered'>('active');
  const [isNewPrayerModalOpen, setIsNewPrayerModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Form state
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState<PrayerCategory>('Petition');

  // Answered prayer note modal state
  const [answeringPrayerId, setAnsweringPrayerId] = useState<string | null>(null);
  const [answeredNote, setAnsweredNote] = useState('');
  const [prayerError, setPrayerError] = useState('');

  const handleCreatePrayer = (e: React.FormEvent) => {
    e.preventDefault();
    setPrayerError('');

    const validation = validatePrayerInput(title, body);
    if (!validation.isValid) {
      setPrayerError(validation.error || 'Please enter a valid prayer title or body.');
      return;
    }

    addPrayer({
      title: validation.sanitizedTitle,
      body: validation.sanitizedBody,
      category,
      isAnswered: false
    });

    setTitle('');
    setBody('');
    setCategory('Petition');
    setPrayerError('');
    setIsNewPrayerModalOpen(false);
  };

  const handleConfirmAnswered = (prayerId: string) => {
    toggleAnsweredPrayer(prayerId, answeredNote.trim() || undefined);
    setAnsweringPrayerId(null);
    setAnsweredNote('');
  };

  const filteredPrayers = prayers.filter(p => {
    const matchesTab = activeTab === 'active' ? !p.isAnswered : p.isAnswered;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.body.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesTab && matchesSearch && matchesCategory;
  });

  const categoriesList: PrayerCategory[] = [
    'Petition',
    'Gratitude',
    'Guidance',
    'Peace',
    'Praise',
    'Intercession'
  ];

  return (
    <div className="flex flex-col w-full pb-20 md:pb-12 pt-3 md:pt-6 bg-[#F7F1E5] font-sans">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A67C52] mb-1">
              <span>Personal Quiet Time</span>
              <span>•</span>
              <span className="text-[#6B4F2A] font-bold flex items-center gap-1">
                <Lock className="w-3 h-3" />
                100% Private
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2D2924] tracking-tight">
              Personal Prayer Journal
            </h1>
            <p className="text-xs sm:text-sm text-[#766F67] mt-0.5 max-w-xl">
              Pour out your heart to God in secret. Track ongoing petitions and celebrate answered prayers.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setIsNewPrayerModalOpen(true)}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>New Prayer</span>
            </button>
          </div>
        </div>

        {/* Confidentiality Assurance Card */}
        <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] border-l-4 border-l-[#66805C] shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#66805C]/15 text-[#66805C] flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif text-xs font-bold text-[#2D2924]">
              Private &amp; Personal Prayer Space
            </h2>
            <p className="text-[11px] text-[#766F67]">
              “When you pray, go into your inner room, close your door, and pray to your Father who is in secret.” — Matthew 6:6
            </p>
          </div>
        </div>

        {/* Tab & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Active vs Answered Toggle */}
          <div className="flex items-center p-1 bg-[#FFFDF8] rounded-full border border-[#E6DCCB] shadow-2xs max-w-xs">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 min-h-[40px] px-4 rounded-full text-xs font-bold transition-all ${
                activeTab === 'active'
                  ? 'bg-[#6B4F2A] text-[#FFFDF8] shadow-xs'
                  : 'text-[#766F67] hover:text-[#2D2924]'
              }`}
            >
              Active Prayers ({prayers.filter(p => !p.isAnswered).length})
            </button>
            <button
              onClick={() => setActiveTab('answered')}
              className={`flex-1 min-h-[40px] px-4 rounded-full text-xs font-bold transition-all ${
                activeTab === 'answered'
                  ? 'bg-[#66805C] text-[#FFFDF8] shadow-xs'
                  : 'text-[#766F67] hover:text-[#2D2924]'
              }`}
            >
              Answered ({prayers.filter(p => p.isAnswered).length})
            </button>
          </div>

          {/* Search & Category Filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-4 h-4 text-[#766F67] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search prayers..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#FFFDF8] border border-[#E6DCCB] focus:outline-none focus:border-[#6B4F2A]"
              />
            </div>

            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="py-2 px-3 text-xs rounded-xl bg-[#FFFDF8] border border-[#E6DCCB] text-[#2D2924] focus:outline-none focus:border-[#6B4F2A]"
            >
              <option value="all">All Categories</option>
              {categoriesList.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Prayers Grid */}
        {filteredPrayers.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] text-center space-y-4 shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-[#A67C52]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-[#2D2924]">
                {activeTab === 'active' ? 'No active prayers found' : 'No answered prayers yet'}
              </h3>
              <p className="text-xs text-[#766F67] max-w-sm mx-auto">
                {activeTab === 'active'
                  ? 'Add your heart burdens, praises, and petitions. God is near and listening.'
                  : 'When God answers your prayers, mark them as answered to remember His faithfulness.'}
              </p>
            </div>
            {activeTab === 'active' && (
              <button
                onClick={() => setIsNewPrayerModalOpen(true)}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Write a Prayer</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredPrayers.map(prayer => {
              const formattedDate = new Date(prayer.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <div
                  key={prayer.id}
                  className={`p-5 rounded-3xl bg-[#FFFDF8] border transition-all shadow-2xs flex flex-col justify-between gap-4 ${
                    prayer.isAnswered ? 'border-[#66805C]/40' : 'border-[#E6DCCB] hover:border-[#A67C52]'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        prayer.category === 'Gratitude' || prayer.category === 'Praise'
                          ? 'bg-[#D4A94D]/15 text-[#6B4F2A] border-[#D4A94D]/30'
                          : prayer.category === 'Guidance'
                          ? 'bg-[#66805C]/15 text-[#66805C] border-[#66805C]/30'
                          : 'bg-[#F7F1E5] text-[#A67C52] border-[#E6DCCB]'
                      }`}>
                        {prayer.category}
                      </span>

                      <div className="flex items-center gap-1 text-[11px] text-[#766F67]">
                        <span>{formattedDate}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-base font-bold text-[#2D2924] leading-snug">
                      {prayer.title}
                    </h3>

                    <p className="text-xs text-[#766F67] leading-relaxed line-clamp-4">
                      {prayer.body}
                    </p>

                    {prayer.linkedScripture && (
                      <span className="inline-block text-[11px] font-semibold text-[#6B4F2A] bg-[#F7F1E5] px-2.5 py-0.5 rounded-md border border-[#E6DCCB]">
                        Scripture: {prayer.linkedScripture}
                      </span>
                    )}

                    {prayer.isAnswered && prayer.answeredNote && (
                      <div className="p-3 rounded-2xl bg-[#66805C]/10 border border-[#66805C]/25 text-xs text-[#2D2924] space-y-1">
                        <span className="font-bold text-[10px] text-[#66805C] uppercase tracking-wide flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" />
                          Answered Testimony
                        </span>
                        <p className="text-[11px] text-[#2D2924] italic leading-relaxed">
                          {prayer.answeredNote}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card footer actions */}
                  <div className="pt-3 border-t border-[#E6DCCB]/60 flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (!prayer.isAnswered) {
                          setAnsweringPrayerId(prayer.id);
                        } else {
                          toggleAnsweredPrayer(prayer.id);
                        }
                      }}
                      className={`min-h-[38px] px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        prayer.isAnswered
                          ? 'bg-[#66805C]/15 text-[#66805C] hover:bg-[#66805C]/25'
                          : 'bg-[#F7F1E5] text-[#6B4F2A] hover:bg-[#6B4F2A] hover:text-[#FFFDF8] border border-[#E6DCCB]'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{prayer.isAnswered ? 'Answered ✓' : 'Mark Answered'}</span>
                    </button>

                    <button
                      onClick={() => deletePrayer(prayer.id)}
                      className="text-[#766F67] hover:text-[#B85C50] p-1.5 rounded-lg transition-colors"
                      title="Delete prayer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* NEW PRAYER MODAL */}
        {isNewPrayerModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="w-full max-w-lg bg-[#FFFDF8] text-[#2D2924] rounded-3xl border border-[#E6DCCB] shadow-2xl p-6 sm:p-7 space-y-5 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-[#E6DCCB]">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2D2924]">
                    New Private Prayer
                  </h3>
                  <p className="text-xs text-[#766F67]">
                    Confidential to you and the Lord.
                  </p>
                </div>
                <button
                  onClick={() => setIsNewPrayerModalOpen(false)}
                  className="text-xs font-semibold text-[#766F67] hover:text-[#2D2924]"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleCreatePrayer} className="space-y-4">
                {prayerError && (
                  <div className="p-3 rounded-xl bg-[#B85C50]/10 border border-[#B85C50]/30 text-[#B85C50] text-xs font-semibold">
                    {prayerError}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-[#2D2924] mb-1">
                    Prayer Title / Focus
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Peace amidst exams, Family health, Guidance for future..."
                    className="w-full text-xs p-3 rounded-xl border border-[#E6DCCB] bg-[#F7F1E5]/30 text-[#2D2924] focus:outline-none focus:border-[#6B4F2A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2924] mb-1">
                    Category
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {categoriesList.map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`min-h-[38px] p-2 rounded-xl text-xs font-semibold border transition-all ${
                          category === cat
                            ? 'bg-[#6B4F2A] text-[#FFFDF8] border-[#6B4F2A]'
                            : 'bg-[#FFFDF8] text-[#766F67] border-[#E6DCCB] hover:border-[#6B4F2A]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2924] mb-1">
                    Your Prayer
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    placeholder="Father, I come to You today asking for Your hand and peace..."
                    className="w-full text-xs p-3 rounded-xl border border-[#E6DCCB] bg-[#F7F1E5]/30 text-[#2D2924] focus:outline-none focus:border-[#6B4F2A] resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNewPrayerModalOpen(false)}
                    className="min-h-[44px] px-4 rounded-xl text-xs font-semibold text-[#766F67] hover:text-[#2D2924]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="min-h-[44px] px-6 rounded-xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] text-xs font-bold shadow-sm"
                  >
                    Save Prayer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ANSWERED PRAYER NOTE MODAL */}
        {answeringPrayerId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="w-full max-w-md bg-[#FFFDF8] text-[#2D2924] rounded-3xl border border-[#E6DCCB] shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#66805C] uppercase tracking-wide">
                  God’s Faithfulness
                </span>
                <h3 className="font-serif text-lg font-bold text-[#2D2924]">
                  Record How God Answered
                </h3>
                <p className="text-xs text-[#766F67]">
                  Optional: write a brief testimony or date of how God met you in this prayer.
                </p>
              </div>

              <textarea
                rows={4}
                value={answeredNote}
                onChange={e => setAnsweredNote(e.target.value)}
                placeholder="e.g. Received confirmation on Friday, experienced His deep peace guarding my heart..."
                className="w-full text-xs p-3 rounded-xl border border-[#E6DCCB] bg-[#F7F1E5]/30 text-[#2D2924] focus:outline-none focus:border-[#66805C] resize-none leading-relaxed"
              />

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAnsweringPrayerId(null)}
                  className="min-h-[44px] px-4 rounded-xl text-xs font-semibold text-[#766F67]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleConfirmAnswered(answeringPrayerId)}
                  className="min-h-[44px] px-5 rounded-xl bg-[#66805C] hover:bg-[#52694a] text-[#FFFDF8] text-xs font-bold shadow-sm"
                >
                  Mark as Answered ✓
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
