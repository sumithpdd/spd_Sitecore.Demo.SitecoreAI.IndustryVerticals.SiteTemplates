import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import { journeyProps } from '@/lib/component-props';
import SavedItems from '@/components/saved-items/SavedItems';

const Page = (): JSX.Element => (
  <JourneyLayout title="Saved items | ASOS">
    <SavedItems {...journeyProps} />
  </JourneyLayout>
);

export default Page;
