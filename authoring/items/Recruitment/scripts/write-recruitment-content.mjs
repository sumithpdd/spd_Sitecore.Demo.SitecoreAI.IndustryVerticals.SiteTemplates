import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('authoring/items/Recruitment/serialized-content');
const imageXml = JSON.parse(
  fs
    .readFileSync(
      path.resolve('authoring/items/Recruitment/scripts/media-maps/recruitment-image-xml.json'),
      'utf8'
    )
    .replace(/^\uFEFF/, '')
);
const img = (file) => imageXml[file] || '';
const close = (tag) => '<' + '/' + tag + '>';
const write = (file, body) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body.replace(/\n/g, '\r\n'));
};

const home = '9fdd2a62-f9c3-4ad7-9ea4-de8bccbd3475';
const data = 'b28ba91a-18ec-47d3-9a29-efc9dd4c010d';
const renderingFolder = '6753b0be-e9ba-4c10-8c1a-8e1d6c1f29f5';
const templateFolder = 'a879e8b2-708e-4e51-8e9d-30ae76d402da';
const pageTemplate = '921a2caf-0190-44b2-b33b-b550d3caa264';
const titleField = '979c6121-887e-4684-bebe-8ec45a759e08';

const renderingItem = (id, name) => `---
ID: "${id}"
Parent: "${renderingFolder}"
Template: "04646a89-996f-4ee7-878a-ffdbf1f0ef0d"
Path: /sitecore/layout/Renderings/Project/recruitment/${name}
SharedFields:
- ID: "037fe404-dd19-4bf7-8e30-4dadf68b27b0"
  Hint: componentName
  Value: ${name}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260928T080000Z
`;

const templateItem = (id, parent, itemPath, base) => `---
ID: "${id}"
Parent: "${parent}"
Template: "ab86861a-6030-46c5-b394-e8f99e8b87db"
Path: "/sitecore/templates/Project/recruitment/${itemPath}"
SharedFields:
- ID: "12c33f3f-86c5-43a5-aeb4-5598cec45116"
  Hint: __Base template
  Value: "${base}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260928T080000Z
`;

const sectionItem = (id, parent, itemPath) => `---
ID: "${id}"
Parent: "${parent}"
Template: "e269fbb5-3750-427a-9149-7aa950b49301"
Path: "/sitecore/templates/Project/recruitment/${itemPath}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260928T080000Z
`;

const fieldItem = (id, parent, itemPath, type) => `---
ID: "${id}"
Parent: "${parent}"
Template: "455a3e98-a627-4b40-8035-e683a0331ac7"
Path: "/sitecore/templates/Project/recruitment/${itemPath}"
SharedFields:
- ID: "ab162cc0-dc80-4abf-8871-998ee5d7ba32"
  Hint: Type
  Value: "${type}"
Languages:
- Language: en
  Fields:
  - ID: "19a69332-a23e-4e70-8d16-b2640cb24cc8"
    Hint: Title
    Value: ${itemPath.split('/').pop()}
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260928T080000Z
`;

const layout = (rows) => {
  const body = rows
    .map(
      (row) => `            <r uid="{${row.uid}}" p:before="*" s:ds="{${row.ds}}" s:id="{${row.id}}" s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1" s:ph="${row.ph}" /` + '>'
    )
    .join('\n');
  return `<r xmlns:p="p" xmlns:s="s" p:p="1">
      <d id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}" l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
${body}
      ${close('d')}
    ${close('r')}`;
};

const R = {
  header: '4ec10001-1111-4000-8000-000000000001',
  footer: '4ec10001-1111-4000-8000-000000000002',
  banner: '4ec10001-1111-4000-8000-000000000003',
  promo: '4ec10001-1111-4000-8000-000000000004',
  jobs: '4ec10001-1111-4000-8000-000000000005',
  job: '4ec10001-1111-4000-8000-000000000006',
  consultant: '4ec10001-1111-4000-8000-000000000007',
  article: '4ec10001-1111-4000-8000-000000000008',
  branch: '4ec10001-1111-4000-8000-000000000009',
  candidates: '4ec10001-1111-4000-8000-00000000000a',
  employers: '4ec10001-1111-4000-8000-00000000000b',
  insights: '4ec10001-1111-4000-8000-00000000000c',
  blog: '4ec10001-1111-4000-8000-00000000000d',
  consultants: '4ec10001-1111-4000-8000-00000000000e',
};

