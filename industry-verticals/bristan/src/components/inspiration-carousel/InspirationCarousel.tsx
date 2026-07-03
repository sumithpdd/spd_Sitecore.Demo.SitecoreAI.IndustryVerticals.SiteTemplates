'use client';

import { useId } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Image, ImageField, Link, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { getValidLinkField } from '@/lib/sdk-fields';
import { IGQLTextField } from '@/types/igql';

interface FeatureSlide {
  id: string;
  featureImage?: { jsonValue?: ImageField };
  featureTitle?: { jsonValue?: { value: string } };
  featureLink?: { jsonValue?: Parameters<typeof getValidLinkField>[0] };
}

interface Fields {
  data: {
    datasource?: {
      children?: {
        results?: FeatureSlide[];
      };
      title?: IGQLTextField;
    };
  };
}

type InspirationCarouselProps = ComponentProps & {
  fields: Fields;
};

const FALLBACK_SLIDE_IMAGE = '/images/hero/banner-1.jpg';

function resolveSlideImage(image?: ImageField): ImageField {
  const src = image?.value?.src;

  if (!src || src.includes('.ashx')) {
    return {
      value: {
        src: FALLBACK_SLIDE_IMAGE,
        alt: image?.value?.alt || 'Bristan product range',
        width: 1200,
        height: 300,
      },
    };
  }

  return image;
}

export const Default = (props: InspirationCarouselProps) => {
  const uid = useId().replace(/:/g, '');
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = props.params;
  const slides = props.fields?.data?.datasource?.children?.results ?? [];
  const sectionTitle = props.fields?.data?.datasource?.title;

  if (!slides.length && !page.mode.isEditing) {
    return null;
  }

  return (
    <section
      className={`component inspiration-carousel ${styles ?? ''}`}
      id={id || undefined}
      aria-label="Product inspiration carousel"
    >
      <div className="container">
        <h2 className="inspiration-carousel__heading">
          {sectionTitle?.jsonValue ? (
            <Text field={sectionTitle.jsonValue} />
          ) : (
            'Need Some Inspiration?'
          )}
        </h2>
      </div>

      <div className="inspiration-carousel__banner container">
        <button
          type="button"
          className={`inspiration-carousel__arrow inspiration-carousel__arrow--prev inspiration-carousel-prev-${uid}`}
          aria-label="Previous slide"
        >
          <ChevronLeft aria-hidden />
        </button>

        <Swiper
          className="inspiration-carousel__swiper"
          modules={[Navigation, Pagination, Autoplay, Keyboard, A11y]}
          slidesPerView={1}
          loop={slides.length > 1}
          speed={600}
          autoplay={
            slides.length > 1
              ? { delay: 6000, pauseOnMouseEnter: true, disableOnInteraction: false }
              : false
          }
          navigation={{
            prevEl: `.inspiration-carousel-prev-${uid}`,
            nextEl: `.inspiration-carousel-next-${uid}`,
          }}
          pagination={{
            el: `.inspiration-carousel-pagination-${uid}`,
            clickable: true,
          }}
          a11y={{ enabled: true }}
          keyboard={{ enabled: true }}
        >
          {slides.map((slide) => {
            const title = slide.featureTitle?.jsonValue;
            const link = getValidLinkField(slide.featureLink?.jsonValue);
            const imageField = resolveSlideImage(slide.featureImage?.jsonValue);

            return (
              <SwiperSlide key={slide.id}>
                <div className="inspiration-carousel__slide">
                  {link ? (
                    <Link field={link} className="inspiration-carousel__image-link">
                      <Image field={imageField} className="inspiration-carousel__image" />
                    </Link>
                  ) : (
                    <Image field={imageField} className="inspiration-carousel__image" />
                  )}

                  <div className="inspiration-carousel__info">
                    {title && (
                      <h3 className="inspiration-carousel__title">
                        <Text field={title} />
                      </h3>
                    )}
                    {link && (
                      <Link
                        field={link}
                        className="bristan-btn-primary inspiration-carousel__cta"
                      />
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button
          type="button"
          className={`inspiration-carousel__arrow inspiration-carousel__arrow--next inspiration-carousel-next-${uid}`}
          aria-label="Next slide"
        >
          <ChevronRight aria-hidden />
        </button>
      </div>

      <div
        className={`inspiration-carousel__pagination inspiration-carousel-pagination-${uid}`}
        aria-hidden={slides.length <= 1}
      />
    </section>
  );
};
