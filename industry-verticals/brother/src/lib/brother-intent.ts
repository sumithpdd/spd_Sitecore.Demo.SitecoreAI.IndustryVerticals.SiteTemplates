export type BrotherIntent =
  | 'default'
  | 'label-printer'
  | 'home-printer'
  | 'at-your-side'
  | 'return-visit'
  | 'supplies';

type SearchParamsLike =
  | URLSearchParams
  | Record<string, string | string[] | undefined>
  | null
  | undefined;

function readParam(params: SearchParamsLike, key: string): string {
  if (!params) return '';
  if (typeof (params as URLSearchParams).get === 'function') {
    return ((params as URLSearchParams).get(key) || '').trim();
  }
  const value = (params as Record<string, string | string[] | undefined>)[key];
  if (Array.isArray(value)) return (value[0] || '').trim();
  return (value || '').trim();
}

/**
 * Demo personalization intents for the Brother storyboard (Jack / Izzy / Rick).
 * Driven by utm_campaign, utm_content, utm_source, intent, and persona query params.
 */
export function resolveBrotherIntent(searchParams?: SearchParamsLike): BrotherIntent {
  let params = searchParams;
  if (!params && typeof window !== 'undefined') {
    params = new URLSearchParams(window.location.search);
  }

  const campaign = readParam(params, 'utm_campaign').toLowerCase();
  const content = readParam(params, 'utm_content').toLowerCase();
  const source = readParam(params, 'utm_source').toLowerCase();
  const intent = readParam(params, 'intent').toLowerCase();
  const persona = readParam(params, 'persona').toLowerCase();
  const combined = `${campaign} ${content} ${source} ${intent} ${persona}`;

  if (
    combined.includes('at-your-side') ||
    combined.includes('atyourside') ||
    combined.includes('at_your_side')
  ) {
    return 'at-your-side';
  }

  if (
    combined.includes('home-printer') ||
    combined.includes('homeprinter') ||
    combined.includes('laser-printer') ||
    combined.includes('jack') ||
    (source.includes('google') && combined.includes('printer'))
  ) {
    return 'home-printer';
  }

  if (
    combined.includes('return') ||
    combined.includes('consumers') ||
    combined.includes('product-interest') ||
    combined.includes('welcome-back')
  ) {
    return 'return-visit';
  }

  if (
    combined.includes('supplies') ||
    combined.includes('toner') ||
    combined.includes('ink') ||
    combined.includes('reorder') ||
    combined.includes('ordercloud')
  ) {
    return 'supplies';
  }

  if (
    combined.includes('label-printer') ||
    combined.includes('labelprinter') ||
    combined.includes('vc-500w') ||
    combined.includes('vc500w') ||
    combined.includes('labelling') ||
    combined.includes('izzy')
  ) {
    return 'label-printer';
  }

  return 'default';
}

export type DemoPersona = 'jack' | 'izzy' | 'rick';

export const DEMO_PERSONAS: {
  id: DemoPersona;
  label: string;
  role: string;
  href: string;
}[] = [
  {
    id: 'jack',
    label: 'Jack',
    role: 'Customer',
    href: '/printers?utm_campaign=home-printer&utm_source=google&persona=jack',
  },
  {
    id: 'izzy',
    label: 'Izzy',
    role: 'Marketing',
    href: '/campaigns/at-your-side?utm_campaign=at-your-side&persona=izzy',
  },
  {
    id: 'rick',
    label: 'Rick',
    role: 'Merchandising + CRO',
    href: '/supplies?utm_campaign=ordercloud-supplies&persona=rick',
  },
];
