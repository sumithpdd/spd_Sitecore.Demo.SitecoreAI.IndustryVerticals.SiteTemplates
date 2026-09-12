/**
 * CMS-driven listings: ArticlePage + tags/categories treelists,
 * RelatedWork panel (Reviews-style Select Treelist),
 * PeopleSearch / AnnouncementSearch / ArticleListing children resolvers.
 * GUID prefix a1e90013 (article templates) / a1e90024 (taxonomy + related work data).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const TEMPL_FOLDER = '5dd02c0b-a6d5-4a11-9c1d-399948fe4ec5';
const DATA_ROOT = '79e5fd59-d991-4dc2-a0c9-b9a779f5228a';
const REND_FOLDER = '55837669-1c90-4234-b408-87b8a519ddfd';
const PEOPLE = 'a1e90030-0000-4000-8000-000000000001';
const NEWS_FOLDER = 'a1e90030-0000-4000-8000-000000000013';
const ANN_LIST = 'a1e90030-0000-4000-8000-000000000051';
const TAGS_FOLDER = 'a8c4b183-b1df-4056-b8a2-663dded349de';
const GUIDE = 'a1e90030-0000-4000-8000-000000000012';
const DAWN = 'a1e90030-0000-4000-8000-000000000002';
const RESTRUCTURING = 'a1e90030-0000-4000-8000-000000000025';
const NEWS_PAGE = 'a1e90030-0000-4000-8000-000000000050';
const ANN_MARK = 'a1e90030-0000-4000-8000-000000000052';
const ANN_CANDICE = 'a1e90030-0000-4000-8000-000000000053';
const ANN_SHANELLE = 'a1e90030-0000-4000-8000-000000000054';
const PERSON_PAGE = 'a1e90010-0000-4000-8000-000000000030';

const T_JSON = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const T_TPL_FOLDER = '0437fee2-44c9-46a6-abe9-28858d9fee8c';
const T_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';
const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const T_DATA_FOLDER = 'a29d272e-9d48-453c-9e9d-b47585fa7f20';
const PARAM = '{5BD96264-0B02-4605-8FFF-0079CAEB67FC}';
const PAGE_DESIGN = '{A1E90005-5555-4000-8000-000000000001}';
const BASE_STD = '{1930BBEB-7805-471A-A3BE-4858AC7CF696}';
const BASE_DS = '{44A022DB-56D3-419A-B43B-E27E4D8E9C41}';
const BASE_PAGE = '{D6DD45BE-0D04-43E2-BFD9-9E91CB44BFE0}';
const RCR_CHILDREN = '{207769CC-38C0-4DE1-B893-A6B037B3AEC4}';
const RCR_CONTEXT = '{6CCCBCDE-5E95-44E4-AE66-CFE7D3A0589E}';

const F_SOURCE = '1eb8ae32-e190-44a6-968d-ed904c794ebf';
const F_TYPE = 'ab162cc0-dc80-4abf-8871-998ee5d7ba32';
const F_SORT = 'ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e';
const F_TITLE = '19a69332-a23e-4e70-8d16-b2640cb24cc8';
const F_CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';
const F_BASE_TPL = '12c33f3f-86c5-43a5-aeb4-5598cec45116';
const F_ICON = '06d5295c-ed2f-4a54-9bf2-26228d113318';
const F_COMPONENT = '037fe404-dd19-4bf7-8e30-4dadf68b27b0';
const F_DS_TMPL = '1a7c85e5-dc0b-490d-9187-bb1dbcb4c72f';
const F_DS_LOC = 'b5b27af1-25ef-405c-87ce-369b3a004016';
const F_PARAM = 'a77e8568-1ab3-44f1-a664-b7c37ec7810d';
const F_RCR = 'b0b15510-b138-470e-8f33-8da2e228aafe';
const F_OTHER = 'e829c217-5e94-4306-9c48-2634b094fdc2';
const F_MASTERS = '1172f643-ae13-4102-937a-a89d32bdf9c1';
const F_NAV = '4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8';
const F_PAGE_TITLE = '63ba690a-5274-4537-8313-a6d43fbdadc1';
const F_PAGE_CONTENT = '62d161c2-fb5d-4773-8d46-63c21c95a441';
const F_PAGE_DESIGN = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const F_RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';

const ID = {
  TplFolder: 'a1e90013-0000-4000-8000-000000000001',
  Tag: 'a1e90013-0000-4000-8000-000000000010',
  TagData: 'a1e90013-0000-4000-8000-000000000011',
  TagTitle: 'a1e90013-0000-4000-8000-000000000012',
  TagFolder: 'a1e90013-0000-4000-8000-000000000015',
  Category: 'a1e90013-0000-4000-8000-000000000020',
  CategoryData: 'a1e90013-0000-4000-8000-000000000021',
  CategoryTitle: 'a1e90013-0000-4000-8000-000000000022',
  CategoryFolder: 'a1e90013-0000-4000-8000-000000000025',
  WorkItem: 'a1e90013-0000-4000-8000-000000000030',
  WorkItemData: 'a1e90013-0000-4000-8000-000000000031',
  WorkTag: 'a1e90013-0000-4000-8000-000000000032',
  WorkTitle: 'a1e90013-0000-4000-8000-000000000033',
  WorkSummary: 'a1e90013-0000-4000-8000-000000000034',
  WorkLink: 'a1e90013-0000-4000-8000-000000000035',
  WorkPanel: 'a1e90013-0000-4000-8000-000000000040',
  WorkPanelData: 'a1e90013-0000-4000-8000-000000000041',
  WorkEyebrow: 'a1e90013-0000-4000-8000-000000000042',
  WorkHeading: 'a1e90013-0000-4000-8000-000000000043',
  WorkItems: 'a1e90013-0000-4000-8000-000000000044',
  ArticlePage: 'a1e90010-0000-4000-8000-000000000040',
  ArticleSection: 'a1e90010-0000-4000-8000-000000000041',
  ShortDescription: 'a1e90010-0000-4000-8000-000000000042',
  Summary: 'a1e90010-0000-4000-8000-00000000004b',
  Image: 'a1e90010-0000-4000-8000-000000000043',
  PublishedDate: 'a1e90010-0000-4000-8000-000000000044',
  ReadTime: 'a1e90010-0000-4000-8000-000000000045',
  Kicker: 'a1e90010-0000-4000-8000-000000000046',
  Tags: 'a1e90010-0000-4000-8000-000000000047',
  Categories: 'a1e90010-0000-4000-8000-000000000048',
  ArticleStd: 'a1e90010-0000-4000-8000-000000000049',
  RListing: 'a1e90001-1111-4000-8000-000000000017',
  CatFolder: 'a1e90024-0000-4000-8000-000000000001',
  WorkItemsFolder: 'a1e90024-0000-4000-8000-000000000040',
  WorkPanelsFolder: 'a1e90024-0000-4000-8000-000000000050',
  WorkPanelItem: 'a1e90024-0000-4000-8000-000000000051',
  NewsBond: 'a1e90030-0000-4000-8000-000000000055',
  NewsPlastic: 'a1e90030-0000-4000-8000-000000000056',
};

const TAGS = [
  ['a1e90024-0000-4000-8000-000000000021', 'ai', 'AI'],
  ['a1e90024-0000-4000-8000-000000000022', 'restructuring', 'Restructuring'],
  ['a1e90024-0000-4000-8000-000000000023', 'insolvency', 'Insolvency'],
  ['a1e90024-0000-4000-8000-000000000024', 'infrastructure', 'Infrastructure'],
  ['a1e90024-0000-4000-8000-000000000025', 'arbitration', 'Arbitration'],
  ['a1e90024-0000-4000-8000-000000000026', 'tax', 'Tax'],
  ['a1e90024-0000-4000-8000-000000000027', 'construction', 'Construction'],
];

const CATS = [
  ['a1e90024-0000-4000-8000-000000000011', 'out-law-news', 'Out-Law news'],
  ['a1e90024-0000-4000-8000-000000000012', 'out-law-analysis', 'Out-Law analysis'],
  ['a1e90024-0000-4000-8000-000000000013', 'press-release', 'Press release'],
  ['a1e90024-0000-4000-8000-000000000014', 'guide', 'Guide'],
];

const TAG = Object.fromEntries(TAGS.map(([id, slug]) => [slug, id]));
const CAT = Object.fromEntries(CATS.map(([id, slug]) => [slug, id]));

const WORK = [
  {
    id: 'a1e90024-0000-4000-8000-000000000041',
    slug: 'ciga-essential-supplier',
    tag: 'Restructuring',
    title: 'CIGA and the essential supplier regime',
    summary:
      'How the Corporate Insolvency and Governance Act expanded supply obligations beyond utilities and IT.',
    href: '/out-law/guides/when-uk-suppliers-must-continue-to-supply-insolvent-companies',
    target: GUIDE,
  },
  {
    id: 'a1e90024-0000-4000-8000-000000000042',
    slug: 'pre-pack-suppliers',
    tag: 'Insolvency',
    title: 'Pre-pack administration for suppliers',
    summary: 'What continuing supply looks like when the customer is in a pre-pack.',
    href: '/out-law/guides/when-uk-suppliers-must-continue-to-supply-insolvent-companies',
    target: GUIDE,
  },
  {
    id: 'a1e90024-0000-4000-8000-000000000043',
    slug: 'dawn-allen-barclays',
    tag: 'Financial Services',
    title: 'Dawn Allen — Barclays secondment, 2006',
    summary: 'Public credential on the partner profile Vince can take into a Barclays meeting.',
    href: '/people/dawn-allen',
    target: DAWN,
  },
  {
    id: 'a1e90024-0000-4000-8000-000000000044',
    slug: 'restructuring-practice',
    tag: 'Service',
    title: 'Restructuring practice',
    summary: 'Service + sector + region — the same nine-dimension taxonomy, used.',
    href: '/expertise/restructuring',
    target: RESTRUCTURING,
  },
];

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.replace(/\n/g, '\n'), 'utf8');
}

function created() {
  return `    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260910T150000Z
`;
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

function templateYaml(id, parent, itemPath, bases) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_TEMPLATE}"
Path: "${itemPath}"
SharedFields:
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/window_star.png
- ID: "${F_BASE_TPL}"
  Hint: __Base template
  Value: |
    ${bases}
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

function folderYaml(id, parent, itemPath, template, masters) {
  const master = masters
    ? `- ID: "${F_MASTERS}"
  Hint: __Masters
  Value: "{${masters.toUpperCase()}}"
`
    : '';
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${template}"
Path: "${itemPath}"
SharedFields:
${master}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function renderingYaml(id, name, extra) {
  return `---
ID: "${id}"
Parent: "${REND_FOLDER}"
Template: "${T_JSON}"
Path: /sitecore/layout/Renderings/Project/legal/${name}
SharedFields:
- ID: "${F_COMPONENT}"
  Hint: componentName
  Value: ${name}
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/element.png
- ID: "${F_PARAM}"
  Hint: Parameters Template
  Value: "${PARAM}"
${extra}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function layout(uid, rendering, ds, extraPar, phId) {
  const dsAttr = ds ? `\n          s:ds="${ds}"` : '';
  const par = extraPar
    ? `GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;${extraPar}&amp;DynamicPlaceholderId=${phId}`
    : `GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=${phId}`;
  return `    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}"
        l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
        <r
          uid="{${uid.toUpperCase()}}"
          p:before="*"${dsAttr}
          s:id="{${rendering.toUpperCase()}}"
          s:par="${par}"
          s:ph="headless-main" />
      </d>
    </r>`;
}

function treelist(ids) {
  return ids.map((id) => `{${id.toUpperCase()}}`).join('|');
}

function linkXml(text, url, target) {
  return `<link text="${text.replace(/"/g, '')}" linktype="internal" url="${url}" anchor="" target="" title="" class="" id="${target}" />`;
}

function articleYaml(id, parent, itemPath, nav, title, kicker, date, readTime, content, tags, cats, uid) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${ID.ArticlePage}"
Path: "${itemPath}"
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PAGE_DESIGN}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
${layout(uid, 'a1e90001-1111-4000-8000-000000000011', '', '', 1)}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: "${nav}"
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: "${title}"
    - ID: "${ID.Kicker}"
      Hint: Kicker
      Value: "${kicker}"
    - ID: "${ID.PublishedDate}"
      Hint: PublishedDate
      Value: "${date}"
    - ID: "${ID.ReadTime}"
      Hint: ReadTime
      Value: "${readTime}"
    - ID: "${ID.ShortDescription}"
      Hint: ShortDescription
      Value: "${content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 180)}"
    - ID: "${ID.Summary}"
      Hint: Summary
      Value: "${content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 180)}"
    - ID: "${ID.Tags}"
      Hint: Tags
      Value: "${treelist(tags)}"
    - ID: "${ID.Categories}"
      Hint: Categories
      Value: "${treelist(cats)}"
    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        ${content.replace(/\n/g, '\n        ')}
`;
}

write(
  'serialized-content/article-templates/Article Templates.yml',
  `---
ID: "${ID.TplFolder}"
Parent: "${TEMPL_FOLDER}"
Template: "${T_TPL_FOLDER}"
Path: "/sitecore/templates/Project/legal/Article Templates"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/article-templates/Article Templates/Tag.yml',
  templateYaml(ID.Tag, ID.TplFolder, '/sitecore/templates/Project/legal/Article Templates/Tag', BASE_STD)
);
write(
  'serialized-content/article-templates/Article Templates/Tag/Data.yml',
  sectionYaml(ID.TagData, ID.Tag, '/sitecore/templates/Project/legal/Article Templates/Tag/Data')
);
write(
  'serialized-content/article-templates/Article Templates/Tag/Data/Title.yml',
  fieldYaml(ID.TagTitle, ID.TagData, '/sitecore/templates/Project/legal/Article Templates/Tag/Data/Title', 'Single-Line Text', 100, 'Title')
);
write(
  'serialized-content/article-templates/Article Templates/Tag Folder.yml',
  templateYaml(ID.TagFolder, ID.TplFolder, '/sitecore/templates/Project/legal/Article Templates/Tag Folder', BASE_STD)
);

write(
  'serialized-content/article-templates/Article Templates/Category.yml',
  templateYaml(ID.Category, ID.TplFolder, '/sitecore/templates/Project/legal/Article Templates/Category', BASE_STD)
);
write(
  'serialized-content/article-templates/Article Templates/Category/Data.yml',
  sectionYaml(ID.CategoryData, ID.Category, '/sitecore/templates/Project/legal/Article Templates/Category/Data')
);
write(
  'serialized-content/article-templates/Article Templates/Category/Data/Title.yml',
  fieldYaml(
    ID.CategoryTitle,
    ID.CategoryData,
    '/sitecore/templates/Project/legal/Article Templates/Category/Data/Title',
    'Single-Line Text',
    100,
    'Title'
  )
);
write(
  'serialized-content/article-templates/Article Templates/Category Folder.yml',
  templateYaml(
    ID.CategoryFolder,
    ID.TplFolder,
    '/sitecore/templates/Project/legal/Article Templates/Category Folder',
    BASE_STD
  )
);

write(
  'serialized-content/article-templates/Article Templates/RelatedWorkItem.yml',
  templateYaml(
    ID.WorkItem,
    ID.TplFolder,
    '/sitecore/templates/Project/legal/Article Templates/RelatedWorkItem',
    `${BASE_STD}\n    ${BASE_DS}`
  )
);
write(
  'serialized-content/article-templates/Article Templates/RelatedWorkItem/Data.yml',
  sectionYaml(ID.WorkItemData, ID.WorkItem, '/sitecore/templates/Project/legal/Article Templates/RelatedWorkItem/Data')
);
write(
  'serialized-content/article-templates/Article Templates/RelatedWorkItem/Data/Tag.yml',
  fieldYaml(
    ID.WorkTag,
    ID.WorkItemData,
    '/sitecore/templates/Project/legal/Article Templates/RelatedWorkItem/Data/Tag',
    'Single-Line Text',
    100,
    'Tag'
  )
);
write(
  'serialized-content/article-templates/Article Templates/RelatedWorkItem/Data/Title.yml',
  fieldYaml(
    ID.WorkTitle,
    ID.WorkItemData,
    '/sitecore/templates/Project/legal/Article Templates/RelatedWorkItem/Data/Title',
    'Single-Line Text',
    110,
    'Title'
  )
);
write(
  'serialized-content/article-templates/Article Templates/RelatedWorkItem/Data/Summary.yml',
  fieldYaml(
    ID.WorkSummary,
    ID.WorkItemData,
    '/sitecore/templates/Project/legal/Article Templates/RelatedWorkItem/Data/Summary',
    'Multi-Line Text',
    120,
    'Summary'
  )
);
write(
  'serialized-content/article-templates/Article Templates/RelatedWorkItem/Data/Link.yml',
  fieldYaml(
    ID.WorkLink,
    ID.WorkItemData,
    '/sitecore/templates/Project/legal/Article Templates/RelatedWorkItem/Data/Link',
    'General Link',
    130,
    'Link'
  )
);

write(
  'serialized-content/article-templates/Article Templates/RelatedWorkPanel.yml',
  templateYaml(
    ID.WorkPanel,
    ID.TplFolder,
    '/sitecore/templates/Project/legal/Article Templates/RelatedWorkPanel',
    `${BASE_STD}\n    ${BASE_DS}`
  )
);
write(
  'serialized-content/article-templates/Article Templates/RelatedWorkPanel/Data.yml',
  sectionYaml(ID.WorkPanelData, ID.WorkPanel, '/sitecore/templates/Project/legal/Article Templates/RelatedWorkPanel/Data')
);
write(
  'serialized-content/article-templates/Article Templates/RelatedWorkPanel/Data/Eyebrow.yml',
  fieldYaml(
    ID.WorkEyebrow,
    ID.WorkPanelData,
    '/sitecore/templates/Project/legal/Article Templates/RelatedWorkPanel/Data/Eyebrow',
    'Single-Line Text',
    100,
    'Eyebrow'
  )
);
write(
  'serialized-content/article-templates/Article Templates/RelatedWorkPanel/Data/Heading.yml',
  fieldYaml(
    ID.WorkHeading,
    ID.WorkPanelData,
    '/sitecore/templates/Project/legal/Article Templates/RelatedWorkPanel/Data/Heading',
    'Single-Line Text',
    110,
    'Heading'
  )
);
write(
  'serialized-content/article-templates/Article Templates/RelatedWorkPanel/Data/Items.yml',
  fieldYaml(
    ID.WorkItems,
    ID.WorkPanelData,
    '/sitecore/templates/Project/legal/Article Templates/RelatedWorkPanel/Data/Items',
    'Treelist',
    200,
    'Select Related Work',
    '/sitecore/content/legal/legal/Data/RelatedWorkItems'
  )
);

write(
  'serialized-content/article-page-template/ArticlePage.yml',
  templateYaml(ID.ArticlePage, TEMPL_FOLDER, '/sitecore/templates/Project/legal/ArticlePage', BASE_PAGE)
);
write(
  'serialized-content/article-page-template/ArticlePage/Article.yml',
  sectionYaml(ID.ArticleSection, ID.ArticlePage, '/sitecore/templates/Project/legal/ArticlePage/Article')
);
write(
  'serialized-content/article-page-template/ArticlePage/Article/ShortDescription.yml',
  fieldYaml(
    ID.ShortDescription,
    ID.ArticleSection,
    '/sitecore/templates/Project/legal/ArticlePage/Article/ShortDescription',
    'Multi-Line Text',
    100,
    'ShortDescription'
  )
);
write(
  'serialized-content/article-page-template/ArticlePage/Article/Summary.yml',
  fieldYaml(
    ID.Summary,
    ID.ArticleSection,
    '/sitecore/templates/Project/legal/ArticlePage/Article/Summary',
    'Multi-Line Text',
    105,
    'Summary'
  )
);
write(
  'serialized-content/article-page-template/ArticlePage/Article/Image.yml',
  fieldYaml(
    ID.Image,
    ID.ArticleSection,
    '/sitecore/templates/Project/legal/ArticlePage/Article/Image',
    'Image',
    110,
    'Image',
    'query:$siteMedia'
  )
);
write(
  'serialized-content/article-page-template/ArticlePage/Article/PublishedDate.yml',
  fieldYaml(
    ID.PublishedDate,
    ID.ArticleSection,
    '/sitecore/templates/Project/legal/ArticlePage/Article/PublishedDate',
    'Single-Line Text',
    120,
    'PublishedDate'
  )
);
write(
  'serialized-content/article-page-template/ArticlePage/Article/ReadTime.yml',
  fieldYaml(
    ID.ReadTime,
    ID.ArticleSection,
    '/sitecore/templates/Project/legal/ArticlePage/Article/ReadTime',
    'Single-Line Text',
    130,
    'ReadTime'
  )
);
write(
  'serialized-content/article-page-template/ArticlePage/Article/Kicker.yml',
  fieldYaml(
    ID.Kicker,
    ID.ArticleSection,
    '/sitecore/templates/Project/legal/ArticlePage/Article/Kicker',
    'Single-Line Text',
    140,
    'Kicker'
  )
);
write(
  'serialized-content/article-page-template/ArticlePage/Article/Tags.yml',
  fieldYaml(
    ID.Tags,
    ID.ArticleSection,
    '/sitecore/templates/Project/legal/ArticlePage/Article/Tags',
    'Treelist',
    200,
    'Select Tags',
    '/sitecore/content/legal/legal/Data/Tags'
  )
);
write(
  'serialized-content/article-page-template/ArticlePage/Article/Categories.yml',
  fieldYaml(
    ID.Categories,
    ID.ArticleSection,
    '/sitecore/templates/Project/legal/ArticlePage/Article/Categories',
    'Treelist',
    210,
    'Select Categories',
    '/sitecore/content/legal/legal/Data/Categories'
  )
);
write(
  'serialized-content/article-page-template/ArticlePage/__Standard Values.yml',
  `---
ID: "${ID.ArticleStd}"
Parent: "${ID.ArticlePage}"
Template: "${ID.ArticlePage}"
Path: "/sitecore/templates/Project/legal/ArticlePage/__Standard Values"
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

const childrenResolver = `- ID: "${F_RCR}"
  Hint: Rendering Contents Resolver
  Value: "${RCR_CHILDREN}"
`;
const contextResolver = `- ID: "${F_RCR}"
  Hint: Rendering Contents Resolver
  Value: "${RCR_CONTEXT}"
`;

write(
  'serialized-content/renderings/legal/ArticleListing.yml',
  renderingYaml(ID.RListing, 'ArticleListing', childrenResolver)
);
write(
  'serialized-content/renderings/legal/PeopleSearch.yml',
  renderingYaml('a1e90001-1111-4000-8000-000000000005', 'PeopleSearch', childrenResolver)
);
write(
  'serialized-content/renderings/legal/AnnouncementSearch.yml',
  renderingYaml('a1e90001-1111-4000-8000-000000000010', 'AnnouncementSearch', childrenResolver)
);
write(
  'serialized-content/renderings/legal/NewsArticle.yml',
  renderingYaml(
    'a1e90001-1111-4000-8000-000000000011',
    'NewsArticle',
    `${contextResolver}- ID: "069a8361-b1cd-437c-8c32-a3be78941446"
  Hint: Placeholders
  Value: |
    {A1E90009-9999-4000-8000-000000000008}
`
  )
);
write(
  'serialized-content/renderings/legal/RelatedWork.yml',
  renderingYaml(
    'a1e90001-1111-4000-8000-00000000000a',
    'RelatedWork',
    `- ID: "${F_DS_TMPL}"
  Hint: Datasource Template
  Value: "/sitecore/templates/Project/legal/Article Templates/RelatedWorkPanel"
- ID: "${F_DS_LOC}"
  Hint: Datasource Location
  Value: "/sitecore/content/legal/legal/Data/RelatedWork"
`
  )
);

write(
  'serialized-content/legal/legal/Data/Tags.yml',
  folderYaml(TAGS_FOLDER, DATA_ROOT, '/sitecore/content/legal/legal/Data/Tags', ID.TagFolder, ID.Tag)
);
write(
  'serialized-content/legal/legal/Data/Categories.yml',
  folderYaml(ID.CatFolder, DATA_ROOT, '/sitecore/content/legal/legal/Data/Categories', ID.CategoryFolder, ID.Category)
);
write(
  'serialized-content/legal/legal/Data/RelatedWorkItems.yml',
  folderYaml(
    ID.WorkItemsFolder,
    DATA_ROOT,
    '/sitecore/content/legal/legal/Data/RelatedWorkItems',
    T_DATA_FOLDER,
    ID.WorkItem
  )
);
write(
  'serialized-content/legal/legal/Data/RelatedWork.yml',
  folderYaml(
    ID.WorkPanelsFolder,
    DATA_ROOT,
    '/sitecore/content/legal/legal/Data/RelatedWork',
    T_DATA_FOLDER,
    ID.WorkPanel
  )
);

for (const [id, slug, title] of TAGS) {
  write(
    `serialized-content/legal/legal/Data/Tags/${slug}.yml`,
    `---
ID: "${id}"
Parent: "${TAGS_FOLDER}"
Template: "${ID.Tag}"
Path: /sitecore/content/legal/legal/Data/Tags/${slug}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.TagTitle}"
      Hint: Title
      Value: "${title}"
`
  );
}

for (const [id, slug, title] of CATS) {
  write(
    `serialized-content/legal/legal/Data/Categories/${slug}.yml`,
    `---
ID: "${id}"
Parent: "${ID.CatFolder}"
Template: "${ID.Category}"
Path: /sitecore/content/legal/legal/Data/Categories/${slug}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.CategoryTitle}"
      Hint: Title
      Value: "${title}"
`
  );
}

for (const item of WORK) {
  write(
    `serialized-content/legal/legal/Data/RelatedWorkItems/${item.slug}.yml`,
    `---
ID: "${item.id}"
Parent: "${ID.WorkItemsFolder}"
Template: "${ID.WorkItem}"
Path: /sitecore/content/legal/legal/Data/RelatedWorkItems/${item.slug}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.WorkTag}"
      Hint: Tag
      Value: "${item.tag}"
    - ID: "${ID.WorkTitle}"
      Hint: Title
      Value: "${item.title}"
    - ID: "${ID.WorkSummary}"
      Hint: Summary
      Value: "${item.summary}"
    - ID: "${ID.WorkLink}"
      Hint: Link
      Value: |
        ${linkXml(item.title, item.href, item.target)}
`
  );
}

write(
  'serialized-content/legal/legal/Data/RelatedWork/Related Work.yml',
  `---
ID: "${ID.WorkPanelItem}"
Parent: "${ID.WorkPanelsFolder}"
Template: "${ID.WorkPanel}"
Path: /sitecore/content/legal/legal/Data/RelatedWork/Related Work
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.WorkEyebrow}"
      Hint: Eyebrow
      Value: "Related work"
    - ID: "${ID.WorkHeading}"
      Hint: Heading
      Value: "Related — service, sector, region"
    - ID: "${ID.WorkItems}"
      Hint: Items
      Value: "${treelist(WORK.map((item) => item.id))}"
`
);

const newsBody = `<p>UK lawmakers have called for a ban on the development of superintelligent AI until it can be shown to be safe, as researchers published a toolkit to support responsible AI projects.</p>
<p>Speaking in parliament, Sobel said “no company, government or individual knows how to keep superintelligent AI under human control”.</p>
<p>Laura Gallagher of Pinsent Masons, who specialises in disputes within the technology sector, said liability will continue to rest with the individuals and organisations involved in designing, deploying and using AI systems.</p>`;
const markBody = `<p>Multinational law firm Pinsent Masons has appointed contentious insolvency Partner Mark Wilson to join its restructuring team in Birmingham.</p>
<p>Mark joins from Gateley, where he was Co-Head of the Complex and International Recovery group. A highly regarded contentious insolvency lawyer, he brings more than 25 years' experience advising in all aspects of corporate insolvency, turnaround and restructuring acting for banks, venture capitalists, insolvency practitioners and corporates.</p>`;
const candiceBody = `<p>Pinsent Masons has appointed infrastructure M&amp;A specialist Candice Lambeth as a partner, strengthening the firm’s capability advising on complex infrastructure transactions.</p>`;
const shanelleBody = `<p>Pinsent Masons has bolstered its Middle East International Arbitration practice with a partner hire, continuing investment in the region’s disputes offering.</p>`;
const bondBody = `<p>The English court has confirmed the high bar for resisting a performance bond call by relying on the underlying contract, in analysis for construction and projects teams.</p>`;
const plasticBody = `<p>UK plastic packaging tax data is increasing scrutiny on supply chains, with reporting obligations sharpening for manufacturers, importers and brand owners.</p>`;

write(
  'serialized-content/legal/02D10460AEA52D7A/lawmakers-seek-ban-on-superintelligent-ai-as-toolkit-developed-to-support-ai-projects.yml',
  articleYaml(
    NEWS_PAGE,
    NEWS_FOLDER,
    '/sitecore/content/legal/legal/Home/out-law/news/lawmakers-seek-ban-on-superintelligent-ai-as-toolkit-developed-to-support-ai-projects',
    'Lawmakers seek ban on superintelligent AI',
    'Lawmakers seek ban on ‘superintelligent’ AI as ‘toolkit’ developed to support AI projects',
    'OUT-LAW NEWS',
    '09 Sep 2026',
    '3 min read',
    newsBody,
    [TAG.ai],
    [CAT['out-law-news']],
    'a1e91000-0006-4000-8000-000000000050'
  )
);
write(
  'serialized-content/legal/legal/Home/out-law/news/english-court-confirms-high-bar-for-resisting-performance-bond-calls.yml',
  articleYaml(
    ID.NewsBond,
    NEWS_FOLDER,
    '/sitecore/content/legal/legal/Home/out-law/news/english-court-confirms-high-bar-for-resisting-performance-bond-calls',
    'Performance bond calls',
    'English court confirms high bar for resisting performance bond calls based on the underlying contract',
    'OUT-LAW ANALYSIS',
    '10 Sep 2026',
    '4 min read',
    bondBody,
    [TAG.construction],
    [CAT['out-law-analysis']],
    'a1e91000-0006-4000-8000-000000000055'
  )
);
write(
  'serialized-content/legal/legal/Home/out-law/news/uk-plastic-packaging-tax-data-increases-scrutiny-on-supply-chains.yml',
  articleYaml(
    ID.NewsPlastic,
    NEWS_FOLDER,
    '/sitecore/content/legal/legal/Home/out-law/news/uk-plastic-packaging-tax-data-increases-scrutiny-on-supply-chains',
    'Plastic packaging tax',
    'UK plastic packaging tax data increases scrutiny on supply chains',
    'OUT-LAW NEWS',
    '08 Sep 2026',
    '3 min read',
    plasticBody,
    [TAG.tax],
    [CAT['out-law-news']],
    'a1e91000-0006-4000-8000-000000000056'
  )
);

write(
  'serialized-content/legal/3F6350FE39FDB5A1/pinsent-masons-strengthens-restructuring-practice-with-new-partner-mark-wilson.yml',
  articleYaml(
    ANN_MARK,
    ANN_LIST,
    '/sitecore/content/legal/legal/Home/about-us/announcements/pinsent-masons-strengthens-restructuring-practice-with-new-partner-mark-wilson',
    'Mark Wilson appointment',
    'Pinsent Masons strengthens restructuring practice with new partner Mark Wilson',
    'PRESS RELEASE',
    '07 Sep 2026',
    '2 min read',
    markBody,
    [TAG.restructuring, TAG.insolvency],
    [CAT['press-release']],
    'a1e91000-0007-4000-8000-000000000052'
  )
);
write(
  'serialized-content/legal/3F6350FE39FDB5A1/pinsent-masons-appoints-infrastructure-ma-specialist-candice-lambeth.yml',
  articleYaml(
    ANN_CANDICE,
    ANN_LIST,
    '/sitecore/content/legal/legal/Home/about-us/announcements/pinsent-masons-appoints-infrastructure-ma-specialist-candice-lambeth',
    'Candice Lambeth appointment',
    'Pinsent Masons appoints infrastructure M&A specialist Candice Lambeth',
    'PRESS RELEASE',
    '02 Sep 2026',
    '1 min read',
    candiceBody,
    [TAG.infrastructure],
    [CAT['press-release']],
    'a1e91000-0007-4000-8000-000000000053'
  )
);
write(
  'serialized-content/legal/3F6350FE39FDB5A1/pinsent-masons-bolsters-middle-east-international-arbitration-practice-with-partner-hire.yml',
  articleYaml(
    ANN_SHANELLE,
    ANN_LIST,
    '/sitecore/content/legal/legal/Home/about-us/announcements/pinsent-masons-bolsters-middle-east-international-arbitration-practice-with-partner-hire',
    'Middle East arbitration hire',
    'Pinsent Masons bolsters Middle East International Arbitration practice with partner hire',
    'PRESS RELEASE',
    '01 Sep 2026',
    '1 min read',
    shanelleBody,
    [TAG.arbitration],
    [CAT['press-release']],
    'a1e91000-0007-4000-8000-000000000054'
  )
);

function listingPage(id, parent, itemPath, nav, title, content, uid, rendering, masters) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "e5a82c5d-05dd-476c-bec7-efecffd2cf43"
Path: "${itemPath}"
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PAGE_DESIGN}"
- ID: "${F_MASTERS}"
  Hint: __Masters
  Value: "{${masters.toUpperCase()}}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
${layout(uid, rendering, '', '', 1)}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: "${nav}"
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: "${title}"
    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        ${content}
`;
}

write(
  'serialized-content/legal/legal/Home/out-law/news.yml',
  listingPage(
    NEWS_FOLDER,
    'a1e90030-0000-4000-8000-000000000010',
    '/sitecore/content/legal/legal/Home/out-law/news',
    'News',
    'Out-Law news',
    '<p>Hour by hour legal news from Out-Law.</p>',
    'a1e91000-0006-4000-8000-000000000001',
    ID.RListing,
    ID.ArticlePage
  )
);
write(
  'serialized-content/legal/legal/Home/about-us/announcements.yml',
  listingPage(
    ANN_LIST,
    'a1e90030-0000-4000-8000-000000000024',
    '/sitecore/content/legal/legal/Home/about-us/announcements',
    'Announcements',
    'Announcements',
    '<p>Get the latest news from Pinsent Masons, including press releases and industry comments.</p>',
    'a1e91000-0007-4000-8000-000000000051',
    'a1e90001-1111-4000-8000-000000000010',
    ID.ArticlePage
  )
);

const peopleYml = fs.readFileSync(path.join(ROOT, 'serialized-content/legal/legal/Home/people.yml'), 'utf8');
if (!peopleYml.includes(F_MASTERS)) {
  write(
    'serialized-content/legal/legal/Home/people.yml',
    peopleYml.replace(
      'SharedFields:\n',
      `SharedFields:\n- ID: "${F_MASTERS}"\n  Hint: __Masters\n  Value: "{${PERSON_PAGE.toUpperCase()}}"\n`
    )
  );
}

function patchRelatedWorkDs(rel) {
  const full = path.join(ROOT, rel);
  let yaml = fs.readFileSync(full, 'utf8');
  yaml = yaml.replace(
    `s:id="{A1E90001-1111-4000-8000-00000000000A}"`,
    `s:ds="${ID.WorkPanelItem}"\n          s:id="{A1E90001-1111-4000-8000-00000000000A}"`
  );
  fs.writeFileSync(full, yaml, 'utf8');
}

patchRelatedWorkDs(
  'serialized-content/legal/57FCA1DFB479E432/when-uk-suppliers-must-continue-to-supply-insolvent-companies.yml'
);
patchRelatedWorkDs('serialized-content/legal/legal/Home/expertise/restructuring.yml');

const homePath = path.join(ROOT, 'serialized-content/legal/legal/Home.yml');
let home = fs.readFileSync(homePath, 'utf8');
if (!home.includes('a1e91000-0001-4000-8000-000000000011')) {
  home = home.replace(
    `s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=7"
          s:ph="headless-main" />`,
    `s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=7"
          s:ph="headless-main" />
        <r
          uid="{A1E91000-0001-4000-8000-000000000011}"
          s:ds="${ID.WorkPanelItem}"
          s:id="{A1E90001-1111-4000-8000-00000000000A}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=8"
          s:ph="headless-main" />`
  );
  fs.writeFileSync(homePath, home, 'utf8');
}

console.log('Wrote article templates, taxonomy, related work, listings, and page field exports');
