import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  Link as ContentSdkLink,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import clsx from 'clsx';
import { ComponentProps } from 'lib/component-props';
import { demoImages, withDemoImage } from 'lib/demo-images';
import { ResolvedImage } from 'lib/ResolvedImage';
import { asText, hasText, linkOrFallback } from 'lib/field-helpers';

interface Fields {
  Title?: Field<string>;
  Description?: Field<string>;
  TileOneTitle?: Field<string>;
  TileOneDescription?: Field<string>;
  TileOneImage?: ImageField;
  TileOneLink?: LinkField;
  TileTwoTitle?: Field<string>;
  TileTwoDescription?: Field<string>;
  TileTwoImage?: ImageField;
  TileTwoLink?: LinkField;
  TileThreeTitle?: Field<string>;
  TileThreeDescription?: Field<string>;
  TileThreeImage?: ImageField;
  TileThreeLink?: LinkField;
  TileFourTitle?: Field<string>;
  TileFourDescription?: Field<string>;
  TileFourImage?: ImageField;
  TileFourLink?: LinkField;
}

type Props = ComponentProps & { fields: Fields };

const FALLBACKS = [
  {
    title: 'Courses',
    body: 'Find undergraduate and postgraduate programmes that fit your ambitions.',
    href: '/courses/computer-science-and-ai',
    image: demoImages.tileCourses,
  },
  {
    title: 'Student life',
    body: 'Campus community, societies, sport, and everything beyond the lecture theatre.',
    href: '/study-and-life',
    image: demoImages.tileStudentLife,
  },
  {
    title: 'Chat to students',
    body: 'Hear from current students about studying and living here.',
    href: '/study-and-life',
    image: demoImages.clearingStudents,
  },
  {
    title: 'Accommodation',
    body: 'Halls options across campus — including Clearing guarantees.',
    href: '/accommodation',
    image: demoImages.tileAccommodation,
  },
];

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;
  const id = params?.RenderingIdentifier;

  const tiles = [
    {
      title: fields?.TileOneTitle,
      body: fields?.TileOneDescription,
      image: withDemoImage(fields?.TileOneImage, FALLBACKS[0].image, FALLBACKS[0].title),
      link: linkOrFallback(fields?.TileOneLink, FALLBACKS[0].title, FALLBACKS[0].href, isEditing),
      fallback: FALLBACKS[0],
    },
    {
      title: fields?.TileTwoTitle,
      body: fields?.TileTwoDescription,
      image: withDemoImage(fields?.TileTwoImage, FALLBACKS[1].image, FALLBACKS[1].title),
      link: linkOrFallback(fields?.TileTwoLink, FALLBACKS[1].title, FALLBACKS[1].href, isEditing),
      fallback: FALLBACKS[1],
    },
    {
      title: fields?.TileThreeTitle,
      body: fields?.TileThreeDescription,
      image: withDemoImage(fields?.TileThreeImage, FALLBACKS[2].image, FALLBACKS[2].title),
      link: linkOrFallback(fields?.TileThreeLink, FALLBACKS[2].title, FALLBACKS[2].href, isEditing),
      fallback: FALLBACKS[2],
    },
    {
      title: fields?.TileFourTitle,
      body: fields?.TileFourDescription,
      image: withDemoImage(fields?.TileFourImage, FALLBACKS[3].image, FALLBACKS[3].title),
      link: linkOrFallback(fields?.TileFourLink, FALLBACKS[3].title, FALLBACKS[3].href, isEditing),
      fallback: FALLBACKS[3],
    },
  ];

  return (
    <section
      className={clsx('component promo-tile-grid bg-[var(--reading-surface)]', params?.styles)}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <h2 className="text-3xl font-bold text-[var(--reading-ink)] md:text-4xl">
          {isEditing || hasText(fields?.Title) ? (
            <ContentSdkText field={asText(fields?.Title)} />
          ) : (
            'Are you ready?'
          )}
        </h2>
        <div className="mt-3 max-w-2xl text-base text-[var(--reading-charcoal)]">
          {isEditing || hasText(fields?.Description) ? (
            <ContentSdkRichText field={fields?.Description} />
          ) : (
            <p>Explore what it is like to study, live, and thrive at University.</p>
          )}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => (
            <ContentSdkLink
              key={tile.fallback.title}
              field={tile.link}
              className="group overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ResolvedImage
                  field={tile.image}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-[var(--reading-ink)] group-hover:text-[var(--reading-red)]">
                  {isEditing || hasText(tile.title) ? (
                    <ContentSdkText field={asText(tile.title)} />
                  ) : (
                    tile.fallback.title
                  )}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--reading-charcoal)]">
                  {isEditing || hasText(tile.body) ? (
                    <ContentSdkText field={asText(tile.body)} />
                  ) : (
                    tile.fallback.body
                  )}
                </p>
              </div>
            </ContentSdkLink>
          ))}
        </div>
      </div>
    </section>
  );
};
