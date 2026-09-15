import { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { ADVICE, IMG, PARTNERS, STORIES } from '@/lib/openhand-catalog';
import Link from 'next/link';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const cards = [
    { href: ADVICE[0].href, title: 'Advice, not photography', text: ADVICE[0].summary, img: '' },
    { href: PARTNERS[0].href, title: PARTNERS[0].name, text: PARTNERS[0].about, img: IMG.promo1 },
    { href: STORIES[0].href, title: STORIES[0].title, text: STORIES[0].excerpt, img: IMG.promo2 },
  ];

  return (
    <section className="oh-section" id={id}>
      <div className="oh-wrap">
        <p className="oh-kicker">What we do</p>
        <h2
          className="mb-8 font-serif text-3xl"
          style={{ fontFamily: 'Source Serif 4, Georgia, serif' }}
        >
          UK crisis support and international emergency appeals, in one IA.
        </h2>
        <div className="oh-grid oh-grid-3">
          {cards.map((card) => (
            <Link key={card.href} href={card.href} className="oh-card">
              {card.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={card.img} alt="" />
              ) : (
                <div className="flex h-48 items-center bg-[var(--oh-cream)] px-6 text-sm text-[var(--oh-muted)]">
                  Advice pages carry no photography — that contrast is the demo.
                </div>
              )}
              <div className="oh-card__body">
                <h3>{card.title}</h3>
                <p className="oh-muted text-sm">{card.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Default;
