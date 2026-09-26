/**
 * Refresh the public page map (adds YamlFile) and the full item index.
 * Run from the repo root: node authoring/items/asos/scripts/write-asos-maps.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('authoring/items/asos/serialized-content');
const mapPath = path.resolve('authoring/items/asos/scripts/media-maps/asos-page-map.csv');
const indexPath = path.resolve('authoring/items/asos/scripts/media-maps/asos-item-index.csv');

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, acc);
    else if (name.endsWith('.yml')) acc.push(full);
  }
  return acc;
}

const byPath = new Map();
for (const file of walk(root)) {
  const text = fs.readFileSync(file, 'utf8');
  const match = text.match(/^Path:\s+"?([^"\r\n]+)"?/m);
  if (!match) continue;
  const titleMatch = text.match(/Hint: Title\r?\n\s+Value: "([^"]*)"/);
  const title = titleMatch ? titleMatch[1] : path.basename(file, '.yml');
  const rel = path.relative(root, file).replace(/\\/g, '/');
  byPath.set(match[1], { title, rel });
}

const lines = fs.readFileSync(mapPath, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/).filter(Boolean);
const rows = lines
  .slice(1)
  .map((line) => {
    const cells = line.split(',');
    const [route, sitecore, title] = cells;
    return { route, sitecore, title: (title || '').replace(/^"|"$/g, '') };
  })
  .filter((row) => !row.sitecore.includes('wide-leg-jeans-in-mid-wash'));
const seen = new Set(rows.map((row) => row.sitecore));

const extras = [
  {
    route: '/asos-design/wide-leg-jeans-in-mid-wash/prd/8805001',
    sitecore: '/sitecore/content/asos/asos/Catalogue/Products/8805001',
    title: 'Wide-leg jeans in mid wash',
  },
  { route: '(tree)', sitecore: '/sitecore/content/asos/asos/Shared', title: 'Shared' },
  { route: '(tree)', sitecore: '/sitecore/content/asos/asos/Catalogue', title: 'Catalogue' },
  { route: '(tree)', sitecore: '/sitecore/content/asos/asos/Sites', title: 'Sites' },
  { route: '(tree)', sitecore: '/sitecore/content/asos/asos/Signals', title: 'Signals' },
];
for (const extra of extras) {
  if (!seen.has(extra.sitecore)) rows.push(extra);
}

const esc = (value) => (/[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value);
const missing = [];
const out = ['Route,SitecorePath,Title,YamlFile'];
for (const row of rows) {
  const hit = byPath.get(row.sitecore);
  if (!hit) missing.push(row.sitecore);
  out.push([row.route, row.sitecore, row.title, hit ? hit.rel : ''].map(esc).join(','));
}
fs.writeFileSync(mapPath, `${out.join('\r\n')}\r\n`);

const index = ['SitecorePath,Title,YamlFile'];
for (const [sitecore, hit] of [...byPath.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  index.push([sitecore, hit.title, hit.rel].map(esc).join(','));
}
fs.writeFileSync(indexPath, `${index.join('\r\n')}\r\n`);
console.log(`page rows=${out.length - 1} missing=${missing.length} index=${index.length - 1}`);
if (missing.length) console.log(missing.join('\n'));
