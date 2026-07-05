/**
 * Adds SpareParts + RequestBrochure renderings to each product page item.
 * Partial-design nested placeholders are not merged into headless layout output;
 * page-level __Renderings on related-products-1 are required (same as carousel).
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
const RENDERINGS_FIELD = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const DEVICE = '{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}';

const R_SPARE_PARTS = 'B8030070-0001-4000-8000-000000000013';
const R_PROMO = 'B8030070-0001-4000-8000-000000000002';
const DS_SPARE = 'b8030048-0001-4000-8000-000000000002';
const DS_BROCHURE = 'b8030040-0001-4000-8000-000000000035';
const GRID = 'GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D';
const SPARE_PAR = `${GRID}&amp;FieldNames=%7BB8030053-0001-4000-8000-000000000014%7D&amp;Styles&amp;RenderingIdentifier&amp;CSSStyles&amp;DynamicPlaceholderId=1`;
const BROCHURE_PAR = `${GRID}&amp;FieldNames=%7BB8030053-0001-4000-8000-000000000013%7D&amp;Styles&amp;RenderingIdentifier&amp;CSSStyles&amp;DynamicPlaceholderId=1`;
const PLACEHOLDER = '/headless-main/sxa-productcontent/related-products-1';

const uidFromProductId = (productId, slot) => {
  const suffix = productId.split('-').pop();
  const prefix = slot === 'spare' ? 'b8030101' : 'b8030102';
  return `${prefix}-0001-4000-8000-${suffix}`.toUpperCase();
};

const renderRow = ({ uid, before, after, rid, ds, par }) => {
  const placement = before ? `p:before="${before}"` : `p:after="r[@uid='{${after}}']"`;
  return `        <r
          uid="{${uid}}"
          ${placement}
          s:ds="${ds}"
          s:id="{${rid}}"
          s:par="${par}"
          s:ph="${PLACEHOLDER}" />`;
};

const buildRenderingsBlock = (spareUid, brochureUid, existingRows = []) => {
  const spare = renderRow({
    uid: spareUid,
    before: '*',
    rid: R_SPARE_PARTS,
    ds: DS_SPARE,
    par: SPARE_PAR,
  });
  const brochure = renderRow({
    uid: brochureUid,
    after: spareUid,
    rid: R_PROMO,
    ds: DS_BROCHURE,
    par: BROCHURE_PAR,
  });

  let rows = [spare, brochure];
  if (existingRows.length) {
    const updatedExisting = existingRows.map((row, index) => {
      if (index !== 0) return row;
      const uidMatch = row.match(/uid="\{([^}]+)\}"/);
      if (!uidMatch) return row;
      const existingUid = uidMatch[1].toUpperCase();
      const trimmed = row.trimStart();
      return `        ${trimmed
        .replace(/\s+p:(before|after)="[^"]*"/, '')
        .replace(
          /uid="\{[^}]+\}"/,
          `uid="{${existingUid}}"\n          p:after="r[@uid='{${brochureUid}}']"`,
        )}`;
    });
    rows = [...rows, ...updatedExisting];
  }

  return `<r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="${DEVICE}">
${rows.join('\n')}
      </d>
    </r>`;
};

const extractProductId = (content) => {
  const match = content.match(/^ID: "([^"]+)"/m);
  return match?.[1] ?? null;
};

const isProductItem = (content) => content.includes(`Template: "${PRODUCT_TEMPLATE}"`);

const hasSparePartsRendering = (content) =>
  content.includes(R_SPARE_PARTS) && content.includes(PLACEHOLDER);

const parseExistingRenderingRows = (renderingsValue) => {
  const inner = renderingsValue.match(/<d[^>]*>([\s\S]*?)<\/d>/);
  if (!inner) return [];
  return [...inner[1].matchAll(/<r[\s\S]*?\/>/g)].map((m) => m[0]);
};

const patchFile = (filePath) => {
  const content = readFileSync(filePath, 'utf8');
  if (!isProductItem(content)) return { filePath, status: 'skipped-not-product' };
  if (hasSparePartsRendering(content)) return { filePath, status: 'skipped-already-patched' };

  const productId = extractProductId(content);
  if (!productId) return { filePath, status: 'skipped-no-id' };

  const spareUid = uidFromProductId(productId, 'spare');
  const brochureUid = uidFromProductId(productId, 'brochure');

  const renderingsFieldRegex = new RegExp(
    `- ID: "${RENDERINGS_FIELD}"\\s+Hint: __Renderings\\s+Value: \\|\\s+([\\s\\S]*?)(?=\\nLanguages:)`,
  );
  const renderingsMatch = content.match(renderingsFieldRegex);

  let nextContent;
  if (renderingsMatch) {
    const existingRows = parseExistingRenderingRows(renderingsMatch[1]);
    const newBlock = buildRenderingsBlock(spareUid, brochureUid, existingRows);
    nextContent = content.replace(renderingsMatch[1], `\n    ${newBlock}\n`);
  } else {
    const newBlock = buildRenderingsBlock(spareUid, brochureUid);
    const insert = `- ID: "${RENDERINGS_FIELD}"
  Hint: __Renderings
  Value: |
    ${newBlock}
`;
    nextContent = content.replace('\nLanguages:', `\n${insert}Languages:`);
  }

  writeFileSync(filePath, nextContent, 'utf8');
  return { filePath, status: 'patched', spareUid, brochureUid };
};

const files = readdirSync(PRODUCTS_DIR)
  .filter((name) => name.endsWith('.yml') && name !== 'Data.yml')
  .map((name) => join(PRODUCTS_DIR, name));

const results = files.map(patchFile);
const patched = results.filter((r) => r.status === 'patched');
const skipped = results.filter((r) => r.status.startsWith('skipped'));

console.log(`Patched ${patched.length} product page(s).`);
console.log(`Skipped ${skipped.length} file(s).`);
if (patched.length) {
  console.log('Examples:', patched.slice(0, 3).map((r) => r.filePath.split(/[/\\]/).pop()));
}
