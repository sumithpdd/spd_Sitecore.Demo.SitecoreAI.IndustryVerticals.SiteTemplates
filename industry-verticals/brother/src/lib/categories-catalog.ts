/**
 * Category / hub cards for CategoryListing — brother.co.uk-style discovery grids.
 */
import type { BrotherImageKey } from './demo-images';

export type BrotherCategoryCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  imageKey: BrotherImageKey;
  filter?: string;
};

/** Labelling & receipts hub + office-labelling children */
export const LABELLING_CATEGORIES: BrotherCategoryCard[] = [
  {
    id: 'office-labelling',
    title: 'Office labelling',
    description: 'Desktop and handheld label printers for desks, files and visitor badges.',
    href: '/labelling-and-receipts/office-labelling',
    imageKey: 'labellingTile',
    filter: 'Office',
  },
  {
    id: 'vc-500w',
    title: 'VC-500W colour labels',
    description: 'Full-colour ZINK labels without ink — craft, organisation and signage.',
    href: '/labelling-and-receipts/vc-500w',
    imageKey: 'vc500w',
    filter: 'Colour',
  },
  {
    id: 'ql-series',
    title: 'QL desktop labels',
    description: 'Fast black & red labels for warehouses, offices and retail.',
    href: '/devices/label-printer/ql/ql-800',
    imageKey: 'vc500wCutter',
    filter: 'Desktop',
  },
  {
    id: 'supplies-labels',
    title: 'Label supplies',
    description: 'DK rolls, CZ continuous media and tapes for Brother label printers.',
    href: '/supplies',
    imageKey: 'suppliesHero',
    filter: 'Supplies',
  },
];

export const BUSINESS_CATEGORIES: BrotherCategoryCard[] = [
  {
    id: 'mps',
    title: 'Managed Print Service',
    description: 'Control cost, security and uptime across your print fleet.',
    href: '/business-solutions/managed-print-service',
    imageKey: 'homeHero',
    filter: 'MPS',
  },
  {
    id: 'mps-essential',
    title: 'MPS Essential',
    description: 'Right-sized managed print for growing offices.',
    href: '/business-solutions/managed-print-service/mps-essential',
    imageKey: 'printerHero',
    filter: 'MPS',
  },
  {
    id: 'labelling-ops',
    title: 'Labelling solutions',
    description: 'From VC-500W colour to QL and TD barcode printers.',
    href: '/labelling-and-receipts',
    imageKey: 'vc500wColour',
    filter: 'Labelling',
  },
  {
    id: 'supplies',
    title: 'Supplies & reorder',
    description: 'Genuine toner and labels — OrderCloud attach-rate demos.',
    href: '/supplies',
    imageKey: 'suppliesHero',
    filter: 'Supplies',
  },
];

export const OFFICE_LABELLING_CATEGORIES: BrotherCategoryCard[] = [
  {
    id: 'ql-800',
    title: 'QL-800',
    description: 'High-speed black & red desktop label printer.',
    href: '/devices/label-printer/ql/ql-800',
    imageKey: 'labellingTile',
    filter: 'QL',
  },
  {
    id: 'ql-820nwb',
    title: 'QL-820NWB',
    description: 'Network and wireless labelling for shared offices.',
    href: '/devices/label-printer/ql/ql-820nwb',
    imageKey: 'vc500wLaptop',
    filter: 'QL',
  },
  {
    id: 'pt-p750w',
    title: 'PT-P750W',
    description: 'Handheld TZe labelling with Wi‑Fi and NFC.',
    href: '/devices/label-printer/pt/pt-p750w',
    imageKey: 'vc500wWidths',
    filter: 'Handheld',
  },
  {
    id: 'vc-500w',
    title: 'VC-500W',
    description: 'Full-colour labels without ink cartridges.',
    href: '/labelling-and-receipts/vc-500w',
    imageKey: 'vc500w',
    filter: 'Colour',
  },
];

export function categoriesForPath(pathname: string): BrotherCategoryCard[] {
  const path = (pathname || '').split('?')[0].replace(/\/$/, '') || '/';
  if (path.includes('office-labelling')) return OFFICE_LABELLING_CATEGORIES;
  if (path.includes('business-solutions')) return BUSINESS_CATEGORIES;
  if (path.includes('labelling')) return LABELLING_CATEGORIES;
  if (path.includes('supplies')) {
    return [
      {
        id: 'toner',
        title: 'Toner',
        description: 'Genuine Brother toner for HL, DCP and MFC lasers.',
        href: '/supplies/toner/tn-243bk',
        imageKey: 'suppliesHero',
        filter: 'Toner',
      },
      {
        id: 'dk',
        title: 'DK label rolls',
        description: 'Continuous DK media for QL label printers.',
        href: '/supplies/labels/dk-22205',
        imageKey: 'labellingTile',
        filter: 'Labels',
      },
      {
        id: 'cz',
        title: 'CZ colour media',
        description: 'Continuous colour rolls for VC-500W.',
        href: '/supplies/label-printers/labels/cz/cz1003',
        imageKey: 'vc500wColour',
        filter: 'Labels',
      },
    ];
  }
  if (path.includes('printer')) {
    return productsAsCategories('Printers');
  }
  if (path.includes('scanner')) {
    return productsAsCategories('Scanners');
  }
  if (path === '/' || path === '') return LABELLING_CATEGORIES.slice(0, 3);
  return [];
}

function productsAsCategories(
  category: 'Printers' | 'Scanners' | 'Labelling' | 'Supplies'
): BrotherCategoryCard[] {
  // Lazy import avoided — duplicate minimal map from known catalogue paths
  const map: Record<string, BrotherCategoryCard[]> = {
    Printers: [
      {
        id: 'hl',
        title: 'Mono lasers',
        description: 'Reliable black & white network printers for home and office.',
        href: '/devices/printers/hl/hl-l2460dn',
        imageKey: 'printerHero',
        filter: 'Mono',
      },
      {
        id: 'dcp',
        title: 'Colour laser MFPs',
        description: 'Print, copy and scan in colour with duplex.',
        href: '/devices/printers/dcp/dcp-l3520cdw',
        imageKey: 'homeHero',
        filter: 'Colour',
      },
      {
        id: 'mfc',
        title: 'Business colour',
        description: 'Workgroup colour lasers with fax and security.',
        href: '/devices/printers/mfc/mfc-l8390cdw',
        imageKey: 'vc500wLaptop',
        filter: 'Workgroup',
      },
    ],
    Scanners: [
      {
        id: 'ads-mobile',
        title: 'Mobile scanners',
        description: 'Portable Wi‑Fi document scanning on the go.',
        href: '/devices/scanners/ads/ads-1800w',
        imageKey: 'articleHero',
        filter: 'Mobile',
      },
      {
        id: 'ads-desktop',
        title: 'Desktop ADF',
        description: 'High-speed networked document scanning.',
        href: '/devices/scanners/ads/ads-4900w',
        imageKey: 'vc500wColour',
        filter: 'Desktop',
      },
    ],
    Labelling: LABELLING_CATEGORIES,
    Supplies: [],
  };
  return map[category] || [];
}
