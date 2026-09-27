/**
 * Print a page / component / media inventory from serialized ASOS items.
 * Run: node authoring/items/asos/scripts/inventory-asos.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const root = path.join(repo, 'authoring/items/asos/serialized-content');
const T = {
  page: '328222ce-19c6-4866-a39e-849665790932',
  folder: 'a87a00b1-e6db-45ab-8b54-636fec3b5523',
  pdp: 'a50c0003-0000-4000-8000-000000000020',
  listing: 'a50c0003-0000-4000-8000-000000000030',
};

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, acc);
    else if (name.endsWith('.yml')) acc.push(full);
  }
  return acc;
}

const items = [];
for (const file of walk(root)) {
  const text = fs.readFileSync(file, 'utf8');
  const itemPath = text.match(/^Path:\s*"?([^"\r\n]+)"?/m)?.[1]?.trim();
  const template = text.match(/^Template:\s*"([^"]+)"/m)?.[1];
  if (!itemPath?.startsWith('/sitecore/content/asos/asos')) continue;
  const title = text.match(/Hint: Title\r?\n\s+Value:\s*"?([^"\r\n]+)"?/)?.[1] || '';
  const cid = text.match(/Hint: CategoryId\r?\n\s+Value:\s*"?([^"\r\n]+)"?/)?.[1] || '';
  items.push({
    itemPath,
    template,
    renderings: text.includes('Hint: __Renderings'),
    image: text.includes('dam-id') || text.includes('Hint: Image'),
    title,
    cid,
  });
}

const label = (template) => {
  if (template === T.page) return 'Page';
  if (template === T.folder) return 'Folder';
  if (template === T.pdp) return 'ProductPage';
  if (template === T.listing) return 'ProductListing';
  return template.slice(0, 8);
};

const home = '/sitecore/content/asos/asos/Home';
const children = items
  .filter((item) => item.itemPath.startsWith(`${home}/`) && !item.itemPath.slice(home.length + 1).includes('/'))
  .map((item) => `${item.itemPath.split('/').pop()}\t${label(item.template)}\tlayout=${item.renderings}`);

const listings = items
  .filter((item) => item.template === T.listing)
  .map((item) => `${item.itemPath.replace('/sitecore/content/asos/asos', '')}\tcid=${item.cid}\tlayout=${item.renderings}`);

const pdps = items.filter((item) => item.template === T.pdp);
const folders = items.filter((item) => item.itemPath.includes('/Home/Products/') && item.template === T.folder);

console.log(`content=${items.length} productPages=${pdps.length} productImages=${pdps.filter((i) => i.image).length} listings=${listings.length} productFolders=${folders.length}`);
console.log('--- home children ---');
console.log(children.join('\n'));
console.log('--- listings ---');
console.log(listings.join('\n'));
