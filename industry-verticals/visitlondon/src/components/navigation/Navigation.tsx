'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Link, TextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { ChevronDown, Home } from 'lucide-react';
import { useClickAway } from '@/hooks/useClickAway';
import { getLinkField, prepareFields } from '@/helpers/navHelpers';
import clsx from 'clsx';

export interface NavItemFields {
  Id: string;
  DisplayName: string;
  Title: TextField;
  NavigationTitle: TextField;
  Href: string;
  Querystring: string;
  Children?: Array<NavItemFields>;
  Styles: string[];
}

export interface NavigationProps extends ComponentProps {
  fields: Record<string, NavItemFields>;
}

/**
 * Visit London Navigation
 * Matches visitlondon.com navigation structure with megamenu dropdowns
 */
export const Default = ({ params, fields }: NavigationProps) => {
  const { RenderingIdentifier: id } = params;

  if (!Object.values(fields).some((v) => !!v)) {
    return (
      <div className={`component navigation navigation-visitlondon ${params.styles}`} id={id}>
        <div className="component-content">[Navigation]</div>
      </div>
    );
  }

  const preparedFields = prepareFields(fields, true);
  const navigationItems = Object.values(preparedFields)
    .filter((item): item is NavItemFields => !!item)
    .map((item) => {
      const hasChildren = !!item.Children?.length;
      const navTitle = String(
        item.NavigationTitle?.value || item.Title?.value || item.DisplayName || ''
      );
      const linkField = getLinkField(item);

      return (
        <NavItemWithMegamenu
          key={item.Id}
          fields={item}
          hasChildren={hasChildren}
          navTitle={navTitle}
          linkField={linkField}
        />
      );
    });

  return (
    <div className={`component navigation navigation-visitlondon ${params.styles}`} id={id}>
      <div className="nav-menu-container">
        <nav id="menu" className="main-nav-new">
          <div className="ww cf megamenu-nav">
            <ul className="main-navigation-links">
              {/* Hardcoded Home Link */}
              <li className="home-tab main-navigation-tab selected">
                <a href="/" className="tl-nav main-navigation-link">
                  <i className="svg icon-home-22">
                    <Home className="size-4 inline-block mr-1" />
                    <span>Home</span>
                  </i>
                </a>
              </li>

              {/* Navigation Items from Sitecore */}
              {navigationItems}
            </ul>
          </div>
          <div className="nav-extra">
            <ul></ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

interface NavItemWithMegamenuProps {
  fields: NavItemFields;
  hasChildren: boolean;
  navTitle: string;
  linkField: ReturnType<typeof getLinkField>;
}

const NavItemWithMegamenu: React.FC<NavItemWithMegamenuProps> = ({
  fields,
  hasChildren,
  navTitle,
  linkField,
}) => {
  const { page } = useSitecore();
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useClickAway(dropdownRef, () => setIsHovered(false));

  // Ensure consistent rendering between server and client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const children = hasChildren ? fields.Children || [] : [];
  
  // Only enable editing mode after hydration to prevent mismatch
  const isEditing = isMounted && page.mode.isEditing;

  return (
    <li
      ref={dropdownRef}
      className={clsx('-tab main-navigation-tab', isHovered && 'hover')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        field={linkField}
        editable={isEditing}
        className="main-navigation-link"
      >
        <span>{navTitle}</span>
        {hasChildren && (
          <i className="svg icon icon-vl-dropdown">
            <ChevronDown className="size-3 inline-block ml-1" />
          </i>
        )}
      </Link>

      {hasChildren && isHovered && (
        <div className="megamenu sub cols4">
          <a href="#content" className="skip-link sr-only">Skip to content</a>
          <div className="ww cf">
            {/* Sidebar with intro */}
            <div className="column megamenu-sidebar sidebar first">
              <div className="megamenu-intro">
                <div className="megamenu-intro-title">{navTitle}</div>
                <div className="megamenu-intro-text">
                  {fields.Title?.value || `Explore ${navTitle} in London`}
                </div>
              </div>
            </div>

            {/* Links */}
            <ul>
              {children.map((child) => {
                const childTitle = String(
                  child.NavigationTitle?.value || child.Title?.value || child.DisplayName || ''
                );
                const childLink = getLinkField(child);
                const isHighlight = child.Styles?.includes('highlight');

                return (
                  <li key={child.Id}>
                    <Link
                      field={childLink}
                      editable={isEditing}
                      className={clsx('', isHighlight && 'highlight')}
                    >
                      {childTitle}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};
