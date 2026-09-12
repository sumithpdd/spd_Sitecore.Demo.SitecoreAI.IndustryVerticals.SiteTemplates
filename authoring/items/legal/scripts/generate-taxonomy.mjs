/**
 * Shared Pinsent taxonomy: Sectors, Services, Regions.
 * Adds Classification mixin fields to Page, PersonPage, ArticlePage.
 * Run: node authoring/items/legal/scripts/generate-taxonomy.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const LEGAL_SRC = path.join(ROOT, '..', '..', '..', 'industry-verticals', 'legal', 'src');

const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const T_TPL_FOLDER = '0437fee2-44c9-46a6-abe9-28858d9fee8c';
const T_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';
const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const T_TAG = 'a1e90013-0000-4000-8000-000000000010';
const T_TAG_FOLDER = 'a1e90013-0000-4000-8000-000000000015';
const F_TITLE_FIELD = 'a1e90013-0000-4000-8000-000000000012';
const PROJECT_TEMPLATES = '5dd02c0b-a6d5-4a11-9c1d-399948fe4ec5';
const DATA_ROOT = '79e5fd59-d991-4dc2-a0c9-b9a779f5228a';
const BASE_STD = '{1930BBEB-7805-471A-A3BE-4858AC7CF696}';

const F_SOURCE = '1eb8ae32-e190-44a6-968d-ed904c794ebf';
const F_TYPE = 'ab162cc0-dc80-4abf-8871-998ee5d7ba32';
const F_SORT = 'ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e';
const F_TITLE = '19a69332-a23e-4e70-8d16-b2640cb24cc8';
const F_CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';
const F_BASE_TPL = '12c33f3f-86c5-43a5-aeb4-5598cec45116';
const F_ICON = '06d5295c-ed2f-4a54-9bf2-26228d113318';
const F_MASTERS = '1172f643-ae13-4102-937a-a89d32bdf9c1';

const ID = {
  TplFolder: 'a1e90014-0000-4000-8000-000000000001',
  Classification: 'a1e90014-0000-4000-8000-000000000002',
  Section: 'a1e90014-0000-4000-8000-000000000003',
  Sectors: 'a1e90014-0000-4000-8000-000000000010',
  Services: 'a1e90014-0000-4000-8000-000000000011',
  Regions: 'a1e90014-0000-4000-8000-000000000012',
  Taxonomy: 'a1e90025-0000-4000-8000-000000000001',
  SectorsFolder: 'a1e90025-0000-4000-8000-000000000010',
  ServicesFolder: 'a1e90025-0000-4000-8000-000000000200',
  RegionsFolder: 'a1e90025-0000-4000-8000-000000000400',
};

const CLASSIFICATION_BASE = `{${ID.Classification.toUpperCase()}}`;

const TREELIST_SOURCE = (root) =>
  `DataSource=/sitecore/content/legal/legal/Data/Taxonomy/${root}&IncludeTemplatesForSelection=Tag&IncludeTemplatesForDisplay=Tag,Tag Folder`;

function write(rel, content) {
  const full = path.isAbsolute(rel) ? rel : path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.replace(/\r\n/g, '\n'), 'utf8');
}

function created() {
  return `    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260911T220000Z
`;
}

function guid(n) {
  return `a1e90025-0000-4000-8000-${String(n).padStart(12, '0')}`;
}

function brace(id) {
  return `{${id.toUpperCase()}}`;
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function yamlQuote(value) {
  return `"${String(value).replace(/"/g, '\\"')}"`;
}

const SECTORS = [
  ['Defence & Security'],
  [
    'Energy & Natural Resources',
    ['CleanTech', 'Hydrogen, Bioenergy & CCUS', 'Nuclear', 'Oil & Gas', 'Renewables'],
  ],
  ['Financial Services', ['Digital assets', 'Finance', 'Fintech', 'Insurance']],
  [
    'Infrastructure',
    [
      'Community Infrastructure',
      'Construction',
      'Construction Services',
      'Economic Infrastructure',
      'Major Infrastructure Owners & Operators',
      'Social Infrastructure',
      'Transport',
      'Waste',
      'Waste management',
      'Water & wastewater',
    ],
  ],
  ['Life Sciences & Healthcare', ['Dental', 'Health']],
  ['Professional & Public Services', ['Government and public sector', 'Professional Services']],
  ['Real Estate', ['Garden communities', 'Logistics', 'Residential']],
  ['Retail & Consumer'],
  ['Sport & Hospitality', ['Gambling', 'Hotels', 'Sport & Entertainment']],
  [
    'Technology, Science & Industry',
    [
      'Automotive',
      'Autonomous vehicles',
      'Diversified Industrial',
      'Technology & Digital Markets',
      'Universities & Education',
    ],
  ],
];

const SERVICES = [
  [
    'Construction & projects',
    ['Construction Advisory & Disputes', 'Planning & environment', 'Projects'],
  ],
  ['Corporate', ['Antitrust, competition & trade', 'Commercial', 'Corporate', 'Tax']],
  [
    'Dispute resolution',
    [
      'Arbitration',
      'Bribery & corruption',
      'Commercial litigation',
      'Competition litigation',
      'Export Controls & Sanctions',
      'Litigation and arbitration',
      'Product liability',
      'Tax disputes & investigations',
    ],
  ],
  ['Employment & incentives', ['Employment', 'Incentives']],
  [
    'Finance',
    [
      'Debt finance',
      'Energy & infrastructure finance',
      'Financial regulation & products',
      'Insurance - advisory & disputes',
      'Investment Funds',
      'Private equity',
      'Project finance',
      'Real estate finance',
      'Restructuring',
    ],
  ],
  ['Intellectual Property', ['Brand protection & creative rights', 'Patents']],
  [
    'Pensions & long-term savings',
    ['Pensions advisory', 'Pensions disputes', 'Pensions investments'],
  ],
  [
    'Property',
    [
      'Corporate Real Estate',
      'Environmental',
      'Planning',
      'Property development',
      'Property dispute resolution',
      'Property investment',
    ],
  ],
  [
    'Regulation & global investigations',
    [
      'Climate & sustainability',
      'Financial services regulation',
      'Global investigations',
      'Health & safety',
      'Public policy',
    ],
  ],
  [
    'Technology, Media & Telecommunications',
    [
      'Artificial intelligence',
      'Data, privacy & cyber',
      'TMT disputes & renegotiations',
      'TMT sourcing & advisory',
    ],
  ],
];

const REGIONS = [
  ['Africa', ['South Africa']],
  ['Asia Pacific', ['Australia', 'China', 'Singapore']],
  [
    'Europe',
    [
      'France',
      'Germany',
      'Ireland',
      'Luxembourg',
      'Poland',
      'Spain',
      'The Netherlands',
      'United Kingdom',
    ],
  ],
  ['Middle East', ['Qatar', 'Saudi Arabia', 'United Arab Emirates']],
  ['Multinational Network'],
];

/** @type {Map<string, { id: string, title: string, slug: string, parent?: string }>} */
function addTerm(map, title, parentSlug, nextId) {
  let slug = slugify(title);
  if (map.has(slug)) {
    slug = parentSlug ? `${parentSlug}-${slug}` : `${slug}-2`;
  }
  if (map.has(slug)) {
    slug = `${slug}-${nextId()}`;
  }
  const id = guid(nextId());
  const term = { id, title, slug, parent: parentSlug };
  map.set(slug, term);
  return term;
}

