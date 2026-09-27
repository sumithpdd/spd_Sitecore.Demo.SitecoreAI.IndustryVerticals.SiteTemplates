import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import { journeyProps } from '@/lib/component-props';
import GenderLanding from '@/components/gender-landing/GenderLanding';
import SeoLinkGrid from '@/components/seo-link-grid/SeoLinkGrid';
import SeoCopy from '@/components/seo-copy/SeoCopy';

const Page = (): JSX.Element => (
  <JourneyLayout title="Women's Clothes | ASOS">
    <GenderLanding {...journeyProps} />
    <SeoLinkGrid {...journeyProps} />
    <SeoCopy {...journeyProps} />
  </JourneyLayout>
);

export default Page;
