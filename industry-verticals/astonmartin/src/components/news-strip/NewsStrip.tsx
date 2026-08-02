import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text as ContentSdkText,
  Link as ContentSdkLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asLink } from '@/lib/field-helpers';
import { DEMO_IMAGES, withDemoImage } from '@/lib/demo-images';
import { ResolvedImage } from '@/lib/ResolvedImage';
import clsx from 'clsx';

interface Fields {
  Title?: Field<string>;
  AllNewsLink?: LinkField;
  ItemOneImage?: ImageField;
  ItemOneDate?: Field<string>;
  ItemOneTitle?: Field<string>;
  ItemOneLink?: LinkField;
  ItemTwoImage?: ImageField;
  ItemTwoDate?: Field<string>;
  ItemTwoTitle?: Field<string>;
  ItemTwoLink?: LinkField;
  ItemThreeImage?: ImageField;
  ItemThreeDate?: Field<string>;
  ItemThreeTitle?: Field<string>;
  ItemThreeLink?: LinkField;
}

type Props = ComponentProps & { fields: Fields };

const NewsItem = ({
  image,
  date,
  title,
  link,
}: {
  image: ImageField;
  date?: Field<string>;
  title?: Field<string>;
  link?: LinkField;
}): JSX.Element => (
  <article className="min-w-[16rem] flex-1 basis-[16rem]">
    <div className="aspect-square overflow-hidden bg-neutral-200">
      <ResolvedImage field={image} className="h-full w-full object-cover" />
    </div>
    <p className="mt-3 text-xs text-neutral-500">
      <ContentSdkText field={date} />
    </p>
    <h3 className="mt-2 text-base font-semibold leading-snug">
      <ContentSdkText field={title} />
    </h3>
    <div className="mt-3">
      <ContentSdkLink field={asLink(link)} className="text-xs font-semibold tracking-wide uppercase text-[var(--am-teal)] hover:underline" />
    </div>
  </article>
);

export const Default = (props: Props): JSX.Element => {
  const { fields, params } = props;

  const itemOneImage = withDemoImage(fields?.ItemOneImage, DEMO_IMAGES.news1, fields?.ItemOneTitle?.value || '');
  const itemTwoImage = withDemoImage(fields?.ItemTwoImage, DEMO_IMAGES.news2, fields?.ItemTwoTitle?.value || '');
  const itemThreeImage = withDemoImage(fields?.ItemThreeImage, DEMO_IMAGES.news3, fields?.ItemThreeTitle?.value || '');

  return (
    <section className={clsx('component news-strip border-t border-neutral-200 bg-white py-16', params?.styles)} id={params?.RenderingIdentifier}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-sm font-semibold tracking-[0.2em] uppercase">
            <ContentSdkText field={fields?.Title} />
          </h2>
          <ContentSdkLink field={asLink(fields?.AllNewsLink)} className="text-xs font-semibold tracking-wide uppercase text-[var(--am-teal)] hover:underline" />
        </div>
        <div className="flex gap-6 overflow-x-auto pb-2">
          <NewsItem image={itemOneImage} date={fields?.ItemOneDate} title={fields?.ItemOneTitle} link={fields?.ItemOneLink} />
          <NewsItem image={itemTwoImage} date={fields?.ItemTwoDate} title={fields?.ItemTwoTitle} link={fields?.ItemTwoLink} />
          <NewsItem image={itemThreeImage} date={fields?.ItemThreeDate} title={fields?.ItemThreeTitle} link={fields?.ItemThreeLink} />
        </div>
      </div>
    </section>
  );
};
