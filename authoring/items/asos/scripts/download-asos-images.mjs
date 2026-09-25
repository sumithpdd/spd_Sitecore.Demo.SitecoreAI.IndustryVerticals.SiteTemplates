/**
 * Fashion stills for the ASOS demo. Uploaded to Content Hub brand 108526.
 * Never hotlink asos.com. Staging is gitignored.
 */
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staging = path.join(__dirname, 'media-staging');
const publicDir = path.join(__dirname, '../../../../industry-verticals/asos/public/asos/products');
fs.mkdirSync(staging, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });

const stills = [
  '1483985988355-763728e1935b',
  '1490481651871-ab68de25d43d',
  '1469334031218-e382a71b716b',
  '1515886657613-9f3515b0c78f',
  '1529139574466-a303027c1d8b',
  '1487222477894-8943e31ef7b2',
  '1558761710-8d0d84b84c8e',
  '1541099649105-f69ad21f3246',
  '1582415555673-ad5c6860c6e3',
  '1576995853123-4970e64b4d08',
  '1503342217505-b0a15ec3261c',
  '1523381210414-6c291deccda3',
  '1512436991641-6745cdb1723f',
  '1495121605193-b540aa07d4ed',
  '1525501831762-0c3142a0c1c4',
  '1485230895905-ec40ba36b9bc',
  '1509631179647-0177331693ae',
  '1514996937319-344454492b37',
  '1521572163474-6864f9cf17ab',
  '1519741497674-611481863552',
  '1524504388049-1d4e09075856',
  '1529626455594-4ff0802cfb7e',
  '1475180098004-ca77a66827be',
  '1485968579586-3d0190b0c1c2',
  '1545291730-faff8ca1d4b0',
  '1551488831-00ddcb6c6bd3',
  '1434389677669-e08b4cac3105',
  '1445205170230-4d401c4b77ea',
  '1441986300917-64674bd600d8',
  '1467043153537-a4fba2cd39ef',
  '1479064555552-3ef4979f8908',
  '1483983380754-770caa4ee0d7',
  '1496747611176-843222e1e57c',
  '1503342396591-25d14e7d3db1',
  '1515886657613-9f3515b0c78f',
  '1523353389750-41c3a93fb1d5',
  '1532453288672-3a91ac166755',
  '1542060748-10c56b4adbeb',
  '1544441893-675973e31985',
  '1556905054-8d1d0b0b0b0b',
  '1562157873-818bc0726f68',
  '1576566588028-4147f3842f27',
  '1583743814966-8936f5b7be1a',
  '1591047139829-d91aecb6caea',
  '1596755094514-f87e34085b2c',
  '1601762584063-5d873bf440df',
  '1617137968427-85924c800a22',
  '1618354691373-d851c5c3a990',
  '1620799140408-ed52512916f4',
  '1621184455862-c163dfb30aea',
  '1631185387738-1c0b3c0b3c0b',
  '1483985988355-763728e1935b',
];

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      { headers: { 'User-Agent': 'AsosDemo/1.0' }, rejectUnauthorized: false },
      (res) => {
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

const unique = [...new Set(stills)];
for (const id of unique) {
  const name = `still-${id}.jpg`;
  const dest = path.join(staging, name);
  const pub = path.join(publicDir, name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    fs.copyFileSync(dest, pub);
    continue;
  }
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;
  console.log(`download ${name}`);
  try {
    const buf = await get(url);
    fs.writeFileSync(dest, buf);
    fs.copyFileSync(dest, pub);
    console.log(`  ${buf.length} bytes`);
  } catch (err) {
    console.warn(`  fail ${id}: ${err.message}`);
  }
}
console.log(`stills=${unique.length}`);

for (let i = 1; i <= 70; i++) {
  const name = `still-extra-${String(i).padStart(3, '0')}.jpg`;
  const dest = path.join(staging, name);
  const pub = path.join(publicDir, name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    fs.copyFileSync(dest, pub);
    continue;
  }
  const url = `https://picsum.photos/seed/asos${i}/800/1066`;
  console.log(`download ${name}`);
  try {
    const buf = await get(url);
    fs.writeFileSync(dest, buf);
    fs.copyFileSync(dest, pub);
    console.log(`  ${buf.length} bytes`);
  } catch (err) {
    console.warn(`  fail extra ${i}: ${err.message}`);
  }
}
