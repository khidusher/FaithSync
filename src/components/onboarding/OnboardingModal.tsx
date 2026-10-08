import React, { useState } from 'react';
import { Clock, Sun, Sunset, Moon, Sparkles, BookOpen, Check, ArrowRight, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FaithSyncLogo } from '../common/FaithSyncLogo';
import { User } from '../../types';

export const OnboardingModal: React.FC = () => {
  const { currentUser, finishOnboarding, startReading, selectReadingPlan, readingPlans } = useApp();
  const [step, setStep] = useState<number>(1);

  // Selections
  const [goalMinutes, setGoalMinutes] = useState<number>(10);
  const [preferredTime, setPreferredTime] = useState<User['preferredQuietTime']>('Morning');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan_walk_with_jesus');

  if (!currentUser || currentUser.isOnboarded) {
    return null;
  }

  const handleFinish = () => {
    selectReadingPlan(selectedPlanId);
    finishOnboarding(goalMinutes, preferredTime, []);
    startReading();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-sans">
      <div className="w-full max-w-md bg-[#FFFDF8] text-[#2D2924] rounded-3xl border border-[#E6DCCB] shadow-2xl p-6 md:p-8 flex flex-col justify-between max-h-[90vh] overflow-y-auto">
        {/* Progress header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map(s => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  s === step
                    ? 'w-6 bg-[#6B4F2A]'
                    : s < step
                    ? 'w-3 bg-[#66805C]'
                    : 'w-3 bg-[#E6DCCB]'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-[#766F67]">
            Step {step} of 5
          </span>
        </div>

        {/* STEP 1: Welcome */}
        {step === 1 && (
          <div className="space-y-4 my-auto py-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#F7F1E5] text-[#6B4F2A] flex items-center justify-center mx-auto mb-2 border border-[#E6DCCB] shadow-2xs">
              <FaithSyncLogo variant="icon" color="brown" className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl font-extrabold text-[#2D2924] tracking-tight">
              Welcome to Faith Sync
            </h2>
            <p className="font-serif text-sm text-[#A67C52] font-semibold italic max-w-xs mx-auto">
              “Helping you build a consistent daily quiet time with God.”
            </p>
            <p className="text-xs text-[#766F67] leading-relaxed max-w-xs mx-auto">
              A distraction-free sacred space to read Scripture, reflect on His truth, and pray in secret.
            </p>
            <div className="pt-6">
              <button
                onClick={() => setStep(2)}
                className="w-full min-h-[48px] rounded-2xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md shadow-[#6B4F2A]/20"
              >
                <span>Set Up My Quiet Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Reading Goal */}
        {step === 2 && (
          <div className="space-y-5 my-auto py-2">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#2D2924]">
                How much quiet time fits your daily rhythm?
              </h2>
              <p className="text-xs text-[#766F67] mt-1">
                You can adjust this anytime. Even 5 focused minutes makes an eternal difference.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { min: 5, desc: 'Quick pause', tag: 'Great start' },
                { min: 10, desc: 'Steady focus', tag: 'Recommended' },
                { min: 15, desc: 'Deep reflection', tag: 'Deeper walk' },
                { min: 20, desc: 'Extended study', tag: 'Thorough' }
              ].map(opt => (
                <button
                  key={opt.min}
                  type="button"
                  onClick={() => setGoalMinutes(opt.min)}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    goalMinutes === opt.min
                      ? 'border-[#6B4F2A] bg-[#F7F1E5] text-[#6B4F2A] ring-2 ring-[#6B4F2A]/20 font-bold'
                      : 'border-[#E6DCCB] bg-[#FFFDF8] hover:border-[#6B4F2A]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg font-bold tabular-nums text-[#2D2924]">
                      {opt.min} min
                    </span>
                    <Clock className="w-4 h-4 text-[#766F67]" />
                  </div>
                  <p className="text-xs text-[#766F67] mt-1">{opt.desc}</p>
                  <span className="inline-block mt-2 text-[10px] font-semibold text-[#A67C52]">
                    {opt.tag}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="min-h-[44px] px-4 rounded-xl text-xs font-semibold text-[#766F67] hover:text-[#2D2924]"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 min-h-[46px] rounded-2xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] font-bold text-sm flex items-center justify-center gap-1 active:scale-[0.98] transition-all shadow-md shadow-[#6B4F2A]/20"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Quiet Time Period */}
        {step === 3 && (
          <div className="space-y-5 my-auto py-2">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#2D2924]">
                When do you prefer to meet with God?
              </h2>
              <p className="text-xs text-[#766F67] mt-1">
                We'll tailor your peaceful reminders to this rhythm.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'Morning', label: 'Morning', desc: 'Start the day grounded with Jesus', icon: Sun },
                { id: 'Afternoon', label: 'Midday', desc: 'A peaceful pause amidst work & study', icon: Sunset },
                { id: 'Evening', label: 'Evening', desc: 'End the day reflecting in gratitude', icon: Moon },
                { id: 'Custom', label: 'Custom', desc: 'Whenever quiet moments open up', icon: Clock }
              ].map(period => {
                const Icon = period.icon;
                const isSelected = preferredTime === period.id;
                return (
                  <button
                    key={period.id}
                    type="button"
                    onClick={() => setPreferredTime(period.id as User['preferredQuietTime'])}
                    className={`w-full p-3.5 rounded-2xl text-left border flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'border-[#6B4F2A] bg-[#F7F1E5] ring-2 ring-[#6B4F2A]/20'
                        : 'border-[#E6DCCB] bg-[#FFFDF8] hover:border-[#6B4F2A]'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-[#6B4F2A] text-[#FFFDF8]' : 'bg-[#F7F1E5] text-[#766F67] border border-[#E6DCCB]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#2D2924]">{period.label}</p>
                      <p className="text-xs text-[#766F67]">{period.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="min-h-[44px] px-4 rounded-xl text-xs font-semibold text-[#766F67] hover:text-[#2D2924]"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 min-h-[46px] rounded-2xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] font-bold text-sm flex items-center justify-center gap-1 active:scale-[0.98] transition-all shadow-md shadow-[#6B4F2A]/20"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Choose Reading Plan */}
        {step === 4 && (
          <div className="space-y-4 my-auto py-2">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#2D2924]">
                Choose your first reading plan
              </h2>
              <p className="text-xs text-[#766F67] mt-1">
                Select where you’d like to begin your journey in Scripture.
              </p>
            </div>

            <div className="space-y-2.5">
              {readingPlans.map(plan => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'border-[#6B4F2A] bg-[#F7F1E5] ring-2 ring-[#6B4F2A]/20'
                        : 'border-[#E6DCCB] bg-[#FFFDF8] hover:border-[#6B4F2A]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-sm font-bold text-[#2D2924]">
                        {plan.title}
                      </span>
                      <span className="text-[10px] font-semibold text-[#66805C] bg-[#66805C]/15 px-2 py-0.5 rounded-full">
                        {plan.durationDays} Days
                      </span>
                    </div>
                    <p className="text-xs text-[#766F67] line-clamp-2">
                      {plan.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => setStep(3)}
                className="text-xs font-semibold text-[#766F67] hover:text-[#2D2924]"
              >
                Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="flex-1 min-h-[46px] rounded-2xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] font-bold text-sm flex items-center justify-center gap-1 active:scale-[0.98] transition-all ml-auto shadow-md shadow-[#6B4F2A]/20"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: You're ready */}
        {step === 5 && (
          <div className="space-y-5 my-auto py-4 text-center">
            <div className="w-16 h-16 rounded-full bg-[#66805C]/15 text-[#66805C] border border-[#66805C]/30 flex items-center justify-center mx-auto shadow-xs">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div>
              <h2 className="font-serif text-2xl font-extrabold text-[#2D2924]">
                Your Quiet Sanctuary is Ready
              </h2>
              <p className="font-serif text-sm font-semibold text-[#A67C52] mt-1 italic">
                “Be still, and know that I am God.”
              </p>
              <p className="text-xs text-[#766F67] mt-2 max-w-xs mx-auto leading-relaxed">
                Your quiet time journey awaits: <span className="font-bold text-[#2D2924]">John 15:1–11</span>. Take a deep breath and enter into His presence.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleFinish}
                className="w-full min-h-[50px] rounded-2xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] font-bold text-sm shadow-md shadow-[#6B4F2A]/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
              >
                <span>Begin Day 1 Quiet Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
