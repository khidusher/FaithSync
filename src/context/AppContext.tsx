import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  UserSettings,
  ReadingPlan,
  ReadingPlanDay,
  ReadingCompletion,
  FriendUserSummary,
  AppNotification,
  ActivityFeedItem,
  EncouragementType,
  PrayerItem,
  QuietTimeSessionState
} from '../types';
import { StorageService, getLocalDateKey } from '../services/storage';
import { BibleService } from '../services/bibleService';
import { READING_PLANS } from '../data/initialData';
import { firebaseConfigured } from '../lib/firebase';
import { registerAccount, sendPasswordReset, signInWithEmail, signOutAccount, subscribeToAuthState } from '../services/authService';
import { shareCompletion as shareCompletionToCircle, unshareCompletion as unshareCompletionFromCircle } from '../services/socialService';

export type TabType =
  | 'today'
  | 'bible'
  | 'reflect'
  | 'prayer'
  | 'journal'
  | 'profile'
  | 'home'
  | 'calendar'
  | 'friends'
  | 'community'
  | 'events';

interface AppContextType {
  currentUser: User | null;
  authStatus: 'loading' | 'signedOut' | 'signedIn';
  userSettings: UserSettings;
  readingPlans: ReadingPlan[];
  activePlan: ReadingPlan;
  todayDayNumber: number;
  todayPassageDay: ReadingPlanDay;
  completions: ReadingCompletion[];
  hasCompletedToday: boolean;
  prayers: PrayerItem[];
  friends: FriendUserSummary[];
  allUsers: User[];
  notifications: AppNotification[];
  unreadNotificationsCount: number;
  activityFeed: ActivityFeedItem[];
  currentTab: TabType;
  isReadingActive: boolean;
  activeReadingDay: ReadingPlanDay | null;
  activeSession: QuietTimeSessionState | null;
  isCelebrationOpen: boolean;
  justCompletedData: {
    completion: ReadingCompletion;
    streak: number;
    totalDays: number;
    isNew: boolean;
  } | null;
  // Auth & Onboarding
  setCurrentTab: (tab: TabType) => void;
  login: (email: string, password: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  signup: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    fullName?: string;
    displayName?: string;
    churchName?: string;
    branch?: string;
    onboardingCompleted?: boolean;
  }) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => boolean;
  exportUserData: () => string;
  updateProfile: (updates: Partial<User>) => void;
  updateSettings: (updates: Partial<UserSettings>) => void;
  finishOnboarding: (
    onboardingData?: Partial<User> | number,
    preferredTime?: User['preferredQuietTime'],
    friendIdsToAdd?: string[]
  ) => void;
  // Reading & Habit & Session
  startReading: (day?: ReadingPlanDay) => void;
  closeReading: () => void;
  resumeQuietTime: () => void;
  saveActiveSession: (updates: Partial<QuietTimeSessionState>) => void;
  clearActiveSession: () => void;
  markReadingComplete: (
    sessionDataOrNotes?:
      | string
      | {
          notes?: string;
          reflection?: string;
          highlightedVerses?: number[];
          reflectionWhatStoodOut?: string;
          reflectionGodTeaching?: string;
          reflectionApplication?: string;
          personalPrayer?: string;
          keyVerse?: string;
          durationMinutes?: number;
          keepReadingScreenOpen?: boolean;
        },
    reflection?: string,
    highlightedVerses?: number[]
  ) => void;
  closeCelebration: () => void;
  shareCurrentCompletion: () => Promise<number>;
  unshareCurrentCompletion: () => Promise<void>;
  selectReadingPlan: (planId: string) => void;
  // Prayer Journal
  addPrayer: (prayer: Omit<PrayerItem, 'id' | 'userId' | 'createdAt'>) => void;
  updatePrayer: (prayer: PrayerItem) => void;
  deletePrayer: (prayerId: string) => void;
  toggleAnsweredPrayer: (prayerId: string, note?: string) => void;
  // Friends & Encouragement (Backwards-compatibility stubs)
  sendEncouragement: (recipientId: string, type: EncouragementType, message?: string, readingRef?: string) => void;
  sendFriendRequest: (targetUserId: string) => void;
  removeFriend: (friendId: string) => void;
  toggleActivityReaction: (activityId: string, type: EncouragementType) => void;
  // Notifications
  markNotificationsRead: () => void;
  // Demo Switcher
  switchDemoAccount: (userId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => firebaseConfigured ? null : StorageService.getCurrentUser());
  const [authStatus, setAuthStatus] = useState<'loading' | 'signedOut' | 'signedIn'>(firebaseConfigured ? 'loading' : 'signedOut');
  const [userSettings, setUserSettings] = useState<UserSettings>(() => {
    const user = StorageService.getCurrentUser();
    return StorageService.getUserSettings(user?.id || 'user_arnold');
  });
  const [completions, setCompletions] = useState<ReadingCompletion[]>([]);
  const [prayers, setPrayers] = useState<PrayerItem[]>([]);
  const [friends, setFriends] = useState<FriendUserSummary[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [activityFeed, setActivityFeed] = useState<ActivityFeedItem[]>([]);
  const [currentTab, setCurrentTab] = useState<TabType>('today');
  const [isReadingActive, setIsReadingActive] = useState<boolean>(false);
  const [activeReadingDay, setActiveReadingDay] = useState<ReadingPlanDay | null>(null);
  const [activeSession, setActiveSession] = useState<QuietTimeSessionState | null>(() => {
    const user = StorageService.getCurrentUser();
    return user ? StorageService.getQuietTimeSession(user.id) : null;
  });
  const [isCelebrationOpen, setIsCelebrationOpen] = useState<boolean>(false);
  const [justCompletedData, setJustCompletedData] = useState<{
    completion: ReadingCompletion;
    streak: number;
    totalDays: number;
    isNew: boolean;
  } | null>(null);

  // Sync state on mount or user change
  const reloadData = (user: User | null) => {
    if (!user) return;
    const comps = StorageService.getCompletions(user.id);
    setCompletions(comps);
    setPrayers(StorageService.getPrayers(user.id));
    const frs = StorageService.getFriendsWithStatus(user.id);
    setFriends(frs);
    setAllUsers(StorageService.getAllUsers());
    setNotifications(StorageService.getNotifications(user.id));
    setActivityFeed(StorageService.getActivityFeed());
    setUserSettings(StorageService.getUserSettings(user.id));
    setActiveSession(StorageService.getQuietTimeSession(user.id));
  };

  useEffect(() => {
    if (currentUser) reloadData(currentUser);
  }, [currentUser?.id]);

  useEffect(() => {
    if (!firebaseConfigured) return;
    return subscribeToAuthState(user => {
      setCurrentUser(user);
      setAuthStatus(user ? 'signedIn' : 'signedOut');
      StorageService.setCurrentUser(user);
      if (user) reloadData(user);
      else {
        setCompletions([]);
        setPrayers([]);
        setFriends([]);
        setActivityFeed([]);
        setActiveSession(null);
      }
    });
  }, []);

  // Determine active reading plan and today's passage
  const activePlan = useMemo(() => {
    const planId = currentUser?.readingPlanId || 'plan_walk_with_jesus';
    return READING_PLANS.find(p => p.id === planId) || READING_PLANS[0];
  }, [currentUser?.readingPlanId]);

  const todayDayNumber = useMemo(() => {
    return currentUser?.currentDayNumber || 1;
  }, [currentUser?.currentDayNumber]);

  const todayPassageDay = useMemo(() => {
    const day = activePlan.days.find(d => d.dayNumber === todayDayNumber);
    return day || activePlan.days[0];
  }, [activePlan, todayDayNumber]);

  const hasCompletedToday = useMemo(() => {
    if (!currentUser) return false;
    const todayKey = getLocalDateKey();
    return completions.some(c => c.dateKey === todayKey);
  }, [currentUser, completions]);

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  // Auth operations
const login = async (email: string, password = ''): Promise<void> => {
  await signInWithEmail(email, password);
};

const signup = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  fullName?: string;
  displayName?: string;
  churchName?: string;
  branch?: string;
  onboardingCompleted?: boolean;
}): Promise<void> => {
  const user = await registerAccount({
    email: userData.email,
    password: userData.password,
    username: userData.username,
    firstName: userData.firstName,
    lastName: userData.lastName
  });
  StorageService.setCurrentUser(user);
  setCurrentUser(user);
  setAuthStatus('signedIn');
  reloadData(user);
};

