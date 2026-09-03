/**
 * Brother UK demo catalogue — drives PDP fallbacks, listings, and search index.
 */
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
  imageKey: keyof typeof import('./demo-images').brotherImages;
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
    imageKey: 'labellingTile',
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
  },
];

export function findProductByPath(pathname: string): BrotherProduct | undefined {
  const path = (pathname || '').replace(/\/$/, '') || '/';
  return BROTHER_PRODUCTS.find(
    (p) => path === p.href || path.endsWith(`/${p.slug}`) || path.includes(`/${p.slug}`)
  );
}

export function productsByCategory(category: BrotherProduct['category']): BrotherProduct[] {
  return BROTHER_PRODUCTS.filter((p) => p.category === category);
}
