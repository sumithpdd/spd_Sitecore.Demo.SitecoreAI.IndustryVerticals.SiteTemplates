'use client';

import { JSX } from 'react';
import { Field, LinkField, Text, Link, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { fieldText, linkHref, linkText } from 'lib/cms-fields';

type Fields = {
  Title?: Field<string>;
  DiscountCode?: Field<string>;
  CtaLink?: LinkField;
};

type Props = ComponentProps & { fields?: Fields };

/**
 * Full-width magenta CTA bar — message + optional discount code + button.
 * Personalize the rendering on the PDP for return / abandoned-cart visits.
 */
export const Default = (props: Props): JSX.Element | null => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const f = props.fields || {};
  const title = fieldText(
    f.Title,
    'Welcome back — a special discount for you. Avail this offer at checkout.'
  );
  const code = fieldText(f.DiscountCode, 'EVENT15');
  const href = linkHref(f.CtaLink, '/checkout/supplies?utm_campaign=ordercloud-checkout');
  const label = linkText(f.CtaLink, 'Find out more');

  if (!title && !code && !isEditing) {
    return null;
  }

  return (
    <section className="brother-cta-banner" data-component="CtaBanner">
      <div className="brother-container brother-cta-banner__bar">
        <p className="brother-cta-banner__copy">
          {f.Title?.value || isEditing ? <Text field={f.Title} /> : title}{' '}
          {code || isEditing ? (
            <span className="brother-cta-banner__code">
              {f.DiscountCode?.value || isEditing ? <Text field={f.DiscountCode} /> : code}
            </span>
          ) : null}
        </p>
        {f.CtaLink && (f.CtaLink.value?.href || isEditing) ? (
          <Link field={f.CtaLink} className="brother-cta-banner__btn" />
        ) : (
          <a className="brother-cta-banner__btn" href={href}>
            {label}
          </a>
        )}
      </div>
    </section>
  );
};

export default Default;
