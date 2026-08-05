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
import { ComponentProps } from '@/lib/component-props';
import { asLink } from '@/lib/field-helpers';
import { HeaderDemoAuth } from '@/components/demo/HeaderDemoAuth';
import clsx from 'clsx';

interface Fields {
  BrandName?: Field<string>;
  Logo?: ImageField;
  ConfigureLink?: LinkField;
  EnquireLink?: LinkField;
  ModelsLink?: LinkField;
  OurWorldLink?: LinkField;
  OwnersLink?: LinkField;
  ExperiencesLink?: LinkField;
}

type HeaderProps = ComponentProps & { fields: Fields };

/** Local white wordmark — CMS DAM logo is often black and invisible on dark chrome. */
const LOGO_WHITE = '/images/aston-martin-logo.svg';

export const Default = (props: HeaderProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;
  const [open, setOpen] = useState(false);
  const id = params?.RenderingIdentifier;
  const brand = fields?.BrandName?.value || 'Aston Martin';

  return (
    <header
      className={clsx(
        'component am-header absolute inset-x-0 top-0 z-50 text-white',
        params?.styles
      )}
      id={id}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 md:px-8">
        <a href="/" className="am-header__logo flex items-center" aria-label={`${brand} home`}>
          {/* Live: always use white SVG so the wingmark reads on transparent header */}
          {!isEditing && (
            // Local white SVG — CMS DAM logo is often black and invisible on dark chrome
            <img
              src={LOGO_WHITE}
              alt={brand}
              className="am-header__logo-img h-7 w-auto max-w-[12rem] object-contain object-left md:h-8 md:max-w-[15rem]"
              width={280}
              height={36}
              decoding="async"
              fetchPriority="high"
            />
          )}
          {/* Pages editor: bind CMS Logo field for authors */}
          {isEditing && (
            <span className="am-header__logo-edit inline-flex min-h-8 min-w-[8rem] items-center">
              <ContentSdkImage field={fields?.Logo} className="am-header__logo-img h-8 w-auto" />
              <span className="sr-only">
                <ContentSdkText field={fields?.BrandName} />
              </span>
            </span>
          )}
        </a>

        <nav className="am-header__nav hidden items-center gap-7 text-xs font-semibold tracking-[0.12em] uppercase lg:flex">
          <ContentSdkLink field={asLink(fields?.ModelsLink)} />
          <ContentSdkLink field={asLink(fields?.OurWorldLink)} />
          <ContentSdkLink field={asLink(fields?.OwnersLink)} />
          <ContentSdkLink field={asLink(fields?.ExperiencesLink)} />
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <HeaderDemoAuth />
          <ContentSdkLink
            field={asLink(fields?.ConfigureLink)}
            className="am-btn am-btn-ghost px-3 py-2 text-[0.7rem]"
          />
          <ContentSdkLink
            field={asLink(fields?.EnquireLink)}
            className="am-btn am-btn-solid px-3 py-2 text-[0.7rem]"
          />
        </div>

        <button
          type="button"
          className="am-btn am-btn-ghost px-3 py-2 text-[0.7rem] lg:hidden"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="am-header__mobile border-t border-white/15 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3 text-sm tracking-[0.12em] uppercase">
            <ContentSdkLink field={asLink(fields?.ModelsLink)} />
            <ContentSdkLink field={asLink(fields?.OurWorldLink)} />
            <ContentSdkLink field={asLink(fields?.OwnersLink)} />
            <ContentSdkLink field={asLink(fields?.ExperiencesLink)} />
            <ContentSdkLink field={asLink(fields?.ConfigureLink)} />
            <ContentSdkLink field={asLink(fields?.EnquireLink)} />
            <HeaderDemoAuth />
          </div>
        </div>
      )}
    </header>
  );
};
