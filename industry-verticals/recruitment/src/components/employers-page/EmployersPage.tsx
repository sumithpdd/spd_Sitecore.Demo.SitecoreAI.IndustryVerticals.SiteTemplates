import { JSX } from 'react';
import Link from 'next/link';
import { ComponentProps } from '@/lib/component-props';
import { CONSULTANTS, consultantHref, textValue } from '@/lib/aspire-catalog';

type Props = ComponentProps & {
  fields?: { Heading?: { value?: string }; Intro?: { value?: string } };
};

const MODELS = ['Contingency', 'Retained Search', 'Contract', 'Managed Services'];

export const Default = (props: Props): JSX.Element => (
  <section className="aspire-page" id={props.params?.RenderingIdentifier}>
    <h1>{textValue(props.fields?.Heading, 'Stop searching. Start partnering.')}</h1>
    <p className="aspire-lead">
      {textValue(
        props.fields?.Intro,
        'We learn the culture before we write the brief. The shortlist is people who can do the job, not a pile of CVs that matched a keyword.'
      )}
    </p>
    <ul className="aspire-stats">
      <li>
        <strong>2.9 million</strong>
        <span>LinkedIn reach across the company and its consultants</span>
      </li>
      <li>
        <strong>170,000</strong>
        <span>average visits a month</span>
      </li>
      <li>
        <strong>350,000</strong>
        <span>candidates on file</span>
      </li>
      <li>
        <strong>30 years</strong>
        <span>formed in 1992</span>
      </li>
    </ul>
    <h2>How we hire</h2>
    <ul className="aspire-models">
      {MODELS.map((model) => (
        <li key={model}>{model}</li>
      ))}
    </ul>
    <h2>Meet the leaders</h2>
    <ul className="aspire-people">
      {CONSULTANTS.map((person) => (
        <li key={person.slug}>
          <Link href={consultantHref(person)}>
            <strong>{person.name}</strong>
            <span>{person.role}</span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default Default;
