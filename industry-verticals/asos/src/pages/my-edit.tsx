import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import { journeyProps } from '@/lib/component-props';
import MyEdit from '@/components/my-edit/MyEdit';

const Page = (): JSX.Element => (
  <JourneyLayout title="My Edit | ASOS">
    <MyEdit {...journeyProps} />
  </JourneyLayout>
);

export default Page;
