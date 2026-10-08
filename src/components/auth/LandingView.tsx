import React from 'react';
import { FaithSyncLogo } from '../common/FaithSyncLogo';
import { Button } from '../common/Button';

interface LandingViewProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onGetStarted, onSignIn }) => (
  <main className="min-h-screen bg-[#F7F1E5] px-6 py-12 text-[#2D2924] flex flex-col items-center justify-center text-center selection:bg-[#D4A94D]/25 selection:text-[#2D2924]">
    <div className="flex w-full max-w-sm flex-col items-center">
      <FaithSyncLogo variant="full" className="h-auto max-h-36 w-56 object-contain sm:w-64" />

      <h1 className="mt-8 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
        Grow in Faith. Grow Together.
      </h1>

      <div className="mt-9 w-full">
        <Button variant="primary" size="lg" fullWidth onClick={onGetStarted}>
          Get started
        </Button>
      </div>

      <p className="mt-5 text-sm text-[#766F67]">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSignIn}
          className="font-bold text-[#6B4F2A] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B4F2A]"
        >
          Sign in
        </button>
      </p>
    </div>
  </main>
);
