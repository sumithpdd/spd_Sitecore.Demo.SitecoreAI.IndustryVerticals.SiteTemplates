'use client';

import { JSX, useState } from 'react';
import { Field, ImageField, Text, Image, useSitecore } from '@sitecore-content-sdk/nextjs';
import { useRouter } from 'next/router';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import { categoriesForPath, type BrotherCategoryCard } from 'lib/categories-catalog';
import { fieldText, imageSrc } from 'lib/cms-fields';

type Fields = {
  Title?: Field<string>;
  Description?: Field<string>;
  /** Optional GraphQL shape from reference CategoryListing */
  data?: {
    contextItem?: {
      children?: {
        results?: Array<{
          id?: string;
          title?: { jsonValue?: Field<string> };
          description?: { jsonValue?: Field<string> };
          image?: { jsonValue?: ImageField };
          url?: { path?: string };
          category?: { jsonValue?: Field<string> };
        }>;
      };
    };
  };
};

type Props = ComponentProps & { fields?: Fields };

type CardView = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageField?: ImageField;
  filter: string;
};

function fromCatalog(cards: BrotherCategoryCard[]): CardView[] {
  return cards.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    href: c.href,
    image: brotherImages[c.imageKey],
    filter: c.filter || 'All',
  }));
}

function fromGraphQl(fields: Fields): CardView[] {
  const results = fields.data?.contextItem?.children?.results || [];
  return results
    .filter((item) => item && Object.keys(item).length > 0)
    .map((item, i) => ({
      id: item.id || `cat-${i}`,
      title: fieldText(item.title?.jsonValue, 'Category'),
      description: fieldText(item.description?.jsonValue),
      href: item.url?.path || '#',
      image: imageSrc(item.image?.jsonValue, brotherImages.labellingTile),
      imageField: item.image?.jsonValue,
      filter: fieldText(item.category?.jsonValue, 'All'),
    }));
}

function CategoryGrid({
  cards,
  title,
  description,
  titleField,
  descriptionField,
  isEditing,
  withFilters,
}: {
  cards: CardView[];
  title: string;
  description: string;
  titleField?: Field<string>;
  descriptionField?: Field<string>;
  isEditing: boolean;
  withFilters?: boolean;
}): JSX.Element {
  const filters = Array.from(new Set(['all', ...cards.map((c) => c.filter.toLowerCase())]));
  const [active, setActive] = useState('all');
  const visible =
    !withFilters || active === 'all'
      ? cards
      : cards.filter((c) => c.filter.toLowerCase() === active);

  return (
    <section className="brother-category-listing">
      <div className="brother-container">
        {(title || description || isEditing) && (
          <div className="brother-category-listing__intro">
            {titleField?.value || isEditing ? (
              <Text field={titleField} tag="h2" />
            ) : title ? (
              <h2>{title}</h2>
            ) : null}
            {descriptionField?.value || isEditing ? (
              <Text field={descriptionField} tag="p" />
            ) : description ? (
              <p>{description}</p>
            ) : null}
          </div>
        )}
        {withFilters ? (
          <div className="brother-category-listing__filters" role="tablist">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className={
                  active === f
                    ? 'brother-category-listing__filter is-active'
                    : 'brother-category-listing__filter'
                }
                onClick={() => setActive(f)}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
        ) : null}
        <div className="brother-category-listing__grid">
          {visible.map((card) => (
            <a className="brother-category-card" href={card.href} key={card.id}>
              <div className="brother-category-card__media">
                {card.imageField?.value?.src || isEditing ? (
                  <Image field={card.imageField} />
                ) : (
                  <img src={card.image} alt="" />
                )}
              </div>
              <div className="brother-category-card__body">
                <h3>{card.title}</h3>
                {card.description ? <p>{card.description}</p> : null}
                <span className="brother-category-card__cta">View range</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Category discovery grid — GraphQL children when present, else categories-catalog by route.
 */
export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const f = props.fields || {};
  const gqlCards = fromGraphQl(f);
  const cards =
    gqlCards.length > 0 ? gqlCards : fromCatalog(categoriesForPath(router.asPath || ''));
  const title = fieldText(f.Title, 'Browse categories');
  const description = fieldText(f.Description, '');

  if (!cards.length && !isEditing) return <></>;

  return (
    <CategoryGrid
      cards={cards}
      title={title}
      description={description}
      titleField={f.Title}
      descriptionField={f.Description}
      isEditing={isEditing}
    />
  );
};

export const WithFilters = (props: Props): JSX.Element => {
  const router = useRouter();
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const f = props.fields || {};
  const gqlCards = fromGraphQl(f);
  const cards =
    gqlCards.length > 0 ? gqlCards : fromCatalog(categoriesForPath(router.asPath || ''));
  const title = fieldText(f.Title, 'Filter the range');
  const description = fieldText(f.Description, '');

  return (
    <CategoryGrid
      cards={cards}
      title={title}
      description={description}
      titleField={f.Title}
      descriptionField={f.Description}
      isEditing={isEditing}
      withFilters
    />
  );
};

export default Default;
