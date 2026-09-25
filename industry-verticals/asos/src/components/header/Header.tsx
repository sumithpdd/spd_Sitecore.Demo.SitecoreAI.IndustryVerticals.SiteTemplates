'use client';

import { FormEvent, JSX, useMemo, useState } from 'react';
import { Field, Image, ImageField, Text } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { Heart, Search, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MARKETS, parseMarketPath, withMarket, type MarketCode } from '@/lib/asos-market';
import { STORY, TRENDING_CHIPS } from '@/lib/asos-journey';
import { readBoard } from '@/lib/asos-save';
import { DAM } from '@/lib/dam-registry';

type Fields = {
  BrandName?: Field<string>;
  Logo?: ImageField;
  PromoText?: Field<string>;
};

type Props = ComponentProps & { fields?: Fields };

const logoSrc = (field?: ImageField): string => {
  const value = field?.value;
  if (!value || typeof value === 'string') return '';
  return (value as { src?: string }).src || '';
};

const GENDERS = [
  { label: 'Women', href: '/women' },
  { label: 'Men', href: '/women' },
];

const SUBNAV = [
  { label: 'New in', href: STORY.newInHref },
  { label: 'Clothing', href: STORY.denimDropHref },
  { label: 'Dresses', href: '/polka-dot/cat/?cid=91002' },
  { label: 'Petite denim', href: STORY.petiteHref },
  { label: 'Topshop', href: STORY.topshopHref },
  { label: 'Brands', href: STORY.topshopHref },
  { label: 'Style Feed', href: STORY.styleFeedHref },
  { label: 'Outlet', href: '/chocolate/cat/?cid=91001' },
];

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market, path } = parseMarketPath(router.asPath);
  const [draft, setDraft] = useState(STORY.search);
  const saved = typeof window === 'undefined' ? 0 : readBoard().items.length;
  const styles = `${props.params?.styles || ''}`.trim();
  const brand = props.fields?.BrandName?.value || 'ASOS';
  const logo = props.fields?.Logo;
  const authoredLogo = logoSrc(logo);
  const promo = props.fields?.PromoText?.value || STORY.promo;
  const isWomen = path === '/women' || path.startsWith('/women/') || path.includes('/new-in');

  const hrefs = useMemo(
    () => ({
      home: withMarket('/', market.code),
      women: withMarket('/women', market.code),
      newIn: withMarket(STORY.newInHref, market.code),
      saved: withMarket(STORY.savedHref, market.code),
      bag: withMarket(STORY.bagHref, market.code),
      account: withMarket(STORY.accountHref, market.code),
    }),
    [market.code]
  );

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void router.push(hrefs.newIn);
  };

  const switchMarket = (code: MarketCode) => {
    void router.push(withMarket(path === '/' ? '/' : path, code));
  };

  return (
    <div className={styles}>
      <Link href={hrefs.newIn} className="asos-promo">
        {props.fields?.PromoText ? <Text field={props.fields.PromoText} /> : promo}
      </Link>
      <header className="asos-header">
        <div className="asos-header__bar">
          <nav className="asos-header__gender" aria-label="Gender">
            {GENDERS.map((item) => (
              <Link
                key={item.label}
                href={withMarket(item.href, market.code)}
                className={item.label === 'Women' && isWomen ? 'is-active' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link className="asos-header__logo" href={hrefs.home} aria-label={brand}>
            {authoredLogo ? (
              <Image field={logo} className="h-7 w-auto" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- Content Hub public link
              <img
                src={DAM['asos-logo-white.png']?.src || '/asos/logo-white.png'}
                alt={brand}
                width={93}
                height={28}
              />
            )}
          </Link>
          <form className="asos-header__search" onSubmit={submit} role="search">
            <label className="sr-only" htmlFor="asos-q">
              Search
            </label>
            <input
              id="asos-q"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Search for items and brands"
            />
          </form>
          <div className="asos-header__tools">
            <label className="sr-only" htmlFor="asos-market">
              Market
            </label>
            <select
              id="asos-market"
              className="bg-black text-xs text-white"
              value={market.code}
              onChange={(event) => switchMarket(event.target.value as MarketCode)}
            >
              {Object.values(MARKETS).map((item) => (
                <option key={item.code} value={item.code}>
                  {item.code.toUpperCase()}
                </option>
              ))}
            </select>
            <Link href={hrefs.account} aria-label="Account">
              <User className="size-5" />
            </Link>
            <Link href={hrefs.saved} aria-label="Saved Items">
              <Heart className="size-5" />
              {saved ? <span className="sr-only">{saved} saved</span> : null}
            </Link>
            <Link href={hrefs.bag} aria-label="Bag">
              <ShoppingBag className="size-5" />
            </Link>
            <button type="submit" form="asos-q" className="md:hidden" aria-label="Search">
              <Search className="size-5" />
            </button>
          </div>
        </div>
        <div className="asos-header__sub">
          <nav aria-label="Departments">
            {SUBNAV.map((item) => (
              <Link key={item.label} href={withMarket(item.href, market.code)}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {path === '/women' ? (
        <div className="asos-wrap flex flex-wrap gap-2 py-3">
          {TRENDING_CHIPS.map((chip) => (
            <Link key={chip.label} className="asos-chip" href={withMarket(chip.href, market.code)}>
              {chip.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Default;
