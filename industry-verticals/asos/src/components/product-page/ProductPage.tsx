'use client';

import { JSX, useContext, useEffect, useState } from 'react';
import {
  RichText,
  SitecoreProviderReactContext,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import { Heart, Minus, Plus, RotateCcw, Tag, Truck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { formatMoney, parseMarketPath, sizeLabel, withMarket } from '@/lib/asos-market';
import { isSaved, toggleSave } from '@/lib/asos-save';
import { addToBag } from '@/lib/asos-bag';
import { STORY } from '@/lib/asos-journey';
import { imageFieldSrc, textField, useRouteFields } from '@/lib/route-fields';
import {
  matchCatalogSize,
  readProfile,
  productMissesSize,
  shopperIsLoggedIn,
  shopperUkSize,
  sizeFromProfile,
  sizeOutOfStock,
  SOLD_OUT_BADGE,
  type FitProfile,
} from '@/lib/asos-profile';
import { recordProductView } from '@/lib/cdp/session-affinity';
import { HERO_PRODUCT, productFromPath, productImage, type Product } from '@/lib/product-catalog';
import { parseSizeField } from '@/lib/product-fields';
import ProductFieldEditor from '@/lib/product-field-editor';
import YouMightAlsoLike from '@/components/you-might-also-like/YouMightAlsoLike';
import BuyTheLook from '@/components/buy-the-look/BuyTheLook';
import PeopleAlsoBought from '@/components/people-also-bought/PeopleAlsoBought';
import RecentlyViewed from '@/components/recently-viewed/RecentlyViewed';
import YourStyle from '@/components/your-style/YourStyle';

type Props = ComponentProps & { fields?: { Title?: TextField }; listingPath?: string };

const linesOf = (value: string): string[] =>
  value
    .split(/\n+/)
    .map((line) => line.replace(/^[-•]\s*/, '').trim())
    .filter(Boolean);

/** Studio swatch for the colour name. One colourway per product. */
function swatchColour(name: string): string {
  const text = name.toLowerCase();
  if (text.includes('black')) return '#1a1a1a';
  if (text.includes('white') || text.includes('cream') || text.includes('oat')) return '#f4f0e6';
  if (text.includes('chocolate') || text.includes('mink') || text.includes('brown'))
    return '#6b4423';
  if (text.includes('green')) return '#3e5c46';
  if (text.includes('red') || text.includes('cherry')) return '#8b2e2e';
  if (text.includes('pink')) return '#d7a0a8';
  if (text.includes('grey') || text.includes('gray')) return '#8a8a8a';
  if (text.includes('navy') || text.includes('indigo')) return '#1c2740';
  if (text.includes('wash') || text.includes('blue') || text.includes('denim')) return '#7f97b5';
  return '#d0d0d0';
}

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const routed = parseMarketPath(props.listingPath || router.asPath);
  const { market } = parseMarketPath(router.asPath);
  const path = props.listingPath || routed.path;
  const product = productFromPath(path) || HERO_PRODUCT;
  const route = useRouteFields();
  const cmsTitle = textField(route.Title);
  const cmsBrand = textField(route.Brand);
  const cmsPrice = Number(textField(route.Price));
  const cmsColour = textField(route.Colour);
  const cmsVideo = textField(route.Video);
  const cmsImage = imageFieldSrc(route.Image);
  const payCopy = textField(route.PayCopy);
  const promoCopy = textField(route.PromoCopy);
  const sizeFit = textField(route.SizeFit);
  const detailsCopy = textField(route.Details);
  const composition = textField(route.Composition);
  const brandStory = textField(route.BrandStory);
  const deliveryCopy = textField(route.DeliveryCopy);
  const sizeField = textField(route.Size);
  const cmsSizes = parseSizeField(sizeField);
  const sizes = cmsSizes.length ? cmsSizes : product.sizes;
  const sitecore = useContext(SitecoreProviderReactContext);
  const isEditing = Boolean(sitecore?.page?.mode?.isEditing);
  const showFields = isEditing || router.asPath.includes('fields=1');
  const pageId = String(sitecore?.page?.layout?.sitecore?.route?.itemId || '');
  const priceGbp = Number.isFinite(cmsPrice) && cmsPrice > 0 ? cmsPrice : product.priceGbp;
  const photo = cmsImage || productImage(product);
  const photoAlt = imageFieldSrc(route.Image2);
  const title = cmsTitle || product.title;
  const colour = cmsColour || product.color;
  const brand = cmsBrand || product.brand;
  const videoSrc = cmsVideo || product.videoSrc || '';
  const instalment = formatMoney(priceGbp / 3, market.code);
  const saves = (Number(product.id.replace(/\D/g, '').slice(-3)) % 180) + 24;
  const brandHref = brand === 'Topshop' ? STORY.topshopHref : STORY.trendsDenimHref;
  const bullets = linesOf(detailsCopy);
  const detailLines =
    bullets.length > 0
      ? bullets
      : [product.sellingLine, product.fabric, product.fitFeedback].filter((line): line is string =>
          Boolean(line)
        );
  const deliveryLines = linesOf(deliveryCopy);
  const isThin = router.asPath.includes('pdp=thin');

  const [size, setSize] = useState('');
  const [sizeError, setSizeError] = useState('');
  const [saved, setSaved] = useState(false);
  const [openSection, setOpenSection] = useState('details');
  const [profile, setProfile] = useState<FitProfile | null>(null);
  const [notInSize, setNotInSize] = useState(false);
  const [soldOutInSize, setSoldOutInSize] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [yourSize, setYourSize] = useState('');

  useEffect(() => {
    setSaved(isSaved(product.id));
    setOpenSection('details');
    setProfile(readProfile());
    const uk = shopperUkSize(router.asPath);
    const known = shopperIsLoggedIn(router.asPath);
    const soldOut = sizeOutOfStock(product.outOfStockSizes, uk);
    const run = parseSizeField(sizeField);
    const active = run.length ? run : product.sizes;
    const kept = matchCatalogSize(active, uk);
    setYourSize(uk);
    setLoggedIn(known);
    setSoldOutInSize(known && soldOut);
    setNotInSize(productMissesSize(active, uk));
    setSize(known && kept && !soldOut ? kept : '');
    setSizeError('');
    recordProductView(product);
  }, [product, router.asPath, sizeField]);

  const applyFit = () => {
    const matched = sizeFromProfile(sizes, readProfile());
    if (matched && !sizeOutOfStock(product.outOfStockSizes, matched)) {
      setSize(matched);
      setSizeError('');
    }
  };

  const bag = (item: Product, picked: string) => {
    if (!picked) {
      setSizeError('Please select a size');
      return;
    }
    setSizeError('');
    addToBag(item, sizeLabel(picked, market.code));
  };

  const toggleSection = (key: string) => {
    setOpenSection((current) => (current === key ? '' : key));
  };

  const sections = [
    {
      key: 'fit',
      label: 'Size & Fit',
      body: sizeFit ? (
        <p>{sizeFit}</p>
      ) : (
        <>
          <p>Model&apos;s height: {product.modelHeight}</p>
          <p>Model is wearing: {product.sizeWorn}</p>
        </>
      ),
    },
    {
      key: 'details',
      label: 'Product Details',
      body: (
        <>
          <p>
            <Link href={withMarket(brandHref, market.code)}>{brand}</Link>
          </p>
          <ul>
            {detailLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p>Product Code: {textField(route.ProductId) || product.id}</p>
        </>
      ),
    },
    {
      key: 'brand',
      label: 'Brand',
      body: (
        <p>{brandStory || `${brand} at ASOS. ${product.sellingLine || product.fitFeedback}`}</p>
      ),
    },
    {
      key: 'care',
      label: 'Look After Me',
      body: <p>{product.care}</p>,
    },
    {
      key: 'about',
      label: 'About Me',
      body: <p>{composition || `Main: ${product.fabric}`}</p>,
    },
  ];

  return (
    <div id={props.params?.RenderingIdentifier}>
      {showFields ? (
        <ProductFieldEditor
          pageId={pageId || product.id}
          affinities={textField(route.Affinities)}
          colour={colour}
          sizes={sizeField}
          fallbackSizes={sizes}
          sizeFieldPresent={'Size' in route}
        />
      ) : null}
      <article className="asos-wrap asos-pdp">
        <p className="asos-pdp__crumbs">
          <Link href={withMarket('/', market.code)}>Home</Link>
          <span aria-hidden="true">›</span>
          <Link href={withMarket(STORY.womenHref, market.code)}>Women</Link>
          <span aria-hidden="true">›</span>
          <Link href={withMarket(STORY.trendsDenimHref, market.code)}>Trends</Link>
          <span aria-hidden="true">›</span>
          <Link href={withMarket(STORY.trendsDenimHref, market.code)}>Denim</Link>
          <span aria-hidden="true">›</span>
          <span>{title}</span>
        </p>

        <div className="asos-pdp__grid">
          <div className="asos-pdp__media">
            <div className="asos-pdp__stage">
              {/* eslint-disable-next-line @next/next/no-img-element -- DAM or public still */}
              <img className="asos-pdp__photo" src={photo} alt={title} />
              {photoAlt ? <img className="asos-pdp__photo" src={photoAlt} alt={title} /> : null}
              <p className="asos-pdp__saves">
                {saves} <Heart className="size-3.5" />
              </p>
            </div>
            {videoSrc ? (
              <video
                className="asos-pdp__photo"
                controls
                playsInline
                preload="metadata"
                src={videoSrc}
              />
            ) : null}
            <p className="asos-pdp__model">
              MODEL&apos;S HEIGHT: {product.modelHeight} | MODEL IS WEARING: {product.sizeWorn}
            </p>
            {!isThin ? (
              <a className="asos-pdp__look" href="#buy-the-look">
                <Heart className="size-4" />
                Buy the look
              </a>
            ) : null}
          </div>

          <div className="asos-pdp__buy">
            {route.Title ? (
              <h1>
                <Text field={route.Title as TextField} />
              </h1>
            ) : (
              <h1>{title}</h1>
            )}
            <p className="asos-pdp__price">{formatMoney(priceGbp, market.code)}</p>
            {soldOutInSize ? (
              <p className="asos-badge mt-2">{SOLD_OUT_BADGE}</p>
            ) : notInSize ? (
              <p className="asos-badge mt-2">Not in your size</p>
            ) : null}
            <p className="asos-pdp__pay">
              {payCopy || (
                <>
                  Pay in 3 interest-free payments of {instalment} with <strong>PayPal</strong>
                </>
              )}
            </p>

            <div className="asos-pdp__offer">
              <Tag className="size-4 shrink-0" />
              {promoCopy ? (
                <RichText field={{ value: promoCopy }} />
              ) : (
                <p>
                  <strong>NEW HERE!</strong> Get 15% off + Free Next Day Delivery with code:{' '}
                  <strong>NEWHERE</strong>
                </p>
              )}
            </div>

            <div className="asos-pdp__colour">
              <p>
                <span>COLOUR:</span> {colour}
              </p>
              <span
                className="asos-pdp__swatch is-on"
                style={{ backgroundColor: swatchColour(colour) }}
                aria-hidden="true"
              />
            </div>
            {!isThin ? (
              <div className="asos-fit">
                <p className="asos-fit__title">Size guidance</p>
                <p>
                  {loggedIn && yourSize
                    ? soldOutInSize
                      ? `You kept a UK ${yourSize}. That size has sold out on this piece.`
                      : notInSize
                        ? `You kept a UK ${yourSize}. This piece is not cut in that size.`
                        : `You kept a UK ${yourSize} in ${brand}. We have selected it.`
                    : 'New here. Pick a size, or sign in and we will use the one you kept.'}
                </p>
                {router.asPath.match(/[?&]fit=([^&]+)/)?.[1] || profile?.bodyFit ? (
                  <p>
                    Body fit: {router.asPath.match(/[?&]fit=([^&]+)/)?.[1] || profile?.bodyFit}.
                  </p>
                ) : null}
                <p>True to size. One size, not three.</p>
                <table>
                  <caption className="sr-only">Size conversion</caption>
                  <thead>
                    <tr>
                      <th>UK</th>
                      <th>US</th>
                      <th>EU</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizes.map((uk) => {
                      const digits = String(uk).replace(/\D/g, '');
                      const n = digits ? Number(digits) : null;
                      const kept =
                        digits !== '' &&
                        (profile?.size || product.sizeWorn).replace(/\D/g, '') === digits;
                      return (
                        <tr key={uk} className={kept ? 'is-kept' : undefined}>
                          <td>{n ? `UK ${n}` : uk}</td>
                          <td>{n ? `US ${n + 4}` : '—'}</td>
                          <td>{n ? `EU ${n + 32}` : '—'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : null}
            <div className="asos-pdp__sizehead">
              <span>SIZE:</span>
              <button type="button" onClick={applyFit}>
                Size guide
              </button>
            </div>
            <div className="asos-pdp__sizes" role="listbox" aria-label="Size">
              {sizes.map((uk) => {
                const gone = sizeOutOfStock(product.outOfStockSizes, uk);
                return (
                  <button
                    key={uk}
                    type="button"
                    role="option"
                    aria-selected={size === uk}
                    aria-disabled={gone}
                    disabled={gone}
                    className={gone ? 'is-out' : size === uk ? 'is-on' : undefined}
                    onClick={() => {
                      if (gone) return;
                      setSize(uk);
                      setSizeError('');
                    }}
                  >
                    {sizeLabel(uk, market.code)}
                  </button>
                );
              })}
            </div>
            {sizeError ? <p className="asos-pdp__size-error">{sizeError}</p> : null}

            <div className="asos-pdp__bag">
              <button type="button" className="asos-pdp__add" onClick={() => bag(product, size)}>
                ADD TO BAG
              </button>
              <button
                type="button"
                className={`asos-pdp__save ${saved ? 'is-on' : ''}`}
                onClick={() =>
                  setSaved(
                    toggleSave(product, size ? sizeLabel(size, market.code) : product.sizeWorn)
                  )
                }
                aria-label="Save"
                aria-pressed={saved}
              >
                <Heart className="size-5" fill={saved ? 'currentColor' : 'none'} />
              </button>
            </div>

            {!isThin ? (
              <>
                <ul className="asos-pdp__delivery">
                  {(deliveryLines.length > 0
                    ? deliveryLines
                    : [
                        'Free delivery on orders over £40.00.',
                        'Standard delivery £4.50',
                        'Free returns on qualifying orders.',
                      ]
                  ).map((line, index) => (
                    <li key={line}>
                      {index === 0 ? (
                        <Truck className="size-4" />
                      ) : (
                        <RotateCcw className="size-4" />
                      )}
                      {line}
                    </li>
                  ))}
                  <li>
                    <a href={withMarket(STORY.accountHref, market.code)}>
                      View Delivery & Returns rates
                    </a>
                  </li>
                </ul>

                <div className="asos-acc">
                  {sections.map((section) => {
                    const expanded = openSection === section.key;
                    return (
                      <div key={section.key}>
                        <button
                          type="button"
                          aria-expanded={expanded}
                          onClick={() => toggleSection(section.key)}
                        >
                          {section.label}
                          {expanded ? <Minus className="size-4" /> : <Plus className="size-4" />}
                        </button>
                        {expanded ? <div>{section.body}</div> : null}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </article>
      {!isThin ? (
        <>
          <YouMightAlsoLike rendering={props.rendering} params={{}} />
          <BuyTheLook rendering={props.rendering} params={{}} />
          <PeopleAlsoBought rendering={props.rendering} params={{}} />
          <RecentlyViewed rendering={props.rendering} params={{}} />
          <YourStyle rendering={props.rendering} params={{}} />
        </>
      ) : null}
    </div>
  );
};

export default Default;
