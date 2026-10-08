import React from 'react';
import { ChurchEvent } from '../../types';
import { EventPreviewCard } from './EventPreviewCard';
import { EmptyState } from './EmptyState';
import { useApp } from '../../context/AppContext';

interface UpcomingEventsProps {
  events: ChurchEvent[];
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  const { setCurrentTab } = useApp();

  return (
    <section className="flex flex-col gap-4 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4A94D]" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2924]">
              Upcoming Events
            </h2>
          </div>
          <p className="text-xs text-[#766F67] mt-0.5">
            Worship services, youth fellowship, and community service
          </p>
        </div>

        <button
          onClick={() => setCurrentTab('calendar')}
          className="min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#6B4F2A] hover:text-[#D4A94D] hover:bg-[#FFFDF8] border border-transparent hover:border-[#E6DCCB] transition-all flex items-center gap-1 shrink-0"
          type="button"
        >
          <span>View Calendar</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>

      {events.length === 0 ? (
        <EmptyState
          icon="event_busy"
          title="No upcoming events"
          description="There are no church events scheduled right now. Check back soon for fellowship gatherings."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map(event => (
            <EventPreviewCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
};
