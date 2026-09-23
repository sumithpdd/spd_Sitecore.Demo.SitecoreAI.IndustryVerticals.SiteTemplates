/**
 * One-off writer for energy Perspectives + UK Energy page.
 * Do not re-run generate-capco-site.mjs / generate-capco-industry.mjs.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../../..');
const uploads = path.join(
  process.env.USERPROFILE || '',
  '.cursor/projects/c-code-sitecore-spd-Sitecore-Demo-SitecoreAI-IndustryVerticals-SiteTemplates/uploads'
);
const outDir = path.join(
  __dirname,
  '../serialized-content/capco/capco/Home/perspectives'
);
const energyDir = path.join(
  __dirname,
  '../serialized-content/capco/capco/Home/industries/energy'
);

const WHITEPAPER =
  'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/c4d6213c0c1f4bd8ae21e235b34c159c';
const ENERGY_IMG =
  '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/d3577aa5ffbd485ca977f959d61634f3" dam-id="JLq3YOXvSs-DS5WyPmsTUg" alt="Energy trading" dam-content-type="Image" width="1600" height="1067" />';
const SOV_IMG =
  '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/acfc8cf33553466cab6cbec77977c8bd" dam-id="l35KWOhHSW2CCoen_ZK8nQ" alt="Energy cyber resilience" dam-content-type="Image" width="1600" height="1067" />';
const WEATHER_IMG =
  '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/d1b3d47f05ee4295b296514ca9d8bdde" dam-id="N3y-Z3HaS8KJAdPMOTEkMw" alt="Weather-driven power system" dam-content-type="Image" width="1600" height="1067" />';

function escapeYaml(html) {
  return html
    .split('\n')
    .map((line) => (line ? `        ${line}` : ''))
    .join('\n');
}

function mdToHtml(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let list = [];
  const flushList = () => {
    if (!list.length) return;
    out.push(`<ul>${list.map((item) => `<li>${item}</li>`).join('')}</ul>`);
    list = [];
  };
  const inline = (value) =>
    value
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushList();
      continue;
    }
    if (line.startsWith('### ')) {
      flushList();
      out.push(`<h3>${inline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith('## ')) {
      flushList();
      out.push(`<h2>${inline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith('# ')) {
      flushList();
      continue;
    }
    if (line.startsWith('* ') || line.startsWith('- ') || line.startsWith('• ')) {
      list.push(inline(line.replace(/^(\* |- |• )/, '')));
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      flushList();
      out.push(`<p>${inline(line)}</p>`);
      continue;
    }
    flushList();
    out.push(`<p>${inline(line)}</p>`);
  }
  flushList();
  return out.join('\n');
}

function extractArticle(md, startHeading, stopMarkers) {
  const text = md.replace(/\r\n/g, '\n');
  const start = text.indexOf(startHeading);
  if (start < 0) throw new Error(`Missing ${startHeading}`);
  let body = text.slice(start);
  for (const marker of stopMarkers) {
    const idx = body.indexOf(marker, startHeading.length);
    if (idx > 0) body = body.slice(0, idx);
  }
  return body;
}

function articleYaml({
  id,
  slug,
  title,
  summary,
  kicker,
  date,
  readTime,
  image,
  content,
  related,
  seo,
  aeo,
  tags,
  whitepaper = false,
  uidPrefix,
}) {
  const whitepaperField = whitepaper
    ? `    - ID: "c4c00010-0000-4000-8000-000000000067"
      Hint: WhitepaperUrl
      Value: |
        <link text="Download whitepaper" linktype="external" url="${WHITEPAPER}" anchor="" target="_blank" />
`
    : '';
  return `---
ID: "${id}"
Parent: "c4c00030-0000-4000-8000-000000000010"
Template: "c4c00010-0000-4000-8000-000000000050"
Path: /sitecore/content/capco/capco/Home/perspectives/${slug}
SharedFields:
- ID: "a4f985d9-98b3-4b52-aaaf-4344f6e747c6"
  Hint: __Workflow
  Value: "{C4C00040-0000-4000-8000-000000000001}"
- ID: "24171bf1-c0e1-480e-be76-4c0a1876f916"
  Hint: Page Design
  Value: "{C4C00005-5555-4000-8000-000000000001}"
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}"
        l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
        <r
          uid="{${uidPrefix}-000000000040}"
          p:before="*"
          s:id="{C4C00001-1111-4000-8000-000000000007}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />
        <r
          uid="{${uidPrefix}-000000000041}"
          s:ds="c4c00020-0000-4000-8000-000000000053"
          s:id="{C4C00001-1111-4000-8000-000000000016}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=2"
          s:ph="headless-main" />
        <r
          uid="{${uidPrefix}-000000000042}"
          s:ds="c4c00020-0000-4000-8000-000000000060"
          s:id="{C4C00001-1111-4000-8000-000000000017}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=3"
          s:ph="headless-main" />
      </d>
    </r>
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "3e431de1-525e-47a3-b6b0-1ccbec3a8c98"
      Hint: __Workflow state
      Value: "{C4C00040-0000-4000-8000-00000000000A}"
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260924T000000Z
    - ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"
      Hint: NavigationTitle
      Value: "${title.replace(/"/g, '\\"')}"
    - ID: "96b71ea7-4d37-4a3a-9e11-2bb76ef03acd"
      Hint: Title
      Value: "${title.replace(/"/g, '\\"')}"
    - ID: "53f49d04-a3f6-4f75-bc6e-3e7db6e80e93"
      Hint: Content
      Value: |
${escapeYaml(content)}
    - ID: "c4c00010-0000-4000-8000-000000000052"
      Hint: Summary
      Value: "${summary.replace(/"/g, '\\"')}"
    - ID: "c4c00010-0000-4000-8000-000000000053"
      Hint: Kicker
      Value: "${kicker}"
    - ID: "c4c00010-0000-4000-8000-000000000054"
      Hint: PublishedDate
      Value: "${date}"
    - ID: "c4c00010-0000-4000-8000-000000000055"
      Hint: ReadTime
      Value: "${readTime}"
    - ID: "c4c00010-0000-4000-8000-000000000066"
      Hint: MediaType
      Value: "Article"
    - ID: "c4c00010-0000-4000-8000-000000000069"
      Hint: Byline
      Value: "Elisabeth Plakinger"
    - ID: "c4c00010-0000-4000-8000-000000000056"
      Hint: Image
      Value: |
        ${image}
${whitepaperField}    - ID: "c4c00010-0000-4000-8000-000000000059"
      Hint: Sectors
      Value: |
        {C4C00025-0000-4000-8000-000000000005}
    - ID: "c4c00010-0000-4000-8000-00000000005a"
      Hint: Services
      Value: |
        {C4C00025-0000-4000-8000-000000000014}
        {C4C00025-0000-4000-8000-000000000012}
    - ID: "c4c00010-0000-4000-8000-00000000005b"
      Hint: Regions
      Value: |
        {C4C00025-0000-4000-8000-000000000022}
        {C4C00025-0000-4000-8000-000000000023}
    - ID: "c4c00010-0000-4000-8000-000000000057"
      Hint: Tags
      Value: |
        {C4C00025-0000-4000-8000-000000000032}
        {C4C00025-0000-4000-8000-000000000033}
    - ID: "c4c00010-0000-4000-8000-000000000058"
      Hint: Categories
      Value: |
        {C4C00025-0000-4000-8000-000000000032}
        {C4C00025-0000-4000-8000-000000000033}
    - ID: "c4c00010-0000-4000-8000-00000000005d"
      Hint: Authors
      Value: |
        {C4C00030-0000-4000-8000-000000000002}
    - ID: "c4c00010-0000-4000-8000-00000000005c"
      Hint: RelatedContent
      Value: |
${related}
    - ID: "c4c00010-0000-4000-8000-000000000063"
      Hint: SuggestedTags
      Value: "${tags}"
    - ID: "c4c00010-0000-4000-8000-000000000061"
      Hint: AeoNotes
      Value: "${aeo.replace(/"/g, '\\"')}"
    - ID: "c4c00010-0000-4000-8000-000000000062"
      Hint: SeoTitle
      Value: "${seo.replace(/"/g, '\\"')}"
    - ID: "c4c00010-0000-4000-8000-000000000065"
      Hint: HubSpotFormId
      Value: capco-perspective-nurture
`;
}

const agenticMd = fs.readFileSync(path.join(uploads, 'agentic-ai-in-energy-trading-3.md'), 'utf8');
const sovMd = fs.readFileSync(path.join(uploads, 'energy-sovereignty-cyber-resilience-6.md'), 'utf8');
const weatherMd = fs.readFileSync(path.join(uploads, 'from-predictable-to-weather-driven-7.md'), 'utf8');

const agenticHtml = mdToHtml(
  extractArticle(agenticMd, '### Executive summary', [
    '## Related perspectives',
    '## Download whitepaper',
    'Capco logo',
  ])
);
const sovHtml = mdToHtml(
  extractArticle(sovMd, 'Europe is working to strengthen', [
    '## Related',
    'Capco logo',
    'Contact us to discuss',
  ])
);
const weatherHtml = mdToHtml(
  extractArticle(weatherMd, 'For decades, Europe', ['## Contact us', '### CONTACTS', 'Capco logo'])
);

fs.writeFileSync(
  path.join(outDir, 'agentic-ai-in-energy-trading.yml'),
  articleYaml({
    id: 'c4c00030-0000-4000-8000-000000000015',
    slug: 'agentic-ai-in-energy-trading',
    title: 'Agentic AI in energy trading',
    summary: 'From fragmented market data to explainable trading intelligence.',
    kicker: 'Energy',
    date: '13 Aug 2026',
    readTime: '5 min read',
    image: ENERGY_IMG,
    content: `<p>From fragmented market data to explainable trading intelligence.</p>\n${agenticHtml}`,
    related: `        {C4C00030-0000-4000-8000-000000000017}
        {C4C00030-0000-4000-8000-000000000018}`,
    seo: 'Agentic AI in energy trading | Capco',
    aeo: 'Answers “agentic AI in energy trading”. Named expert Elisabeth Plakinger. Whitepaper download at #article-intro-22072026.',
    tags: 'agentic AI, energy trading, crude oil, controls',
    whitepaper: true,
    uidPrefix: 'C4C01000-0014-4000-8000',
  })
);

fs.writeFileSync(
  path.join(outDir, 'energy-sovereignty-cyber-resilience.yml'),
  articleYaml({
    id: 'c4c00030-0000-4000-8000-000000000017',
    slug: 'energy-sovereignty-cyber-resilience',
    title: "The role of cyber resilience in preserving Europe's energy sovereignty",
    summary:
      "Europe's energy sovereignty now depends on cyber resilience — from Colonial Pipeline to NIS2, CER and IEC 62443.",
    kicker: 'Energy',
    date: '17 Jul 2026',
    readTime: '5 min read',
    image: SOV_IMG,
    content: sovHtml,
    related: `        {C4C00030-0000-4000-8000-000000000015}
        {C4C00030-0000-4000-8000-000000000018}`,
    seo: "The role of cyber resilience in preserving Europe's energy sovereignty | Capco",
    aeo: 'Answers “energy sovereignty cyber resilience”. Named expert Elisabeth Plakinger.',
    tags: 'cyber resilience, energy sovereignty, NIS2, OT',
    whitepaper: true,
    uidPrefix: 'C4C01000-001A-4000-8000',
  })
);

fs.writeFileSync(
  path.join(outDir, 'from-predictable-to-weather-driven.yml'),
  articleYaml({
    id: 'c4c00030-0000-4000-8000-000000000018',
    slug: 'from-predictable-to-weather-driven',
    title: 'From predictable to weather-driven',
    summary: "Orchestrating flexibility in Europe's power system — PICASSO, MARI and TSO playbooks.",
    kicker: 'Energy',
    date: '27 Mar 2026',
    readTime: '5 min read',
    image: WEATHER_IMG,
    content: `<h2>Orchestrating flexibility in Europe's power system</h2>\n${weatherHtml}`,
    related: `        {C4C00030-0000-4000-8000-000000000015}
        {C4C00030-0000-4000-8000-000000000017}`,
    seo: 'From predictable to weather-driven | Capco',
    aeo: 'Answers “weather-driven power system Europe”. Named expert Elisabeth Plakinger.',
    tags: 'flexibility, PICASSO, MARI, weather-driven',
    whitepaper: true,
    uidPrefix: 'C4C01000-001B-4000-8000',
  })
);

const ukEnergy = `---
ID: "c4c00030-0000-4000-8000-000000000069"
Parent: "c4c00030-0000-4000-8000-000000000025"
Template: "a4c1a619-0ca9-4679-bb2d-5db64ce69721"
Path: /sitecore/content/capco/capco/Home/industries/energy/uk-energy
SharedFields:
- ID: "24171bf1-c0e1-480e-be76-4c0a1876f916"
  Hint: Page Design
  Value: "{C4C00005-5555-4000-8000-000000000001}"
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}"
        l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
        <r
          uid="{C4C01000-0019-4000-8000-000000000010}"
          p:before="*"
          s:id="{C4C00001-1111-4000-8000-000000000018}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />
        <r
          uid="{C4C01000-0019-4000-8000-000000000011}"
          s:ds="c4c00020-0000-4000-8000-000000000056"
          s:id="{C4C00001-1111-4000-8000-000000000016}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=2"
          s:ph="headless-main" />
        <r
          uid="{C4C01000-0019-4000-8000-000000000012}"
          s:ds="c4c00020-0000-4000-8000-000000000060"
          s:id="{C4C00001-1111-4000-8000-000000000017}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=3"
          s:ph="headless-main" />
      </d>
    </r>
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260924T000000Z
    - ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"
      Hint: NavigationTitle
      Value: "UK Energy"
    - ID: "96b71ea7-4d37-4a3a-9e11-2bb76ef03acd"
      Hint: Title
      Value: "UK Energy"
    - ID: "53f49d04-a3f6-4f75-bc6e-3e7db6e80e93"
      Hint: Content
      Value: |
        <p>Helping energy companies thrive and generate significant value in today’s ever-shifting landscape.</p>
        <p>Our UK Energy practice builds on Capco’s strong heritage of innovation and transformation, across utilities, energy transition, energy trading and financial services markets. Capco Energy has over 2,000 consultants worldwide delivering projects for more than 50 energy and commodities clients.</p>
`;

fs.writeFileSync(path.join(energyDir, 'uk-energy.yml'), ukEnergy);

const insightsUk = `---
ID: "c4c00020-0000-4000-8000-000000000056"
Parent: "c4c00020-0000-4000-8000-000000000050"
Template: "c4c00010-0000-4000-8000-000000000091"
Path: /sitecore/content/capco/capco/Data/Insights Carousels/UK Energy
SharedFields:
- ID: "a4f985d9-98b3-4b52-aaaf-4344f6e747c6"
  Hint: __Workflow
  Value: "{C4C00040-0000-4000-8000-000000000011}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "3e431de1-525e-47a3-b6b0-1ccbec3a8c98"
      Hint: __Workflow state
      Value: "{C4C00040-0000-4000-8000-000000000017}"
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260924T000000Z
    - ID: "c4c00010-0000-4000-8000-000000000093"
      Hint: Heading
      Value: "Related content and events"
    - ID: "c4c00010-0000-4000-8000-00000000009a"
      Hint: Intro
      Value: "Perspectives from the UK Energy practice — trading intelligence, cyber resilience and weather-driven grids."
    - ID: "c4c00010-0000-4000-8000-000000000095"
      Hint: Sector
      Value: "energy"
    - ID: "c4c00010-0000-4000-8000-000000000094"
      Hint: Items
      Value: |
        {C4C00030-0000-4000-8000-000000000015}
        {C4C00030-0000-4000-8000-000000000017}
        {C4C00030-0000-4000-8000-000000000018}
`;

fs.writeFileSync(
  path.join(__dirname, '../serialized-content/capco/capco/Data/Insights Carousels/UK Energy.yml'),
  insightsUk
);

console.log('wrote energy articles + UK Energy page', { root, uploads });
