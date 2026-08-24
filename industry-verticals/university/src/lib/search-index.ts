export type SearchScope = 'everything' | 'courses';

export type SearchHit = {
  title: string;
  type: 'Page' | 'Course' | 'News';
  href: string;
  blurb: string;
  keywords: string[];
};

export const SEARCH_INDEX: SearchHit[] = [
  {
    title: 'Clearing Fast Track 2026',
    type: 'Page',
    href: '/clearing',
    blurb: 'Apply with or without results. Offers as soon as grades land. Call 01206 873666.',
    keywords: ['clearing', 'fast track', 'apply', 'hotline', 'ucas', 'before results'],
  },
  {
    title: 'Get Clearing ready',
    type: 'Page',
    href: '/clearing/how-to-apply',
    blurb: 'Register Fast Track so Admissions already has your course and campaign in Dynamics.',
    keywords: ['apply', 'application', 'dynamics', 'enquire', 'fast track'],
  },
  {
    title: 'Computer Science and Artificial Intelligence',
    type: 'Course',
    href: '/courses/computer-science-and-ai',
    blurb: 'BSc at Colchester — available through Clearing Fast Track.',
    keywords: ['computer science', 'ai', 'cs', 'undergraduate', 'bsc'],
  },
  {
    title: 'Business and Management',
    type: 'Course',
    href: '/courses/business-and-management',
    blurb: 'Undergraduate business at Essex Business School, Colchester campus.',
    keywords: ['business', 'management', 'essex business school'],
  },
  {
    title: 'Psychology',
    type: 'Course',
    href: '/clearing',
    blurb: 'Undergraduate psychology listed in Clearing at Essex.',
    keywords: ['psychology', 'undergraduate'],
  },
  {
    title: 'Study and life',
    type: 'Page',
    href: '/study-and-life',
    blurb: 'Colchester lake campus, Essex SU, sport, and campus squares.',
    keywords: ['campus', 'colchester', 'loughton', 'student life', 'union'],
  },
  {
    title: 'Accommodation',
    type: 'Page',
    href: '/accommodation',
    blurb: 'Guaranteed on-campus accommodation throughout your studies.',
    keywords: ['halls', 'rooms', 'ensuite', 'accommodation'],
  },
  {
    title: 'We Are Essex',
    type: 'News',
    href: '/about/manifesto',
    blurb: 'Where change happens. University your way. Rebels with a cause.',
    keywords: ['manifesto', 'we are essex', 'alumni', 'brand'],
  },
];

/**
 * Filters dummy search hits by query and optional course-only scope.
 */
export function filterSearchHits(query: string, scope: SearchScope = 'everything'): SearchHit[] {
  const q = query.trim().toLowerCase();
  const pool =
    scope === 'courses' ? SEARCH_INDEX.filter((item) => item.type === 'Course') : SEARCH_INDEX;

  if (!q) {
    return pool;
  }

  return pool.filter((item) => {
    const haystack =
      `${item.title} ${item.blurb} ${item.type} ${item.keywords.join(' ')}`.toLowerCase();
    return haystack.includes(q);
  });
}
