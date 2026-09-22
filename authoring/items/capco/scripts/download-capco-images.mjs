/**
 * Download CC0 / Unsplash photography for Capco. Never hotlink capco.com.
 * Staging: authoring/items/capco/scripts/media-staging (gitignored).
 */
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staging = path.join(__dirname, 'media-staging');
const publicDir = path.join(__dirname, '../../../../industry-verticals/capco/public/capco');
fs.mkdirSync(staging, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });

const files = {
  'capco-hero.jpg':
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
  'expertise.jpg':
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
  'thinking.jpg':
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
  'elisabeth-plakinger.jpg':
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  'charlotte-byrne.jpg':
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
  'anne-marie-rowland.jpg':
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
  'marina-costa.jpg':
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  'banking-hero.jpg':
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
  'payments-cards.jpg':
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=80',
  'regulation-glass.jpg':
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=80',
  'onboarding.jpg':
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80',
  'tplus1.jpg':
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80',
  'energy-trading.jpg':
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=80',
  'fraud.jpg':
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1600&q=80',
};

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'CapcoDemo/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        get(res.headers.location).then(resolve, reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`${url} -> ${res.statusCode}`));
        res.resume();
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
  });
}

for (const [name, url] of Object.entries(files)) {
  const dest = path.join(staging, name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    console.log(`skip ${name}`);
    fs.copyFileSync(dest, path.join(publicDir, name));
    continue;
  }
  console.log(`download ${name}`);
  const buf = await get(url);
  fs.writeFileSync(dest, buf);
  fs.copyFileSync(dest, path.join(publicDir, name));
  console.log(`  ${buf.length} bytes`);
}

console.log('Capco image staging complete.');
