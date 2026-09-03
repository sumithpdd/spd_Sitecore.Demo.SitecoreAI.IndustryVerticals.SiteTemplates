import { JSX } from 'react';
import { Field, ImageField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';

type Fields = {
  Title?: Field<string>;
  Intro?: Field<string>;
  CardOneTitle?: Field<string>;
  CardOneBody?: Field<string>;
  CardOneImage?: ImageField;
  CardTwoTitle?: Field<string>;
  CardTwoBody?: Field<string>;
  CardTwoImage?: ImageField;
  CardThreeTitle?: Field<string>;
  CardThreeBody?: Field<string>;
  CardThreeImage?: ImageField;
};

type Props = ComponentProps & { fields?: Fields };

function imgSrc(field?: ImageField, fallback?: string): string {
  return (field?.value as { src?: string } | undefined)?.src || fallback || '';
}

export const Default = (props: Props): JSX.Element => {
  const f = props.fields || {};
  const cards = [
    {
      title: f.CardOneTitle?.value || 'Full-colour without ink',
      body:
        f.CardOneBody?.value ||
        'Colour crystals in the roll change when heated — no cartridges, no leaks, no smudges.',
      image: imgSrc(f.CardOneImage, brotherImages.vc500wColour),
    },
    {
      title: f.CardTwoTitle?.value || 'Five widths for every job',
      body:
        f.CardTwoBody?.value ||
        'From 9mm file tabs to 50mm signage and badges — continuous rolls cut to length.',
      image: imgSrc(f.CardTwoImage, brotherImages.vc500wWidths),
    },
    {
      title: f.CardThreeTitle?.value || 'Clean cut every time',
      body:
        f.CardThreeBody?.value ||
        'Swipe the touchpad cutter for a professional finish — ideal for offices and craft.',
      image: imgSrc(f.CardThreeImage, brotherImages.vc500wCutter),
    },
  ];

  return (
    <section className="brother-feature-grid">
      <div className="brother-container">
        <h2>{f.Title?.value || 'How the VC-500W helps your industry'}</h2>
        <p className="brother-feature-grid__intro">
          {f.Intro?.value ||
            'Print professional colour labels without ink — for organisation, signage, crafting and more.'}
        </p>
        <div className="brother-feature-grid__cards">
          {cards.map((card) => (
            <article className="brother-card" key={card.title}>
              <img src={card.image} alt="" />
              <div className="brother-card__body">
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div style={{ marginTop: '1.75rem' }}>
          <a className="brother-btn brother-btn-primary" href="/labelling-and-receipts/vc-500w">
            Back to VC-500W
          </a>
        </div>
      </div>
    </section>
  );
};

export default Default;
