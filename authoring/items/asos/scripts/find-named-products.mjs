/**
 * One-off lookup for named ASOS products. Prints id, name, price, colour, image.
 * Does not write the catalogue. Direct asos.com is reset here, so search goes
 * through AllOrigins.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'fs';
import os from 'os';
import path from 'path';

const exec = promisify(execFile);
const queries = [
  'ASOS DESIGN mandarin collar denim top',
  'ASOS DESIGN denim bodycon slash neck midi dress in mid blue',
  'Desigual Jeans in blue MBLUE',
  'ASOS DESIGN Tall straight wide leg jeans in mid wash blue',
  'ASOS DESIGN straight wide leg jeans in dark mid wash',
  'Omnes Jeans zola mid-rise barrel jean in light wash denim',
];

async function curlText(url) {
  const dest = path.join(os.tmpdir(), `asos-q-${Date.now()}-${Math.random().toString(16).slice(2)}.json`);
  await exec(
    'curl.exe',
    [
      '--http1.1',
      '-4',
      '--ssl-no-revoke',
      '-fsS',
      '-L',
      '-A',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      '--connect-timeout',
      '20',
      '--max-time',
      '60',
      '-o',
      dest,
      url,
    ],
    { windowsHide: true }
  );
  const text = fs.readFileSync(dest, 'utf8');
  fs.unlinkSync(dest);
  return text;
}

async function search(q) {
  const api = `https://www.asos.com/api/product/search/v2/?q=${encodeURIComponent(q)}&store=COM&lang=en-GB&currency=GBP&country=GB&limit=8&offset=0&channel=desktop-web`;
  const wrapped = `https://api.allorigins.win/raw?url=${encodeURIComponent(api)}`;
  let text = '';
  try {
    text = await curlText(wrapped);
  } catch {
    text = await curlText(`https://r.jina.ai/${api}`);
  }
  const start = text.indexOf('{');
  if (start < 0) return [];
  const json = JSON.parse(text.slice(start));
  return json.products || [];
}

const found = [];
for (const q of queries) {
  const products = await search(q);
  console.log('\nQUERY', q, 'hits', products.length);
  for (const product of products.slice(0, 3)) {
    console.log(
      JSON.stringify({
        id: product.id,
        name: product.name,
        brand: product.brandName,
        price: product.price?.current?.text,
        colour: product.colour,
        url: product.url,
        imageUrl: product.imageUrl,
      })
    );
  }
  const exact = products.find((product) =>
    String(product.name || '')
      .toLowerCase()
      .includes(q.split(' ').slice(-3).join(' ').toLowerCase())
  );
  if (exact) found.push({ query: q, ...exact });
}
fs.writeFileSync(
  path.join(os.tmpdir(), 'asos-named-products.json'),
  JSON.stringify(found, null, 2)
);
