/**
 * Bristan bathroom-taps product catalog — sourced from bristan.com product filters / PDPs.
 * SKU codes match bristan.com ?code= query values (spaces, not URL encoding).
 */

const FINISH_LABEL = {
  bb: 'Brushed Brass',
  blk: 'Black',
  c: 'Chrome',
  gm: 'Gun Metal Grey',
  ss: 'Stainless Steel',
  wht: 'White',
};

/** Derive bristan.com product code from slug id e.g. bristan-n-3hbas-c-cd → N 3HBAS C CD */
export const skuFromSlug = (slug) => {
  const parts = slug.replace(/^bristan-/, '').split('-');
  const tokens = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === '1' && parts[i + 1] === '2') {
      tokens.push('1/2');
      i++;
      continue;
    }
    if (parts[i] === '3' && parts[i + 1] === '4') {
      tokens.push('3/4');
      i++;
      continue;
    }
    tokens.push(parts[i].toUpperCase());
  }
  return tokens.join(' ');
};

const finishFromSlug = (slug) => FINISH_LABEL[slug.split('-').pop()] ?? '';

const desc1901 = (name, finish = 'chrome') =>
  `${name} from the classic 1901 range with subtle traditional styling. Long-life ceramic disc valves and a durable ${finish} finish backed by Bristan's lifetime guarantee on parts.`;

