'use client';

import { JSX } from 'react';
import { NextImage as ContentSdkImage, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asImageField, asTextField, fieldString } from '@/lib/sitecore-fields';

type Fields = {
  Infographic?: unknown;
  Image?: unknown;
  Caption?: unknown;
  Title?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as Fields;
  const fields = { ...routeFields, ...(props.fields || {}) };
  const image = asImageField(fields.Infographic) || asImageField(fields.Image);
  const caption = asTextField(fields.Caption) || asTextField(fields.Title);
  const hasImage = Boolean((image?.value as { src?: string } | undefined)?.src);

  if (!hasImage && !isEditing) {
    return (
      <section className="pm-article" id={props.params?.RenderingIdentifier}>
        <div className="pm-wrap pb-12">
          <figure className="pm-infographic">
            <div
              className="pm-infographic__fallback"
              role="img"
              aria-label="T+1 readiness infographic"
            >
              <p className="pm-outlaw__kicker">Infographic</p>
              <p className="text-lg font-semibold">T+1 readiness is evidence, not a date</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                <li>Match on T</li>
                <li>Fund on T</li>
                <li>Exception before T+1</li>
              </ul>
            </div>
            <figcaption>
              Editors drop a DAM infographic on the Infographic field for campaigns.
            </figcaption>
          </figure>
        </div>
      </section>
    );
  }

  return (
    <section className="pm-article" id={props.params?.RenderingIdentifier}>
      <div className="pm-wrap pb-12">
        <figure className="pm-infographic">
          {hasImage || isEditing ? (
            <ContentSdkImage field={image} className="pm-article__image" />
          ) : null}
          {(fieldString(caption) || isEditing) && (
            <figcaption>
              <Text field={caption} />
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
};

export default Default;
