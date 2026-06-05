/**
 * Copenhagen Silver Celebration — templates, renderings, datasources, Home layout.
 * Run: node authoring/items/sitecoresilver/scripts/generate-copenhagen-silver-home.mjs
 */
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TS = '20260604T120000Z';
const OWNER = 'sitecore\\sumith.damodaran@sitecore.com';

const T_FOLDER = '0437fee2-44c9-46a6-abe9-28858d9fee8c';
const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const T_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';
const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const T_RENDERING = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const T_VARIANT = '4d50cdae-c2d9-4de8-b080-8f992bfb1b55';
const T_STD_VALUES = '39f4ccb1-1c4e-4111-891d-5306ff486461';

const TEMPLATES_ROOT = '2b6668ef-7af6-4e88-a096-bffe0058d881';
const RENDERINGS_ROOT = 'b113cf8a-e1e5-4312-81be-b2c76cafc619';
const RENDERINGS_MARKETING = 'b5010010-0001-400d-8010-000000000010';
const HOME_ID = '87284038-bf22-452d-b127-d469d0e3f6d6';
const DATA_ROOT = '65781ae0-e10d-4f1c-beae-38d9a47e8998';
const PRESENTATION = 'fd1816a7-f041-4586-9708-10f0f4aa765c';
const PARTIAL_DESIGNS = 'a8f0e8c0-0001-400d-8010-000000000001';
const PAGE_DESIGNS = 'a8f0e8c0-0001-400d-8010-000000000002';
const AVAILABLE = '41e375af-7321-4dd3-b01e-a3e676394518';
const HEADLESS_VARIANTS = '31332861-c2e0-4509-9e2b-0b53128e6569';
const PLACEHOLDER_SETTINGS = 'fe056edc-7f69-4f53-a930-9ca0991bc19e';
const T_VARIANT_DEF = '49c111d0-6867-4798-a724-1f103166e6e9';
const T_PLACEHOLDER = 'd2a6884c-04d5-4089-a64e-d27ca9d68d4c';
const F_RENDERINGS_LIST = '715ae6c0-71c8-4744-ab4f-65362d20ad65';

const AR = {
  PageContent: 'abf41c54-962a-458f-92e6-ce486e0572f3',
  PageStructure: '6b2ae6c9-8e5a-434d-a256-ea593e37e49f',
  Navigation: '34f4800b-6f10-483f-a512-3330867126a6',
  SitecoreSilver: 'b50100a0-0001-4000-8000-000000000001',
};

const R = {
  IntroBanner: 'b5010001-0001-4000-8000-000000000001',
  EventHeader: 'b5010002-0001-4000-8000-000000000002',
  EventHero: 'b5010003-0001-4000-8000-000000000003',
  PromoFullWidth: 'b5010004-0001-4000-8000-000000000004',
  PromoBadge: 'b5010005-0001-4000-8000-000000000005',
  PromoBadgeGrid: 'b5010006-0001-4000-8000-000000000006',
  RichText: 'b5010007-0001-4000-8000-000000000007',
  PromoImageCta: 'b5010008-0001-4000-8000-000000000008',
  Footer: 'b5010009-0001-4000-8000-000000000009',
};

const DS = {
  Intro: 'b5010050-0001-4000-8000-000000000001',
  Header: 'b5010050-0001-4000-8000-000000000002',
  Hero: 'b5010050-0001-4000-8000-000000000003',
  PromoBand: 'b5010050-0001-4000-8000-000000000004',
  Badge1: 'b5010051-0001-4000-8000-000000000021',
  Badge2: 'b5010051-0001-4000-8000-000000000022',
  Badge3: 'b5010051-0001-4000-8000-000000000023',
  RichGlass: 'b5010050-0001-4000-8000-000000000005',
  PromoCta: 'b5010050-0001-4000-8000-000000000006',
  Footer: 'b5010050-0001-4000-8000-000000000007',
};

const PD_HEADER = 'b5010080-0001-4000-8000-000000000001';
const PD_FOOTER = 'b5010080-0001-4000-8000-000000000002';
const PAGE_DEFAULT = 'b5010081-0001-4000-8000-000000000001';

