/**
 * Openhand demo query params.
 * ?audience=help|give · ?utm_source=chatgpt|linkedin|email · ?appeal=winter|emergency|off · ?promo=left|right · ?axp=1
 */
export type Audience = 'help' | 'give';
export type AppealMode = 'winter' | 'emergency' | 'off';
export type PromoSide = 'left' | 'right';
export type UtmSource = 'chatgpt' | 'linkedin' | 'email' | '';

export type DemoParams = {
  audience: Audience;
  appeal: AppealMode;
  promo: PromoSide;
  utmSource: UtmSource;
  axp: boolean;
};

const parseAudience = (value: string | null): Audience =>
  value === 'give' || value === 'help' ? value : 'help';

const parseAppeal = (value: string | null): AppealMode =>
  value === 'winter' || value === 'emergency' || value === 'off' ? value : 'off';

const parsePromo = (value: string | null): PromoSide => (value === 'right' ? 'right' : 'left');

const parseUtm = (value: string | null): UtmSource => {
  const lower = (value || '').toLowerCase();
  if (lower === 'chatgpt' || lower === 'linkedin' || lower === 'email') {
    return lower;
  }
  return '';
};

export const parseDemoParams = (asPath: string): DemoParams => {
  const query = asPath.split('?')[1] || '';
  const params = new URLSearchParams(query);
  return {
    audience: parseAudience(params.get('audience')),
    appeal: parseAppeal(params.get('appeal')),
    promo: parsePromo(params.get('promo')),
    utmSource: parseUtm(params.get('utm_source')),
    axp: params.get('axp') === '1',
  };
};

export const withDemoParams = (href: string, current: DemoParams): string => {
  const [path, existing] = href.split('?');
  const next = new URLSearchParams(existing || '');
  if (current.audience !== 'help') next.set('audience', current.audience);
  if (current.appeal !== 'off') next.set('appeal', current.appeal);
  if (current.promo !== 'left') next.set('promo', current.promo);
  if (current.utmSource) next.set('utm_source', current.utmSource);
  if (current.axp) next.set('axp', '1');
  const qs = next.toString();
  return qs ? `${path}?${qs}` : path;
};
