'use client';

import { JSX } from 'react';
import { Link as ContentSdkLink, RichText, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asLinkField, asTextField, linkHref } from '@/lib/sitecore-fields';
import Link from 'next/link';

type Fields = {
  Eyebrow?: unknown;
  Title?: unknown;
  Intro?: unknown;
  PrimaryCta?: unknown;
  SecondaryCta?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const primary = asLinkField(fields.PrimaryCta);
  const secondary = asLinkField(fields.SecondaryCta);

  return (
    <section className={`pm-campaign w-full ${props.params?.styles || ''}`.trim()}>
      <div className="pm-wrap py-20">
        <p className="pm-section-kicker">
          {asTextField(fields.Eyebrow) ? (
            <Text field={asTextField(fields.Eyebrow)} />
          ) : (
            'AI Infused'
          )}
        </p>
        <h1>
          {asTextField(fields.Title) ? (
            <Text field={asTextField(fields.Title)} />
          ) : (
            'Process, data and AI in how we deliver'
          )}
        </h1>
        <div className="pm-industry__lede">
          {asTextField(fields.Intro) ? (
            <RichText field={asTextField(fields.Intro)} />
          ) : (
            <p>The go-to-market structure to copy for payments.</p>
          )}
        </div>
        <div className="pm-campaign__ctas">
          {primary && linkHref(fields.PrimaryCta) ? (
            <ContentSdkLink field={primary} className="pm-btn-light" />
          ) : (
            <Link className="pm-btn-light" href="/people/charlotte-byrne">
              Talk to Charlotte
            </Link>
          )}
          {secondary && linkHref(fields.SecondaryCta) ? (
            <ContentSdkLink field={secondary} />
          ) : isEditing ? (
            <span>SecondaryCta</span>
          ) : (
            <Link href="/ai/payments">Payments campaign</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Default;
