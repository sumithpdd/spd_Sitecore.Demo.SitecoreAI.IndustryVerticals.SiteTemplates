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
import { useEditingMode } from '@/hooks/useEditingMode';

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
  const isEditing = useEditingMode();
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
          editable={isEditing}
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

export const Default = ({ params, fields }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { page } = useSitecore();
  const isEditing = useEditingMode();
  const { styles, RenderingIdentifier: id, Logo: logoImage, SimpleLayout: simpleLayout } = params;

  useStopResponsiveTransition();

  if (!Object.values(fields).some((v) => !!v)) {
    return (
      <div className={`component navigation ${styles}`} id={id}>
        <div className="component-content">[Navigation]</div>
      </div>
    );
  }

  const handleToggleMenu = (event?: React.MouseEvent<HTMLElement>, forceState?: boolean) => {
    if (event && page.mode.isEditing) {
      event.preventDefault();
    }
    setIsMenuOpen(forceState ?? !isMenuOpen);
  };

  const isSimpleLayout = isParamEnabled(simpleLayout);
  const preparedFields = prepareFields(fields, !isSimpleLayout);
  const rootItem = Object.values(preparedFields).find((item) => isNavRootItem(item));
  const logoSrc = extractMediaUrl(logoImage);
  const hasLogoRootItem = rootItem && logoSrc;

  const navigationItems = Object.values(preparedFields)
    .filter((item): item is NavItemFields => !!item)
    .map((item) => (
      <NavigationListItem
        key={item.Id}
        fields={item}
        handleClick={(event) => handleToggleMenu(event, false)}
        logoSrc={logoSrc}
        isSimpleLayout={!!isSimpleLayout}
      />
    ));

  return (
    <div className={`component navigation bg-background ${styles}`} id={id}>
      <div
        className={clsx(
          'relative z-150 container flex items-center py-4 lg:hidden',
          !isSimpleLayout &&
            '[.component.header_&]:grid-cols-2 [.component.header_&]:px-0 [.component.header_&]:max-lg:grid',
          !isSimpleLayout ? 'flex-row-reverse' : '',
          isSimpleLayout && !hasLogoRootItem ? 'justify-end' : 'justify-between'
        )}
      >
        {hasLogoRootItem && (
          <Link
            field={getLinkField(rootItem!)}
            editable={isEditing}
            className={clsx(
              'navigation-mobile-trigger',
              !isSimpleLayout && '[.component.header_&]:mx-auto'
            )}
          >
            {getLinkContent(rootItem!, logoSrc)}
          </Link>
        )}
        <HamburgerIcon
          isOpen={isMenuOpen}
          onClick={handleToggleMenu}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggleMenu();
            }
          }}
          className={clsx(
            'navigation-mobile-trigger',
            !isSimpleLayout && '[.component.header_&]:-order-1'
          )}
        />
      </div>

      <nav
        className={clsx(
          'bg-background z-100 flex duration-300',
          'max-lg:fixed max-lg:inset-0',
          !isMenuOpen && 'max-lg:-translate-y-full max-lg:opacity-0'
        )}
      >
        <ul
          role="menubar"
          className={clsx(
            'container flex flex-col items-center justify-center gap-x-8 gap-y-4 py-6 text-lg lg:flex-row xl:gap-x-16',
            isSimpleLayout && !hasLogoRootItem && 'lg:justify-end'
          )}
        >
          {navigationItems}
        </ul>
      </nav>
    </div>
  );
};

const BristanNavItem = ({
  fields,
  isOpen,
  onOpen,
  onClose,
}: {
  fields: NavItemFields;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const isEditing = useEditingMode();
  const hasChildren = !!fields.Children?.length;
  const itemRef = useRef<HTMLLIElement>(null);
  useClickAway(itemRef, onClose);

  const toggleSubmenu = (event: React.MouseEvent<HTMLElement>) => {
    if (!hasChildren) {
      return;
    }
    event.preventDefault();
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <li
      ref={itemRef}
      className={clsx('bristan-main-nav__item', isOpen && 'is-open')}
      role="none"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <div className="flex items-center">
        <Link
          field={getLinkField(fields)}
          editable={isEditing}
          className="bristan-main-nav__trigger"
          onClick={hasChildren ? toggleSubmenu : undefined}
        >
          {getLinkContent(fields)}
        </Link>
        {hasChildren && (
          <button
            type="button"
            className="bristan-main-nav__trigger px-2 lg:hidden"
            aria-expanded={isOpen}
            aria-label="Toggle submenu"
            onClick={toggleSubmenu}
          >
            <ChevronDown className="bristan-main-nav__chevron" />
          </button>
        )}
        {hasChildren && (
          <ChevronDown className="bristan-main-nav__chevron mr-2 hidden lg:inline" aria-hidden />
        )}
      </div>

      {hasChildren && (
        <div className="bristan-mega">
          <div className="bristan-mega__inner">
            <div className="bristan-mega__columns">
              {fields.Children!.map((column) => {
                const columnLinks = column.Children?.length ? column.Children : [column];
                const showColumnHeader = !!column.Children?.length;

                return (
                  <div key={column.Id} className="bristan-mega__col">
                    {showColumnHeader && (
                      <div className="bristan-mega__col-title">
                        <Link field={getLinkField(column)} editable={isEditing}>
                          {getLinkContent(column)}
                        </Link>
                      </div>
                    )}
                    <ul className="bristan-mega__links">
                      {columnLinks.map((link) => (
                        <li key={link.Id}>
                          <Link field={getLinkField(link)} editable={isEditing}>
                            {getLinkContent(link)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

/** Bristan.com mega-menu navigation for header main nav row */
export const BristanMegaMenu = ({ params, fields }: NavigationProps) => {
  const { styles, RenderingIdentifier: id } = params;
  const [openId, setOpenId] = useState<string | null>(null);

  if (!Object.values(fields).some((v) => !!v)) {
    return (
      <div className={`component navigation navigation--bristan ${styles}`} id={id}>
        <div className="component-content">[Navigation]</div>
      </div>
    );
  }

  const rootItem = Object.values(fields).find(
    (item): item is NavItemFields => !!item && isNavRootItem(item)
  );
  const topLevelItems = (
    rootItem?.Children?.filter(Boolean) ??
    Object.values(fields).filter((item): item is NavItemFields => !!item && !isNavRootItem(item))
  ).filter((item) => {
    const href = item.Href?.toLowerCase() ?? '';
    return !['/homeowners-home', '/installers-home', '/merchants-home', '/specifiers-home'].some(
      (audiencePath) => href === audiencePath || href.endsWith(audiencePath)
    );
  });

  return (
    <div className={`component navigation navigation--bristan ${styles}`} id={id}>
      <nav className="bristan-main-nav" aria-label="Main">
        <ul className="bristan-main-nav__list" role="menubar">
          {topLevelItems.map((item) => (
            <BristanNavItem
              key={item.Id}
              fields={item}
              isOpen={openId === item.Id}
              onOpen={() => setOpenId(item.Id)}
              onClose={() => setOpenId(null)}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};
