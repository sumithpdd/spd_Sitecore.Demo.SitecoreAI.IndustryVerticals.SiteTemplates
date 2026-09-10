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

const PEOPLE_PHOTOS = [
  {
    file: 'dawn-allen.png',
    urls: [`${BASE}/-/media/images/profile/d/dawn-allen.png`],
    purpose: 'Dawn Allen profile',
  },
  {
    file: 'bill-ryan.png',
    urls: [`${BASE}/-/media/images/profile/r/ryan-bill.png`, `${BASE}/-/media/images/profile/b/bill-ryan.png`],
    purpose: 'Bill Ryan profile',
  },
  {
    file: 'barry-mccaig.png',
    urls: [`${BASE}/-/media/images/profile/b/barry-mccaig.png`],
    purpose: 'Barry McCaig profile',
  },
  {
    file: 'bryn-reynolds.png',
    urls: [`${BASE}/-/media/images/profile/b/bryn-reynolds.png`],
    purpose: 'Bryn Reynolds profile',
  },
  {
    file: 'ben-mckinley.png',
    urls: [`${BASE}/-/media/images/profile/b/ben-mckinley.png`],
    purpose: 'Ben McKinley profile',
  },
  {
    file: 'hammad-akhtar.png',
    urls: [
      `${BASE}/-/media/images/profile/h/hammad-akhtar.png`,
      `${BASE}/-/media/images/profile/a/akhtar-hammad.png`,
    ],
    purpose: 'Hammad Akhtar profile',
  },
  {
    file: 'desiree-fields.png',
    urls: [
      `${BASE}/-/media/images/profile/f/desiree-fields.png`,
      `${BASE}/-/media/images/profile/d/desiree-fields.png`,
      `${BASE}/-/media/images/profile/f/fields-desiree.png`,
    ],
    purpose: 'Désirée Fields profile',
  },
  {
    file: 'dinesh-banani.png',
    urls: [
      `${BASE}/-/media/images/profile/b/dinesh-banani.png`,
      `${BASE}/-/media/images/profile/d/dinesh-banani.png`,
      `${BASE}/-/media/images/profile/b/banani-dinesh.png`,
    ],
    purpose: 'Dinesh Banani profile',
  },
  {
    file: 'david-barker.png',
    urls: [
      `${BASE}/-/media/images/profile/b/david-barker.png`,
      `${BASE}/-/media/images/profile/d/david-barker.png`,
      `${BASE}/-/media/images/profile/b/barker-david.png`,
    ],
    purpose: 'David Barker profile',
  },
  {
    file: 'david-doogan.png',
    urls: [
      `${BASE}/-/media/images/profile/d/david-doogan.png`,
      `${BASE}/-/media/images/profile/d/doogan-david.png`,
    ],
    purpose: 'David Doogan profile',
  },
];

const FILES = [
  {
    file: 'pm-logo.png',
    urls: [`${BASE}/-/media/images/logo/eps_pm-colour-logo_rgb_mobius-302x302.png`],
    purpose: 'Header/Footer logo',
  },
  {
    file: 'pm-hero-slide-1.jpg',
    urls: [`${BASE}/-/media/images/homepage-redesign/hero/hero-slide-1.jpg`],
    purpose: 'Home hero',
  },
  {
    file: 'pm-expertise.png',
    urls: [`${BASE}/-/media/images/homepage-redesign/expertise/2212066---expertise---1920x1080.png`],
    purpose: 'Expertise promo',
  },
  {
    file: 'pm-sectors.jpg',
    urls: [`${BASE}/-/media/images/homepage-redesign/expertise/sectors/2188806---homepage-sectors---initial-view.jpg`],
    purpose: 'Sectors / thinking promo',
  },
  ...PEOPLE_PHOTOS,
  {
    file: 'pm-careers.jpg',
    urls: [`${BASE}/-/media/images/homepage-redesign/careers/careers.jpg?rev=1cb0857c7bad4aa189e0005be9589357`],
    purpose: 'Home careers background',
  },
  {
    file: 'pm-services.jpg',
    urls: [`${BASE}/-/media/images/homepage-redesign/expertise/services/2188806---homepage-services---initial-view.jpg`],
    purpose: 'Expertise services tab',
  },
  {
    file: 'pm-locations.jpg',
    urls: [`${BASE}/-/media/images/homepage-redesign/expertise/locations/default-state_8451476.jpg`],
    purpose: 'Expertise locations tab',
  },
  {
    file: 'pm-newsletter.jpg',
    urls: [`${BASE}/-/media/images/homepage-redesign/newsletter/homepage-newsletter-signup.jpg?rev=907ef21e825449bc974802a056972aa4`],
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
  const urls = item.urls || [item.url];
  let saved = false;
  for (const url of urls) {
    process.stdout.write(`GET ${item.file} ... `);
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 SitecoreDemoImageHarvest' },
    });
    if (!res.ok) {
      console.log(`FAILED ${res.status} ${url}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1000) {
      console.log(`too small ${buf.length} ${url}`);
      continue;
    }
    fs.writeFileSync(dest, buf);
    console.log(`${buf.length} bytes`);
    saved = true;
    break;
  }
  if (!saved) console.log(`missing ${item.file}`);
}

fs.writeFileSync(
  path.join(OUT, 'download-manifest.json'),
  JSON.stringify({ harvestedAt: new Date().toISOString(), files: FILES }, null, 2)
);
console.log(`Wrote ${OUT}`);
