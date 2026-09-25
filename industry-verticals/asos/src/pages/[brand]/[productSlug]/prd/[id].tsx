import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import ProductPage from '@/components/product-page/ProductPage';

const Page = (): JSX.Element => (
  <JourneyLayout title="Product | ASOS">
    <ProductPage params={{}} />
  </JourneyLayout>
);

export default Page;
