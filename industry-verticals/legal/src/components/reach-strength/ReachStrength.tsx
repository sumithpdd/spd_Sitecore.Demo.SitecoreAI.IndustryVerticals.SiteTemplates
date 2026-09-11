import { JSX } from 'react';
import { Text, Link as ContentSdkLink, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { REACH_AWARDS } from '@/lib/home-catalog';
import { asItems, asLinkField, asTextField, fieldString, linkText } from '@/lib/sitecore-fields';
import Link from 'next/link';
import { Award } from 'lucide-react';

type Fields = {
  Eyebrow?: unknown;
  Heading?: unknown;
  MoreLink?: unknown;
  Items?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const id = props.params?.RenderingIdentifier;
  const styles = `${props.params?.styles || ''}`.trim();
  const items = asItems(fields.Items);
  const more = asLinkField(fields.MoreLink);

  return (
    <section className={`pm-reach w-full ${styles}`.trim()} id={id}>
      <div className="pm-wrap py-16">
        <p className="pm-section-kicker">
          <Text field={asTextField(fields.Eyebrow)} />
          {!fieldString(fields.Eyebrow) && 'Our reach and strength'}
        </p>
        <h2 className="pm-reach__lede">
          <Text field={asTextField(fields.Heading)} />
          {!fieldString(fields.Heading) && 'Recognised expertise, wherever you are'}
        </h2>
        <ul className="pm-reach__grid">
          {items.length > 0
            ? items.map((item, index) => (
                <li key={item.id || index}>
                  <Award className="pm-reach__icon" aria-hidden="true" />
                  <p className="pm-reach__kicker">
                    <Text field={asTextField(item.fields?.Kicker)} />
                  </p>
                  <h3>
                    <Text field={asTextField(item.fields?.Title)} />
                  </h3>
                  <p className="pm-reach__source">
                    <Text field={asTextField(item.fields?.Source)} />
                  </p>
                </li>
              ))
            : REACH_AWARDS.map((item) => (
                <li key={item.title}>
                  <Award className="pm-reach__icon" aria-hidden="true" />
                  <p className="pm-reach__kicker">{item.kicker}</p>
                  <h3>{item.title}</h3>
                  <p className="pm-reach__source">{item.source}</p>
                </li>
              ))}
        </ul>
        {more && (more.value?.href || isEditing) ? (
          <ContentSdkLink field={more} className="pm-btn-outline" />
        ) : (
          <Link className="pm-btn-outline" href="/about-us">
            {linkText(fields.MoreLink, 'Explore all')}
          </Link>
        )}
      </div>
    </section>
  );
};

export default Default;
