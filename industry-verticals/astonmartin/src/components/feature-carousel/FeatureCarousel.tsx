import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  Link as ContentSdkLink,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asLink } from '@/lib/field-helpers';
import clsx from 'clsx';

interface Fields {
  HeroImage?: ImageField;
  TileOneImage?: ImageField;
  TileOneTitle?: Field<string>;
  TileOneLink?: LinkField;
  TileTwoImage?: ImageField;
  TileTwoTitle?: Field<string>;
  TileTwoLink?: LinkField;
  TileThreeImage?: ImageField;
  TileThreeTitle?: Field<string>;
  TileThreeLink?: LinkField;
}

type Props = ComponentProps & { fields: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;

  return (
    <section className={clsx('component feature-carousel bg-black py-10 text-white', params?.styles)} id={params?.RenderingIdentifier}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="aspect-[21/9] overflow-hidden bg-neutral-900">
          {(fields?.HeroImage?.value?.src || isEditing) && (
            <ContentSdkImage field={fields?.HeroImage} className="h-full w-full object-cover" />
          )}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            { image: fields?.TileOneImage, title: fields?.TileOneTitle, link: fields?.TileOneLink },
            { image: fields?.TileTwoImage, title: fields?.TileTwoTitle, link: fields?.TileTwoLink },
            { image: fields?.TileThreeImage, title: fields?.TileThreeTitle, link: fields?.TileThreeLink },
          ].map((tile, i) => (
            <article key={i} className="overflow-hidden bg-neutral-900">
              <div className="aspect-[4/3]">
                {(tile.image?.value?.src || isEditing) && (
                  <ContentSdkImage field={tile.image} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <h3 className="text-sm font-semibold tracking-wide uppercase">
                  <ContentSdkText field={tile.title} />
                </h3>
                <ContentSdkLink field={asLink(tile.link)} className="text-xs font-semibold text-white/80 hover:underline" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
