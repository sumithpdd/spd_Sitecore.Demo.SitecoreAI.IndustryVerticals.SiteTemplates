/**
 * Point product Image fields and the live catalog at Content Hub public links.
 * Run after Upload-AsosContentHub.ps1. Never writes /public paths.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const csvPath = path.join(here, 'media-maps', 'content-hub-asset-registry.csv');
const catalogPath = path.join(here, '../../../../industry-verticals/asos/src/lib/asos-live-catalog.json');
const contentRoot = path.join(here, '../serialized-content');

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/).slice(1);
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
    const [file, , , damId, src] = parts;
    if (file && src && damId) rows.push({ file, src, damId });
  }
  return rows;
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function imageXml(src, damId, alt) {
  return `<Image src="${xmlEscape(src)}" dam-id="${xmlEscape(damId)}" alt="${xmlEscape(alt)}" dam-content-type="Image" />`;
}

const byFile = new Map(parseCsv(fs.readFileSync(csvPath, 'utf8')).map((row) => [row.file, row]));

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
let catalogHits = 0;
for (const row of catalog) {
  const asset = byFile.get(`${row.id}.jpg`);
  if (!asset) continue;
  row.imageSrc = asset.src;
  catalogHits += 1;
}
fs.writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);

const imageBlock = (xml) =>
  [
    '    - ID: "a50c0003-0000-4000-8000-000000000043"',
    '      Hint: Image',
    '      Value: |',
    `        ${xml}`,
  ].join('\n');

let yamlHits = 0;
let yamlSkipped = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!entry.name.endsWith('.yml')) continue;
    const text = fs.readFileSync(full, 'utf8');
    const idMatch = text.match(/Hint: ProductId\r?\n\s+Value: "(\d+)"/);
    if (!idMatch) continue;
    const asset = byFile.get(`${idMatch[1]}.jpg`);
    if (!asset) continue;
    if (/Hint: Image\r?\n/.test(text)) {
      yamlSkipped += 1;
      continue;
    }
    const title = text.match(/Hint: Title\r?\n\s+Value: "([^"]*)"/)?.[1] || idMatch[1];
    const block = imageBlock(imageXml(asset.src, asset.damId, title));
    const video = text.match(/\r?\n    - ID: "a50c0003-0000-4000-8000-000000000044"\r?\n      Hint: Video/);
    const next = video
      ? text.replace(video[0], `\n${block}${video[0]}`)
      : text.replace(/\nLanguages:\n/, `\n${block}\nLanguages:\n`);
    if (next === text) continue;
    fs.writeFileSync(full, next);
    yamlHits += 1;
  }
}
walk(contentRoot);

const editorial = [
  'hero-women.jpg',
  'hero-men.jpg',
  'trend-1.jpg',
  'trend-2.jpg',
  'trend-3.jpg',
  'trend-4.jpg',
  'trend-5.jpg',
].filter((file) => byFile.has(file));

console.log(`catalog=${catalogHits} yaml=${yamlHits} already=${yamlSkipped} editorial=${editorial.length}`);
