import { ReadingPlan, User, UserSettings, AppNotification } from '../types';

export const HERO_IMAGE = '/src/assets/images/faithsync_hero_quiet_time_1791402137138.jpg';
export const AVATAR_SARAH = '/src/assets/images/avatar_sarah_1791402147467.jpg';
export const AVATAR_DAVID = '/src/assets/images/avatar_david_1791402156624.jpg';
export const AVATAR_MICHAEL = '/src/assets/images/avatar_michael_1791402165908.jpg';

export const READING_PLANS: ReadingPlan[] = [
  {
    id: 'plan_walk_with_jesus',
    title: 'Walk with Jesus',
    tagline: '7 days of abiding, peace, and spiritual growth in Christ',
    description: 'A thoughtful journey through foundational passages about discipleship, resting in Christ, and walking daily in faith with close friends.',
    durationDays: 7,
    category: 'Gospel',
    coverGradient: 'from-[#6B4F2A] to-[#A67C52]',
    days: [
      {
        dayNumber: 1,
        title: 'Abiding in the True Vine',
        scriptureReference: 'John 15:1–11',
        estimatedMinutes: 10,
        passage: {
          reference: 'John 15:1–11',
          book: 'John',
          chapter: 15,
          startVerse: 1,
          endVerse: 11,
          translation: 'World English Bible (WEB)',
          keyVerse: 'Remain in me, and I in you. As the branch cannot bear fruit by itself, unless it remains in the vine, so neither can you, unless you remain in me. — John 15:4',
          contextSummary: 'Jesus shares an intimate metaphor of the vine and branches on the eve of His passion. He reveals that spiritual vitality and genuine love are not manufactured through sheer willpower, but flow naturally when we stay closely attached to Him.',
          reflectionPrompt: 'Where in your life have you felt tired from trying to produce fruit on your own strength? What does "abiding" look like for your schedule today?',
          verses: [
            { verseNum: 1, text: '“I am the true vine, and my Father is the farmer.' },
            { verseNum: 2, text: 'Every branch in me that doesn’t bear fruit, he takes away. Every branch that bears fruit, he prunes, that it may bear more fruit.' },
            { verseNum: 3, text: 'You are already pruned clean because of the word which I have spoken to you.' },
            { verseNum: 4, text: 'Remain in me, and I in you. As the branch can’t bear fruit by itself, unless it remains in the vine, so neither can you, unless you remain in me.' },
            { verseNum: 5, text: 'I am the vine. You are the branches. He who remains in me and I in him bears much fruit, for apart from me you can do nothing.' },
            { verseNum: 6, text: 'If a man doesn’t remain in me, he is thrown out as a branch and is withered; and they gather them, throw them into the fire, and they are burned.' },
            { verseNum: 7, text: 'If you remain in me, and my words remain in you, ask whatever you desire, and it will be done for you.' },
            { verseNum: 8, text: 'In this my Father is glorified, that you bear much fruit; and so you will be my disciples.' },
            { verseNum: 9, text: 'Even as the Father has loved me, I also have loved you. Remain in my love.' },
            { verseNum: 10, text: 'If you keep my commandments, you will remain in my love; even as I have kept my Father’s commandments, and remain in his love.' },
            { verseNum: 11, text: 'I have spoken these things to you, that my joy may remain in you, and that your joy may be made full.' }
          ]
        }
      },
      {
        dayNumber: 2,
        title: 'Love One Another',
        scriptureReference: 'John 15:12–17',
        estimatedMinutes: 8,
        passage: {
          reference: 'John 15:12–17',
          book: 'John',
          chapter: 15,
          startVerse: 12,
          endVerse: 17,
          translation: 'World English Bible (WEB)',
          keyVerse: 'Greater love has no one than this, that someone lay down his life for his friends. — John 15:13',
          contextSummary: 'Jesus defines the heart of Christian community: not competition or isolation, but sacrificial friendship mirroring His own love for us.',
          reflectionPrompt: 'Who is one friend or youth group member you can reach out to today with genuine encouragement and prayer?',
          verses: [
            { verseNum: 12, text: '“This is my commandment, that you love one another, even as I have loved you.' },
            { verseNum: 13, text: 'Greater love has no one than this, that someone lay down his life for his friends.' },
            { verseNum: 14, text: 'You are my friends, if you do whatever I command you.' },
            { verseNum: 15, text: 'No longer do I call you servants, for the servant doesn’t know what his lord does. But I have called you friends, for everything that I heard from my Father, I have made known to you.' },
            { verseNum: 16, text: 'You didn’t choose me, but I chose you and appointed you, that you should go and bear fruit, and that your fruit should remain; that whatever you will ask of the Father in my name, he may give it to you.' },
            { verseNum: 17, text: '“I command these things to you, that you may love one another.' }
          ]
        }
      },
      {
        dayNumber: 3,
        title: 'Peace in the Storm',
        scriptureReference: 'Philippians 4:4–9',
        estimatedMinutes: 9,
        passage: {
          reference: 'Philippians 4:4–9',
          book: 'Philippians',
          chapter: 4,
          startVerse: 4,
          endVerse: 9,
          translation: 'World English Bible (WEB)',
          keyVerse: 'In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God. — Philippians 4:6',
          contextSummary: 'Writing from prison, Paul urges believers toward joyful gratitude and honest prayer, promising God’s transcendent peace which guards hearts and minds.',
          reflectionPrompt: 'What worry or school/career tension is occupying your thoughts right now? Name it specifically and place it into God’s care.',
          verses: [
            { verseNum: 4, text: 'Rejoice in the Lord always! Again I will say, “Rejoice!”' },
            { verseNum: 5, text: 'Let your gentleness be known to all men. The Lord is at hand.' },
            { verseNum: 6, text: 'In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God.' },
            { verseNum: 7, text: 'And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus.' },
            { verseNum: 8, text: 'Finally, brothers, whatever things are true, whatever things are honorable, whatever things are just, whatever things are pure, whatever things are lovely, whatever things are of good report; if there is any virtue, and if there is any praise, think about these things.' },
            { verseNum: 9, text: 'The things which you learned, received, heard, and saw in me: do these things, and the God of peace will be with you.' }
          ]
        }
      },
      {
        dayNumber: 4,
        title: 'Trusting Beyond Understanding',
        scriptureReference: 'Proverbs 3:1–8',
        estimatedMinutes: 8,
        passage: {
          reference: 'Proverbs 3:1–8',
          book: 'Proverbs',
          chapter: 3,
          startVerse: 1,
          endVerse: 8,
          translation: 'World English Bible (WEB)',
          keyVerse: 'Trust in Yahweh with all your heart, and don’t lean on your own understanding. — Proverbs 3:5',
          contextSummary: 'Solomon imparts life wisdom for young people navigating complex decisions. Wholehearted trust in the Lord brings guidance, health, and straight paths.',
          reflectionPrompt: 'Is there an upcoming decision where you feel tempted to lean entirely on your own analysis rather than seeking God’s guidance?',
          verses: [
            { verseNum: 1, text: 'My son, don’t forget my teaching; but let your heart keep my commandments:' },
            { verseNum: 2, text: 'for length of days, and years of life, and peace, will they add to you.' },
            { verseNum: 3, text: 'Don’t let kindness and truth forsake you. Bind them around your neck. Write them on the tablet of your heart.' },
            { verseNum: 4, text: 'So you will find favor, and good repute in the sight of God and man.' },
            { verseNum: 5, text: 'Trust in Yahweh with all your heart, and don’t lean on your own understanding.' },
            { verseNum: 6, text: 'In all your ways acknowledge him, and he will make your paths straight.' },
            { verseNum: 7, text: 'Don’t be wise in your own eyes. Fear Yahweh, and depart from evil.' },
            { verseNum: 8, text: 'It will be health to your body, and nourishment to your bones.' }
          ]
        }
      },
      {
        dayNumber: 5,
        title: 'The Lord is My Shepherd',
        scriptureReference: 'Psalm 23:1–6',
        estimatedMinutes: 7,
        passage: {
          reference: 'Psalm 23:1–6',
          book: 'Psalms',
          chapter: 23,
          startVerse: 1,
          endVerse: 6,
          translation: 'World English Bible (WEB)',
          keyVerse: 'Yahweh is my shepherd: I shall lack nothing. — Psalm 23:1',
          contextSummary: 'David’s beloved psalm of contentment and divine protection. Even in valleys of shadow, the Good Shepherd prepares a table and surrounds us with goodness and mercy.',
          reflectionPrompt: 'Take a deep breath. Which phrase in Psalm 23 brings the most relief to your spirit right now?',
          verses: [
            { verseNum: 1, text: 'Yahweh is my shepherd: I shall lack nothing.' },
            { verseNum: 2, text: 'He makes me lie down in green pastures. He leads me beside still waters.' },
            { verseNum: 3, text: 'He restores my soul. He guides me in the paths of righteousness for his name’s sake.' },
            { verseNum: 4, text: 'Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me.' },
            { verseNum: 5, text: 'You prepare a table before me in the presence of my enemies. You anoint my head with oil. My cup runs over.' },
            { verseNum: 6, text: 'Surely goodness and loving kindness shall follow me all the days of my life, and I will dwell in Yahweh’s house forever.' }
          ]
        }
      },
      {
        dayNumber: 6,
        title: 'More Than Conquerors',
        scriptureReference: 'Romans 8:31–39',
        estimatedMinutes: 10,
        passage: {
          reference: 'Romans 8:31–39',
          book: 'Romans',
          chapter: 8,
          startVerse: 31,
          endVerse: 39,
          translation: 'World English Bible (WEB)',
          keyVerse: 'For I am persuaded, that neither death, nor life... will be able to separate us from the love of God, which is in Christ Jesus our Lord. — Romans 8:38–39',
          contextSummary: 'A soaring proclamation of God’s unbreakable covenant love. Nothing in all creation—hardship, trials, insecurity, or distance—can sever us from Christ.',
          reflectionPrompt: 'When doubts or loneliness attempt to whisper lies, how can this passage become your firm anchor?',
          verses: [
            { verseNum: 31, text: 'What then shall we say about these things? If God is for us, who can be against us?' },
            { verseNum: 32, text: 'He who didn’t spare his own Son, but delivered him up for us all, how would he not also with him freely give us all things?' },
            { verseNum: 33, text: 'Who could bring a charge against God’s chosen ones? It is God who justifies.' },
            { verseNum: 34, text: 'Who is he who condemns? It is Christ who died, yes rather, who was raised from the dead, who is at the right hand of God, who also makes intercession for us.' },
            { verseNum: 35, text: 'Who shall separate us from the love of Christ? Could oppression, or anguish, or persecution, or famine, or nakedness, or peril, or sword?' },
            { verseNum: 37, text: 'No, in all these things, we are more than conquerors through him who loved us.' },
            { verseNum: 38, text: 'For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor things present, nor things to come, nor powers,' },
            { verseNum: 39, text: 'nor height, nor depth, nor any other created thing, will be able to separate us from the love of God, which is in Christ Jesus our Lord.' }
          ]
        }
      },
      {
        dayNumber: 7,
        title: 'Put on Love & Gratitude',
        scriptureReference: 'Colossians 3:12–17',
        estimatedMinutes: 9,
        passage: {
          reference: 'Colossians 3:12–17',
          book: 'Colossians',
          chapter: 3,
          startVerse: 12,
          endVerse: 17,
          translation: 'World English Bible (WEB)',
          keyVerse: 'Above all these things, walk in love, which is the bond of perfection. And let the peace of God rule in your hearts... — Colossians 3:14–15',
          contextSummary: 'The lifestyle of a believer: clothed in compassionate hearts, kindness, humility, meekness, and patience, singing with thanksgiving to God.',
          reflectionPrompt: 'As you finish this week, celebrate how God has walked with you. What is one habit of love you want to carry into next week?',
          verses: [
            { verseNum: 12, text: 'Put on therefore, as God’s chosen ones, holy and beloved, a heart of compassion, kindness, lowliness, humility, and perseverance;' },
            { verseNum: 13, text: 'bearing with one another, and forgiving each other, if any man has a complaint against any; even as Christ forgave you, so you also do.' },
            { verseNum: 14, text: 'Above all these things, walk in love, which is the bond of perfection.' },
            { verseNum: 15, text: 'And let the peace of God rule in your hearts, to which also you were called in one body; and be thankful.' },
            { verseNum: 16, text: 'Let the word of Christ dwell in you richly; in all wisdom teaching and admonishing one another with psalms, hymns, and spiritual songs, singing with grace in your hearts to the Lord.' },
            { verseNum: 17, text: 'Whatever you do, in word or in deed, do all in the name of the Lord Jesus, giving thanks to God the Father through him.' }
          ]
        }
      }
    ]
  },
  {
    id: 'plan_wisdom_proverbs',
    title: 'Wisdom for Youth',
    tagline: 'Timeless guidance from Proverbs for real daily choices',
    description: 'Practical scripture readings addressing integrity, friendships, speech, work, and inner peace for teenagers and young adults.',
    durationDays: 14,
    category: 'Wisdom',
    coverGradient: 'from-[#4B5E44] to-[#66805C]',
    days: [
      {
        dayNumber: 1,
        title: 'Guard Your Heart',
        scriptureReference: 'Proverbs 4:20–27',
        estimatedMinutes: 8,
        passage: {
          reference: 'Proverbs 4:20–27',
          book: 'Proverbs',
          chapter: 4,
          startVerse: 20,
          endVerse: 27,
          translation: 'World English Bible (WEB)',
          keyVerse: 'Keep your heart with all diligence, for out of it is the wellspring of life. — Proverbs 4:23',
          contextSummary: 'A fatherly call to protect what enters our eyes, ears, and minds, because character flows directly from the inner condition of the heart.',
          reflectionPrompt: 'What media or digital influences are filling your thoughts lately? Is your heart guarded with grace?',
          verses: [
            { verseNum: 20, text: 'My son, attend to my words. Turn your ear to my sayings.' },
            { verseNum: 21, text: 'Don’t let them depart from your eyes. Keep them in the midst of your heart.' },
            { verseNum: 22, text: 'For they are life to those who find them, and health to their whole body.' },
            { verseNum: 23, text: 'Keep your heart with all diligence, for out of it is the wellspring of life.' },
            { verseNum: 24, text: 'Put away from yourself a perverse mouth. Put corrupt lips far from you.' },
            { verseNum: 25, text: 'Let your eyes look straight ahead. Fix your gaze directly before you.' },
            { verseNum: 26, text: 'Make the path of your feet level. Let all of your ways be established.' },
            { verseNum: 27, text: 'Don’t turn to the right hand nor to the left. Remove your foot from evil.' }
          ]
        }
      }
    ]
  },
  {
    id: 'plan_faith_over_anxiety',
    title: 'Faith Over Anxiety',
    tagline: '7 days of quiet courage, restful sleep, and trust',
    description: 'Calming passages to anchor your soul when school, deadlines, and future uncertainties feel overwhelming.',
    durationDays: 7,
    category: 'Faith',
    coverGradient: 'from-[#A67C52] to-[#D4A94D]',
    days: [
      {
        dayNumber: 1,
        title: 'Do Not Be Anxious',
        scriptureReference: 'Matthew 6:25–34',
        estimatedMinutes: 10,
        passage: {
          reference: 'Matthew 6:25–34',
          book: 'Matthew',
          chapter: 6,
          startVerse: 25,
          endVerse: 34,
          translation: 'World English Bible (WEB)',
          keyVerse: 'Seek first God’s Kingdom, and his righteousness; and all these things will be given to you as well. — Matthew 6:33',
          contextSummary: 'Jesus invites us to observe the birds of the air and the lilies of the field, reminding us how deeply our Heavenly Father values us.',
          reflectionPrompt: 'What is one tomorrow-worry you can surrender to God so you can live fully present today?',
          verses: [
            { verseNum: 25, text: '“Therefore I tell you, don’t be anxious for your life: what you will eat, or what you will drink; nor yet for your body, what you will wear. Isn’t life more than food, and the body more than clothing?' },
            { verseNum: 26, text: 'See the birds of the sky, that they don’t sow, neither do they reap, nor gather into barns. Your heavenly Father feeds them. Aren’t you of much more value than they?' },
            { verseNum: 27, text: '“Which of you, by being anxious, can add a moment to his lifespan?' },
            { verseNum: 31, text: '“Therefore don’t be anxious, saying, ‘What will we eat?’, ‘What will we drink?’ or, ‘With what will we be clothed?’' },
            { verseNum: 33, text: 'But seek first God’s Kingdom, and his righteousness; and all these things will be given to you as well.' },
            { verseNum: 34, text: 'Therefore don’t be anxious for tomorrow, for tomorrow will be anxious for itself. Each day’s own trouble is sufficient.' }
          ]
        }
      }
    ]
  }
];

