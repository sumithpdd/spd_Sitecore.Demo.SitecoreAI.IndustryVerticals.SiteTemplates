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
      <div className="flex flex-1 items-center bg-white rounded-l-lg shadow-md">
        <Search className="ml-4 size-5 text-foreground-muted" />
        <input
          type="text"
          placeholder="I want to"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-4 text-base outline-none placeholder:text-foreground-muted"
        />
      </div>
      <button
        type="submit"
        className="flex items-center justify-center bg-accent text-white px-6 py-4 rounded-r-lg shadow-md hover:bg-accent-dark transition-colors"
        aria-label="Search"
      >
        <ChevronDown className="size-5 rotate-[-90deg]" />
      </button>
    </form>
  );
};
