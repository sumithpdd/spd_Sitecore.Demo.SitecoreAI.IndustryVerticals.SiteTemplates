'use client';

import { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { parseDemoParams } from '@/lib/demo-params';
import { useRouter } from 'next/router';

type Props = ComponentProps;

const TOPICS = [
  { topic: 'help with energy bills UK', us: 12, openhand: 41, gap: 'Leading' },
  { topic: 'cannot pay rent advice', us: 28, openhand: 19, gap: 'Gap vs Shelter-class' },
  { topic: 'emergency food parcel near me', us: 22, openhand: 24, gap: 'Even' },
  { topic: 'winter disconnection rules', us: 9, openhand: 33, gap: 'AEO page working' },
];

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { axp } = parseDemoParams(router.asPath);

  return (
    <section className="oh-section" id={props.params?.RenderingIdentifier}>
      <div className="oh-wrap">
        <p className="oh-kicker">Scrunch</p>
        <h1 className="text-4xl" style={{ fontFamily: 'Source Serif 4, Georgia, serif' }}>
          Monitor + AXP
        </h1>
        <p className="oh-muted max-w-2xl">
          Configured for UK crisis topics and UK competitor set — not a US out-of-box list. Add
          ?axp=1 to show the crawler payload.
        </p>
        <table className="mt-8 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--oh-line)]">
              <th className="py-2">Topic</th>
              <th>Citations (us)</th>
              <th>Openhand share</th>
              <th>Call</th>
            </tr>
          </thead>
          <tbody>
            {TOPICS.map((row) => (
              <tr key={row.topic} className="border-b border-[var(--oh-line)]">
                <td className="py-2">{row.topic}</td>
                <td>{row.us}</td>
                <td>{row.openhand}</td>
                <td>{row.gap}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {axp && (
          <pre className="mt-8 overflow-auto rounded-xl bg-[var(--oh-navy)] p-4 text-xs text-[var(--oh-cream)]">
            {JSON.stringify(
              {
                org: 'Openhand',
                type: 'NGO',
                pages: [
                  {
                    url: '/get-help/help-with-energy-bills',
                    about: 'energy grants, no disconnection without court order',
                  },
                  { url: '/partners/northgate-community-hub', about: 'Leeds LS7, Jordan Hale' },
                ],
              },
              null,
              2
            )}
          </pre>
        )}
      </div>
    </section>
  );
};

export default Default;
