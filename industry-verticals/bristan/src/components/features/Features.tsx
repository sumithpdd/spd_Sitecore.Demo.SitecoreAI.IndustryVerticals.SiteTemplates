import { generateIndexes } from '@/helpers/generateIndexes';
import { getValidLinkField } from '@/lib/sdk-fields';
import { IGQLTextField } from '@/types/igql';
import {
  ComponentParams,
  ComponentRendering,
  Image,
  Link,
  Text,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { CommonStyles } from '@/types/styleFlags';

interface Fields {
  data: {
    datasource: {
      children: {
        results: Feature[];
      };
      title: IGQLTextField;
    };
  };
}

interface Feature {
  featureImage: { jsonValue: { value: { src: string; alt?: string } } };
  featureTitle: { jsonValue: { value: string } };
  featureDescription: { jsonValue: { value: string } };
  featureLink: { jsonValue: { value: { href: string } } };
}

type FeaturesProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

type FeatureWrapperProps = {
  props: FeaturesProps;
  children: React.ReactNode;
};

const FeatureWrapper = (wrapperProps: FeatureWrapperProps) => {
  // rendering item id
  const id = wrapperProps.props.params.RenderingIdentifier;

  return (
    <section className={`${wrapperProps.props.params.styles}`} id={id ? id : undefined}>
      {wrapperProps.children}
    </section>
  );
};

export const Default = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;
  const hideAccentLine = props.params.styles?.includes(CommonStyles.HideAccentLine);
  const featureSectionTitle = props.fields.data.datasource.title;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 py-20 lg:grid-cols-[1fr_2fr] lg:gap-10">
        <div className="mb-20 lg:mb-0">
          <h2 className="inline-block max-w-md font-bold max-lg:text-[42px]">
            <Text field={featureSectionTitle.jsonValue} />
            {!hideAccentLine && <AccentLine className="w-full max-w-xs" />}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {results.map((item, index) => {
            const title = item.featureTitle.jsonValue;
            const description = item.featureDescription.jsonValue;
            const link = item.featureLink.jsonValue;
            return (
              <div className="flex flex-col" key={index}>
                {/* Title, Link and Description */}
                <div className="mb-5 text-2xl font-bold">
                  <Text field={title} />
                </div>
                <div className="text-foreground mb-3.5 flex-auto leading-7">
                  <Text field={description} />
                </div>
                <div>
                  <Link field={link} className="arrow-btn" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FeatureWrapper>
  );
};

export const ImageGrid = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-4 py-9 md:grid-cols-2 lg:grid-cols-5">
        {results.map((item, index) => {
          const imageField = item?.featureImage.jsonValue;
          return (
            <div className="flex items-center justify-center py-9 lg:py-2" key={index}>
              {imageField && <Image field={imageField} className="max-h-20 object-contain" />}
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const ThreeColGridCentered = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container flex flex-col flex-wrap justify-evenly gap-20 md:flex-row lg:gap-20">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div className="flex flex-col items-center justify-start 2xl:w-80" key={index}>
              {/* Image */}
              <div className="bg-accent mb-7 flex h-20 w-20 items-center justify-center rounded-full">
                <Image field={image} />
              </div>
              {/* Title and Description */}
              <div className="flex flex-col items-center justify-center">
                <div className="mb-2 leading-0.5">
                  <Text tag="h5" className="text-accent" field={title} />
                </div>
                <div className="text-background-muted-light text-center">
                  <Text field={description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const NumberedGrid = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-4 py-24 md:grid-cols-2 lg:grid-cols-3">
        {results.map((item, index) => {
          const title = item?.featureTitle.jsonValue;
          const description = item?.featureDescription.jsonValue;
          return (
            <div
              className="group text-background hover:bg-accent cursor-pointer rounded-xl p-6"
              key={index}
            >
              {/* Generated Number */}
              <h1 className="group-hover:text-background text-background-muted-dark mb-2 text-7xl leading-24">
                {generateIndexes(index)}
              </h1>
              {/* Title and Description */}
              <div>
                <div className="text-accent group-hover:text-background mb-4 text-2xl leading-8 font-bold">
                  <Text field={title} />
                </div>
                <div className="text-background-muted-dark group-hover:text-background leading-7">
                  <Text field={description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

export const FourColGrid = (props: FeaturesProps) => {
  // results of the graphql
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-20 py-24 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div className="grid grid-cols-[1fr_2fr] gap-2.5" key={index}>
              {/* Image */}
              <div className="flex items-center justify-center rounded-full">
                <Image field={image} />
              </div>
              {/* Title and Description */}
              <div className="flex flex-col justify-center">
                <div className="text-xl leading-9 font-bold">
                  <Text className="text-foreground" field={title} />
                </div>
                <div className="text-background-muted-light leading-8">
                  <Text field={description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};

/** Audience gateway — horizontal button row (Homeowners, Installers, etc.) */
export const AudienceTiles = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="features-audience">
        <div className="container">
          <ul className="features-audience__list">
            {results.map((item, index) => {
              const title = item.featureTitle.jsonValue;
              const link = getValidLinkField(item.featureLink?.jsonValue);

              return (
                <li key={index}>
                  {link ? (
                    <Link field={link} className="bristan-btn-primary features-audience__link" />
                  ) : (
                    <span className="bristan-btn-primary features-audience__link">
                      <Text field={title} />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </FeatureWrapper>
  );
};

/** Footer-style "Here to Help" three-column support cards */
export const HelpCards = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="features-help-cards">
        <div className="container">
          <h2 className="features-help-cards__title">
            Here <span>to Help</span>
          </h2>
          <div className="features-help-cards__grid">
            {results.map((item, index) => {
              const title = item.featureTitle.jsonValue;
              const description = item.featureDescription.jsonValue;
              const link = getValidLinkField(item.featureLink?.jsonValue);
              const image = item.featureImage?.jsonValue;

              return (
                <article className="features-help-cards__block" key={index}>
                  <h4 className="features-help-cards__heading">
                    <Text field={title} />
                  </h4>
                  <div className="features-help-cards__text">
                    <Text tag="p" field={description} />
                  </div>
                  {link && (
                    <span className="features-help-cards__link">
                      {image?.value?.src && (
                        <Image field={image} className="features-help-cards__icon" />
                      )}
                      <Link field={link} />
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </FeatureWrapper>
  );
};

const FALLBACK_TILE_IMAGE = '/images/hero/banner-1.jpg';

function resolveTileImage(image?: { jsonValue?: { value?: { src?: string; alt?: string } } }) {
  const field = image?.jsonValue;
  const src = field?.value?.src;

  if (!src || src.includes('.ashx')) {
    return {
      value: {
        src: FALLBACK_TILE_IMAGE,
        alt: field?.value?.alt || 'Bristan product range',
      },
    };
  }

  return field;
}

/** Four-column range tiles with section heading — bristan.com Browse Our Ranges */
export const BrowseRanges = (props: FeaturesProps) => {
  const results = props.fields?.data?.datasource?.children?.results ?? [];
  const sectionTitle = props.fields?.data?.datasource?.title;

  return (
    <FeatureWrapper props={props}>
      <div className="browse-ranges">
        <div className="container">
          {sectionTitle?.jsonValue && (
            <h2 className="browse-ranges__title">
              <Text field={sectionTitle.jsonValue} />
            </h2>
          )}
          <div className="browse-ranges__grid">
            {results.map((item, index) => {
              const link = getValidLinkField(item.featureLink?.jsonValue);
              const image = resolveTileImage(item.featureImage);

              return (
                <article
                  className="bristan-category-tile"
                  key={item.featureTitle?.jsonValue?.value ?? index}
                >
                  <div className="bristan-category-tile__accent" aria-hidden />
                  {link ? (
                    <Link field={link} className="bristan-category-tile__image-link">
                      <Image field={image} className="bristan-category-tile__image" />
                    </Link>
                  ) : (
                    <Image field={image} className="bristan-category-tile__image" />
                  )}
                  {link && (
                    <Link field={link} className="bristan-category-tile__footer">
                      <span className="bristan-category-tile__footer-text">{link.value?.text}</span>
                      <span className="bristan-category-tile__chevrons" aria-hidden>
                        &gt;&gt;&gt;
                      </span>
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </FeatureWrapper>
  );
};

export const ImageCardGrid = (props: FeaturesProps) => {
  const results = props.fields.data.datasource.children.results;

  return (
    <FeatureWrapper props={props}>
      <div className="outline-non container grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {results.map((item, index) => {
          const title = item.featureTitle.jsonValue;
          const description = item.featureDescription.jsonValue;
          const image = item.featureImage.jsonValue;
          return (
            <div key={index}>
              <div className="mb-7 aspect-4/3 w-full overflow-hidden rounded-lg bg-white">
                <Image field={image} className="h-full w-full object-cover" />
              </div>

              <h6>
                <Text field={title} />
              </h6>

              <p className="text-foreground-muted mt-1 text-lg">
                <Text field={description} />
              </p>
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};