const names = {
  [R.header]: 'AspireHeader',
  [R.footer]: 'AspireFooter',
  [R.banner]: 'HomeBanner',
  [R.promo]: 'AspirePromo',
  [R.jobs]: 'JobSearch',
  [R.job]: 'JobPage',
  [R.consultant]: 'ConsultantPage',
  [R.consultants]: 'ConsultantList',
  [R.article]: 'ArticlePage',
  [R.blog]: 'BlogList',
  [R.branch]: 'BranchPage',
  [R.candidates]: 'CandidatesPage',
  [R.employers]: 'EmployersPage',
  [R.insights]: 'InsightsPage',
};

const renderingDir = path.join(root, 'renderings/recruitment');
Object.entries(names).forEach(([id, name]) => {
  write(path.join(renderingDir, `${name}.yml`), renderingItem(id, name));
});

const T = {
  job: '4ec10003-0000-4000-8000-000000000020',
  jobSection: '4ec10003-0000-4000-8000-000000000021',
  article: '4ec10003-0000-4000-8000-000000000030',
  articleSection: '4ec10003-0000-4000-8000-000000000031',
  consultant: '4ec10003-0000-4000-8000-000000000040',
  consultantSection: '4ec10003-0000-4000-8000-000000000041',
  branch: '4ec10003-0000-4000-8000-000000000050',
  branchSection: '4ec10003-0000-4000-8000-000000000051',
  banner: '4ec10003-0000-4000-8000-000000000060',
  bannerSection: '4ec10003-0000-4000-8000-000000000061',
  promo: '4ec10003-0000-4000-8000-000000000070',
  promoSection: '4ec10003-0000-4000-8000-000000000071',
};
const F = {
  location: '4ec10003-0000-4000-8000-000000000022',
  salary: '4ec10003-0000-4000-8000-000000000023',
  jobType: '4ec10003-0000-4000-8000-000000000024',
  summary: '4ec10003-0000-4000-8000-000000000025',
  body: '4ec10003-0000-4000-8000-000000000026',
  reference: '4ec10003-0000-4000-8000-000000000027',
  jobImage: '4ec10003-0000-4000-8000-000000000028',
  kicker: '4ec10003-0000-4000-8000-000000000032',
  author: '4ec10003-0000-4000-8000-000000000033',
  date: '4ec10003-0000-4000-8000-000000000034',
  articleSummary: '4ec10003-0000-4000-8000-000000000035',
  articleBody: '4ec10003-0000-4000-8000-000000000036',
  articleImage: '4ec10003-0000-4000-8000-000000000037',
  role: '4ec10003-0000-4000-8000-000000000042',
  phone: '4ec10003-0000-4000-8000-000000000043',
  email: '4ec10003-0000-4000-8000-000000000044',
  consultantLocation: '4ec10003-0000-4000-8000-000000000045',
  bio: '4ec10003-0000-4000-8000-000000000046',
  consultantImage: '4ec10003-0000-4000-8000-000000000047',
  branchPhone: '4ec10003-0000-4000-8000-000000000052',
  address: '4ec10003-0000-4000-8000-000000000053',
  branchBody: '4ec10003-0000-4000-8000-000000000054',
  branchImage: '4ec10003-0000-4000-8000-000000000055',
  eyebrow: '4ec10003-0000-4000-8000-000000000062',
  heading: '4ec10003-0000-4000-8000-000000000063',
  intro: '4ec10003-0000-4000-8000-000000000064',
  bannerImage: '4ec10003-0000-4000-8000-000000000065',
  promoHeading: '4ec10003-0000-4000-8000-000000000072',
  promoBody: '4ec10003-0000-4000-8000-000000000073',
  linkLabel: '4ec10003-0000-4000-8000-000000000074',
  promoImage: '4ec10003-0000-4000-8000-000000000075',
};

const templateDir = path.join(root, 'templates/recruitment');
const addTemplate = (id, section, itemPath, base, fieldRows) => {
  write(path.join(templateDir, `${itemPath}.yml`), templateItem(id, templateFolder, itemPath, base));
  write(path.join(templateDir, itemPath, 'Content.yml'), sectionItem(section, id, `${itemPath}/Content`));
  fieldRows.forEach(([name, fieldId, type]) => {
    write(
      path.join(templateDir, itemPath, 'Content', `${name}.yml`),
      fieldItem(fieldId, section, `${itemPath}/Content/${name}`, type)
    );
  });
};

