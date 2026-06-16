'use client';

import type { JSX } from 'react';
import { LinkField, useSitecore, Link as ContentSdkLink } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { findBrandPageByPath } from '@/lib/lyvera-brand-pages';
import { hasLinkValue, linkHref, linkLabel } from '@/lib/lyvera-field-utils';
import { getPublicItemPath } from '@/lib/lyvera-sites';

export interface LyveraPageSectionNavFields {
  LinkOne?: LinkField;
  LinkTwo?: LinkField;
  LinkThree?: LinkField;
  LinkFour?: LinkField;
  CtaLink?: LinkField;
}

export type LyveraPageSectionNavProps = ComponentProps & {
  fields?: LyveraPageSectionNavFields;
};

type NavItem = {
  link?: LinkField;
  href: string;
  label: string;
  important?: boolean;
};

function NavItemLink({ item }: { item: NavItem }): JSX.Element {
  const className = [
    'lyvera-page-section-nav__item',
    item.important ? 'lyvera-page-section-nav__item--important' : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (item.link && hasLinkValue(item.link)) {
    return (
      <ContentSdkLink field={item.link} className={className} aria-label={item.label}>
        <span>{item.label}</span>
      </ContentSdkLink>
    );
  }

  return (
    <a
      href={item.href}
      className={className}
      aria-label={item.label}
      {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span>{item.label}</span>
    </a>
  );
}

/** Sticky in-page section navigation with optional highlighted external CTA */
export const Default = (props: LyveraPageSectionNavProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields ?? {};
  const brand = findBrandPageByPath(getPublicItemPath(page));

  const navLinks = [
    fields.LinkOne,
    fields.LinkTwo,
    fields.LinkThree,
    fields.LinkFour,
    fields.CtaLink,
  ];

  const cmsItems: NavItem[] = navLinks.flatMap((link, index) => {
    if (!link && !isEditing) return [];
    const label = linkLabel(link, '');
    const href = linkHref(link, '#');
    if (!label && !isEditing) return [];
    return [
      {
        link,
        label: label || `Link ${index + 1}`,
        href,
        important: index === navLinks.length - 1,
      },
    ];
  });

  const fallbackItems: NavItem[] =
    brand?.anchors.map((anchor, index, list) => ({
      href: anchor.href,
      label: anchor.label,
      important: index === list.length - 1 && anchor.href.startsWith('http'),
    })) ?? [];

  const items = cmsItems.length > 0 || isEditing ? cmsItems : fallbackItems;

  if (items.length === 0 && !isEditing) {
    return <></>;
  }

  return (
    <nav className="component lyvera-page-section-nav" id={id} aria-label="Page sections">
      <ul className="lyvera-page-section-nav__list" role="list">
        {items.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <NavItemLink item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
