import { ComponentParams, ComponentRendering, Page } from '@sitecore-content-sdk/nextjs';

/**
 * Shared component props
 */
export type ComponentProps = {
  rendering: ComponentRendering;
  params: ComponentParams & {
    /**
     * The identifier for the rendering
     */
    RenderingIdentifier?: string;
    /**
     * The styles for the rendering
     * This value is calculated by the Placeholder component
     */
    styles?: string;
    /**
     * The enabled placeholders for the rendering
     */
    EnabledPlaceholders?: string;
  };
};

/**
 * Component props with context
 * You can access `page` by withSitecore/useSitecore
 * @example withSitecore()(ContentBlock)
 * @example const { page } = useSitecore()
 */
export type ComponentWithContextProps = ComponentProps & {
  page: Page;
};

/** Standalone journey routes are not Sitecore layout items. */
export const emptyRendering: ComponentRendering = {
  uid: 'asos-journey',
  componentName: 'Journey',
};

export const journeyProps: ComponentProps = {
  rendering: emptyRendering,
  params: {},
};
