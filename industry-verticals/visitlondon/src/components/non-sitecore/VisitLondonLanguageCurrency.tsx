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
        <PopoverTrigger className="flex items-center gap-1 text-foreground hover:text-accent transition-colors">
          <Globe className="size-4" />
          <span>{language}</span>
          <ChevronDown className="size-3" />
        </PopoverTrigger>
        <PopoverContent className="w-32 p-2">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setLanguage('EN')}
              className="text-left px-2 py-1 hover:bg-background-muted rounded"
            >
              English
            </button>
            <button
              onClick={() => setLanguage('FR')}
              className="text-left px-2 py-1 hover:bg-background-muted rounded"
            >
              Français
            </button>
            <button
              onClick={() => setLanguage('ES')}
              className="text-left px-2 py-1 hover:bg-background-muted rounded"
            >
              Español
            </button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Currency Selector */}
      <Popover>
        <PopoverTrigger className="flex items-center gap-1 text-foreground hover:text-accent transition-colors">
          <span>{currency}</span>
          <ChevronDown className="size-3" />
        </PopoverTrigger>
        <PopoverContent className="w-32 p-2">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setCurrency('£ GBP')}
              className="text-left px-2 py-1 hover:bg-background-muted rounded"
            >
              £ GBP
            </button>
            <button
              onClick={() => setCurrency('€ EUR')}
              className="text-left px-2 py-1 hover:bg-background-muted rounded"
            >
              € EUR
            </button>
            <button
              onClick={() => setCurrency('$ USD')}
              className="text-left px-2 py-1 hover:bg-background-muted rounded"
            >
              $ USD
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
