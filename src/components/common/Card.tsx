import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'surface' | 'cream' | 'accent-border' | 'gold-border';
  interactive?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'surface',
  interactive = false,
  className = '',
  ...props
}) => {
  const variantStyles = {
    surface: 'bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs',
    cream: 'bg-[#F7F1E5] border border-[#E6DCCB] shadow-2xs',
    'accent-border': 'bg-[#FFFDF8] border border-[#E6DCCB] border-l-4 border-l-[#A67C52] shadow-2xs',
    'gold-border': 'bg-[#FFFDF8] border border-[#E6DCCB] border-l-4 border-l-[#D4A94D] shadow-2xs'
  };

  const interactiveStyles = interactive
    ? 'hover:border-[#6B4F2A] hover:shadow-xs transition-all cursor-pointer active:scale-[0.99]'
    : '';

  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 ${variantStyles[variant]} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
