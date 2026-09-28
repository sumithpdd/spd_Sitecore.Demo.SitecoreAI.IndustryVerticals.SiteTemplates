/**
 * Rewrite ASOS Image fields from starter-verticals-2 public links
 * to the spd-asos links in content-hub-asset-registry.csv.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../../../..');
const oldPath = path.join(here, 'media-maps', 'asos-media-migration.csv');
const newPath = path.join(here, 'media-maps', 'content-hub-asset-registry.csv');

function parseCsv(text) {
  const lines = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/).slice(1);
  const rows = [];
  for (const line of lines) {
    const parts = [];
    let cur = '';
    let inQ = false;
    for (const ch of line) {
      if (ch === '"') {
        inQ = !inQ;
        continue;
      }
      if (ch === ',' && !inQ) {
        parts.push(cur);
        cur = '';
        continue;
      }
      cur += ch;
    }
    parts.push(cur);
    rows.push(parts);
  }
  return rows;
}

const oldRows = parseCsv(fs.readFileSync(oldPath, 'utf8'));
const newRows = parseCsv(fs.readFileSync(newPath, 'utf8'));
const nextByFile = new Map(
  newRows
    .filter((parts) => parts[0] && parts[4] && parts[4].includes('spd-asos.sitecoresandbox.cloud'))
    .map((parts) => [parts[0], { damId: parts[3], publicUrl: parts[4] }])
);

const pairs = [];
for (const parts of oldRows) {
  const [file, , , oldDam, oldUrl] = parts;
  const next = nextByFile.get(file);
  if (!next || !oldUrl) continue;
  pairs.push({ oldUrl, newUrl: next.publicUrl, oldDam, newDam: next.damId });
}
pairs.sort((a, b) => b.oldUrl.length - a.oldUrl.length);

const roots = [
  path.join(repo, 'authoring/items/asos'),
  path.join(repo, 'industry-verticals/asos/src'),
  path.join(repo, 'docs'),
  path.join(repo, '.cursor/skills/asos-fashion'),
];

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next' || name === 'media-staging') continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, acc);
    else if (/\.(yml|json|ts|tsx|md|csv)$/.test(name)) acc.push(full);
  }
  return acc;
}

let files = 0;
let hits = 0;
for (const file of roots.flatMap((root) => walk(root))) {
  if (file.endsWith('asos-media-migration.csv')) continue;
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  for (const pair of pairs) {
    if (pair.oldUrl && text.includes(pair.oldUrl)) text = text.split(pair.oldUrl).join(pair.newUrl);
    if (pair.oldDam && pair.newDam && text.includes(pair.oldDam)) {
      text = text.split(pair.oldDam).join(pair.newDam);
    }
  }
  if (text !== before) {
    fs.writeFileSync(file, text);
    files += 1;
    hits += 1;
  }
}
console.log(`mapped=${pairs.length} files=${files}`);
