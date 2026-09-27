'use client';

import { JSX, useContext, useEffect, useMemo, useState } from 'react';
import {
  RichText,
  RichTextField,
  SitecoreProviderReactContext,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { useRouter } from 'next/router';
import { BODY_FITS, cidFromQuery, STORY, type BodyFit } from '@/lib/asos-journey';
import {
  categoryFromPath,
  getProduct,
  PRODUCTS,
  productFromPath,
  productsForCid,
  type Product,
} from '@/lib/product-catalog';
import { MARKETS, parseMarketPath } from '@/lib/asos-market';
import { AsosProductCard } from '@/components/non-sitecore/AsosProductCard';
import { textField, useRouteFields } from '@/lib/route-fields';
import { readProfile } from '@/lib/asos-profile';
import { isBroken } from '@/lib/asos-demo';
import { Breadcrumb } from '@/components/breadcrumb/Breadcrumb';

type TargetItem = {
  name?: string;
  url?: string | { path?: string };
  productId?: { value?: string };
  fields?: { ProductId?: { value?: string } };
};

type ListingFields = {
  Title?: TextField;
  Intro?: RichTextField;
  Products?: { value?: string | TargetItem[] };
  data?: {
    listing?: { products?: { targetItems?: TargetItem[] } };
    contextItem?: { products?: { targetItems?: TargetItem[] } };
  };
};

type Props = ComponentProps & { fields?: ListingFields; listingPath?: string };

const DENIM_INTRO =
  'Wide-leg jeans under £50. Filter by body fit — petite, tall, plus, maternity, standard.';

function asText(field: unknown): TextField | undefined {
  if (!field || typeof field !== 'object' || !('value' in field)) return undefined;
  const value = (field as TextField).value;
  return typeof value === 'string' || typeof value === 'number' ? (field as TextField) : undefined;
}

function asRich(field: unknown): RichTextField | undefined {
  if (!field || typeof field !== 'object' || !('value' in field)) return undefined;
  return typeof (field as RichTextField).value === 'string' ? (field as RichTextField) : undefined;
}

function stringValue(field: unknown): string {
  if (typeof field === 'string') return field;
  if (field && typeof field === 'object' && 'value' in field) {
    const value = (field as { value?: unknown }).value;
    return typeof value === 'string' ? value : '';
  }
  return '';
}

function targetItems(field: unknown): TargetItem[] {
  if (Array.isArray(field)) return field as TargetItem[];
  if (field && typeof field === 'object' && Array.isArray((field as { value?: unknown }).value)) {
    return (field as { value: TargetItem[] }).value;
  }
  if (field && typeof field === 'object' && 'targetItems' in field) {
    const items = (field as { targetItems?: TargetItem[] }).targetItems;
    return items || [];
  }
  return [];
}

function productFromTarget(item: TargetItem): Product | undefined {
  const id = item.productId?.value || item.fields?.ProductId?.value || '';
  if (/^\d{5,}$/.test(id)) {
    const found = getProduct(id);
    if (found) return found;
  }
  const url = typeof item.url === 'string' ? item.url : item.url?.path || '';
  if (url) {
    const found = productFromPath(url);
    if (found) return found;
  }
  return item.name ? productFromPath(`/products/${item.name}`) : undefined;
}

function uniqueProducts(items: Array<Product | undefined>): Product[] {
  const seen = new Set<string>();
  const products: Product[] = [];
  items.forEach((item) => {
    if (!item || seen.has(item.id)) return;
    seen.add(item.id);
    products.push(item);
  });
  return products;
}

/** Picked products from the listing Treelist. Empty means the category catalogue. */
function selectedProducts(fields: ListingFields | undefined, routeProducts: unknown): Product[] {
  const queried = [
    ...(fields?.data?.listing?.products?.targetItems || []),
    ...(fields?.data?.contextItem?.products?.targetItems || []),
  ];
  const listed = [...targetItems(fields?.Products), ...targetItems(routeProducts)];
  const fromItems = uniqueProducts([...queried, ...listed].map(productFromTarget));
  if (fromItems.length) return fromItems;

  const raw = stringValue(fields?.Products) || stringValue(routeProducts);
  return uniqueProducts(
    raw
      .split(/[^0-9]+/)
      .filter((id) => id.length >= 5)
      .map((id) => getProduct(id))
  );
}

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const sitecore = useContext(SitecoreProviderReactContext);
  const isEditing = Boolean(sitecore?.page?.mode?.isEditing);
  const routed = parseMarketPath(props.listingPath || router.asPath);
  const { market } = parseMarketPath(router.asPath);
  const path = props.listingPath || routed.path;
  const route = useRouteFields();
  const queryCid = cidFromQuery(router.asPath) || cidFromQuery(props.listingPath || '');
  const category = categoryFromPath(path, queryCid);
  const cid =
    textField(route.CategoryId) ||
    queryCid ||
    (category && 'cid' in category && category.cid ? String(category.cid) : '');
  const [fit, setFit] = useState<BodyFit | ''>('');
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const profile = readProfile();
    setSignedIn(Boolean(profile?.signedIn));
    if (profile?.bodyFit) setFit(profile.bodyFit);
  }, []);

  const titleField = asText(props.fields?.Title) || asText(route.Title);
  const introField = asRich(props.fields?.Intro) || asRich(route.Intro);
  const title =
    (typeof titleField?.value === 'string' ? titleField.value : '') ||
    textField(route.Title) ||
    (category && 'title' in category ? category.title : undefined) ||
    path.replace(/\//g, ' ').trim();
  const introHtml = typeof introField?.value === 'string' ? introField.value.trim() : '';

  const items = useMemo(() => {
    const picked = selectedProducts(props.fields, route.Products);
    const base = picked.length ? picked : cid ? productsForCid(cid) : PRODUCTS;
    return fit ? base.filter((item) => item.bodyFit.includes(fit)) : base;
  }, [cid, fit, props.fields, route.Products]);

  const broken = isBroken(router.asPath);
  const brandCopy = cid === '29299' ? MARKETS[market.code].topshopCopy : undefined;
  const showDenimCopy = cid === STORY.denimDropCid || cid === STORY.trendsDenimCid;
  const showFit = signedIn || Boolean(category && 'facetFit' in category && category.facetFit);

  return (
    <section className="asos-wrap py-6" id={props.params?.RenderingIdentifier}>
      <Breadcrumb path={path} title={title} market={market.code} />
      <p className="asos-tags">
        {broken ? (
          <span className="asos-chip">Denim</span>
        ) : (
          <>
            <span className="asos-chip">Women</span>
            <span className="asos-chip">
              {MARKETS[market.code].label} · {title}
            </span>
          </>
        )}
      </p>
      {titleField && (titleField.value || isEditing) ? (
        <h1 className="text-3xl font-bold">
          <Text field={titleField} />
        </h1>
      ) : (
        <h1 className="text-3xl font-bold">{title}</h1>
      )}
      {introField && (introHtml || isEditing) ? (
        <div className="mt-2 max-w-2xl text-sm">
          <RichText field={introField} />
        </div>
      ) : brandCopy ? (
        <p className="mt-2 max-w-2xl text-sm">{brandCopy}</p>
      ) : showDenimCopy ? (
        <p className="mt-2 max-w-2xl text-sm">{DENIM_INTRO}</p>
      ) : null}
      {signedIn && fit ? (
        <p className="mt-2 text-sm">Showing your fit: {fit === 'plus' ? 'curve' : fit}</p>
      ) : null}
      <p className="mt-1 text-sm text-[#666]">{items.length} styles</p>

      {showFit ? (
        <div className="asos-facets" aria-label="Body fit">
          <button type="button" className={!fit ? 'is-on' : undefined} onClick={() => setFit('')}>
            All
          </button>
          {BODY_FITS.map((item) => (
            <button
              key={item}
              type="button"
              className={fit === item ? 'is-on' : undefined}
              onClick={() => setFit(item)}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((product) => (
          <AsosProductCard key={product.id} product={product} market={market.code} />
        ))}
      </div>
    </section>
  );
};

export default Default;
