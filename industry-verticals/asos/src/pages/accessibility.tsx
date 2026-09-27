import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import { journeyProps } from '@/lib/component-props';
import Accessibility from '@/components/accessibility/Accessibility';

const Page = (): JSX.Element => (
  <JourneyLayout title="Accessibility | ASOS">
    <Accessibility {...journeyProps} />
  </JourneyLayout>
);

export default Page;
