/**
 * Brother UK demo catalogue — drives PDP fallbacks, listings, and search index.
 */
import type { BrotherImageKey } from './demo-images';

export type BrotherProduct = {
  slug: string;
  /** Path under site Home, e.g. /devices/label-printer/ql/ql-800 */
  href: string;
  title: string;
  category: 'Labelling' | 'Printers' | 'Scanners' | 'Supplies';
  subtitle: string;
  description: string;
  features: [string, string, string, string];
  keywords: string[];
  imageKey: BrotherImageKey;
  /** Demo commerce fields */
  sku: string;
  priceGbp: number;
  /** Related product slugs for PDP fallbacks */
  relatedSlugs: string[];
  badge?: string;
};

export const BROTHER_PRODUCTS: BrotherProduct[] = [
  {
    slug: 'vc-500w',
    href: '/devices/label-printer/vc/vc500w',
    title: 'VC-500W Full Colour Label Printer',
    category: 'Labelling',
    subtitle: 'ZINK Zero Ink full-colour labels',
    description:
      'Print crisp full colour labels from your PC, Mac, smartphone or tablet. Compact, quiet, and ink-free.',
    features: [
      'No ink cartridges — ZINK colour crystals in the roll',
      'USB and Wi‑Fi connectivity',
      'Five continuous widths: 9–50mm',
      'Built-in cutter up to 420mm',
    ],
    keywords: ['vc-500w', 'colour', 'zink', 'label', 'craft', 'wifi'],
    imageKey: 'vc500w',
    sku: 'VC500WZU1',
    priceGbp: 149.99,
    relatedSlugs: ['ql-800', 'dk-22205', 'pt-p750w'],
    badge: 'Story hero',
  },
  {
    slug: 'ql-800',
    href: '/devices/label-printer/ql/ql-800',
    title: 'QL-800 Label Printer',
    category: 'Labelling',
    subtitle: 'High-speed black & red desktop labels',
    description:
      'Create professional black and red labels in seconds for warehouses, offices and retail.',
    features: [
      'Ultra-fast printing up to 93 labels/min',
      'Black and red dual-colour DK rolls',
      'USB connectivity with P-touch Editor',
      'Automatic cutter for clean finishes',
    ],
    keywords: ['ql-800', 'ql800', 'red', 'black', 'desktop', 'warehouse'],
    imageKey: 'labellingTile',
    sku: 'QL800ZU1',
    priceGbp: 89.99,
    relatedSlugs: ['ql-820nwb', 'dk-22205', 'vc-500w'],
  },
  {
    slug: 'ql-820nwb',
    href: '/devices/label-printer/ql/ql-820nwb',
    title: 'QL-820NWB Network Label Printer',
    category: 'Labelling',
    subtitle: 'Wireless & networked label printing',
    description:
      'Share labelling across your team with Wi‑Fi, Bluetooth and wired Ethernet connectivity.',
    features: [
      'Wi‑Fi, Bluetooth and Ethernet',
      'Black and red dual colour',
      'Mobile printing apps',
      'Ideal for multi-user offices',
    ],
    keywords: ['ql-820', 'network', 'wifi', 'bluetooth', 'ethernet'],
    imageKey: 'vc500wLaptop',
    sku: 'QL820NWBZU1',
    priceGbp: 189.99,
    relatedSlugs: ['ql-800', 'td-4550dnwb', 'dk-22205'],
    badge: 'Team share',
  },
  {
    slug: 'pt-p750w',
    href: '/devices/label-printer/pt/pt-p750w',
    title: 'PT-P750W Handheld Labeller',
    category: 'Labelling',
    subtitle: 'Wireless TZe tape labelling on the go',
    description: 'Create durable laminated labels from a PC, Mac or smartphone with Wi‑Fi and NFC.',
    features: [
      'TZe laminated tapes for harsh environments',
      'Wi‑Fi and NFC pairing',
      'Rechargeable battery for mobility',
      'P-touch Design&Print app',
    ],
    keywords: ['pt-p750w', 'handheld', 'tze', 'laminated', 'nfc'],
    imageKey: 'vc500wWidths',
    sku: 'PTP750WZU1',
    priceGbp: 119.99,
    relatedSlugs: ['vc-500w', 'ql-800'],
  },
  {
    slug: 'td-4550dnwb',
    href: '/devices/label-printer/td/td-4550dnwb',
    title: 'TD-4550DNWB Desktop Barcode Printer',
    category: 'Labelling',
    subtitle: '4-inch industrial barcode labels',
    description:
      'Print shipping, inventory and compliance labels with USB, LAN, Wi‑Fi and Bluetooth.',
    features: [
      'Up to 4-inch media width',
      '300 dpi for crisp barcodes',
      'Network and wireless interfaces',
      'Peeler and cutter options',
    ],
    keywords: ['td-4550', 'barcode', 'shipping', 'inventory', 'industrial'],
    imageKey: 'vc500wCutter',
    sku: 'TD4550DNWBZU1',
    priceGbp: 429.0,
    relatedSlugs: ['ql-820nwb', 'dk-22205'],
    badge: 'Warehouse',
  },
  {
    slug: 'dcp-l3520cdw',
    href: '/devices/printers/dcp/dcp-l3520cdw',
    title: 'DCP-L3520CDW Colour Laser',
    category: 'Printers',
    subtitle: 'Compact colour laser for home office',
    description: 'Print, copy and scan in colour with wireless connectivity and automatic duplex.',
    features: [
      'Colour laser print / copy / scan',
      'Automatic 2-sided printing',
      'Wi‑Fi and USB',
      'Mobile print (AirPrint, Brother Mobile Connect)',
    ],
    keywords: ['dcp', 'laser', 'colour', 'home office', 'duplex'],
    imageKey: 'homeHero',
    sku: 'DCPL3520CDWZU1',
    priceGbp: 279.99,
    relatedSlugs: ['hl-l2460dn', 'mfc-l8390cdw', 'tn-243bk'],
  },
  {
    slug: 'mfc-l8390cdw',
    href: '/devices/printers/mfc/mfc-l8390cdw',
    title: 'MFC-L8390CDW Business Colour Laser',
    category: 'Printers',
    subtitle: 'A4 colour laser MFP for workgroups',
    description:
      'High-volume colour printing with fax, large paper capacity and secure network features.',
    features: [
      'Print, copy, scan and fax',
      'Fast colour output for teams',
      'Gigabit Ethernet and Wi‑Fi',
      'Secure function lock',
    ],
    keywords: ['mfc', 'business', 'workgroup', 'fax', 'a4'],
    imageKey: 'vc500wLaptop',
    sku: 'MFCL8390CDWZU1',
    priceGbp: 449.0,
    relatedSlugs: ['dcp-l3520cdw', 'ads-4900w', 'tn-243bk'],
    badge: 'Workgroup',
  },
  {
    slug: 'hl-l2460dn',
    href: '/devices/printers/hl/hl-l2460dn',
    title: 'HL-L2460DN Mono Laser',
    category: 'Printers',
    subtitle: 'Reliable black & white network printer',
    description: 'Fast mono laser printing with duplex and wired networking for busy desks.',
    features: ['Up to 34 ppm mono', 'Automatic duplex', 'Ethernet networking', 'Compact footprint'],
    keywords: ['hl-l2460', 'mono', 'black', 'network', 'duplex'],
    imageKey: 'printerHero',
    sku: 'HLL2460DNZU1',
    priceGbp: 159.99,
    relatedSlugs: ['tn-243bk', 'dcp-l3520cdw', 'ads-1800w'],
    badge: 'Jack shortlist',
  },
  {
    slug: 'hl-l2460dw',
    href: '/devices/printers/hl/hl-l2460dw',
    title: 'HL-L2460DW Mono Laser Wi‑Fi',
    category: 'Printers',
    subtitle: 'Wireless mono laser for home office',
    description:
      'Same reliable mono output as the DN with Wi‑Fi for Jack’s hybrid desk — pair with TN-243BK toner.',
    features: [
      'Wi‑Fi and USB connectivity',
      'Automatic duplex',
      'Mobile print ready',
      'Compact footprint for home offices',
    ],
    keywords: ['hl-l2460dw', 'wifi', 'mono', 'jack', 'wireless'],
    imageKey: 'homeHero',
    sku: 'HLL2460DWZU1',
    priceGbp: 179.99,
    relatedSlugs: ['hl-l2460dn', 'tn-243bk', 'vc-500w'],
  },
  {
    slug: 'ads-1800w',
    href: '/devices/scanners/ads/ads-1800w',
    title: 'ADS-1800W Mobile Scanner',
    category: 'Scanners',
    subtitle: 'Wireless portable document scanner',
    description: 'Scan receipts, IDs and documents on the move with Wi‑Fi and USB-C power.',
    features: [
      'Wi‑Fi and USB-C',
      'Compact travel-ready design',
      'Scan to cloud and mobile',
      'Plastic ID card feeder',
    ],
    keywords: ['ads-1800', 'mobile', 'portable', 'receipt', 'wifi'],
    imageKey: 'articleHero',
    sku: 'ADS1800WZU1',
    priceGbp: 219.99,
    relatedSlugs: ['ads-4900w', 'hl-l2460dn'],
  },
  {
    slug: 'ads-4900w',
    href: '/devices/scanners/ads/ads-4900w',
    title: 'ADS-4900W Desktop Scanner',
    category: 'Scanners',
    subtitle: 'High-speed networked document scanning',
    description:
      'Digitise multi-page documents quickly with a large ADF, network share and security options.',
    features: [
      'High-speed ADF scanning',
      'Wired and wireless networking',
      'Scan to email, folder and SharePoint',
      'Ultrasonic multi-feed detection',
    ],
    keywords: ['ads-4900', 'adf', 'desktop', 'sharepoint', 'network'],
    imageKey: 'vc500wColour',
    sku: 'ADS4900WZU1',
    priceGbp: 599.0,
    relatedSlugs: ['ads-1800w', 'mfc-l8390cdw'],
    badge: 'ADF',
  },
  {
    slug: 'tn-243bk',
    href: '/supplies/toner/tn-243bk',
    title: 'TN-243BK Toner Cartridge',
    category: 'Supplies',
    subtitle: 'Genuine black toner for HL / DCP / MFC',
    description:
      'OrderCloud-ready supply SKU matched to Brother laser printers — attach rate and reorder journeys.',
    features: [
      'Genuine Brother toner',
      'Fits HL-L2460DN and colour laser MFPs',
      'PCM metadata feeds CMS + commerce',
      'Reorder reminder in nurture email',
    ],
    keywords: ['toner', 'tn-243', 'ink', 'supplies', 'ordercloud', 'reorder'],
    imageKey: 'suppliesHero',
    sku: 'TN243BK',
    priceGbp: 54.99,
    relatedSlugs: ['hl-l2460dn', 'hl-l2460dw', 'dk-22205'],
    badge: 'Rick attach',
  },
  {
    slug: 'dk-22205',
    href: '/supplies/labels/dk-22205',
    title: 'DK-22205 Continuous Label Roll',
    category: 'Supplies',
    subtitle: 'QL series continuous paper roll',
    description: 'Continuous DK roll for warehouse and office labelling on QL printers.',
    features: [
      'Continuous length for custom sizes',
      'Works with QL-800 / QL-820NWB',
      'Content Hub DAM asset linked',
      'Attach with label printers in cart',
    ],
    keywords: ['dk', 'labels', 'ql', 'supplies', 'roll'],
    imageKey: 'labellingTile',
    sku: 'DK22205',
    priceGbp: 18.49,
    relatedSlugs: ['ql-800', 'ql-820nwb', 'vc-500w'],
  },
  {
    slug: 'tn-243c',
    href: '/supplies/toner/tn-243c',
    title: 'TN-243C Cyan Toner',
    category: 'Supplies',
    subtitle: 'Genuine cyan toner for colour lasers',
    description: 'Colour laser cyan cartridge for DCP / MFC models — completes Rick’s attach set.',
    features: [
      'Genuine Brother cyan toner',
      'Pairs with TN-243BK in cart demos',
      'OrderCloud SKU ready',
      'Matched to colour laser MFPs',
    ],
    keywords: ['toner', 'cyan', 'colour', 'tn-243', 'supplies'],
    imageKey: 'suppliesHero',
    sku: 'TN243C',
    priceGbp: 59.99,
    relatedSlugs: ['tn-243bk', 'dcp-l3520cdw', 'mfc-l8390cdw'],
  },
  {
    slug: 'vc500wcr',
    href: '/devices/label-printer/vc/vc500wcr',
    title: 'VC-500WCR Full Colour Label Printer',
    category: 'Labelling',
    subtitle: 'Store SKU — colour label printer kit',
    description:
      'Store-facing VC-500W colour label printer. Pair with CZ continuous media for full-colour labels without ink.',
    features: [
      'ZINK Zero Ink colour printing',
      'Wi‑Fi and USB connectivity',
      'Works with CZ continuous rolls',
      'Ideal for office badges and craft',
    ],
    keywords: ['vc500wcr', 'vc-500w', 'store', 'colour', 'zink'],
    imageKey: 'vc500w',
    sku: 'VC500WCRZU1',
    priceGbp: 159.99,
    relatedSlugs: ['vc-500w', 'cz1003', 'ql-800'],
    badge: 'Store',
  },
  {
    slug: 'cz1003',
    href: '/supplies/label-printers/labels/cz/cz1003',
    title: 'CZ-1003 Continuous Colour Label Roll',
    category: 'Supplies',
    subtitle: 'VC series continuous CZ media',
    description:
      'Genuine CZ continuous label roll for VC-500W colour label printers — store path mirrors brother.co.uk supplies.',
    features: [
      'Designed for VC-500W / VC-500WCR',
      'Continuous length for custom sizes',
      'Full-colour ZINK media',
      'OrderCloud attach with colour printers',
    ],
    keywords: ['cz1003', 'cz-1003', 'labels', 'vc', 'supplies', 'colour'],
    imageKey: 'vc500wColour',
    sku: 'CZ1003',
    priceGbp: 24.99,
    relatedSlugs: ['vc-500w', 'vc500wcr', 'dk-22205'],
    badge: 'VC media',
  },
];

