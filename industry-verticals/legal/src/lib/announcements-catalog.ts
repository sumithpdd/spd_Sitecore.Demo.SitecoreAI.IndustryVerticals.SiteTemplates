export type Announcement = {
  slug: string;
  href: string;
  title: string;
  date: string;
  readTime?: string;
  summary: string;
};

export const ANNOUNCEMENTS_INTRO =
  'Get the latest news from Pinsent Masons, including press releases and industry comments. We also have a large number of media-trained spokespeople who are able to comment on a wide variety of topics and issues.';

export const ANNOUNCEMENTS_CATALOG: Announcement[] = [
  {
    slug: 'pinsent-masons-strengthens-restructuring-practice-with-new-partner-mark-wilson',
    href: '/about-us/announcements/pinsent-masons-strengthens-restructuring-practice-with-new-partner-mark-wilson',
    title: 'Pinsent Masons strengthens restructuring practice with new partner Mark Wilson',
    date: '07 Sep 2026',
    summary:
      'Contentious insolvency partner Mark Wilson joins the Birmingham restructuring team from Gateley.',
  },
  {
    slug: 'pinsent-masons-appoints-infrastructure-ma-specialist-candice-lambeth',
    href: '/about-us/announcements/pinsent-masons-appoints-infrastructure-ma-specialist-candice-lambeth',
    title: 'Pinsent Masons appoints infrastructure M&A specialist Candice Lambeth',
    date: '02 Sep 2026',
    readTime: '1 min read',
    summary: 'Partner hire strengthening infrastructure M&A capability.',
  },
  {
    slug: 'pinsent-masons-bolsters-middle-east-international-arbitration-practice-with-partner-hire',
    href: '/about-us/announcements/pinsent-masons-bolsters-middle-east-international-arbitration-practice-with-partner-hire',
    title:
      'Pinsent Masons bolsters Middle East International Arbitration practice with partner hire',
    date: '01 Sep 2026',
    readTime: '1 min read',
    summary: 'Continued investment in the Middle East disputes offering.',
  },
];

export function searchAnnouncements(query: string): Announcement[] {
  const term = query.trim().toLowerCase();
  if (!term) {
    return ANNOUNCEMENTS_CATALOG;
  }
  return ANNOUNCEMENTS_CATALOG.filter((item) =>
    [item.title, item.summary, item.date].join(' ').toLowerCase().includes(term)
  );
}
