/** Local fallbacks after media download; prefer Sitecore DAM URLs when present. */
export const brotherImages = {
  logo: 'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/41f98f6ac7ae477a842eeb9dd22cf59d?v=002fa575',
  homeHero:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/e3ef5869a8d14fd7987473d81f9a0bc1',
  vc500w: '/images/vc-500w.jpg',
  vc500wLaptop: '/images/vc-500w-laptop.jpg',
  vc500wColour: '/images/vc-500w-colour.jpg',
  vc500wWidths: '/images/vc-500w-widths.jpg',
  vc500wCutter: '/images/vc-500w-cutter.jpg',
  articleHero: '/images/desk-office.jpg',
  labellingTile: '/images/labelling-tile.jpg',
  suppliesHero: '/images/supplies-hero.jpg',
  printerHero: '/images/home-hero.jpg',
  sustainability:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/e7f1794bcb254d77b5c4bd6842f1301e',
  mpsBanner:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/442f69d5d9d24acb9fbe62e539e8703b',
  campaignAtYourSide:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/33e984b8ed114a21b8118ebc58e91025',
} as const;

export type BrotherImageKey = keyof typeof brotherImages;
