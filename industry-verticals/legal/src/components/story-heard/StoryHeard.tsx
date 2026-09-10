import { JSX } from 'react';
import { useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { STORY_INTRO, STORY_LIFECYCLE, STORY_PAINS, STORY_PERSONAS } from '@/lib/legal-story';
import Link from 'next/link';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const id = props.params?.RenderingIdentifier;

  return (
    <section className="pm-story" id={id}>
      <div className="container mx-auto max-w-5xl py-16">
        <p className="pm-story__eyebrow">RFP</p>
        <h1 className="pm-story__title">What we heard</h1>
        <p className="pm-story__intro">{STORY_INTRO}</p>
        {isEditing && <p className="pm-story__hint">Story copy is catalog-driven for the demo.</p>}

        <h2>Pain today mapped to SitecoreAI</h2>
        <div className="pm-story__table-wrap">
          <table className="pm-story__table">
            <thead>
              <tr>
                <th>Pain today</th>
                <th>SitecoreAI capability</th>
              </tr>
            </thead>
            <tbody>
              {STORY_PAINS.map((row) => (
                <tr key={row.pain}>
                  <td>{row.pain}</td>
                  <td>{row.capability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Personas</h2>
        <p className="pm-story__lede">
          Confirm names with Thomas before putting colleagues on screen. Emma runs day to day; she
          is the human integration layer, not a profile on this site.
        </p>
        <ul className="pm-story__personas">
          {STORY_PERSONAS.map((persona) => (
            <li key={persona.name}>
              <h3>{persona.name}</h3>
              <p className="pm-story__role">{persona.role}</p>
              <p>{persona.brief}</p>
            </li>
          ))}
        </ul>

        <h2>Content operations lifecycle</h2>
        <ul className="pm-story__lifecycle">
          {STORY_LIFECYCLE.map((item) => (
            <li key={item.stage}>
              <strong>{item.stage}</strong>
              <span>{item.capability}</span>
            </li>
          ))}
        </ul>

        <p className="pm-story__next">
          <Link href="/story">Open the three-act storyboard</Link>
        </p>
      </div>
    </section>
  );
};

export default Default;
