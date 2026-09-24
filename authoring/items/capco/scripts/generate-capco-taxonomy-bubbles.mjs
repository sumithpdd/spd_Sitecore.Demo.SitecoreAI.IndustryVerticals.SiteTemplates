/**
 * Extra taxonomy terms + TaxonomyBubbles rendering.
 * Does not rewrite Home.yml or DAM stamps.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SERIAL = path.join(ROOT, 'serialized-content');

const T_JSON = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const T_TAG = 'c4c00010-0000-4000-8000-000000000080';
const F_CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';
const F_LABEL = 'c4c00010-0000-4000-8000-000000000082';
const F_COMPONENT = '037fe404-dd19-4bf7-8e30-4dadf68b27b0';
const F_ICON = '06d5295c-ed2f-4a54-9bf2-26228d113318';
const F_PARAM = 'a77e8568-1ab3-44f1-a664-b7c37ec7810d';
const REND_FOLDER = '781e3f75-3bb2-4c5b-95e7-39fc5425a522';
const PARAM_HERO = '5BD96264-0B02-4605-8FFF-0079CAEB67FC';
const RENDERING = 'c4c00001-1111-4000-8000-000000000022';
const DS_SERVICES = 'c4c00020-0000-4000-8000-000000000042';
const DS_REGIONS = 'c4c00020-0000-4000-8000-000000000043';
const DS_TOPICS = 'c4c00020-0000-4000-8000-000000000044';

const TAGS = [
  ['c4c00025-0000-4000-8000-000000000016', DS_SERVICES, 'Services/cyber-resilience', 'Cyber resilience'],
  ['c4c00025-0000-4000-8000-000000000017', DS_SERVICES, 'Services/commodity-trading', 'Commodity trading'],
  ['c4c00025-0000-4000-8000-000000000018', DS_SERVICES, 'Services/onboarding', 'Onboarding'],
  ['c4c00025-0000-4000-8000-000000000019', DS_SERVICES, 'Services/climate-risk', 'Climate risk'],
  ['c4c00025-0000-4000-8000-00000000001a', DS_SERVICES, 'Services/surveillance', 'Surveillance'],
  ['c4c00025-0000-4000-8000-000000000025', DS_REGIONS, 'Regions/germany', 'Germany'],
  ['c4c00025-0000-4000-8000-000000000026', DS_REGIONS, 'Regions/canada', 'Canada'],
  ['c4c00025-0000-4000-8000-000000000027', DS_REGIONS, 'Regions/nordics', 'Nordics'],
  ['c4c00025-0000-4000-8000-000000000028', DS_REGIONS, 'Regions/middle-east', 'Middle East'],
  ['c4c00025-0000-4000-8000-000000000034', DS_TOPICS, 'Topics/energy-trading', 'Energy trading'],
  ['c4c00025-0000-4000-8000-000000000035', DS_TOPICS, 'Topics/agentic-ai', 'Agentic AI'],
  ['c4c00025-0000-4000-8000-000000000036', DS_TOPICS, 'Topics/fraud', 'Fraud controls'],
  ['c4c00025-0000-4000-8000-000000000037', DS_TOPICS, 'Topics/analytics', 'Analytics'],
  ['c4c00025-0000-4000-8000-000000000038', DS_TOPICS, 'Topics/climate', 'Climate'],
  ['c4c00025-0000-4000-8000-000000000039', DS_TOPICS, 'Topics/settlement', 'Settlement'],
  ['c4c00025-0000-4000-8000-00000000003a', DS_TOPICS, 'Topics/cyber', 'Cyber'],
];

function mkdirp(p) {
  fs.mkdirSync(p, { recursive: true });
}
function write(rel, content) {
  const full = path.join(ROOT, rel);
  mkdirp(path.dirname(full));
  fs.writeFileSync(full, content, 'utf8');
}

for (const [id, parent, rel, label] of TAGS) {
  write(
    `serialized-content/capco/capco/Data/Taxonomy/${rel}.yml`,
    `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_TAG}"
Path: /sitecore/content/capco/capco/Data/Taxonomy/${rel}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260924T020000Z
    - ID: "${F_LABEL}"
      Hint: Label
      Value: "${label}"
`
  );
}

write(
  'serialized-content/renderings/capco/TaxonomyBubbles.yml',
  `---
ID: "${RENDERING}"
Parent: "${REND_FOLDER}"
Template: "${T_JSON}"
Path: /sitecore/layout/Renderings/Project/capco/TaxonomyBubbles
SharedFields:
- ID: "${F_COMPONENT}"
  Hint: componentName
  Value: TaxonomyBubbles
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/element.png
- ID: "${F_PARAM}"
  Hint: Parameters Template
  Value: "{${PARAM_HERO}}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260924T020000Z
`
);

function addRendering(rel) {
  const full = path.join(SERIAL, rel);
  let text = fs.readFileSync(full, 'utf8');
  const guid = `{${RENDERING.toUpperCase()}}`;
  if (!text.includes(guid)) {
    text = text.replace(
      /Hint: Allowed Controls\r?\n  Value: \|\r?\n/,
      `Hint: Allowed Controls\n  Value: |\n    ${guid}\n`
    );
    if (!text.includes(guid)) {
      text = text.replace(
        /Hint: Renderings\r?\n  Value: \|\r?\n/,
        `Hint: Renderings\n  Value: |\n    ${guid}\n`
      );
    }
    fs.writeFileSync(full, text);
  }
}

addRendering('capco/capco/Presentation/Placeholder Settings/headless-main.yml');
addRendering('placeholder-settings/capco/headless-main.yml');
addRendering('capco/capco/Presentation/Available Renderings/Capco.yml');

function patchArticle(rel, extra) {
  const full = path.join(SERIAL, rel);
  if (!fs.existsSync(full)) {
    return;
  }
  let yaml = fs.readFileSync(full, 'utf8');
  for (const [hint, ids] of extra) {
    const block = new RegExp(`Hint: ${hint}\\r?\\n      Value: \\|\\r?\\n(?:        \\{C4C000[0-9A-F-]+\\}\\r?\\n)+`);
    const next = `Hint: ${hint}\n      Value: |\n${ids.map((id) => `        {${id.toUpperCase()}}`).join('\n')}\n`;
    if (block.test(yaml)) {
      yaml = yaml.replace(block, next);
    }
  }
  fs.writeFileSync(full, yaml);
}

patchArticle('capco/capco/Home/perspectives/agentic-ai-in-energy-trading.yml', [
  [
    'Sectors',
    ['c4c00025-0000-4000-8000-000000000005', 'c4c00025-0000-4000-8000-000000000002'],
  ],
  [
    'Services',
    [
      'c4c00025-0000-4000-8000-000000000012',
      'c4c00025-0000-4000-8000-000000000014',
      'c4c00025-0000-4000-8000-000000000015',
      'c4c00025-0000-4000-8000-000000000017',
    ],
  ],
  [
    'Regions',
    [
      'c4c00025-0000-4000-8000-000000000021',
      'c4c00025-0000-4000-8000-000000000022',
      'c4c00025-0000-4000-8000-000000000023',
      'c4c00025-0000-4000-8000-000000000025',
    ],
  ],
  [
    'Tags',
    [
      'c4c00025-0000-4000-8000-000000000032',
      'c4c00025-0000-4000-8000-000000000033',
      'c4c00025-0000-4000-8000-000000000034',
      'c4c00025-0000-4000-8000-000000000035',
    ],
  ],
  [
    'RelatedContent',
    [
      'c4c00030-0000-4000-8000-000000000017',
      'c4c00030-0000-4000-8000-000000000018',
      'c4c00030-0000-4000-8000-000000000012',
    ],
  ],
]);

console.log(`Taxonomy bubbles: ${TAGS.length} terms + TaxonomyBubbles rendering.`);