addTemplate(T.job, T.jobSection, 'Job', pageTemplate, [
  ['Location', F.location, 'Single-Line Text'],
  ['Salary', F.salary, 'Single-Line Text'],
  ['JobType', F.jobType, 'Single-Line Text'],
  ['Summary', F.summary, 'Multi-Line Text'],
  ['Body', F.body, 'Multi-Line Text'],
  ['Reference', F.reference, 'Single-Line Text'],
  ['Image', F.jobImage, 'Image'],
]);
addTemplate(T.article, T.articleSection, 'Article', pageTemplate, [
  ['Kicker', F.kicker, 'Single-Line Text'],
  ['Author', F.author, 'Single-Line Text'],
  ['Date', F.date, 'Single-Line Text'],
  ['Summary', F.articleSummary, 'Multi-Line Text'],
  ['Body', F.articleBody, 'Multi-Line Text'],
  ['Image', F.articleImage, 'Image'],
]);
addTemplate(T.consultant, T.consultantSection, 'Consultant', pageTemplate, [
  ['Role', F.role, 'Single-Line Text'],
  ['Phone', F.phone, 'Single-Line Text'],
  ['Email', F.email, 'Single-Line Text'],
  ['Location', F.consultantLocation, 'Single-Line Text'],
  ['Bio', F.bio, 'Multi-Line Text'],
  ['Image', F.consultantImage, 'Image'],
]);
addTemplate(T.branch, T.branchSection, 'Branch', pageTemplate, [
  ['Phone', F.branchPhone, 'Single-Line Text'],
  ['Address', F.address, 'Single-Line Text'],
  ['Body', F.branchBody, 'Multi-Line Text'],
  ['Image', F.branchImage, 'Image'],
]);
addTemplate(T.banner, T.bannerSection, 'HomeBanner', '', [
  ['Eyebrow', F.eyebrow, 'Single-Line Text'],
  ['Heading', F.heading, 'Single-Line Text'],
  ['Intro', F.intro, 'Multi-Line Text'],
  ['Image', F.bannerImage, 'Image'],
]);
addTemplate(T.promo, T.promoSection, 'Promo', '', [
  ['Heading', F.promoHeading, 'Single-Line Text'],
  ['Body', F.promoBody, 'Multi-Line Text'],
  ['LinkLabel', F.linkLabel, 'Single-Line Text'],
  ['Image', F.promoImage, 'Image'],
]);

const pageItem = ({ id, parent, itemPath, template, title, fields, rows }) => `---
ID: "${id}"
Parent: "${parent}"
Template: "${template}"
Path: "/sitecore/content/recruitment/recruitment/Home/${itemPath}"
SharedFields:
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    ${layout(rows).replace(/\n/g, '\n    ')}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${titleField}"
      Hint: Title
      Value: ${JSON.stringify(title)}
${fields
  .map(
    (field) => `    - ID: "${field.id}"
      Hint: ${field.name}
      Value: ${JSON.stringify(field.value)}`
  )
  .join('\n')}
`;

const chrome = (id) => [
  { uid: id.replace('4ec10002', '4ec10009'), ds: id, id: R.header, ph: 'headless-header' },
  { uid: id.replace('4ec10002', '4ec1000a'), ds: id, id: R.footer, ph: 'headless-footer' },
];

const pages = path.join(root, 'recruitment/recruitment/Home');
const savePage = (spec) =>
  write(
    spec.diskPath || path.join(pages, `${spec.itemPath}.yml`),
    pageItem(spec)
  );

savePage({
  id: '4ec10002-0000-4000-8000-000000000001',
  parent: home,
  itemPath: 'candidates',
  template: pageTemplate,
  title: 'Candidates',
  fields: [],
  rows: [
    ...chrome('4ec10002-0000-4000-8000-000000000001'),
    { uid: '4ec10002-0000-4000-8000-0000000000a1', ds: '4ec10002-0000-4000-8000-000000000001', id: R.candidates, ph: 'headless-main' },
  ],
});
savePage({
  id: '4ec10002-0000-4000-8000-000000000002',
  parent: home,
  itemPath: 'jobs',
  template: pageTemplate,
  title: 'Jobs',
  fields: [],
  rows: [
    ...chrome('4ec10002-0000-4000-8000-000000000002'),
    { uid: '4ec10002-0000-4000-8000-0000000000a2', ds: '4ec10002-0000-4000-8000-000000000002', id: R.jobs, ph: 'headless-main' },
  ],
});

