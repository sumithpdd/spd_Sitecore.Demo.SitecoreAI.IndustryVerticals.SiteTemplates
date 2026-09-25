/** ASOS demo story — Maya (story-only, not a /people profile). */

export const STORY = {
  persona: 'Maya',
  opener: 'petite denim + Topshop Belle Paris',
  search: 'petite denim topshop',
  heroProductId: '200415553',
  heroHref: '/topshop/topshop-belle-paris-camisole-in-blue/prd/200415553',
  weekdayProductId: '211674477',
  weekdayHref: '/weekday/weekday-flannel-pyjama-bottoms-in-black-check/prd/211674477',
  newInCid: '27108',
  petiteCid: '88016',
  topshopCid: '29299',
  denimDropCid: '88011',
  womenHref: '/women',
  newInHref: '/women/new-in/cat/?cid=27108',
  petiteHref: '/petite-denim/cat/?cid=88016',
  denimDropHref: '/the-denim-drop/cat/?cid=88011',
  topshopHref: '/women/a-to-z-of-brands/topshop/cat/?cid=29299',
  styleFeedHref: '/style-feed',
  savedHref: '/saved-items',
  myEditHref: '/my-edit',
  insightHref: '/curation-insight',
  bagHref: '/bag',
  accountHref: '/account',
  searchHref: '/search',
  promo: '10% off for new customers — use code NEW10',
};

export const TRENDING_CHIPS = [
  { label: 'new in', href: STORY.newInHref },
  { label: 'chocolate', href: '/chocolate/cat/?cid=91001' },
  { label: 'polka dot', href: '/polka-dot/cat/?cid=91002' },
  { label: 'petite denim', href: STORY.petiteHref },
  { label: 'Topshop', href: STORY.topshopHref },
];

export const EDITS = [
  {
    slug: 'the-denim-drop',
    cid: '88011',
    title: 'The denim drop',
    kicker: 'New edit',
    href: '/the-denim-drop/cat/?cid=88011',
    body: 'Session 2 campaign — petite-first denim with keep-rate copy.',
  },
  {
    slug: 'festival-2-0',
    cid: '88012',
    title: 'Festival 2.0',
    kicker: 'New edit',
    href: '/festival-2-0/cat/?cid=88012',
    body: 'Layered metallics and rugby tops for the field.',
  },
  {
    slug: 'your-new-uniform',
    cid: '88013',
    title: 'Your new uniform',
    kicker: 'New edit',
    href: '/your-new-uniform/cat/?cid=88013',
    body: 'The 9–5 that still works on Friday.',
  },
  {
    slug: 'topshop-catwalk',
    cid: '88014',
    title: 'Topshop Catwalk',
    kicker: 'Brand edit',
    href: '/topshop-catwalk/cat/?cid=88014',
    body: 'Belle Paris and the denim that made the show.',
  },
];

export const BODY_FITS = ['petite', 'tall', 'plus', 'maternity', 'standard'] as const;
export type BodyFit = (typeof BODY_FITS)[number];

export const MERCH_STATES = ['selling-fast', 'restocking-soon', 'last-chance'] as const;
export type MerchState = (typeof MERCH_STATES)[number];

export function cidFromQuery(asPath: string): string {
  const q = asPath.split('?')[1] || '';
  return new URLSearchParams(q).get('cid') || '';
}

export function journeyKey(path: string, cid: string): string {
  if (path === '/' || path === '/women') return 'women';
  if (path.includes('/prd/')) return 'pdp';
  if (path.includes('/a-to-z-of-brands/topshop')) return 'topshop';
  if (path.startsWith('/style-feed')) return 'style-feed';
  if (path === '/saved-items') return 'saved';
  if (path === '/my-edit') return 'my-edit';
  if (path === '/curation-insight') return 'insight';
  if (path === '/bag') return 'bag';
  if (path === '/account') return 'account';
  if (cid === '27108' || path.includes('/new-in')) return 'new-in';
  if (cid === '88016' || path.includes('petite-denim')) return 'petite';
  if (cid === '88011' || path.includes('the-denim-drop')) return 'denim-drop';
  if (path.endsWith('/cat') || path.includes('/cat/')) return 'category';
  return 'women';
}
