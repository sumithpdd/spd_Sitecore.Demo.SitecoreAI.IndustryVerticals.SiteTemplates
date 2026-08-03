import { CdpHelper, useSitecore } from '@sitecore-content-sdk/nextjs';
import { useEffect, JSX } from 'react';
import { pageView } from '@sitecore-content-sdk/events';
import config from 'sitecore.config';

/**
 * CDP page view — Sitecore Content SDK events (Automobile / Aston Martin).
 * @see https://www.npmjs.com/package/@sitecore-content-sdk/events
 */
const CdpPageView = (): JSX.Element => {
  const {
    page: { layout, siteName, mode },
  } = useSitecore();
  const route = layout?.sitecore?.route;
  const context = layout?.sitecore?.context;

  /**
   * Determines if the page view events should be turned off.
   * IMPORTANT: Implement based on your cookie consent management solution.
   * By default it is disabled in development mode.
   */
  const disabled = () => {
    return process.env.NODE_ENV === 'development';
  };

  useEffect(() => {
    if (!mode.isNormal || !route?.itemId || !context) {
      return;
    }
    if (disabled()) {
      return;
    }

    const language = route.itemLanguage || config.defaultLanguage;
    const scope = config.personalize?.scope;

    const pageVariantId = CdpHelper.getPageVariantId(
      route.itemId,
      language,
      context.variantId as string,
      scope
    );

    pageView({
      channel: 'WEB',
      currency: 'GBP',
      page: route.name,
      pageVariantId,
      language,
      extensionData: {
        brand: 'Aston Martin',
        industry: 'Automobile',
        site: siteName || config.defaultSite,
      },
    }).catch((e) => console.debug(e));
  }, [mode, route, context, siteName]);

  return <></>;
};

export default CdpPageView;
