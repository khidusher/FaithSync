import React, { useState } from 'react';
import {
  Clock,
  Sun,
  Moon,
  Bell,
  Lock,
  Check,
  Save,
  LogOut,
  Sparkles,
  BookOpen,
  Type,
  ShieldCheck,
  Download,
  Trash2,
  AlertTriangle,
  X,
  Copy,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ScriptureTextSize, ReadingFontStyle } from '../../types';
import {
  validateName,
  validateEmail,
  validateReminderTime,
  validateReminderDays,
  VALID_DAYS
} from '../../utils/validation';

export const ProfileScreen: React.FC = () => {
  const {
    currentUser,
    userSettings,
    updateProfile,
    updateSettings,
    logout,
    deleteAccount,
    exportUserData
  } = useApp();

  // Active settings tab or single continuous calm page with section navigation
  const [activeSection, setActiveSection] = useState<'quiet_time' | 'reading' | 'account' | 'privacy'>('quiet_time');

  // Account form state
  const [displayName, setDisplayName] = useState(currentUser?.displayName || currentUser?.firstName || '');
  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName, setLastName] = useState(currentUser?.lastName || '');
  const [email, setEmail] = useState(currentUser?.email || '');

  // Quiet time preferences
  const [goalMinutes, setGoalMinutes] = useState(currentUser?.quietTimeGoalMinutes || 10);
  const [preferredTime, setPreferredTime] = useState(currentUser?.preferredQuietTime || 'Morning');
  const [reminderEnabled, setReminderEnabled] = useState(userSettings?.notificationsDailyReminder ?? true);
  const [reminderTime, setReminderTime] = useState(userSettings?.dailyReminderTime || '07:00');
  const [reminderDays, setReminderDays] = useState<string[]>(
    userSettings?.reminderDays && userSettings.reminderDays.length > 0
      ? userSettings.reminderDays
      : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  );

  // Reading preferences
  const [textSize, setTextSize] = useState<ScriptureTextSize>(userSettings?.scriptureTextSize || 'medium');
  const [readingFont, setReadingFont] = useState<ReadingFontStyle>(userSettings?.readingFont || 'serif');
  const [showVerseNumbers, setShowVerseNumbers] = useState(userSettings?.showVerseNumbers !== false);
  const [highlightKeyVerse, setHighlightKeyVerse] = useState(userSettings?.highlightKeyVerse !== false);

  // Status feedback
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isExported, setIsExported] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [exportedJson, setExportedJson] = useState<string | null>(null);

  // Delete account confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  if (!currentUser) return null;

  // Toggle individual reminder day
  const toggleReminderDay = (day: string) => {
    setReminderDays(prev => {
      if (prev.includes(day)) {
        // Keep at least one day
        if (prev.length === 1) return prev;
        return prev.filter(d => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  const selectEveryday = () => {
    setReminderDays([...VALID_DAYS]);
  };

  const selectWeekdays = () => {
    setReminderDays(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  };

  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setSaveSuccessMessage('');

    // 1. Validate Profile Fields
    const validFirst = validateName(firstName || displayName, 'First name');
    if (!validFirst.isValid) {
      setErrorMessage(validFirst.error || 'Please enter a valid name.');
      return;
    }

    const validEmail = validateEmail(email);
    if (!validEmail.isValid) {
      setErrorMessage(validEmail.error || 'Please enter a valid email.');
      return;
    }

    // 2. Validate Reminder Time & Days
    const validTime = validateReminderTime(reminderTime);
    const validDays = validateReminderDays(reminderDays);

    // 3. Persist Profile
    updateProfile({
      displayName: displayName.trim() || validFirst.sanitized,
      firstName: validFirst.sanitized,
      lastName: lastName.trim(),
      email: validEmail.sanitized,
      quietTimeGoalMinutes: Number(goalMinutes),
      preferredQuietTime: preferredTime
    });

    // 4. Persist Settings
    updateSettings({
      notificationsDailyReminder: reminderEnabled,
      dailyReminderTime: validTime.sanitized,
      reminderDays: validDays.sanitized,
      scriptureTextSize: textSize,
      readingFont,
      showVerseNumbers,
      highlightKeyVerse,
      quietTimeGoalMinutes: Number(goalMinutes),
      preferredQuietTime: preferredTime,
      isPrivateAccount: true,
      readingVisibility: 'private',
      streakVisibility: 'private'
    });

    setSaveSuccessMessage('Settings updated successfully.');
    setTimeout(() => setSaveSuccessMessage(''), 3500);
  };

  // Data Export handler
  const handleExportData = () => {
    const dataString = exportUserData();
    setExportedJson(dataString);
    setIsExported(true);

    try {
      const blob = new Blob([dataString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `FaithSync_QuietTime_Record_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // In case browser restricts downloads, raw text preview is also shown
    }
  };

  // Confirm account deletion
  const handleConfirmDelete = () => {
    deleteAccount();
  };

  const handleSignOut = async () => {
    setErrorMessage('');
    setIsSigningOut(true);
    try {
      await logout();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to sign out. Please try again.');
      setIsSigningOut(false);
    }
  };

  // Compute preview font class
  const previewFontClass =
    textSize === 'small'
      ? 'text-sm leading-relaxed'
      : textSize === 'medium'
      ? 'text-base leading-relaxed'
      : textSize === 'xlarge'
      ? 'text-xl leading-[38px]'
      : 'text-lg leading-[34px]';

  const previewFontFamily = readingFont === 'sans' ? 'font-sans' : 'font-serif';

  return (
    <div className="flex flex-col w-full pb-24 md:pb-16 pt-3 md:pt-6 bg-[#F7F1E5] font-sans selection:bg-[#D4A94D]/25 selection:text-[#2D2924]">
      <div className="w-full max-w-md md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E6DCCB]/70">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A67C52] mb-1">
              <span>Personal Quiet Time</span>
              <span>•</span>
              <span className="text-[#6B4F2A] font-bold">Preferences &amp; Privacy</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2D2924] tracking-tight">
              Settings
            </h1>
            <p className="text-xs sm:text-sm text-[#766F67] mt-0.5">
              Personalize your quiet time rhythms, Scripture reading preferences, and private account data.
            </p>
          </div>

          {saveSuccessMessage && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#66805C]/15 text-[#66805C] border border-[#66805C]/30 text-xs font-bold animate-in fade-in">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{saveSuccessMessage}</span>
            </div>
          )}
        </div>

        {/* Error message banner */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-[#B85C50]/10 border border-[#B85C50]/30 text-[#B85C50] text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Section Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs">
          {[
            { id: 'quiet_time', label: 'Quiet Time', icon: Bell },
            { id: 'reading', label: 'Reading', icon: BookOpen },
            { id: 'account', label: 'Account', icon: Lock },
            { id: 'privacy', label: 'Privacy & Data', icon: ShieldCheck }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSection(tab.id as any)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-[#6B4F2A] text-[#FFFDF8] shadow-xs'
                    : 'text-[#766F67] hover:text-[#2D2924] hover:bg-[#F7F1E5]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================
            SECTION 1: QUIET TIME
           ======================================================== */}
        {activeSection === 'quiet_time' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {/* Daily Reminder Settings */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#E6DCCB] pb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#6B4F2A]" />
                  <h2 className="font-serif text-lg font-bold text-[#2D2924]">
                    Quiet Time Reminders
                  </h2>
                </div>
                <span className="text-xs text-[#766F67]">Gentle notification</span>
              </div>

              {/* Toggle reminder */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F7F1E5]/60 border border-[#E6DCCB]">
                <div>
                  <p className="text-xs font-bold text-[#2D2924]">
                    Daily Quiet Time Reminder
                  </p>
                  <p className="text-[11px] text-[#766F67]">
                    Receive a quiet reminder when it's time to meet with God.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={reminderEnabled}
                  onChange={e => setReminderEnabled(e.target.checked)}
                  className="w-5 h-5 rounded text-[#6B4F2A] accent-[#6B4F2A] cursor-pointer"
                />
              </div>

              {/* Preferred reminder time */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#2D2924]">
                  Preferred Reminder Time
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="time"
                    value={reminderTime}
                    onChange={e => setReminderTime(e.target.value)}
                    disabled={!reminderEnabled}
                    className="w-full sm:w-48 text-xs p-3 rounded-xl border border-[#E6DCCB] bg-[#FFFDF8] text-[#2D2924] focus:outline-none focus:border-[#6B4F2A] disabled:opacity-50"
                  />
                  <span className="text-[11px] text-[#766F67]">
                    Spiritual notice: “Your quiet time is waiting for you.”
                  </span>
                </div>
              </div>

              {/* Reminder days selector */}
              <div className="space-y-2 pt-1 border-t border-[#E6DCCB]/60">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#2D2924]">
                    Reminder Days
                  </label>
                  <div className="flex items-center gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={selectEveryday}
                      className="text-[#6B4F2A] hover:underline font-semibold cursor-pointer"
                    >
                      All Days
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={selectWeekdays}
                      className="text-[#6B4F2A] hover:underline font-semibold cursor-pointer"
                    >
                      Weekdays
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                  {VALID_DAYS.map(day => {
                    const isSelected = reminderDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleReminderDay(day)}
                        disabled={!reminderEnabled}
                        className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'bg-[#6B4F2A] border-[#6B4F2A] text-[#FFFDF8] font-bold shadow-2xs'
                            : 'bg-[#FFFDF8] border-[#E6DCCB] text-[#766F67] hover:border-[#A67C52]'
                        } disabled:opacity-50`}
                      >
                        <span className="text-xs">{day}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Target Quiet Time Duration & Routine */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs space-y-5">
              <div className="flex items-center gap-2 border-b border-[#E6DCCB] pb-3">
                <Clock className="w-5 h-5 text-[#6B4F2A]" />
                <h2 className="font-serif text-lg font-bold text-[#2D2924]">
                  Quiet Time Target &amp; Preferred Rhythm
                </h2>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#2D2924]">
                  Target Session Length
                </label>
                <p className="text-[11px] text-[#766F67]">
                  Consistency in stillness matters more than lengthy study.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { min: 5, label: '5 min', desc: 'Quick centering' },
                    { min: 10, label: '10 min', desc: 'Daily habit' },
                    { min: 15, label: '15 min', desc: 'Deeper reflection' },
                    { min: 20, label: '20 min', desc: 'Extended study' }
                  ].map(opt => (
                    <button
                      key={opt.min}
                      type="button"
                      onClick={() => setGoalMinutes(opt.min)}
                      className={`p-3.5 rounded-2xl border text-center transition-all ${
                        goalMinutes === opt.min
                          ? 'bg-[#F7F1E5] border-[#6B4F2A] text-[#6B4F2A] font-bold ring-2 ring-[#6B4F2A]/15 shadow-2xs'
                          : 'bg-[#FFFDF8] border-[#E6DCCB] text-[#2D2924] hover:border-[#6B4F2A]'
                      }`}
                    >
                      <p className="font-serif text-base font-bold">{opt.label}</p>
                      <span className="text-[10px] text-[#766F67]">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred time of day */}
              <div className="space-y-2 pt-2 border-t border-[#E6DCCB]/60">
                <label className="block text-xs font-bold text-[#2D2924]">
                  Preferred Time of Day
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'Morning', label: 'Morning', icon: Sun, desc: 'Start with God' },
                    { id: 'Afternoon', label: 'Midday', icon: Clock, desc: 'Midday stillness' },
                    { id: 'Evening', label: 'Evening', icon: Moon, desc: 'Night reflection' },
                    { id: 'Custom', label: 'Custom', icon: Sparkles, desc: 'Flexible time' }
                  ].map(opt => {
                    const Icon = opt.icon;
                    const isSelected = preferredTime === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPreferredTime(opt.id as any)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#F7F1E5] border-[#6B4F2A] text-[#6B4F2A] ring-2 ring-[#6B4F2A]/15 font-bold shadow-2xs'
                            : 'bg-[#FFFDF8] border-[#E6DCCB] text-[#2D2924] hover:border-[#6B4F2A]'
                        }`}
                      >
                        <Icon className="w-4 h-4 mb-1 text-[#6B4F2A]" />
                        <p className="text-xs font-bold">{opt.label}</p>
                        <span className="text-[10px] text-[#766F67]">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Save Button for Quiet Time */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveAll()}
                className="min-h-[46px] px-7 rounded-xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Quiet Time Preferences</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#2D2924]">Sign out of FaithSync</p>
                <p className="text-xs text-[#766F67] mt-1">You can sign back in whenever you’re ready.</p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="min-h-[44px] px-5 rounded-xl border border-[#B85C50]/35 text-[#9A493F] hover:bg-[#B85C50]/10 text-xs font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-wait cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>{isSigningOut ? 'Signing out…' : 'Sign out'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            SECTION 2: READING & SCRIPTURE DISPLAY
           ======================================================== */}
        {activeSection === 'reading' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#E6DCCB] pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#6B4F2A]" />
                  <h2 className="font-serif text-lg font-bold text-[#2D2924]">
                    Scripture Reading Experience
                  </h2>
                </div>
                <span className="text-xs text-[#766F67]">Typography &amp; Layout</span>
              </div>

              {/* Text Size (4 options: Small, Medium, Large, Extra Large) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#2D2924]">
                  Scripture Text Size
                </label>
                <p className="text-[11px] text-[#766F67]">
                  Choose comfortable reading proportions for your screen.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'small', label: 'Small', note: 'Compact' },
                    { id: 'medium', label: 'Medium', note: 'Standard' },
                    { id: 'large', label: 'Large', note: 'Comfortable' },
                    { id: 'xlarge', label: 'Extra Large', note: 'Expansive' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTextSize(opt.id as ScriptureTextSize)}
                      className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        textSize === opt.id
                          ? 'bg-[#F7F1E5] border-[#6B4F2A] text-[#6B4F2A] font-bold ring-2 ring-[#6B4F2A]/15 shadow-2xs'
                          : 'bg-[#FFFDF8] border-[#E6DCCB] text-[#2D2924] hover:border-[#6B4F2A]'
                      }`}
                    >
                      <Type className="w-4 h-4 mx-auto mb-1 text-[#6B4F2A]" />
                      <p className="text-xs font-bold">{opt.label}</p>
                      <span className="text-[10px] text-[#766F67]">{opt.note}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reading Font Family */}
              <div className="space-y-2 pt-2 border-t border-[#E6DCCB]/60">
                <label className="block text-xs font-bold text-[#2D2924]">
                  Scripture Typography Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setReadingFont('serif')}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      readingFont === 'serif'
                        ? 'bg-[#F7F1E5] border-[#6B4F2A] text-[#6B4F2A] ring-2 ring-[#6B4F2A]/15 font-bold shadow-2xs'
                        : 'bg-[#FFFDF8] border-[#E6DCCB] text-[#2D2924] hover:border-[#6B4F2A]'
                    }`}
                  >
                    <p className="font-serif text-sm font-bold">Classic Serif (Playfair)</p>
                    <p className="font-serif text-xs text-[#766F67] mt-0.5 italic">
                      Traditional devotional and literary Bible typography.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReadingFont('sans')}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      readingFont === 'sans'
                        ? 'bg-[#F7F1E5] border-[#6B4F2A] text-[#6B4F2A] ring-2 ring-[#6B4F2A]/15 font-bold shadow-2xs'
                        : 'bg-[#FFFDF8] border-[#E6DCCB] text-[#2D2924] hover:border-[#6B4F2A]'
                    }`}
                  >
                    <p className="font-sans text-sm font-bold">Clean Sans (Modern)</p>
                    <p className="font-sans text-xs text-[#766F67] mt-0.5">
                      Clean, distraction-free modern screen typography.
                    </p>
                  </button>
                </div>
              </div>

              {/* Display preferences toggles */}
              <div className="space-y-3 pt-2 border-t border-[#E6DCCB]/60">
                <label className="block text-xs font-bold text-[#2D2924]">
                  Display Features
                </label>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F7F1E5]/50 border border-[#E6DCCB]">
                  <div>
                    <p className="text-xs font-bold text-[#2D2924]">Show Verse Numbers</p>
                    <p className="text-[11px] text-[#766F67]">Display superscript numbers before each Bible verse.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={showVerseNumbers}
                    onChange={e => setShowVerseNumbers(e.target.checked)}
                    className="w-5 h-5 rounded text-[#6B4F2A] accent-[#6B4F2A] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F7F1E5]/50 border border-[#E6DCCB]">
                  <div>
                    <p className="text-xs font-bold text-[#2D2924]">Highlight Key Meditation Verse</p>
                    <p className="text-[11px] text-[#766F67]">Feature today's key memory verse prominently before the chapter.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={highlightKeyVerse}
                    onChange={e => setHighlightKeyVerse(e.target.checked)}
                    className="w-5 h-5 rounded text-[#6B4F2A] accent-[#6B4F2A] cursor-pointer"
                  />
                </div>
              </div>

              {/* LIVE SCRIPTURE PREVIEW */}
              <div className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#E6DCCB] border-l-4 border-l-[#D4A94D] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#A67C52] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4A94D]" />
                    Live Reading Preview
                  </span>
                  <span className="text-[10px] text-[#766F67]">John 15:4–5</span>
                </div>

                <div className={`${previewFontClass} ${previewFontFamily} text-[#2D2924] space-y-2.5 pt-1`}>
                  <p className="p-2 rounded-xl bg-[#F7F1E5]/40">
                    {showVerseNumbers && (
                      <sup className="font-sans font-bold text-xs text-[#6B4F2A] mr-2">4</sup>
                    )}
                    Remain in me, and I in you. As the branch can’t bear fruit by itself, unless it remains in the vine, so neither can you, unless you remain in me.
                  </p>
                  <p className="p-2 rounded-xl bg-[#F7F1E5]/40">
                    {showVerseNumbers && (
                      <sup className="font-sans font-bold text-xs text-[#6B4F2A] mr-2">5</sup>
                    )}
                    I am the vine. You are the branches. He who remains in me and I in him bears much fruit, for apart from me you can do nothing.
                  </p>
                </div>
              </div>
            </div>

            {/* Save Reading Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveAll()}
                className="min-h-[46px] px-7 rounded-xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Reading Preferences</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            SECTION 3: ACCOUNT & PROFILE
           ======================================================== */}
        {activeSection === 'account' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#E6DCCB] pb-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#6B4F2A]" />
                  <h2 className="font-serif text-lg font-bold text-[#2D2924]">
                    Account &amp; Personal Profile
                  </h2>
                </div>
                <span className="text-xs text-[#66805C] font-semibold bg-[#66805C]/15 px-2.5 py-0.5 rounded-full">
                  Private Account
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F1E5]/60 border border-[#E6DCCB] text-xs text-[#766F67] space-y-1">
                <p className="font-bold text-[#2D2924]">Personal Profile Only</p>
                <p>
                  FaithSync is built exclusively for your personal Quiet Time with God. There are no public profiles, followers, or social feeds.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2D2924] mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    placeholder="e.g. Arnold"
                    className="w-full text-xs p-3 rounded-xl border border-[#E6DCCB] bg-[#FFFDF8] text-[#2D2924] focus:outline-none focus:border-[#6B4F2A]"
                  />
                  <span className="text-[10px] text-[#766F67]">Used in your daily welcome greeting.</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2924] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-xs p-3 rounded-xl border border-[#E6DCCB] bg-[#FFFDF8] text-[#2D2924] focus:outline-none focus:border-[#6B4F2A]"
                  />
                  <span className="text-[10px] text-[#766F67]">Used to securely authenticate your session.</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2924] mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#E6DCCB] bg-[#FFFDF8] text-[#2D2924] focus:outline-none focus:border-[#6B4F2A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2924] mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#E6DCCB] bg-[#FFFDF8] text-[#2D2924] focus:outline-none focus:border-[#6B4F2A]"
                  />
                </div>
              </div>

              {/* Account identifiers info */}
              <div className="pt-3 border-t border-[#E6DCCB]/60 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#766F67] gap-2">
                <div>
                  <span className="font-semibold text-[#2D2924]">Account ID: </span>
                  <span className="font-mono text-[11px]">{currentUser.faithSyncId || currentUser.id}</span>
                </div>
                <div>
                  <span>Member since: </span>
                  <span className="font-semibold">
                    {new Date(currentUser.createdAt || Date.now()).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Save Account Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveAll()}
                className="min-h-[46px] px-7 rounded-xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Account Changes</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            SECTION 4: PRIVACY, DATA & SECURITY
           ======================================================== */}
        {activeSection === 'privacy' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {/* Private by default commitment */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E6DCCB] pb-3">
                <ShieldCheck className="w-5 h-5 text-[#66805C]" />
                <h2 className="font-serif text-lg font-bold text-[#2D2924]">
                  Private by Default
                </h2>
              </div>

              <div className="space-y-2 text-xs text-[#2D2924] leading-relaxed">
                <p>
                  FaithSync treats your quiet time data as sacred and confidential. Every Scripture reflection prompt, prayer petition, spiritual note, and streak consistency record is strictly restricted to your authenticated user account.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-[#766F67]">
                  <li>No public journal feeds or social timelines.</li>
                  <li>No public prayer sharing or broadcasted reflections.</li>
                  <li>No cross-user access; records are isolated per authenticated user ID.</li>
                  <li>No microphone, camera, or contact-list permissions requested.</li>
                </ul>
              </div>
            </div>

            {/* Data Management: Export Records */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E6DCCB] pb-3">
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-[#6B4F2A]" />
                  <h2 className="font-serif text-lg font-bold text-[#2D2924]">
                    Export Your Spiritual Journal
                  </h2>
                </div>
                <span className="text-xs text-[#766F67]">Data Ownership</span>
              </div>

              <p className="text-xs text-[#766F67] leading-relaxed">
                Download a clean copy of your entire Quiet Time journey, including all Scripture readings, answered reflection prompts, and prayer entries.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleExportData}
                  className="px-5 py-2.5 rounded-xl bg-[#6B4F2A] hover:bg-[#573f21] text-[#FFFDF8] text-xs font-bold flex items-center gap-2 shadow-2xs transition-all active:scale-98 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Journal JSON</span>
                </button>

                {isExported && (
                  <span className="text-xs text-[#66805C] font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    Export file ready
                  </span>
                )}
              </div>

              {exportedJson && (
                <div className="mt-3 p-4 rounded-2xl bg-[#F7F1E5] border border-[#E6DCCB] text-[11px] space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#6B4F2A]">
                    <span>Export Preview</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(exportedJson);
                        setSaveSuccessMessage('Export copied to clipboard');
                        setTimeout(() => setSaveSuccessMessage(''), 2500);
                      }}
                      className="flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy raw data</span>
                    </button>
                  </div>
                  <pre className="overflow-x-auto max-h-48 text-[10px] text-[#2D2924] font-mono whitespace-pre-wrap bg-[#FFFDF8] p-3 rounded-xl border border-[#E6DCCB]">
                    {exportedJson.slice(0, 1500)}
                    {exportedJson.length > 1500 ? '\n... (truncated preview)' : ''}
                  </pre>
                </div>
              )}
            </div>

            {/* Session Security & Sign Out */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FFFDF8] border border-[#E6DCCB] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-base font-bold text-[#2D2924]">
                  Session Sign Out
                </h3>
                <p className="text-xs text-[#766F67] mt-0.5">
                  Securely end your current session. You can sign in anytime to resume your streak.
                </p>
              </div>

              <button
                type="button"
                onClick={logout}
                className="px-5 py-2.5 rounded-xl border border-[#E6DCCB] hover:bg-[#F7F1E5] text-[#2D2924] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
              >
                <LogOut className="w-4 h-4 text-[#766F67]" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Account Deletion (Danger Zone) */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FFFDF8] border border-[#B85C50]/30 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-[#B85C50]" />
                <h3 className="font-serif text-base font-bold text-[#B85C50]">
                  Delete FaithSync Account
                </h3>
              </div>

              <p className="text-xs text-[#766F67] leading-relaxed">
                Permanently delete your FaithSync account and remove all associated Quiet Time journal entries, reflections, and prayers. This action cannot be reversed.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#B85C50]/10 hover:bg-[#B85C50]/20 text-[#B85C50] border border-[#B85C50]/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Account...</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================
          DELETE ACCOUNT CONFIRMATION MODAL
         ======================================================== */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-[#FFFDF8] rounded-3xl border border-[#E6DCCB] p-6 sm:p-7 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#B85C50]/15 text-[#B85C50] flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-[#766F67] hover:text-[#2D2924] p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-[#2D2924]">
                Delete your FaithSync account?
              </h3>
              <p className="text-xs text-[#766F67] leading-relaxed">
                This will permanently delete your account and associated Quiet Time data, including all completed reading sessions, saved reflections, and personal prayers.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F7F1E5] border border-[#E6DCCB] text-[11px] text-[#766F67]">
              Please type <strong className="text-[#2D2924]">delete</strong> to confirm:
              <input
                type="text"
                value={deleteConfirmationText}
                onChange={e => setDeleteConfirmationText(e.target.value)}
                placeholder="delete"
                className="w-full mt-2 p-2 text-xs rounded-lg border border-[#E6DCCB] bg-[#FFFDF8] text-[#2D2924] focus:outline-none focus:border-[#B85C50]"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-[#E6DCCB] bg-[#FFFDF8] hover:bg-[#F7F1E5] text-xs font-semibold text-[#2D2924] cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleteConfirmationText.trim().toLowerCase() !== 'delete'}
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl bg-[#B85C50] hover:bg-[#96473d] text-[#FFFDF8] text-xs font-bold transition-all disabled:opacity-40 cursor-pointer shadow-xs"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
