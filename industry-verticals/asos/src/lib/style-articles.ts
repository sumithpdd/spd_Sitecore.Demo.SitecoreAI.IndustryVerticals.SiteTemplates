import { DAM } from '@/lib/dam-registry';
import { STORY } from '@/lib/asos-journey';

function still(file: string): string {
  return DAM[file]?.src || '';
}

export type StyleCard = {
  title: string;
  href: string;
  image: string;
};

export type StyleArticle = StyleCard & {
  slug: string;
  kicker: string;
  shopLabel: string;
  shopHref: string;
  body: string;
};

export const STYLE_FEED = {
  heading: 'The Style Feed',
  intro: 'Discover more outfit ideas, editor picks and Face + Body tips on the Style Feed',
  discoverHref: STORY.styleFeedHref,
  readLabel: 'Read now',
  readHref: STORY.styleFeedHref,
};

export const STYLE_ARTICLES: StyleArticle[] = [
  {
    slug: 'how-law-roach-styled-autumn',
    kicker: 'Stylist in residence',
    title: 'How Law Roach styled autumn',
    href: '/style-feed/how-law-roach-styled-autumn',
    image: still('trend-5.jpg'),
    shopLabel: 'Shop the Berlin edit',
    shopHref: STORY.denimDropHref,
    body: `<p>Law Roach is stylist in residence for the season. The brief is a soft shoulder, a long coat, and one pair of jeans that can leave a lecture and still look considered on the train home.</p><p>He keeps the palette chocolate, grey, and black. The jean does the work of a trouser: wide through the leg, mid wash, one size kept rather than three tried on. UK 8 on the model at 5'7".</p><p>Autumn, in this edit, is not a new silhouette every week. It is the same jean with the knit and the boot, worn until the coat comes off.</p>`,
  },
  {
    slug: 'what-to-wear-to-uni',
    kicker: 'Denim',
    title: 'What to wear to uni',
    href: '/style-feed/what-to-wear-to-uni',
    image: still('trend-3.jpg'),
    shopLabel: 'Shop wide-leg jeans under £50',
    shopHref: STORY.denimDropHref,
    body: `<p>Start with the jean. A mid-wash wide leg under £50 is the uniform: it sits with a knit, a shirt, or the coat you already own.</p><p>Petite and tall cuts are in the same edit, so the hem lands on the boot instead of the floor. If UK 8 is your size, keep it. The label on the mid-wash jean says the model is 5'7" and wears that size.</p><p>The rest of the week is the same pair. Seminar, library, the late train. Denim is the piece that does not need a second outfit.</p>`,
  },
  {
    slug: 'wide-leg-jeans-under-50',
    kicker: 'Berlin, October',
    title: 'Wide-leg jeans under £50',
    href: '/style-feed/wide-leg-jeans-under-50',
    image: still('trend-1.jpg'),
    shopLabel: 'Shop the jean',
    shopHref: STORY.heroHref,
    body: `<p>Berlin in October is one coat, one chocolate knit, and the mid-wash wide leg. The whole edit stays under £50.</p><p>The jean is ASOS DESIGN, £38, UK 8. The knit and the Chelsea boot are the other two pieces worth saving. Nothing else has to match. The wash does the colour work.</p><p>Filter the denim edit by body fit if you need petite, tall, or curve. The story size stays UK 8.</p>`,
  },
  {
    slug: 'chocolate-denim',
    kicker: 'One wash',
    title: 'Chocolate denim, worn in',
    href: '/style-feed/chocolate-denim',
    image: still('trend-2.jpg'),
    shopLabel: 'Shop the chocolate edit',
    shopHref: '/edits/chocolate',
    body: `<p>Chocolate is the darker wash, not a new trend board. It is the jean you already know, taken one shade down, with the knit beside it.</p><p>Polka dot stays on a camisole. Denim stays the anchor. A barrel leg in the darker wash reads as tailoring once the coat is on.</p><p>Keep one pair. The October edit is small on purpose.</p>`,
  },
];

export function articleFromPath(path: string): StyleArticle | undefined {
  const slug = path.split('?')[0].split('/').filter(Boolean).pop() || '';
  return STYLE_ARTICLES.find((article) => article.slug === slug);
}
