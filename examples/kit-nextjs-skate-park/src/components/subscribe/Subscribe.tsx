import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Text, Field } from '@sitecore-content-sdk/nextjs';
import { useI18n } from 'next-localization';

export type SubscribeBannerProps = ComponentProps & {
  params: { [key: string]: string };
  fields?: {
    Title: Field<string>;
    ButtonText?: Field<string>;
  };
};

export const Default = (props: SubscribeBannerProps): JSX.Element => {
  const { styles, RenderingIdentifier: id } = props.params;
  const ButtonText = props.fields?.ButtonText?.value || 'Subscribe';
  const { t } = useI18n();

  return (
    <section
      className={`component subscribe-banner py-10 md:py-14 ${styles ?? ''}`}
      id={id || undefined}
      aria-label="Subscribe banner"
    >
      <div className="container max-w-4xl md:max-w-5xl md:px-10">
        <div className="grid items-center gap-y-6 md:grid-cols-2 md:gap-x-12 md:gap-y-0">
          {/* Headline */}
          <h2 className="text-foreground text-2xl leading-tight font-medium xl:text-3xl">
            <Text field={props.fields?.Title} />
          </h2>

          {/* Form */}
          <form className="w-full md:max-w-lg" action="">
            <label htmlFor="subscribe-email" className="sr-only">
              {t('your_email_label') || 'your@email.com'}
            </label>

            <div className="relative">
              <input
                id="subscribe-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={t('your_email') || 'E.g. your@email.com'}
                className="bg-background ring-foreground/5 text-foreground placeholder:text-foreground/70 h-12 w-full rounded-md ps-5 pe-32 ring-1 focus:ring-2 focus:outline-none md:h-14"
              />

              <button
                type="submit"
                className="bg-accent text-background absolute top-1/2 right-2 h-9 -translate-y-1/2 rounded-md px-4 text-sm font-semibold hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none md:right-3 md:h-10 md:px-5"
              >
                {ButtonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
