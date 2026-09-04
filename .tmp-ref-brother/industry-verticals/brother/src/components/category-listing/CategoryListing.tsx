'use client';

import React, { useState } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  TextField,
  NextImage,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { ComponentProps } from '@/lib/component-props';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';

interface CategoryItem {
  id: string;
  name: string;
  title: { jsonValue: Field<string> };
  description: { jsonValue: Field<string> };
  image: { jsonValue: ImageField };
  link: { jsonValue: LinkField };
  category: { jsonValue: Field<string> };
  url: { path: string };
}

interface Fields {
  Title: TextField;
  Description: TextField;
  data: {
    contextItem: {
      children: {
        results: CategoryItem[];
      };
    };
  };
}

interface CategoryListingProps extends ComponentProps {
  fields: Fields;
}

// Category Card Component
const CategoryCard = ({
  item,
  url,
}: {
  item: {
    title: Field<string>;
    description: Field<string>;
    image: ImageField;
  };
  url: string;
}) => {
  return (
    <Link href={url} className="brother-category-card block">
      <div className="brother-category-image">
        <NextImage field={item.image} className="h-full w-full object-contain" />
      </div>
      <div className="brother-category-content">
        <h3 className="brother-category-title">
          <Text field={item.title} />
        </h3>
        {item.description?.value && (
          <p className="brother-category-description">
            <Text field={item.description} />
          </p>
        )}
        <span className="brother-category-cta">
          View range <ArrowRight className="ml-2 h-4 w-4" />
        </span>
      </div>
    </Link>
  );
};

// Main Category Listing Component
export const Default = ({ params, fields }: CategoryListingProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;

  if (!fields?.data?.contextItem?.children?.results) {
    return page.mode.isEditing ? (
      <div className={`component category-listing ${styles}`} id={id}>
        [CATEGORY LISTING - No categories found]
      </div>
    ) : null;
  }

  const categories = fields.data.contextItem.children.results
    .filter((item) => Object.keys(item).length > 0)
    .map((item) => ({
      id: item.id,
      title: item.title.jsonValue,
      description: item.description?.jsonValue,
      image: item.image.jsonValue,
      url: item.url.path,
    }));

  return (
    <section className={`component category-listing brother-section ${styles}`} id={id}>
      <div className="brother-container">
        {/* Header */}
        {(fields.Title?.value || fields.Description?.value) && (
          <div className="mx-auto mb-10 max-w-3xl text-center">
            {fields.Title?.value && (
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                <Text field={fields.Title} />
              </h2>
            )}
            {fields.Description?.value && (
              <p className="text-foreground-light text-lg">
                <Text field={fields.Description} />
              </p>
            )}
          </div>
        )}

        {/* Category Grid */}
        <div className="brother-category-grid">
          {categories.map((category) => (
            <CategoryCard key={category.id} item={category} url={category.url} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Variant: With Filter Pills (like Brother printer categories)
export const WithFilters = ({ params, fields }: CategoryListingProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const [activeFilter, setActiveFilter] = useState<string>('all');

  if (!fields?.data?.contextItem?.children?.results) {
    return page.mode.isEditing ? (
      <div className={`component category-listing-filters ${styles}`} id={id}>
        [CATEGORY LISTING WITH FILTERS - No categories found]
      </div>
    ) : null;
  }

  const categories = fields.data.contextItem.children.results
    .filter((item) => Object.keys(item).length > 0)
    .map((item) => ({
      id: item.id,
      title: item.title.jsonValue,
      description: item.description?.jsonValue,
      image: item.image.jsonValue,
      category: item.category?.jsonValue?.value || 'Uncategorized',
      url: item.url.path,
    }));

  // Get unique categories for filter pills
  const uniqueCategories = ['all', ...new Set(categories.map((c) => c.category))];

  // Filter categories based on active filter
  const filteredCategories =
    activeFilter === 'all' ? categories : categories.filter((c) => c.category === activeFilter);

  return (
    <section className={`component category-listing-filters brother-section ${styles}`} id={id}>
      <div className="brother-container">
        {/* Header */}
        {(fields.Title?.value || fields.Description?.value) && (
          <div className="mb-8">
            {fields.Title?.value && (
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                <Text field={fields.Title} />
              </h2>
            )}
            {fields.Description?.value && (
              <p className="text-foreground-light text-lg">
                <Text field={fields.Description} />
              </p>
            )}
          </div>
        )}

        {/* Filter Pills */}
        <div className="brother-category-pills">
          {uniqueCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={clsx('brother-category-pill', activeFilter === category && 'active')}
              onClick={() => setActiveFilter(category)}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>

        {/* Category Grid */}
        <div className="brother-category-grid">
          {filteredCategories.map((category) => (
            <CategoryCard key={category.id} item={category} url={category.url} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Variant: Featured Categories (2 large, rest smaller)
export const Featured = ({ params, fields }: CategoryListingProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;

  if (!fields?.data?.contextItem?.children?.results) {
    return page.mode.isEditing ? (
      <div className={`component category-listing-featured ${styles}`} id={id}>
        [FEATURED CATEGORY LISTING - No categories found]
      </div>
    ) : null;
  }

  const categories = fields.data.contextItem.children.results
    .filter((item) => Object.keys(item).length > 0)
    .map((item) => ({
      id: item.id,
      title: item.title.jsonValue,
      description: item.description?.jsonValue,
      image: item.image.jsonValue,
      url: item.url.path,
    }));

  const [featured, ...rest] = categories;
  const secondFeatured = rest.shift();

  return (
    <section className={`component category-listing-featured brother-section ${styles}`} id={id}>
      <div className="brother-container">
        {/* Header */}
        {fields.Title?.value && (
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
            <Text field={fields.Title} />
          </h2>
        )}

        {/* Featured Categories */}
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          {featured && (
            <Link href={featured.url} className="brother-category-card block">
              <div className="bg-background-muted aspect-[16/9] overflow-hidden">
                <NextImage
                  field={featured.image}
                  className="h-full w-full object-contain p-8 transition-transform group-hover:scale-105"
                />
              </div>
              <div className="brother-category-content">
                <h3 className="text-foreground group-hover:text-accent mb-2 text-2xl font-bold">
                  <Text field={featured.title} />
                </h3>
                {featured.description?.value && (
                  <p className="text-foreground-light">
                    <Text field={featured.description} />
                  </p>
                )}
              </div>
            </Link>
          )}

          {secondFeatured && (
            <Link href={secondFeatured.url} className="brother-category-card block">
              <div className="bg-background-muted aspect-[16/9] overflow-hidden">
                <NextImage
                  field={secondFeatured.image}
                  className="h-full w-full object-contain p-8 transition-transform group-hover:scale-105"
                />
              </div>
              <div className="brother-category-content">
                <h3 className="text-foreground group-hover:text-accent mb-2 text-2xl font-bold">
                  <Text field={secondFeatured.title} />
                </h3>
                {secondFeatured.description?.value && (
                  <p className="text-foreground-light">
                    <Text field={secondFeatured.description} />
                  </p>
                )}
              </div>
            </Link>
          )}
        </div>

        {/* Rest of Categories */}
        {rest.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {rest.map((category) => (
              <CategoryCard key={category.id} item={category} url={category.url} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Default;
