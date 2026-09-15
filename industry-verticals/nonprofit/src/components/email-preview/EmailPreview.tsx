import { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { IMG } from '@/lib/openhand-catalog';
import Link from 'next/link';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  return (
    <section className="oh-section oh-section--cream" id={props.params?.RenderingIdentifier}>
      <div className="oh-wrap max-w-lg rounded-2xl bg-white p-8 shadow-sm">
        <p className="oh-kicker">Supporter email</p>
        <p className="oh-muted text-xs">
          From: Openhand · Subject: Your gift is matched until 21 December
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.appealWinter} alt="" className="my-4 rounded-xl" />
        <h1 className="text-2xl" style={{ fontFamily: 'Source Serif 4, Georgia, serif' }}>
          Maria’s meter went dark. The hub was still open.
        </h1>
        <p className="mt-3">
          A corporate partner is matching winter gifts. Deep link keeps
          ?utm_source=email&appeal=winter so the site takeover matches this message.
        </p>
        <Link
          className="oh-btn oh-btn--amber mt-6"
          href="/appeals/winter?utm_source=email&appeal=winter"
        >
          Give a matched gift
        </Link>
      </div>
    </section>
  );
};

export default Default;
