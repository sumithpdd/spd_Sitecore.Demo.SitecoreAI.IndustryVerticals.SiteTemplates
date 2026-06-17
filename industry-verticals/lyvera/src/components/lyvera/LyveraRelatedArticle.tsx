'use client';

import type { JSX } from 'react';
import {
  ImageField,
  LinkField,
  TextField,
  Image as ContentSdkImage,
  Link as ContentSdkLink,
  Text as ContentSdkText,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import {
  hasLinkValue,
  imageSrc,
  linkHref,
  linkLabel,
  textFieldValue,
} from '@/lib/lyvera-field-utils';

export interface LyveraRelatedArticleFields {
  Image?: ImageField;
  Category?: TextField;
  Title?: TextField;
  Link?: LinkField;
}

export type LyveraRelatedArticleProps = ComponentProps & {
  fields?: LyveraRelatedArticleFields;
};

export const Default = (props: LyveraRelatedArticleProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields ?? {};
  const category = textFieldValue(fields.Category);
  const title = textFieldValue(fields.Title);
  const href = linkHref(fields.Link);
  const ctaLabel = linkLabel(fields.Link, 'Read more');

  const media = (
    <div className="lyvera-related-article__media">
      {(fields.Image?.value?.src || isEditing) && (
        <ContentSdkImage field={fields.Image} className="lyvera-related-article__image" />
      )}
      {!fields.Image?.value?.src && imageSrc(fields.Image) && (
        <img
          src={imageSrc(fields.Image)}
          alt=""
          className="lyvera-related-article__image lyvera-related-article__image--fallback"
        />
      )}
    </div>
  );

  const body = (
    <div className="lyvera-related-article__body">
      {(category || isEditing) &&
        (isEditing ? (
          <ContentSdkText
            field={fields.Category}
            tag="p"
            className="lyvera-related-article__category"
          />
        ) : (
          <p className="lyvera-related-article__category">{category}</p>
        ))}
      {(title || isEditing) &&
        (isEditing ? (
          <ContentSdkText field={fields.Title} tag="h3" className="lyvera-related-article__title" />
        ) : (
          <h3 className="lyvera-related-article__title">{title}</h3>
        ))}
      {(hasLinkValue(fields.Link) || isEditing) &&
        (isEditing && fields.Link ? (
          <ContentSdkLink field={fields.Link} className="lyvera-related-article__cta" />
        ) : href ? (
          <span className="lyvera-related-article__cta">{ctaLabel}</span>
        ) : null)}
    </div>
  );

  const cardInner = (
    <>
      {media}
      {body}
    </>
  );

  return (
    <article className="component lyvera-related-article" id={props.params?.RenderingIdentifier}>
      {isEditing ? (
        <div className="lyvera-related-article__link">{cardInner}</div>
      ) : href ? (
        <a href={href} className="lyvera-related-article__link">
          {cardInner}
        </a>
      ) : (
        <div className="lyvera-related-article__link">{cardInner}</div>
      )}
    </article>
  );
};
