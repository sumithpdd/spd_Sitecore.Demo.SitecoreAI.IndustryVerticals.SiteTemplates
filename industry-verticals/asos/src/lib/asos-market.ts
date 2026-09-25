export type MarketCode = 'uk' | 'us' | 'au' | 'de';

export type Market = {
  code: MarketCode;
  prefix: string;
  label: string;
  currency: string;
  locale: string;
  sizeSystem: 'UK' | 'US' | 'AU' | 'EU';
  legal: string;
  topshopCopy: string;
};

export const MARKETS: Record<MarketCode, Market> = {
  uk: {
    code: 'uk',
    prefix: '',
    label: 'United Kingdom',
    currency: 'GBP',
    locale: 'en-GB',
    sizeSystem: 'UK',
    legal: 'ASOS.com Ltd, Greater London House, Hampstead Road, London NW1 7FB.',
    topshopCopy:
      'Topshop in the UK — the Belle Paris drop and petite denim, merchandised for her keep-rate.',
  },
  us: {
    code: 'us',
    prefix: '/us',
    label: 'United States',
    currency: 'USD',
    locale: 'en-US',
    sizeSystem: 'US',
    legal: 'ASOS US. Duties and import charges shown at checkout.',
    topshopCopy: 'Topshop in the US — Belle Paris camisole and petite denim with US sizing.',
  },
  au: {
    code: 'au',
    prefix: '/au',
    label: 'Australia',
    currency: 'AUD',
    locale: 'en-AU',
    sizeSystem: 'AU',
    legal: 'ASOS Australia. GST included where applicable.',
    topshopCopy: 'Topshop in Australia — summer-weight denim and the Belle Paris cami.',
  },
  de: {
    code: 'de',
    prefix: '/de',
    label: 'Deutschland',
    currency: 'EUR',
    locale: 'de-DE',
    sizeSystem: 'EU',
    legal: 'ASOS Germany. Preise inkl. MwSt.',
    topshopCopy: 'Topshop in Deutschland — Belle Paris und Petite Denim mit EU-Größen.',
  },
};

const MARKET_SEGS = new Set<string>(['us', 'au', 'de']);

export function parseMarketPath(asPath: string): { market: Market; path: string } {
  const raw = (asPath || '/').split('?')[0];
  const parts = raw.split('/').filter(Boolean);
  if (parts[0] && MARKET_SEGS.has(parts[0])) {
    return {
      market: MARKETS[parts[0] as MarketCode],
      path: `/${parts.slice(1).join('/')}`.replace(/\/$/, '') || '/',
    };
  }
  return { market: MARKETS.uk, path: raw.replace(/\/$/, '') || '/' };
}

export function withMarket(href: string, market: MarketCode): string {
  const prefix = MARKETS[market].prefix;
  if (!prefix) return href;
  if (href.startsWith(prefix + '/') || href === prefix) return href;
  return href === '/' ? prefix || '/' : `${prefix}${href}`;
}

const FX: Record<MarketCode, number> = { uk: 1, us: 1.27, au: 1.92, de: 1.17 };

export function formatMoney(gbp: number, market: MarketCode): string {
  const value = gbp * FX[market];
  return new Intl.NumberFormat(MARKETS[market].locale, {
    style: 'currency',
    currency: MARKETS[market].currency,
  }).format(value);
}

export function sizeLabel(ukSize: string, market: MarketCode): string {
  const n = Number(ukSize.replace(/\D/g, '')) || 8;
  if (market === 'us') return `US ${n + 4}`;
  if (market === 'au') return `AU ${n + 4}`;
  if (market === 'de') return `EU ${n + 32}`;
  return `UK ${n}`;
}
