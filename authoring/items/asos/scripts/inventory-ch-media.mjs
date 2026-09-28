/**
 * Track every starter-verticals-2 public content URL used by ASOS,
 * and download a local copy named from the asset registry.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const exec = promisify(execFile);
const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../../../..');
const csvPath = path.join(here, 'media-maps', 'content-hub-asset-registry.csv');
const outDir = path.join(here, 'media-staging', 'ch-migrate');
const trackPath = path.join(here, 'media-maps', 'asos-media-migration.csv');
fs.mkdirSync(outDir, { recursive: true });

const URL_RE =
  /https:\/\/starter-verticals-2\.sitecoresandbox\.cloud\/api\/public\/content\/([a-f0-9]+)/gi;

function parseCsv(text) {
  const lines = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/).slice(1);
  const rows = [];
  for (const line of lines) {
    const parts = [];
    let cur = '';
    let inQ = false;
    for (const ch of line) {
      if (ch === '"') {
        inQ = !inQ;
        continue;
      }
      if (ch === ',' && !inQ) {
        parts.push(cur);
        cur = '';
        continue;
      }
      cur += ch;
    }
    parts.push(cur);
    const [file, assetId, publicLinkId, damId, publicUrl, relativeUrl] = parts;
    if (!file || !publicUrl) continue;
    rows.push({ file, assetId, publicLinkId, damId, publicUrl, relativeUrl });
  }
  return rows;
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next' || name === 'media-staging') continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, acc);
    else if (/\.(yml|json|ts|tsx|md|csv)$/.test(name)) acc.push(full);
  }
  return acc;
}

const registry = parseCsv(fs.readFileSync(csvPath, 'utf8'));
const byUrl = new Map();
for (const row of registry) {
  const match = row.publicUrl.match(URL_RE);
  const id = (row.relativeUrl || row.publicUrl.split('/').pop() || '').toLowerCase();
  byUrl.set(id, { ...row, sources: 'registry' });
}

const roots = [
  path.join(repo, 'authoring/items/asos'),
  path.join(repo, 'industry-verticals/asos/src'),
  path.join(repo, 'docs'),
];
for (const file of roots.flatMap((root) => walk(root))) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(URL_RE)) {
    const id = match[1].toLowerCase();
    if (byUrl.has(id)) {
      const row = byUrl.get(id);
      if (!row.sources.includes('content')) row.sources += '|content';
      continue;
    }
    byUrl.set(id, {
      file: `${id}.bin`,
      assetId: '',
      publicLinkId: '',
      damId: '',
      publicUrl: match[0],
      relativeUrl: id,
      sources: 'content-only',
    });
  }
}

const rows = [...byUrl.values()].sort((a, b) => a.file.localeCompare(b.file));
const header = 'File,OldAssetId,OldPublicLinkId,OldDamId,OldPublicUrl,OldRelativeUrl,Sources,Bytes';
const lines = [header];

async function curlToFile(url, dest) {
  await exec(
    'curl.exe',
    [
      '--ssl-no-revoke',
      '-fsS',
      '-L',
      '-A',
      'Mozilla/5.0',
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

let ok = 0;
let failed = 0;
for (const row of rows) {
  const dest = path.join(outDir, row.file);
  let bytes = 0;
  if (fs.existsSync(dest) && fs.statSync(dest).size > 500) {
    bytes = fs.statSync(dest).size;
    ok += 1;
  } else {
    try {
      await curlToFile(row.publicUrl, dest);
      bytes = fs.existsSync(dest) ? fs.statSync(dest).size : 0;
      if (bytes > 500) ok += 1;
      else failed += 1;
    } catch {
      failed += 1;
    }
  }
  const cells = [
    row.file,
    row.assetId,
    row.publicLinkId,
    row.damId,
    row.publicUrl,
    row.relativeUrl,
    row.sources,
    String(bytes),
  ].map((value) => (/,|"/.test(value) ? `"${value.replace(/"/g, '""')}"` : value));
  lines.push(cells.join(','));
  if ((ok + failed) % 25 === 0) console.log(`progress ok=${ok} failed=${failed} of ${rows.length}`);
}

fs.writeFileSync(trackPath, `${lines.join('\r\n')}\r\n`);
console.log(`tracked=${rows.length} downloaded=${ok} failed=${failed}`);
console.log(trackPath);
