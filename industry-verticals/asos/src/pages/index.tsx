import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import GenderLanding from '@/components/gender-landing/GenderLanding';

const Page = (): JSX.Element => (
  <JourneyLayout title="Women's Clothes | ASOS">
    <GenderLanding params={{}} />
  </JourneyLayout>
);

export default Page;
