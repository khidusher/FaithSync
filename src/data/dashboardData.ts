import {
  ChurchAnnouncement,
  ChurchEvent,
  CommunitySnapshotData,
  DailyReflectionContent,
  ChurchActivityItem
} from '../types';

export const SAMPLE_ANNOUNCEMENTS: ChurchAnnouncement[] = [
  {
    id: 'ann_1',
    title: 'Youth Ministry Monthly Gathering: "Rooted in Grace"',
    preview: 'Join us this Saturday for worship, acoustic praise, fellowship snacks, and an open conversation on walking faithfully on campus.',
    fullText: 'Join us this Saturday for our monthly youth fellowship gathering in the Fellowship Hall! We will enjoy acoustic praise, testimony sharing from senior students, and practical discussions on finding stillness in Christ amid busy academic schedules. Refreshments and dinner will be provided. All high school and university students are welcome!',
    date: 'Saturday, Oct 19',
    priority: 'high',
    category: 'Youth Ministry',
    author: 'Pastor Samuel Mensah',
    authorRole: 'Youth Pastor',
    pinned: true
  },
  {
    id: 'ann_2',
    title: 'Sunday All-Church Worship & Communion Service',
    preview: 'Celebrating the Lord’s Supper together across morning services. Children’s Church and nursery will be active.',
    fullText: 'This Sunday we gather as one church family to share in the Lord\'s Supper. Services will be held at 9:00 AM and 11:15 AM in the Main Sanctuary. Livestream available for elderly and sick members. Please invite friends and neighbors!',
    date: 'Sunday, Oct 20',
    priority: 'important',
    category: 'Sunday Service',
    author: 'Grace Community Pastoral Team',
    authorRole: 'Eldership',
    pinned: true
  },
  {
    id: 'ann_3',
    title: 'Campus Outreach & Community Food Drive',
    preview: 'Partnering with local food banks to assemble 300 care packages for families in our neighborhood.',
    fullText: 'Our seasonal community food drive is accepting non-perishable goods, canned soups, rice, and hygiene products all week in the church foyer. Volunteers will meet Saturday morning at 10:00 AM to pack and deliver packages.',
    date: 'Saturday, Oct 26',
    priority: 'general',
    category: 'Outreach',
    author: 'Deaconess Hannah Vance',
    authorRole: 'Outreach Lead'
  },
  {
    id: 'ann_4',
    title: 'Midweek Corporate Prayer & Intercession Night',
    preview: 'An hour of quiet worship and focused prayer for our community, families, and city.',
    fullText: 'Come as you are for midweek prayer in the Chapel every Wednesday at 7:00 PM. We will lift up personal needs, student challenges, and global mission partners.',
    date: 'Wednesday, Oct 23',
    priority: 'general',
    category: 'Prayer',
    author: 'Prayer Ministry',
    authorRole: 'Intercessory Team'
  }
];

export const SAMPLE_EVENTS: ChurchEvent[] = [
  {
    id: 'evt_1',
    title: 'Sunday Worship & Word Gathering',
    date: 'Sunday, Oct 20, 2024',
    time: '9:00 AM & 11:15 AM',
    location: 'Main Sanctuary · Central Campus',
    category: 'Worship',
    month: 'OCT',
    day: '20',
    attendeesCount: 184,
    description: 'Corporate worship, scripture preaching from Gospel of John, and fellowship over coffee in the courtyard.',
    isUserRsvpd: true
  },
  {
    id: 'evt_2',
    title: 'Young Adults & Campus Fellowship Loft',
    date: 'Tuesday, Oct 22, 2024',
    time: '6:30 PM – 8:30 PM',
    location: 'Youth Loft · 2nd Floor',
    category: 'Youth & Campus',
    month: 'OCT',
    day: '22',
    attendeesCount: 42,
    description: 'Weekly hangout for college students and young professionals. Discussion groups, snacks, and acoustic prayer.',
    isUserRsvpd: false
  },
  {
    id: 'evt_3',
    title: 'Midweek Prayer & Stillness Hour',
    date: 'Wednesday, Oct 23, 2024',
    time: '7:00 PM – 8:00 PM',
    location: 'Chapel & YouTube Live',
    category: 'Prayer',
    month: 'OCT',
    day: '23',
    attendeesCount: 36,
    description: 'A focused time of stillness, guided scripture prayer, and intercession.',
    isUserRsvpd: false
  },
  {
    id: 'evt_4',
    title: 'Community Neighbor Food Drive & Packing',
    date: 'Saturday, Oct 26, 2024',
    time: '10:00 AM – 1:00 PM',
    location: 'Fellowship Hall & Courtyard',
    category: 'Outreach',
    month: 'OCT',
    day: '26',
    attendeesCount: 68,
    description: 'Hands-on service morning packing grocery packages for local families in need.',
    isUserRsvpd: true
  }
];

