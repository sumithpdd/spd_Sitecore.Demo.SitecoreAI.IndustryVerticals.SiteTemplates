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
    title: 'Clearing 2026',
    type: 'Page',
    href: '/clearing',
    blurb: 'Courses still available, hotline hours, and how to apply through Clearing.',
    keywords: ['clearing', 'apply', 'hotline', 'ucas'],
  },
  {
    title: 'Make your Clearing application',
    type: 'Page',
    href: '/clearing/how-to-apply',
    blurb: 'Enquire online and register your interest with admissions.',
    keywords: ['apply', 'application', 'dynamics', 'enquire'],
  },
  {
    title: 'Computer Science and Artificial Intelligence',
    type: 'Course',
    href: '/courses/computer-science-and-ai',
    blurb: 'BSc undergraduate course — available in Clearing.',
    keywords: ['computer science', 'ai', 'cs', 'undergraduate', 'bsc'],
  },
  {
    title: 'Business and Management',
    type: 'Course',
    href: '/courses/computer-science-and-ai',
    blurb: 'Undergraduate business pathway listed in the Clearing demo.',
    keywords: ['business', 'management', 'henley'],
  },
  {
    title: 'Psychology',
    type: 'Course',
    href: '/clearing',
    blurb: 'Undergraduate psychology pathway listed in Clearing.',
    keywords: ['psychology', 'undergraduate'],
  },
  {
    title: 'Study and life',
    type: 'Page',
    href: '/study-and-life',
    blurb: 'Campus community, Students’ Union, and student experience.',
    keywords: ['campus', 'student life', 'union', 'societies'],
  },
  {
    title: 'Accommodation',
    type: 'Page',
    href: '/accommodation',
    blurb: 'Halls options and Clearing accommodation guarantee.',
    keywords: ['halls', 'rooms', 'ensuite', 'accommodation'],
  },
  {
    title: 'Centenary 2026',
    type: 'News',
    href: '/?utm_campaign=centenary-2026',
    blurb: 'Celebrating 100 years of the University.',
    keywords: ['centenary', '100', 'alumni'],
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
