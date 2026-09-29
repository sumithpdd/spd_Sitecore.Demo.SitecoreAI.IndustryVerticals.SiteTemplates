import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const source = fs.readFileSync(path.join(here, 'ASOS.md'), 'utf8').replace(/\r\n/g, '\n');

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function inline(value) {
  let html = escapeHtml(value);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const external = /^https?:/i.test(href);
    const attrs = external ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${href}"${attrs}>${label}</a>`;
  });
  return html;
}

function slug(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const lines = source.split('\n');
const toc = [];
let html = '';
let i = 0;

function flushParagraph(buffer) {
  if (!buffer.length) return;
  html += `<p>${inline(buffer.join(' '))}</p>\n`;
  buffer.length = 0;
}

const paragraph = [];

while (i < lines.length) {
  const line = lines[i];

  if (line.startsWith('```')) {
    flushParagraph(paragraph);
    const fence = [];
    i += 1;
    while (i < lines.length && !lines[i].startsWith('```')) {
      fence.push(lines[i]);
      i += 1;
    }
    html += `<pre><code>${escapeHtml(fence.join('\n'))}</code></pre>\n`;
    i += 1;
    continue;
  }

  if (line.startsWith('|')) {
    flushParagraph(paragraph);
    const rows = [];
    while (i < lines.length && lines[i].startsWith('|')) {
      rows.push(lines[i]);
      i += 1;
    }
    const parsed = rows
      .filter((row) => !/^\|\s*-+/.test(row.replace(/\|/g, '|').replace(/[^|\-:\s]/g, '')))
      .map((row) =>
        row
          .replace(/^\|/, '')
          .replace(/\|$/, '')
          .split('|')
          .map((cell) => cell.trim())
      );
    const body = parsed.filter((cells) => !cells.every((cell) => /^:?-+:?$/.test(cell)));
    if (!body.length) continue;
    const [head, ...rest] = body;
    html += '<div class="table-wrap"><table><thead><tr>';
    head.forEach((cell) => {
      html += `<th>${inline(cell)}</th>`;
    });
    html += '</tr></thead><tbody>';
    rest.forEach((cells) => {
      html += '<tr>';
      cells.forEach((cell) => {
        html += `<td>${inline(cell)}</td>`;
      });
      html += '</tr>';
    });
    html += '</tbody></table></div>\n';
    continue;
  }

  const heading = /^(#{1,3})\s+(.+)$/.exec(line);
  if (heading) {
    flushParagraph(paragraph);
    const level = heading[1].length;
    const text = heading[2];
    const id = slug(text);
    if (level <= 2) toc.push({ level, text, id });
    html += `<h${level} id="${id}">${inline(text)}</h${level}>\n`;
    i += 1;
    continue;
  }

  if (line.startsWith('> ')) {
    flushParagraph(paragraph);
    const quote = [];
    while (i < lines.length && lines[i].startsWith('> ')) {
      quote.push(lines[i].slice(2));
      i += 1;
    }
    html += `<blockquote><p>${inline(quote.join(' '))}</p></blockquote>\n`;
    continue;
  }

  if (/^\d+\.\s+/.test(line)) {
    flushParagraph(paragraph);
    html += '<ol>';
    while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
      html += `<li>${inline(lines[i].replace(/^\d+\.\s+/, ''))}</li>`;
      i += 1;
    }
    html += '</ol>\n';
    continue;
  }

  if (line.startsWith('- ')) {
    flushParagraph(paragraph);
    html += '<ul>';
    while (i < lines.length && lines[i].startsWith('- ')) {
      html += `<li>${inline(lines[i].slice(2))}</li>`;
      i += 1;
    }
    html += '</ul>\n';
    continue;
  }

  if (!line.trim()) {
    flushParagraph(paragraph);
    i += 1;
    continue;
  }

  paragraph.push(line.trim());
  i += 1;
}
flushParagraph(paragraph);

const nav = toc
  .map(
    (item) =>
      `<a class="lvl-${item.level}" href="#${item.id}">${escapeHtml(item.text)}</a>`
  )
  .join('\n');

const page = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ASOS demo guide</title>
  <style>
    :root { color-scheme: light; --ink: #111; --muted: #5c5c5c; --line: #e4e4e4; --bg: #f6f6f6; --paper: #fff; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: "Segoe UI", Helvetica, Arial, sans-serif; color: var(--ink); background: var(--bg); }
    a { color: #111; }
    header.top { background: #000; color: #fff; padding: 28px 32px 22px; }
    header.top p { margin: 6px 0 0; color: #cfcfcf; max-width: 42rem; }
    header.top h1 { margin: 0; font-size: 28px; font-weight: 650; letter-spacing: -0.03em; }
    .layout { display: grid; grid-template-columns: 240px minmax(0, 1fr); gap: 28px; max-width: 1240px; margin: 0 auto; padding: 24px; }
    nav { position: sticky; top: 16px; align-self: start; display: flex; flex-direction: column; gap: 6px; max-height: calc(100vh - 32px); overflow: auto; padding-right: 8px; }
    nav a { text-decoration: none; font-size: 13px; line-height: 1.35; color: var(--muted); }
    nav a.lvl-1 { color: var(--ink); font-weight: 650; margin-top: 10px; }
    nav a:hover { color: #000; }
    main { background: var(--paper); padding: 8px 36px 48px; border: 1px solid var(--line); }
    main h1 { font-size: 32px; letter-spacing: -0.03em; margin-bottom: 8px; }
    main h2 { font-size: 22px; margin: 36px 0 12px; padding-top: 8px; border-top: 1px solid var(--line); }
    main h3 { font-size: 16px; margin: 24px 0 8px; }
    p, li { line-height: 1.55; }
    blockquote { margin: 16px 0; padding: 12px 16px; background: #f3f3f3; border-left: 3px solid #000; }
    code { font-family: Consolas, "Courier New", monospace; font-size: 0.92em; background: #f3f3f3; padding: 0 4px; }
    pre { background: #111; color: #f5f5f5; padding: 16px; overflow: auto; }
    pre code { background: transparent; color: inherit; padding: 0; }
    .table-wrap { overflow-x: auto; margin: 12px 0 20px; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    th, td { text-align: left; vertical-align: top; border-bottom: 1px solid var(--line); padding: 8px 10px; }
    th { background: #fafafa; font-size: 12px; letter-spacing: 0.02em; }
    td a { font-weight: 650; }
    @media (max-width: 860px) {
      .layout { grid-template-columns: 1fr; }
      nav { position: static; max-height: none; flex-direction: row; flex-wrap: wrap; }
      main { padding: 8px 16px 32px; }
    }
  </style>
</head>
<body>
  <header class="top">
    <h1>ASOS demo guide</h1>
    <p>SitecoreAI fashion demo. Use the menu to jump, and open any live link in a new tab while you walk someone through it.</p>
  </header>
  <div class="layout">
    <nav aria-label="Sections">${nav}</nav>
    <main>${html}</main>
  </div>
</body>
</html>
`;

const out = path.join(here, 'asos-guide.html');
fs.writeFileSync(out, page);
console.log(out);