/** @type {Array<{ slug: string, name: string, sku?: string, price: number, description: string, file?: string }>} */
export const BRISTAN_BATHROOM_PRODUCTS = [
  {
    slug: 'bristan-n-3hbas-c-cd',
    name: '1901 3 Hole Basin Mixer with Pop-up Waste',
    sku: 'N 3HBAS C CD',
    price: 342,
    description:
      'The 1901 3TH basin mixer in chrome brings classic three-hole design with subtle traditional touches. Ceramic disc valves deliver reliable control with a durable chrome finish.',
  },
  {
    slug: 'bristan-n-bas-c-cd',
    name: '1901 Basin Mixer with Pop-up Waste',
    sku: 'N BAS C CD',
    price: 164,
    description: desc1901('1901 basin mixer with pop-up waste'),
  },
  {
    slug: 'bristan-n-1-2-c-cd',
    name: '1901 Basin Taps',
    sku: 'N 1/2 C CD',
    price: 127,
    description: desc1901('1901 pillar basin taps'),
  },
  {
    slug: 'bristan-n-bf-c-cd',
    name: '1901 Bath Filler',
    sku: 'N BF C CD',
    price: 327,
    description: desc1901('1901 bath filler'),
  },
  {
    slug: 'bristan-n-bsm-c-cd',
    name: '1901 Bath Shower Mixer',
    sku: 'N BSM C CD',
    price: 426,
    description: desc1901('1901 bath shower mixer'),
  },
  {
    slug: 'bristan-n-3-4-c-cd',
    name: '1901 Bath Taps',
    sku: 'N 3/4 C CD',
    price: 152,
    description: desc1901('1901 bath taps'),
  },
  {
    slug: 'bristan-n-bib-c',
    name: '1901 Bib Taps',
    sku: 'N BIB C',
    price: 150,
    description: desc1901('1901 bib taps'),
  },
  {
    slug: 'bristan-n-dsm-c',
    name: '1901 Bridge Sink Mixer',
    sku: 'N DSM C',
    price: 345,
    description: desc1901('1901 bridge sink mixer'),
  },
  {
    slug: 'bristan-n-snk-ef-c',
    name: '1901 Easyfit Sink Mixer',
    sku: 'N SNK EF C',
    price: 280,
    description: '1901 Easyfit kitchen sink mixer with flexible tails and fixing kit included.',
  },
  {
    slug: 'bristan-n2-cshxvo-c',
    name: '1901 Exposed Dual Control Shower (Bottom Outlet)',
    sku: 'N2 CSHXVO C',
    price: 495,
    description: '1901 exposed dual control shower with bottom outlet — traditional styling for the modern bathroom.',
  },
  {
    slug: 'bristan-n2-sqshxvo-c',
    name: '1901 Exposed Single Control Shower - Bottom Outlet',
    sku: 'N2 SQSHXVO C',
    price: 541,
    description: '1901 exposed single control shower with bottom outlet and thermostatic safety.',
  },
  {
    slug: 'bristan-n2-sqshxtvo-c',
    name: '1901 Exposed Single Control Shower - Top Outlet',
    sku: 'N2 SQSHXTVO C',
    price: 530,
    description: '1901 exposed single control shower with top outlet.',
  },
  {
    slug: 'bristan-n2-sqshxdiv-c',
    name: '1901 Exposed Single Control Shower with Rigid Riser',
    sku: 'N2 SQSHXDIV C',
    price: 816,
    description: '1901 exposed single control shower with rigid riser rail.',
  },
  {
    slug: 'bristan-n-hnk-c',
    name: '1901 High Neck Pillar Taps',
    sku: 'N HNK C',
    price: 164,
    description: desc1901('1901 high neck pillar taps'),
  },
  {
    slug: 'bristan-n2-cshcvo-c',
    name: '1901 Recessed Concealed Shower',
    sku: 'N2 CSHCVO C',
    price: 580,
    description: '1901 recessed concealed shower valve for a minimalist bathroom look.',
  },
  {
    slug: 'bristan-n2-shcvo-c',
    name: '1901 Recessed Concealed Shower Valve',
    sku: 'N2 SHCVO C',
    price: 406,
    description: '1901 recessed concealed shower valve with traditional crosshead controls.',
  },
  {
    slug: 'bristan-n2-shcdiv-c',
    name: '1901 Recessed Concealed Shower Valve with Diverter',
    sku: 'N2 SHCDIV C',
    price: 469,
    description: '1901 recessed concealed shower valve with diverter for multi-outlet installations.',
  },
  {
    slug: 'bristan-n2-shc3stp-c',
    name: '1901 Recessed Concealed Shower Valve with Twin Stopcocks',
    sku: 'N2 SHC3STP C',
    price: 505,
    description: '1901 recessed concealed shower valve with twin stopcocks for enhanced control.',
  },
  {
    slug: 'bristan-n-van-c-cd',
    name: '1901 Vanity Basin Taps',
    sku: 'N VAN C CD',
    price: 119,
    description: desc1901('1901 vanity basin taps'),
  },
  {
    slug: 'bristan-n-wmdsm-c',
    name: '1901 Wall Mounted Bridge Sink Mixer',
    sku: 'N WMDSM C',
    price: 380,
    description: desc1901('1901 wall mounted bridge sink mixer'),
  },
  {
    slug: 'bristan-acr-efsnk-bb',
    name: 'ACORN Easyfit Sink Mixer',
    file: 'ACORN Easyfit Sink Mixer Brushed Brass',
    price: 189,
    description: 'ACORN Easyfit sink mixer in brushed brass with flexible tails included.',
  },
  {
    slug: 'bristan-acr-efsnk-blk',
    name: 'ACORN Easyfit Sink Mixer',
    file: 'ACORN Easyfit Sink Mixer Black',
    price: 189,
    description: 'ACORN Easyfit sink mixer in matte black with flexible tails included.',
  },
  {
    slug: 'bristan-acr-efsnk-c',
    name: 'ACORN Easyfit Sink Mixer',
    file: 'ACORN Easyfit Sink Mixer Chrome',
    price: 165,
    description: 'ACORN Easyfit sink mixer in polished chrome with flexible tails included.',
  },
  {
    slug: 'bristan-acr-efsnk-gm',
    name: 'ACORN Easyfit Sink Mixer',
    file: 'ACORN Easyfit Sink Mixer Gun Metal',
    price: 199,
    description: 'ACORN Easyfit sink mixer in gun metal grey with flexible tails included.',
  },
  {
    slug: 'bristan-acr-efsnk-ss',
    name: 'ACORN Easyfit Sink Mixer',
    file: 'ACORN Easyfit Sink Mixer Stainless Steel',
    price: 175,
    description: 'ACORN Easyfit sink mixer in stainless steel with flexible tails included.',
  },
  {
    slug: 'bristan-al-2th-wmbas-bb',
    name: 'ALTUM 2 Taphole Wall Mounted Basin Mixer',
    file: 'ALTUM 2 Taphole Wall Mounted Basin Mixer Brushed Brass',
    price: 245,
    description: 'ALTUM wall mounted basin mixer in brushed brass — contemporary softened square design.',
  },
  {
    slug: 'bristan-al-2th-wmbas-blk',
    name: 'ALTUM 2 Taphole Wall Mounted Basin Mixer',
    file: 'ALTUM 2 Taphole Wall Mounted Basin Mixer Black',
    price: 245,
    description: 'ALTUM wall mounted basin mixer in matte black.',
  },
  {
    slug: 'bristan-al-2th-wmbas-c',
    name: 'ALTUM 2 Taphole Wall Mounted Basin Mixer',
    file: 'ALTUM 2 Taphole Wall Mounted Basin Mixer Chrome',
    price: 215,
    description: 'ALTUM wall mounted basin mixer in polished chrome.',
  },
  {
    slug: 'bristan-arm-ctrd02-c',
    name: 'ARMS Large Shower Arm 360mm',
    price: 89,
    description: 'ARMS round wall mount shower arm 360mm in chrome.',
  },
  {
    slug: 'bristan-arm-cfrd02-c',
    name: 'ARMS Round Ceiling Fed Shower Arm 200mm',
    price: 72,
    description: 'ARMS round ceiling fed shower arm 200mm in chrome.',
  },
  {
    slug: 'bristan-arm-cfrd01-c',
    name: 'ARMS Round Ceiling Fed Shower Arm 75mm',
    file: 'ARMS Round Ceiling Fed Shower Arm 75mm Chrome',
    price: 58,
    description: 'ARMS round ceiling fed shower arm 75mm in chrome.',
  },
  {
    slug: 'bristan-arm-cfrd01-blk',
    name: 'ARMS Round Ceiling Fed Shower Arm 75mm Black',
    price: 68,
    description: 'ARMS round ceiling fed shower arm 75mm in matte black.',
  },
  {
    slug: 'bristan-arm-cfrd01-bb',
    name: 'ARMS Round Ceiling Fed Shower Arm 75mm Brushed Brass',
    price: 78,
    description: 'ARMS round ceiling fed shower arm 75mm in brushed brass.',
  },
  {
    slug: 'bristan-arm-ctrd02-bb',
    name: 'ARMS Round Wall Mount Shower Arm Brushed Brass',
    price: 95,
    description: 'ARMS round wall mount shower arm in brushed brass.',
  },
  {
    slug: 'bristan-arm-ctrd02-gm',
    name: 'ARMS Round Wall Mount Shower Arm Gun Metal Grey',
    price: 95,
    description: 'ARMS round wall mount shower arm in gun metal grey.',
  },
  {
    slug: 'bristan-w-bt-c',
    name: 'Basin Bottle Trap',
    price: 42,
    description: 'Basin bottle trap in chrome for a neat finish beneath your basin.',
  },
  {
    slug: 'bristan-arm-ctrd02-blk',
    name: 'Bristan Round Wall Mount Shower Arm - 370mm - Black',
    price: 95,
    description: 'ARMS round wall mount shower arm 370mm in matte black.',
  },
  {
    slug: 'bristan-c-sdivr-c',
    name: 'Concealed Shower Diverter',
    price: 185,
    description: 'Concealed shower diverter valve in chrome.',
  },
  {
    slug: 'bristan-w-cl3-c-wht',
    name: 'Cistern Lever',
    file: 'Cistern Lever White',
    price: 18,
    description: 'Cistern lever in white for standard WC cisterns.',
  },
  {
    slug: 'bristan-w-cl8-c',
    name: 'Cistern Lever',
    file: 'Cistern Lever Chrome',
    price: 22,
    description: 'Cistern lever in chrome.',
  },
  {
    slug: 'bristan-w-cl1-c',
    name: 'Economy Cistern Lever',
    price: 14,
    description: 'Economy cistern lever in chrome.',
  },
  {
    slug: 'bristan-w-cl6-c-wht',
    name: 'Extended Cistern Lever',
    price: 24,
    description: 'Extended cistern lever in white for easier operation.',
  },
  {
    slug: 'bristan-cru-blk-shwr-pk',
    name: 'Concealed Thermostatic Dual Control Two Outlet Shower Pack Black',
    price: 549,
    description: 'CRUZAR concealed thermostatic dual control two outlet shower pack in black.',
  },
  {
    slug: 'bristan-mini2-ts1203-rr-c',
    name: 'MINI2 Thermostatic Shower',
    price: 289,
    description: 'MINI2 exposed thermostatic mini valve shower with rigid riser in chrome.',
  },
  {
    slug: 'bristan-lp3-c',
    name: 'PRISM Round Light Pull',
    price: 28,
    description: 'PRISM round light pull switch in chrome for bathroom lighting.',
  },
  {
    slug: 'bristan-w-bath03-gm',
    name: 'Round Clicker Bath Waste with Overflow',
    price: 38,
    description: 'Round clicker bath waste with overflow in gun metal grey.',
  },
  {
    slug: 'bristan-fh-slrd01-bb',
    name: 'Round Slim Fixed Shower Head 200mm Brushed Brass',
    price: 125,
    description: 'Round slim fixed shower head 200mm in brushed brass.',
  },
  {
    slug: 'bristan-w-basin16-c',
    name: 'Slotted Clicker Basin Waste',
    price: 24,
    description: 'Slotted clicker basin waste in chrome.',
  },
  {
    slug: 'bristan-w-basin17-c',
    name: 'Unslotted Clicker Basin Waste',
    price: 24,
    description: 'Unslotted clicker basin waste in chrome for basins without overflow.',
  },
  {
    slug: 'bristan-w-bath12-c',
    name: 'Universal Bath Waste',
    price: 32,
    description: 'Universal bath waste in chrome with chain stay.',
  },
];

