import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import { journeyProps } from '@/lib/component-props';
import CategoryListing from '@/components/category-listing/CategoryListing';

const Page = (): JSX.Element => (
  <JourneyLayout title="Denim | ASOS">
    <CategoryListing {...journeyProps} />
  </JourneyLayout>
);

export default Page;
