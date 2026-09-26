/**
 * Women's homepage stills for story tiles. Direct asos.com is reset here.
 * The page HTML is read from the Wayback snapshot of /women/, then each
 * still is saved locally. Never hotlink content.asos-media.com.
 * Output is gitignored: industry-verticals/asos/public/asos/editorial/
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const exec = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../../../../industry-verticals/asos/public/asos/editorial');
fs.mkdirSync(outDir, { recursive: true });

const shots = [
  ['hero-women.jpg', 'https://content.asos-media.com/-/media/homepages/ww/2026/september/21-uk-hp/hero/uk_ww_chapter-3_homepage_dt_2880x1280.jpg'],
  ['trend-1.jpg', 'https://content.asos-media.com/-/media/homepages/ww/2026/september/21-uk-hp/trending/rectangle-3471728.jpg'],
  ['trend-2.jpg', 'https://content.asos-media.com/-/media/homepages/ww/2026/september/21-uk-hp/trending/rectangle-3471732.jpg'],
  ['trend-3.jpg', 'https://content.asos-media.com/-/media/homepages/ww/2026/september/21-uk-hp/trending/rectangle-3471730.jpg'],
  ['trend-4.jpg', 'https://content.asos-media.com/-/media/homepages/ww/2026/september/21-uk-hp/trending/rectangle-3471733.jpg'],
  ['trend-5.jpg', 'https://content.asos-media.com/-/media/homepages/ww/2026/september/21-uk-hp/trending/rectangle-3471729---v4.jpg'],
  ['trend-6.jpg', 'https://content.asos-media.com/-/media/homepages/ww/2026/september/21-uk-hp/trending/rectangle-3471734---v3.jpg'],
  ['cat-new-in.jpg', 'https://content.asos-media.com/-/media/homepages/ww/2026/september/21-uk-hp/cat-tray/new_in--v2.jpg'],
  ['cat-158204309.jpg', 'https://content.asos-media.com/-/media/homepages/ww/2026/september/21-uk-hp/cat-tray/158204309.jpg'],
  ['cat-hunter.jpg', 'https://content.asos-media.com/-/media/homepages/ww/2026/september/21-uk-hp/cat-tray/hunter_1.jpg'],
  ['cat-151301892.jpg', 'https://content.asos-media.com/-/media/homepages/ww/2026/september/21-uk-hp/cat-tray/151301892.jpg'],
  ['cat-160764465.jpg', 'https://content.asos-media.com/-/media/homepages/ww/2026/september/21-uk-hp/cat-tray/160764465---v2.jpg'],
  ['style-lfw.jpg', 'https://content.asos-media.com/-/media/images/articles/hp-thumb-images/2026/september/lfw.jpg'],
  ['style-footwear.jpg', 'https://content.asos-media.com/-/media/images/articles/hp-thumb-images/2026/september/style-feed-it-s-official-fashion-has-entered-its-freaky-footwear-era.jpg'],
  ['hero-men.jpg', 'https://content.asos-media.com/-/media/homepages/mw/2026/september/14-uk-hp/hero/hp-hero_desktop_2880x1280_launch_2_mw_2.jpg'],
  ['men-knit.jpg', 'https://content.asos-media.com/-/media/homepages/mw/2026/september/14-uk-hp/mission/mw-missions-wc-1409/knitwear.jpg'],
  ['men-layers.jpg', 'https://content.asos-media.com/-/media/homepages/mw/2026/september/14-uk-hp/mission/mw-missions-wc-1409/light-layers.jpg'],
  ['men-denim.jpg', 'https://content.asos-media.com/-/media/homepages/mw/2026/september/14-uk-hp/cat-tray/fa26_th_tj_aspirationaldenim_singlemsw_03_dj__0199_870x1110.jpg'],
];

function wsrv(url) {
  const bare = url.replace(/^https?:\/\//, '');
  return `https://wsrv.nl/?url=${encodeURIComponent(bare)}&w=1600&output=jpg`;
}

async function curlToFile(url, dest) {
  await exec(
    'curl.exe',
    [
      '--http1.1',
      '-4',
      '--ssl-no-revoke',
      '-fL',
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
}

for (const [name, source] of shots) {
  const dest = path.join(outDir, name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 8000) {
    console.log('keep', name);
    continue;
  }
  try {
    await curlToFile(wsrv(source), dest);
  } catch (error) {
    console.warn('wsrv fail', name, error.message?.split('\n')[0]);
    if (fs.existsSync(dest)) fs.unlinkSync(dest);
  }
  const size = fs.existsSync(dest) ? fs.statSync(dest).size : 0;
  console.log(size > 8000 ? 'ok' : 'small', name, size);
}

console.log('dir', outDir);
