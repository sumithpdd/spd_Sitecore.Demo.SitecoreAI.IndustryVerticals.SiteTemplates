'use client';

import { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';

type Props = Partial<ComponentProps> & { fields?: Record<string, unknown> };

/**
 * Izzy’s “At your side” multi-channel campaign landing (Act 2).
 */
export const Default = (_props: Props): JSX.Element => {
  const channels = [
    { title: 'Web landing', blurb: 'brother.co.uk with UTMs from SitecoreAI brief', href: '/?utm_campaign=at-your-side' },
    { title: 'Email nurture', blurb: 'Shortlist + ink reminder — same journey IDs', href: '/supplies?utm_campaign=at-your-side-email' },
    { title: 'Paid social', blurb: 'Instagram / Facebook creative from Content Hub', href: '/labelling-and-receipts?utm_campaign=at-your-side-social' },
  ];

  return (
    <section className="brother-campaign">
      <div className="brother-campaign__hero">
        <img src={brotherImages.vc500wLaptop} alt="" />
        <div className="brother-campaign__hero-copy">
          <p className="brother-eyebrow">Campaign · At your side</p>
          <h1>One brief. Every channel.</h1>
          <p>
            Izzy turns a SitecoreAI Signal into a governed multi-channel pack — Content Hub
            approvals, modular components, marketer-led visual edits. No engineering ticket for
            routine layout tweaks.
          </p>
          <div className="brother-hero__ctas">
            <a className="brother-btn brother-btn-primary" href="/printers?utm_campaign=at-your-side&persona=jack">
              Open printers journey
            </a>
            <a className="brother-btn brother-btn-outline" href="/search?q=label+printer">
              Demo site search
            </a>
          </div>
        </div>
      </div>
      <div className="brother-container brother-campaign__signals">
        <h2>Signal that started it</h2>
        <ul>
          <li>
            <strong>Home office ↑</strong> printer consideration rising
          </li>
          <li>
            <strong>Supplies reorder ↑</strong> ink queries climbing
          </li>
          <li>
            <strong>Labels ↑</strong> label-maker searches trending
          </li>
        </ul>
      </div>
      <div className="brother-container brother-campaign__channels">
        {channels.map((c) => (
          <a className="brother-card" href={c.href} key={c.title}>
            <div className="brother-card__body">
              <h3>{c.title}</h3>
              <p>{c.blurb}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Default;
