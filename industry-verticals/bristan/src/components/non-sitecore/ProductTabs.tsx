import { useState } from 'react';
import { useI18n } from 'next-localization';
import { Product } from '@/types/products';
import {
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';
import { ProductReviews } from './ProductReviews';
import { ProductSpecDownloads } from './ProductSpecDownloads';

interface ProductTabsProps {
  product: Product;
  isPageEditing: boolean;
  dynamicPlaceholderId: string;
  rendering: ComponentRendering;
}

type BristanTab = 'useful' | 'specification' | 'description' | 'reviews';

export const ProductTabs = ({ product, isPageEditing, rendering }: ProductTabsProps) => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<BristanTab>('useful');

  const hasUsefulInfo = Boolean(product?.UsefulInformation?.value || isPageEditing);
  const hasSpecDownloads =
    Boolean(
      product?.ProductData?.value?.href ||
      product?.FittingInstructions?.value?.href ||
      product?.TechDrawing?.value?.src ||
      product?.SparesDrawing?.value?.href
    ) || isPageEditing;

  const hasDimensions =
    Boolean(
      product?.Width?.value ||
      product?.Height?.value ||
      product?.Depth?.value ||
      product?.Weight?.value ||
      product?.SeatHeight?.value ||
      product?.LegHeight?.value
    ) || isPageEditing;

  const tabClass = (tab: BristanTab) =>
    `product-tabs-bristan__tab ${activeTab === tab ? 'product-tabs-bristan__tab--active' : ''}`;

  return (
    <div className="product-tabs-bristan">
      <div className="container">
        <div className="product-tabs-bristan__nav">
          {(hasUsefulInfo || isPageEditing) && (
            <button
              type="button"
              className={tabClass('useful')}
              onClick={() => setActiveTab('useful')}
            >
              {t('useful_info_tab_label') || 'Useful Information'}
            </button>
          )}
          {(hasSpecDownloads || hasDimensions || isPageEditing) && (
            <button
              type="button"
              className={tabClass('specification')}
              onClick={() => setActiveTab('specification')}
            >
              {t('fitting_spec_tab_label') || 'Fitting & Specification'}
            </button>
          )}
          <button
            type="button"
            className={tabClass('description')}
            onClick={() => setActiveTab('description')}
          >
            {t('description_tab_label') || 'Description'}
          </button>
          <button
            type="button"
            className={tabClass('reviews')}
            onClick={() => setActiveTab('reviews')}
          >
            {t('reviews_tab_label') || 'Reviews'}
          </button>
        </div>

        <div className="product-tabs-bristan__panel">
          {activeTab === 'useful' && (
            <div className="product-tabs-bristan__useful">
              {product?.UsefulInformation?.value || isPageEditing ? (
                <ContentSdkRichText field={product.UsefulInformation} />
              ) : (
                <p className="text-center text-gray-500">
                  {t('no_useful_info_text') || 'No useful information available'}
                </p>
              )}
            </div>
          )}

          {activeTab === 'specification' && (
            <div>
              <ProductSpecDownloads product={product} isPageEditing={isPageEditing} />
              {hasDimensions && (
                <div className="product-tabs-bristan__dimensions">
                  <dl>
                    {(product?.Width?.value || isPageEditing) && (
                      <>
                        <dt>{t('width_label') || 'Width'}</dt>
                        <dd>
                          <ContentSdkText field={product.Width} />
                        </dd>
                      </>
                    )}
                    {(product?.Height?.value || isPageEditing) && (
                      <>
                        <dt>{t('height_label') || 'Height'}</dt>
                        <dd>
                          <ContentSdkText field={product.Height} />
                        </dd>
                      </>
                    )}
                    {(product?.Depth?.value || isPageEditing) && (
                      <>
                        <dt>{t('depth_label') || 'Depth'}</dt>
                        <dd>
                          <ContentSdkText field={product.Depth} />
                        </dd>
                      </>
                    )}
                    {(product?.Weight?.value || isPageEditing) && (
                      <>
                        <dt>{t('weight_label') || 'Weight'}</dt>
                        <dd>
                          <ContentSdkText field={product.Weight} />
                        </dd>
                      </>
                    )}
                  </dl>
                </div>
              )}
            </div>
          )}

          {activeTab === 'description' && (
            <div>
              {product?.LongDescription?.value || isPageEditing ? (
                <ContentSdkRichText
                  field={product.LongDescription}
                  className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600"
                />
              ) : (
                <p className="text-center text-gray-500">
                  {t('no_description_text') || 'No description available'}
                </p>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <ProductReviews reviews={product.Reviews} rendering={rendering} />
          )}
        </div>
      </div>
    </div>
  );
};
