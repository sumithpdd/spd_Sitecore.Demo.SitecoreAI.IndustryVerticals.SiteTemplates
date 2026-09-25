import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import { journeyProps } from '@/lib/component-props';
import GenderLanding from '@/components/gender-landing/GenderLanding';

const Page = (): JSX.Element => (
  <JourneyLayout title="Women's Clothes | ASOS">
    <GenderLanding {...journeyProps} />
  </JourneyLayout>
);

export default Page;
