/**
 * Generate Header template branch only and restore rendering ID + datasource wiring.
 */
import { access, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..', '..', '..');
const BROTHER_ROOT = join(__dirname, '..');
const SERIALIZED = join(BROTHER_ROOT, 'serialized-content');
const RENDERINGS = join(SERIALIZED, 'renderings', 'brother');
const TEMPLATES = join(SERIALIZED, 'templates', 'brother');
const GEN = join(
  REPO_ROOT,
  '.cursor/skills/sitecore-serialization-skills/sitecore-new-rendering-yaml/scripts/Generate-SitecoreRendering.mjs'
);

function runNode(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: REPO_ROOT,
      stdio: 'inherit',
      shell: false,
    });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`exit ${code}`))));
  });
}

function extractSharedHint(yaml, hint) {
  const re = new RegExp(
    `Hint: ${hint}\\r?\\n\\s+Value: (?:"([^"]*)"|([^\\r\\n]+)|\\|\\r?\\n([\\s\\S]*?)(?=\\r?\\n- ID:|\\r?\\nLanguages:))`,
    'm'
  );
  const m = yaml.match(re);
  if (!m) return null;
  if (m[1] != null) return m[1];
  if (m[2] != null) return m[2].trim();
  return (m[3] || '').trim();
}

function upsertSharedField(yaml, fieldId, hint, value) {
  const cleaned = String(value).replace(/^"|"$/g, '').trim();
  const needsQuotes = /[:|\s"]/.test(cleaned) || cleaned.includes('query:');
  const rendered = needsQuotes ? `"${cleaned.replace(/"/g, '')}"` : cleaned;
  const block = `- ID: "${fieldId}"\n  Hint: ${hint}\n  Value: ${rendered}`;
  const existing = new RegExp(`- ID: "${fieldId}"[\\s\\S]*?(?=\\n- ID:|\\nLanguages:)`, 'm');
  if (existing.test(yaml)) {
    return yaml.replace(existing, `${block}\n`);
  }
  return yaml.replace(/\nLanguages:/, `\n${block}\nLanguages:`);
}

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function findTemplateId(fileName) {
  const { readdir } = await import('node:fs/promises');
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = join(dir, e.name);
      if (e.isDirectory()) {
        const found = await walk(p);
        if (found) return found;
      } else if (e.name === fileName) {
        const raw = await readFile(p, 'utf8');
        const m = raw.match(/^ID:\s*"([^"]+)"/m);
        if (m) return m[1];
      }
    }
    return null;
  }
  return walk(TEMPLATES);
}

const name = 'Header';
const renderingPath = join(RENDERINGS, `${name}.yml`);
const bakPath = `${renderingPath}.bak`;
const fieldsPath = join(__dirname, 'fields', `${name}.json`);

await rename(renderingPath, bakPath);
try {
  await runNode([GEN, name, '--collection', 'brother', '--fields', fieldsPath]);
} catch (err) {
  if (await fileExists(bakPath)) await rename(bakPath, renderingPath);
  throw err;
}

const generatedRendering = await readFile(renderingPath, 'utf8');
const dsTemplate = extractSharedHint(generatedRendering, 'Datasource Template');
const dsLocation = extractSharedHint(generatedRendering, 'Datasource Location');
const paramsTemplate = extractSharedHint(generatedRendering, 'Parameters Template');

let original = await readFile(bakPath, 'utf8');
if (dsTemplate) {
  original = upsertSharedField(
    original,
    '1a7c85e5-dc0b-490d-9187-bb1dbcb4c72f',
    'Datasource Template',
    dsTemplate
  );
}
if (dsLocation) {
  original = upsertSharedField(
    original,
    'b5b27af1-25ef-405c-87ce-369b3a004016',
    'Datasource Location',
    dsLocation
  );
}
if (paramsTemplate) {
  original = upsertSharedField(
    original,
    'a77e8568-1ab3-44f1-a664-b7c37ec7810d',
    'Parameters Template',
    paramsTemplate
  );
}
await writeFile(renderingPath, original, 'utf8');
await unlink(bakPath);

