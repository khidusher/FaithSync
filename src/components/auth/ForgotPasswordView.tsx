import React, { useState } from 'react';
import { FaithSyncLogo } from '../common/FaithSyncLogo';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { validateEmail } from '../../utils/validation';

interface ForgotPasswordViewProps {
  onBackToLogin: () => void;
}

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({
  onBackToLogin
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.error || 'Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    // Simulate recovery flow
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div className="bg-[#F7F1E5] text-[#2D2924] min-h-screen flex flex-col font-sans antialiased selection:bg-[#D4A94D]/25 selection:text-[#2D2924]">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-40 bg-[#F7F1E5]/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(45,41,36,0.04)] border-b border-[#E6DCCB]">
        <div className="h-16 px-5 max-w-md md:max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToLogin}
              aria-label="Back to Sign In"
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#2D2924] hover:bg-[#E6DCCB]/40 transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#FFFDF8] flex items-center justify-center p-0.5 border border-[#E6DCCB] shadow-2xs">
                <FaithSyncLogo variant="icon" color="brown" className="w-6 h-6" />
              </div>
              <span className="font-serif font-bold text-base tracking-tight text-[#6B4F2A]">
                Faith Sync
              </span>
            </div>
          </div>
          <span className="text-xs text-[#766F67] font-semibold">Account Recovery</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center px-4 sm:px-6 pt-24 pb-12 max-w-md mx-auto w-full">
        <div className="bg-[#FFFDF8] p-6 sm:p-8 rounded-3xl border border-[#E6DCCB] shadow-sm flex flex-col gap-6">
          {isSuccess ? (
            /* Success State */
            <div className="text-center space-y-4 py-2 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-[#66805C]/15 text-[#66805C] border border-[#66805C]/30 flex items-center justify-center mx-auto shadow-2xs">
                <span className="material-symbols-outlined text-[32px]">mark_email_read</span>
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-2xl font-bold text-[#2D2924]">
                  Check your inbox
                </h2>
                <p className="text-xs sm:text-sm text-[#766F67] leading-relaxed">
                  We've sent password reset instructions to <span className="font-bold text-[#2D2924]">{email}</span>. Please click the link inside the email to choose a new password.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F1E5] border border-[#E6DCCB] text-xs text-[#766F67] text-left">
                <p className="font-semibold text-[#6B4F2A] mb-0.5">Didn't receive the email?</p>
                <p>Check your spam or junk folder, or wait a few minutes before requesting another reset link.</p>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={onBackToLogin}
                >
                  Return to Sign In
                </Button>
              </div>
            </div>
          ) : (
            /* Input Form State */
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-[#A67C52] text-xs font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px] text-[#D4A94D]">lock_reset</span>
                  <span>Password Reset</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2D2924] tracking-tight">
                  Forgot your password?
                </h1>
                <p className="text-xs sm:text-sm text-[#766F67] leading-relaxed">
                  Enter the email address associated with your FaithSync account, and we’ll send you a recovery link.
                </p>
              </div>

              <Input
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="name@church.org"
                error={error}
                leftIcon={<span className="material-symbols-outlined text-[18px]">mail</span>}
                autoFocus
              />

              <div className="pt-2 flex flex-col gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                >
                  Send Reset Link
                </Button>

                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="w-full py-2.5 text-xs font-bold text-[#6B4F2A] hover:text-[#573f21] hover:underline transition-colors text-center cursor-pointer"
                >
                  Remember your password? Return to Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};
