import React from 'react';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  count = 1
}) => {
  const baseClasses = 'animate-pulse bg-[#E6DCCB]/60 rounded-xl';

  const variantClasses = {
    text: 'h-4 w-full rounded-md',
    circular: 'rounded-full aspect-square',
    rectangular: 'h-24 w-full rounded-2xl',
    card: 'h-40 w-full rounded-2xl border border-[#E6DCCB] bg-[#FFFDF8] p-5 flex flex-col justify-between'
  };

  if (variant === 'card') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs space-y-3 animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E6DCCB]/60" />
              <div className="space-y-1.5 flex-1">
                <div className="h-4 bg-[#E6DCCB]/60 rounded w-1/3" />
                <div className="h-3 bg-[#E6DCCB]/40 rounded w-1/4" />
              </div>
            </div>
            <div className="h-12 bg-[#F7F1E5] rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        />
      ))}
    </>
  );
};
