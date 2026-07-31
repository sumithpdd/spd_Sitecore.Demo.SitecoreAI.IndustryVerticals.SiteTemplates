import { JSX } from 'react';
import {
  Field,
  LinkField,
  Text as ContentSdkText,
  Link as ContentSdkLink,
  RichText as ContentSdkRichText,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asLink } from '@/lib/field-helpers';
import clsx from 'clsx';

interface Fields {
  BrandName?: Field<string>;
  Disclaimer?: Field<string>;
  Copyright?: Field<string>;
  ModelsLink?: LinkField;
  OurWorldLink?: LinkField;
  OwnersLink?: LinkField;
  CorporateLink?: LinkField;
  DealersLink?: LinkField;
  ContactLink?: LinkField;
  TermsLink?: LinkField;
  PrivacyLink?: LinkField;
  CookiesLink?: LinkField;
}

type FooterProps = ComponentProps & { fields: Fields };

export const Default = (props: FooterProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;
  const id = params?.RenderingIdentifier;

  return (
    <footer className={clsx('component am-footer border-t border-neutral-200 bg-white', params?.styles)} id={id}>
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <p className="text-center text-sm font-semibold tracking-[0.28em] uppercase">
          {(fields?.BrandName?.value && <ContentSdkText field={fields.BrandName} />) ||
            (isEditing ? <ContentSdkText field={fields?.BrandName} /> : 'Aston Martin')}
        </p>

        <div className="mt-10 grid gap-8 text-sm md:grid-cols-3">
          <div className="space-y-2">
            <p className="font-semibold tracking-wide uppercase text-neutral-500">Navigation</p>
            <ContentSdkLink field={asLink(fields?.ModelsLink)} className="block hover:underline" />
            <ContentSdkLink field={asLink(fields?.OurWorldLink)} className="block hover:underline" />
            <ContentSdkLink field={asLink(fields?.OwnersLink)} className="block hover:underline" />
          </div>
          <div className="space-y-2">
            <p className="font-semibold tracking-wide uppercase text-neutral-500">Contact</p>
            <ContentSdkLink field={asLink(fields?.DealersLink)} className="block hover:underline" />
            <ContentSdkLink field={asLink(fields?.ContactLink)} className="block hover:underline" />
          </div>
          <div className="space-y-2">
            <p className="font-semibold tracking-wide uppercase text-neutral-500">Corporate</p>
            <ContentSdkLink field={asLink(fields?.CorporateLink)} className="block hover:underline" />
          </div>
        </div>

        {(fields?.Disclaimer?.value || isEditing) && (
          <div className="mt-10 max-w-4xl text-xs leading-relaxed text-neutral-500">
            <ContentSdkRichText field={fields?.Disclaimer} />
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
          <ContentSdkText field={fields?.Copyright} />
          <div className="flex flex-wrap gap-4">
            <ContentSdkLink field={asLink(fields?.TermsLink)} className="hover:underline" />
            <ContentSdkLink field={asLink(fields?.PrivacyLink)} className="hover:underline" />
            <ContentSdkLink field={asLink(fields?.CookiesLink)} className="hover:underline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