function buildTree(rows, start) {
  let n = start;
  const nextId = () => n++;
  const map = new Map();
  const tree = rows.map(([title, children]) => {
    const parent = addTerm(map, title, undefined, nextId);
    const kids = (children || []).map((child) => addTerm(map, child, parent.slug, nextId));
    return { ...parent, children: kids };
  });
  return { tree, map, next: n };
}

const sectorsBuilt = buildTree(SECTORS, 0x11);
const servicesBuilt = buildTree(SERVICES, 0x201);
const regionsBuilt = buildTree(REGIONS, 0x401);

const PAGE_TAXONOMY = {
  'dawn-allen': {
    sectors: ['financial-services'],
    services: ['restructuring'],
    regions: ['united-kingdom', 'europe'],
  },
  'sally-williamson': {
    sectors: ['professional-public-services'],
    services: ['restructuring'],
    regions: ['united-kingdom'],
  },
  'bill-ryan': {
    sectors: ['infrastructure', 'construction'],
    services: ['construction-advisory-disputes', 'arbitration'],
    regions: ['australia', 'asia-pacific'],
  },
  'hammad-akhtar': {
    sectors: ['financial-services', 'insurance'],
    services: ['insurance-advisory-disputes', 'corporate'],
    regions: ['united-kingdom'],
  },
  'desiree-fields': {
    sectors: ['technology-science-industry'],
    services: ['intellectual-property', 'brand-protection-creative-rights'],
    regions: ['united-kingdom'],
  },
  'dinesh-banani': {
    sectors: ['financial-services'],
    services: ['finance', 'financial-regulation-products'],
    regions: ['united-kingdom'],
  },
  'david-barker': {
    sectors: ['technology-science-industry'],
    services: ['technology-media-telecommunications', 'data-privacy-cyber'],
    regions: ['united-kingdom'],
  },
  'david-doogan': {
    sectors: ['financial-services'],
    services: ['finance', 'debt-finance'],
    regions: ['united-kingdom'],
  },
  'barry-mccaig': {
    sectors: ['professional-public-services'],
    services: ['corporate'],
    regions: ['united-kingdom'],
  },
  'bryn-reynolds': {
    sectors: ['financial-services'],
    services: ['tax'],
    regions: ['united-kingdom'],
  },
  'ben-mckinley': {
    sectors: ['professional-public-services'],
    services: ['employment'],
    regions: ['australia', 'asia-pacific'],
  },
  'when-uk-suppliers-must-continue-to-supply-insolvent-companies': {
    sectors: ['professional-public-services'],
    services: ['restructuring'],
    regions: ['united-kingdom'],
  },
  'uk-government-plans-to-revamp-holiday-pay-calculation-for-part-year-workers': {
    sectors: ['professional-public-services'],
    services: ['employment'],
    regions: ['united-kingdom'],
  },
  'pensions-disputes-managing-member-expectations-paramount': {
    sectors: ['financial-services'],
    services: ['pensions-disputes'],
    regions: ['united-kingdom'],
  },
  'uk-subsidy-control-post-brexit-access-to-effective-judicial-remedies': {
    sectors: ['professional-public-services', 'government-and-public-sector'],
    services: ['regulation-global-investigations'],
    regions: ['united-kingdom', 'europe'],
  },
  'steps-of-court-settlement-was-not-negligent-court-rules': {
    sectors: ['professional-public-services'],
    services: ['dispute-resolution', 'litigation-and-arbitration'],
    regions: ['united-kingdom'],
  },
  'vast-majority-of-companies-not-seeking-to-avoid-tax': {
    sectors: ['financial-services'],
    services: ['tax'],
    regions: ['united-kingdom'],
  },
  'world-first-industrial-decarbonisation-strategy-developed-in-the-uk': {
    sectors: ['energy-natural-resources'],
    services: ['climate-sustainability'],
    regions: ['united-kingdom'],
  },
  '3d-printing-uk-product-safety-issues': {
    sectors: ['technology-science-industry'],
    services: ['product-liability'],
    regions: ['united-kingdom'],
  },
  '5g-potential-for-business-highlighted-in-uk-funding-programme': {
    sectors: ['technology-science-industry'],
    services: ['technology-media-telecommunications'],
    regions: ['united-kingdom'],
  },
  'lawmakers-seek-ban-on-superintelligent-ai-as-toolkit-developed-to-support-ai-projects': {
    sectors: ['technology-science-industry'],
    services: ['artificial-intelligence'],
    regions: ['united-kingdom'],
  },
  'english-court-confirms-high-bar-for-resisting-performance-bond-calls': {
    sectors: ['infrastructure', 'construction'],
    services: ['construction-projects'],
    regions: ['united-kingdom'],
  },
  'uk-plastic-packaging-tax-data-increases-scrutiny-on-supply-chains': {
    sectors: ['retail-consumer'],
    services: ['tax'],
    regions: ['united-kingdom'],
  },
  'pinsent-masons-strengthens-restructuring-practice-with-new-partner-mark-wilson': {
    sectors: ['financial-services'],
    services: ['restructuring'],
    regions: ['united-kingdom'],
  },
  'pinsent-masons-bolsters-middle-east-international-arbitration-practice-with-partner-hire': {
    sectors: ['professional-public-services'],
    services: ['arbitration'],
    regions: ['middle-east', 'united-arab-emirates'],
  },
  'pinsent-masons-appoints-infrastructure-ma-specialist-candice-lambeth': {
    sectors: ['infrastructure'],
    services: ['corporate'],
    regions: ['united-kingdom'],
  },
  restructuring: {
    sectors: ['professional-public-services', 'financial-services'],
    services: ['restructuring', 'finance'],
    regions: ['united-kingdom', 'europe'],
  },
  'professional-public-services': {
    sectors: ['professional-public-services'],
    services: ['corporate'],
    regions: ['united-kingdom'],
  },
};

