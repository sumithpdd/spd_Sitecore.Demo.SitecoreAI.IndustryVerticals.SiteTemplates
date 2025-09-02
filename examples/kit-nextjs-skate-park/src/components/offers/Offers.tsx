import { Field, Text } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { isParamEnabled } from '@/helpers/isParamEnabled';

interface OfferFields {
  id: string;
  displayName: string;
  name: string;
  url: string;
  fields: {
    OfferText: Field<string>;
  };
}

interface OfferProps extends ComponentProps {
  fields: {
    Offers: OfferFields[];
  };
}

const autoPlayDelay = 5000;

export const Default = (props: OfferProps) => {
  const id = props.rendering.uid;
  const datasource = props.fields?.Offers || [];
  const styles = `${props.params.styles || ''}`.trim();
  const autoPlay = isParamEnabled(props.params.Autoplay);

  return (
    <div className={styles} id={id}>
      <div
        className={`mx-auto px-2 min-h-10 flex items-center justify-center gap-5 w-full max-w-3xl`}
      >
        <button
          className={`swiper-btn-prev-${id}`}
          name="previous-offer"
          aria-label="Previous offer"
        >
          <ChevronLeft />
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: `.swiper-btn-prev-${id}`,
            nextEl: `.swiper-btn-next-${id}`,
            disabledClass: 'pointer-events-none opacity-50',
          }}
          slidesPerView={1}
          centeredSlides
          noSwiping
          noSwipingClass="no-swiping"
          loop={true}
          autoplay={
            autoPlay
              ? {
                  delay: autoPlayDelay,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          autoHeight
          className="mx-0! transition-all w-full"
        >
          {datasource.map((offer) => (
            <SwiperSlide key={offer.id} className="no-swiping text-center">
              <Text field={offer.fields.OfferText} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className={`swiper-btn-next-${id}`} name="next-offer" aria-label="Next offer">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
