import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import MyEdit from '@/components/my-edit/MyEdit';

const Page = (): JSX.Element => (
  <JourneyLayout title="My Edit | ASOS">
    <MyEdit params={{}} />
  </JourneyLayout>
);

export default Page;
