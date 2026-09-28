/**
 * Writes the ProductPage Size field (one UK size per line).
 * UK 8 is omitted where the story size is not on the run.
 */
import fs from 'fs';
import path from 'path';

const root = path.resolve('authoring/items/asos/serialized-content');
const PRODUCT_TEMPLATE = 'a50c0003-0000-4000-8000-000000000020';
const SIZE_ID = 'a50c0003-0000-4000-8000-000000000053';
const FULL = ['4', '6', '8', '10', '12', '14', '16'];
const NO_UK8 = new Set(['210425806', '208718129']);
const SHOE_TO_8 = new Set(['8805014', '8805201']);
const ONE_SIZE = new Set(['8805102', '8805103', '8805202']);

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else if (name.endsWith('.yml')) out.push(full);
  }
  return out;
}

function fieldValue(text, hint) {
  const match = text.match(new RegExp(`Hint: ${hint}\\r?\\n\\s+Value: "?([^"\\n]*)"?`));
  return match ? match[1].trim() : '';
}

function sizesFor(productId) {
  if (ONE_SIZE.has(productId)) return [];
  if (NO_UK8.has(productId)) return ['10', '12', '14', '16'];
  if (SHOE_TO_8.has(productId)) return ['4', '6', '8'];
  return FULL;
}

function sizeBlock(nl, sizes) {
  const value = sizes.length ? `|${nl}        ${sizes.join(`${nl}        `)}` : '""';
  return [
    `    - ID: "${SIZE_ID}"`,
    '      Hint: Size',
    `      Value: ${value}`,
  ].join(nl);
}

let updated = 0;
let skipped = 0;
const missingEight = [];

for (const file of walk(root)) {
  const text = fs.readFileSync(file, 'utf8');
  if (!text.includes(`Template: "${PRODUCT_TEMPLATE}"`)) continue;
  if (/Hint: Size\r?\n/.test(text)) {
    skipped += 1;
    continue;
  }
  const productId = fieldValue(text, 'ProductId');
  const sizes = sizesFor(productId);
  const nl = text.includes('\r\n') ? '\r\n' : '\n';
  const colour = text.match(/Hint: Colour\r?\n\s+Value:.*(?:\r?\n)?/);
  if (!colour) {
    console.error('no Colour field', file);
    continue;
  }
  const next = text.replace(colour[0], `${colour[0]}${sizeBlock(nl, sizes)}${nl}`);
  fs.writeFileSync(file, next);
  updated += 1;
  if (!sizes.includes('8')) missingEight.push(`${productId || path.basename(file)} ${sizes.join(',') || 'one-size'}`);
}

console.log(`updated=${updated} already=${skipped} withoutUk8=${missingEight.length}`);
for (const line of missingEight) console.log(line);
