import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import { journeyProps } from '@/lib/component-props';
import StyleFeed from '@/components/style-feed/StyleFeed';

const Page = (): JSX.Element => (
  <JourneyLayout title="Style Feed | ASOS">
    <StyleFeed {...journeyProps} />
  </JourneyLayout>
);

export default Page;
