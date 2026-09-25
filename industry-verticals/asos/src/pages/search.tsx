import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import { journeyProps } from '@/lib/component-props';
import SiteSearch from '@/components/site-search/SiteSearch';

const Page = (): JSX.Element => (
  <JourneyLayout title="Search | ASOS">
    <SiteSearch {...journeyProps} />
  </JourneyLayout>
);

export default Page;
