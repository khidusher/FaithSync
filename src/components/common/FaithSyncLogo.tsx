import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'badge';
  color?: 'brown' | 'gold' | 'white';
}

export const FaithSyncLogo: React.FC<LogoProps> = ({
  className = 'h-8 w-auto',
  variant = 'full',
  color = 'brown'
}) => {
  const strokeColor = color === 'white' ? '#FFFDF8' : color === 'gold' ? '#D4A94D' : '#6B4F2A';
  const textColor = color === 'white' ? '#FFFDF8' : color === 'gold' ? '#D4A94D' : '#6B4F2A';

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Heart with intertwined cross */}
        <path
          d="M48 24C41 12 25 14 18 25C10 37 18 55 46 76C47.5 77 49 78.5 50 80C51 78.5 52.5 77 54 76C82 55 90 37 82 25C75 14 59 12 52 24L50 26.5L48 24Z"
          stroke={strokeColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Central Cross */}
        <path
          d="M50 18V62"
          stroke={strokeColor}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M34 34H66"
          stroke={strokeColor}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 76 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto shrink-0 aspect-square"
      >
        {/* Heart outline with cross */}
        <path
          d="M36 20C30 9 17 11 11 20C4 30 11 45 35 63C36 64 37 65 38 66C39 65 40 64 41 63C65 45 72 30 65 20C59 11 46 9 40 20L38 22.5L36 20Z"
          stroke={strokeColor}
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M38 14V50"
          stroke={strokeColor}
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <path
          d="M25 27H51"
          stroke={strokeColor}
          strokeWidth="5.5"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col">
        <span
          className="font-bold tracking-tight leading-none text-base sm:text-lg font-serif"
          style={{ color: textColor }}
        >
          Faith Sync
        </span>
        <span
          className="font-medium tracking-wider uppercase text-[8px] sm:text-[9px] mt-0.5 leading-none text-[#A67C52]"
        >
          Connecting people · Strengthening faith
        </span>
      </div>
    </div>
  );
};
