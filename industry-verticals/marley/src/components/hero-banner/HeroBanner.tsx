import {
  Field,
  ImageField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { resolveKitFields } from '@/helpers/field-utils';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: Field<string>;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

const HeroBannerCommon = ({
  params,
  fields,
  children,
  topContent,
}: {
  params: HeroBannerProps['params'];
  fields: Partial<Fields>;
  rendering: HeroBannerProps['rendering'];
  children: React.ReactNode;
  topContent?: boolean;
}) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;
  const hideGradientOverlay = styles?.includes('hide-gradient-overlay');
  const hasContent = Boolean(fields?.Title?.value || fields?.Description?.value || isPageEditing);

  if (!hasContent && !fields?.Image?.value?.src && !fields?.Video?.value?.src) {
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
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {!isPageEditing && fields?.Video?.value?.src ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={fields.Image?.value?.src}
          >
            <source src={fields.Video?.value?.src} type="video/webm" />
          </video>
        ) : fields?.Image?.value?.src || isPageEditing ? (
          <ContentSdkImage
            field={fields.Image}
            className="h-full w-full object-cover md:object-bottom"
            priority
          />
        ) : (
          <div className="bg-background-muted h-full w-full" />
        )}
        {/* Gradient overlay */}
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
  fields: Partial<Fields>;
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
        {(fields.Title?.value || isPageEditing) && (
          <h1 className="font-heading text-background-muted text-4xl tracking-tight capitalize lg:text-7xl">
            <ContentSdkText field={fields.Title} />
          </h1>
        )}

        {(fields.Description?.value || isPageEditing) && (
          <div className="text-background-muted text-md lg:text-xl">
            <ContentSdkRichText field={fields.Description} />
          </div>
        )}
      </div>
    </div>
  );
};

/* ------------------- Default (bottom-left) ------------------- */
export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const reverseLayout = styles.includes('reversed');
  const resolved = resolveKitFields<Fields>(fields);

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

/* ------------------- TopContent (top-right) ------------------- */
export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const reverseLayout = styles.includes('reversed');
  const resolved = resolveKitFields<Fields>(fields);

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
