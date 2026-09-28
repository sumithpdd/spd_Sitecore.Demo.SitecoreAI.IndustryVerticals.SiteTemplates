import fs from 'fs';
import path from 'path';

const root = path.resolve('authoring/items/asos/serialized-content');
const productTemplate = 'a50c0003-0000-4000-8000-000000000020';
const emptyDevice = `<d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}"
        l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}" />`;

const walk = (dir, files = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.yml')) files.push(full);
  }
  return files;
};

let stamped = 0;
let skipped = 0;

for (const file of walk(root)) {
  if (file.includes(`${path.sep}templates${path.sep}`)) continue;
  const yaml = fs.readFileSync(file, 'utf8');
  if (!yaml.includes(`Template: "${productTemplate}"`)) continue;
  const normalized = yaml.replace(/\r\n/g, '\n');
  if (normalized.includes('{A50C0001-1111-4000-8000-000000000006}')) {
    skipped += 1;
    continue;
  }
  if (!normalized.includes(emptyDevice)) {
    skipped += 1;
    continue;
  }
  const id = normalized.match(/^ID: "([a-f0-9-]+)"/m)?.[1];
  if (!id) {
    skipped += 1;
    continue;
  }
  const uid = `{A50C2006-${id.slice(9).toUpperCase()}}`;
  const ds = `{${id.toUpperCase()}}`;
  const rendering = `<d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}"
        l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
        <r
          uid="${uid}"
          p:before="*"
          s:ds="${ds}"
          s:id="{A50C0001-1111-4000-8000-000000000006}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />
      </d>`;
  const next = normalized.replace(emptyDevice, rendering);
  const out = yaml.includes('\r\n') ? next.replace(/\n/g, '\r\n') : next;
  fs.writeFileSync(file, out);
  stamped += 1;
}

console.log(`stamped=${stamped} skipped=${skipped}`);
