import React from 'react';

export const PrayIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Clean, respectful praying hands motif */}
    <path d="M12 2c-.6 0-1.2.4-1.4 1l-1.5 5.5c-.3 1-.1 2 .5 2.8l2.4 2.7" />
    <path d="M12 2c.6 0 1.2.4 1.4 1l1.5 5.5c.3 1 .1 2-.5 2.8l-2.4 2.7" />
    <path d="M7 11.5L9 21h6l2-9.5" />
    <path d="M10 14h4" />
  </svg>
);
