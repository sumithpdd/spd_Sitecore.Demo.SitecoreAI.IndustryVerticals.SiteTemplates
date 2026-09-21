import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const csv = fs.readFileSync(path.join(__dirname, 'media-maps/content-hub-asset-registry.csv'), 'utf8');

function parseCsvLine(line) {
  const cells = [];
  let cur = '';
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQ && line[i + 1] === '"') {
        cur += '"';
        i += 1;
      } else {
        inQ = !inQ;
      }
    } else if (ch === ',' && !inQ) {
      cells.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  cells.push(cur);
  return cells;
}

const lines = csv.trim().split(/\r?\n/);
const header = parseCsvLine(lines[0]);
const fileIdx = header.indexOf('File');
const xmlIdx = header.indexOf('ImageFieldXml');
const map = {};
for (const line of lines.slice(1)) {
  if (!line.trim()) continue;
  const cells = parseCsvLine(line);
  map[cells[fileIdx]] = cells[xmlIdx];
}
const out = path.join(__dirname, 'media-maps/capco-image-xml.json');
fs.writeFileSync(out, `${JSON.stringify(map, null, 2)}\n`);
console.log(Object.keys(map).join(', '));
