import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import SavedItems from '@/components/saved-items/SavedItems';

const Page = (): JSX.Element => (
  <JourneyLayout title="Saved items | ASOS">
    <SavedItems params={{}} />
  </JourneyLayout>
);

export default Page;
