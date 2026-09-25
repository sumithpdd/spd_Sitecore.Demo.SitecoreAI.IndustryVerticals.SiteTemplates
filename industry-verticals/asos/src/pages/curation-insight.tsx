import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import CurationInsight from '@/components/curation-insight/CurationInsight';

const Page = (): JSX.Element => (
  <JourneyLayout title="Curation insight | ASOS">
    <CurationInsight params={{}} />
  </JourneyLayout>
);

export default Page;
