import { EDITS, MERCH_STATES, STORY, type BodyFit, type MerchState } from '@/lib/asos-journey';
import { DAM } from '@/lib/dam-registry';

export { DAM };

export type Product = {
  id: string;
  slug: string;
  brand: string;
  title: string;
  href: string;
  priceGbp: number;
  category: string;
  cids: string[];
  edits: string[];
  bodyFit: BodyFit[];
  merchState?: MerchState;
  color: string;
  sizes: string[];
  imageFile: string;
  imageSrc: string;
  unsplash: string;
  modelHeight: string;
  sizeWorn: string;
  fabric: string;
  care: string;
  fitFeedback: string;
  completePdp: boolean;
  sellingLine?: string;
};

const UK_SIZES = ['4', '6', '8', '10', '12', '14', '16'];

/** Unsplash fashion stills — downloaded then uploaded to CH brand 108526. Never hotlink asos.com. */
export const FASHION_STILLS = [
  '1483985988355-763728e1935b',
  '1490481651871-ab68de25d43d',
  '1469334031218-e382a71b716b',
  '1515886657613-9f3515b0c78f',
  '1529139574466-a303027c1d8b',
  '1487222477894-8943e31ef7b2',
  '1558761710-8d0d84b84c8e',
  '1541099649105-f69ad21f3246',
  '1582415555673-ad5c6860c6e3',
  '1576995853123-4970e64b4d08',
  '1503342217505-b0a15ec3261c',
  '1523381210414-6c291deccda3',
  '1512436991641-6745cdb1723f',
  '1495121605193-b540aa07d4ed',
  '1525501831762-0c3142a0c1c4',
  '1485230895905-ec40ba36b9bc',
  '1509631179647-0177331693ae',
  '1514996937319-344454492b37',
  '1521572163474-6864f9cf17ab',
  '1519741497674-611481863552',
  '1496747611176-843222e1e57c',
  '1524504388049-1d4e09075856',
  '1529626455594-4ff0802cfb7e',
  '1496747611176-0450a54baaae',
  '1515886657613-9f3515b0c78f',
  '1475180098004-ca77a66827be',
  '1485968579586-3d0190b0c1c2',
  '1515886657613-9f3515b0c78f',
  '1509631179647-0177331693ae',
  '1545291730-faff8ca1d4b0',
  '1551488831-00ddcb6c6bd3',
  '1525501831762-0c3142a0c1c4',
  '1515886657613-9f3515b0c78f',
  '1469334031218-e382a71b716b',
  '1541099649105-f69ad21f3246',
  '1483985988355-763728e1935b',
  '1495121605193-b540aa07d4ed',
  '1529139574466-a303027c1d8b',
  '1558761710-8d0d84b84c8e',
  '1576995853123-4970e64b4d08',
  '1582415555673-ad5c6860c6e3',
  '1503342217505-b0a15ec3261c',
  '1523381210414-6c291deccda3',
  '1512436991641-6745cdb1723f',
  '1487222477894-8943e31ef7b2',
  '1490481651871-ab68de25d43d',
  '1485230895905-ec40ba36b9bc',
  '1514996937319-344454492b37',
  '1521572163474-6864f9cf17ab',
  '1519741497674-611481863552',
  '1524504388049-1d4e09075856',
  '1529626455594-4ff0802cfb7e',
  '1475180098004-ca77a66827be',
  '1485968579586-3d0190b0c1c2',
  '1545291730-faff8ca1d4b0',
  '1551488831-00ddcb6c6bd3',
  '1434389677669-e08b4cac3105',
  '1445205170230-4d401c4b77ea',
  '1441986300917-64674bd600d8',
  '1467043153537-a4fba2cd39ef',
  '1479064555552-3ef4979f8908',
  '1483983380754-770caa4ee0d7',
  '1485230895905-ec40ba36b9bc',
  '1490481651871-ab68de25d43d',
  '1495121605193-b540aa07d4ed',
  '1503342217505-b0a15ec3261c',
  '1509631179647-0177331693ae',
  '1512436991641-6745cdb1723f',
  '1515886657613-9f3515b0c78f',
  '1519741497674-611481863552',
  '1521572163474-6864f9cf17ab',
  '1523381210414-6c291deccda3',
  '1524504388049-1d4e09075856',
  '1525501831762-0c3142a0c1c4',
  '1529139574466-a303027c1d8b',
  '1529626455594-4ff0802cfb7e',
  '1541099649105-f69ad21f3246',
  '1545291730-faff8ca1d4b0',
  '1551488831-00ddcb6c6bd3',
  '1558761710-8d0d84b84c8e',
  '1576995853123-4970e64b4d08',
  '1582415555673-ad5c6860c6e3',
  '1434389677669-e08b4cac3105',
  '1441986300917-64674bd600d8',
  '1445205170230-4d401c4b77ea',
  '1467043153537-a4fba2cd39ef',
  '1469334031218-e382a71b716b',
  '1475180098004-ca77a66827be',
  '1479064555552-3ef4979f8908',
  '1483983380754-770caa4ee0d7',
  '1483985988355-763728e1935b',
  '1485968579586-3d0190b0c1c2',
  '1487222477894-8943e31ef7b2',
  '1490481651871-ab68de25d43d',
  '1503342217505-b0a15ec3261c',
  '1512436991641-6745cdb1723f',
  '1515886657613-9f3515b0c78f',
  '1523381210414-6c291deccda3',
  '1529139574466-a303027c1d8b',
  '1541099649105-f69ad21f3246',
  '1558761710-8d0d84b84c8e',
  '1576995853123-4970e64b4d08',
  '1434389677669-e08b4cac3105',
  '1441986300917-64674bd600d8',
  '1467043153537-a4fba2cd39ef',
  '1479064555552-3ef4979f8908',
  '1483983380754-770caa4ee0d7',
  '1519741497674-611481863552',
  '1524504388049-1d4e09075856',
  '1525501831762-0c3142a0c1c4',
  '1529626455594-4ff0802cfb7e',
  '1545291730-faff8ca1d4b0',
  '1551488831-00ddcb6c6bd3',
  '1582415555673-ad5c6860c6e3',
  '1445205170230-4d401c4b77ea',
  '1475180098004-ca77a66827be',
  '1485230895905-ec40ba36b9bc',
  '1495121605193-b540aa07d4ed',
  '1509631179647-0177331693ae',
  '1514996937319-344454492b37',
];

