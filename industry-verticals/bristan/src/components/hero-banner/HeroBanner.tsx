import { Placeholder } from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { ComponentProps } from '@/lib/component-props';
import { HeroBannerStyles } from '@/types/styleFlags';

/** Static hero content until Sitecore datasource fields are wired up. */
const HERO_CONTENT = {
  title: "Welcome to the UK's Number One Taps and Showers Brand",
  description:
    'Straightforward solutions for every bathroom and kitchen that you can trust time and time again.',
  ctaText: 'Find a Product',
  ctaHref: '/products/bathroom-taps',
  imageSrc: '/images/hero/banner-1.jpg',
  imageAlt: "Welcome to the UK's Number One Taps and Showers Brand",
} as const;

const styleString = (styles: unknown): string => (typeof styles === 'string' ? styles : '');

type HeroBannerProps = ComponentProps;

const HeroCta = ({
  withPlaceholder,
  searchBarPlaceholderKey,
  rendering,
}: {
  withPlaceholder: boolean;
  searchBarPlaceholderKey: string;
  rendering: HeroBannerProps['rendering'];
}) =>
  withPlaceholder ? (
    <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
  ) : (
    <Link href={HERO_CONTENT.ctaHref} className="hero-banner__cta">
      {HERO_CONTENT.ctaText}
    </Link>
  );

/** Home-style welcome band with full-width banner image below (bristan.com home). */
export const Default = ({ params, rendering }: HeroBannerProps) => {
  const styles = styleString(params.styles);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;
  const { RenderingIdentifier: id } = params;

  return (
    <section className={`component hero-banner ${styles}`} id={id}>
      <div className="hero-banner__welcome">
        <div className="container mx-auto px-4 py-10 md:py-12">
          <h1 className="hero-banner__title">{HERO_CONTENT.title}</h1>
          <p className="hero-banner__description">{HERO_CONTENT.description}</p>
          <div className="hero-banner__actions">
            <HeroCta
              withPlaceholder={withPlaceholder}
              searchBarPlaceholderKey={searchBarPlaceholderKey}
              rendering={rendering}
            />
          </div>
        </div>
      </div>

      <div className="hero-banner__media">
        <img src={HERO_CONTENT.imageSrc} alt={HERO_CONTENT.imageAlt} />
      </div>
    </section>
  );
};

/** Category-style hero with title over lifestyle image (bristan.com showers/taps pages). */
export const TopContent = ({ params, rendering }: HeroBannerProps) => {
  const styles = styleString(params.styles);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;
  const { RenderingIdentifier: id } = params;

  return (
    <section className={`component hero-banner hero-banner--category ${styles}`} id={id}>
      <div className="hero-banner__media">
        <img src={HERO_CONTENT.imageSrc} alt={HERO_CONTENT.imageAlt} />
        <div className="hero-banner__overlay">
          <h1 className="hero-banner__category-title">{HERO_CONTENT.title}</h1>
        </div>
      </div>

      <div className="hero-banner__intro">
        <div className="container mx-auto px-4">
          <p className="hero-banner__description">{HERO_CONTENT.description}</p>
          <div className="hero-banner__actions">
            <HeroCta
              withPlaceholder={withPlaceholder}
              searchBarPlaceholderKey={searchBarPlaceholderKey}
              rendering={rendering}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
