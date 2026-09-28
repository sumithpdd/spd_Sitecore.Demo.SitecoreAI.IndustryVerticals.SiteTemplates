import { JSX } from 'react';
import Link from 'next/link';
import { ComponentProps } from '@/lib/component-props';
import { ARTICLES, articleHref, textValue } from '@/lib/aspire-catalog';

type Props = ComponentProps & {
  fields?: { Heading?: { value?: string }; Intro?: { value?: string } };
};

export const Default = (props: Props): JSX.Element => (
  <section className="aspire-page" id={props.params?.RenderingIdentifier}>
    <h1>{textValue(props.fields?.Heading, 'Market leading information and advice.')}</h1>
    <p className="aspire-lead">
      {textValue(
        props.fields?.Intro,
        'Case studies, guides, and the journal. Use them to tune a hiring plan, not only to fill a vacancy.'
      )}
    </p>
    <div className="aspire-split">
      <article>
        <h2>Case studies</h2>
        <p>
          How retained searches and contingent briefs have landed commercial and research leaders.
        </p>
      </article>
      <article>
        <h2>Guides</h2>
        <p>Briefing notes for employers who are losing finalists to a counter-offer.</p>
        <Link href="/blog">Read the journal</Link>
      </article>
    </div>
    <ul className="aspire-articles">
      {ARTICLES.map((article) => (
        <li key={article.slug}>
          <h2>
            <Link href={articleHref(article)}>{article.title}</Link>
          </h2>
          <p>{article.summary}</p>
        </li>
      ))}
    </ul>
  </section>
);

export default Default;
