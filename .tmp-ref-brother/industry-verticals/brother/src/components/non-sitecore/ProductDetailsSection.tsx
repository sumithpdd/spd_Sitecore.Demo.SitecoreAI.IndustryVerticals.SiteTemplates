import { RichText as ContentSdkRichText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { Product } from '@/types/products';
import { useI18n } from 'next-localization';

interface ProductDetailsSectionProps {
  product: Product;
}

export const ProductDetailsSection = ({ product }: ProductDetailsSectionProps) => {
  const { page } = useSitecore();
  const { t } = useI18n();
  const isPageEditing = page.mode.isEditing;

  // Parse features from comma-separated string or use ProductDetails rich text field
  const featuresList = product?.Features?.value
    ? product.Features.value
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean)
    : [];

  const hasProductDetails = product?.ProductDetails?.value || featuresList.length > 0;
  const hasProductOverview = product?.ProductOverview?.value || product?.LongDescription?.value;

  if (!hasProductDetails && !hasProductOverview && !isPageEditing) {
    return null;
  }

  return (
    <div className="w-full space-y-8 py-8">
      {/* Product Details Section */}
      {hasProductDetails && (
        <div>
          <h2 className="mb-4 text-3xl font-bold">
            {t('product_details_label') || 'Product Details'}
          </h2>
          {product?.ProductDetails?.value ? (
            <ContentSdkRichText field={product.ProductDetails} className="space-y-2" />
          ) : (
            <ul className="list-disc space-y-2 pl-6">
              {featuresList.map((feature, index) => (
                <li key={index} className="text-lg">
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Product Overview Section */}
      {hasProductOverview && (
        <div>
          <h3 className="mb-4 text-2xl font-semibold">
            {t('product_overview_label') || 'Product Overview'}
          </h3>
          {product?.ProductOverview?.value ? (
            <ContentSdkRichText field={product.ProductOverview} className="space-y-4 text-lg" />
          ) : (
            <ContentSdkRichText field={product.LongDescription} className="space-y-4 text-lg" />
          )}
        </div>
      )}
    </div>
  );
};