export function productImage(product: Product, offset = 0): string {
  const extraFile = `still-extra-${String(((Number(product.id) + offset) % 70) + 1).padStart(3, '0')}.jpg`;
  const dam = DAM[extraFile] || DAM[product.imageFile];
  if (dam?.src) return dam.src;
  if (product.imageSrc && offset === 0) return product.imageSrc;
  return `/asos/products/${extraFile}`;
}

export function productGallery(product: Product): string[] {
  return [0, 1, 2, 3].map((offset) => productImage(product, offset));
}

function still(i: number): string {
  return FASHION_STILLS[i % FASHION_STILLS.length];
}

function merch(i: number): MerchState | undefined {
  if (i % 7 === 0) return MERCH_STATES[0];
  if (i % 11 === 0) return MERCH_STATES[1];
  if (i % 13 === 0) return MERCH_STATES[2];
  return undefined;
}

type Seed = {
  brand: string;
  title: string;
  category: string;
  cids: string[];
  edits: string[];
  bodyFit: BodyFit[];
  color: string;
  priceGbp: number;
  completePdp?: boolean;
  id?: string;
  slug?: string;
  sellingLine?: string;
  modelHeight?: string;
  sizeWorn?: string;
  fabric?: string;
  care?: string;
  fitFeedback?: string;
  sizes?: string[];
};