// Demo friends with realistic profiles and accountability statuses
export const DEMO_FRIENDS: User[] = [
  {
    id: 'user_sarah',
    fullName: 'Sarah Jenkins',
    displayName: 'Sarah',
    email: 'sarah.j@faithsync.org',
    photoURL: AVATAR_SARAH,
    churchId: 'church_grace_central',
    churchName: 'Grace Community Church',
    branch: 'Central Campus',
    ministry: 'Worship Team',
    role: 'Volunteer',
    onboardingCompleted: true,
    createdAt: '2026-08-14T08:00:00Z',
    updatedAt: '2026-08-14T08:00:00Z',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    username: 'sarah_j',
    faithSyncId: 'FS-2401',
    avatarUrl: AVATAR_SARAH,
    currentStreak: 6,
    bestStreak: 14,
    totalCompletedDays: 28,
    quietTimeGoalMinutes: 10,
    preferredQuietTime: 'Morning',
    readingPlanId: 'plan_walk_with_jesus',
    currentDayNumber: 1,
    isOnboarded: true,
    bio: 'Campus youth worship team & nursing student. Learning to rest in Him!',
    churchOrFellowship: 'Grace Youth Fellowship'
  },
  {
    id: 'user_david',
    fullName: 'David Chen',
    displayName: 'David',
    email: 'david.c@faithsync.org',
    photoURL: AVATAR_DAVID,
    churchId: 'church_grace_central',
    churchName: 'Grace Community Church',
    branch: 'North Campus',
    ministry: 'Media Team',
    role: 'Member',
    onboardingCompleted: true,
    createdAt: '2026-07-20T08:00:00Z',
    updatedAt: '2026-07-20T08:00:00Z',
    firstName: 'David',
    lastName: 'Chen',
    username: 'david_c',
    faithSyncId: 'FS-5812',
    avatarUrl: AVATAR_DAVID,
    currentStreak: 12,
    bestStreak: 19,
    totalCompletedDays: 45,
    quietTimeGoalMinutes: 15,
    preferredQuietTime: 'Morning',
    readingPlanId: 'plan_walk_with_jesus',
    currentDayNumber: 1,
    isOnboarded: true,
    bio: 'Mechanical engineering sophomore. Seeking first the Kingdom!',
    churchOrFellowship: 'Cornerstone University Fellowship'
  },
  {
    id: 'user_michael',
    fullName: 'Michael Okonjo',
    displayName: 'Michael',
    email: 'michael.o@faithsync.org',
    photoURL: AVATAR_MICHAEL,
    churchId: 'church_grace_central',
    churchName: 'Grace Community Church',
    branch: 'Central Campus',
    ministry: 'Youth Fellowship',
    role: 'Member',
    onboardingCompleted: true,
    createdAt: '2026-09-01T08:00:00Z',
    updatedAt: '2026-09-01T08:00:00Z',
    firstName: 'Michael',
    lastName: 'Okonjo',
    username: 'michael_o',
    faithSyncId: 'FS-3190',
    avatarUrl: AVATAR_MICHAEL,
    currentStreak: 3,
    bestStreak: 7,
    totalCompletedDays: 16,
    quietTimeGoalMinutes: 10,
    preferredQuietTime: 'Evening',
    readingPlanId: 'plan_walk_with_jesus',
    currentDayNumber: 1,
    isOnboarded: true,
    bio: 'High school senior. Building consistency one day at a time.',
    churchOrFellowship: 'Hope Youth Center'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    userId: 'current_user',
    type: 'friend_completion',
    title: 'Sarah completed today’s reading',
    message: 'Sarah finished John 15:1–11 and is on a 6-day streak!',
    senderId: 'user_sarah',
    senderName: 'Sarah Jenkins',
    senderAvatar: AVATAR_SARAH,
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString()
  },
  {
    id: 'notif_2',
    userId: 'current_user',
    type: 'encouragement',
    title: 'David sent you encouragement',
    message: 'David reacted with 🙏: "Praying for your week ahead, keep abiding!"',
    senderId: 'user_david',
    senderName: 'David Chen',
    senderAvatar: AVATAR_DAVID,
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString()
  },
  {
    id: 'notif_3',
    userId: 'current_user',
    type: 'daily_reminder',
    title: 'Your quiet time is waiting for you',
    message: 'Take a breath and spend 10 minutes in John 15 today.',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString()
  }
];

export const INITIAL_USER_SETTINGS: UserSettings = {
  userId: 'current_user',
  notificationsDailyReminder: true,
  dailyReminderTime: '07:00',
  reminderDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  quietTimeGoalMinutes: 10,
  preferredQuietTime: 'Morning',
  scriptureTextSize: 'medium',
  readingFont: 'serif',
  showVerseNumbers: true,
  highlightKeyVerse: true,
  isPrivateAccount: true,
  readingVisibility: 'private',
  streakVisibility: 'private',
  profileDiscoverability: false,
  notificationsFriendActivity: false,
  notificationsEncouragement: false,
  notificationsGroupActivity: false,
  theme: 'light'
};
