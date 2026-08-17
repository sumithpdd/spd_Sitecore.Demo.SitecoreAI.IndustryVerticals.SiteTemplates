'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Link as ContentSdkLink,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import clsx from 'clsx';
import { ComponentProps } from 'lib/component-props';
import { CmsImage } from 'lib/CmsImage';
import { linkOrFallback } from 'lib/field-helpers';

interface Fields {
  Logo?: ImageField;
  ClearingLink?: LinkField;
  StudyLifeLink?: LinkField;
  ResearchLink?: LinkField;
  AboutLink?: LinkField;
  ContactLink?: LinkField;
  HotlineText?: Field<string>;
  HotlinePhone?: Field<string>;
  HotlineLink?: LinkField;
}

type NavigationProps = ComponentProps & { fields: Fields };

export const Default = (props: NavigationProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;
  const id = params?.RenderingIdentifier;

  const links = [
    linkOrFallback(fields?.ClearingLink, 'Clearing', '/clearing', isEditing),
    linkOrFallback(fields?.StudyLifeLink, 'Study and life', '/study-and-life', isEditing),
    linkOrFallback(fields?.ResearchLink, 'Research', '/search?q=research', isEditing),
    linkOrFallback(fields?.AboutLink, 'About us', '/search?q=about', isEditing),
    linkOrFallback(fields?.ContactLink, 'Contact us', '/clearing', isEditing),
  ];

  const hotline = linkOrFallback(fields?.HotlineLink, 'Clearing', '/clearing', isEditing);
  const hotlineText = fields?.HotlineText?.value || 'Call to apply through Clearing';
  const hotlinePhone = fields?.HotlinePhone?.value || '+44 (0) 118 402 0900';

  return (
    <div className={clsx('component navigation', params?.styles)} id={id}>
      <nav
        className="border-b border-[#ddd9db] bg-white text-sm font-semibold"
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto px-4 py-3 md:px-8">
          <CmsImage
            field={fields?.Logo}
            alt="Navigation logo"
            className="nav-logo shrink-0"
            imgClassName="nav-logo__img"
            width={160}
            height={36}
          />
          <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-x-6">
            {links.map((link, index) => (
              <ContentSdkLink
                key={link.value?.href || index}
                field={link}
                className="shrink-0 whitespace-nowrap hover:text-[var(--reading-red)]"
              />
            ))}
          </div>
        </div>
      </nav>
      <div className="bg-[var(--reading-red)] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 text-sm md:px-8">
          <p className="min-w-0">
            {hotlineText}{' '}
            <a href={`tel:${hotlinePhone.replace(/[^\d+]/g, '')}`} className="font-bold underline">
              {hotlinePhone}
            </a>
          </p>
          <ContentSdkLink field={hotline} className="shrink-0 font-bold underline" />
        </div>
      </div>
    </div>
  );
};
