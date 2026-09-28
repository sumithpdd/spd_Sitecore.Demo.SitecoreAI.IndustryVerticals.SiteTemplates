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
const home = '9fdd2a62-f9c3-4ad7-9ea4-de8bccbd3475';
const pageTemplate = '921a2caf-0190-44b2-b33b-b550d3caa264';
const titleField = '979c6121-887e-4684-bebe-8ec45a759e08';
const jobFolder = '4ec10002-0000-4000-8000-00000000000f';
const consultantFolder = '4ec10002-0000-4000-8000-000000000020';
const july = '4ec10002-0000-4000-8000-000000000042';
const year = '4ec10002-0000-4000-8000-000000000041';
const june = '4ec10002-0000-4000-8000-000000000048';
const T = {
  job: '4ec10003-0000-4000-8000-000000000020',
  article: '4ec10003-0000-4000-8000-000000000030',
  consultant: '4ec10003-0000-4000-8000-000000000040',
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
};
const R = {
  header: '4ec10001-1111-4000-8000-000000000001',
  footer: '4ec10001-1111-4000-8000-000000000002',
  job: '4ec10001-1111-4000-8000-000000000006',
  consultant: '4ec10001-1111-4000-8000-000000000007',
  article: '4ec10001-1111-4000-8000-000000000008',
};

const write = (file, body) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body.replace(/\n/g, '\r\n'));
};

const layout = (rows) => {
  const body = rows
    .map(
      (row) =>
        `            <r uid="{${row.uid}}" p:before="*" s:ds="{${row.ds}}" s:id="{${row.id}}" s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1" s:ph="${row.ph}" />`
    )
    .join('\n');
  return `<r xmlns:p="p" xmlns:s="s" p:p="1">
      <d id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}" l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
${body}
      </d>
    </r>`;
};

const chrome = (id) => [
  { uid: id.replace('4ec10002', '4ec10009'), ds: id, id: R.header, ph: 'headless-header' },
  { uid: id.replace('4ec10002', '4ec1000a'), ds: id, id: R.footer, ph: 'headless-footer' },
];

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

const pages = path.join(root, 'recruitment/recruitment/Home');
const savePage = (spec) => write(path.join(pages, `${spec.itemPath}.yml`), pageItem(spec));

const jobs = [
  ['011', 'b2', 'business-development-manager-education', 'Business Development Manager - International Education', 'London', '£50,000 - £70,000 + 10-20% bonus', 'PR/088401', 'job-saas.jpg', 'Remote UK new-business role selling international education to large organisations. Occasional travel.', 'Open doors with senior buyers and run a short two-stage process. Lauren James is the consultant.'],
  ['012', 'b3', 'account-manager-singapore', 'Account Manager', 'Singapore', 'Competitive, Singapore', 'PR/088402', 'job-events.jpg', 'Regional account role for a global events agency covering Singapore and wider APAC.', 'Build the annual plan for key accounts and grow the work across live and hybrid programmes. Tommy Styles is the consultant.'],
  ['013', 'b4', 'business-development-manager-ai', 'Business Development Manager - AI Scale-Up', 'City of London', '£70,000 - £75,000 + commission', 'PR/088403', 'job-saas.jpg', 'Field-based commercial role for a technology consultancy building its London presence.', 'Spend the week with enterprise buyers and turn introductions into a pipeline. Rachel Trevillion is the consultant.'],
  ['014', 'b5', 'commercial-manager-field-sales', 'Commercial Manager (field sales)', 'London', '£50,000 - £60,000 + uncapped commission', 'PR/088404', 'job-edtech.jpg', 'Customer-facing sales across several London sites, five days a week.', 'Own the patch, report to a senior commercial manager, and earn monthly commission on top of the base. Lauren James is the consultant.'],
  ['015', 'b6', 'central-sales-manager-london', 'Central Sales Manager', 'London', '£50,000 - £55,000, OTE £60,000 - £65,000', 'PR/088405', 'job-marketplace.jpg', 'Office-based sales lead near Aldgate, with two sales administrators.', 'Run the central team for a premium brand and report to the commercial director. Ian Payne is the consultant.'],
  ['016', 'b7', 'account-executive-newbury', 'Account Executive', 'Newbury', 'Up to £35,000 + 8% bonus', 'PR/088406', 'job-edtech.jpg', 'Support the sales desk of an independent marketing agency. Two days from home.', 'Coordinate the team around live opportunities rather than carrying a full new-business number. Becca Kitchen is the consultant.'],
  ['017', 'b8', 'research-insight-lead', 'Research and Insight Lead', 'City of London', '£65,000 - £70,000', 'PR/088407', 'job-marketplace.jpg', 'Client-side research lead. Mixed methods, three days in the City.', 'Set the insight agenda and sit with the commercial team, not only the research desk. Amy Kirby is the consultant.'],
  ['018', 'b9', 'senior-research-manager-healthcare', 'Senior Research Manager (Healthcare)', 'London', '£41,000 - £51,000', 'PR/088408', 'job-saas.jpg', 'Mid-level healthcare research on strategic studies. Two or three days in the office.', 'Run projects for a life-sciences consultancy and brief stakeholders in plain language. Mat Law is the consultant.'],
];

