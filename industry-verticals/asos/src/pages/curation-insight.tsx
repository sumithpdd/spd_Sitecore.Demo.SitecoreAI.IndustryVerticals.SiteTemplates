import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import { journeyProps } from '@/lib/component-props';
import CurationInsight from '@/components/curation-insight/CurationInsight';

const Page = (): JSX.Element => (
  <JourneyLayout title="Curation insight | ASOS">
    <CurationInsight {...journeyProps} />
  </JourneyLayout>
);

export default Page;
