/**
 * Openhand ArticlePage + PersonPage (authors) + editable PromoGrid / AdviceLanding datasources.
 * GUID prefix 0e0a. Run: node scripts/generate-nonprofit-articles.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function damImageXml(srcOrFile, alt) {
  const file = String(srcOrFile).replace(/^\/openhand\//, '');
  const jsonPath = path.join(__dirname, 'media-maps', 'nonprofit-image-xml.json');
  if (fs.existsSync(jsonPath)) {
    try {
      const map = JSON.parse(fs.readFileSync(jsonPath, 'utf8').replace(/^\uFEFF/, ''));
      const raw = map[file];
      if (raw) {
        return raw.replace(/alt="[^"]*"/, `alt="${alt}"`);
      }
    } catch {
      /* fall through */
    }
  }
  return `<image src="${srcOrFile.startsWith('/') ? srcOrFile : `/openhand/${file}`}" alt="${alt}" width="1600" height="1067" />`;
}

const TEMPL_FOLDER = '109141ff-0e31-43af-9b20-a32032ca4ced';
const DATA_ID = '6ebbce5a-7be2-4652-b9e2-19f38cca33a4';
const REND_FOLDER = '80cc7671-ba23-46a5-b4a0-65e76cb7a102';
const HOME_ID = '33365cdd-ec5b-4db5-a858-c353d1d1940d';
const HOME_TEMPLATE = 'a4c1a619-0ca9-4679-bb2d-5db64ce69721';
const GET_HELP = '0e0a0030-0000-4000-8000-000000000001';
const PAGE_DESIGN = '{0E0A0005-5555-4000-8000-000000000001}';

const T_JSON = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const T_TPL_FOLDER = '0437fee2-44c9-46a6-abe9-28858d9fee8c';
const T_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';
const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const BASE_STD = '{1930BBEB-7805-471A-A3BE-4858AC7CF696}';
const BASE_DS = '{44A022DB-56D3-419A-B43B-E27E4D8E9C41}';
const PARAM_HERO = '{5BD96264-0B02-4605-8FFF-0079CAEB67FC}';
const JSS_LAYOUT = '{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}';
const DEVICE = '{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}';

const F_SOURCE = '1eb8ae32-e190-44a6-968d-ed904c794ebf';
const F_TYPE = 'ab162cc0-dc80-4abf-8871-998ee5d7ba32';
const F_SORT = 'ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e';
const F_TITLE = '19a69332-a23e-4e70-8d16-b2640cb24cc8';
const F_CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';
const F_ICON = '06d5295c-ed2f-4a54-9bf2-26228d113318';
const F_BASE = '12c33f3f-86c5-43a5-aeb4-5598cec45116';
const F_SV = 'f7d48a55-2158-4f02-9356-756654404f73';
const F_COMPONENT = '037fe404-dd19-4bf7-8e30-4dadf68b27b0';
const F_DS_TMPL = '1a7c85e5-dc0b-490d-9187-bb1dbcb4c72f';
const F_DS_LOC = 'b5b27af1-25ef-405c-87ce-369b3a004016';
const F_PARAM = 'a77e8568-1ab3-44f1-a664-b7c37ec7810d';
const F_NAV = '4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8';
const F_PAGE_TITLE = '96b71ea7-4d37-4a3a-9e11-2bb76ef03acd';
const F_PAGE_CONTENT = '53f49d04-a3f6-4f75-bc6e-3e7db6e80e93';
const F_PAGE_DESIGN = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const F_RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const F_MASTERS = '1172f643-ae13-4102-937a-a89d32bdf9c1';

