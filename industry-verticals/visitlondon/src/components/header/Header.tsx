import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Placeholder } from '@sitecore-content-sdk/nextjs';

export type HeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

/**
 * Visit London Header
 * Matches visitlondon.com design:
 * - Top bar with language/currency on left, logo center, search right
 * - Navigation bar below with red accent line
 */
export const Default = (props: HeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;

  return (
    <header className={`component header header-visitlondon bg-white ${styles}`} id={id}>
      {/* Top Bar: Language/Currency | Logo | Search */}
      <div className="border-border-light border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Left: Language & Currency */}
            <div className="flex items-center gap-4">
              <Placeholder
                name={`header-top-left-${DynamicPlaceholderId}`}
                rendering={props.rendering}
              />
            </div>

            {/* Center: Logo */}
            <div className="flex flex-1 justify-center">
              <Placeholder
                name={`header-logo-${DynamicPlaceholderId}`}
                rendering={props.rendering}
              />
            </div>

            {/* Right: Search */}
            <div className="flex items-center">
              <Placeholder
                name={`header-top-right-${DynamicPlaceholderId}`}
                rendering={props.rendering}
              />
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
