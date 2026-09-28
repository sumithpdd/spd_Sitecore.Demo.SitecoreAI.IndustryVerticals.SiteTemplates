import { ImageField } from '@sitecore-content-sdk/nextjs';

const CH = 'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content';

/** Content Hub brand 114500 (Sheffield Hallam). src only — no shu.ac.uk hotlinks. */
export const demoImages = {
  logo: `${CH}/738d6e15a1b34cf1a45ac1110078ebb6`,
  heroClearing: `${CH}/7bafd358f0474055983dcb0d15ef0641`,
  heroClearingMobile: `${CH}/7bafd358f0474055983dcb0d15ef0641`,
  heroCentenary: `${CH}/b181e3a4d3b542c2b8bf67ae2371f3d9`,
  heroCentenaryMerch: `${CH}/8aacb40414b843bbbf19fbbb0e183b1a`,
  clearingBanner: `${CH}/7bafd358f0474055983dcb0d15ef0641`,
  clearingTyping: `${CH}/d10c776b2cc7481cb7c6f8764bd23921`,
  clearingStudents: `${CH}/8aacb40414b843bbbf19fbbb0e183b1a`,
  clearingPrefooter: `${CH}/b181e3a4d3b542c2b8bf67ae2371f3d9`,
  courseCsAiHero: `${CH}/b5123a012cae4d9eb747725b22dae8af`,
  studyLifeHero: `${CH}/d10c776b2cc7481cb7c6f8764bd23921`,
  studyLifeSu: `${CH}/8aacb40414b843bbbf19fbbb0e183b1a`,
  accommodationHero: `${CH}/3daf55ae44fa416da4e5555f08704c0b`,
  accommodationEnsuite: `${CH}/3daf55ae44fa416da4e5555f08704c0b`,
  tileCourses: `${CH}/b5123a012cae4d9eb747725b22dae8af`,
  tileStudentLife: `${CH}/8aacb40414b843bbbf19fbbb0e183b1a`,
  tileAccommodation: `${CH}/3daf55ae44fa416da4e5555f08704c0b`,
} as const;

export type DemoImageKey = keyof typeof demoImages;

/** Published university assets replaced by Content Hub brand 114500. */
const previousUniversityImages: Record<string, string> = {
  '68a8532aadc04b7089a539138b8d6285': demoImages.logo,
  '45d1ee02de4948238c106b516965f72b': demoImages.logo,
  '103289-LandingPageHero-2000x600': demoImages.heroClearing,
  '0f57e76714b44abb8e751a82d24fce6b': demoImages.heroClearing,
  '058fd55ef9134e0989cce9e41f0fdc3a': demoImages.studyLifeHero,
  '7178de28b1594047885d9fbbe3c5f4f4': demoImages.heroCentenary,
  ccf8cf1864464f8f9ba398cf4865401a: demoImages.clearingStudents,
  '0ebeae071da84df88389d60d481e1694': demoImages.tileAccommodation,
};

/** Live delivery still has the previous university photos until university-scs is pushed. */
export function hallamLiveSrc(src: string): string {
  const id = src.match(/\/content\/([^/?#]+)/)?.[1];
  return (id && previousUniversityImages[id]) || src;
}

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
