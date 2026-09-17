/**
 * Stamp Content Hub DAM src + dam-id onto Openhand Image fields.
 * Reads media-maps/nonprofit-image-xml.json from Upload-NonprofitContentHub.ps1.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MAPS = path.join(__dirname, 'media-maps');
const xmlPath = path.join(MAPS, 'nonprofit-image-xml.json');

const xmlByFile = JSON.parse(
  fs.readFileSync(xmlPath, 'utf8').replace(/^\uFEFF/, '')
);

function damXml(file, alt) {
  const raw = xmlByFile[file];
  if (!raw) {
    throw new Error(`No DAM XML for ${file}`);
  }
  let xml = raw.replace(/alt="[^"]*"/, `alt="${alt}"`);
  if (!/\bwidth=/i.test(xml)) {
    xml = xml.replace(/\s*\/>/, ' width="1600" height="1067" />');
  }
  return xml;
}

function walkYml(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkYml(full, acc);
    } else if (entry.name.endsWith('.yml')) {
      acc.push(full);
    }
  }
  return acc;
}

const srcToFile = {};
for (const [name, xml] of Object.entries(xmlByFile)) {
  srcToFile[`/openhand/${name}`] = name;
  const src = xml.match(/src="([^"]+)"/)?.[1];
  if (src) {
    srcToFile[src] = name;
  }
}

const imageTagRe = /<(?:image|Image)\s[^>]*\/>/g;

let patched = 0;
for (const file of walkYml(path.join(ROOT, 'serialized-content'))) {
  let yaml = fs.readFileSync(file, 'utf8');
  const next = yaml.replace(imageTagRe, (tag) => {
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
    const alt = tag.match(/\balt="([^"]*)"/)?.[1] || '';
    const localFile = (src && srcToFile[src]) || '';
    if (!localFile || !xmlByFile[localFile]) {
      return tag;
    }
    patched += 1;
    return damXml(localFile, alt);
  });
  if (next !== yaml) {
    fs.writeFileSync(file, next, 'utf8');
    console.log(`Patched ${path.relative(ROOT, file)}`);
  }
}

const footer = path.join(
  ROOT,
  'serialized-content/nonprofit/nonprofit/Data/Footers/Main Footer.yml'
);
if (fs.existsSync(footer)) {
  let yaml = fs.readFileSync(footer, 'utf8');
  const logoXml = damXml('openhand-logo.png', 'Openhand');
  if (!yaml.includes('dam-id="1yr7T6coQJe8aBsKfRo5jw"')) {
    yaml = yaml.replace(
      /<(?:image|Image) src="[^"]+" alt="Openhand"[^/]*\/>/,
      logoXml
    );
    fs.writeFileSync(footer, yaml, 'utf8');
    console.log('Patched footer logo to DAM');
  }
}

const fieldMapPath = path.join(MAPS, 'nonprofit-sitecore-image-field-map.csv');
if (fs.existsSync(fieldMapPath)) {
  const lines = fs.readFileSync(fieldMapPath, 'utf8').split(/\r?\n/);
  const header = lines[0];
  const cols = header.split(',').map((h) => h.replace(/^"|"$/g, ''));
  const localIdx = cols.indexOf('LocalFile');
  const xmlIdx = cols.indexOf('ImageFieldXml');
  const damIdx = cols.indexOf('DamId');
  const urlIdx = cols.indexOf('PublicUrl');
  const out = [header];
  for (const line of lines.slice(1)) {
    if (!line.trim()) {
      continue;
    }
    const cells = [];
    let cur = '';
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQ && line[i + 1] === '"') {
          cur += '"';
          i += 1;
        } else {
          inQ = !inQ;
        }
      } else if (ch === ',' && !inQ) {
        cells.push(cur);
        cur = '';
      } else {
        cur += ch;
      }
    }
    cells.push(cur);
    const local = cells[localIdx];
    const xml = xmlByFile[local];
    if (xml) {
      cells[xmlIdx] = xml;
      const dam = xml.match(/dam-id="([^"]+)"/)?.[1] || '';
      const src = xml.match(/src="([^"]+)"/)?.[1] || '';
      if (damIdx >= 0) {
        cells[damIdx] = dam;
      }
      if (urlIdx >= 0) {
        cells[urlIdx] = src;
      }
    }
    out.push(cells.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','));
  }
  fs.writeFileSync(fieldMapPath, `${out.join('\n')}\n`, 'utf8');
  console.log('Updated nonprofit-sitecore-image-field-map.csv');
}

fs.writeFileSync(xmlPath, `${JSON.stringify(xmlByFile, null, 2)}\n`, 'utf8');
console.log(`DAM patch complete (${patched} Image fields).`);
