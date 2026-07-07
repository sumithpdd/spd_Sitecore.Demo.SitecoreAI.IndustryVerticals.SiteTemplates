/**
 * Adds Product Data / Fitting Instructions / Tech Drawing / Spares Drawing fields
 * and Useful Information bullets to bathroom-taps product pages.
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRODUCTS_DIR = join(
  __dirname,
  '../serialized-content/bristan/bristan/Home/products/bathroom-taps',
);

const PRODUCT_TEMPLATE = 'f6e44a9e-074a-4865-987e-0c2dc00b7af5';

const SPEC_URLS = {
  productData:
    'https://spd-verticals.sitecoresandbox.cloud/api/public/content/822b9b5cd1f04eb681fc8cc78ee1fa01?v=e7a6be3b',
  fittingInstructions:
    'https://spd-verticals.sitecoresandbox.cloud/api/public/content/262a60d14cec47ea9d4bd0572bf46a52?v=12d63a73',
  techDrawing:
    'https://spd-verticals.sitecoresandbox.cloud/api/public/content/045659f8f02b4b3e8f8fcaf17ff96bde?v=31f7eef2',
  sparesDrawing:
    'https://spd-verticals.sitecoresandbox.cloud/api/public/content/a145f3448170434aa9d15fe8888b094b?v=47ccedd4',
};

const FIELD = {
  ProductData: 'a1b80301-0001-4000-8000-000000000001',
  FittingInstructions: 'a1b80301-0002-4000-8000-000000000001',
  TechDrawing: 'a1b80301-0003-4000-8000-000000000001',
  SparesDrawing: 'a1b80301-0004-4000-8000-000000000001',
  UsefulInformation: 'a1b80301-0005-4000-8000-000000000001',
};

const USEFUL_INFO = `<div class="ck-content"><ul><li>Supplied with everything you need for a hassle-free installation, including copper tails and pop-up waste</li><li>Install with confidence using a robust metal fixing nut that keeps your tap securely in place</li><li>Experience smooth, reliable operation thanks to the long-life ceramic disc valves</li><li>Enjoy lasting brilliance with our flawless, scratch-resistant chrome finish that is salt spray-tested for durability</li><li>Built to last, backed by a lifetime parts and 1-year labour guarantee</li><li>Pair with coordinating bathroom taps, showers, and accessories to complete the look</li></ul></div>`;

const externalLink = (url) =>
  `<link class="" querystring="" id="" anchor="" target="_blank" title="" linktype="external" text="Download" url="${url}" />`;

const specSharedBlock = `- ID: "${FIELD.ProductData}"
  Hint: ProductData
  Value: |
    ${externalLink(SPEC_URLS.productData)}
- ID: "${FIELD.FittingInstructions}"
  Hint: FittingInstructions
  Value: |
    ${externalLink(SPEC_URLS.fittingInstructions)}
- ID: "${FIELD.TechDrawing}"
  Hint: TechDrawing
  Value: |
    <Image src="${SPEC_URLS.techDrawing}" alt="Technical drawing" width="800" height="600" />
- ID: "${FIELD.SparesDrawing}"
  Hint: SparesDrawing
  Value: |
    ${externalLink(SPEC_URLS.sparesDrawing)}`;

const shortDescription = (yaml) => {
  const shortMatch = yaml.match(/Hint: ShortDescription\r?\n      Value: (.+)/);
  return shortMatch?.[1]?.replace(/^"|"$/g, '') ?? 'Product description.';
};

const longDescriptionBlock = (yaml) => {
  const desc = shortDescription(yaml);
  return `- ID: "e35644f6-b680-4f40-9c7a-def95adfedda"
      Hint: LongDescription
      Value: |
        <div class="ck-content"><p>${desc}</p></div>`;
};

const usefulInfoBlock = `- ID: "${FIELD.UsefulInformation}"
      Hint: UsefulInformation
      Value: |
        ${USEFUL_INFO}`;

const upsertSpecFields = (yaml) => {
  if (yaml.includes(`ID: "${FIELD.ProductData}"`)) {
    return yaml;
  }

  if (yaml.includes('dbbbeca1-21c7-4906-9dd2-493c1efa59a2')) {
    return yaml.replace(
      /- ID: "dbbbeca1-21c7-4906-9dd2-493c1efa59a2"\r?\n  Hint: __Shared revision/,
      `${specSharedBlock}\n- ID: "dbbbeca1-21c7-4906-9dd2-493c1efa59a2"\n  Hint: __Shared revision`,
    );
  }

  return yaml.replace(
    /- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"\r?\n  Hint: __Renderings/,
    `${specSharedBlock}\n- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"\n  Hint: __Renderings`,
  );
};

const upsertUsefulInfo = (yaml) => {
  let next = yaml;

  if (!next.includes(`ID: "${FIELD.UsefulInformation}"`)) {
    if (next.includes('e35644f6-b680-4f40-9c7a-def95adfedda')) {
      next = next.replace(
        /- ID: "e35644f6-b680-4f40-9c7a-def95adfedda"\r?\n      Hint: LongDescription/,
        `${usefulInfoBlock}\n    - ID: "e35644f6-b680-4f40-9c7a-def95adfedda"\n      Hint: LongDescription`,
      );
    } else {
      next = next.replace(
        /- ID: "d9cf14b1-fa16-4ba6-9288-e8a174d4d522"\r?\n      Hint: __Updated/,
        `${usefulInfoBlock}\n    ${longDescriptionBlock(next)}\n    - ID: "d9cf14b1-fa16-4ba6-9288-e8a174d4d522"\n      Hint: __Updated`,
      );
    }
  }

  if (!next.includes('e35644f6-b680-4f40-9c7a-def95adfedda')) {
    next = next.replace(
      /- ID: "d9cf14b1-fa16-4ba6-9288-e8a174d4d522"\r?\n      Hint: __Updated/,
      `${longDescriptionBlock(next)}\n    - ID: "d9cf14b1-fa16-4ba6-9288-e8a174d4d522"\n      Hint: __Updated`,
    );
  }

  return next;
};

const cleanLongDescription = (yaml) => {
  if (!yaml.includes('e35644f6-b680-4f40-9c7a-def95adfedda')) {
    return yaml;
  }

  const desc = shortDescription(yaml);
  const cleanValue = `        <div class="ck-content"><p>${desc}</p></div>`;

  return yaml.replace(
    /- ID: "e35644f6-b680-4f40-9c7a-def95adfedda"\r?\n      Hint: LongDescription\r?\n      Value: \|\r?\n[\s\S]*?(?=\r?\n    - ID:|\r?\n$)/,
    `- ID: "e35644f6-b680-4f40-9c7a-def95adfedda"\n      Hint: LongDescription\n      Value: |\n${cleanValue}`,
  );
};

let updated = 0;

for (const file of readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith('.yml'))) {
  const path = join(PRODUCTS_DIR, file);
  let yaml = readFileSync(path, 'utf8');

  if (!yaml.includes(PRODUCT_TEMPLATE)) {
    continue;
  }

  const before = yaml;
  yaml = upsertSpecFields(yaml);
  yaml = upsertUsefulInfo(yaml);
  yaml = cleanLongDescription(yaml);

  if (yaml !== before) {
    writeFileSync(path, yaml, 'utf8');
    updated += 1;
    console.log(`  patched: ${file}`);
  }
}

console.log(`Updated ${updated} product pages with spec download fields.`);
