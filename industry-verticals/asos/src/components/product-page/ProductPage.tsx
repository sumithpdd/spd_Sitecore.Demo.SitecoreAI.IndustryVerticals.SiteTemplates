'use client';

import { JSX, useEffect, useState } from 'react';
import { RichText, Text, TextField } from '@sitecore-content-sdk/nextjs';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Play,
  Plus,
  RotateCcw,
  Tag,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { formatMoney, parseMarketPath, sizeLabel, withMarket } from '@/lib/asos-market';
import { isSaved, toggleSave } from '@/lib/asos-save';
import { addToBag } from '@/lib/asos-bag';
import { STORY } from '@/lib/asos-journey';
import { imageFieldSrc, textField, useRouteFields } from '@/lib/route-fields';
import { readProfile, sizeFromProfile } from '@/lib/asos-profile';
import { recordProductView } from '@/lib/cdp/session-affinity';
import { HERO_PRODUCT, productFromPath, productGallery, type Product } from '@/lib/product-catalog';
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
  const priceGbp = Number.isFinite(cmsPrice) && cmsPrice > 0 ? cmsPrice : product.priceGbp;
  const gallery = productGallery(product).map((src, index) =>
    index === 0 && cmsImage ? cmsImage : src
  );
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

  const [active, setActive] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [size, setSize] = useState('');
  const [sizeError, setSizeError] = useState('');
  const [saved, setSaved] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(true);

  useEffect(() => {
    setSaved(isSaved(product.id));
    setActive(0);
    setShowVideo(false);
    setSize('');
    recordProductView(product);
  }, [product]);

  const applyFit = () => {
    const matched = sizeFromProfile(product.sizes, readProfile());
    if (matched) {
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

  const shift = (step: number) => {
    setShowVideo(false);
    setActive((current) => (current + step + gallery.length) % gallery.length);
  };

  return (
    <div id={props.params?.RenderingIdentifier}>
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
          <div className="asos-pdp__rail">
            {gallery.map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                className={!showVideo && index === active ? 'is-on' : undefined}
                onClick={() => {
                  setShowVideo(false);
                  setActive(index);
                }}
                aria-label={`Image ${index + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- DAM or public still */}
                <img src={src} alt="" />
              </button>
            ))}
            {videoSrc ? (
              <button
                type="button"
                className={showVideo ? 'is-on asos-pdp__tool' : 'asos-pdp__tool'}
                onClick={() => setShowVideo(true)}
              >
                <Play className="size-4" />
                Video
              </button>
            ) : null}
            <a className="asos-pdp__tool" href="#buy-the-look">
              <Heart className="size-4" />
              Buy the look
            </a>
          </div>

          <div className="asos-pdp__stage">
            <button
              type="button"
              className="asos-pdp__arrow asos-pdp__arrow--prev"
              aria-label="Previous image"
              onClick={() => shift(-1)}
            >
              <ChevronLeft />
            </button>
            {showVideo && videoSrc ? (
              <video
                className="asos-pdp__photo"
                controls
                playsInline
                preload="metadata"
                src={videoSrc}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- DAM or public still
              <img className="asos-pdp__photo" src={gallery[active]} alt={title} />
            )}
            <button
              type="button"
              className="asos-pdp__arrow asos-pdp__arrow--next"
              aria-label="Next image"
              onClick={() => shift(1)}
            >
              <ChevronRight />
            </button>
            <p className="asos-pdp__saves">
              {saves} <Heart className="size-3.5" />
            </p>
            <p className="asos-pdp__model">
              Model: {product.modelHeight} | Wearing {product.sizeWorn}
            </p>
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

            <p className="asos-pdp__meta">
              <span>COLOUR:</span> {colour}
            </p>
            <div className="asos-pdp__sizehead">
              <span>SIZE:</span>
              <button type="button" onClick={applyFit}>
                Find your Fit Assistant size
              </button>
            </div>
            <select
              id="asos-size"
              className="asos-select"
              value={size}
              aria-label="Size"
              onChange={(event) => {
                setSize(event.target.value);
                setSizeError('');
              }}
            >
              <option value="">Please select</option>
              {product.sizes.map((uk) => (
                <option key={uk} value={uk}>
                  {sizeLabel(uk, market.code)}
                </option>
              ))}
            </select>
            {sizeError ? <p className="mt-2 text-sm text-[#d01345]">{sizeError}</p> : null}

            <div className="asos-pdp__bag">
              <button type="button" className="asos-btn" onClick={() => bag(product, size)}>
                ADD TO BAG
              </button>
              <button
                type="button"
                className={`asos-heart ${saved ? 'is-on' : ''}`}
                onClick={() =>
                  setSaved(
                    toggleSave(product, size ? sizeLabel(size, market.code) : product.sizeWorn)
                  )
                }
                aria-label="Save"
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
                  <button type="button" onClick={() => setSizeOpen((open) => !open)}>
                    Size & Fit
                    {sizeOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </button>
                  {sizeOpen ? (
                    <div>
                      {sizeFit ? (
                        <p>{sizeFit}</p>
                      ) : (
                        <>
                          <p>Model&apos;s height: {product.modelHeight}</p>
                          <p>Model is wearing: {product.sizeWorn}</p>
                        </>
                      )}
                    </div>
                  ) : null}
                  <button type="button" onClick={() => setDetailsOpen((open) => !open)}>
                    Product Details
                    {detailsOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </button>
                  {detailsOpen ? (
                    <div>
                      <p>
                        <Link href={withMarket(brandHref, market.code)}>{brand}</Link>
                      </p>
                      <ul>
                        {detailLines.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                      <p>Product Code: {textField(route.ProductId) || product.id}</p>
                      <p>{product.care}</p>
                      <p>{composition || `Main: ${product.fabric}`}</p>
                      <p>
                        {brandStory ||
                          `${brand} at ASOS. ${product.sellingLine || product.fitFeedback}`}
                      </p>
                    </div>
                  ) : null}
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
