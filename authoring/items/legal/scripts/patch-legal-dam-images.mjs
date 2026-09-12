/**
 * Patch legal YAML Image fields from Content Hub field map CSV.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const csvCandidates = [
  path.join(__dirname, 'media-staging', 'ch-upload', 'legal-sitecore-image-field-map.csv'),
  path.join(__dirname, 'media-maps', 'legal-sitecore-image-field-map.csv'),
];

const csvPath = csvCandidates.find((p) => fs.existsSync(p));
if (!csvPath) {
  console.error('No legal-sitecore-image-field-map.csv — run Upload-LegalContentHub.ps1 first.');
  process.exit(1);
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(',').map((h) => h.replace(/^"|"$/g, ''));
  return lines.slice(1).map((line) => {
    const cells = [];
    let cur = '';
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQ && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else inQ = !inQ;
      } else if (ch === ',' && !inQ) {
        cells.push(cur);
        cur = '';
      } else cur += ch;
    }
    cells.push(cur);
    const row = {};
    headers.forEach((h, i) => {
      row[h] = (cells[i] || '').replace(/^"|"$/g, '');
    });
    return row;
  });
}

const FIELD_IDS = {
  Logo: {
    '/sitecore/content/legal/legal/Data/Headers/Main Header': 'a1e90010-0000-4000-8000-000000000005',
    '/sitecore/content/legal/legal/Data/Footers/Main Footer': 'a1e90010-0000-4000-8000-000000000024',
  },
  PromoImageOne: {
    '/sitecore/content/legal/legal/Data/Promos/Expertise': 'b441a09f-ddb2-41a8-84cc-2533686541f4',
    '/sitecore/content/legal/legal/Data/Promos/Thinking': 'b441a09f-ddb2-41a8-84cc-2533686541f4',
    '/sitecore/content/legal/legal/Data/Promos/Careers': 'b441a09f-ddb2-41a8-84cc-2533686541f4',
    '/sitecore/content/legal/legal/Data/Promos/Newsletter': 'b441a09f-ddb2-41a8-84cc-2533686541f4',
    '/sitecore/content/legal/legal/Data/Promos/Early Talent': 'b441a09f-ddb2-41a8-84cc-2533686541f4',
    '/sitecore/content/legal/legal/Data/Promos/Legal Professionals': 'b441a09f-ddb2-41a8-84cc-2533686541f4',
    '/sitecore/content/legal/legal/Data/Promos/Vario': 'b441a09f-ddb2-41a8-84cc-2533686541f4',
    '/sitecore/content/legal/legal/Data/Promos/Business Professionals': 'b441a09f-ddb2-41a8-84cc-2533686541f4',
    '/sitecore/content/legal/legal/Data/Promos/Work Culture': 'b441a09f-ddb2-41a8-84cc-2533686541f4',
  },
  Image: {
    '/sitecore/content/legal/legal/Data/Hero Banners/Home Hero': 'a1e90010-0000-4000-8000-000000000015',
    '/sitecore/content/legal/legal/Home/events-training/restructuring-and-insolvency-conference-2026':
      'a1e90010-0000-4000-8000-000000000078',
    '/sitecore/content/legal/legal/Home/events-training/ciga-essential-suppliers-briefing':
      'a1e90010-0000-4000-8000-000000000078',
    '/sitecore/content/legal/legal/Home/events-training/lender-roundtable-supply-lines':
      'a1e90010-0000-4000-8000-000000000078',
  },
  SectorsImage: { '/sitecore/content/legal/legal/Data/HomeSections/Expertise': 'a1e90011-0000-4000-8000-000000000016' },
  ServicesImage: { '/sitecore/content/legal/legal/Data/HomeSections/Expertise': 'a1e90011-0000-4000-8000-000000000017' },
  LocationsImage: { '/sitecore/content/legal/legal/Data/HomeSections/Expertise': 'a1e90011-0000-4000-8000-000000000018' },
  Photo: {
    '/sitecore/content/legal/legal/Home/people/dawn-allen': 'a1e90010-0000-4000-8000-000000000038',
    '/sitecore/content/legal/legal/Home/people/bill-ryan': 'a1e90010-0000-4000-8000-000000000038',
    '/sitecore/content/legal/legal/Home/people/barry-mccaig': 'a1e90010-0000-4000-8000-000000000038',
    '/sitecore/content/legal/legal/Home/people/bryn-reynolds': 'a1e90010-0000-4000-8000-000000000038',
    '/sitecore/content/legal/legal/Home/people/ben-mckinley': 'a1e90010-0000-4000-8000-000000000038',
    '/sitecore/content/legal/legal/Home/people/hammad-akhtar': 'a1e90010-0000-4000-8000-000000000038',
    '/sitecore/content/legal/legal/Home/people/desiree-fields': 'a1e90010-0000-4000-8000-000000000038',
    '/sitecore/content/legal/legal/Home/people/dinesh-banani': 'a1e90010-0000-4000-8000-000000000038',
    '/sitecore/content/legal/legal/Home/people/david-barker': 'a1e90010-0000-4000-8000-000000000038',
    '/sitecore/content/legal/legal/Home/people/david-doogan': 'a1e90010-0000-4000-8000-000000000038',
    '/sitecore/content/legal/legal/Home/people/sally-williamson': 'a1e90010-0000-4000-8000-000000000038',
  },
};

function yamlRelFromItemPath(itemPath) {
  const rest = itemPath.replace('/sitecore/content/legal/legal/', '');
  return path.join('serialized-content', 'legal', 'legal', rest + '.yml');
}

const rows = parseCsv(fs.readFileSync(csvPath, 'utf8')).filter((r) => r.ImageFieldXml);
if (!rows.length) {
  console.error('CSV has no ImageFieldXml values.');
  process.exit(1);
}

for (const row of rows) {
  const fieldId = FIELD_IDS[row.FieldName]?.[row.DataItemPath];
  if (!fieldId) {
    console.warn(`No field id for ${row.DataItemPath} ${row.FieldName}`);
    continue;
  }
  const rel = yamlRelFromItemPath(row.DataItemPath);
  const full = path.join(ROOT, rel);
  if (!fs.existsSync(full)) {
    console.warn(`Missing YAML ${rel}`);
    continue;
  }
  let yaml = fs.readFileSync(full, 'utf8');
  const xml = row.ImageFieldXml.replace(/"/g, '\\"');
  const sharedRe = new RegExp(`- ID: "${fieldId}"[\\s\\S]*?(?=\\n(?:- ID: |Languages:))`);
  const versionRe = new RegExp(`    - ID: "${fieldId}"[\\s\\S]*?(?=    - ID: "|$)`);
  if (sharedRe.test(yaml) && yaml.includes(`Hint: ${row.FieldName}`)) {
    yaml = yaml.replace(
      sharedRe,
      `- ID: "${fieldId}"
  Hint: ${row.FieldName}
  Value: |
    ${row.ImageFieldXml}
`
    );
  } else if (versionRe.test(yaml)) {
    yaml = yaml.replace(
      versionRe,
      `    - ID: "${fieldId}"
      Hint: ${row.FieldName}
      Value: |
        ${row.ImageFieldXml}
`
    );
  } else {
    yaml = yaml.replace(
      /(Languages:\n- Language: en\n  Versions:\n  - Version: 1\n    Fields:\n)/,
      `$1    - ID: "${fieldId}"
      Hint: ${row.FieldName}
      Value: |
        ${row.ImageFieldXml}
`
    );
  }
  fs.writeFileSync(full, yaml, 'utf8');
  console.log(`Patched ${rel} ${row.FieldName}`);
  void xml;
}

console.log('DAM Image fields patched.');
