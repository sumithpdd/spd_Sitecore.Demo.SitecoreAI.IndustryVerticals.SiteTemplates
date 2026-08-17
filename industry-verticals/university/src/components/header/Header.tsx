'use client';

import { JSX, useState } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text as ContentSdkText,
  Link as ContentSdkLink,
  Image as ContentSdkImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { ComponentProps } from 'lib/component-props';
import { demoImages, withDemoImage } from 'lib/demo-images';
import { asText, hasText, linkOrFallback } from 'lib/field-helpers';
import { HeaderSearch } from './HeaderSearch';

interface Fields {
  Logo?: ImageField;
  BrandName?: Field<string>;
  SearchPlaceholder?: Field<string>;
  ApplyLink?: LinkField;
  AudienceApplicants?: LinkField;
  AudienceStudents?: LinkField;
  AudienceStaff?: LinkField;
  AudienceAlumni?: LinkField;
}

type HeaderProps = ComponentProps & { fields: Fields };

export const Default = (props: HeaderProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;
  const [open, setOpen] = useState(false);
  const id = params?.RenderingIdentifier;
  const brand = fields?.BrandName?.value || 'University';
  const logo = withDemoImage(fields?.Logo, demoImages.logo, brand);
  const placeholder = fields?.SearchPlaceholder?.value || 'Search';

  const audiences = [
    linkOrFallback(fields?.AudienceApplicants, 'Applicants', '/clearing', isEditing),
    linkOrFallback(fields?.AudienceStudents, 'Students', '/study-and-life', isEditing),
    linkOrFallback(fields?.AudienceStaff, 'Staff', '/search', isEditing),
    linkOrFallback(fields?.AudienceAlumni, 'Alumni', '/?utm_campaign=centenary-2026', isEditing),
  ];

  const apply = linkOrFallback(fields?.ApplyLink, 'Apply', '/clearing', isEditing);

  return (
    <header
      className={clsx(
        'component header sticky top-0 z-50 border-b border-[#ddd9db] bg-white text-[var(--reading-ink)]',
        params?.styles
      )}
      id={id}
    >
      <div className="hidden border-b border-[#ddd9db] bg-[var(--reading-surface)] text-xs font-semibold md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-5 px-4 py-2 md:px-8">
          {audiences.map((link, index) => (
            <ContentSdkLink
              key={link.value?.href || index}
              field={link}
              className="hover:text-[var(--reading-red)]"
            />
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <a href="/" className="flex shrink-0 items-center" aria-label={`${brand} home`}>
          {!isEditing && (
            <img
              src={typeof logo.value?.src === 'string' ? logo.value.src : demoImages.logo}
              alt={brand}
              className="h-10 w-auto max-w-[11rem] object-contain object-left md:h-12 md:max-w-[14rem]"
              width={220}
              height={48}
              decoding="async"
            />
          )}
          {isEditing && (
            <span className="inline-flex min-h-10 min-w-[8rem] items-center">
              <ContentSdkImage field={fields?.Logo} className="h-10 w-auto" />
              {(hasText(fields?.BrandName) || isEditing) && (
                <span className="sr-only">
                  <ContentSdkText field={asText(fields?.BrandName)} />
                </span>
              )}
            </span>
          )}
        </a>

        <div className="hidden flex-1 justify-end lg:flex">
          <HeaderSearch placeholder={placeholder} />
        </div>

        <div className="flex items-center gap-2">
          <ContentSdkLink field={apply} className="reading-btn reading-btn-primary" />
          <button
            type="button"
            className="reading-btn reading-btn-ghost px-2 py-2 lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={clsx(
          'border-t border-[#ddd9db] bg-white px-4 py-4 lg:hidden',
          open ? 'block' : 'hidden'
        )}
      >
        <HeaderSearch placeholder={placeholder} />
        <nav className="mt-4 flex flex-col gap-2 text-sm font-semibold" aria-label="Audience">
          {audiences.map((link, index) => (
            <ContentSdkLink
              key={link.value?.href || index}
              field={link}
              className="py-1 hover:text-[var(--reading-red)]"
            />
          ))}
        </nav>
      </div>
    </header>
  );
};