function slugsToGuids(slugs, map) {
  return slugs
    .map((slug) => {
      const term = map.get(slug);
      if (!term) {
        throw new Error(`Unknown taxonomy slug: ${slug}`);
      }
      return brace(term.id);
    })
    .join('|');
}

function folderYaml(id, parent, itemPath, template, masters) {
  const master = masters
    ? `- ID: "${F_MASTERS}"
  Hint: __Masters
  Value: "${brace(masters)}"
`
    : '';
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${template}"
Path: ${yamlQuote(itemPath)}
SharedFields:
${master}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function tagYaml(term, parentId, itemPath, hasChildren) {
  const masters = hasChildren
    ? `- ID: "${F_MASTERS}"
  Hint: __Masters
  Value: "${brace(T_TAG)}"
`
    : '';
  return `---
ID: "${term.id}"
Parent: "${parentId}"
Template: "${T_TAG}"
Path: ${yamlQuote(itemPath)}
SharedFields:
${masters}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_TITLE_FIELD}"
      Hint: Title
      Value: ${yamlQuote(term.title)}
`;
}

function fieldYaml(id, parent, itemPath, sort, title, source) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_FIELD}"
Path: "${itemPath}"
SharedFields:
- ID: "${F_SOURCE}"
  Hint: Source
  Value: "${source}"
