/**
 * Pinsent /search page + SiteSearch rendering.
 * Run: node authoring/items/legal/scripts/generate-site-search.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

write(
  'serialized-content/renderings/legal/SiteSearch.yml',
  `---
ID: "a1e90001-1111-4000-8000-000000000019"
Parent: "55837669-1c90-4234-b408-87b8a519ddfd"
Template: "04646a89-996f-4ee7-878a-ffdbf1f0ef0d"
Path: /sitecore/layout/Renderings/Project/legal/SiteSearch
SharedFields:
- ID: "037fe404-dd19-4bf7-8e30-4dadf68b27b0"
  Hint: componentName
  Value: SiteSearch
- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"
  Hint: __Icon
  Value: Office/32x32/element.png
- ID: "a77e8568-1ab3-44f1-a664-b7c37ec7810d"
  Hint: Parameters Template
  Value: "{5BD96264-0B02-4605-8FFF-0079CAEB67FC}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260911T200000Z
`
);

write(
  'serialized-content/legal/legal/Home/search.yml',
  `---
ID: "a1e90030-0000-4000-8000-000000000090"
Parent: "7f779a70-0faa-4105-aac5-0c56f0ee44b4"
Template: "e5a82c5d-05dd-476c-bec7-efecffd2cf43"
Path: /sitecore/content/legal/legal/Home/search
SharedFields:
- ID: "24171bf1-c0e1-480e-be76-4c0a1876f916"
  Hint: Page Design
  Value: "{A1E90005-5555-4000-8000-000000000001}"
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}"
        l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
        <r
          uid="{A1E91000-0008-4000-8000-000000000001}"
          p:before="*"
          s:id="{A1E90001-1111-4000-8000-000000000019}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
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
      Value: 20260911T200000Z
    - ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"
      Hint: NavigationTitle
      Value: Search
    - ID: "63ba690a-5274-4537-8313-a6d43fbdadc1"
      Hint: Title
      Value: Search
    - ID: "62d161c2-fb5d-4773-8d46-63c21c95a441"
      Hint: Content
      Value: |
        <p>Please enter a new search term</p>
`
);

const availablePath = path.join(
  ROOT,
  'serialized-content/legal/legal/Presentation/Available Renderings/Pinsent.yml'
);
let available = fs.readFileSync(availablePath, 'utf8');
if (!available.includes('A1E90001-1111-4000-8000-000000000019')) {
  available = available.replace(
    '{A1E90001-1111-4000-8000-000000000018}',
    '{A1E90001-1111-4000-8000-000000000018}\n    {A1E90001-1111-4000-8000-000000000019}'
  );
  fs.writeFileSync(availablePath, available, 'utf8');
}

console.log('Wrote SiteSearch rendering and /search page.');
