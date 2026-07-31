'use client';

import { JSX, useState } from 'react';
import {
  Field,
  LinkField,
  Text as ContentSdkText,
  Link as ContentSdkLink,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asLink } from '@/lib/field-helpers';
import clsx from 'clsx';

interface Fields {
  BrandName?: Field<string>;
  ConfigureLink?: LinkField;
  EnquireLink?: LinkField;
  ModelsLink?: LinkField;
  OurWorldLink?: LinkField;
  OwnersLink?: LinkField;
  ExperiencesLink?: LinkField;
}

type HeaderProps = ComponentProps & { fields: Fields };

export const Default = (props: HeaderProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;
  const [open, setOpen] = useState(false);
  const id = params?.RenderingIdentifier;

  return (
    <header
      className={clsx(
        'component am-header absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-black/25 text-white backdrop-blur-sm',
        params?.styles
      )}
      id={id}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <a href="/" className="text-sm font-semibold tracking-[0.22em] uppercase">
          {(fields?.BrandName?.value && <ContentSdkText field={fields.BrandName} />) ||
            (isEditing ? <ContentSdkText field={fields?.BrandName} /> : 'Aston Martin')}
        </a>

        <nav className="hidden items-center gap-6 text-xs font-semibold tracking-wide uppercase lg:flex">
          <ContentSdkLink field={asLink(fields?.ModelsLink)} />
          <ContentSdkLink field={asLink(fields?.OurWorldLink)} />
          <ContentSdkLink field={asLink(fields?.OwnersLink)} />
          <ContentSdkLink field={asLink(fields?.ExperiencesLink)} />
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ContentSdkLink field={asLink(fields?.ConfigureLink)} className="am-btn am-btn-ghost px-3 py-2 text-[0.7rem]" />
          <ContentSdkLink field={asLink(fields?.EnquireLink)} className="am-btn am-btn-solid px-3 py-2 text-[0.7rem]" />
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
          <div className="flex flex-col gap-3 text-sm uppercase tracking-wide">
            <ContentSdkLink field={asLink(fields?.ModelsLink)} />
            <ContentSdkLink field={asLink(fields?.OurWorldLink)} />
            <ContentSdkLink field={asLink(fields?.OwnersLink)} />
            <ContentSdkLink field={asLink(fields?.ExperiencesLink)} />
            <ContentSdkLink field={asLink(fields?.ConfigureLink)} />
            <ContentSdkLink field={asLink(fields?.EnquireLink)} />
          </div>
        </div>
      )}
    </header>
  );
};
