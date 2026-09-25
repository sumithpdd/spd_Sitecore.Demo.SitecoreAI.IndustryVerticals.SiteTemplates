import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import { journeyProps } from '@/lib/component-props';
import BagCheckout from '@/components/bag-checkout/BagCheckout';

const Page = (): JSX.Element => (
  <JourneyLayout title="Bag | ASOS">
    <BagCheckout {...journeyProps} />
  </JourneyLayout>
);

export default Page;
