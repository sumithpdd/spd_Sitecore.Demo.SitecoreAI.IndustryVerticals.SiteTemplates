/**
 * Stamp Content Hub DAM src + dam-id onto Capco Image fields.
 * Reads media-maps/capco-image-xml.json from Upload-CapcoContentHub.ps1.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MAPS = path.join(__dirname, 'media-maps');
const xmlPath = path.join(MAPS, 'capco-image-xml.json');

const xmlByFile = JSON.parse(fs.readFileSync(xmlPath, 'utf8').replace(/^\uFEFF/, ''));

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
  srcToFile[`/capco/${name}`] = name;
  srcToFile[`/capco/${path.parse(name).name}.jpg`] = name;
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

console.log(`DAM patch complete (${patched} Image fields).`);