function toProduct(seed: Seed, index: number): Product {
  const id = seed.id || String(210400000 + index);
  const slug =
    seed.slug ||
    `${seed.brand}-${seed.title}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  const imageFile = `still-${still(index)}.jpg`;
  return {
    id,
    slug,
    brand: seed.brand,
    title: `${seed.brand} ${seed.title}`,
    href: `/${seed.brand.toLowerCase().replace(/\s+/g, '-')}/${slug}/prd/${id}`,
    priceGbp: seed.priceGbp,
    category: seed.category,
    cids: seed.cids.includes(STORY.newInCid) ? seed.cids : [...seed.cids, STORY.newInCid],
    edits: seed.edits,
    bodyFit: seed.bodyFit,
    merchState: merch(index),
    color: seed.color,
    sizes: seed.sizes || UK_SIZES,
    imageFile,
    imageSrc: '',
    unsplash: still(index),
    modelHeight: seed.modelHeight || (seed.bodyFit.includes('petite') ? `5'2"` : `5'8"`),
    sizeWorn: seed.sizeWorn || (seed.bodyFit.includes('petite') ? 'UK 6' : STORY.keepSize),
    fabric:
      seed.fabric ||
      (seed.category.includes('denim')
        ? '99% cotton, 1% elastane. Sits at the waist; holds shape after wash.'
        : 'Viscose blend. Soft hand-feel, slight stretch through the body.'),
    care: seed.care || 'Machine wash at 30°C. Do not tumble dry. Iron on reverse.',
    fitFeedback:
      seed.fitFeedback ||
      (seed.bodyFit.includes('petite')
        ? 'Keepers in petite say the rise stays put — fewer returns on length.'
        : `True to size in ${STORY.keepSize}. One size, not three.`),
    completePdp: Boolean(seed.completePdp),
    sellingLine: seed.sellingLine,
  };
}

