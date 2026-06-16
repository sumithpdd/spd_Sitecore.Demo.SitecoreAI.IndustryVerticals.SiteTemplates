const MEDIA = 'https://www.lyveragroup.com/-/media/lyvera';

export type LyveraBlogArticle = {
  slug: string;
  path: string;
  title: string;
  excerpt: string;
  category: string;
  publishedDate: string;
  readTime: string;
  author: string;
  image: string;
  featured?: boolean;
  content: string;
};

export const LYVERA_BLOG_LISTING = {
  title: 'Blog',
  image: `${MEDIA}/resized-approved-images-for-pages/extra-images/home-page/what-we-do-635x635.png`,
};

export const LYVERA_BLOG_ARTICLES: LyveraBlogArticle[] = [
  {
    slug: 'moments-over-material-things',
    path: '/news-and-blog/moments-over-material-things',
    title: "What's driving the demand for better, richer experiences?",
    excerpt:
      'There was a time when luxury was defined by what you owned. Today, it is increasingly defined by what you experience.',
    category: 'Lyvera',
    publishedDate: '2026-06-03',
    readTime: 'three minutes',
    author: 'Lyvera Group Team',
    image: `${MEDIA}/resized-approved-images-for-pages/extra-images/home-page/what-we-do-635x635.png`,
    featured: true,
    content: `
      <p>There was a time when luxury was defined by what you owned. Today, it is increasingly defined by what you experience.</p>
      <p>From packed stadiums and once-in-a-lifetime sporting occasions to unforgettable travel experiences and premium live events, people are placing greater value on moments that create lasting memories.</p>
      <h2>The Rise of Experience-Led Living</h2>
      <p>People are becoming more intentional about how they spend their time and money. Rather than collecting possessions, many are investing in experiences that bring people together and leave a lasting emotional impact.</p>
      <h2>VIP Expectations Have Changed</h2>
      <p>The modern guest expects more than just a ticket or hospitality package. VIP experiences today are about seamless journeys, personal touches and feeling part of something exclusive from beginning to end.</p>
      <h2>Where Lyvera Comes In</h2>
      <p>Through premium hospitality brands such as Keith Prowse and Events International, Lyvera delivers unforgettable access to some of the world's most iconic occasions.</p>
    `,
  },
  {
    slug: 'unforgettable-live-experience',
    path: '/news-and-blog/unforgettable-live-experience',
    title: 'What Makes an Unforgettable Live Experience?',
    excerpt:
      'From packed stadiums to premium hospitality, audiences are looking for moments that feel genuinely special.',
    category: 'Lyvera',
    publishedDate: '2026-06-03',
    readTime: 'three minutes',
    author: 'Lyvera Group Team',
    image: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-33-635x635.png`,
    content: `
      <p>There was a time when luxury was defined by what you owned. Today, it is increasingly defined by what you experience.</p>
      <p>Live sport and entertainment create moments that feel personal. The atmosphere, anticipation and shared emotion cannot be replicated through a screen.</p>
      <h2>The Rise of Experience-Led Living</h2>
      <p>Experiences have become the new status symbol, not because they are extravagant, but because they are memorable.</p>
      <h2>More Than a Moment</h2>
      <p>People may forget what they have bought, but they rarely forget the atmosphere, emotion and memories of living a moment.</p>
    `,
  },
];

export function findBlogArticleByPath(pathname: string): LyveraBlogArticle | undefined {
  const normalized = pathname.replace(/\/$/, '').toLowerCase();
  return LYVERA_BLOG_ARTICLES.find((article) => article.path.toLowerCase() === normalized);
}
