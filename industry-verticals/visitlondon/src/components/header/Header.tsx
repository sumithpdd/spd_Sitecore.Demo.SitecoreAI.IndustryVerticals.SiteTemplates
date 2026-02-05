import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Placeholder } from '@sitecore-content-sdk/nextjs';

export type HeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;

  return (
    <div className={`component header bg-background ${styles}`} id={id}>
      <div className="container flex items-center gap-3 lg:gap-5">
        <div className="max-lg:order-1 lg:flex-[1_1]">
          <Placeholder name={`header-left-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
        <div className="max-lg:order-0 max-lg:mr-auto max-lg:w-2/3 lg:flex-[4_1]">
          <Placeholder name={`header-nav-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
        <div className="max-lg:order-2 lg:flex-[1_1]">
          <Placeholder name={`header-right-${DynamicPlaceholderId}`} rendering={props.rendering} />
        </div>
      </div>
    </div>
  );
};

/**
 * Visit London Header Variant
 * Matches visitlondon.com design:
 * - Top bar with language/currency on left, logo center, search right
 * - Navigation bar below with red accent line
 */
export const VisitLondon = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;

  return (
    <header className={`component header header-visitlondon bg-white ${styles}`} id={id}>
      {/* Top Bar: Language/Currency | Logo | Search */}
      <div className="border-b border-border-light">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Left: Language & Currency */}
            <div className="flex items-center gap-4">
              <Placeholder name={`header-top-left-${DynamicPlaceholderId}`} rendering={props.rendering} />
            </div>

            {/* Center: Logo */}
            <div className="flex-1 flex justify-center">
              <Placeholder name={`header-logo-${DynamicPlaceholderId}`} rendering={props.rendering} />
            </div>

            {/* Right: Search */}
            <div className="flex items-center">
              <Placeholder name={`header-top-right-${DynamicPlaceholderId}`} rendering={props.rendering} />
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
        <div className="vl-accent-bar"></div>
      </div>
    </header>
  );
};