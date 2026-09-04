'use client';

import { JSX } from 'react';
import { useRouter } from 'next/router';
import { DEMO_PERSONAS, type DemoPersona } from 'lib/brother-intent';

/**
 * Storyboard "Browsing as" switcher — Jack / Izzy / Rick demo paths.
 */
export function DemoPersonaBar(): JSX.Element {
  const router = useRouter();
  const persona = String(router.query.persona || '').toLowerCase() as DemoPersona | '';

  return (
    <div className="brother-persona-bar" aria-label="Demo personas">
      <span className="brother-persona-bar__label">Browsing as</span>
      <ul>
        {DEMO_PERSONAS.map((p) => (
          <li key={p.id}>
            <a
              href={p.href}
              className={persona === p.id ? 'is-active' : undefined}
              title={p.role}
            >
              <strong>{p.label}</strong>
              <span>{p.role}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