export const SAMPLE_COMMUNITY_SNAPSHOT: CommunitySnapshotData = {
  connectedMembersCount: 248,
  activeCirclesCount: 16,
  sharedReflectionsToday: 34,
  activeMinistryTeams: 8,
  churchName: 'Grace Community Church',
  branchName: 'Central Campus'
};

export const SAMPLE_DAILY_REFLECTION: DailyReflectionContent = {
  title: 'Rooted and Built Up in Christ',
  verse: '“So then, just as you received Christ Jesus as Lord, continue to live your lives in him, rooted and built up in him, strengthened in the faith as you were taught, and overflowing with thankfulness.”',
  verseReference: 'Colossians 2:6–7',
  reflectionText: 'Our spiritual growth is not a frantic sprint of performance, but a quiet, daily rooting in Christ\'s abiding love. Even during busy weeks with exams, work, and noise, peace blossoms when we return to His gentle presence.',
  prayerFocus: 'Lord, deepen my roots today in Your truth and let my heart overflow with quiet thanksgiving.',
  estimatedMinutes: 5
};

export const SAMPLE_RECENT_ACTIVITIES: ChurchActivityItem[] = [
  {
    id: 'act_1',
    type: 'announcement',
    title: 'New Church Announcement Posted',
    description: 'Pastor Samuel shared details for this Saturday\'s Youth Gathering in Fellowship Hall.',
    timeAgo: '20m ago',
    actorName: 'Pastor Samuel',
    actorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAatvnd_OTHZMcyuc90Q8LjztJHho6oxIO6AHH9MAolDY2xmFfV7K7GXqKki2RZt2EQs-Jm0saj8gz9JQ8IGylDRQtQd11ZtYGCJMn25v0l8NW8H33K_8NYDlrcC0JChP82LPhlCi4bQbI22tXkBenuBeLkV47X7wdwJD9lOzkoNwvgz_oi_PtKwqDvqBD1L_RhH0QWZykcXH6ET2vugKxWNSHU4mJUuv-ydGxRpgA',
    badge: 'Announcement'
  },
  {
    id: 'act_2',
    type: 'event',
    title: 'Upcoming Service Reminder',
    description: 'Sunday All-Church Worship with Communion is scheduled for 9:00 AM & 11:15 AM.',
    timeAgo: '1h ago',
    actorName: 'Grace Community Church',
    badge: 'Event'
  },
  {
    id: 'act_3',
    type: 'community',
    title: 'Circle Devotional Check-in',
    description: 'Sarah Miller, David Kim, and Elena Vance completed today\'s John 15 quiet time.',
    timeAgo: '2h ago',
    actorName: 'Sarah Miller',
    actorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtB-NTriNfrebO6hfuiwdJ1sLmZbdb8nws_1Pt2v_dj6YjtFjVBCM0JfhnPHUCmYU6OmlxKk_xJGNKOYKiqMxP1rgfLCeDiahySjW3LJnlvRLc9itV5ep1Js147cJ9fcb9gnrFdTZnplY-yrtGfYxWjQXl41wQgcNjR80T7SggtMnxPMViBiUR_Ye6jC-TIAOdy7wViPpJC8U0mJ0_li1URS0aW_pw3OnFyU_OvdQ',
    badge: 'Circle'
  },
  {
    id: 'act_4',
    type: 'prayer',
    title: 'Prayer Focus Shared',
    description: 'Intercessory team posted weekly prayer priorities for university mid-term season.',
    timeAgo: '4h ago',
    actorName: 'Prayer Team',
    badge: 'Prayer'
  },
  {
    id: 'act_5',
    type: 'ministry',
    title: 'Ministry Team Update',
    description: 'Worship and Media team schedule confirmed for upcoming Sunday services.',
    timeAgo: '6h ago',
    actorName: 'Media Ministry',
    badge: 'Ministry'
  }
];
