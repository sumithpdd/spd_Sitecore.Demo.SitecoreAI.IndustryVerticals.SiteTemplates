/**
 * Rasterise the Openhand lockup SVG to PNG for Content Hub + public fallback.
 * Run from industry-verticals/nonprofit so sharp resolves:
 *   node ../../authoring/items/nonprofit/scripts/create-openhand-logo.mjs
 */
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../../..');
const require = createRequire(path.join(repoRoot, 'industry-verticals/nonprofit/package.json'));
const sharp = require('sharp');

const svgPath = path.join(__dirname, 'logo-src/openhand-logo.svg');
const staging = path.join(__dirname, 'media-staging');
const publicDir = path.join(repoRoot, 'industry-verticals/nonprofit/public/openhand');
const pngName = 'openhand-logo.png';

fs.mkdirSync(staging, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });

const svg = fs.readFileSync(svgPath);
const png = await sharp(svg, { density: 288 }).trim({ threshold: 0 }).png().toBuffer();

fs.writeFileSync(path.join(staging, pngName), png);
fs.writeFileSync(path.join(publicDir, pngName), png);
console.log(`Wrote ${pngName} (${png.length} bytes)`);
