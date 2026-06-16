import type { LyveraBlogArticle } from '@/lib/lyvera-blog-content';

const MEDIA = 'https://www.lyveragroup.com/-/media/lyvera';

/** Blog articles matching https://www.keithprowse.co.uk/ homepage */
export const KP_BLOG_ARTICLES: LyveraBlogArticle[] = [
  {
    slug: 'a-guide-to-the-fifa-world-cup-2026',
    path: '/news-and-blog/a-guide-to-the-fifa-world-cup-2026',
    title:
      "A Guide To The FIFA World Cup 2026: Everything You Need to Know About Football's Biggest Tournament",
    excerpt:
      "The 2026 FIFA World Cup is just days away from kicking-off, so here's everything you need to know ahead of the tournament including the dates the favourite teams and the players to watch out for.",
    category: 'Blog',
    publishedDate: '2026-06-08',
    readTime: 'five minutes',
    author: 'Keith Prowse',
    image: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-25-635x635.png`,
    content: '<p>World Cup guide content.</p>',
  },
  {
    slug: 'getting-to-know-chemmy-alcott',
    path: '/news-and-blog/getting-to-know-chemmy-alcott',
    title: 'Getting To Know Chemmy Alcott: Our HerStory At Tennis Host',
    excerpt:
      "Olympian and broadcaster, Chemmy Alcott, is our host for HerStory At Tennis at the HSBC Championships at The Queen's Club for the WTA500, so we're getting to know her ahead of the event.",
    category: 'Blog',
    publishedDate: '2026-06-02',
    readTime: 'four minutes',
    author: 'Keith Prowse',
    image: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-33-635x635.png`,
    content: '<p>Chemmy Alcott profile content.</p>',
  },
  {
    slug: 'whats-coming-up-in-june',
    path: '/news-and-blog/whats-coming-up-in-june',
    title: "What's Coming Up in June with Keith Prowse",
    excerpt:
      'June brings together some of the biggest events in British sport, from world-class racing and international cricket to unforgettable grass-court tennis.',
    category: 'Blog',
    publishedDate: '2026-06-01',
    readTime: 'three minutes',
    author: 'Keith Prowse',
    image: `${MEDIA}/resized-approved-images-for-pages/ei-approved-images/ei-image-7-635x635.png`,
    content: '<p>June events roundup content.</p>',
  },
];

export const KP_BLOG_LISTING = {
  title: 'News and Blog',
  viewAllHref: '/news-and-blog',
  viewAllLabel: 'View All',
  readArticleLabel: 'Read Article',
};
