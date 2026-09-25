import { JSX } from 'react';
import { JourneyLayout } from '@/lib/JourneyLayout';
import AccountSignIn from '@/components/account-sign-in/AccountSignIn';

const Page = (): JSX.Element => (
  <JourneyLayout title="Sign in | ASOS">
    <AccountSignIn params={{}} />
  </JourneyLayout>
);

export default Page;