/** Demo range products kept for listing variety (not in bristan.com export). */
export const BRISTAN_DEMO_PRODUCTS = [
  {
    slug: 'bristan-hourglass-basin-mixer',
    name: 'Hourglass Basin Mixer — Chrome',
    file: 'Hourglass Basin Mixer Chrome',
    sku: 'HG 1/2 C',
    price: 189,
    description: 'Hourglass basin mixer in polished chrome with contemporary lever design.',
  },
  {
    slug: 'bristan-cruzar-basin-mixer',
    name: 'Cruzar Basin Mixer — Brushed Brass',
    file: 'Cruzar Basin Mixer Brushed Brass',
    sku: 'CR 1/2 BB',
    price: 219,
    description: 'Cruzar basin mixer in brushed brass with softened square styling.',
  },
  {
    slug: 'bristan-molida-basin-mixer',
    name: 'Molida Basin Mixer — Black',
    file: 'Molida Basin Mixer Black',
    sku: 'MO 1/2 B',
    price: 199,
    description: 'Molida basin mixer in matte black — a bold contemporary statement.',
  },
];

export const productFileName = (entry) => {
  if (entry.file) {
    return entry.file;
  }
  const finish = finishFromSlug(entry.slug);
  const duplicateFinishes = BRISTAN_BATHROOM_PRODUCTS.filter((p) => p.name === entry.name).length > 1;
  if (duplicateFinishes && finish) {
    return `${entry.name} ${finish}`;
  }
  return entry.name;
};

export const normalizeProduct = (entry) => ({
  ...entry,
  sku: entry.sku ?? skuFromSlug(entry.slug),
  file: productFileName(entry),
  description:
    entry.description ??
    `${entry.name} from Bristan — the UK's number one for taps and showers. Product code ${entry.sku ?? skuFromSlug(entry.slug)}.`,
});