const ID = {
  PersonPage: '0e0a0014-0000-4000-8000-000000000030',
  PersonSection: '0e0a0014-0000-4000-8000-000000000031',
  JobTitle: '0e0a0014-0000-4000-8000-000000000032',
  Phone: '0e0a0014-0000-4000-8000-000000000033',
  Email: '0e0a0014-0000-4000-8000-000000000034',
  Office: '0e0a0014-0000-4000-8000-000000000035',
  Photo: '0e0a0014-0000-4000-8000-000000000038',
  Biography: '0e0a0014-0000-4000-8000-000000000037',
  PersonSv: '0e0a0014-0000-4000-8000-00000000003f',
  ArticlePage: '0e0a0014-0000-4000-8000-000000000040',
  ArticleSection: '0e0a0014-0000-4000-8000-000000000041',
  ShortDescription: '0e0a0014-0000-4000-8000-000000000042',
  Summary: '0e0a0014-0000-4000-8000-00000000004b',
  PublishedDate: '0e0a0014-0000-4000-8000-000000000044',
  ReadTime: '0e0a0014-0000-4000-8000-000000000045',
  Kicker: '0e0a0014-0000-4000-8000-000000000046',
  Authors: '0e0a0014-0000-4000-8000-00000000004a',
  Image: '0e0a0014-0000-4000-8000-000000000043',
  ArticleSv: '0e0a0014-0000-4000-8000-000000000049',
  RPerson: '0e0a0001-1111-4000-8000-000000000015',
  TplPromoFolder: '0e0a0011-0000-4000-8000-000000000001',
  TplPromo: '0e0a0011-0000-4000-8000-000000000002',
  TplPromoData: '0e0a0011-0000-4000-8000-000000000003',
  TplPromoHeading: '0e0a0011-0000-4000-8000-000000000004',
  TplPromoIntro: '0e0a0011-0000-4000-8000-000000000005',
  PromoFolderTpl: '0e0a0011-0000-4000-8000-00000000000a',
  TplAdviceFolder: '0e0a0011-0000-4000-8000-000000000010',
  TplAdvice: '0e0a0011-0000-4000-8000-000000000011',
  TplAdviceData: '0e0a0011-0000-4000-8000-000000000012',
  TplAdviceHeading: '0e0a0011-0000-4000-8000-000000000013',
  TplAdviceIntro: '0e0a0011-0000-4000-8000-000000000014',
  AdviceFolderTpl: '0e0a0011-0000-4000-8000-00000000001a',
  FooterLogo: '0e0a0010-0000-4000-8000-000000000024',
  DS_Promos: '0e0a0020-0000-4000-8000-000000000030',
  DS_PromoHome: '0e0a0020-0000-4000-8000-000000000031',
  DS_AdviceLandings: '0e0a0020-0000-4000-8000-000000000040',
  DS_AdviceLanding: '0e0a0020-0000-4000-8000-000000000041',
  People: '0e0a0030-0000-4000-8000-000000000070',
  Jordan: '0e0a0030-0000-4000-8000-000000000071',
  Eleri: '0e0a0030-0000-4000-8000-000000000072',
  Sam: '0e0a0030-0000-4000-8000-000000000073',
  P_Energy: '0e0a0030-0000-4000-8000-000000000002',
  P_Rent: '0e0a0030-0000-4000-8000-000000000003',
  P_Food: '0e0a0030-0000-4000-8000-000000000004',
  RPromo: '0e0a0001-1111-4000-8000-000000000004',
  RAdviceLanding: '0e0a0001-1111-4000-8000-000000000005',
  RAdviceArticle: '0e0a0001-1111-4000-8000-000000000006',
};

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

function created() {
  return `    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260916T080000Z
`;
}

function u(id) {
  return `{${String(id).toUpperCase()}}`;
}

function fieldYaml(id, parent, itemPath, type, sort, title, source) {
  const src = source
    ? `- ID: "${F_SOURCE}"
  Hint: Source
  Value: "${source}"
`
    : '';
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_FIELD}"
Path: "${itemPath}"
SharedFields:
${src}- ID: "${F_TYPE}"
  Hint: Type
  Value: "${type}"
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

function templateYaml(id, parent, itemPath, bases, extra = '') {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_TEMPLATE}"
Path: "${itemPath}"
SharedFields:
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/window_star.png
- ID: "${F_BASE}"
  Hint: __Base template
  Value: |
    ${bases}
- ID: "${F_SORT}"
  Hint: __Sortorder
  Value: 100
