import type { JSX } from 'react';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export type SitecoreSilverPromoBadgeGridProps = ComponentProps;

/** Parent grid — add SitecoreSilverPromoBadge children in CM */
export const Default = (props: SitecoreSilverPromoBadgeGridProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const phKey = `sitecoresilver-promo-badges-${props.params?.DynamicPlaceholderId ?? '1'}`;

  return (
    <section className="component ss-promo-grid sitecoresilver-texture" id={id}>
      <Placeholder name={phKey} rendering={props.rendering} />
    </section>
  );
};
