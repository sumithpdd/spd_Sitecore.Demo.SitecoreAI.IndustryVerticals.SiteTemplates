/**
 * Attach Pinsent Masons Content Approval Workflow to existing
 * PersonPage and ArticlePage items (Approved / Final) so they stay live.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', 'serialized-content');
const TEMPLATES = new Set([
  'a1e90010-0000-4000-8000-000000000030',
  'a1e90010-0000-4000-8000-000000000040',
]);
const WORKFLOW = '{A1E90040-0000-4000-8000-000000000001}';
const APPROVED = '{A1E90040-0000-4000-8000-00000000000A}';
const WORKFLOW_FIELD = `- ID: "a4f985d9-98b3-4b52-aaaf-4344f6e747c6"
  Hint: __Workflow
  Value: "${WORKFLOW}"
`;
const STATE_FIELD = `    - ID: "3e431de1-525e-47a3-b6b0-1ccbec3a8c98"
      Hint: __Workflow state
      Value: "${APPROVED}"
`;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.yml')) files.push(full);
  }
  return files;
}

let updated = 0;
for (const file of walk(ROOT)) {
  if (file.includes(`${path.sep}templates${path.sep}`) || file.includes('page-template')) {
    continue;
  }
  let yaml = fs.readFileSync(file, 'utf8');
  const template = yaml.match(/^Template: "([^"]+)"/m)?.[1];
  if (!TEMPLATES.has(template)) continue;
  if (!yaml.includes('Hint: __Workflow')) {
    yaml = yaml.replace(/SharedFields:\r?\n/, `SharedFields:\n${WORKFLOW_FIELD}`);
  }
  if (!yaml.includes('Hint: __Workflow state')) {
    yaml = yaml.replace(
      /    Fields:\r?\n(    - ID: "25bed78c-4957-4165-998a-ca1b52f67497")/,
      `    Fields:\n${STATE_FIELD}$1`
    );
  }
  fs.writeFileSync(file, yaml);
  updated += 1;
  console.log(path.relative(ROOT, file));
}
console.log(`Updated ${updated} pages`);
