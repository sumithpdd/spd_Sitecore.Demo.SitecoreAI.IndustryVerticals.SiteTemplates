'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  Link as ContentSdkLink,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import clsx from 'clsx';
import { ComponentProps } from 'lib/component-props';
import { demoImages } from 'lib/demo-images';
import { CmsImage } from 'lib/CmsImage';
import { asText, hasText, linkOrFallback } from 'lib/field-helpers';

interface Fields {
  Logo?: ImageField;
  Title?: Field<string>;
  Address?: Field<string>;
  Phone?: Field<string>;
  Copyright?: Field<string>;
  ExploreTitle?: Field<string>;
  LinkOne?: LinkField;
  LinkTwo?: LinkField;
  LinkThree?: LinkField;
  LinkFour?: LinkField;
  HotlineTitle?: Field<string>;
  HotlineDescription?: Field<string>;
  HotlineLink?: LinkField;
}

type FooterProps = ComponentProps & { fields: Fields };

export const Default = (props: FooterProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;
  const id = params?.RenderingIdentifier;

  const links = [
    linkOrFallback(fields?.LinkOne, 'Clearing', '/clearing', isEditing),
    linkOrFallback(fields?.LinkTwo, 'How to apply', '/clearing/how-to-apply', isEditing),
    linkOrFallback(fields?.LinkThree, 'Courses', '/courses/business-and-management', isEditing),
    linkOrFallback(fields?.LinkFour, 'Accommodation', '/accommodation', isEditing),
  ];
  const hotline = linkOrFallback(
    fields?.HotlineLink,
    'Apply through Clearing Fast Track',
    '/clearing',
    isEditing
  );
  const phone = fields?.Phone?.value || '01206 873333';

  return (
    <footer
      className={clsx('component footer bg-[var(--reading-charcoal)] text-white', params?.styles)}
      id={id}
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3 md:px-8 md:py-16">
        <div>
          <div className="footer-logo mb-4 inline-flex bg-white p-2">
            <CmsImage
              field={fields?.Logo}
              fallbackSrc={demoImages.logo}
              alt={fields?.Title?.value || 'University of Essex'}
              className="footer-logo__media"
              imgClassName="footer-logo__img"
              width={180}
              height={40}
            />
          </div>
          <h2 className="text-lg font-bold">
            {isEditing || hasText(fields?.Title) ? (
              <ContentSdkText field={asText(fields?.Title)} />
            ) : (
              'University of Essex'
            )}
          </h2>
          <div className="mt-4 text-sm leading-relaxed text-white/85">
            {isEditing || hasText(fields?.Address) ? (
              <ContentSdkRichText field={fields?.Address} />
            ) : (
              <p>
                Wivenhoe Park
                <br />
                Colchester
                <br />
                CO4 3SQ
                <br />
                United Kingdom
              </p>
            )}
          </div>
          <p className="mt-4 text-sm">
            <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="font-bold hover:underline">
              {isEditing || hasText(fields?.Phone) ? (
                <ContentSdkText field={asText(fields?.Phone)} />
              ) : (
                phone
              )}
            </a>
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-sm font-bold tracking-wide text-white/70 uppercase">
            {fields?.ExploreTitle?.value || 'Explore'}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {links.map((link, index) => (
              <li key={link.value?.href || index}>
                <ContentSdkLink field={link} className="hover:underline" />
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-bold tracking-wide text-white/70 uppercase">
            {fields?.HotlineTitle?.value || 'Clearing hotline'}
          </h3>
          <div className="mt-4 text-sm leading-relaxed text-white/85">
            {isEditing || hasText(fields?.HotlineDescription) ? (
              <ContentSdkRichText field={fields?.HotlineDescription} />
            ) : (
              <p>
                Speak to Undergraduate Admissions about Fast Track, courses, and Colchester halls.
              </p>
            )}
          </div>
          <ContentSdkLink field={hotline} className="reading-btn reading-btn-primary mt-6" />
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl px-4 py-5 text-xs text-white/70 md:px-8">
          <p>{fields?.Copyright?.value || '© University of Essex. Demo site for SitecoreAI.'}</p>
        </div>
      </div>
    </footer>
  );
};
