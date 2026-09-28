/** Content Hub brand 112600. Public src + dam-id. Never hotlink weareaspire.com. */

export type DamAsset = { src: string; damId: string; alt: string };

export type ImageField = { value?: { src?: string; alt?: string } };

export const DAM: Record<string, DamAsset> = {
  'consultant-tommy.jpg': {
    src: 'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/9300416697f048ee83462ff5430067c8',
    damId: '_GspQ9pPSd6yUg_8vDs3tA',
    alt: 'consultant-tommy',
  },
  'london-office.jpg': {
    src: 'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/f9727c63024046989e76073cc5735400',
    damId: 'nl92P43CRP6NqgMf3CftBQ',
    alt: 'london-office',
  },
  'hero-office.jpg': {
    src: 'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/ba07a88e3a4e486795d041af2a1fe58f',
    damId: 'N_zJXYroQS-308yAhOspvw',
    alt: 'hero-office',
  },
  'consultant-ian.jpg': {
    src: 'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/686a60b6f1d74eaab1ca6aa4208ac992',
    damId: 'wvRBAWnwRwarUnNHkEt8Iw',
    alt: 'consultant-ian',
  },
  'job-events.jpg': {
    src: 'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/d83b0a0dd1a64841a273691b84f64c01',
    damId: 'j55VDLB7SLuyJg6H9Ng1Qg',
    alt: 'job-events',
  },
  'article-counter-offer.jpg': {
    src: 'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/c10d4cdc7bfd46c0b7008d682b5d5d20',
    damId: 'LpQOW8ylS4GFcyy7ugOuEw',
    alt: 'article-counter-offer',
  },
  'promo-partnership.jpg': {
    src: 'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/88004137b25742db9fdbe999e378799f',
    damId: 'vz7mf8nrTTuL2_yNBafMRA',
    alt: 'promo-partnership',
  },
  'job-saas.jpg': {
    src: 'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/7e9d7b94d3954d3a8e525f698e6f21e2',
    damId: 'yqdp15lBReultBfQrFIekw',
    alt: 'job-saas',
  },
  'job-marketplace.jpg': {
    src: 'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/79c933b31c0044e098d236a9933b8c21',
    damId: 'V27JgddhQ0-aDZ2gleuLmg',
    alt: 'job-marketplace',
  },
  'consultant-amy.jpg': {
    src: 'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/10bcd51a166345548d8017bbe86a6684',
    damId: 'o20Khzm_SmeV9_Y956VVFw',
    alt: 'consultant-amy',
  },
  'article-geo.jpg': {
    src: 'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/69ad42dc412944f9827960e7925b47cf',
    damId: 'om_nq4YnSfmuDUn-NTXfEg',
    alt: 'article-geo',
  },
  'job-edtech.jpg': {
    src: 'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/cea92715023d494f94d5da7cd9b2567e',
    damId: 'BwC9nFCXS4u8f0-paeU5YA',
    alt: 'job-edtech',
  },
};

export const imageSrc = (field: ImageField | undefined, file: string): string =>
  field?.value?.src || DAM[file]?.src || '';
