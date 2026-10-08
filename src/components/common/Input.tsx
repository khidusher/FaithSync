import React, { useState } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  isPassword = false,
  type = 'text',
  className = '',
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full flex flex-col gap-1.5 font-sans">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-bold text-[#2D2924] select-none"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-[#766F67]">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          type={inputType}
          className={`w-full text-xs sm:text-sm py-3 px-3.5 rounded-xl bg-[#FFFDF8] text-[#2D2924] placeholder:text-[#766F67]/70 border transition-all shadow-2xs focus:outline-none ${
            leftIcon ? 'pl-10' : ''
          } ${isPassword || rightIcon ? 'pr-11' : ''} ${
            error
              ? 'border-[#B85C50] focus:border-[#B85C50] focus:ring-2 focus:ring-[#B85C50]/20'
              : 'border-[#E6DCCB] focus:border-[#6B4F2A] focus:ring-2 focus:ring-[#6B4F2A]/15'
          } ${className}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 p-1.5 text-[#766F67] hover:text-[#2D2924] rounded-lg transition-colors cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        ) : rightIcon ? (
          <div className="absolute right-3.5 flex items-center text-[#766F67]">
            {rightIcon}
          </div>
        ) : null}
      </div>

      {error ? (
        <p
          id={`${inputId}-error`}
          className="text-[11px] text-[#B85C50] font-semibold flex items-center gap-1 mt-0.5"
          role="alert"
        >
          <span className="material-symbols-outlined text-[14px]">error</span>
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="text-[11px] text-[#766F67] mt-0.5">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
