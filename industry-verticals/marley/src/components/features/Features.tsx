import {
  ComponentParams,
  ComponentRendering,
  Field,
  Image,
  ImageField,
  Link,
  LinkField,
  RichTextField,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';
import {
  getDatasource,
  hasLinkValue,
  imageAltValue,
  linkHref,
  linkLabel,
  normalizeImageField,
  normalizeLinkField,
  normalizeRichTextField,
  normalizeTextField,
  pickSdkField,
  richTextFieldValue,
  textFieldValue,
} from '@/helpers/field-utils';
import { IGQLField } from '@/types/igql';

type FeaturesDatasource = {
  title?: IGQLField<Field<string>>;
  description?: IGQLField<Field<string> | RichTextField>;
  children?: {
    results?: FeatureItem[];
  };
};

type FeatureItem = {
  featureImage?: IGQLField<ImageField>;
  featureTitle?: IGQLField<Field<string>>;
  featureDescription?: IGQLField<Field<string> | RichTextField>;
  featureLink?: IGQLField<LinkField>;
};

interface Fields {
  data?: {
    datasource?: FeaturesDatasource;
  };
}

type FeaturesProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

type ResolvedFeature = {
  title?: Field<string>;
  description?: RichTextField | Field<string>;
  image?: ImageField;
  link?: LinkField;
};

type ResolvedFeatures = {
  sectionTitle?: Field<string>;
  sectionDescription?: RichTextField | Field<string>;
  items: ResolvedFeature[];
  showSectionHeader: boolean;
};

const resolveFeatureItem = (item: FeatureItem | Record<string, unknown>): ResolvedFeature => {
  const record = item as Record<string, unknown>;
  const igql = item as FeatureItem;

  return {
    title: normalizeTextField(
      igql.featureTitle?.jsonValue ??
        pickSdkField(record, 'featureTitle', 'FeatureTitle', 'title', 'Title')
    ),
    description: normalizeRichTextField(
      igql.featureDescription?.jsonValue ??
        pickSdkField(
          record,
          'featureDescription',
          'FeatureDescription',
          'description',
          'Description'
        )
    ),
    image: normalizeImageField(
      igql.featureImage?.jsonValue ??
        pickSdkField(record, 'featureImage', 'FeatureImage', 'image', 'Image')
    ),
    link: normalizeLinkField(
      igql.featureLink?.jsonValue ??
        pickSdkField(record, 'featureLink', 'FeatureLink', 'link', 'Link')
    ),
  };
};

const resolveFeatures = (fields: Fields): ResolvedFeatures => {
  const gql = fields?.data?.datasource;
  const ds = getDatasource(fields);

  const sectionTitle = normalizeTextField(
    gql?.title?.jsonValue ?? pickSdkField<Field<string>>(ds, 'title', 'Title')
  );
  const sectionDescription = normalizeRichTextField(
    gql?.description?.jsonValue ?? pickSdkField<RichTextField>(ds, 'description', 'Description')
  );

  const rawResults = gql?.children?.results ?? [];
  const items =
    rawResults.length > 0
      ? rawResults.map((item) => resolveFeatureItem(item))
      : sectionTitle || sectionDescription
        ? [{ title: sectionTitle, description: sectionDescription }]
        : [];

  return {
    sectionTitle,
    sectionDescription,
    items,
    showSectionHeader: rawResults.length > 0,
  };
};

type FeatureWrapperProps = {
  props: FeaturesProps;
  children: React.ReactNode;
};

const FeatureWrapper = (wrapperProps: FeatureWrapperProps) => {
  const id = wrapperProps.props.params.RenderingIdentifier;

  return (
    <section className={`${wrapperProps.props.params.styles}`} id={id ? id : undefined}>
      {wrapperProps.children}
    </section>
  );
};

const FeatureLink = ({
  field,
  children,
  isPageEditing,
}: {
  field?: LinkField;
  children: React.ReactNode;
  isPageEditing: boolean;
}) => {
  if (!field && !isPageEditing) return <div>{children}</div>;
  if (!hasLinkValue(field)) return <div>{children}</div>;

  if (isPageEditing) {
    const normalized = normalizeLinkField(field) ?? {
      value: { href: linkHref(field, '#'), text: linkLabel(field, 'Learn more') },
    };
    return <Link field={normalized}>{children}</Link>;
  }

  return (
    <a href={linkHref(field, '#')} className="block no-underline">
      {children}
    </a>
  );
};

const FeatureCardContent = ({
  feature,
  isPageEditing,
}: {
  feature: ResolvedFeature;
  isPageEditing: boolean;
}) => {
  const title = textFieldValue(feature.title);
  const description = richTextFieldValue(feature.description);
  const imageSrc = feature.image?.value?.src;

  return (
    <>
      {(imageSrc || isPageEditing) &&
        (isPageEditing ? (
          <div className="group mb-7 aspect-square w-full overflow-hidden transition-transform duration-300">
            <Image
              field={feature.image}
              className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </div>
        ) : imageSrc ? (
          <div className="group mb-7 aspect-square w-full overflow-hidden transition-transform duration-300">
            <img
              src={imageSrc}
              alt={imageAltValue(feature.image)}
              className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </div>
        ) : null)}

      {(title || isPageEditing) && (
        <h3 className="text-2xl md:text-3xl">
          {isPageEditing ? <Text field={feature.title} /> : title}
        </h3>
      )}

      {(description || isPageEditing) && (
        <p className="mt-2 text-base md:text-lg">
          {isPageEditing ? (
            <Text field={feature.description as Field<string>} />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: description }} />
          )}
        </p>
      )}
    </>
  );
};

export const Default = (props: FeaturesProps) => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const { sectionTitle, sectionDescription, items, showSectionHeader } = resolveFeatures(
    props.fields
  );
  const heading = textFieldValue(sectionTitle);
  const intro = richTextFieldValue(sectionDescription);

  return (
    <FeatureWrapper props={props}>
      <div className="container py-10 lg:py-16">
        {showSectionHeader && (heading || intro || isPageEditing) && (
          <div className="mb-10">
            {(heading || isPageEditing) && (
              <h2 className="text-4xl md:text-5xl">
                {isPageEditing ? <Text field={sectionTitle} /> : heading}
              </h2>
            )}
            {(intro || isPageEditing) && (
              <p className="mt-2 text-base">
                {isPageEditing ? (
                  <Text field={sectionDescription as Field<string>} />
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: intro }} />
                )}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {items.map((item, index) => (
            <div key={index}>
              <FeatureLink field={item.link} isPageEditing={isPageEditing}>
                <FeatureCardContent feature={item} isPageEditing={isPageEditing} />
              </FeatureLink>
            </div>
          ))}
        </div>
      </div>
    </FeatureWrapper>
  );
};

export const FourColGrid = (props: FeaturesProps) => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const { items } = resolveFeatures(props.fields);

  return (
    <FeatureWrapper props={props}>
      <div className="container grid grid-cols-1 gap-15 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {items.map((item, index) => {
          const title = textFieldValue(item.title);
          const description = richTextFieldValue(item.description);

          return (
            <div key={index} className="flex flex-col justify-center">
              {(title || isPageEditing) && (
                <h3 className="text-xl font-bold">
                  {isPageEditing ? <Text field={item.title} /> : title}
                </h3>
              )}

              {(description || isPageEditing) && (
                <p className="mt-2 text-base">
                  {isPageEditing ? (
                    <Text field={item.description as Field<string>} />
                  ) : (
                    <span dangerouslySetInnerHTML={{ __html: description }} />
                  )}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </FeatureWrapper>
  );
};
