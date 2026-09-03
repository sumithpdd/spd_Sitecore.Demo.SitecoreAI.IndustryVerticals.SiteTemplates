import { JSX } from 'react';
import { Field } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = {
  Title?: Field<string>;
  Copyright?: Field<string>;
  Address?: Field<string>;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const title = props.fields?.Title?.value || 'Brother UK';
  const copyright = props.fields?.Copyright?.value || '© Brother UK. Demo site for SitecoreAI.';
  const address =
    props.fields?.Address?.value ||
    'Brother UK Ltd · Audmore House · Audmoor Way · Telford · TF1 6YE';

  return (
    <footer className="brother-footer">
      <div className="brother-container brother-footer__grid">
        <div>
          <h3>{title}</h3>
          <p>{address}</p>
          <p style={{ marginTop: '1rem', maxWidth: '28rem' }}>
            Echo printing and labelling — explore printers, scanners and the VC-500W story. Use{' '}
            <a href="/search">Search</a> to find any product.
          </p>
        </div>
        <div>
          <h3>Products</h3>
          <a href="/labelling-and-receipts">Labelling & receipts</a>
          <a href="/devices/label-printer/vc/vc500w">VC-500W</a>
          <a href="/devices/label-printer/ql/ql-800">QL-800</a>
          <a href="/devices/label-printer/ql/ql-820nwb">QL-820NWB</a>
          <a href="/devices/label-printer/pt/pt-p750w">PT-P750W</a>
          <a href="/devices/label-printer/td/td-4550dnwb">TD-4550DNWB</a>
          <a href="/printers">Printers</a>
          <a href="/scanners">Scanners</a>
        </div>
        <div>
          <h3>Explore</h3>
          <a href="/devices">All devices</a>
          <a href="/business-solutions">Business solutions</a>
          <a href="/supplies">Supplies</a>
          <a href="/support">Support</a>
          <a href="/search">Search</a>
          <a href="/brother-for-home/blog/your-home-office/2024/5-great-ideas-for-organising-your-desk-and-home-office">
            Desk organisation tips
          </a>
        </div>
      </div>
      <div className="brother-container brother-footer__legal">
        <p>{copyright}</p>
      </div>
    </footer>
  );
};

export default Default;
