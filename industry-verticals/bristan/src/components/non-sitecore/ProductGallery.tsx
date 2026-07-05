import {
  ImageField,
  NextImage as ContentSdkImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { useEffect, useMemo, useState } from 'react';
import { Product } from '@/types/products';

interface ProductGalleryProps {
  product: Product;
}

const PRODUCT_IMAGE_SLOTS: Array<
  keyof Pick<Product, 'Image1' | 'Image2' | 'Image3' | 'Image4' | 'Image5'>
> = ['Image1', 'Image2', 'Image3', 'Image4', 'Image5'];

function hasImageSrc(image?: ImageField) {
  return Boolean(image?.value?.src);
}

export const ProductGallery = ({ product }: ProductGalleryProps) => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const imageSlots = useMemo(
    () => PRODUCT_IMAGE_SLOTS.map((fieldName) => product[fieldName]),
    [product]
  );

  const visibleSlots = useMemo(() => {
    if (isPageEditing) {
      return imageSlots;
    }

    return imageSlots.filter((img): img is ImageField => hasImageSrc(img));
  }, [imageSlots, isPageEditing]);

  useEffect(() => {
    if (mainImageIndex < visibleSlots.length) {
      return;
    }

    setMainImageIndex(0);
  }, [mainImageIndex, visibleSlots.length]);

  const mainImage = visibleSlots[mainImageIndex] ?? visibleSlots[0];

  return (
    <div className="flex w-full flex-col-reverse gap-3 sm:flex-row">
      <div className="flex gap-3 sm:flex-col sm:justify-start">
        {visibleSlots.map((img, idx) => {
          const isActive = idx === mainImageIndex;

          return (
            <button
              key={`${img?.value?.src || 'empty'}-${idx}`}
              type="button"
              onClick={() => setMainImageIndex(idx)}
              disabled={isActive}
              aria-label={`View image ${idx + 1}`}
              className={`bg-background-muted focus:ring-accent size-15 overflow-hidden rounded focus:ring-2 focus:outline-none xl:size-18 ${
                isActive ? 'cursor-not-allowed opacity-50' : 'hover:ring-accent hover:ring-2'
              }`}
            >
              {hasImageSrc(img) ? (
                <ContentSdkImage field={img} className="h-full w-full object-cover" />
              ) : (
                <div className="text-foreground-muted flex h-full w-full items-center justify-center text-xs">
                  Image {idx + 1}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="grow">
        {mainImage || isPageEditing ? (
          <ContentSdkImage
            field={mainImage ?? imageSlots[0]}
            className="bg-background-muted aspect-square w-full rounded-md object-contain p-4"
          />
        ) : (
          <div className="bg-background-muted aspect-square w-full rounded-md" />
        )}
      </div>
    </div>
  );
};
