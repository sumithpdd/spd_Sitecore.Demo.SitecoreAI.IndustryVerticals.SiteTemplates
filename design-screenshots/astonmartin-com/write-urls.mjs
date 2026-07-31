import { writeFileSync, existsSync, renameSync, rmSync, mkdirSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const urls = [
  'https://www.astonmartin.com/en-gb',
  'https://www.astonmartin.com/en-gb/models',
  'https://www.astonmartin.com/en-gb/models/db12',
  'https://www.astonmartin.com/en-gb/models/db12-s',
  'https://www.astonmartin.com/en-gb/models/db12-volante',
  'https://www.astonmartin.com/en-gb/models/vantage-coupe',
  'https://www.astonmartin.com/en-gb/models/vantage-s',
  'https://www.astonmartin.com/en-gb/models/vantage-roadster',
  'https://www.astonmartin.com/en-gb/models/vanquish',
  'https://www.astonmartin.com/en-gb/models/vanquish-volante',
  'https://www.astonmartin.com/en-gb/models/vanquish-25th-anniversary-edition',
  'https://www.astonmartin.com/en-gb/models/dbx707',
  'https://www.astonmartin.com/en-gb/models/dbx-s',
  'https://www.astonmartin.com/en-gb/models/valhalla',
  'https://www.astonmartin.com/en-gb/models/valkyrie',
  'https://www.astonmartin.com/en-gb/models/valkyrie-spider',
  'https://www.astonmartin.com/en-gb/models/valkyrie-amr-pro',
  'https://www.astonmartin.com/en-gb/models/valkyrie-lm',
  'https://www.astonmartin.com/en-gb/models/valour',
  'https://www.astonmartin.com/en-gb/models/valiant',
  'https://www.astonmartin.com/en-gb/models/amr26',
  'https://www.astonmartin.com/en-gb/models/volante-60th-anniversary-editions',
  'https://www.astonmartin.com/en-gb/models/past-models',
  'https://www.astonmartin.com/en-gb/q-by-aston-martin',
  'https://configurator.astonmartin.com',
];

const urlsPath = join(root, 'design-screenshots/astonmartin-com/urls.txt');
writeFileSync(urlsPath, `# Aston Martin UK capture list\n${urls.join('\n')}\n`, 'utf8');
console.log('Wrote', urlsPath);

const bad = join(root, '.cursor\authoring/items/automobile');
const good = join(root, 'authoring/items/automobile');
if (existsSync(bad) && !existsSync(good)) {
  mkdirSync(join(root, 'authoring/items'), { recursive: true });
  renameSync(bad, good);
  console.log('Moved collection to', good);
  try {
    rmSync(join(root, '.cursor\authoring'), { recursive: true, force: true });
  } catch {
    /* ignore */
  }
} else {
  console.log('module at authoring?', existsSync(join(good, 'automobile.module.json')));
  console.log('bad path exists?', existsSync(bad));
}
