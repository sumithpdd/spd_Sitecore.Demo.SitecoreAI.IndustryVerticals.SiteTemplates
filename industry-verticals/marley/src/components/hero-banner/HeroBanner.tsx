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
  hasImageFieldValue,
  hasRichTextFieldValue,
  hasTextFieldValue,
  normalizeImageField,
  normalizeRichTextField,
  normalizeTextField,
  resolveKitFields,
  richTextFieldValue,
  textFieldValue,
} from '@/helpers/field-utils';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: RichTextField;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

type ResolvedHeroFields = {
  Title?: Field<string>;
  Description?: RichTextField;
  Image?: ImageField;
  Video?: ImageField;
};

const resolveHeroFields = (fields: Fields): ResolvedHeroFields => {
  const kit = resolveKitFields<Fields>(fields);

  return {
    Title: normalizeTextField(kit.Title),
    Description: normalizeRichTextField(kit.Description),
    Image: normalizeImageField(kit.Image),
    Video: normalizeImageField(kit.Video),
  };
};

const HeroBannerCommon = ({
  params,
  fields,
  children,
  topContent,
}: {
  params: HeroBannerProps['params'];
  fields: ResolvedHeroFields;
  rendering: HeroBannerProps['rendering'];
  children: React.ReactNode;
  topContent?: boolean;
}) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;
  const hideGradientOverlay = styles?.includes('hide-gradient-overlay');
  const hasContent =
    hasTextFieldValue(fields.Title) || hasRichTextFieldValue(fields.Description) || isPageEditing;

  if (!hasContent && !hasImageFieldValue(fields.Image) && !hasImageFieldValue(fields.Video)) {
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
        {!isPageEditing && fields.Video?.value?.src ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={fields.Image?.value?.src}
          >
            <source src={fields.Video.value.src} type="video/webm" />
          </video>
        ) : hasImageFieldValue(fields.Image) || isPageEditing ? (
          <ContentSdkImage
            field={fields.Image}
            className="h-full w-full object-cover md:object-bottom"
            priority
          />
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
}: {
  fields: ResolvedHeroFields;
  reverseLayout: boolean;
}) => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const title = textFieldValue(fields.Title);
  const description = richTextFieldValue(fields.Description);

  return (
    <div
      className={`flex w-full ${
        reverseLayout ? 'justify-end text-right' : 'justify-start text-left'
      }`}
    >
      <div>
        {(title || isPageEditing) && (
          <h1 className="font-heading text-background-muted text-4xl tracking-tight capitalize lg:text-7xl">
            {isPageEditing ? <ContentSdkText field={fields.Title} /> : title}
          </h1>
        )}

        {(description || isPageEditing) && (
          <div className="text-background-muted text-md lg:text-xl">
            {isPageEditing ? (
              <ContentSdkRichText field={fields.Description} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const reverseLayout = styles.includes('reversed');
  const resolved = resolveHeroFields(fields);

  return (
    <HeroBannerCommon params={params} fields={resolved} rendering={rendering}>
      <div className="relative flex h-full w-full flex-grow items-end">
        <div className="container mx-auto flex h-full items-end px-4 py-6">
          <HeroBannerBody fields={resolved} reverseLayout={reverseLayout} />
        </div>
      </div>
    </HeroBannerCommon>
  );
};

export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const reverseLayout = styles.includes('reversed');
  const resolved = resolveHeroFields(fields);

  return (
    <HeroBannerCommon params={params} fields={resolved} rendering={rendering} topContent>
      <div className="relative flex h-full w-full flex-grow items-start">
        <div className="container mx-auto flex h-full items-start">
          <HeroBannerBody fields={resolved} reverseLayout={!reverseLayout} />
        </div>
      </div>
    </HeroBannerCommon>
  );
};
