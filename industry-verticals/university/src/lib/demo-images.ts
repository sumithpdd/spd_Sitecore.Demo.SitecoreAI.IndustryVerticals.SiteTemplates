import { ImageField } from '@sitecore-content-sdk/nextjs';

/** Local demo image paths under public/images. */
export const demoImages = {
  logo: '/images/logo.svg',
  heroClearing: '/images/hero-clearing.jpg',
  heroClearingMobile: '/images/hero-clearing-mobile.jpg',
  heroCentenary: '/images/hero-centenary.jpg',
  heroCentenaryMerch: '/images/hero-centenary-merch.jpg',
  clearingBanner: '/images/clearing-banner.jpg',
  clearingTyping: '/images/clearing-typing.jpg',
  clearingStudents: '/images/clearing-students.jpg',
  clearingPrefooter: '/images/clearing-prefooter.jpg',
  courseCsAiHero: '/images/course-csai-hero.jpg',
  studyLifeHero: '/images/study-life-hero.jpg',
  studyLifeSu: '/images/study-life-su.jpg',
  accommodationHero: '/images/accommodation-hero.jpg',
  accommodationEnsuite: '/images/accommodation-ensuite.jpg',
  tileCourses: '/images/tile-courses.jpg',
  tileStudentLife: '/images/tile-student-life.jpg',
  tileAccommodation: '/images/tile-accommodation.jpg',
} as const;

export type DemoImageKey = keyof typeof demoImages;

export function demoImage(src: string, alt = '', width = 1440, height = 900): ImageField {
  return { value: { src, alt, width, height } };
}

function imageAlt(value: ImageField['value'] | undefined, fallback = ''): string {
  return typeof value?.alt === 'string' && value.alt ? value.alt : fallback;
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
      imageAlt(field?.value, alt),
      Number(field?.value?.width) || 1440,
      Number(field?.value?.height) || 900
    );
  }
  return demoImage(fallbackSrc, alt || imageAlt(field?.value));
}
