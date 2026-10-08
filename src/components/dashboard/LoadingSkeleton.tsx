import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 animate-pulse w-full max-w-md md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Welcome Card Skeleton */}
      <div className="h-40 rounded-3xl bg-[#E6DCCB]/40 border border-[#E6DCCB]" />

      {/* Quick Actions Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="h-20 rounded-2xl bg-[#E6DCCB]/30 border border-[#E6DCCB]" />
        ))}
      </div>

      {/* Grid Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          <div className="h-64 rounded-2xl bg-[#E6DCCB]/30 border border-[#E6DCCB]" />
          <div className="h-64 rounded-2xl bg-[#E6DCCB]/30 border border-[#E6DCCB]" />
        </div>
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          <div className="h-48 rounded-2xl bg-[#E6DCCB]/30 border border-[#E6DCCB]" />
          <div className="h-56 rounded-2xl bg-[#E6DCCB]/30 border border-[#E6DCCB]" />
        </div>
      </div>
    </div>
  );
};
