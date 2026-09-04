import { readFileSync, writeFileSync } from 'node:fs';

const p = 'authoring/items/brother/serialized-content/brother/brother/Home.yml';
let c = readFileSync(p, 'utf8');
if (c.includes('s:ds=')) {
  console.log('already has s:ds');
  process.exit(0);
}

const variants = [
  [
    'uid="{B40E1000-0001-4000-8000-000000000001}"\n          p:before="*"\n          s:id="{B40E0001-1111-4000-8000-000000000003}"\n          s:par=',
    'uid="{B40E1000-0001-4000-8000-000000000001}"\n          p:before="*"\n          s:id="{B40E0001-1111-4000-8000-000000000003}"\n          s:ds="{B40E00B1-2222-4000-8000-000000000001}"\n          s:par=',
  ],
  [
    'uid="{B40E1000-0001-4000-8000-000000000001}"\r\n          p:before="*"\r\n          s:id="{B40E0001-1111-4000-8000-000000000003}"\r\n          s:par=',
    'uid="{B40E1000-0001-4000-8000-000000000001}"\r\n          p:before="*"\r\n          s:id="{B40E0001-1111-4000-8000-000000000003}"\r\n          s:ds="{B40E00B1-2222-4000-8000-000000000001}"\r\n          s:par=',
  ],
];

for (const [needle, insert] of variants) {
  if (c.includes(needle)) {
    writeFileSync(p, c.replace(needle, insert));
    console.log('Home.yml patched with Home Banner datasource');
    process.exit(0);
  }
}

console.error('Needle not found');
process.exit(1);
