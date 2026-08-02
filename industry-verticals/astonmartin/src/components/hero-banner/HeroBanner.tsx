'use client';

import { JSX, Suspense } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  Link as ContentSdkLink,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asLink } from '@/lib/field-helpers';
import { DEMO_IMAGES, withDemoImage } from '@/lib/demo-images';
import { ResolvedImage } from '@/lib/ResolvedImage';
import { CraftedForYouHeroGate } from '@/components/hero-banner/CraftedForYouHero';
import clsx from 'clsx';

interface Fields {
  Image?: ImageField;
  Title?: Field<string>;
  Eyebrow?: Field<string>;
  Description?: Field<string>;
  CtaLink?: LinkField;
  SecondaryCtaLink?: LinkField;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

const hasText = (field?: Field<string>) => Boolean(field?.value);
const hasLink = (field?: LinkField) => Boolean(field?.value?.href || field?.value?.text);

const HeroShell = ({
  params,
  fields,
  children,
  image,
  align = 'end',
  contentAlign = 'start',
  priority = false,
}: HeroBannerProps & {
  children: React.ReactNode;
  image: ImageField;
  align?: 'start' | 'center' | 'end';
  contentAlign?: 'start' | 'center' | 'end';
  priority?: boolean;
}): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const id = params?.RenderingIdentifier;
  const styles = params?.styles || '';

  if (!fields && !isEditing) {
    return <></>;
  }

  return (
    <section
      className={clsx(
        'component hero-banner relative min-h-[70vh] w-full overflow-hidden md:min-h-screen',
        styles
      )}
      id={id}
    >
      <div className="absolute inset-0 z-0 bg-black">
        <ResolvedImage
          field={image}
          className="h-full w-full object-cover object-top"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
      </div>
      <div
        className={clsx(
          'relative z-10 mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col px-6 py-10 md:min-h-screen md:px-10 md:py-16',
          align === 'start' && 'justify-start',
          align === 'center' && 'justify-center',
          align === 'end' && 'justify-end',
          contentAlign === 'start' && 'items-start text-left',
          contentAlign === 'center' && 'items-center text-center',
          contentAlign === 'end' && 'items-end text-right'
        )}
      >
        {children}
      </div>
    </section>
  );
};

function resolveHero(fields: Fields | undefined, fallback: string): ImageField {
  return withDemoImage(
    fields?.Image,
    fallback,
    fields?.Title?.value || fields?.Eyebrow?.value || 'Aston Martin'
  );
}

export const Default = (props: HeroBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields } = props;

  const defaultHero = (
    <HeroShell
      {...props}
      image={resolveHero(fields, DEMO_IMAGES.homeHero)}
      align="end"
      contentAlign="start"
      priority
    >
      {(hasText(fields?.Title) || isEditing) && (
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
          <ContentSdkText field={fields?.Title} />
        </h1>
      )}
      {(hasText(fields?.Description) || isEditing) && (
        <div className="mt-4 max-w-xl text-base text-white/85 md:text-lg">
          <ContentSdkRichText field={fields?.Description} />
        </div>
      )}
      {(hasLink(fields?.CtaLink) || isEditing) && (
        <div className="mt-8">
          <ContentSdkLink field={asLink(fields?.CtaLink)} className="am-btn am-btn-solid" />
        </div>
      )}
    </HeroShell>
  );

  // Editing mode keeps authored fields; live demo swaps for ChatGPT / Crafted For You UTMs.
  if (isEditing) {
    return defaultHero;
  }

  return (
    <Suspense fallback={defaultHero}>
      <CraftedForYouHeroGate>{defaultHero}</CraftedForYouHeroGate>
    </Suspense>
  );
};

export const ModelFeature = (props: HeroBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields } = props;

  return (
    <HeroShell
      {...props}
      image={resolveHero(fields, DEMO_IMAGES.homeVantage)}
      align="center"
      contentAlign="center"
    >
      {(hasText(fields?.Eyebrow) || isEditing) && (
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-white uppercase md:text-sm">
          <ContentSdkText field={fields?.Eyebrow} />
        </p>
      )}
      {(hasText(fields?.Title) || isEditing) && (
        <h2 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl lg:text-8xl">
          <ContentSdkText field={fields?.Title} />
        </h2>
      )}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {(hasLink(fields?.CtaLink) || isEditing) && (
          <ContentSdkLink field={asLink(fields?.CtaLink)} className="am-btn am-btn-solid" />
        )}
        {(hasLink(fields?.SecondaryCtaLink) || isEditing) && (
          <ContentSdkLink
            field={asLink(fields?.SecondaryCtaLink)}
            className="am-btn am-btn-ghost"
          />
        )}
      </div>
    </HeroShell>
  );
};

export const ModelsLanding = (props: HeroBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields } = props;

  return (
    <HeroShell
      {...props}
      image={resolveHero(fields, DEMO_IMAGES.modelsHero)}
      align="end"
      contentAlign="start"
    >
      {(hasText(fields?.Title) || isEditing) && (
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
          <ContentSdkText field={fields?.Title} />
        </h1>
      )}
      {(hasText(fields?.Description) || isEditing) && (
        <div className="mt-4 max-w-2xl text-sm text-white/80 md:text-base">
          <ContentSdkRichText field={fields?.Description} />
        </div>
      )}
    </HeroShell>
  );
};

export const ModelDetail = (props: HeroBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields } = props;
  const slug = (fields?.Title?.value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const fallback = slug ? `/images/${slug}-hero.jpg` : DEMO_IMAGES.homeHero;
  const image = resolveHero(fields, fallback);

  return (
    <HeroShell {...props} image={image} align="start" contentAlign="start">
      {(hasText(fields?.Title) || isEditing) && (
        <h1 className="mt-16 text-5xl font-semibold tracking-tight text-white md:mt-24 md:text-7xl">
          <ContentSdkText field={fields?.Title} />
        </h1>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        {(hasLink(fields?.CtaLink) || isEditing) && (
          <ContentSdkLink field={asLink(fields?.CtaLink)} className="am-btn am-btn-solid" />
        )}
        {(hasLink(fields?.SecondaryCtaLink) || isEditing) && (
          <ContentSdkLink
            field={asLink(fields?.SecondaryCtaLink)}
            className="am-btn am-btn-ghost"
          />
        )}
      </div>
      {(hasText(fields?.Description) || isEditing) && (
        <div className="mt-auto max-w-lg pb-4 text-sm text-white/75">
          <ContentSdkRichText field={fields?.Description} />
        </div>
      )}
    </HeroShell>
  );
};