${extra}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function sectionYaml(id, parent, itemPath) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_SECTION}"
Path: "${itemPath}"
SharedFields:
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/window_dialog.png
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function templateItemNoBase(id, parent, itemPath) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_TEMPLATE}"
Path: "${itemPath}"
SharedFields:
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/window_star.png
- ID: "${F_SORT}"
  Hint: __Sortorder
  Value: 100
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function folderTpl(id, parent, itemPath) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_TPL_FOLDER}"
Path: "${itemPath}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function dsLoc(folderTmpl) {
  return `query:$site/*[@@name='Data']/*[@@templatename='${folderTmpl}']|query:$sharedSites/*[@@name='Data']/*[@@templatename='${folderTmpl}']`;
}

function jsonRendering(id, name, componentName, dsTemplate, dsLocation) {
  return `---
ID: "${id}"
Parent: "${REND_FOLDER}"
Template: "${T_JSON}"
Path: /sitecore/layout/Renderings/Project/nonprofit/${name}
SharedFields:
- ID: "${F_COMPONENT}"
  Hint: componentName
  Value: ${componentName}
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/element.png
- ID: "${F_DS_TMPL}"
  Hint: Datasource Template
  Value: ${dsTemplate}
- ID: "${F_DS_LOC}"
  Hint: Datasource Location
  Value: "${dsLocation}"
- ID: "${F_PARAM}"
  Hint: Parameters Template
  Value: "${PARAM_HERO}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

write(
  'serialized-content/templates/nonprofit/ArticlePage.yml',
  templateYaml(
    ID.ArticlePage,
    TEMPL_FOLDER,
    '/sitecore/templates/Project/nonprofit/ArticlePage',
    `${u(HOME_TEMPLATE)}`,
    `- ID: "${F_SV}"
  Hint: __Standard values
  Value: "${u(ID.ArticleSv)}"
`
  )
);
write(
  'serialized-content/templates/nonprofit/ArticlePage/Article.yml',
  sectionYaml(ID.ArticleSection, ID.ArticlePage, '/sitecore/templates/Project/nonprofit/ArticlePage/Article')
);
write(
  'serialized-content/templates/nonprofit/ArticlePage/Article/ShortDescription.yml',
  fieldYaml(
    ID.ShortDescription,
    ID.ArticleSection,
    '/sitecore/templates/Project/nonprofit/ArticlePage/Article/ShortDescription',
    'Multi-Line Text',
    100,
    'ShortDescription'
  )
);
write(
  'serialized-content/templates/nonprofit/ArticlePage/Article/Summary.yml',
  fieldYaml(
    ID.Summary,
    ID.ArticleSection,
    '/sitecore/templates/Project/nonprofit/ArticlePage/Article/Summary',
    'Multi-Line Text',
    110,
    'Summary'
  )
);
write(
  'serialized-content/templates/nonprofit/ArticlePage/Article/PublishedDate.yml',
  fieldYaml(
    ID.PublishedDate,
    ID.ArticleSection,
    '/sitecore/templates/Project/nonprofit/ArticlePage/Article/PublishedDate',
    'Single-Line Text',
    120,
    'PublishedDate'
  )
);
write(
  'serialized-content/templates/nonprofit/ArticlePage/Article/ReadTime.yml',
  fieldYaml(
    ID.ReadTime,
    ID.ArticleSection,
    '/sitecore/templates/Project/nonprofit/ArticlePage/Article/ReadTime',
    'Single-Line Text',
    130,
    'ReadTime'
  )
);
write(
  'serialized-content/templates/nonprofit/ArticlePage/Article/Kicker.yml',
  fieldYaml(
    ID.Kicker,
    ID.ArticleSection,
    '/sitecore/templates/Project/nonprofit/ArticlePage/Article/Kicker',
    'Single-Line Text',
    140,
    'Kicker'
  )
);
write(
  'serialized-content/templates/nonprofit/ArticlePage/Article/Authors.yml',
  fieldYaml(
    ID.Authors,
    ID.ArticleSection,
    '/sitecore/templates/Project/nonprofit/ArticlePage/Article/Authors',
    'Treelist',
    220,
    'Select Authors',
    '/sitecore/content/nonprofit/nonprofit/Home/people'
  )
);
write(
  'serialized-content/templates/nonprofit/ArticlePage/__Standard Values.yml',
  `---
ID: "${ID.ArticleSv}"
Parent: "${ID.ArticlePage}"
Template: "${ID.ArticlePage}"
Path: "/sitecore/templates/Project/nonprofit/ArticlePage/__Standard Values"
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PAGE_DESIGN}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/templates/nonprofit/PersonPage.yml',
  templateYaml(
    ID.PersonPage,
    TEMPL_FOLDER,
    '/sitecore/templates/Project/nonprofit/PersonPage',
    `${u(HOME_TEMPLATE)}`,
    `- ID: "${F_SV}"
  Hint: __Standard values
  Value: "${u(ID.PersonSv)}"
`
  )
);
write(
  'serialized-content/templates/nonprofit/PersonPage/Person.yml',
  sectionYaml(ID.PersonSection, ID.PersonPage, '/sitecore/templates/Project/nonprofit/PersonPage/Person')
);
write(
  'serialized-content/templates/nonprofit/PersonPage/Person/JobTitle.yml',
  fieldYaml(
    ID.JobTitle,
    ID.PersonSection,
    '/sitecore/templates/Project/nonprofit/PersonPage/Person/JobTitle',
    'Single-Line Text',
    100,
    'JobTitle'
  )
);
write(
  'serialized-content/templates/nonprofit/PersonPage/Person/Phone.yml',
  fieldYaml(
    ID.Phone,
    ID.PersonSection,
    '/sitecore/templates/Project/nonprofit/PersonPage/Person/Phone',
    'Single-Line Text',
    110,
    'Phone'
  )
);
write(
  'serialized-content/templates/nonprofit/PersonPage/Person/Email.yml',
  fieldYaml(
    ID.Email,
    ID.PersonSection,
    '/sitecore/templates/Project/nonprofit/PersonPage/Person/Email',
    'Single-Line Text',
    120,
    'Email'
  )
);
write(
  'serialized-content/templates/nonprofit/PersonPage/Person/Office.yml',
  fieldYaml(
    ID.Office,
    ID.PersonSection,
    '/sitecore/templates/Project/nonprofit/PersonPage/Person/Office',
    'Single-Line Text',
    130,
    'Office'
  )
);
write(
  'serialized-content/templates/nonprofit/PersonPage/Person/Biography.yml',
  fieldYaml(
    ID.Biography,
    ID.PersonSection,
    '/sitecore/templates/Project/nonprofit/PersonPage/Person/Biography',
    'Rich Text',
    140,
    'Biography'
  )
);
write(
  'serialized-content/templates/nonprofit/PersonPage/Person/Photo.yml',
  fieldYaml(
    ID.Photo,
    ID.PersonSection,
    '/sitecore/templates/Project/nonprofit/PersonPage/Person/Photo',
    'Image',
    150,
    'Photo'
  )
);
write(
  'serialized-content/templates/nonprofit/PersonPage/__Standard Values.yml',
  `---
ID: "${ID.PersonSv}"
Parent: "${ID.PersonPage}"
Template: "${ID.PersonPage}"
Path: "/sitecore/templates/Project/nonprofit/PersonPage/__Standard Values"
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PAGE_DESIGN}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="${DEVICE}"
        l="${JSS_LAYOUT}">
        <r
          uid="{0E0A1000-000E-4000-8000-000000000015}"
          p:before="*"
          s:id="{${ID.RPerson.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />
      </d>
    </r>
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/renderings/nonprofit/PersonProfile.yml',
  `---
ID: "${ID.RPerson}"
Parent: "${REND_FOLDER}"
Template: "${T_JSON}"
Path: /sitecore/layout/Renderings/Project/nonprofit/PersonProfile
SharedFields:
- ID: "${F_COMPONENT}"
  Hint: componentName
  Value: PersonProfile
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/user1.png
- ID: "${F_PARAM}"
  Hint: Parameters Template
  Value: "${PARAM_HERO}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/templates/nonprofit/PromoGrid Templates.yml',
  folderTpl(ID.TplPromoFolder, TEMPL_FOLDER, '/sitecore/templates/Project/nonprofit/PromoGrid Templates')
);
write(
  'serialized-content/templates/nonprofit/PromoGrid Templates/PromoGrid Folder.yml',
  templateItemNoBase(
    ID.PromoFolderTpl,
    ID.TplPromoFolder,
    '/sitecore/templates/Project/nonprofit/PromoGrid Templates/PromoGrid Folder'
  )
);
write(
  'serialized-content/templates/nonprofit/PromoGrid Templates/PromoGrid.yml',
  templateYaml(
    ID.TplPromo,
    ID.TplPromoFolder,
    '/sitecore/templates/Project/nonprofit/PromoGrid Templates/PromoGrid',
    `${BASE_STD}\n    ${BASE_DS}`
  )
);
write(
  'serialized-content/templates/nonprofit/PromoGrid Templates/PromoGrid/Data.yml',
  sectionYaml(ID.TplPromoData, ID.TplPromo, '/sitecore/templates/Project/nonprofit/PromoGrid Templates/PromoGrid/Data')
);
write(
  'serialized-content/templates/nonprofit/PromoGrid Templates/PromoGrid/Data/Heading.yml',
  fieldYaml(
    ID.TplPromoHeading,
    ID.TplPromoData,
    '/sitecore/templates/Project/nonprofit/PromoGrid Templates/PromoGrid/Data/Heading',
    'Single-Line Text',
    100,
    'Heading'
  )
);
write(
  'serialized-content/templates/nonprofit/PromoGrid Templates/PromoGrid/Data/Intro.yml',
  fieldYaml(
    ID.TplPromoIntro,
    ID.TplPromoData,
    '/sitecore/templates/Project/nonprofit/PromoGrid Templates/PromoGrid/Data/Intro',
    'Multi-Line Text',
    200,
    'Intro'
  )
);

