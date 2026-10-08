import React from 'react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "We couldn't load your dashboard.",
  message = "Please check your network connection and try again.",
  onRetry,
  className = ''
}) => {
  return (
    <div
      className={`p-6 sm:p-10 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] text-center flex flex-col items-center justify-center gap-3 shadow-2xs ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#B85C50]/10 text-[#B85C50] border border-[#B85C50]/20 flex items-center justify-center">
        <span className="material-symbols-outlined text-[28px]">refresh</span>
      </div>
      <h3 className="font-serif text-lg font-bold text-[#2D2924]">{title}</h3>
      <p className="text-xs sm:text-sm text-[#766F67] max-w-sm leading-relaxed font-sans">{message}</p>
      <button
        onClick={onRetry}
        className="mt-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] text-xs font-bold transition-all active:scale-95 flex items-center gap-2 shadow-xs"
        type="button"
      >
        <span className="material-symbols-outlined text-[18px]">replay</span>
        <span>Try Again</span>
      </button>
    </div>
  );
};
