import { NextImage as ContentSdkImage, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import React from 'react';
import { ComponentProps } from 'lib/component-props';
import {
  getDatasource,
  hasImageFieldValue,
  hasLinkValue,
  hasTextFieldValue,
  imageAltValue,
  linkHref,
  normalizeImageField,
  normalizeLinkField,
  normalizeTextField,
  pickSdkField,
  textFieldValue,
} from '@/helpers/field-utils';

interface Fields {
  data?: {
    datasource?: {
      image?: { jsonValue?: unknown };
      imageCaption?: { jsonValue?: unknown };
      targetUrl?: { jsonValue?: unknown };
    };
  };
  Image?: unknown;
  ImageCaption?: unknown;
  TargetUrl?: unknown;
}

interface ImageProps extends ComponentProps {
  fields: Fields;
}

const ImageWrapper: React.FC<{ className: string; id?: string; children: React.ReactNode }> = ({
  className,
  id,
  children,
}) => (
  <div className={className.trim()} id={id}>
    <div className="component-content">{children}</div>
  </div>
);

const ImageDefault: React.FC<ImageProps> = ({ params }) => (
  <ImageWrapper className={`component image ${params.styles}`}>
    <span className="is-empty-hint">Image</span>
  </ImageWrapper>
);

const resolveImageFields = (fields: Fields) => {
  const ds = getDatasource(fields);
  const gql = fields?.data?.datasource;

  return {
    image: normalizeImageField(gql?.image?.jsonValue ?? pickSdkField(ds, 'image', 'Image')),
    caption: normalizeTextField(
      gql?.imageCaption?.jsonValue ?? pickSdkField(ds, 'imageCaption', 'ImageCaption')
    ),
    targetUrl: normalizeLinkField(
      gql?.targetUrl?.jsonValue ?? pickSdkField(ds, 'targetUrl', 'TargetUrl')
    ),
  };
};

export const Default: React.FC<ImageProps> = (props) => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id } = params;

  if (!fields) {
    return <ImageDefault {...props} />;
  }

  const resolved = resolveImageFields(fields);
  const imageSrc = resolved.image?.value?.src;
  const caption = textFieldValue(resolved.caption);
  const href = linkHref(resolved.targetUrl, '');
  const shouldWrapWithLink = !isPageEditing && hasLinkValue(resolved.targetUrl);

  return (
    <ImageWrapper className={`component image ${styles}`} id={id}>
      {shouldWrapWithLink ? (
        <a href={href}>
          {isPageEditing ? (
            <ContentSdkImage field={resolved.image} />
          ) : imageSrc ? (
            <img src={imageSrc} alt={imageAltValue(resolved.image)} />
          ) : null}
        </a>
      ) : isPageEditing ? (
        hasImageFieldValue(resolved.image) ? (
          <ContentSdkImage field={resolved.image} />
        ) : null
      ) : imageSrc ? (
        <img src={imageSrc} alt={imageAltValue(resolved.image)} />
      ) : null}

      {(caption || isPageEditing) &&
        (isPageEditing ? (
          <Text tag="span" className="image-caption" field={resolved.caption} />
        ) : hasTextFieldValue(resolved.caption) ? (
          <span className="image-caption">{caption}</span>
        ) : null)}
    </ImageWrapper>
  );
};