const dataYml = join(SERIALIZED, 'brother', 'brother', 'Data.yml');
const dataRaw = await readFile(dataYml, 'utf8');
const dataParent = dataRaw.match(/^ID:\s*"([^"]+)"/m)?.[1];
const headerFolderTpl = await findTemplateId('Header Folder.yml');
const headerTpl = await findTemplateId('Header.yml');
const logoFieldId = await findTemplateId('Logo.yml'); // may find wrong Logo.yml
// Prefer Header/Data/Logo.yml by reading path
async function findFieldId(relativeEndsWith) {
  const { readdir } = await import('node:fs/promises');
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = join(dir, e.name);
      if (e.isDirectory()) {
        const found = await walk(p);
        if (found) return found;
      } else if (p.replace(/\\/g, '/').endsWith(relativeEndsWith)) {
        const raw = await readFile(p, 'utf8');
        return raw.match(/^ID:\s*"([^"]+)"/m)?.[1] || null;
      }
    }
    return null;
  }
  return walk(TEMPLATES);
}

const logoId = await findFieldId('Header Templates/Header/Data/Logo.yml');
const brandId = await findFieldId('Header Templates/Header/Data/BrandName.yml');
const searchId = await findFieldId('Header Templates/Header/Data/SearchPlaceholder.yml');

if (!headerFolderTpl || !headerTpl || !dataParent) {
  throw new Error('Missing Header templates or Data parent');
}

const headersFolderId = 'b40e00a1-1111-4000-8000-000000000009';
const siteHeaderId = 'b40e00b1-2222-4000-8000-000000000010';
const headersDir = join(SERIALIZED, 'brother', 'brother', 'Data', 'Headers');
const { mkdir } = await import('node:fs/promises');
await mkdir(headersDir, { recursive: true });

await writeFile(
  join(SERIALIZED, 'brother', 'brother', 'Data', 'Headers.yml'),
  `---
ID: "${headersFolderId}"
Parent: "${dataParent}"
Template: "${headerFolderTpl}"
Path: /sitecore/content/brother/brother/Data/Headers
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
`,
  'utf8'
);

const logoValue =
  `<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/817db3cf8a20462fa960218661a61890" dam-id="ttgHy3GkSSy_dXtu0bltIA" alt="brother-logo" dam-content-type="Image" />`;

await writeFile(
  join(headersDir, 'Site Header.yml'),
  `---
ID: "${siteHeaderId}"
Parent: "${headersFolderId}"
Template: "${headerTpl}"
Path: /sitecore/content/brother/brother/Data/Headers/Site Header
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
    - ID: "${logoId}"
      Hint: Logo
      Value: |
        ${logoValue}
    - ID: "${brandId}"
      Hint: BrandName
      Value: Brother
    - ID: "${searchId}"
      Hint: SearchPlaceholder
      Value: Search Brother
`,
  'utf8'
);

// Patch Partial Design Header with s:ds
const pdPath = join(
  SERIALIZED,
  'brother',
  'brother',
  'Presentation',
  'Partial Designs',
  'Header.yml'
);
let pd = await readFile(pdPath, 'utf8');
if (!pd.includes('s:ds=')) {
  pd = pd.replace(
    's:id="{B40E0001-1111-4000-8000-000000000001}"\n          s:par=',
    `s:ds="{${siteHeaderId.toUpperCase()}}"\n          s:id="{B40E0001-1111-4000-8000-000000000001}"\n          s:par=`
  );
  pd = pd.replace(
    's:id="{B40E0001-1111-4000-8000-000000000001}"\r\n          s:par=',
    `s:ds="{${siteHeaderId.toUpperCase()}}"\r\n          s:id="{B40E0001-1111-4000-8000-000000000001}"\r\n          s:par=`
  );
  await writeFile(pdPath, pd, 'utf8');
  console.log('Partial Design Header patched with Site Header datasource');
} else {
  console.log('Partial Design Header already has s:ds');
}

console.log('Done.', { dsTemplate, dsLocation, paramsTemplate, logoId, brandId, searchId });
