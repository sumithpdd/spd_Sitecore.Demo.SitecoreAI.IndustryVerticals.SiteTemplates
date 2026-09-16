/**
 * Crop the Hero Conf hall photo into event banner + homepage personalization variants.
 * Run from industry-verticals/legal:
 *   node ../../authoring/items/legal/scripts/crop-event-banner.mjs
 */
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.join(__dirname, '../../../../industry-verticals/legal/package.json'));
const sharp = require('sharp');

const staging = path.join(__dirname, 'media-staging');
const source = path.join(staging, 'brighton-hero-source.jpg');

const jobs = [
  {
    file: 'pm-event-conference-banner.jpg',
    // Wide stage crop for the event hero banner
    extract: { left: 0, top: 40, width: 1600, height: 700 },
  },
  {
    file: 'pm-event-conference-home.jpg',
    // 16:9 full hall — homepage personalization
    extract: { left: 0, top: 84, width: 1600, height: 900 },
  },
  {
    file: 'pm-event-conference-card.jpg',
    // 4:3 tighter on the speaker / screens
    extract: { left: 280, top: 20, width: 1200, height: 900 },
  },
];

for (const job of jobs) {
  const out = path.join(staging, job.file);
  await sharp(source).extract(job.extract).jpeg({ quality: 88, mozjpeg: true }).toFile(out);
  const meta = await sharp(out).metadata();
  console.log(`${job.file} ${meta.width}x${meta.height}`);
}
