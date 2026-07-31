#!/usr/bin/env node
/**
 * Discover Aston Martin model + related URLs for capture.
 */
const ORIGIN = 'https://www.astonmartin.com';
const SEEDS = [
  `${ORIGIN}/en-gb`,
  `${ORIGIN}/en-gb/models`,
];

const MODEL_CANDIDATES = [
  'db12',
  'db12-s',
  'db12-volante',
  'db12-s-volante',
  'db12-volante-60th-anniversary-edition',
  'vantage',
  'new-vantage',
  'vantage-s',
  'vantage-roadster',
  'vantage-s-roadster',
  'vanquish',
  'vanquish-volante',
  'vanquish-25th-anniversary-edition',
  'vanquish-volante-60th-anniversary-edition',
  'dbx',
  'dbx707',
  'dbx-s',
  'valhalla',
  'valkyrie',
  'valkyrie-coupe',
  'valkyrie-spider',
  'valkyrie-amr-pro',
  'valkyrie-lm',
  'valour',
  'valiant',
  'amr26',
  'amr26-formula-one-car',
];

async function status(url) {
  try {
    const r = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; SitecoreDemoBot/1.0)' },
    });
    return { url: r.url, status: r.status, ok: r.ok };
  } catch (e) {
    return { url, status: 0, ok: false, error: e.message };
  }
}

function extractLinks(html, base) {
  const out = new Set();
  const re = /href=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      const u = new URL(m[1], base);
      if (u.origin !== ORIGIN) continue;
      if (!u.pathname.includes('/en-gb/')) continue;
      u.hash = '';
      u.search = '';
      out.add(u.href);
    } catch {
      /* ignore */
    }
  }
  return [...out];
}

async function main() {
  const found = new Set(SEEDS);

  for (const seed of SEEDS) {
    const r = await fetch(seed, {
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; SitecoreDemoBot/1.0)' },
    });
    const html = await r.text();
    for (const link of extractLinks(html, seed)) {
      if (
        link.includes('/models/') ||
        link.includes('configur') ||
        link.includes('/q-by-aston-martin') ||
        link.endsWith('/models') ||
        link.endsWith('/en-gb') ||
        link.endsWith('/en-gb/')
      ) {
        found.add(link.replace(/\/$/, ''));
      }
    }
  }

  for (const slug of MODEL_CANDIDATES) {
    const candidates = [
      `${ORIGIN}/en-gb/models/${slug}`,
      `${ORIGIN}/en-gb/models/${slug.replace(/-/g, '')}`,
    ];
    for (const c of candidates) {
      const s = await status(c);
      if (s.ok && s.status === 200) {
        found.add(s.url.replace(/\/$/, ''));
        console.error('OK', s.url);
      } else {
        console.error('NO', c, s.status);
      }
    }
  }

  // Probe common configurator entry points
  const cfgProbe = [
    `${ORIGIN}/en-gb/configurator`,
    `${ORIGIN}/en-gb/build`,
    `${ORIGIN}/en-gb/configure`,
    `${ORIGIN}/configurator`,
  ];
  for (const c of cfgProbe) {
    const s = await status(c);
    console.error('CFG', c, '->', s.status, s.url);
    if (s.ok) found.add(s.url.replace(/\/$/, ''));
  }

  const sorted = [...found].sort();
  console.log(sorted.join('\n'));
  console.error('TOTAL', sorted.length);
}

main();
