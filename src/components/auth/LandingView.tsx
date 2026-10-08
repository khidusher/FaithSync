import React from 'react';
import { FaithSyncLogo } from '../common/FaithSyncLogo';
import { Button } from '../common/Button';

interface LandingViewProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onDemoAccess: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onGetStarted,
  onSignIn,
  onDemoAccess
}) => {
  return (
    <div className="bg-[#F7F1E5] text-[#2D2924] min-h-screen flex flex-col font-sans selection:bg-[#D4A94D]/25 selection:text-[#2D2924]">
      {/* Top Navbar */}
      <header className="w-full bg-[#F7F1E5]/90 backdrop-blur-md border-b border-[#E6DCCB] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#FFFDF8] flex items-center justify-center p-1 border border-[#E6DCCB] shadow-2xs">
              <FaithSyncLogo variant="icon" color="brown" className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg sm:text-xl text-[#6B4F2A] tracking-tight leading-none">
                Faith Sync
              </span>
              <span className="text-[10px] sm:text-xs text-[#A67C52] font-semibold mt-0.5 tracking-wider uppercase">
                Daily Quiet Time
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onSignIn}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-[#6B4F2A] hover:bg-[#E6DCCB]/40 rounded-xl transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={onGetStarted}
              className="text-xs sm:text-sm px-4 sm:px-5"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 flex flex-col justify-center max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-16 text-center">
        {/* Purpose Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF8] border border-[#E6DCCB] text-[#6B4F2A] text-xs font-bold shadow-2xs mx-auto mb-6">
          <span className="w-2 h-2 rounded-full bg-[#D4A94D]" />
          <span>A Sacred Space for Personal Quiet Time</span>
        </div>

        {/* Major Headline with Playfair Display */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2D2924] tracking-tight leading-[1.15] mb-5">
          Build a Meaningful Daily Quiet Time with God.
        </h1>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg lg:text-xl text-[#766F67] max-w-2xl mx-auto leading-relaxed mb-8">
          A distraction-free Christian sanctuary designed around one sacred daily journey:
          <span className="font-semibold text-[#6B4F2A] block mt-2">
            Prepare → Read → Reflect → Pray → Record → Finish
          </span>
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto w-full mb-12">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onGetStarted}
            rightIcon={<span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
          >
            Begin Your Quiet Time
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={onSignIn}
          >
            Sign In
          </Button>
        </div>

        {/* Quick Demo Preview Prompt */}
        <div className="flex items-center justify-center gap-2 mb-16">
          <span className="text-xs text-[#766F67]">Want to try today's quiet time immediately?</span>
          <button
            onClick={onDemoAccess}
            className="text-xs font-bold text-[#6B4F2A] hover:text-[#D4A94D] underline cursor-pointer transition-colors"
          >
            Enter Demo Space
          </button>
        </div>

        {/* Foundation Feature Highlights (3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 text-left">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs flex flex-col gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px] text-[#6B4F2A]">auto_stories</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2D2924]">
              Distraction-Free Scripture
            </h3>
            <p className="text-xs sm:text-sm text-[#766F67] leading-relaxed">
              Read the day’s Scripture comfortably with adjustable typography, verse highlighting, and quiet time plans.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] border-t-4 border-t-[#D4A94D] shadow-2xs flex flex-col gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px] text-[#D4A94D]">edit_note</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2D2924]">
              Reflect &amp; Pray in Secret
            </h3>
            <p className="text-xs sm:text-sm text-[#766F67] leading-relaxed">
              Answer 3 guided prompts: What stood out? What is God teaching me? How can I apply this? Plus a private prayer journal.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs flex flex-col gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#F7F1E5] text-[#6B4F2A] border border-[#E6DCCB] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px] text-[#66805C]">spa</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2D2924]">
              Grace Over Guilt
            </h3>
            <p className="text-xs sm:text-sm text-[#766F67] leading-relaxed">
              A gentle, encouraging spiritual journal that tracks consistency without game pressure. Returning daily to His peace.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#E6DCCB] py-6 px-5 text-center text-xs text-[#766F67] font-sans">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FaithSyncLogo variant="icon" color="brown" className="w-5 h-5" />
            <span className="font-serif font-bold text-[#6B4F2A]">Faith Sync</span>
            <span>•</span>
            <span>Helping Christians build a consistent daily quiet time with God.</span>
          </div>
          <p>© {new Date().getFullYear()} Faith Sync.</p>
        </div>
      </footer>
    </div>
  );
};
