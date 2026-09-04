import { readFileSync, writeFileSync } from 'node:fs';

const brotherPath = 'docs/BROTHER.md';
let brother = readFileSync(brotherPath, 'utf8');
const start = brother.indexOf('## Components');
const end = brother.indexOf('Layout falls back', start);
if (start < 0 || end < 0) {
  throw new Error(`BROTHER.md markers missing: ${start}, ${end}`);
}

const section = `## Components

CMS-editable via Project/brother templates. Datasource folders live under \`Data/Hero Banners\`, \`Feature Grids\`, \`Product Listings\`, \`Articles\`, \`Promo Strips\`, \`Product Details\`, \`Related Products\`, \`Campaign Landings\`. PDPs use **ProductPage** fields (images, features, related Treelist); articles use **ArticlePage** + \`ArticleBody\` datasource.

| Component | Role |
|-----------|------|
| \`Header\` / \`HeaderSearch\` | Partial Design \`Header\` + typeahead |
| \`CdpProfileShell\` | Floating CDP panel — affinities, journey, identify Jack |
| \`Footer\` | Partial Design \`Footer\` |
| \`HeroBanner\` | Home banner datasource + UTM intent overlays |
| \`CampaignLanding\` | \`/campaigns/at-your-side\` multi-channel pack (CMS fields) |
| \`OrderCloudCheckout\` | \`/checkout/supplies\` commerce demo |
| \`PromoStrip\` | Labelling CTA band (CMS) |
| \`ProductListing\` | Title / Category / Intro datasource + catalogue grid |
| \`ProductDetail\` | ProductPage fields + images / features / related |
| \`RelatedProducts\` | Treelist of ProductPages |
| \`SiteSearch\` | Full search UI on \`/search\` |
| \`FeatureGrid\` | Three CMS cards + CTA |
| \`ArticleBody\` | Blog/article body (also reads ArticlePage route fields) |
| \`PartialDesignDynamicPlaceholder\` | Resolves page-design partials |

Regenerate component templates: \`node authoring/items/brother/scripts/generate-brother-component-templates.mjs\` then \`dotnet sitecore serialization validate --fix -i brother-scs\` and push.

`;

writeFileSync(brotherPath, brother.slice(0, start) + section + brother.slice(end));
console.log('BROTHER.md updated');

const componentsPath = 'docs/COMPONENTS.md';
let components = readFileSync(componentsPath, 'utf8');
const replacements = [
  [
    '| `HeroBanner` | Default | Story intents (label, home-printer, at-your-side, return, supplies) |',
    '| `HeroBanner` | Default | CMS Home Banner + story UTM intents |',
  ],
  [
    '| `ProductDetail` | Default | ProductContent partial / PDP + OrderCloud CTA |',
    '| `ProductDetail` | Default | ProductPage CMS fields (images, features, related) |\n| `RelatedProducts` | Default | Treelist of ProductPages |',
  ],
  [
    '| `ProductListing` | Default | ProductCategoryContent partial / category grids |',
    '| `ProductListing` | Default | CMS Title/Category/Intro + catalogue grid |',
  ],
  [
    '| `FeatureGrid` | Default | Vertical applications cards |',
    '| `FeatureGrid` | Default | CMS three-card grid |',
  ],
  [
    '| `ArticleBody` | Default | Desk organisation article |',
    '| `ArticleBody` | Default | CMS article / ArticlePage fields |',
  ],
  [
    '| `CampaignLanding` | Default | `/campaigns/at-your-side` multi-channel pack |',
    '| `CampaignLanding` | Default | CMS campaign landing |',
  ],
  ['| `PromoStrip` | Default | Labelling CTA band |', '| `PromoStrip` | Default | CMS promo band |'],
];

for (const [from, to] of replacements) {
  if (components.includes(from)) {
    components = components.replace(from, to);
    console.log('replaced', from.slice(0, 40));
  } else {
    console.log('skip missing', from.slice(0, 40));
  }
}
writeFileSync(componentsPath, components);
console.log('COMPONENTS.md updated');