/** Path aliases for store-style URLs (ql800 ↔ ql-800, etc.). */
const PATH_ALIASES: Record<string, string> = {
  ql800: 'ql-800',
  'ql-800': 'ql-800',
  vc500w: 'vc-500w',
  vc500wcr: 'vc500wcr',
  cz1003: 'cz1003',
  'cz-1003': 'cz1003',
};

export function findProductByPath(pathname: string): BrotherProduct | undefined {
  const path = ((pathname || '').split('?')[0].replace(/\/$/, '') || '/').toLowerCase();
  const direct = BROTHER_PRODUCTS.find(
    (p) =>
      path === p.href.toLowerCase() || path.endsWith(`/${p.slug}`) || path.includes(`/${p.slug}`)
  );
  if (direct) return direct;

  const leaf = path.split('/').filter(Boolean).pop() || '';
  const alias = PATH_ALIASES[leaf] || PATH_ALIASES[leaf.replace(/-/g, '')] || leaf;
  return (
    findProductBySlug(alias) ||
    BROTHER_PRODUCTS.find((p) => p.slug.replace(/-/g, '') === leaf.replace(/-/g, ''))
  );
}

export function findProductBySlug(slug: string): BrotherProduct | undefined {
  return BROTHER_PRODUCTS.find((p) => p.slug === slug);
}

export function productsByCategory(category: BrotherProduct['category']): BrotherProduct[] {
  return BROTHER_PRODUCTS.filter((p) => p.category === category);
}

export function relatedProductsFor(product: BrotherProduct, limit = 3): BrotherProduct[] {
  const fromSlugs = product.relatedSlugs
    .map((slug) => findProductBySlug(slug))
    .filter((p): p is BrotherProduct => Boolean(p));
  if (fromSlugs.length >= limit) return fromSlugs.slice(0, limit);
  const extras = BROTHER_PRODUCTS.filter(
    (p) =>
      p.category === product.category &&
      p.slug !== product.slug &&
      !product.relatedSlugs.includes(p.slug)
  );
  return [...fromSlugs, ...extras].slice(0, limit);
}

export function formatGbp(amount: number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
}