- ID: "${F_TYPE}"
  Hint: Type
  Value: "Treelist"
- ID: "${F_SORT}"
  Hint: __Sortorder
  Value: ${sort}
Languages:
- Language: en
  Fields:
  - ID: "${F_TITLE}"
    Hint: Title
    Value: "${title}"
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function writeTree(tree, folderId, folderName) {
  const base = `/sitecore/content/legal/legal/Data/Taxonomy/${folderName}`;
  for (const parent of tree) {
    const parentPath = `${base}/${parent.slug}`;
    write(
      `serialized-content/legal/legal/Data/Taxonomy/${folderName}/${parent.slug}.yml`,
      tagYaml(parent, folderId, parentPath, parent.children.length > 0)
    );
    for (const child of parent.children) {
      write(
        `serialized-content/legal/legal/Data/Taxonomy/${folderName}/${parent.slug}/${child.slug}.yml`,
        tagYaml(child, parent.id, `${parentPath}/${child.slug}`, false)
      );
    }
  }
}

function addBaseTemplate(fileRel, extraBase) {
  const full = path.join(ROOT, fileRel);
  let text = fs.readFileSync(full, 'utf8').replace(/\r\n/g, '\n');
  if (text.includes(extraBase)) {
    return;
  }
  if (!/Hint: __Base template\n  Value: \|/.test(text)) {
    throw new Error(`No base template block in ${fileRel}`);
  }
  text = text.replace(
    /(Hint: __Base template\n  Value: \|(?:\n    \{[0-9A-Fa-f-]+\})+)/,
    `$1\n    ${extraBase}`
  );
  if (!text.includes(extraBase)) {
    throw new Error(`Failed to add base template on ${fileRel}`);
  }
  fs.writeFileSync(full, text, 'utf8');
}

function upsertField(text, id, hint, value) {
  const block = `    - ID: "${id}"
      Hint: ${hint}
      Value: "${value}"
`;
  const re = new RegExp(
    `    - ID: "${id}"\\n      Hint: ${hint}\\n      Value: "[^"]*"\\n`
  );
  if (re.test(text)) {
    return text.replace(re, block);
  }
  const anchors = [
    /    - ID: "a1e90010-0000-4000-8000-000000000039"\n      Hint: Specialisms\n      Value: "[^"]*"\n/,
    /      Hint: Tags\n      Value: "[^"]*"\n/,
    /      Hint: Title\n      Value: "[^"]*"\n/,
  ];
  for (const anchor of anchors) {
    if (anchor.test(text)) {
      return text.replace(anchor, (match) => `${match}${block}`);
    }
  }
  return `${text.trimEnd()}\n${block}`;
}

