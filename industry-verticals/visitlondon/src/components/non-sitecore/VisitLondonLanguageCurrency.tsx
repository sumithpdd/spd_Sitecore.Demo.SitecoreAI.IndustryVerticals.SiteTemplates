'use client';

import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/components/ui/popover';

/**
 * Visit London Language & Currency Selector
 * Matches visitlondon.com top bar design
 */
export const VisitLondonLanguageCurrency = () => {
  const [language, setLanguage] = useState('EN');
  const [currency, setCurrency] = useState('£ GBP');

  return (
    <div className="flex items-center gap-4 text-sm">
      {/* Language Selector */}
      <Popover>
        <PopoverTrigger className="text-foreground hover:text-accent flex items-center gap-1 transition-colors">
          <Globe className="size-4" />
          <span>{language}</span>
          <ChevronDown className="size-3" />
        </PopoverTrigger>
        <PopoverContent className="w-32 p-2">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setLanguage('EN')}
              className="hover:bg-background-muted rounded px-2 py-1 text-left"
            >
              English
            </button>
            <button
              onClick={() => setLanguage('FR')}
              className="hover:bg-background-muted rounded px-2 py-1 text-left"
            >
              Français
            </button>
            <button
              onClick={() => setLanguage('ES')}
              className="hover:bg-background-muted rounded px-2 py-1 text-left"
            >
              Español
            </button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Currency Selector */}
      <Popover>
        <PopoverTrigger className="text-foreground hover:text-accent flex items-center gap-1 transition-colors">
          <span>{currency}</span>
          <ChevronDown className="size-3" />
        </PopoverTrigger>
        <PopoverContent className="w-32 p-2">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setCurrency('£ GBP')}
              className="hover:bg-background-muted rounded px-2 py-1 text-left"
            >
              £ GBP
            </button>
            <button
              onClick={() => setCurrency('€ EUR')}
              className="hover:bg-background-muted rounded px-2 py-1 text-left"
            >
              € EUR
            </button>
            <button
              onClick={() => setCurrency('$ USD')}
              className="hover:bg-background-muted rounded px-2 py-1 text-left"
            >
              $ USD
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
