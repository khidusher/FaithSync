import {
  User,
  UserSettings,
  ReadingCompletion,
  FriendRelation,
  Encouragement,
  AppNotification,
  ActivityFeedItem,
  EncouragementType,
  FriendUserSummary,
  PrayerItem,
  QuietTimeSessionState
} from '../types';
import {
  DEMO_FRIENDS,
  INITIAL_USER_SETTINGS,
  INITIAL_NOTIFICATIONS,
  AVATAR_SARAH,
  AVATAR_DAVID,
  AVATAR_MICHAEL
} from '../data/initialData';

const STORAGE_KEYS = {
  CURRENT_USER: 'faithsync_current_user',
  ALL_USERS: 'faithsync_all_users',
  USER_SETTINGS: 'faithsync_user_settings',
  COMPLETIONS: 'faithsync_completions',
  PRAYERS: 'faithsync_personal_prayers',
  FRIENDSHIPS: 'faithsync_friendships',
  ENCOURAGEMENTS: 'faithsync_encouragements',
  NOTIFICATIONS: 'faithsync_notifications',
  ACTIVITY_FEED: 'faithsync_activity_feed',
  QUIET_TIME_SESSION: 'faithsync_quiet_time_session'
};

// Helper: Get local Date String YYYY-MM-DD
export function getLocalDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayDateKey(date: Date = new Date()): string {
  const d = new Date(date);
  d.setDate(d.getDate() - 1);
  return getLocalDateKey(d);
}

// Generate default initial user if none exists
export function getDefaultUser(): User {
  return {
    id: 'user_arnold',
    fullName: 'Arnold Odjidja',
    displayName: 'Arnold',
    email: 'arnoldodjidja01@gmail.com',
    photoURL: 'https://api.dicebear.com/7.x/micah/svg?seed=Arnold&backgroundColor=b6e3f4,c0aede,d1d4f9',
    churchId: 'church_grace_central',
    churchName: 'Grace Community Church',
    branch: 'Central Campus',
    ministry: 'Youth Fellowship',
    role: 'Member',
    onboardingCompleted: true,
    createdAt: '2026-08-10T09:00:00Z',
    updatedAt: '2026-08-10T09:00:00Z',
    firstName: 'Arnold',
    lastName: 'Odjidja',
    username: 'arnold_o',
    faithSyncId: 'FS-7729',
    avatarUrl: 'https://api.dicebear.com/7.x/micah/svg?seed=Arnold&backgroundColor=b6e3f4,c0aede,d1d4f9',
    currentStreak: 5,
    bestStreak: 12,
    totalCompletedDays: 24,
    quietTimeGoalMinutes: 10,
    preferredQuietTime: 'Morning',
    readingPlanId: 'plan_walk_with_jesus',
    currentDayNumber: 1,
    isOnboarded: true,
    bio: 'Growing in faith one morning at a time.',
    churchOrFellowship: 'Grace Community Church'
  };
}

// Seed initial history completions for Arnold (e.g. completed past 5 days)
function getInitialCompletions(userId: string): ReadingCompletion[] {
  const completions: ReadingCompletion[] = [];
  const today = new Date();
  
  // Previous 5 days completed
  for (let i = 1; i <= 5; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateKey = getLocalDateKey(d);
    completions.push({
      id: `comp_${userId}_${dateKey}`,
      userId,
      readingPlanId: 'plan_walk_with_jesus',
      dayNumber: (6 - i) || 1,
      scriptureReference: i === 1 ? 'Philippians 4:4–9' : 'John 15:1–11',
      completedAt: d.toISOString(),
      dateKey,
      notes: 'Grateful for quiet moments in the Word with friends.'
    });
  }

  // Also seed some for Sarah and David
  const yesterdayKey = getYesterdayDateKey();
  const todayKey = getLocalDateKey();

  completions.push({
    id: `comp_sarah_${todayKey}`,
    userId: 'user_sarah',
    readingPlanId: 'plan_walk_with_jesus',
    dayNumber: 1,
    scriptureReference: 'John 15:1–11',
    completedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    dateKey: todayKey
  });

  completions.push({
    id: `comp_david_${todayKey}`,
    userId: 'user_david',
    readingPlanId: 'plan_walk_with_jesus',
    dayNumber: 1,
    scriptureReference: 'John 15:1–11',
    completedAt: new Date(Date.now() - 1000 * 60 * 130).toISOString(),
    dateKey: todayKey
  });

  return completions;
}

