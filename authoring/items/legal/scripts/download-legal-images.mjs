/**
 * Download Pinsent Masons reference images for Content Hub upload.
 * Never hotlink these URLs in Sitecore YAML.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'media-staging');
const BASE = 'https://www.pinsentmasons.com';

const FILES = [
  {
    file: 'pm-logo.png',
    url: `${BASE}/-/media/images/logo/eps_pm-colour-logo_rgb_mobius-302x302.png`,
    purpose: 'Header/Footer logo',
  },
  {
    file: 'pm-hero-slide-1.jpg',
    url: `${BASE}/-/media/images/homepage-redesign/hero/hero-slide-1.jpg`,
    purpose: 'Home hero',
  },
  {
    file: 'pm-expertise.png',
    url: `${BASE}/-/media/images/homepage-redesign/expertise/2212066---expertise---1920x1080.png`,
    purpose: 'Expertise promo',
  },
  {
    file: 'pm-sectors.jpg',
    url: `${BASE}/-/media/images/homepage-redesign/expertise/sectors/2188806---homepage-sectors---initial-view.jpg`,
    purpose: 'Sectors / thinking promo',
  },
  {
    file: 'dawn-allen.png',
    url: `${BASE}/-/media/images/profile/d/dawn-allen.png`,
    purpose: 'Dawn Allen profile',
  },
];

fs.mkdirSync(OUT, { recursive: true });

for (const item of FILES) {
  const dest = path.join(OUT, item.file);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    console.log(`skip ${item.file}`);
    continue;
  }
  process.stdout.write(`GET ${item.file} ... `);
  const res = await fetch(item.url, {
    headers: { 'User-Agent': 'Mozilla/5.0 SitecoreDemoImageHarvest' },
  });
  if (!res.ok) {
    console.log(`FAILED ${res.status}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log(`${buf.length} bytes`);
}

fs.writeFileSync(
  path.join(OUT, 'download-manifest.json'),
  JSON.stringify({ harvestedAt: new Date().toISOString(), files: FILES }, null, 2)
);
console.log(`Wrote ${OUT}`);