const jobFolder = '4ec10002-0000-4000-8000-00000000000f';
const jobId = '4ec10002-0000-4000-8000-000000000010';
savePage({ id: jobFolder, parent: home, itemPath: 'job', template: pageTemplate, title: 'Job', fields: [], rows: [] });
savePage({
  id: jobId,
  parent: jobFolder,
  itemPath: 'job/account-executive-edtech-6039269',
  template: T.job,
  title: 'Account Executive - EdTech',
  fields: [
    { id: F.location, name: 'Location', value: 'London' },
    { id: F.salary, name: 'Salary', value: '£50,000 - £55,000 per annum + uncapped commission' },
    { id: F.jobType, name: 'JobType', value: 'Permanent' },
    { id: F.reference, name: 'Reference', value: 'PR/087962' },
    { id: F.summary, name: 'Summary', value: 'B2B sales role with a growing EdTech business. Hybrid London, uncapped commission.' },
    { id: F.body, name: 'Body', value: 'Open new business with schools, education groups, and multi-academy trusts. Ian Payne is the consultant.' },
    { id: F.jobImage, name: 'Image', value: img('job-edtech.jpg') },
  ],
  rows: [...chrome(jobId), { uid: '4ec10002-0000-4000-8000-0000000000b1', ds: jobId, id: R.job, ph: 'headless-main' }],
});

const consultantFolder = '4ec10002-0000-4000-8000-000000000020';
const ian = '4ec10002-0000-4000-8000-000000000021';
savePage({
  id: consultantFolder,
  parent: home,
  itemPath: 'consultants',
  template: pageTemplate,
  title: 'Consultants',
  fields: [],
  rows: [
    ...chrome(consultantFolder),
    { uid: '4ec10002-0000-4000-8000-0000000000c1', ds: consultantFolder, id: R.consultants, ph: 'headless-main' },
  ],
});
savePage({
  id: ian,
  parent: consultantFolder,
  itemPath: 'consultants/ian-payne',
  template: T.consultant,
  title: 'Ian Payne',
  fields: [
    { id: F.role, name: 'Role', value: 'Talent Consultant' },
    { id: F.phone, name: 'Phone', value: '0208 158 0757' },
    { id: F.email, name: 'Email', value: 'ianp@weareaspire.com' },
    { id: F.consultantLocation, name: 'Location', value: 'London' },
    { id: F.bio, name: 'Bio', value: 'Ian connects ambitious graduates and early-career professionals with sales and commercial roles.' },
    { id: F.consultantImage, name: 'Image', value: img('consultant-ian.jpg') },
  ],
  rows: [...chrome(ian), { uid: '4ec10002-0000-4000-8000-0000000000c2', ds: ian, id: R.consultant, ph: 'headless-main' }],
});

savePage({
  id: '4ec10002-0000-4000-8000-000000000030',
  parent: home,
  itemPath: 'employers',
  template: pageTemplate,
  title: 'Employers',
  fields: [],
  rows: [
    ...chrome('4ec10002-0000-4000-8000-000000000030'),
    { uid: '4ec10002-0000-4000-8000-0000000000d1', ds: '4ec10002-0000-4000-8000-000000000030', id: R.employers, ph: 'headless-main' },
  ],
});
savePage({
  id: '4ec10002-0000-4000-8000-000000000031',
  parent: home,
  itemPath: 'insights',
  template: pageTemplate,
  title: 'Insights',
  fields: [],
  rows: [
    ...chrome('4ec10002-0000-4000-8000-000000000031'),
    { uid: '4ec10002-0000-4000-8000-0000000000d2', ds: '4ec10002-0000-4000-8000-000000000031', id: R.insights, ph: 'headless-main' },
  ],
});

const blog = '4ec10002-0000-4000-8000-000000000040';
const year = '4ec10002-0000-4000-8000-000000000041';
const month = '4ec10002-0000-4000-8000-000000000042';
const article = '4ec10002-0000-4000-8000-000000000043';
savePage({
  id: blog,
  parent: home,
  itemPath: 'blog',
  template: pageTemplate,
  title: 'Blog',
  fields: [],
  rows: [...chrome(blog), { uid: '4ec10002-0000-4000-8000-0000000000e1', ds: blog, id: R.blog, ph: 'headless-main' }],
});
savePage({ id: year, parent: blog, itemPath: 'blog/2026', template: pageTemplate, title: '2026', fields: [], rows: [] });
savePage({ id: month, parent: year, itemPath: 'blog/2026/07', template: pageTemplate, title: 'July 2026', fields: [], rows: [] });
savePage({
  id: article,
  parent: month,
  itemPath: 'blog/2026/07/the-counter-offer-crisis-how-to-secure-your-ideal-candidate',
  diskPath: path.join(root, 'recruitment/3E52AF06B5EE5740/the-counter-offer-crisis-how-to-secure-your-ideal-candidate.yml'),
  template: T.article,
  title: 'The Counter-Offer Crisis: How to Secure Your Ideal Candidate',
  fields: [
    { id: F.kicker, name: 'Kicker', value: 'General' },
    { id: F.author, name: 'Author', value: 'Tommy Styles' },
    { id: F.date, name: 'Date', value: 'July 2026' },
    { id: F.articleSummary, name: 'Summary', value: 'Counter-offers are turning resignations into bidding wars.' },
    { id: F.articleBody, name: 'Body', value: 'Ask about a counter-offer in the first interviews. Culture and a clear first month outweigh a temporary pay rise.' },
    { id: F.articleImage, name: 'Image', value: img('article-counter-offer.jpg') },
  ],
  rows: [...chrome(article), { uid: '4ec10002-0000-4000-8000-0000000000e2', ds: article, id: R.article, ph: 'headless-main' }],
});

