import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  Link as ContentSdkLink,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asLink } from '@/lib/field-helpers';
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
const hasImage = (field?: ImageField) => Boolean(field?.value?.src);

const HeroShell = ({
  params,
  fields,
  children,
  align = 'end',
  contentAlign = 'start',
}: HeroBannerProps & {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  contentAlign?: 'start' | 'center' | 'end';
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
      className={clsx('component hero-banner relative min-h-[70vh] w-full overflow-hidden md:min-h-screen', styles)}
      id={id}
    >
      <div className="absolute inset-0 z-0 bg-black">
        {(hasImage(fields?.Image) || isEditing) && (
          <ContentSdkImage field={fields?.Image} className="h-full w-full object-cover" priority />
        )}
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

/** Full-bleed home / editorial hero — title bottom-left + primary CTA */
export const Default = (props: HeroBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields } = props;

  return (
    <HeroShell {...props} align="end" contentAlign="start">
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
};

/** Centered model feature band — eyebrow + title + Explore / Build */
export const ModelFeature = (props: HeroBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields } = props;

  return (
    <HeroShell {...props} align="center" contentAlign="center">
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
          <ContentSdkLink field={asLink(fields?.SecondaryCtaLink)} className="am-btn am-btn-ghost" />
        )}
      </div>
    </HeroShell>
  );
};

/** Models listing hero — title bottom-left over lineup image */
export const ModelsLanding = (props: HeroBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields } = props;

  return (
    <HeroShell {...props} align="end" contentAlign="start">
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

/** Model detail hero — title top-left + Discover / Configurator */
export const ModelDetail = (props: HeroBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields } = props;

  return (
    <HeroShell {...props} align="start" contentAlign="start">
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
          <ContentSdkLink field={asLink(fields?.SecondaryCtaLink)} className="am-btn am-btn-ghost" />
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
