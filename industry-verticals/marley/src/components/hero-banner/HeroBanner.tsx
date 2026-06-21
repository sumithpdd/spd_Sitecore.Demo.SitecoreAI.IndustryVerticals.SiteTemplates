import {
  Field,
  ImageField,
  RichTextField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import {
  getDatasource,
  imageAltValue,
  normalizeImageField,
  normalizeRichTextField,
  normalizeTextField,
  pickSdkField,
  richTextFieldValue,
  textFieldValue,
} from '@/helpers/field-utils';
import { IGQLField } from '@/types/igql';

type HeroDatasource = {
  title?: IGQLField<Field<string>>;
  description?: IGQLField<RichTextField>;
  image?: IGQLField<ImageField>;
  video?: IGQLField<ImageField>;
  Title?: Field<string>;
  Description?: RichTextField;
  Image?: ImageField;
  Video?: ImageField;
};

interface Fields {
  data?: {
    datasource?: HeroDatasource;
  };
  Title?: Field<string>;
  Description?: RichTextField;
  Image?: ImageField;
  Video?: ImageField;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

type ResolvedHeroFields = {
  title?: Field<string>;
  description?: RichTextField;
  image?: ImageField;
  video?: ImageField;
};

const resolveHeroFields = (fields: Fields): ResolvedHeroFields => {
  const ds = getDatasource(fields);
  const gql = fields?.data?.datasource;

  const rawTitle = gql?.title?.jsonValue ?? pickSdkField<Field<string>>(ds, 'title', 'Title');
  const rawDescription =
    gql?.description?.jsonValue ?? pickSdkField<RichTextField>(ds, 'description', 'Description');
  const rawImage = gql?.image?.jsonValue ?? pickSdkField<ImageField>(ds, 'image', 'Image');
  const rawVideo = gql?.video?.jsonValue ?? pickSdkField<ImageField>(ds, 'video', 'Video');

  return {
    title: normalizeTextField(rawTitle),
    description: normalizeRichTextField(rawDescription),
    image: normalizeImageField(rawImage),
    video: normalizeImageField(rawVideo),
  };
};

const HeroBannerCommon = ({
  params,
  fields,
  children,
  topContent,
  isPageEditing,
}: {
  params: HeroBannerProps['params'];
  fields: ResolvedHeroFields;
  rendering: HeroBannerProps['rendering'];
  children: React.ReactNode;
  topContent?: boolean;
  isPageEditing: boolean;
}) => {
  const { styles, RenderingIdentifier: id } = params;
  const hideGradientOverlay = styles?.includes('hide-gradient-overlay');
  const imageSrc = fields.image?.value?.src;
  const videoSrc = fields.video?.value?.src;
  const hasContent =
    Boolean(textFieldValue(fields.title)) ||
    Boolean(richTextFieldValue(fields.description)) ||
    isPageEditing;

  if (!hasContent && !imageSrc && !videoSrc) {
    return isPageEditing ? (
      <div className={`component hero-banner min-h-screen ${styles}`} id={id}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <section
      className={`component hero-banner ${styles} relative flex min-h-screen flex-col items-center py-10`}
      id={id}
    >
      <div className="absolute inset-0 z-0">
        {!isPageEditing && videoSrc ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={imageSrc}
          >
            <source src={videoSrc} type="video/webm" />
          </video>
        ) : imageSrc || isPageEditing ? (
          isPageEditing ? (
            <ContentSdkImage
              field={fields.image}
              className="h-full w-full object-cover md:object-bottom"
              priority
            />
          ) : (
            <img
              src={imageSrc}
              alt={imageAltValue(fields.image)}
              className="h-full w-full object-cover md:object-bottom"
            />
          )
        ) : (
          <div className="bg-background-muted h-full w-full" />
        )}
        {hideGradientOverlay && (
          <div
            className={`to-foreground/80 absolute inset-0 ${topContent ? 'bg-gradient-to-t' : 'bg-gradient-to-b'} from-transparent from-40%`}
          ></div>
        )}
      </div>

      {children}
    </section>
  );
};

const HeroBannerBody = ({
  fields,
  reverseLayout,
  isPageEditing,
}: {
  fields: ResolvedHeroFields;
  reverseLayout: boolean;
  isPageEditing: boolean;
}) => {
  const title = textFieldValue(fields.title);
  const description = richTextFieldValue(fields.description);

  return (
    <div
      className={`flex w-full ${
        reverseLayout ? 'justify-end text-right' : 'justify-start text-left'
      }`}
    >
      <div>
        {(title || isPageEditing) &&
          (isPageEditing ? (
            <h1 className="font-heading text-background-muted text-4xl tracking-tight capitalize lg:text-7xl">
              <ContentSdkText field={fields.title} />
            </h1>
          ) : (
            <h1 className="font-heading text-background-muted text-4xl tracking-tight capitalize lg:text-7xl">
              {title}
            </h1>
          ))}

        {(description || isPageEditing) &&
          (isPageEditing ? (
            <div className="text-background-muted text-md lg:text-xl">
              <ContentSdkRichText field={fields.description} />
            </div>
          ) : (
            <div
              className="text-background-muted text-md lg:text-xl"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ))}
      </div>
    </div>
  );
};

export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const styles = params.styles || '';
  const reverseLayout = styles.includes('reversed');
  const resolved = resolveHeroFields(fields);

  return (
    <HeroBannerCommon
      params={params}
      fields={resolved}
      rendering={rendering}
      isPageEditing={isPageEditing}
    >
      <div className="relative flex h-full w-full flex-grow items-end">
        <div className="container mx-auto flex h-full items-end px-4 py-6">
          <HeroBannerBody
            fields={resolved}
            reverseLayout={reverseLayout}
            isPageEditing={isPageEditing}
          />
        </div>
      </div>
    </HeroBannerCommon>
  );
};

export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const styles = params.styles || '';
  const reverseLayout = styles.includes('reversed');
  const resolved = resolveHeroFields(fields);

  return (
    <HeroBannerCommon
      params={params}
      fields={resolved}
      rendering={rendering}
      topContent
      isPageEditing={isPageEditing}
    >
      <div className="relative flex h-full w-full flex-grow items-start">
        <div className="container mx-auto flex h-full items-start">
          <HeroBannerBody
            fields={resolved}
            reverseLayout={!reverseLayout}
            isPageEditing={isPageEditing}
          />
        </div>
      </div>
    </HeroBannerCommon>
  );
};
