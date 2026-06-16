import { ImageField } from '@sitecore-content-sdk/nextjs';
import {
  LYVERA_PROMO_CEO,
  LYVERA_PROMO_HOW_WE_DO_IT,
  LYVERA_PROMO_WHAT_WE_DO,
  LYVERA_PROMO_WHO_WE_ARE,
} from '@/lib/lyvera-defaults';

const MEDIA = 'https://www.lyveragroup.com/-/media/lyvera';

function imageField(src: string, alt: string): ImageField {
  return {
    value: {
      src,
      alt,
      width: '635',
      height: '635',
    },
  };
}

export function promoFallbackImage(title?: string): ImageField | undefined {
  const key = (title ?? '').toLowerCase();

  if (key.includes('who we are')) {
    return imageField(
      `${MEDIA}/resized-approved-images-for-pages/iluka-approved-images/iluka-2-635x635.jpg`,
      'Fans at a live event'
    );
  }

  if (key.includes('what we do')) {
    return imageField(
      `${MEDIA}/resized-approved-images-for-pages/extra-images/home-page/what-we-do-635x635.png`,
      'Guests enjoying a Keith Prowse event'
    );
  }

  if (key.includes('how we do it')) {
    return imageField(
      `${MEDIA}/resized-approved-images-for-pages/extra-images/how-we-do-it-updated.png`,
      'Outdoor hospitality at Ascot'
    );
  }

  if (key.includes('chief executive') || key.includes('charlie buck')) {
    return imageField(
      `${MEDIA}/resized-approved-images-for-pages/extra-images/charlie-buck-headshot.png`,
      'Charlie Buck, Lyvera Chief Executive Officer'
    );
  }

  return undefined;
}

export const PROMO_FALLBACK_COPY = {
  whoWeAre: LYVERA_PROMO_WHO_WE_ARE,
  whatWeDo: LYVERA_PROMO_WHAT_WE_DO,
  howWeDoIt: LYVERA_PROMO_HOW_WE_DO_IT,
  ceo: LYVERA_PROMO_CEO,
} as const;