const LINKLIST = '4956263D-1195-4D6E-931B-800EA625FF6F';
const DS_NAV = 'b5010052-0001-4000-8000-000000000001';
const PH_PROJECT_ROOT = '7719150c-3a88-478f-92fd-38eac33e41cf';
const F_PH_KEY = '7256bdab-1fd2-49dd-b205-cb4873d2917c';
const F_ALLOWED = 'e391b526-d0c5-439d-803e-17512eae6222';
const T_PH_SETTING = '5c547d4e-7111-4995-95b0-6b561751bf2e';

const GRID = 'GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;FieldNames&amp;Styles&amp;RenderingIdentifier&amp;CSSStyles';

function cleanOrphans() {
  const tplRoot = join(ROOT, 'sitecoresilvertemplatesProject');
  for (const ent of readdirSync(tplRoot)) {
    if (ent !== 'sitecoresilver' && /^[0-9A-F]{16}$/i.test(ent)) {
      rmSync(join(tplRoot, ent), { recursive: true, force: true });
    }
  }
  rmSync(join(tplRoot, 'sitecoresilver', 'SilverCelebration', 'SilverCelebration.yml'), { force: true });
}

function w(rel, body) {
  const p = join(ROOT, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, body.trim() + '\n', 'utf8');
}

function itemYaml({ id, parent, template, path, fields = '', branch = '' }) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${template}"
Path: ${path}
${branch ? `BranchID: "${branch}"\n` : ''}${fields ? `SharedFields:\n${fields}` : ''}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
    - ID: "52807595-0f8f-4b20-8d2a-cb71d28c6103"
      Hint: __Owner
      Value: |
        ${OWNER}
    - ID: "5dd74568-4d4b-44c1-b513-0af5f4cda34f"
      Hint: __Created by
      Value: |
        ${OWNER}
    - ID: "8cdc337e-a112-42fb-bbb4-4143751e123f"
      Hint: __Revision
      Value: "${id}"
    - ID: "badd9cf9-53e0-4d0c-bcc0-2d784c282f6a"
      Hint: __Updated by
      Value: |
        ${OWNER}
    - ID: "d9cf14b1-fa16-4ba6-9288-e8a174d4d522"
      Hint: __Updated
      Value: ${TS}
`;
}

function rendering(id, name, componentName, dsTemplate, folderId) {
  return itemYaml({
    id,
    parent: folderId,
    template: T_RENDERING,
    path: `/sitecore/layout/Renderings/Project/sitecoresilver/SilverCelebration/${name}`,
    fields: `- ID: "037fe404-dd19-4bf7-8e30-4dadf68b27b0"
  Hint: componentName
  Value: ${componentName}
- ID: "1a7c85e5-dc0b-490d-9187-bb1dbcb4c72f"
  Hint: Datasource Template
  Value: /sitecore/templates/Project/sitecoresilver/SilverCelebration/${name}/${name}
- ID: "b5b27af1-25ef-405c-87ce-369b3a004016"
  Hint: Datasource Location
  Value: "query:$site/*[@@name='Data']"
`,
  });
}

function templateCategoryFolder(id, name, parent) {
  w(`sitecoresilvertemplatesProject/sitecoresilver/${name}.yml`, itemYaml({
    id,
    parent,
    template: T_FOLDER,
    path: `/sitecore/templates/Project/sitecoresilver/${name}`,
  }));
}

function templateFolder(id, name, parent) {
  w(`sitecoresilvertemplatesProject/sitecoresilver/SilverCelebration/${name}.yml`, itemYaml({
    id,
    parent,
    template: T_FOLDER,
    path: `/sitecore/templates/Project/sitecoresilver/SilverCelebration/${name}`,
  }));
}

/** Template folder and template definition must have distinct IDs (Sitecore serialization). */
function templateDefId(folderId) {
  return folderId.replace(/000000000(\d{3})$/, '000000010$1');
}

function fieldId(templateId, index) {
  const suffix = (0x200 + index).toString(16).padStart(12, '0');
  return `${templateId.slice(0, 24)}${suffix}`;
}

function templateItem(templateId, name, folderId, fields) {
  const sectionId = folderId.replace(/000000000(\d{3})$/, '000000001$1');
  w(`sitecoresilvertemplatesProject/sitecoresilver/SilverCelebration/${name}/${name}.yml`, itemYaml({
    id: templateId,
    parent: folderId,
    template: T_TEMPLATE,
    path: `/sitecore/templates/Project/sitecoresilver/SilverCelebration/${name}/${name}`,
    fields: `- ID: "12c33f3f-86c5-43a5-aeb4-5598cec45116"
  Hint: __Base template
  Value: |
    {1930BBEB-7805-471A-A3BE-4858AC7CF696}
    {44A022DB-56D3-419A-B43B-E27E4D8E9C41}
