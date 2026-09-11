import { JSX } from 'react';
import { Text, Link as ContentSdkLink, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { OUTLAW_NEWS } from '@/lib/home-catalog';
import {
  asItems,
  asLinkField,
  asTextField,
  fieldString,
  linkHref,
  linkText,
} from '@/lib/sitecore-fields';
import Link from 'next/link';
import { Newspaper } from 'lucide-react';

type Fields = {
  Eyebrow?: unknown;
  Heading?: unknown;
  Subtitle?: unknown;
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
    <section className={`pm-outlaw w-full ${styles}`.trim()} id={id}>
      <div className="pm-wrap py-16">
        <p className="pm-section-kicker pm-section-kicker--light">
          <Newspaper className="pm-section-kicker__icon" aria-hidden="true" />
          <Text field={asTextField(fields.Eyebrow)} />
          {!fieldString(fields.Eyebrow) && 'Out-Law'}
        </p>
        <h2 className="pm-outlaw__heading">
          <Text field={asTextField(fields.Heading)} />
          {!fieldString(fields.Heading) && 'Legal news and analysis'}
        </h2>
        <p className="pm-outlaw__lede">
          <Text field={asTextField(fields.Subtitle)} />
          {!fieldString(fields.Subtitle) &&
            'Hour by hour news and analysis of the events and trends shaping your decision-making, produced by our dedicated team of reporters.'}
        </p>

        <div className="pm-outlaw__carousel">
          {items.length > 0
            ? items.map((item, index) => {
                const href = linkHref(item.fields?.Link, '/out-law');
                const link = asLinkField(item.fields?.Link);
                const card = (
                  <>
                    <span className="pm-outlaw__kicker">
                      <Text field={asTextField(item.fields?.Kicker)} />
                    </span>
                    <span className="pm-outlaw__title">
                      <Text field={asTextField(item.fields?.Title)} />
                    </span>
                    <span className="pm-outlaw__meta">
                      <Text field={asTextField(item.fields?.Date)} />
                    </span>
                    {fieldString(item.fields?.ReadTime).trim() ? (
                      <span className="pm-outlaw__read">
                        <Text field={asTextField(item.fields?.ReadTime)} />
                      </span>
                    ) : null}
                  </>
                );
                return (
                  <div className="pm-outlaw__card" key={item.id || index}>
                    {link && (link.value?.href || isEditing) ? (
                      <ContentSdkLink field={link} className="pm-outlaw__card-link">
                        {card}
                      </ContentSdkLink>
                    ) : (
                      <Link className="pm-outlaw__card-link" href={href}>
                        {card}
                      </Link>
                    )}
                  </div>
                );
              })
            : OUTLAW_NEWS.map((item) => (
                <div className="pm-outlaw__card" key={item.title}>
                  <Link className="pm-outlaw__card-link" href={item.href}>
                    <span className="pm-outlaw__kicker">{item.kicker}</span>
                    <span className="pm-outlaw__title">{item.title}</span>
                    <span className="pm-outlaw__meta">{item.meta}</span>
                  </Link>
                </div>
              ))}
        </div>

        {more ? (
          <ContentSdkLink field={more} className="pm-btn-light" />
        ) : (
          <Link className="pm-btn-light" href="/out-law">
            {linkText(fields.MoreLink, 'Read more')}
          </Link>
        )}
      </div>
    </section>
  );
};

export default Default;
