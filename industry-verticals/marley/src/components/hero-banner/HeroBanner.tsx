import { ComponentProps } from '@/lib/component-props';

/** Plain HTML hero — no Sitecore fields or helpers. */
const HeroBannerHtml = ({ params }: ComponentProps & { fields?: unknown }) => {
  const id = params?.RenderingIdentifier;

  return (
    <section
      className={`component hero-banner ${params?.styles ?? ''}`}
      id={id || undefined}
      style={{
        background: '#1e3a5f',
        color: '#fff',
        minHeight: '320px',
        padding: '48px 24px',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>Hero Banner Test</h1>
        <p style={{ fontSize: '1.125rem', marginTop: '16px', opacity: 0.9 }}>
          Plain HTML only — no field-utils, no Sitecore Text/Image.
        </p>
      </div>
    </section>
  );
};

export const Default = HeroBannerHtml;
export const TopContent = HeroBannerHtml;