`,
  }));
  w(`sitecoresilvertemplatesProject/sitecoresilver/SilverCelebration/${name}/${name}/Data.yml`, itemYaml({
    id: sectionId,
    parent: templateId,
    template: T_SECTION,
    path: `/sitecore/templates/Project/sitecoresilver/SilverCelebration/${name}/${name}/Data`,
  }));
  for (const [index, [fname, type]] of fields.entries()) {
    const fid = fieldId(templateId, index);
    w(
      `sitecoresilvertemplatesProject/sitecoresilver/SilverCelebration/${name}/${name}/Data/${fname}.yml`,
      itemYaml({
        id: fid,
        parent: sectionId,
        template: T_FIELD,
        path: `/sitecore/templates/Project/sitecoresilver/SilverCelebration/${name}/${name}/Data/${fname}`,
        fields: `- ID: "ab162cc0-d892-4bb3-9790-18aea9888ca7"
  Hint: Type
  Value: ${type}
`,
      })
    );
  }
}

cleanOrphans();

// —— Renderings folder ——
w('sitecoresilverprojectRenderings/sitecoresilver/SilverCelebration.yml', itemYaml({
  id: RENDERINGS_MARKETING,
  parent: RENDERINGS_ROOT,
  template: '840d4a46-5503-49ec-bf9d-bd090946c63d',
  path: '/sitecore/layout/Renderings/Project/sitecoresilver/SilverCelebration',
}));

const components = [
  ['SitecoreSilverIntroBanner', R.IntroBanner],
  ['SitecoreSilverEventHeader', R.EventHeader],
  ['SitecoreSilverEventHero', R.EventHero],
  ['SitecoreSilverPromoFullWidth', R.PromoFullWidth],
  ['SitecoreSilverPromoBadge', R.PromoBadge],
  ['SitecoreSilverPromoBadgeGrid', R.PromoBadgeGrid],
  ['SitecoreSilverRichText', R.RichText],
  ['SitecoreSilverPromoImageCta', R.PromoImageCta],
  ['SitecoreSilverFooter', R.Footer],
];

for (const [name, id] of components) {
  w(`sitecoresilverprojectRenderings/sitecoresilver/SilverCelebration/${name}.yml`, rendering(id, name, name, name, RENDERINGS_MARKETING));
}

// —— Templates (simplified field sets) ——
const SF = '2b6668ef-7af6-4e88-a096-bffe0058d881';
const TF = 'b574dcc0-0001-400d-8010-000000000100';
templateCategoryFolder(TF, 'SilverCelebration', SF);

const defs = [
  ['SitecoreSilverIntroBanner', 'b574dcc1-0001-400d-8010-000000000101', [['Logo', 'Image'], ['Watermark', 'Single-Line Text'], ['Subtitle', 'Single-Line Text'], ['Title', 'Single-Line Text'], ['MetaLine1', 'Single-Line Text'], ['MetaLine2', 'Single-Line Text'], ['MetaLine3', 'Single-Line Text']]],
  ['SitecoreSilverEventHeader', 'b574dcc2-0001-400d-8010-000000000102', [['Logo', 'Image']]],
  ['SitecoreSilverEventHero', 'b574dcc3-0001-400d-8010-000000000103', [['Pill1', 'Single-Line Text'], ['Pill2', 'Single-Line Text'], ['Pill3', 'Single-Line Text'], ['Title', 'Single-Line Text'], ['Subtitle', 'Single-Line Text'], ['Meta', 'Single-Line Text'], ['Description', 'Multi-Line Text'], ['PrimaryCta', 'General Link'], ['SecondaryCta', 'General Link']]],
  ['SitecoreSilverPromoFullWidth', 'b574dcc4-0001-400d-8010-000000000104', [['Eyebrow', 'Single-Line Text'], ['Title', 'Single-Line Text'], ['Body', 'Rich Text']]],
  ['SitecoreSilverPromoBadge', 'b574dcc5-0001-400d-8010-000000000105', [['BadgeNumber', 'Single-Line Text'], ['Title', 'Single-Line Text'], ['Tagline', 'Single-Line Text'], ['Body', 'Multi-Line Text']]],
  ['SitecoreSilverPromoBadgeGrid', 'b574dcc6-0001-400d-8010-000000000106', []],
  ['SitecoreSilverRichText', 'b574dcc7-0001-400d-8010-000000000107', [['Eyebrow', 'Single-Line Text'], ['Text', 'Rich Text']]],
  ['SitecoreSilverPromoImageCta', 'b574dcc8-0001-400d-8010-000000000108', [['BackgroundImage', 'Image'], ['Text', 'Multi-Line Text'], ['CtaLink', 'General Link']]],
  ['SitecoreSilverFooter', 'b574dcc9-0001-400d-8010-000000000109', [['Title', 'Single-Line Text'], ['Meta', 'Single-Line Text'], ['LegalLine', 'Single-Line Text']]],
];

for (const [name, folderId, fields] of defs) {
  templateFolder(folderId, name, TF);
  templateItem(templateDefId(folderId), name, folderId, fields);
}

const templateIds = Object.fromEntries(
  defs.map(([name, folderId]) => [name, templateDefId(folderId)])
);

// —— Datasources ——
const dsItems = [
  [DS.Intro, 'Intro Banner', 'SitecoreSilverIntroBanner', { Title: 'Silver Celebration', Subtitle: 'Trusted by Brands for 25 Years', MetaLine1: 'In-Person Event', MetaLine2: 'Copenhagen', MetaLine3: '11 June 2026' }],
  [DS.Header, 'Default Header', 'SitecoreSilverEventHeader', {}],
  [DS.Hero, 'Event Hero', 'SitecoreSilverEventHero', { Title: 'Silver', Subtitle: '25 Years of Innovation', Meta: 'Copenhagen · Tivoli · June 11, 2026' }],
  [DS.PromoBand, 'Platform Promo', 'SitecoreSilverPromoFullWidth', { Eyebrow: 'The connected platform', Title: 'Three engines. One intelligent journey.' }],
  [DS.Badge1, 'Promo CMS', 'SitecoreSilverPromoBadge', { BadgeNumber: '1', Title: 'SitecoreAI CMS', Tagline: 'Right story. Right moment. Every time.' }],
  [DS.Badge2, 'Promo RAG', 'SitecoreSilverPromoBadge', { BadgeNumber: '2', Title: 'SitecoreAI Agentic RAG', Tagline: 'Ask boldly. Answer with proof.' }],
  [DS.Badge3, 'Promo Data', 'SitecoreSilverPromoBadge', { BadgeNumber: '3', Title: 'SitecoreAI Data Platform', Tagline: 'Connect the dots. Govern the truth.' }],
  [DS.RichGlass, 'Quote Panel', 'SitecoreSilverRichText', { Eyebrow: 'Create · Understand · Decide' }],
  [DS.PromoCta, 'Tivoli Promo', 'SitecoreSilverPromoImageCta', { Text: 'Celebrating where it began — Denmark, Tivoli, and twenty-five years of Sitecore.' }],
  [DS.Footer, 'Default Footer', 'SitecoreSilverFooter', { Title: 'Sitecore Silver Celebration', Meta: 'Copenhagen · Tivoli · June 11, 2026' }],
];

for (const [id, itemName, templateName, fieldMap] of dsItems) {
  const fieldLines = Object.entries(fieldMap)
    .map(
      ([hint, value]) => `    - ID: "4bb9a280-e50e-437f-b977-e281bfd16210"
      Hint: ${hint}
      Value: ${typeof value === 'string' && value.includes('<') ? `|\n        ${value}` : value}`
    )
    .join('\n');
  w(
    `sitecoresilver-site-root/sitecoresilver/Data/${itemName}.yml`,
    `---