for (const [n, uid, slug, title, location, salary, reference, image, summary, body] of jobs) {
  const id = `4ec10002-0000-4000-8000-000000000${n}`;
  savePage({
    id,
    parent: jobFolder,
    itemPath: `job/${slug}`,
    template: T.job,
    title,
    fields: [
      { id: F.location, name: 'Location', value: location },
      { id: F.salary, name: 'Salary', value: salary },
      { id: F.jobType, name: 'JobType', value: 'Permanent' },
      { id: F.reference, name: 'Reference', value: reference },
      { id: F.summary, name: 'Summary', value: summary },
      { id: F.body, name: 'Body', value: body },
      { id: F.jobImage, name: 'Image', value: img(image) },
    ],
    rows: [...chrome(id), { uid: `4ec10002-0000-4000-8000-0000000000${uid}`, ds: id, id: R.job, ph: 'headless-main' }],
  });
}

const people = [
  ['022', 'c3', 'tommy-styles', 'Tommy Styles', 'Global Marketing Director', 'London', 'tommy@weareaspire.com', 'consultant-tommy.jpg', 'Tommy leads Aspire marketing and writes the journal. Hiring managers come to him when a process needs a clearer story.'],
  ['023', 'c4', 'amy-kirby', 'Amy Kirby', 'Global Director - Research, Insight & Data', 'New York', 'amy@weareaspire.com', 'consultant-amy.jpg', 'Amy leads research, insight, and data. She places senior researchers and the commercial leaders beside them.'],
  ['024', 'c5', 'becca-kitchen', 'Becca Kitchen', 'Senior Executive Recruitment Consultant', 'London', 'becca@weareaspire.com', 'consultant-ian.jpg', 'Becca recruits across content, digital, events, marketing, and interim. She works with hiring managers who need a shortlist, not a pile of CVs.'],
  ['025', 'c6', 'destiny-owoloko', 'Destiny Owoloko', 'Senior Recruitment Consultant', 'London', 'destiny@weareaspire.com', 'consultant-amy.jpg', 'Destiny covers content, marketing, and digital media from the London desk.'],
  ['026', 'c7', 'lauren-james', 'Lauren James', 'Senior Talent Specialist - Sales', 'London', 'lauren@weareaspire.com', 'consultant-tommy.jpg', 'Lauren recruits sales, SaaS, events, and go-to-market roles.'],
  ['027', 'c8', 'mat-law', 'Mat Law', 'Associate Director', 'London', 'mat@weareaspire.com', 'consultant-ian.jpg', 'Mat leads research, insight, and data searches from London.'],
  ['028', 'c9', 'rachel-trevillion', 'Rachel Trevillion', 'Divisional Manager - Technology Sales', 'London', 'rachel@weareaspire.com', 'consultant-amy.jpg', 'Rachel runs technology sales recruitment: go-to-market, SaaS, and enterprise sales.'],
  ['029', 'ca', 'meg-rayner', 'Meg Rayner', 'Senior Executive Director', 'New York', 'meg@weareaspire.com', 'consultant-tommy.jpg', 'Meg covers go-to-market, SaaS, sales, events, and graduate hiring from New York.'],
];

