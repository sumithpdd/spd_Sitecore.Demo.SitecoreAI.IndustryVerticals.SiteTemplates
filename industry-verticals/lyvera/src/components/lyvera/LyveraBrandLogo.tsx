'use client';

import type { JSX } from 'react';
import {
  ImageField,
  LinkField,
  TextField,
  Link as ContentSdkLink,
  Text as ContentSdkText,
  Image as ContentSdkImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import {
  hasLinkValue,
  imageSrc,
  linkHref,
  normalizeLinkField,
  textFieldValue,
  unwrapField,
} from '@/lib/lyvera-field-utils';
import { normalizeSxaStyles } from '@/lib/sxa-styles';

export interface LyveraBrandLogoFields {
  Title?: TextField;
  LogoImage?: ImageField;
  BrandLink?: LinkField;
}

export type LyveraBrandLogoProps = ComponentProps & {
  fields?: LyveraBrandLogoFields;
};

export const Default = (props: LyveraBrandLogoProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const styles = normalizeSxaStyles(props.params?.styles);
  const fields = props.fields ?? {};
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;

  const titleField = unwrapField(fields.Title);
  const logoField = unwrapField(fields.LogoImage);
  const title = textFieldValue(titleField) || 'Brand';
  const logoSrc = imageSrc(logoField);
  const linkField = normalizeLinkField(fields.BrandLink, { text: title, href: '' });
  const href = linkHref(linkField);

  const content = (
    <div
      className={['lyvera-brand-logo', styles].filter(Boolean).join(' ')}
      data-lyvera-brand-slide
      id={id}
    >
      {logoSrc || isEditing ? (
        isEditing ? (
          <ContentSdkImage field={logoField} className="lyvera-brand-logo__image" />
        ) : (
          <img src={logoSrc} alt={title} className="lyvera-brand-logo__image" />
        )
      ) : isEditing ? (
        <ContentSdkText field={titleField} tag="span" className="lyvera-brand-logo__text" />
      ) : (
        <span className="lyvera-brand-logo__text">{title}</span>
      )}
    </div>
  );

  const linkClassName = 'lyvera-brand-logo__link';

  if (isEditing && linkField) {
    return (
      <ContentSdkLink field={linkField} className={linkClassName}>
        {content}
      </ContentSdkLink>
    );
  }

  if (hasLinkValue(linkField)) {
    return (
      <a href={href} className={linkClassName} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
};