ID: "${id}"
Parent: "${DATA_ROOT}"
Template: "${templateIds[templateName]}"
Path: /sitecore/content/sitecoresilver/sitecoresilver/Data/${itemName}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
${fieldLines}
`
  );
}

// —— Home __Renderings ——
const renderingsXml = `<r xmlns:p="p" xmlns:s="s" p:p="1">
  <d id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}">
    <r uid="{A1000001-0001-4000-8000-000000000001}" s:id="{${R.IntroBanner}}" s:ds="${DS.Intro}" s:par="${GRID}" s:ph="headless-main" />
    <r uid="{A1000002-0001-4000-8000-000000000002}" s:id="{${R.EventHero}}" s:ds="${DS.Hero}" s:par="${GRID}" s:ph="headless-main" />
    <r uid="{A1000003-0001-4000-8000-000000000003}" s:id="{${R.PromoFullWidth}}" s:ds="${DS.PromoBand}" s:par="${GRID}" s:ph="headless-main" />
    <r uid="{A1000004-0001-4000-8000-000000000004}" s:id="{${R.PromoBadgeGrid}}" s:par="${GRID}&amp;DynamicPlaceholderId=1" s:ph="headless-main">
      <r uid="{A1000005-0001-4000-8000-000000000005}" s:id="{${R.PromoBadge}}" s:ds="${DS.Badge1}" s:par="${GRID}" s:ph="/headless-main/sitecoresilver-promo-badges-1" />
      <r uid="{A1000006-0001-4000-8000-000000000006}" s:id="{${R.PromoBadge}}" s:ds="${DS.Badge2}" s:par="${GRID}" s:ph="/headless-main/sitecoresilver-promo-badges-1" />
      <r uid="{A1000007-0001-4000-8000-000000000007}" s:id="{${R.PromoBadge}}" s:ds="${DS.Badge3}" s:par="${GRID}" s:ph="/headless-main/sitecoresilver-promo-badges-1" />
    </r>
    <r uid="{A1000008-0001-4000-8000-000000000008}" s:id="{${R.RichText}}" s:ds="${DS.RichGlass}" s:par="${GRID}&amp;FieldNames=GlassPanel" s:ph="headless-main" />
    <r uid="{A1000009-0001-4000-8000-000000000009}" s:id="{${R.PromoImageCta}}" s:ds="${DS.PromoCta}" s:par="${GRID}" s:ph="headless-main" />
    <r uid="{A100000A-0001-4000-8000-00000000000A}" s:id="{${R.EventHeader}}" s:ds="${DS.Header}" s:par="${GRID}" s:ph="headless-header" />
    <r uid="{A100000B-0001-4000-8000-00000000000B}" s:id="{${R.Footer}}" s:ds="${DS.Footer}" s:par="${GRID}" s:ph="headless-footer" />
  </d>
