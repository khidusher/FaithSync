import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_EVENTS } from '../../data/dashboardData';
import { EventPreviewCard } from '../dashboard/EventPreviewCard';

export const EventsScreen: React.FC = () => {
  const { setCurrentTab } = useApp();
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', 'Worship', 'Youth & Campus', 'Prayer', 'Outreach'];

  const filteredEvents = filter === 'all'
    ? SAMPLE_EVENTS
    : SAMPLE_EVENTS.filter(e => e.category.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="flex flex-col w-full pb-20 md:pb-12 pt-3 md:pt-6 bg-[#F7F1E5]">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 font-sans">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <button
                onClick={() => setCurrentTab('home')}
                className="text-xs font-semibold text-[#A67C52] hover:text-[#6B4F2A] flex items-center gap-1"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Dashboard</span>
              </button>
              <span className="text-[#766F67]">•</span>
              <span className="text-xs font-bold text-[#6B4F2A]">Church Gatherings</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2D2924] tracking-tight">
              Events &amp; Gatherings
            </h1>
            <p className="text-xs sm:text-sm text-[#766F67] mt-0.5">
              Connect in person with your church family throughout the week.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`min-h-[36px] px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-all border ${
                  filter === cat
                    ? 'bg-[#6B4F2A] text-[#FFFDF8] border-[#6B4F2A] shadow-xs'
                    : 'bg-[#FFFDF8] text-[#766F67] border-[#E6DCCB] hover:text-[#2D2924]'
                }`}
                type="button"
              >
                {cat === 'all' ? 'All Events' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Future Segment Notice Banner */}
        <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] border-l-4 border-l-[#D4A94D] shadow-2xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F7F1E5] text-[#D4A94D] flex items-center justify-center shrink-0 border border-[#E6DCCB]">
              <span className="material-symbols-outlined text-[22px]">calendar_month</span>
            </div>
            <div>
              <h2 className="font-serif text-sm font-bold text-[#2D2924]">
                Church Event Calendar &amp; RSVP Preview
              </h2>
              <p className="text-xs text-[#766F67]">
                Browse service times and RSVP below. Full event ticketing and check-in workflows arrive in Segment 5.
              </p>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map(event => (
            <EventPreviewCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};
