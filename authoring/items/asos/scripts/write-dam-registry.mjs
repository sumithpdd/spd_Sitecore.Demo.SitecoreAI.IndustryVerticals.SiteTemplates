import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const csvPath = path.join(here, 'media-maps', 'content-hub-asset-registry.csv');
const outPath = path.join(here, '../../../../industry-verticals/asos/src/lib/dam-registry.ts');
const lines = fs.readFileSync(csvPath, 'utf8').trim().split(/\r?\n/).slice(1);
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
const body = `export const DAM: Record<string, { src: string; damId: string }> = {\n${rows
  .map((r) => `  '${r.file}': {\n    src: '${r.src}',\n    damId: '${r.damId}',\n  },`)
  .join('\n')}\n};\n`;
fs.writeFileSync(outPath, body);
console.log(`wrote ${rows.length} DAM entries`);
