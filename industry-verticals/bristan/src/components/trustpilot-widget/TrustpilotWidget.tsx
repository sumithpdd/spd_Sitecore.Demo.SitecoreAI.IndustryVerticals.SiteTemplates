'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { ComponentProps } from '@/lib/component-props';

type TrustpilotWidgetProps = ComponentProps;

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement | null, refresh?: boolean) => void;
    };
  }
}

/** Trustpilot carousel — matches bristan.com homeowners-home TrustBox */
export const Default = (props: TrustpilotWidgetProps) => {
  const { styles, RenderingIdentifier: id } = props.params;
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.Trustpilot?.loadFromElement) {
      window.Trustpilot.loadFromElement(widgetRef.current, true);
    }
  }, []);

  return (
    <section
      className={`component trustpilot-widget-section ${styles ?? ''}`}
      id={id || undefined}
      aria-label="Customer reviews"
    >
      <Script
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.Trustpilot?.loadFromElement(widgetRef.current, true);
        }}
      />
      <div className="trustpilot-widget-section__inner container">
        <div
          ref={widgetRef}
          className="trustpilot-widget"
          data-locale="en-GB"
          data-template-id="53aa8912dec7e10d38f59f36"
          data-businessunit-id="54c4bd260000ff00057cf778"
          data-style-height="140px"
          data-style-width="100%"
          data-theme="light"
          data-stars="4,5"
          data-review-languages="en"
        />
      </div>
    </section>
  );
};
