'use client';

import { FormEvent, useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/router';

export const HeaderSearch = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }
    void router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form className="bristan-header__search-form" onSubmit={handleSubmit} role="search">
      <input
        type="search"
        className="bristan-header__search-input"
        placeholder="Search here…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Search"
      />
      <button type="submit" className="bristan-header__search-button" aria-label="Submit search">
        <Search className="size-5" aria-hidden />
      </button>
    </form>
  );
};
