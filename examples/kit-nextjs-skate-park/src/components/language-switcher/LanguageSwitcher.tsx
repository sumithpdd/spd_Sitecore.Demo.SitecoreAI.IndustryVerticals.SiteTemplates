'use client';

import type React from 'react';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../shadcn/components/ui/select';
import { useI18n } from 'next-localization';
import { Globe } from 'lucide-react';

type AppLocale = 'en' | 'fr-FR' | 'es-ES';

type Language = { code: AppLocale; label: string };

const LANGUAGES: Language[] = [
  { code: 'en', label: 'EN | USD' },
  { code: 'fr-FR', label: 'FR | EUR' },
  { code: 'es-ES', label: 'ES | EUR' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const { locale } = useI18n();
  const activeLocale = useMemo<AppLocale>(() => locale() as AppLocale, [locale]);

  const [selectedLocale, setSelectedLocale] = useState<AppLocale>(activeLocale);
  useEffect(() => setSelectedLocale(activeLocale), [activeLocale]);

  const changeLanguage = useCallback(
    (langCode: AppLocale) => {
      setSelectedLocale(langCode);
      if (pathname && asPath && query) {
        router.push(
          {
            pathname,
            query,
          },
          asPath,
          {
            locale: langCode,
            shallow: false,
          }
        );
      }
    },
    [asPath, pathname, query, router]
  );

  return (
    <Select value={selectedLocale} onValueChange={(value) => changeLanguage(value as AppLocale)}>
      <SelectTrigger
        id="language-select"
        aria-label={`Current Language: ${selectedLocale}`}
        className="border-0 focus-visible:ring-0 [&>svg]:hidden shadow-none"
      >
        <div className="flex items-center gap-2">
          <Globe size={16} aria-hidden="true" />
          <SelectValue placeholder="Language" />
        </div>
      </SelectTrigger>
      <SelectContent align="end" className="min-w-44  border-0">
        {LANGUAGES.map((Language) => (
          <SelectItem key={Language.code} value={Language.code}>
            <span className="text-sm">{Language.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
