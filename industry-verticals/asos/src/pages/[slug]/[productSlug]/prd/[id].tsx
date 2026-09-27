import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import { journeyProps } from '@/lib/component-props';
import ProductPage from '@/components/product-page/ProductPage';

const Page = (): JSX.Element => (
  <JourneyLayout title="Product | ASOS">
    <ProductPage {...journeyProps} />
  </JourneyLayout>
);

export default Page;
