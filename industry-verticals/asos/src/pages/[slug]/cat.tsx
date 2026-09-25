import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import CategoryListing from '@/components/category-listing/CategoryListing';

const Page = (): JSX.Element => (
  <JourneyLayout title="Shop | ASOS">
    <CategoryListing params={{}} />
  </JourneyLayout>
);

export default Page;
