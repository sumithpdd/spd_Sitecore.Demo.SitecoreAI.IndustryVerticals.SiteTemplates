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
      <div className="max-w-4xl md:max-w-5xl container md:px-10">
        <div className="items-center gap-y-6 md:gap-x-12 md:gap-y-0 grid md:grid-cols-2">
          {/* Headline */}
          <h2 className="font-medium text-foreground text-2xl xl:text-3xl leading-tight ">
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
                className="bg-background ps-5 pe-32 rounded-md focus:outline-none ring-1 ring-foreground/5 focus:ring-2 w-full h-12 md:h-14 text-foreground placeholder:text-foreground/70"
              />

              <button
                type="submit"
                className="top-1/2 right-2 md:right-3 absolute bg-accent hover:opacity-90 px-4 md:px-5 rounded-md focus-visible:outline-none focus-visible:ring-2 h-9 md:h-10 font-semibold text-background text-sm -translate-y-1/2"
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
