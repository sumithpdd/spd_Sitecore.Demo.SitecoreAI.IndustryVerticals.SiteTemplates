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
import { getDatasource, pickSdkField } from '@/helpers/field-utils';
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

  return {
    title: pickSdkField<Field<string>>(ds, 'title', 'Title'),
    description: pickSdkField<RichTextField>(ds, 'description', 'Description'),
    image: pickSdkField<ImageField>(ds, 'image', 'Image'),
    video: pickSdkField<ImageField>(ds, 'video', 'Video'),
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
    Boolean(fields.title?.value) || Boolean(fields.description?.value) || isPageEditing;

  if (!hasContent && !fields.image?.value?.src && !fields.video?.value?.src) {
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
        {!isPageEditing && fields.video?.value?.src ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={fields.image?.value?.src}
          >
            <source src={fields.video.value.src} type="video/webm" />
          </video>
        ) : fields.image?.value?.src || isPageEditing ? (
          <ContentSdkImage
            field={fields.image}
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

  return (
    <div
      className={`flex w-full ${
        reverseLayout ? 'justify-end text-right' : 'justify-start text-left'
      }`}
    >
      <div>
        {(fields.title?.value || isPageEditing) && (
          <h1 className="font-heading text-background-muted text-4xl tracking-tight capitalize lg:text-7xl">
            <ContentSdkText field={fields.title} />
          </h1>
        )}

        {(fields.description?.value || isPageEditing) && (
          <div className="text-background-muted text-md lg:text-xl">
            <ContentSdkRichText field={fields.description} />
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