const branches = '4ec10002-0000-4000-8000-000000000050';
const london = '4ec10002-0000-4000-8000-000000000051';
savePage({ id: branches, parent: home, itemPath: 'branches', template: pageTemplate, title: 'Branches', fields: [], rows: [] });
savePage({
  id: london,
  parent: branches,
  itemPath: 'branches/London',
  template: T.branch,
  title: 'London',
  fields: [
    { id: F.branchPhone, name: 'Phone', value: '+44 (0)203 807 3709' },
    { id: F.address, name: 'Address', value: '22 Bishopsgate, 7th Floor, XCHG Spaces, London EC2N 4AJ' },
    { id: F.branchBody, name: 'Body', value: 'Aspire London recruits across content, digital and media, events, marketing, sales, research, and technology.' },
    { id: F.branchImage, name: 'Image', value: img('london-office.jpg') },
  ],
  rows: [...chrome(london), { uid: '4ec10002-0000-4000-8000-0000000000f1', ds: london, id: R.branch, ph: 'headless-main' }],
});

const bannerDs = '4ec10006-0000-4000-8000-000000000001';
const promoDs = '4ec10006-0000-4000-8000-000000000002';
const dataDir = path.join(root, 'recruitment/recruitment/Data');
write(
  path.join(dataDir, 'HomeBanner.yml'),
  `---
ID: "${bannerDs}"
Parent: "${data}"
Template: "${T.banner}"
Path: "/sitecore/content/recruitment/recruitment/Data/HomeBanner"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F.eyebrow}"
      Hint: Eyebrow
      Value: "We Are"
    - ID: "${F.heading}"
      Hint: Heading
      Value: "Achieving more together."
    - ID: "${F.intro}"
      Hint: Intro
      Value: "Search, contingent, and contract hiring across sales, SaaS, marketing, events, research, and data."
    - ID: "${F.bannerImage}"
      Hint: Image
      Value: ${JSON.stringify(img('hero-office.jpg'))}
`
);
write(
  path.join(dataDir, 'Promo.yml'),
  `---
ID: "${promoDs}"
Parent: "${data}"
Template: "${T.promo}"
Path: "/sitecore/content/recruitment/recruitment/Data/Promo"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F.promoHeading}"
      Hint: Heading
      Value: "We are Partnerships."
    - ID: "${F.promoBody}"
      Hint: Body
      Value: "From a first sales hire to a global team. Contingency, retained search, contract, and managed services."
    - ID: "${F.linkLabel}"
      Hint: LinkLabel
      Value: "Learn how we can help"
    - ID: "${F.promoImage}"
      Hint: Image
      Value: ${JSON.stringify(img('promo-partnership.jpg'))}
`
);

const homeFile = path.join(root, 'recruitment/recruitment/Home.yml');
let homeYaml = fs.readFileSync(homeFile, 'utf8');
if (!homeYaml.includes('__Renderings')) {
  const block = layout([
    { uid: '4ec10002-0000-4000-8000-000000000071', ds: home, id: R.header, ph: 'headless-header' },
    { uid: '4ec10002-0000-4000-8000-000000000072', ds: bannerDs, id: R.banner, ph: 'headless-main' },
    { uid: '4ec10002-0000-4000-8000-000000000073', ds: promoDs, id: R.promo, ph: 'headless-main' },
    { uid: '4ec10002-0000-4000-8000-000000000074', ds: home, id: R.footer, ph: 'headless-footer' },
  ]);
  homeYaml = homeYaml.replace(
    'SharedFields:\r\n',
    `SharedFields:\r\n- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"\r\n  Hint: __Renderings\r\n  Value: |\r\n    ${block.replace(/\n/g, '\r\n    ')}\r\n`
  );
  if (!homeYaml.includes('__Renderings')) {
    homeYaml = homeYaml.replace(
      'SharedFields:\n',
      `SharedFields:\n- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"\n  Hint: __Renderings\n  Value: |\n    ${block.replace(/\n/g, '\n    ')}\n`
    );
  }
  fs.writeFileSync(homeFile, homeYaml);
}

console.log('wrote recruitment content');
