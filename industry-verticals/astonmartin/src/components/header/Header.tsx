'use client';

import { JSX, useState } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text as ContentSdkText,
  Link as ContentSdkLink,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asLink } from '@/lib/field-helpers';
import { withDemoImage } from '@/lib/demo-images';
import { ResolvedImage } from '@/lib/ResolvedImage';
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

const LOGO_FALLBACK = '/images/aston-martin-logo.svg';

export const Default = (props: HeaderProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;
  const [open, setOpen] = useState(false);
  const id = params?.RenderingIdentifier;
  const logo = withDemoImage(
    fields?.Logo,
    LOGO_FALLBACK,
    fields?.BrandName?.value || 'Aston Martin'
  );

  return (
    <header
      className={clsx(
        'component am-header absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-black/90 text-white backdrop-blur-sm',
        params?.styles
      )}
      id={id}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <a href="/" className="flex items-center text-white" aria-label="Aston Martin home">
          <ResolvedImage
            field={logo}
            className="h-7 w-auto max-w-[11rem] object-contain object-left md:h-8 md:max-w-[14rem]"
          />
          {isEditing && (
            <span className="sr-only">
              <ContentSdkText field={fields?.BrandName} />
            </span>
          )}
        </a>

        <nav className="hidden items-center gap-6 text-xs font-semibold tracking-wide uppercase lg:flex">
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
        <div className="border-t border-white/10 bg-black/90 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3 text-sm tracking-wide uppercase">
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
