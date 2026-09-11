/**
 * Sector landing: SectorPanel template, PPS datasource, /sectors pages.
 * GUID prefix a1e90011 (tpl 090+), a1e90026 (data), a1e90030 (pages 070+).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const TEMPL_FOLDER = 'a1e90011-0000-4000-8000-000000000001';
const DATA_ROOT = '79e5fd59-d991-4dc2-a0c9-b9a779f5228a';
const HOME_ID = '7f779a70-0faa-4105-aac5-0c56f0ee44b4';
const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const T_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';
const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const T_DATA_FOLDER = 'a29d272e-9d48-453c-9e9d-b47585fa7f20';
const T_PAGE = 'e5a82c5d-05dd-476c-bec7-efecffd2cf43';
const T_JSON = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const REND_FOLDER = '55837669-1c90-4234-b408-87b8a519ddfd';
const PAGE_DESIGN = '{A1E90005-5555-4000-8000-000000000001}';
const PARAM = '{5BD96264-0B02-4605-8FFF-0079CAEB67FC}';
const BASE_STD = '{1930BBEB-7805-471A-A3BE-4858AC7CF696}';
const BASE_DS = '{44A022DB-56D3-419A-B43B-E27E4D8E9C41}';

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
const F_NAV = '4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8';
const F_PAGE_TITLE = '63ba690a-5274-4537-8313-a6d43fbdadc1';
const F_PAGE_CONTENT = '62d161c2-fb5d-4773-8d46-63c21c95a441';
const F_PAGE_DESIGN = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const F_RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';

const ID = {
  SectorPanel: 'a1e90011-0000-4000-8000-000000000090',
  SectorPanelData: 'a1e90011-0000-4000-8000-000000000091',
  Title: 'a1e90011-0000-4000-8000-000000000092',
  Intro: 'a1e90011-0000-4000-8000-000000000093',
  FollowLabel: 'a1e90011-0000-4000-8000-000000000094',
  FollowLink: 'a1e90011-0000-4000-8000-000000000095',
  HelpLabel: 'a1e90011-0000-4000-8000-000000000096',
  JumpLabel: 'a1e90011-0000-4000-8000-000000000097',
  Body: 'a1e90011-0000-4000-8000-000000000098',
  HeroImage: 'a1e90011-0000-4000-8000-000000000099',
  ThinkingHeading: 'a1e90011-0000-4000-8000-00000000009a',
  ExperienceHeading: 'a1e90011-0000-4000-8000-00000000009b',
  ExperienceIntro: 'a1e90011-0000-4000-8000-00000000009c',
  PeopleHeading: 'a1e90011-0000-4000-8000-00000000009d',
  PeopleIntro: 'a1e90011-0000-4000-8000-00000000009e',
  ContactName: 'a1e90011-0000-4000-8000-00000000009f',
  ContactRole: 'a1e90011-0000-4000-8000-0000000000a0',
  ContactPhone: 'a1e90011-0000-4000-8000-0000000000a1',
  Jumps: 'a1e90011-0000-4000-8000-0000000000a2',
  Highlights: 'a1e90011-0000-4000-8000-0000000000a3',
  Thinking: 'a1e90011-0000-4000-8000-0000000000a4',
  Work: 'a1e90011-0000-4000-8000-0000000000a5',
  People: 'a1e90011-0000-4000-8000-0000000000a6',
  ExpertiseLink: 'a1e90011-0000-4000-8000-000000000020',
  ElTitle: 'a1e90011-0000-4000-8000-000000000022',
  ElLink: 'a1e90011-0000-4000-8000-000000000023',
  AwardItem: 'a1e90011-0000-4000-8000-000000000060',
  AwTitle: 'a1e90011-0000-4000-8000-000000000063',
  AwSource: 'a1e90011-0000-4000-8000-000000000064',
  DataFolder: 'a1e90026-0000-4000-8000-000000000001',
  DsPps: 'a1e90026-0000-4000-8000-000000000010',
  JumpsFolder: 'a1e90026-0000-4000-8000-000000000011',
  JumpPs: 'a1e90026-0000-4000-8000-000000000012',
  JumpPub: 'a1e90026-0000-4000-8000-000000000013',
  HighlightsFolder: 'a1e90026-0000-4000-8000-000000000020',
  Hl1: 'a1e90026-0000-4000-8000-000000000021',
  Hl2: 'a1e90026-0000-4000-8000-000000000022',
  Hl3: 'a1e90026-0000-4000-8000-000000000023',
  SectorsPage: 'a1e90030-0000-4000-8000-000000000070',
  PpsPage: 'a1e90030-0000-4000-8000-000000000071',
  PracticePage: 'a1e90001-1111-4000-8000-00000000000b',
  HomeExpertise: 'a1e90001-1111-4000-8000-00000000000c',
  Promo: 'a1e90001-1111-4000-8000-000000000004',
  Press: 'a1e90001-1111-4000-8000-00000000000f',
  NewsletterDs: 'a1e90020-0000-4000-8000-000000000033',
  PressDs: 'a1e90021-0000-4000-8000-000000000040',
  ExpertiseDs: 'a1e90021-0000-4000-8000-000000000010',
  NewsletterVariant: 'a1e90008-8888-4000-8000-000000000011',
};

const SECTORS_IMG = `<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/bc3ab4586dd340b6b6fe7703e1fca5c8" dam-id="LhH0hyAbSA2S58sbfTQx2A" alt="pm-sectors" dam-content-type="Image" />`;

const DAWN = 'a1e90030-0000-4000-8000-000000000002';
const SALLY = 'a1e90030-0000-4000-8000-00000000000c';
const BILL = 'a1e90030-0000-4000-8000-000000000003';
const BEN = 'a1e90030-0000-4000-8000-000000000006';
const WORK_INTERPATH = 'a1e90022-0000-4000-8000-000000000012';
const WORK_AIM = 'a1e90022-0000-4000-8000-000000000013';
const WORK_SUPPLIER = 'a1e90022-0000-4000-8000-00000000001c';
const CARD_AI = 'a1e90021-0000-4000-8000-000000000201';
const CARD_BOND = 'a1e90021-0000-4000-8000-000000000202';
const CARD_GUIDE = 'a1e90021-0000-4000-8000-000000000204';

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.replace(/\n/g, '\n'), 'utf8');
}

function created() {
  return `    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260911T120000Z
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
  Value: 200
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

function treelist(ids) {
  return ids.map((item) => `{${item.toUpperCase()}}`).join('|');
}

function internalLink(text, url, pageId, anchor = '') {
  return `<link text="${text}" linktype="internal" url="${url}" anchor="${anchor}" target="" title="" class="" id="${pageId}" />`;
}

const TPL = 'serialized-content/home-templates/Home Templates';
const DATA = 'serialized-content/legal/legal/Data/SectorPages';
const HOME = 'serialized-content/legal/legal/Home';

write(
  `${TPL}/SectorPanel.yml`,
  templateYaml(
    ID.SectorPanel,
    TEMPL_FOLDER,
    '/sitecore/templates/Project/legal/Home Templates/SectorPanel',
    `${BASE_STD}\n    ${BASE_DS}`
  )
);
write(
  `${TPL}/SectorPanel/Data.yml`,
  sectionYaml(
    ID.SectorPanelData,
    ID.SectorPanel,
    '/sitecore/templates/Project/legal/Home Templates/SectorPanel/Data'
  )
);

const fields = [
  [ID.Title, 'Title', 'Single-Line Text', 100],
  [ID.Intro, 'Intro', 'Multi-Line Text', 110],
  [ID.FollowLabel, 'FollowLabel', 'Single-Line Text', 120],
  [ID.FollowLink, 'FollowLink', 'General Link', 130],
  [ID.HelpLabel, 'HelpLabel', 'Single-Line Text', 140],
  [ID.JumpLabel, 'JumpLabel', 'Single-Line Text', 150],
  [ID.Body, 'Body', 'Rich Text', 160],
  [ID.HeroImage, 'HeroImage', 'Image', 170],
  [ID.ThinkingHeading, 'ThinkingHeading', 'Single-Line Text', 180],
  [ID.ExperienceHeading, 'ExperienceHeading', 'Single-Line Text', 190],
  [ID.ExperienceIntro, 'ExperienceIntro', 'Multi-Line Text', 200],
  [ID.PeopleHeading, 'PeopleHeading', 'Single-Line Text', 210],
  [ID.PeopleIntro, 'PeopleIntro', 'Multi-Line Text', 220],
  [ID.ContactName, 'ContactName', 'Single-Line Text', 230],
  [ID.ContactRole, 'ContactRole', 'Single-Line Text', 240],
  [ID.ContactPhone, 'ContactPhone', 'Single-Line Text', 250],
];

for (const [id, name, type, sort] of fields) {
  write(
    `${TPL}/SectorPanel/Data/${name}.yml`,
    fieldYaml(
      id,
      ID.SectorPanelData,
      `/sitecore/templates/Project/legal/Home Templates/SectorPanel/Data/${name}`,
      type,
      sort,
      name
    )
  );
}

write(
  `${TPL}/SectorPanel/Data/Jumps.yml`,
  fieldYaml(
    ID.Jumps,
    ID.SectorPanelData,
    '/sitecore/templates/Project/legal/Home Templates/SectorPanel/Data/Jumps',
    'Treelist',
    300,
    'Jumps',
    '/sitecore/content/legal/legal/Data/SectorPages'
  )
);
write(
  `${TPL}/SectorPanel/Data/Highlights.yml`,
  fieldYaml(
    ID.Highlights,
    ID.SectorPanelData,
    '/sitecore/templates/Project/legal/Home Templates/SectorPanel/Data/Highlights',
    'Treelist',
    310,
    'Highlights',
    '/sitecore/content/legal/legal/Data/SectorPages'
  )
);
write(
  `${TPL}/SectorPanel/Data/Thinking.yml`,
  fieldYaml(
    ID.Thinking,
    ID.SectorPanelData,
    '/sitecore/templates/Project/legal/Home Templates/SectorPanel/Data/Thinking',
    'Treelist',
    320,
    'Thinking',
    '/sitecore/content/legal/legal/Data/HomeSections/OutLawCards'
  )
);
write(
  `${TPL}/SectorPanel/Data/Work.yml`,
  fieldYaml(
    ID.Work,
    ID.SectorPanelData,
    '/sitecore/templates/Project/legal/Home Templates/SectorPanel/Data/Work',
    'Treelist',
    330,
    'Work',
    '/sitecore/content/legal/legal/Data/People'
  )
);
write(
  `${TPL}/SectorPanel/Data/People.yml`,
  fieldYaml(
    ID.People,
    ID.SectorPanelData,
    '/sitecore/templates/Project/legal/Home Templates/SectorPanel/Data/People',
    'Treelist',
    340,
    'People',
    '/sitecore/content/legal/legal/Home/people'
  )
);

write(
  'serialized-content/renderings/legal/PracticePage.yml',
  `---
ID: "${ID.PracticePage}"
Parent: "${REND_FOLDER}"
Template: "${T_JSON}"
Path: /sitecore/layout/Renderings/Project/legal/PracticePage
SharedFields:
- ID: "${F_COMPONENT}"
  Hint: componentName
  Value: PracticePage
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/element.png
- ID: "${F_DS_TMPL}"
  Hint: Datasource Template
  Value: /sitecore/templates/Project/legal/Home Templates/SectorPanel
- ID: "${F_DS_LOC}"
  Hint: Datasource Location
  Value: "query:$site/*[@@name='Data']/*[@@name='SectorPages']"
- ID: "${F_PARAM}"
  Hint: Parameters Template
  Value: "${PARAM}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(`${DATA}.yml`, folderYaml(ID.DataFolder, DATA_ROOT, '/sitecore/content/legal/legal/Data/SectorPages'));
write(
  `${DATA}/Jumps.yml`,
  folderYaml(ID.JumpsFolder, ID.DataFolder, '/sitecore/content/legal/legal/Data/SectorPages/Jumps')
);
write(
  `${DATA}/Highlights.yml`,
  folderYaml(
    ID.HighlightsFolder,
    ID.DataFolder,
    '/sitecore/content/legal/legal/Data/SectorPages/Highlights'
  )
);

function jumpItem(id, slug, title, anchor) {
  return `---
ID: "${id}"
Parent: "${ID.JumpsFolder}"
Template: "${ID.ExpertiseLink}"
Path: /sitecore/content/legal/legal/Data/SectorPages/Jumps/${slug}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.ElTitle}"
      Hint: Title
      Value: "${title}"
    - ID: "${ID.ElLink}"
      Hint: Link
      Value: |
        ${internalLink(title, '/sectors/professional-public-services', ID.PpsPage, anchor)}
`;
}

write(`${DATA}/Jumps/professional-services.yml`, jumpItem(ID.JumpPs, 'professional-services', 'Professional Services', 'professional-services'));
write(`${DATA}/Jumps/public-sector.yml`, jumpItem(ID.JumpPub, 'public-sector', 'Public Sector', 'public-sector'));

function highlightItem(id, slug, title, source) {
  return `---
ID: "${id}"
Parent: "${ID.HighlightsFolder}"
Template: "${ID.AwardItem}"
Path: /sitecore/content/legal/legal/Data/SectorPages/Highlights/${slug}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.AwTitle}"
      Hint: Title
      Value: "${title.replace(/"/g, '\\"')}"
    - ID: "${ID.AwSource}"
      Hint: Source
      Value: "${source.replace(/"/g, '\\"')}"
`;
}

write(
  `${DATA}/Highlights/multi-sector.yml`,
  highlightItem(
    ID.Hl1,
    'multi-sector',
    'Multi-sector expertise',
    'allows for us to seamlessly assist clients that work across sectors'
  )
);
write(
  `${DATA}/Highlights/government-regimes.yml`,
  highlightItem(
    ID.Hl2,
    'government-regimes',
    'A deep understanding of what drives government regimes',
    'enables us to advise on the entire life-cycle of a project'
  )
);
write(
  `${DATA}/Highlights/innovation.yml`,
  highlightItem(
    ID.Hl3,
    'innovation',
    'Innovation is key',
    'in how we approach advising our clients – ensuring we meet their evolving needs'
  )
);

const body = `<p>We help clients in Professional and Public Services by offering practical solutions shaped by our strong expertise in a range of specialisms including corporate and commercial contracts, funding, planning, and project management. With international experience and offices across the globe, we advise on commercial, regulatory, cross border and cultural challenges. This helps us reduce risks and create more opportunities for our clients.</p>
<h2 id="professional-services">Professional Services</h2>
<p>Accountants, administrators, consultants and professional practices — including the AIM listed law firm work on Dawn Allen’s experience tab.</p>
<h2 id="public-sector">Public Sector</h2>
<p>Government and public sector organisations, from planning and project life-cycle through to the regulatory regimes that sit around them.</p>`;

write(
  `${DATA}/professional-public-services.yml`,
  `---
ID: "${ID.DsPps}"
Parent: "${ID.DataFolder}"
Template: "${ID.SectorPanel}"
Path: /sitecore/content/legal/legal/Data/SectorPages/professional-public-services
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.HeroImage}"
      Hint: HeroImage
      Value: |
        ${SECTORS_IMG}
    - ID: "${ID.Title}"
      Hint: Title
      Value: "Professional & Public Services"
    - ID: "${ID.Intro}"
      Hint: Intro
      Value: "Connecting Professional and Public Services to our firmwide expertise."
    - ID: "${ID.FollowLabel}"
      Hint: FollowLabel
      Value: "Follow Professional & Public Services"
    - ID: "${ID.FollowLink}"
      Hint: FollowLink
      Value: |
        ${internalLink('Follow Professional & Public Services', '/sectors/professional-public-services', ID.PpsPage, 'newsletter')}
    - ID: "${ID.HelpLabel}"
      Hint: HelpLabel
      Value: "How can we help?"
    - ID: "${ID.JumpLabel}"
      Hint: JumpLabel
      Value: "Jump straight to:"
    - ID: "${ID.Body}"
      Hint: Body
      Value: |
        ${body.split('\n').join('\n        ')}
    - ID: "${ID.ThinkingHeading}"
      Hint: ThinkingHeading
      Value: "Out-Law / Your daily need to know in Professional & Public Services"
    - ID: "${ID.ExperienceHeading}"
      Hint: ExperienceHeading
      Value: "Our latest work"
    - ID: "${ID.ExperienceIntro}"
      Hint: ExperienceIntro
      Value: "Our advisers act on domestic and international projects of all shapes and sizes, working with many of the leading names across this diverse sector. Browse our experience below, or use the filters to look-up recent work in particular geographies and legal disciplines."
    - ID: "${ID.PeopleHeading}"
      Hint: PeopleHeading
      Value: "Our expertise, at your disposal"
    - ID: "${ID.PeopleIntro}"
      Hint: PeopleIntro
      Value: "With over 490 partners and 3000 people around the world, we are well-placed to support you across a full range of legal and advisory services."
    - ID: "${ID.ContactName}"
      Hint: ContactName
      Value: "Simon Colvin"
    - ID: "${ID.ContactRole}"
      Hint: ContactRole
      Value: "Partner, Head of Client Relationships, Professional and Public Services"
    - ID: "${ID.ContactPhone}"
      Hint: ContactPhone
      Value: "+44 7787 002 648"
    - ID: "${ID.Jumps}"
      Hint: Jumps
      Value: "${treelist([ID.JumpPs, ID.JumpPub])}"
    - ID: "${ID.Highlights}"
      Hint: Highlights
      Value: "${treelist([ID.Hl1, ID.Hl2, ID.Hl3])}"
    - ID: "${ID.Thinking}"
      Hint: Thinking
      Value: "${treelist([CARD_GUIDE, CARD_AI, CARD_BOND])}"
    - ID: "${ID.Work}"
      Hint: Work
      Value: "${treelist([WORK_INTERPATH, WORK_AIM, WORK_SUPPLIER])}"
    - ID: "${ID.People}"
      Hint: People
      Value: "${treelist([DAWN, SALLY, BEN, BILL])}"
`
);

function pageYaml(id, parent, itemPath, nav, title, renderingXml) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_PAGE}"
Path: ${itemPath}
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
      Value: "${nav}"
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: "${title}"
    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        <p></p>
`;
}

write(
  `${HOME}/sectors.yml`,
  pageYaml(
    ID.SectorsPage,
    HOME_ID,
    '/sitecore/content/legal/legal/Home/sectors',
    'Sectors',
    'Sectors',
    `        <r
          uid="{A1E91000-000C-4000-8000-000000000070}"
          p:before="*"
          s:ds="${ID.ExpertiseDs}"
          s:id="{${ID.HomeExpertise.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />`
  )
);

write(
  `${HOME}/sectors/professional-public-services.yml`,
  pageYaml(
    ID.PpsPage,
    ID.SectorsPage,
    '/sitecore/content/legal/legal/Home/sectors/professional-public-services',
    'Professional & Public Services',
    'Professional & Public Services',
    `        <r
          uid="{A1E91000-000B-4000-8000-000000000071}"
          p:before="*"
          s:ds="${ID.DsPps}"
          s:id="{${ID.PracticePage.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />
        <r
          uid="{A1E91000-0004-4000-8000-000000000071}"
          s:ds="${ID.NewsletterDs}"
          s:id="{${ID.Promo.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;FieldNames=%7B${ID.NewsletterVariant.toUpperCase()}%7D&amp;DynamicPlaceholderId=2"
          s:ph="headless-main" />
        <r
          uid="{A1E91000-000F-4000-8000-000000000071}"
          s:ds="${ID.PressDs}"
          s:id="{${ID.Press.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=3"
          s:ph="headless-main" />`
  )
);

console.log('Wrote SectorPanel, SectorPages datasource, /sectors pages, PracticePage datasource fields.');
