'use client';

import { type JSX, useState } from 'react';
import {
  LinkField,
  ImageField,
  Image as JssImage,
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import { Menu, X, User, ShoppingCart, Search } from 'lucide-react';
import Link from 'next/link';

type Fields = {
  Logo: ImageField;
  LogoLink: LinkField;
};

type HeaderProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
};

export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`component header w-full ${styles || ''}`} id={id}>
      <div className="bg-[#071956]">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between md:h-16">
            {/* Logo - hardcoded */}
            <Link href="/" className="shrink-0">
              <JssImage
                field={props.fields.Logo}
                width={120}
                height={40}
                className="h-8 w-auto md:h-10"
                priority
              />
            </Link>

            {/* Right side: utility icons + mobile menu button - hardcoded */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* User icon */}
              <Link
                href="/account"
                className="text-white transition-colors hover:text-white/80"
                aria-label="My account"
              >
                <User className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
              </Link>

              {/* Cart icon with badge */}
              <Link
                href="/cart"
                className="relative text-white transition-colors hover:text-white/80"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
              </Link>

              {/* Search icon */}
              <button
                className="text-white transition-colors hover:text-white/80"
                aria-label="Search"
              >
                <Search className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.5} />
              </button>

              {/* Mobile menu toggle button */}
              <button
                className="ml-1 p-1 text-white transition-colors hover:text-white/80 lg:hidden"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" strokeWidth={1.5} />
                ) : (
                  <Menu className="h-6 w-6" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop navigation bar - white background with placeholder */}
      <nav className="hidden border-b border-gray-200 bg-white lg:block">
        <div className="container mx-auto px-4">
          <div className="py-3">
            <Placeholder name={`header-nav-${DynamicPlaceholderId}`} rendering={props.rendering} />
          </div>
        </div>
      </nav>

      {/* Mobile navigation overlay with placeholder */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-14 z-50 overflow-y-auto bg-white md:top-16 lg:hidden">
          <nav className="container mx-auto px-4 py-4">
            <Placeholder name={`header-nav-${DynamicPlaceholderId}`} rendering={props.rendering} />
          </nav>
        </div>
      )}
    </header>
  );
};
