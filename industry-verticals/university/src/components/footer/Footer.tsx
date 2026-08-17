import { JSX } from 'react';
import {
  Field,
  LinkField,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  Link as ContentSdkLink,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import clsx from 'clsx';
import { ComponentProps } from 'lib/component-props';
import { asText, hasText, linkOrFallback } from 'lib/field-helpers';

interface Fields {
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
    linkOrFallback(fields?.LinkThree, 'Courses', '/courses/computer-science-and-ai', isEditing),
    linkOrFallback(fields?.LinkFour, 'Accommodation', '/accommodation', isEditing),
  ];
  const hotline = linkOrFallback(
    fields?.HotlineLink,
    'Apply through Clearing',
    '/clearing',
    isEditing
  );
  const phone = fields?.Phone?.value || '+44 (0) 118 402 0900';

  return (
    <footer
      className={clsx('component footer bg-[var(--reading-charcoal)] text-white', params?.styles)}
      id={id}
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3 md:px-8 md:py-16">
        <div>
          <h2 className="text-lg font-bold">
            {isEditing || hasText(fields?.Title) ? (
              <ContentSdkText field={asText(fields?.Title)} />
            ) : (
              'University'
            )}
          </h2>
          <div className="mt-4 text-sm leading-relaxed text-white/85">
            {isEditing || hasText(fields?.Address) ? (
              <ContentSdkRichText field={fields?.Address} />
            ) : (
              <p>
                Whiteknights
                <br />
                PO Box 217
                <br />
                Reading
                <br />
                RG6 6AH
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

        <div>
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
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-wide text-white/70 uppercase">
            {fields?.HotlineTitle?.value || 'Clearing hotline'}
          </h3>
          <div className="mt-4 text-sm leading-relaxed text-white/85">
            {isEditing || hasText(fields?.HotlineDescription) ? (
              <ContentSdkRichText field={fields?.HotlineDescription} />
            ) : (
              <p>
                Speak to our advisors about courses, accommodation, and applying through Clearing.
              </p>
            )}
          </div>
          <ContentSdkLink field={hotline} className="reading-btn reading-btn-primary mt-6" />
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl px-4 py-5 text-xs text-white/70 md:px-8">
          <p>{fields?.Copyright?.value || '© University. Demo site for SitecoreAI.'}</p>
        </div>
      </div>
    </footer>
  );
};
