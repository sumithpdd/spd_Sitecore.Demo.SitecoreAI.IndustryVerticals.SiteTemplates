'use client';

import { JSX } from 'react';
import { useRouter } from 'next/router';

const LOCALES = [
  { id: 'en', label: 'EN' },
  { id: 'de-DE', label: 'DE' },
  { id: 'fr-FR', label: 'FR' },
];

const TRANSLATED = ['/industries/energy', '/perspectives/regulatory-heatmap'];

export function LanguageSwitcher(): JSX.Element {
  const router = useRouter();
  const active = router.locale || 'en';
  const path = (router.asPath || '').split('?')[0];
  const hasDe = TRANSLATED.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
  const fallback = active !== 'en' && !hasDe;

  return (
    <label className="pm-lang">
      <span className="sr-only">Language</span>
      <select
        className="pm-lang__select"
        value={active}
        aria-label={fallback ? 'Language — English fallback' : 'Language'}
        onChange={(event) => {
          const locale = event.target.value;
          void router.push(router.asPath, router.asPath, { locale });
        }}
      >
        {LOCALES.map((item) => (
          <option key={item.id} value={item.id}>
            {item.id === 'de-DE' && !hasDe ? 'DE (EN fallback)' : item.label}
          </option>
        ))}
      </select>
      {fallback ? <span className="pm-lang__fallback">English fallback</span> : null}
    </label>
  );
}
