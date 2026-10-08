import React, { useState } from 'react';
import { ChurchEvent } from '../../types';

interface EventPreviewCardProps {
  event: ChurchEvent;
  onToggleRsvp?: (eventId: string, nextState: boolean) => void;
}

export const EventPreviewCard: React.FC<EventPreviewCardProps> = ({
  event,
  onToggleRsvp
}) => {
  const [isRsvpd, setIsRsvpd] = useState<boolean>(Boolean(event.isUserRsvpd));
  const [attendeeCount, setAttendeeCount] = useState<number>(event.attendeesCount);

  const handleRsvpClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isRsvpd;
    setIsRsvpd(nextState);
    setAttendeeCount(prev => (nextState ? prev + 1 : Math.max(0, prev - 1)));
    if (onToggleRsvp) {
      onToggleRsvp(event.id, nextState);
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] hover:border-[#6B4F2A] shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-3 group">
      <div className="flex items-start gap-3.5">
        {/* Date block badge */}
        <div className="w-13 h-14 rounded-2xl bg-[#F7F1E5] border border-[#E6DCCB] flex flex-col items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#A67C52] leading-none">
            {event.month}
          </span>
          <span className="font-serif text-xl font-bold text-[#6B4F2A] leading-tight mt-0.5">
            {event.day}
          </span>
        </div>

        {/* Event Details */}
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-bold text-[#A67C52] bg-[#F7F1E5] px-2 py-0.5 rounded-full border border-[#E6DCCB] uppercase tracking-wider">
              {event.category}
            </span>
          </div>

          <h3 className="font-serif text-base sm:text-lg font-bold text-[#2D2924] leading-snug group-hover:text-[#6B4F2A] transition-colors">
            {event.title}
          </h3>

          <div className="flex flex-col gap-1 text-xs text-[#766F67] font-sans mt-1.5">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#D4A94D]">schedule</span>
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#A67C52]">location_on</span>
              <span className="truncate">{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Attendees & Quick RSVP button */}
      <div className="flex items-center justify-between pt-2.5 border-t border-[#E6DCCB]/60 text-xs font-sans">
        <span className="text-[#766F67] flex items-center gap-1">
          <span className="material-symbols-outlined text-[15px] text-[#66805C]">group</span>
          <span>{attendeeCount} going</span>
        </span>

        <button
          onClick={handleRsvpClick}
          className={`min-h-[40px] px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all active:scale-95 border ${
            isRsvpd
              ? 'bg-[#66805C]/15 text-[#66805C] border-[#66805C]/30 hover:bg-[#66805C]/20'
              : 'bg-[#FFFDF8] text-[#6B4F2A] border-[#E6DCCB] hover:border-[#6B4F2A] hover:bg-[#F7F1E5]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">
            {isRsvpd ? 'check' : 'add'}
          </span>
          <span>{isRsvpd ? 'Attending ✓' : 'RSVP'}</span>
        </button>
      </div>
    </div>
  );
};
