import type { JSX } from 'react';
import {
  ImageField,
  LinkField,
  RichTextField,
  TextField,
  NextImage as ContentSdkImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { imageSrc, linkHref } from '@/lib/marley-field-utils';
import { MarleyLink, MarleyRichText, MarleyText } from '@/lib/marley-editable-fields';

export interface MarleyHeroBannerFields {
  Title?: TextField;
  Description?: RichTextField;
  Image?: ImageField;
  Video?: ImageField;
  CtaLink?: LinkField;
}

export type MarleyHeroBannerProps = ComponentProps & {
  fields?: MarleyHeroBannerFields;
};

/** Marley home hero — plain-string delivery, SDK fields in Pages editor. */
export const Default = (props: MarleyHeroBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const { params, fields } = props;
  const id = params?.RenderingIdentifier;
  const styles = params?.styles ?? '';
  const hideGradient = styles.includes('hide-gradient-overlay');
  const videoSrc = fields?.Video?.value?.src;
  const imageSrcValue = imageSrc(fields?.Image);

  return (
    <section
      className={`component hero-banner marley-hero-banner ${styles} relative flex min-h-screen flex-col items-center py-10`}
      id={id}
    >
      <div className="absolute inset-0 z-0">
        {!isEditing && videoSrc ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={imageSrcValue}
          >
            <source src={videoSrc} type="video/webm" />
          </video>
        ) : isEditing && fields?.Image ? (
          <ContentSdkImage
            field={fields.Image}
            className="h-full w-full object-cover md:object-bottom"
            priority
          />
        ) : imageSrcValue ? (
          <img src={imageSrcValue} alt="" className="h-full w-full object-cover md:object-bottom" />
        ) : null}
        {hideGradient && (
          <div className="to-foreground/80 absolute inset-0 bg-gradient-to-b from-transparent from-40%" />
        )}
      </div>

      <div className="relative flex h-full w-full flex-grow items-end">
        <div className="container mx-auto flex h-full items-end px-4 py-6">
          <div className="flex w-full justify-start text-left">
            <div>
              <h1 className="font-heading text-background-muted text-4xl tracking-tight capitalize lg:text-7xl">
                <MarleyText field={fields?.Title} isEditing={isEditing} tag="span" />
              </h1>
              <div className="text-background-muted text-md lg:text-xl">
                <MarleyRichText field={fields?.Description} isEditing={isEditing} tag="div" />
              </div>
              {(linkHref(fields?.CtaLink) || isEditing) && (
                <div className="mt-6">
                  <MarleyLink
                    field={fields?.CtaLink}
                    isEditing={isEditing}
                    className="outline-btn !inline-flex"
                    fallback={{ href: '/products', text: 'View products' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
