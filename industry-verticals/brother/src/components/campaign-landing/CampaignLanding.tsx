'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  RichText,
  Image,
  Link,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import { fieldText, imageSrc, linkHref, linkText } from 'lib/cms-fields';

type Fields = {
  Eyebrow?: Field<string>;
  Title?: Field<string>;
  Description?: Field<string>;
  HeroImage?: ImageField;
  PrimaryCta?: LinkField;
  SecondaryCta?: LinkField;
  SignalOneTitle?: Field<string>;
  SignalOneBody?: Field<string>;
  SignalTwoTitle?: Field<string>;
  SignalTwoBody?: Field<string>;
  SignalThreeTitle?: Field<string>;
  SignalThreeBody?: Field<string>;
};

type Props = Partial<ComponentProps> & { fields?: Fields };

/**
 * Izzy’s “At your side” multi-channel campaign landing (Act 2).
 */
export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const f = props.fields || {};

  const channels = [
    {
      title: 'Web landing',
      blurb: 'brother.co.uk with UTMs from SitecoreAI brief',
      href: '/?utm_campaign=at-your-side',
    },
    {
      title: 'Email nurture',
      blurb: 'Shortlist + ink reminder — same journey IDs',
      href: '/supplies?utm_campaign=at-your-side-email',
    },
    {
      title: 'Paid social',
      blurb: 'Instagram / Facebook creative from Content Hub',
      href: '/labelling-and-receipts?utm_campaign=at-your-side-social',
    },
  ];

  const signals = [
    {
      title: fieldText(f.SignalOneTitle, 'Home office ↑'),
      body: fieldText(f.SignalOneBody, 'printer consideration rising'),
    },
    {
      title: fieldText(f.SignalTwoTitle, 'Supplies reorder ↑'),
      body: fieldText(f.SignalTwoBody, 'ink queries climbing'),
    },
    {
      title: fieldText(f.SignalThreeTitle, 'Labels ↑'),
      body: fieldText(f.SignalThreeBody, 'label-maker searches trending'),
    },
  ];

  return (
    <section className="brother-campaign">
      <div className="brother-campaign__hero">
        {f.HeroImage?.value?.src || isEditing ? (
          <Image field={f.HeroImage} />
        ) : (
          <img src={imageSrc(f.HeroImage, brotherImages.vc500wLaptop)} alt="" />
        )}
        <div className="brother-campaign__hero-copy">
          <p className="brother-eyebrow">
            {f.Eyebrow?.value || isEditing ? (
              <Text field={f.Eyebrow} />
            ) : (
              fieldText(f.Eyebrow, 'Campaign · At your side')
            )}
          </p>
          {f.Title?.value || isEditing ? (
            <Text field={f.Title} tag="h1" />
          ) : (
            <h1>{fieldText(f.Title, 'One brief. Every channel.')}</h1>
          )}
          {f.Description?.value || isEditing ? (
            <RichText field={f.Description} />
          ) : (
            <p>
              {fieldText(
                f.Description,
                'Izzy turns a SitecoreAI Signal into a governed multi-channel pack — Content Hub approvals, modular components, marketer-led visual edits. No engineering ticket for routine layout tweaks.'
              )}
            </p>
          )}
          <div className="brother-hero__ctas">
            {f.PrimaryCta && (f.PrimaryCta.value?.href || isEditing) ? (
              <Link field={f.PrimaryCta} className="brother-btn brother-btn-primary" />
            ) : (
              <a
                className="brother-btn brother-btn-primary"
                href={linkHref(f.PrimaryCta, '/printers?utm_campaign=at-your-side&persona=jack')}
              >
                {linkText(f.PrimaryCta, 'Open printers journey')}
              </a>
            )}
            {f.SecondaryCta && (f.SecondaryCta.value?.href || isEditing) ? (
              <Link field={f.SecondaryCta} className="brother-btn brother-btn-outline" />
            ) : (
              <a
                className="brother-btn brother-btn-outline"
                href={linkHref(f.SecondaryCta, '/search?q=label+printer')}
              >
                {linkText(f.SecondaryCta, 'Demo site search')}
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="brother-container brother-campaign__signals">
        <h2>Signal that started it</h2>
        <ul>
          {signals.map((s) => (
            <li key={s.title}>
              <strong>{s.title}</strong> {s.body}
            </li>
          ))}
        </ul>
      </div>
      <div className="brother-container brother-campaign__channels">
        {channels.map((c) => (
          <a className="brother-card" href={c.href} key={c.title}>
            <div className="brother-card__body">
              <h3>{c.title}</h3>
              <p>{c.blurb}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Default;