write(
  'serialized-content/templates/nonprofit/AdviceLanding Templates.yml',
  folderTpl(ID.TplAdviceFolder, TEMPL_FOLDER, '/sitecore/templates/Project/nonprofit/AdviceLanding Templates')
);
write(
  'serialized-content/templates/nonprofit/AdviceLanding Templates/AdviceLanding Folder.yml',
  templateItemNoBase(
    ID.AdviceFolderTpl,
    ID.TplAdviceFolder,
    '/sitecore/templates/Project/nonprofit/AdviceLanding Templates/AdviceLanding Folder'
  )
);
write(
  'serialized-content/templates/nonprofit/AdviceLanding Templates/AdviceLanding.yml',
  templateYaml(
    ID.TplAdvice,
    ID.TplAdviceFolder,
    '/sitecore/templates/Project/nonprofit/AdviceLanding Templates/AdviceLanding',
    `${BASE_STD}\n    ${BASE_DS}`
  )
);
write(
  'serialized-content/templates/nonprofit/AdviceLanding Templates/AdviceLanding/Data.yml',
  sectionYaml(
    ID.TplAdviceData,
    ID.TplAdvice,
    '/sitecore/templates/Project/nonprofit/AdviceLanding Templates/AdviceLanding/Data'
  )
);
write(
  'serialized-content/templates/nonprofit/AdviceLanding Templates/AdviceLanding/Data/Heading.yml',
  fieldYaml(
    ID.TplAdviceHeading,
    ID.TplAdviceData,
    '/sitecore/templates/Project/nonprofit/AdviceLanding Templates/AdviceLanding/Data/Heading',
    'Single-Line Text',
    100,
    'Heading'
  )
);
write(
  'serialized-content/templates/nonprofit/AdviceLanding Templates/AdviceLanding/Data/Intro.yml',
  fieldYaml(
    ID.TplAdviceIntro,
    ID.TplAdviceData,
    '/sitecore/templates/Project/nonprofit/AdviceLanding Templates/AdviceLanding/Data/Intro',
    'Rich Text',
    200,
    'Intro'
  )
);

