import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import { journeyProps } from '@/lib/component-props';
import AccountSignIn from '@/components/account-sign-in/AccountSignIn';

const Page = (): JSX.Element => (
  <JourneyLayout title="Sign in | ASOS">
    <AccountSignIn {...journeyProps} />
  </JourneyLayout>
);

export default Page;