const wideLeg: Seed[] = [
  {
    id: '8805001',
    slug: 'wide-leg-jeans-in-mid-wash',
    brand: 'ASOS DESIGN',
    title: 'Wide leg jeans in mid wash',
    category: 'denim',
    cids: [STORY.denimDropCid, STORY.petiteCid],
    edits: ['the-denim-drop'],
    bodyFit: ['standard', 'petite'],
    color: 'Mid wash',
    priceGbp: 38,
    completePdp: true,
    sellingLine:
      'The keep. High rise, wide leg, under £50. Model height and the size she wore are on the page so this does not come back.',
    modelHeight: `5'7"`,
    sizeWorn: 'UK 8',
    fabric: '99% cotton, 1% elastane. High rise, wide leg, full length. Holds the wash.',
    care: 'Machine wash at 30°C inside out. Do not tumble dry.',
    fitFeedback:
      'True to size in UK 8. Ordering 6, 8 and 10 is how this jean gets returned — one size is enough.',
  },
  {
    id: '8805002',
    slug: 'petite-wide-leg-jeans-in-mid-wash',
    brand: 'ASOS DESIGN',
    title: 'Petite wide leg jeans in mid wash',
    category: 'denim',
    cids: [STORY.denimDropCid, STORY.petiteCid],
    edits: ['the-denim-drop'],
    bodyFit: ['petite'],
    color: 'Mid wash',
    priceGbp: 36,
    completePdp: true,
    modelHeight: `5'2"`,
    sizeWorn: 'UK 6',
    fabric: '99% cotton, 1% elastane. Petite length, same rise and leg as the standard.',
    fitFeedback: 'Petite length in UK 6. Same jean, shorter inseam — she does not need to hem it.',
  },
  {
    id: '8805003',
    slug: 'tall-wide-leg-jeans-in-mid-wash',
    brand: 'ASOS DESIGN',
    title: 'Tall wide leg jeans in mid wash',
    category: 'denim',
    cids: [STORY.denimDropCid],
    edits: ['the-denim-drop'],
    bodyFit: ['tall'],
    color: 'Mid wash',
    priceGbp: 42,
    modelHeight: `5'10"`,
    sizeWorn: 'UK 8',
    fabric: '99% cotton, 1% elastane. Tall inseam, same wide leg.',
    fitFeedback: 'Tall length in UK 8. Extra inseam, not a different fit through the waist.',
  },
  {
    id: '8805004',
    slug: 'plus-wide-leg-jeans-in-mid-wash',
    brand: 'ASOS DESIGN',
    title: 'Plus wide leg jeans in mid wash',
    category: 'denim',
    cids: [STORY.denimDropCid],
    edits: ['the-denim-drop'],
    bodyFit: ['plus'],
    color: 'Mid wash',
    priceGbp: 40,
    sizeWorn: 'UK 18',
    fabric: '99% cotton, 1% elastane. Plus fit, wide leg.',
    fitFeedback: 'Plus fit, true to size. The leg stays wide rather than pulling at the hip.',
  },
  {
    id: '8805005',
    slug: 'maternity-wide-leg-jeans-in-mid-wash',
    brand: 'ASOS DESIGN',
    title: 'Maternity wide leg jeans in mid wash',
    category: 'denim',
    cids: [STORY.denimDropCid],
    edits: ['the-denim-drop'],
    bodyFit: ['maternity'],
    color: 'Mid wash',
    priceGbp: 38,
    fabric: '99% cotton, 1% elastane. Under-bump band, wide leg.',
    fitFeedback: 'Under-bump. Take her usual size — the band does the ease.',
  },
  {
    id: '8805006',
    slug: 'wide-leg-jeans-in-black',
    brand: 'ASOS DESIGN',
    title: 'Wide leg jeans in black',
    category: 'denim',
    cids: [STORY.denimDropCid],
    edits: ['the-denim-drop'],
    bodyFit: ['standard', 'petite'],
    color: 'Black',
    priceGbp: 34,
    completePdp: true,
    fitFeedback: 'Same block as the mid wash, in black. UK 8 again — not a second size.',
  },
  {
    id: '8805007',
    slug: 'wide-leg-jeans-in-vintage-wash',
    brand: 'Topshop',
    title: 'Wide leg jeans in vintage wash',
    category: 'denim',
    cids: [STORY.denimDropCid, STORY.topshopCid],
    edits: ['the-denim-drop', 'topshop-catwalk'],
    bodyFit: ['standard', 'petite'],
    color: 'Vintage',
    priceGbp: 45,
    fitFeedback: 'Slightly roomier in the hip. Stay on UK 8 if the mid wash was right.',
  },
  {
    id: '8805008',
    slug: 'row-wide-jeans-in-rinse',
    brand: 'Weekday',
    title: 'Row wide jeans in rinse',
    category: 'denim',
    cids: [STORY.denimDropCid],
    edits: ['the-denim-drop'],
    bodyFit: ['standard'],
    color: 'Rinse',
    priceGbp: 49,
    fitFeedback: 'Rigid rinse. UK 8 with no stretch to grow into — still one size.',
  },
  {
    id: '8805009',
    slug: 'petite-wide-leg-jeans-in-ecru',
    brand: 'ASOS DESIGN',
    title: 'Petite wide leg jeans in ecru',
    category: 'denim',
    cids: [STORY.denimDropCid, STORY.petiteCid],
    edits: ['the-denim-drop'],
    bodyFit: ['petite'],
    color: 'Ecru',
    priceGbp: 32,
  },
  {
    id: '8805010',
    slug: 'tall-wide-leg-jeans-in-light-wash',
    brand: 'Collusion',
    title: 'Tall wide leg jeans in light wash',
    category: 'denim',
    cids: [STORY.denimDropCid],
    edits: ['the-denim-drop'],
    bodyFit: ['tall'],
    color: 'Light wash',
    priceGbp: 28,
  },
  {
    id: '8805011',
    slug: 'baggy-wide-leg-jeans-in-indigo',
    brand: 'ASOS DESIGN',
    title: 'Baggy wide leg jeans in indigo',
    category: 'denim',
    cids: [STORY.denimDropCid],
    edits: ['the-denim-drop'],
    bodyFit: ['standard'],
    color: 'Indigo',
    priceGbp: 30,
  },
  {
    id: '8805012',
    slug: 'wide-leg-jeans-in-raw-indigo',
    brand: 'Topshop',
    title: 'Wide leg jeans in raw indigo',
    category: 'denim',
    cids: [STORY.denimDropCid, STORY.topshopCid],
    edits: ['the-denim-drop'],
    bodyFit: ['standard'],
    color: 'Raw indigo',
    priceGbp: 46,
  },
  {
    id: '8805013',
    slug: 'oversized-knit-in-chocolate',
    brand: 'ASOS DESIGN',
    title: 'Oversized knit in chocolate',
    category: 'knitwear',
    cids: [STORY.denimDropCid, '91001'],
    edits: ['the-denim-drop'],
    bodyFit: ['standard'],
    color: 'Chocolate',
    priceGbp: 36,
    completePdp: true,
    sellingLine: 'The layer for Berlin, October. Same UK 8 as the jean.',
    modelHeight: `5'7"`,
    sizeWorn: 'UK 8',
    fabric: 'Acrylic wool blend. Oversized, dropped shoulder.',
    fitFeedback: 'Oversized in UK 8. Do not size up — it is already the coat layer.',
  },
  {
    id: '8805014',
    slug: 'chelsea-boot-in-black',
    brand: 'ASOS DESIGN',
    title: 'Chelsea boot in black',
    category: 'shoes',
    cids: [STORY.denimDropCid],
    edits: ['the-denim-drop'],
    bodyFit: ['standard'],
    color: 'Black',
    priceGbp: 48,
    sizes: ['UK 3', 'UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    completePdp: true,
    sellingLine: 'The boot that finishes the wide-leg hem.',
    sizeWorn: 'UK 5',
    fabric: 'Leather-look upper. Elastic side, pull-on.',
    fitFeedback: 'True to size in UK 5. One pair, not a backup size.',
  },
];

const seeds: Seed[] = [
  ...wideLeg,
  {
    id: '200415553',
    slug: 'topshop-belle-paris-camisole-in-blue',
    brand: 'Topshop',
    title: 'Belle Paris camisole in blue',
    category: 'tops',
    cids: ['29299', '88014', '88011'],
    edits: ['topshop-catwalk', 'the-denim-drop'],
    bodyFit: ['petite', 'standard'],
    color: 'Blue',
    priceGbp: 18,
    completePdp: true,
    sellingLine: 'The returns hypothesis — model height, size worn, fabric, care, fit feedback.',
  },
  {
    id: STORY.weekdayProductId,
    slug: 'weekday-flannel-pyjama-bottoms-in-black-check',
    brand: 'Weekday',
    title: 'Flannel pyjama bottoms in black check',
    category: 'loungewear',
    cids: [STORY.newInCid],
    edits: ['your-new-uniform'],
    bodyFit: ['standard', 'petite'],
    color: 'Black check',
    priceGbp: 32,
    completePdp: true,
    sellingLine: 'Brushed flannel check. Elastic waist, side pockets, relaxed through the leg.',
  },
];

const petiteDenim = [
  'Hourglass petite jeans in mid wash',
  'Straight petite jeans in indigo',
  'Barrel petite jeans in vintage wash',
  'Kick flare petite jeans in black',
  'Mom petite jeans in light wash',
  'Wide-leg petite jeans in rinse',
  'Skinny petite jeans in dark wash',
  'Carpenter petite jeans in stone',
  'Baggy petite jeans in mid blue',
  'Cropped petite jeans in ecru',
  'Split-hem petite jeans in indigo',
  'Paperbag petite jeans in wash',
  'Bootcut petite jeans in black',
  'Low-rise petite jeans in vintage',
  'Balloon petite jeans in mid wash',
  'Rigid petite jeans in raw indigo',
];

petiteDenim.forEach((title, i) => {
  seeds.push({
    brand: i % 2 === 0 ? 'Topshop' : 'ASOS DESIGN',
    title,
    category: 'denim',
    cids: [STORY.petiteCid, '88011', ...(i % 2 === 0 ? ['29299'] : [])],
    edits: ['the-denim-drop'],
    bodyFit: ['petite'],
    color: i % 3 === 0 ? 'Black' : 'Indigo',
    priceGbp: 32 + (i % 5) * 4,
    completePdp: i < 4,
  });
});

const topshop = [
  ['Belle Paris mini dress in blue', 'dresses', 'Blue'],
  ['Belle Paris midi slip in navy', 'dresses', 'Navy'],
  ['Rib cardigan in chocolate', 'knitwear', 'Chocolate'],
  ['Cargo mini skirt in khaki', 'skirts', 'Khaki'],
  ['Tailored waistcoat in black', 'tailoring', 'Black'],
  ['Sequin cami in silver', 'tops', 'Silver'],
  ['Leather-look blazer in chocolate', 'jackets', 'Chocolate'],
  ['Pleated tennis skirt in white', 'skirts', 'White'],
  ['Mesh long-sleeve in black', 'tops', 'Black'],
  ['Denim trucker in mid wash', 'denim', 'Indigo'],
  ['Catwalk column dress in ivory', 'dresses', 'Ivory'],
  ['Satin bias skirt in chocolate', 'skirts', 'Chocolate'],
  ['Pocket detail shirt in white', 'tops', 'White'],
  ['Low-rise jeans in vintage', 'denim', 'Indigo'],
  ['Knit polo in rugby stripe', 'tops', 'Navy'],
  ['Halter neck top in polka dot', 'tops', 'Black'],
  ['Wrap midi in chocolate', 'dresses', 'Chocolate'],
  ['Bardot top in blue', 'tops', 'Blue'],
  ['Tailored trousers in black', 'tailoring', 'Black'],
];

topshop.forEach(([title, category, color]) => {
  seeds.push({
    brand: 'Topshop',
    title,
    category,
    cids: ['29299', '88014'],
    edits: ['topshop-catwalk', category === 'denim' ? 'the-denim-drop' : 'your-new-uniform'],
    bodyFit: ['standard', 'petite'],
    color,
    priceGbp: 22 + title.length,
    completePdp: title.includes('Belle'),
  });
});

const chocolate = [
  'Chocolate satin midi dress',
  'Chocolate leather-look trench',
  'Chocolate knit vest',
  'Chocolate wide-leg trousers',
  'Chocolate ballet flats',
  'Chocolate shoulder bag',
  'Chocolate silk shirt',
  'Chocolate bomber jacket',
];
chocolate.forEach((title, i) => {
  seeds.push({
    brand: i % 2 ? 'ASOS DESIGN' : 'Topshop',
    title,
    category: i === 4 ? 'shoes' : i === 5 ? 'accessories' : 'dresses',
    cids: ['91001'],
    edits: ['your-new-uniform'],
    bodyFit: ['standard'],
    color: 'Chocolate',
    priceGbp: 28 + i * 3,
  });
});

const polka = [
  'Polka dot tea dress',
  'Polka dot blouse',
  'Polka dot midi skirt',
  'Polka dot cami',
  'Polka dot shirt dress',
  'Polka dot scarf',
  'Polka dot ballet wrap',
  'Polka dot wide-leg jumpsuit',
];
polka.forEach((title) => {
  seeds.push({
    brand: 'ASOS DESIGN',
    title,
    category: 'dresses',
    cids: ['91002'],
    edits: ['festival-2-0'],
    bodyFit: ['standard', 'petite'],
    color: 'Black',
    priceGbp: 26,
  });
});

const rugby = [
  'Oversized rugby top in stripe',
  'Cropped rugby top in navy',
  'Longline rugby top in green',
  'Petite rugby top in cream',
  'Vintage rugby top in burgundy',
  'Colour-block rugby top',
  'Knit rugby top in stripe',
  'Relaxed rugby top in white',
];
rugby.forEach((title, i) => {
  seeds.push({
    brand: i === 3 ? 'Topshop' : 'ASOS DESIGN',
    title,
    category: 'tops',
    cids: ['91003', ...(i === 3 ? ['29299'] : [])],
    edits: ['festival-2-0'],
    bodyFit: title.includes('Petite') ? ['petite'] : ['standard'],
    color: 'Navy',
    priceGbp: 24,
  });
});

const festival = [
  'Metallic cargo trousers',
  'Sequin hot-pant',
  'Fringe suede jacket',
  'Cowboy boots in chocolate',
  'Bandana print mini',
  'Mesh overlay dress',
  'Western belt',
  'Glitter knee-high boots',
];
festival.forEach((title, i) => {
  seeds.push({
    brand: 'ASOS DESIGN',
    title,
    category: i === 3 || i === 7 ? 'shoes' : 'dresses',
    cids: ['88012'],
    edits: ['festival-2-0'],
    bodyFit: ['standard'],
    color: 'Silver',
    priceGbp: 36 + i,
  });
});

const more = [
  ['ASOS DESIGN', 'Tall straight jeans in black', 'denim', '27108', 'tall', 'Black', 38],
  ['ASOS DESIGN', 'Plus barrel jeans in mid wash', 'denim', '27108', 'plus', 'Indigo', 38],
  ['ASOS DESIGN', 'Maternity underbump jeans', 'denim', '27108', 'maternity', 'Indigo', 36],
  ['ASOS DESIGN', 'Tall kick flare in rinse', 'denim', '88011', 'tall', 'Indigo', 40],
  ['ASOS DESIGN', 'Plus mom jeans in vintage', 'denim', '88011', 'plus', 'Indigo', 38],
  ['Collusion', 'Low-rise jeans in dirty wash', 'denim', '88011', 'standard', 'Indigo', 28],
  ['Collusion', 'Baby tee in white', 'tops', '88013', 'standard', 'White', 12],
  ['Weekday', 'Row jeans in rigid blue', 'denim', '88011', 'standard', 'Indigo', 69],
  ['Weekday', 'Ace jeans in black', 'denim', '27108', 'petite', 'Black', 69],
  ['New Look', 'Petite denim jacket', 'denim', '27108', 'petite', 'Indigo', 32],
  ['New Look', 'Chocolate knit midi', 'knitwear', '91001', 'standard', 'Chocolate', 28],
  ['Stradivarius', 'Poplin shirt in white', 'tops', '88013', 'standard', 'White', 22],
  ['Stradivarius', 'Tailored blazer in black', 'tailoring', '88013', 'standard', 'Black', 45],
  ['Bershka', 'Parachute trouser in khaki', 'trousers', '88012', 'standard', 'Khaki', 29],
  ['Bershka', 'Platform trainer in white', 'shoes', '88013', 'standard', 'White', 35],
  ['Dr Martens', '1460 boot in black', 'shoes', '88012', 'standard', 'Black', 169],
  ['Nike', 'Cortez in white and navy', 'shoes', '88013', 'standard', 'White', 85],
  ['adidas', 'Samba in white', 'shoes', '88013', 'standard', 'White', 90],
  ['ASOS DESIGN', 'Gold hoop earrings', 'accessories', '88014', 'standard', 'Gold', 8],
  ['ASOS DESIGN', 'Petite tailored waistcoat', 'tailoring', '88013', 'petite', 'Black', 28],
] as const;

more.forEach(([brand, title, category, cid, fit, color, price]) => {
  seeds.push({
    brand,
    title,
    category,
    cids: [cid],
    edits:
      cid === '88011'
        ? ['the-denim-drop']
        : cid === '88012'
          ? ['festival-2-0']
          : ['your-new-uniform'],
    bodyFit: [fit as BodyFit],
    color,
    priceGbp: Number(price),
  });
});

const extras = [
  'Linen blend shirt in ecru',
  'Crochet mini in cream',
  'Strappy sandal in chocolate',
  'Oversized hoodie in grey',
  'Cargo short in khaki',
  'Lace trim cami in white',
  'Denim mini skirt in rinse',
  'Pinstripe trouser in navy',
  'Quilted liner in black',
  'Sculpt tank in chocolate',
  'Balloon sleeve blouse',
  'Leather-look trouser',
  'Crochet bag in natural',
  'Mary jane in black',
  'Boat-neck knit in ivory',
  'Utility shirt in olive',
  'Bias cut slip in navy',
  'Boxy denim shirt',
  'Wide-leg linen trouser',
  'Halter neck dress in polka',
  'Petite chocolate blazer',
  'Tall linen shirt dress',
];
extras.forEach((title, i) => {
  seeds.push({
    brand: i % 3 === 0 ? 'Topshop' : 'ASOS DESIGN',
    title,
    category: title.includes('denim') ? 'denim' : 'tops',
    cids: [i % 2 ? '88013' : '29299', ...(title.includes('Petite') ? [STORY.petiteCid] : [])],
    edits: ['your-new-uniform'],
    bodyFit: title.includes('Petite')
      ? ['petite']
      : title.includes('Tall')
        ? ['tall']
        : ['standard'],
    color: title.includes('chocolate') ? 'Chocolate' : 'Black',
    priceGbp: 20 + i,
    completePdp: i < 2,
  });
});

export const PRODUCTS: Product[] = seeds.map((seed, index) => toProduct(seed, index));

export const CATEGORIES: {
  cid: string;
  slug: string;
  title: string;
  href: string;
  facetFit: boolean;
}[] = [
  {
    cid: STORY.newInCid,
    slug: 'new-in',
    title: "Women's New In",
    href: STORY.newInHref,
    facetFit: true,
  },
  {
    cid: STORY.petiteCid,
    slug: 'petite-denim',
    title: 'Petite denim',
    href: STORY.petiteHref,
    facetFit: true,
  },
  {
    cid: '88011',
    slug: 'the-denim-drop',
    title: 'The denim drop',
    href: '/the-denim-drop/cat/?cid=88011',
    facetFit: true,
  },
  {
    cid: '29299',
    slug: 'topshop',
    title: 'Topshop',
    href: '/women/a-to-z-of-brands/topshop/cat/?cid=29299',
    facetFit: false,
  },
  {
    cid: '91001',
    slug: 'chocolate',
    title: 'Chocolate',
    href: '/chocolate/cat/?cid=91001',
    facetFit: false,
  },
  {
    cid: '91002',
    slug: 'polka-dot',
    title: 'Polka dot',
    href: '/polka-dot/cat/?cid=91002',
    facetFit: false,
  },
  {
    cid: '91003',
    slug: 'rugby-tops',
    title: 'Rugby tops',
    href: '/rugby-tops/cat/?cid=91003',
    facetFit: false,
  },
  {
    cid: '88012',
    slug: 'festival-2-0',
    title: 'Festival 2.0',
    href: '/festival-2-0/cat/?cid=88012',
    facetFit: false,
  },
  {
    cid: '88013',
    slug: 'your-new-uniform',
    title: 'Your new uniform',
    href: '/your-new-uniform/cat/?cid=88013',
    facetFit: false,
  },
  {
    cid: '88014',
    slug: 'topshop-catwalk',
    title: 'Topshop Catwalk',
    href: '/topshop-catwalk/cat/?cid=88014',
    facetFit: false,
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((item) => item.id === id);
}

export function productFromPath(path: string): Product | undefined {
  const match = path.match(/\/prd\/(\d+)/);
  return match ? getProduct(match[1]) : undefined;
}

export function productsForCid(cid: string): Product[] {
  if (!cid) return PRODUCTS;
  const storyFirst = (item: Product) => (item.id.startsWith('8805') ? 0 : 1);
  return PRODUCTS.filter((item) => item.cids.includes(cid)).sort(
    (a, b) => storyFirst(a) - storyFirst(b)
  );
}

export function productsForEdit(slug: string): Product[] {
  return PRODUCTS.filter((item) => item.edits.includes(slug));
}

const LOOK_CATEGORIES = ['denim', 'shoes', 'knitwear', 'jackets', 'accessories', 'skirts'];

/** Complementary pieces for "Shop the model's full 'fit" — not the PDP product itself. */
export function lookFor(product: Product): Product[] {
  const berlin = STORY.berlinIds
    .map((id) => getProduct(id))
    .filter((item): item is Product => Boolean(item && item.id !== product.id));
  const pool = PRODUCTS.filter(
    (item) => item.id !== product.id && item.category !== product.category
  );
  const picked: Product[] = berlin.filter((item) => item.category !== product.category);
  for (const category of LOOK_CATEGORIES) {
    const sameFit = pool.find(
      (item) =>
        item.category === category &&
        item.bodyFit.some((fit) => product.bodyFit.includes(fit)) &&
        !picked.includes(item)
    );
    const match =
      sameFit || pool.find((item) => item.category === category && !picked.includes(item));
    if (match) picked.push(match);
    if (picked.length === 4) break;
  }
  return picked;
}

export function alsoBought(product: Product): Product[] {
  return PRODUCTS.filter(
    (item) =>
      item.id !== product.id &&
      (item.brand === product.brand || item.cids.some((cid) => product.cids.includes(cid)))
  )
    .sort((a, b) => Number(b.id.startsWith('8805')) - Number(a.id.startsWith('8805')))
    .slice(0, 8);
}

export function categoryByCid(cid: string) {
  return CATEGORIES.find((item) => item.cid === cid);
}

export function categoryFromPath(path: string, cid: string) {
  if (cid) return categoryByCid(cid);
  const slug = path
    .replace(/^\//, '')
    .replace(/\/cat\/?$/, '')
    .split('/')
    .pop();
  return CATEGORIES.find((item) => item.slug === slug) || EDITS.find((item) => item.slug === slug);
}

export const HERO_PRODUCT = getProduct(STORY.heroProductId) as Product;
export const WEEKDAY_PRODUCT = getProduct(STORY.weekdayProductId) as Product;
