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
    <svg aria-hidden="true" viewBox="0 0 48 48" className="w-5 h-5">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" transform="translate(0 4) scale(1 .83)" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.72 5.99c4.51-4.17 7.06-10.31 7.06-17.64z" />
      <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.12.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.56 2.56 10.78l7.97-6.19z" transform="translate(0 4) scale(1 .83)" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.81l-7.72-5.99c-2.14 1.44-4.89 2.3-8.19 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" transform="translate(0 -4) scale(1 .83)" />
    </svg>
    <span>{isLoading ? 'Connecting to Google…' : 'Continue with Google'}</span>
  </button>
);
