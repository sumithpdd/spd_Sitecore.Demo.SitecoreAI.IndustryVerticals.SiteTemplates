'use client';

import { JSX, ReactNode, useId } from 'react';
import { Field, RichText, RichTextField } from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { parseMarketPath, withMarket } from '@/lib/asos-market';
import { STORY } from '@/lib/asos-journey';
import { useShopper, type SessionAffinity } from '@/lib/cdp/session-affinity';

type Fields = {
  Message?: RichTextField;
  Terms?: Field<string>;
  WomenLabel?: Field<string>;
  MenLabel?: Field<string>;
  WomenHref?: Field<string>;
  MenHref?: Field<string>;
};

type Props = ComponentProps & { fields?: Fields };

type OfferKey = 'NewHere' | 'Home' | 'Product' | 'Sale' | 'Returning';

type Offer = {
  copy: ReactNode;
  terms?: string;
  womenHref: string;
  menHref: string;
};

const NEW_HERE_TERMS =
  '*Enter code NEWHERE at checkout, or HEYAPP at checkout in app to receive the stated discount on your first order up to a maximum pre-discount spend of £500/€690. Code valid for new customers who opt in to receive our marketing communications. Discount may be withdrawn from site at any time. Can’t be used with other promo codes or on gift vouchers, delivery charges, Premier Delivery or ASOS Marketplace. Selected marked products excluded from promo. Country exclusions apply.';

const SALE_HREF = '/women/sale/ctas/price-point-2/cat/?cid=51237';

/** Men's storefront is not in this demo, so MEN opens the women landing. */
const MEN_HREF = '/women';

const OFFERS: Record<OfferKey, Offer> = {
  NewHere: {
    copy: (
      <strong>
        New here? Get 15% off + Free Next Day Delivery on your first order
        <br />
        with code NEWHERE*
      </strong>
    ),
    terms: NEW_HERE_TERMS,
    womenHref: STORY.newInHref,
    menHref: MEN_HREF,
  },
  Home: {
    copy: (
      <strong>
        Wide-leg jeans under £50
        <br />
        Shop the Berlin, October edit
      </strong>
    ),
    womenHref: STORY.denimDropHref,
    menHref: MEN_HREF,
  },
  Product: {
    copy: (
      <strong>
        In your size — {STORY.keepSize}
        <br />
        Free Next Day Delivery on your first order with code NEWHERE*
      </strong>
    ),
    terms: NEW_HERE_TERMS,
    womenHref: STORY.heroHref,
    menHref: MEN_HREF,
  },
  Sale: {
    copy: (
      <strong>
        Sale under £10
        <br />
        Denim, dresses and more
      </strong>
    ),
    womenHref: SALE_HREF,
    menHref: SALE_HREF,
  },
  Returning: {
    copy: (
      <strong>
        Welcome back
        <br />
        Your Berlin edit is still under £50
      </strong>
    ),
    womenHref: STORY.myEditHref,
    menHref: MEN_HREF,
  },
};

function fieldText(field?: Field<string>): string {
  const value = field?.value;
  return typeof value === 'string' ? value.trim() : '';
}

/** Intent picks the offer. Affinity picks the destination when the CMS link is empty. */
export function offerKeyForShopper(path: string, shopper: SessionAffinity): OfferKey {
  if (shopper.visits > 1 || shopper.intent === 'returning') return 'Returning';
  if (path.includes('/sale/') || path.includes('price-point') || shopper.intent === 'sale')
    return 'Sale';
  if (path === '/' || path === '/women') return 'Home';
  return 'NewHere';
}

function affinityHref(fallback: string, shopper: SessionAffinity): string {
  if (fallback === SALE_HREF) return fallback;
  if (shopper.topBrand === 'Topshop') return STORY.topshopHref;
  if (shopper.topFit === 'petite') return STORY.petiteHref;
  if (shopper.topCategory === 'denim') return STORY.denimDropHref;
  return fallback;
}

const Banner = ({ offer, fields, params }: Props & { offer: Offer }): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const tipId = useId();
  const styles = `${params?.styles || ''}`.trim();
  const authoredMessage = fieldText(fields?.Message as Field<string> | undefined);
  const terms = fieldText(fields?.Terms) || offer.terms || '';
  const womenLabel = fieldText(fields?.WomenLabel) || 'WOMEN';
  const menLabel = fieldText(fields?.MenLabel) || 'MEN';
  const shopper = useShopper();
  const womenHref = withMarket(
    fieldText(fields?.WomenHref) || affinityHref(offer.womenHref, shopper),
    market.code
  );
  const menHref = withMarket(fieldText(fields?.MenHref) || offer.menHref, market.code);

  return (
    <div className={`asos-banner ${styles}`.trim()} id={params?.RenderingIdentifier || undefined}>
      <Link href={womenHref} className="asos-banner__btn">
        {womenLabel}
      </Link>
      <div className="asos-banner__offer">
        <div
          className="asos-banner__copy"
          tabIndex={0}
          aria-describedby={terms ? tipId : undefined}
        >
          {authoredMessage ? <RichText field={fields?.Message} /> : offer.copy}
        </div>
        {terms ? (
          <div className="asos-banner__tip" id={tipId} role="tooltip">
            {terms}
          </div>
        ) : null}
      </div>
      <Link href={menHref} className="asos-banner__btn">
        {menLabel}
      </Link>
    </div>
  );
};

/** New-customer offer from the ASOS global bar. */
export const NewHere = (props: Props): JSX.Element => <Banner {...props} offer={OFFERS.NewHere} />;

/** Wide-leg jeans under £50. Home and /women. */
export const Home = (props: Props): JSX.Element => <Banner {...props} offer={OFFERS.Home} />;

/** Size and first-order delivery. Product pages. */
export const Product = (props: Props): JSX.Element => <Banner {...props} offer={OFFERS.Product} />;

/** Sale under £10. */
export const Sale = (props: Props): JSX.Element => <Banner {...props} offer={OFFERS.Sale} />;

/** Return visit. Assign this variant with a personalization rule. */
export const Returning = (props: Props): JSX.Element => (
  <Banner {...props} offer={OFFERS.Returning} />
);

/** Follows visit intent until a personalization rule pins another variant. */
export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const shopper = useShopper();
  const { path } = parseMarketPath(router.asPath);
  return <Banner {...props} offer={OFFERS[offerKeyForShopper(path, shopper)]} />;
};

export default Default;
