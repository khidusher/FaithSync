import React from 'react';
import { ChurchAnnouncement } from '../../types';

interface AnnouncementCardProps {
  announcement: ChurchAnnouncement;
  onReadMore: (announcement: ChurchAnnouncement) => void;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcement,
  onReadMore
}) => {
  const getPriorityBadge = (priority: ChurchAnnouncement['priority']) => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D4A94D]/20 text-[#6B4F2A] border border-[#D4A94D]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A94D] animate-pulse" />
            High Priority
          </span>
        );
      case 'important':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#A67C52]/15 text-[#6B4F2A] border border-[#A67C52]/30">
            Important
          </span>
        );
      case 'general':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#F7F1E5] text-[#766F67] border border-[#E6DCCB]">
            Announcement
          </span>
        );
    }
  };

  return (
    <article
      onClick={() => onReadMore(announcement)}
      className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] hover:border-[#6B4F2A] transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between gap-3 cursor-pointer group active:scale-[0.99]"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#A67C52] uppercase tracking-wider font-sans">
              {announcement.category}
            </span>
            {announcement.pinned && (
              <span className="flex items-center text-[#D4A94D] text-xs" title="Pinned Announcement">
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  keep
                </span>
              </span>
            )}
          </div>
          {getPriorityBadge(announcement.priority)}
        </div>

        <h3 className="font-serif text-base sm:text-lg font-bold text-[#2D2924] group-hover:text-[#6B4F2A] transition-colors leading-snug">
          {announcement.title}
        </h3>

        <p className="text-xs sm:text-sm text-[#766F67] leading-relaxed font-sans line-clamp-2">
          {announcement.preview}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#E6DCCB]/60 text-xs font-sans">
        <div className="flex items-center gap-1.5 text-[#766F67]">
          <span className="material-symbols-outlined text-[15px]">event</span>
          <span>{announcement.date}</span>
          {announcement.author && (
            <>
              <span>•</span>
              <span className="truncate max-w-[120px]">{announcement.author}</span>
            </>
          )}
        </div>

        <span className="text-xs font-bold text-[#6B4F2A] group-hover:text-[#D4A94D] flex items-center gap-0.5 transition-colors">
          <span>Read</span>
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
            chevron_right
          </span>
        </span>
      </div>
    </article>
  );
};