for (const [n, uid, slug, name, role, location, email, image, bio] of people) {
  const id = `4ec10002-0000-4000-8000-000000000${n}`;
  const phone = location === 'New York' ? '+1 646 980 3714' : '+44 (0)203 807 3709';
  savePage({
    id,
    parent: consultantFolder,
    itemPath: `consultants/${slug}`,
    template: T.consultant,
    title: name,
    fields: [
      { id: F.role, name: 'Role', value: role },
      { id: F.phone, name: 'Phone', value: phone },
      { id: F.email, name: 'Email', value: email },
      { id: F.consultantLocation, name: 'Location', value: location },
      { id: F.bio, name: 'Bio', value: bio },
      { id: F.consultantImage, name: 'Image', value: img(image) },
    ],
    rows: [
      ...chrome(id),
      { uid: `4ec10002-0000-4000-8000-0000000000${uid}`, ds: id, id: R.consultant, ph: 'headless-main' },
    ],
  });
}

savePage({
  id: june,
  parent: year,
  itemPath: 'blog/2026/06',
  template: pageTemplate,
  title: 'June 2026',
  fields: [],
  rows: [],
});

const articles = [
  ['044', 'e3', july, '07', 'beyond-seo-and-geo', 'Beyond SEO: Why Your Next Marketing Hire Needs to Understand GEO', 'July 2026', 'Search now includes answers written by generative engines. The next marketing hire has to brief both.', 'A strong SEO lead still matters. The briefs that win also explain how a brand appears inside generated answers. Hire someone who can write the source, not only the tags.', 'article-geo.jpg'],
  ['045', 'e4', july, '07', 'stop-hiring-for-pedigree', 'Stop Hiring for Pedigree, Start Hiring for Potential', 'July 2026', 'Scarce skills are being missed because CVs are still screened for a degree from the right place.', 'Test the work. Self-taught people and career-changers often solve the problem the pedigree CV only describes. Skills-based interviews also keep salary inflation in check.', 'article-counter-offer.jpg'],
  ['046', 'e5', july, '07', 'internal-ta-and-agencies', 'Why Internal TA and External Agencies Work Better Together', 'July 2026', 'In-house talent teams and specialist agencies cover different parts of the same search.', 'Internal TA knows the culture. An agency can map people who are not applying. Share salary signals and split the hardest roles so the in-house team can stay with the candidate experience.', 'article-geo.jpg'],
  ['047', 'e6', june, '06', 'employer-branding-on-a-budget', 'Employer Branding on a Budget', 'June 2026', 'Smaller firms can win candidates who want impact more than a corporate signing bonus.', 'Tell the truth about autonomy, pace, and how quickly someone can take on more. That story competes with a larger salary when the work itself is the offer.', 'article-counter-offer.jpg'],
  ['049', 'e7', june, '06', 'hiring-for-agility', 'Hiring for Agility', 'June 2026', 'Software skills date quickly. The hire who can unlearn is the one still useful next year.', 'Interview for curiosity and for people who stay useful when the tools change. A trainable operator often beats a certificate that will be out of date.', 'article-geo.jpg'],
];

for (const [n, uid, parent, month, slug, title, date, summary, body, image] of articles) {
  const id = `4ec10002-0000-4000-8000-000000000${n}`;
  savePage({
    id,
    parent,
    itemPath: `blog/2026/${month}/${slug}`,
    template: T.article,
    title,
    fields: [
      { id: F.kicker, name: 'Kicker', value: 'General' },
      { id: F.author, name: 'Author', value: 'Tommy Styles' },
      { id: F.date, name: 'Date', value: date },
      { id: F.articleSummary, name: 'Summary', value: summary },
      { id: F.articleBody, name: 'Body', value: body },
      { id: F.articleImage, name: 'Image', value: img(image) },
    ],
    rows: [...chrome(id), { uid: `4ec10002-0000-4000-8000-0000000000${uid}`, ds: id, id: R.article, ph: 'headless-main' }],
  });
}

console.log(`jobs=${jobs.length} consultants=${people.length} articles=${articles.length}`);
