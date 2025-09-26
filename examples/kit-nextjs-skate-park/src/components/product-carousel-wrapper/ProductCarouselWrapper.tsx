import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import { ComponentProps } from '@/lib/component-props';
import { Field, Link, LinkField, Placeholder, Text } from '@sitecore-content-sdk/nextjs';

interface Fields {
  Title: Field<string>;
  Link: LinkField;
}

interface ProductCarouselWrapperProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields, rendering }: ProductCarouselWrapperProps) => {
  const { styles, RenderingIdentifier: id } = params;
  const hideAccentLine = isParamEnabled(params.HideAccentLine);
  const placeholderKey = `product-carousel-${params.DynamicPlaceholderId}`;

  return (
    <section className={`component product-carousel-wrapper pt-14 pb-10 ${styles}`} id={id}>
      <div className="container flex flex-col items-center">
        <h2>
          <Text field={fields.Title} />
          {!hideAccentLine && <AccentLine className="ml-auto !h-4 w-[8ch]" />}
        </h2>

        <div className="mt-5 mb-12 w-full">
          <Placeholder name={placeholderKey} rendering={rendering} />
        </div>

        <Link field={fields.Link} className="arrow-btn" />
      </div>
    </section>
  );
};