write(
  'serialized-content/templates/nonprofit/Footer Templates/Footer/Data/Logo.yml',
  fieldYaml(
    ID.FooterLogo,
    '0e0a0010-0000-4000-8000-000000000022',
    '/sitecore/templates/Project/nonprofit/Footer Templates/Footer/Data/Logo',
    'Image',
    200,
    'Logo'
  )
);

write(
  'serialized-content/renderings/nonprofit/PromoGrid.yml',
  jsonRendering(
    ID.RPromo,
    'PromoGrid',
    'PromoGrid',
    '/sitecore/templates/Project/nonprofit/PromoGrid Templates/PromoGrid',
    dsLoc('PromoGrid Folder')
  )
);
write(
  'serialized-content/renderings/nonprofit/AdviceLanding.yml',
  jsonRendering(
    ID.RAdviceLanding,
    'AdviceLanding',
    'AdviceLanding',
    '/sitecore/templates/Project/nonprofit/AdviceLanding Templates/AdviceLanding',
    dsLoc('AdviceLanding Folder')
  )
);

write(
  'serialized-content/nonprofit/nonprofit/Data/PromoGrids.yml',
  `---
ID: "${ID.DS_Promos}"
Parent: "${DATA_ID}"
Template: "${ID.PromoFolderTpl}"
Path: /sitecore/content/nonprofit/nonprofit/Data/PromoGrids
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);
write(
  'serialized-content/nonprofit/nonprofit/Data/PromoGrids/Home.yml',
  `---
ID: "${ID.DS_PromoHome}"
Parent: "${ID.DS_Promos}"
Template: "${ID.TplPromo}"
Path: /sitecore/content/nonprofit/nonprofit/Data/PromoGrids/Home
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.TplPromoHeading}"
      Hint: Heading
      Value: UK crisis support and international emergency appeals, in one IA.
    - ID: "${ID.TplPromoIntro}"
      Hint: Intro
      Value: What we do