</r>`;

w(
  'sitecoresilver-site-root/sitecoresilver/Home.yml',
  `---
ID: "${HOME_ID}"
Parent: "e6ef5b07-a4e2-49b5-926a-c6e5a0fc74c9"
Template: "e80a3c5b-80ea-4377-936b-a84827b2bc96"
Path: /sitecore/content/sitecoresilver/sitecoresilver/Home
BranchID: "45cf9f42-b3ac-4412-aab9-f8441c7e448e"
SharedFields:
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    ${renderingsXml.split('\n').map((l) => (l ? '    ' + l : l)).join('\n')}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
    - ID: "4bb9a280-e50e-437f-b977-e281bfd16210"
      Hint: Title
      Value: Sitecore Silver Celebration
    - ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"
      Hint: NavigationTitle
      Value: Home
`
);

// Headless variants for SitecoreSilverRichText (Default + GlassPanel)
w(
  'sitecoresilver-site-root/sitecoresilver/Presentation/Headless Variants/SitecoreSilverRichText/Default.yml',
  itemYaml({
    id: 'b5010090-0001-4000-8000-000000000002',
    parent: 'b5010090-0001-4000-8000-000000000000',
    template: T_VARIANT,
    path: '/sitecore/content/sitecoresilver/sitecoresilver/Presentation/Headless Variants/SitecoreSilverRichText/Default',
  })
);

w(
  'sitecoresilver-site-root/sitecoresilver/Presentation/Headless Variants/SitecoreSilverRichText/GlassPanel.yml',
  itemYaml({
    id: 'b5010090-0001-4000-8000-000000000001',
    parent: 'b5010090-0001-4000-8000-000000000000',
    template: T_VARIANT,
    path: '/sitecore/content/sitecoresilver/sitecoresilver/Presentation/Headless Variants/SitecoreSilverRichText/GlassPanel',
  })
);

w(
  'sitecoresilver-site-root/sitecoresilver/Presentation/Headless Variants/SitecoreSilverRichText.yml',
  itemYaml({
    id: 'b5010090-0001-4000-8000-000000000000',
    parent: HEADLESS_VARIANTS,
    template: T_VARIANT_DEF,
    path: '/sitecore/content/sitecoresilver/sitecoresilver/Presentation/Headless Variants/SitecoreSilverRichText',
  })
);

// Available renderings list
w(
  'sitecoresilver-site-root/sitecoresilver/Presentation/Available Renderings/SitecoreSilver.yml',
  `---
