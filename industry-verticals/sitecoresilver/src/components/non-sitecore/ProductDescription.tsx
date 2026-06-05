import { Text as ContentSdkText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { Product } from '@/types/products';
import StarRating from '../non-sitecore/StarRating';
import { useLocale } from '@/hooks/useLocaleOptions';
import { calculateAverageRating } from '@/helpers/productUtils';

interface ProductDescriptionProps {
  product: Product;
}

export const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const { currency } = useLocale();
  const calculatedCurrency = currency;

  const reviews = product?.Reviews || [];
  const reviewCount = reviews.length;
  const averageRating = calculateAverageRating(reviews);

  return (
    <>
      <h1 className="pt-3 text-4xl font-bold lg:pt-0">
        <ContentSdkText field={product.Title} />
      </h1>

      {(product?.Price?.value || product?.SalePrice?.value || isPageEditing) && (
        <div className="flex items-center gap-3">
          {product?.SalePrice?.value ? (
            <>
              <p className="text-2xl font-semibold">
                {calculatedCurrency == 'USD' ? '£' : calculatedCurrency}{' '}
                <ContentSdkText field={product.SalePrice} />
              </p>
              <p className="text-xl text-gray-500 line-through">
                {calculatedCurrency == 'USD' ? '£' : calculatedCurrency}{' '}
                <ContentSdkText field={product.Price} />
              </p>
            </>
          ) : (
            <p className="text-2xl font-semibold">
              {calculatedCurrency == 'USD' ? '£' : calculatedCurrency}{' '}
              <ContentSdkText field={product.Price} />
            </p>
          )}
        </div>
      )}

      {!!product?.Reviews?.length && (
        <div className="flex items-center space-x-3">
          <span className="text-foreground text-lg font-semibold">
            {averageRating} out of 5 stars
          </span>
          <StarRating rating={averageRating} className="!text-accent" />
          <span className="text-foreground-muted text-sm">
            ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
          </span>
        </div>
      )}

      {(product?.ShortDescription?.value || isPageEditing) && (
        <p className="text-foreground text-lg">
          <ContentSdkText field={product.ShortDescription} />
        </p>
      )}
    </>
  );
};
