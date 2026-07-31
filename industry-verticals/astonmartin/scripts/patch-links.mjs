import { readFileSync, writeFileSync } from 'fs';

const files = [
  'src/components/hero-banner/HeroBanner.tsx',
  'src/components/promo/Promo.tsx',
  'src/components/header/Header.tsx',
  'src/components/footer/Footer.tsx',
  'src/components/stories-grid/StoriesGrid.tsx',
  'src/components/news-strip/NewsStrip.tsx',
  'src/components/model-family-section/ModelFamilySection.tsx',
  'src/components/feature-carousel/FeatureCarousel.tsx',
  'src/components/explore-cta-strip/ExploreCtaStrip.tsx',
  'src/components/model-intro-specs/ModelIntroSpecs.tsx',
  'src/components/quote-block/QuoteBlock.tsx',
  'src/components/model-jump-nav/ModelJumpNav.tsx',
];

for (const f of files) {
  let s = readFileSync(f, 'utf8');
  if (!s.includes('field-helpers')) {
    s = s.replace(
      "from '@/lib/component-props';",
      "from '@/lib/component-props';\nimport { asLink, asText, asImage } from '@/lib/field-helpers';"
    );
  }
  s = s.replace(/<ContentSdkLink field=\{fields\?\.(\w+)\}/g, '<ContentSdkLink field={asLink(fields?.$1)}');
  s = s.replace(/<ContentSdkLink field=\{explore\}/g, '<ContentSdkLink field={asLink(explore)}');
  s = s.replace(/<ContentSdkLink field=\{configure\}/g, '<ContentSdkLink field={asLink(configure)}');
  s = s.replace(/<ContentSdkLink field=\{link\}/g, '<ContentSdkLink field={asLink(link)}');
  s = s.replace(/<ContentSdkLink field=\{tile\.link\}/g, '<ContentSdkLink field={asLink(tile.link)}');
  s = s.replace(/<ContentSdkLink field=\{card\.link\}/g, '<ContentSdkLink field={asLink(card.link)}');
  s = s.replace(/asLink\(asLink\(([^)]+)\)\)/g, 'asLink($1)');
  writeFileSync(f, s);
  console.log('patched', f);
}
