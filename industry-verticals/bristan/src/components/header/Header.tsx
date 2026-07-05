'use client';

import React, { JSX, useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, Search, X } from 'lucide-react';
import { Placeholder, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { AudienceBar } from './AudienceBar';
import { HeritageUtilityBar } from './HeritageUtilityBar';
import { HeaderSearch } from './HeaderSearch';
import { isHeritageSite } from '@/lib/heritage-site';

export type HeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;
  const { page } = useSitecore();
  const heritage = isHeritageSite(page);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div
      className={`component header bristan-header ${heritage ? 'heritage-header' : ''} ${styles}${isMenuOpen ? 'bristan-header--menu-open' : ''}`}
      id={id}
    >
      <div className="bristan-header__utility">
        <div className="bristan-header__utility-inner container">
          {heritage ? (
            <HeritageUtilityBar className="max-lg:hidden" />
          ) : (
            <AudienceBar className="max-lg:hidden" />
          )}
          <div className="bristan-header__tools">
            <Placeholder
              name={`header-right-${DynamicPlaceholderId}`}
              rendering={props.rendering}
            />
          </div>
        </div>
      </div>

      <div className="bristan-header__brand">
        <div className="bristan-header__brand-inner container">
          <div className="bristan-header__logo">
            <Placeholder name={`header-left-${DynamicPlaceholderId}`} rendering={props.rendering} />
          </div>

          <div className="bristan-header__search">
            <HeaderSearch />
          </div>

          <div className="bristan-header__mobile-actions">
            <Link href="/search" className="bristan-header__icon-btn" aria-label="Search">
              <Search className="size-5" />
            </Link>
            <button
              type="button"
              className="bristan-header__icon-btn"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className="bristan-header__nav-wrap">
        <div className="bristan-header__mobile-panel">
          {heritage ? (
            <HeritageUtilityBar className="lg:hidden" onNavigate={closeMenu} />
          ) : (
            <AudienceBar className="lg:hidden" onNavigate={closeMenu} />
          )}
          <div className="bristan-header__nav-inner container">
            <Placeholder name={`header-nav-${DynamicPlaceholderId}`} rendering={props.rendering} />
            <div className="bristan-header__cta">
              <Link
                href={heritage ? '/showrooms' : '/find-a-retailer'}
                className="bristan-header__cta-link bristan-header__cta-link--stockist"
                onClick={closeMenu}
              >
                {heritage ? 'Find a Showroom' : 'Find a Stockist'}
              </Link>
              <Link
                href={heritage ? '/contact-us' : '/homeowners-home'}
                className="bristan-header__cta-link bristan-header__cta-link--contact"
                onClick={closeMenu}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
