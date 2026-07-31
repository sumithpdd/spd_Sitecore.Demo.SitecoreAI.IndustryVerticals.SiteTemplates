import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.yml')) acc.push(p);
  }
  return acc;
}

const root = 'authoring/items/automobile/serialized-content/templates/automobile';
const map = {};
for (const f of walk(root)) {
  const t = readFileSync(f, 'utf8');
  const id = (t.match(/^ID: "([^"]+)"/m) || [])[1];
  const p = (t.match(/^Path: "([^"]+)"/m) || [])[1];
  if (!id || !p || !p.includes('/Data/')) continue;
  const parts = p.split('/');
  const field = parts[parts.length - 1];
  const compIdx = parts.findIndex((x) => x.endsWith(' Templates'));
  if (compIdx < 0) continue;
  const comp = parts[compIdx].replace(/ Templates$/, '');
  map[`${comp}/${field}`] = id;
}
const keys = Object.keys(map).filter((k) => k.startsWith('ModelFamily'));
console.log(keys.sort().join('\n'));
console.log('total fields', Object.keys(map).length);
