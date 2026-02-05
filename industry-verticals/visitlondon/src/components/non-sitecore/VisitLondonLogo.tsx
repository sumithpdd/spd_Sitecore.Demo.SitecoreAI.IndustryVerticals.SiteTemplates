import React from 'react';
import { Link, useSitecore } from '@sitecore-content-sdk/nextjs';
import { LinkField } from '@sitecore-content-sdk/nextjs';

interface VisitLondonLogoProps {
  homeLink?: LinkField;
}

/**
 * Visit London Logo Component
 * Displays "VISIT LONDON" in red bold uppercase with "OFFICIAL VISITOR GUIDE" subtitle
 */
export const VisitLondonLogo = ({ homeLink }: VisitLondonLogoProps) => {
  const { page } = useSitecore();

  const logoContent = (
    <div className="flex flex-col items-center">
      <div className="vl-logo">VISIT LONDON</div>
      <div className="vl-logo-subtitle mt-1">OFFICIAL VISITOR GUIDE</div>
    </div>
  );

  if (homeLink) {
    return (
      <Link field={homeLink} editable={page.mode.isEditing} className="inline-block">
        {logoContent}
      </Link>
    );
  }

  return <div>{logoContent}</div>;
};