`
);
write(
  'serialized-content/nonprofit/nonprofit/Data/AdviceLandings.yml',
  `---
ID: "${ID.DS_AdviceLandings}"
Parent: "${DATA_ID}"
Template: "${ID.AdviceFolderTpl}"
Path: /sitecore/content/nonprofit/nonprofit/Data/AdviceLandings
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);
write(
  'serialized-content/nonprofit/nonprofit/Data/AdviceLandings/Get Help.yml',
  `---
ID: "${ID.DS_AdviceLanding}"
Parent: "${ID.DS_AdviceLandings}"
Template: "${ID.TplAdvice}"
Path: /sitecore/content/nonprofit/nonprofit/Data/AdviceLandings/Get Help
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.TplAdviceHeading}"
      Hint: Heading
      Value: Get help
    - ID: "${ID.TplAdviceIntro}"
      Hint: Intro
      Value: |
        <p>Practical steps for energy, rent and emergency grants. These pages are written for people in crisis and for the crawlers that cite them.</p>
`
);

write(
  'serialized-content/nonprofit/nonprofit/Home/people.yml',
  `---
ID: "${ID.People}"
Parent: "${HOME_ID}"
Template: "${HOME_TEMPLATE}"
Path: /sitecore/content/nonprofit/nonprofit/Home/people
SharedFields:
- ID: "${F_MASTERS}"
  Hint: __Masters
  Value: "${u(ID.PersonPage)}"
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PAGE_DESIGN}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: People
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: People
`
);

const people = [
  {
    id: ID.Jordan,
    slug: 'jordan-hale',
    name: 'Jordan Hale',
    job: 'Hub manager',
    phone: '0113 496 0100',
    email: 'jordan.hale@openhand.org.uk',
    office: 'Leeds',
    bio: '<p>Jordan Hale has run Northgate Community Hub since 2019 and still takes the first appointment of the day. Energy and rent cases sit in the same room so households are not sent across the city.</p>',
  },
  {
    id: ID.Eleri,
    slug: 'eleri-morgan',
    name: 'Eleri Morgan',
    job: 'Principal adviser',
    phone: '029 2010 0300',
    email: 'eleri.morgan@openhand.org.uk',
    office: 'Cardiff',
    bio: '<p>Eleri Morgan is principal adviser at Riverside Advice Service, covering Cardiff and the Vale. Appointments can be in Welsh. Riverside holds the local Discretionary Housing Payment clinic every Wednesday.</p>',
  },
  {
    id: ID.Sam,
    slug: 'sam-okoro',
    name: 'Sam Okoro',
    job: 'Duty lead',
    phone: '0121 496 0200',
    email: 'sam.okoro@openhand.org.uk',
    office: 'Birmingham',
    bio: '<p>Sam Okoro is duty lead at St Mark’s Crisis Centre, the overnight pathway for the West Midlands. Food, a shower, and a same-day call to housing options sit on one desk.</p>',
  },
];

