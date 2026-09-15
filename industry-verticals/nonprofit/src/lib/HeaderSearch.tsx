'use client';

import { FormEvent, JSX, useState } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { searchCatalog } from '@/lib/openhand-catalog';
import { parseDemoParams, withDemoParams } from '@/lib/demo-params';

export const HeaderSearch = (): JSX.Element => {
  const router = useRouter();
  const demo = parseDemoParams(router.asPath);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const hits = searchCatalog(draft).slice(0, 5);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const q = draft.trim();
    setOpen(false);
    void router.push(withDemoParams(q ? `/search?q=${encodeURIComponent(q)}` : '/search', demo));
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="oh-btn oh-btn--ghost px-3"
        aria-label="Search"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
      </button>
      {open && (
        <div className="absolute top-12 right-0 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-[var(--oh-line)] bg-white p-3 shadow-lg">
          <form onSubmit={submit} className="flex items-center gap-2">
            <input
              autoFocus
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="w-full rounded-md border border-[var(--oh-line)] px-3 py-2 text-sm"
              placeholder="Search advice, partners, stories"
              aria-label="Search Openhand"
            />
            <button type="button" aria-label="Close search" onClick={() => setOpen(false)}>
              <X className="size-4" />
            </button>
          </form>
          <ul className="mt-2 grid gap-1 text-sm">
            {hits.map((hit) => (
              <li key={hit.href}>
                <Link href={withDemoParams(hit.href, demo)} onClick={() => setOpen(false)}>
                  {hit.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
