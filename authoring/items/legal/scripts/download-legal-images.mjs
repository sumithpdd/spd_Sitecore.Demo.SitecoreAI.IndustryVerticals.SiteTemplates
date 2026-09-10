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
  {
    file: 'bill-ryan.png',
    url: `${BASE}/-/media/images/profile/r/ryan-bill.png`,
    purpose: 'Bill Ryan profile',
  },
  {
    file: 'barry-mccaig.png',
    url: `${BASE}/-/media/images/profile/b/barry-mccaig.png`,
    purpose: 'Barry McCaig profile',
  },
  {
    file: 'bryn-reynolds.png',
    url: `${BASE}/-/media/images/profile/b/bryn-reynolds.png`,
    purpose: 'Bryn Reynolds profile',
  },
  {
    file: 'ben-mckinley.png',
    url: `${BASE}/-/media/images/profile/b/ben-mckinley.png`,
    purpose: 'Ben McKinley profile',
  },
  {
    file: 'pm-careers.jpg',
    url: `${BASE}/-/media/images/homepage-redesign/careers/careers.jpg?rev=1cb0857c7bad4aa189e0005be9589357`,
    purpose: 'Home careers background',
  },
  {
    file: 'pm-services.jpg',
    url: `${BASE}/-/media/images/homepage-redesign/expertise/services/2188806---homepage-services---initial-view.jpg`,
    purpose: 'Expertise services tab',
  },
  {
    file: 'pm-locations.jpg',
    url: `${BASE}/-/media/images/homepage-redesign/expertise/locations/default-state_8451476.jpg`,
    purpose: 'Expertise locations tab',
  },
  {
    file: 'pm-newsletter.jpg',
    url: `${BASE}/-/media/images/homepage-redesign/newsletter/homepage-newsletter-signup.jpg?rev=907ef21e825449bc974802a056972aa4`,
    purpose: 'Newsletter promo',
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
