/** Local demo image paths under public/images. */
export const demoImages = {
  logo: '/images/logo.png',
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
