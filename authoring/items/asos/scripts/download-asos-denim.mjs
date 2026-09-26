/**
 * Download ASOS denim products, stills, and catwalk videos.
 * Direct asos.com calls are reset from this network. Search JSON is read
 * through AllOrigins, stills through wsrv.nl, videos from www.asos-video.com.
 * Staging is gitignored. Public copies are local fallbacks, never hotlinked.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const exec = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staging = path.join(__dirname, 'media-staging', 'denim-live');
const publicImages = path.join(
  __dirname,
  '../../../../industry-verticals/asos/public/asos/products/live'
);
const publicVideos = path.join(__dirname, '../../../../industry-verticals/asos/public/asos/videos');
const catalogOut = path.join(
  __dirname,
  '../../../../industry-verticals/asos/src/lib/asos-live-catalog.json'
);

const TARGET_PRODUCTS = 100;
const TARGET_VIDEOS = 100;
const PAGE = 72;
const MAX_OFFSET = PAGE * 40;

fs.mkdirSync(path.join(staging, 'images'), { recursive: true });
fs.mkdirSync(path.join(staging, 'videos'), { recursive: true });
fs.mkdirSync(publicImages, { recursive: true });
fs.mkdirSync(publicVideos, { recursive: true });

async function curlToFile(url, dest) {
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
      '90',
      '-o',
      dest,
      url,
    ],
    { windowsHide: true }
  );
}

async function curlText(url) {
  const dest = path.join(staging, `page-${Date.now()}-${Math.random().toString(16).slice(2)}.json`);
  await curlToFile(url, dest);
  const text = fs.readFileSync(dest, 'utf8');
  fs.unlinkSync(dest);
  return text;
}

async function searchPage(offset) {
  const api = `https://www.asos.com/api/product/search/v2/?q=denim&store=COM&lang=en-GB&currency=GBP&country=GB&limit=${PAGE}&offset=${offset}&channel=desktop-web`;
  const wrapped = `https://api.allorigins.win/raw?url=${encodeURIComponent(api)}`;
  let text = '';
  try {
    text = await curlText(wrapped);
  } catch (error) {
    const jina = `https://r.jina.ai/${api}`;
    text = await curlText(jina);
  }
  const start = text.indexOf('{');
  if (start < 0) throw new Error(`no json at offset ${offset}`);
  const json = JSON.parse(text.slice(start));
  return json.products || [];
}

function imageFileUrl(imageUrl) {
  const bare = String(imageUrl || '').replace(/^https?:\/\//, '');
  return `https://wsrv.nl/?url=${encodeURIComponent(bare)}&w=720&output=jpg`;
}

function videoFileUrl(videoUrl) {
  const bare = String(videoUrl || '').replace(/^https?:\/\//, '');
  const withExt = /\.mp4($|\?)/.test(bare) ? bare : `${bare}.mp4`;
  return `https://${withExt}`;
}

function brandSlug(brand) {
  return String(brand || 'asos')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function slugFrom(product) {
  const parts = String(product.url || '').split('/');
  return parts.length > 1 ? parts[1] : String(product.id);
}

async function saveImage(product) {
  const name = `${product.id}.jpg`;
  const dest = path.join(staging, 'images', name);
  const pub = path.join(publicImages, name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 2000) {
    fs.copyFileSync(dest, pub);
    return true;
  }
  await curlToFile(imageFileUrl(product.imageUrl), dest);
  if (!fs.existsSync(dest) || fs.statSync(dest).size < 2000) throw new Error(`tiny image ${product.id}`);
  fs.copyFileSync(dest, pub);
  return true;
}

async function saveVideo(product) {
  if (!product.videoUrl) return false;
  const name = `${product.id}.mp4`;
  const dest = path.join(staging, 'videos', name);
  const pub = path.join(publicVideos, name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
    fs.copyFileSync(dest, pub);
    return true;
  }
  await curlToFile(videoFileUrl(product.videoUrl), dest);
  if (!fs.existsSync(dest) || fs.statSync(dest).size < 10000) throw new Error(`tiny video ${product.id}`);
  fs.copyFileSync(dest, pub);
  return true;
}

const queue = [];
const seen = new Set();
let listedVideos = 0;

for (let offset = 0; offset < MAX_OFFSET && (queue.length < TARGET_PRODUCTS || listedVideos < TARGET_VIDEOS); offset += PAGE) {
  console.log(`page offset=${offset} queued=${queue.length} videos=${listedVideos}`);
  let products = [];
  try {
    products = await searchPage(offset);
  } catch (error) {
    console.warn(`  page fail ${error.message}`);
    continue;
  }
  if (!products.length) break;
  const withVideo = products.filter((item) => item.videoUrl).length;
  console.log(`  hits=${products.length} withVideo=${withVideo}`);
  for (const product of products) {
    if (seen.has(product.id) || !product.imageUrl) continue;
    const needProduct = queue.length < TARGET_PRODUCTS;
    const needVideo = listedVideos < TARGET_VIDEOS && product.videoUrl;
    if (!needProduct && !needVideo) continue;
    seen.add(product.id);
    queue.push(product);
    if (product.videoUrl) listedVideos += 1;
    if (queue.length >= TARGET_PRODUCTS && listedVideos >= TARGET_VIDEOS) break;
  }
}

console.log(`downloading ${queue.length} products`);
const saved = [];
let images = 0;
let videos = 0;

async function worker(product) {
  let hasImage = false;
  let hasVideo = false;
  try {
    hasImage = await saveImage(product);
  } catch (error) {
    console.warn(`  image ${product.id} ${error.message}`);
  }
  if (product.videoUrl) {
    try {
      hasVideo = await saveVideo(product);
    } catch (error) {
      console.warn(`  video ${product.id} ${error.message}`);
    }
  }
  if (!hasImage) return;
  const brand = product.brandName || 'ASOS DESIGN';
  const name = product.name || `Product ${product.id}`;
  saved.push({
    id: String(product.id),
    slug: slugFrom(product),
    brand,
    title: name.toLowerCase().startsWith(brand.toLowerCase()) ? name : `${brand} ${name}`,
    href: `/${brandSlug(brand)}/${slugFrom(product)}/prd/${product.id}`,
    priceGbp: Number(product.price?.current?.value) || 0,
    colour: product.colour || '',
    imageSrc: `/asos/products/live/${product.id}.jpg`,
    videoSrc: hasVideo ? `/asos/videos/${product.id}.mp4` : '',
  });
  images += 1;
  if (hasVideo) videos += 1;
  if ((images + videos) % 20 === 0) console.log(`  saved images=${images} videos=${videos}`);
}

const pool = 4;
let cursor = 0;
async function runPool() {
  const runners = Array.from({ length: pool }, async () => {
    while (cursor < queue.length) {
      const product = queue[cursor];
      cursor += 1;
      await worker(product);
    }
  });
  await Promise.all(runners);
}

await runPool();
saved.sort((a, b) => Number(a.id) - Number(b.id));
fs.writeFileSync(path.join(staging, 'catalog.json'), JSON.stringify(saved, null, 2));
fs.writeFileSync(catalogOut, JSON.stringify(saved, null, 2));
console.log(`done products=${saved.length} images=${images} videos=${videos}`);
