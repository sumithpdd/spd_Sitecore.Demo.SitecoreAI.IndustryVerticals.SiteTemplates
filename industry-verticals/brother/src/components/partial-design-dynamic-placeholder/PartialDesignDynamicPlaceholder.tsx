import { JSX } from 'react';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

/**
 * Renders every placeholder Sitecore attached to this partial, plus the usual
 * signature / headless / sxa keys. Page designs may expose any of these names.
 */
const PartialDesignDynamicPlaceholder = (props: ComponentProps): JSX.Element => {
  const sig = props.rendering?.params?.sig || '';
  const existing = Object.keys(props.rendering?.placeholders || {});
  const names = Array.from(
    new Set(
      [
        ...existing,
        sig,
        sig && !sig.startsWith('headless-') ? `headless-${sig}` : '',
        sig ? `sxa-${sig}` : '',
      ].filter(Boolean)
    )
  );

  return (
    <>
      {names.map((name) => (
        <Placeholder key={name} name={name} rendering={props.rendering} />
      ))}
    </>
  );
};

export default PartialDesignDynamicPlaceholder;
