'use client';

import React, { useState, useRef } from 'react';
import { Link, TextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { ChevronDown } from 'lucide-react';
import HamburgerIcon from '@/components/non-sitecore/HamburgerIcon';
import { useClickAway } from '@/hooks/useClickAway';
import { useStopResponsiveTransition } from '@/hooks/useStopResponsiveTransition';
import { extractMediaUrl } from '@/helpers/extractMediaUrl';
import {
  getLinkContent,
  getLinkField,
  isNavLevel,
  isNavRootItem,
  prepareFields,
} from '@/helpers/navHelpers';
import clsx from 'clsx';
import { isParamEnabled } from '@/helpers/isParamEnabled';

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

interface NavigationListItemProps {
  fields: NavItemFields;
  handleClick: (event?: React.MouseEvent<HTMLElement>) => void;
  logoSrc?: string;
  isSimpleLayout?: boolean;
}

export interface NavigationProps extends ComponentProps {
  fields: Record<string, NavItemFields>;
}

const NavigationListItem: React.FC<NavigationListItemProps> = ({
  fields,
  handleClick,
  logoSrc,
  isSimpleLayout,
}) => {
  const { page } = useSitecore();
  const [isActive, setIsActive] = useState(false);

  const dropdownRef = useRef<HTMLLIElement>(null);
  useClickAway(dropdownRef, () => setIsActive(false));

  const isRootItem = isNavRootItem(fields);
  const isTopLevelPage = isNavLevel(fields, 1);

  const hasChildren = !!fields.Children?.length;
  const isLogoRootItem = isRootItem && logoSrc;
  const hasDropdownMenu = hasChildren && isTopLevelPage;

  const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    handleClick(event);
    setIsActive(false);
  };

  const children = hasChildren
    ? fields.Children!.map((child) => (
        <NavigationListItem
          key={child.Id}
          fields={child}
          handleClick={clickHandler}
          isSimpleLayout={isSimpleLayout}
          logoSrc={logoSrc}
        />
      ))
    : null;

  return (
    <li
      ref={dropdownRef}
      tabIndex={0}
      role="menuitem"
      className={clsx(
        fields?.Styles?.join(' '),
        'relative flex flex-col gap-x-8 gap-y-4 xl:gap-x-14',
        isRootItem && 'lg:flex-row',
        isLogoRootItem && 'shrink-0 max-lg:hidden',
        isLogoRootItem && isSimpleLayout && 'lg:mr-auto'
      )}
    >
      <div className="flex items-center justify-center gap-1">
        <Link
          field={getLinkField(fields)}
          editable={page.mode.isEditing}
          onClick={clickHandler}
          className="hover:text-foreground-light whitespace-nowrap transition-colors"
        >
          {getLinkContent(fields, logoSrc)}
        </Link>
        {hasDropdownMenu && (
          <button
            type="button"
            aria-label="Toggle submenu"
            aria-haspopup="true"
            aria-expanded={isActive}
            className="flex h-6 w-6 cursor-pointer items-center justify-center"
            onClick={() => setIsActive((a) => !a)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsActive((a) => !a);
              }
            }}
          >
            <ChevronDown
              className={clsx(
                'size-4 transition-transform duration-300',
                isActive && 'rotate-180',
                'navigation-dropdown-trigger'
              )}
            />
          </button>
        )}
      </div>
      {hasChildren && (
        <ul
          role="menu"
          className={clsx(
            'flex flex-col items-center gap-x-8 gap-y-4 xl:gap-x-14',
            isRootItem && 'lg:flex-row',
            hasDropdownMenu &&
              clsx(
                'z-110 text-base max-lg:border-b max-lg:pb-4 max-lg:text-sm',
                'lg:absolute lg:top-full lg:left-1/2 lg:-translate-x-1/2 lg:p-6 lg:transition-all lg:duration-300',
                'lg:bg-background lg:rounded-xl lg:shadow-md',
                isActive
                  ? 'max-lg:flex'
                  : 'max-lg:hidden lg:pointer-events-none lg:translate-y-2 lg:scale-95 lg:opacity-0'
              )
          )}
        >
          {children}
        </ul>
      )}
    </li>
  );
};

/**
 * Visit London Navigation
 * Horizontal navigation bar with links, matching visitlondon.com style
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
      return (
        <li key={item.Id} className="group relative">
          <Link field={getLinkField(item)} className="vl-nav-link flex items-center gap-1">
            {getLinkContent(item)}
            {hasChildren && <ChevronDown className="size-3" />}
          </Link>
        </li>
      );
    });

  return (
    <nav className={`component navigation navigation-visitlondon ${params.styles}`} id={id}>
      <ul className="flex items-center gap-6 py-4 text-sm font-medium">{navigationItems}</ul>
    </nav>
  );
};
