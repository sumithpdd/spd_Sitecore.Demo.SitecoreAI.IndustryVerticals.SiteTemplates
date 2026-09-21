'use client';

import type { JSX } from 'react';
import { Globe } from 'lucide-react';
import { REGION_OPTIONS, useDemoAuth } from '@/lib/demo-auth';

export function RegionSelector(): JSX.Element {
  const { preferences, setPreferences } = useDemoAuth();
  const selected = REGION_OPTIONS.find((option) => option.slug === preferences.region);
  const label = selected?.label || 'All regions';

  return (
    <label className="pm-region">
      <Globe className="pm-region__icon" aria-hidden="true" />
      <span className="sr-only">Region</span>
      <select
        className="pm-region__select"
        value={preferences.region}
        aria-label={`Show content for ${label}`}
        onChange={(event) => setPreferences({ region: event.target.value })}
      >
        {REGION_OPTIONS.map((option) => (
          <option key={option.slug} value={option.slug}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
