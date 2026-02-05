'use client';

import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

/**
 * Visit London Hero Search Bar
 * Matches visitlondon.com hero search design:
 * - White search bar with "I want to" placeholder
 * - Red button with chevron on the right
 */
export const VisitLondonHeroSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission
    console.log('Search:', searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center">
      <div className="flex flex-1 items-center rounded-l-lg bg-white shadow-md">
        <Search className="text-foreground-muted ml-4 size-5" />
        <input
          type="text"
          placeholder="I want to"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="placeholder:text-foreground-muted flex-1 px-4 py-4 text-base outline-none"
        />
      </div>
      <button
        type="submit"
        className="bg-accent hover:bg-accent-dark flex items-center justify-center rounded-r-lg px-6 py-4 text-white shadow-md transition-colors"
        aria-label="Search"
      >
        <ChevronDown className="size-5 rotate-[-90deg]" />
      </button>
    </form>
  );
};
