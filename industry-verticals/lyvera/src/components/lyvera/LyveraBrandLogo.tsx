import type { JSX } from 'react';
import {
  ImageField,
  LinkField,
  TextField,
  Link as ContentSdkLink,
  Text as ContentSdkText,
  Image as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { imageSrc, linkHref, textFieldValue } from '@/lib/lyvera-field-utils';

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
  const fields = props.fields ?? {};
  const title = textFieldValue(fields.Title) || 'Brand';
  const href = linkHref(fields.BrandLink);
  const logoSrc = imageSrc(fields.LogoImage);

  const content = (
    <div className="lyvera-brand-logo" data-lyvera-brand-slide id={id}>
      {logoSrc ? (
        <ContentSdkImage field={fields.LogoImage} className="lyvera-brand-logo__image" />
      ) : (
        <ContentSdkText field={fields.Title} tag="span" className="lyvera-brand-logo__text" />
      )}
      {!logoSrc && !textFieldValue(fields.Title) && (
        <span className="lyvera-brand-logo__text">{title}</span>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="lyvera-brand-logo__link" target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  if (fields.BrandLink) {
    return <ContentSdkLink field={fields.BrandLink}>{content}</ContentSdkLink>;
  }

  return content;
};
