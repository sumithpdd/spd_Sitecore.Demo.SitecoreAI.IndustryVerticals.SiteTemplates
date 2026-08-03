import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text as ContentSdkText,
  Link as ContentSdkLink,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asLink } from '@/lib/field-helpers';
import { DEMO_IMAGES, withDemoImage } from '@/lib/demo-images';
import { ResolvedImage } from '@/lib/ResolvedImage';
import clsx from 'clsx';

interface Fields {
  Title?: Field<string>;
  CardOneTitle?: Field<string>;
  CardOneLink?: LinkField;
  CardOneImage?: ImageField;
  CardTwoTitle?: Field<string>;
  CardTwoLink?: LinkField;
  CardTwoImage?: ImageField;
  CardThreeTitle?: Field<string>;
  CardThreeLink?: LinkField;
  CardThreeImage?: ImageField;
}

type Props = ComponentProps & { fields: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;

  const cards = [
    {
      title: fields?.CardOneTitle,
      link: fields?.CardOneLink,
      image: withDemoImage(
        fields?.CardOneImage,
        DEMO_IMAGES.configuratorHero,
        fields?.CardOneTitle?.value || ''
      ),
    },
    {
      title: fields?.CardTwoTitle,
      link: fields?.CardTwoLink,
      image: withDemoImage(
        fields?.CardTwoImage,
        DEMO_IMAGES.dealersHero,
        fields?.CardTwoTitle?.value || ''
      ),
    },
    {
      title: fields?.CardThreeTitle,
      link: fields?.CardThreeLink,
      image: withDemoImage(
        fields?.CardThreeImage,
        DEMO_IMAGES.qByHero,
        fields?.CardThreeTitle?.value || ''
      ),
    },
  ];

  return (
    <section
      className={clsx(
        'component explore-cta-strip bg-neutral-950 py-16 text-white md:py-20',
        params?.styles
      )}
      id={params?.RenderingIdentifier}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {(fields?.Title?.value || isEditing) && (
          <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight md:text-4xl">
            <ContentSdkText field={fields?.Title} />
          </h2>
        )}
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card, i) => (
            <article
              key={i}
              className="group relative min-h-[18rem] overflow-hidden bg-neutral-900"
            >
              <ResolvedImage
                field={card.image}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
              <div className="relative z-10 flex min-h-[18rem] flex-col justify-end p-6 md:p-8">
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  <ContentSdkText field={card.title} />
                </h3>
                {(card.link?.value?.href || isEditing) && (
                  <div className="mt-4">
                    <ContentSdkLink
                      field={asLink(card.link)}
                      className="text-sm font-semibold tracking-wide underline-offset-4 hover:underline"
                    />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