for (const person of people) {
  write(
    `serialized-content/nonprofit/nonprofit/Home/people/${person.slug}.yml`,
    `---
ID: "${person.id}"
Parent: "${ID.People}"
Template: "${ID.PersonPage}"
Path: /sitecore/content/nonprofit/nonprofit/Home/people/${person.slug}
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PAGE_DESIGN}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="${DEVICE}"
        l="${JSS_LAYOUT}">
        <r
          uid="{0E0A1000-000E-4000-8000-${person.id.slice(-12).toUpperCase()}}"
          p:before="*"
          s:id="{${ID.RPerson.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />
      </d>
    </r>
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: "${person.name}"
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: "${person.name}"
    - ID: "${ID.JobTitle}"
      Hint: JobTitle
      Value: "${person.job}"
    - ID: "${ID.Phone}"
      Hint: Phone
      Value: "${person.phone}"
    - ID: "${ID.Email}"
      Hint: Email
      Value: "${person.email}"
    - ID: "${ID.Office}"
      Hint: Office
      Value: "${person.office}"
    - ID: "${ID.Biography}"
      Hint: Biography
      Value: |
        ${person.bio}
`
  );
}

const articles = [
  {
    id: ID.P_Energy,
    file: 'help-with-energy-bills',
    uid: '0e0a1000-0002-4000-8000-000000000011',
    title: 'Help with energy bills',
    nav: 'Help with energy bills',
    date: '12 September 2026',
    author: ID.Jordan,
    image: '/openhand/promo-1.jpg',
    summary:
      'If you cannot pay your gas or electricity bill, you still have rights. This page lists grants, supplier duties, and local partners who can sit with you on the call.',
    body: `<p>You cannot be disconnected in winter for a debt on a domestic energy account without a court order. Contact your supplier first and ask for a breathing-space arrangement.</p>
<p>Openhand partners can apply for the Household Support Fund on your behalf in most English local authorities, and for the Scottish Public Health Fund where you live north of the border.</p>
<p>If a prepayment meter is leaving you without heat, that is an emergency. Call the partner nearest you — they can request a same-day credit and a safe-and-warm visit. Northgate kept a warm space open when the precinct library cut afternoon hours; say at reception if you need the chair, not an appointment.</p>
<p>Keep a copy of your last bill, any DWP letter, and a photo of the meter. Advisers use those three items to unlock grants without a second appointment.</p>
<p>Winter gifts to the Openhand appeal are matched until 21 December. That match is what keeps a caseworker in the room — it is not a condition of getting help.</p>`,
  },
  {
    id: ID.P_Rent,
    file: 'what-to-do-if-you-cannot-pay-your-rent',
    uid: '0e0a1000-0002-4000-8000-000000000012',
    title: 'What to do if you cannot pay your rent',
    nav: 'Rent',
    date: '8 September 2026',
    author: ID.Eleri,
    image: '/openhand/promo-2.jpg',
    summary:
      'Rent arrears move quickly. This page covers the first 48 hours: talking to your landlord, Discretionary Housing Payments, and when to get a solicitor involved.',
    body: `<p>Do not ignore a notice. A section 8 or section 21 letter has a clock on it. Bring it to a local partner the same day — they can check whether the notice is valid. Aisha’s possession claim was withdrawn after Riverside spotted a defective form.</p>
<p>Ask your landlord in writing for a repayment plan before the next rent date. Keep the email. Courts look for that attempt.</p>
<p>Discretionary Housing Payments and Council Tax Support sit with your local authority, not DWP. Riverside holds a DHP clinic every Wednesday in Cardiff; Northgate and St Mark’s complete the form with you in Leeds and Birmingham.</p>
<p>If you have a possession hearing listed, or bailiffs are already instructed, say so at reception. Duty schemes at the county court can still stop a warrant on the day. A council tax reminder is not a court summons — bring it the same week.</p>`,
  },
];