ID: "${AR.SitecoreSilver}"
Parent: "${AVAILABLE}"
Template: "76da0a8d-fc7e-42b2-af1e-205b49e43f98"
Path: /sitecore/content/sitecoresilver/sitecoresilver/Presentation/Available Renderings/SitecoreSilver
SharedFields:
- ID: "${F_RENDERINGS_LIST}"
  Hint: Renderings
  Value: |
    {${R.IntroBanner}}
    {${R.EventHeader}}
    {${R.EventHero}}
    {${R.PromoFullWidth}}
    {${R.PromoBadge}}
    {${R.PromoBadgeGrid}}
    {${R.RichText}}
    {${R.PromoImageCta}}
    {${R.Footer}}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
);

function placeholderSetting(id, name, key, allowedGroups) {
  const allowed = allowedGroups.map((g) => `    {${g}}`).join('\n');
  w(
    `sitecoresilver-site-root/sitecoresilver/Presentation/Placeholder Settings/${name}.yml`,
    `---
ID: "${id}"
Parent: "${PLACEHOLDER_SETTINGS}"
Template: "${T_PLACEHOLDER}"
Path: /sitecore/content/sitecoresilver/sitecoresilver/Presentation/Placeholder Settings/${name}
SharedFields:
- ID: "7256bdab-1fd2-49dd-b205-cb4873d2917c"
  Hint: Placeholder Key
  Value: "${key}"
- ID: "e391b526-d0c5-439d-803e-17512eae6222"
  Hint: Allowed Controls
  Value: |
${allowed}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
  );
}

placeholderSetting(
  'b5010030-0001-4000-8000-000000000001',
  'headless-main',
  'headless-main',
  [AR.PageContent, AR.PageStructure, AR.SitecoreSilver]
);
placeholderSetting(
  'b5010030-0001-4000-8000-000000000002',
  'headless-header',
  'headless-header',
  [AR.SitecoreSilver, AR.Navigation]
);
placeholderSetting(
  'b5010030-0001-4000-8000-000000000003',
  'headless-footer',
  'headless-footer',
  [AR.SitecoreSilver, AR.Navigation]
);

function projectPlaceholderSetting(id, name, key, allowed) {
  const allowedValue = allowed.map((g) => `    {${g}}`).join('\n');
  w(
    `sitecoresilverprojectPlaceholderSettings/sitecoresilver/${name}.yml`,
    `---
ID: "${id}"
Parent: "${PH_PROJECT_ROOT}"
Template: "${T_PH_SETTING}"
Path: "/sitecore/layout/Placeholder Settings/Project/sitecoresilver/${name}"
SharedFields:
- ID: "${F_PH_KEY}"
  Hint: Placeholder Key
  Value: "${key}"
- ID: "${F_ALLOWED}"
  Hint: Allowed Controls
  Value: |
${allowedValue}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
  );
}

projectPlaceholderSetting(
  'b5010021-0001-4000-8000-000000000001',
  'sitecoresilver-header-nav',
  'sitecoresilver-header-nav-{*}',
  [LINKLIST]
);
projectPlaceholderSetting(
  'b5010020-0001-4000-8000-000000000001',
  'sitecoresilver-promo-badges',
  'sitecoresilver-promo-badges-{*}',
  [R.PromoBadge]
);

console.log('Copenhagen Silver serialization written under authoring/items/sitecoresilver/');
