'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  Image,
  Link,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { useRouter } from 'next/router';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import { fieldText, imageSrc, linkHref, linkText } from 'lib/cms-fields';
import { CdpSubscribeButton } from 'components/cdp-profile-panel/CdpSubscribeButton';
import { DEMO_CUSTOMER_EMAIL } from 'lib/cdp/cdp-identity';

type Fields = {
  Title?: Field<string>;
  Intro?: Field<string>;
  CardOneTitle?: Field<string>;
  CardOneBody?: Field<string>;
  CardOneImage?: ImageField;
  CardTwoTitle?: Field<string>;
  CardTwoBody?: Field<string>;
  CardTwoImage?: ImageField;
  CardThreeTitle?: Field<string>;
  CardThreeBody?: Field<string>;
  CardThreeImage?: ImageField;
  CtaLink?: LinkField;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const f = props.fields || {};
  const itemPath = String(
    (page as { layout?: { sitecore?: { route?: { itemPath?: string } } } })?.layout?.sitecore?.route
      ?.itemPath ||
      router.asPath ||
      ''
  ).toLowerCase();
  const isMpsEssential = itemPath.includes('mps-essential');
  const cards = [
    {
      titleField: f.CardOneTitle,
      bodyField: f.CardOneBody,
      imageField: f.CardOneImage,
      title: fieldText(
        f.CardOneTitle,
        isMpsEssential ? 'MPS Essential' : 'Full-colour without ink'
      ),
      body: fieldText(
        f.CardOneBody,
        isMpsEssential
          ? 'Automatic supplies before you run out, maintenance included, and access to the Brother MPS portal.'
          : 'Colour crystals in the roll change when heated — no cartridges, no leaks, no smudges.'
      ),
      image: imageSrc(
        f.CardOneImage,
        isMpsEssential ? brotherImages.mpsBanner : brotherImages.vc500wColour
      ),
    },
    {
      titleField: f.CardTwoTitle,
      bodyField: f.CardTwoBody,
      imageField: f.CardTwoImage,
      title: fieldText(
        f.CardTwoTitle,
        isMpsEssential ? 'MPS Professional' : 'Five widths for every job'
      ),
      body: fieldText(
        f.CardTwoBody,
        isMpsEssential
          ? 'Customised packages for different page volumes — flexible support and one consolidated invoice.'
          : 'From 9mm file tabs to 50mm signage and badges — continuous rolls cut to length.'
      ),
      image: imageSrc(
        f.CardTwoImage,
        isMpsEssential ? brotherImages.printerHero : brotherImages.vc500wWidths
      ),
    },
    {
      titleField: f.CardThreeTitle,
      bodyField: f.CardThreeBody,
      imageField: f.CardThreeImage,
      title: fieldText(
        f.CardThreeTitle,
        isMpsEssential ? 'MPS Enterprise' : 'Clean cut every time'
      ),
      body: fieldText(
        f.CardThreeBody,
        isMpsEssential
          ? 'A bespoke service for complex print needs — assessment, device transition and a dedicated account manager.'
          : 'Swipe the touchpad cutter for a professional finish — ideal for offices and craft.'
      ),
      image: imageSrc(
        f.CardThreeImage,
        isMpsEssential ? brotherImages.sustainability : brotherImages.vc500wCutter
      ),
    },
  ];

  return (
    <section className="brother-feature-grid">
      <div className="brother-container">
        {f.Title?.value || isEditing ? (
          <Text field={f.Title} tag="h2" />
        ) : (
          <h2>
            {fieldText(
              f.Title,
              isMpsEssential
                ? 'Choose the managed print plan that fits'
                : 'How the VC-500W helps your industry'
            )}
          </h2>
        )}
        <p className="brother-feature-grid__intro">
          {f.Intro?.value || isEditing ? (
            <Text field={f.Intro} />
          ) : (
            fieldText(
              f.Intro,
              isMpsEssential
                ? 'Three tiers of managed print service — from off-the-shelf simplicity to a bespoke enterprise programme.'
                : 'Print professional colour labels without ink — for organisation, signage, crafting and more.'
            )
          )}
        </p>
        <div className="brother-feature-grid__cards">
          {cards.map((card) => (
            <article className="brother-card" key={card.title}>
              {card.imageField?.value?.src || isEditing ? (
                <Image field={card.imageField} />
              ) : (
                <img src={card.image} alt="" />
              )}
              <div className="brother-card__body">
                {card.titleField?.value || isEditing ? (
                  <Text field={card.titleField} tag="h3" />
                ) : (
                  <h3>{card.title}</h3>
                )}
                {card.bodyField?.value || isEditing ? (
                  <Text field={card.bodyField} tag="p" />
                ) : (
                  <p>{card.body}</p>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="brother-feature-grid__actions">
          {f.CtaLink && (f.CtaLink.value?.href || isEditing) ? (
            <Link field={f.CtaLink} className="brother-btn brother-btn-primary" />
          ) : (
            <a
              className="brother-btn brother-btn-primary"
              href={linkHref(
                f.CtaLink,
                isMpsEssential
                  ? '/business-solutions/managed-print-service'
                  : '/labelling-and-receipts/vc-500w'
              )}
            >
              {linkText(f.CtaLink, isMpsEssential ? 'Back to MPS' : 'Back to VC-500W')}
            </a>
          )}
          {isMpsEssential ? (
            <CdpSubscribeButton
              subscribeLabel="Subscribe"
              subscribedLabel="Subscribed"
              defaultEmail={DEMO_CUSTOMER_EMAIL}
              hideEmailInput
              className="brother-feature-grid__subscribe"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Default;
