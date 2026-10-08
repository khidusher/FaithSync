import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FaithSyncLogo } from '../common/FaithSyncLogo';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface LoginViewProps {
  onSwitchToSignUp: () => void;
  onForgotPassword: () => void;
  onBack?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onSwitchToSignUp,
  onForgotPassword,
  onBack
}) => {
  const { login } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!identifier.trim()) return setErrorMessage('Please enter your email address.');
    if (!password) return setErrorMessage('Please enter your password.');

    setIsLoading(true);
    try {
      await login(identifier.trim(), password);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to sign in. Check your email and password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F7F1E5] text-[#2D2924] min-h-screen flex flex-col font-sans antialiased selection:bg-[#D4A94D]/25 selection:text-[#2D2924]">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-40 bg-[#F7F1E5]/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(45,41,36,0.04)] border-b border-[#E6DCCB]">
        <div className="h-16 px-5 max-w-md md:max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                aria-label="Back to welcome page"
                className="min-w-[44px] min-h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#2D2924] hover:bg-[#E6DCCB]/40 transition-colors cursor-pointer active:scale-95"
                type="button"
              >
                <span className="material-symbols-outlined text-[24px]">arrow_back</span>
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#FFFDF8] flex items-center justify-center p-0.5 border border-[#E6DCCB] shadow-2xs">
                <FaithSyncLogo variant="icon" className="w-6 h-6" />
              </div>
              <span className="font-serif font-bold text-base tracking-tight text-[#6B4F2A]">
                Faith Sync
              </span>
            </div>
          </div>
          <span className="text-xs text-[#766F67] font-semibold">Quiet Time Sign In</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center px-4 sm:px-6 pt-20 pb-12 max-w-md mx-auto w-full">
        <div className="bg-[#FFFDF8] p-6 sm:p-8 rounded-3xl border border-[#E6DCCB] shadow-sm flex flex-col gap-6">
          {/* Gentle Greeting & Header */}
          <div className="flex flex-col gap-1 text-center items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] flex items-center justify-center mb-1">
              <FaithSyncLogo variant="icon" className="w-8 h-8" />
            </div>
            <div className="flex items-center gap-1.5 text-[#A67C52] text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px] text-[#D4A94D]">auto_stories</span>
              <span>Personal Quiet Time</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2D2924] tracking-tight">
              Welcome back
            </h1>
            <p className="text-xs text-[#766F67] leading-relaxed max-w-xs">
              Sign in to resume your daily quiet time journey with God.
            </p>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full h-px bg-[#E6DCCB]"></div>
            <span className="absolute bg-[#FFFDF8] px-3 text-[10px] text-[#766F67] tracking-wider uppercase font-semibold">
              or sign in with email
            </span>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div
              className="p-3 rounded-xl bg-[#B85C50]/10 border border-[#B85C50]/30 text-[#B85C50] text-xs font-semibold flex items-center gap-2"
              role="alert"
            >
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Email Address or ID"
              type="text"
              required
              value={identifier}
              onChange={e => {
                setIdentifier(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="e.g. name@church.org"
              leftIcon={<span className="material-symbols-outlined text-[18px]">mail</span>}
            />

            <Input
              label="Password"
              isPassword
              required
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="••••••••••••"
              leftIcon={<span className="material-symbols-outlined text-[18px]">lock</span>}
            />

            {/* Options Row */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#6B4F2A] rounded accent-[#6B4F2A]"
                />
                <span className="text-xs text-[#766F67]">Remember me</span>
              </label>

              <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs text-[#6B4F2A] hover:text-[#D4A94D] font-bold cursor-pointer hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                rightIcon={<span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
              >
                Sign In to Faith Sync
              </Button>
            </div>
          </form>

          {/* Switch to Sign Up */}
          <div className="text-center pt-1 border-t border-[#E6DCCB]/70">
            <p className="text-xs text-[#766F67]">
              New to Faith Sync?{' '}
              <button
                type="button"
                onClick={onSwitchToSignUp}
                className="text-xs font-bold text-[#6B4F2A] hover:text-[#D4A94D] hover:underline cursor-pointer"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
