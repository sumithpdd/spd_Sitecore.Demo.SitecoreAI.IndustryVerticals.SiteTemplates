/**
 * ASOS journey pages under Home. GUID prefix a50c.
 * Do not invent extra consultant-style people. Maya is story-only.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const HOME = '41ee7ce2-a19d-4854-883c-4b1cc8fb50fb';
const T_PAGE = '328222ce-19c6-4866-a39e-849665790932';
const F_CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';
const F_NAV = '4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8';
const F_TITLE = '6a4b1abd-d0db-4e90-85aa-d79227995290';
const F_REV = '8cdc337e-a112-42fb-bbb4-4143751e123f';

let n = 1;
const guid = () => `a50c0002-0000-4000-8000-${String(n++).padStart(12, '0')}`;

const pages = [
  ['women', 'Women'],
  ['petite-denim', 'Petite denim'],
  ['petite-denim/cat', 'Petite denim'],
  ['the-denim-drop', 'The denim drop'],
  ['the-denim-drop/cat', 'The denim drop'],
  ['festival-2-0', 'Festival 2.0'],
  ['festival-2-0/cat', 'Festival 2.0'],
  ['your-new-uniform', 'Your new uniform'],
  ['your-new-uniform/cat', 'Your new uniform'],
  ['topshop-catwalk', 'Topshop Catwalk'],
  ['topshop-catwalk/cat', 'Topshop Catwalk'],
  ['chocolate', 'Chocolate'],
  ['chocolate/cat', 'Chocolate'],
  ['polka-dot', 'Polka dot'],
  ['polka-dot/cat', 'Polka dot'],
  ['rugby-tops', 'Rugby tops'],
  ['rugby-tops/cat', 'Rugby tops'],
  ['women/a-to-z-of-brands', 'A to Z of brands'],
  ['women/a-to-z-of-brands/topshop', 'Topshop'],
  ['women/a-to-z-of-brands/topshop/cat', 'Topshop'],
  ['topshop', 'Topshop'],
  ['topshop/topshop-belle-paris-camisole-in-blue', 'Belle Paris camisole'],
  ['topshop/topshop-belle-paris-camisole-in-blue/prd', 'prd'],
  ['topshop/topshop-belle-paris-camisole-in-blue/prd/200415553', 'Topshop Belle Paris camisole in blue'],
  ['style-feed', 'Style Feed'],
  ['saved-items', 'Saved items'],
  ['my-edit', 'My Edit'],
  ['curation-insight', 'Curation insight'],
  ['bag', 'Bag'],
  ['account', 'Account'],
  ['us', 'United States'],
  ['us/women', 'Women'],
  ['au', 'Australia'],
  ['au/women', 'Women'],
  ['de', 'Deutschland'],
  ['de/women', 'Women'],
];

const ids = new Map();
ids.set('', HOME);

function pageYaml(id, parent, itemPath, name) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_PAGE}"
Path: "${itemPath}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260925T150000Z
    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: "${name}"
    - ID: "${F_REV}"
      Hint: __Revision
      Value: "${id}"
    - ID: "${F_TITLE}"
      Hint: Title
      Value: "${name}"
`;
}

for (const [rel, name] of pages) {
  const parts = rel.split('/');
  let parentPath = '';
  let parentId = HOME;
  let acc = [];
  for (const part of parts) {
    acc.push(part);
    const key = acc.join('/');
    if (!ids.has(key)) {
      const id = guid();
      ids.set(key, id);
      const itemPath = `/sitecore/content/asos/asos/Home/${key}`;
      const file = path.join(
        ROOT,
        'serialized-content/asos/asos/Home',
        ...acc.slice(0, -1),
        `${part}.yml`
      );
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, pageYaml(id, parentId, itemPath, key === rel ? name : part));
    }
    parentId = ids.get(key);
    parentPath = key;
  }
}

fs.writeFileSync(
  path.join(__dirname, 'media-maps/asos-page-map.csv'),
  ['Route,SitecorePath,Title', ...pages.map(([rel, name]) => `/${rel},/sitecore/content/asos/asos/Home/${rel},${name}`)].join(
    '\n'
  ) + '\n'
);
console.log(`pages=${pages.length}`);
