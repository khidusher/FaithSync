import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FaithSyncLogo } from '../common/FaithSyncLogo';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { validateName, validateEmail, validatePassword } from '../../utils/validation';

interface SignUpViewProps {
  onSwitchToLogin: () => void;
  onBack?: () => void;
}

export const SignUpView: React.FC<SignUpViewProps> = ({
  onSwitchToLogin,
  onBack
}) => {
  const { signup } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const nameValidation = validateName(fullName, 'Full name');
    if (!nameValidation.isValid) {
      setErrorMessage(nameValidation.error || 'Please enter your full name.');
      return;
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setErrorMessage(emailValidation.error || 'Please enter a valid email address.');
      return;
    }

    const passValidation = validatePassword(password);
    if (!passValidation.isValid) {
      setErrorMessage(passValidation.error || 'Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your password.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Please accept the privacy terms to continue.');
      return;
    }

    setIsSubmitting(true);

    const nameParts = nameValidation.sanitized.split(' ');
    const firstName = nameParts[0] || 'Friend';
    const lastName = nameParts.slice(1).join(' ') || '';
    const username = emailValidation.sanitized.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '') || firstName.toLowerCase();

    setTimeout(() => {
      signup({
        fullName: nameValidation.sanitized,
        displayName: firstName,
        firstName,
        lastName,
        username,
        email: emailValidation.sanitized,
        churchName: '',
        branch: '',
        onboardingCompleted: true
      });
    }, 450);
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
                aria-label="Go back"
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
          <span className="text-xs text-[#766F67] font-semibold">Quiet Time</span>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="flex-1 flex flex-col justify-center px-4 sm:px-6 pt-20 pb-12 max-w-md mx-auto w-full">
        <div className="bg-[#FFFDF8] p-6 sm:p-8 rounded-3xl border border-[#E6DCCB] shadow-sm flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-1.5 text-center items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] flex items-center justify-center mb-1">
              <FaithSyncLogo variant="icon" className="w-8 h-8" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#66805C]/15 text-[#66805C] border border-[#66805C]/30 text-[10px] font-bold uppercase tracking-wider">
              <span>Daily Quiet Time with God</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2D2924] tracking-tight">
              Create an Account
            </h1>
            <p className="text-xs text-[#766F67] leading-relaxed max-w-xs">
              Begin your personal daily journey of Scripture reading, reflection, and prayer.
            </p>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div
              className="p-3.5 rounded-xl bg-[#B85C50]/10 border border-[#B85C50]/30 text-[#B85C50] text-xs font-semibold flex items-center gap-2"
              role="alert"
            >
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Full Name"
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="e.g. John Mensah"
              leftIcon={<span className="material-symbols-outlined text-[18px]">badge</span>}
            />

            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. john.mensah@gracechurch.org"
              leftIcon={<span className="material-symbols-outlined text-[18px]">mail</span>}
            />

            <Input
              label="Password"
              isPassword
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              leftIcon={<span className="material-symbols-outlined text-[18px]">lock</span>}
            />

            <Input
              label="Confirm Password"
              isPassword
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Repeat password"
              leftIcon={<span className="material-symbols-outlined text-[18px]">lock_clock</span>}
            />

            {/* Terms checkbox */}
            <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={e => setAgreeTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-[#6B4F2A] rounded accent-[#6B4F2A]"
              />
              <span className="text-[11px] text-[#766F67] leading-tight">
                I understand FaithSync is a private personal Quiet Time companion and agree to the Privacy Terms.
              </span>
            </label>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isSubmitting}
                rightIcon={<span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
              >
                Create Account
              </Button>
            </div>
          </form>

          {/* Switch to Login */}
          <div className="text-center pt-1 border-t border-[#E6DCCB]/70">
            <p className="text-xs text-[#766F67]">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-xs font-bold text-[#6B4F2A] hover:text-[#D4A94D] hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
