import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  Link as ContentSdkLink,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asLink } from '@/lib/field-helpers';
import { DEMO_IMAGES, modelTile, withDemoImage } from '@/lib/demo-images';
import { ResolvedImage } from '@/lib/ResolvedImage';
import clsx from 'clsx';

interface Fields {
  AnchorId?: Field<string>;
  Eyebrow?: Field<string>;
  Title?: Field<string>;
  Description?: Field<string>;
  ExploreLink?: LinkField;
  SpecPower?: Field<string>;
  SpecAccel?: Field<string>;
  SpecTopSpeed?: Field<string>;
  HeroImage?: ImageField;
  DetailImageOne?: ImageField;
  DetailImageTwo?: ImageField;
  DetailImageThree?: ImageField;
  VariantOneTitle?: Field<string>;
  VariantOneDescription?: Field<string>;
  VariantOneImage?: ImageField;
  VariantOneExplore?: LinkField;
  VariantOneConfigure?: LinkField;
  VariantTwoTitle?: Field<string>;
  VariantTwoDescription?: Field<string>;
  VariantTwoImage?: ImageField;
  VariantTwoExplore?: LinkField;
  VariantTwoConfigure?: LinkField;
  VariantThreeTitle?: Field<string>;
  VariantThreeDescription?: Field<string>;
  VariantThreeImage?: ImageField;
  VariantThreeExplore?: LinkField;
  VariantThreeConfigure?: LinkField;
}

type Props = ComponentProps & { fields: Fields };

const FAMILY_BY_ANCHOR: Record<string, string> = {
  db12: DEMO_IMAGES.familyDb12,
  vantage: DEMO_IMAGES.familyVantage,
  vanquish: DEMO_IMAGES.familyVanquish,
  dbx: DEMO_IMAGES.familyDbx,
  valhalla: DEMO_IMAGES.familyValhalla,
  valkyrie: DEMO_IMAGES.familyValkyrie,
  valour: DEMO_IMAGES.familyValour,
  valiant: DEMO_IMAGES.familyValiant,
  amr26: DEMO_IMAGES.familyAmr26,
};

function normalizeAnchor(anchor?: string): string {
  return (anchor || '').toLowerCase().replace(/^#/, '').trim();
}

function familyImageForAnchor(anchor?: string): string {
  const key = normalizeAnchor(anchor);
  return FAMILY_BY_ANCHOR[key] ?? DEMO_IMAGES.familyDb12;
}

function tileSlugForAnchor(anchor?: string): string {
  const key = normalizeAnchor(anchor);
  return key in FAMILY_BY_ANCHOR ? key : 'db12';
}

const VariantCard = ({
  title,
  description,
  image,
  explore,
  configure,
  isEditing,
}: {
  title?: Field<string>;
  description?: Field<string>;
  image: ImageField;
  explore?: LinkField;
  configure?: LinkField;
  isEditing: boolean;
}): JSX.Element | null => {
  if (!title?.value && !isEditing) return null;
  return (
    <article className="flex flex-col gap-3">
      <div className="aspect-[16/9] overflow-hidden bg-neutral-100">
        <ResolvedImage field={image} className="h-full w-full object-cover" />
      </div>
      <h3 className="text-xl font-semibold">
        <ContentSdkText field={title} />
      </h3>
      <div className="text-sm text-neutral-600">
        <ContentSdkRichText field={description} />
      </div>
      <div className="mt-2 flex flex-wrap gap-3">
        <ContentSdkLink field={asLink(explore)} className="text-sm font-semibold hover:underline" />
        <ContentSdkLink field={asLink(configure)} className="am-btn am-btn-outline-teal px-3 py-2 text-[0.7rem]" />
      </div>
    </article>
  );
};

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;
  const anchor = fields?.AnchorId?.value || undefined;
  const tileSlug = tileSlugForAnchor(anchor);
  const alt = fields?.Title?.value || '';

  const heroImage = withDemoImage(fields?.HeroImage, familyImageForAnchor(anchor), alt);
  const detailImages = [
    withDemoImage(fields?.DetailImageOne, modelTile(tileSlug, 1), alt),
    withDemoImage(fields?.DetailImageTwo, modelTile(tileSlug, 2), alt),
    withDemoImage(fields?.DetailImageThree, modelTile(tileSlug, 3), alt),
  ];
  const variantOneImage = withDemoImage(fields?.VariantOneImage, modelTile(tileSlug, 1), fields?.VariantOneTitle?.value || '');
  const variantTwoImage = withDemoImage(fields?.VariantTwoImage, modelTile(tileSlug, 2), fields?.VariantTwoTitle?.value || '');
  const variantThreeImage = withDemoImage(fields?.VariantThreeImage, modelTile(tileSlug, 3), fields?.VariantThreeTitle?.value || '');

  return (
    <section
      id={anchor || params?.RenderingIdentifier}
      className={clsx('component model-family-section border-b border-neutral-200 bg-white py-16 md:py-24', params?.styles)}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {(fields?.Eyebrow?.value || isEditing) && (
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[var(--am-teal)] uppercase">
            <ContentSdkText field={fields?.Eyebrow} />
          </p>
        )}
        <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
          <ContentSdkText field={fields?.Title} />
        </h2>
        <div className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">
          <ContentSdkRichText field={fields?.Description} />
        </div>
        <div className="mt-6">
          <ContentSdkLink field={asLink(fields?.ExploreLink)} className="am-btn am-btn-teal" />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            { label: 'Power', field: fields?.SpecPower },
            { label: '0-62', field: fields?.SpecAccel },
            { label: 'Top speed', field: fields?.SpecTopSpeed },
          ].map((spec) => (
            <div key={spec.label} className="border-t border-neutral-200 pt-4">
              <p className="text-xs tracking-wide text-neutral-500 uppercase">{spec.label}</p>
              <p className="mt-1 text-2xl font-semibold">
                <ContentSdkText field={spec.field} />
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 aspect-[16/10] overflow-hidden bg-neutral-100">
            <ResolvedImage field={heroImage} className="h-full w-full object-cover" />
          </div>
          <div className="grid gap-4">
            {detailImages.map((img, i) => (
              <div key={i} className="aspect-[16/10] overflow-hidden bg-neutral-100">
                <ResolvedImage field={img} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          <VariantCard
            title={fields?.VariantOneTitle}
            description={fields?.VariantOneDescription}
            image={variantOneImage}
            explore={fields?.VariantOneExplore}
            configure={fields?.VariantOneConfigure}
            isEditing={isEditing}
          />
          <VariantCard
            title={fields?.VariantTwoTitle}
            description={fields?.VariantTwoDescription}
            image={variantTwoImage}
            explore={fields?.VariantTwoExplore}
            configure={fields?.VariantTwoConfigure}
            isEditing={isEditing}
          />
          <VariantCard
            title={fields?.VariantThreeTitle}
            description={fields?.VariantThreeDescription}
            image={variantThreeImage}
            explore={fields?.VariantThreeExplore}
            configure={fields?.VariantThreeConfigure}
            isEditing={isEditing}
          />
        </div>
      </div>
    </section>
  );
};
