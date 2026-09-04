import { mkdirSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { join } from 'node:path';

const root = 'authoring/items/brother/serialized-content/templates/brother';
const ids = {
  page: randomUUID(),
  std: randomUUID(),
  content: randomUUID(),
};
const fields = [
  'Eyebrow',
  'Title',
  'Lead',
  'Body',
  'HeroImage',
  'CtaLink',
  'Author',
  'PublishedDate',
];
const fieldIds = Object.fromEntries(fields.map((f) => [f, randomUUID()]));
const types = {
  Eyebrow: 'Single-Line Text',
  Title: 'Single-Line Text',
  Lead: 'Multi-Line Text',
  Body: 'Rich Text',
  HeroImage: 'Image',
  CtaLink: 'General Link',
  Author: 'Single-Line Text',
  PublishedDate: 'Date',
};
const sorts = {
  Eyebrow: 100,
  Title: 200,
  Lead: 300,
  Body: 400,
  HeroImage: 500,
  CtaLink: 600,
  Author: 700,
  PublishedDate: 800,
};
const PAGE = 'f352f7cd-0a08-419a-9670-e7ef478cd2a2';
const PARENT = '7a01b800-5ab5-47bd-8ce9-467aaef82404';
const T_FOLDER = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const T_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';
const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';

writeFileSync(
  join(root, 'ArticlePage.yml'),
  `---
ID: "${ids.page}"
Parent: "${PARENT}"
Template: "${T_FOLDER}"
Path: /sitecore/templates/Project/brother/ArticlePage
SharedFields:
- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"
  Hint: __Icon
  Value: Office/32x32/document_text.png
- ID: "12c33f3f-86c5-43a5-aeb4-5598cec45116"
  Hint: __Base template
  Value: |
    {${PAGE.toUpperCase()}}
- ID: "f7d48a55-2158-4f02-9356-756654404f73"
  Hint: __Standard values
  Value: "{${ids.std.toUpperCase()}}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
`
);

mkdirSync(join(root, 'ArticlePage', 'Content'), { recursive: true });

writeFileSync(
  join(root, 'ArticlePage', '__Standard Values.yml'),
  `---
ID: "${ids.std}"
Parent: "${ids.page}"
Template: "${ids.page}"
Path: /sitecore/templates/Project/brother/ArticlePage/__Standard Values
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
`
);

writeFileSync(
  join(root, 'ArticlePage', 'Content.yml'),
  `---
ID: "${ids.content}"
Parent: "${ids.page}"
Template: "${T_SECTION}"
Path: /sitecore/templates/Project/brother/ArticlePage/Content
SharedFields:
- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"
  Hint: __Icon
  Value: Office/32x32/window_dialog.png
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
`
);

for (const name of fields) {
  writeFileSync(
    join(root, 'ArticlePage', 'Content', `${name}.yml`),
    `---
ID: "${fieldIds[name]}"
Parent: "${ids.content}"
Template: "${T_FIELD}"
Path: /sitecore/templates/Project/brother/ArticlePage/Content/${name}
SharedFields:
- ID: "ab162cc0-dc80-4abf-8871-998ee5d7ba32"
  Hint: Type
  Value: "${types[name]}"
- ID: "ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e"
  Hint: __Sortorder
  Value: ${sorts[name]}
Languages:
- Language: en
  Fields:
  - ID: "19a69332-a23e-4e70-8d16-b2640cb24cc8"
    Hint: Title
    Value: ${name}
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
`
  );
}

console.log('ArticlePage created', ids);
