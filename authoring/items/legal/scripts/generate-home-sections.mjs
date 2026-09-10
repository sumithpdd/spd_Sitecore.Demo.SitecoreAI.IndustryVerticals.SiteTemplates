/**
 * Templates + datasources for Pinsent homepage sections.
 * GUID prefix a1e90011 (templates) / a1e90021 (data).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const TEMPL_FOLDER = '5dd02c0b-a6d5-4a11-9c1d-399948fe4ec5';
const DATA_ROOT = '79e5fd59-d991-4dc2-a0c9-b9a779f5228a';
const REND_FOLDER = '55837669-1c90-4234-b408-87b8a519ddfd';
const EXPERTISE_PAGE = 'a1e90030-0000-4000-8000-000000000020';
const OFFICES_PAGE = 'a1e90030-0000-4000-8000-000000000022';
const OUTLAW_PAGE = 'a1e90030-0000-4000-8000-000000000010';
const GUIDE_PAGE = 'a1e90030-0000-4000-8000-000000000012';
const NEWS_PAGE = 'a1e90030-0000-4000-8000-000000000050';
const ANN_LIST = 'a1e90030-0000-4000-8000-000000000051';
const ANN_MARK = 'a1e90030-0000-4000-8000-000000000052';
const ANN_CANDICE = 'a1e90030-0000-4000-8000-000000000053';
const ANN_SHANELLE = 'a1e90030-0000-4000-8000-000000000054';

const T_JSON = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const T_TPL_FOLDER = '0437fee2-44c9-46a6-abe9-28858d9fee8c';
const T_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';
const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const T_DATA_FOLDER = 'a29d272e-9d48-453c-9e9d-b47585fa7f20';
const T_PAGE = 'e5a82c5d-05dd-476c-bec7-efecffd2cf43';
const HOME_ID = '7f779a70-0faa-4105-aac5-0c56f0ee44b4';
const ABOUT_ID = 'a1e90030-0000-4000-8000-000000000024';
const OUTLAW_ID = 'a1e90030-0000-4000-8000-000000000010';
const PAGE_DESIGN = '{A1E90005-5555-4000-8000-000000000001}';
const PARAM = '{5BD96264-0B02-4605-8FFF-0079CAEB67FC}';
const F_SOURCE = '1eb8ae32-e190-44a6-968d-ed904c794ebf';
const F_TYPE = 'ab162cc0-dc80-4abf-8871-998ee5d7ba32';
const F_SORT = 'ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e';
const F_TITLE = '19a69332-a23e-4e70-8d16-b2640cb24cc8';
const F_CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';
const F_BASE = '12c33f3f-86c5-43a6-abe9-28858d9fee8c';
const F_BASE_REAL = '12c33f3f-86c5-43a5-aeb4-5598cec65116';
const F_ICON = '06d5295c-ed2f-4a54-9bf2-26228d113318';
const F_COMPONENT = '037fe404-dd19-4bf7-8e30-4dadf68b27b0';
const F_DS_TMPL = '1a7c85e5-dc0b-490d-9187-bb1dbcb4c72f';
const F_DS_LOC = 'b5b27af1-25ef-405c-87ce-369b3a004016';
const F_PARAM = 'a77e8568-1ab3-44f1-a664-b7c37ec7810d';
const F_NAV = '4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8';
const F_PAGE_TITLE = '63ba690a-5274-4537-8313-a6d43fbdadc1';
const F_PAGE_CONTENT = '62d161c2-fb5d-4773-8d46-63c21c95a441';
const F_PAGE_DESIGN = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const F_RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const BASE_STD = '{1930BBEB-7805-471A-A3BE-4858AC7CF696}';
const BASE_DS = '{44A022DB-56D3-419A-B43B-E27E4D8E9C41}';
const SECTORS_IMG = `<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/bc3ab4586dd340b6b6fe7703e1fca5c8" dam-id="LhH0hyAbSA2S58sbfTQx2A" alt="pm-sectors" dam-content-type="Image" />`;
const EXPERTISE_IMG = `<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/9d681ff287d346a894e5f5a6d4e240c1" dam-id="PAvvLjH0TFG-lDNfu2nvbQ" alt="pm-expertise" dam-content-type="Image" />`;

const ID = {
  TplFolder: 'a1e90011-0000-4000-8000-000000000001',
  ExpertisePanel: 'a1e90011-0000-4000-8000-000000000010',
  ExpertisePanelData: 'a1e90011-0000-4000-8000-000000000011',
  EpEyebrow: 'a1e90011-0000-4000-8000-000000000012',
  EpSectorsLabel: 'a1e90011-0000-4000-8000-000000000013',
  EpServicesLabel: 'a1e90011-0000-4000-8000-000000000014',
  EpLocationsLabel: 'a1e90011-0000-4000-8000-000000000015',
  EpSectorsImage: 'a1e90011-0000-4000-8000-000000000016',
  EpServicesImage: 'a1e90011-0000-4000-8000-000000000017',
  EpLocationsImage: 'a1e90011-0000-4000-8000-000000000018',
  EpSectors: 'a1e90011-0000-4000-8000-000000000019',
  EpServices: 'a1e90011-0000-4000-8000-00000000001a',
  EpLocations: 'a1e90011-0000-4000-8000-00000000001b',
  ExpertiseLink: 'a1e90011-0000-4000-8000-000000000020',
  ExpertiseLinkData: 'a1e90011-0000-4000-8000-000000000021',
  ElTitle: 'a1e90011-0000-4000-8000-000000000022',
  ElLink: 'a1e90011-0000-4000-8000-000000000023',
  OutLawPanel: 'a1e90011-0000-4000-8000-000000000030',
  OutLawPanelData: 'a1e90011-0000-4000-8000-000000000031',
  OlEyebrow: 'a1e90011-0000-4000-8000-000000000032',
  OlHeading: 'a1e90011-0000-4000-8000-000000000033',
  OlSubtitle: 'a1e90011-0000-4000-8000-000000000034',
  OlMore: 'a1e90011-0000-4000-8000-000000000035',
  OlItems: 'a1e90011-0000-4000-8000-000000000036',
  OutLawCard: 'a1e90011-0000-4000-8000-000000000040',
  OutLawCardData: 'a1e90011-0000-4000-8000-000000000041',
  OcKicker: 'a1e90011-0000-4000-8000-000000000042',
  OcTitle: 'a1e90011-0000-4000-8000-000000000043',
  OcDate: 'a1e90011-0000-4000-8000-000000000044',
  OcRead: 'a1e90011-0000-4000-8000-000000000045',
  OcLink: 'a1e90011-0000-4000-8000-000000000046',
  ReachPanel: 'a1e90011-0000-4000-8000-000000000050',
  ReachPanelData: 'a1e90011-0000-4000-8000-000000000051',
  RpEyebrow: 'a1e90011-0000-4000-8000-000000000052',
  RpHeading: 'a1e90011-0000-4000-8000-000000000053',
  RpMore: 'a1e90011-0000-4000-8000-000000000054',
  RpItems: 'a1e90011-0000-4000-8000-000000000055',
  AwardItem: 'a1e90011-0000-4000-8000-000000000060',
  AwardItemData: 'a1e90011-0000-4000-8000-000000000061',
  AwKicker: 'a1e90011-0000-4000-8000-000000000062',
  AwTitle: 'a1e90011-0000-4000-8000-000000000063',
  AwSource: 'a1e90011-0000-4000-8000-000000000064',
  PressPanel: 'a1e90011-0000-4000-8000-000000000070',
  PressPanelData: 'a1e90011-0000-4000-8000-000000000071',
  PpEyebrow: 'a1e90011-0000-4000-8000-000000000072',
  PpHeading: 'a1e90011-0000-4000-8000-000000000073',
  PpMore: 'a1e90011-0000-4000-8000-000000000074',
  PpItems: 'a1e90011-0000-4000-8000-000000000075',
  PressCard: 'a1e90011-0000-4000-8000-000000000080',
  PressCardData: 'a1e90011-0000-4000-8000-000000000081',
  PcDate: 'a1e90011-0000-4000-8000-000000000082',
  PcTitle: 'a1e90011-0000-4000-8000-000000000083',
  PcRead: 'a1e90011-0000-4000-8000-000000000084',
  PcLink: 'a1e90011-0000-4000-8000-000000000085',
  DataHome: 'a1e90021-0000-4000-8000-000000000001',
  DsExpertise: 'a1e90021-0000-4000-8000-000000000010',
  DsSectors: 'a1e90021-0000-4000-8000-000000000011',
  DsServices: 'a1e90021-0000-4000-8000-000000000012',
  DsLocations: 'a1e90021-0000-4000-8000-000000000013',
  DsOutLaw: 'a1e90021-0000-4000-8000-000000000020',
  DsOutCards: 'a1e90021-0000-4000-8000-000000000021',
  DsReach: 'a1e90021-0000-4000-8000-000000000030',
  DsAwards: 'a1e90021-0000-4000-8000-000000000031',
  DsPress: 'a1e90021-0000-4000-8000-000000000040',
  DsPressCards: 'a1e90021-0000-4000-8000-000000000041',
};

const F_BASE_TPL = '12c33f3f-86c5-43a5-aeb4-5598cec45116';

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.replace(/\n/g, '\n'), 'utf8');
}

function created() {
  return `    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260910T090000Z
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
    Value: ${title}
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

function folderYaml(id, parent, itemPath) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_DATA_FOLDER}"
Path: ${itemPath}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function renderingYaml(id, name, componentName, dsTemplate, dsLocation) {
  const ds = dsTemplate
    ? `- ID: "${F_DS_TMPL}"
  Hint: Datasource Template
  Value: ${dsTemplate}
- ID: "${F_DS_LOC}"
  Hint: Datasource Location
  Value: "${dsLocation}"
`
    : '';
  return `---
ID: "${id}"
Parent: "${REND_FOLDER}"
Template: "${T_JSON}"
Path: /sitecore/layout/Renderings/Project/legal/${name}
SharedFields:
- ID: "${F_COMPONENT}"
  Hint: componentName
  Value: ${componentName}
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/element.png
${ds}- ID: "${F_PARAM}"
  Hint: Parameters Template
  Value: "${PARAM}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function internalLink(text, url, id) {
  return `<link text="${text}" linktype="internal" url="${url}" anchor="" target="" title="" class="" id="${id}" />`;
}

function linkItem(id, parent, itemPath, title, href, pageId) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${ID.ExpertiseLink}"
Path: ${itemPath}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.ElTitle}"
      Hint: Title
      Value: "${title.replace(/"/g, '\\"')}"
    - ID: "${ID.ElLink}"
      Hint: Link
      Value: |
        ${internalLink(title, href, pageId)}
`;
}

function cardItem(id, parent, itemPath, tpl, fields) {
  const extra = fields
    .map((f) => {
      if (f.xml) {
        return `    - ID: "${f.id}"
      Hint: ${f.hint}
      Value: |
        ${f.xml}`;
      }
      return `    - ID: "${f.id}"
      Hint: ${f.hint}
      Value: "${f.value.replace(/"/g, '\\"')}"`;
    })
    .join('\n');
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${tpl}"
Path: ${itemPath}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}${extra}
`;
}

function treelist(ids) {
  return ids.map((id) => `{${id.toUpperCase()}}`).join('|');
}

function layout(uid, renderingId, ds, variant, phId) {
  const v = variant
    ? `&amp;FieldNames=%7B${variant.toUpperCase()}%7D`
    : '';
  const dsAttr = ds ? `\n          s:ds="${ds}"` : '';
  return `        <r
          uid="{${uid.toUpperCase()}}"${dsAttr}
          s:id="{${renderingId.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D${v}&amp;DynamicPlaceholderId=${phId}"
          s:ph="headless-main" />`;
}

function pageYaml(id, parent, itemPath, nav, title, content, renderingXml) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_PAGE}"
Path: "${itemPath}"
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
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}"
        l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
${renderingXml}
      </d>
    </r>
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: "${nav.replace(/"/g, '\\"')}"
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: "${title.replace(/"/g, '\\"')}"
    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        ${content.split('\n').join('\n        ')}
`;
}

write(
  'serialized-content/templates/legal/Home Templates.yml',
  `---
ID: "${ID.TplFolder}"
Parent: "${TEMPL_FOLDER}"
Template: "${T_TPL_FOLDER}"
Path: "/sitecore/templates/Project/legal/Home Templates"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/templates/legal/Home Templates/ExpertisePanel.yml',
  templateYaml(ID.ExpertisePanel, ID.TplFolder, '/sitecore/templates/Project/legal/Home Templates/ExpertisePanel', `${BASE_STD}\n    ${BASE_DS}`)
);
write(
  'serialized-content/templates/legal/Home Templates/ExpertisePanel/Data.yml',
  sectionYaml(ID.ExpertisePanelData, ID.ExpertisePanel, '/sitecore/templates/Project/legal/Home Templates/ExpertisePanel/Data')
);
write(
  'serialized-content/templates/legal/Home Templates/ExpertisePanel/Data/Eyebrow.yml',
  fieldYaml(ID.EpEyebrow, ID.ExpertisePanelData, '/sitecore/templates/Project/legal/Home Templates/ExpertisePanel/Data/Eyebrow', 'Single-Line Text', 100, 'Eyebrow')
);
write(
  'serialized-content/templates/legal/Home Templates/ExpertisePanel/Data/SectorsLabel.yml',
  fieldYaml(ID.EpSectorsLabel, ID.ExpertisePanelData, '/sitecore/templates/Project/legal/Home Templates/ExpertisePanel/Data/SectorsLabel', 'Single-Line Text', 110, 'SectorsLabel')
);
write(
  'serialized-content/templates/legal/Home Templates/ExpertisePanel/Data/ServicesLabel.yml',
  fieldYaml(ID.EpServicesLabel, ID.ExpertisePanelData, '/sitecore/templates/Project/legal/Home Templates/ExpertisePanel/Data/ServicesLabel', 'Single-Line Text', 120, 'ServicesLabel')
);
write(
  'serialized-content/templates/legal/Home Templates/ExpertisePanel/Data/LocationsLabel.yml',
  fieldYaml(ID.EpLocationsLabel, ID.ExpertisePanelData, '/sitecore/templates/Project/legal/Home Templates/ExpertisePanel/Data/LocationsLabel', 'Single-Line Text', 130, 'LocationsLabel')
);
write(
  'serialized-content/templates/legal/Home Templates/ExpertisePanel/Data/SectorsImage.yml',
  fieldYaml(ID.EpSectorsImage, ID.ExpertisePanelData, '/sitecore/templates/Project/legal/Home Templates/ExpertisePanel/Data/SectorsImage', 'Image', 140, 'SectorsImage')
);
write(
  'serialized-content/templates/legal/Home Templates/ExpertisePanel/Data/ServicesImage.yml',
  fieldYaml(ID.EpServicesImage, ID.ExpertisePanelData, '/sitecore/templates/Project/legal/Home Templates/ExpertisePanel/Data/ServicesImage', 'Image', 150, 'ServicesImage')
);
write(
  'serialized-content/templates/legal/Home Templates/ExpertisePanel/Data/LocationsImage.yml',
  fieldYaml(ID.EpLocationsImage, ID.ExpertisePanelData, '/sitecore/templates/Project/legal/Home Templates/ExpertisePanel/Data/LocationsImage', 'Image', 160, 'LocationsImage')
);
write(
  'serialized-content/templates/legal/Home Templates/ExpertisePanel/Data/Sectors.yml',
  fieldYaml(
    ID.EpSectors,
    ID.ExpertisePanelData,
    '/sitecore/templates/Project/legal/Home Templates/ExpertisePanel/Data/Sectors',
    'Treelist',
    200,
    'Sectors',
    '/sitecore/content/legal/legal/Data/HomeSections/ExpertiseLinks/Sectors'
  )
);
write(
  'serialized-content/templates/legal/Home Templates/ExpertisePanel/Data/Services.yml',
  fieldYaml(
    ID.EpServices,
    ID.ExpertisePanelData,
    '/sitecore/templates/Project/legal/Home Templates/ExpertisePanel/Data/Services',
    'Treelist',
    210,
    'Services',
    '/sitecore/content/legal/legal/Data/HomeSections/ExpertiseLinks/Services'
  )
);
write(
  'serialized-content/templates/legal/Home Templates/ExpertisePanel/Data/Locations.yml',
  fieldYaml(
    ID.EpLocations,
    ID.ExpertisePanelData,
    '/sitecore/templates/Project/legal/Home Templates/ExpertisePanel/Data/Locations',
    'Treelist',
    220,
    'Locations',
    '/sitecore/content/legal/legal/Data/HomeSections/ExpertiseLinks/Locations'
  )
);

write(
  'serialized-content/templates/legal/Home Templates/ExpertiseLink.yml',
  templateYaml(ID.ExpertiseLink, ID.TplFolder, '/sitecore/templates/Project/legal/Home Templates/ExpertiseLink', `${BASE_STD}\n    ${BASE_DS}`)
);
write(
  'serialized-content/templates/legal/Home Templates/ExpertiseLink/Data.yml',
  sectionYaml(ID.ExpertiseLinkData, ID.ExpertiseLink, '/sitecore/templates/Project/legal/Home Templates/ExpertiseLink/Data')
);
write(
  'serialized-content/templates/legal/Home Templates/ExpertiseLink/Data/Title.yml',
  fieldYaml(ID.ElTitle, ID.ExpertiseLinkData, '/sitecore/templates/Project/legal/Home Templates/ExpertiseLink/Data/Title', 'Single-Line Text', 100, 'Title')
);
write(
  'serialized-content/templates/legal/Home Templates/ExpertiseLink/Data/Link.yml',
  fieldYaml(ID.ElLink, ID.ExpertiseLinkData, '/sitecore/templates/Project/legal/Home Templates/ExpertiseLink/Data/Link', 'General Link', 110, 'Link')
);

write(
  'serialized-content/templates/legal/Home Templates/OutLawPanel.yml',
  templateYaml(ID.OutLawPanel, ID.TplFolder, '/sitecore/templates/Project/legal/Home Templates/OutLawPanel', `${BASE_STD}\n    ${BASE_DS}`)
);
write(
  'serialized-content/templates/legal/Home Templates/OutLawPanel/Data.yml',
  sectionYaml(ID.OutLawPanelData, ID.OutLawPanel, '/sitecore/templates/Project/legal/Home Templates/OutLawPanel/Data')
);
write(
  'serialized-content/templates/legal/Home Templates/OutLawPanel/Data/Eyebrow.yml',
  fieldYaml(ID.OlEyebrow, ID.OutLawPanelData, '/sitecore/templates/Project/legal/Home Templates/OutLawPanel/Data/Eyebrow', 'Single-Line Text', 100, 'Eyebrow')
);
write(
  'serialized-content/templates/legal/Home Templates/OutLawPanel/Data/Heading.yml',
  fieldYaml(ID.OlHeading, ID.OutLawPanelData, '/sitecore/templates/Project/legal/Home Templates/OutLawPanel/Data/Heading', 'Single-Line Text', 110, 'Heading')
);
write(
  'serialized-content/templates/legal/Home Templates/OutLawPanel/Data/Subtitle.yml',
  fieldYaml(ID.OlSubtitle, ID.OutLawPanelData, '/sitecore/templates/Project/legal/Home Templates/OutLawPanel/Data/Subtitle', 'Multi-Line Text', 120, 'Subtitle')
);
write(
  'serialized-content/templates/legal/Home Templates/OutLawPanel/Data/MoreLink.yml',
  fieldYaml(ID.OlMore, ID.OutLawPanelData, '/sitecore/templates/Project/legal/Home Templates/OutLawPanel/Data/MoreLink', 'General Link', 130, 'MoreLink')
);
write(
  'serialized-content/templates/legal/Home Templates/OutLawPanel/Data/Items.yml',
  fieldYaml(
    ID.OlItems,
    ID.OutLawPanelData,
    '/sitecore/templates/Project/legal/Home Templates/OutLawPanel/Data/Items',
    'Treelist',
    200,
    'Items',
    '/sitecore/content/legal/legal/Data/HomeSections/OutLawCards'
  )
);

write(
  'serialized-content/templates/legal/Home Templates/OutLawCard.yml',
  templateYaml(ID.OutLawCard, ID.TplFolder, '/sitecore/templates/Project/legal/Home Templates/OutLawCard', `${BASE_STD}\n    ${BASE_DS}`)
);
write(
  'serialized-content/templates/legal/Home Templates/OutLawCard/Data.yml',
  sectionYaml(ID.OutLawCardData, ID.OutLawCard, '/sitecore/templates/Project/legal/Home Templates/OutLawCard/Data')
);
write(
  'serialized-content/templates/legal/Home Templates/OutLawCard/Data/Kicker.yml',
  fieldYaml(ID.OcKicker, ID.OutLawCardData, '/sitecore/templates/Project/legal/Home Templates/OutLawCard/Data/Kicker', 'Single-Line Text', 100, 'Kicker')
);
write(
  'serialized-content/templates/legal/Home Templates/OutLawCard/Data/Title.yml',
  fieldYaml(ID.OcTitle, ID.OutLawCardData, '/sitecore/templates/Project/legal/Home Templates/OutLawCard/Data/Title', 'Single-Line Text', 110, 'Title')
);
write(
  'serialized-content/templates/legal/Home Templates/OutLawCard/Data/Date.yml',
  fieldYaml(ID.OcDate, ID.OutLawCardData, '/sitecore/templates/Project/legal/Home Templates/OutLawCard/Data/Date', 'Single-Line Text', 120, 'Date')
);
write(
  'serialized-content/templates/legal/Home Templates/OutLawCard/Data/ReadTime.yml',
  fieldYaml(ID.OcRead, ID.OutLawCardData, '/sitecore/templates/Project/legal/Home Templates/OutLawCard/Data/ReadTime', 'Single-Line Text', 130, 'ReadTime')
);
write(
  'serialized-content/templates/legal/Home Templates/OutLawCard/Data/Link.yml',
  fieldYaml(ID.OcLink, ID.OutLawCardData, '/sitecore/templates/Project/legal/Home Templates/OutLawCard/Data/Link', 'General Link', 140, 'Link')
);

write(
  'serialized-content/templates/legal/Home Templates/ReachPanel.yml',
  templateYaml(ID.ReachPanel, ID.TplFolder, '/sitecore/templates/Project/legal/Home Templates/ReachPanel', `${BASE_STD}\n    ${BASE_DS}`)
);
write(
  'serialized-content/templates/legal/Home Templates/ReachPanel/Data.yml',
  sectionYaml(ID.ReachPanelData, ID.ReachPanel, '/sitecore/templates/Project/legal/Home Templates/ReachPanel/Data')
);
write(
  'serialized-content/templates/legal/Home Templates/ReachPanel/Data/Eyebrow.yml',
  fieldYaml(ID.RpEyebrow, ID.ReachPanelData, '/sitecore/templates/Project/legal/Home Templates/ReachPanel/Data/Eyebrow', 'Single-Line Text', 100, 'Eyebrow')
);
write(
  'serialized-content/templates/legal/Home Templates/ReachPanel/Data/Heading.yml',
  fieldYaml(ID.RpHeading, ID.ReachPanelData, '/sitecore/templates/Project/legal/Home Templates/ReachPanel/Data/Heading', 'Single-Line Text', 110, 'Heading')
);
write(
  'serialized-content/templates/legal/Home Templates/ReachPanel/Data/MoreLink.yml',
  fieldYaml(ID.RpMore, ID.ReachPanelData, '/sitecore/templates/Project/legal/Home Templates/ReachPanel/Data/MoreLink', 'General Link', 120, 'MoreLink')
);
write(
  'serialized-content/templates/legal/Home Templates/ReachPanel/Data/Items.yml',
  fieldYaml(
    ID.RpItems,
    ID.ReachPanelData,
    '/sitecore/templates/Project/legal/Home Templates/ReachPanel/Data/Items',
    'Treelist',
    200,
    'Items',
    '/sitecore/content/legal/legal/Data/HomeSections/Awards'
  )
);

write(
  'serialized-content/templates/legal/Home Templates/AwardItem.yml',
  templateYaml(ID.AwardItem, ID.TplFolder, '/sitecore/templates/Project/legal/Home Templates/AwardItem', `${BASE_STD}\n    ${BASE_DS}`)
);
write(
  'serialized-content/templates/legal/Home Templates/AwardItem/Data.yml',
  sectionYaml(ID.AwardItemData, ID.AwardItem, '/sitecore/templates/Project/legal/Home Templates/AwardItem/Data')
);
write(
  'serialized-content/templates/legal/Home Templates/AwardItem/Data/Kicker.yml',
  fieldYaml(ID.AwKicker, ID.AwardItemData, '/sitecore/templates/Project/legal/Home Templates/AwardItem/Data/Kicker', 'Single-Line Text', 100, 'Kicker')
);
write(
  'serialized-content/templates/legal/Home Templates/AwardItem/Data/Title.yml',
  fieldYaml(ID.AwTitle, ID.AwardItemData, '/sitecore/templates/Project/legal/Home Templates/AwardItem/Data/Title', 'Single-Line Text', 110, 'Title')
);
write(
  'serialized-content/templates/legal/Home Templates/AwardItem/Data/Source.yml',
  fieldYaml(ID.AwSource, ID.AwardItemData, '/sitecore/templates/Project/legal/Home Templates/AwardItem/Data/Source', 'Single-Line Text', 120, 'Source')
);

write(
  'serialized-content/templates/legal/Home Templates/PressPanel.yml',
  templateYaml(ID.PressPanel, ID.TplFolder, '/sitecore/templates/Project/legal/Home Templates/PressPanel', `${BASE_STD}\n    ${BASE_DS}`)
);
write(
  'serialized-content/templates/legal/Home Templates/PressPanel/Data.yml',
  sectionYaml(ID.PressPanelData, ID.PressPanel, '/sitecore/templates/Project/legal/Home Templates/PressPanel/Data')
);
write(
  'serialized-content/templates/legal/Home Templates/PressPanel/Data/Eyebrow.yml',
  fieldYaml(ID.PpEyebrow, ID.PressPanelData, '/sitecore/templates/Project/legal/Home Templates/PressPanel/Data/Eyebrow', 'Single-Line Text', 100, 'Eyebrow')
);
write(
  'serialized-content/templates/legal/Home Templates/PressPanel/Data/Heading.yml',
  fieldYaml(ID.PpHeading, ID.PressPanelData, '/sitecore/templates/Project/legal/Home Templates/PressPanel/Data/Heading', 'Single-Line Text', 110, 'Heading')
);
write(
  'serialized-content/templates/legal/Home Templates/PressPanel/Data/MoreLink.yml',
  fieldYaml(ID.PpMore, ID.PressPanelData, '/sitecore/templates/Project/legal/Home Templates/PressPanel/Data/MoreLink', 'General Link', 120, 'MoreLink')
);
write(
  'serialized-content/templates/legal/Home Templates/PressPanel/Data/Items.yml',
  fieldYaml(
    ID.PpItems,
    ID.PressPanelData,
    '/sitecore/templates/Project/legal/Home Templates/PressPanel/Data/Items',
    'Treelist',
    200,
    'Items',
    '/sitecore/content/legal/legal/Data/HomeSections/PressCards'
  )
);

write(
  'serialized-content/templates/legal/Home Templates/PressCard.yml',
  templateYaml(ID.PressCard, ID.TplFolder, '/sitecore/templates/Project/legal/Home Templates/PressCard', `${BASE_STD}\n    ${BASE_DS}`)
);
write(
  'serialized-content/templates/legal/Home Templates/PressCard/Data.yml',
  sectionYaml(ID.PressCardData, ID.PressCard, '/sitecore/templates/Project/legal/Home Templates/PressCard/Data')
);
write(
  'serialized-content/templates/legal/Home Templates/PressCard/Data/Date.yml',
  fieldYaml(ID.PcDate, ID.PressCardData, '/sitecore/templates/Project/legal/Home Templates/PressCard/Data/Date', 'Single-Line Text', 100, 'Date')
);
write(
  'serialized-content/templates/legal/Home Templates/PressCard/Data/Title.yml',
  fieldYaml(ID.PcTitle, ID.PressCardData, '/sitecore/templates/Project/legal/Home Templates/PressCard/Data/Title', 'Single-Line Text', 110, 'Title')
);
write(
  'serialized-content/templates/legal/Home Templates/PressCard/Data/ReadTime.yml',
  fieldYaml(ID.PcRead, ID.PressCardData, '/sitecore/templates/Project/legal/Home Templates/PressCard/Data/ReadTime', 'Single-Line Text', 120, 'ReadTime')
);
write(
  'serialized-content/templates/legal/Home Templates/PressCard/Data/Link.yml',
  fieldYaml(ID.PcLink, ID.PressCardData, '/sitecore/templates/Project/legal/Home Templates/PressCard/Data/Link', 'General Link', 130, 'Link')
);

const sectors = [
  'Defence & Security',
  'Energy & Natural Resources',
  'Financial Services',
  'Infrastructure',
  'Life Sciences & Healthcare',
  'Professional & Public Services',
  'Real Estate',
  'Retail & Consumer',
  'Sport & Hospitality',
  'Technology, Science & Industry',
];
const services = [
  'Construction & projects',
  'Corporate',
  'Dispute resolution',
  'Employment & incentives',
  'Finance',
  'Intellectual property',
  'Pensions & long-term savings',
  'Property | Real estate',
  'Regulation & global investigations',
  'TMT & data',
  'Alternative legal services',
];
const locations = ['Africa', 'Americas', 'Asia Pacific', 'Europe', 'Middle East', 'United Kingdom'];

write('serialized-content/legal/legal/Data/HomeSections.yml', folderYaml(ID.DataHome, DATA_ROOT, '/sitecore/content/legal/legal/Data/HomeSections'));
write(
  'serialized-content/legal/legal/Data/HomeSections/ExpertiseLinks.yml',
  folderYaml('a1e90021-0000-4000-8000-00000000000a', ID.DataHome, '/sitecore/content/legal/legal/Data/HomeSections/ExpertiseLinks')
);
write(
  'serialized-content/legal/legal/Data/HomeSections/ExpertiseLinks/Sectors.yml',
  folderYaml(ID.DsSectors, 'a1e90021-0000-4000-8000-00000000000a', '/sitecore/content/legal/legal/Data/HomeSections/ExpertiseLinks/Sectors')
);
write(
  'serialized-content/legal/legal/Data/HomeSections/ExpertiseLinks/Services.yml',
  folderYaml(ID.DsServices, 'a1e90021-0000-4000-8000-00000000000a', '/sitecore/content/legal/legal/Data/HomeSections/ExpertiseLinks/Services')
);
write(
  'serialized-content/legal/legal/Data/HomeSections/ExpertiseLinks/Locations.yml',
  folderYaml(ID.DsLocations, 'a1e90021-0000-4000-8000-00000000000a', '/sitecore/content/legal/legal/Data/HomeSections/ExpertiseLinks/Locations')
);

const sectorIds = [];
sectors.forEach((label, i) => {
  const id = `a1e90021-0000-4000-8000-${(0x101 + i).toString(16).padStart(12, '0')}`;
  sectorIds.push(id);
  const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/g, '');
  write(
    `serialized-content/legal/legal/Data/HomeSections/ExpertiseLinks/Sectors/${slug}.yml`,
    linkItem(id, ID.DsSectors, `/sitecore/content/legal/legal/Data/HomeSections/ExpertiseLinks/Sectors/${slug}`, label, '/expertise', EXPERTISE_PAGE)
  );
});
const serviceIds = [];
services.forEach((label, i) => {
  const id = `a1e90021-0000-4000-8000-${(0x121 + i).toString(16).padStart(12, '0')}`;
  serviceIds.push(id);
  const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/g, '');
  write(
    `serialized-content/legal/legal/Data/HomeSections/ExpertiseLinks/Services/${slug}.yml`,
    linkItem(id, ID.DsServices, `/sitecore/content/legal/legal/Data/HomeSections/ExpertiseLinks/Services/${slug}`, label, '/expertise', EXPERTISE_PAGE)
  );
});
const locationIds = [];
locations.forEach((label, i) => {
  const id = `a1e90021-0000-4000-8000-${(0x141 + i).toString(16).padStart(12, '0')}`;
  locationIds.push(id);
  const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/g, '');
  write(
    `serialized-content/legal/legal/Data/HomeSections/ExpertiseLinks/Locations/${slug}.yml`,
    linkItem(id, ID.DsLocations, `/sitecore/content/legal/legal/Data/HomeSections/ExpertiseLinks/Locations/${slug}`, label, '/offices', OFFICES_PAGE)
  );
});

write(
  'serialized-content/legal/legal/Data/HomeSections/Expertise.yml',
  `---
ID: "${ID.DsExpertise}"
Parent: "${ID.DataHome}"
Template: "${ID.ExpertisePanel}"
Path: /sitecore/content/legal/legal/Data/HomeSections/Expertise
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.EpSectorsImage}"
      Hint: SectorsImage
      Value: |
        ${SECTORS_IMG}
    - ID: "${ID.EpServicesImage}"
      Hint: ServicesImage
      Value: |
        ${EXPERTISE_IMG}
    - ID: "${ID.EpLocationsImage}"
      Hint: LocationsImage
      Value: |
        ${SECTORS_IMG}
    - ID: "${ID.EpEyebrow}"
      Hint: Eyebrow
      Value: Expertise
    - ID: "${ID.EpSectorsLabel}"
      Hint: SectorsLabel
      Value: Sectors
    - ID: "${ID.EpServicesLabel}"
      Hint: ServicesLabel
      Value: Services
    - ID: "${ID.EpLocationsLabel}"
      Hint: LocationsLabel
      Value: Locations
    - ID: "${ID.EpSectors}"
      Hint: Sectors
      Value: "${treelist(sectorIds)}"
    - ID: "${ID.EpServices}"
      Hint: Services
      Value: "${treelist(serviceIds)}"
    - ID: "${ID.EpLocations}"
      Hint: Locations
      Value: "${treelist(locationIds)}"
`
);

const outlawCards = [
  {
    id: 'a1e90021-0000-4000-8000-000000000201',
    slug: 'lawmakers-ai',
    kicker: 'OUT-LAW NEWS',
    title: 'Lawmakers seek ban on ‘superintelligent’ AI as ‘toolkit’ developed to support AI projects',
    date: '09 Sep 2026',
    read: '3 min read',
    href: '/out-law/news/lawmakers-seek-ban-on-superintelligent-ai-as-toolkit-developed-to-support-ai-projects',
    page: NEWS_PAGE,
  },
  {
    id: 'a1e90021-0000-4000-8000-000000000202',
    slug: 'performance-bond',
    kicker: 'OUT-LAW ANALYSIS',
    title: 'English court confirms high bar for resisting performance bond calls based on the underlying contract',
    date: '1 hour ago',
    read: '',
    href: '/out-law',
    page: OUTLAW_PAGE,
  },
  {
    id: 'a1e90021-0000-4000-8000-000000000203',
    slug: 'plastic-packaging',
    kicker: 'OUT-LAW NEWS',
    title: 'UK plastic packaging tax data increases scrutiny on supply chains',
    date: '08 Sep 2026',
    read: '3 min read',
    href: '/out-law',
    page: OUTLAW_PAGE,
  },
  {
    id: 'a1e90021-0000-4000-8000-000000000204',
    slug: 'supplier-guide',
    kicker: 'OUT-LAW GUIDE',
    title: 'When UK suppliers must continue to supply insolvent companies',
    date: 'Guide',
    read: '',
    href: '/out-law/guides/when-uk-suppliers-must-continue-to-supply-insolvent-companies',
    page: GUIDE_PAGE,
  },
];

write(
  'serialized-content/legal/legal/Data/HomeSections/OutLawCards.yml',
  folderYaml(ID.DsOutCards, ID.DataHome, '/sitecore/content/legal/legal/Data/HomeSections/OutLawCards')
);
outlawCards.forEach((c) => {
  write(
    `serialized-content/legal/legal/Data/HomeSections/OutLawCards/${c.slug}.yml`,
    cardItem(c.id, ID.DsOutCards, `/sitecore/content/legal/legal/Data/HomeSections/OutLawCards/${c.slug}`, ID.OutLawCard, [
      { id: ID.OcKicker, hint: 'Kicker', value: c.kicker },
      { id: ID.OcTitle, hint: 'Title', value: c.title },
      { id: ID.OcDate, hint: 'Date', value: c.date },
      { id: ID.OcRead, hint: 'ReadTime', value: c.read || ' ' },
      { id: ID.OcLink, hint: 'Link', xml: internalLink(c.title, c.href, c.page) },
    ])
  );
});

write(
  'serialized-content/legal/legal/Data/HomeSections/OutLaw.yml',
  `---
ID: "${ID.DsOutLaw}"
Parent: "${ID.DataHome}"
Template: "${ID.OutLawPanel}"
Path: /sitecore/content/legal/legal/Data/HomeSections/OutLaw
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.OlEyebrow}"
      Hint: Eyebrow
      Value: Out-Law
    - ID: "${ID.OlHeading}"
      Hint: Heading
      Value: Legal news and analysis
    - ID: "${ID.OlSubtitle}"
      Hint: Subtitle
      Value: Hour by hour news and analysis of the events and trends shaping your decision-making, produced by our dedicated team of reporters.
    - ID: "${ID.OlMore}"
      Hint: MoreLink
      Value: |
        ${internalLink('Read more', '/out-law', OUTLAW_PAGE)}
    - ID: "${ID.OlItems}"
      Hint: Items
      Value: "${treelist(outlawCards.map((c) => c.id))}"
`
);

const awards = [
  { id: 'a1e90021-0000-4000-8000-000000000301', slug: 'energy-team', kicker: 'WINNER', title: 'Energy Team of the Year 2025', source: 'British Legal Awards' },
  { id: 'a1e90021-0000-4000-8000-000000000302', slug: 'innovative', kicker: 'AWARD', title: '3 times Europe’s Most Innovative law firm since 2015', source: 'Financial Times' },
  { id: 'a1e90021-0000-4000-8000-000000000303', slug: 'qatar', kicker: 'AWARD', title: 'Middle East Law Firm of the Year – Qatar 2025', source: 'Middle East Legal Awards' },
];
write('serialized-content/legal/legal/Data/HomeSections/Awards.yml', folderYaml(ID.DsAwards, ID.DataHome, '/sitecore/content/legal/legal/Data/HomeSections/Awards'));
awards.forEach((a) => {
  write(
    `serialized-content/legal/legal/Data/HomeSections/Awards/${a.slug}.yml`,
    cardItem(a.id, ID.DsAwards, `/sitecore/content/legal/legal/Data/HomeSections/Awards/${a.slug}`, ID.AwardItem, [
      { id: ID.AwKicker, hint: 'Kicker', value: a.kicker },
      { id: ID.AwTitle, hint: 'Title', value: a.title },
      { id: ID.AwSource, hint: 'Source', value: a.source },
    ])
  );
});
write(
  'serialized-content/legal/legal/Data/HomeSections/Reach.yml',
  `---
ID: "${ID.DsReach}"
Parent: "${ID.DataHome}"
Template: "${ID.ReachPanel}"
Path: /sitecore/content/legal/legal/Data/HomeSections/Reach
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.RpEyebrow}"
      Hint: Eyebrow
      Value: Our reach and strength
    - ID: "${ID.RpHeading}"
      Hint: Heading
      Value: Recognised expertise, wherever you are
    - ID: "${ID.RpMore}"
      Hint: MoreLink
      Value: |
        ${internalLink('Explore all', '/about-us', ABOUT_ID)}
    - ID: "${ID.RpItems}"
      Hint: Items
      Value: "${treelist(awards.map((a) => a.id))}"
`
);

const press = [
  {
    id: 'a1e90021-0000-4000-8000-000000000401',
    slug: 'mark-wilson',
    date: '07 Sep 2026',
    title: 'Pinsent Masons strengthens restructuring practice with new partner Mark Wilson',
    read: '',
    href: '/about-us/announcements/pinsent-masons-strengthens-restructuring-practice-with-new-partner-mark-wilson',
    page: ANN_MARK,
  },
  {
    id: 'a1e90021-0000-4000-8000-000000000402',
    slug: 'candice-lambeth',
    date: '02 Sep 2026',
    title: 'Pinsent Masons appoints infrastructure M&A specialist Candice Lambeth',
    read: '1 min read',
    href: '/about-us/announcements/pinsent-masons-appoints-infrastructure-ma-specialist-candice-lambeth',
    page: ANN_CANDICE,
  },
  {
    id: 'a1e90021-0000-4000-8000-000000000403',
    slug: 'shanelle-irani',
    date: '01 Sep 2026',
    title: 'Pinsent Masons bolsters Middle East International Arbitration practice with partner hire',
    read: '1 min read',
    href: '/about-us/announcements/pinsent-masons-bolsters-middle-east-international-arbitration-practice-with-partner-hire',
    page: ANN_SHANELLE,
  },
];
write(
  'serialized-content/legal/legal/Data/HomeSections/PressCards.yml',
  folderYaml(ID.DsPressCards, ID.DataHome, '/sitecore/content/legal/legal/Data/HomeSections/PressCards')
);
press.forEach((p) => {
  write(
    `serialized-content/legal/legal/Data/HomeSections/PressCards/${p.slug}.yml`,
    cardItem(p.id, ID.DsPressCards, `/sitecore/content/legal/legal/Data/HomeSections/PressCards/${p.slug}`, ID.PressCard, [
      { id: ID.PcDate, hint: 'Date', value: p.date },
      { id: ID.PcTitle, hint: 'Title', value: p.title },
      { id: ID.PcRead, hint: 'ReadTime', value: p.read || ' ' },
      { id: ID.PcLink, hint: 'Link', xml: internalLink(p.title, p.href, p.page) },
    ])
  );
});
write(
  'serialized-content/legal/legal/Data/HomeSections/Press.yml',
  `---
ID: "${ID.DsPress}"
Parent: "${ID.DataHome}"
Template: "${ID.PressPanel}"
Path: /sitecore/content/legal/legal/Data/HomeSections/Press
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.PpEyebrow}"
      Hint: Eyebrow
      Value: Press releases
    - ID: "${ID.PpHeading}"
      Hint: Heading
      Value: Latest press releases
    - ID: "${ID.PpMore}"
      Hint: MoreLink
      Value: |
        ${internalLink('Explore all', '/about-us/announcements', ANN_LIST)}
    - ID: "${ID.PpItems}"
      Hint: Items
      Value: "${treelist(press.map((p) => p.id))}"
`
);

write(
  'serialized-content/renderings/legal/HomeExpertise.yml',
  renderingYaml(
    'a1e90001-1111-4000-8000-00000000000c',
    'HomeExpertise',
    'HomeExpertise',
    '/sitecore/templates/Project/legal/Home Templates/ExpertisePanel',
    "query:$site/*[@@name='Data']/*[@@name='HomeSections']"
  )
);
write(
  'serialized-content/renderings/legal/OutLawHome.yml',
  renderingYaml(
    'a1e90001-1111-4000-8000-00000000000d',
    'OutLawHome',
    'OutLawHome',
    '/sitecore/templates/Project/legal/Home Templates/OutLawPanel',
    "query:$site/*[@@name='Data']/*[@@name='HomeSections']"
  )
);
write(
  'serialized-content/renderings/legal/ReachStrength.yml',
  renderingYaml(
    'a1e90001-1111-4000-8000-00000000000e',
    'ReachStrength',
    'ReachStrength',
    '/sitecore/templates/Project/legal/Home Templates/ReachPanel',
    "query:$site/*[@@name='Data']/*[@@name='HomeSections']"
  )
);
write(
  'serialized-content/renderings/legal/PressReleases.yml',
  renderingYaml(
    'a1e90001-1111-4000-8000-00000000000f',
    'PressReleases',
    'PressReleases',
    '/sitecore/templates/Project/legal/Home Templates/PressPanel',
    "query:$site/*[@@name='Data']/*[@@name='HomeSections']"
  )
);

write(
  'serialized-content/renderings/legal/AnnouncementSearch.yml',
  renderingYaml('a1e90001-1111-4000-8000-000000000010', 'AnnouncementSearch', 'AnnouncementSearch', '', '')
);
write(
  'serialized-content/renderings/legal/NewsArticle.yml',
  renderingYaml('a1e90001-1111-4000-8000-000000000011', 'NewsArticle', 'NewsArticle', '', '')
);

const VARIANT_PARENT = '0a49ad87-ed6c-43cc-9b28-754e560f5d1d';
const T_VARIANT = '4d50cdae-c2d9-4de8-b080-8f992bfb1b55';
function variantYaml(id, name) {
  return `---
ID: "${id}"
Parent: "${VARIANT_PARENT}"
Template: "${T_VARIANT}"
Path: /sitecore/content/legal/legal/Presentation/Headless Variants/Promo/${name}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}
write(
  'serialized-content/legal/legal/Presentation/Headless Variants/Promo/Newsletter.yml',
  variantYaml('a1e90008-8888-4000-8000-000000000011', 'Newsletter')
);
write(
  'serialized-content/legal/legal/Presentation/Headless Variants/Promo/WithBackground.yml',
  variantYaml('a1e90008-8888-4000-8000-000000000012', 'WithBackground')
);

const PROMOS = 'd9b78273-0930-4a7b-94be-b59ca5471cf2';
const T_PROMO = '08213afb-9cb4-4c1f-a5da-865b9a095601';
const F_PROMO_MORE = '453ed40c-5232-4e90-b023-7a3cee2bcfe8';
const F_PROMO_DESC = '4fc0c7b3-bcfb-4a9d-834d-59f6836e5fd6';
const F_PROMO_TITLE = 'f7e3056b-5e6e-4080-b2b7-84f76b2052fc';
const F_PROMO_SUB = '79332b7d-ea7f-47d7-a9c2-bfaae4806296';
write(
  'serialized-content/legal/legal/Data/Promos/Newsletter.yml',
  `---
ID: "a1e90020-0000-4000-8000-000000000033"
Parent: "${PROMOS}"
Template: "${T_PROMO}"
Path: /sitecore/content/legal/legal/Data/Promos/Newsletter
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_PROMO_MORE}"
      Hint: PromoMoreInfo
      Value: |
        <link text="Sign-up" linktype="external" url="https://insight.pinsentmasons.com/6/10/landing-pages/newsletter-sign-up---website.asp" anchor="" target="_blank" title="" class="" />
    - ID: "${F_PROMO_DESC}"
      Hint: PromoDescription
      Value: <p>Stay ahead of events with our weekly digest of news and expert analysis, tailored for you.</p>
    - ID: "${F_PROMO_SUB}"
      Hint: PromoSubTitle
      Value: Newsletter
    - ID: "${F_PROMO_TITLE}"
      Hint: PromoTitle
      Value: Know what’s coming, make better decisions
`
);

const NEWS_FOLDER = 'a1e90030-0000-4000-8000-000000000013';
const R_NEWS = 'a1e90001-1111-4000-8000-000000000011';
const R_ANN = 'a1e90001-1111-4000-8000-000000000010';
const newsBody = `<p>Draft legislation aimed at preventing the development of “artificial superintelligence systems” within the UK and beyond has been introduced into the UK parliament.</p>
<p>The Artificial Superintelligence Security Bill has been drawn up by ControlAI, a non-profit organisation that warns against the “extinction risk” posed by superintelligent AI systems, but it was introduced to parliament as a private members’ bill by Labour MP Alex Sobel.</p>
<p>It is very rare for private members’ bills to progress into UK law due to constraints on parliamentary time and the failure to achieve government support. However, if the bill was passed, it would curb development of AI systems that “can cause serious damage to the security of the United Kingdom because of its capability to neutralise, displace, circumvent, subvert, or render ineffective relevant human authorities in the exercise of their functions”.</p>
<p>The bill provides for new criminal offences to underpin the ban on development, with possible penalties including large fines or imprisonment.</p>
<p>Speaking in parliament, Sobel said “no company, government or individual knows how to keep superintelligent AI under human control”.</p>
<p>Laura Gallagher of Pinsent Masons, who specialises in disputes within the technology sector, said liability will continue to rest with the individuals and organisations involved in designing, deploying and using AI systems.</p>
<p>“As AI becomes increasingly embedded in business operations, organisations will not be able to avoid responsibility by simply blaming the technology when things go wrong,” Gallagher said.</p>`;
const markBody = `<p>Multinational law firm Pinsent Masons has appointed contentious insolvency Partner Mark Wilson to join its restructuring team in Birmingham.</p>
<p>Mark joins from Gateley, where he was Co-Head of the Complex and International Recovery group. A highly regarded contentious insolvency lawyer, he brings more than 25 years' experience advising in all aspects of corporate insolvency, turnaround and restructuring acting for banks, venture capitalists, insolvency practitioners and corporates.</p>
<p>Pinsent Masons Global Head of Finance and Projects Graham Alty said: "Mark is one of the most respected contentious insolvency lawyers in the UK market. His appointment adds significant strength to our restructuring practice and supports our ambition to provide clients with a market-leading contentious insolvency and asset recovery offering."</p>
<p>"Demand for specialist insolvency and recovery expertise continues to grow, and Mark's experience, reputation and sector expertise will be invaluable as we continue to expand our capabilities in this area."</p>`;
const candiceBody = `<p>Pinsent Masons has appointed infrastructure M&amp;A specialist Candice Lambeth as a partner, strengthening the firm’s capability advising on complex infrastructure transactions.</p>`;
const shanelleBody = `<p>Pinsent Masons has bolstered its Middle East International Arbitration practice with a partner hire, continuing investment in the region’s disputes offering.</p>`;

function articlePage(id, parent, itemPath, nav, title, content, uid) {
  return pageYaml(id, parent, itemPath, nav, title, content, layout(uid, R_NEWS, '', '', 1));
}

write(
  'serialized-content/legal/legal/Home/out-law/news.yml',
  pageYaml(
    NEWS_FOLDER,
    OUTLAW_ID,
    '/sitecore/content/legal/legal/Home/out-law/news',
    'News',
    'Out-Law news',
    '<p>Hour by hour legal news from Out-Law.</p>',
    layout('a1e91000-0006-4000-8000-000000000001', R_NEWS, '', '', 1)
  )
);
write(
  'serialized-content/legal/legal/Home/out-law/news/lawmakers-seek-ban-on-superintelligent-ai-as-toolkit-developed-to-support-ai-projects.yml',
  articlePage(
    NEWS_PAGE,
    NEWS_FOLDER,
    '/sitecore/content/legal/legal/Home/out-law/news/lawmakers-seek-ban-on-superintelligent-ai-as-toolkit-developed-to-support-ai-projects',
    'Lawmakers seek ban on superintelligent AI',
    'Lawmakers seek ban on ‘superintelligent’ AI as ‘toolkit’ developed to support AI projects',
    newsBody,
    'a1e91000-0006-4000-8000-000000000050'
  )
);
write(
  'serialized-content/legal/legal/Home/about-us/announcements.yml',
  pageYaml(
    ANN_LIST,
    ABOUT_ID,
    '/sitecore/content/legal/legal/Home/about-us/announcements',
    'Announcements',
    'Announcements',
    '<p>Get the latest news from Pinsent Masons, including press releases and industry comments.</p>',
    layout('a1e91000-0007-4000-8000-000000000051', R_ANN, '', '', 1)
  )
);
write(
  'serialized-content/legal/legal/Home/about-us/announcements/pinsent-masons-strengthens-restructuring-practice-with-new-partner-mark-wilson.yml',
  articlePage(
    ANN_MARK,
    ANN_LIST,
    '/sitecore/content/legal/legal/Home/about-us/announcements/pinsent-masons-strengthens-restructuring-practice-with-new-partner-mark-wilson',
    'Mark Wilson appointment',
    'Pinsent Masons strengthens restructuring practice with new partner Mark Wilson',
    markBody,
    'a1e91000-0007-4000-8000-000000000052'
  )
);
write(
  'serialized-content/legal/legal/Home/about-us/announcements/pinsent-masons-appoints-infrastructure-ma-specialist-candice-lambeth.yml',
  articlePage(
    ANN_CANDICE,
    ANN_LIST,
    '/sitecore/content/legal/legal/Home/about-us/announcements/pinsent-masons-appoints-infrastructure-ma-specialist-candice-lambeth',
    'Candice Lambeth appointment',
    'Pinsent Masons appoints infrastructure M&A specialist Candice Lambeth',
    candiceBody,
    'a1e91000-0007-4000-8000-000000000053'
  )
);
write(
  'serialized-content/legal/legal/Home/about-us/announcements/pinsent-masons-bolsters-middle-east-international-arbitration-practice-with-partner-hire.yml',
  articlePage(
    ANN_SHANELLE,
    ANN_LIST,
    '/sitecore/content/legal/legal/Home/about-us/announcements/pinsent-masons-bolsters-middle-east-international-arbitration-practice-with-partner-hire',
    'Middle East arbitration hire',
    'Pinsent Masons bolsters Middle East International Arbitration practice with partner hire',
    shanelleBody,
    'a1e91000-0007-4000-8000-000000000054'
  )
);

console.log('Wrote home section templates, datasources, pages, and rendering ds bindings');