function walkYml(dir, files = []) {
  if (!fs.existsSync(dir)) {
    return files;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkYml(full, files);
    } else if (entry.name.endsWith('.yml')) {
      files.push(full);
    }
  }
  return files;
}

function termJson(node) {
  return {
    id: node.id,
    slug: node.slug,
    title: node.title,
    children: (node.children || []).map((child) => ({
      id: child.id,
      slug: child.slug,
      title: child.title,
    })),
  };
}

write(
  'serialized-content/taxonomy-templates/Taxonomy Templates.yml',
  `---
ID: "${ID.TplFolder}"
Parent: "${PROJECT_TEMPLATES}"
Template: "${T_TPL_FOLDER}"
Path: "/sitecore/templates/Project/legal/Taxonomy Templates"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/taxonomy-templates/Taxonomy Templates/Classification.yml',
  `---
ID: "${ID.Classification}"
Parent: "${ID.TplFolder}"
Template: "${T_TEMPLATE}"
Path: "/sitecore/templates/Project/legal/Taxonomy Templates/Classification"
SharedFields:
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/tag.png
- ID: "${F_BASE_TPL}"
  Hint: __Base template
  Value: |
    ${BASE_STD}
- ID: "${F_SORT}"
  Hint: __Sortorder
  Value: 50
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/taxonomy-templates/Taxonomy Templates/Classification/Classification.yml',
  `---
ID: "${ID.Section}"
Parent: "${ID.Classification}"
Template: "${T_SECTION}"
Path: "/sitecore/templates/Project/legal/Taxonomy Templates/Classification/Classification"
SharedFields:
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/window_dialog.png
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/taxonomy-templates/Taxonomy Templates/Classification/Classification/Sectors.yml',
  fieldYaml(
    ID.Sectors,
    ID.Section,
    '/sitecore/templates/Project/legal/Taxonomy Templates/Classification/Classification/Sectors',
    100,
    'Sectors',
    TREELIST_SOURCE('Sectors')
  )
);
write(
  'serialized-content/taxonomy-templates/Taxonomy Templates/Classification/Classification/Services.yml',
  fieldYaml(
    ID.Services,
    ID.Section,
    '/sitecore/templates/Project/legal/Taxonomy Templates/Classification/Classification/Services',
    200,
    'Services',
    TREELIST_SOURCE('Services')
  )
);
write(
  'serialized-content/taxonomy-templates/Taxonomy Templates/Classification/Classification/Regions.yml',
  fieldYaml(
    ID.Regions,
    ID.Section,
    '/sitecore/templates/Project/legal/Taxonomy Templates/Classification/Classification/Regions',
    300,
    'Regions',
    TREELIST_SOURCE('Regions')
  )
);

write(
  'serialized-content/legal/legal/Data/Taxonomy.yml',
  folderYaml(
    ID.Taxonomy,
    DATA_ROOT,
    '/sitecore/content/legal/legal/Data/Taxonomy',
    T_TAG_FOLDER,
    T_TAG_FOLDER
  )
);
write(
  'serialized-content/legal/legal/Data/Taxonomy/Sectors.yml',
  folderYaml(
    ID.SectorsFolder,
    ID.Taxonomy,
    '/sitecore/content/legal/legal/Data/Taxonomy/Sectors',
    T_TAG_FOLDER,
    T_TAG
  )
);
write(
  'serialized-content/legal/legal/Data/Taxonomy/Services.yml',
  folderYaml(
    ID.ServicesFolder,
    ID.Taxonomy,
    '/sitecore/content/legal/legal/Data/Taxonomy/Services',
    T_TAG_FOLDER,
    T_TAG
  )
);
write(
  'serialized-content/legal/legal/Data/Taxonomy/Regions.yml',
  folderYaml(
    ID.RegionsFolder,
    ID.Taxonomy,
    '/sitecore/content/legal/legal/Data/Taxonomy/Regions',
    T_TAG_FOLDER,
    T_TAG
  )
);

writeTree(sectorsBuilt.tree, ID.SectorsFolder, 'Sectors');
writeTree(servicesBuilt.tree, ID.ServicesFolder, 'Services');
writeTree(regionsBuilt.tree, ID.RegionsFolder, 'Regions');

addBaseTemplate(
  'serialized-content/templates/legal/Page.yml',
  CLASSIFICATION_BASE
);
addBaseTemplate(
  'serialized-content/person-page-template/PersonPage.yml',
  CLASSIFICATION_BASE
);
addBaseTemplate(
  'serialized-content/article-page-template/ArticlePage.yml',
  CLASSIFICATION_BASE
);

const specialismsPath = path.join(
  ROOT,
  'serialized-content/person-page-template/PersonPage/Person/Specialisms.yml'
);
let specialisms = fs.readFileSync(specialismsPath, 'utf8');
specialisms = specialisms.replace(
  /Hint: Source\n  Value: "\/sitecore\/content\/legal\/legal\/Data\/Tags"/,
  `Hint: Source\n  Value: "${TREELIST_SOURCE('Services')}"`
);
fs.writeFileSync(specialismsPath, specialisms, 'utf8');

const tagTplPath = path.join(ROOT, 'serialized-content/article-templates/Article Templates/Tag.yml');
let tagTpl = fs.readFileSync(tagTplPath, 'utf8');
if (!tagTpl.includes(F_MASTERS)) {
  tagTpl = tagTpl.replace(
    `SharedFields:\n`,
    `SharedFields:\n- ID: "${F_MASTERS}"\n  Hint: __Masters\n  Value: "${brace(T_TAG)}"\n`
  );
  fs.writeFileSync(tagTplPath, tagTpl, 'utf8');
}

const modulePath = path.join(ROOT, 'legal.module.json');
const moduleJson = JSON.parse(fs.readFileSync(modulePath, 'utf8'));
const includes = moduleJson.items.includes;
const hasTaxonomy = includes.some((item) => item.name === 'taxonomy-templates');
const hasPage = includes.some((item) => item.name === 'page-template');
if (!hasTaxonomy) {
  includes.splice(1, 0, {
    name: 'taxonomy-templates',
    path: '/sitecore/templates/Project/legal/Taxonomy Templates',
    allowedPushOperations: 'CreateAndUpdate',
    scope: 'ItemAndDescendants',
  });
}
if (!hasPage) {
  includes.splice(hasTaxonomy ? 2 : 2, 0, {
    name: 'page-template',
    path: '/sitecore/templates/Project/legal/Page',
    allowedPushOperations: 'CreateAndUpdate',
    scope: 'ItemAndDescendants',
  });
}
fs.writeFileSync(modulePath, `${JSON.stringify(moduleJson, null, 2)}\n`, 'utf8');

const contentRoot = path.join(ROOT, 'serialized-content/legal');
for (const file of walkYml(contentRoot)) {
  const slug = path.basename(file, '.yml');
  const assignment = PAGE_TAXONOMY[slug];
  if (!assignment) {
    continue;
  }
  let text = fs.readFileSync(file, 'utf8');
  if (!/Path: .*\/(Home|legal)\//.test(text) && !text.includes('/sitecore/content/legal/legal/Home')) {
    continue;
  }
  text = upsertField(text, ID.Sectors, 'Sectors', slugsToGuids(assignment.sectors, sectorsBuilt.map));
  text = upsertField(text, ID.Services, 'Services', slugsToGuids(assignment.services, servicesBuilt.map));
  text = upsertField(text, ID.Regions, 'Regions', slugsToGuids(assignment.regions, regionsBuilt.map));
  if (text.includes('Hint: Specialisms')) {
    text = text.replace(
      /    - ID: "a1e90010-0000-4000-8000-000000000039"\n      Hint: Specialisms\n      Value: "[^"]*"\n/,
      `    - ID: "a1e90010-0000-4000-8000-000000000039"
      Hint: Specialisms
      Value: "${slugsToGuids(assignment.services, servicesBuilt.map)}"
`
    );
  }
  fs.writeFileSync(file, text, 'utf8');
}

function printTree(nodes, indent = 2) {
  return nodes
    .map((node) => {
      const kids =
        node.children && node.children.length
          ? `,\n${' '.repeat(indent + 2)}children: [\n${printTree(node.children, indent + 4)}\n${' '.repeat(indent + 2)}]`
          : '';
      return `${' '.repeat(indent)}{
${' '.repeat(indent + 2)}id: '${node.id}',
${' '.repeat(indent + 2)}slug: '${node.slug}',
${' '.repeat(indent + 2)}title: ${JSON.stringify(node.title)}${kids}
${' '.repeat(indent)}}`;
    })
    .join(',\n');
}

const pageTaxonomyTs = Object.entries(PAGE_TAXONOMY)
  .map(
    ([slug, value]) =>
      `  '${slug}': {\n    sectors: ${JSON.stringify(value.sectors)},\n    services: ${JSON.stringify(value.services)},\n    regions: ${JSON.stringify(value.regions)},\n  }`
  )
  .join(',\n');

write(
  path.join(LEGAL_SRC, 'lib', 'taxonomy.ts'),
  `export type TaxonomyTerm = {
  id: string;
  slug: string;
  title: string;
  children?: TaxonomyTerm[];
};

export type PageTaxonomy = {
  sectors: string[];
  services: string[];
  regions: string[];
};

export const TAXONOMY_FIELDS = {
  Sectors: '${ID.Sectors}',
  Services: '${ID.Services}',
  Regions: '${ID.Regions}',
};

export const TAXONOMY = {
  sectors: [
${printTree(sectorsBuilt.tree.map(termJson))}
  ] as TaxonomyTerm[],
  services: [
${printTree(servicesBuilt.tree.map(termJson))}
  ] as TaxonomyTerm[],
  regions: [
${printTree(regionsBuilt.tree.map(termJson))}
  ] as TaxonomyTerm[],
};

export const PAGE_TAXONOMY: Record<string, PageTaxonomy> = {
${pageTaxonomyTs}
};

export function flattenTaxonomy(nodes: TaxonomyTerm[]): TaxonomyTerm[] {
  return nodes.flatMap((node) => [node, ...flattenTaxonomy(node.children || [])]);
}

export function taxonomyBySlug(): Record<string, TaxonomyTerm> {
  return Object.fromEntries(
    flattenTaxonomy([...TAXONOMY.sectors, ...TAXONOMY.services, ...TAXONOMY.regions]).map(
      (term) => [term.slug, term]
    )
  );
}

export function expandSelected(selected: string[], tree: TaxonomyTerm[]): Set<string> {
  const wanted = new Set(selected.filter(Boolean));
  const expanded = new Set<string>();
  const visit = (node: TaxonomyTerm, inherit: boolean) => {
    const active = inherit || wanted.has(node.slug);
    if (active) {
      expanded.add(node.slug);
    }
    (node.children || []).forEach((child) => visit(child, active));
  };
  tree.forEach((node) => visit(node, false));
  return expanded;
}

export function matchesTaxonomy(
  selected: string[],
  values: string[] | undefined,
  tree: TaxonomyTerm[]
): boolean {
  if (!selected.length) {
    return true;
  }
  const expanded = expandSelected(selected, tree);
  return (values || []).some((value) => expanded.has(value));
}
`
);

const missing = [
  ...Object.values(PAGE_TAXONOMY).flatMap((item) =>
    item.sectors.filter((slug) => !sectorsBuilt.map.has(slug)).map((slug) => `sector:${slug}`)
  ),
  ...Object.values(PAGE_TAXONOMY).flatMap((item) =>
    item.services.filter((slug) => !servicesBuilt.map.has(slug)).map((slug) => `service:${slug}`)
  ),
  ...Object.values(PAGE_TAXONOMY).flatMap((item) =>
    item.regions.filter((slug) => !regionsBuilt.map.has(slug)).map((slug) => `region:${slug}`)
  ),
];
if (missing.length) {
  throw new Error(`Unknown slugs in PAGE_TAXONOMY: ${[...new Set(missing)].join(', ')}`);
}

console.log(
  `Taxonomy written: ${sectorsBuilt.map.size + servicesBuilt.map.size + regionsBuilt.map.size} terms, ${Object.keys(PAGE_TAXONOMY).length} pages tagged`
);
