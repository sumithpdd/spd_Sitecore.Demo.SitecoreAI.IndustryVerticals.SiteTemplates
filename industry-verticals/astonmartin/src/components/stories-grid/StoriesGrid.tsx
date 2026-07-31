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
  Title?: Field<string>;
  AllStoriesLink?: LinkField;
  StoryOneImage?: ImageField;
  StoryOneCategory?: Field<string>;
  StoryOneTitle?: Field<string>;
  StoryOneDate?: Field<string>;
  StoryOneLink?: LinkField;
  StoryTwoImage?: ImageField;
  StoryTwoCategory?: Field<string>;
  StoryTwoTitle?: Field<string>;
  StoryTwoDate?: Field<string>;
  StoryTwoLink?: LinkField;
  StoryThreeImage?: ImageField;
  StoryThreeCategory?: Field<string>;
  StoryThreeTitle?: Field<string>;
  StoryThreeDate?: Field<string>;
  StoryThreeLink?: LinkField;
}

type Props = ComponentProps & { fields: Fields };

const StoryCard = ({
  image,
  category,
  title,
  date,
  link,
  isEditing,
}: {
  image?: ImageField;
  category?: Field<string>;
  title?: Field<string>;
  date?: Field<string>;
  link?: LinkField;
  isEditing: boolean;
}): JSX.Element => (
  <article className="group flex flex-col gap-3">
    <div className="aspect-[16/10] overflow-hidden bg-neutral-200">
      {(image?.value?.src || isEditing) && (
        <ContentSdkImage field={image} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
      )}
    </div>
    {(category?.value || isEditing) && (
      <p className="text-xs font-semibold tracking-[0.16em] text-[var(--am-teal)] uppercase">
        <ContentSdkText field={category} />
      </p>
    )}
    {(title?.value || isEditing) && (
      <h3 className="text-lg font-semibold leading-snug">
        <ContentSdkText field={title} />
      </h3>
    )}
    {(date?.value || isEditing) && (
      <p className="text-sm text-neutral-500">
        <ContentSdkText field={date} />
      </p>
    )}
    {(link?.value?.href || isEditing) && (
      <ContentSdkLink field={asLink(link)} className="text-sm font-semibold text-[var(--am-teal)] hover:underline" />
    )}
  </article>
);

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;

  return (
    <section className={clsx('component stories-grid bg-white py-16 md:py-24', params?.styles)} id={params?.RenderingIdentifier}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            <ContentSdkText field={fields?.Title} />
          </h2>
          <ContentSdkLink field={asLink(fields?.AllStoriesLink)} className="am-btn am-btn-teal" />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <StoryCard
            image={fields?.StoryOneImage}
            category={fields?.StoryOneCategory}
            title={fields?.StoryOneTitle}
            date={fields?.StoryOneDate}
            link={fields?.StoryOneLink}
            isEditing={isEditing}
          />
          <StoryCard
            image={fields?.StoryTwoImage}
            category={fields?.StoryTwoCategory}
            title={fields?.StoryTwoTitle}
            date={fields?.StoryTwoDate}
            link={fields?.StoryTwoLink}
            isEditing={isEditing}
          />
          <StoryCard
            image={fields?.StoryThreeImage}
            category={fields?.StoryThreeCategory}
            title={fields?.StoryThreeTitle}
            date={fields?.StoryThreeDate}
            link={fields?.StoryThreeLink}
            isEditing={isEditing}
          />
        </div>
      </div>
    </section>
  );
};
