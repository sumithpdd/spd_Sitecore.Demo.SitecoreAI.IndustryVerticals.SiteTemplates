'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { BRANCHES, branchFromPath, branchHref, textValue } from '@/lib/aspire-catalog';
import { imageSrc } from '@/lib/aspire-dam';

type Fields = {
  Title?: { value?: string };
  Phone?: { value?: string };
  Address?: { value?: string };
  Body?: { value?: string };
  Image?: { value?: { src?: string; alt?: string } };
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const branch = branchFromPath(useRouter().asPath) || BRANCHES[0];
  const fields = props.fields;
  const photo = imageSrc(fields?.Image, branch.image);
  return (
    <article className="aspire-page aspire-detail" id={props.params?.RenderingIdentifier}>
      <h1>We are {textValue(fields?.Title, branch.city)}.</h1>
      {photo ? <img className="aspire-photo" src={photo} alt="" /> : null}
      <p>
        <a href={`tel:${textValue(fields?.Phone, branch.phone).replace(/\s/g, '')}`}>
          {textValue(fields?.Phone, branch.phone)}
        </a>
      </p>
      <p>{textValue(fields?.Address, branch.address)}</p>
      <p>{textValue(fields?.Body, branch.body)}</p>
      <h2>Other offices</h2>
      <ul className="aspire-branches">
        {BRANCHES.filter((item) => item.slug !== branch.slug).map((item) => (
          <li key={item.slug}>
            <Link href={branchHref(item)}>{item.city}</Link>
            <span>{item.address}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Default;
