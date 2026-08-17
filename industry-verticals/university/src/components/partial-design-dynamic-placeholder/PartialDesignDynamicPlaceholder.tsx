import { JSX } from 'react';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

/**
 * Renders placeholders for a partial design.
 * XM Cloud may expose the signature (`header`) or the layout key (`headless-header`).
 */
const PartialDesignDynamicPlaceholder = (props: ComponentProps): JSX.Element => {
  const sig = props.rendering?.params?.sig || '';
  const names = sig
    ? Array.from(new Set([sig, sig.startsWith('headless-') ? sig : `headless-${sig}`]))
    : [];

  return (
    <>
      {names.map((name) => (
        <Placeholder key={name} name={name} rendering={props.rendering} />
      ))}
    </>
  );
};

export default PartialDesignDynamicPlaceholder;
