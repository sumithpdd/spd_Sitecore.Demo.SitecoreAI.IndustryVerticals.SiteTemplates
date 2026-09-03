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
            Echo printing and labelling — explore the VC-500W full colour label printer story.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <a href="/labelling-and-receipts/vc-500w">VC-500W overview</a>
          <a href="/labelling-and-receipts/vc-500w/vc-500w-vertical-applications">
            Vertical applications
          </a>
          <a href="/devices/label-printer/vc/vc500w">Buy VC-500W</a>
          <a href="/brother-for-home/blog/your-home-office/2024/5-great-ideas-for-organising-your-desk-and-home-office">
            Desk organisation ideas
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