for (const article of articles) {
  write(
    `serialized-content/nonprofit/nonprofit/Home/get-help/${article.file}.yml`,
    `---
ID: "${article.id}"
Parent: "${GET_HELP}"
Template: "${ID.ArticlePage}"
Path: /sitecore/content/nonprofit/nonprofit/Home/get-help/${article.file}
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PAGE_DESIGN}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="${DEVICE}"
        l="${JSS_LAYOUT}">
        <r
          uid="{${article.uid.toUpperCase()}}"
          p:before="*"
          s:id="{${ID.RAdviceArticle.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />
      </d>
    </r>
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: "${article.nav}"
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: "${article.title}"
    - ID: "${ID.Kicker}"
      Hint: Kicker
      Value: "Advice"
    - ID: "${ID.PublishedDate}"
      Hint: PublishedDate
      Value: "${article.date}"
    - ID: "${ID.ReadTime}"
      Hint: ReadTime
      Value: "4 min. read"
    - ID: "${ID.ShortDescription}"
      Hint: ShortDescription
      Value: "${article.summary}"
    - ID: "${ID.Summary}"
      Hint: Summary
      Value: "${article.summary}"
    - ID: "${ID.Authors}"
      Hint: Authors
      Value: "${u(article.author)}"
    - ID: "${ID.Image}"
      Hint: Image
      Value: |
        ${damImageXml(article.image, article.title)}
    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        ${article.body.replace(/\n/g, '\n        ')}
`
  );
}

function patch(rel, mutate) {
  const full = path.join(ROOT, rel);
  let yaml = fs.readFileSync(full, 'utf8');
  const next = mutate(yaml);
  if (next !== yaml) fs.writeFileSync(full, next, 'utf8');
}

patch('serialized-content/nonprofit/nonprofit/Home.yml', (yaml) =>
  yaml.replace(
    `s:id="{0E0A0001-1111-4000-8000-000000000004}"`,
    `s:ds="${ID.DS_PromoHome}"
          s:id="{0E0A0001-1111-4000-8000-000000000004}"`
  )
);

patch('serialized-content/nonprofit/nonprofit/Home/get-help.yml', (yaml) => {
  let next = yaml;
  if (!next.includes(F_MASTERS)) {
    next = next.replace(
      'SharedFields:\n',
      `SharedFields:\n- ID: "${F_MASTERS}"\n  Hint: __Masters\n  Value: "${u(ID.ArticlePage)}"\n`
    );
  }
  if (!next.includes(`s:ds="${ID.DS_AdviceLanding}"`)) {
    next = next.replace(
      `s:id="{0E0A0001-1111-4000-8000-000000000005}"`,
      `s:ds="${ID.DS_AdviceLanding}"
          s:id="{0E0A0001-1111-4000-8000-000000000005}"`
    );
  }
  return next;
});

const openhandAr = path.join(
  ROOT,
  'serialized-content/nonprofit/nonprofit/Presentation/Available Renderings/Openhand.yml'
);
let ar = fs.readFileSync(openhandAr, 'utf8');
if (!ar.includes(ID.RPerson.toUpperCase())) {
  ar = ar.replace(
    '{0E0A0001-1111-4000-8000-000000000014}',
    `{0E0A0001-1111-4000-8000-000000000014}\n    {${ID.RPerson.toUpperCase()}}`
  );
  fs.writeFileSync(openhandAr, ar, 'utf8');
}

for (const rel of [
  'serialized-content/nonprofit/nonprofit/Presentation/Placeholder Settings/headless-main.yml',
  'serialized-content/placeholder-settings/nonprofit/headless-main.yml',
]) {
  const full = path.join(ROOT, rel);
  let text = fs.readFileSync(full, 'utf8');
  if (!text.includes(ID.RPerson.toUpperCase())) {
    text = text.replace(
      '{0E0A0001-1111-4000-8000-000000000014}',
      `{0E0A0001-1111-4000-8000-000000000014}\n    {${ID.RPerson.toUpperCase()}}`
    );
    fs.writeFileSync(full, text, 'utf8');
  }
}

console.log('Wrote ArticlePage, PersonPage, authors, PromoGrid/AdviceLanding datasources.');
