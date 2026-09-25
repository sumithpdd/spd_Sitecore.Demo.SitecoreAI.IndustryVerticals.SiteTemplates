import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import StyleFeed from '@/components/style-feed/StyleFeed';

const Page = (): JSX.Element => (
  <JourneyLayout title="Style Feed | ASOS">
    <StyleFeed params={{}} />
  </JourneyLayout>
);

export default Page;
