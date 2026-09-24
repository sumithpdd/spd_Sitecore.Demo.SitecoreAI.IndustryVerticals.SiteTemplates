/**
 * Capco Content Approval Workflow (pages) + Content Datasource Workflow.
 * GUID prefix c4c0. Does not rewrite Home.yml.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SERIAL = path.join(ROOT, 'serialized-content');

const WF_PARENT = '05592656-56d7-4d85-aacf-30919ee494f9';
const T_WORKFLOW = '1c0acc50-37be-4742-b43c-96a07a7410a5';
const T_STATE = '4b7e2da9-de43-4c83-88c3-02f042031d04';
const T_COMMAND = 'cb01f9fc-c187-46b3-ab0b-97a8468d8303';
const T_ACTION = '66882e97-c8aa-4e37-8901-7a8aa35ed2ed';

const F_CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';
const F_SORT = 'ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e';
const F_INITIAL = 'b5166b38-e4bf-4410-953c-2037f2bf6a56';
const F_NEXT = 'dcbebc58-6124-4100-a248-fc717d6c78d5';
const F_FINAL = 'fb8abc73-7acf-45a0-898c-d3ccb889c3ee';
const F_PARAMS = '1507131d-cee3-49e9-af32-de5403a37b49';
const F_TYPE = 'a291a22b-99e2-46bb-a27b-8ec744275396';
const F_DEFAULT_WF = 'ca9b9f52-4fb0-4f87-a79f-24dea62cda65';
const F_WORKFLOW = 'a4f985d9-98b3-4b52-aaaf-4344f6e747c6';
const F_STATE = '3e431de1-525e-47a3-b6b0-1ccbec3a8c98';
const F_PAGE_DESIGN = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const F_DISPLAY = 'b5e02ad9-d56f-4c41-a065-a133db87bdeb';

const DESIGN = 'c4c00005-5555-4000-8000-000000000001';

const A = {
  Workflow: 'c4c00040-0000-4000-8000-000000000001',
  Draft: 'c4c00040-0000-4000-8000-000000000002',
  Submit: 'c4c00040-0000-4000-8000-000000000003',
  Editorial: 'c4c00040-0000-4000-8000-000000000004',
  ToPrincipal: 'c4c00040-0000-4000-8000-000000000005',
  ReturnDraft: 'c4c00040-0000-4000-8000-000000000006',
  Principal: 'c4c00040-0000-4000-8000-000000000007',
  Approve: 'c4c00040-0000-4000-8000-000000000008',
  Reject: 'c4c00040-0000-4000-8000-000000000009',
  Approved: 'c4c00040-0000-4000-8000-00000000000a',
  Publish: 'c4c00040-0000-4000-8000-00000000000b',
};

const B = {
  Workflow: 'c4c00040-0000-4000-8000-000000000011',
  Draft: 'c4c00040-0000-4000-8000-000000000012',
  Submit: 'c4c00040-0000-4000-8000-000000000013',
  Awaiting: 'c4c00040-0000-4000-8000-000000000014',
  Approve: 'c4c00040-0000-4000-8000-000000000015',
  Reject: 'c4c00040-0000-4000-8000-000000000016',
  Approved: 'c4c00040-0000-4000-8000-000000000017',
  Publish: 'c4c00040-0000-4000-8000-000000000018',
};

const TPL = {
  Person: 'c4c00010-0000-4000-8000-000000000030',
  Article: 'c4c00010-0000-4000-8000-000000000050',
  Press: 'c4c00010-0000-4000-8000-000000000070',
  Hero: 'c4c00010-0000-4000-8000-000000000011',
  Header: 'c4c00010-0000-4000-8000-000000000002',
  Footer: 'c4c00010-0000-4000-8000-000000000021',
  Promo: '08213afb-9cb4-4c1f-a5da-865b9a095601',
};

const SV = {
  Person: 'c4c00010-0000-4000-8000-00000000003f',
  Article: 'c4c00010-0000-4000-8000-000000000068',
  Press: 'c4c00010-0000-4000-8000-000000000071',
  Hero: 'c4c00010-0000-4000-8000-000000000019',
  Header: 'c4c00010-0000-4000-8000-000000000009',
  Footer: 'c4c00010-0000-4000-8000-000000000029',
};

function u(id) {
  return `{${String(id).toUpperCase()}}`;
}
function mkdirp(p) {
  fs.mkdirSync(p, { recursive: true });
}
function write(rel, content) {
  const full = path.join(ROOT, rel);
  mkdirp(path.dirname(full));
  fs.writeFileSync(full, content, 'utf8');
}
function created() {
  return `    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260921T150000Z
`;
}

function workflowYaml(id, name, initial) {
  return `---
ID: "${id}"
Parent: "${WF_PARENT}"
Template: "${T_WORKFLOW}"
Path: "/sitecore/system/Workflows/${name}"
SharedFields:
- ID: "${F_INITIAL}"
  Hint: Initial state
  Value: "${u(initial)}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function displayField(label) {
  return label
    ? `- ID: "${F_DISPLAY}"
  Hint: __Display name
  Value: ${label}
`
    : '';
}

function stateYaml(id, parent, wfName, name, sort, final = false, display = '') {
  const fin = final
    ? `- ID: "${F_FINAL}"
  Hint: Final
  Value: 1
`
    : '';
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_STATE}"
Path: "/sitecore/system/Workflows/${wfName}/${name}"
SharedFields:
- ID: "${F_SORT}"
  Hint: __Sortorder
  Value: ${sort}
${fin}${displayField(display)}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function commandYaml(id, parent, wfName, stateName, name, next, display = '') {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_COMMAND}"
Path: "/sitecore/system/Workflows/${wfName}/${stateName}/${name}"
SharedFields:
- ID: "${F_NEXT}"
  Hint: Next state
  Value: "${u(next)}"
${displayField(display)}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function publishYaml(id, parent, wfName) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_ACTION}"
Path: "/sitecore/system/Workflows/${wfName}/Approved/Auto Publish"
SharedFields:
- ID: "${F_PARAMS}"
  Hint: Parameters
  Value: deep=1&smart=1
- ID: "${F_TYPE}"
  Hint: Type
  Value: Sitecore.Workflows.Simple.PublishAction, Sitecore.Kernel
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function pageSv(id, parent, itemPath, workflowId, withDesign) {
  const design = withDesign
    ? `- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${u(DESIGN)}"
`
    : '';
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${parent}"
Path: "${itemPath}"
SharedFields:
${design}- ID: "${F_DEFAULT_WF}"
  Hint: __Default workflow
  Value: "${u(workflowId)}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

const PAGE_WF = 'Capco Content Approval Workflow';
const DS_WF = 'Capco Content Datasource Workflow';

write(`serialized-content/capco-workflow/${PAGE_WF}.yml`, workflowYaml(A.Workflow, PAGE_WF, A.Draft));
write(
  `serialized-content/capco-workflow/${PAGE_WF}/Draft.yml`,
  stateYaml(A.Draft, A.Workflow, PAGE_WF, 'Draft', 100, false, 'Draft (author)')
);
write(
  `serialized-content/capco-workflow/${PAGE_WF}/Draft/Submit.yml`,
  commandYaml(A.Submit, A.Draft, PAGE_WF, 'Draft', 'Submit', A.Editorial, 'Submit to editorial')
);
write(
  `serialized-content/capco-workflow/${PAGE_WF}/Editorial Review.yml`,
  stateYaml(A.Editorial, A.Workflow, PAGE_WF, 'Editorial Review', 200, false, 'Editorial Review (Emma)')
);
write(
  `serialized-content/capco-workflow/${PAGE_WF}/Editorial Review/Submit to Principal.yml`,
  commandYaml(
    A.ToPrincipal,
    A.Editorial,
    PAGE_WF,
    'Editorial Review',
    'Submit to Principal',
    A.Principal,
    'Submit to Principal'
  )
);
write(
  `serialized-content/capco-workflow/${PAGE_WF}/Editorial Review/Return to Draft.yml`,
  commandYaml(A.ReturnDraft, A.Editorial, PAGE_WF, 'Editorial Review', 'Return to Draft', A.Draft, 'Return to Draft')
);
write(
  `serialized-content/capco-workflow/${PAGE_WF}/Principal Approval.yml`,
  stateYaml(A.Principal, A.Workflow, PAGE_WF, 'Principal Approval', 300, false, 'Principal Approval')
);
write(
  `serialized-content/capco-workflow/${PAGE_WF}/Principal Approval/Approve.yml`,
  commandYaml(A.Approve, A.Principal, PAGE_WF, 'Principal Approval', 'Approve', A.Approved, 'Approve and publish')
);
write(
  `serialized-content/capco-workflow/${PAGE_WF}/Principal Approval/Reject.yml`,
  commandYaml(A.Reject, A.Principal, PAGE_WF, 'Principal Approval', 'Reject', A.Draft, 'Reject to Draft')
);
write(
  `serialized-content/capco-workflow/${PAGE_WF}/Approved.yml`,
  stateYaml(A.Approved, A.Workflow, PAGE_WF, 'Approved', 400, true, 'Approved')
);
write(`serialized-content/capco-workflow/${PAGE_WF}/Approved/Auto Publish.yml`, publishYaml(A.Publish, A.Approved, PAGE_WF));

write(`serialized-content/capco-datasource-workflow/${DS_WF}.yml`, workflowYaml(B.Workflow, DS_WF, B.Draft));
write(
  `serialized-content/capco-datasource-workflow/${DS_WF}/Draft.yml`,
  stateYaml(B.Draft, B.Workflow, DS_WF, 'Draft', 100, false, 'Draft')
);
write(
  `serialized-content/capco-datasource-workflow/${DS_WF}/Draft/Submit.yml`,
  commandYaml(B.Submit, B.Draft, DS_WF, 'Draft', 'Submit', B.Awaiting, 'Submit for approval')
);
write(
  `serialized-content/capco-datasource-workflow/${DS_WF}/Awaiting Approval.yml`,
  stateYaml(B.Awaiting, B.Workflow, DS_WF, 'Awaiting Approval', 200, false, 'Awaiting Approval')
);
write(
  `serialized-content/capco-datasource-workflow/${DS_WF}/Awaiting Approval/Approve.yml`,
  commandYaml(B.Approve, B.Awaiting, DS_WF, 'Awaiting Approval', 'Approve', B.Approved, 'Approve')
);
write(
  `serialized-content/capco-datasource-workflow/${DS_WF}/Awaiting Approval/Reject.yml`,
  commandYaml(B.Reject, B.Awaiting, DS_WF, 'Awaiting Approval', 'Reject', B.Draft, 'Reject')
);
write(
  `serialized-content/capco-datasource-workflow/${DS_WF}/Approved.yml`,
  stateYaml(B.Approved, B.Workflow, DS_WF, 'Approved', 300, true, 'Approved')
);
write(`serialized-content/capco-datasource-workflow/${DS_WF}/Approved/Auto Publish.yml`, publishYaml(B.Publish, B.Approved, DS_WF));

write(
  'serialized-content/templates/capco/PersonPage/__Standard Values.yml',
  pageSv(SV.Person, TPL.Person, '/sitecore/templates/Project/capco/PersonPage/__Standard Values', A.Workflow, true)
);
write(
  'serialized-content/templates/capco/ArticlePage/__Standard Values.yml',
  pageSv(SV.Article, TPL.Article, '/sitecore/templates/Project/capco/ArticlePage/__Standard Values', A.Workflow, true)
);
write(
  'serialized-content/templates/capco/PressReleasePage/__Standard Values.yml',
  pageSv(SV.Press, TPL.Press, '/sitecore/templates/Project/capco/PressReleasePage/__Standard Values', A.Workflow, true)
);
write(
  'serialized-content/templates/capco/HeroBanner Templates/HeroBanner/__Standard Values.yml',
  pageSv(SV.Hero, TPL.Hero, '/sitecore/templates/Project/capco/HeroBanner Templates/HeroBanner/__Standard Values', B.Workflow, false)
);
write(
  'serialized-content/templates/capco/Header Templates/Header/__Standard Values.yml',
  pageSv(SV.Header, TPL.Header, '/sitecore/templates/Project/capco/Header Templates/Header/__Standard Values', B.Workflow, false)
);
write(
  'serialized-content/templates/capco/Footer Templates/Footer/__Standard Values.yml',
  pageSv(SV.Footer, TPL.Footer, '/sitecore/templates/Project/capco/Footer Templates/Footer/__Standard Values', B.Workflow, false)
);

const pageSvPath = path.join(SERIAL, 'templates/capco/Page/__Standard Values.yml');
let pageSvYaml = fs.readFileSync(pageSvPath, 'utf8');
if (!pageSvYaml.includes('Hint: __Default workflow')) {
  pageSvYaml = pageSvYaml.replace(
    /SharedFields:\r?\n/,
    `SharedFields:\n- ID: "${F_DEFAULT_WF}"\n  Hint: __Default workflow\n  Value: "${u(A.Workflow)}"\n`
  );
  fs.writeFileSync(pageSvPath, pageSvYaml);
}

const PAGE_TEMPLATES = new Set([TPL.Person, TPL.Article, TPL.Press]);
const DS_TEMPLATES = new Set([TPL.Hero, TPL.Header, TPL.Footer, TPL.Promo]);
const WORKFLOW_FIELD = (wf) => `- ID: "${F_WORKFLOW}"
  Hint: __Workflow
  Value: "${u(wf)}"
`;
const STATE_FIELD = (state) => `    - ID: "${F_STATE}"
      Hint: __Workflow state
      Value: "${u(state)}"
`;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.yml')) files.push(full);
  }
  return files;
}

function stamp(file, workflowId, approvedId) {
  let yaml = fs.readFileSync(file, 'utf8');
  if (!yaml.includes('Hint: __Workflow')) {
    if (yaml.includes('SharedFields:')) {
      yaml = yaml.replace(/SharedFields:\r?\n/, `SharedFields:\n${WORKFLOW_FIELD(workflowId)}`);
    } else {
      yaml = yaml.replace(/\nLanguages:\r?\n/, `\nSharedFields:\n${WORKFLOW_FIELD(workflowId)}Languages:\n`);
    }
  }
  if (!yaml.includes('Hint: __Workflow state')) {
    yaml = yaml.replace(
      /    Fields:\r?\n(    - ID: "25bed78c-4957-4165-998a-ca1b52f67497")/,
      `    Fields:\n${STATE_FIELD(approvedId)}$1`
    );
  }
  fs.writeFileSync(file, yaml);
}

let pages = 0;
let datasources = 0;
for (const file of walk(path.join(SERIAL, 'capco/capco'))) {
  if (file.includes(`${path.sep}templates${path.sep}`)) continue;
  const yaml = fs.readFileSync(file, 'utf8');
  const template = yaml.match(/^Template: "([^"]+)"/m)?.[1];
  if (PAGE_TEMPLATES.has(template)) {
    stamp(file, A.Workflow, A.Approved);
    pages += 1;
  } else if (DS_TEMPLATES.has(template)) {
    stamp(file, B.Workflow, B.Approved);
    datasources += 1;
  }
}

const QUEUE = [
  { rel: 'capco/capco/Home/perspectives/canada-payment-fraud.yml', lang: 'en', state: A.Draft },
  { rel: 'capco/capco/Home/perspectives/future-of-analytics.yml', lang: 'en', state: A.Editorial },
  { rel: 'capco/capco/Home/perspectives/regulatory-horizon.yml', lang: 'en', state: A.Principal },
  { rel: 'capco/capco/Home/perspectives/regulatory-heatmap.yml', lang: 'de-DE', state: A.Editorial },
  { rel: 'capco/capco/Data/Campaign Landings/Payments.yml', lang: 'en', state: B.Awaiting },
];

function applyQueueState(rel, lang, stateId) {
  const file = path.join(SERIAL, rel);
  if (!fs.existsSync(file)) {
    console.warn(`Queue skip (missing): ${rel}`);
    return false;
  }
  let yaml = fs.readFileSync(file, 'utf8');
  const langMarker = `- Language: ${lang}`;
  const langIdx = yaml.indexOf(langMarker);
  if (langIdx < 0) {
    console.warn(`Queue skip (no ${lang}): ${rel}`);
    return false;
  }
  const after = yaml.slice(langIdx);
  const nextLang = after.indexOf('\n- Language:', langMarker.length);
  const block = nextLang >= 0 ? after.slice(0, nextLang) : after;
  if (!block.includes('Hint: __Workflow state')) {
    console.warn(`Queue skip (no state): ${rel} ${lang}`);
    return false;
  }
  const updated = block.replace(
    /Hint: __Workflow state\r?\n      Value: "\{C4C00040-[^"]+\}"/,
    `Hint: __Workflow state\n      Value: "${u(stateId)}"`
  );
  yaml = yaml.slice(0, langIdx) + updated + (nextLang >= 0 ? after.slice(nextLang) : '');
  fs.writeFileSync(file, yaml);
  return true;
}

const queued = QUEUE.filter((item) => applyQueueState(item.rel, item.lang, item.state)).length;
console.log(`Capco workflows written. Stamped ${pages} pages and ${datasources} datasources Approved. Queue ${queued}/${QUEUE.length}.`);
