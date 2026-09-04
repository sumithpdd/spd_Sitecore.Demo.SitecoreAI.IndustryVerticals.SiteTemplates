/**
 * Brother UK demo article catalogue — blog / inspiration dummy data for ArticleBody + search.
 */
import type { BrotherImageKey } from './demo-images';

export type BrotherArticle = {
  slug: string;
  href: string;
  /** Section eyebrow, e.g. "Brother for home · Blog" */
  eyebrow: string;
  /** Primary H1 / heading */
  heading: string;
  /** Short card / search description */
  description: string;
  /** Lead paragraph under the heading */
  lead: string;
  /** HTML body */
  bodyHtml: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  /** ISO for sorting */
  publishedAt: string;
  category: 'Home office' | 'Labelling' | 'Printing' | 'Business' | 'Campaign';
  tags: string[];
  readTimeMinutes: number;
  imageKey: BrotherImageKey;
  ctaLabel: string;
  ctaHref: string;
  relatedProductSlugs: string[];
  relatedArticleSlugs: string[];
  keywords: string[];
};

export const BROTHER_ARTICLES: BrotherArticle[] = [
  {
    slug: '5-great-ideas-for-organising-your-desk-and-home-office',
    href: '/brother-for-home/blog/your-home-office/2024/5-great-ideas-for-organising-your-desk-and-home-office',
    eyebrow: 'Brother for home · Blog',
    heading: '5 great ideas for organising your desk and home office',
    description:
      'Colour-code drawers, cables and shelves with the VC-500W — a tidy desk for hybrid work.',
    lead: 'A tidy desk starts with clear labels — colour-code cables, drawers and storage with the VC-500W.',
    bodyHtml: `<p>Working from home means your desk has to work harder. Clear labelling helps you find what you need, reduce clutter, and keep cables under control.</p>
<p><strong>1. Colour-code drawers</strong> — use 12–19mm labels for folders and trays.</p>
<p><strong>2. Mark cable ends</strong> — 9mm labels stop the “which charger?” hunt.</p>
<p><strong>3. Shelf signage</strong> — 25–50mm labels make storage obvious at a glance.</p>
<p><strong>4. Visitor and desk badges</strong> — print names in full colour for hybrid days.</p>
<p><strong>5. Project boxes</strong> — label archives so everyday life stays calm.</p>
<p>Ready to try it? Explore the <a href="/labelling-and-receipts/vc-500w">VC-500W</a>.</p>`,
    author: 'Izzy Chen',
    authorRole: 'Content marketing · Brother UK',
    publishedDate: '12 March 2024',
    publishedAt: '2024-03-12',
    category: 'Home office',
    tags: ['VC-500W', 'labelling', 'home office', 'organisation'],
    readTimeMinutes: 4,
    imageKey: 'articleHero',
    ctaLabel: 'See the VC-500W',
    ctaHref: '/labelling-and-receipts/vc-500w',
    relatedProductSlugs: ['vc-500w', 'dk-22205'],
    relatedArticleSlugs: ['colour-labels-without-ink', 'hybrid-desk-setup'],
    keywords: ['desk', 'organise', 'home office', 'labels', 'vc-500w', 'blog'],
  },
  {
    slug: 'colour-labels-without-ink',
    href: '/brother-for-home/blog/labelling/2024/colour-labels-without-ink',
    eyebrow: 'Labelling · How it works',
    heading: 'Full-colour labels without ink cartridges',
    description:
      'How ZINK Zero Ink on the VC-500W prints colour from crystals in the roll — no mess, no cartridges.',
    lead: 'ZINK technology embeds colour crystals in the label roll. Heat activates them — so the VC-500W never needs ink.',
    bodyHtml: `<p>Cartridge-free colour is the VC-500W’s signature. Instead of CMYK tanks, the media carries microscopic crystals that change when heated.</p>
<p><strong>Why marketers care</strong> — Content Hub can approve one product story (no ink, five widths, touchpad cutter) and reuse it across web, email and paid social in the At your side pack.</p>
<p><strong>Why customers care</strong> — no smudges, no cartridge waste, and labels cut to length for file tabs through 50mm signage.</p>
<p>Pair with continuous DK-style craft rolls and the vertical applications guide for industry use cases.</p>`,
    author: 'Izzy Chen',
    authorRole: 'Content marketing · Brother UK',
    publishedDate: '2 April 2024',
    publishedAt: '2024-04-02',
    category: 'Labelling',
    tags: ['VC-500W', 'ZINK', 'colour', 'Content Hub'],
    readTimeMinutes: 3,
    imageKey: 'vc500wColour',
    ctaLabel: 'Explore VC-500W',
    ctaHref: '/devices/label-printer/vc/vc500w',
    relatedProductSlugs: ['vc-500w', 'ql-800'],
    relatedArticleSlugs: [
      '5-great-ideas-for-organising-your-desk-and-home-office',
      'at-your-side-one-brief',
    ],
    keywords: ['zink', 'colour', 'ink', 'vc-500w', 'labelling'],
  },
  {
    slug: 'hybrid-desk-setup',
    href: '/brother-for-home/blog/your-home-office/2024/hybrid-desk-setup',
    eyebrow: 'Brother for home · Tips',
    heading: 'Build a hybrid desk that survives Monday mornings',
    description:
      'Printers, labels and scanners that keep home-office Jack productive between office days.',
    lead: 'Jack’s SERP journey starts with a home laser — but a calm desk also needs labelling and a compact scanner.',
    bodyHtml: `<p>Hybrid workers bounce between kitchen tables and shared offices. A short stack of Brother devices keeps both worlds consistent.</p>
<ul>
<li><strong>HL-L2460DN</strong> — mono laser with duplex for everyday docs.</li>
<li><strong>VC-500W</strong> — colour labels for drawers, cables and visitor badges.</li>
<li><strong>ADS-1800W</strong> — portable scans when you are not at the desk.</li>
</ul>
<p>When Jack returns (return-visit UTM), surface the same shortlist plus an ink reminder so supplies attach naturally.</p>`,
    author: 'Sam Patel',
    authorRole: 'Product storytelling',
    publishedDate: '18 May 2024',
    publishedAt: '2024-05-18',
    category: 'Home office',
    tags: ['hybrid', 'Jack', 'printers', 'scanners'],
    readTimeMinutes: 5,
    imageKey: 'homeHero',
    ctaLabel: 'Browse printers',
    ctaHref: '/printers?utm_campaign=home-printer&utm_source=google&persona=jack',
    relatedProductSlugs: ['hl-l2460dn', 'vc-500w', 'ads-1800w'],
    relatedArticleSlugs: [
      '5-great-ideas-for-organising-your-desk-and-home-office',
      'toner-reorder-without-friction',
    ],
    keywords: ['hybrid', 'desk', 'jack', 'laser', 'home office'],
  },
  {
    slug: 'at-your-side-one-brief',
    href: '/brother-for-home/blog/campaigns/2024/at-your-side-one-brief',
    eyebrow: 'Campaign · At your side',
    heading: 'One brief. Web, email, paid social.',
    description:
      'How Izzy turns a SitecoreAI Signal into a governed multi-channel pack with Content Hub approvals.',
    lead: 'At your side shows marketers shipping a campaign without an engineering ticket for every layout tweak.',
    bodyHtml: `<p>Izzy starts from a SitecoreAI Signal — home-office printer consideration and labelling interest rising — then pulls Content Hub–approved assets into modular components.</p>
<p><strong>Web</strong> — campaign landing with UTMs into printers and labelling.</p>
<p><strong>Email</strong> — shortlist + ink reminder nurture using the same journey IDs.</p>
<p><strong>Paid social</strong> — Instagram / Facebook creative from the same DAM pack.</p>
<p>Open the campaign landing to walk the beat, then continue into Jack’s printers journey or the VC-500W PDP.</p>`,
    author: 'Izzy Chen',
    authorRole: 'Marketing · Brother UK demo',
    publishedDate: '8 June 2024',
    publishedAt: '2024-06-08',
    category: 'Campaign',
    tags: ['At your side', 'Izzy', 'SitecoreAI', 'Content Hub'],
    readTimeMinutes: 4,
    imageKey: 'vc500wLaptop',
    ctaLabel: 'Open campaign landing',
    ctaHref: '/campaigns/at-your-side?utm_campaign=at-your-side&persona=izzy',
    relatedProductSlugs: ['vc-500w', 'dcp-l3520cdw'],
    relatedArticleSlugs: ['colour-labels-without-ink', 'toner-reorder-without-friction'],
    keywords: ['campaign', 'izzy', 'at your side', 'utm', 'content hub'],
  },
  {
    slug: 'toner-reorder-without-friction',
    href: '/brother-for-home/blog/supplies/2024/toner-reorder-without-friction',
    eyebrow: 'Supplies · Commerce',
    heading: 'Toner reorder without friction — OrderCloud attach rate',
    description:
      'Rick’s CRO view: PCM metadata keeps TN-243BK matched to Jack’s printer so reorder and attach rate stay measurable.',
    lead: 'Genuine supplies stay the source of truth. When Jack shortlists a laser, Rick’s OrderCloud cart already knows the toner SKU.',
    bodyHtml: `<p>Attach rate only works when product and supply metadata stay aligned across CMS, search and commerce.</p>
<p><strong>TN-243BK</strong> maps to HL / DCP / MFC lasers in the demo catalogue.</p>
<p><strong>DK-22205</strong> attaches to QL label printers for warehouse and office rolls.</p>
<p>Walk Rick’s beat: open Supplies with the ordercloud UTM, then the checkout demo. Identify Jack in the CDP panel after browsing printers to show affinity → supply intent.</p>`,
    author: 'Rick Morales',
    authorRole: 'Merchandising + CRO',
    publishedDate: '22 July 2024',
    publishedAt: '2024-07-22',
    category: 'Business',
    tags: ['OrderCloud', 'Rick', 'toner', 'attach rate'],
    readTimeMinutes: 3,
    imageKey: 'suppliesHero',
    ctaLabel: 'Open OrderCloud checkout',
    ctaHref: '/checkout/supplies?utm_campaign=ordercloud-checkout&persona=rick',
    relatedProductSlugs: ['tn-243bk', 'dk-22205', 'hl-l2460dn'],
    relatedArticleSlugs: ['hybrid-desk-setup', 'at-your-side-one-brief'],
    keywords: ['toner', 'ordercloud', 'rick', 'supplies', 'attach', 'reorder'],
  },
  {
    slug: 'warehouse-labels-that-scan-first-time',
    href: '/brother-for-home/blog/labelling/2024/warehouse-labels-that-scan-first-time',
    eyebrow: 'Labelling · Operations',
    heading: 'Warehouse labels that scan first time',
    description:
      'QL-820NWB and TD-4550DNWB for shipping, inventory and compliance labels that stay readable.',
    lead: 'Black-and-red desktop labels plus 4-inch barcode printers keep fulfilment lines moving.',
    bodyHtml: `<p>Operations teams need speed and scannability. Brother’s QL network models share labelling across the floor; TD desktops handle wider shipping labels.</p>
<p>Pair with DK continuous rolls and Content Hub product assets so Izzy’s campaign and Rick’s catalogue stay consistent.</p>`,
    author: 'Sam Patel',
    authorRole: 'Product storytelling',
    publishedDate: '5 August 2024',
    publishedAt: '2024-08-05',
    category: 'Labelling',
    tags: ['warehouse', 'QL', 'barcode', 'TD'],
    readTimeMinutes: 3,
    imageKey: 'labellingTile',
    ctaLabel: 'Browse labelling',
    ctaHref: '/labelling-and-receipts',
    relatedProductSlugs: ['ql-820nwb', 'td-4550dnwb', 'dk-22205'],
    relatedArticleSlugs: ['colour-labels-without-ink'],
    keywords: ['warehouse', 'barcode', 'ql', 'shipping', 'inventory'],
  },
];

export function findArticleByPath(pathname: string): BrotherArticle | undefined {
  const path = (pathname || '').split('?')[0].replace(/\/$/, '') || '/';
  return BROTHER_ARTICLES.find(
    (a) => path === a.href || path.endsWith(`/${a.slug}`) || path.includes(`/${a.slug}`)
  );
}

export function findArticleBySlug(slug: string): BrotherArticle | undefined {
  return BROTHER_ARTICLES.find((a) => a.slug === slug);
}

export function articlesByCategory(category: BrotherArticle['category']): BrotherArticle[] {
  return BROTHER_ARTICLES.filter((a) => a.category === category);
}