function getInitialPrayers(userId: string): PrayerItem[] {
  return [
    {
      id: `prayer_1_${userId}`,
      userId,
      title: 'Patience and peace in my daily routine',
      body: 'Lord, teach me to abide in You like branches on the vine. Keep my heart steady when deadlines press in, and remind me that apart from You I can do nothing.',
      category: 'Guidance',
      isAnswered: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      linkedScripture: 'John 15:4'
    },
    {
      id: `prayer_2_${userId}`,
      userId,
      title: 'Strength and healing for family',
      body: 'Father, protect my parents, renew their health and rest, and bless our home with Your joy and quiet peace.',
      category: 'Intercession',
      isAnswered: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString()
    },
    {
      id: `prayer_3_${userId}`,
      userId,
      title: 'Gratitude for clarity through a stressful week',
      body: 'Thank You for carrying me through last week’s tension and reminding me of Philippians 4:6–7. You answered with quiet assurance.',
      category: 'Gratitude',
      isAnswered: true,
      answeredDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
      answeredNote: 'Experienced God’s peace guarding my mind throughout the day.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
      linkedScripture: 'Philippians 4:6–7'
    }
  ];
}

function getInitialFriendships(userId: string): FriendRelation[] {
  return [
    {
      id: 'rel_sarah',
      requesterId: userId,
      addresseeId: 'user_sarah',
      status: 'accepted',
      createdAt: '2026-08-15T10:00:00Z'
    },
    {
      id: 'rel_david',
      requesterId: 'user_david',
      addresseeId: userId,
      status: 'accepted',
      createdAt: '2026-08-20T11:00:00Z'
    },
    {
      id: 'rel_michael',
      requesterId: userId,
      addresseeId: 'user_michael',
      status: 'accepted',
      createdAt: '2026-09-02T14:00:00Z'
    }
  ];
}

function getInitialActivityFeed(): ActivityFeedItem[] {
  const todayKey = getLocalDateKey();
  return [
    {
      id: 'act_1',
      userId: 'user_sarah',
      userName: 'Sarah Jenkins',
      userAvatar: AVATAR_SARAH,
      actionType: 'completed_reading',
      scriptureReference: 'John 15:1–11',
      streakCount: 6,
      timestamp: '45m ago',
      reactions: [
        { type: 'heart', count: 3, userReacted: true },
        { type: 'pray', count: 2, userReacted: false }
      ]
    },
    {
      id: 'act_2',
      userId: 'user_david',
      userName: 'David Chen',
      userAvatar: AVATAR_DAVID,
      actionType: 'completed_reading',
      scriptureReference: 'John 15:1–11',
      streakCount: 12,
      timestamp: '2h ago',
      reactions: [
        { type: 'celebrate', count: 4, userReacted: true },
        { type: 'heart', count: 2, userReacted: false }
      ]
    },
    {
      id: 'act_3',
      userId: 'user_michael',
      userName: 'Michael Okonjo',
      userAvatar: AVATAR_MICHAEL,
      actionType: 'streak_milestone',
      scriptureReference: '3 days of quiet time',
      streakCount: 3,
      timestamp: 'Yesterday',
      reactions: [
        { type: 'keep_going', count: 5, userReacted: true }
      ]
    }
  ];
}

