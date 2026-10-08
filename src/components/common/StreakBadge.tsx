import React from 'react';
import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({
  streak,
  size = 'md',
  showLabel = true,
  className = ''
}) => {
  const isCompact = size === 'sm';
  const isLarge = size === 'lg';

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold transition-colors border ${
        streak > 0
          ? 'bg-[#66805C]/15 text-[#66805C] border-[#66805C]/30'
          : 'bg-[#F7F1E5] text-[#766F67] border-[#E6DCCB]'
      } ${
        isCompact
          ? 'px-2 py-0.5 text-xs'
          : isLarge
          ? 'px-4 py-2 text-base shadow-xs'
          : 'px-2.5 py-1 text-xs'
      } ${className}`}
    >
      <Flame
        className={`${
          isCompact ? 'w-3.5 h-3.5' : isLarge ? 'w-5 h-5' : 'w-4 h-4'
        } ${streak > 0 ? 'text-[#66805C] fill-[#66805C]' : 'text-[#766F67]'}`}
      />
      <span className="tabular-nums font-bold">{streak}</span>
      {showLabel && (
        <span className="font-medium text-[#766F67]">
          {streak === 1 ? 'day streak' : 'days'}
        </span>
      )}
    </div>
  );
};
