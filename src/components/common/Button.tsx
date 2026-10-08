import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-bold rounded-xl transition-all duration-150 active:scale-[0.98] select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 min-h-[44px]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 min-h-[38px]',
    md: 'text-sm px-5 py-2.5 gap-2 min-h-[44px]',
    lg: 'text-base px-6 py-3.5 gap-2.5 min-h-[50px] rounded-2xl'
  };

  const variantStyles = {
    primary:
      'bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] shadow-sm hover:shadow-md border border-transparent shadow-[#6B4F2A]/20',
    secondary:
      'bg-[#FFFDF8] hover:bg-[#F7F1E5] text-[#6B4F2A] border border-[#6B4F2A] hover:border-[#573f21] shadow-2xs',
    accent:
      'bg-[#D4A94D] hover:bg-[#c3993d] text-[#2D2924] font-extrabold shadow-sm hover:shadow-md border border-transparent shadow-[#D4A94D]/25',
    outline:
      'bg-[#FFFDF8] hover:bg-[#F7F1E5] text-[#2D2924] border border-[#E6DCCB] hover:border-[#6B4F2A] shadow-2xs',
    ghost:
      'bg-transparent hover:bg-[#E6DCCB]/40 text-[#6B4F2A] border border-transparent'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
