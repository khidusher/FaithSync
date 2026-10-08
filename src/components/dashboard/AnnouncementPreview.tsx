import React, { useState } from 'react';
import { ChurchAnnouncement } from '../../types';
import { AnnouncementCard } from './AnnouncementCard';
import { EmptyState } from './EmptyState';

interface AnnouncementPreviewProps {
  announcements: ChurchAnnouncement[];
}

export const AnnouncementPreview: React.FC<AnnouncementPreviewProps> = ({ announcements }) => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<ChurchAnnouncement | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(announcements.map(a => a.category)))];

  const filteredAnnouncements = filterCategory === 'all'
    ? announcements
    : announcements.filter(a => a.category === filterCategory);

  return (
    <section id="announcements-section" className="flex flex-col gap-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4A94D]" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2924]">
              Church Announcements
            </h2>
          </div>
          <p className="text-xs text-[#766F67] mt-0.5">
            Important updates from pastoral leadership and ministry teams
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`min-h-[36px] px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-all border ${
                filterCategory === cat
                  ? 'bg-[#6B4F2A] text-[#FFFDF8] border-[#6B4F2A] shadow-xs'
                  : 'bg-[#FFFDF8] text-[#766F67] border-[#E6DCCB] hover:text-[#2D2924]'
              }`}
              type="button"
            >
              {cat === 'all' ? 'All Updates' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards List or Empty State */}
      {filteredAnnouncements.length === 0 ? (
        <EmptyState
          icon="campaign"
          title="No announcements yet"
          description="There are no announcements posted in this category at this time. Check back soon for church updates."
          actionLabel="Show All Updates"
          onAction={() => setFilterCategory('all')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAnnouncements.map(announcement => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onReadMore={setSelectedAnnouncement}
            />
          ))}
        </div>
      )}

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#FFFDF8] text-[#2D2924] rounded-3xl border border-[#E6DCCB] shadow-2xl p-6 sm:p-7 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E6DCCB]">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-[#A67C52] uppercase tracking-wider font-sans">
                  {selectedAnnouncement.category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2924] leading-snug">
                  {selectedAnnouncement.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                aria-label="Close announcement"
                className="min-h-[44px] min-w-[44px] -mr-2 -mt-2 rounded-full flex items-center justify-center text-[#766F67] hover:text-[#2D2924] hover:bg-[#F7F1E5] transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Author & Date metadata */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F7F1E5] border border-[#E6DCCB] text-xs font-sans">
              <div className="w-8 h-8 rounded-full bg-[#FFFDF8] border border-[#E6DCCB] flex items-center justify-center text-[#6B4F2A]">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#2D2924]">
                  {selectedAnnouncement.author || 'Church Pastoral Team'}
                </span>
                <span className="text-[11px] text-[#766F67]">
                  {selectedAnnouncement.authorRole || 'Community Leadership'} · {selectedAnnouncement.date}
                </span>
              </div>
            </div>

            {/* Full text content */}
            <div className="font-sans text-sm text-[#2D2924] leading-relaxed space-y-3 py-1">
              <p>{selectedAnnouncement.fullText || selectedAnnouncement.preview}</p>
            </div>

            {/* Footer action */}
            <div className="pt-3 border-t border-[#E6DCCB] flex items-center justify-end">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="min-h-[44px] px-5 py-2 rounded-xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] text-xs font-bold transition-all active:scale-95"
                type="button"
              >
                Close Announcement
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
