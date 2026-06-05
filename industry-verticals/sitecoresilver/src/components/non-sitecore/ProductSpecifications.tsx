import { Text as ContentSdkText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { Product } from '@/types/products';
import { useI18n } from 'next-localization';

interface ProductSpecificationsProps {
  product: Product;
}

export const ProductSpecifications = ({ product }: ProductSpecificationsProps) => {
  const { page } = useSitecore();
  const { t } = useI18n();
  const isPageEditing = page.mode.isEditing;

  const hasSpecs =
    product?.PrintWidth?.value ||
    product?.PrintResolution?.value ||
    product?.Connectivity?.value ||
    product?.PrintSpeed?.value ||
    product?.Width?.value ||
    product?.Height?.value ||
    product?.Depth?.value ||
    product?.Weight?.value;

  if (!hasSpecs && !isPageEditing) {
    return null;
  }

  return (
    <div className="w-full">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-3 text-left sm:grid-cols-2">
        {/* Printer-specific specifications */}
        {(product?.PrintWidth?.value || isPageEditing) && (
          <>
            <dt className="font-semibold">{t('print_width_label') || 'Print Width'}</dt>
            <dd>
              <ContentSdkText field={product.PrintWidth} />
            </dd>
          </>
        )}

        {(product?.PrintResolution?.value || isPageEditing) && (
          <>
            <dt className="font-semibold">{t('print_resolution_label') || 'Print Resolution'}</dt>
            <dd>
              <ContentSdkText field={product.PrintResolution} />
            </dd>
          </>
        )}

        {(product?.Connectivity?.value || isPageEditing) && (
          <>
            <dt className="font-semibold">{t('connectivity_label') || 'Connectivity'}</dt>
            <dd>
              <ContentSdkText field={product.Connectivity} />
            </dd>
          </>
        )}

        {(product?.PrintSpeed?.value || isPageEditing) && (
          <>
            <dt className="font-semibold">{t('print_speed_label') || 'Print Speed'}</dt>
            <dd>
              <ContentSdkText field={product.PrintSpeed} />
            </dd>
          </>
        )}

        {/* Physical dimensions */}
        {(product?.Width?.value || isPageEditing) && (
          <>
            <dt className="font-semibold">{t('width_label') || 'Width'}</dt>
            <dd>
              <ContentSdkText field={product.Width} />
            </dd>
          </>
        )}

        {(product?.Height?.value || isPageEditing) && (
          <>
            <dt className="font-semibold">{t('height_label') || 'Height'}</dt>
            <dd>
              <ContentSdkText field={product.Height} />
            </dd>
          </>
        )}

        {(product?.Depth?.value || isPageEditing) && (
          <>
            <dt className="font-semibold">{t('depth_label') || 'Depth'}</dt>
            <dd>
              <ContentSdkText field={product.Depth} />
            </dd>
          </>
        )}

        {(product?.Weight?.value || isPageEditing) && (
          <>
            <dt className="font-semibold">{t('weight_label') || 'Weight'}</dt>
            <dd>
              <ContentSdkText field={product.Weight} />
            </dd>
          </>
        )}
      </dl>
    </div>
  );
};
