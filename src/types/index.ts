export interface User {
  id: string;
  fullName?: string;
  displayName?: string;
  email: string;
  photoURL?: string;
  churchId?: string;
  churchName?: string;
  branch?: string;
  ministry?: string; // e.g. "Youth", "Choir", "Media", "Ushering", "Children's Ministry", "Prayer Team"
  role?: string; // e.g. "Member", "Volunteer", "Ministry Leader"
  onboardingCompleted?: boolean;
  createdAt: string;
  updatedAt?: string;

  // Backward compatible fields for devotional habit features
  firstName: string;
  lastName: string;
  username: string;
  faithSyncId: string; // e.g. "FS-4091"
  avatarUrl: string;
  currentStreak: number;
  bestStreak: number;
  totalCompletedDays: number;
  quietTimeGoalMinutes: number; // 5, 10, 15, 20
  preferredQuietTime: 'Morning' | 'Afternoon' | 'Evening' | 'Custom';
  readingPlanId: string;
  currentDayNumber: number;
  isOnboarded: boolean;
  bio?: string;
  churchOrFellowship?: string;
}

export type AuthView = 'landing' | 'login' | 'signup' | 'forgot-password';

export type ScriptureTextSize = 'small' | 'medium' | 'large' | 'xlarge';
export type ReadingFontStyle = 'serif' | 'sans';

export interface UserSettings {
  userId: string;
  // Quiet Time Preferences
  notificationsDailyReminder: boolean;
  dailyReminderTime: string; // e.g. "07:00"
  reminderDays: string[]; // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  quietTimeGoalMinutes?: number; // 5, 10, 15, 20
  preferredQuietTime?: 'Morning' | 'Afternoon' | 'Evening' | 'Custom';

  // Reading & Scripture Display Preferences
  scriptureTextSize: ScriptureTextSize;
  readingFont: ReadingFontStyle;
  showVerseNumbers: boolean;
  highlightKeyVerse: boolean;

  // Privacy & Data
  isPrivateAccount: boolean;
  readingVisibility: 'friends' | 'everyone' | 'private';
  streakVisibility: 'friends' | 'everyone' | 'private';
  profileDiscoverability: boolean;

  // Legacy/Notifications stubs
  notificationsFriendActivity: boolean;
  notificationsEncouragement: boolean;
  notificationsGroupActivity: boolean;
  theme: 'light' | 'dark' | 'system';
}

export interface BibleVerse {
  verseNum: number;
  text: string;
}

export interface BiblePassage {
  reference: string; // e.g. "John 15:1–11"
  book: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
  verses: BibleVerse[];
  translation: string; // "WEB" (World English Bible - Public Domain) or "BSB"
  contextSummary: string;
  reflectionPrompt: string;
  keyVerse: string;
}

export interface ReadingPlanDay {
  dayNumber: number;
  title: string;
  scriptureReference: string;
  estimatedMinutes: number;
  passage: BiblePassage;
}

export interface ReadingPlan {
  id: string;
  title: string;
  tagline: string;
  description: string;
  durationDays: number;
  category: 'Gospel' | 'Wisdom' | 'Faith' | 'Prayer';
  coverGradient: string;
  days: ReadingPlanDay[];
}

export interface ReadingCompletion {
  id: string;
  userId: string;
  readingPlanId: string;
  dayNumber: number;
  scriptureReference: string;
  completedAt: string; // ISO
  dateKey: string; // YYYY-MM-DD for idempotent checking
  notes?: string;
  reflection?: string;
  highlightedVerses?: number[];
  // Dedicated Quiet Time Journey prompts & prayer
  reflectionWhatStoodOut?: string;
  reflectionGodTeaching?: string;
  reflectionApplication?: string;
  personalPrayer?: string;
  keyVerse?: string;
  durationMinutes?: number;
}

export type PrayerCategory = 'Gratitude' | 'Petition' | 'Guidance' | 'Peace' | 'Praise' | 'Intercession';

export interface PrayerItem {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: PrayerCategory;
  isAnswered: boolean;
  answeredDate?: string;
  answeredNote?: string;
  createdAt: string;
  updatedAt?: string;
  linkedScripture?: string;
}

export type FriendshipStatus = 'pending' | 'accepted' | 'declined' | 'blocked';

export interface FriendRelation {
  id: string;
  requesterId: string;
  addresseeId: string;
  status: FriendshipStatus;
  createdAt: string;
}

export interface FriendUserSummary {
  user: User;
  friendshipStatus: FriendshipStatus;
  hasCompletedToday: boolean;
  todayReadingRef?: string;
  lastCompletedDate?: string;
}

export type EncouragementType =
  | 'heart'
  | 'celebrate'
  | 'pray'
  | 'keep_going'
  | 'proud_of_you'
  | 'growing_together';

export interface Encouragement {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  recipientId: string;
  type: EncouragementType;
  message: string;
  createdAt: string;
  targetReadingRef?: string;
}

export type NotificationType =
  | 'daily_reminder'
  | 'friend_completion'
  | 'encouragement'
  | 'friend_nudge'
  | 'friend_request';

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  senderId?: string;
  senderName?: string;
  senderAvatar?: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface ActivityFeedItem {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  actionType: 'completed_reading' | 'streak_milestone';
  scriptureReference: string;
  streakCount: number;
  timestamp: string;
  reactions: {
    type: EncouragementType;
    count: number;
    userReacted: boolean;
  }[];
}

export type AnnouncementPriority = 'high' | 'important' | 'general';

export interface ChurchAnnouncement {
  id: string;
  title: string;
  preview: string;
  fullText?: string;
  date: string;
  priority: AnnouncementPriority;
  category: string;
  author?: string;
  authorRole?: string;
  pinned?: boolean;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  month: string;
  day: string;
  attendeesCount: number;
  description?: string;
  isUserRsvpd?: boolean;
}

export interface CommunitySnapshotData {
  connectedMembersCount: number;
  activeCirclesCount: number;
  sharedReflectionsToday: number;
  activeMinistryTeams: number;
  churchName: string;
  branchName: string;
}

export interface DailyReflectionContent {
  title: string;
  verse: string;
  verseReference: string;
  reflectionText: string;
  prayerFocus: string;
  estimatedMinutes: number;
}

export interface ChurchActivityItem {
  id: string;
  type: 'announcement' | 'event' | 'community' | 'prayer' | 'ministry';
  title: string;
  description: string;
  timeAgo: string;
  actorName: string;
  actorAvatar?: string;
  badge?: string;
}

export type QuietTimeStage = 'prepare' | 'read' | 'reflect' | 'pray' | 'complete';

export interface QuietTimeSessionState {
  userId: string;
  planId: string;
  dayNumber: number;
  scriptureReference: string;
  currentStage: QuietTimeStage;
  readingProgress: number; // percentage (0-100) or verses read count
  highlightedVerses: number[];
  reflectionWhatStoodOut: string;
  reflectionGodTeaching: string;
  reflectionApplication: string;
  personalPrayer: string;
  saveToPrayerJournal: boolean;
  startTime: string; // ISO string
  lastUpdated: string; // ISO string
  endTime?: string;
  isCompleted: boolean;
  durationMinutes?: number;
}
