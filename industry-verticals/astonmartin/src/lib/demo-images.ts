import { ImageField } from '@sitecore-content-sdk/nextjs';

/** Local demo assets under `public/images/` (cropped from design captures). */
export const DEMO_IMAGES = {
  homeHero: '/images/home-hero.jpg',
  homeVantage: '/images/home-vantage.jpg',
  modelsHero: '/images/models-hero.jpg',
  configuratorHero: '/images/configurator-hero.jpg',
  craftedForYou: '/images/crafted-for-you.jpg',
  qByHero: '/images/q-by-hero.jpg',
  ownersHero: '/images/owners-hero.jpg',
  ourWorldHero: '/images/our-world-hero.jpg',
  experiencesHero: '/images/experiences-hero.jpg',
  dealersHero: '/images/dealers-hero.jpg',
  promoPreowned: '/images/promo-preowned.jpg',
  promoMagazine: '/images/promo-magazine.jpg',
  story1: '/images/story-1.jpg',
  story2: '/images/story-2.jpg',
  story3: '/images/story-3.jpg',
  news1: '/images/news-1.jpg',
  news2: '/images/news-2.jpg',
  news3: '/images/news-3.jpg',
  familyDb12: '/images/family-db12.jpg',
  familyVantage: '/images/family-vantage.jpg',
  familyVanquish: '/images/family-vanquish.jpg',
  familyDbx: '/images/family-dbx.jpg',
  familyValhalla: '/images/family-valhalla.jpg',
  familyValkyrie: '/images/family-valkyrie.jpg',
  familyValour: '/images/family-valour.jpg',
  familyValiant: '/images/family-valiant.jpg',
  familyAmr26: '/images/family-amr26.jpg',
} as const;

export function modelHero(slug: string): string {
  return `/images/${slug}-hero.jpg`;
}

export function modelFeature(slug: string): string {
  return `/images/${slug}-feature.jpg`;
}

export function modelTile(slug: string, n: 1 | 2 | 3): string {
  return `/images/${slug}-tile-${n}.jpg`;
}

export function demoImage(src: string, alt = '', width = 1440, height = 900): ImageField {
  return { value: { src, alt, width, height } };
}

/** Prefer CMS image when it has a non-empty src; otherwise use local demo fallback. */
export function withDemoImage(
  field: ImageField | undefined,
  fallbackSrc: string,
  alt = ''
): ImageField {
  const src = typeof field?.value?.src === 'string' ? field.value.src.trim() : '';
  if (src) {
    return demoImage(
      src,
      field?.value?.alt || alt,
      Number(field?.value?.width) || 1440,
      Number(field?.value?.height) || 900
    );
  }
  return demoImage(fallbackSrc, alt || field?.value?.alt || '');
}
