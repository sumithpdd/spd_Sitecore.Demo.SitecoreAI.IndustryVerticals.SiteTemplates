'use client';

import { JSX, useEffect, useMemo, useState } from 'react';
import { Field, Image, ImageField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { Heart, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MARKETS, parseMarketPath, withMarket, type MarketCode } from '@/lib/asos-market';
import { STORY, TRENDING_CHIPS } from '@/lib/asos-journey';
import { bagCount, primeDemoBag } from '@/lib/asos-bag';
import { primeDemoSaved, readBoard } from '@/lib/asos-save';
import { MyBag } from '@/components/my-bag/MyBag';
import { DAM } from '@/lib/dam-registry';
import { HeaderSearch } from '@/lib/HeaderSearch';
import { isBroken, LEAKED_LOCALE_HREF } from '@/lib/asos-demo';

type Fields = {
  BrandName?: Field<string>;
  Logo?: ImageField;
};

type Props = ComponentProps & { fields?: Fields };

const logoSrc = (field?: ImageField): string => {
  const value = field?.value;
  if (!value || typeof value === 'string') return '';
  return (value as { src?: string }).src || '';
};

const GENDERS = [
  { label: 'Women', href: '/women' },
  { label: 'Men', href: '/men' },
];

const SUBNAV = [
  { label: 'New in', href: STORY.newInHref },
  { label: 'Clothing', href: STORY.denimDropHref },
  { label: 'Dresses', href: '/edits/polka-dot' },
  { label: 'Petite denim', href: STORY.petiteHref },
  { label: 'Topshop', href: STORY.topshopHref },
  { label: 'Brands', href: STORY.topshopHref },
  { label: 'Style Feed', href: STORY.styleFeedHref },
  { label: 'Outlet', href: '/edits/chocolate' },
];

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market, path } = parseMarketPath(router.asPath);
  const [saved, setSaved] = useState(0);
  const [bagQty, setBagQty] = useState(0);
  const [bagOpen, setBagOpen] = useState(false);
  const styles = `${props.params?.styles || ''}`.trim();
  const brand = props.fields?.BrandName?.value || 'ASOS';
  const logo = props.fields?.Logo;
  const authoredLogo = logoSrc(logo);
  const isWomen = path === '/women' || path.startsWith('/women/') || path.includes('/new-in');
  const broken = isBroken(router.asPath);

  const hrefs = useMemo(
    () => ({
      home: withMarket('/', market.code),
      saved: withMarket(STORY.savedHref, market.code),
      bag: withMarket(STORY.bagHref, market.code),
      account: withMarket(STORY.accountHref, market.code),
    }),
    [market.code]
  );

  useEffect(() => {
    primeDemoBag();
    primeDemoSaved();
    const refresh = () => {
      setSaved(readBoard().items.length);
      setBagQty(bagCount());
    };
    refresh();
    window.addEventListener('asos-save', refresh);
    window.addEventListener('asos-bag', refresh);
    return () => {
      window.removeEventListener('asos-save', refresh);
      window.removeEventListener('asos-bag', refresh);
    };
  }, []);

  const switchMarket = (code: MarketCode) => {
    void router.push(withMarket(path === '/' ? '/' : path, code));
  };

  return (
    <div className={`w-full ${styles}`.trim()}>
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
          <div className="asos-header__search">
            <HeaderSearch />
          </div>
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
            <Link href={hrefs.saved} className="relative" aria-label="Saved Items">
              <Heart className="size-5" />
              {saved ? <span className="asos-count">{saved}</span> : null}
            </Link>
            <div className="relative">
              <button
                type="button"
                className="relative"
                aria-label="Bag"
                aria-expanded={bagOpen}
                onClick={() => setBagOpen((open) => !open)}
              >
                <ShoppingBag className="size-5" />
                {bagQty ? <span className="asos-count">{bagQty}</span> : null}
              </button>
              {bagOpen ? (
                <MyBag market={market.code} bagHref={hrefs.bag} onClose={() => setBagOpen(false)} />
              ) : null}
            </div>
          </div>
        </div>
        <div className="asos-header__sub">
          <nav aria-label="Departments">
            {SUBNAV.map((item) => (
              <Link key={item.label} href={withMarket(item.href, market.code)}>
                {item.label}
              </Link>
            ))}
            {broken ? <Link href={LEAKED_LOCALE_HREF}>Moda</Link> : null}
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
