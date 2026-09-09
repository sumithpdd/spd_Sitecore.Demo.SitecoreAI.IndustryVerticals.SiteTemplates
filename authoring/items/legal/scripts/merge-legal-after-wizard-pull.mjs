/**
 * Remap leftover Pinsent YAML onto the wizard-created legal collection/site.
 * Keep wizard item IDs; only rewrite Parent / Template / field refs that pointed at the old tree.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOTS = [
  path.join(__dirname, '..', 'serialized-content', 'legal'),
  path.join(__dirname, '..', 'serialized-content', 'collection'),
];

const MAP = new Map(
  [
    ['1025831c-8b88-4e0a-b521-dca9a3811e32', 'e0034130-db55-4ef7-9d03-6fb249c09d5f'],
    ['98e943d8-120e-4c10-90d7-c9b99ac5b0a0', '2550b30f-87d4-40da-8fba-8dad9d4c08f9'],
    ['90993d0f-265b-4984-a2bc-1b9d7c76e2f1', '7f779a70-0faa-4105-aac5-0c56f0ee44b4'],
    ['b6f18162-1796-4c29-ad22-8098d83c4517', '79e5fd59-d991-4dc2-a0c9-b9a779f5228a'],
    ['8e4220b2-f22a-4aae-a845-917fb8a4864b', 'fcd3e2b6-b74f-45a9-8c2d-a48e227f564f'],
    ['bf88480b-1218-4a33-b9d6-ef2794958ad6', '6966f310-5943-4f1e-ac68-0d444d28310a'],
    ['8e445ce1-12a6-4f1b-84cc-ab6ba7e83ce6', 'f2d7e15a-7595-4dbf-a5fe-b4bc26888daa'],
    ['f0623679-096e-40a8-81f4-da4e3e82c953', 'c5ddc774-49c4-41c2-9f05-b984b6c13b22'],
    ['6bbafa26-54dc-427f-a31f-274d2ebff7ad', 'd9b78273-0930-4a7b-94be-b59ca5471cf2'],
    ['be39284e-743a-4ddc-ab7c-9bc6c512fd08', 'e7fd47b0-09de-4296-b039-5a69ce05d920'],
    ['dec0e97b-efa0-48e8-840f-cf71b6b025dc', 'fe579fa8-54d5-445c-a167-522bb06d67f0'],
    ['0a5c6dc1-e92b-427e-9c01-ab656fa7982c', 'de3bcb1c-dcca-4669-b4ad-0775edde8318'],
    ['4524e60e-8a41-475c-a1af-84ac19c45a9c', 'ac816a52-d966-409c-8833-cef74bcb5101'],
    ['63af625e-82ab-4a5e-b39b-f5b5d0642c4e', 'c3bf3a0d-e1b5-4c4b-a982-e76a373ebd7a'],
    ['1cdafb1b-8a60-48ac-823d-4fd44e7dc879', '72e7aaa0-8b7c-465c-9480-6d35c0d3caf8'],
    ['b815f3ae-20d4-4117-abcb-c701ae48de85', '2375aedf-caed-402d-8296-2988a5f85ade'],
    ['d6dd45be-0d04-43e2-bfd9-9e91cb44bfe0', 'e5a82c5d-05dd-476c-bec7-efecffd2cf43'],
  ].map(([a, b]) => [a.toLowerCase(), b.toLowerCase()]),
);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith('.yml')) out.push(p);
  }
  return out;
}

function remapGuid(raw) {
  const bare = raw.replace(/[{}]/g, '').toLowerCase();
  const mapped = MAP.get(bare);
  if (!mapped) return null;
  if (raw.startsWith('{')) return `{${mapped.toUpperCase()}}`;
  return mapped;
}

let files = 0;
let replacements = 0;
const filesToScan = ROOTS.flatMap((root) => walk(root));
for (const file of filesToScan) {
  let text = fs.readFileSync(file, 'utf8');
  const next = text.replace(/\{?[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\}?/g, (m) => {
    const r = remapGuid(m);
    if (r && r !== m) {
      replacements += 1;
      return r;
    }
    return m;
  });
  if (next !== text) {
    fs.writeFileSync(file, next);
    files += 1;
  }
}
console.log(`Updated ${files} files (${replacements} GUID replacements)`);
