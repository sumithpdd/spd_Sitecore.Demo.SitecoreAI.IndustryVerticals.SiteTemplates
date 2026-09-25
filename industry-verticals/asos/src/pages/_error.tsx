import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface ErrorPageProps {
  statusCode?: number | null | undefined;
}

/**
 * Rendered for 500 errors on both server and client. Used only in Production mode.
 * @link https://nextjs.org/docs/advanced-features/custom-error-page#more-advanced-error-page-customizing
 */
const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => (
  <>
    <Head>
      <title>Error</title>
    </Head>
    <div style={{ padding: 10 }}>
      <h1>An error occurred</h1>
      <p>
        {statusCode
          ? `A server-side ${statusCode} error occurred.`
          : 'A client-side error occurred.'}
      </p>
      <Link href="/">Go to the Home page</Link>
    </div>
  </>
);

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default ErrorPage;
