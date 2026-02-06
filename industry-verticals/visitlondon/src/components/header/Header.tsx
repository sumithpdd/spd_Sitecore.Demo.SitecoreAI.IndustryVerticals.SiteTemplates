'use client';

import React, { JSX, useState, useEffect } from 'react';
import { ComponentProps } from '@/lib/component-props';
import {
  Placeholder,
  Link,
  useSitecore,
  ImageField,
  NextImage as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';
import { ChevronDown, Search, Globe, Check, X } from 'lucide-react';
import HamburgerIcon from '@/components/non-sitecore/HamburgerIcon';

interface Fields {
  Image?: ImageField;
  Logo?: ImageField;
}

export type HeaderProps = ComponentProps & {
  params: { [key: string]: string };
  fields?: Fields;
};

/**
 * Visit London Header
 * Matches visitlondon.com design structure
 */
export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;
  const { page } = useSitecore();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [currentCurrency, setCurrentCurrency] = useState('£ GBP');
  const [isMounted, setIsMounted] = useState(false);

  // Ensure consistent rendering between server and client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only enable editing mode after hydration to prevent mismatch
  const isEditing = isMounted && page.mode.isEditing;

  // Home link for logo - editable in Sitecore
  const homeLink = {
    value: {
      href: '/',
      title: 'Visit London - Home',
    },
  };

  // Get logo image from fields (Image or Logo field)
  const logoImage = props.fields?.Image || props.fields?.Logo;
  const logoSrc = logoImage?.value?.src;

  const languages = [
    { code: 'en', label: 'English', hreflang: 'en' },
    { code: 'de', label: 'Deutsch', hreflang: 'de' },
    { code: 'fr', label: 'Français', hreflang: 'fr' },
    { code: 'it', label: 'Italiano', hreflang: 'it' },
    { code: 'es', label: 'Español', hreflang: 'es' },
  ];

  const currencies = [
    { code: 'GBP', symbol: '£', label: 'British Pound Sterling' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
    { code: 'USD', symbol: '$', label: 'United States Dollar' },
    { code: 'AUD', symbol: '$', label: 'Australian Dollar' },
    { code: 'CAD', symbol: '$', label: 'Canadian Dollar' },
  ];

  return (
    <header className={`component header header-visitlondon bg-white ${styles}`} id={id}>
      {/* Top Header Bar */}
      <div className="ww cf mobile-header border-border-light border-b" id="header">
        <div className="container mx-auto px-4">
          <div className="relative flex items-center justify-between py-3">
            {/* Left Section: Mobile Menu + Language + Currency */}
            <div className="flex items-center gap-4 flex-1">
              {/* Mobile Menu Button */}
              <button
                id="expand-nav"
                className="mobonly noprint header-mobile-trigger nav-trigger lg:hidden"
                onClick={() => setIsNavOpen(!isNavOpen)}
                aria-label="Menu"
              >
                <HamburgerIcon isOpen={isNavOpen} className="mobile-menu-icon" />
                <span className="mobile-menu-label sr-only">Menu</span>
              </button>

              {/* Language Switcher */}
              <div id="lang-switcher" className="noprint relative">
                <button
                  id="lang-trigger2"
                  className="flex items-center gap-1.5 text-sm hover:text-accent transition-colors px-2 py-1"
                  onClick={() => {
                    setIsLangOpen(!isLangOpen);
                    setIsCurrencyOpen(false);
                  }}
                  aria-haspopup="true"
                  aria-expanded={isLangOpen}
                  aria-label={`Language: ${currentLang}`}
                >
                  <Globe className="size-4 text-foreground" />
                  {currentLang}
                  <ChevronDown className={`size-3 chevron transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>
                {isLangOpen && (
                  <div className="lang-switcher-menu absolute right-0 top-full mt-1 bg-white border border-border rounded shadow-xl z-50 min-w-[220px] overflow-hidden">
                    <div className="lang-switcher-close p-3 border-b border-border flex items-center justify-between bg-background-muted">
                      <span className="text-sm font-semibold text-foreground">Select your language</span>
                      <button
                        onClick={() => setIsLangOpen(false)}
                        className="text-foreground-muted hover:text-foreground transition-colors"
                        aria-label="Close"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <ul className="max-h-64 overflow-y-auto">
                      {languages.map((lang) => {
                        const isCurrent = currentLang === lang.code.toUpperCase();
                        return (
                          <li
                            key={lang.code}
                            className={`${isCurrent ? 'current bg-accent/5' : ''} hover:bg-background-muted transition-colors`}
                          >
                            <a
                              href="#"
                              hrefLang={lang.hreflang}
                              lang={lang.hreflang}
                              className="flex items-center justify-between px-4 py-2.5 text-sm"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentLang(lang.code.toUpperCase());
                                setIsLangOpen(false);
                              }}
                            >
                              <span>{lang.label}</span>
                              {isCurrent && <Check className="size-4 text-accent" />}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>

              {/* Currency Switcher */}
              <div id="currency-switcher" className="noprint relative">
                <button
                  id="currency-trigger"
                  className="flex items-center gap-1 text-sm hover:text-accent transition-colors px-2 py-1"
                  onClick={() => {
                    setIsCurrencyOpen(!isCurrencyOpen);
                    setIsLangOpen(false);
                  }}
                  aria-haspopup="true"
                  aria-expanded={isCurrencyOpen}
                >
                  {currentCurrency}
                  <ChevronDown className={`size-3 chevron transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCurrencyOpen && (
                  <div className="currency-switcher-menu absolute right-0 top-full mt-1 bg-white border border-border rounded shadow-xl z-50 min-w-[280px] overflow-hidden">
                    <div className="currency-switcher-close p-3 border-b border-border flex items-center justify-between bg-background-muted">
                      <span className="text-sm font-semibold text-foreground">Select your currency</span>
                      <button
                        onClick={() => setIsCurrencyOpen(false)}
                        className="text-foreground-muted hover:text-foreground transition-colors"
                        aria-label="Close"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="currency-switcher-disclaimer p-3 text-xs text-foreground-muted border-b border-border bg-background-muted/50">
                      Checkout will be in GBP(£), prices are only equivalent and subject to change due to foreign
                      exchange rates
                    </div>
                    <ul className="max-h-64 overflow-y-auto">
                      {currencies.map((currency) => {
                        const isCurrent = currentCurrency === `${currency.symbol} ${currency.code}`;
                        return (
                          <li
                            key={currency.code}
                            className={`currency-switcher-hook ${isCurrent ? 'current bg-accent/5' : ''} hover:bg-background-muted transition-colors`}
                            data-currency-code={currency.code}
                          >
                            <a
                              href="#"
                              className="flex items-center justify-between px-4 py-2.5 text-sm"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentCurrency(`${currency.symbol} ${currency.code}`);
                                setIsCurrencyOpen(false);
                              }}
                            >
                              <span>
                                <span className="font-medium">{currency.symbol}</span> {currency.label}
                              </span>
                              {isCurrent && <Check className="size-4 text-accent" />}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Center: Brand/Logo - Absolutely Centered */}
            <div className="brand absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <Link field={homeLink} editable={isEditing} className="inline-block">
                {logoSrc ? (
                  <ContentSdkImage
                    field={logoImage}
                    alt="Visit London"
                    className="h-auto max-h-16 w-auto"
                    priority
                  />
                ) : (
                  <>
                    <span className="svg visitlondon-logo icon-visitlondon-logo-red" aria-label="visitlondon.com">
                      visitlondon.com
                    </span>
                    <span className="c tagline vl-logo-subtitle mt-1 block">
                      Official Visitor Guide
                    </span>
                  </>
                )}
              </Link>
            </div>

            {/* Right Section: Search */}
            <div className="flex items-center gap-2 flex-1 justify-end">
              {/* Mobile Search Button */}
              <button
                id="expand-search"
                className="mobonly noprint header-mobile-trigger search-trigger lg:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
              >
                <Search className="svg icon-search-red-outline size-5 text-accent" />
              </button>

              {/* Search Form */}
              <form
                className={`header-search cf ${isSearchOpen ? 'flex' : 'hidden'} lg:flex items-center gap-2`}
                action="/search"
                role="search"
              >
                <label htmlFor="search-keywords" className="nonvis sr-only" id="search-label">
                  Search
                </label>
                <input
                  type="search"
                  id="search-keywords"
                  name="keywords"
                  className="header-search-field px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  aria-labelledby="search-label"
                  placeholder="Search"
                />
                <button
                  title="Search"
                  className="header-search-submit text-accent hover:text-accent-dark transition-colors p-1"
                  type="submit"
                  aria-label="Search"
                >
                  <Search className="svg icon-search-red-outline size-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar with Red Accent Line */}
      <div className="bg-background-muted">
        <div className="container mx-auto px-4">
          <Placeholder name={`header-nav-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
        {/* Red accent bar - signature Visit London element */}
        <div className="vl-accent-bar h-1 bg-accent"></div>
      </div>
    </header>
  );
};
