import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import BagCheckout from '@/components/bag-checkout/BagCheckout';

const Page = (): JSX.Element => (
  <JourneyLayout title="Bag | ASOS">
    <BagCheckout params={{}} />
  </JourneyLayout>
);

export default Page;
