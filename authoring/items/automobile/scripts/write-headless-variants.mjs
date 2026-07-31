import { randomUUID } from 'crypto';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const ROOT =
  'authoring/items/automobile/serialized-content/astonmartin/astonmartin/Presentation/Headless Variants';
const PARENT_FOLDER_ID = '7452d05b-6195-4420-9c8d-1a13427a4f4d'; // Headless Variants folder
const FOLDER_TEMPLATE = '49c111d0-6867-4798-a724-1f103166e6e9';
const VARIANT_TEMPLATE = '4d50cdae-c2d9-4de8-b080-8f992bfb1b55';

function folderYaml(id, name, parentId) {
  return `---
ID: "${id}"
Parent: "${parentId}"
Template: "${FOLDER_TEMPLATE}"
Path: "/sitecore/content/automobile/astonmartin/Presentation/Headless Variants/${name}"
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
      Value: 20260731T120000Z
`;
}

function variantYaml(id, name, parentId, folderName) {
  return `---
ID: "${id}"
Parent: "${parentId}"
Template: "${VARIANT_TEMPLATE}"
Path: "/sitecore/content/automobile/astonmartin/Presentation/Headless Variants/${folderName}/${name}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260731T120000Z
`;
}

// HeroBanner folder + variants
const heroFolderId = randomUUID();
mkdirSync(join(ROOT, 'HeroBanner'), { recursive: true });
writeFileSync(join(ROOT, 'HeroBanner.yml'), folderYaml(heroFolderId, 'HeroBanner', PARENT_FOLDER_ID));
for (const name of ['Default', 'ModelFeature', 'ModelsLanding', 'ModelDetail']) {
  writeFileSync(join(ROOT, 'HeroBanner', `${name}.yml`), variantYaml(randomUUID(), name, heroFolderId, 'HeroBanner'));
}

// Promo DualTile under existing Promo folder (parent 121749b8-...)
const promoParent = '121749b8-2cfe-4ecf-a14c-ad7a67e80797';
writeFileSync(join(ROOT, 'Promo', 'DualTile.yml'), variantYaml(randomUUID(), 'DualTile', promoParent, 'Promo'));

console.log('Wrote HeroBanner variants + Promo/DualTile');
