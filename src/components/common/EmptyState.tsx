import React from 'react';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'spa',
  title,
  description,
  actionText,
  onAction,
  className = ''
}) => {
  return (
    <div
      className={`p-8 sm:p-10 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] text-center flex flex-col items-center justify-center gap-3 shadow-2xs font-sans ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] flex items-center justify-center shadow-2xs">
        <span className="material-symbols-outlined text-[28px] text-[#A67C52]">{icon}</span>
      </div>

      <div className="max-w-xs space-y-1">
        <h3 className="font-serif text-lg font-bold text-[#2D2924]">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#766F67] leading-relaxed">
          {description}
        </p>
      </div>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-4 py-2 rounded-xl bg-[#F7F1E5] text-[#6B4F2A] hover:bg-[#6B4F2A] hover:text-[#FFFDF8] border border-[#E6DCCB] text-xs font-bold transition-all active:scale-95 shadow-2xs"
          type="button"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
