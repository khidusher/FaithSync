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
  const { login, allUsers, switchDemoAccount } = useApp();

  const [identifier, setIdentifier] = useState('arnoldodjidja01@gmail.com');
  const [password, setPassword] = useState('QuietTime2026!');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage('Please enter your email or FaithSync ID.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(identifier.trim(), password);
      setIsLoading(false);
    }, 450);
  };

  const handleSocialLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login('arnoldodjidja01@gmail.com', 'password');
      setIsLoading(false);
    }, 400);
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
                <FaithSyncLogo variant="icon" color="brown" className="w-6 h-6" />
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
              <FaithSyncLogo variant="icon" color="brown" className="w-8 h-8" />
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

          {/* Social Sign-in Buttons */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={handleSocialLogin}
              type="button"
              className="w-full h-11 px-4 bg-[#FFFDF8] hover:bg-[#F7F1E5] text-[#2D2924] rounded-xl shadow-2xs border border-[#E6DCCB] flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] font-bold text-xs cursor-pointer"
            >
              <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
              </svg>
              <span>Continue with Google</span>
            </button>
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

          {/* Quick Demo Accounts Switcher Pill */}
          <div className="p-3 rounded-xl bg-[#F7F1E5] border border-[#E6DCCB] flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#6B4F2A]">
              <span>Quick Demo Profiles</span>
              <span className="text-[10px] text-[#A67C52] uppercase font-semibold">1-Click Test</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {allUsers.slice(0, 3).map(u => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => switchDemoAccount(u.id)}
                  className="p-1.5 rounded-lg bg-[#FFFDF8] hover:bg-[#FFFDF8]/80 border border-[#E6DCCB] text-center text-[10px] font-bold text-[#2D2924] truncate cursor-pointer transition-colors"
                >
                  {u.firstName}
                </button>
              ))}
            </div>
          </div>

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
