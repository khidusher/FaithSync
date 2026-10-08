import React from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inbox',
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] text-center flex flex-col items-center justify-center gap-2.5 ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] flex items-center justify-center">
        <span className="material-symbols-outlined text-[24px] text-[#A67C52]">{icon}</span>
      </div>
      <h3 className="font-serif text-base font-bold text-[#2D2924]">{title}</h3>
      <p className="text-xs text-[#766F67] max-w-sm leading-relaxed font-sans">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-2 min-h-[44px] px-4 py-2 rounded-xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] text-xs font-bold transition-all active:scale-95"
          type="button"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