const logout = async () => {
  if (firebaseConfigured) await signOutAccount();
  else StorageService.setCurrentUser(null);
  setCurrentUser(null);
  setAuthStatus('signedOut');
  setActiveSession(null);
  setCompletions([]);
  setPrayers([]);
  setActiveReadingDay(null);
  setIsReadingActive(false);
};


  const deleteAccount = (): boolean => {
    if (!currentUser) return false;
    const res = StorageService.deleteAccount(currentUser.id);
    setCurrentUser(null);
    setActiveSession(null);
    setCompletions([]);
    setPrayers([]);
    setActiveReadingDay(null);
    setIsReadingActive(false);
    return res.success;
  };

  const exportUserData = (): string => {
    if (!currentUser) return '';
    return StorageService.exportUserData(currentUser.id);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    StorageService.setCurrentUser(updated);
    setCurrentUser(updated);
  };

  const updateSettings = (updates: Partial<UserSettings>) => {
    if (!currentUser) return;
    const updated = { ...userSettings, ...updates };
    StorageService.saveUserSettings(updated);
    setUserSettings(updated);
  };

  const finishOnboarding = (
    onboardingData?: Partial<User> | number,
    preferredTime?: User['preferredQuietTime'],
    friendIdsToAdd?: string[]
  ) => {
    if (!currentUser) return;

    if (typeof onboardingData === 'object' && onboardingData !== null) {
      const updated: User = {
        ...currentUser,
        ...onboardingData,
        isOnboarded: true,
        onboardingCompleted: true
      };
      StorageService.setCurrentUser(updated);
      setCurrentUser(updated);
      reloadData(updated);
      return;
    }

    const goalMinutes = typeof onboardingData === 'number' ? onboardingData : 10;
    const time = preferredTime || 'Morning';
    const friendsToAdd = friendIdsToAdd || [];

    // Add selected friends
    friendsToAdd.forEach(fId => {
      StorageService.sendFriendRequest(currentUser.id, fId);
    });

    const updated: User = {
      ...currentUser,
      quietTimeGoalMinutes: goalMinutes,
      preferredQuietTime: time,
      isOnboarded: true,
      onboardingCompleted: true
    };
    StorageService.setCurrentUser(updated);
    setCurrentUser(updated);
    reloadData(updated);
  };

  // Reading & Habit flows
  const saveActiveSession = (updates: Partial<QuietTimeSessionState>) => {
    if (!currentUser) return;
    setActiveSession(prev => {
      const targetDay = activeReadingDay || todayPassageDay;
      const updated: QuietTimeSessionState = prev
        ? { ...prev, ...updates, lastUpdated: new Date().toISOString() }
        : {
            userId: currentUser.id,
            planId: activePlan.id,
            dayNumber: targetDay.dayNumber,
            scriptureReference: targetDay.scriptureReference,
            currentStage: 'prepare',
            readingProgress: 0,
            highlightedVerses: [],
            reflectionWhatStoodOut: '',
            reflectionGodTeaching: '',
            reflectionApplication: '',
            personalPrayer: '',
            saveToPrayerJournal: true,
            startTime: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            isCompleted: false,
            ...updates
          };
      StorageService.saveQuietTimeSession(updated);
      return updated;
    });
  };

  const clearActiveSession = () => {
    if (!currentUser) return;
    StorageService.clearQuietTimeSession(currentUser.id);
    setActiveSession(null);
  };

  const resumeQuietTime = () => {
    if (activeSession) {
      const day = activePlan.days.find(d => d.dayNumber === activeSession.dayNumber) || todayPassageDay;
      setActiveReadingDay(day);
      setIsReadingActive(true);
    } else {
      startReading();
    }
  };

  const startReading = (day?: ReadingPlanDay) => {
    const targetDay = day || todayPassageDay;
    setActiveReadingDay(targetDay);
    if (!activeSession || activeSession.dayNumber !== targetDay.dayNumber) {
      const newSession: QuietTimeSessionState = {
        userId: currentUser?.id || 'user_arnold',
        planId: activePlan.id,
        dayNumber: targetDay.dayNumber,
        scriptureReference: targetDay.scriptureReference,
        currentStage: 'prepare',
        readingProgress: 0,
        highlightedVerses: [],
        reflectionWhatStoodOut: '',
        reflectionGodTeaching: '',
        reflectionApplication: '',
        personalPrayer: '',
        saveToPrayerJournal: true,
        startTime: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        isCompleted: false
      };
      StorageService.saveQuietTimeSession(newSession);
      setActiveSession(newSession);
    }
    setIsReadingActive(true);
  };

  const closeReading = () => {
    setIsReadingActive(false);
  };

  const markReadingComplete = (
    sessionDataOrNotes?:
      | string
      | {
          notes?: string;
          reflection?: string;
          highlightedVerses?: number[];
          reflectionWhatStoodOut?: string;
          reflectionGodTeaching?: string;
          reflectionApplication?: string;
          personalPrayer?: string;
          keyVerse?: string;
          durationMinutes?: number;
          keepReadingScreenOpen?: boolean;
        },
    reflection?: string,
    highlightedVerses?: number[]
  ) => {
    if (!currentUser) return;
    const readingDay = activeReadingDay || todayPassageDay;

    const payload =
      typeof sessionDataOrNotes === 'object' && sessionDataOrNotes !== null
        ? {
            userId: currentUser.id,
            readingPlanId: activePlan.id,
            dayNumber: readingDay.dayNumber,
            scriptureReference: readingDay.scriptureReference,
            ...sessionDataOrNotes
          }
        : {
            userId: currentUser.id,
            readingPlanId: activePlan.id,
            dayNumber: readingDay.dayNumber,
            scriptureReference: readingDay.scriptureReference,
            notes: sessionDataOrNotes,
            reflection,
            highlightedVerses
          };

    const result = StorageService.recordCompletion(payload);

    // Clear active session once completed
    StorageService.clearQuietTimeSession(currentUser.id);
    setActiveSession(null);

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#6B4F2A', '#D4A94D', '#66805C', '#A67C52', '#F7F1E5']
      });
    } catch {
      // Confetti fallback
    }

    // Update state
    setCurrentUser(result.user);
    setCompletions(StorageService.getCompletions(currentUser.id));
    setActivityFeed(StorageService.getActivityFeed());

    setJustCompletedData({
      completion: result.completion,
      streak: result.user.currentStreak,
      totalDays: result.user.totalCompletedDays,
      isNew: result.isNew
    });

    const shouldKeepOpen =
      typeof sessionDataOrNotes === 'object' && sessionDataOrNotes !== null && sessionDataOrNotes.keepReadingScreenOpen;

    if (!shouldKeepOpen) {
      setIsReadingActive(false);
      setIsCelebrationOpen(true);
    }
  };

  const shareCurrentCompletion = async () => {
    if (!currentUser || !justCompletedData) return 0;
    return shareCompletionToCircle(currentUser.id, justCompletedData.completion, currentUser);
  };

  const unshareCurrentCompletion = async () => {
    if (!currentUser || !justCompletedData) return;
    await unshareCompletionFromCircle(currentUser.id, justCompletedData.completion.id);
  };

  const closeCelebration = () => {
    setIsCelebrationOpen(false);
    setJustCompletedData(null);
  };

  const selectReadingPlan = (planId: string) => {
    if (!currentUser) return;
    const updated: User = {
      ...currentUser,
      readingPlanId: planId,
      currentDayNumber: 1
    };
    StorageService.setCurrentUser(updated);
    setCurrentUser(updated);
  };

  // Personal Prayer Management
  const addPrayer = (prayerData: Omit<PrayerItem, 'id' | 'userId' | 'createdAt'>) => {
    if (!currentUser) return;
    const newPrayer: PrayerItem = {
      ...prayerData,
      id: `prayer_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      userId: currentUser.id,
      createdAt: new Date().toISOString()
    };
    StorageService.savePrayer(newPrayer);
    setPrayers(StorageService.getPrayers(currentUser.id));
  };

  const updatePrayer = (prayer: PrayerItem) => {
    if (!currentUser) return;
    StorageService.savePrayer(prayer);
    setPrayers(StorageService.getPrayers(currentUser.id));
  };

  const deletePrayer = (prayerId: string) => {
    if (!currentUser) return;
    StorageService.deletePrayer(currentUser.id, prayerId);
    setPrayers(StorageService.getPrayers(currentUser.id));
  };

  const toggleAnsweredPrayer = (prayerId: string, note?: string) => {
    if (!currentUser) return;
    StorageService.toggleAnsweredPrayer(currentUser.id, prayerId, note);
    setPrayers(StorageService.getPrayers(currentUser.id));
  };

  // Social & Encouragements
  const sendEncouragement = (
    recipientId: string,
    type: EncouragementType,
    message?: string,
    readingRef?: string
  ) => {
    if (!currentUser) return;
    const defaultMessages: Record<EncouragementType, string> = {
      heart: 'Loved your quiet time consistency!',
      celebrate: 'Celebrating your milestone today!',
      pray: 'Lifting you up in prayer as you abide in the Word.',
      keep_going: 'Keep going! Rooting for you every day.',
      proud_of_you: 'Proud of you for seeking God first.',
      growing_together: 'Growing together with you in faith.'
    };

    StorageService.sendEncouragement({
      senderId: currentUser.id,
      senderName: `${currentUser.firstName} ${currentUser.lastName}`,
      senderAvatar: currentUser.avatarUrl,
      recipientId,
      type,
      message: message || defaultMessages[type],
      targetReadingRef: readingRef
    });

    setFriends(StorageService.getFriendsWithStatus(currentUser.id));
  };

  const sendFriendRequest = (targetUserId: string) => {
    if (!currentUser) return;
    StorageService.sendFriendRequest(currentUser.id, targetUserId);
    setFriends(StorageService.getFriendsWithStatus(currentUser.id));
  };

  const removeFriend = (friendId: string) => {
    if (!currentUser) return;
    StorageService.removeFriend(currentUser.id, friendId);
    setFriends(StorageService.getFriendsWithStatus(currentUser.id));
  };

  const toggleActivityReaction = (activityId: string, type: EncouragementType) => {
    const updated = StorageService.toggleActivityReaction(activityId, type);
    setActivityFeed([...updated]);
  };

  const markNotificationsRead = () => {
    if (!currentUser) return;
    StorageService.markAllNotificationsRead(currentUser.id);
    setNotifications(StorageService.getNotifications(currentUser.id));
  };

  const switchDemoAccount = (userId: string) => {
    const users = StorageService.getAllUsers();
    const target = users.find(u => u.id === userId);
    if (target) {
      StorageService.setCurrentUser(target);
      setCurrentUser(target);
      reloadData(target);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        authStatus,
        userSettings,
        readingPlans: READING_PLANS,
        activePlan,
        todayDayNumber,
        todayPassageDay,
        completions,
        hasCompletedToday,
        prayers,
        friends,
        allUsers,
        notifications,
        unreadNotificationsCount,
        activityFeed,
        currentTab,
        isReadingActive,
        activeReadingDay,
        activeSession,
        isCelebrationOpen,
        justCompletedData,
        setCurrentTab,
        login,
        sendPasswordReset,
        signup,
        logout,
        deleteAccount,
        exportUserData,
        updateProfile,
        updateSettings,
        finishOnboarding,
        startReading,
        closeReading,
        resumeQuietTime,
        saveActiveSession,
        clearActiveSession,
        markReadingComplete,
        closeCelebration,
        shareCurrentCompletion,
        unshareCurrentCompletion,
        selectReadingPlan,
        addPrayer,
        updatePrayer,
        deletePrayer,
        toggleAnsweredPrayer,
        sendEncouragement,
        sendFriendRequest,
        removeFriend,
        toggleActivityReaction,
        markNotificationsRead,
        switchDemoAccount
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