export class StorageService {
  // Current user
  static getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (!data) {
        const defaultUser = getDefaultUser();
        this.setCurrentUser(defaultUser);
        return defaultUser;
      }
      return JSON.parse(data);
    } catch {
      return getDefaultUser();
    }
  }

  static setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      this.updateUserInList(user);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }

  // All Users registry (for friend search, demo profiles)
  static getAllUsers(): User[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ALL_USERS);
      if (!data) {
        const initial = [getDefaultUser(), ...DEMO_FRIENDS];
        localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(data);
    } catch {
      return [getDefaultUser(), ...DEMO_FRIENDS];
    }
  }

  static updateUserInList(user: User): void {
    const list = this.getAllUsers();
    const idx = list.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      list[idx] = user;
    } else {
      list.push(user);
    }
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(list));
  }

  // User Settings
  static getUserSettings(userId: string): UserSettings {
    try {
      const data = localStorage.getItem(`${STORAGE_KEYS.USER_SETTINGS}_${userId}`);
      if (!data) {
        const defaults = { ...INITIAL_USER_SETTINGS, userId };
        this.saveUserSettings(defaults);
        return defaults;
      }
      return JSON.parse(data);
    } catch {
      return { ...INITIAL_USER_SETTINGS, userId };
    }
  }

  static saveUserSettings(settings: UserSettings): void {
    localStorage.setItem(`${STORAGE_KEYS.USER_SETTINGS}_${settings.userId}`, JSON.stringify(settings));
  }

  // Completions (Enforce idempotency)
  static getCompletions(userId?: string): ReadingCompletion[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETIONS);
      let list: ReadingCompletion[] = data ? JSON.parse(data) : [];
      if (!data || list.length === 0) {
        const currentUser = this.getCurrentUser();
        list = currentUser ? getInitialCompletions(currentUser.id) : [];
        localStorage.setItem(STORAGE_KEYS.COMPLETIONS, JSON.stringify(list));
      }
      if (userId) {
        return list.filter(c => c.userId === userId);
      }
      return list;
    } catch {
      return [];
    }
  }

  static hasCompletedToday(userId: string, dateKey: string = getLocalDateKey()): boolean {
    const completions = this.getCompletions(userId);
    return completions.some(c => c.dateKey === dateKey);
  }

  /**
   * Idempotent completion saving
   * Returns: { completion, isNew, newStreak, bestStreak, totalDays }
   */
  static recordCompletion(params: {
    userId: string;
    readingPlanId: string;
    dayNumber: number;
    scriptureReference: string;
    notes?: string;
    reflection?: string;
    highlightedVerses?: number[];
    reflectionWhatStoodOut?: string;
    reflectionGodTeaching?: string;
    reflectionApplication?: string;
    personalPrayer?: string;
    keyVerse?: string;
    durationMinutes?: number;
  }): {
    completion: ReadingCompletion;
    isNew: boolean;
    user: User;
  } {
    const todayKey = getLocalDateKey();
    const allCompletions = this.getCompletions();
    const existing = allCompletions.find(
      c => c.userId === params.userId && c.dateKey === todayKey
    );

    let currentUser = this.getCurrentUser();
    if (!currentUser || currentUser.id !== params.userId) {
      currentUser = this.getAllUsers().find(u => u.id === params.userId) || getDefaultUser();
    }

    if (existing) {
      // Already recorded for today -> Idempotent! Update notes & prompts if provided
      existing.notes = params.notes || existing.notes;
      existing.reflection = params.reflection || existing.reflection;
      existing.highlightedVerses = params.highlightedVerses || existing.highlightedVerses;
      if (params.reflectionWhatStoodOut) existing.reflectionWhatStoodOut = params.reflectionWhatStoodOut;
      if (params.reflectionGodTeaching) existing.reflectionGodTeaching = params.reflectionGodTeaching;
      if (params.reflectionApplication) existing.reflectionApplication = params.reflectionApplication;
      if (params.personalPrayer) existing.personalPrayer = params.personalPrayer;
      if (params.keyVerse) existing.keyVerse = params.keyVerse;
      if (params.durationMinutes) existing.durationMinutes = params.durationMinutes;

      localStorage.setItem(STORAGE_KEYS.COMPLETIONS, JSON.stringify(allCompletions));
      return { completion: existing, isNew: false, user: currentUser };
    }

    // New completion for today
    const newCompletion: ReadingCompletion = {
      id: `comp_${params.userId}_${todayKey}_${Date.now()}`,
      userId: params.userId,
      readingPlanId: params.readingPlanId,
      dayNumber: params.dayNumber,
      scriptureReference: params.scriptureReference,
      completedAt: new Date().toISOString(),
      dateKey: todayKey,
      notes: params.notes,
      reflection: params.reflection,
      highlightedVerses: params.highlightedVerses,
      reflectionWhatStoodOut: params.reflectionWhatStoodOut,
      reflectionGodTeaching: params.reflectionGodTeaching,
      reflectionApplication: params.reflectionApplication,
      personalPrayer: params.personalPrayer,
      keyVerse: params.keyVerse,
      durationMinutes: params.durationMinutes || 10
    };

    allCompletions.push(newCompletion);
    localStorage.setItem(STORAGE_KEYS.COMPLETIONS, JSON.stringify(allCompletions));

    // Calculate streak update:
    // Did user complete yesterday?
    const yesterdayKey = getYesterdayDateKey();
    const completedYesterday = allCompletions.some(
      c => c.userId === params.userId && c.dateKey === yesterdayKey
    );

    let newCurrentStreak = completedYesterday ? currentUser.currentStreak + 1 : 1;
    let newBestStreak = Math.max(currentUser.bestStreak, newCurrentStreak);
    let newTotalDays = currentUser.totalCompletedDays + 1;

    const updatedUser: User = {
      ...currentUser,
      currentStreak: newCurrentStreak,
      bestStreak: newBestStreak,
      totalCompletedDays: newTotalDays,
      currentDayNumber: Math.min(params.dayNumber + 1, 7)
    };

    this.setCurrentUser(updatedUser);

    return { completion: newCompletion, isNew: true, user: updatedUser };
  }

  // Personal Prayer Management (Private & Confidential)
  static getPrayers(userId: string): PrayerItem[] {
    try {
      const data = localStorage.getItem(`${STORAGE_KEYS.PRAYERS}_${userId}`);
      if (!data) {
        // Only provide sample seed prayers for the default demo profile (user_arnold)
        const initial = userId === 'user_arnold' ? getInitialPrayers(userId) : [];
        localStorage.setItem(`${STORAGE_KEYS.PRAYERS}_${userId}`, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(data);
    } catch {
      return userId === 'user_arnold' ? getInitialPrayers(userId) : [];
    }
  }

  static savePrayer(prayer: PrayerItem): void {
    const list = this.getPrayers(prayer.userId);
    const idx = list.findIndex(p => p.id === prayer.id);
    if (idx >= 0) {
      list[idx] = prayer;
    } else {
      list.unshift(prayer);
    }
    localStorage.setItem(`${STORAGE_KEYS.PRAYERS}_${prayer.userId}`, JSON.stringify(list));
  }

  static deletePrayer(userId: string, prayerId: string): void {
    const list = this.getPrayers(userId).filter(p => p.id !== prayerId);
    localStorage.setItem(`${STORAGE_KEYS.PRAYERS}_${userId}`, JSON.stringify(list));
  }

  static toggleAnsweredPrayer(userId: string, prayerId: string, note?: string): void {
    const list = this.getPrayers(userId);
    const item = list.find(p => p.id === prayerId);
    if (item) {
      item.isAnswered = !item.isAnswered;
      if (item.isAnswered) {
        item.answeredDate = new Date().toISOString();
        if (note) item.answeredNote = note;
      } else {
        item.answeredDate = undefined;
        item.answeredNote = undefined;
      }
      localStorage.setItem(`${STORAGE_KEYS.PRAYERS}_${userId}`, JSON.stringify(list));
    }
  }

  // Friendships
  static getFriendships(userId: string): FriendRelation[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FRIENDSHIPS);
      let list: FriendRelation[] = data ? JSON.parse(data) : [];
      if (!data || list.length === 0) {
        list = getInitialFriendships(userId);
        localStorage.setItem(STORAGE_KEYS.FRIENDSHIPS, JSON.stringify(list));
      }
      return list;
    } catch {
      return [];
    }
  }

  static getFriendsWithStatus(currentUserId: string): FriendUserSummary[] {
    const friendships = this.getFriendships(currentUserId);
    const allUsers = this.getAllUsers();
    const todayKey = getLocalDateKey();
    const completions = this.getCompletions();

    const acceptedRelations = friendships.filter(
      r => (r.requesterId === currentUserId || r.addresseeId === currentUserId) && r.status === 'accepted'
    );

    return acceptedRelations.map(rel => {
      const friendId = rel.requesterId === currentUserId ? rel.addresseeId : rel.requesterId;
      const friendUser = allUsers.find(u => u.id === friendId) || DEMO_FRIENDS.find(f => f.id === friendId) || {
        id: friendId,
        firstName: 'Friend',
        lastName: '',
        username: 'friend',
        email: 'friend@faithsync.org',
        faithSyncId: 'FS-0000',
        avatarUrl: AVATAR_SARAH,
        currentStreak: 1,
        bestStreak: 1,
        totalCompletedDays: 1,
        createdAt: new Date().toISOString(),
        quietTimeGoalMinutes: 10,
        preferredQuietTime: 'Morning',
        readingPlanId: 'plan_walk_with_jesus',
        currentDayNumber: 1,
        isOnboarded: true
      };

      const friendTodayComp = completions.find(c => c.userId === friendId && c.dateKey === todayKey);
      const hasCompletedToday = !!friendTodayComp;

      return {
        user: friendUser,
        friendshipStatus: rel.status,
        hasCompletedToday,
        todayReadingRef: friendTodayComp?.scriptureReference || (hasCompletedToday ? 'John 15:1–11' : undefined),
        lastCompletedDate: friendTodayComp?.completedAt
      };
    });
  }

  static updateFriendshipStatus(relationId: string, status: 'accepted' | 'declined' | 'blocked'): void {
    const currentUserId = this.getCurrentUser()?.id || 'user_arnold';
    const list = this.getFriendships(currentUserId);
    const item = list.find(r => r.id === relationId);
    if (item) {
      item.status = status;
      localStorage.setItem(STORAGE_KEYS.FRIENDSHIPS, JSON.stringify(list));
    }
  }

  static sendFriendRequest(currentUserId: string, targetUserId: string): FriendRelation {
    const list = this.getFriendships(currentUserId);
    const existing = list.find(
      r => (r.requesterId === currentUserId && r.addresseeId === targetUserId) ||
           (r.requesterId === targetUserId && r.addresseeId === currentUserId)
    );

    if (existing) {
      return existing;
    }

    const newRelation: FriendRelation = {
      id: `rel_${Date.now()}`,
      requesterId: currentUserId,
      addresseeId: targetUserId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    list.push(newRelation);
    localStorage.setItem(STORAGE_KEYS.FRIENDSHIPS, JSON.stringify(list));
    return newRelation;
  }

  static removeFriend(currentUserId: string, friendId: string): void {
    let list = this.getFriendships(currentUserId);
    list = list.filter(
      r => !((r.requesterId === currentUserId && r.addresseeId === friendId) ||
             (r.requesterId === friendId && r.addresseeId === currentUserId))
    );
    localStorage.setItem(STORAGE_KEYS.FRIENDSHIPS, JSON.stringify(list));
  }

  // Encouragements
  static getEncouragements(): Encouragement[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ENCOURAGEMENTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static sendEncouragement(encouragement: Omit<Encouragement, 'id' | 'createdAt'>): Encouragement {
    const list = this.getEncouragements();
    const created: Encouragement = {
      ...encouragement,
      id: `enc_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    list.push(created);
    localStorage.setItem(STORAGE_KEYS.ENCOURAGEMENTS, JSON.stringify(list));

    // Also trigger notification for recipient
    this.addNotification({
      id: `notif_${Date.now()}`,
      userId: encouragement.recipientId,
      type: 'encouragement',
      title: `${encouragement.senderName} encouraged you!`,
      message: encouragement.message || `Sent you encouragement: ${encouragement.type}`,
      senderId: encouragement.senderId,
      senderName: encouragement.senderName,
      senderAvatar: encouragement.senderAvatar,
      isRead: false,
      createdAt: new Date().toISOString()
    });

    return created;
  }

  // Activity Feed
  static getActivityFeed(): ActivityFeedItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVITY_FEED);
      if (!data) {
        const initial = getInitialActivityFeed();
        localStorage.setItem(STORAGE_KEYS.ACTIVITY_FEED, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(data);
    } catch {
      return getInitialActivityFeed();
    }
  }

  static addActivityFeedItem(item: ActivityFeedItem): void {
    const list = this.getActivityFeed();
    list.unshift(item);
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_FEED, JSON.stringify(list.slice(0, 50)));
  }

  static toggleActivityReaction(activityId: string, type: EncouragementType): ActivityFeedItem[] {
    const list = this.getActivityFeed();
    const act = list.find(a => a.id === activityId);
    if (act) {
      const existingReaction = act.reactions.find(r => r.type === type);
      if (existingReaction) {
        if (existingReaction.userReacted) {
          existingReaction.userReacted = false;
          existingReaction.count = Math.max(0, existingReaction.count - 1);
        } else {
          existingReaction.userReacted = true;
          existingReaction.count += 1;
        }
      } else {
        act.reactions.push({
          type,
          count: 1,
          userReacted: true
        });
      }
      localStorage.setItem(STORAGE_KEYS.ACTIVITY_FEED, JSON.stringify(list));
    }
    return list;
  }

  // Notifications
  static getNotifications(userId: string): AppNotification[] {
    try {
      const data = localStorage.getItem(`${STORAGE_KEYS.NOTIFICATIONS}_${userId}`);
      if (!data) {
        localStorage.setItem(`${STORAGE_KEYS.NOTIFICATIONS}_${userId}`, JSON.stringify(INITIAL_NOTIFICATIONS));
        return INITIAL_NOTIFICATIONS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  }

  static addNotification(notif: AppNotification): void {
    const list = this.getNotifications(notif.userId);
    list.unshift(notif);
    localStorage.setItem(`${STORAGE_KEYS.NOTIFICATIONS}_${notif.userId}`, JSON.stringify(list.slice(0, 30)));
  }

  static markAllNotificationsRead(userId: string): void {
    const list = this.getNotifications(userId);
    const updated = list.map(n => ({ ...n, isRead: true }));
    localStorage.setItem(`${STORAGE_KEYS.NOTIFICATIONS}_${userId}`, JSON.stringify(updated));
  }

  // Active Quiet Time Session persistence
  static getQuietTimeSession(userId: string): QuietTimeSessionState | null {
    try {
      const data = localStorage.getItem(`${STORAGE_KEYS.QUIET_TIME_SESSION}_${userId}`);
      if (!data) return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  static saveQuietTimeSession(session: QuietTimeSessionState): void {
    try {
      localStorage.setItem(`${STORAGE_KEYS.QUIET_TIME_SESSION}_${session.userId}`, JSON.stringify(session));
    } catch (err) {
      console.error('Error saving quiet time session:', err);
    }
  }

  static clearQuietTimeSession(userId: string): void {
    try {
      localStorage.removeItem(`${STORAGE_KEYS.QUIET_TIME_SESSION}_${userId}`);
    } catch (err) {
      console.error('Error clearing quiet time session:', err);
    }
  }

  // Account Deletion & Data Privacy
  static deleteAccount(userId: string): { success: boolean; message: string } {
    try {
      // 1. Remove all completions belonging to this user
      const rawComps = localStorage.getItem(STORAGE_KEYS.COMPLETIONS);
      if (rawComps) {
        const allComps: ReadingCompletion[] = JSON.parse(rawComps);
        const filtered = allComps.filter(c => c.userId !== userId);
        localStorage.setItem(STORAGE_KEYS.COMPLETIONS, JSON.stringify(filtered));
      }

      // 2. Remove user-specific stored data
      localStorage.removeItem(`${STORAGE_KEYS.USER_SETTINGS}_${userId}`);
      localStorage.removeItem(`${STORAGE_KEYS.PRAYERS}_${userId}`);
      localStorage.removeItem(`${STORAGE_KEYS.QUIET_TIME_SESSION}_${userId}`);
      localStorage.removeItem(`${STORAGE_KEYS.NOTIFICATIONS}_${userId}`);

      // 3. Remove user from all_users list
      const rawUsers = localStorage.getItem(STORAGE_KEYS.ALL_USERS);
      if (rawUsers) {
        const allUsers: User[] = JSON.parse(rawUsers);
        const remainingUsers = allUsers.filter(u => u.id !== userId);
        localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(remainingUsers));
      }

      // 4. If current user, sign out
      const currentUser = this.getCurrentUser();
      if (currentUser?.id === userId) {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }

      return {
        success: true,
        message: 'Your FaithSync account and all private Quiet Time records have been permanently removed.'
      };
    } catch (err) {
      console.error('Error during account deletion:', err);
      return { success: false, message: 'Failed to delete account data.' };
    }
  }

  // Data Export for user ownership of spiritual records
  static exportUserData(userId: string): string {
    const user = this.getAllUsers().find(u => u.id === userId) || this.getCurrentUser();
    const settings = this.getUserSettings(userId);
    const completions = this.getCompletions(userId);
    const prayers = this.getPrayers(userId);

    const exportPayload = {
      exportedAt: new Date().toISOString(),
      appName: 'FaithSync',
      version: '1.0',
      description: 'Personal Christian Quiet Time Record',
      profile: {
        id: user?.id,
        displayName: user?.displayName || user?.firstName,
        fullName: user?.fullName,
        email: user?.email,
        currentStreak: user?.currentStreak,
        totalCompletedDays: user?.totalCompletedDays,
        memberSince: user?.createdAt
      },
      preferences: {
        dailyReminderTime: settings.dailyReminderTime,
        reminderDays: settings.reminderDays,
        scriptureTextSize: settings.scriptureTextSize,
        readingFont: settings.readingFont,
        quietTimeGoalMinutes: settings.quietTimeGoalMinutes,
        preferredQuietTime: settings.preferredQuietTime
      },
      quietTimeJournal: completions.map(c => ({
        date: c.dateKey,
        scripture: c.scriptureReference,
        completedAt: c.completedAt,
        reflectionWhatStoodOut: c.reflectionWhatStoodOut,
        reflectionGodTeaching: c.reflectionGodTeaching,
        reflectionApplication: c.reflectionApplication,
        personalPrayer: c.personalPrayer,
        keyVerse: c.keyVerse,
        durationMinutes: c.durationMinutes
      })),
      prayerJournal: prayers.map(p => ({
        title: p.title,
        body: p.body,
        category: p.category,
        isAnswered: p.isAnswered,
        answeredDate: p.answeredDate,
        answeredNote: p.answeredNote,
        createdAt: p.createdAt,
        linkedScripture: p.linkedScripture
      }))
    };

    return JSON.stringify(exportPayload, null, 2);
  }
}
