import React from 'react';

interface GoogleSignInButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onClick, isLoading }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={isLoading}
    className="w-full min-h-[46px] px-4 rounded-xl bg-[#FFFDF8] border border-[#E6DCCB] text-[#2D2924] text-xs font-bold flex items-center justify-center gap-3 shadow-2xs transition-colors hover:bg-[#F7F1E5] disabled:opacity-60 disabled:cursor-wait cursor-pointer"
  >
    <img
      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
      alt=""
      aria-hidden="true"
      className="w-6 h-6 shrink-0 object-contain"
    />
    <span>{isLoading ? 'Connecting to Google…' : 'Continue with Google'}</span>
  </button>
);
