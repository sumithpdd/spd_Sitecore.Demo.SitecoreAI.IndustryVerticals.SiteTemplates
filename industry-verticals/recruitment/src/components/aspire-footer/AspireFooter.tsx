import { JSX } from 'react';
import Link from 'next/link';
import { ComponentProps } from '@/lib/component-props';
import { BRAND, BRANCHES, branchHref } from '@/lib/aspire-catalog';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => (
  <footer className="aspire-footer" id={props.params?.RenderingIdentifier}>
    <div>
      <p className="aspire-logo">aspire</p>
      <p>Achieving more together.</p>
      <p>
        <a href={`tel:${BRAND.phones[0].value.replace(/\s/g, '')}`}>
          Call us {BRAND.phones[0].value}
        </a>
      </p>
    </div>
    <ul>
      {BRANCHES.map((branch) => (
        <li key={branch.slug}>
          <Link href={branchHref(branch)}>{branch.city}</Link>
        </li>
      ))}
    </ul>
  </footer>
);

export default Default;
